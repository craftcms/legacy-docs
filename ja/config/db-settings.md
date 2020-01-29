# データベース接続設定

Craft は、Craft がどのようにデータベースへ接続するかを制御するためのいくつかのデータベース接続設定をサポートしています。

最終的に、データベース接続設定は `config/db.php` からセットしなければなりません。しかし、最初に（`.env` ファイルのような）環境変数としてセットしてから、`config/db.php` 内で [getenv()](http://php.net/manual/en/function.getenv.php) を使用して環境変数の値を取得することを推奨します。

例えば、新しい Craft 3 プロジェクト内の `.env` ファイルでは、次の環境変数を定義する必要があります。

```bash
ENVIRONMENT="dev"
SECURITY_KEY=""
DB_DSN="mysql:host=<host>;port=<port>;dbname=<dbname>"
DB_USER="root"
DB_PASSWORD=""
DB_SCHEMA="public"
DB_TABLE_PREFIX=""
```

`DB_` ではじまる変数はデータベース接続設定で、`config/db.php` の中から次のように取得します。

```php
return [
    'dsn' => getenv('DB_DSN'),
    'user' => getenv('DB_USER'),
    'password' => getenv('DB_PASSWORD'),
    'schema' => getenv('DB_SCHEMA'),
    'tablePrefix' => getenv('DB_TABLE_PREFIX'),
];
```

::: tip
NOTE If you installed Craft before 3.4 was released, you will have `DB_DRIVER`, `DB_SERVER`, `DB_DATABASE`, and `DB_PORT` environment variables (a well as corresponding values in `config/db.php`) instead of `DB_DSN`. Both approaches work, but setting `DB_DSN` instead is recommended in Craft 3.4 and later.
:::

We recommend this environment variable approach for two reasons:

1. 機密情報をプロジェクトのコードベースから守ります。（`.env` ファイルは、共有したり Git にコミットするべきではありません。）
2. それぞれの開発者が他者の設定を上書きすることなく独自の設定を定義できるため、他の開発者とのコラボレーションを容易にします。

Here’s the full list of database connection settings that Craft supports:

<!-- BEGIN SETTINGS -->

### `attributes`

許可される型
:

[array](http://php.net/language.types.array)

デフォルト値
:

`[]`

定義元
:

[DbConfig::$attributes](api:craft\config\DbConfig::$attributes)



An array of key => value pairs of PDO attributes to pass into the PDO constructor.

For example, when using the MySQL PDO driver (http://php.net/manual/en/ref.pdo-mysql.php), if you wanted to enable a SSL database connection (assuming SSL is enabled in MySQL (https://dev.mysql.com/doc/refman/5.5/en/using-secure-connections.html) and `'user'` can connect via SSL, you'd set these:

```php
[
    PDO::MYSQL_ATTR_SSL_KEY    => '/path/to/my/client-key.pem',
    PDO::MYSQL_ATTR_SSL_CERT   => '/path/to/my/client-cert.pem',
    PDO::MYSQL_ATTR_SSL_CA     => '/path/to/my/ca-cert.pem',
],
```



### `charset`

許可される型
:

[string](http://php.net/language.types.string)

デフォルト値
:

`'utf8'`

定義元
:

[DbConfig::$charset](api:craft\config\DbConfig::$charset)



The charset to use when creating tables.



### `dsn`

許可される型
:

[string](http://php.net/language.types.string)

デフォルト値
:

`null`

定義元
:

[DbConfig::$dsn](api:craft\config\DbConfig::$dsn)



The Data Source Name (“DSN”) that tells Craft how to connect to the database.

DSNs should begin with a driver prefix (`mysql:` or `pgsql:`), followed by driver-specific parameters. For example, `mysql:host=127.0.0.1;port=3306;dbname=acme_corp`.

- MySQL parameters: http://php.net/manual/en/ref.pdo-mysql.connection.php
- PostgreSQL parameters: http://php.net/manual/en/ref.pdo-pgsql.connection.php



### `password`

許可される型
:

[string](http://php.net/language.types.string)

デフォルト値
:

`''`

定義元
:

[DbConfig::$password](api:craft\config\DbConfig::$password)



The database password to connect with.



### `schema`

許可される型
:

[string](http://php.net/language.types.string)

デフォルト値
:

`'public'`

定義元
:

[DbConfig::$schema](api:craft\config\DbConfig::$schema)



The schema that Postgres is configured to use by default (PostgreSQL only).



### `tablePrefix`

許可される型
:

[string](http://php.net/language.types.string)

デフォルト値
:

`''`

定義元
:

[DbConfig::$tablePrefix](api:craft\config\DbConfig::$tablePrefix)



If you're sharing Craft installs in a single database (MySQL) or a single database and using a shared schema (PostgreSQL), then you can set a table prefix here to avoid table naming conflicts per install. This can be no more than 5 characters, and must be all lowercase.



### `user`

許可される型
:

[string](http://php.net/language.types.string)

デフォルト値
:

`'root'`

定義元
:

[DbConfig::$user](api:craft\config\DbConfig::$user)



The database username to connect with.




<!-- END SETTINGS -->

