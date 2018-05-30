
DROP DATABASE IF EXISTS dreams_db;
cREATE DATABASE dreams_db;
USE dreams_db;

CREATE TABLE user_Info (
    id INT AUTO_INCREMENT NOT NULL,
    fullName VARCHAR(50),
    email VARCHAR(50),
    userName VARCHAR(50),
    userPassword VARCHAR(50),

    PRIMARY KEY (id)
);

CREATE TABLE dreams_info (
    id INT AUTO_INCREMENT NOT NULL
    
);
