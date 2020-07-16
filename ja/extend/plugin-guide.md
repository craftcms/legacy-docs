# プラグインの構築方法

[[toc]]

## 準備

プラグイン作成に取り組む前に、いくつかのことを決めておく必要があります。

- **パッケージ名** – プラグイン向けに Composer パッケージの名前として使用されます。（詳細については、[documentation](https://getcomposer.org/doc/04-schema.md#name) を参照してください。）これが Craft のプラグインだと識別する手助けになるため、2番目のセグメント（`/` の後）に接頭辞 `craft-` を付けることをお勧めします。例えば `pixelandtonic/craft-recipes` のような形です。
- **名前空間** – プラグインのクラスが稼働する、ルート名前空間。（詳細については、[PSR-4](https://www.php-fig.org/psr/psr-4/) オートローディング仕様を参照してください。）これは `craft\` ではじめるべき *ではない* ことに注意してください。あなたやデベロッパーを識別する何かを使用してください。
- **プラグインハンドル** – Craft のエコシステム内でプラグインを一意に識別する何か。（プラグインハンドルは、文字ではじまり、小文字の英字、数字、および、ダッシュのみでなければなりません。`kebab-cased` にすべきです。）
- **Plugin name** – What your plugin will be called within the control panel.

## 基本ファイル構造の設定

プラグインを作るため、コンピュータのどこかに新しいディレクトリを作成してください。一般的なアプローチは、Craft プロジェクトと並ぶ `~/dev/` フォルダに保管することです。

```treeview
~/dev/
├── my-project.test/
│   └── ...
└── my-plugin/
    ├── CHANGELOG.md
    ├── LICENSE.md
    ├── README.md
    ├── composer.json
    └── src/
        └── Plugin.php
```

プラグインディレクトリの名前は、重要ではありません。簡単に識別できるものを選んでください。

::: tip
数クリックでプラグインの土台を作成できる [pluginfactory.io](https://pluginfactory.io/) を利用してください。
:::

## composer.json

プラグインディレクトリのルートに `composer.json` ファイルを作成し、出発点としてこのテンプレートを使用してください。

```json
{
  "name": "package/name",
  "description": "Your plugin’s package description",
  "version": "1.0.0",
  "type": "craft-plugin",
  "keywords": ["some", "keywords", "here"],
  "license": "MIT",
  "authors": [
    {
      "name": "Developer Name",
      "homepage": "https://developer-website.tld"
    }
  ],
  "support": {
    "email": "email@developer-website.tld",
    "issues": "https://github.com/developer/repo/issues?state=open",
    "source": "https://github.com/developer/repo",
    "docs": "https://github.com/developer/repo/blob/master/README.md"
  },
  "require": {
    "craftcms/cms": "^3.1.0"
  },
  "autoload": {
    "psr-4": {
      "namespace\\prefix\\": "src/"
    }
  },
  "extra": {
    "name": "Plugin Name",
    "handle": "plugin-handle"
  }
}
```

次の項目を置き換えてください。

- `package/name` をパッケージ名にします。
- `Developer Name` をあたなの名前、または、プラグインが帰属する組織名にします。
- `https://developer-website.tld` with the URL to the website the developer name should link to in the control panel.
- `email@developer-website.tld` をサポートのメールアドレスにします。
- `developer/repo` をプラグインが稼働している実際の GitHub アカウントとリポジトリ名にします。
- `master` を GitHub リポジトリの実際のプライマリブランチ名にします。
- ``namespace\\prefix\\` を名前空間接頭辞にします。（これは JSON であるため、二重バックスラッシュを使用し、最後が``\\` でなければならない点に注意してください。）
- `Plugin Name` with your plugin name.
- `plugin-handle` with your plugin handle.
- [Craft License](https://craftcms.github.io/license/) を使用する計画の場合、`MIT` を `proprietary` にします（「プラグインストアでの配布」ページの[ライセンスの選択](plugin-store.md#choose-a-license)を参照してください）。

[MIT](https://opensource.org/licenses/MIT) よりむしろ [Craft license](https://craftcms.github.io/license/) でプラグインをリリースしたい場合、`license` 値を `"proprietary"` に変更してください。

::: tip
While not strictly required by Composer, we recommend you explicitly set the `version` in your `composer.json` because it makes a couple things easier on you when developing the plugin. Don’t forget to keep it updated though!
:::

In addition to `name` and `handle` (which are both required), there are a few other things you can include in that `extra` object:

- `class` – The [Plugin class](#the-plugin-class) name. If not set, the installer will look for a `Plugin.php` file at each of the `autoload` path roots.
- `description` – The plugin description. If not set, the main `description` property will be used.
- `developer` – The developer name. If not set, the first author’s `name` will be used (via the `authors` property).
- `developerUrl` – The developer URL. If not set, the `homepage` property will be used, or the first author’s `homepage` (via the `authors` property).
- `developerEmail` – The support email. If not set, the `support.email` property will be used.
- `documentationUrl` – The plugin’s documentation URL. If not set, the `support.docs` property will be used.

::: warning
Craft 2 プラグインをアップデートする場合、`composer/installers` 依存があれば確実に削除してください。
:::

## プラグインクラス

`src/Plugin.php` ファイルは、システム向けのプラグインのエントリポイントです。すべてのリクエスト開始時に、インスタンスが作られます。`init()` メソッドはイベントリスナーやそれ自体の初期化を必要とする他のステップを登録するのに最適な場所です。

このテンプレートを `Plugin.php` ファイルの出発点として使用してください。

```php
<?php
namespace ns\prefix;

class Plugin extends \craft\base\Plugin
{
    public function init()
    {
        parent::init();

        // Custom initialization code goes here...
    }
}
```

`ns\prefix` を実際のプラグインの名前空間接頭辞に置き換えてください。

## Craft プロジェクトへのプラグインの読み込み

Craft にプラグインを表示するには、Craft プロジェクトの Composer 依存としてインストールする必要があります。そのためには複数の方法があります。

### Path Repository

開発中にプラグインを動作させる最も簡単な方法は、他の依存関係と同様に `vendor/` フォルダへシンボリックリンクするよう Composer に伝える [path repository](https://getcomposer.org/doc/05-repositories.md#path) を利用することです。

設定するには、Craft プロジェクトの `composer.json` ファイルを開き、次の変更を加えます。

- [minimum-stability](https://getcomposer.org/doc/04-schema.md#minimum-stability) を `"dev"` に設定します。
- [prefer-stable](https://getcomposer.org/doc/04-schema.md#prefer-stable) を `true` に設定します。
- 新しく [path repository](https://getcomposer.org/doc/05-repositories.md#path) レコードを追加し、プラグインのルートディレクトリを指定します。

```json
{
  "minimum-stability": "dev",
  "prefer-stable": true,
  "repositories": [
    {
      "type": "path",
      "url": "../my-plugin"
    }
  ]
}
```

::: tip
`url` 値にプラグインのソースディレクトリを絶対パスまたは相対パスで設定します。（サンプルの `../my-plugin` は、プロジェクトフォルダーと並んでプラグインのフォルダが存在することを前提としています。）
:::

ターミナル上で Craft プロジェクトへ移動し、Composer にプラグインの追加を伝えてください。（`composer.json` ファイルでプラグインに付けたパッケージ名と同じものを使用してください。）

```bash
# go to the project directory
cd /path/to/my-project.test

# require the plugin package
composer require package/name
```

Composer のインストールログは、シンボリックリンク経由でパッケージがインストールされたことを表示するでしょう。

```
  - Installing package/name (X.Y.Z): Symlinking from ../my-plugin
```

::: warning
`path` Composer リポジトリの難点の1つは、`composer update` を実行した際に Composer が `path` ベースの依存関係を無視することです。そのため、プラグインの依存要件やプラグインの情報のような `composer.json` の内容に変更を加える際は、それらの変化が効力を発揮するようプロジェクト内のプラグインを完全に削除してから再要求する必要があります。

```bash
# go to the project directory
cd /path/to/my-project.test

# remove the plugin package
composer remove package/name

# re-require the plugin package
composer require package/name
```
:::

### Packagist

プラグインを一般公開する準備ができたら、新しい Composer パッケージを [Packagist](https://packagist.org/) に登録してください。そうすれば、Composer の `require` コマンドにパッケージ名を渡すだけで、他のパッケージと同様にインストールできます。

```bash
# go to the project directory
cd /path/to/my-project.test

# require the plugin package
composer require package/name
```

## プラグインアイコン

プラグインは「設定 > プラグイン」ページに表示されるアイコンを提供できます。

![The Settings → Plugins page in Craft’s control panel.](../images/plugin-index.png)

プラグインアイコンは、プラグインのソースディレクトリ（例：`src/`）のルートに `icon.svg` として保存された、正方形の SVG ファイルでなければいけません。

If your plugin has a [control panel section](cp-section.md), you can also give its global nav item a custom icon by saving an `icon-mask.svg` file in the root of your plugin’s source directory. Note that this icon cannot contain strokes, and will always be displayed in a solid color (respecting alpha transparency).
