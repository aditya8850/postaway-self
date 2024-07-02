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
1.  `Auth`
2.  `User`
3.  `Posts`
4.  `Comments`
5.  `Likes`
6.  `OTP`
7.  `Frienships`

## Configuration
#### Configuration for the application can be set in the .env file. Ensure you have all the necessary environment variables defined as mentioned in the Installation section.

## Folder Structure
```bash
postaway-self/
│
├── .env
├── .gitignore
├── env.js
├── package.json
├── package-lock.json
├── server.js
├── src/
│   ├── config/
│   │   └── mongoose.js
│   ├── error-handler/
│   │   └── errorHandler.js
│   ├── features/
│   │   ├── comment/
│   │   │   ├── comment.controller.js
│   │   │   ├── comment.repo.js
│   │   │   ├── comment.router.js
│   │   │   └── comment.schema.js
│   │   ├── friendship/
│   │   │   ├── friend.controller.js
│   │   │   ├── friend.repo.js
│   │   │   ├── friend.router.js
│   │   │   └── friend.schema.js
│   │   ├── like/
│   │   │   ├── like.controller.js
│   │   │   ├── like.repo.js
│   │   │   ├── like.router.js
│   │   │   └── like.schema.js
│   │   ├── otp/
│   │   │   ├── otp.controller.js
│   │   │   ├── otp.repo.js
│   │   │   ├── otp.router.js
│   │   │   └── otp.schema.js
│   │   ├── post/
│   │   │   ├── post.controller.js
│   │   │   ├── post.repo.js
│   │   │   ├── post.router.js
│   │   │   └── post.schema.js
│   │   └── user/
│   │       ├── user.controller.js
│   │       ├── user.repo.js
│   │       ├── user.route.js
│   │       └── userSchema.js
│   ├── middlewares/
│   │   ├── jwt.config.js
│   │   └── multer.config.js
│   └── uploads/
│       └── <uploaded files>
└── README.md
```

## License
This project is licensed under the MIT License.
