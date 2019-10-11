# コンフィギュレーションの概要

必要に応じて Craft を設定するには、いくつかの方法があります。

[[toc]]

## 一般設定

Craft は、いくつかの[一般設定](config-settings.md)をサポートしています。`config/general.php` ファイルでデフォルト値を上書きすることができます。

```php
return [
    'devMode' => true,
];
```

## データベース接続設定

Craft は、いくつかの[データベース接続設定](db-settings.md)をサポートしています。`config/db.php` ファイルでデフォルト値を上書きすることができます。

## Guzzle 設定

Craft は、次のような HTTP リクエストを作成するたびに [Guzzle 6](http://docs.guzzlephp.org/en/latest/) を使用します。

- Craft のアップデートをチェックするとき
- Craft のサポートウィジェットからサポートリクエストを送信するとき
- Feed ウィジェットから RSS フィードを読み込むとき
- Amazon S3 のようなリモートボリュームにあるアセットを操作するとき

`config/` フォルダに `guzzle.php` ファイルを作成することによって、これらのリクエストを送信する際に Guzzle が使用するコンフィグ設定をカスタマイズできます。そのファイルは、設定を上書きした配列を返さなければなりません。

```php
<?php

return [
    'headers' => ['Foo' => 'Bar'],
    'query'   => ['testing' => '123'],
    'auth'    => ['username', 'password'],
    'proxy'   => 'tcp://localhost:80',
];
```

ここで定義されたオプションは、新しい `GuzzleHttp\Client` インスタンスに渡されます。利用可能なオプションのリストは、[Guzzle のドキュメント](http://docs.guzzlephp.org/en/latest/)を参照してください。

## エイリアス

Craft のいくつかの設定やファンクションでは、基本ファイルシステムのパスや URL を代用する [Yii エイリアス](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases)をサポートしています。 これには次ものが含まれます。

- サイトのベース URL 設定
- ボリュームのベース URL 設定
- ローカルボリュームのファイルシステムパス設定
- コンフィグ設定の <config:resourceBasePath> と <config:resourceBaseUrl> config settings
- Twig ファンクションの [svg()](../dev/functions.md#svg-svg-sanitize)

次のエイリアスは、そのまま利用可能です。

| エイリアス                | 説明                                                                              |
| -------------------- | ------------------------------------------------------------------------------- |
| `@app`               | `vendor/craftcms/cms/src/` のパス                                                  |
| `@config`            | `config/` フォルダのパス                                                               |
| `@contentMigrations` | `migrations/` フォルダのパス                                                           |
| `@craft`             | `vendor/craftcms/cms/src/` のパス                                                  |
| `@lib`               | `vendor/craftcms/cms/lib/` のパス                                                  |
| `@root`              | ルートプロジェクトのパス（PHP 定数の [CRAFT_BASE_PATH](php-constants.md#craft-base-path) と同じ） |
| `@runtime`           | `storage/runtime/` フォルダのパス                                                      |
| `@storage`           | `storage/` フォルダのパス                                                              |
| `@templates`         | `templates/` フォルダのパス                                                            |
| `@translations`      | `translations/` フォルダのパス                                                         |
| `@vendor`            | `vendor/` フォルダのパス                                                               |
| `@web`               | リクエストのために読み込まれた `index.php` ファイルを含むフォルダの URL                                    |
| `@webroot`           | リクエストのために読み込まれた `index.php` ファイルを含むフォルダのパス                                      |

You can override these default aliases with the <config:aliases> config setting if needed. It’s recommended to override the `@web` alias if you plan on using it, to avoid a cache poisoning vulnerability.

```php
'aliases' => [
    '@web' => 'http://my-project.com',
];
```

If your webroot is something besides `web/`, `public/`, `public_html/`, or `html/`, or it’s not located alongside your `craft` executable, you will also need to override the `@webroot` alias, so it can be defined properly for console commands.

```php
'aliases' => [
    '@web' => 'http://my-project.com',
    '@webroot' => __DIR__ . '/path/to/webroot',
];
```

You can define additional custom aliases using the <config:aliases> config setting as well. For example, you may wish to create aliases that define the base URL and base path that your asset volumes will live in.

```php
'aliases' => [
    '@web' => 'http://my-project.com',
    '@webroot' => __DIR__ . '/path/to/webroot',
    '@assetBaseUrl' => '@web/assets',
    '@assetBasePath' => '@webroot/assets',
],
```

With those in place, you could begin your asset volumes’ Base URL and File System Path settings with them, e.g. `@assetBaseUrl/user-photos` and `@assetBasePath/user-photos`.

If you’d like, you can set the alias values with environment variables, either from your `.env` file or somewhere in your environment’s configuration:

```bash
ASSETS_BASE_URL=http://my-project.com/assets
ASSETS_BASE_PATH=/path/to/webroot/assets
```

Then you can pull them into the alias definitions using [getenv()](http://php.net/manual/en/function.getenv.php):

```php
'aliases' => [
    '@assetBaseUrl' => getenv('ASSETS_BASE_URL'),
    '@assetBasePath' => getenv('ASSETS_BASE_PATH'),
],
```

::: tip
When referencing aliases in your settings, you can append additional segments onto the URL or path. For example, you can set a volume’s base URL to `@assetBaseUrl/user-photos`.
:::

::: tip
You can parse aliases in your templates by passing them to the [alias()](../dev/functions.html#alias-string) function:

```twig
{{ alias('@assetBaseUrl') }}
```
:::

## URL ルール

You can define custom [URL rules](https://www.yiiframework.com/doc/guide/2.0/en/runtime-routing#url-rules) in `config/routes.php`. See [Routing](../routing.md) for more details.

## PHP 定数

You can configure core settings like system file paths and the active environment by defining certain [PHP constants](php-constants.md) in `web/index.php`.

## アプリケーション設定

You can customize Craft’s [application configuration](app.md) from `config/app.php`, such as overriding component configs, or adding new modules and components.
