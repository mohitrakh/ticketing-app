import request from "supertest";
import { app } from "../../app";
it("returns 201 in sucessfull signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test3@test.com",
      password: "password",
    })
    .expect(201);
});
