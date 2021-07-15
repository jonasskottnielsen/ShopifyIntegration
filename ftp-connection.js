require('dotenv').config()
const ftp = require("basic-ftp")
livingSportFtp();
baresundhed();

async function livingSportFtp() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: process.env.FTP_LIVINGSPORT_HOST,
            user: process.env.FTP_LIVINGSPORT_USER,
            password: process.env.FTP_LIVINGSPORT_PASSWORD,
            secure: false
            })
        console.log(await client.list())
        await client.downloadTo("Inventory_list_LivingSport.csv", "Inventory_list_LivingSport.csv")
    }
    catch(err) {
        console.log(err);
    }
    client.close();
}
async function baresundhed() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: '93.191.158.42',
            user: 'baresundhed.dk01',
            password: 'rus2GONK!feal_dwo',
            secure: false
            })
        console.log(await client.list())
        await client.downloadTo("RLVNTPriceStock.csv", "RLVNTPriceStock.txt")
    }
    catch(err) {
        console.log(err)
    }
    client.close()
}
async function request (ftp_host, ftp_user, ftp_password, newFileName, fileToDownload) {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: ftp_host,
            user: ftp_user,
            password: ftp_password,
            secure: false
            })
        console.log(await client.list())
        await client.downloadTo(newFileName, fileToDownload)
    }
    catch(err) {
        console.log(err);
    }
    client.close();
}

module.exports.baresundhed = () => {'baresundhed'};
module.exports.livingSportFtp = () => {'livingsport'};

/* 
await client.access({
        host: 'ftp.jonassnielsen.dk',
        user: 'jonasftp@jonassnielsen.dk',
        password: '$DF,k{RF^WMt',
        secure: false
        })
*/