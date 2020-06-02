const express = require('express')

const app = express()

app.use(express.static('./dist'))

app.listen(8998,()=>{
    console.log("server running at http://127.0.0.1:8998")
})