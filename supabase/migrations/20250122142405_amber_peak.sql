/*
  # Add coordinates column to venues table

  1. Changes
    - Add coordinates column to venues table using PostGIS POINT type
    - Enable PostGIS extension if not already enabled
    - Add index on coordinates column for better spatial query performance

  2. Notes
    - Uses PostGIS for proper geospatial data handling
    - Coordinates will be stored in EPSG:4326 (WGS84) format
*/

-- Enable PostGIS extension if not already enabled
CREATE EXTENSION IF NOT EXISTS postgis;

-- Add coordinates column
ALTER TABLE venues ADD COLUMN IF NOT EXISTS coordinates geometry(Point, 4326);

-- Add spatial index
CREATE INDEX IF NOT EXISTS idx_venues_coordinates ON venues USING GIST (coordinates);