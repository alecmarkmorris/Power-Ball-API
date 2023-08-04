const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

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
    res.json('Welcome to my Power ball API that scrapes teh web for drawing results')
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

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
