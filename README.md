# 🌐 Personal Web Portfolio

A modern and responsive personal portfolio website built using PHP, HTML, CSS, and JavaScript.

This website showcases personal information, skills, projects, and provides a contact form for visitors to get in touch. The interface is designed with a clean layout, smooth animations, and a fully responsive user experience across all devices.

---

## ✨ Features

- 🏠 Home / Landing Page
- 👤 About Me Section
- 💻 Skills Showcase
- 📂 Projects Portfolio
- 📞 Contact Form
- 🎨 Modern UI Design
- ⚡ Smooth Animations
- 📱 Fully Responsive Layout
- 🌙 Clean User Experience

---

## 🛠️ Tech Stack

- PHP (Native)
- MySQL
- HTML5
- CSS3
- JavaScript
- Bootstrap
- Laragon
- HeidiSQL

---

## 📁 Project Structure

```text
Portfolio/
│
├── index.php
├── about.php
├── projects.php
├── contact.php
├── config.php
├── style.css
├── script.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── uploads/
│
├── database/
│   └── portfolio.sql
│
└── README.md
```

---

## 🚀 Installation & Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/syifarizkaangeli/Portfolio-Basic-CRUD.git
```

Or download the ZIP file and extract it into:

```text
C:\laragon\www\
```

---

### 2. Create Database

Open:

```text
http://localhost/phpmyadmin
```

Create a database named:

```text
portfolio
```

Import the SQL file if available.

Example table structure:

```sql
CREATE TABLE IF NOT EXISTS kontak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pesan TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 3. Run the Project

Start:

- Apache
- MySQL

Then open:

```text
http://localhost/Portfolio/
```

---

## 📄 Main Sections

### 🏠 Home

Displays:

- Introduction
- Personal branding
- Call-to-action buttons

### 👤 About

Displays:

- Personal profile
- Background information
- Career objectives

### 💻 Skills

Displays:

- Technical skills
- Tools and technologies

### 📂 Projects

Displays:

- Portfolio projects
- Project descriptions
- Technologies used

### 📞 Contact

Displays:

- Contact form
- Visitor message submission

---

## 🗄️ Database

Database:

```text
portfolio
```

Example Table:

```text
kontak
```

| Column | Description |
|----------|------------|
| id | Message ID |
| nama | Sender Name |
| email | Sender Email |
| pesan | Message Content |
| created_at | Created Date |

---

## 🔐 Security

This project implements:

- PDO Prepared Statements
- Form Validation
- Input Sanitization
- Output Escaping

These practices help reduce risks such as:

- SQL Injection
- Cross-Site Scripting (XSS)
- Invalid User Input

---

## 📱 Responsive Design

Optimized for:

- Desktop
- Laptop
- Tablet
- Mobile Devices

Features:

- Responsive navigation bar
- Flexible layouts
- Mobile-friendly interface

---

## 📸 Preview

You can test responsiveness using your browser:

1. Right Click → Inspect
2. Toggle Device Toolbar (`Ctrl + Shift + M`)
3. Select a mobile device size

---

## 📄 License

This project was created for learning, portfolio, and web development practice purposes.

Feel free to use, modify, and improve it for personal or educational projects.

### .gitignore

```gitignore
*.log
.DS_Store
Thumbs.db
.idea/
.vscode/
```
