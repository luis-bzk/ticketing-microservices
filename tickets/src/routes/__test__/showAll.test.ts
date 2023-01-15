import request from "supertest";
import app from "../../app";

const URL_API = "/api/tickets";

it("Should has a route handler listening to '/api/tickets'", async () => {
  const response = await request(app).get(URL_API).send();
  expect(response.status).not.toEqual(404);
});

it("Should can fetch a list of tickets", async () => {
  const tickets = [
    { title: "One ticket", price: 24 },
    { title: "Two ticket", price: 54.2 },
    { title: "Three ticket", price: 33.14 },
  ];

  for (const ticket of tickets) {
    await request(app).post(URL_API).set("Cookie", global.signUpGetCookie()).send(ticket).expect(201);
  }

  const ticketsResponse = await request(app).get(URL_API).send().expect(200);

  expect(ticketsResponse.body.length).toEqual(3);

  expect(ticketsResponse.body[0].title).toEqual(tickets[0].title);
  expect(ticketsResponse.body[0].price).toEqual(tickets[0].price);

  expect(ticketsResponse.body[1].title).toEqual(tickets[1].title);
  expect(ticketsResponse.body[1].price).toEqual(tickets[1].price);

  expect(ticketsResponse.body[2].title).toEqual(tickets[2].title);
  expect(ticketsResponse.body[2].price).toEqual(tickets[2].price);
});
