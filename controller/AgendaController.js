const util = require("util");
const _ = require("lodash");
const {
  day_of_the_week,
  getDatesInRange,
  formatDate,
  getStoredData,
} = require("../helpers");

exports.createSingleTimeSchedule = (req, res) => {
  let stored_data = fs.readFileSync("time.json");
  let data = JSON.parse(stored_data);
  req.body.day = formatDate(req.body.day);
  let dayOfTheWeek = day_of_the_week(req.body.day);
  data[dayOfTheWeek] = [...data[dayOfTheWeek], { ...req.body }];
  fs.writeFileSync("time.json", JSON.stringify(data));
  res.send(data);
};

exports.createDailyTimeSchedule = (req, res) => {
  let data = getStoredData();
  for (let dt in data) {
    data[dt] = [...data[dt], { ...req.body }];
  }
  fs.writeFileSync("time.json", JSON.stringify(data));
  res.send(data);
};

exports.createWeeklyTimeSchedule = (req, res) => {
  let data = getStoredData();
  let { start, end, dayWeek } = req.body;
  dayWeek.map((dayOfTheWeek) => {
    data[dayOfTheWeek] = [...data[dayOfTheWeek], { ...{ start, end } }];
  });

  fs.writeFileSync("time.json", JSON.stringify(data));
  res.send(data);
};

exports.deleteSingleTimeSchedule = (req, res) => {
  let data = getStoredData();
  req.body.day = formatDate(req.body.day);
  let dayOfTheWeek = day_of_the_week(req.body.day);
  data[dayOfTheWeek] = data[dayOfTheWeek].filter((elem) => {
    elem.day = new Date(elem.day);
    return !util.isDeepStrictEqual(elem, req.body);
  });

  fs.writeFileSync("time.json", JSON.stringify(data));
  res.send(data);
};

exports.deleteDailyTimeSchedule = (req, res) => {
  let data = getStoredData();
  for (let dt in data) {
    data[dt] = data[dt].filter((elem) => {
      return !util.isDeepStrictEqual(elem, req.body);
    });
  }

  fs.writeFileSync("time.json", JSON.stringify(data));
  res.send(data);
};

exports.deleteWeeklyTimeSchedule = (req, res) => {
  let data = getStoredData();
  let { start, end, dayWeek } = req.body;
  dayWeek.map((dayOfTheWeek) => {
    data[dayOfTheWeek] = data[dayOfTheWeek].filter((elem) => {
      return !util.isDeepStrictEqual(elem, { start, end });
    });
  });
  fs.writeFileSync("time.json", JSON.stringify(data));
  res.send(data);
};

exports.getTimeScheduleInterval = (req, res) => {
  let data = getStoredData();
  console.log(data)
  let { start, end } = req.body;
  start = formatDate(start);
  end = formatDate(end);
  let getDays = getDatesInRange(start, end);
  let arr = [];
  getDays.map((day) => {
    let dayOfTheWeek = day_of_the_week(day);
    let intervals = data[dayOfTheWeek];
    intervals.filter((elem) => {
      if (elem.day == undefined) return true;
      else elem.day === day;
    });

    console.log({
      day: day,
      intervals: intervals.map((elem) => _.omit(elem, "day")),
    });
  });
  res.send();
};
