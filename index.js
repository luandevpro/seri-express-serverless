const express         = require("express")
      app             = express()
      sls             = require("serverless-http")
      mongoose        = require("mongoose")
      dotenv          = require("dotenv")
      passport      = require("passport")

dotenv.config()

app.use([
   express.json(),
   express.urlencoded({extended: false})
])    

mongoose
   .connect(process.env.URI_DB , { useNewUrlParser: true })
   .then(() => console.log("connect database success"))
   .catch(err => console.log(err))

app.use(passport.initialize())

app.use("/" , require("./routes"))

module.exports.server = sls(app)

