const passport = require('passport')

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  )
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );
  app.get('/api/current_user', (request, response) => {
      response.send(request.user)
  });
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
}