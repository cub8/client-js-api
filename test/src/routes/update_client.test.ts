import request from "supertest"
import { createServer } from "@src/routes"
import clientFactory from "@/test/factories/client_factory"

const app = createServer()

describe("PATCH /client/:clientId", () => {
  let clientId: number

  beforeEach(async() => {
    const client = await clientFactory.create({
      firstName: "Krystian",
      lastName: "Czeski",
      pesel: "12345678901",
    })
    clientId = client.id
  })

  it("should update client with all fields", async() => {
    const payload = {
      firstName: "Jan",
      lastName: "Kowalski",
      pesel: "98765432109",
    }

    const response = await request(app)
      .patch(`/client/${clientId}`)
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(200)

    const updatedClient = response.body
    expect(updatedClient.firstName).toBe("Jan")
    expect(updatedClient.lastName).toBe("Kowalski")
    expect(updatedClient.pesel).toBe("98765432109")
  })

  it("should update client with partial fields", async() => {
    const payload = {
      firstName: "Piotr",
    }

    const response = await request(app)
      .patch(`/client/${clientId}`)
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(200)

    const updatedClient = response.body
    expect(updatedClient.firstName).toBe("Piotr")
    expect(updatedClient.lastName).toBe("Czeski")
    expect(updatedClient.pesel).toBe("12345678901")
  })

  it("should return 400 if provided invalid clientId", async() => {
    const payload = {
      firstName: "Jan",
    }

    const response = await request(app)
      .patch("/client/invalid")
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(400)
    expect(response.body.error.clientId).toContain("Provided invalid clientID")
  })

  it("should return 404 if client not found", async() => {
    const payload = {
      firstName: "Jan",
    }

    const response = await request(app)
      .patch("/client/99999")
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(404)
    expect(response.body.error).toContain("Resource not found")
  })

  it("should return 422 if provided invalid firstName", async() => {
    const payload = {
      firstName: "Adamer224Adamer224Adamer224Adamer224Adamer224",
    }

    const response = await request(app)
      .patch(`/client/${clientId}`)
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(422)
    expect(response.body.firstName).toContain("First name must be max 40 characters long")
  })

  it("should return 422 if provided invalid lastName", async() => {
    const payload = {
      lastName: "Adamer224Adamer224Adamer224Adamer224Adamer224Adamer224Adamer224Adamer224Adamer224",
    }

    const response = await request(app)
      .patch(`/client/${clientId}`)
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(422)
    expect(response.body.lastName).toContain("Last name must be max 80 characters long")
  })

  it("should return 422 if provided invalid pesel", async() => {
    const payload = {
      pesel: "abcdefg",
    }

    const response = await request(app)
      .patch(`/client/${clientId}`)
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(422)
    expect(response.body.pesel).toContain("PESEL must be exactly 11 character long")
    expect(response.body.pesel).toContain("PESEL must contain only digits")
  })

  it("should return 422 if provided empty firstName", async() => {
    const payload = {
      firstName: "",
    }

    const response = await request(app)
      .patch(`/client/${clientId}`)
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(422)
    expect(response.body.firstName).toContain("First name must be min 1 character long")
  })
})
