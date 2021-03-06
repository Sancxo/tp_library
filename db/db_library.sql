-- MySQL Script generated by MySQL Workbench
-- Wed Feb 17 09:01:07 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tp_php
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `tp_php` ;

-- -----------------------------------------------------
-- Schema tp_php
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tp_php` DEFAULT CHARACTER SET utf8 ;
USE `tp_php` ;

-- -----------------------------------------------------
-- Table `tp_php`.`admin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tp_php`.`admin` ;

CREATE TABLE IF NOT EXISTS `tp_php`.`admin` (
  `username` VARCHAR(25) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tp_php`.`auteur`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tp_php`.`auteur` ;

CREATE TABLE IF NOT EXISTS `tp_php`.`auteur` (
  `id_auteur` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NOT NULL,
  `prenom` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_auteur`),
  UNIQUE INDEX `id_auteur_UNIQUE` (`id_auteur` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tp_php`.`ecrit`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tp_php`.`ecrit` ;

CREATE TABLE IF NOT EXISTS `tp_php`.`ecrit` (
  `auteur_id_auteur` INT NOT NULL,
  `livres_id_livres` INT NOT NULL,
  PRIMARY KEY (`auteur_id_auteur`, `livres_id_livres`),
  INDEX `fk_ecrit_livres1_idx` (`livres_id_livres` ASC),
  CONSTRAINT `fk_ecrit_auteur`
    FOREIGN KEY (`auteur_id_auteur`)
    REFERENCES `tp_php`.`auteur` (`id_auteur`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ecrit_livres1`
    FOREIGN KEY (`livres_id_livres`)
    REFERENCES `tp_php`.`livres` (`id_livres`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tp_php`.`genre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tp_php`.`genre` ;

CREATE TABLE IF NOT EXISTS `tp_php`.`genre` (
  `id_genre` INT NOT NULL AUTO_INCREMENT,
  `libelle` VARCHAR(45) NOT NULL,
  `genre_description` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id_genre`),
  UNIQUE INDEX `id_genre_UNIQUE` (`id_genre` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tp_php`.`livres`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tp_php`.`livres` ;

CREATE TABLE IF NOT EXISTS `tp_php`.`livres` (
  `id_livres` INT NOT NULL AUTO_INCREMENT,
  `titre` VARCHAR(45) NOT NULL,
  `livres_description` MEDIUMTEXT NULL DEFAULT NULL,
  `image` BLOB NULL DEFAULT NULL,
  PRIMARY KEY (`id_livres`),
  UNIQUE INDEX `id_livres_UNIQUE` (`id_livres` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tp_php`.`possede`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tp_php`.`possede` ;

CREATE TABLE IF NOT EXISTS `tp_php`.`possede` (
  `livres_id_livres` INT NOT NULL,
  `genre_id_genre` INT NOT NULL,
  PRIMARY KEY (`livres_id_livres`, `genre_id_genre`),
  INDEX `fk_possede_genre1_idx` (`genre_id_genre` ASC),
  CONSTRAINT `fk_possede_livres1`
    FOREIGN KEY (`livres_id_livres`)
    REFERENCES `tp_php`.`livres` (`id_livres`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_possede_genre1`
    FOREIGN KEY (`genre_id_genre`)
    REFERENCES `tp_php`.`genre` (`id_genre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
