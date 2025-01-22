-- Migration 1: Create base tables (persons and venues)
CREATE TABLE persons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  firstname text NOT NULL,
  birthdate date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL DEFAULT 'pool',
  address text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL,
  phone text,
  email text,
  website text,
  capacity integer,
  lanes integer,
  length integer,
  width integer,
  depth_min numeric(4,2),
  depth_max numeric(4,2),
  has_diving_boards boolean DEFAULT false,
  has_timing_system boolean DEFAULT false,
  is_indoor boolean DEFAULT true,
  is_accessible boolean DEFAULT true,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
