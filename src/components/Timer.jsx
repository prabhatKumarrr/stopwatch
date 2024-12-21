import React, { useState, useEffect } from "react";
import { formatTime, calculateTime } from "../utils/auxiliaryFunctions";
import "./timer.css";

export default function Timer() {

  //State variables
  
  const [time, setTime] = useState(0); //To track time
  const [initialTime, setInitialTime] = useState(0);//to keep the original time set
  const [isRunning, setIsRunning] = useState(false); // Set running state
  const [editState, setEditState] = useState({field: null, value: ""});
  
  console.log(formatTime(time));
  console.log(JSON.stringify(editState));
  
  //Rendering time in Clock
  
  useEffect(() => {
    const progress = initialTime > 0 ? (initialTime - time)/initialTime * 100 : 0;
    document.documentElement.style.setProperty("--progress", `${progress}%`);
  },[time,initialTime]);



  useEffect(() => {
    let interval = null;

    if(isRunning && time > 0) {
      interval = setInterval(() => {
        setTime(time-1);
      }, 1000);
    }
    else if(time === 0) {
      setIsRunning(false);
    }

    return () => {
      if(interval) {
        clearInterval(interval);
      }
    }
  },[time, isRunning]);

  
  //Event Handlers 

  function handleEditField(field) {
    if(editState.field == field) {
      //if this triggers that means time already set
      const newTime = {
        ...formatTime(time),
        [field]: editState.value
      };
      
      const calculatedTime = calculateTime(newTime.hours, newTime.minutes, newTime.seconds);

      console.log(calculatedTime);

      setTime(calculatedTime);
      setInitialTime(calculatedTime);
      setEditState({field: null, value: ""});
    }
    else {
      setIsRunning(false);
      setEditState({field, value: formatTime(time)[field].replace(/^0+/, "")
      });
    }
  }

  function handleInputChange(event) {
    const value = event.target.value.replace(/\D/g,"").slice(0,2);
    setEditState((prevState) => (
      {
        ...prevState,
        value
      }
    ));
  }



  const { hours, minutes, seconds } = formatTime(time); //Get formatted time in individual variables
  
  //Main component

  return (
    <div id={"timerCard"}>
      <div id={"btn-container"}>
        <button onClick={() => setIsRunning(!isRunning)}>{isRunning? "Pause" : "Start"}</button>
        <button onClick={() => {setIsRunning(false); setTime(0);}}>reset</button>
      </div>
      <div id={"clock-container"}>
        <div id={"clock-bar"}>
          <div id={"clock"}>
            {
              editState.field == "hours" ?
                <input
                  className={"time-input"}
                  type={"text"}
                  value={editState.value}
                  onChange={handleInputChange}
                  onBlur={() => {handleEditField("hours")}}
                  autoFocus
                />
                :
                <span className={"time-unit"} onClick={() => {handleEditField("hours")}}>{hours}</span>
            }
            :
            {
              editState.field == "minutes" ?
                <input
                  className={"time-input"}
                  type={"text"}
                  value={editState.value}
                  onChange={handleInputChange}
                  onBlur={() => {handleEditField("minutes")}}
                  autoFocus
                />
                :
                <span className={"time-unit"} onClick={() => {handleEditField("minutes")}}>{minutes}</span>
            }
            :
            {
              editState.field == "seconds" ?
                <input
                  className={"time-input"}
                  type={"text"}
                  value={editState.value}
                  onChange={handleInputChange}
                  onBlur={() => {handleEditField("seconds")}}
                  autoFocus
                />
                :
                <span className={"time-unit"} onClick={() => {handleEditField("seconds")}}>{seconds}</span>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
