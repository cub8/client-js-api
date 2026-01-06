import clientFactory from "@factories/client_factory"

async function createClients() {
  await clientFactory.create({
    firstName: "John",
    lastName: "Doe",
    pesel: "12345678901",
    status: "REGISTERED",
  })

  await clientFactory.create({
    firstName: "John",
    lastName: "Dowolski",
    pesel: "09876543211",
    status: "INTEGRATED",
    integrations: [{ type: "API" }],
  })

  await clientFactory.create({
    firstName: "Jan",
    lastName: "Kowalski",
    pesel: "01315666991",
    status: "INTEGRATED",
    integrations: [{ type: "INTERNAL" }],
  })

  await clientFactory.create({
    firstName: "Eligiusz",
    lastName: "Niewiadomski",
    pesel: "00000000000",
    status: "RESIGNED",
  })
}

export async function main() {
  await createClients()
}

main()
