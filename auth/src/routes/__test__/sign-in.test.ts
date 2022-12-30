import request from "supertest";
import app from "../../app";

it("Should return a 400 with invalid email", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "emailemail.com",
      password: "123456",
    })
    .expect(400);
}, 30000);

it("Should return a 400 with missing email or password", async () => {
  await request(app).post("/api/users/signin").send({ email: "email@email.com" }).expect(400);

  await request(app).post("/api/users/signin").send({ password: "123456" }).expect(400);

  await request(app).post("/api/users/signin").send({}).expect(400);
}, 30000);

it("Should return a 400 when email that not exists is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "email@email.com",
      password: "123456",
    })
    .expect(400);
}, 30000);

it("Should return a 400 when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "email@email.com",
      password: "123456",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "email@email.com",
      password: "1234567890",
    })
    .expect(400);
}, 30000);

it("Should return a 200 when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "email@email.com",
      password: "123456",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "email@email.com",
      password: "123456",
    })
    .expect(200);
}, 30000);

it("Should sets a cookie after successful login", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "email@email.com",
      password: "123456",
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "email@email.com",
      password: "123456",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
}, 30000);
