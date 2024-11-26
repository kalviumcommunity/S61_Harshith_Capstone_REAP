const passport = require('passport');
const express = require("express");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require('jsonwebtoken');
const User = require('../Model/UserSchema'); 
require('dotenv').config();

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://s61-harshith-capstone-reap.onrender.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        
        if (!user) {
          user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id
          });
          await user.save();
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: '24h',
        });

        return done(null, { user, token });
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"], prompt: "select_account" })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://client-an8wgi3ai-harshith-amaravathis-projects.vercel.app/login",
  }),
  (req, res) => {
    // Send JWT token to client
    res.redirect(`https://client-an8wgi3ai-harshith-amaravathis-projects.vercel.app/dashboard`);
  }
);

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Example protected route
app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: "You have accessed a protected route!", user: req.user });
});

module.exports = app;
