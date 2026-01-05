import { PrismaClient, Prisma } from "../generated/prisma/client.ts"

const prisma = new PrismaClient()

const clientData: Prisma.ClientCreateInput[] = [
    {
        firstName: "John",
        lastName: "Doe",
        pesel: '12345678901',
        status: "REGISTERED",
    },
    {
        firstName: "John",
        lastName: "Dowolski",
        pesel: '09876543211',
        status: "INTEGRATED",
        integrations: {
            create: [
                { type: "API" }
            ]
        }
    },
    {
        firstName: "Jan",
        lastName: "Kowalski",
        pesel: '01315666991',
        status: "INTEGRATED",
        integrations: {
            create: [
                { type: "INTERNAL" }
            ]
        }
    },
    {
        firstName: "Eligiusz",
        lastName: "Niewiadomski",
        pesel: "00000000000",
        status: "RESIGNED"
    }
]

export async function main() {
    for (const client of clientData) {
        await prisma.client.create({ data: client})
    }
}

main()
