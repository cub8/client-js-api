import request from "supertest"
import { createServer } from "@src/routes"
import clientFactory from "@test/factories/client_factory"

const app = createServer()

describe("GET /clients", async() => {
  beforeEach(async() => {
    await clientFactory.create({
      firstName: "Jan",
      lastName: "Nowak",
      pesel: "12345678901",
    })

    await clientFactory.create({
      firstName: "Eligiusz",
      lastName: "Niewiadomski",
      status: "INTEGRATED",
      pesel: "00000000000",
      integrations: [{ type: "API" }],
    })

    await clientFactory.create({
      firstName: "Antoni",
      lastName: "Baka",
      status: "INTEGRATED",
      integrations: [{ type: "INTERNAL" }, { type: "API" }],
    })

    await clientFactory.create({
      firstName: "Karol",
      lastName: "Nowak",
      status: "RESIGNED",
    })
  })

  it("handles non existing status", async() => {
    const response = await request(app).get("/api/clients?statusEq=Troja")
    expect(response.status).toBe(400)
    expect(response.body.error.statusEq).toContain("Invalid option: expected one of \"REGISTERED\"|\"INTEGRATED\"|\"RESIGNED\"")
  })

  it("ignores non existing parameters", async() => {
    const response = await request(app).get("/api/clients?agamemnonEq=Troja")

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(4)
  })

  it("fails if provided same Eq fields twice thus providing an array", async() => {
    const response = await request(app).get("/api/clients?firstNameEq=Karol&firstNameEq=Antoni")
    expect(response.status).toBe(400)

    const errors = response.body.error
    expect(errors.firstNameEq).toContain("Invalid input: expected string, received array")
  })
})
