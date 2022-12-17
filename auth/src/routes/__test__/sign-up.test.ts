import request from "supertest";
import app from "../../app";

it("Return a 201 on successfully signup", async () => {
  return request(app)
    .post("/api/users/sign-up")
    .send({
      email: "email@email.com",
      password: "123456",
    })
    .expect(201);
}, 30000);
