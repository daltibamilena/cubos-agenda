const {
  getDatesInRange,
  getDayWeek
} = require("../helpers");
const { checkIfTimeScheduleExists } = require("../middleware/validations");

test("Get Data In Range", () => {
  let result = getDatesInRange("20-10-2022", "23-10-2022");
  expect(result).toEqual([
    "20-10-2022",
    "21-10-2022",
    "22-10-2022",
    "23-10-2022",
  ]);
});

test("Get invalid range data", () => {
  let result = getDatesInRange("10-10-2022", "01-10-2022");
  expect(result).toEqual([]);
});

test("Get day of the week", () => {
  let result = getDayWeek("11-04-2022");
  expect(result).toEqual("seg");
});

test("Get invalid day of the week", () => {
  let result = getDayWeek("04-35-2022");
  expect(result).toEqual("Data inválida");
});

const dateExamples = [
  { start: "07:30", end: "08:00" },
  { start: "08:30", end: "10:00" },
  { day: "13-04-2022", start: "11:30", end: "12:00" },
  { day: "11-04-2022", start: "14:00", end: "15:00" },
  { day: "11-04-2022", start: "15:30", end: "17:00" },
];
describe("Validates date", () => {
  test("Return if date and time exists", () => {
    let newData = { day: "13-04-2022", start: "08:45", end: "9:00" };
    let result = checkIfTimeScheduleExists(dateExamples, newData);
    expect(result).toEqual(dateExamples[1]);
  });

  test("Return if date and time doesnt exists", () => {
    let newData = { day: "12-04-2022", start: "14:45", end: "17:00" };
    let result = checkIfTimeScheduleExists(dateExamples, newData);
    expect(result).toEqual(undefined);
  });

  test("Return if date and time exists", () => {
    let newData = { start: "06:30", end: "16:30" };
    let result = checkIfTimeScheduleExists(dateExamples, newData);
    expect(result).toEqual(dateExamples[4]);
  });
  test("Return if date and time doesnt exists", () => {
    let newData = { day: "11-04-2022", start: "11:30", end: "12:00" };
    let result = checkIfTimeScheduleExists(dateExamples, newData);
    expect(result).toEqual(undefined);
  });

  test("Return if date and time exists", () => {
    let newData = { start: "13:30", end: "14:30" };
    let result = checkIfTimeScheduleExists(dateExamples, newData);
    expect(result).toEqual(dateExamples[3]);
  });
});
