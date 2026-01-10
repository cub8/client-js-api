import { Prisma } from "@/generated/prisma/client"
import type { NextFunction, Request, Response } from "express"

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
