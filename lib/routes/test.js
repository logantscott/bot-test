const { Router } = require('express');
const Request = require('superagent');

module.exports = Router()
  .post('/', async(req, res, next) => {
    const URL = 'https://inspirobot.me/api?generate=true';
    let img = await Request.get(URL);
    // img = img.body;
    res.json({ 'blocks': [
      {
        'type': 'image',
        'image_url': img.text,
        'alt_text': 'inspired'
      }
    ] });
  });
