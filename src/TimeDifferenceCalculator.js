import moment from 'moment-timezone';
import React, { useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

// 1. Import necessary libraries:
//     - useState
//     - useEffect (optional, for handling side effects)
//     - moment-timezone

// 2. Define the App component:
//     1. Define state variables:
//         - country: to store the selected country
//         - region: to store the selected region
//         - referenceTime: to store the reference time
//         - timeDifferences: to store the calculated time differences

//     2. Define the calculateTimeDifference function:
//         - Takes locations and referenceTime as input
//         - Calculates time differences between each location and reference time using moment-timezone
//         - Returns an object with location-time difference pairs

//     3. Define the handleCalculate function:
//         - Constructs the location string using the selected country and region
//         - Calls calculateTimeDifference with the constructed location and referenceTime
//         - Updates the timeDifferences state with the calculated differences

//     4. Render the component:
//         - Display a heading "Time Difference Calculator"
//         - Render CountryDropdown and RegionDropdown from react-country-region-selector:
//             - Pass value and onChange props to handle country and region selection
//         - Display an input field for entering the reference time
//             - Use type="datetime-local" for input type
//             - Pass value and onChange props to handle reference time selection
//         - Display a button "Calculate" to trigger the calculation
//             - On click, call the handleCalculate function
//         - Display the calculated time differences:
//             - Map over the timeDifferences object and display each location and its time difference
