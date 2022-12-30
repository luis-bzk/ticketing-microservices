import request from "supertest";
import app from "../../app";

it("Should return a 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "emailemail.com",
      password: "123456",
    })
    .expect(400);
}, 30000);

it("Should return a 400 with password less than 6 or greater than 20", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "email@email.com",
      password: "12345",
    })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "email@email.com",
      password: "123456789012345678901",
    })
    .expect(400);
}, 30000);

it("Should return a 400 with missing email or password", async () => {
  await request(app).post("/api/users/signup").send({ email: "email@email.com" }).expect(400);

  await request(app).post("/api/users/signup").send({ password: "123456" }).expect(400);

  await request(app).post("/api/users/signup").send({}).expect(400);
}, 30000);

it("Should disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "email@email.com",
      password: "123456",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "email@email.com",
      password: "123456",
    })
    .expect(400);
});

it("Should return a 201 on successfully signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "email@email.com",
      password: "123456",
    })
    .expect(201);
}, 30000);

it("Should sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "email@email.com",
      password: "123456",
    })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
