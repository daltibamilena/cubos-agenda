const showTimeScheduleService = require("../services/showTimeScheduleService");
const createSingleTimeScheduleService = require("../services/createSingleTimeScheduleService");
const createDailyTimeScheduleService = require("../services/createDailyTimeScheduleService");
const createWeeklyTimeScheduleService = require("../services/createWeeklyTimeScheduleService");
const deleteSingleTimeScheduleService = require("../services/deleteSingleTimeScheduleService");
const deleteDailyTimeScheduleService = require("../services/deleteDailyTimeScheduleService");
const deleteWeeklyTimeScheduleService = require("../services/deleteWeeklyTimeScheduleService");
const getTimeScheduleIntervalService = require("../services/getTimeScheduleIntervalService");

exports.showTimeSchedule = (_, res) => {
  let { status, message } = showTimeScheduleService.execute();
  res.status(status).send(message);
};

exports.createSingleTimeSchedule = (req, res) => {
  let { status, message } = createSingleTimeScheduleService.execute(req);
  res.status(status).send(message);
};

exports.createDailyTimeSchedule = (req, res) => {
  let { status, message } = createDailyTimeScheduleService.execute(req);
  res.status(status).send(message);
};

exports.createWeeklyTimeSchedule = (req, res) => {
  let { status, message } = createWeeklyTimeScheduleService.execute(req);
  res.status(status).send(message);
};

exports.deleteSingleTimeSchedule = (req, res) => {
  let { status, message } = deleteSingleTimeScheduleService.execute(req);
  res.status(status).send(message);
};

exports.deleteDailyTimeSchedule = (req, res) => {
  let { status, message } = deleteDailyTimeScheduleService.execute(req);
  res.status(status).send(message);
};

exports.deleteWeeklyTimeSchedule = (req, res) => {
  let { status, message } = deleteWeeklyTimeScheduleService.execute(req);
  res.status(status).send(message);
};

exports.getTimeScheduleInterval = (req, res) => {
  let { status, message } = getTimeScheduleIntervalService.execute(req);
  res.status(status).send(message);
};
