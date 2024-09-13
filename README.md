# Todo App with React, MUI, Formik, and Yup

## Overview

This is a **Todo App** built using **React** and **Material UI (MUI)** for the user interface. The app features authentication, with separate to-do lists for each user, and it allows users to create, edit, delete, complete, and filter their tasks. The app is fully responsive and includes form validation using **Formik** and **Yup**.

## Features

- **User Authentication**: Users can register, log in, and manage their session.
- **Todo Management**:
  - Add new todos.
  - Edit existing todos.
  - Mark todos as completed/incomplete.
  - Delete todos.
- **Separate lists for completed and incomplete todos**.
- **Form Validation**: Integrated form validation using **Formik** and **Yup**.
- **Responsive Design**: Works well on both desktop and mobile devices.
- **Local Storage**: User data and todos are stored in local storage to persist across sessions.
- **Material UI**: Styled using Material UI for a clean and modern interface.

## Technologies Used

- **React**: Front-end JavaScript library for building user interfaces.
- **Formik**: Form handling and validation.
- **Yup**: Validation schema for form validation.
- **Material UI (MUI)**: UI library for building modern, responsive components.
- **Local Storage**: For persisting user data and todos.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/dilrukshax/todo-app.git
cd todo-app
```

### 2. Install dependencies

Make sure you have Node.js installed, then install the required dependencies using:

```bash
npm install
```

### 3. Start the development server

Run the app in development mode:

```bash
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── components/
│   ├── Login.js          // Login page with Formik and Yup validation
│   ├── Register.js       // Registration page with Formik and Yup validation
│   ├── Header.js         // Header navigation component
│   ├── TodoList.js       // Main Todo List component (Add, Edit, Delete, Mark as Complete)
├── AuthContext.js        // Authentication context for managing user session and todos
├── App.js                // Main entry component
└── index.js              // App entry point
```

## Key Functionalities

### User Authentication
- Users can register and log in to manage their tasks.
- The app uses **React Context** to handle user sessions.
- Todos are stored for each user, and local storage is used to persist user data.

### Todo Management
- Users can add, edit, delete, and mark todos as completed/incomplete.
- Todos are shown in separate lists for completed and incomplete tasks.
- Todos are displayed in a **card format** for a clean UI.

### Validation
- The **Login**, **Register**, and **Todo Add/Edit** forms use **Formik** for form management and **Yup** for validation.
- Basic validation ensures that required fields are filled in correctly.

### Responsive Design
- The app uses **Material UI Grid** and responsive styling to ensure the layout works on all screen sizes.

## Screenshots

![Screenshot 2024-09-13 192448](https://github.com/user-attachments/assets/70ac65b2-5ef4-4260-92b0-4c290e28169a)

<br>

![Screenshot 2024-09-13 192433](https://github.com/user-attachments/assets/b92f8248-414e-4fd2-8d4c-e46fe95a8c1a)

<br>

![Screenshot 2024-09-13 192526](https://github.com/user-attachments/assets/53f9044b-76b8-4bd1-a306-c88349bcdf56)

<br>

![Screenshot 2024-09-13 192554](https://github.com/user-attachments/assets/e1a87869-ff7c-4dbe-9824-1e006b29562c)

<br>

![Screenshot 2024-09-13 192612](https://github.com/user-attachments/assets/eb133b06-4c3a-414b-9291-39b4392474c2)





## How It Works

1. **Login/Register**: Users register with a name, email, and password, and then log in to access their dashboard.
2. **Dashboard**: Once logged in, users can add, edit, delete, and manage their todos.
3. **Todo Lists**: Separate sections for incomplete and completed todos. Users can toggle between completing and un-completing tasks.
4. **Local Storage**: User data and todos persist between sessions.

## Future Enhancements

- Add filters to allow users to sort tasks by priority or due date.
- Implement user authentication with a backend for more secure data handling.
- Add due dates and reminders for tasks.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contributing

If you'd like to contribute to this project:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Create a pull request.
