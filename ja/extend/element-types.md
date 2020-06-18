# エレメントタイプ

エレメントタイプは、Craft で管理できる様々なタイプのコンテンツを定義します。

Craft には、7つの組み込みフィールドタイプがあります。

- <api:craft\elements\Asset>
- <api:craft\elements\Category>
- <api:craft\elements\Entry>
- <api:craft\elements\GlobalSet>
- <api:craft\elements\MatrixBlock>
- <api:craft\elements\Tag>
- <api:craft\elements\User>

これらのクラスの実例を参照できます。それらは `vendor/craftcms/cms/src/elements/` にあります。

プラグインが新しいコンテンツタイプを提供する必要がある場合、エレメントタイプとして設計することが通常は最善の方法です。

[[toc]]

## はじめよう

### エレメントクラス

エレメントタイプは、<api:craft\base\ElementInterface> と <api:craft\base\ElementTrait> を実装するクラスによって定義されます。クラスは、（静的メソッドで）エレメントタイプについての様々なことと伝える手段としてだけでなく、その型のエレメントがインスタンス化されるモデルとしても役立ちます。

便利なものとして、基本エレメントタイプの実装を提供する <api:craft\base\Element> を拡張できます。

プラグインのソースディレクトリ内で `elements/` ディレクトリを作成し、その中に提供したいエレメントタイプのクラス名にちなんで名付けられた PHP クラスファイルを作成します（例：`Product.php`）。

そのファイル内にクラスを定義し、エレメントに持たせたいカスタム属性のためのパブリックプロパティを与えます。

```php
<?php
namespace ns\prefix\elements;

use craft\base\Element;

class Product extends Element
{
    /**
     * @inheritdoc
     */
    public static function displayName(): string
    {
        return 'Product';
    }

    /**
     * @inheritdoc
     */
    public static function pluralDisplayName(): string
    {
        return 'Products';
    }

    /**
     * @var int Price
     */
    public $price = 0;

    /**
     * @var string Currency code
     */
    public $currency;

    // ...
}
```

### データベーステーブル

`elements` データベーステーブルのカラムにフィットしない、エレメント自身について保存したいことがあるでしょう。そこで、その情報を保持するための新しいテーブルを作成する必要があります。

（まだ用意していない場合）[インストールマイグレーション](migrations.md#plugin-install-migrations)を作成し、 `safeUp()` メソッドにこれを追加してください。

```php
if (!$this->db->tableExists('{{%products}}')) {
    // create the products table
    $this->createTable('{{%products}}', [
        'id' => $this->integer()->notNull(),
        'price' => $this->integer()->notNull(),
        'currency' => $this->char(3)->notNull(),
        'dateCreated' => $this->dateTime()->notNull(),
        'dateUpdated' => $this->dateTime()->notNull(),
        'uid' => $this->uid(),
        'PRIMARY KEY(id)',
    ]);

    // give it a FK to the elements table
    $this->addForeignKey(
        $this->db->getForeignKeyName('{{%products}}', 'id'),
        '{{%products}}', 'id', '{{%elements}}', 'id', 'CASCADE', null);
}
```

::: tip
既存のプラグインのアップデートとしてこれを追加する場合、同様に新しい通常のマイグレーションを作成し、同じコードをその中にコピーする必要があります。
:::

プラグインをインストールすると、データベーステーブルが作成されるでしょう。

エレメントが保存された際、エレメントテーブルをアップデートし続ける責任があるエレメントクラスに `afterSave()` メソッドを追加する必要もあります。`afterSave()` メソッドは、エレメントを保存する標準的な[制御フロー](services.md#interface-oriented-methods)の一部です。

```php
public function afterSave(bool $isNew)
{
    if ($isNew) {
        \Craft::$app->db->createCommand()
            ->insert('{{%products}}', [
                'id' => $this->id,
                'price' => $this->price,
                'currency' => $this->currency,
            ])
            ->execute();
    } else {
        \Craft::$app->db->createCommand()
            ->update('{{%products}}', [
                'price' => $this->price,
                'currency' => $this->currency,
            ], ['id' => $this->id])
            ->execute();
    }

    parent::afterSave($isNew);
}
```

すべてのエレメントタイプは、対応するエレメントクエリクラスが必要です。エレメントクエリクラスは、エレメントを取得するためにチューニングされた[クエリビルダー](https://www.yiiframework.com/doc/guide/2.0/en/db-query-builder)の拡張です。

### エレメントクエリクラス

すべてのエレメントクエリクラスは、基本機能を提供する <api:craft\elements\db\ElementQuery> を拡張する必要があります。

それらには、3つの責任があります。

実例として、Craft 独自のエレメントクラスを参照できます。それらは `vendor/craftcms/cms/src/elements/db/` にあります。

- カスタム基準パラメータをキャプチャするためのパブリックプロパティと Setter メソッドを提供します
- カスタムエレメントテーブルに結合し、その中にある適切なカラムを選択します
- カスタム基準パラメータをクエリの条件として適用します

プラグインにエレメントクエリを渡すために、`elements/` ディレクトリ内に `db/` ディレクトリを作成し、提供したいエレメントクエリにちなんで名付けられた PHP クラスファイルを作成します（例：`ProductQuery.php`）。

エレメントクエリクラスが配置されていれば、最後のステップはエレメントタイプに結びつけることです。エレメントクラスに次のメソッドを追加してください。

```php
<?php
namespace ns\prefix\elements\db;

use craft\db\Query;
use craft\elements\db\ElementQuery;
use craft\helpers\Db;
use ns\prefix\elements\Product;

class ProductQuery extends ElementQuery
{
    public $price;
    public $currency;

    public function price($value)
    {
        $this->price = $value;

        return $this;
    }

    public function currency($value)
    {
        $this->currency = $value;

        return $this;
    }

    protected function beforePrepare(): bool
    {
        // join in the products table
        $this->joinElementTable('products');

        // select the price column
        $this->query->select([
            'products.price',
            'products.currency',
        ]);

        if ($this->price) {
            $this->subQuery->andWhere(Db::parseParam('products.price', $this->price));
        }

        if ($this->currency) {
            $this->subQuery->andWhere(Db::parseParam('products.currency', $this->currency));
        }

        return parent::beforePrepare();
    }
}
```

あなたの型のエレメント向けに照会しはじめる準備ができました。

```php
use craft\elements\db\ElementQueryInterface;
use ns\prefix\elements\db\ProductQuery;

// ...

class Product
{
    public static function find(): ElementQueryInterface
    {
        return new ProductQuery(static::class);
    }

    // ...
}
```

その裏で、<api:craft\elements\db\ElementQuery> は2つの <api:craft\db\Query> インスタンスを作成します。メインクエリ（`$this->query`）とサブクエリ（`$this->subQuery`）です。カラムの選択はメインクエリで行い、条件 / 結合はサブクエリに適用する必要があります。最終的に、サブクエリはメインクエリの `FROM` 句になります。

```php
Product::find()
    ->price(100)
    ->all();
```

#### `$this->query` 対 `$this->subQuery`

このように分かれている理由は、パフォーマンスです。一時テーブルでコストの高い条件操作を実行する必要を避け、どのカラムを選択するかなどを気にすることなく、どのエレメント行を取得するかを MySQL / PostgreSQL が正確に把握できるようにします。

テンプレートでエレメントを照会できるようにする場合、新しいエレメントクエリを返す新しいテンプレートファンクションを作成できます。（詳細については、[Twig の拡張](extending-twig.md) を参照してください。）

### テンプレートファンクション

エレメントが `content` テーブル内の独自の行を取得する必要がある場合、[タイトル](#titles)や[コンテンツフィールド](#custom-fields)を持つ必要があるため、エレメントクラスに static な `hasContent()` メソッドを追加します。

```php
<?php
namespace ns\prefix;

use Craft;
use yii\base\Behavior;

/**
 * Adds a `craft.products()` function to the templates (like `craft.entries()`)
 */
class CraftVariableBehavior extends Behavior
{
    public function products($criteria = null): ProductQuery
    {
        $query = Product::find();
        if ($criteria) {
            Craft::configure($query, $criteria);
        }
        return $query;
    }
}
```

## エレメントコンテンツ

エレメントがユーザー定義のタイトルを持つ場合、エレメントクラスに static な `hasTitles()` メソッドを追加します。

```php
public static function hasContent(): bool
{
    return true;
}
```

### タイトル

[エレメントエディタの HUD](#editor-huds) はタイトルフィールドを自動的に表示しないため、自身で追加する必要があることに注意してください。

```php
public static function hasTitles(): bool
{
    return true;
}
```

エレメントタイプでカスタムフィールドをサポートする場合、エレメントタイプのフィールドレイアウトを管理するためにコントロールパネル内のどこかにページを作成する必要があります。Craft は Field Layout Designer を出力するテンプレートのインクルードを提供します。

```php
public function getEditorHtml(): string
{
    $html = \Craft::$app->getView()->renderTemplateMacro('_includes/forms', 'textField', [
        [
            'label' => \Craft::t('app', 'Title'),
            'siteId' => $this->siteId,
            'id' => 'title',
            'name' => 'title',
            'value' => $this->title,
            'errors' => $this->getErrors('title'),
            'first' => true,
            'autofocus' => true,
            'required' => true
        ]
    ]);

    // ...

    $html .= parent::getEditorHtml();

    return $html;
}
```

### カスタムフィールド

#### フィールドレイアウトの管理

If you want your element type to support custom fields, you will also need to create a page somewhere within the control panel for managing your element type’s field layout. Craft provides a template include that will output a Field Layout Designer for you:

```twig
{% include "_includes/fieldlayoutdesigner" with {
    fieldLayout: craft.app.fields.getLayoutByType('ns\\prefix\\elements\\Product')
} only %}
```

エレメントタイプ全体で1つのフィールドレイアウトを持つのではなく、必要であれば複数のフィールドレイアウトを管理することもできます。例えば、エントリのフィールドレイアウトはそれぞれの入力タイプ向けに定義され、アセットのフィールドレイアウトはそれぞれのアセットボリューム向けに定義されます。

```php
use ns\prefix\elements\Product;

// ...

// assemble the new one from the post data, and save it
$fieldLayout = \Craft::$app->getFields()->assembleLayoutFromPost();
$fieldLayout->type = Product::class;
\Craft::$app->getFields()->saveLayout($fieldLayout);
```

あなたがしたいように、セットすることができます。データベースのどこかに、新しいフィールドレイアウトの ID を保存することを忘れないでください。（`$fieldLayout->id` 経由で `saveLayout()` を呼び出した後、フィールドレイアウトの ID にアクセスできます。)

エレメントの `getFieldLayout()` メソッドは（存在する場合）現在のエレメントに関連付けられたフィールドレイアウトを返す責任があります。デフォルトでは、エレメントの `$fieldLayoutId` プロパティをチェックします。セットされている場合、同じ ID のフィールドレイアウトを返します。そのため、それらを保存する際、エレメントに `$fieldLayoutId` プロパティをセットすることを推奨します。

#### フィールドレイアウトへのエレメントの関連付け

`$fieldLayoutId` プロパティがセットされている場合、<api:craft\services\Elements::saveElement()> はデータベースの `elements.fieldLayoutId` カラムに保存し、ロード時に取得されたその値をエレメントに再設定します。

```php
// ...
$product->fieldLayoutId = $productType->fieldLayoutId;
\Craft::$app->elements->saveElement($product);
```

あるいは、`getFieldLayout()` メソッドを上書きし、フィールドレイアウトを fetch / return することもできます。これは（ユーザーアカウントのように）エレメントタイプが単一のフィールドレイアウトしか持たない場合、むしろ望ましいかもしれません。

エレメントのタイトルやカスタムフィールドの値がサイト単位で保存されている場合、static な `isLocalized()` メソッドを追加してください。

```php
public function getFieldLayout()
{
    return \Craft::$app->fields->getLayoutByType(Product::class);
}
```

### ローカライゼーション

デフォルトでは、エレメントはすべてのサイトに保存されます。特定のサイトだけにエレメントを保存する必要がある場合、`getSupportedSites()` メソッドを追加してください。

```php
public static function isLocalized(): bool
{
    return true;
}
```

`getSupportedSites()` によって返される配列内の値は、整数値（サイト ID）、または、`siteId` キーとそのサイトでエレメントがデフィルトで使用可能であるべきかを示すオプションの `enabledbyDefault` キー（ブール値）の配列のいずれかにできます。

```php
public function getSupportedSites(): array
{
    return [
        1,
        2,
        ['siteId' => 3, 'enabledByDefault' => false],
    ];
}
```

エレメントに独自のステータスが必要な場合、エレメントクラスに static な `hasStatuses()` メソッドを加えます。

次に、`enabled` と `disabled` 以外のステータスを持つことができる場合、それらを定義するために static な `statuses()` メソッドを追加してください。

## ステータス

エレメントタイプは、基準パラメータで定義されたエレメントのグループである「ソース」を定義できます。

```php
public static function hasStatuses(): bool
{
    return true;
}
```

### インデックスページアクション

エレメントタイプのソースは、エレメントインデックスのサイドバーとエレメントの関連フィールドの設定内に表示されます。

```php
public static function statuses(): array
{
    return [
        'foo' => \Craft::t('plugin-handle', 'Foo'),
        'bar' => \Craft::t('plugin-handle', 'Bar'),
    ];
}
```

エレメントタイプのソースを定義するために、エレメントクラスに protected static な `defineSources()` メソッドを追加してください。

```php
protected static function defineSources(string $context = null): array
{
    return [
        [
            'key' => '*',
            'label' => 'All Products',
            'criteria' => []
        ],
        [
            'key' => 'cad',
            'label' => 'CAD',
            'criteria' => [
                'currency' => 'cad',
            ]
        ],
        [
            'key' => 'usd',
            'label' => 'USD',
            'criteria' => [
                'currency' => 'usd',
            ]
        ],
    ];
}
```

ソースが選択されると、Craft はソースの `criteria` 配列にリストされている値で[エレメントクエリ](#element-query-class)を設定します。

```php
{% extends '_layouts/elementindex' %}
{% set title = 'Products' %}
{% set elementType = 'ns\\prefix\\elements\\Product' %}
```

## ソース

次のテンプレートを使用して、[コントロールパネルのセクション](cp-section.md)にエレメントタイプのインデックスページを加えることができます。

エレメントクラスに protected static な `defineActions()`メソッドを追加することで、インデックスページでエレメントタイプをサポートする[アクション](element-action-types.md)を定義できます。

To define your element type’s sources, add a protected static [defineSources()](api:craft\base\Element::defineSources()) method to your element class:

```php
protected static function defineActions(string $source = null): array
{
    return [
        FooAction::class,
        BarAction::class,
    ];
}
```

要素を復元可能にするには、static な `defineActions()` メソッドによって返される配列に <api:craft\elements\actions\Restore> アクションを追加するだけです。Craft は通常のインデックスビューから自動的にそれを隠し、ステータスオプションで「破棄済み」を選択したときだけ表示します。

## インデックスページ

You can give your [control panel section](cp-section.md) an index page for your element type using the following template:

```twig
protected static function defineSortOptions(): array
{
    return [
        'title' => \Craft::t('app', 'Title'),
        'price' => \Craft::t('plugin-handle', 'Price'),
    ];
}
```

### 復元アクション

You can define which [actions](element-action-types.md) your element type supports on its index page by adding a protected static [defineActions()](api:craft\base\Element::defineActions()) method on your element class:

```php
protected static function defineTableAttributes(): array
{
    return [
        'title' => \Craft::t('app', 'Title'),
        'price' => \Craft::t('plugin-handle', 'Price'),
        'currency' => \Craft::t('plugin-handle', 'Currency'),
    ];
}
```

### ソートオプション

エレメントクラスに protected な `defineTableAttributes()` メソッドを追加することで、エレメントインデックスのテーブルビューで利用可能な列をカスタマイズできます。

To make an element restorable, just add the <api:craft\elements\actions\Restore> action to the array returned by your static [defineActions()](api:craft\base\Element::defineActions()) method. Craft will automatically hide it during normal index views, and show it when someone selects the “Trashed” status option.

### Index Page Exporters

You can define which [exporter types](element-exporter-types.md) your element type supports on its index page by adding a protected static [defineExporters()](api:craft\base\Element::defineExporters()) method on your element class:

```php
protected static function defineExporters(string $source): array
{
    $exporters = parent::defineExporters($source);
    $exporters[] = MyExporter::class;
    return $exporters;
}
```

### Sort Options

You can define the sort options for your element indexes by adding a protected static [defineSortOptions()](api:craft\base\Element::defineSortOptions()) method to your element class:

```php
protected static function defineSortOptions(): array
{
    return [
        'title' => \Craft::t('app', 'Title'),
        'price' => \Craft::t('plugin-handle', 'Price'),
    ];
}
```

When a sort option is selected on an index, its key will be passed to the `$orderBy` property of your [element query](#element-query-class) class (e.g. `['price' => SORT_ASC]`).

### Table Attributes

You can customize which columns should be available to your element indexes’ Table views by adding a protected [defineTableAttributes()](api:craft\base\Element::defineTableAttributes()) method to your element class:

```php
protected static function defineTableAttributes(): array
{
    return [
        'title' => \Craft::t('app', 'Title'),
        'price' => \Craft::t('plugin-handle', 'Price'),
        'currency' => \Craft::t('plugin-handle', 'Currency'),
    ];
}
```

::: tip
The first attribute you list here is a special case. It defines the header for the first column in the table view, which is the only one admins can’t remove. Its values will come from your elements’ <api:craft\base\ElementInterface::getUiLabel()> method.
:::

If it’s a big list, you can also limit which columns should be visible by default for new [sources](#sources) by adding a protected [defineDefaultTableAttributes()](api:craft\base\Element::defineDefaultTableAttributes()) method to your element class:

```php
protected static function defineDefaultTableAttributes(string $source): array
{
    return ['title', 'price', 'currency'];
}
```

For the table cells, by default Craft will output whatever the string version of the element attribute is. You can override the cell HTML by adding a protected `tableAttributeHtml()` method on your element class:

```php
protected function tableAttributeHtml(string $attribute): string
{
    switch ($attribute) {
        case 'price':
            return \Craft::$app->formatter->asCurrency($this->price, $this->currency);

        case 'currency':
            return strtoupper($this->currency);
    }

    return parent::tableAttributeHtml($attribute);
}
```

### Thumb View

Thumbnail views can be be enabled for your element index page on a [source](#sources)-by-source basis.

To enable thumbnail view for a source, add a `hasThumbs` key to its definition:

```php
protected static function defineSources(string $context = null): array
{
    return [
        [
            'key' => 'cad',
            'label' => 'CAD',
            'criteria' => [
                'currency' => 'cad',
            ],
            'hasThumbs' => true
        ],
        // ...
    ];
}
```

Then, add a `getThumbUrl()` method to your element class, which returns the URL to the current element’s thumbnail:

```php
use craft\helpers\UrlHelper;

// ...

public function getThumbUrl(int $size)
{
    return UrlHelper::resourceUrl("product-images/{$this->id}/{$size}");
}
```

## 検索可能な属性

When an element is saved, Craft’s Search service will index its “searchable attributes” as search keywords on the element. By default, the list of searchable attributes will only include the element’s title and slug, plus any custom field values.

If your element type has additional attributes you want to make searchable, add a protected static [defineSearchableAttributes()](api:craft\base\Element::defineSearchableAttributes()) method on your element and list them:

```php
protected static function defineSearchableAttributes(): array
{
    return ['price'];
}
```

## エレメント URL

When an element is being saved, its `getUriFormat()` method will be called to find out whether the element should have its own URI in the system, and if so, what it should look like.

So if you want your elements to get their own URLs, you must implement this method and have it return a string that can be parsed with <api:craft\web\View::renderObjectTemplate()> (e.g. `products/{slug}`). Usually this should be a user-defined string, rather than something hard-coded.

```php
public function getUriFormat()
{
    return $this->getType()->uriFormat;
}
```

Whenever an element’s URL is requested, Craft will instantiate the element and call its `getRoute()` method, giving the element a chance to decide how the request should be [routed](https://www.yiiframework.com/doc/guide/2.0/en/runtime-routing).

Internally, <api:craft\base\Element::getRoute()> will call a protected `route()` method, which is what you should override in your element class:

```php
protected function route()
{
    return [
        'templates/render', [
            'template' => $this->getType()->template,
            'variables' => [
                'product' => $this,
            ]
        ]
    ];
}
```

## エレメントの編集

### Editor HUDs

To make your elements editable via Element Editor HUDs when double-clicked on within the index page or relation fields, add a `getIsEditable()` method to your element class, which returns whether the current user has permission to edit the element:

```php
public function getIsEditable(): bool
{
    return \Craft::$app->user->checkPermission('edit-product:'.$this->getType()->id);
}
```

By default the element editor HUD will only include custom fields. To include a Title field and/or any element-specific attribute fields, add a `getEditorHtml()` method to your element class:

```php
public function getEditorHtml(): string
{
    $html = \Craft::$app->getView()->renderTemplateMacro('_includes/forms', 'textField', [
        [
            'label' => \Craft::t('app', 'Title'),
            'siteId' => $this->siteId,
            'id' => 'title',
            'name' => 'title',
            'value' => $this->title,
            'errors' => $this->getErrors('title'),
            'first' => true,
            'autofocus' => true,
            'required' => true
        ]
    ]);

    $html .= parent::getEditorHtml();

    return $html;
}
```

### Edit Page

If you want to give your element type a full-sized edit page, it’s up to you to set all of that up – the templates, the routes, and the controller actions.

The Edit Category page offers a relatively straightforward example of how it could be done.

- URL ルール：

  ```php
  'categories/<groupHandle:{handle}>/new' => 'categories/edit-category',
    'categories/<groupHandle:{handle}>/<categoryId:\d+><slug:(?:-{slug})?>' => 'categories/edit-category',
    'categories/<groupHandle:{handle}>/<categoryId:\d+><slug:(?:-{slug})?>/<siteHandle:{handle}>' => 'categories/edit-category',
    'categories/<groupHandle:{handle}>/new/<siteHandle:{handle}>' => 'categories/edit-category',
  ```

- コントローラーアクション：

  - [actionEditCategory()](api:craft\controllers\CategoriesController::actionEditCategory()) – カテゴリの編集ページをレンダリングします
  - [actionPreviewCategory()](api:craft\controllers\CategoriesController::actionPreviewCategory()) – ライブプレビューリクエストのカテゴリのフロントエンドページをレンダリングします
  - [actionSaveCategory()](api:craft\controllers\CategoriesController::actionSaveCategory()) – カテゴリを保存します
  - [actionDeleteCategory()](api:craft\controllers\CategoriesController::actionDeleteCategory()) – カテゴリを削除します
  - [actionShareCategory()](api:craft\controllers\CategoriesController::actionShareCategory()) – Share Category リクエストを操作し、`categories/view-shared-category` のトークンを作成し、ユーザーをそこにリダイレクトします
  - [actionViewSharedCategory()](api:craft\controllers\CategoriesController::actionViewSharedCategory()) – Share Category トークンのカテゴリのフロントエンドページをレンダリングします

- カテゴリの編集ページテンプレート： [categories/_edit.html](https://github.com/craftcms/cms/blob/develop/src/templates/categories/_edit.html)

Here’s a simple example of the code needed to save an element programatically, which could live within an `actionSave()` controller action:

```php
// Create a new product element
$product = new Product();

// Set the main properties from POST data
$product->price = Craft::$app->request->getBodyParam('price');
$product->currency = Craft::$app->request->getBodyParam('currency');
$product->enabled = (bool)Craft::$app->request->getBodyParam('enabled');

// Set custom field values from POST data in a `fields` namespace
$product->setFieldValuesFromRequest('fields');

// Save the product
$success = Craft::$app->elements->saveElement($product);
```

Once you’ve set up an edit page for your element type, you can add a [getCpEditUrl()](api:craft\base\ElementInterface::getCpEditUrl()) method to your element class, which will communicate your elements’ edit page URLs within the control panel.

```php
public function getCpEditUrl()
{
    return 'plugin-handle/products/'.$this->id;
}
```

## リレーション

### Relation Field

You can give your element its own relation field by creating a new [field type](field-types.md) that extends <api:craft\fields\BaseRelationField>.

That base class does most of the grunt work for you, so you can get your field up and running by implementing three simple methods:

```php
<?php
namespace ns\prefix\fields;

use craft\fields\BaseRelationField;
use ns\prefix\elements\Product;

class Products extends BaseRelationField
{
    public static function displayName(): string
    {
        return \Craft::t('plugin-handle', 'Products');
    }

    protected static function elementType(): string
    {
        return Product::class;
    }

    public static function defaultSelectionLabel(): string
    {
        return \Craft::t('plugin-handle', 'Add a product');
    }
}
```

## リファレンスタグ

If you want your elements to support reference tags (e.g. `{product:100}`), add a static `refHandle()` method to your element class that returns a unique handle that should be used for its reference tags.

```php
public static function refHandle()
{
    return 'product';
}
```

To make it easier for users to copy your elements’ reference tags, you may want to add a “Copy reference tag” [action](#index-page-actions) to your element’s index page.

```php
use craft\elements\actions\CopyReferenceTag;

// ...

protected static function defineActions(string $source = null): array
{
    return [
        [
            'type' => CopyReferenceTag::class,
            'elementType' => static::class,
        ],
        // ...
    ];
}
```

## Eager-Loading

If your element type has its own [relation field](#relation-field), it is already eager-loadable through that. And if it supports [custom fields](#custom-fields), any elements that are related to your elements through relation fields will be eager-loadable.

The only case where eager-loading support is not provided for free is if your element type has any “hard-coded” relations with other elements. For example, entries have authors (User elements), but those relations are defined in an `authorId` column in the `entries` table, not a custom Users field.

If your elements have any hard-coded relations to other elements, and you want to make those elements eager-loadable, add an `eagerLoadingMap()` method to your element class:

```php
use craft\db\Query;
use craft\elements\User;
use craft\helpers\ArrayHelper;

// ...

public static function eagerLoadingMap(array $sourceElements, string $handle)
{
    if ($handle === 'author') {
        // get the source element IDs
        $sourceElementIds = ArrayHelper::getColumn($sourceElements, 'id');

        $map = (new Query())
            ->select(['id as source', 'authorId as target'])
            ->from(['{{%entries}}'])
            ->where(['and', ['id' => $sourceElementIds], ['not', ['authorId' => null]]])
            ->all();

        return [
            'elementType' => User::class,
            'map' => $map
        ];
    }

    return parent::eagerLoadingMap($sourceElements, $handle);
}
```

This function takes an of already-queried elements (the “source” elements), and an eager-loading handle. It is supposed to return a mapping of which source element IDs should eager-load which “target” element IDs.

If you need to override where eager-loaded elements are stored, add a `setEagerLoadedElements()` method to your element class as well:

```php
public function setEagerLoadedElements(string $handle, array $elements)
{
    if ($handle === 'author') {
        $author = $elements[0] ?? null;
        $this->setAuthor($author);
    } else {
        parent::setEagerLoadedElements($handle, $elements);
    }
}
```

## Saving Field Content Deltas

Element forms can be configured to submit only the field values that actually changed on the page. This is a prerequisite to [field delta saves](/extend/field-types.md#supporting-delta-saves).

If your element provides its own edit form template, here’s how you can configure it to submit delta field content:

1. Enable delta input name registration at the top of your template.
2. Add `registerDeltas: true` wherever you’ve used `_includes/fields.html` or `_includes/field.html`.

```twig{1,8}
{% do view.setIsDeltaRegistrationActive(true) %}

...

{% include "_includes/fields" with {
    fields: tab.getFields(),
    element: customElement,
    registerDeltas: true,
} only %}
```

To verify that your element form is utilizing delta saving, inspect the `$_POST` data when saving edits in the Control Panel. Only the field types edited on the page should appear in the `fields` array.
