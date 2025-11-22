-- PERSONS
INSERT INTO Persons 
(EmailAddress, PasswordHash, Role, FirstName, LastName, DateOfBirth, Gamertag, PhoneNumber, Gender, StreetAddress, City, State, PostalCode)
VALUES
('caydn@example.com', 'hash123', 'Admin', 'Caydn', 'Baldwin', '2003-05-14', 'CyberHawk', '8015551111', 'Male', '100 Campus Dr', 'Provo', 'Utah', '84602'),
('brady@example.com', 'hash456', 'User', 'Brady', 'Bates', '2004-01-20', 'BradyBeast', '3855552222', 'Male', '55 Maple St', 'Logan', 'Utah', '84321'),
('sarah@example.com', 'hash789', 'User', 'Sarah', 'Williams', '2002-10-03', 'SunshineGamer', '4355553333', 'Female', '700 Cherry Ln', 'St. George', 'Utah', '84770'),
('mia@example.com', 'hash012', 'User', 'Mia', 'Johnson', '2001-06-25', 'NebulaMage', '4355554444', 'Female', '44 Pine Ridge', 'Ogden', 'Utah', '84201'),
('alex@example.com', 'hash777', 'User', 'Alex', 'Turner', '2000-02-14', 'ArcSniper', '8015555555', 'Other', '22 Westwood Blvd', 'Salt Lake City', 'Utah', '84101');

-- GAMES
INSERT INTO Games (Producer, GameTitle, GameGenre, NumberOfPlayers)
VALUES
('Riot Games', 'League of Legends', 'Action', 10),
('Blizzard', 'Overwatch 2', 'Shooter', 10),
('Nintendo', 'Super Smash Bros Ultimate', 'Fighting', 8),
('Epic Games', 'Fortnite', 'Shooter', 100),
('Mojang', 'Minecraft', 'Sandbox', 8),
('Square Enix', 'Final Fantasy XIV', 'Adventure', 2000);

-- PROFILES
-- Relies on Persons and Games inserted above with sequential IDs starting at 1.
INSERT INTO Profiles (PersonId, GameId, GamingPlatform, HoursOfGameplay)
VALUES
(1, 1, 'PC', 1200),
(1, 4, 'PC', 450),
(2, 3, 'Nintendo Switch', 320),
(3, 6, 'PC', 800),
(4, 1, 'PC', 200),
(5, 5, 'PC', 900);

-- PLAYER ROLES
-- ProfileId mapping assumes identity allocation in insertion order above.
INSERT INTO PlayerRoles (ProfileId, GameId, PlayerRole, RolePriority)
VALUES
(1, 1, 'Mage', 1),
(1, 1, 'Support', 2),
(2, 4, 'Sniper', 1),
(3, 3, 'Bruiser', 1),
(4, 6, 'Healer', 1),
(4, 6, 'Summoner', 2),
(5, 1, 'Assassin', 1),
(6, 5, 'Summoner', 1);

-- BIOS
INSERT INTO Bios (PersonId, BioQuestion, BioResponse)
VALUES
(1, 'What is your favorite game genre?', 'Shooter'),
(1, 'What is your favorite gaming snack?', 'Takis'),
(2, 'What is your favorite game genre?', 'Fighting'),
(3, 'What is your favorite game genre?', 'MMO'),
(4, 'What is your favorite game genre?', 'Strategy'),
(5, 'What is your favorite game genre?', 'Sandbox');

-- FRIENDSHIPS
INSERT INTO Friendships (PersonId1, PersonId2, RequestStatus)
VALUES
(1, 2, 'Accepted'),
(1, 3, 'Pending'),
(2, 4, 'Accepted'),
(3, 5, 'Accepted'),
(4, 5, 'Declined');
