# Time Difference Calculator

## Introduction

The Time Difference Calculator is a program designed to help users calculate the time difference between the local time and various locations around the world.

## Functionality

### User Input

- The program provides a user-friendly interface for entering a list of locations (countries and regions) for which the user wants to calculate the time difference.
- Users can select locations, selecting from a pre-populated list.

### Time Zone Management

- The program automatically determines the corresponding time zones for each entered location, making it easier for users to calculate accurate time differences.

### Time Difference Calculation

- The core functionality of the program involves calculating the time difference between each entered location and the local time of the user.
- The resulting time difference is displayed in a clear and concise format, making it easy for users to understand.

## Technologies Used

- **React**: The frontend of the application is built using React, a popular JavaScript library for building user interfaces.
- **Date-fns**: Date-fns is used for date manipulation and formatting, making it easier to work with dates and times in JavaScript.
- **Geoapify API**: The Geoapify API is utilized to fetch location details based on country and region inputs.
- **BigDataCloud API**: The BigDataCloud API is used to fetch location details by coordinates, including the time zone information.
- **Tailwind CSS**: Tailwind CSS is a utility-first CSS framework used for styling the user interface of the application.
- **DaisyUI**: DaisyUI is a plugin for Tailwind CSS that provides additional UI components and utilities.

## Installation

To run the Time Difference Calculator locally, follow these steps:

1. Clone the repository: `git clone [https://github.com/Boris1605/time-difference-calculator.git]`
2. Navigate to the project directory: `cd time-difference-calculator`
3. Install dependencies: `npm install`
4. Set up environment variables: Create a `.env` file in the root directory and add your API key: `REACT_APP_API_KEY=your_api_key`
5. Start the development server: `npm start`

## Usage

1. Open the application in your web browser.
2. Enter the country and region for the locations you want to compare.
3. Click the "Add Location" button to add the location to the list.
4. Repeat steps for each location you want to compare.
5. The program will display the calculated time differences between each location and your local time.
