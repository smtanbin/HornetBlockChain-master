import express, { application } from "express"
// import * as jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import cors from "cors"

// Logging configuration
import logger from "morgan"
import { log, logEvents } from "./src/middleware/logEvents"
import errorHandler from "./src/middleware/errorHandler"

// Apps
import { spawn } from "child_process"

//Route configuration
const authRouter = require("./src/routes/auths_routes")
const vartixRouter = require("./src/routes/vartix_routes")
const blockChainRouter = require("./src/routes/blockchain_routes")
const walletRouter = require("./src/routes/wallet_routes")

require("dotenv").config()
// const secret = "mysecret" // A secret key for signing the JWT
// const refreshSecret = "myrefreshsecret"

// Optations
const corsOptions = {
  origin: "*",
}

// Add on
const app = express()
app.use(cors(corsOptions))
if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode")
} else {
  app.use(logger("dev"))
  console.log("Running in development mode")
}

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(log)

// Routes

app.get("/status", (req, res): any => {
  res.send({ Massage: "I am alive." })
})

app.use("/", authRouter)
app.use("/blockchain", blockChainRouter)
app.use("/vartix", vartixRouter)
app.use("/wallet", walletRouter)

// Express Install
app.post("/listFiles", (req, res) => {
  const child = spawn("find", ["."])

  child.stdout.on("data", (data) => {
    res.send(data)
  })
  child.on("error", (error) => {
    console.error(`error: ${error.message}`)
    res.status(405).json(`Error: ${error.message}`)
  })
  child.on("close", (code) => {
    console.log(`child process exited with code ${code}`)
  })
})

app.post("/migrate", (req, res) => {
  const script = "migrate"
  const child = spawn("bash", ["npm", "run", script])

  child.stdout.on("data", (data) => {
    res.send(`output: ${data}`)
  })

  child.on("close", (code) => {
    res.send(`child process exited with code ${code}`)
  })
})
app.post("/sync", (req, res) => {
  const script = "sync"
  const child = spawn("bash", ["npm", "run", script])

  child.stdout.on("data", (data) => {
    res.send(`output: ${data}`)
  })

  child.on("close", (code) => {
    res.send(`child process exited with code ${code}`)
  })
})

// Error handlers
app.use(errorHandler)
// app.use((err: any, req: any, res: any, next: () => void) => {
//   console.error(err.stack)
//   res.status(500).send("Something broke!")
//   next()
// })

// Undefined error
app.use("/*", (req: any, res: any, next) => {
  res.status(404).json({ Error: "Invalid Address" })
  next()
})

export default app
