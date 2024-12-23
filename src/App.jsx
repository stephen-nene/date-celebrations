import { useState } from "react";

import "./App.css";
import TimeZoneSelector from "./TimeZoneSelector";
import Cards from "./cards/cards";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  return (
    <>
      <div className="p-6">
        <TimeZoneSelector
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
        />
        <Cards currentTime={currentTime}/>
      </div>
    </>
  );
}

export default App;
