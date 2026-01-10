import request from "supertest"
import { createServer } from "@src/routes"
import clientFactory from "@factories/client_factory"

const app = createServer()

describe("DELETE /client/:clientId", () => {
  it("should delete existing user if provided correct clientId", async() => {
    const client = await clientFactory.create()
    const clientId = client.id
    const response = await request(app).delete(`/client/${clientId}`)

    expect(response.status).toBe(200)
    expect(response.body.destroyed).toBe(true)
  })

  it("should return 400 if clientID is not a number", async() => {
    const response = await request(app).delete(`/client/jajcarz`)
    expect(response.status).toBe(400)
    expect(response.body.error.clientId).toContain("Provided invalid clientID")
  })

  it("should return 404 if no user exists", async() => {
    const response = await request(app).delete(`/client/1`)
    expect(response.status).toBe(404)
    expect(response.body.error).toEqual("Resource not found")
  })
})
