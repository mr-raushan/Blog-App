# 📝 MERN Stack Blog App

This is a **fully responsive** blog application built using the **MERN stack**. The app allows users to create, read, update, and delete blog posts with a clean and modern UI.

## 🚀 Tech Stack

### Frontend:

- **React** – Component-based UI for smooth rendering.
- **Context API** – For efficient state management.
- **Tailwind CSS** – Provides a modern and responsive UI.
- **Axios** – Used for handling API requests efficiently.

### Backend:

- **Node.js & Express.js** – Server-side framework for handling API requests.
- **MongoDB** – NoSQL database to store blog data.
- **Mongoose** – ODM for MongoDB to simplify data operations.

## ✨ Features

✅ **CRUD Functionality**  
Users can Create, Read, Update, and Delete blog posts.

✅ **Responsive Design**  
Fully optimized for different screen sizes using Tailwind CSS.

✅ **State Management**  
Context API for smooth data flow across components.

✅ **Fast & Efficient Data Fetching**  
Axios ensures quick API interactions.

✅ **Scalable MERN Architecture**  
Built for flexibility and performance.

✅ **Contact Form with Web3Forms API**  
Users can fill out a contact form, and their data is sent to **Web3Forms**, allowing the owner to receive user inquiries directly via email.

## 📂 Project Setup

Follow these steps to run the project on your local machine:

### 1️⃣ Clone the Repository

```sh
 git clone https://github.com/yourusername/your-repo-name.git
 cd your-repo-name
```

### 2️⃣ Install Dependencies

#### Frontend:

```sh
 cd client
 npm install
```

#### Backend:

```sh
 cd server
 npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file inside the `server` directory and add your MongoDB connection string and other necessary configurations:

```env
MONGO_URI=your_mongodb_connection_string
PORT=4001

```

### 4️⃣ Run the Application

#### Start Backend:

```sh
 cd server
 npm start
```

#### Start Frontend:

```sh
 cd client
 npm start
```

### 5️⃣ Open in Browser

Go to [http://localhost:5173](http://localhost:5173) to view the application.

## 📌 Folder Structure

```
mern-blog-app/
│-- client/   # React frontend
│-- server/   # Node.js backend
│-- .gitignore
│-- package.json
│-- README.md
```
