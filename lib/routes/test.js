const { Router } = require('express');
const Request = require('superagent');

module.exports = Router()
  .post('/', async(req, res, next) => {
    const URL = 'https://inspirobot.me/api?generate=true';
    if(req.body.actions && req.body.actions[0].value === 'shuffle'){
      let img = await Request.get(URL);
      res.json({
        'response_type': 'ephemeral',
        'replace_original': true,
        'type': 'image',
        'image_url': img.text,
        'alt_text': 'inspired',
        'attachments': [
          {
            'text': 'Shuffle or share test?',
            'fallback': 'You are unable to share',
            'callback_id': 'postmemaybe',
            'color': '#3AA3E3',
            'attachment_type': 'default',
            'actions': [
              {
                'name': 'shuffle',
                'text': 'Shuffle?',
                'type': 'button',
                'value': 'shuffle'
              },
              {
                'name': 'share',
                'text': 'Share!',
                'type': 'button',
                'value': 'share'
              }
            ]
          }
        ] });
    } else if(req.body.actions && req.body.actions[0].value === 'share'){
      res.json({
        'response_type' : 'in_channel'
      });
    } else {
      let img = await Request.get(URL);
      // img = img.body;
      res.json({ 'blocks': [
        {
          'type': 'image',
          'image_url': img.text,
          'alt_text': 'inspired',
          'attachments': [
            {
              'text': 'Shuffle or share test?',
              'fallback': 'You are unable to share',
              'callback_id': 'postmemaybe',
              'color': '#3AA3E3',
              'attachment_type': 'default',
              'actions': [
                {
                  'name': 'shuffle',
                  'text': 'Shuffle?',
                  'type': 'button',
                  'value': 'shuffle'
                },
                {
                  'name': 'share',
                  'text': 'Share!',
                  'type': 'button',
                  'value': 'share'
                }
              ]
            }
          ] }] });
    }
  });
