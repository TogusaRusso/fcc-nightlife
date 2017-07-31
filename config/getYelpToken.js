'use strict'

const yelp = require('yelp-fusion')

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET

const token = yelp.accessToken(clientId, clientSecret)
  .then(response => console.log(response.jsonBody.access_token))
  .catch(e => console.error(e))
