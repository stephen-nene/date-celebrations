// import React, { useState, useEffect } from "react";
// import { Select, Card, Row, Col } from "antd";
// import { TbChristmasTree } from "react-icons/tb";
// import { FaGifts } from "react-icons/fa";
// import confetti from "canvas-confetti";
// import ReactConfetti from "react-confetti";
// import countries from "world-countries";
// import ct from "countries-and-timezones";
// // import "./Countdown.css";

// const { Option } = Select;

// const FestiveCountdown = () => {
//   const [country, setCountry] = useState("Kenya");
//   const [timezone, setTimezone] = useState("Africa/Nairobi");
//   const [christmasTime, setChristmasTime] = useState(
//     getTimeRemaining(new Date("2024-12-25T00:00:00"))
//   );
//   const [newYearTime, setNewYearTime] = useState(
//     getTimeRemaining(new Date("2025-01-01T00:00:00"))
//   );
//   const [showConfetti, setShowConfetti] = useState(false);

//   // Map countries to timezone data
//   const countryOptions = countries.map((country) => {
//     const timezones = ct.getCountry(country.cca2)?.timezones || [];
//     return {
//       label: country.name.common,
//       value: country.cca2,
//       timezones,
//     };
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const christmasDiff = getTimeRemaining(new Date("2024-12-25T00:00:00"));
//       const newYearDiff = getTimeRemaining(new Date("2025-01-01T00:00:00"));

//       setChristmasTime(christmasDiff);
//       setNewYearTime(newYearDiff);

//       if (christmasDiff.total <= 0 || newYearDiff.total <= 0) {
//         setShowConfetti(true);
//         confetti({
//           particleCount: 100,
//           spread: 70,
//           origin: { y: 0.6 },
//         });
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   function getTimeRemaining(targetDate) {
//     const now = new Date();
//     const total = targetDate - now;
//     const seconds = Math.floor((total / 1000) % 60);
//     const minutes = Math.floor((total / 1000 / 60) % 60);
//     const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
//     const days = Math.floor(total / (1000 * 60 * 60 * 24));
//     return { total, days, hours, minutes, seconds };
//   }

//   const handleCountryChange = (selectedCountry) => {
//     const countryData = countryOptions.find(
//       (option) => option.value === selectedCountry
//     );
//     if (countryData && countryData.timezones.length > 0) {
//       setCountry(countryData.label);
//       setTimezone(countryData.timezones[0]); // Default to the first timezone
//     } else {
//       setTimezone("UTC"); // Fallback if no timezone is found
//     }
//   };

//   const renderTimeUnit = (label, value) => (
//     <div className="flex flex-col items-center">
//       <div className="text-3xl font-bold text-red-600">
//         {value.toString().padStart(2, "0")}
//       </div>
//       <div className="text-sm font-medium text-gray-500">{label}</div>
//     </div>
//   );

//   const renderCountdownCard = (icon, title, time) => (
//     <Card className="shadow-lg p-4 rounded-lg bg-white border border-gray-200">
//       <div className="flex items-center gap-2 mb-4">
//         {icon}
//         <span className="text-lg font-semibold text-green-700">{title}</span>
//       </div>
//       <div className="grid grid-cols-4 gap-4">
//         {renderTimeUnit("Days", time.days)}
//         {renderTimeUnit("Hours", time.hours)}
//         {renderTimeUnit("Minutes", time.minutes)}
//         {renderTimeUnit("Seconds", time.seconds)}
//       </div>
//     </Card>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-100 to-white py-8 px-4">
//       {showConfetti && <ReactConfetti />}
//       <h1 className="text-center text-4xl font-bold text-green-800 mb-8">
//         Festive Countdown
//       </h1>
//       <Select
//         className="mb-8 w-full max-w-md mx-auto"
//         defaultValue={country}
//         onChange={handleCountryChange}
//         showSearch
//         placeholder="Select Country"
//         optionFilterProp="label"
//         virtual={false}
//       >
//         {countryOptions.map(({ label, value }) => (
//           <Option key={value} value={value}>
//             {label}
//           </Option>
//         ))}
//       </Select>
//       <p className="text-center text-lg mb-4">Timezone: {timezone}</p>
//       <Row gutter={[16, 16]} className="flex flex-wrap justify-center gap-4">
//         <Col xs={24} sm={12}>
//           {renderCountdownCard(
//             <TbChristmasTree className="text-2xl text-red-600" />,
//             "Christmas 2024",
//             christmasTime
//           )}
//         </Col>
//         <Col xs={24} sm={12}>
//           {renderCountdownCard(
//             <FaGifts className="text-2xl text-yellow-500" />,
//             "New Year 2025",
//             newYearTime
//           )}
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default FestiveCountdown;
import React, { useState, useEffect } from "react";
import ct from "countries-and-timezones";
import { Select, Card, Row, Col } from "antd";
import moment from "moment-timezone"; // To handle timezones and date calculations

const { Option } = Select;

export default function CountdownToHolidays() {
  // Default country: Kenya (KE) and default timezone: Africa/Nairobi
  const [selectedCountry, setSelectedCountry] = useState("KE");
  const [timezones, setTimezones] = useState([]);
  const [selectedTimezone, setSelectedTimezone] = useState("Africa/Nairobi");

  const countries = ct.getAllCountries();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const country = countries[selectedCountry];
    if (country) {
      setTimezones(country.timezones);
      if (country.timezones.length === 1) {
        setSelectedTimezone(country.timezones[0]);
      }
    }
  }, [selectedCountry]);

  const handleCountryChange = (value) => {
    const country = countries[value];
    setSelectedCountry(value);
    setSelectedTimezone(null); // Reset timezone when country changes
    if (country && country.timezones.length > 1) {
      setTimezones(country.timezones);
    } else {
      setTimezones([]);
      setSelectedTimezone(country?.timezones[0]); // Automatically select if only one timezone
    }
  };

  const handleTimezoneChange = (value) => {
    setSelectedTimezone(value);
  };

  // Helper function to calculate the time left for a given target date (e.g., Christmas, New Year)
  const calculateCountdown = (targetDate) => {
    const timezone = selectedTimezone || "Africa/Nairobi";
    const targetMoment = moment.tz(targetDate, timezone);
    const now = moment.tz(timezone);
    const duration = moment.duration(targetMoment.diff(now));

    return {
      days: Math.max(duration.days(), 0),
      hours: Math.max(duration.hours(), 0),
      minutes: Math.max(duration.minutes(), 0),
      seconds: Math.max(duration.seconds(), 0),
    };
  };

  // Calculate the countdowns for Christmas and New Year's Day
  const christmasDate = `${currentYear}-12-25T00:00:00`; // Christmas date
  const newYearDate = `${currentYear + 1}-01-01T00:00:00`; // New Year's date

  const christmasCountdown = calculateCountdown(christmasDate);
  const newYearCountdown = calculateCountdown(newYearDate);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Select Country and Timezone
      </h2>

      {/* Country Selection */}
      <Select
        showSearch
        value={selectedCountry}
        placeholder="Select a country"
        onChange={handleCountryChange}
        style={{ width: "100%" }}
        className="mb-4"
        virtual={false}
        filterOption={(input, option) =>
          option.children.toLowerCase().includes(input.toLowerCase())
        }
      >
        {Object.keys(countries).map((key) => (
          <Option key={key} value={key}>
            {countries[key].name}
          </Option>
        ))}
      </Select>

      {/* Timezone Selection (if applicable) */}
      {timezones.length > 1 && (
        <Select
          showSearch
          value={selectedTimezone}
          placeholder="Select a timezone"
          onChange={handleTimezoneChange}
          style={{ width: "100%" }}
          className="mb-6"
          virtual={false}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {timezones.map((timezone) => (
            <Option key={timezone} value={timezone}>
              {timezone}
            </Option>
          ))}
        </Select>
      )}

      {/* Countdown Cards */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card
            title="Christmas Countdown"
            bordered={false}
            className="bg-green-100"
          >
            <div className="text-center text-xl font-bold text-gray-800">
              {christmasCountdown.days}d {christmasCountdown.hours}h{" "}
              {christmasCountdown.minutes}m {christmasCountdown.seconds}s
            </div>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="New Year Countdown"
            bordered={false}
            className="bg-blue-100"
          >
            <div className="text-center text-xl font-bold text-gray-800">
              {newYearCountdown.days}d {newYearCountdown.hours}h{" "}
              {newYearCountdown.minutes}m {newYearCountdown.seconds}s
            </div>
          </Card>
        </Col>
      </Row>

      {/* Show the selected country and timezone */}
      <div className="mt-6 text-center">
        <p className="text-gray-700">
          <strong>Selected Country:</strong> {countries[selectedCountry]?.name}
        </p>
        {selectedTimezone && (
          <p className="text-gray-700">
            <strong>Selected Timezone:</strong> {selectedTimezone}
          </p>
        )}
      </div>
    </div>
  );
}
