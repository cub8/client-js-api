import express, { type Request, type Response, type Application, type NextFunction } from "express"
import { handlePrismaRecordNotFound, validateClientId } from "@src/utils/middleware"

import listClients from "@src/actions/list_clients"
import createClient from "@src/actions/create_client"
import updateClient from "@src/actions/update_client"
import updateClientStatus from "@src/actions/update_client_status"
import destroyClient from "@src/actions/destroy_client"

export function createServer() {
  const app: Application = express()

  app.use(express.json())

  app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Express & TypeScript Server!")
  })

  app.get("/clients", async(req: Request, res: Response) => {
    const queryParams = req.query
    const { clients, error } = await listClients(queryParams)

    if (error) {
      return res.status(400).send({ error })
    }

    res.status(200).send(clients)
  })

  app.post("/clients", async(req: Request, res: Response) => {
    const params = req.body

    const { client, error } = await createClient(params)

    if (error) {
      return res.status(422).send(error)
    }
    res.status(201).send(client)
  })

  app.patch("/client/:clientId", validateClientId, async(req: Request, res: Response, _next: NextFunction) => {
    const clientId = req.parsedClientId!
    const params = req.body
    const { client, error } = await updateClient(clientId, params)

    if (error) {
      const { errors, code } = error
      return res.status(code).send(errors)
    }

    res.status(200).send(client)
  })

  app.patch("/client/:clientId/update_status", validateClientId, async(req: Request, res: Response) => {
    const clientId = req.parsedClientId!
    const status = req.body.status
    const { client, error } = await updateClientStatus(clientId, status)

    if (error) {
      const { errors, code } = error
      return res.status(code).send(errors)
    }

    res.send(client)
  })

  app.delete("/client/:clientId", validateClientId, async(req: Request, res: Response) => {
    const { isDestroyed, error } = await destroyClient(req.parsedClientId!)

    if (error) {
      return res.status(error.code).send({ destroyed: isDestroyed, error: error.message })
    }

    res.status(200).send({ destroyed: isDestroyed })
  })

  app.use(handlePrismaRecordNotFound)

  return app
}

