const fs = require("fs");
exports.day_of_the_week = (day) => {
  return name_week_day(day.getDay());
};

const weekDays = [
  "domingo",
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
];

const name_week_day = (dayOfTheWeek) => {
  return weekDays[dayOfTheWeek];
};

exports.getDatesInRange = (startDate, endDate) => {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

exports.formatDate = (day) => {
  var dateParts = day.split("-");
  return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
};

exports.regexDate =
  /^(((0[1-9]|[12]\d|3[01])\-(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\-(0[13456789]|1[012])\-((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/;

exports.regexTime = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;

exports.getStoredData = () => {
  let stored_data = fs.readFileSync("time.json");
  return JSON.parse(stored_data);
};
