-- Profiles Table (Unified User Info)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE,
  role TEXT CHECK (role IN ('student', 'faculty', 'admin', 'principal', 'visitor')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Faculty Table
CREATE TABLE IF NOT EXISTS public.faculty (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  employee_id TEXT UNIQUE,
  department TEXT,
  designation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events and Registrations
CREATE TABLE IF NOT EXISTS public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  prize TEXT,
  tags TEXT[],
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id TEXT NOT NULL, -- using text ID to match hardcoded event IDs if needed, or UUID if we sync
  student_id TEXT NOT NULL,
  team_members TEXT[],
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, student_id)
);

-- Wallet System
CREATE TABLE IF NOT EXISTS public.wallets (
  student_id TEXT PRIMARY KEY,
  balance DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('CREDIT', 'DEBIT')),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- Students Table
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  year TEXT NOT NULL,
  section TEXT NOT NULL,
  roll_no TEXT UNIQUE,
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subjects Table
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Timetable Table
CREATE TABLE IF NOT EXISTS public.timetable (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  section TEXT NOT NULL,
  day_of_week TEXT NOT NULL, -- 'Monday', 'Tuesday', etc.
  period_number INTEGER,
  subject_id UUID REFERENCES public.subjects(id),
  time_start TEXT NOT NULL,
  time_end TEXT NOT NULL,
  room TEXT,
  faculty_name TEXT,
  type TEXT CHECK (type IN ('Lecture', 'Lab', 'Break', 'Activity', 'Research')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attendance Sessions (Faculty starts these)
CREATE TABLE IF NOT EXISTS public.attendance_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  faculty_id TEXT NOT NULL, -- UUID of faculty
  timetable_id UUID REFERENCES public.timetable(id),
  lat DECIMAL(10, 8) NOT NULL,
  lon DECIMAL(11, 8) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Attendance Table (Modified)
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES public.students(id),
  timetable_id UUID REFERENCES public.timetable(id),
  session_id UUID REFERENCES public.attendance_sessions(id),
  faculty_id TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL CHECK (status IN ('PRESENT', 'ABSENT', 'LATE')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, timetable_id, date)
);

-- RPC for Secure Payment
CREATE OR REPLACE FUNCTION handle_wallet_payment(
  p_student_id TEXT,
  p_amount DECIMAL
) RETURNS JSON AS $$
DECLARE
  current_bal DECIMAL;
  new_bal DECIMAL;
BEGIN
  -- 1. Lock the wallet row for update
  SELECT balance INTO current_bal FROM wallets WHERE student_id = p_student_id FOR UPDATE;
  
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'message', 'Wallet not found');
  END IF;

  -- 2. Check balance
  IF current_bal < p_amount THEN
    RETURN json_build_object('success', false, 'message', 'Insufficient funds');
  END IF;

  -- 3. Deduct
  new_bal := current_bal - p_amount;
  UPDATE wallets SET balance = new_bal, updated_at = NOW() WHERE student_id = p_student_id;

  -- 4. Record Transaction
  INSERT INTO transactions (student_id, amount, type, description)
  VALUES (p_student_id, p_amount, 'DEBIT', 'Fee Payment');

  RETURN json_build_object('success', true, 'new_balance', new_bal);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'message', SQLERRM);
END;
$$ LANGUAGE plpgsql;
