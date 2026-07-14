import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";

import app from "../src/app";
import { prisma } from "../src/lib/prisma";

describe("Symptoms", () => {
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
    return await request(app)
      .post("/cycles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        startDate: "2026-07-01",
        endDate: "2026-07-06",
        cycleLength: 28,
        notes: "Normal cycle",
      });
  }

  async function createSymptom(token: string, cycleId: number) {
    return await request(app)
      .post("/symptoms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        cycleId,
        name: "Cramps",
        intensity: 7,
        notes: "Pain during first days",
      });
  }

  it("should create a symptom", async () => {
    const token = await createUserAndLogin();

    const cycle = await createCycle(token);

    const response = await createSymptom(
      token,
      cycle.body.id
    );

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Cramps");
  });

  it("should list user symptoms", async () => {
    const token = await createUserAndLogin();

    const cycle = await createCycle(token);

    await createSymptom(
      token,
      cycle.body.id
    );

    const response = await request(app)
      .get("/symptoms")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveLength(1);
  });

  it("should get symptom by id", async () => {
    const token = await createUserAndLogin();

    const cycle = await createCycle(token);

    const symptom = await createSymptom(
      token,
      cycle.body.id
    );

    const response = await request(app)
      .get(`/symptoms/${symptom.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.id).toBe(
      symptom.body.id
    );
  });

  it("should update a symptom", async () => {
    const token = await createUserAndLogin();

    const cycle = await createCycle(token);

    const symptom = await createSymptom(
      token,
      cycle.body.id
    );

    const response = await request(app)
      .put(`/symptoms/${symptom.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Headache",
        intensity: 5,
        notes: "Updated symptom",
      });

    expect(response.status).toBe(200);

    expect(response.body.name).toBe("Headache");
    expect(response.body.intensity).toBe(5);
  });

  it("should delete a symptom", async () => {
    const token = await createUserAndLogin();

    const cycle = await createCycle(token);

    const symptom = await createSymptom(
      token,
      cycle.body.id
    );

    const response = await request(app)
      .delete(`/symptoms/${symptom.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it("should not create symptom without authentication", async () => {
    const response = await request(app)
      .post("/symptoms")
      .send({
        cycleId: 1,
        name: "Cramps",
        intensity: 7,
        notes: "Pain during first days",
      });

    expect(response.status).toBe(401);
  });

  it("should not find a symptom that does not exist", async () => {
    const token = await createUserAndLogin();

    const response = await request(app)
      .get("/symptoms/999999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should not access another user's symptom", async () => {
    const userToken = await createUserAndLogin();
    const otherUserToken = await createUserAndLogin();

    const cycle = await createCycle(userToken);

    const symptom = await createSymptom(
      userToken,
      cycle.body.id
    );

    const response = await request(app)
      .get(`/symptoms/${symptom.body.id}`)
      .set("Authorization", `Bearer ${otherUserToken}`);

    expect(response.status).toBe(404);
  });
});