import express, { type Request, type Response } from "express"
import { validateClientId } from "@src/utils/middleware"

import listClients from "@src/actions/list_clients"
import createClient from "@src/actions/create_client"
import showClient from "@src/actions/show_client"
import updateClient from "@src/actions/update_client"
import updateClientStatus from "@src/actions/update_client_status"
import destroyClient from "@src/actions/destroy_client"
import createIntegration from "@src/actions/create_integration"

export default function defineApiRoutes() {
  const apiRouter = express.Router()

  apiRouter.get("/clients", async(req: Request, res: Response) => {
    const queryParams = req.query
    const { clients, error } = await listClients(queryParams)

    if (error) {
      return res.status(400).send({ error })
    }

    res.status(200).send(clients)
  })

  apiRouter.get("/client/:clientId", validateClientId, async(req: Request, res: Response) => {
    const clientId = req.parsedClientId!
    const client = await showClient(clientId)

    res.status(200).send(client)
  })

  apiRouter.post("/clients", async(req: Request, res: Response) => {
    const params = req.body
    const client = await createClient(params)

    res.status(201).send(client)
  })

  apiRouter.post("/clients/:clientId/integrations", validateClientId, async(req: Request, res: Response) => {
    const clientId = req.parsedClientId!
    const params = req.body
    const { integration, error } = await createIntegration(clientId, params)

    if (error) {
      res.status(422).send({ error })
    }

    res.status(200).send(integration)
  })

  apiRouter.patch("/client/:clientId", validateClientId, async(req: Request, res: Response) => {
    const clientId = req.parsedClientId!
    const params = req.body
    const client = await updateClient(clientId, params)

    res.status(200).send(client)
  })

  apiRouter.patch("/client/:clientId/update_status", validateClientId, async(req: Request, res: Response) => {
    const clientId = req.parsedClientId!
    const status = req.body.status
    const client = await updateClientStatus(clientId, status)

    res.status(200).send(client)
  })

  apiRouter.delete("/client/:clientId", validateClientId, async(req: Request, res: Response) => {
    const isDestroyed = await destroyClient(req.parsedClientId!)
    res.status(200).send({ destroyed: isDestroyed })
  })

  return apiRouter
}
