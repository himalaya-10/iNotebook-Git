const GoogleStrategy=require("passport-google-oauth20").Strategy;
const passport=require('passport')
const session = require('express-session');

passport.use(
    new GoogleStrategy(
        {
            clientID: "clientID",
            clientSecret: "clientsecret",
            callbackURL: "http://localhost:8000/auth/google/callback",
            scope :["profile","email"]
        },
        function(accessToken, refreshToken, profile,cb) {
          // User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(null, profile);
          // });
          }
    )
)
passport.serializeUser((user,done)=>{
  done(null,user);
});
passport.deserializeUser((user,done)=>{
  done(null,user);
});