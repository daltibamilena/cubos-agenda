const { getStoredData, writeData } = require("../helpers");
const { checkIfTimeScheduleExistsEqual } = require("../middleware/validations");
const util = require("util");

exports.execute = (req) => {
  let data = getStoredData();
  let { start, end, daysWeek } = req.body;
  for (let dayWeek of daysWeek) {
    let timeScheduleExists = checkIfTimeScheduleExistsEqual(data[dayWeek], {
      start,
      end,
    });
    if (!timeScheduleExists) {
      return {
        status: 422,
        message: `Horário não existente`,
      };
    }
    data[dayWeek] = data[dayWeek].filter((elem) => {
      return !util.isDeepStrictEqual(elem, { start, end });
    });
  }

  writeData(data);
  return {
    status: 200,
    message: `Horário excluido com sucesso: ${JSON.stringify(req.body)}`,
  };
};
