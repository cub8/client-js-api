import express, { type Request, type Response, type Application } from "express"
import { handlePrismaRecordNotFound, handleValidationError } from "@src/utils/middleware"

import defineApiRoutes from "@src/routes/api"

export function createServer() {
  const app: Application = express()

  app.use(express.json())
  app.use(express.static("public"))

  app.get("/", (_req: Request, res: Response) => {
    res.send("Welcome to Express & TypeScript Server!")
  })

  app.use("/api", defineApiRoutes())
  app.use(handlePrismaRecordNotFound)
  app.use(handleValidationError)

  return app
}

