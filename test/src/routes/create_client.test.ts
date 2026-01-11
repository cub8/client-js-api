import request from "supertest"
import { createServer } from "@src/routes"

const app = createServer()

describe("POST /clients", () => {
  it("should create new client and return it", async() => {
    const payload = {
      firstName: "Adam",
      lastName: "Nowacki",
      pesel: "01195678123",
      note: "Egeszegere",
    }

    const response = await request(app)
      .post("/api/clients")
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(201)

    const createdClient = response.body

    expect(createdClient.id).toBeTypeOf("number")
    expect(createdClient.firstName).toBe("Adam")
    expect(createdClient.lastName).toBe("Nowacki")
    expect(createdClient.pesel).toBe("01195678123")
    expect(createdClient.status).toBe("REGISTERED")
    expect(createdClient.note).toBe("Egeszegere")
  })

  it("should return 422 if failed to create client due to provided params", async() => {
    const payload = {
      firstName: "Adamer224Adamer224Adamer224Adamer224Adamer224",
      lastName: "Adamer224Adamer224Adamer224Adamer224Adamer224Adamer224Adamer224Adamer224Adamer224",
      pesel: "abcdefg",
    }

    const response = await request(app)
      .post("/api/clients")
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(422)

    const errors = response.body.error
    expect(errors.firstName).toContain("First name must be max 40 characters long")
    expect(errors.lastName).toContain("Last name must be max 80 characters long")
    expect(errors.pesel).toContain("PESEL must be exactly 11 character long")
    expect(errors.pesel).toContain("PESEL must contain only digits")
  })

  it("should return 422 if failed to create client if not provided enough params", async() => {
    const payload = {
      pesel: "abcdefg",
    }

    const response = await request(app)
      .post("/api/clients")
      .set("Accept", "application/json")
      .send(payload)

    expect(response.status).toBe(422)

    const errors = response.body.error
    expect(errors.firstName).toContain("First name is required")
    expect(errors.lastName).toContain("Last name is required")
  })
})
