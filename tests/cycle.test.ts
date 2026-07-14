import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";

import app from "../src/app";
import { prisma } from "../src/lib/prisma";

describe("Cycles", () => {
  beforeEach(async () => {
    await prisma.symptom.deleteMany();
    await prisma.cycle.deleteMany();
    await prisma.user.deleteMany();
  });

  async function createUserAndLogin() {
    const user = {
      name: "Gabriela Test",
      email: `gabriela${Date.now()}@email.com`,
      password: "123456",
    };

    await request(app)
      .post("/auth/register")
      .send(user);

    const login = await request(app)
      .post("/auth/login")
      .send({
        email: user.email,
        password: user.password,
      });

    return login.body.token;
  }

  async function createCycle(token: string) {
  const response = await request(app)
    .post("/cycles")
    .set("Authorization", `Bearer ${token}`)
    .send({
      startDate: "2026-07-01",
      endDate: "2026-07-06",
      cycleLength: 28,
      notes: "Mild cramps",
    });

  return response;
}

  it("should create a cycle", async () => {
    const token = await createUserAndLogin();

    const response = await createCycle(token);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.cycleLength).toBe(28);
  });

  it("should list user cycles", async () => {
    const token = await createUserAndLogin();

    await createCycle(token);

    const response = await request(app)
      .get("/cycles")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveLength(1);
  });

  it("should get cycle by id", async () => {
    const token = await createUserAndLogin();

    const cycle = await createCycle(token);

    const response = await request(app)
      .get(`/cycles/${cycle.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.id).toBe(cycle.body.id);
  });

  it("should update a cycle", async () => {
    const token = await createUserAndLogin();

    const cycle = await createCycle(token);

    const response = await request(app)
      .put(`/cycles/${cycle.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        cycleLength: 30,
        notes: "Updated notes",
      });

    expect(response.status).toBe(200);

    expect(response.body.cycleLength).toBe(30);
    expect(response.body.notes).toBe("Updated notes");
  });

  it("should delete a cycle", async () => {
    const token = await createUserAndLogin();

    const cycle = await createCycle(token);

    const response = await request(app)
      .delete(`/cycles/${cycle.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});