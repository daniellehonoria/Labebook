// import express from 'express'
// import cors from 'cors'
// import { postsRouter } from './router/postsRouter'
// import dotenv from 'dotenv'

// dotenv.config()
// const app = express()

// app.use(cors()) 
// app.use(express.json()) 

// app.listen(3003, () => 
// { console.log(`Servidor rodando na porta ${3003}`) })
// // app.listen(Number(process.env.PORT), () => {
// //     console.log(`Servidor rodando na porta ${process.env.PORT}`)
// // })
// app.use("/posts", postsRouter)

import express, { Request, Response } from 'express' 
import dotenv from 'dotenv'

import cors from 'cors' 
dotenv.config()
const app = express() 

app.use(cors()) 
app.use(express.json()) 
app.listen(Number(process.env.PORT), () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
})