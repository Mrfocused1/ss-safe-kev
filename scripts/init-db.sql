-- Sickle Safe Admin Dashboard Database Schema
-- This script creates all necessary tables for analytics and form tracking

-- 1. Page Views Table - Track all page visits
CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  screen_width INTEGER,
  country TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(page_path);

-- 2. Form Submissions Table - Store all form signups
CREATE TABLE IF NOT EXISTS form_submissions (
  id SERIAL PRIMARY KEY,
  form_type TEXT NOT NULL,  -- 'hero_signup' | 'contact_form' | 'gala_mailing'
  email TEXT NOT NULL,
  name TEXT,
  role TEXT,
  session_id TEXT,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_form_type ON form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_created ON form_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_form_email ON form_submissions(email);

-- 3. Analytics Events Table - Track user interactions
CREATE TABLE IF NOT EXISTS analytics_events (
  id SERIAL PRIMARY KEY,
  event_name TEXT NOT NULL,  -- 'scroll_75', 'button_click', etc.
  event_data JSONB,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_events_session ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_created ON analytics_events(created_at);

-- 4. Sessions Table - Track unique visitor sessions
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  first_seen_at TIMESTAMP DEFAULT NOW(),
  last_seen_at TIMESTAMP DEFAULT NOW(),
  page_count INTEGER DEFAULT 1,
  is_bounce BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_sessions_id ON sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_last_seen ON sessions(last_seen_at);
