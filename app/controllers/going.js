'use strict'
const Going = require('../models/going')

module.exports = {
  count (barId, done) {
    Going.find({barId}, (err, results) => {
      if (err) return done(err)
      if (!results) results = []
      done(null, results.length)
    })
  },
  check (barId, user, done) {
    Going.findOne({user, barId}, (err, results) => {
      if (err) return done(err)
      if (!results) {
        let newGoing = new Going()
        newGoing.user = user
        newGoing.barId = barId
        newGoing.save(err => {
          if (err) return done(err)
          this.count(barId, done)
        })
      } else {
        Going.deleteOne({barId, user}, err => {
          if (err) return done(err)
          this.count(barId, done)
        })
      }
    })
  }
}
