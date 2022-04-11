const util = require("util");
const _ = require("lodash");
const {
  getDayWeek,
  getDatesInRange,
  formatDate,
  getStoredData,
  writeData,
} = require("../helpers");
const {
  checkIfTimeScheduleExists,
  checkIfTimeScheduleExistsEqual,
} = require("../middleware/validations");

exports.createSingleTimeSchedule = (req, res) => {
  let data = getStoredData();
  let dayWeek = getDayWeek(req.body.day);
  let timeScheduleExists = checkIfTimeScheduleExists(data[dayWeek], req.body);
  if (timeScheduleExists) {
    return res
      .status(422)
      .send(
        `Horário já cadastrado: horário ${timeScheduleExists.start} - ${timeScheduleExists.end} no dia: ${timeScheduleExists.day}`
      );
  }
  data[dayWeek] = [...data[dayWeek], { ...req.body }];
  writeData(data);
  res.send(data);
};

exports.createDailyTimeSchedule = (req, res) => {
  let data = getStoredData();
  for (let dayWeek in data) {
    let timeScheduleExists = checkIfTimeScheduleExists(data[dayWeek], req.body);
    if (timeScheduleExists) {
      return res
        .status(422)
        .send(
          `Horário já cadastrado: horário ${timeScheduleExists.start} - ${timeScheduleExists.end} na ${dayWeek}`
        );
    }

    data[dayWeek] = [...data[dayWeek], { ...req.body }];
  }
  writeData(data);
  res.send(data);
};

exports.createWeeklyTimeSchedule = (req, res) => {
  let data = getStoredData();
  let { start, end, daysWeek } = req.body;
  daysWeek.map((dayWeek) => {
    let timeScheduleExists = checkIfTimeScheduleExists(data[dayWeek], req.body);
    if (timeScheduleExists) {
      return res
        .status(422)
        .send(
          `Horário já cadastrado: horário ${timeScheduleExists.start} - ${timeScheduleExists.end} na ${dayWeek}`
        );
    }

    data[dayWeek] = [...data[dayWeek], { ...{ start, end } }];
  });

  writeData(data);
  res.send(data);
};

exports.deleteSingleTimeSchedule = (req, res) => {
  let data = getStoredData();
  let dayWeek = getDayWeek(req.body.day);
  let timeScheduleExists = checkIfTimeScheduleExistsEqual(
    data[dayWeek],
    req.body
  );
  if (!timeScheduleExists) {
    return res.status(422).send(`Horário não existente`);
  }
  data[dayWeek] = data[dayWeek].filter((elem) => {
    return !util.isDeepStrictEqual(elem, req.body);
  });

  writeData(data);
  res.send(data);
};

exports.deleteDailyTimeSchedule = (req, res) => {
  let data = getStoredData();
  for (let dayWeek in data) {
    let timeScheduleExists = checkIfTimeScheduleExistsEqual(
      data[dayWeek],
      req.body
    );
    if (!timeScheduleExists) {
      return res.status(422).send(`Horário não existente`);
    }
    data[dayWeek] = data[dayWeek].filter((elem) => {
      return !util.isDeepStrictEqual(elem, req.body);
    });
  }

  writeData(data);
  res.send(data);
};

exports.deleteWeeklyTimeSchedule = (req, res) => {
  let data = getStoredData();
  let { start, end, daysWeek } = req.body;
  for (let dayWeek of daysWeek) {
    let timeScheduleExists = checkIfTimeScheduleExistsEqual(data[dayWeek], {
      start,
      end,
    });
    if (!timeScheduleExists) {
      return res.status(422).send(`Horário não existente`);
    }

    data[dayWeek] = data[dayWeek].filter((elem) => {
      return !util.isDeepStrictEqual(elem, { start, end });
    });
  }

  writeData(data);
  res.send(data);
};

exports.getTimeScheduleInterval = (req, res) => {
  let data = getStoredData();
  let { start, end } = req.body;
  let getDaysInterval = getDatesInRange(start, end);
  let timeScheduleInterval = [];
  getDaysInterval.map((day) => {
    let dayWeek = getDayWeek(day);
    let intervals = data[dayWeek];
    intervals.filter((elem) => {
      if (elem.day == undefined) return true;
      else elem.day === day;
    });

    timeScheduleInterval.push({
        day: day,
        intervals: intervals.map((elem) => _.omit(elem, "day")),
      })
  });
  res.send(timeScheduleInterval);
};
