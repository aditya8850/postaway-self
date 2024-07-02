# PostAway-Self

PostAway-Self is a social media application built using Node.js and Express, with a MongoDB database for data storage. The application supports user authentication, posting, commenting, liking, and managing friendships.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (signup, login, password reset)
- Create, read, update, and delete posts
- Comment on posts
- Like and unlike posts
- Manage friendships (send, accept, reject friend requests)
- OTP verification for certain actions
- File uploads for user profile pictures and posts

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/postaway-self.git
   cd postaway-self

   ```


2. Install dependencies:
   ```bash
   npm install
   ```


3. Set up environment variables:
   Create a .env file in the root directory and add the following variables:
    ```bash
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email@gmail.com
    EMAIL_PASS=your_email_password

   ```   


4. Start the server
    ```bash
    nodemon server.js
    ```


## Usage

Once the server is running, you can interact with the API using tools like Postman or via a frontend application.

## API Endpoints
1. POST /auth/signup: User signup
2. POST /auth/login: User login
3. POST /auth/reset-password: Reset password