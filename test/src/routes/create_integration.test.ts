import request from "supertest"
import { createServer } from "@src/routes"
import clientFactory from "@/test/factories/client_factory"

const app = createServer()

describe("POST /clients/:client_id/integration", () => {
  let clientId: number

  beforeEach(async() => {
    const client = await clientFactory.create({
      firstName: "Krystian",
      lastName: "Czeski",
      pesel: "12345678901",
      status: "REGISTERED",
      integrations: [{ type: "INTERNAL" }],
    })
    clientId = client.id
  })

  it("should add new integration to client", async() => {
    const payload = {
      type: "API",
    }

    const response = await request(app)
      .post(`/api/clients/${clientId}/integrations`)
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(200)
    expect(response.body.type).toEqual("API")
  })

  it ("should return 400 if provided invalid clientId", async() => {
    const payload = {
      type: "API",
    }

    const response = await request(app)
      .post("/api/clients/invalid/integrations")
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(400)
    expect(response.body.error.clientId).toContain("Provided invalid clientID")
  })


  it ("should return 404 code if no client exists for provided ID", async() => {
    const payload = {
      type: "API",
    }

    const response = await request(app)
      .post("/api/clients/999/integrations")
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(404)
    expect(response.body.error).toContain("Resource not found")
  })

  it("should return 422 if integration already exists", async() => {
    const payload = {
      type: "INTERNAL",
    }

    const response = await request(app)
      .post(`/api/clients/${clientId}/integrations`)
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(422)
    expect(response.body.error).toContain("This type of integration already exists")
  })

  it("should return 422 if provided non-existing integration type", async() => {
    const payload = {
      type: "MAILER",
    }

    const response = await request(app)
      .post(`/api/clients/${clientId}/integrations`)
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(422)
    expect(response.body.error.type).toContain('Invalid option: expected one of "API"|"INTERNAL"')
  })

  it("should return 422 if didn't provide integration type", async() => {
    const response = await request(app)
      .post(`/api/clients/${clientId}/integrations`)
      .set("Accept", "application/json")
      .send({})

    expect(response.status).toBe(422)
    expect(response.body.error.type).toContain('Invalid option: expected one of "API"|"INTERNAL"')
  })
})
