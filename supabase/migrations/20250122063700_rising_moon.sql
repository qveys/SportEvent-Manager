-- Migration 2: Create users table with auth integration
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL UNIQUE,
  username text NOT NULL UNIQUE,
  person_id uuid REFERENCES persons(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);