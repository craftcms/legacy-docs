# ファンクション

[Twig に付随する](https://twig.symfony.com/doc/functions/index.html)テンプレートファンクションに加えて、Craft がいくつか独自のものを提供します。

## `actionInput( actionPath )`

特定のコントローラーやアクションのための POST リクエストをルーティングするために使用される不可視項目を出力するためのショートカット。これは、テンプレート内に直接 `<input type="hidden" name="action" value="controller/action-name">` を書き込むのと実質的に同じです。

```twig
<form method="POST">
    {{ actionInput('users/save-user') }}<!-- ... --></form>
```

その文字列が[エイリアス](https://www.yiiframework.com/doc/guide/2.0/en/concept-aliases)ではじまるかをチェックする [Craft::getAlias()](api:yii\BaseYii::getAlias()) に、文字列を渡します。（詳細については、[コンフィギュレーション](../config/README.md#aliases)を参照してください。）

```twig
<img src="{{ alias('@assetBaseUrl/images/logo.png') }}">
```

## `alias( string )`

「begin body」に登録されたスクリプトやスタイルを出力します。`<body>` タグの直後に配置する必要があります。

```twig
<body>
    {{ beginBody() }}

    <h1>{{ page.name }}</h1>
    {{ page.body }}
</body>
```

## `beginBody()`

整数値に切り上げます。

```twig
{{ ceil(42.1) }} → 43
```

## `ceil( num )`

指定されたオブジェクトの完全修飾クラス名を返します。

指定されたオブジェクトのクローンを作成します。

## `className( object )`

与えられたクラス名やオブジェクト設定に基づいて新しいオブジェクトインスタンスを作成します。サポートされる引数の詳細については、<api:Yii::createObject()> を参照してください。

```twig
{% set query = craft.entries.section('news') %}
{% set articles = clone(query).type('articles') %}
```

## `clone( object )`

不可視の CSRF トークン入力欄を返します。CSRF 保護が有効になっているすべてのサイトでは、POST 経由で送信するそれぞれのフォームにこれを含めなければなりません。

「end body」に登録されたスクリプトやスタイルを出力します。`</body>` タグの直前に配置する必要があります。

## `create( type )`

データベースクエリで使用するための新しい <api:yii\db\Expression> オブジェクトを作成して返します。

```twig
{# Pass in a class name #}
{% set cookie = create('yii\\web\\Cookie') %}

{# Or a full object configuration array #}
{% set cookie = create({
    class: 'yii\\web\\cookie',
    name: 'foo',
    value: 'bar'
}) %}
```

## `csrfInput()`

整数値に切り捨てます。

```twig
<form method="post">
    {{ csrfInput() }}<!-- ... --></form>
```

## `endBody()`

環境変数の値を返します。

```twig
<body>
    <h1>{{ page.name }}</h1>
    {{ page.body }}

    {{ endBody() }}
</body>
```

## `combine`

Combines two arrays into one, using the first array to define the keys, and the second array to define the values.

```twig
{% set arr1 = ['a', 'b', 'c'] %}
{% set arr2 = ['foo', 'bar', 'baz'] %}
{% set arr3 = combine(arr1, arr2) %}
{# arr3 will now be `{a: 'foo', b: 'bar', c: 'baz'}` #}
```

## `constant`

Returns the constant value for a given string.

This works identically to Twig’s core [`constant`](https://twig.symfony.com/doc/2.x/functions/constant.html) function.

## `create`

Creates a new object instance based on a given class name or object configuration. See <api:Yii::createObject()> for a full explanation of supported arguments.

```twig
{# Pass in a class name #}
{% set cookie = create('yii\\web\\Cookie') %}

{# Or a full object configuration array #}
{% set cookie = create({
    class: 'yii\\web\\cookie',
    name: 'foo',
    value: 'bar'
}) %}
```

## `csrfInput`

Returns a hidden CSRF Token input. All sites that have CSRF Protection enabled must include this in each form that submits via POST.

```twig
{{ csrfInput() }}
```

You can optionally set additional attributes on the tag by passing an `options` argument.

```twig
{{ csrfInput({
    id: 'csrf-input'
}) }}
```

## `cycle`

Cycles on an array of values.

This works identically to Twig’s core [`cycle`](https://twig.symfony.com/doc/2.x/functions/cycle.html) function.

## `date`

Converts an argument to a date.

This works identically to Twig’s core [`date`](https://twig.symfony.com/doc/2.x/functions/date.html) function.

## `dump`

Dumps information about a template variable.

This works identically to Twig’s core [`dump`](https://twig.symfony.com/doc/2.x/functions/dump.html) function.

## `endBody`

Outputs any scripts and styles that were registered for the “end body” position. It should be placed right before your `</body>` tag.

```twig
<body>
    <h1>{{ page.name }}</h1>
    {{ page.body }}

    {{ endBody() }}
</body>
```

## `expression`

Creates and returns a new <api:yii\db\Expression> object, for use in database queries.

```twig
{% set entries = craft.entries()
    .andWhere(expression('[[authorId]] = :authorId', {authorId: currentUser.id}))
    .all() %}
```

## `floor`

Rounds a number down.

```twig
{{ floor(42.9) }}
{# Output: 42 #}
```

## `getenv`

Returns the value of an environment variable.

```twig
{{ getenv('MAPS_API_KEY') }}
```

## `gql`

Executes a GraphQL query against the full schema.

```twig
{% set result = gql('{
  entries (section: "news", limit: 2, orderBy: "dateCreated DESC") {
    postDate @formatDateTime (format: "Y-m-d")
    title
    url
    ... on news_article_Entry {
      shortDescription
      featuredImage {
        url @transform (width: 300, immediately: true)
        altText
      }
    }
  }
}') %}

{% for entry in result.data %}
    <h3><a href="{{ entry.url }}">{{ entry.title }}</a></h3>
    <p class="timestamp">{{ entry.postDate }}</p>

    {% set image = entry.featuredImage[0] %}
    <img class="thumb" src="{{ image.url }}" alt="{{ image.altText }}">

    {{ entry.shortDescription|markdown }}
    <p><a href="{{ entry.url }}">Continue reading…</a></p>
{% endfor %}
```

## `parseEnv`

Checks if a string references an environment variable (`$VARIABLE_NAME`) and/or an alias (`@aliasName`), and returns the referenced value.

## `head`

Outputs any scripts and styles that were registered for the “head” position. It should be placed right before your `</head>` tag.

```twig
<head>
    <title>{{ siteName }}</title>
    {{ head() }}
</head>
```

## `hiddenInput`

Generates an HTML input tag.

```twig
{{ hiddenInput('entryId', entry.id) }}
{# Output: <input type="hidden" name="entryId" value="100"> #}
```

You can optionally set additional attributes on the tag by passing an `options` argument.

```twig
{{ hiddenInput('entryId', entry.id, {
    id: 'entry-id-input'
}) }}
```

## `include`

Returns the rendered content of a template.

This works identically to Twig’s core [`include`](https://twig.symfony.com/doc/2.x/functions/include.html) function.

## `input`

Generates an HTML input tag.

```twig
{{ input('email', 'email-input', '') }}
{# Output: <input type="email" name="email-input" value=""> #}
```

You can optionally set additional attributes on the tag by passing an `options` argument.

```twig
{{ input('email', 'email-input', '', {
    id: 'custom-input'
}) }}
```

## `max`

Returns the biggest value in an array.

This works identically to Twig’s core [`max`](https://twig.symfony.com/doc/2.x/functions/max.html) function.

## `min`

Returns the lowest value in an array.

This works identically to Twig’s core [`min`](https://twig.symfony.com/doc/2.x/functions/min.html) function.

## `parent`

Returns the parent block’s output.

This works identically to Twig’s core [`parent`](https://twig.symfony.com/doc/2.x/functions/parent.html) function.

## `plugin`

Returns a plugin instance by its handle, or `null` if no plugin is installed and enabled with that handle.

```twig
{{ plugin('commerce').version }}
```

## `random`

Returns a random value.

This works identically to Twig’s core [`random`](https://twig.symfony.com/doc/2.x/functions/random.html) function.

## `range`

Returns a list containing an arithmetic progression of integers.

This works identically to Twig’s core [`range`](https://twig.symfony.com/doc/2.x/functions/range.html) function.

## `redirectInput`

Shortcut for typing `<input type="hidden" name="redirect" value="{{ url|hash }}">`.

```twig
{{ redirectInput(url) }}
```

You can optionally set additional attributes on the tag by passing an `options` argument.

```twig
{{ redirectInput(url, {
    id: 'redirect-input'
}) }}
```

## `seq`

Outputs the next or current number in a sequence, defined by `name`:

```twig
<p>This entry has been read {{ seq('hits:' ~ entry.id) }} times.</p>
```

Each time the function is called, the given sequence will be automatically incremented.

You can optionally have the number be zero-padded to a certain length.

```twig
{{ now|date('Y') ~ '-' ~ seq('orderNumber:' ~ now|date('Y'), 5) }}
{# outputs: 2018-00001 #}
```

To view the current number in the sequence without incrementing it, set the `next` argument to `false`.

```twig
<h5><a href="{{ entry.url }}">{{ entry.title }}</a></h5>
<p>{{ seq('hits:' ~ entry.id, next=false) }} views</p>
```

## `shuffle`

Randomizes the order of the elements within an array.

```twig
{% set promos = craft.entries.section('promos').all() %}
{% set shuffledPromos = shuffle(promos) %}

{% for promo in shuffledPromos %}
    <div class="promo {{ promo.slug }}">
        <h3>{{ promo.title }}</h3>
        <p>{{ promo.description }}</p>
        <a class="cta" href="{{ promo.ctaUrl }}">{{ promo.ctaLabel }}</a>
    </div>
{% endfor %}
```

## `siteUrl`

Similar to [url()](#url-path-params-scheme-mustshowscriptname), except _only_ for creating URLs to pages on your site.

```twig
<a href="{{ siteUrl('company/contact') }}">Contact Us</a>
```

### 引数

The `siteUrl()` function has the following arguments:

* **`path`** – 結果となる URL がサイトで指すべきパス。それは、ベースサイト URL に追加されます。
* **`params`** – URL に追加するクエリ文字列パラメータ。これは文字列（例：`'foo=1&bar=2'`）またはオブジェクト（例：`{foo:'1', bar:'2'}`）が利用可能です。
* **`scheme`** – URL が使用するスキーム（`'http'` または `'https'`）。デフォルト値は、現在のリクエストが SSL 経由で配信されているかどうかに依存します。そうでなければ、サイト URL のスキームが使用され、SSL 経由なら `https` が使用されます。
* **`siteId`** – URL が指すべきサイト ID。デフォルトでは、現在のサイトが使用されます。

## `svg`

Outputs an SVG document.

You can pass the following things into it:

- SVG ファイルのパス。

  ```twig
  {{ svg('@webroot/icons/lemon.svg') }}
  ```

- A <api:craft\elements\Asset> object, such as one pulled in from an [Assets field](../assets-fields.md).

  ```twig
  {% set image = entry.myAssetsField.one() %}
    {% if image and image.extension == 'svg' %}
      {{ svg(image) }}
    {% endif %}
  ```

- 生の SVG マークアップ。

  ```twig
  {% set image = include('_includes/icons/lemon.svg') %}
    {{ svg(image) }}
  ```

By default, if you pass an asset or raw markup into the function, the SVG will be sanitized of potentially malicious scripts using [svg-sanitizer](https://github.com/darylldoyle/svg-sanitizer), and any IDs or class names within the document will be namespaced so they don’t conflict with other IDs or class names in the DOM. You can disable those behaviors using the `sanitize` and `namespace` arguments:

```twig
{{ svg(image, sanitize=false, namespace=false) }}
```

You can also specify a custom class name that should be added to the root `<svg>` node using the `class` argument:

```twig
{{ svg('@webroot/icons/lemon.svg', class='lemon-icon') }}
```

## `source`

Returns the content of a template without rendering it.

This works identically to Twig’s core [`source`](https://twig.symfony.com/doc/2.x/functions/source.html) function.

## `tag`

Renders a complete HTML tag.

```twig
{{ tag('div', {
    class: 'foo'
}) }}
{# Output: <div class="foo"></div> #}
```

If `text` is included in the attributes argument, its value will be HTML-encoded and set as the text contents of the tag.

```twig
{{ tag('div', {
    text: 'Hello'
}) }}
{# Output: <div>Hello</div> #}
```

If `html` is included in the attributes argument (and `text` isn’t), its value will be set as the inner HTML of the tag (without getting HTML-encoded).

```twig
{{ tag('div', {
    html: 'Hello<br>world'
}) }}
{# Output: <div>Hello<br>world</div> #}
```

All other keys passed to the second argument will be set as attributes on the tag, using <api:yii\helpers\BaseHtml::renderTagAttributes()>.

## `template_from_string`

Loads a template from a string.

This works identically to Twig’s core [`template_from_string`](https://twig.symfony.com/doc/2.x/functions/template_from_string.html) function.

## `url`

Returns a URL.

```twig
<a href="{{ url('company/contact') }}">Contact Us</a>
```

### 引数

The `url()` function has the following arguments:

* **`path`** – 結果となる URL がサイトで指すべきパス。それは、ベースサイト URL に追加されます。
* **`params`** – URL に追加するクエリ文字列パラメータ。これは文字列（例：`'foo=1&bar=2'`）またはオブジェクト（例：`{foo:'1', bar:'2'}`）が利用可能です。
* **`scheme`** – URL が使用するスキーム（`'http'` または `'https'`）。デフォルト値は、現在のリクエストが SSL 経由で配信されているかどうかに依存します。そうでなければ、サイト URL のスキームが使用され、SSL 経由なら `https` が使用されます。
* **`mustShowScriptName`** – ここに `true` がセットされている場合、「index.php」を含めた URL が返され、コンフィグ設定の <config:omitScriptNameInUrls> は無視されます。（ブラウザのアドレスバーに表示されない URL と .htaccess ファイルのリダイレクトとの衝突を避けたいような、Ajax 経由の POST リクエストで使用される URL の場合に有用です。）

::: tip
You can use the `url()` function for appending query string parameters and/or enforcing a scheme on an absolute URL:
```twig
{{ url('http://my-project.com', 'foo=1', 'https') }}
{# Outputs: "https://my-project.com?foo=1" #}
```
:::
