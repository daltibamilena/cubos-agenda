const { getStoredData, writeData, getDayWeek } = require("../helpers");
const { checkIfTimeScheduleExistsEqual } = require("../middleware/validations");  
const util = require("util");

exports.execute = (req) => {
  let data = getStoredData();
  let dayWeek = getDayWeek(req.body.day);
  let timeScheduleExists = checkIfTimeScheduleExistsEqual(
    data[dayWeek],
    req.body
  );
  if (!timeScheduleExists) {
    return {
      status: 422,
      message: `Horário não existente`,
    };
  }
  data[dayWeek] = data[dayWeek].filter((elem) => {
    return !util.isDeepStrictEqual(elem, req.body);
  });

  writeData(data);
  return {
    status: 200,
    message: `Horário excluido com sucesso: ${JSON.stringify(req.body)}`,
  };
};
