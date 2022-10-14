const mongoose = require('mongoose');
const { CONSTANTS } = require('.');

const dbConnection = () => {
    mongoose.connect(CONSTANTS.DB.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    // eslint-disable-next-line no-console
    db.on('error', (err) => console.error(`Database connection error - ${err.toString()}`));
    // eslint-disable-next-line no-console
    db.once('open', () => console.log('Database connected'));
};

module.exports = {
    dbConnection,
};
