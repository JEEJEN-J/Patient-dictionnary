CREATE TABLE IF NOT EXISTS Calculate(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  status TEXT,
  numberOfDays INTEGER,
  lastDate TEXT,
  nextDate TEXT
);

CREATE TABLE IF NOT EXISTS Ordonnance(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  valueOrdn INTEGER,
  lastDate TEXT,
  nextDate TEXT
);

CREATE TABLE IF NOT EXISTS account(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profil TEXT,
  username TEXT,
  pssword TEXT,
  createdDate TEXT,
  editedDate TEXT
);

-- INSERT or IGNORE INTO Calculate(id, numberOfDays, lastDate, nextDate) VALUES (1, 867, '2022-07-21T16:51:08.681Z', '2022-07-21T16:51:08.681Z');

-- profil (PIN Calculatrice)
-- profil generic
-- date prevoir pour les rendez-vous
-- alert de la date donnees
-- tuto

-- a venir dans d''autre version
-- Mappage des sites les plus proches
-- Reaction corporelle
-- statistique du patient

