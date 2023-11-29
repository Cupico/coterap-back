const express = require("express");
const { getArtists, postArtists, getSpecificArtist, deleteArtist } = require("../controllers/Artists")
const artistsRouter = express.Router();

// GET
artistsRouter.get("/", getArtists);

// GET By ID
artistsRouter.get("/:id", getSpecificArtist);

// POST 
artistsRouter.post("/", postArtists);

// DELETE 
artistsRouter.delete("/:id", deleteArtist);

module.exports = artistsRouter;