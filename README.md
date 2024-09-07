# Invite Manager

This is an application for managing invites and permissions between users. The app is built using **React 19**, **TypeScript**, **TanStack Start**, **TanStack Query**, **React Hook Form**, **Zod**, **React Aria Components**, **Tailwind CSS**, and **PostgreSQL** with **Kysely** for database interaction.

## Features

- Manage invites sent to other users with customizable permissions.
- Accept or reject invites received from other users.
- Permissions include read/write for posts, messages, and profile info.
- Infinite scroll for both invites sent and received sections.
- Permissions can be customized with optional expiration periods.

## Prerequisites

- **Node.js** (v16+ recommended)
- **PostgreSQL** (configured and running)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository_url>
cd invite-manager
```

### 2. Install Dependencies

This project uses **npm** as the package manager. You can install the dependencies with the following command:

```bash
npm install
```

### 3. Set Up Environment Variables

Create an `.env` file in the root directory and configure your `DATABASE_URL`. This will connect to your PostgreSQL instance.

```
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
```

> **Notice**: Make sure to update the `DATABASE_URL` to match your PostgreSQL setup.

### 4. Set Up the Database

A SQL script is provided to set up the necessary tables for users and invites. Run the SQL script `db_script.sql` in your PostgreSQL database:

The SQL script is located in the root of the repository.

### 5. Run the Development Server

After setting up the environment variables and database, start the development server using the following command:

```bash
npm run dev
```

This will start the development server using **Vinxi**.

### 6. Build for Production

If you want to build the application for production:

```bash
npm run build
```

This will output the production-ready files.

## Libraries Used

- **React 19**: For building the user interface.
- **TanStack Router**: For routing and server functions.
- **TanStack Query**: For managing server state and API data fetching.
- **React Hook Form**: For form handling, using Zod for schema validation.
- **React Aria Components**: To ensure accessibility with ARIA-compliant components.
- **Tailwind CSS**: For utility-first CSS styling.
- **Kysely**: For building type-safe SQL queries in TypeScript.

## Database

The database uses PostgreSQL, and you will need to configure it using the provided `db_script.sql` file in the root directory to create the necessary tables (`users` and `invites`).

- **Users Table**: Stores user information.
- **Invites Table**: Stores invite-related data, including permissions and status.

## Notice

- **Ensure** your PostgreSQL instance is running and configured correctly.
- **Modify** the `DATABASE_URL` in your `.env` file to connect to your database.
- **Run** the provided SQL script `db_script.sql` to set up the database tables.
