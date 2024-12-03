# Blog Management System

Welcome to **the Blog Management System**, This system allow you to create, edit, delete, and publish blog posts effortlessly, while automatically show your published posts to the public and manage your content efficientl

## Overview

In the realm of Blog Management Systems, users can efficiently oversee their blog posts. This system allows for the creation, editing, deletion, and publication of posts, ensuring a seamless experience for both administrators and readers.

Each blog **post** should include the following attributes:
Title
Content
Publish Date (optional)

## Features

The project includes the following functionalities:

1.  **post** :

- Add a new post.
- Edit an existing post: Modify the title, content, or publish date of a selected post.
- Delete a post: Remove a blog post from the system completely.
- Mark a post as "published": Set the post status to published for visibility on the public page.

2. **Public Page**:

- The public page will display only the posts that are marked as published.
- Posts will be ordered by their publish date, with the newest entries appearing first.

3. **Admin**:

- An admin interface is required to manage all posts.

4. **Search Functionality**:

- Include a search bar that allows users to filter posts by title, enabling quick access to specific content.

5. **User Registration**:

   - Users should be able to create a new account by providing the following information:
     firstname
     lastname
     Email Address
     Password

6. **User Login**:

   - Users should be able to log in using their:
     Email Address
     Password

## API Endpoints

The REST API for the the Blog Management project supports the following operations:

- **POST /post/add**: Add a new post.
- **PUT /post/update**: update an old post.
- **DELETE /post/delete**: delete an old post.
- **PUT /post/publish**: publish post.
- **GET /post/get**: get all post "admin".
- **GET /post/**: get all published post.
- **GET /post/**: get all published post.
- **GET /post/search**: search for post.
- **POST /user/register**: user register.
- **POST /user/login**: user login.

## Environment Variables

Create `.env` file in the main folder and add the following

```
PORT= 5000
MONGO_URI= your mongodb uri
NODE_ENV= development
JWT_SECRET= your secret key

```

## Getting Started

### Prerequisites

To run the project locally, you'll need:

- Node.js
- A database (mongodb)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sanna-Ali/Blog-Management-System.git

   ```

2. Install dependencies:
   cd Blog Management System
   npm install

3. Run the server:
   npm start

4. The server should now be running on http://localhost:5000 .
