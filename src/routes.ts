import express, { type Request, type Response, type Application  } from "express"
import { createClient, destroyClient, listClients, listIntegrations, updateClient, updateClientStatus,  } from "./actions.ts";

export function setupRoutes() {
    const app: Application = express();
    const port = process.env.PORT || 8000;

    app.get('/', (req: Request, res: Response) => {
        res.send('Welcome to Express & TypeScript Server!')
    })

    app.get("/clients", (req: Request, res: Response) => {
        const queryParams = req.query
        const clients = listClients(queryParams)

        res.send(clients)
    })

    app.post("/clients", (req: Request, res: Response) => {
        const params = JSON.parse(req.body)
        const client = createClient(params)

        res.send(client)
    })

    app.patch("/client/:clientId", (req: Request, res: Response) => {
        const clientId = req.params.clientId
        const params = JSON.parse(req.body)
        const client = updateClient(clientId, params)

        res.send(client)
    })

    app.patch("/client/:clientId/update_status", (req: Request, res: Response) => {
        const clientId = req.params.clientId
        const params = JSON.parse(req.body)
        const status = params.status
        const client = updateClientStatus(clientId, status)

        res.send(client)
    })

    app.delete("/client/:clientId", (req: Request, res: Response) => {
        const clientId = req.params.clientId
        const is_destroyed = destroyClient(clientId)

        res.send({ destroyed: is_destroyed })
    })

    app.post("/integrations", (req: Request, res: Response) => {
        const queryParams = req.query
        const integrations = listIntegrations(queryParams)

        res.send(integrations)
    })

    app.listen(port, () => {})
}

