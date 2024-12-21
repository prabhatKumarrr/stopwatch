function formatTime(time) {
  const hours = Math.floor(time/3600);
  const minutes = Math.floor((time%3600)/60);
  const seconds = time%60;
  
  return {
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0")
  };
}

function calculateTime(hours, minutes, seconds) {
  const time = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);

  return isNaN(time)?0:time;
  
}

export { formatTime, calculateTime };
