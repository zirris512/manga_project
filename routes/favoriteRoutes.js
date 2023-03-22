const express = require("express");
const db = require("../models");
const isAuthenticated = require("../config/passport/isAuthenticated");

const router = express.Router();

const { Favorites, User } = db;

router.post("/addFavorite", isAuthenticated, (req, res, next) => {
    const { listID, title, image, type } = req.body;
    // eslint-disable-next-line no-underscore-dangle
    const id = req.user._id;
    const newFav = {
        listID,
        title,
        image,
        type,
    };

    Favorites.create(newFav).then((response) => {
        User.findOneAndUpdate(
            { _id: id },
            // eslint-disable-next-line no-underscore-dangle
            { $push: { favorites: response._id } }
        ).catch((err) => {
            if (err) next(err);
        });
        res.json(response);
    });
});

router.get("/populate", isAuthenticated, (req, res, next) => {
    // eslint-disable-next-line no-underscore-dangle
    const id = req.user._id;

    User.findById(id)
        .populate("favorites")
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            if (err) next(err);
        });
});

router.delete("/removeFavorite/:id", isAuthenticated, (req, res, next) => {
    // eslint-disable-next-line no-underscore-dangle
    const id = req.user._id;
    Favorites.findOne({ _id: req.params.id }).then((response) => {
        if (response) {
            // eslint-disable-next-line no-underscore-dangle
            const favoriteID = response._id;

            response.remove();

            User.findByIdAndUpdate(id, {
                $pull: { favorites: favoriteID },
            })
                .then(() => {
                    res.json("OK");
                })
                .catch((err) => {
                    next(err);
                });
        }
    });
});

module.exports = router;
