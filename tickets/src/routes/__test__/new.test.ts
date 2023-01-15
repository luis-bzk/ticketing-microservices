import request from "supertest";

import app from "../../app";

import { TicketModel } from "../../models";

const URL_API = "/api/tickets";

it("Should has a route handler listening to '/api/tickets' for post request", async () => {
  const response = await request(app).post(URL_API).send({});
  expect(response.status).not.toEqual(404);
});

it("Should can only be accessed if the user is signed in", async () => {
  const response = await request(app).post(URL_API).send({});
  expect(response.status).toEqual(401);
});

it("Should return a status other than 401 if the user is signed in", async () => {
  const response = await request(app).post(URL_API).set("Cookie", global.signUpGetCookie()).send({});
  expect(response.status).not.toEqual(401);
});

it("Should returns an error if invalid title is provided", async () => {
  await request(app)
    .post(URL_API)
    .set("Cookie", global.signUpGetCookie())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);

  await request(app)
    .post(URL_API)
    .set("Cookie", global.signUpGetCookie())
    .send({
      price: 10,
    })
    .expect(400);
});

it("Should returns as error if an invalid price is provided", async () => {
  await request(app)
    .post(URL_API)
    .set("Cookie", global.signUpGetCookie())
    .send({
      title: "One ticket",
      price: -1,
    })
    .expect(400);

  await request(app)
    .post(URL_API)
    .set("Cookie", global.signUpGetCookie())
    .send({
      title: "One ticket",
    })
    .expect(400);
});

it("Should creates a ticket with valid inputs", async () => {
  let tickets = await TicketModel.find({});
  const title = "One ticket";
  const price = 10.2;

  expect(tickets.length).toEqual(0);

  await request(app)
    .post(URL_API)
    .set("Cookie", global.signUpGetCookie())
    .send({
      title,
      price,
    })
    .expect(201);

  tickets = await TicketModel.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].price).toEqual(price);
  expect(tickets[0].title).toEqual(title);
});
