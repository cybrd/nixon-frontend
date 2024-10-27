export const formatAMPM = (timeString = "") => {
  let newTimeString = timeString.trim();
  const one = 1;
  const two = 2;
  const five = 5;
  const eigth = 8;

  if (newTimeString.match(/m/iu)) {
    return newTimeString;
  }

  const count = (newTimeString.match(/:/gu) || []).length;
  if (count === one) {
    newTimeString = newTimeString.padStart(five, "0");
  }
  if (count === two) {
    newTimeString = newTimeString.padStart(eigth, "0");
  }

  return new Date(`1970-01-01T${newTimeString}Z`).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    timeZone: "UTC",
  });
};
