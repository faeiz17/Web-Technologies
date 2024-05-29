export default async function(req, res, next) {
    if (!req.session.user) res.redirect("/login/user-login");
    else next();
};