-- ==============================================================================
-- PATHPILOT - Additional Tables Schema
-- Run this script inside your Supabase SQL Editor (https://app.supabase.com)
-- Ensure you have run the initial profiles table schema first.
-- ==============================================================================

-- 1. Onboarding Details Table (Extended User Info)
CREATE TABLE IF NOT EXISTS public.onboarding_details (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  education_stage TEXT NOT NULL DEFAULT 'College Student',
  location TEXT,
  interests TEXT[] DEFAULT '{}',
  career_goal TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for onboarding_details
ALTER TABLE public.onboarding_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own onboarding details."
  ON public.onboarding_details FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert/update their own onboarding details."
  ON public.onboarding_details FOR ALL
  USING (auth.uid() = id);


-- 2. Career Assessments Table
CREATE TABLE IF NOT EXISTS public.career_assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  trait_scores JSONB NOT NULL DEFAULT '{}'::jsonb,
  recommended_careers TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for career_assessments
ALTER TABLE public.career_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own assessments."
  ON public.career_assessments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assessments."
  ON public.career_assessments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assessments."
  ON public.career_assessments FOR DELETE
  USING (auth.uid() = user_id);

-- Index for querying assessments faster
CREATE INDEX IF NOT EXISTS idx_career_assessments_user_id ON public.career_assessments(user_id);


-- 3. Career Roadmaps Table
CREATE TABLE IF NOT EXISTS public.career_roadmaps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  steps JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of roadmap milestones
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  is_custom BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for career_roadmaps
ALTER TABLE public.career_roadmaps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own roadmaps."
  ON public.career_roadmaps FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert/update/delete their own roadmaps."
  ON public.career_roadmaps FOR ALL
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_career_roadmaps_user_id ON public.career_roadmaps(user_id);


-- 4. Resume Builder Table
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  personal_info JSONB NOT NULL DEFAULT '{}'::jsonb,
  education JSONB NOT NULL DEFAULT '[]'::jsonb,
  experience JSONB NOT NULL DEFAULT '[]'::jsonb,
  projects JSONB NOT NULL DEFAULT '[]'::jsonb,
  skills JSONB NOT NULL DEFAULT '{}'::jsonb,
  template_preference TEXT DEFAULT 'modern',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for resumes
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own resumes."
  ON public.resumes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert/update/delete their own resumes."
  ON public.resumes FOR ALL
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON public.resumes(user_id);


-- 5. Certificates & Achievements Table
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  issue_date DATE,
  credential_url TEXT,
  file_url TEXT, -- Path in Supabase storage bucket
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for certificates
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own certificates."
  ON public.certificates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert/update/delete their own certificates."
  ON public.certificates FOR ALL
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON public.certificates(user_id);


-- 6. Saved Colleges Table
CREATE TABLE IF NOT EXISTS public.saved_colleges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  college_id TEXT NOT NULL, -- Refers to mock college ID or API ID
  college_name TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, college_id)
);

-- Enable RLS for saved_colleges
ALTER TABLE public.saved_colleges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own saved colleges."
  ON public.saved_colleges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert/delete their own saved colleges."
  ON public.saved_colleges FOR ALL
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_saved_colleges_user_id ON public.saved_colleges(user_id);


-- 7. Chat History (Sessions & Messages)
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT DEFAULT 'New AI Counseling Session',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE NOT NULL,
  sender TEXT CHECK (sender IN ('user', 'ai')) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Chat
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own chat sessions."
  ON public.chat_sessions FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage messages in their sessions."
  ON public.chat_messages FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_sessions 
      WHERE public.chat_sessions.id = public.chat_messages.session_id 
      AND public.chat_sessions.user_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON public.chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON public.chat_messages(session_id);
