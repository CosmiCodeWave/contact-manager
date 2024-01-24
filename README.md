Contact Manager App

Overview
The Contact Manager App is a web application designed to help users manage their contacts efficiently. It provides a secure and user-friendly environment for performing CRUD operations on contacts, ensuring that users can only interact with their own set of contacts. The application incorporates user authentication, allowing individuals to register, log in, and maintain a personalized list of contacts.

Key Features
User Authentication: Robust user authentication system with registration, login, and access token generation.
Contact Operations: Perform Create, Read, Update, and Delete operations on contacts.
Authorization: Users are restricted to managing only their own contacts, ensuring data privacy.
Protected Routes: Certain routes are protected and require a valid JWT token for access.
Middleware for Error Handling: Express-async-handler is used to streamline asynchronous operations and handle errors efficiently.
Validate JWT Token: Middleware is implemented to validate JWT tokens for secure user sessions.
Expressive API: Well-defined API endpoints for seamless integration with frontend applications.

Technologies Used
Node.js and Express: Backend server and API development.
MongoDB: NoSQL database for storing contact information.
Mongoose: MongoDB object modeling for Node.js.
Express-async-handler: Streamlining asynchronous operations in Express.
Bcrypt: Securely hash passwords for user authentication.
JSON Web Token (JWT): Generate and validate access tokens for secure user sessions.
npm: Package management for Node.js.
Installation and Usage
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/contact-manager-app.git

Install dependencies:
bash
Copy code
npm install

Set up environment variables:
Create a .env file based on the .env.example template.
Update the values with your configuration.
Run the server:

bash
Copy code
npm start
Access the application at http://localhost:3000.

API Endpoints
Contacts
GET /api/contacts: Retrieve all contacts.
POST /api/contacts: Create a new contact.
GET /api/contacts/:id: Retrieve a specific contact.
PUT /api/contacts/:id: Update a contact.
DELETE /api/contacts/:id: Delete a contact.

Users
POST /api/users/register: Register a new user.
POST /api/users/login: Log in and obtain an access token.
POST /api/users/current: Retrieve information about the current user.
Authentication
User authentication is implemented using JWT, ensuring secure and authenticated user sessions. Protected routes and middleware for error handling provide an additional layer of security.

Contributing
Contributions are welcome! Feel free to submit issues, feature requests, or pull requests.

License
This project is licensed under the MIT License.


