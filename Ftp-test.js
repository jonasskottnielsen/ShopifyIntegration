const ftp = require("basic-ftp")

const FtpConn = {
    async request (ftp_host, ftp_user, ftp_password, newFileName, fileToDownload) {
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
    }
    export default FtpConn;