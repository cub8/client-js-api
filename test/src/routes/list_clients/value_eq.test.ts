import request from "supertest"
import { createServer } from "@src/routes"
import clientFactory from "@test/factories/client_factory"
import type { Client } from "@prisma/client"

const app = createServer()

describe("GET /clients by valueEq", async() => {
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

  it("returns everyone if provided empty valueEq", async() => {
    const response = await request(app).get("/api/clients?firstNameEq=")
    const clients = response.body
    expect(clients.length).toBe(4)
  })

  it("returns clients based on valueEq", async() => {
    const response = await request(app).get("/api/clients?firstNameEq=Karol")
    const clients = response.body
    const client = clients[0]

    expect(clients.length).toBe(1)
    expect(client.firstName).toBe("Karol")
    expect(client.lastName).toBe("Nowak")
    expect(client.status).toBe("RESIGNED")
    expect(client.integrations.length).toBe(0)
  })

  it("returns clients based on last name", async() => {
    const response = await request(app).get("/api/clients?lastNameEq=Nowak")
    const clients = response.body
    expect(clients.length).toBe(2)

    const byFirstName = (name: string) => {
      return (client: Client) => (client.firstName === name)
    }

    const jan = clients.find(byFirstName("Jan"))
    const karol = clients.find(byFirstName("Karol"))

    expect(jan.integrations.length).toEqual(0)
    expect(jan.status).toEqual("REGISTERED")
    expect(karol.integrations.length).toEqual(0)
    expect(karol.status).toEqual("RESIGNED")
  })

  it("returns based on pesel", async() => {
    const response = await request(app).get("/api/clients?peselEq=12345678901")
    const clients = response.body
    expect(clients.length).toBe(1)

    const client = clients[0]
    expect(client.pesel).toBe("12345678901")
  })

  it("returns based on status", async() => {
    const response = await request(app).get("/api/clients?statusEq=integrated")
    const clients = response.body
    expect(clients.length).toBe(2)

    const byFirstName = (name: string) => {
      return (client: Client) => (client.firstName === name)
    }

    const eligiusz = clients.find(byFirstName("Eligiusz"))
    const antoni = clients.find(byFirstName("Antoni"))

    expect(eligiusz).not.toBeNullable()
    expect(antoni).not.toBeNullable()
  })
})
