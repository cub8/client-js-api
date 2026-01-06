import express, { type Request, type Response, type Application  } from "express"
import { destroyClient, listClients, listIntegrations, updateClient, updateClientStatus  } from "@src/actions"

import createClient from "@src/actions/create_client"

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

    const { client, errors } = await createClient(params)

    console.log(errors)

    if (errors) {
      return res.status(422).send(errors)
    }
    res.status(201).send(client)
  })

  app.patch("/client/:clientId", async(req: Request, res: Response) => {
    const clientId = req.params.clientId
    const params = JSON.parse(req.body)
    const client = updateClient(clientId, params)

    res.send(client)
  })

  app.patch("/client/:clientId/update_status", async(req: Request, res: Response) => {
    const clientId = req.params.clientId
    const params = JSON.parse(req.body)
    const status = params.status
    const client = updateClientStatus(clientId, status)

    res.send(client)
  })

  app.delete("/client/:clientId", async(req: Request, res: Response) => {
    const clientId = req.params.clientId
    const isDestroyed = destroyClient(clientId)

    res.send({ destroyed: isDestroyed })
  })

  app.post("/integrations", async(req: Request, res: Response) => {
    const queryParams = req.query
    const integrations = listIntegrations(queryParams)

    res.send(integrations)
  })

  return app
}

