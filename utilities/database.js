const knex = require('knex') ({
  client: 'pg',
  connection: {
    host: process.env.RDS_HOSTNAME || process.env.DB_HOST,
    user: process.env.RDS_USERNAME || process.env.DB_USERNAME,
    password: process.env.RDS_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.RDS_DB_NAME || process.env.DB_NAME,
    port: process.env.RDS_PORT || process.env.DB_PORT,
    ssl: process.env.DB_SSL ? {rejectUnauthorized: false} : false,
    environment: process.env.NODE_ENV || null
  }
});

module.exports = knex;