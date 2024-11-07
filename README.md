# Question Paper Generator

This is a web application built with React and Express that allows users to generate a custom question paper based on specified criteria such as total marks and percentage distribution for easy, medium, and hard difficulty levels. The application utilizes a server hosted on [https://papergeneratorbackend.onrender.com/](https://papergeneratorbackend.onrender.com/) to fetch and process questions from a JSON file and returns a generated question paper to the user.

## Live Demo

You can access the live demo of the Question Paper Generator [here](https://mocktestgenerator.netlify.app/).

## Getting Started

To run this application locally, follow the steps below:

1. Clone the repository and:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the application:

   ```bash
   npm start
   ```

   This will start the React development server.

5. Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the application.

## Server Setup

The server is implemented using Express and is hosted on [https://papergeneratorbackend.onrender.com/](https://papergeneratorbackend.onrender.com/). It exposes a single endpoint (`/generate-paper`) for generating question papers based on the provided criteria.

## How to Use

1. Enter the total marks for the question paper.
2. Specify the percentage distribution for easy, medium, and hard difficulty levels.
3. Click the "Generate Paper" button to initiate the process.
4. The generated question paper will be displayed, showing questions with details such as question text, subject, topic, difficulty, and marks.

## File Structure

- `src/App.js`: React component for the frontend application.
- `server.js`: Express server implementation for generating question papers.
- `question_paper.json`: JSON file containing a pool of questions.

## Dependencies

- React: Frontend library for building user interfaces.
- Express: Backend framework for building web applications.
- cors: Middleware for enabling Cross-Origin Resource Sharing.
- fs: Node.js module for working with the file system.

## Acknowledgments

This project is inspired by the need for a flexible and customizable question paper generation tool. It can be extended and customized further to suit specific requirements.

Feel free to explore, modify, and contribute to make it even more powerful and user-friendly. If you have any suggestions or issues, please open an [issue](<link-to-issues>) or submit a [pull request](<link-to-pull-requests>).

Happy generating! 🚀
