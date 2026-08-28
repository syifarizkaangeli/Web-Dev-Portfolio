CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    token TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS kontak (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    email TEXT NOT NULL,
    pesan TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS hire (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    email TEXT NOT NULL,
    project TEXT NOT NULL,
    pesan TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    technology TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO projects
(title, description, technology)
VALUES
(
    'Portfolio Website',
    'Website portfolio personal modern dan responsive.',
    'HTML, CSS, JavaScript'
);


INSERT INTO projects
(title, description, technology)
VALUES
(
    'Cashier System',
    'Sistem kasir berbasis web.',
    'JavaScript, Cloudflare Workers, D1'
);