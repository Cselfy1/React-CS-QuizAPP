# React-CSharp Quiz Application

## Project Overview

This project is a full-stack quiz application built with a **React** frontend and a **C# ASP.NET Core** backend API. The application allows users to register, login, and take quizzes by selecting answers to questions fetched from the backend. The backend evaluates the answers and returns quiz results.

## Features

- **User Authentication**  
  - Registration with username and password  
  - Login with credential validation  

- **Quiz Functionality**  
  - Fetch quizzes by category from backend API  
  - Multi-question quizzes with multiple-choice answers (single or multiple correct options)  
  - Interactive UI with progress bar and answer selection  
  - Submit answers to backend for scoring  
  - Display quiz results with correct/incorrect counts and detailed feedback  

- **Modern Frontend**  
  - React with TypeScript  
  - Responsive design with dark theme styling  
  - Smooth animations and user-friendly interactions  

- **Backend API**  
  - Built with ASP.NET Core  
  - User and quiz data management  
  - REST endpoints for authentication and quiz operations  

## Project Structure
/client # React frontend application
/server # ASP.NET Core backend API

## Technologies Used

- Frontend: React, TypeScript, CSS-in-JS, Fetch API  
- Backend: C#, ASP.NET Core Web API  
- Tools: Git, Visual Studio / VS Code  

## Getting Started

### Prerequisites

- Node.js and npm (for frontend)  
- .NET 6 or higher SDK (for backend)  

### Running the Application

1. **Backend**  
   - Navigate to `/server` folder  
   - Run `dotnet run` to start the API server (default port 7091)  

2. **Frontend**  
   - Navigate to `/client` folder  
   - Run `npm install` to install dependencies  
   - Run `npm run dev` or `npm start` to launch the React app  

## API Endpoints

- `POST /api/Auth/register` — Register a new user  
- `POST /api/Auth/login` — Login user  
- `GET /api/Quiz/category/{categoryName}` — Get quiz questions by category  
- `POST /api/Quiz/submit` — Submit user answers and get results  

## Screenshots

*(Add screenshots of Login, Quiz, and Result pages here)*

## License

This project is licensed under the MIT License.
