import { PrismaClient, Prisma } from "../generated/prisma/client.ts"

const prisma = new PrismaClient()

const clientData: Prisma.ClientCreateInput[] = [
    {
        first_name: "John",
        last_name: "Doe",
        pesel: '12345678901',
        status: "REGISTERED",
    },
    {
        first_name: "John",
        last_name: "Dowolski",
        pesel: '09876543211',
        status: "INTEGRATED",
        integrations: {
            create: [
                { type: "API" }
            ]
        }
    },
    {
        first_name: "Jan",
        last_name: "Kowalski",
        pesel: '01315666991',
        status: "INTEGRATED",
        integrations: {
            create: [
                { type: "INTERNAL" }
            ]
        }
    },
    {
        first_name: "Eligiusz",
        last_name: "Niewiadomski",
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
