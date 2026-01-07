import request from "supertest"
import { createServer } from "@src/routes"
import clientFactory from "@test/factories/client_factory"
import type { Client } from "@prisma/client"

const app = createServer()

describe("GET /clients by valueIn", async() => {
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

  it("returns nothing if provided empty valueIn", async() => {
    const response = await request(app).get("/clients?firstNameIn=")
    const clients = response.body
    expect(clients.length).toBe(0)
  })

  it("returns clients based on a single valueIn", async() => {
    const response = await request(app).get("/clients?firstNameIn=Antoni")
    const clients = response.body
    expect(clients.length).toBe(1)

    const antoni = clients[0]
    expect(antoni).not.toBeNullable()
    expect(antoni.lastName).toBe("Baka")
    expect(antoni.integrations.length).toBe(2)
  })

  it("returns clients based on valueIn", async() => {
    const response = await request(app).get("/clients?firstNameIn=Antoni&firstNameIn=Eligiusz")
    const clients = response.body
    expect(clients.length).toBe(2)

    const byFirstName = (name: string) => {
      return (client: Client) => (client.firstName === name)
    }

    const eligiusz = clients.find(byFirstName("Eligiusz"))
    const antoni = clients.find(byFirstName("Antoni"))

    expect(eligiusz).not.toBeNullable()
    expect(eligiusz.lastName).toBe("Niewiadomski")
    expect(eligiusz.integrations.length).toBe(1)
    expect(antoni).not.toBeNullable()
    expect(antoni.lastName).toBe("Baka")
    expect(antoni.integrations.length).toBe(2)
  })

  it("returns clients based on last names", async() => {
    const response = await request(app).get("/clients?lastNameIn=Nowak&lastNameIn=Niewiadomski")
    const clients = response.body
    expect(clients.length).toBe(3)

    const byFirstName = (name: string) => {
      return (client: Client) => (client.firstName === name)
    }

    const jan = clients.find(byFirstName("Jan"))
    const karol = clients.find(byFirstName("Karol"))
    const eligiusz = clients.find(byFirstName("Eligiusz"))

    expect(jan.integrations.length).toEqual(0)
    expect(jan.status).toEqual("REGISTERED")
    expect(karol.integrations.length).toEqual(0)
    expect(karol.status).toEqual("RESIGNED")
    expect(eligiusz.integrations.length).toEqual(1)
    expect(eligiusz.status).toEqual("INTEGRATED")
  })

  it("returns based on pesels", async() => {
    const response = await request(app).get("/clients?peselIn=12345678901&peselIn=00000000000")
    const clients = response.body
    expect(clients.length).toBe(2)

    const byPesel = (pesel: string) => {
      return (client: Client) => (client.pesel === pesel)
    }

    const jan = clients.find(byPesel("12345678901"))
    const eligiusz = clients.find(byPesel("00000000000"))

    expect(jan).not.toBeNullable()
    expect(jan.firstName).toBe("Jan")
    expect(eligiusz).not.toBeNullable()
    expect(eligiusz.firstName).toBe("Eligiusz")
  })

  it("returns based on statuses", async() => {
    const response = await request(app).get("/clients?statusIn=REGISTERED&statusIn=resigned")
    const clients = response.body
    expect(clients.length).toBe(2)

    const byStatus = (status: string) => {
      return (client: Client) => (client.status === status)
    }

    const registered = clients.find(byStatus("REGISTERED"))
    const resigned = clients.find(byStatus("RESIGNED"))

    expect(registered).not.toBeNullable()
    expect(resigned).not.toBeNullable()
  })
})
