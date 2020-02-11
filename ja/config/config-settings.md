# 一般設定

Craft は、その振る舞いを制御するためのいくつかのコンフィギュレーション設定をサポートしています。

新しいコンフィグ設定をセットするには `config/general.php` を開き、設定を適用したい環境に応じて環境設定の配列の1つを定義してください。

例えば、staging または production 環境ではなく、dev 環境のみ Craft のアップデートを許可したい場合、次のようにします。

```php{4,10}
return [
    // Global settings
    '*' => [
        'allowUpdates' => false,
        // ...
    ],

    // Dev environment settings
    'dev' => [
        'allowUpdates' => true,
        // ...
    ],

    // Staging environment settings
    'staging' => [
        // ...
    ],

    // Production environment settings
    'production' => [
        // ...
    ],
];
```

Craft がサポートするコンフィグ設定の完全なリストは、次の通りです。

<!-- BEGIN SETTINGS -->

### `actionTrigger`

許可される型
:

[string](http://php.net/language.types.string)

デフォルト値
:

`'actions'`

定義元
:

[GeneralConfig::$actionTrigger](api:craft\config\GeneralConfig::$actionTrigger)



The URI segment Craft should look for when determining if the current request should be routed to a controller action.



### `activateAccountSuccessPath`

許可される型
:

`mixed`

デフォルト値
:

`''`

定義元
:

[GeneralConfig::$activateAccountSuccessPath](api:craft\config\GeneralConfig::$activateAccountSuccessPath)



The URI that users without access to the control panel should be redirected to after activating their account.

サポートされる値の種類は、[craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) のリストを参照してください。



### `addTrailingSlashesToUrls`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`false`

定義元
:

[GeneralConfig::$addTrailingSlashesToUrls](api:craft\config\GeneralConfig::$addTrailingSlashesToUrls)



自動生成された URL にスラッシュをつけるかどうか。



### `aliases`

許可される型
:

[array](http://php.net/language.types.array)

デフォルト値
:

`[]`

定義元
:

[GeneralConfig::$aliases](api:craft\config\GeneralConfig::$aliases)



リクエストごとに定義される、カスタムの Yii [aliases](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases)。



### `allowAdminChanges`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`true`

定義元
:

[GeneralConfig::$allowAdminChanges](api:craft\config\GeneralConfig::$allowAdminChanges)

Since
:

3.1.0



管理者によるシステムへの管理上の変更を許可するかどうか。

これを無効にすると、設定およびプラグインストアのセクションは非表示になり、Craft 本体のエディションとプラグインのバージョンがロックされ、プロジェクトコンフィグは読み取り専用になります。

Therefore you should only disable this in production environments when <config:useProjectConfigFile> is enabled, and you have a deployment workflow that runs `composer install` automatically on deploy.

::: warning
**すべての**環境が Craft 3.1.0 以降にアップデートされるまで、この設定を無効にしないでください。
:::



### `allowSimilarTags`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`false`

定義元
:

[GeneralConfig::$allowSimilarTags](api:craft\config\GeneralConfig::$allowSimilarTags)



ユーザーによる類似した名前のタグの作成を許可するかどうか。



### `allowUpdates`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`true`

定義元
:

[GeneralConfig::$allowUpdates](api:craft\config\GeneralConfig::$allowUpdates)



Whether Craft should allow system and plugin updates in the control panel, and plugin installation from the Plugin Store.

This setting will automatically be disabled if <config:allowAdminChanges> is disabled.



### `allowUppercaseInSlug`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`false`

定義元
:

[GeneralConfig::$allowUppercaseInSlug](api:craft\config\GeneralConfig::$allowUppercaseInSlug)



スラグに大文字を使うことを許可するかどうか。



### `allowedFileExtensions`

許可される型
:

[string](http://php.net/language.types.string)[]

デフォルト値
:

`['7z', 'aiff', 'asf', 'avi', 'bmp', 'csv', 'doc', 'docx', 'fla', 'flv', 'gif', 'gz', 'gzip', 'htm', 'html', 'jp2', 'jpeg', 'jpg', 'jpx', 'js', 'json', 'm2t', 'mid', 'mov', 'mp3', 'mp4', 'm4a', 'm4v', 'mpc', 'mpeg', 'mpg', 'ods', 'odt', 'ogg', 'ogv', 'pdf', 'png', 'potx', 'pps', 'ppsm', 'ppsx', 'ppt', 'pptm', 'pptx', 'ppz', 'pxd', 'qt', 'ram', 'rar', 'rm', 'rmi', 'rmvb', 'rtf', 'sdc', 'sitd', 'svg', 'swf', 'sxc', 'sxw', 'tar', 'tgz', 'tif', 'tiff', 'txt', 'vob', 'vsd', 'wav', 'webm', 'webp', 'wma', 'wmv', 'xls', 'xlsx', 'zip']`

定義元
:

[GeneralConfig::$allowedFileExtensions](api:craft\config\GeneralConfig::$allowedFileExtensions)



ユーザーがファイルをアップロードする際に、Craft が許可するファイル拡張子。



### `autoLoginAfterAccountActivation`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`false`

定義元
:

[GeneralConfig::$autoLoginAfterAccountActivation](api:craft\config\GeneralConfig::$autoLoginAfterAccountActivation)



ユーザーがアカウントを有効化、または、パスワードをリセットした後で、自動的にログインさせるかどうか。



### `backupCommand`

許可される型
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値
:

`null`

定義元
:

[GeneralConfig::$backupCommand](api:craft\config\GeneralConfig::$backupCommand)



データベースのバックアップを作成するために Craft が実行するシェルコマンド。

ウェブサーバーを実行しているユーザーの `$PATH` 変数にライブラリが含まれている場合、デフォルトで Craft は `mysqldump` または `pg_dump` を実行します。

ランタイムで Craft がスワップアウトするために利用できるいくつかのトークンがあります。

- `{path}` - バックアップファイルのターゲットパス
- `{port}` -現在のデータベースポート
- `{server}` - 現在のデータベースホスト名
- `{user}` -データベースのに接続するユーザー
- `{database}` - 現在のデータベース名
- `{schema}` - （もしある場合）現在のデータベーススキーマ

データベースのバックアップを完全に無効化するために、`false` をセットすることもできます。



### `backupOnUpdate`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`true`

定義元
:

[GeneralConfig::$backupOnUpdate](api:craft\config\GeneralConfig::$backupOnUpdate)



新しいシステムアップデートを適用する前に、Craft がデータベースのバックアップを作成するかどうか。



### `baseCpUrl`

許可される型
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値
:

`null`

定義元
:

[GeneralConfig::$baseCpUrl](api:craft\config\GeneralConfig::$baseCpUrl)



The base URL that Craft should use when generating control panel URLs.

空白の場合、自動的に決定されます。

::: tip
The base control panel URL should **not** include the [control panel trigger word](config:cpTrigger) (e.g. `/admin`).
:::



### `blowfishHashCost`

許可される型
:

[integer](http://php.net/language.types.integer)

デフォルト値
:

`13`

定義元
:

[GeneralConfig::$blowfishHashCost](api:craft\config\GeneralConfig::$blowfishHashCost)



コスト値が高いと、パスワードハッシュの生成とそれに対する検証に時間がかかります。そのため、より高いコストはブルートフォース攻撃を遅くさせます。

ブルートフォース攻撃に対するベストな保護のために、production サーバーで許容される最高の値をセットしてください。

この値が増加するごとに、ハッシュを計算するためにかかる時間は倍になります。 例えば、値が14のときハッシュの計算に1秒かかる場合、計算時間は「2^(値 - 14) 」秒で変化します。



### `cacheDuration`

許可される型
:

`mixed`

デフォルト値
:

`86400`

定義元
:

[GeneralConfig::$cacheDuration](api:craft\config\GeneralConfig::$cacheDuration)



Craft がデータ、RSS フィード、および、テンプレートキャッシュを保管する時間のデフォルトの長さ。

`0` をセットすると、データと RSS フィードのキャッシュは無期限に保管されます。テンプレートキャッシュは1年間保管されます。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `cacheElementQueries`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`true`

定義元
:

[GeneralConfig::$cacheElementQueries](api:craft\config\GeneralConfig::$cacheElementQueries)



Craft が `{% cache %}` タグ内にエレメントクエリをキャッシュするかどうか。



### `convertFilenamesToAscii`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`false`

定義元
:

[GeneralConfig::$convertFilenamesToAscii](api:craft\config\GeneralConfig::$convertFilenamesToAscii)



アップロードされたファイル名に含まれる ASCII 以外の文字を ASCII に変換するかどうか（例： `ñ` → `n`）。



### `cooldownDuration`

許可される型
:

`mixed`

デフォルト値
:

`300`

定義元
:

[GeneralConfig::$cooldownDuration](api:craft\config\GeneralConfig::$cooldownDuration)



あまりに多くのログイン試行の失敗によりアカウントがロックされた後、ユーザーが再試行するために待たなければならない時間。

`0` をセットするとアカウントは無期限にロックされます。管理者が手動でアカウントのロックを解除する必要があります。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `cpTrigger`

許可される型
:

[string](http://php.net/language.types.string)

デフォルト値
:

`'admin'`

定義元
:

[GeneralConfig::$cpTrigger](api:craft\config\GeneralConfig::$cpTrigger)



The URI segment Craft should look for when determining if the current request should route to the control panel rather than the front-end website.



### `csrfTokenName`

許可される型
:

[string](http://php.net/language.types.string)

デフォルト値
:

`'CRAFT_CSRF_TOKEN'`

定義元
:

[GeneralConfig::$csrfTokenName](api:craft\config\GeneralConfig::$csrfTokenName)



The name of CSRF token used for CSRF validation if <config:enableCsrfProtection> is set to `true`.



### `defaultCookieDomain`

許可される型
:

[string](http://php.net/language.types.string)

デフォルト値
:

`''`

定義元
:

[GeneralConfig::$defaultCookieDomain](api:craft\config\GeneralConfig::$defaultCookieDomain)



Craft によって生成される Cookie が作成されるべきドメイン。空白の場合、使用するドメイン（ほとんどの場合、現在のもの）の決定はブラウザに任されます。すべてのサブドメインで機能する Cookie を望むなら、例えば、これを `'.domain.com'` にセットします。



### `defaultCpLanguage`

許可される型
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

デフォルト値
:

`null`

定義元
:

[GeneralConfig::$defaultCpLanguage](api:craft\config\GeneralConfig::$defaultCpLanguage)



The default language the control panel should use for users who haven’t set a preferred language yet.



### `defaultDirMode`

許可される型
:

`mixed`

デフォルト値
:

`0775`

定義元
:

[GeneralConfig::$defaultDirMode](api:craft\config\GeneralConfig::$defaultDirMode)



新しく生成されたディレクトリにセットされるデフォルトのパーミッション。

`null` をセットすると、パーミッションは現在の環境によって決定されます。



### `defaultFileMode`

許可される型
:

[integer](http://php.net/language.types.integer), [null](http://php.net/language.types.null)

デフォルト値
:

`null`

定義元
:

[GeneralConfig::$defaultFileMode](api:craft\config\GeneralConfig::$defaultFileMode)



新しく生成されたファイルにセットされるデフォルトのパーミッション。

`null` をセットすると、パーミッションは現在の環境によって決定されます。



### `defaultImageQuality`

許可される型
:

[integer](http://php.net/language.types.integer)

デフォルト値
:

`82`

定義元
:

[GeneralConfig::$defaultImageQuality](api:craft\config\GeneralConfig::$defaultImageQuality)



JPG と PNG ファイルを保存する際に、Craft が使用する品質レベル。0（最低品質、最小ファイルサイズ）から100（最高品質、最大ファイルサイズ）までの範囲。



### `defaultSearchTermOptions`

許可される型
:

[array](http://php.net/language.types.array)

デフォルト値
:

`[]`

定義元
:

[GeneralConfig::$defaultSearchTermOptions](api:craft\config\GeneralConfig::$defaultSearchTermOptions)



それぞれの検索用語に適用されるデフォルトのオプション。

オプションは次のものを含みます。

- `attribute` – （もしある場合）用語が適用される属性（例：'title'）。（デフォルトは `null`）
- `exact` – 用語が完全一致でなければならないかどうか（`attribute` がセットされている場合のみ、適用されます）。（デフォルトは `false`）
- `exclude` – 検索結果でこの用語のレコードを *除外する* かどうか。（デフォルトは `false`）
- `subLeft` – それより前に追加の文字を持つ「用語を含むキーワード」を含めるかどうか。（デフォルトは `false`）
- `subRight` – それより後に追加の文字を持つ「用語を含むキーワード」を含めるかどうか。（デフォルトは `true`）



### `defaultTemplateExtensions`

許可される型
:

[string](http://php.net/language.types.string)[]

デフォルト値
:

`['html', 'twig']`

定義元
:

[GeneralConfig::$defaultTemplateExtensions](api:craft\config\GeneralConfig::$defaultTemplateExtensions)



フロントエンドでテンプレートパスとファイルの照合をする際に、Craft が探すテンプレートファイルの拡張子。



### `defaultTokenDuration`

許可される型
:

`mixed`

デフォルト値
:

`86400`

定義元
:

[GeneralConfig::$defaultTokenDuration](api:craft\config\GeneralConfig::$defaultTokenDuration)



トークンが期限切れになる前に使用できるデフォルトの時間。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `defaultWeekStartDay`

許可される型
:

[integer](http://php.net/language.types.integer)

デフォルト値
:

`1`

定義元
:

[GeneralConfig::$defaultWeekStartDay](api:craft\config\GeneralConfig::$defaultWeekStartDay)



新しいユーザーが「週の開始日」としてセットする必要があるデフォルトの曜日。

これは、次の整数の1つをセットしてください。

- `0` – 日曜日
- `1` – 月曜日
- `2` – 火曜日
- `3` – 水曜日
- `4` – 木曜日
- `5` – 金曜日
- `6` – 土曜日



### `deferPublicRegistrationPassword`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`false`

定義元
:

[GeneralConfig::$deferPublicRegistrationPassword](api:craft\config\GeneralConfig::$deferPublicRegistrationPassword)



デフォルトでは、フロントエンドの一般ユーザー登録で「パスワード」フィールドを送信する必要があります。`true` をセットすると、最初の登録フォームでパスワードを必要としなくなります。

メールアドレスの確認が有効になっている場合、新しいユーザーは通知メールに記載されたリンクをクリックしてパスワードを設定できます。そうでなければ、「パスワードを忘れた」際のワークフローを経由することがパスワードをセットできる唯一の方法となります。



### `devMode`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`false`

定義元
:

[GeneralConfig::$devMode](api:craft\config\GeneralConfig::$devMode)



システムを [Dev Mode](https://craftcms.com/support/dev-mode) で実行するかどうか。



### `disabledPlugins`

許可される型
:

[string](http://php.net/language.types.string)[]

デフォルト値
:

`[]`

定義元
:

[GeneralConfig::$disabledPlugins](api:craft\config\GeneralConfig::$disabledPlugins)

Since
:

3.1.9



プロジェクトコンフィグの内容に関わらず無効にする、プラグインハンドルの配列。

```php
'dev' => [
    'disabledPlugins' => ['webhooks'],
],
```

### `elevatedSessionDuration`

許可される型
:

`mixed`

デフォルト値
:

`300`

定義元
:

[GeneralConfig::$elevatedSessionDuration](api:craft\config\GeneralConfig::$elevatedSessionDuration)



機密性の高い操作（例：ユーザーのグループや権限の割り当てなど）に必要な、ユーザーの昇格されたセッションの時間。

昇格されたセッションのサポートを無効化するには、`0` をセットしてください。

サポートされる値の種類は、[craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) のリストを参照してください。



### `enableCsrfCookie`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`true`

定義元
:

[GeneralConfig::$enableCsrfCookie](api:craft\config\GeneralConfig::$enableCsrfCookie)



Whether to use a cookie to persist the CSRF token if <config:enableCsrfProtection> is enabled. If false, the CSRF token will be stored in session under the `csrfTokenName` config setting name. Note that while storing CSRF tokens in session increases security, it requires starting a session for every page that a CSRF token is needed, which may degrade site performance.



### `enableCsrfProtection`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`true`

定義元
:

[GeneralConfig::$enableCsrfProtection](api:craft\config\GeneralConfig::$enableCsrfProtection)



Craft 経由で送信されるすべてのフォームで、不可視項目による CSRF 保護を有効にするかどうか。



### `enableTemplateCaching`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`true`

定義元
:

[GeneralConfig::$enableTemplateCaching](api:craft\config\GeneralConfig::$enableGql)

Since
:

3.3.1



グローバル基準で Craft テンプレートの `{% cache %}` タグを有効にするかどうか。

エラーテンプレートを探すためのパスを決定するときに、HTTP エラーステータスコードの前につける接頭辞。



### `enableGraphQlCaching`

許可される型
:

[string](http://php.net/language.types.boolean)

デフォルト値
:

`''`

定義元
:

[GeneralConfig::$enableGraphQlCaching](api:craft\config\GeneralConfig::$enableGraphQlCaching)

Since
:

3.3.12



Whether Craft should cache GraphQL queries.

If set to `true`, Craft will cache the results for unique GraphQL queries per access token. The cache is automatically invalidated any time an element is saved, the site structure is updated, or a GraphQL schema is saved.

This setting will have no effect if a plugin is using the [craft\services\Gql::EVENT_BEFORE_EXECUTE_GQL_QUERY](https://docs.craftcms.com/api/v3/craft-services-gql.html#event-before-execute-gql-query) event to provide its own caching logic and setting the `result` property.



### `enableTemplateCaching`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`true`

定義元
:

[GeneralConfig::$enableTemplateCaching](api:craft\config\GeneralConfig::$enableTemplateCaching)



Whether to enable Craft's template `{% cache %}` tag on a global basis.



### `errorTemplatePrefix`

許可される型
:

[string](http://php.net/language.types.string)

デフォルト値
:

`''`

定義元
:

[GeneralConfig::$errorTemplatePrefix](api:craft\config\GeneralConfig::$errorTemplatePrefix)



The prefix that should be prepended to HTTP error status codes when determining the path to look for an error’s template.

If set to `'_'`, then your site’s 404 template would live at `templates/_404.html`, for example.



### `extraAllowedFileExtensions`

許可される型
:

[string](http://php.net/language.types.string)[], [null](http://php.net/language.types.null)

デフォルト値
:

`[]`

定義元
:

[GeneralConfig::$extraAllowedFileExtensions](api:craft\config\GeneralConfig::$extraAllowedFileExtensions)



List of file extensions that will be merged into the <config:allowedFileExtensions> config setting.



### `extraAppLocales`

許可される型
:

[string](http://php.net/language.types.string)[], [null](http://php.net/language.types.null)

デフォルト値
:

`null`

定義元
:

[GeneralConfig::$extraAppLocales](api:craft\config\GeneralConfig::$extraAppLocales)

Since
:

3.0.24



List of extra locale IDs that the application should support, and users should be able to select as their Preferred Language.

Only use this setting if your server has the Intl PHP extension, or if you’ve saved the corresponding [locale data](https://github.com/craftcms/locales) into your `config/locales/` folder.



### `extraFileKinds`

許可される型
:

[array](http://php.net/language.types.array)

デフォルト値
:

`[]`

定義元
:

[GeneralConfig::$extraFileKinds](api:craft\config\GeneralConfig::$extraFileKinds)

Since
:

3.0.37



List of additional file kinds Craft should support. This array will get merged with the one defined in `\craft\helpers\Assets::_buildFileKinds()`.

```php
'extraFileKinds' => [
    // merge .psb into list of Photoshop file kinds
    'photoshop' => [
        'extensions' => ['psb'],
    ],
    // register new "Stylesheet" file kind
    'stylesheet' => [
        'label' => 'Stylesheet',
        'extensions' => ['css', 'less', 'pcss', 'sass', 'scss', 'styl'],
    ],
],
```

::: tip
File extensions listed here won’t immediately be allowed to be uploaded. You will also need to list them with the <config:extraAllowedFileExtensions> config setting.
:::



### `filenameWordSeparator`

許可される型
:

[string](http://php.net/language.types.string), [boolean](http://php.net/language.types.boolean)

デフォルト値
:

`'-'`

定義元
:

[GeneralConfig::$filenameWordSeparator](api:craft\config\GeneralConfig::$filenameWordSeparator)



The string to use to separate words when uploading Assets. If set to `false`, spaces will be left alone.



### `generateTransformsBeforePageLoad`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`['index']`

定義元
:

[GeneralConfig::$generateTransformsBeforePageLoad](api:craft\config\GeneralConfig::$generateTransformsBeforePageLoad)



Whether images transforms should be generated before page load.



### `headlessMode`

許可される型
:

[boolean](http://php.net/language.types.boolean)

デフォルト値
:

`false`

定義元
:

[GeneralConfig::$headlessMode](api:craft\config\GeneralConfig::$headlessMode)

Since
:

3.3.0



Bool Whether the system should run in Headless Mode, which optimizes the system and control panel for headless CMS implementations.

When this is enabled, the following changes will take place:

- Template settings for sections and category groups will be hidden.
- `{port}` -現在のデータベースポート
- `{server}` - 現在のデータベースホスト名
- `{user}` -データベースのに接続するユーザー
- `{database}` - 現在のデータベース名
- The <config:loginPath>, <config:logoutPath>, <config:setPasswordPath>, and <config:verifyEmailPath> settings will be ignored.



### `imageDriver`

Allowed types
:

`mixed`

Default value
:

`self::IMAGE_DRIVER_AUTO`

Defined by
:

[GeneralConfig::$imageDriver](api:craft\config\GeneralConfig::$imageDriver)



The image driver Craft should use to cleanse and transform images. By default Craft will auto-detect if ImageMagick is installed and fallback to GD if not. You can explicitly set either `'imagick'` or `'gd'` here to override that behavior.



### `indexTemplateFilenames`

Allowed types
:

[string](http://php.net/language.types.string)[]

Default value
:

`['index']`

Defined by
:

[GeneralConfig::$indexTemplateFilenames](api:craft\config\GeneralConfig::$indexTemplateFilenames)



The template filenames Craft will look for within a directory to represent the directory’s “index” template when matching a template path to a file on the front end.



### `invalidLoginWindowDuration`

Allowed types
:

`mixed`

Default value
:

`3600`

Defined by
:

[GeneralConfig::$invalidLoginWindowDuration](api:craft\config\GeneralConfig::$invalidLoginWindowDuration)



The amount of time to track invalid login attempts for a user, for determining if Craft should lock an account.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `invalidUserTokenPath`

Allowed types
:

`mixed`

Default value
:

`''`

Defined by
:

[GeneralConfig::$invalidUserTokenPath](api:craft\config\GeneralConfig::$invalidUserTokenPath)



The URI Craft should redirect to when user token validation fails. A token is used on things like setting and resetting user account passwords. Note that this only affects front-end site requests.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `ipHeaders`

Allowed types
:

[string](http://php.net/language.types.string)[], [null](http://php.net/language.types.null)

Default value
:

`null`

Defined by
:

[GeneralConfig::$ipHeaders](api:craft\config\GeneralConfig::$ipHeaders)



List of headers where proxies store the real client IP.

See [yii\web\Request::$ipHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$ipHeaders-detail) for more details.

If not set, the default [craft\web\Request::$ipHeaders](https://docs.craftcms.com/api/v3/craft-web-request.html#ipheaders) value will be used.



### `isSystemLive`

Allowed types
:

[boolean](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

Default value
:

`null`

Defined by
:

[GeneralConfig::$isSystemLive](api:craft\config\GeneralConfig::$isSystemLive)



Whether the site is currently live. If set to `true` or `false`, it will take precedence over the System Status setting in Settings → General.



### `limitAutoSlugsToAscii`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`false`

Defined by
:

[GeneralConfig::$limitAutoSlugsToAscii](api:craft\config\GeneralConfig::$limitAutoSlugsToAscii)



Whether non-ASCII characters in auto-generated slugs should be converted to ASCII (i.e. ñ → n).

::: tip
This only affects the JavaScript auto-generated slugs. Non-ASCII characters can still be used in slugs if entered manually.
:::



### `loginPath`

Allowed types
:

`mixed`

Default value
:

`'login'`

Defined by
:

[GeneralConfig::$loginPath](api:craft\config\GeneralConfig::$loginPath)



The URI Craft should use for user login on the front-end.

This can be set to `false` to disable front-end login.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `logoutPath`

Allowed types
:

`mixed`

Default value
:

`'logout'`

Defined by
:

[GeneralConfig::$logoutPath](api:craft\config\GeneralConfig::$logoutPath)



The URI Craft should use for user logout on the front-end.

This can be set to `false` to disable front-end logout.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `maxBackups`

Allowed types
:

[integer](http://php.net/language.types.integer), [false](http://php.net/language.types.boolean)

Default value
:

`20`

Defined by
:

[GeneralConfig::$maxBackups](api:craft\config\GeneralConfig::$maxBackups)



The number of backups that Craft should make before it starts deleting the oldest backups. If it is set to `false`, then Craft will not delete any backups.



### `maxCachedCloudImageSize`

Allowed types
:

[integer](http://php.net/language.types.integer)

Default value
:

`2000`

Defined by
:

[GeneralConfig::$maxCachedCloudImageSize](api:craft\config\GeneralConfig::$maxCachedCloudImageSize)



The maximum dimension size to use when caching images from external sources to use in transforms. Set to `0` to never cache them.



### `maxInvalidLogins`

Allowed types
:

[integer](http://php.net/language.types.integer)

Default value
:

`5`

Defined by
:

[GeneralConfig::$maxInvalidLogins](api:craft\config\GeneralConfig::$maxInvalidLogins)



The number of invalid login attempts Craft will allow within the specified duration before the account gets locked.



### `maxRevisions`

Allowed types
:

[integer](http://php.net/language.types.integer), [null](http://php.net/language.types.null)

Default value
:

`50`

Defined by
:

[GeneralConfig::$maxRevisions](api:craft\config\GeneralConfig::$maxRevisions)

Since
:

3.2.0



The maximum number of revisions that should be stored for each element.

Set to `0` if you want to store an unlimited number of revisions.



### `maxSlugIncrement`

Allowed types
:

[integer](http://php.net/language.types.integer)

Default value
:

`100`

Defined by
:

[GeneralConfig::$maxSlugIncrement](api:craft\config\GeneralConfig::$maxSlugIncrement)



The highest number Craft will tack onto a slug in order to make it unique before giving up and throwing an error.



### `maxUploadFileSize`

Allowed types
:

[integer](http://php.net/language.types.integer), [string](http://php.net/language.types.string)

Default value
:

`16777216`

Defined by
:

[GeneralConfig::$maxUploadFileSize](api:craft\config\GeneralConfig::$maxUploadFileSize)



The maximum upload file size allowed.

See [craft\helpers\ConfigHelper::sizeInBytes()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-sizeinbytes) for a list of supported value types.



### `omitScriptNameInUrls`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`false`

Defined by
:

[GeneralConfig::$omitScriptNameInUrls](api:craft\config\GeneralConfig::$omitScriptNameInUrls)



Whether generated URLs should omit `index.php` (e.g. `http://domain.com/path` instead of `http://domain.com/index.php/path`)

This can only be possible if your server is configured to redirect would-be 404's to `index.php`, for example, with the redirect found in the `.htaccess` file that came with Craft:

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule (.+) /index.php?p= [QSA,L]
```



### `optimizeImageFilesize`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`true`

Defined by
:

[GeneralConfig::$optimizeImageFilesize](api:craft\config\GeneralConfig::$optimizeImageFilesize)



Whether Craft should optimize images for reduced file sizes without noticeably reducing image quality. (Only supported when ImageMagick is used.)



### `pageTrigger`

Allowed types
:

[string](http://php.net/language.types.string)

Default value
:

`'p'`

Defined by
:

[GeneralConfig::$pageTrigger](api:craft\config\GeneralConfig::$pageTrigger)



The string preceding a number which Craft will look for when determining if the current request is for a particular page in a paginated list of pages.

| Example Value | Example URI    |
| ------------- | -------------- |
| `p`           | `/news/p5`     |
| `page`        | `/news/page5`  |
| `page/`       | `/news/page/5` |
| `?page`       | `/news?page=5` |

::: tip
If you want to set this to `?p` (e.g. `/news?p=5`), you will need to change your <config:pathParam> setting as well, which is set to `p` by default, and if your server is running Apache, you will need to update the redirect code in your `.htaccess` file to match your new `pathParam` value.
:::



### `pathParam`

Allowed types
:

[string](http://php.net/language.types.string)

Default value
:

`'p'`

Defined by
:

[GeneralConfig::$pathParam](api:craft\config\GeneralConfig::$pathParam)



The query string param that Craft will check when determining the request's path.

::: tip
If you change this and your server is running Apache, don’t forget to update the redirect code in your `.htaccess` file to match the new value.
:::



### `phpMaxMemoryLimit`

Allowed types
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:

`null`

Defined by
:

[GeneralConfig::$phpMaxMemoryLimit](api:craft\config\GeneralConfig::$phpMaxMemoryLimit)



The maximum amount of memory Craft will try to reserve during memory intensive operations such as zipping, unzipping and updating. Defaults to an empty string, which means it will use as much memory as it possibly can.

See <http://php.net/manual/en/faq.using.php#faq.using.shorthandbytes> for a list of acceptable values.



### `phpSessionName`

Allowed types
:

[string](http://php.net/language.types.string)

Default value
:

`'CraftSessionId'`

Defined by
:

[GeneralConfig::$phpSessionName](api:craft\config\GeneralConfig::$phpSessionName)



The name of the PHP session cookie.



### `postCpLoginRedirect`

Allowed types
:

`mixed`

Default value
:

`'dashboard'`

Defined by
:

[GeneralConfig::$postCpLoginRedirect](api:craft\config\GeneralConfig::$postCpLoginRedirect)



The path that users should be redirected to after logging in from the control panel.

This setting will also come into effect if a user visits the control panel’s Login page (`/admin/login`) or the control panel’s root URL (/admin) when they are already logged in.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `postLoginRedirect`

Allowed types
:

`mixed`

Default value
:

`''`

Defined by
:

[GeneralConfig::$postLoginRedirect](api:craft\config\GeneralConfig::$postLoginRedirect)



The path that users should be redirected to after logging in from the front-end site.

This setting will also come into effect if the user visits the Login page (as specified by the loginPath config setting) when they are already logged in.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `postLogoutRedirect`

Allowed types
:

`mixed`

Default value
:

`''`

Defined by
:

[GeneralConfig::$postLogoutRedirect](api:craft\config\GeneralConfig::$postLogoutRedirect)



The path that users should be redirected to after logging out from the front-end site.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `preserveCmykColorspace`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`false`

Defined by
:

[GeneralConfig::$preserveCmykColorspace](api:craft\config\GeneralConfig::$preserveCmykColorspace)

Since
:

3.0.8



Whether CMYK should be preserved as the colorspace when when manipulating images.

Setting this to `true` will prevent Craft from transforming CMYK images to sRGB, but on some ImageMagick versions can cause color distortion in the image. This will only have effect if ImageMagick is in use.



### `preserveExifData`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`false`

Defined by
:

[GeneralConfig::$preserveExifData](api:craft\config\GeneralConfig::$preserveExifData)



Whether the EXIF data should be preserved when manipulating and uploading images.

Setting this to `true` will result in larger image file sizes.

This will only have effect if ImageMagick is in use.



### `preserveImageColorProfiles`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`true`

Defined by
:

[GeneralConfig::$preserveImageColorProfiles](api:craft\config\GeneralConfig::$preserveImageColorProfiles)



Whether the embedded Image Color Profile (ICC) should be preserved when manipulating images.

Setting this to `false` will reduce the image size a little bit, but on some ImageMagick versions can cause images to be saved with an incorrect gamma value, which causes the images to become very dark. This will only have effect if ImageMagick is in use.



### `preventUserEnumeration`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`false`

Defined by
:

[GeneralConfig::$preventUserEnumeration](api:craft\config\GeneralConfig::$preventUserEnumeration)



When set to `false` and you go through the "forgot password" workflow on the control panel login page, for example, you get distinct messages saying if the username/email didn't exist or the email was successfully sent and to check your email for further instructions. This can allow for username/email enumeration based on the response. If set `true`, you will always get a successful response even if there was an error making it difficult to enumerate users.



### `privateTemplateTrigger`

Allowed types
:

[string](http://php.net/language.types.string)

Default value
:

`'_'`

Defined by
:

[GeneralConfig::$privateTemplateTrigger](api:craft\config\GeneralConfig::$privateTemplateTrigger)



The template path segment prefix that should be used to identify "private" templates (templates that aren't directly accessible via a matching URL).

Set to an empty value to disable public template routing.



### `purgePendingUsersDuration`

Allowed types
:

`mixed`

Default value
:

`null`

Defined by
:

[GeneralConfig::$purgePendingUsersDuration](api:craft\config\GeneralConfig::$purgePendingUsersDuration)



The amount of time to wait before Craft purges pending users from the system that have not activated.

Note that any content assigned to a pending user will be deleted as well when the given time interval passes.

Set to `0` to disable this feature.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `purgeStaleUserSessionDuration`

Allowed types
:

`mixed`

Default value
:

`7776000`

Defined by
:

[GeneralConfig::$purgeStaleUserSessionDuration](api:craft\config\GeneralConfig::$purgeStaleUserSessionDuration)

Since
:

3.3.0



The amount of time to wait before Craft purges stale user sessions from the sessions table in the database.

Set to `0` to disable this feature.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `purgeUnsavedDraftsDuration`

Allowed types
:

`mixed`

Default value
:

`2592000`

Defined by
:

[GeneralConfig::$purgeUnsavedDraftsDuration](api:craft\config\GeneralConfig::$purgeUnsavedDraftsDuration)

Since
:

3.2.0



The amount of time to wait before Craft purges drafts of new elements that were never formally saved.

Set to `0` to disable this feature.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `rememberUsernameDuration`

Allowed types
:

`mixed`

Default value
:

`31536000`

Defined by
:

[GeneralConfig::$rememberUsernameDuration](api:craft\config\GeneralConfig::$rememberUsernameDuration)



The amount of time Craft will remember a username and pre-populate it on the control panel’s Login page.

Set to `0` to disable this feature altogether.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `rememberedUserSessionDuration`

Allowed types
:

`mixed`

Default value
:

`1209600`

Defined by
:

[GeneralConfig::$rememberedUserSessionDuration](api:craft\config\GeneralConfig::$rememberedUserSessionDuration)



The amount of time a user stays logged if “Remember Me” is checked on the login page.

Set to `0` to disable the “Remember Me” feature altogether.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `requireMatchingUserAgentForSession`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`true`

Defined by
:

[GeneralConfig::$requireMatchingUserAgentForSession](api:craft\config\GeneralConfig::$requireMatchingUserAgentForSession)



Whether Craft should require a matching user agent string when restoring a user session from a cookie.



### `requireUserAgentAndIpForSession`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`true`

Defined by
:

[GeneralConfig::$requireUserAgentAndIpForSession](api:craft\config\GeneralConfig::$requireUserAgentAndIpForSession)



Whether Craft should require the existence of a user agent string and IP address when creating a new user session.



### `resourceBasePath`

Allowed types
:

[string](http://php.net/language.types.string)

Default value
:

`'@webroot/cpresources'`

Defined by
:

[GeneralConfig::$resourceBasePath](api:craft\config\GeneralConfig::$resourceBasePath)



The path to the root directory that should store published control panel resources.



### `resourceBaseUrl`

Allowed types
:

[string](http://php.net/language.types.string)

Default value
:

`'@web/cpresources'`

Defined by
:

[GeneralConfig::$resourceBaseUrl](api:craft\config\GeneralConfig::$resourceBaseUrl)



The URL to the root directory that should store published control panel resources.



### `restoreCommand`

Allowed types
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:

`null`

Defined by
:

[GeneralConfig::$restoreCommand](api:craft\config\GeneralConfig::$restoreCommand)



The shell command that Craft should execute to restore a database backup.

By default Craft will run `mysql` or `psql`, provided that those libraries are in the `$PATH` variable for the user the web server  is running as.

There are several tokens you can use that Craft will swap out at runtime:

- `{path}` - the backup file path
- `{port}` - the current database port
- `{server}` - the current database host name
- `{user}` - the user to connect to the database
- `{database}` - the current database name
- `{schema}` - the current database schema (if any)

This can also be set to `false` to disable database restores completely.



### `rotateImagesOnUploadByExifData`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`true`

Defined by
:

[GeneralConfig::$rotateImagesOnUploadByExifData](api:craft\config\GeneralConfig::$rotateImagesOnUploadByExifData)



Whether Craft should rotate images according to their EXIF data on upload.



### `runQueueAutomatically`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`true`

Defined by
:

[GeneralConfig::$runQueueAutomatically](api:craft\config\GeneralConfig::$runQueueAutomatically)



Whether Craft should run pending queue jobs automatically when someone visits the control panel.

If disabled, an alternate queue worker *must* be set up separately, either as an [always-running daemon](https://github.com/yiisoft/yii2-queue/blob/master/docs/guide/worker.md), or a cron job that runs the `queue/run` command every minute:

```cron
* * * * * /path/to/project/craft queue/run
```

::: tip
This setting should be disabled for servers running Win32, or with Apache’s mod_deflate/mod_gzip installed, where PHP’s [flush()](http://php.net/manual/en/function.flush.php) method won’t work.
:::



### `sameSiteCookieValue`

Allowed types
:

[string](http://php.net/language.types.string)

Default value
:

`null`

Defined by
:

[GeneralConfig::$sameSiteCookieValue](api:craft\config\GeneralConfig::$sameSiteCookieValue)

Since
:

3.1.33



The [SameSite](https://www.owasp.org/index.php/SameSite) value that should be set on Craft cookies, if any.

This can be set to `'Lax'`, `'Strict'`, or `null`.

::: note
This setting requires PHP 7.3 or later.
:::



### `sanitizeSvgUploads`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`true`

Defined by
:

[GeneralConfig::$sanitizeSvgUploads](api:craft\config\GeneralConfig::$sanitizeSvgUploads)



Whether Craft should sanitize uploaded SVG files and strip out potential malicious looking content.

This should definitely be enabled if you are accepting SVG uploads from untrusted sources.



### `secureHeaders`

Allowed types
:

[array](http://php.net/language.types.array), [null](http://php.net/language.types.null)

Default value
:

`null`

Defined by
:

[GeneralConfig::$secureHeaders](api:craft\config\GeneralConfig::$secureHeaders)



Lists of headers that are, by default, subject to the trusted host configuration.

See [yii\web\Request::$secureHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureHeaders-detail) for more details.

If not set, the default [yii\web\Request::$secureHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureHeaders-detail) value will be used.



### `secureProtocolHeaders`

Allowed types
:

[array](http://php.net/language.types.array), [null](http://php.net/language.types.null)

Default value
:

`null`

Defined by
:

[GeneralConfig::$secureProtocolHeaders](api:craft\config\GeneralConfig::$secureProtocolHeaders)



List of headers to check for determining whether the connection is made via HTTPS.

See [yii\web\Request::$secureProtocolHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureProtocolHeaders-detail) for more details.

If not set, the default [yii\web\Request::$secureProtocolHeaders](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$secureProtocolHeaders-detail) value will be used.



### `securityKey`

Allowed types
:

[string](http://php.net/language.types.string)

Default value
:

`null`

Defined by
:

[GeneralConfig::$securityKey](api:craft\config\GeneralConfig::$securityKey)



A private, random, cryptographically-secure key that is used for hashing and encrypting data in [craft\services\Security](api:craft\services\Security).

This value should be the same across all environments. Note that if this key ever changes, any data that was encrypted with it will be inaccessible.



### `sendPoweredByHeader`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`true`

Defined by
:

[GeneralConfig::$sendPoweredByHeader](api:craft\config\GeneralConfig::$sendPoweredByHeader)



Whether an `X-Powered-By: Craft CMS` header should be sent, helping services like [BuiltWith](https://builtwith.com/) and [Wappalyzer](https://www.wappalyzer.com/) identify that the site is running on Craft.



### `setPasswordPath`

Allowed types
:

`mixed`

Default value
:

`'setpassword'`

Defined by
:

[GeneralConfig::$setPasswordPath](api:craft\config\GeneralConfig::$setPasswordPath)



The URI Craft should use for Set Password forms on the front-end.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.

::: tip
You might also want to set <config:invalidUserTokenPath> in case a user clicks on an expired password reset link.
:::



### `setPasswordSuccessPath`

Allowed types
:

`mixed`

Default value
:

`''`

Defined by
:

[GeneralConfig::$setPasswordSuccessPath](api:craft\config\GeneralConfig::$setPasswordSuccessPath)



The URI Craft should redirect users to after setting their password from the front-end.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `siteName`

Allowed types
:

[string](http://php.net/language.types.string), [string](http://php.net/language.types.string)[]

Default value
:

`null`

Defined by
:

[GeneralConfig::$siteName](api:craft\config\GeneralConfig::$siteName)



The site name(s). If set, it will take precedence over the Name settings in Settings → Sites → [Site Name].

This can be set to a string, which will override the primary site’s name only, or an array with site handles used as the keys.



### `siteUrl`

Allowed types
:

[string](http://php.net/language.types.string), [string](http://php.net/language.types.string)[]

Default value
:

`null`

Defined by
:

[GeneralConfig::$siteUrl](api:craft\config\GeneralConfig::$siteUrl)



The base URL to the site(s). If set, it will take precedence over the Base URL settings in Settings → Sites → [Site Name].

This can be set to a string, which will override the primary site’s base URL only, or an array with site handles used as the keys.

The URL(s) must begin with either `http://`, `https://`, `//` (protocol-relative), or an [alias](config:aliases).

```php
'siteUrl' => [
    'siteA' => 'https://site-a.com/',
    'siteB' => 'https://site-b.com/',
],
```



### `slugWordSeparator`

Allowed types
:

[string](http://php.net/language.types.string)

Default value
:

`'-'`

Defined by
:

[GeneralConfig::$slugWordSeparator](api:craft\config\GeneralConfig::$slugWordSeparator)



The character(s) that should be used to separate words in slugs.



### `softDeleteDuration`

Allowed types
:

`mixed`

Default value
:

`2592000`

Defined by
:

[GeneralConfig::$softDeleteDuration](api:craft\config\GeneralConfig::$softDeleteDuration)

Since
:

3.1.0



The amount of time before a soft-deleted item will be up for hard-deletion by garbage collection.

Set to `0` if you don’t ever want to delete soft-deleted items.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `storeUserIps`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`false`

Defined by
:

[GeneralConfig::$storeUserIps](api:craft\config\GeneralConfig::$storeUserIps)

Since
:

3.1.0



Whether user IP addresses should be stored/logged by the system.



### `testToEmailAddress`

Allowed types
:

[string](http://php.net/language.types.string), [array](http://php.net/language.types.array), [false](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

Default value
:

`null`

Defined by
:

[GeneralConfig::$testToEmailAddress](api:craft\config\GeneralConfig::$testToEmailAddress)



Configures Craft to send all system emails to a single email address, or an array of email addresses for testing purposes.

By default the recipient name(s) will be “Test Recipient”, but you can customize that by setting the value with the format `['email@address.com' => 'Name']`.



### `timezone`

Allowed types
:

[string](http://php.net/language.types.string), [null](http://php.net/language.types.null)

Default value
:

`null`

Defined by
:

[GeneralConfig::$timezone](api:craft\config\GeneralConfig::$timezone)



The timezone of the site. If set, it will take precedence over the Timezone setting in Settings → General.

This can be set to one of PHP’s [supported timezones](http://php.net/manual/en/timezones.php).



### `tokenParam`

Allowed types
:

[string](http://php.net/language.types.string)

Default value
:

`'token'`

Defined by
:

[GeneralConfig::$tokenParam](api:craft\config\GeneralConfig::$tokenParam)



The query string parameter name that Craft tokens should be set to.



### `transformGifs`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`true`

Defined by
:

[GeneralConfig::$transformGifs](api:craft\config\GeneralConfig::$transformGifs)

Since
:

3.0.7



Whether GIF files should be cleansed/transformed.



### `translationDebugOutput`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`false`

Defined by
:

[GeneralConfig::$translationDebugOutput](api:craft\config\GeneralConfig::$translationDebugOutput)



Whether translated messages should be wrapped in special characters, to help find any strings that are not being run through `Craft::t()` or the `|translate` filter.



### `trustedHosts`

Allowed types
:

[array](http://php.net/language.types.array)

Default value
:

`['any']`

Defined by
:

[GeneralConfig::$trustedHosts](api:craft\config\GeneralConfig::$trustedHosts)



The configuration for trusted security-related headers.

See [yii\web\Request::$trustedHosts](https://www.yiiframework.com/doc/api/2.0/yii-web-request#$trustedHosts-detail) for more details.

By default, all hosts are trusted.



### `upscaleImages`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`true`

Defined by
:

[GeneralConfig::$upscaleImages](api:craft\config\GeneralConfig::$upscaleImages)

Since
:

3.4.0



Whether images should be upscaled if the provided transform size is larger than the image.



### `useCompressedJs`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`true`

Defined by
:

[GeneralConfig::$useCompressedJs](api:craft\config\GeneralConfig::$useCompressedJs)



Whether Craft should use compressed JavaScript files whenever possible.



### `useEmailAsUsername`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`false`

Defined by
:

[GeneralConfig::$useEmailAsUsername](api:craft\config\GeneralConfig::$useEmailAsUsername)



Whether Craft should set users’ usernames to their email addresses, rather than let them set their username separately.



### `useFileLocks`

Allowed types
:

[boolean](http://php.net/language.types.boolean), [null](http://php.net/language.types.null)

Default value
:

`null`

Defined by
:

[GeneralConfig::$useFileLocks](api:craft\config\GeneralConfig::$useFileLocks)



Whether to grab an exclusive lock on a file when writing to it by using the `LOCK_EX` flag.

Some file systems, such as NFS, do not support exclusive file locking.

If not set to `true` or `false`, Craft will automatically try to detect if the underlying file system supports exclusive file locking and cache the results.



### `usePathInfo`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`false`

Defined by
:

[GeneralConfig::$usePathInfo](api:craft\config\GeneralConfig::$usePathInfo)



Whether Craft should specify the path using `PATH_INFO` or as a query string parameter when generating URLs.

Note that this setting only takes effect if <config:omitScriptNameInUrls> is set to false.



### `useProjectConfigFile`

Allowed types
:

[boolean](http://php.net/language.types.boolean)

Default value
:

`false`

Defined by
:

[GeneralConfig::$useProjectConfigFile](api:craft\config\GeneralConfig::$useProjectConfigFile)

Since
:

3.1.0



Whether the project config should be saved out to `config/project.yaml`.

If set to `true`, a hard copy of your system’s project config will be saved in `config/project.yaml`, and any changes to `config/project.yaml` will be applied back to the system, making it possible for multiple environments to share the same project config despite having separate databases.

::: warning
Make sure you’ve read the entire [Project Config](https://docs.craftcms.com/v3/project-config.html) documentation, and carefully follow the “Enabling the Project Config File” steps when enabling this setting.
:::



### `useSecureCookies`

Allowed types
:

[boolean](http://php.net/language.types.boolean), [string](http://php.net/language.types.string)

Default value
:

`'auto'`

Defined by
:

[GeneralConfig::$useSecureCookies](api:craft\config\GeneralConfig::$useSecureCookies)



Whether Craft will set the "secure" flag when saving cookies when using `Craft::cookieConfig() to create a cookie`.

Valid values are `true`, `false`, and `'auto'`. Defaults to `'auto'`, which will set the secure flag if the page you're currently accessing is over `https://`. `true` will always set the flag, regardless of protocol and `false` will never automatically set the flag.



### `useSslOnTokenizedUrls`

Allowed types
:

[boolean](http://php.net/language.types.boolean), [string](http://php.net/language.types.string)

Default value
:

`'auto'`

Defined by
:

[GeneralConfig::$useSslOnTokenizedUrls](api:craft\config\GeneralConfig::$useSslOnTokenizedUrls)



Determines what protocol/schema Craft will use when generating tokenized URLs. If set to `'auto'`, Craft will check the siteUrl and the protocol of the current request and if either of them are https will use `https` in the tokenized URL. If not, will use `http`.

If set to `false`, the Craft will always use `http`. If set to `true`, then, Craft will always use `https`.



### `userSessionDuration`

Allowed types
:

`mixed`

Default value
:

`3600`

Defined by
:

[GeneralConfig::$userSessionDuration](api:craft\config\GeneralConfig::$userSessionDuration)



The amount of time before a user will get logged out due to inactivity.

Set to `0` if you want users to stay logged in as long as their browser is open rather than a predetermined amount of time.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `verificationCodeDuration`

Allowed types
:

`mixed`

Default value
:

`86400`

Defined by
:

[GeneralConfig::$verificationCodeDuration](api:craft\config\GeneralConfig::$verificationCodeDuration)



The amount of time a user verification code can be used before expiring.

See [craft\helpers\ConfigHelper::durationInSeconds()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-durationinseconds) for a list of supported value types.



### `verifyEmailPath`

Allowed types
:

`mixed`

Default value
:

`'verifyemail'`

Defined by
:

[GeneralConfig::$verifyEmailPath](api:craft\config\GeneralConfig::$verifyEmailPath)

Since
:

3.4.0



The URI Craft should use for email verification links on the front-end.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.



### `verifyEmailSuccessPath`

Allowed types
:

`mixed`

Default value
:

`''`

Defined by
:

[GeneralConfig::$verifyEmailSuccessPath](api:craft\config\GeneralConfig::$verifyEmailSuccessPath)

Since
:

3.1.20



The URI that users without access to the control panel should be redirected to after verifying a new email address.

See [craft\helpers\ConfigHelper::localizedValue()](https://docs.craftcms.com/api/v3/craft-helpers-confighelper.html#method-localizedvalue) for a list of supported value types.




<!-- END SETTINGS -->

