import request from "supertest";
import app from "../../app";

it("Response with details about the current user", async () => {
  const cookie = await global.signUpGetCookie();

  const response = await request(app).get("/api/users/currentuser").set("Cookie", cookie).send().expect(200);

  expect(response.body.currentUser.email).toEqual("email@email.com");
}, 30000);

it("Response with null if not authenticated", async () => {
  const response = await request(app).get("/api/users/currentuser").send().expect(200);

  expect(response.body.currentUser).toEqual(null);
}, 30000);
