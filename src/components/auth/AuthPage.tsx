"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, Lock, User, Mail, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { useRegister, useLogin } from "@/hooks/useAuth";
import {useAuthStore} from "@/store/useAuthStore";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

type ApiUser = {
  user_id: number;
  name: string;
  email: string;
  role?: string | null;
  profile?: string | null;
};

type ApiPayload = {
  user: ApiUser;
  token: any;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: ApiPayload;
};

// Validation functions
const validateEmail = (email: string): { isValid: boolean; message: string } => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!email) {
    return { isValid: false, message: "Email is required" };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Please enter a valid email address" };
  }
  
  return { isValid: true, message: "" };
};

const validatePassword = (password: string): { 
  isValid: boolean; 
  message: string;
  checks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  }
} => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };
  
  const isValid = Object.values(checks).every(check => check);
  
  if (!password) {
    return { isValid: false, message: "Password is required", checks };
  }
  
  if (!isValid) {
    return { 
      isValid: false, 
      message: "Password must meet all requirements", 
      checks 
    };
  }
  
  return { isValid: true, message: "", checks };
};

const AuthPage = () => {
  const { setAuth, setAuthLogin } = useAuthStore();
  const router = useRouter();
  const [authMode, setAuthMode] = useState("sign-in");
  const [useClerkAuth, setUseClerkAuth] = useState(false);
  
  // Sign In State
  const [signInEmail, setSignInEmail] = useState("");
  const [signInRole, setSignInRole] = useState<"patient" | "doctor">("patient");
  
  // Sign Up State
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState("");
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [signUpRole, setSignUpRole] = useState<"patient" | "doctor">("patient");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpLocation, setSignUpLocation] = useState("");
  
  // Validation States
  const [emailError, setEmailError] = useState("");
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  
  // Error States
  const [signInError, setSignInError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  // Email validation on blur
  const handleEmailBlur = (email: string, isSignUp: boolean = false) => {
    const validation = validateEmail(email);
    if (isSignUp && !validation.isValid) {
      setEmailError(validation.message);
    }
  };

  // Password validation on change
  const handlePasswordChange = (password: string) => {
    setSignUpPassword(password);
    const validation = validatePassword(password);
    setPasswordValidation(validation.checks);
    setShowPasswordRequirements(password.length > 0);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError("");

    // Validate email
    const emailValidation = validateEmail(signInEmail);
    if (!emailValidation.isValid) {
      setSignInError(emailValidation.message);
      return;
    }

    loginMutation.mutate(
      {
        email: signInEmail,
      },
      {
        onSuccess: (res) => {
          console.log("Login success:", res);
          if (res?.data?.token) {
            Cookies.set("authToken", res?.data?.token, {
              expires: 7,
              secure: process.env.NODE_ENV === "production",
              sameSite: "strict",
            });
            const wrapper = res?.data;
            const payload: ApiPayload | undefined = (wrapper && (wrapper as any).data) ?? wrapper;
            const user = payload?.user;
            const token = payload?.token;
            setAuthLogin(user, token);
          }
          router.push("/dashboard");
        },
        onError: (err: any) => {
          console.error("Login failed:", err);
          setSignInError(err?.response?.data?.message || "Login failed. Please try again.");
        },
      }
    );
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError("");
    setEmailError("");

    // Validate name
    if (!signUpName.trim()) {
      setSignUpError("Please enter your full name");
      return;
    }

    // Validate email
    const emailValidation = validateEmail(signUpEmail);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.message);
      setSignUpError(emailValidation.message);
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(signUpPassword);
    if (!passwordValidation.isValid) {
      setSignUpError("Password does not meet all requirements");
      return;
    }

    // Validate password confirmation
    if (signUpPassword !== signUpConfirmPassword) {
      setSignUpError("Passwords do not match");
      return;
    }

    // For doctor signup, show WIP message
    if (signUpRole === "doctor") {
      toast.error("Doctor registration is currently under development. Please contact support.");
      return;
    }

    registerMutation.mutate(
      {
        name: signUpName,
        email: signUpEmail,
        password_hash: signUpPassword,
        role: signUpRole,
        phone: signUpPhone || undefined,
        location: signUpLocation || undefined,
      },
      {
        onSuccess: (res) => {
          setAuthMode("sign-in");
          setSignInEmail(signUpEmail);
          toast.success("Registration successful");
          const data = res?.data;

          if (data) {
            const user: any = {
              id: data.user_id?.toString(),
              name: data.name,
              email: data.email,
              profile: data.profile,
              role: data.role,
            };
            setAuth(user, null);
          }
        },
        onError: (err: any) => {
          console.error("Registration failed:", err);
          setSignUpError(err?.response?.data?.message || "Registration failed. Please try again.");
        },
      }
    );
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending;

  if (registerMutation.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
        <Card className="w-full max-w-md p-8 text-center">
          <CardContent className="space-y-4">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
            <h3 className="text-lg font-semibold">Setting up your account...</h3>
            <p className="text-muted-foreground">
              Please wait while we prepare your wellness journey.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 p-6">
      <Card className="w-full max-w-lg border border-primary/10 shadow-xl rounded-2xl bg-white/95">
        <CardHeader className="text-center space-y-4 pb-0">
          <div className="flex flex-col items-center justify-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent shadow-md mb-2">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-primary tracking-tight">
              Sunstone Mind
            </h1>
          </div>
          <p className="text-base text-muted-foreground font-medium mt-2">
            {authMode === "sign-in"
              ? "Welcome back to your wellness sanctuary"
              : "Begin your journey to mental wellness"}
          </p>
        </CardHeader>

        <CardContent className="pt-2 pb-7 px-6">
          <div className="border-t border-primary/10 mb-6" />
          <div className="bg-gradient-to-br from-accent/10 to-secondary/10 rounded-xl shadow-inner p-4">
            <Tabs value={authMode} onValueChange={setAuthMode} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 rounded-lg overflow-hidden bg-white/60 border border-primary/10">
                <TabsTrigger
                  value="sign-in"
                  className="flex items-center gap-2 font-semibold text-primary"
                >
                  <Lock className="w-4 h-4" />
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="sign-up"
                  className="flex items-center gap-2 font-semibold text-primary"
                >
                  <User className="w-4 h-4" />
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="sign-in" className="space-y-4">
                {!useClerkAuth && (
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-role" className="text-sm font-medium">
                        I am a
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          variant={signInRole === "patient" ? "default" : "outline"}
                          onClick={() => setSignInRole("patient")}
                          className="text-xs"
                        >
                          Patient
                        </Button>
                        <Button
                          type="button"
                          variant={signInRole === "doctor" ? "default" : "outline"}
                          onClick={() => setSignInRole("doctor")}
                          className="text-xs"
                        >
                          Doctor
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signin-email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signin-email"
                          type="email"
                          placeholder="you@example.com"
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          onBlur={(e) => handleEmailBlur(e.target.value)}
                          className="pl-10"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    {signInError && (
                      <p className="text-sm text-red-500 font-medium">{signInError}</p>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                    </div>
                  </form>
                )}
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="sign-up" className="space-y-4">
                {!useClerkAuth ? (
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-role" className="text-sm font-medium">
                        I am a
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          variant={signUpRole === "patient" ? "default" : "outline"}
                          onClick={() => setSignUpRole("patient")}
                          className="text-xs"
                        >
                          Patient
                        </Button>
                        <Button
                          type="button"
                          variant={signUpRole === "doctor" ? "default" : "outline"}
                          onClick={() => {
                            setSignUpRole("doctor");
                            toast.error("Doctor registration is currently under development (WIP)");
                          }}
                          className="text-xs relative"
                          disabled
                        >
                          Doctor
                          <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[8px] px-1 rounded">WIP</span>
                        </Button>
                      </div>
                      {signUpRole === "doctor" && (
                        <p className="text-xs text-yellow-600 mt-1">
                          ⚠️ Doctor registration is currently under development. Please contact support.
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          value={signUpName}
                          onChange={(e) => setSignUpName(e.target.value)}
                          className="pl-10"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="you@example.com"
                          value={signUpEmail}
                          onChange={(e) => {
                            setSignUpEmail(e.target.value);
                            setEmailError("");
                          }}
                          onBlur={(e) => handleEmailBlur(e.target.value, true)}
                          className={`pl-10 ${emailError ? 'border-red-500' : ''}`}
                          disabled={isLoading}
                          required
                        />
                      </div>
                      {emailError && (
                        <p className="text-xs text-red-500 mt-1">{emailError}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-sm font-medium">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type={showSignUpPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={signUpPassword}
                          onChange={(e) => handlePasswordChange(e.target.value)}
                          className="pl-10 pr-10"
                          disabled={isLoading}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                        >
                          {showSignUpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      
                      {/* Password Requirements */}
                      {showPasswordRequirements && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
                          <p className="text-xs font-semibold text-gray-700 mb-2">Password must contain:</p>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {passwordValidation.length ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-gray-400" />
                              )}
                              <span className={`text-xs ${passwordValidation.length ? 'text-green-600' : 'text-gray-600'}`}>
                                At least 8 characters
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {passwordValidation.uppercase ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-gray-400" />
                              )}
                              <span className={`text-xs ${passwordValidation.uppercase ? 'text-green-600' : 'text-gray-600'}`}>
                                One uppercase letter (A-Z)
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {passwordValidation.lowercase ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-gray-400" />
                              )}
                              <span className={`text-xs ${passwordValidation.lowercase ? 'text-green-600' : 'text-gray-600'}`}>
                                One lowercase letter (a-z)
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {passwordValidation.number ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-gray-400" />
                              )}
                              <span className={`text-xs ${passwordValidation.number ? 'text-green-600' : 'text-gray-600'}`}>
                                One number (0-9)
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {passwordValidation.special ? (
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                              ) : (
                                <XCircle className="w-4 h-4 text-gray-400" />
                              )}
                              <span className={`text-xs ${passwordValidation.special ? 'text-green-600' : 'text-gray-600'}`}>
                                One special character (!@#$%^&*)
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password" className="text-sm font-medium">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signup-confirm-password"
                          type={showSignUpPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={signUpConfirmPassword}
                          onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                          className="pl-10"
                          disabled={isLoading}
                          required
                        />
                      </div>
                    </div>

                    {/* Patient-specific fields */}
                    {signUpRole === "patient" && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="signup-phone" className="text-sm font-medium">
                            Phone Number <span className="text-muted-foreground">(Optional)</span>
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="signup-phone"
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                              value={signUpPhone}
                              onChange={(e) => setSignUpPhone(e.target.value)}
                              className="pl-10"
                              disabled={isLoading}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-location" className="text-sm font-medium">
                            Location <span className="text-muted-foreground">(Optional)</span>
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="signup-location"
                              type="text"
                              placeholder="City, State"
                              value={signUpLocation}
                              onChange={(e) => setSignUpLocation(e.target.value)}
                              className="pl-10"
                              disabled={isLoading}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {signUpError && (
                      <p className="text-sm text-red-500 font-medium">{signUpError}</p>
                    )}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Creating account...
                        </>
                      ) : (
                        "Sign Up"
                      )}
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div>
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full mt-4"
                      onClick={() => setUseClerkAuth(false)}
                    >
                      ← Back to email sign up
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-7 text-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <span className="text-primary font-semibold">Terms of Service</span>{" "}
              and{" "}
              <span className="text-primary font-semibold">Privacy Policy</span>
            </p>
          </div>
          <div className="mt-5 text-center">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-sm text-muted-foreground hover:text-primary font-medium"
            >
              ← Back to home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;