import { createServer } from "@src/routes"
import dotenv from "dotenv"
import { fileURLToPath } from "url"

dotenv.config()
const app = createServer()
const port = process.env.PORT || 8000

const __filename = fileURLToPath(import.meta.url)

if (process.argv[1] === __filename) {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  })
}

export default app
