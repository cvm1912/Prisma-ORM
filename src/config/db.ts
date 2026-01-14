import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import "dotenv/config"

export const connectDatabase = async  () =>{
   const pool = await new pg.Pool({ connectionString: process.env.DATABASE_URL })
   const adapter = await new PrismaPg(pool)
   const client = await new PrismaClient({ adapter })
}
