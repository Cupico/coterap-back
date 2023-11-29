const axios = require('axios');
const qs = require('qs');
require('dotenv').config()
const getAuditeurs = require('./scrap')
const postArtists = require('./controllers/Artists')


const SPOTIFY_ID = process.env.SPOTIFY_ID; // Your client id
const SPOTIFY_SECRET = process.env.SPOTIFY_SECRET; // Your secret
const auth_token = Buffer.from(`${SPOTIFY_ID}:${SPOTIFY_SECRET}`, 'utf-8').toString('base64');


// GET TOKEN 
const getAuth = async () => {
    try {
        //make post request to SPOTIFY API for access token, sending relavent info
        const token_url = 'https://accounts.spotify.com/api/token';
        const data = qs.stringify({ 'grant_type': 'client_credentials' });

        const response = await axios.post(token_url, data, {
            headers: {
                'Authorization': `Basic ${auth_token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        if (response.status === 200)
            //return access token
            token = response.data.access_token
        return response.data.access_token;

    } catch (error) {
        //on fail, log the error in console
        console.log(error);
    }
}



// GET artist URL for scrapping
const getArtistUrl = async (artist_name, req_body, postArtist) => {

    const token = await getAuth();

    console.log("tok", token)

    const url = `https://api.spotify.com/v1/search?q=?${artist_name}&type=artist`

    return axios
        .get(`${url}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((res) => {
            const spotify_id = res.data.artists.items.find(e => e.id).id;
            const spotify_url = res.data.artists.items.find(e => e.external_urls).external_urls.spotify;
            if (spotify_url) {
                getAuditeurs(spotify_url)
                    .then((response) => {
                        let auditeurs = response[0];
                        console.log("AURIDTEURS", auditeurs)

                        // REGEX
                        const regex = /([^abc]+)/;
                        let auditeurs_regex = regex.exec(auditeurs)[0];
                        auditeurs_regex = auditeurs_regex.replace(/\s/g, '')


                        // SAVE ARTIST IN DATABASE
                        postArtist(req_body, parseInt(auditeurs_regex), spotify_id)

                    }
                    )
                    .catch((err) => console.log("err", err))
            }

        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = getArtistUrl;




