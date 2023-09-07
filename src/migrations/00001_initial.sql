CREATE TABLE IF NOT EXISTS ingredients (
  name VARCHAR(256) PRIMARY KEY NOT NULL,
  description VARCHAR(1024),
  availableFrom SMALLINT,
  availableUntil SMALLINT
);
