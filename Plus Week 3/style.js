let weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
console.log(weekDays);
console.log(weekDays[0]);
console.log(weekDays[6]);

weekDays[6] = "Funday";
console.log(weekDays);

weekDays.shift();
weekDays.shift();
console.log(weekDays);

console.log("Temperature on " + weekDays[0] + " is 18 degrees");
console.log("Temperature on " + weekDays[1] + " is 18 degrees");
console.log("Temperature on " + weekDays[2] + " is 18 degrees");
console.log("Temperature on " + weekDays[3] + " is 18 degrees");
