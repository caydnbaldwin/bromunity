class Middleware {
  authenticate(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    
    const publicPaths = ['/', '/favicon.ico', '/authentication/signup', '/authentication/login'];

    if (publicPaths.includes(req.path)) {
      return next();
    };

    if (req.session?.authentication) {
      return next();
    };

    return res.render('login-page', {errorMessage: 'Please login to access that page.'});
  };
};

module.exports = new Middleware();