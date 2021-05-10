const variables = {
    Api: {
        port: process.env.port || 3000
    },
    Database: {
        connection: process.env.connection || 'mongodb+srv://nofoodadmin:nofoodadmin@cluster0.qfq1k.mongodb.net/nofood?retryWrites=true&w=majority'
    },
    Security: {
        secretKey: 'e879816ba61caab7ab2db0db1ef99bd5'
    },
}
module.exports = variables;