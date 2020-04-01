# PHP 定数

`web/index.php` ファイルには、Craft の読み込みと環境設定を行う際に、Craft の起動スクリプトがチェックする PHP 定数を定義することができます。

### `CRAFT_BASE_PATH`

Craft がデフォルトで探す [config/](../directory-structure.md#config)、[templates/](../directory-structure.md#templates)、および、他のディレクトリの**ベースディレクトリ**のパス。（デフォルトでは、`vendor/` フォルダの親とみなされます。）

```php
// Tell Craft to look for config/, templates/, etc., two levels up from here
define('CRAFT_BASE_PATH', dirname(__DIR__, 2));
```

### `CRAFT_COMPOSER_PATH`

[composer.json](../directory-structure.md#composer-json) ファイルのパス。（デフォルトでは、ベースディレクトリ内に存在するものとします。）

```php
define('CRAFT_COMPOSER_PATH', 'path/to/composer.json');
```

### `CRAFT_CONFIG_PATH`

[config/](../directory-structure.md#config) フォルダのパス。（デフォルトでは、ベースディレクトリ内に存在するものとします。）

### `CRAFT_CONTENT_MIGRATIONS_PATH`

コンテンツマイグレーションの保管に使用される [migrations/](../directory-structure.md#migrations) フォルダのパス。（デフォルトでは、ベースディレクトリ内に存在するものとします。）

### `CRAFT_ENVIRONMENT`

環境特有の設定配列を定義する際に[マルチ環境設定](environments.md#multi-environment-configs)が参照できる環境名。（デフォルトでは、`$_SERVER['SERVER_NAME']` が使用されます。）

```php
// Set the environment from the ENVIRONMENT env var, or default to 'production'
define('CRAFT_ENVIRONMENT', getenv('ENVIRONMENT') ?: 'production');
```

### `CRAFT_EPHEMERAL`

When defined as `true`, Craft will skip file system permission checks and operations that are not available in an environment with ephemeral storage.

### `CRAFT_LICENSE_KEY`

Your Craft license key, if for some reason that must be defined by PHP rather than a license key file. (Don’t set this until you have a valid license key.)

### `CRAFT_LICENSE_KEY_PATH`

The path that Craft should store its license key file, including its filename. (It will be stored as `license.key` within your [config/](../directory-structure.md#config) folder by default.)

### `CRAFT_LOG_PHP_ERRORS`

Can be set to `false` to prevent Craft from setting PHP’s [log_errors](http://php.net/manual/en/errorfunc.configuration.php#ini.log-errors) setting, leaving it up to whatever’s set in `php.ini`.

```php
// Don't send PHP error logs to storage/logs/phperrors.log
define('CRAFT_LOG_PHP_ERRORS', false);
```

### `CRAFT_SITE`

The Site handle or ID that Craft should be serving from this `index.php` file. (Only set this if you have a good reason to. Craft will automatically serve the correct site by inspecting the requested URL, unless this is set.)

```php
// Show the German site
define('CRAFT_SITE', 'de');
```

### `CRAFT_STORAGE_PATH`

The path to the [storage/](../directory-structure.md#storage) folder. (It is assumed to live within the base directory by default.)

::: tip
Make sure you set this to a valid folder path, otherwise it will be ignored.
:::

### `CRAFT_TEMPLATES_PATH`

The path to the [templates/](../directory-structure.md#templates) folder. (It is assumed to live within the base directory by default.)

### `CRAFT_TRANSLATIONS_PATH`

The path to the `translations/` folder. (It is assumed to live within the base directory by default.)

### `CRAFT_VENDOR_PATH`

The path to the [vendor/](../directory-structure.md#vendor) folder. (It is assumed to live 4 directories up from the bootstrap script by default.)
