const mongoose= require("mongoose");
require('dotenv').config()

const Connection = mongoose.connect(process.env.MongoDB_URL);

module.exports = { Connection }



