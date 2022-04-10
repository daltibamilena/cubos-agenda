const { regexDate, regexTime } = require("../helpers");
const { celebrate, Joi, Segments } = require("celebrate");
const {
  createSingleTimeSchedule,
  createDailyTimeSchedule,
  createWeeklyTimeSchedule,
  deleteSingleTimeSchedule,
  deleteDailyTimeSchedule,
  deleteWeeklyTimeSchedule,
  
  getTimeScheduleInterval,
} = require("../controller/AgendaController");

module.exports = (app) => {
  app.get("/", (req, res) => {
    let stored_data = fs.readFileSync("time.json");
    let data = JSON.parse(stored_data);
    res.send(data);
  });

  app.post(
    "/",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        day: Joi.string().regex(regexDate).required(),
        start: Joi.string().regex(regexTime).required(),
        end: Joi.string().regex(regexTime).required(),
      }),
    }),
    createSingleTimeSchedule
  );

  app.post(
    "/daily",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        start: Joi.string().regex(regexTime).required(),
        end: Joi.string().regex(regexTime).required(),
      }),
    }),
    createDailyTimeSchedule
  );

  app.post(
    "/weekly",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        dayWeek: Joi.array()
          .items(
            Joi.string().valid(
              "domingo",
              "segunda",
              "terca",
              "quarta",
              "quinta",
              "sexta",
              "sabado"
            )
          )
          .required(),
        start: Joi.string().regex(regexTime).required(),
        end: Joi.string().regex(regexTime).required(),
      }),
    }),
    createWeeklyTimeSchedule
  );

  app.delete(
    "/",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        day: Joi.string().regex(regexDate).required(),
        start: Joi.string().regex(regexTime).required(),
        end: Joi.string().regex(regexTime).required(),
      }),
    }),
    deleteSingleTimeSchedule
  );

  app.delete(
    "/daily",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        start: Joi.string().regex(regexTime).required(),
        end: Joi.string().regex(regexTime).required(),
      }),
    }),
    deleteDailyTimeSchedule
  );

  app.delete(
    "/weekly",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        dayWeek: Joi.array()
          .items(
            Joi.string().valid(
              "domingo",
              "segunda",
              "terca",
              "quarta",
              "quinta",
              "sexta",
              "sabado"
            )
          )
          .required(),
        start: Joi.string().regex(regexTime).required(),
        end: Joi.string().regex(regexTime).required(),
      }),
    }),
    deleteWeeklyTimeSchedule
  );

  app.post("/interval", celebrate({
    [Segments.BODY]: Joi.object().keys({
      start: Joi.string().regex(regexDate).required(),
      end: Joi.string().regex(regexDate).required(),
    }),
  }),
    getTimeScheduleInterval
  ); 
};
