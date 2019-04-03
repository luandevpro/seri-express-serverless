const express      = require("express")
      router       = express.Router()
   userControllers = require("../controllers/user.controllers")
   middleware      = require("../middleware/isAuth")
   
router
   .route("/api/home")
   .get(userControllers.home)

router
   .route("/api/users/signup")
   .post(userControllers.signup)
 
router
   .route("/api/users/signin")
   .post(userControllers.signin)
 
router
   .route("/api/users/profile")
   .get(middleware.isAuth,userControllers.getUser)

module.exports = router