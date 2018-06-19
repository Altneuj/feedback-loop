const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.post('/api/surveys', requireLogin, requireCredits, (request, response) => {
        const {title, subject, body, recipients} = request.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({email})),
            _user: request.user.id,
            dateSend: Date.now()
        });
        const mailer = new Mailer(survey, surveyTemplate(survey));
        survey.send();
    });
};