const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ response: 'Running' }).status(200);
});

router.get('/ads', (req, res) => {
  res.send({ response: 'List of ads' }).status(200);
});

router.get('/ad/:id', (req, res) => {
  res.send({ response: 'Ad by current id' }).status(200);
});

router.get('/ad/id:/like', (req, res) => {
  // Send like count in to client
});

router.put('/ad/id:/like', (req, res) => {
  // Change like count in db
});

router.get('ad/id:/dislike', (req, res) => {
  // Send dislike count to client
});

router.put('ad/id:/dislike', (req, res) => {
  // Change dislike count in db
});

module.exports = router;
