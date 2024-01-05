require('dotenv').config()


module.exports = {
  MongoURI:
    process.env.MONGODB_ATLAS_KEYS,
};