# Career Insights Questionnaire

An interactive career assessment tool designed to provide users with personalized insights into their strengths, values, and career goals through a series of targeted questions.

## Overview

This application guides users through a multi-step questionnaire, collecting information about various aspects of their career aspirations and personal attributes. Upon completion, it generates a comprehensive summary of career insights.

## Features

- **Interactive Questionnaire**: Users progress through a series of 9 questions, each focusing on different aspects of career development.
- **Dynamic Form Handling**: The application uses React state to manage form data and navigation between questions.
- **Personalized Career Insights**: Based on user responses, the app generates tailored feedback on career introspection, strengths, and core values.
- **Progress Tracking**: Users can see their progress through the questionnaire.
- **Navigation Controls**: Options to move forward and backward through the questions.
- **Responsive Design**: Optimized for both desktop and mobile devices, with a split-screen layout on larger screens.
- **PDF Generation**: Upon completion, users can download or email a PDF summary of their career insights.

## Technologies Used

- **Frontend**: Built using React with Next.js for server-side rendering and routing.
- **Styling**: Utilizes Tailwind CSS for responsive and customizable styling.
- **State Management**: React hooks (useState) for local state management.
- **Image Handling**: Next.js Image component for optimized image loading.

## Component Structure

- `SelfAssesmentQuestions`: Main component managing the questionnaire flow.
- `QOne` to `QNine`: Individual question components.
- `AnswerPage`: Displays the final summary of insights.
- `Navigation`: Navigation component (implementation not shown in the provided code).

![Application Interface](https://github.com/user-attachments/assets/49f185b3-81ec-4d88-981f-81d570929ece)

## Getting Started

1. Clone the repository to your local machine.
2. Install necessary dependencies using `npm install`.
3. Run the development server with `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.


