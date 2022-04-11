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
  showTimeSchedule,
} = require("../controller/AgendaController");

module.exports = (app) => {
  app.get("/", showTimeSchedule);

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
        daysWeek: Joi.array()
          .items(
            Joi.string().valid("dom", "seg", "ter", "qua", "qui", "sex", "sab")
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
        daysWeek: Joi.array()
          .items(
            Joi.string().valid("dom", "seg", "ter", "qua", "qui", "sex", "sáb")
          )
          .required(),
        start: Joi.string().regex(regexTime).required(),
        end: Joi.string().regex(regexTime).required(),
      }),
    }),
    deleteWeeklyTimeSchedule
  );

  app.post(
    "/interval",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        start: Joi.string().regex(regexDate).required(),
        end: Joi.string().regex(regexDate).required(),
      }),
    }),
    getTimeScheduleInterval
  );
};
