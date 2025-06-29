# 🍽️ Recipe Generator Website

A full-stack Recipe Generator web application built with **HTML, CSS, JavaScript, Express.js**, and **MongoDB**. Users can explore recipes, register/login, and save their favorite dishes to a wishlist using a RESTful API.

---

## 📁 Project Structure
RECIPE-GENERATOR/  
├── models/ # Mongoose schema definitions  
│ └── user.js  
│  
├── public/ # Static frontend assets  
│ ├── about.html  
│ ├── about.css  
│ ├── home.js  
│ ├── login.html  
│ ├── login.css  
│ ├── login.js  
│ ├── register.html  
│ ├── style.css  
│ └── index.html  
│  
├── recipe-api/ # Recipe-related API and UI  
│ ├── index.html  
│ ├── script.js  
│ ├── style2.css  
│ ├── style3.css  
│ ├── wishlist.html  
│ └── food.jpeg  
│  
├── server.js # Main Express server  
├── package.json # Project metadata & dependencies  
├── package-lock.json  
└── .gitattributes  

  
---  

## 🚀 Features

- 🔐 **User Authentication**: Register and login functionality using MongoDB
- 🍲 **Recipe API**: RESTful interface to get recipe data
- 📄 **Frontend Pages**: Home, Login, About, Wishlist, etc.
- 💾 **Save Favorites**: Add and manage recipes in a wishlist
- 🎨 **Clean UI**: Responsive design with HTML and CSS

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB using Mongoose
- **API**: REST API to handle recipes and user data

---

## ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/recipe-generator.git
   cd recipe-generator  
2. Install Node.js Dependencies  
   npm install  
3. Set Up MongoDB  
   Set Up MongoDB  
   Option A: Run MongoDB locally  
   Option B: Use MongoDB Atlas (recommended for production)  

  Create a .env file in the root directory and add your MongoDB connection string:  
  MONGO_URI=mongodb://localhost:27017/recipe_generator  
  PORT=3000  
4.Start the Server  
  node server.js  
5.Visit the App in Your Browser  
  http://localhost:3000  



🚀 Deployment  
This project is deployed on Render.  

🔗 Live Site: https://recipe-generartor.onrender.com  

To deploy your own version:  

1.Push your code to a GitHub repository.  
2.Go to https://render.com  
3.Create a new Web Service.  
4.Connect your GitHub repo and set the following:  
5.Build Command: npm install  
6.Start Command: node server.js  
7.Environment Variables: Add your MONGO_URI  
8.Deploy and wait for the build to complete!  

## 📸 Screenshots  

![Screenshot 2025-06-30 003535](https://github.com/user-attachments/assets/6df8092a-a0be-4e04-b449-4f6feb461a91)
![Screenshot 2025-06-30 005018](https://github.com/user-attachments/assets/66a76d1b-e909-4e92-a29c-116d94d3b619)



