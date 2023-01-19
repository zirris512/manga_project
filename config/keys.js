console.log(process.env.DB_URI);

module.exports = {
    DB_URI: process.env.DB_URI || "mongodb://localhost/manga_app",
};
