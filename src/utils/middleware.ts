import { Prisma } from "@/generated/prisma/client"
import type { NextFunction, Request, Response } from "express"
import { ValidationError } from "@src/utils/errors"

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      parsedClientId?: number
    }
  }
}

export function handlePrismaRecordNotFound(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(404).send({
        error: "Resource not found",
      })
    }
  }

  next(err)
}

export function validateClientId(req: Request, res: Response, next: NextFunction) {
  const clientId = Number(req.params.clientId)

  if (isNaN(clientId)) {
    return res.status(400).send({ error: { clientId: ["Provided invalid clientID"] } })
  }

  req.parsedClientId = clientId

  next()
}

export function handleValidationError(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ValidationError) {
    return res.status(422).send({ error: err.fieldErrors })
  }
  next(err)
}
