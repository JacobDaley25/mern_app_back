const whitelist = [
    'https://plant20water.herokuapp.com',
    'plant20water.herokuapp.com',
    'localhost:3000',
    'localhost:3001',
    'http://localhost:3001',
    'http://localhost:3000'
];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;
