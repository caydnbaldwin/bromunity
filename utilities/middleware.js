class Middleware {
  authenticate(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    
    const publicPaths = ['/', '/favicon.ico', '/authentication/error', '/authentication/signup', '/authentication/login'];

    if (publicPaths.includes(req.path)) {
      return next();
    };

    if (req.session?.authentication) {
      return next();
    };

    return res.redirect('/authentication/error');
  };
};

module.exports = new Middleware();