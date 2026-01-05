import { describe, it, expect } from "vitest"
import request from "supertest"
import { createServer } from "@src/routes"

const app = createServer()

describe("GET /", () => {
  it("should return the welcome message and 200 status", async() => {
    const response = await request(app).get("/")
    expect(response.status).toBe(200)
    expect(response.text).toBe("Welcome to Express & TypeScript Server!")
  })
})
