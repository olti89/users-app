This project is built with React.js and demonstrates how to create a simple user management and display application. The app consists of two main pages:

User List Page (/)

Fetches user data from the public API: https://jsonplaceholder.typicode.com/users.

Displays all users in a responsive table.

Includes real-time search functionality by name or email.

Provides sorting options by name, email, or company — in both ascending and descending order.

Allows adding new users locally (without saving to a backend) through a simple form.

Clicking on a user’s name navigates to their detailed profile page.

User Details Page (/users/:id)

Fetches and displays detailed information for the selected user from the API.

Shows the user’s name, email, phone number, website, and address.

Includes a “Back” button to return to the main user list.
