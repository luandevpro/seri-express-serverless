// config/passport-local.js
const passportJWT       = require("passport-jwt");
      LocalStrategy     = require('passport-local').Strategy;
JwtStrategy             = passportJWT.Strategy,
ExtractJwt              = passportJWT.ExtractJwt;
      User              = require('../models/user');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'ILoveServerless';

module.exports = function(passport){
   passport.use(new LocalStrategy(
      {
         usernameField: 'email',
         passwordField: 'password'
      }, (email,password,done) => {
         User.findOne({email: email})
            .then(user => {
               if (!user) {
                  return done(null, false, { message: 'Incorrect username.' });
               }
               bcrypt
                  .compare(password, user.password)
                  .then(isMatched => {
                     if(!isMatched){
                        return done(null, false, { message: 'Password incorrect' })
                     }else{
                        return done(null, user)
                     }
                  })
            })
      }
   ));

   passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({id: jwt_payload.sub}, function(err, user) {
         if (err) {
            return done(err, false);
         }
         if (user) {
            return done(null, user);
         } else {
            return done(null, false);
         }
      });
   }));
}
 