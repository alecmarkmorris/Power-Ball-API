const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const cors = require('cors')
const cron = require("node-cron");

app.use(cors());
const years = [
    {
        name: '2023',
        address: 'https://www.texaslottery.com/export/sites/lottery/Games/Powerball/Winning_Numbers/index.html_1171556276.html'
    },
    {
        name: '2022',
        address: 'https://www.texaslottery.com/export/sites/lottery/Games/Powerball/Winning_Numbers/index.html_1677114901.html'
    },
    {
        name: 'all',
        address: 'https://www.texaslottery.com/export/sites/lottery/Games/Powerball/Winning_Numbers/index.html_2013354932.html'
    }
]

const stats = []

app.get('/', (req, res) => {
    res.json('Welcome to my Power ball API that scrapes the web for powerball results')
})

app.get('/:yearId', (req, res) => {
    const yearId = req.params.yearId

    const yearAddress = years.filter(years => years.name == yearId)[0].address

    axios.get(yearAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificYears = []

            $('td:contains("")', html).each(function () {
                const title = $(this).text()
                specificYears.push({
                    title
                })
            })
            res.json(specificYears)
        }).catch(err => console.log(err))
})

app.get('/sendemail', (req, res) => {
    res.json('This is a send email')
    cron.schedule("*/15 * * * * *", function () {
        console.log("---------------------");
        console.log("running a task every 15 seconds");
        const nodemailer = require('nodemailer');
    
    async function sendEmail() {
      try {
        const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'alecmarkmorris@gmail.com',
            pass: 'hnebxzalnffmitav'
          }
        });
    
        const mailOptions = {
          from: 'alecmarkmorris@gmail.com',
          to: 'alecmarkmorris@example.com',
          subject: 'Good Morning',
          text: 'This is a Test Email and should be sent at 8am to check your weight'
        };
    
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }
    
    sendEmail(); }, {
        scheduled: true,
        timezone: "America/Sao_Paulo"
      });


})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
