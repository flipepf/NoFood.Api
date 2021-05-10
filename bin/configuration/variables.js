const variables = {
    Api: {
        port: process.env.port || 3000
    },
    Database: {
        connection: process.env.connection || 'mongodb+srv://nofoodadmin:nofoodadmin@cluster0.qfq1k.mongodb.net/nofood?retryWrites=true&w=majority'
    },
}
module.exports = variables;