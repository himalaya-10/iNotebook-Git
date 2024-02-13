const GoogleStrategy=require("passport-google-oauth20").Strategy;
const passport=require('passport')
const session = require('express-session');

passport.use(
    new GoogleStrategy(
        {
            clientID: "517741880459-ect17kps81cc09t23snp2ev2k80gfqjb.apps.googleusercontent.com",
            clientSecret: "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",
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