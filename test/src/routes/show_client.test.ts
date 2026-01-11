import request from "supertest"
import { createServer } from "@src/routes"
import clientFactory from "@factories/client_factory"

const app = createServer()

describe("GET /client/:clientId", () => {
  it("should return the client if provided correct clientId", async() => {
    const client = await clientFactory.create()
    const clientId = client.id
    const response = await request(app).get(`/api/client/${clientId}`)

    expect(response.status).toBe(200)
    expect(response.body.id).toBe(clientId)
    expect(response.body.integrations).toEqual([])
  })

  it("should return the client with integrations", async() => {
    const client = await clientFactory.create({
      integrations: [{ type: "API" }],
    })
    const clientId = client.id
    const response = await request(app).get(`/api/client/${clientId}`)

    expect(response.status).toBe(200)
    expect(response.body.id).toBe(clientId)
    expect(response.body.integrations).toHaveLength(1)
    expect(response.body.integrations[0].type).toBe("API")
  })

  it("should return 400 if clientID is not a number", async() => {
    const response = await request(app).get(`/api/client/invalid`)
    expect(response.status).toBe(400)
    expect(response.body.error.clientId).toContain("Provided invalid clientID")
  })

  it("should return 404 if no user exists", async() => {
    const response = await request(app).get(`/api/client/99999`)
    expect(response.status).toBe(404)
    expect(response.body.error).toEqual("Resource not found")
  })
})
