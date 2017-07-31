module.exports = function (app, passport) {


  app.get('/', function (req, res) {
    // get the user out of session and pass to template
    res.locals.user = req.user
    res.render('index')
  })

  app.route('/login')
    .get( (req, res) => {
      res.locals.message = req.flash('loginMessage')
      // render the page and pass in any flash data if it exists
      res.render('login')
    })
    .post(passport.authenticate('local-login', {
        // redirect to the secure profile section
        successRedirect : '/profile',
        // redirect back to the signup page if there is an error
        failureRedirect : '/login', 
        // allow flash messages
        failureFlash : true 
    }))

  app.route('/signup')
    .get((req, res) => {
      // render the page and pass in any flash data if it exists
      res.locals.message = req.flash('signupMessage')
      res.render('signup')
    })
    .post(passport.authenticate('local-signup', {
      // redirect to the secure profile section
      successRedirect: '/profile',
      // redirect back to the signup page if there is an error
      failureRedirect: '/signup',
      // allow flash messages
      failureFlash: true
    }))

  app.get('/profile', isLoggedIn, (req, res) =>
    // get the user out of session and pass to template
    //res.locals.user = req.user
    res.render('profile')
  )

  app.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
}

// route middleware to make sure a user is logged in
function isLoggedIn (req, res, next) {
    // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) { 
    // get the user out of session and pass to template
    res.locals.user = req.user
    return next() 
  }
    // if they aren't redirect them to the home page
  res.redirect('/')
}
