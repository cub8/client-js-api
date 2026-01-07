import request from "supertest"
import { createServer } from "@src/routes"
import clientFactory from "@/test/factories/client_factory"
import type { Client } from "@/generated/prisma/client"

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

  describe("returns clients based on provided parameters in URL", async() => {
    describe("valueEq", async() => {
      it("returns everyone if provided empty valueEq", async() => {
        const response = await request(app).get("/clients?firstNameEq=")
        const clients = response.body
        expect(clients.length).toBe(4)
      })

      it("returns clients based on valueEq", async() => {
        const response = await request(app).get("/clients?firstNameEq=Karol")
        const clients = response.body
        const client = clients[0]

        expect(clients.length).toBe(1)
        expect(client.firstName).toBe("Karol")
        expect(client.lastName).toBe("Nowak")
        expect(client.status).toBe("RESIGNED")
        expect(client.integrations.length).toBe(0)
      })

      it("returns clients based on last name", async() => {
        const response = await request(app).get("/clients?lastNameEq=Nowak")
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
        const response = await request(app).get("/clients?peselEq=12345678901")
        const clients = response.body
        expect(clients.length).toBe(1)

        const client = clients[0]
        expect(client.pesel).toBe("12345678901")
      })

      it("returns based on status", async() => {
        const response = await request(app).get("/clients?statusEq=integrated")
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

    describe("valueIn", async() => {
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
  })

  it("ignores non existing parameters", async() => {
    const response = await request(app).get("/clients?agamemnonEq=Troja")

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(4)
  })

  it("fails if provided same Eq fields twice thus providing an array", async() => {
    const response = await request(app).get("/clients?firstNameEq=Karol&firstNameEq=Antoni")
    expect(response.status).toBe(400)

    const errors = response.body.error
    expect(errors.firstNameEq).toContain("Invalid input: expected string, received array")
  })
})
