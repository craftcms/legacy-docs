# Testing with Docker

To make things easier, Craft ships with a `docker-compose.yaml` file in the tests directory. This is useful when you
need to run tests against Craft supported databases.

Instead of installing PostgreSQL and MySQL/MariaDB on your machine, you can use the `docker-compose.yaml` file to
scaffold the databases.

## Ports

The Docker Compose file that ships with Craft is configured with PostgreSQL and MySQL on the following ports:

| Database | Port |
| ----------- | ----------- |
| PostgreSQL | 5432 |
| MySQL | 3306 |
| MariaDB | 33061 |

::: tip
If these ports conflict with an existing install, you can update the port on the `docker-compose.yaml` file to look like
this:

```yaml
mysql:
  image: mysql:5.6
  ports:
    - 33060:3306
```

The port on the left side of the colon is your physical machine port and can be changed at will (remember to update your .env to use the new port).
:::
