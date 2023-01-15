import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";

const URL_API = "/api/tickets";

it("Should has a route handler listening to '/api/tickets/:id'", async () => {
  const response = await request(app).get(`${URL_API}/2347298347`).send();
  expect(response.status).not.toEqual(404);
});

it("Should returns a 400 if 'id' is invalid", async () => {
  await request(app).get(`${URL_API}/2347298347`).send().expect(400);
});

it("Should returns a 404 if ticket don't found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`${URL_API}/${id}`).send().expect(404);
});

it("Should return a ticket if the ticket is found", async () => {
  const title = "It is a ticket";
  const price = 23.5;

  const response = await request(app)
    .post(URL_API)
    .set("Cookie", global.signUpGetCookie())
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`${URL_API}/${response.body.id}`)
    .set("Cookie", global.signUpGetCookie())
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
