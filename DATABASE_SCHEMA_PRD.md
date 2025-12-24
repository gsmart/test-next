# Database Schema PRD - SunstoneMind

## Overview
This document defines the database schema for the SunstoneMind wellness application. The schema supports user management, activities, mood tracking, journaling, goals, notifications, and analytics.

## Database Technology
- **Database**: PostgreSQL (recommended) or MySQL
- **ORM**: Prisma (recommended) or TypeORM
- **Migrations**: Version-controlled schema migrations

## Core Entities

### 1. Users Table
Stores user account information and authentication data.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  phone VARCHAR(20),
  location VARCHAR(255),
  bio TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);
```

### 2. User Preferences Table
Stores user-specific settings and preferences.

```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  theme VARCHAR(20) DEFAULT 'light',
  accent_color VARCHAR(20) DEFAULT 'blue',
  language VARCHAR(10) DEFAULT 'en',
  notifications_email BOOLEAN DEFAULT TRUE,
  notifications_push BOOLEAN DEFAULT TRUE,
  notifications_reminders BOOLEAN DEFAULT TRUE,
  notifications_sounds BOOLEAN DEFAULT FALSE,
  quiet_hours_start TIME DEFAULT '22:00',
  quiet_hours_end TIME DEFAULT '08:00',
  profile_visibility BOOLEAN DEFAULT TRUE,
  activity_tracking BOOLEAN DEFAULT TRUE,
  data_sharing BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id)
);

CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
```

### 3. Activities Table
Stores available wellness activities (meditation, breathing, journaling, etc.).

```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL, -- 'meditation', 'breathing', 'journal', 'mindfulness'
  category VARCHAR(100), -- 'Sleep', 'Focus', 'Anxiety', 'Energy', etc.
  duration_minutes INTEGER NOT NULL,
  difficulty VARCHAR(20) DEFAULT 'beginner', -- 'beginner', 'intermediate', 'advanced'
  thumbnail_url TEXT,
  audio_url TEXT,
  video_url TEXT,
  content TEXT, -- JSON or text content for the activity
  is_premium BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  rating DECIMAL(3,2) DEFAULT 0.0,
  total_participants INTEGER DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activities_type ON activities(type);
CREATE INDEX idx_activities_category ON activities(category);
CREATE INDEX idx_activities_is_active ON activities(is_active);
```

### 4. User Activities Table
Tracks user's activity completions and progress.

```sql
CREATE TABLE user_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'skipped'
  progress_percentage INTEGER DEFAULT 0,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  duration_minutes INTEGER,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX idx_user_activities_activity_id ON user_activities(activity_id);
CREATE INDEX idx_user_activities_status ON user_activities(status);
CREATE INDEX idx_user_activities_completed_at ON user_activities(completed_at);
```

### 5. Mood Entries Table
Stores daily mood check-ins from users.

```sql
CREATE TABLE mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mood_value INTEGER NOT NULL CHECK (mood_value >= 1 AND mood_value <= 5),
  -- 1: Stressed, 2: Anxious, 3: Okay, 4: Good, 5: Great
  notes TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, date)
);

CREATE INDEX idx_mood_entries_user_id ON mood_entries(user_id);
CREATE INDEX idx_mood_entries_date ON mood_entries(date);
CREATE INDEX idx_mood_entries_user_date ON mood_entries(user_id, date);
```

### 6. Journal Entries Table
Stores user journal entries.

```sql
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  content TEXT NOT NULL,
  mood_before INTEGER CHECK (mood_before >= 1 AND mood_before <= 5),
  mood_after INTEGER CHECK (mood_after >= 1 AND mood_after <= 5),
  tags TEXT[], -- Array of tags
  is_private BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_journal_entries_user_id ON journal_entries(user_id);
CREATE INDEX idx_journal_entries_created_at ON journal_entries(created_at);
CREATE INDEX idx_journal_entries_tags ON journal_entries USING GIN(tags);
```

### 7. Goals Table
Stores user wellness goals and progress.

```sql
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100), -- 'Stress Reduction', 'Mindfulness', 'Sleep', etc.
  target_value INTEGER NOT NULL,
  current_value INTEGER DEFAULT 0,
  unit VARCHAR(50), -- 'minutes', 'days', 'percentage', etc.
  start_date DATE NOT NULL,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'paused', 'cancelled'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_status ON goals(status);
CREATE INDEX idx_goals_category ON goals(category);
```

### 8. Routines Table
Stores user's daily/weekly routines.

```sql
CREATE TABLE routines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  activity_id UUID REFERENCES activities(id) ON DELETE SET NULL,
  scheduled_time TIME NOT NULL,
  days_of_week INTEGER[], -- [0,1,2,3,4,5,6] for Sunday-Saturday
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_routines_user_id ON routines(user_id);
CREATE INDEX idx_routines_is_active ON routines(is_active);
```

### 9. Routine Completions Table
Tracks routine completion history.

```sql
CREATE TABLE routine_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  routine_id UUID NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scheduled_date DATE NOT NULL,
  completed_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'skipped'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(routine_id, scheduled_date)
);

CREATE INDEX idx_routine_completions_routine_id ON routine_completions(routine_id);
CREATE INDEX idx_routine_completions_user_id ON routine_completions(user_id);
CREATE INDEX idx_routine_completions_scheduled_date ON routine_completions(scheduled_date);
```

### 10. Notifications Table
Stores user notifications.

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- 'reminder', 'achievement', 'update', 'routine'
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  action_url TEXT, -- URL to navigate when clicked
  metadata JSONB, -- Additional data in JSON format
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
CREATE INDEX idx_notifications_type ON notifications(type);
```

### 11. Sessions Table
Tracks meditation/breathing session data.

```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP,
  duration_minutes INTEGER,
  heart_rate_start INTEGER,
  heart_rate_end INTEGER,
  notes TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_activity_id ON sessions(activity_id);
CREATE INDEX idx_sessions_started_at ON sessions(started_at);
```

### 12. Sleep Logs Table
Tracks user sleep data.

```sql
CREATE TABLE sleep_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  bedtime TIME,
  wake_time TIME,
  sleep_duration_hours DECIMAL(4,2),
  sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 5),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, date)
);

CREATE INDEX idx_sleep_logs_user_id ON sleep_logs(user_id);
CREATE INDEX idx_sleep_logs_date ON sleep_logs(date);
```

### 13. User Streaks Table
Tracks user activity streaks.

```sql
CREATE TABLE user_streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL, -- 'meditation', 'journal', 'breathing'
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, activity_type)
);

CREATE INDEX idx_user_streaks_user_id ON user_streaks(user_id);
CREATE INDEX idx_user_streaks_activity_type ON user_streaks(activity_type);
```

## Relationships Summary

1. **Users** → One-to-One → **User Preferences**
2. **Users** → One-to-Many → **User Activities**
3. **Users** → One-to-Many → **Mood Entries**
4. **Users** → One-to-Many → **Journal Entries**
5. **Users** → One-to-Many → **Goals**
6. **Users** → One-to-Many → **Routines**
7. **Users** → One-to-Many → **Notifications**
8. **Users** → One-to-Many → **Sessions**
9. **Users** → One-to-Many → **Sleep Logs**
10. **Users** → One-to-Many → **User Streaks**
11. **Activities** → One-to-Many → **User Activities**
12. **Activities** → One-to-Many → **Sessions**
13. **Routines** → One-to-Many → **Routine Completions**

## Data Types and Constraints

- **UUID**: Used for all primary keys for better distribution and security
- **Timestamps**: All tables include `created_at` and `updated_at` for audit trails
- **Soft Deletes**: Users and Journal Entries support soft deletes with `deleted_at`
- **Indexes**: Strategic indexes on foreign keys and frequently queried columns
- **Constraints**: Check constraints for data validation (ratings, mood values, etc.)

## Migration Strategy

1. Create base tables in order of dependencies
2. Add indexes after table creation
3. Add foreign key constraints
4. Seed initial data (activities, default preferences)
5. Create views for common queries (user stats, analytics)

## Security Considerations

- Password hashing: Use bcrypt or Argon2
- Email verification: Required for account activation
- Soft deletes: Preserve data for recovery
- Audit trails: Track all changes with timestamps
- Data privacy: Support GDPR compliance with data export/deletion

## Performance Optimizations

- Indexes on foreign keys and frequently queried columns
- Partitioning for large tables (mood_entries, sessions) by date
- JSONB for flexible metadata storage
- Array types for efficient tag storage
- Materialized views for analytics queries

## Future Enhancements

- Social features: User connections, sharing
- Content management: Admin tables for content moderation
- Payment integration: Subscription and transaction tables
- Analytics: Event tracking tables
- AI features: ML model predictions and recommendations


