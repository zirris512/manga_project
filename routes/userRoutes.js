const express = require("express");
const passport = require("../config/passport/index");
const User = require("../models/User");

const router = express.Router();

const regValidation = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

// eslint-disable-next-line consistent-return
router.post("/register", (req, res) => {
    const { user, password, password2 } = req.body;
    const errors = [];

    if (!user || !password || !password2) {
        errors.push({ msg: "Must fill out all fields!" });
    }
    if (password !== password2) {
        errors.push({ msg: "Passwords must match!" });
    }
    if (password.length < 6 || password.length > 20) {
        errors.push({ msg: "Password must be between 6-20 characters!" });
    }
    if (!password.match(regValidation)) {
        errors.push({
            msg: "Password must contain an uppercase, lowercase, and number!",
        });
    }
    if (errors.length > 0) {
        return res.send(errors);
    }

    // eslint-disable-next-line consistent-return
    User.findOne({ user }).then((result) => {
        if (result) {
            errors.push({ msg: "User already exists!" });
            return res.send(errors);
        }

        const newUser = new User({ user, password });
        newUser.save().catch((err) => {
            return res.status(500).json({ msg: err.message });
        });
        return res.json("OK");
    });
});

router.post(
    "/login",
    passport.authenticate("local", { failWithError: true }),
    (req, res) => {
        const user = JSON.parse(JSON.stringify(req.user));
        const cleanUser = { ...user };

        if (cleanUser) {
            delete cleanUser.password;
        }
        return res.json({ user: cleanUser });
    },
    (err, req, res, _next) => {
        return res.json("Incorrect user/password");
    }
);

router.get("/user", (req, res) => {
    if (req.user) return res.json({ user: req.user });
    return res.json({ user: null });
});

router.post("/logout", (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy();
        res.clearCookie("connect.sid");
        res.json("Successfully logged out");
    });
});

module.exports = router;
