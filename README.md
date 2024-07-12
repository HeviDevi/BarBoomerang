# BarBoomerang

BarBoomerang is a scalable, easy-to-use social media platform designed to allow users to share thoughts on the hospitality industry and react to other user's thoughts while building a network of friends in the app.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)

## Installation

To get BarBoomerang up and running, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies with `npm install`.
3. Set up your MongoDB database and update the `.env` file with your database URI.
5. Start the server by running `node server.js` in the command line. Your application should now be running on `localhost:3000`.

## Usage

Use tools like Insomnia Core or Postman to interact with the API.
I will provide examples of what the JSON body should look like for each request.

- **Users:**
  - To create a new user: `POST /api/users`
    - // Ensure the request body looks like this
    - `{ "username": "intended username", "email": "intended email",} `
  - To view all users: `GET /api/users`
  - To view a single user by ID: `GET /api/users/:id`
  - To update a user's information: `PUT /api/users/:id`
  - To delete a user: `DELETE /api/users/:id`
  - To add a friend to a user: `PUT /api/users/:userID/friends/:friendID`
  - To remove a friend from a user: `DELETE /api/users/:userID/friends/:friendID`

- **Thoughts:**
  - To create a new thought for a user: `POST /api/thoughts/:id`
    - Include the thought text in the request body and the user ID in the URL.
    - Ensure the request body looks like this & include the user ID in the URL as a parameter of the request
    - `{"thoughtText": "intended thought text"}`
  - To view all thoughts: `GET /api/thoughts`
  - To view a single thought by ID: `GET /api/thoughts/:id`
  - To update a thought by ID: `PUT /api/thoughts/:id`
    - Include the updated thought text in the request body.
  - To delete a thought by ID: `DELETE /api/thoughts/:id`
    - This also removes the thought from the user's thought array.

- **Reactions:**
  - To add a reaction to a thought: `POST /api/thoughts/:ThoughtId/reactions/:userId`
    - Include the reaction text in the request body, the thought ID in the URL, and the user ID as a parameter.
    -`{"reactionText": "intended reaction text"}`
  - To delete a reaction from a thought: `DELETE /api/thoughts/:ThoughtId/reactions/:reactionId`
    - Specify the thought ID and the reaction ID in the URL.

## Credits

This project was developed by Devon "HeviDevi" Ross

## Features

- RESTful API for managing users, thoughts, and reactions.
- Seamless integration with MongoDB for robust data management.
- Scalable architecture suitable for social platforms of any size.