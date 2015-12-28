require('dotenv').load();

module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: __dirname + '/server/migrations'
  },
  seeds: {
    directory: __dirname + '/server/seeds'
  }
};
