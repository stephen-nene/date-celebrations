import React, { useState, useEffect } from "react";
import ct from "countries-and-timezones";
import { Select } from "antd";

const TimeZoneSelector = ({ currentTime, setCurrentTime }) => {
  const [selectedCountry, setSelectedCountry] = useState("KE");
  const [selectedTimezone, setSelectedTimezone] = useState("Africa/Nairobi");
  const [timezones, setTimezones] = useState([]);
  const [formattedTime, setFormattedTime] = useState();

  const countries = ct.getAllCountries();

  useEffect(() => {
    const updateTime = () => {
      if (!selectedTimezone) return;

      const dateFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: selectedTimezone,
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      setFormattedTime(dateFormatter.format(new Date()));

      const currentTimeInTimezone = new Date().toLocaleString("en-US", {
        timeZone: selectedTimezone,
      });
      setCurrentTime(dateFormatter.format(new Date()));

      // setCurrentTime(new Date(currentTimeInTimezone));
      // console.log(new Date(currentTimeInTimezone), currentTimeInTimezone);
    };

    const interval = setInterval(updateTime, 1000);
    updateTime();

    return () => clearInterval(interval);
  }, [selectedTimezone]);

  useEffect(() => {
    const country = countries[selectedCountry];
    if (!country) return;

    setTimezones(country.timezones);

    if (country.timezones.length === 1) {
      setSelectedTimezone(country.timezones[0]);
    }
  }, [selectedCountry, countries]);

  const handleCountryChange = (value) => {
    const country = countries[value];
    setSelectedCountry(value);
    setSelectedTimezone(null);

    if (country?.timezones.length > 1) {
      setTimezones(country.timezones);
    } else {
      setTimezones([]);
      setSelectedTimezone(country?.timezones[0]);
    }
  };

  const renderCountryOptions = () =>
    Object.entries(countries).map(([key, country]) => ({
      value: key,
      label: country.name,
    }));

  const renderTimezoneOptions = () =>
    timezones.map((timezone) => ({
      value: timezone,
      label: timezone,
    }));

  return (
    <div className="max-w-full  xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Location & Time Settings
      </h2>

      <div className="space-y-4">
        <div>
          <Select
            showSearch
            value={selectedCountry}
            placeholder="Select a country"
            onChange={handleCountryChange}
            className="w-1/2 ull"
            options={renderCountryOptions()}
            filterOption={(input, option) =>
              option?.label.toLowerCase().includes(input.toLowerCase())
            }
            virtual={false}
            size="large"
          />
        </div>

        {timezones.length > 1 && (
          <div>
            <Select
              size="large"
              showSearch
              value={selectedTimezone}
              placeholder="Select a timezone"
              onChange={setSelectedTimezone}
              className="w-1/2 full"
              options={renderTimezoneOptions()}
              filterOption={(input, option) =>
                option?.label.toLowerCase().includes(input.toLowerCase())
              }
              virtual={false}
            />
          </div>
        )}

        {selectedCountry && (
          <div className="pt-2 space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Country:</span>{" "}
              {countries[selectedCountry]?.name}
            </p>
            {selectedTimezone && (
              <p className="text-gray-700">
                <span className="font-medium">Timezone:</span>{" "}
                {selectedTimezone}
              </p>
            )}
          </div>
        )}

        {selectedTimezone && formattedTime && (
          <div className="pt-2">
            <p className="text-xl font-semibold text-gray-700">
              {formattedTime}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeZoneSelector;
