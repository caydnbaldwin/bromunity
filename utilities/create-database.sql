-- Create the database
CREATE DATABASE bromunity;

-------------------------------
-- ENUM DEFINITIONS
-------------------------------
CREATE TYPE role_enum AS ENUM ('admin', 'user');
CREATE TYPE gender_enum AS ENUM ('Male', 'Female', 'Other');
CREATE TYPE game_genre_enum AS ENUM (
  'Action', 'Adventure', 'RPG', 'Simulation', 'Strategy',
  'Sports', 'Racing', 'Fighting', 'Shooter', 'Puzzle',
  'Platformer', 'Survival', 'Horror', 'MMO', 'Party',
  'Sandbox', 'Open-World', 'Battle Royale'
);
CREATE TYPE gaming_platform_enum AS ENUM ('PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile');
CREATE TYPE status_enum AS ENUM ('Pending', 'Accepted', 'Declined');

-------------------------------
-- AUTHENTICATION
-------------------------------
CREATE TABLE authentication (
  authentication_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role role_enum NOT NULL DEFAULT 'user'
);

-------------------------------
-- PERSONS
-------------------------------
CREATE TABLE persons (
  person_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(50),
  date_of_birth DATE,
  phone_number VARCHAR(20),
  gender gender_enum,
  street_address VARCHAR(100),
  city VARCHAR(30),
  state VARCHAR(30),
  postal_code VARCHAR(20),
  authentication_id INT NOT NULL,
  FOREIGN KEY (authentication_id)
    REFERENCES authentication(authentication_id)
    ON DELETE CASCADE
);

-------------------------------
-- GAMES
-------------------------------
CREATE TABLE games (
  game_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  producer VARCHAR(100) NOT NULL,
  game_title VARCHAR(255) NOT NULL,
  game_genre game_genre_enum NOT NULL
);

-------------------------------
-- PROFILES (Composite PK)
-------------------------------
CREATE TABLE profiles (
  person_id INT NOT NULL,
  game_id INT NOT NULL,
  gaming_platform gaming_platform_enum,
  description TEXT,
  hours_of_gameplay INT DEFAULT 0,
  PRIMARY KEY (person_id, game_id),
  FOREIGN KEY (person_id) REFERENCES persons(person_id) ON DELETE CASCADE,
  FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE
);

-------------------------------
-- FRIENDSHIPS (Composite PK)
-------------------------------
CREATE TABLE friendships (
  person_id_1 INT NOT NULL,
  person_id_2 INT NOT NULL,
  status status_enum,
  sender_id INT NOT NULL,
  CHECK (person_id_1 < person_id_2),
  PRIMARY KEY (person_id_1, person_id_2),
  FOREIGN KEY (person_id_1) REFERENCES persons(person_id) ON DELETE CASCADE,
  FOREIGN KEY (person_id_2) REFERENCES persons(person_id) ON DELETE CASCADE
);

-------------------------------
-- INSERT 10 GAMES
-------------------------------
INSERT INTO games (producer, game_title, game_genre)
VALUES
  ('Nintendo', 'The Legend of Zelda: Breath of the Wild', 'Open-World'),
  ('FromSoftware', 'Elden Ring', 'RPG'),
  ('Valve', 'Portal 2', 'Puzzle'),
  ('Mojang', 'Minecraft', 'Sandbox'),
  ('Rockstar Games', 'Grand Theft Auto V', 'Action'),
  ('CD Projekt Red', 'The Witcher 3: Wild Hunt', 'RPG'),
  ('Blizzard Entertainment', 'Overwatch', 'Shooter'),
  ('Square Enix', 'Final Fantasy XV', 'RPG'),
  ('Playground Games', 'Forza Horizon 5', 'Racing'),
  ('Epic Games', 'Fortnite', 'Battle Royale');
