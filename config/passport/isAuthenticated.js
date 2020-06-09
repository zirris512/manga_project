// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
   if (req.isAuthenticated()) return next();
   res.json('Must be logged in to access!');
};
