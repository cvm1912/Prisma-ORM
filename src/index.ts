import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import "dotenv/config"

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const client = new PrismaClient({ adapter })

async function main() {
  await client.user.create({
    data: {
      username: "shivin",
      password: "XXXXXXXXXXXXXXX",
      firstName: "Shivam",
      lastName: "Singh",
    },
  })

  console.log("User created successfully")
}

main()
  