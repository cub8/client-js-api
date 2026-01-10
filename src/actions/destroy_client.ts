import prisma from "@src/prisma"

export default async function destroyClient(clientId: number): Promise<boolean> {
  await prisma.client.delete({
    where: {
      id: clientId,
    },
  })

  return true
}
