const _ = require("lodash");
const util = require("util");
const moment = require("moment");

exports.checkIfTimeScheduleExists = (storedData, newData) => {
  return _.find(storedData, (elem) => {
    if (isBetween(newData.start, elem.start, elem.end)) {
      if (newData.day && elem.day && elem.day != newData.day) return false;
      return true;
    }
    if (isBetween(newData.end, elem.start, elem.end)) {
      if (newData.day && elem.day && elem.day != newData.day) return false;
      return true;
    }
  });
};

const isBetween = (firstValue, secondValue, thirdValue) => {
  let format = "HH:mm";
  return moment(firstValue, format).isBetween(
    moment(secondValue, format),
    moment(thirdValue, format),
    null,
    []
  );
};

exports.checkIfTimeScheduleExistsEqual = (storedData, newData) => {
  return _.find(storedData, (elem) => util.isDeepStrictEqual(elem, newData));
};
