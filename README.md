# Interactive Career Questionnaire

An interactive React and Next.js-based application designed to guide users through a series of career-related questions and provide personalized insights based on their responses.

## Overview

This application collects user input through a multi-step questionnaire and dynamically generates personalized results. It leverages the power of React state management and Next.js routing to create a seamless, interactive experience.

## Features

- **Interactive Questionnaire**: Users navigate through multiple questions, each focusing on different aspects of career development.
- **Dynamic Question Flow**: The application dynamically updates based on user input, ensuring a tailored experience.
- **Progress Tracking**: Users can see their progress through the questionnaire with a question index.
- **Responsive Design**: Optimized for both desktop and mobile, ensuring usability across devices.
- **Results Page**: After completing the questionnaire, users are presented with a detailed summary of their career insights.
- **PDF Export**: Users can download or email their results for future reference.

## Technologies Used

- **Frontend Framework**: React with Next.js 13/14 for server-side rendering and routing.
- **State Management**: React `useState` hooks for managing form data and navigation.
- **Styling**: Tailwind CSS for responsive and modern styling.
- **Image Optimization**: Next.js `Image` component for optimized image loading.
- **Firbease for data collection

## Project Structure

The project follows best practices for structuring a Next.js application:

### Key Directories and Files

| Folder/File       | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `/app`            | Contains route segments and components for the App Router.                 |
| `/components`     | Reusable components like navigation, question components, etc.             |
| `/pages`          | Handles Pages Router (if applicable).                                      |
| `/public`         | Static assets such as images.                                              |
| `/styles`         | Custom global styles or Tailwind CSS configuration.                        |
| `/QComponents`    | Individual question components (`QOne`, `QTwo`, etc.) for modularity.      |
| `AnswerPage.js`   | Displays the final summary of user responses after form submission.        |
| `selfAQForm.js`   | Manages the flow of questions dynamically.                                 |

### Component Breakdown

1. **Question Components (`QOne` to `QNine`)**:
   - Each question is encapsulated in its own React component.
   - Modular design allows easy customization or addition of new questions.

2. **State Management**:
   - User inputs are managed using `useState`.
   - Functions like `updateTextArea`, `updateAnswer`, and `updateCheckbox` handle updates to form data.

3. **Dynamic Form Flow**:
   - The `SelfAQForm` function manages navigation between questions (`nextQtn`, `backQtn`) and tracks progress (`questionIndex`).

4. **Results Page**:
   - After submission, the app renders an `AnswerPage` component displaying personalized insights.

## Visuals

### Application Interface
![Application Interface](https://github.com/user-attachments/assets/49f185b3-81ec-4d88-981f-81d570929ece)

