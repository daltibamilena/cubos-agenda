const { getStoredData, getDatesInRange, getDayWeek } = require("../helpers");
const _ = require("lodash");

exports.execute = (req) => {
  let data = getStoredData();
  let { start, end } = req.body;
  let getDaysInterval = getDatesInRange(start, end);
  let timeScheduleInterval = [];
  getDaysInterval.map((day) => {
    let dayWeek = getDayWeek(day);
    let intervals = data[dayWeek].filter(
      (elem) => elem.day === day || elem.day === undefined
    );
    timeScheduleInterval.push({
      day: day,
      intervals: intervals.map((elem) => _.omit(elem, "day")),
    });
  });
  return {
    status: 200,
    message: timeScheduleInterval,
  };
};
