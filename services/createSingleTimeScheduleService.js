const { getDayWeek, getStoredData, writeData } = require("../helpers");
const { checkIfTimeScheduleExists } = require("../middleware/validations");

exports.execute = (req) => {
  let data = getStoredData();
  let dayWeek = getDayWeek(req.body.day);
  let timeScheduleExists = checkIfTimeScheduleExists(data[dayWeek], req.body);
  if (timeScheduleExists) {
    return {
      status: 422,
      message: `Horário já cadastrado: horário ${timeScheduleExists.start} - ${timeScheduleExists.end} no dia: ${timeScheduleExists.day}`,
    };
  }
  data[dayWeek] = [...data[dayWeek], { ...req.body }];
  writeData(data);
  return {
    status: 200,
    message: `Horário criado com sucesso: ${JSON.stringify(req.body)}`,
  };
};
