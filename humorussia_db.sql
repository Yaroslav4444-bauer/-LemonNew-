-- Database: humorussia_db

-- CREATE DATABASE humorussia_db
    -- WITH
    -- OWNER = postgres
    -- ENCODING = 'UTF8'
    -- LC_COLLATE = 'ru'
    -- LC_CTYPE = 'ru'
    -- LOCALE_PROVIDER = 'libc'
    -- TABLESPACE = pg_default
    -- CONNECTION LIMIT = -1
    -- IS_TEMPLATE = False;

-- \connect humorussia_db

-- Create schema
CREATE SCHEMA IF NOT EXISTS humorussia_db;

-- Set search path
SET search_path TO humorussia_db;

DROP TABLE IF EXISTS Rating_total CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;
DROP TABLE IF EXISTS User_Data CASCADE;
DROP TABLE IF EXISTS Progress CASCADE;
DROP TABLE IF EXISTS Achievement CASCADE;
DROP TABLE IF EXISTS Region_map CASCADE;
DROP TABLE IF EXISTS Sourse_data_for_analysis CASCADE;
DROP TABLE IF EXISTS level CASCADE;
DROP TABLE IF EXISTS Puzzle CASCADE;
DROP TABLE IF EXISTS Additional_conditions;
DROP TABLE IF EXISTS Options;
DROP TABLE IF EXISTS Clues;
DROP TABLE IF EXISTS Rating_Friends CASCADE;
DROP TABLE IF EXISTS Friend CASCADE;
DROP TABLE IF EXISTS User_has_Notification;
DROP TABLE IF EXISTS Message;
DROP TABLE IF EXISTS Recommendation CASCADE;
DROP TABLE IF EXISTS Notification;
DROP TABLE IF EXISTS Chat;
DROP TABLE IF EXISTS User_has_Achievement;
DROP TABLE IF EXISTS User_has_level;
DROP TABLE IF EXISTS Sourse_data_for_analysis_has_level;
DROP TABLE IF EXISTS User_has_Friend;



-- User table
CREATE TABLE User_Data (
    idUser SERIAL PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT TIMESTAMP '1970-01-01 00:00:01',
    avatar BYTEA
);

-- Progress table
CREATE TABLE Progress (
    idUser SERIAL PRIMARY KEY,
    completed_levels INTEGER NOT NULL,
    tatal_score INTEGER NOT NULL,
    User_idUser INTEGER NOT NULL,
    CONSTRAINT fk_Progress_User
        FOREIGN KEY (User_idUser)
        REFERENCES User_Data (idUser)
);

-- Achievement table
CREATE TABLE Achievement (
    idAchievement INTEGER PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    icon BYTEA NOT NULL,
    description TEXT NOT NULL,
    score_points INTEGER NOT NULL,
    is_unlocked BOOLEAN NOT NULL
);

-- Region_map table
CREATE TABLE Region_map (
    idRegion_map INTEGER PRIMARY KEY,
    number INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    icon BYTEA,
    is_unlocked BOOLEAN NOT NULL
);

-- Notification table
CREATE TABLE Notification (
    idNotification SERIAL,
    topic VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    time TIMESTAMP NOT NULL,
    is_readed BOOLEAN NOT NULL,
    User_idUser INTEGER NOT NULL,
    PRIMARY KEY (idNotification, User_idUser),
    CONSTRAINT notification_unique UNIQUE (idNotification), -- Добавляем уникальное ограничение
    CONSTRAINT fk_Notification_User1
        FOREIGN KEY (User_idUser)
        REFERENCES User_Data (idUser)
);

-- Sourse_data_for_analysis table
CREATE TABLE Sourse_data_for_analysis (
    idSourse_data_for_analysis SERIAL PRIMARY KEY
);

-- Recommendation table
CREATE TABLE Recommendation (
    idRecommendation SERIAL PRIMARY KEY,
    relevannce_assessment DECIMAL(7,4) NOT NULL,
    time TIMESTAMP NOT NULL,
    context TEXT NOT NULL,
    is_accepted BOOLEAN NOT NULL,
    Notification_idNotification INTEGER NOT NULL,
    Sourse_data_for_analysis_idSourse_data_for_analysis INTEGER NOT NULL,
    CONSTRAINT fk_Recommendation_Notification1
        FOREIGN KEY (Notification_idNotification)
        REFERENCES Notification (idNotification), -- Теперь ссылаемся только на idNotification
    CONSTRAINT fk_Recommendation_Sourse_data_for_analysis1
        FOREIGN KEY (Sourse_data_for_analysis_idSourse_data_for_analysis)
        REFERENCES Sourse_data_for_analysis (idSourse_data_for_analysis)
);

-- Level table
CREATE TABLE level (
    idlevel SERIAL PRIMARY KEY,
    number INTEGER NOT NULL,
    subject_matter VARCHAR(45) NOT NULL,
    name VARCHAR(100) NOT NULL,
    difficulty DECIMAL(4,2) NOT NULL,
    prehistory TEXT NOT NULL,
    fact_in_conclusion TEXT NOT NULL,
    score_points INTEGER NOT NULL,
    user_rate DECIMAL(3,2) NOT NULL,
    is_completed BOOLEAN NOT NULL,
    Region_map_idRegion_map INTEGER NOT NULL,
    Recommendation_idRecommendation INTEGER,
    CONSTRAINT fk_level_Region_map1
        FOREIGN KEY (Region_map_idRegion_map)
        REFERENCES Region_map (idRegion_map),
    CONSTRAINT fk_level_Recommendation1
        FOREIGN KEY (Recommendation_idRecommendation)
        REFERENCES Recommendation (idRecommendation)
);

-- Puzzle table
CREATE TABLE Puzzle (
    idPuzzle SERIAL,
    type VARCHAR(45) NOT NULL,
    is_clue_used BOOLEAN NOT NULL,
    level_idlevel INTEGER NOT NULL,
    PRIMARY KEY (idPuzzle, level_idlevel),
    CONSTRAINT fk_Puzzle_level1
        FOREIGN KEY (level_idlevel)
        REFERENCES level (idlevel)
);

-- Additional_conditions table
CREATE TABLE Additional_conditions (
    idAdditional_conditions INTEGER,
    description TEXT NOT NULL,
    Puzzle_idPuzzle INTEGER NOT NULL,
    Puzzle_level_idlevel INTEGER NOT NULL,
    PRIMARY KEY (idAdditional_conditions, Puzzle_idPuzzle, Puzzle_level_idlevel),
    CONSTRAINT fk_Additional_conditions_Puzzle1
        FOREIGN KEY (Puzzle_idPuzzle, Puzzle_level_idlevel)
        REFERENCES Puzzle (idPuzzle, level_idlevel)
);

-- Options table
CREATE TABLE Options (
    idoptions INTEGER,
    description TEXT NOT NULL,
    Puzzle_idPuzzle INTEGER NOT NULL,
    Puzzle_level_idlevel INTEGER NOT NULL,
    PRIMARY KEY (idoptions, Puzzle_idPuzzle, Puzzle_level_idlevel),
    CONSTRAINT fk_Options_Puzzle1
        FOREIGN KEY (Puzzle_idPuzzle, Puzzle_level_idlevel)
        REFERENCES Puzzle (idPuzzle, level_idlevel)
);

-- Clues table
CREATE TABLE Clues (
    idClues INTEGER,
    text_of_clue TEXT NOT NULL,
    Puzzle_idPuzzle INTEGER NOT NULL,
    Puzzle_level_idlevel INTEGER NOT NULL,
    PRIMARY KEY (idClues, Puzzle_idPuzzle, Puzzle_level_idlevel),
    CONSTRAINT fk_Clues_Puzzle1
        FOREIGN KEY (Puzzle_idPuzzle, Puzzle_level_idlevel)
        REFERENCES Puzzle (idPuzzle, level_idlevel)
);

-- Rating_Friends table
CREATE TABLE Rating_Friends (
    idRating_Friends INTEGER PRIMARY KEY,
    rank_friends INTEGER NOT NULL,
    page INTEGER NOT NULL
);

-- Friend table
CREATE TABLE Friend (
    idFriend INTEGER PRIMARY KEY,
    status VARCHAR(1) NOT NULL CHECK (status IN ('0', '1', '2')),
    Rating_Friends_idRating_Friends INTEGER NOT NULL,
    CONSTRAINT fk_Friend_Rating_Friends1
        FOREIGN KEY (Rating_Friends_idRating_Friends)
        REFERENCES Rating_Friends (idRating_Friends)
);

-- Chat table
CREATE TABLE Chat (
    idChat SERIAL,
    last_time_of_message TIMESTAMP NOT NULL,
    Friend_idFriend INTEGER NOT NULL,
    PRIMARY KEY (idChat, Friend_idFriend),
    CONSTRAINT chat_unique UNIQUE (idChat),
    CONSTRAINT fk_Chat_Friend1
        FOREIGN KEY (Friend_idFriend)
        REFERENCES Friend (idFriend)
);

-- Message table
CREATE TABLE Message (
    idMessage SERIAL,
    text TEXT NOT NULL,
    foto BYTEA,
    time TIMESTAMP NOT NULL,
    Chat_idChat INTEGER NOT NULL,
    Notification_idNotification INTEGER NOT NULL,
    PRIMARY KEY (idMessage, Chat_idChat),
    CONSTRAINT fk_Message_Chat1
        FOREIGN KEY (Chat_idChat)
        REFERENCES Chat (idChat),
    CONSTRAINT fk_Message_Notification1
        FOREIGN KEY (Notification_idNotification)
        REFERENCES Notification (idNotification)
);

-- User_has_Achievement table
CREATE TABLE User_has_Achievement (
    User_idUser INTEGER NOT NULL,
    Achievement_idAchievement INTEGER NOT NULL,
    PRIMARY KEY (User_idUser, Achievement_idAchievement),
    CONSTRAINT fk_User_has_Achievement_User1
        FOREIGN KEY (User_idUser)
        REFERENCES User_Data (idUser),
    CONSTRAINT fk_User_has_Achievement_Achievement1
        FOREIGN KEY (Achievement_idAchievement)
        REFERENCES Achievement (idAchievement)
);

-- User_has_level table
CREATE TABLE User_has_level (
    User_idUser INTEGER NOT NULL,
    level_idlevel INTEGER NOT NULL,
    PRIMARY KEY (User_idUser, level_idlevel),
    CONSTRAINT fk_User_has_level_User1
        FOREIGN KEY (User_idUser)
        REFERENCES User_Data (idUser),
    CONSTRAINT fk_User_has_level_level1
        FOREIGN KEY (level_idlevel)
        REFERENCES level (idlevel)
);

-- Sourse_data_for_analysis_has_level table
CREATE TABLE Sourse_data_for_analysis_has_level (
    Sourse_data_for_analysis_idSourse_data_for_analysis INTEGER NOT NULL,
    level_idlevel INTEGER NOT NULL,
    PRIMARY KEY (Sourse_data_for_analysis_idSourse_data_for_analysis, level_idlevel),
    CONSTRAINT fk_Sourse_data_for_analysis_has_level_Sourse_data_for_analysis1
        FOREIGN KEY (Sourse_data_for_analysis_idSourse_data_for_analysis)
        REFERENCES Sourse_data_for_analysis (idSourse_data_for_analysis),
    CONSTRAINT fk_Sourse_data_for_analysis_has_level_level1
        FOREIGN KEY (level_idlevel)
        REFERENCES level (idlevel)
);

-- User_has_Notification table
CREATE TABLE User_has_Notification (
    User_idUser INTEGER NOT NULL,
    Notification_idNotification INTEGER NOT NULL,
    Notification_User_idUser INTEGER NOT NULL,
    PRIMARY KEY (User_idUser, Notification_idNotification, Notification_User_idUser),
    CONSTRAINT fk_User_has_Notification_User1
        FOREIGN KEY (User_idUser)
        REFERENCES User_Data (idUser),
    CONSTRAINT fk_User_has_Notification_Notification1
        FOREIGN KEY (Notification_idNotification)
        REFERENCES Notification (idNotification) -- Теперь ссылаемся только на idNotification
);

-- User_has_Friend table
CREATE TABLE User_has_Friend (
    User_idUser INTEGER NOT NULL,
    Friend_idFriend INTEGER NOT NULL,
    PRIMARY KEY (User_idUser, Friend_idFriend),
    CONSTRAINT fk_User_has_Friend_User1
        FOREIGN KEY (User_idUser)
        REFERENCES User_Data (idUser),
    CONSTRAINT fk_User_has_Friend_Friend1
        FOREIGN KEY (Friend_idFriend)
        REFERENCES Friend (idFriend)
);