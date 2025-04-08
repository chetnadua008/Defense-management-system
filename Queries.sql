CREATE TABLE Soldier (
    soldier_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    rank INT NOT NULL,
    role VARCHAR(50) NOT NULL,
    dob DATE NOT NULL
);
CREATE TABLE Squad (
    squad_id INT AUTO_INCREMENT PRIMARY KEY,
    squad_name VARCHAR(100) NOT NULL,
    squad_details VARCHAR(255)
);
CREATE TABLE Equipment (
    equipment_id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    quality_assurance_check DATE
);
CREATE TABLE Squad_Soldier (
    squad_id INT NOT NULL,
    soldier_id INT NOT NULL,
    PRIMARY KEY (squad_id, soldier_id),
    FOREIGN KEY (squad_id) REFERENCES Squad(squad_id) ON DELETE CASCADE,
    FOREIGN KEY (soldier_id) REFERENCES Soldier(soldier_id) ON DELETE CASCADE
);
CREATE TABLE Equipment_Squad (
    equipment_id INT NOT NULL,
    squad_id INT NOT NULL,
    PRIMARY KEY (equipment_id, squad_id),
    FOREIGN KEY (equipment_id) REFERENCES Equipment(equipment_id) ON DELETE CASCADE,
    FOREIGN KEY (squad_id) REFERENCES Squad(squad_id) ON DELETE CASCADE
);
CREATE TABLE Equipment_Soldier (
    equipment_id INT NOT NULL,
    soldier_id INT NOT NULL,
    issue_date DATE NOT NULL,
    equipment_count INT NOT NULL,
    PRIMARY KEY (equipment_id, soldier_id),
    FOREIGN KEY (equipment_id) REFERENCES Equipment(equipment_id) ON DELETE CASCADE,
    FOREIGN KEY (soldier_id) REFERENCES Soldier(soldier_id) ON DELETE CASCADE
);


/* taking sample data within 6 tables */
INSERT INTO Soldier (name, rank, role, dob) VALUES
('John Doe', 5, 'Infantry', '1990-03-15'),
('Jane Smith', 3, 'Medic', '1992-07-22'),
('Robert Brown', 7, 'Sniper', '1988-11-10'),
('Emily Davis', 4, 'Engineer', '1995-05-18');

INSERT INTO Squad (squad_name, squad_details) VALUES
('Alpha Squad', 'Frontline assault team'),
('Bravo Squad', 'Support and logistics team'),
('Charlie Squad', 'Recon and sniping team');

INSERT INTO Equipment (category, model, quality_assurance_check) VALUES
('Weapon', 'Rifle-X1', '2023-01-10'),
('Medical', 'FirstAid-Kit', '2023-02-15'),
('Communication', 'Radio-Comm', '2023-03-05'),
('Explosive', 'C4-Charge', '2023-04-20');

INSERT INTO Squad_Soldier (squad_id, soldier_id) VALUES
(1, 1),  -- John Doe belongs to Alpha Squad
(1, 3),  -- Robert Brown belongs to Alpha Squad
(2, 2),  -- Jane Smith belongs to Bravo Squad
(3, 4);  -- Emily Davis belongs to Charlie Squad

INSERT INTO Equipment_Squad (equipment_id, squad_id) VALUES
(1, 1),  -- Rifle-X1 assigned to Alpha Squad
(2, 2),  -- FirstAid-Kit assigned to Bravo Squad
(3, 3),  -- Radio-Comm assigned to Charlie Squad
(4, 1);  -- C4-Charge assigned to Alpha Squad

INSERT INTO Equipment_Soldier (equipment_id, soldier_id, issue_date, equipment_count) VALUES
(1, 1, '2023-05-01', 1),  -- Rifle-X1 issued to John Doe
(2, 2, '2023-05-02', 2),  -- FirstAid-Kit issued to Jane Smith
(3, 3, '2023-05-03', 1),  -- Radio-Comm issued to Robert Brown
(4, 4, '2023-05-04', 3);  -- C4-Charge issued to Emily Davis

