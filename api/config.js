// Import all env vars from .env file
require('dotenv').config()
exports.MONGO_USER = process.env.MONGO_USER
exports.MONGO_PASSWORD = process.env.MONGO_PASSWORD
exports.MONGO_DEFAULT_DATABASE = process.env.MONGO_DEFAULT_DATABASE
exports.JWT_KEY = process.env.JWT_KEY