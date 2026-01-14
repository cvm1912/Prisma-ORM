import express from 'express'
import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg, { Client } from "pg"
import "dotenv/config"
import { todo } from "node:test"

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const client = new PrismaClient({ adapter })


const app = express()

app.get('/users',(req,res)=>{
    const users = client.user.findMany();
    return res.status(200).json({
        success:true,
        message:"Data Retrived Successful",
        data: users
    })
})


app.get('/users/:id',(req,res)=>{
   const userId = req.params.id

   if(!userId){
    return res.status(400).json({
        success:false,
        message:"User Id is required"
    })
   }

   const result = client.user.findUnique({
    where:{
        id: parseInt(userId)
    }
   }) 

   return res.status(200).json({
        success:true,
        message:"Data Retrived Successful",
        data: result
    })
})


app.post('/create', (req,res)=>{
    const {username, password, firstName, lastName} = req.body
    if(!username || !password || !firstName || !lastName){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }

    const result = client.user.create({data:{
        username,
        password,
        firstName,
        lastName
    }})

    return res.status(200).json({
        success:true,
        message:"User Created Successfully",
        data: result
    })
})





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

// getUser();


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

app.put('/update-user/:id',(req,res)=>{
   let userId = req.params.id
   if(!userId){
    return res.json(        {
            success:false,
            message:"User id is required"
        })
   }

   const result = client.user.findUnique({
       where: {
           id: parseInt(userId)
       }
   })

   return res.status(200).json({
       success:true,
       message:"User Updated Successfully",
       data: result
   })
})



app.delete('delete-user/:id',(req,res)=>{
   let userId = req.params.id
   if(!userId){
    return res.json(        {
            success:false,
            message:"User id is required"
        })
   }

    const result = client.user.delete({
       where: {
           id: parseInt(userId)
       }
   })

    return res.status(200).json({
       success:true,
       message:"User Deleted Successfully",
       data: result
   })

})


async function deleteUser(){
    let result = await client.user.delete({
        where:{
            id:1
        }
    })

    console.log("result is deleted")
}
  
app.listen(8000, ()=>{
    console.log("Server is running on port 8000")
})
