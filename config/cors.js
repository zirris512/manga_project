const WHITE_LIST = ["http://localhost:3000", "http://localhost:3001/"];
exports.corsOptions = {
    origin: (origin, callback) => {
        if (WHITE_LIST.includes(origin) || !origin) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
};
