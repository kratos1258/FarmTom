Authentication Design

Our authentication flow will look like this:

Register

↓

Hash Password

↓

Save User

↓

Generate Verification Token (later)

↓

User Verifies Email

↓

Login

↓

Generate Access Token

↓

Generate Refresh Token

↓

Protected Routes
JWT Strategy

We'll use two tokens.

Access Token
Short-lived (e.g., 15 minutes)

Contains:

userId
role
Refresh Token
Long-lived (e.g., 7 days)

Used to get a new access token without logging in again.

We'll store refresh tokens securely and support logout by invalidating them.

Folder Structure for Authentication
src/

controllers/
    auth.controller.js

services/
    auth.service.js

repositories/
    auth.repository.js

models/
    User.js

routes/
    auth.routes.js

validators/
    auth.validator.js

middlewares/
    auth.middleware.js
    role.middleware.js
API Endpoints

Let's define them before coding.

Method	Endpoint	Description
POST	/api/v1/auth/register	Register a new user
POST	/api/v1/auth/login	Login
POST	/api/v1/auth/refresh-token	Refresh JWT
POST	/api/v1/auth/forgot-password	Send reset link/code
POST	/api/v1/auth/reset-password	Reset password
POST	/api/v1/auth/logout	Logout
GET	/api/v1/auth/me	Get current user

Notice the /api/v1 prefix. Versioning from day one makes future API changes much easier.

Our First Database Collection

We'll start with Users.

Not:

Tomato Batches
Orders
Payments

Everything else depends on having authenticated users first.

🎯 Before We Write Code

I want us to make one more architectural decision, because it's important for the rest of the project.

Should we use a role field or a roles array?
Option A — Single Role
role: "farmer"

Simple and works well if each user can only ever have one role.

Option B — Multiple Roles
roles: ["farmer", "buyer"]

This allows one account to act as both a farmer and a buyer, or an admin with another role.

My recommendation

For this project, I recommend using a roles array, even if users initially receive only one role.

Example:

roles: ["farmer"]

Why?

It gives us flexibility without making authentication more complex.
If the product evolves (e.g., a farmer also wants to buy tomatoes), we won't need to redesign the database.
Authorization middleware can simply check whether the required role exists in the array.

It's a small design choice now that can save significant refactoring later.

Next Session: Our First Mongoose Model

We'll build the User model together and discuss:

Schema design
Required vs optional fields
Enum validation for roles
Password hashing
Schema methods
Indexes
Timestamps
Security considerations

This will be the first real piece of our application's domain model, and we'll build it to production standards.