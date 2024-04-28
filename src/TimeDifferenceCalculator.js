import { differenceInHours } from 'date-fns';
import { format, toZonedTime } from 'date-fns-tz';
import React, { useEffect, useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

export default function TimeDifferenceCalculator() {
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [locations, setLocations] = useState([]);

  const handleAddLocation = async () => {
    if (country && region) {
      const locationName = `${region}, ${country}`;
      setLocations([
        ...locations,
        {
          locationName,
          timeDifference: await getTimeDifference(country, region),
        },
      ]);
      setCountry('');
      setRegion('');
    }
  };

  const handleRemoveLocation = (index) => {
    setLocations(locations.filter((_, i) => i !== index));
  };

  const getTimeDifference = async (country, region) => {
    console.log('Calculating time difference for:', country, region);
    let locationTimezone;
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?country=${country}&state=${region}&apiKey=${process.env.REACT_APP_API_KEY}`,
    );

    const data = await response.json();
    const coordinates = data.features?.[0]?.geometry?.coordinates;
    console.log('aaa', coordinates);
    if (coordinates) {
      const [lon, lat] = coordinates;
      const timeDifference = await fetchLocationByCoordinates(lat, lon);
      console.log('timezone,', timeDifference);
      return timeDifference;
    }
  };

  const fetchLocationByCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      );
      const data = await response.json();
      const timezone = data.localityInfo?.informative?.find(
        (obj) => obj.description === 'time zone',
      )?.name;
      console.log('TZ jebeni', timezone);

      const currentTime = new Date();
      console.log('nase', currentTime.toString());

      // Get the time in the specified location
      const locationTime = toZonedTime(new Date(), timezone);
      console.log('location time', locationTime.toString());

      // Calculate the time difference
      const diff = differenceInHours(locationTime, currentTime);

      console.log('diuff', diff);

      // Format the time difference
      // const hoursDiff = diff.hours();
      // const minutesDiff = diff.minutes();

      // Determine if the time in the location is ahead or behind the user's current time
      // const direction = diff.asSeconds() < 0 ? 'behind' : 'ahead';

      return diff;
    } catch (error) {
      console.error('Error fetching location by coordinates:', error.message);
    }
  };

  return (
    <div className="p-5 my-5 text-xl mt-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Time difference calculator</h1>
        <i>NOTE: All Time differences are related to your local time!</i>
        <br />
        <br />
        <div className="select select-bordered mt-5">
          <CountryDropdown
            value={country}
            onChange={(val) => setCountry(val)}
          />
        </div>
        <div className="select select-bordered">
          <RegionDropdown
            country={country}
            value={region}
            onChange={(val) => setRegion(val)}
          />
        </div>
        <button className="btn ml-11" onClick={handleAddLocation}>
          Add Location
        </button>
      </div>
      <br />
      <div>
        <table className="text-center table-auto">
          <tbody>
            <tr>
              {locations.map((location, index) => (
                <li className="text-left ml-96" key={index}>
                  {location.locationName} is{' '}
                  {location.timeDifference === 0
                    ? ''
                    : `${Math.abs(location.timeDifference)} hours`}{' '}
                  {String(location.timeDifference).startsWith('-')
                    ? 'behind'
                    : location.timeDifference === 0
                    ? 'same time as your local time'
                    : 'ahead'}{' '}
                  <button
                    className="btn ml-2"
                    onClick={() => handleRemoveLocation(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
