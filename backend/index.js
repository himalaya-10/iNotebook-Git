const connectToMongoose=require('./db')
const cors = require('cors')
const express = require('express')
const passport=require('passport')
const passportSetup=require("./passport")
const session = require('express-session');
connectToMongoose();




const app=express();
app.use(cors({
  origin:"http://localhost:3000",
  methods:["GET","POST","DELETE","PUT"],
  credentials:true
}))
const port=8000
app.use(express.json())

// app.use(
//     cookieSession({
//       name: 'session',
//       keys: ['iNotebook'], // Replace with an array of secret keys for cookie encryption
//       maxAge: 24 * 60 * 60 * 100 // Cookie duration (in milliseconds) - 1 day in this example
//     })
//   );
app.use(
    session({
      secret: 'session#10102001', // Replace with a secure secret key
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day (session expiration)
      },
    })
  );

  app.use(passport.initialize())
  app.use(passport.session())
  
  app.use("/api",require("./routes/auth.js"))
  app.use("/api",require("./routes/notes.js"))

app.use("/auth",require("./routes/passportendpoints.js"))


// app.use("/api/notes",require("./routes/notes.js"))


app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})