const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const _ = require('lodash');
const Path = require('path-parser').default;
const {URL} = require('url');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email })),
      _user: req.user.id,
      dateSend: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thanks for voting!');
  });
  app.post('/api/surveys/webhooks', (req, res) => {
    const p =  new Path('/api/surveys/:surveyId/:choice');
  console.log(p)
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec((err, data) => {
          console.log(data);
        });
      })
      .value();
  
    res.send({});
  });
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });
  app.get('/api/surveys', requireLogin, (req, res) => {
    Survey.find({_user: req.user.id}).exec((err, data) => {
      if (err) throw err;
      res.send(data);
    })
  })
};