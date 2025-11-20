create database if not exists Bromunity;
use Bromunity;

-- Persons
create table if not exists Persons (
  PersonId int not null auto_increment primary key,
  EmailAddress varchar(255) not null unique,
  PasswordHash varchar(255) not null,
  Role enum('Admin', 'User') not null default 'User',
  FirstName varchar(30) not null,
  LastName varchar(50) not null,
  DateOfBirth date not null,
  Gamertag varchar(30) not null,
  PhoneNumber varchar(20) not null,
  Gender enum('Male', 'Female', 'Other') not null,
  StreetAddress varchar(100) not null,
  City varchar(30) not null,
  State varchar(30) not null,
  PostalCode varchar(20) not null
)
;

-- Games
create table if not exists Games (
  GameId int not null auto_increment primary key,
  Producer varchar(100) not null,
  GameTitle varchar(255) not null,
  GameGenre enum('Action', 'Adventure', 'RPG', 'Simulation', 'Strategy', 'Sports', 'Racing', 'Fighting', 'Shooter', 'Puzzle', 'Platformer', 'Survival', 'Horror', 'MMO', 'Party', 'Sandbox', 'Open-World') not null,
  NumberOfPlayers int not null default 0
)
;

-- Profiles
create table if not exists Profiles (
  ProfileId int not null auto_increment primary key,
  PersonId int not null,
  GameId int not null,
  GamingPlatform enum('PC', 'PlayStation', 'Xbox', 'Nintendo Switch', 'Mobile') not null,
  HoursOfGameplay int not null default 0,

  foreign key (PersonId) references Persons(PersonId) on delete cascade,
  foreign key (GameId) references Games(GameId) on delete cascade
)
;

-- PlayerRoles
create table if not exists PlayerRoles (
  ProfileId int not null,
  GameId int not null,
  PlayerRole enum('Tank', 'DPS', 'Healer', 'Support', 'Bruiser', 'Crowd Control', 'Sniper', 'Assassin', 'Mage', 'Summoner', 'Skirmisher', 'Scout', 'Hybrid') not null,
  RolePriority int not null,

  primary key (ProfileId, GameId, PlayerRole),

  foreign key (ProfileId) references Profiles(ProfileId) on delete cascade,
  foreign key (GameId) references Games(GameId) on delete cascade
)
;

-- Bios
create table if not exists Bios (
  PersonId int not null,
  BioQuestion varchar(255) not null,
  BioResponse varchar(255) not null,

  primary key (PersonId, BioQuestion, BioResponse),

  foreign key (PersonId) references Persons(PersonId) on delete cascade
)
;

-- Friendships
create table if not exists Friendships (
  PersonId1 int not null,
  PersonId2 int not null,
  RequestStatus enum('Pending', 'Accepted', 'Declined') not null,

  check (PersonId1 < PersonId2),

  primary key (PersonId1, PersonId2),

  foreign key (PersonId1) references Persons(PersonId) on delete cascade,
  foreign key (PersonId2) references Persons(PersonId) on delete cascade
)
;