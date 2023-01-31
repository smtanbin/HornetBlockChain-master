import express, { application } from "express"
import * as jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import logger from "morgan"
import cors from "cors"

//Route configuration
const authRouter = require("./src/routes/auths_routes")
const vartixRouter = require("./src/routes/vartix_routes")
const blockChainRouter = require("./src/routes/blockchain_routes")
const walletRouter = require("./src/routes/wallet_routes")

require("dotenv").config()
const secret = "mysecret" // A secret key for signing the JWT
const refreshSecret = "myrefreshsecret"

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
  console.log("Running in development mode")
}

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.get("/status", (req, res): any => {
  res.send({ Massage: "I am alive." })
})

// Routes
app.use("/", authRouter)
app.use("/blockchain", blockChainRouter)
app.use("/vartix", vartixRouter)
app.use("/wallet", walletRouter)

// Error handlers
app.use((err: any, req: any, res: any, next: () => void) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
  next()
})
// Undefined error
app.use("/*", (req: any, res: any, next) => {
  res.status(404).json({ Error: "Invalid Address" })
  next()
})

export default app
