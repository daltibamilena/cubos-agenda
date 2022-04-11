const { getStoredData, writeData } = require("../helpers");
const { checkIfTimeScheduleExists } = require("../middleware/validations");

exports.execute = (req) => {
 let data = getStoredData();
 let { start, end, daysWeek } = req.body;
 for (let dayWeek of daysWeek) {
   let timeScheduleExists = checkIfTimeScheduleExists(data[dayWeek], req.body);
   if (timeScheduleExists) {
    return {
      status: 422,
      message: `Horário já cadastrado: horário ${timeScheduleExists.start} - ${timeScheduleExists.end}`,
    };
   }

   data[dayWeek] = [...data[dayWeek], { ...{ start, end } }];
 };

 writeData(data);
   return {
     status: 200,
     message: `Horário criado com sucesso: ${JSON.stringify(req.body)}`,
   };
};
