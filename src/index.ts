import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg, { Client } from "pg"
import "dotenv/config"
import { todo } from "node:test"

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const client = new PrismaClient({ adapter })

async function main() {
  await client.user.create({
    data: {
      username: "Shiara",
      password: "shiara123",
      firstName: "Shiara",
      lastName: "Singh",
    },
  })

  console.log("User created successfully")
}



// get all users 

async function getUSers(){
    let result = await client.user.findMany()
    console.log("Users: ", result)

}

// getUSers();

async function getUser()
{
    let result =  await client.user.findUnique({
        where:{
            id: 1
        },
        include:{
            todo:true
        }
    })

    console.log(result)
}

getUser();


async function updateUser(){
    let result = await client.user.update({
        where:{
            id:1
        },
        data:{
            username: "Shiara Singh"
        },
    })

    console.log(result)
}

// updateUser();


async function deleteUser(){
    let result = await client.user.delete({
        where:{
            id:1
        }
    })

    console.log("result is deleted")
}
  

