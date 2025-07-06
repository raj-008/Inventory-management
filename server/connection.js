const mongooes = require('mongoose');

function connectMongoDB(url) {
    return mongooes.connect(url);
}


module.exports = { connectMongoDB };