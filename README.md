# sequelize-migration-pg-extras

Easily add `npm run db:create` and `npm run db:drop` to your Sequelize project using Postgres.


## Usage

```sh
$ npm install sequelize-migration-pg-extras
```

Then add the following to the scripts section in package.json:

```json
{
  "scripts": {
    "db:create": "node_modules/.bin/create_database",
    "db:drop": "node_modules/.bin/drop_database"
  }
}
```


## Configuration

If a `.sequelizerc` file is found, it will attempt the config location from there.
Otherwise it will use `config/config.json`.


## Test

Only manual tests available because life's too short sometimes.

You must have Postgres running beforehand.

To test using default location: `cd test/default`

To test using `.sequelizerc`: `cd test/sequelizerc`


### create_database

```sh
$ ../../lib/create_database.js
```

**Scenarios:**

Database doesn't exist:

```
> Using NODE_ENV=development
> Using configuration in /Users/cesarandreu/Developer/sequelize-migration-pg-extras/test/default/config/config.json
> Database sequelize_migration_pg_extras_development created
```


Database exists:

```
> Using NODE_ENV=development
> Using configuration in /Users/cesarandreu/Developer/sequelize-migration-pg-extras/test/default/config/config.json
> Database sequelize_migration_pg_extras_development already exists
```


### drop_database

```sh
$ ../../lib/drop_database.js
```

**Scenarios:**

Database exists:

```
> Using NODE_ENV=development
> Using configuration in /Users/cesarandreu/Developer/sequelize-migration-pg-extras/test/default/config/config.json
> Database sequelize_migration_pg_extras_development dropped
```

Database doesn't exist:

```
> Using NODE_ENV=development
> Using configuration in /Users/cesarandreu/Developer/sequelize-migration-pg-extras/test/default/config/config.json
> Database sequelize_migration_pg_extras_development doesn't exist
```
