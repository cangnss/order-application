const express = require("express")
const dotenv = require("dotenv")
const { createProxyMiddleware } = require("http-proxy-middleware")
dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use("/order-service", createProxyMiddleware({
    target: process.env.SERVICE_URL,
    pathRewrite:{
        "^/order-service": ''
    }
}))


app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
})




