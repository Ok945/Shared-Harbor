## Campus Marketplace - README

Welcome to the Campus Marketplace project! This platform enables college students to buy, sell, and trade second-hand items, fostering sustainability through the reuse of goods.

### Getting Started

To run this project locally, follow these steps:

1. **Clone the Repository:**
   ```
   git clone https://github.com/Ok945/Shared-Harbor.git
   ```

2. **Install Dependencies:**
   - Open a terminal or command prompt.
   - Navigate to the project's root directory:
     ```
     cd Shared-Harbor
     ```
   - Install backend dependencies:
     ```
     npm install
     ```
   - Navigate to the React app directory:
     ```
     cd react-app
     ```
   - Install frontend dependencies:
     ```
     npm install
     ```

3. **Setup Environment Variables:**
   - Create a `.env` file in the project's root directory (`campus-marketplace`).
   - Add necessary environment variables:
     ```
     PORT=3000
     URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     MODE_ENV=developement
     ```

4. **Run the Backend:**
   - Return to the project's root directory if not already there:
     ```
     cd ..
     ```
   - Start the backend server:
     ```
     npm run server
     ```

5. **Run the Frontend:**
   - Ensure you are in the `react-app` directory:
     ```
     cd react-app
     ```
   - Start the frontend development server:
     ```
     npm start
     ```

6. **Access the Application:**
   - Open your web browser and navigate to `http://localhost:3000` to use the Campus Marketplace.

### Additional Information

- The backend server will run on port specified in the `.env` file (`PORT` variable).
- The frontend development server will typically run on `http://localhost:3000`.
- Ensure that MongoDB is installed and running, and replace `your_mongodb_connection_string` with your actual MongoDB URI.
- Replace `your_jwt_secret_key` with a secure string for JSON Web Token (JWT) encryption.

Feel free to explore and enhance the Campus Marketplace application according to your needs. If you encounter any issues or have questions, please refer to the project documentation or contact the repository owner.

Happy coding! 🌱
