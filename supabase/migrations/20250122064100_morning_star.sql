-- Migration 6: Create junction tables
CREATE TABLE event_participants (
  event_id uuid REFERENCES events(id),
  user_id uuid REFERENCES users(id),
  role text NOT NULL DEFAULT 'participant',
  registered_at timestamptz DEFAULT now(),
  PRIMARY KEY (event_id, user_id)
);

CREATE TABLE tournament_participants (
  tournament_id uuid REFERENCES tournaments(id),
  user_id uuid REFERENCES users(id),
  registered_at timestamptz DEFAULT now(),
  PRIMARY KEY (tournament_id, user_id)
);

