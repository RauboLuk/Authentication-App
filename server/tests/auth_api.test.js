const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

request = supertest(app);

test("user is logged in", async () => {
  await request
    .post("/api/auth/login")
    .send({ email: "john@wp.pl", password: "dolores" })
    .set("Accept", "application/json")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(async (done) => {
  await mongoose.connection.close();
  done();
});
