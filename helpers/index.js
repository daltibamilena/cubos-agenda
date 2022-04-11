const fs = require("fs");
const moment = require("moment");

exports.getDayWeek = (day) => {
  moment.locale("pt-br");
  let date = formatDate(day);
  return date.format("ddd");
};

exports.getDatesInRange = (startDate, endDate) => {
  startDate = formatDate(startDate);
  endDate = formatDate(endDate);
  const date = startDate;
  const dates = [];

  while (date <= endDate) {
    dates.push(unformatDate(date));
    date.add(1, "days");
  }

  return dates;
};

const formatDate = (day) => {
  return moment(day, "DD-MM-YYYY");
};

const unformatDate = (date) => {
  return moment(date).format("DD-MM-YYYY");
};

exports.regexDate =
  /^(((0[1-9]|[12]\d|3[01])\-(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\-(0[13456789]|1[012])\-((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/;

exports.regexTime = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;

exports.getStoredData = () => {
  let stored_data = fs.readFileSync("time.json");
  return JSON.parse(stored_data);
};

exports.writeData = (data) => {
  fs.writeFileSync("time.json", JSON.stringify(data));
};
