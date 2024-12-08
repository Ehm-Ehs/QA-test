# React Item Management App

This is a **Nextjs application** designed to manage items, including features to **create**, **update**, and **delete** items. The app utilizes **React Query**, **React Hook Form**, **Tailwind CSS**, and **Zod** for handling API interactions, form validation, and UI components.

## Features

- **Form Handling**: Seamlessly manage form inputs with `React Hook Form` and `Zod` for validation.
- **API Integration**: Uses **React Query** to manage server state for fetching, creating, updating, and deleting items.
- **UI Styling**: Styled using **Tailwind CSS**, providing a responsive and modern interface.
- **Feedback Mechanism**: Displays user-friendly feedback during loading, success, or error states.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **React Query**: Data-fetching and caching library to manage server state.
- **React Hook Form**: Library for handling form state and validation.
- **Zod**: TypeScript-first schema validation library.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **TypeScript**: For static type-checking and improving code quality.

## Project Setup

### 1. Clone the Repository

````bash
git clone <repo-url>
cd <project-folder>

### Install Dependencies

To install the required dependencies for the project, run the following command:

```bash
npm install

### 3. Run the Development Server

After installing the dependencies, start the development server:

Using npm:

```bash
npm run dev
The app should now be running at http://localhost:3000 in your browser.

### 4. Set Up Environment Variables

# .env

NEXT_PUBLIC_BASE_URL=https://api.example.com
````

# Running Cypress Tests Locally

This repository contains Cypress tests that can be run locally to validate the functionality of the application. Below are the steps to set up and run the tests on your local machine.

## Prerequisites

Before running the tests, make sure you have the following installed on your system:

- **Node.js**: You need Node.js to run Cypress tests.

  - You can download it from [here](https://nodejs.org/en/download/).

- **Cypress**: Cypress is the testing framework used for running the tests.
  - Cypress will be installed via npm when you install the project dependencies.
  ### 3. Open Cypress Test Runner

Once the dependencies are installed, you can open Cypress using the following command:

```bash
npx cypress open
```

This will open the Cypress Test Runner in your browser. From here, you can choose which test to run or run all tests.

### 4. Run Tests from Command Line

Alternatively, you can run the tests from the command line in headless mode (without opening the Cypress GUI). To do this, run:

```bash
npx cypress run
```

This will run all the tests and output the results directly to the terminal.

## Test Output

Once the tests have completed, you will see the results in the terminal or Cypress Test Runner. Any failed tests will be highlighted, and you can see detailed logs for troubleshooting.
