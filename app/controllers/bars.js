'use strict'
const yelp = require('yelp-fusion')
const going = require('./going')
const client = yelp.client(process.env.TOKEN)

module.exports = (location, done) => {
  // by default Yelp gives you 20 results
  // I can use more requests with offset, but this's only study app
  // so 20 it's
  // also, token valid only 180 days. If needed, I can create
  // way for updating it

  client.search({category: 'beerbar', term: 'bar', location})
  .then(response => {
    if (!response.jsonBody.businesses || !response.jsonBody.businesses.length) { return done(null, []) }
    const bars = response.jsonBody.businesses
    .filter(bar => !bar.is_closed)
    .map(getReview)
    Promise.all(bars)
    .then(result => Promise.all(result.map(countGoing)))
    .then(result => done(null, result))
    .catch(err => console.error(err))
  })
  .catch(err => console.error(err))
}

function getReview (bar) {
  return new Promise((resolve, reject) => {
    if (!bar.review_count) {
      bar.review = 'No reviews'
      return resolve(bar)
    }
    client.reviews(bar.id)
      .then(response => {
        bar.review = response.jsonBody.reviews[0].text
        resolve(bar)
      })
      .catch(reject)
  })
}

function countGoing (bar) {
  return new Promise((resolve, reject) => {
    going.count(bar.id, (err, result) => {
      if (err) return reject(err)
      bar.going = result
      resolve(bar)
    })
  })
}
