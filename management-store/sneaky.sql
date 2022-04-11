CREATE DATABASE IF NOT EXISTS Final_Project;

CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  account_type ENUM('Reader', 'Owner', 'Operator') NOT NULL,
  PRIMARY KEY (id)
);