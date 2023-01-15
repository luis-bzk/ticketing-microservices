import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";

const URL_API = "/api/tickets";

it("Should has a route handler listening to '/api/tickets/:id'", async () => {
  const response = await request(app).put(`${URL_API}/2347298347`).send();
  expect(response.status).not.toEqual(404);
});

it("Should return 401 if user is not authenticated", async () => {
  const response = await request(app).put(`${URL_API}/2347298347`).send({
    title: "One title",
    price: 12.5,
  });
  expect(response.status).toEqual(401);
});

it("Should return a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .put(`${URL_API}/2347298347`)
    .set("Cookie", global.signUpGetCookie())
    .send({ title: "One title", price: 12.5 });
  expect(response.status).not.toEqual(401);
});

it("Should returns a 400 if 'id' is invalid", async () => {
  await request(app).put(`${URL_API}/2347298347`).set("Cookie", global.signUpGetCookie()).send().expect(400);
});

it("Should returns a 404 if ticket don't found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`${URL_API}/${id}`)
    .set("Cookie", global.signUpGetCookie())
    .send({ title: "One title", price: 12.5 })
    .expect(404);
});

it("Should return a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post(URL_API)
    .set("Cookie", global.signUpGetCookie())
    .send({
      title: "It is a ticket",
      price: 23.5,
    })
    .expect(201);

  await request(app)
    .put(`${URL_API}/${response.body.id}`)
    .set("Cookie", global.signUpGetCookie())
    .send({ title: "One title", price: 12.5 })
    .expect(401);
});

it("Should return 400 if the user provides an invalid title or price", async () => {
  const userCookie = global.signUpGetCookie();

  const response = await request(app)
    .post(URL_API)
    .set("Cookie", userCookie)
    .send({
      title: "It is a ticket",
      price: 23.5,
    })
    .expect(201);

  await request(app)
    .put(`${URL_API}/${response.body.id}`)
    .set("Cookie", userCookie)
    .send({
      title: "",
      price: 11,
    })
    .expect(400);

  await request(app)
    .put(`${URL_API}/${response.body.id}`)
    .set("Cookie", userCookie)
    .send({
      title: "This is new?",
      price: -1,
    })
    .expect(400);
});

it("Should return 200 if the ticket provided valid inputs", async () => {
  const title = "It is a ticket";
  const price = 23.5;

  const newTitle = "This is the new ticket";
  const newPrice = 39.21;

  const userCookie = global.signUpGetCookie();

  const response = await request(app)
    .post(URL_API)
    .set("Cookie", userCookie)
    .send({
      title,
      price,
    })
    .expect(201);

  const ticket = await request(app)
    .put(`${URL_API}/${response.body.id}`)
    .set("Cookie", userCookie)
    .send({
      title: newTitle,
      price: newPrice,
    })
    .expect(200);

  expect(ticket.body.title).toEqual(newTitle);
  expect(ticket.body.price).toEqual(newPrice);
});
