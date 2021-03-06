const cron = require('node-cron');
const express = require('express');

const ftp = require('./ftp-connection.js')

app = express();

// Schedule tasks to be run on the server.
/*
                ┌──────────────── second (optional) (Valid range 0-59)
                | ┌────────────── minute (Valid range: 0-59)
                | | ┌──────────── hour (valid range: 0-23)
                | | | ┌────────── day of the month (Valid range: 1-31)
                | | | | ┌──────── month (Valid range: 1-12)
                | | | | | ┌────── day of the week (valid range: 0-7)
                | | | | | | 
                | | | | | |
                * * * * * *
                  30 16 * * * // opdaterer 16.30 hver dag ca 30 min efter at csv filerne kommer fra leverandøren
                */
cron.schedule('* * * * *', function() {
    ftp.baresundhed;
    ftp.livingSportFtp;
});

app.listen(3000);