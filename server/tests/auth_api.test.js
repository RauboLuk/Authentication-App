const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

request = supertest(app);

describe("auth api", () => {
  const user = { email: "john1@wp.pl", password: "dolores" };

  test("signup user", async () => {
    const response = await request
      .post("/api/auth/signup")
      .send(user)
      .set("Accept", "application/json")
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toMatchObject({ email: user.email });
  });

  test("409 error with message when signup with email that already exist", async () => {
    const response = await request
      .post("/api/auth/signup")
      .send(user)
      .set("Accept", "application/json")
      .expect(409)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toMatchObject({ error: "email is already taken" });
  });

  test("user can login", async () => {
    const response = await request
      .post("/api/auth/login")
      .send(user)
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toMatchObject({ email: user.email });
  });

  test("login, 404 error if password or email is incorrect", async () => {
    const response = await request
      .post("/api/auth/login")
      .send({ email: "jo@wp.pl", password: "dolores" })
      .set("Accept", "application/json")
      .expect(404)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toMatchObject({ error: "incorrect email or password" });
  });
});

afterAll(async (done) => {
  await User.deleteMany({});
  await mongoose.connection.close();
  done();
});
