const ftp = require("basic-ftp")

//livingSportFtp();
baresundhed();

async function livingSportFtp() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: 'mail.medicsport.dk',
            user: 'FTPMEDICSPORT',
            password: 'wsxEDC12',
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


/* 
await client.access({
        host: 'ftp.jonassnielsen.dk',
        user: 'jonasftp@jonassnielsen.dk',
        password: '$DF,k{RF^WMt',
        secure: false
        })
        
await client.access({
        host: 'mail.medicsport.dk',
        user: 'FTPMEDICSPORT',
        password: 'wsxEDC12',
        secure: false
        })
*/