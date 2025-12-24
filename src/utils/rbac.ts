import rbacConfig from "@/config/rbac.json";

export type UserRole = "patient" | "doctor" | "admin";

export interface Permission {
  view: boolean;
  create?: boolean;
  edit?: boolean;
  delete?: boolean;
  export?: boolean;
  viewAll?: boolean;
  access?: boolean;
}

export interface RolePermissions {
  [key: string]: Permission | { [key: string]: Permission };
}

export interface RBACConfig {
  roles: {
    [key in UserRole]: {
      name: string;
      description: string;
      permissions: RolePermissions;
      sidebarItems: string[];
    };
  };
}

const rbac = rbacConfig as RBACConfig;

export const getRolePermissions = (role: UserRole = "patient"): RolePermissions => {
  return rbac.roles[role]?.permissions || rbac.roles.patient.permissions;
};

export const hasPermission = (
  role: UserRole = "patient",
  resource: string,
  action: keyof Permission = "view"
): boolean => {
  const permissions = getRolePermissions(role);
  const resourcePerms = permissions[resource];
  
  if (!resourcePerms) return false;
  
  if (typeof resourcePerms === "object" && "view" in resourcePerms) {
    return (resourcePerms as Permission)[action] || false;
  }
  
  return false;
};

export const getSidebarItems = (role: UserRole = "patient"): string[] => {
  return rbac.roles[role]?.sidebarItems || rbac.roles.patient.sidebarItems;
};

export const getRoleName = (role: UserRole = "patient"): string => {
  return rbac.roles[role]?.name || "Patient";
};

