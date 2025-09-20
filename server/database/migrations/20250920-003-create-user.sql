CREATE TABLE IF NOT EXISTS users (
    id TEXT UNIQUE, 
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    validatedAt TIMESTAMP,
    phone TEXT PRIMARY KEY NOT NULL UNIQUE,
    password TEXT,
    username TEXT, 
    features TEXT
);