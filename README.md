
# Tasty-Tales

## Overview
The **Food Blog Platform** is a web application that allows food enthusiasts to share and explore delicious recipes. The platform provides a seamless experience for users to browse food blogs, view recipe details, leave comments, and engage with posts through likes and saves.

This project is built using **Next.js** for the frontend, **Node.js & Express** for the backend, and **MySQL** as the database. The application ensures a dynamic and user-friendly interface with **Bootstrap** for styling and **React Bootstrap Icons** for interactive elements.

## Tech Stack

**. Frontend:** Next.js, React-Bootstrap


**. Backend:** Node.js and Express.js for API and business logic.

**. Database:** MySQL.

### Key Features

**. Blog Creation:** Add new blogs with a title and description.


**. Blog Viewing:** Display a list of all blogs, with options to view individual blog details.

**. Blog Updates:** Modify blog information, including title, description, and status.

**. Blog Deletion:** Remove blogs from the system when no longer needed.


## Getting Started

To run the project locally, follow these steps:

### Frontend Setup

1. Clone the repository:
    ```bash
    git clone git@github.com:dinshasivan/blog_app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd client
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the project:
    ```bash
    npm run dev
    ```

### MySQL Setup
### Install MySQL

1. Install MySQL on your system. 
2. Open MySQL Workbench or use the MySQL CLI.
3. Start MySQL
   ```bash
   mysql -u root -p
   ```

### Create Database & Tables
```bash
CREATE DATABASE your-database-name;

USE your-database-name;

-- Create the users table
CREATE TABLE your-table-name(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the blogs table
CREATE TABLE your-table-name (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    media VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);
```
### Demo Video
https://youtu.be/4TROpoqdCGI





