const Artist = require("../models/Artist")
const getArtistUrl = require("../spotify")


// GET 
const getArtists = async (req, res) => {

    console.log("QUERY", req.query)

    // Object result
    let artists = [];

    // Query?
    let search = {};
    if (req.query.search) {
        let re = new RegExp(req.query.search, 'i');
        search = { name: re }
    }



    // Pagination ---------------------------
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    let page = req.query.page ? parseInt(req.query.page) - 1 : 0;
    let skip = page * limit;

    if (req.query.page) {
        artists = await Artist.find(search).limit(limit).skip(skip);
        const pageNumber = Math.ceil((await Artist.find().count()) / limit);
        return res.status(200).send({ artists: artists, totalPages: pageNumber });
    }




    // IF PAGE = GAME ---------------------------
    if (req.query.game) {
        const gameArtists = await Artist.aggregate(
            [
                {
                    $sample: { size: 11 }
                },
                {
                    $project: { name: 1, img: 1, auditeurs: 1 }
                }
            ]
        )

        artists = gameArtists;
        return res.status(200).send(artists);
    }


    artists = await Artist.find(search).limit(limit);
    console.log("ARTIST", artists)
    return res.status(200).send(artists);


};

// GET by ID
const getSpecificArtist = async (req, res) => {


    const foundedArtist = await Artist.findOne({ rap_genius_id: req.params.id })
    console.log(foundedArtist)
    if (foundedArtist) {
        res.status(200).send(foundedArtist);
    } else {
        res.status(400).send({ message: "L'artiste n'existe pas" });
    }

};



// POST 
const postArtists = async (req, res, next) => {



    const handlePostArtist = async (body, auditeurs, spotify_id) => {

        body.auditeurs = auditeurs
        body.spotify_id = spotify_id

        const newArtist = new Artist(req.body)

        const insertArtist = await newArtist.save()

        console.log("nexArt", insertArtist)

        if (insertArtist) res.status(201).send(insertArtist);


    };

    await getArtistUrl(req.body.name, req.body, handlePostArtist)



}


// GET by ID
const deleteArtist = async (req, res) => {
    // console.log("routed called ?")

    const deletedArtist = await Artist.deleteOne({ rap_genius_id: req.params.id })

    if (deletedArtist) {
        res.status(200).send(deletedArtist);
    }

};



module.exports = { getArtists, getSpecificArtist, postArtists, deleteArtist };