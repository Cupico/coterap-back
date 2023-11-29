const app = require('./server.js')
require('dotenv').config()
const mongoose = require("mongoose");


// Url & server infos
const hostname = process.env.HOST;
const port = process.env.PORT || 8000;


// Connect to database
const database = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5mhur.mongodb.net/rap`)
  .then((res) => console.log("connected to db"))
  .catch((err) => console.log(err))

// ROUTER
const artistsRouter = require("./routes/Artists.js")
app.use("/artists", artistsRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
  console.log(`app hostnam ${hostname}`)
});

app.use((err, req, res, next) => {
  console.error("ERREUR", err)
  res.status(400).send("Erreur")
})


