const mysql = require('mysql');
const cheerio = require('cheerio')
const express = require('express')
const axios = require("axios");
const cors = require('cors')

const app = express()
app.use(cors())
const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    port: "8889",
    database: "robot"
});
let pge = 1;
const url = 'https://coinmarketcap.com/?page='
for (pge ; pge <= 50; pge++) {

    const pager = url + pge

    axios(pager)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []
            $('tbody tr', html).each(function () {
                const url = $(this).find('a').attr('href')
                articles.push({
                    url
                })
            })

            con.connect(function () {

                const str = JSON.stringify(articles)
                let i = 0

                for (; i < 300;) {
                    i++
                    i++
                    const ur = 'https://coinmarketcap.com/currencies/'
                    const st = ur + str.split("/")[i]
                    const sql = "INSERT INTO test (url) VALUES ('" + st + "'); ";
                    con.query(sql, function (err) {
                        if (err) throw err;
                    });
                    i++
                    console.log("Number of records inserted: " + i);
                }
            });
        }).catch(err => console.log(err))
}
