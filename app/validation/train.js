const Joi = require("joi");
const validator = require("koa2-validation");

/** Requests */

const getCityRequestValidate = () =>
  validator({
    params: {
      city: Joi.string()
        .min(1)
        .required()
    }
  });

const getCityByIdRequestValidate = () =>
  validator({
    params: {
      id: Joi.number().required()
    }
  });

const getTrainsRequestValidate = () =>
  validator({
    body: {
      from: Joi.number().required(),
      to: Joi.number().required(),
      date: Joi.date()
        .iso()
        .required()
    }
  });

const getTrainsInfoRequestValidate = () =>
  validator({
    body: {
      from: Joi.number().required(),
      to: Joi.number().required(),
      train: Joi.string().required(),
      date: Joi.date()
        .iso()
        .required()
    }
  });

const getTrainWagonsRequestValidate = () =>
  validator({
    body: {
      from: Joi.number().required(),
      to: Joi.number().required(),
      date: Joi.date()
        .iso()
        .required(),
      train: Joi.string().required(),
      wagonType: Joi.string()
        .min(1)
        .required()
    }
  });

const getWagonRequestValidator = () =>
  validator({
    body: {
      from: Joi.number().required(),
      to: Joi.number().required(),
      train: Joi.string().required(),
      date: Joi.date()
        .iso()
        .required(),
      wagonNumber: Joi.number().required(),
      wagonType: Joi.string()
        .min(1)
        .required(),
      wagonClass: Joi.string()
        .min(1)
        .required()
    }
  });

/** Responses */
const isFindTicketsResponseValid = response => {
  const schema = Joi.object().keys({
    data: Joi.object().keys({
      list: Joi.array().required()
    })
  });

  return Joi.validate(response, schema).error === null;
};

const isTrainInfoResponseValid = response => {
  const schema = Joi.object().keys({
    data: Joi.object().keys({
      tpl: Joi.string(),
      routes: Joi.array()
        .length(1)
        .items(
          Joi.object().keys({
            train: Joi.string().required(),
            list: Joi.array()
              .items(Joi.object().required())
              .required()
          })
        )
    })
  });

  return Joi.validate(response, schema).error === null;
};

const isTrainCoachResponseValid = response => {
  const schema = Joi.object().keys({
    data: Joi.object()
      .keys({
        types: Joi.array().required(),
        wagons: Joi.array().items(Joi.object()),
        tplPage: Joi.string()
      })
      .required()
  });

  return Joi.validate(response, schema).error === null;
};

const isTrainPlaceResponseValid = response => {
  const schema = Joi.object().keys({
    data: Joi.object().keys({
      places: Joi.object().required(),
      schemeId: Joi.string().required(),
      scheme: Joi.object().required()
    })
  });

  return Joi.validate(response, schema).error === null;
};

module.exports = {
  isFindTicketsResponseValid,
  isTrainInfoResponseValid,
  getTrainsRequestValidate,
  getTrainsInfoRequestValidate,
  getTrainWagonsRequestValidate,
  isTrainCoachResponseValid,
  getWagonRequestValidator,
  isTrainPlaceResponseValid,
  getCityRequestValidate,
  getCityByIdRequestValidate
};
