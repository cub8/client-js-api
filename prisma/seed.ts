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

  await clientFactory.create({
    firstName: "Ignacy",
    lastName: "Paderewski",
    pesel: "13874187487",
    status: "INTEGRATED",
    integrations: [{ type: "INTERNAL" }, { type: "API" }],
  })

  await clientFactory.create({
    firstName: "Jan",
    lastName: "Nowak",
    pesel: "18417498189",
    status: "INTEGRATED",
    integrations: [{ type: "INTERNAL" }, { type: "API" }],
  })

  await clientFactory.create({
    firstName: "Karol",
    lastName: "Nowak",
    pesel: "98189471481",
    status: "REGISTERED",
  })

  await clientFactory.create({
    firstName: "Anna",
    lastName: "Weksel",
    pesel: "09089578749",
    status: "REGISTERED",
  })

  await clientFactory.create({
    firstName: "Bartłomiej",
    lastName: "Weksel",
    pesel: "74878418471",
    status: "RESIGNED",
  })

  await clientFactory.create({
    firstName: "Harold",
    lastName: "Bryne",
    pesel: "34134131311",
    status: "RESIGNED",
  })
}

export async function main() {
  await createClients()
}

main()
