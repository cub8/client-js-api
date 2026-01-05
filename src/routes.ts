import express, { type Request, type Response, type Application  } from "express"
import { createClient, destroyClient, listClients, listIntegrations, updateClient, updateClientStatus  } from "./actions.ts"

export function setupRoutes() {
  const app: Application = express()
  const port = process.env.PORT || 8000

  app.use(express.json())

  app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Express & TypeScript Server!")
  })

  app.get("/clients", async(req: Request, res: Response) => {
    const queryParams = req.query
    const { clients, error } = await listClients(queryParams)

    if (error) {
      res.status(422).send({ error })
    } else {
      res.status(200).send(clients)
    }
  })

  app.post("/clients", async(req: Request, res: Response) => {
    const params = JSON.parse(req.body)
    const client = await createClient(params)

    res.send(client)
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
    const is_destroyed = destroyClient(clientId)

    res.send({ destroyed: is_destroyed })
  })

  app.post("/integrations", async(req: Request, res: Response) => {
    const queryParams = req.query
    const integrations = listIntegrations(queryParams)

    res.send(integrations)
  })

  app.listen(port, () => {})
}

