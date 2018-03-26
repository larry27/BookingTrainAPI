const Router = require("koa-router");
const {
  getTrainsRequestValidate,
  getTrainsInfoRequestValidate,
  getTrainWagonsRequestValidate,
  getWagonRequestValidator,
  getCityRequestValidate,
  getCityByIdRequestValidate
} = require("./../validation/train");

const API = require("./../api/train");
const CITY_API = require("./../api/city/city");

module.exports = app => {
  const router = new Router();

  router.get("/city/:city", getCityRequestValidate(), async ctx => {
    ctx.set('Content-Type', 'application/json')
    const cities = await CITY_API.getCity(ctx.params.city);
    ctx.body = JSON.stringify(cities);
  });

  router.get("/city-id/:id", getCityByIdRequestValidate(), async ctx => {
    const city = await CITY_API.getCityById(ctx.params.id);
    ctx.body = JSON.stringify(city);
  });

  router.post("/trains", getTrainsRequestValidate(), async ctx => {
    ctx.body = await API.findTickets(ctx.request.body);
  });

  router.post("/trains-info", getTrainsInfoRequestValidate(), async ctx => {
    let body = ctx.request.body;
    ctx.body = await API.getTrainInfo(body);
  });

  router.post("/train-wagons", getTrainWagonsRequestValidate(), async ctx => {
    ctx.body = await API.getTrainCoach(ctx.request.body);
  });

  router.post("/wagon", getWagonRequestValidator(), async ctx => {
    ctx.body = await API.getCoachPlace(ctx.request.body);
  });
  app.use(router.routes()).use(router.allowedMethods());
};
