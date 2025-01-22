-- Migration 3: Create events table
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date date NOT NULL,
  venue_id uuid REFERENCES venues(id),
  type text NOT NULL,
  organizer_id uuid REFERENCES users(id),
  max_participants integer,
  price numeric(10,2),
  status text NOT NULL DEFAULT 'upcoming',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);