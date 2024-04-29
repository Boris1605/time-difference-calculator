import { differenceInHours } from 'date-fns';
import { format, toZonedTime } from 'date-fns-tz';
import React, { useEffect, useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

// Define the TimeDifferenceCalculator component
export default function TimeDifferenceCalculator() {
  // Define state variables for country, region, and locations
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [locations, setLocations] = useState([]);

  // Function to add a location
  const handleAddLocation = async () => {
    // Check if both country and region are selected
    if (country && region) {
      const locationName = `${region}, ${country}`;
      // Add the location with its time difference to the locations array
      setLocations([
        ...locations,
        {
          locationName,
          timeDifference: await getTimeDifference(country, region),
        },
      ]);
      // Clear the country and region inputs after adding the location
      setCountry('');
      setRegion('');
    }
  };

  // Function to remove a location
  const handleRemoveLocation = (index) => {
    // Remove the location at the specified index from the locations array
    setLocations(locations.filter((_, i) => i !== index));
  };

  // Function to fetch time difference based on country and region
  const getTimeDifference = async (country, region) => {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?country=${country}&state=${region}&apiKey=${process.env.REACT_APP_API_KEY}`,
    );

    const data = await response.json();
    const coordinates = data.features?.[0]?.geometry?.coordinates;

    if (coordinates) {
      const [lon, lat] = coordinates;
      // Fetch location by coordinates to determine timezone
      const timeDifference = await fetchLocationByCoordinatesAndTimedifference(
        lat,
        lon,
      );
      return timeDifference;
    }
  };

  // Function to fetch location details by coordinates
  const fetchLocationByCoordinatesAndTimedifference = async (
    latitude,
    longitude,
  ) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      );
      const data = await response.json();
      const timezone = data.localityInfo?.informative?.find(
        (obj) => obj.description === 'time zone',
      )?.name;

      const currentTime = new Date();

      // Get the time in the specified location
      const locationTime = toZonedTime(new Date(), timezone);

      // Calculate the time difference
      const diff = differenceInHours(locationTime, currentTime);

      return diff;
    } catch (error) {
      console.error('Error fetching location by coordinates:', error.message);
    }
  };

  return (
    <div className="p-5 my-5 text-xl mt-10 mr-1">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Time difference calculator</h1>
        <i>All Time differences are related to your local time!</i>
        <br />
        <br />
        <CountryDropdown
          value={country}
          onChange={(val) => setCountry(val)}
          className="select select-bordered mt-5"
        />
        <RegionDropdown
          country={country}
          value={region}
          onChange={(val) => setRegion(val)}
          className="select select-bordered ml-4"
        />
        <button className="btn ml-11" onClick={handleAddLocation}>
          Add Location
        </button>
      </div>
      <br />
      <div className="">
        {/* Display locations and their time differences */}
        <table className="text-center table-auto my-0 mx-auto">
          <tbody>
            {locations.map((location, index) => (
              <tr key={index} className="mt-8">
                <td className="pr-8 text-left">
                  &#8226; {location.locationName} is{' '}
                  {location.timeDifference === 0
                    ? ''
                    : `${Math.abs(location.timeDifference)} hours`}{' '}
                  {String(location.timeDifference).startsWith('-')
                    ? 'behind'
                    : location.timeDifference === 0
                    ? 'same time as your local time'
                    : 'ahead'}{' '}
                </td>
                <td className="">
                  <button
                    className="btn btn-square"
                    onClick={() => handleRemoveLocation(index)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
