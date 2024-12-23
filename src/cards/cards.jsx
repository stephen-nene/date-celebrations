import { useState, useEffect } from "react";
import { FaRegCalendarAlt } from "react-icons/fa"; 

function Cards({ currentTime }) {
  // Function to calculate the time remaining until a specific date
  const [christmasTime, setChristmasTime] = useState({});
    const [newYearTime, setNewYearTime] = useState({});
    
  const getTimeRemaining = (targetDate) => {

    const timeDifference = targetDate - currentTime;
    // console.log(currentTime,timeDifference,targetDate);

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };


  useEffect(() => {
      // if (!currentTime) return; 
      
      const currentDate = new Date(); // Parse currentTime into a Date object
    //   console.log("loaded", currentTime,currentDate)

    const currentYear = currentDate.getFullYear();
    // const currentYear = new Date().getFullYear();

    // Christmas and New Year dates for the current year
    const christmasDate = new Date(`${currentYear}-12-25T00:00:00`);
    const newYearDate = new Date(`${currentYear + 1}-01-01T00:00:00`);

    const updateCountdown = () => {
      setChristmasTime(getTimeRemaining(christmasDate));
      setNewYearTime(getTimeRemaining(newYearDate));
    };
 
    // Update countdown every second
    const interval = setInterval(updateCountdown, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      {/* Countdown to Christmas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
          <FaRegCalendarAlt className="text-4xl mb-4 text-red-500" />
          <h2 className="text-xl font-semibold">Countdown to Christmas</h2>
          <p className="mt-2 text-lg">{`December 25, ${new Date().getFullYear()}`}</p>
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold">{`${christmasTime.days}d ${christmasTime.hours}h ${christmasTime.minutes}m ${christmasTime.seconds}s`}</p>
          </div>
        </div>

        {/* Countdown to New Year */}
        <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
          <FaRegCalendarAlt className="text-4xl mb-4 text-blue-500" />
          <h2 className="text-xl font-semibold">Countdown to New Year</h2>
          <p className="mt-2 text-lg">{`January 1, ${
            new Date().getFullYear() + 1
          }`}</p>
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold">{`${newYearTime.days}d ${newYearTime.hours}h ${newYearTime.minutes}m ${newYearTime.seconds}s`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
