const mongoose    = require("mongoose")
      Schema      = mongoose.Schema

const userSchema = new Schema({
   username: String,
   age: Number,
   email: String,
   password: String,
})

module.exports = User = mongoose.model("user" , userSchema)