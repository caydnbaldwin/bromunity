CREATE DATABASE bromunity;
Connect to the database (psql): \c bromunity

-- Enum type definitions (PostgreSQL requires explicit enum types)
CREATE TYPE role_enum AS ENUM ('Admin', 'User');
CREATE TYPE gender_enum AS ENUM ('Male', 'Female', 'Other');
CREATE TYPE game_genre_enum AS ENUM ('Action', 'Adventure', 'RPG', 'Simulation', 'Strategy', 'Sports', 'Racing', 'Fighting', 'Shooter', 'Puzzle', 'Platformer', 'Survival', 'Horror', 'MMO', 'Party', 'Sandbox', 'Open-World');
CREATE TYPE gaming_platform_enum AS ENUM ('PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile');
CREATE TYPE player_role_enum AS ENUM ('Tank', 'DPS', 'Healer', 'Support', 'Bruiser', 'Crowd Control', 'Sniper', 'Assassin', 'Mage', 'Summoner', 'Skirmisher', 'Scout', 'Hybrid');
CREATE TYPE request_status_enum AS ENUM ('Pending', 'Accepted', 'Declined');

-- Persons
CREATE TABLE IF NOT EXISTS Persons (
  PersonId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  EmailAddress VARCHAR(255) NOT NULL UNIQUE,
  PasswordHash VARCHAR(255) NOT NULL,
  Role role_enum NOT NULL DEFAULT 'User',
  FirstName VARCHAR(30) NOT NULL,
  LastName VARCHAR(50) NOT NULL,
  DateOfBirth DATE NOT NULL,
  Gamertag VARCHAR(30) NOT NULL,
  PhoneNumber VARCHAR(20) NOT NULL,
  Gender gender_enum NOT NULL,
  StreetAddress VARCHAR(100) NOT NULL,
  City VARCHAR(30) NOT NULL,
  State VARCHAR(30) NOT NULL,
  PostalCode VARCHAR(20) NOT NULL
);

-- Games
CREATE TABLE IF NOT EXISTS Games (
  GameId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  Producer VARCHAR(100) NOT NULL,
  GameTitle VARCHAR(255) NOT NULL,
  GameGenre game_genre_enum NOT NULL,
  NumberOfPlayers INT NOT NULL DEFAULT 0
);

-- Profiles
CREATE TABLE IF NOT EXISTS Profiles (
  ProfileId INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  PersonId INT NOT NULL,
  GameId INT NOT NULL,
  GamingPlatform gaming_platform_enum NOT NULL,
  HoursOfGameplay INT NOT NULL DEFAULT 0,
  FOREIGN KEY (PersonId) REFERENCES Persons(PersonId) ON DELETE CASCADE,
  FOREIGN KEY (GameId) REFERENCES Games(GameId) ON DELETE CASCADE
);

-- PlayerRoles
CREATE TABLE IF NOT EXISTS PlayerRoles (
  ProfileId INT NOT NULL,
  GameId INT NOT NULL,
  PlayerRole player_role_enum NOT NULL,
  RolePriority INT NOT NULL,
  PRIMARY KEY (ProfileId, GameId, PlayerRole),
  FOREIGN KEY (ProfileId) REFERENCES Profiles(ProfileId) ON DELETE CASCADE,
  FOREIGN KEY (GameId) REFERENCES Games(GameId) ON DELETE CASCADE
);

-- Bios
CREATE TABLE IF NOT EXISTS Bios (
  PersonId INT NOT NULL,
  BioQuestion VARCHAR(255) NOT NULL,
  BioResponse VARCHAR(255) NOT NULL,
  PRIMARY KEY (PersonId, BioQuestion, BioResponse),
  FOREIGN KEY (PersonId) REFERENCES Persons(PersonId) ON DELETE CASCADE
);

-- Friendships
CREATE TABLE IF NOT EXISTS Friendships (
  PersonId1 INT NOT NULL,
  PersonId2 INT NOT NULL,
  RequestStatus request_status_enum NOT NULL,
  CHECK (PersonId1 < PersonId2),
  PRIMARY KEY (PersonId1, PersonId2),
  FOREIGN KEY (PersonId1) REFERENCES Persons(PersonId) ON DELETE CASCADE,
  FOREIGN KEY (PersonId2) REFERENCES Persons(PersonId) ON DELETE CASCADE
);
