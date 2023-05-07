const cheerio = require('cheerio')
const express = require('express')
const axios = require("axios");
const cors = require('cors')
const mysql = require('mysql');

const app = express()
app.use(cors())

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    port: "8889",
    database: "robot"
});

let updateTime = 4;
let currentPage = 0;

updateData();
setInterval(function (err, result) {
    updateData();
}, updateTime * 60000);

function updateData() {
    con.connect(function (err, result) {
        con.query("SELECT url,id FROM test", function (err, result, fields) {
            if (err) throw err;

            for (let i = currentPage; i < currentPage + 100 && i < 5000; i++) {

                axios(result[i].url)
                    .then(response => {
                        const html = response.data
                        const name = cheerio.load(html)
                        const rank = cheerio.load(html)
                        const watchlist = cheerio.load(html)
                        const market = cheerio.load(html)
                        const volume = cheerio.load(html)
                        const price = cheerio.load(html)
                        const circulating = cheerio.load(html)
                        const logo = cheerio.load(html)

                        name('#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.sc-16r8icm-0.sc-9vl594-1.hXdIVV > section > div > span', html).each(function () {
                            const name = market(this).text()

                            con.connect(function (err) {

                                const sql = `UPDATE test SET name="${name}" WHERE id = "${result[i].id}"`;
                                con.query(sql, function (err, result) {
                                    if (err) throw err;
                                    console.log("Number of records inserted: " + name);
                                });
                            });
                        })

                        rank('#__next > div.bywovg-1.fUzJes > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kDzKwW.nameSection > div.sc-16r8icm-0.bILTHz > div.namePill.namePillPrimary', html).each(function () {
                            const name = rank(this).text().replace("Rank #", "")

                            con.connect(function (err) {

                                const sql = `UPDATE test SET rank = "${name}" WHERE id = "${result[i].id}"`;
                                con.query(sql, function (err, result) {
                                    if (err) throw err;
                                    console.log("Number of records inserted: " + name);
                                });
                            });


                        })

                        watchlist('#__next > div.bywovg-1.fUzJes > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kDzKwW.nameSection > div.sc-16r8icm-0.bILTHz > div:nth-child(3)', html).each(function () {
                            const name = watchlist(this).text().replace(",", "").split(" ")[1].replace(",", "").replace(",", "").replace(",", "").replace(",", "")

                            con.connect(function (err) {

                                const sql = `UPDATE test SET watchlists="${name}" WHERE id = "${result[i].id}"`;
                                con.query(sql, function (err, result) {
                                    if (err) throw err;
                                    console.log("Number of records inserted: " + name);
                                });
                            });


                        })

                        market('#__next > div.bywovg-1.fUzJes > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.fggtJu.statsSection > div.hide.statsContainer > div:nth-child(1) > div:nth-child(1) > div.statsItemRight > div', html).each(function () {
                            const name = market(this).text().replace(",", "").replace("- -", "0").replace("$", "").replace(",", "").replace("Why is there no Market Cap? Read More", "0").replace(",", "").replace(",", "").replace(",", "")

                            con.connect(function (err) {

                                const sql = `UPDATE test SET market="${name}" WHERE id = "${result[i].id}"`;
                                con.query(sql, function (err, result) {
                                    if (err) throw err;
                                    console.log("Number of records inserted: " + name);
                                });
                            });
                        })

                        volume('#__next > div.bywovg-1.fUzJes > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.fggtJu.statsSection > div.hide.statsContainer > div:nth-child(3) > div:nth-child(1) > div.statsItemRight > div', html).each(function () {
                            const name = volume(this).text().replace("$", "").replace("- -", "0").replace(",", "").replace(",", "").replace(",", "").replace(",", "").replace(",", "")

                            con.connect(function (err) {

                                const sql = `UPDATE test SET volume="${name}" WHERE id = "${result[i].id}"`;
                                con.query(sql, function (err, result) {
                                    if (err) throw err;
                                    console.log("Number of records inserted: " + name);
                                });
                            });


                        })

                        price('#__next > div.bywovg-1.fUzJes > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div:nth-child(3) > div > div.sc-16r8icm-0.hgKnTV > section > div > div:nth-child(2) > table > tbody > tr:nth-child(1) > td', html).each(function () {
                            const name = price(this).text().replace("<", "").replace("No Data", "0").replace("$", "").replace(",", "")

                            con.connect(function (err) {

                                const sql = `UPDATE test SET price="${name}" WHERE id = "${result[i].id}"`;
                                con.query(sql, function (err, result) {
                                    if (err) throw err;
                                    console.log("Number of records inserted: " + name);
                                });
                            });


                        })

                        circulating('#__next > div.bywovg-1.fUzJes > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.fggtJu.statsSection > div.hide.statsContainer > div.n78udj-6.dCjIMS > div.sc-16r8icm-0.inUVOz > div.supplyBlockPercentage', html).each(function () {
                            const name = circulating(this).text().replace("%", "").replace("--", "0").replace("", "0")

                            con.connect(function (err) {

                                const sql = `UPDATE test SET circulating="${name}"  WHERE id = "${result[i].id}"`;
                                con.query(sql, function (err, result) {
                                    if (err) throw err;
                                    console.log("Number of records inserted: " + name);
                                });
                            });


                        })

                        logo('#__next > div.bywovg-1.fUzJes > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kDzKwW.nameSection > div.sc-16r8icm-0.gpRPnR.nameHeader', html).each(function () {
                            const name = price(this).find('img').attr('src')

                            con.connect(function (err) {

                                const sql = `UPDATE test SET logo_url="${name}" WHERE id = "${result[i].id}"`;
                                con.query(sql, function (err, result) {
                                    if (err) throw err;
                                    console.log("Number of records inserted: " + name);
                                });
                            });


                        })

                    }).catch(err => console.log(err, result))
            }
            currentPage += 100;
        });
    });
}
