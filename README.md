#MovieAPI

This is a simple RESTful API built with Node.js and Express to manage a list of movies using MySQL.



#Features

- Add new movies
- Get all movies
- Update movie by ID
- Delete movie by ID


#Tech Stack

- Node.js
- Express.js
- MySQL
- Postman (for testing)


#Getting Started

# 1. Clone the repo:
git clone https://github.com/PradnyaBhosale0302/MovieAPI.git
cd MovieAPI


# 2. Install dependencies:
npm install

# 3. Start the server:
node index.js

### 4. Use Postman to test the API endpoints.


#Database Setup

Create a MySQL database (e.g., `moviesdb`) and run the following SQL to create the table:

CREATE TABLE movies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  year INT
);

