-- Migration 5: Create matches table
CREATE TABLE matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id uuid REFERENCES tournaments(id),
  round integer NOT NULL,
  participant1_id uuid REFERENCES users(id),
  participant2_id uuid REFERENCES users(id),
  score1 integer,
  score2 integer,
  status text NOT NULL DEFAULT 'scheduled',
  start_time timestamptz NOT NULL,
  referee_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

