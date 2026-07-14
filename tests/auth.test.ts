import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";

import app from "../src/app";
import { prisma } from "../src/lib/prisma";

describe("Auth", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  const createUser = () => ({
    name: "Gabriela Test",
    email: `gabriela${Date.now()}@email.com`,
    password: "123456",
  });

  it("should register a new user", async () => {
    const user = createUser();

    const response = await request(app)
      .post("/auth/register")
      .send(user);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.email).toBe(user.email);
  });

  it("should login user and return token", async () => {
    const user = createUser();

    await request(app)
      .post("/auth/register")
      .send(user);

    const response = await request(app)
      .post("/auth/login")
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("token");
  });

  it("should not register user with existing email", async () => {
    const user = createUser();

    await request(app)
      .post("/auth/register")
      .send(user);

    const response = await request(app)
      .post("/auth/register")
      .send(user);

    expect(response.status).toBe(500);
  });

  it("should not login with wrong password", async () => {
    const user = createUser();

    await request(app)
      .post("/auth/register")
      .send(user);

    const response = await request(app)
      .post("/auth/login")
      .send({
        email: user.email,
        password: "wrong-password",
      });

    expect(response.status).toBe(500);
  });
});