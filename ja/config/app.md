# アプリケーション設定

`config/app.php` から、Craft の [Yii アプリケーション設定](https://www.yiiframework.com/doc/guide/2.0/en/structure-applications#application-configurations) 全体をカスタマイズできます。配列として返された項目は、 メインのアプリケーション設定の配列にマージされます。

`config/app.web.php` および `config/app.console.php` から、ウェブリクエストやコンソールリクエストだけに対して Craft のアプリケーション設定をカスタマイズすることもできます。

::: tip
Craft のデフォルト設定は [src/config/app.php](https://github.com/craftcms/cms/blob/master/src/config/app.php)、[app.web.php](https://github.com/craftcms/cms/blob/master/src/config/app.web.php)、および、[app.console.php](https://github.com/craftcms/cms/blob/master/src/config/app.console.php)によって定義されています。既存のアプリケーションコンポーネントを上書きする必要がある場合、これらのファイルを参照してください。
:::

[[toc]]

## Cache コンポーネント

デフォルトでは、Craft は `storage/runtime/cache/` フォルダにデータキャッシュを蓄積します。`config/app.php` で `cache` アプリケーションコンポーネントを上書きすることによって、代替の[キャッシュストレージ](https://www.yiiframework.com/doc/guide/2.0/en/caching-data#supported-cache-storage)を使うよう Craft を設定できます。

#### Database Cache Example

If you want to store data caches in the database, first you will need to create a `cache` table as specified by <api:yii\caching\DbCache::$cacheTable>. Craft provides a CLI command for convenience:

```bash
./craft setup/db-cache-table
```

Once that’s done, you can set your `cache` application component to use <api:craft\cache\DbCache>.

```php
<?php
return [
    'components' => [
        'cache' => craft\cache\DbCache::class,
    ],
];
```

::: tip
If you’ve already configured Craft to use <api:yii\caching\DbCache> rather than <api:craft\cache\DbCache>, you can safely switch to the latter if you remove your `cache` table’s `dateCreated`, `dateUpdated`, and `uid` columns.
:::

#### APC Example

```php
<?php
return [
    'components' => [
        'cache' => [
            'class' => yii\caching\ApcCache::class,
            'useApcu' => true,
            'keyPrefix' => 'a_unique_key',
        ],
    ],
];
```


#### Memcached Example

```php
<?php
return [
    'components' => [
        'cache' => [
            'class' => yii\caching\MemCache::class,
            'useMemcached' => true,
            'username' => getenv('MEMCACHED_USERNAME'),
            'password' => getenv('MEMCACHED_PASSWORD'),
            'defaultDuration' => 86400,
            'servers' => [
                [
                    'host' => 'localhost',
                    'persistent' => true,
                    'port' => 11211,
                    'retryInterval' => 15,
                    'status' => true,
                    'timeout' => 15,
                    'weight' => 1,
                ],
            ],
            'keyPrefix' => 'a_unique_key',
        ],
    ],
];
```

#### Redis Example

To use Redis cache storage, you will first need to install the [yii2-redis](https://github.com/yiisoft/yii2-redis) library. Then configure Craft’s `cache` component to use it:

```php
<?php
return [
    'components' => [
        'redis' => [
            'class' => yii\redis\Connection::class,
            'hostname' => 'localhost',
            'port' => 6379,
            'password' => getenv('REDIS_PASSWORD'),
        ],
        'cache' => [
            'class' => yii\redis\Cache::class,
            'defaultDuration' => 86400,
            'keyPrefix' => 'a_unique_key',
        ],
    ],
];
```

## Database Component

If you need to configure the database connection beyond what’s possible with Craft’s [database config settings](db-settings.md), you can do that by overriding the `db` component:

```php
<?php
return [
    'components' => [
        'db' => function() {
            // Get the default component config
            $config = craft\helpers\App::dbConfig();

            // Use read/write query splitting
            // (https://www.yiiframework.com/doc/guide/2.0/en/db-dao#read-write-splitting)

            // Define the default config for replica DB connections
            $config['slaveConfig'] = [
                'username' => getenv('DB_REPLICA_USER'),
                'password' => getenv('DB_REPLICA_PASSWORD'),
                'tablePrefix' => getenv('DB_TABLE_PREFIX'),
                'attributes' => [
                    // Use a smaller connection timeout
                    PDO::ATTR_TIMEOUT => 10,
                ],
                'charset' => 'utf8',
            ];

            // Define the replica DB connections
            $config['slaves'] = [
                ['dsn' => getenv('DB_REPLICA_DSN_1')],
                ['dsn' => getenv('DB_REPLICA_DSN_2')],
                ['dsn' => getenv('DB_REPLICA_DSN_3')],
                ['dsn' => getenv('DB_REPLICA_DSN_4')],
            ];

            // Instantiate and return it
            return Craft::createObject($config);
        },
    ],
];
```

## Session Component

In a load-balanced environment, you may want to override the default `session` component to store PHP session data in a centralized location.

#### Redis Example

```php
<?php
return [
    'components' => [
        'redis' => [
            'class' => yii\redis\Connection::class,
            'hostname' => 'localhost',
            'port' => 6379,
            'password' => getenv('REDIS_PASSWORD'),
        ],
        'session' => function() {
            // Get the default component config
            $config = craft\helpers\App::sessionConfig();

            // Override the class to use Redis' session class
            $config['class'] = yii\redis\Session::class;

            // Instantiate and return it
            return Craft::createObject($config);
        },
    ],
];
```

#### Database Example

First, you must create the database table that will store PHP’s sessions. You can do that by running the `craft setup/php-session-table` console command from your project’s root folder.

```php
<?php
return [
    'components' => [
        'session' => function() {
            // Get the default component config
            $config = craft\helpers\App::sessionConfig();

            // Override the class to use DB session class
            $config['class'] = yii\web\DbSession::class;

            // Set the session table name
            $config['sessionTable'] = craft\db\Table::PHPSESSIONS;

            // Instantiate and return it
            return Craft::createObject($config);
        },
    ],
];
```

::: tip
The `session` component **must** be configured with the <api:craft\behaviors\SessionBehavior> behavior, which adds methods to the component that the system relies on.
:::

## Mailer Component

To override the `mailer` component config (which is responsible for sending emails), do this in `config/app.php`:

```php
<?php
return [
    'components' => [
        'mailer' => function() {
            // Get the stored email settings
            $settings = craft\helpers\App::mailSettings();

            // Override the transport adapter class
            $settings->transportType = craft\mailgun\MailgunAdapter::class;

            // Override the transport adapter settings
            $settings->transportSettings = [
                'domain' => 'foo.com',
                'apiKey' => 'key-xxxxxxxxxx',
            ];

            // Create a Mailer component config with these settings
            $config = craft\helpers\App::mailerConfig($settings);

            // Instantiate and return it
            return Craft::createObject($config);
        },
    ],
];
```

::: tip
Any changes you make to the Mailer component from `config/app.php` will not be reflected when testing email settings from Settings → Email.
:::

## Queue Component

Craft’s job queue is powered by the [Yii2 Queue Extension](https://github.com/yiisoft/yii2-queue). By default Craft will use a [custom queue driver](api:craft\queue\Queue) based on the extension’s [DB driver](https://github.com/yiisoft/yii2-queue/blob/master/docs/guide/driver-db.md), but you can switch to a different driver by overriding Craft’s `queue` component from `config/app.php`:

```php
<?php
return [
    'components' => [
        'queue' => [
            'class' => yii\queue\redis\Queue::class,
            'redis' => 'redis', // Redis connection component or its config
            'channel' => 'queue', // Queue channel key
        ],
    ],
];
```

Available drivers are listed in the [Yii2 Queue Extension documentation](https://github.com/yiisoft/yii2-queue/tree/master/docs/guide).

::: warning
Only drivers that implement <api:craft\queue\QueueInterface> will be visible within the control panel.
:::

::: tip
If your queue driver supplies its own worker, set the <config:runQueueAutomatically> config setting to `false` in `config/general.php`.
:::

## Modules

You can register and bootstrap custom Yii modules into the application from `config/app.php` as well. See [How to Build a Module](../extend/module-guide.md) for more info.
