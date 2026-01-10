import request from "supertest"
import { createServer } from "@src/routes"
import clientFactory from "@/test/factories/client_factory"

const app = createServer()

describe("PATCH /client/:clientId/update_status", () => {
  let clientId: number

  beforeEach(async() => {
    const client = await clientFactory.create({
      firstName: "Krystian",
      lastName: "Czeski",
      pesel: "12345678901",
      status: "REGISTERED",
    })
    clientId = client.id
  })

  it("should update client status to INTEGRATED", async() => {
    const payload = {
      status: "INTEGRATED",
    }

    const response = await request(app)
      .patch(`/client/${clientId}/update_status`)
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(200)
    expect(response.body.status).toBe("INTEGRATED")
  })

  it("should update client status to RESIGNED", async() => {
    const payload = {
      status: "RESIGNED",
    }

    const response = await request(app)
      .patch(`/client/${clientId}/update_status`)
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(200)
    expect(response.body.status).toBe("RESIGNED")
  })

  it("should keep other client fields unchanged after status update", async() => {
    const payload = {
      status: "INTEGRATED",
    }

    const response = await request(app)
      .patch(`/client/${clientId}/update_status`)
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(200)
    expect(response.body.firstName).toBe("Krystian")
    expect(response.body.lastName).toBe("Czeski")
    expect(response.body.pesel).toBe("12345678901")
    expect(response.body.status).toBe("INTEGRATED")
  })

  it("should return 400 if provided invalid clientId", async() => {
    const payload = {
      status: "INTEGRATED",
    }

    const response = await request(app)
      .patch("/client/invalid/update_status")
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(400)
    expect(response.body.clientId).toContain("Provided invalid clientID")
  })

  it("should return 404 if client not found", async() => {
    const payload = {
      status: "INTEGRATED",
    }

    const response = await request(app)
      .patch("/client/99999/update_status")
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(404)
    expect(response.body.error).toContain("Resource not found")
  })

  it("should return 422 if provided invalid status", async() => {
    const payload = {
      status: "INVALID_STATUS",
    }

    const response = await request(app)
      .patch(`/client/${clientId}/update_status`)
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(422)
    expect(response.body.status).toBeDefined()
  })

  it("should return 422 if status is missing", async() => {
    const payload = {}

    const response = await request(app)
      .patch(`/client/${clientId}/update_status`)
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(422)
    expect(response.body.status).toBeDefined()
  })
})
