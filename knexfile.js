// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/fotofinder',
    migrations: {
      directory: './src/server/db/migrations',
    },
    seeds: {
      directory: './src/server/db/seeds/dev',
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost/fotofinder_test',
    migrations: {
      directory: './src/server/db/migrations',
    },
    seeds: {
      directory: './src/server/db/seeds/test',
    },
  },
};
