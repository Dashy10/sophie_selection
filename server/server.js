import express from 'express';
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

export const app = express();

app.set('view engine', 'ejs');

app.use('/', express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));

app.post('/contact', function (req, res){
  let mailOpts, smtpTrans;
  var gmail_email = 'dlumastest';
  var gmail_pass = 'dlumastest';
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'dlumastest@gmail.com',
      pass: 'dummy512'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: 'dlumastest@gmail.com',
    subject: 'New message from contact form at sophie_selection',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response){
    if(error){
      console.log(error);
    }
    else {
      console.log('Message sent:' + response.response)
      res.send(200);
    }
  });
});
