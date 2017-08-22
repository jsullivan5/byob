// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/byob_jeopardy',
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
    connection: process.env.DATABASE_URL || 'postgres://localhost/byob_jeopardy_testing',
    migrations: {
      directory: './src/server/db/migrations',
    },
    seeds: {
      directory: './src/server/db/seeds/test',
    },
  },
};
