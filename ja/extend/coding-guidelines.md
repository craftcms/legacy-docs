# コーディングガイドライン

Craft や Craft プラグイン向けのコードを書くときには、このガイドラインに従うよう最善を尽くしてください。

[[toc]]

## コードスタイル

- [PSR-1](https://www.php-fig.org/psr/psr-1/) と [PSR-2](https://www.php-fig.org/psr/psr-2/) のコーディング基準に従ってください。
- 短い配列構文（`['foo' => 'bar']`）を使用してください。
- 行の長さにあまり思い悩まないでください。可読性に焦点を当てましょう。
- チェインメソッドの呼び出しは、各行の先頭に `->` 演算子を付けて、独自の行に配置する必要があります。
- 複数行にまたがる条件文には、行の最後に理論演算子（`||`、`&&` など）を付ける必要があります。
- 複数行に渡って連結される文字列は、行の最後に `.` 演算子を付ける必要があります。
- 型変換の後にスペースを置かないでください（`(int)$foo`）。
- `include` / `include_once` / `require` / `require_once` のファイルパスを括弧で囲まないでください。それらはファンクションではありません。

::: tip
Craft’s PhpStorm settings repository includes a code style scheme and inspection profile: <https://github.com/craftcms/phpstorm-settings>
:::

## ベストプラクティス

- 可能な限り、メソッド引数の型を宣言してください。

    ```php
    public function foo(Entry $entry, array $settings)
    ```

- 可能な限り、厳格な比較演算子（`===` および `!==`）を使用してください。
- Use `$foo === null`/`$bar !== null` rather than `is_null($foo)`/`!is_null($bar)`.
- Use `(int)$foo`/`(float)$bar` rather than `intval($foo)`/`floatval($bar)`.
- Always pass `true`/`false` to the third argument of [in_array()](http://php.net/manual/en/function.in-array.php) to indicate whether the check should be type-strict (and make it `true` whenever possible).
- Use `$obj->property !== null` rather than `isset($obj->property)` in conditions that check if an object property is set.
- Use `empty()`/`!empty()` in conditions that check if an array is/isn’t empty.
- Refer to class names using the [::class](http://php.net/manual/en/language.oop5.basic.php#language.oop5.basic.class.class) keyword (`Foo::class`) rather than as a string (`'some\nmspace\Foo'`) or <api:yii\base\BaseObject::className()>.
- Initialize arrays explicitly (`$array = []`) rather than implicitly (e.g. `$array[] = 'foo'` where `$array` wasn’t defined yet).
- Use `self::_foo()` rather than `static::_foo()` when calling private static functions, since `static::` would break if the class is extended.
- Use `self::CONSTANT` rather than `static::CONSTANT` (unnecessary overhead).
- Only use the `parent::` keyword when calling a parent method with the exact same name as the current method. Otherwise use `$this->`.
- Always specify the visibility of class properties and methods (`public`, `protected`, or `private`).
- Private class property/method names should begin with an underscore (`private $_foo`).
- Don’t explicitly set class properties’ default values to `null` (e.g. `public $foo = null;`).
- Always use `require` or `include` when including a file that returns something, rather than `require_once` or `include_once`.
- Use `strpos($foo, $bar) === 0` rather than `strncmp($foo, $bar, $barLength) === 0` when checking if one string begins with another string, for short strings.
- Use `$str === ''` rather than `strlen($str) === 0` when checking if a string is empty.
- Avoid using `array_merge()` within loops when possible.
- ループ処理の終了後、foreach ループの参照によって作成された変数を解除してください。

    ```php
    foreach ($array as &$value) {
        // ...
    }
    unset($value);
    ```

- `join()` よりむしろ `implode()` を使用してください。
- Use `in_array()` rather than `array_search(...) !== false` when the position of the needle isn’t needed.
- Don’t use a `switch` statement when a single `if` condition will suffice.
- Use single quotes (`'`) whenever double quotes (`"`) aren’t needed.
- Use shortcut operators (`+=`, `-=`, `*=`, `/=`, `%=`, `.=`, etc.) whenever possible.
- Use shortcut regex patterns (`\d`, `\D`, `\w`, `\W`, etc.) whenever possible.
- Use the `DIRECTORY_SEPARATOR` constant rather than `'/'` when defining file paths.

::: tip
The [Php Inspections (EA Extended)](https://plugins.jetbrains.com/idea/plugin/7622-php-inspections-ea-extended-) PhpStorm plugin can help you locate and fix these sorts of best practice issues.
:::

## 名前空間とクラス名

- ベースパスにマップされている既知のベース名前空間があれば、クラスのファイルの場所を完全修飾名で推測できる [PSR-4](https://www.php-fig.org/psr/psr-4/) 仕様に従ってください。
- 名前空間は、すべて小文字であるべきです。
- クラス名は `StudlyCase` にする必要があります。
- ファーストパーティのコードだけが、``craft\` および``pixelandtonic\` 名前空間ルートを使用します。サードパーティプラグインは、ベンダー名とプラグイン名（例：`acme\myplugin\`）を参照する名前空間ルートを使用する必要があります。

## メソッド名

Getter methods (methods whose primary responsibility is to return something, rather than do something) that **don’t accept any arguments** should begin with `get` , and there should be a corresponding `@property` tag in the class’s docblock to document the corresponding magic getter property.

- `getAuthor()`
- `getIsSystemOn()`
- `getHasFreshContent()`

Getter methods that **accept one or more arguments** (regardless of whether they can be omitted) should only begin with `get` if it “sounds right”.

- `getError($attribute)`
- `hasErrors($attribute = null)`

Static methods should generally not start with `get`.

  - `className()`
  - `displayName()`

## 型宣言

### 引数の型

Use PHP 7.0-supported [argument type declarations](http://php.net/manual/en/functions.arguments.php#functions.arguments.type-declaration) for all function arguments whenever possible. The only exceptions should be:

- [マジックメソッド](http://php.net/manual/en/language.oop5.magic.php)（例：`__toString()`）
- 複数の `null` 以外の値型を受け入れる引数
- 親メソッドで型宣言を持たない、親クラスのメソッドを上書きするメソッド
- インターフェースで必要なメソッドで、インターフェースメソッドに型宣言がないもの

If an argument accepts two types and one of them is `null`, the argument should have a type declaration for the non-`null` type, and a default value of `null`.

```php
public function foo(string $bar = null)
```

::: tip
Do this even if there are required arguments following the argument that accepts `null`. This is the only way to enforce an argument type while also allowing `null` in PHP.
:::

### 戻り値の型

Use PHP 7.0-supported [return type declarations](http://php.net/manual/en/functions.returning-values.php#functions.returning-values.type-declaration) for all methods whenever possible. The only exceptions should be:

- [マジックメソッド](http://php.net/manual/en/language.oop5.magic.php)（例：`__toString()`）
- 複数の戻り値の型を持つメソッド
- 親メソッドで戻り値の型を持たない、親クラスのメソッドを上書きするメソッド
- インターフェースで必要なメソッドで、インターフェースメソッドに戻り値の型がないもの

## Docblock

- サブクラスメソッドを上書きしたり、インターフェースメソッドを実装したり、docblock へ追加するものがないメソッドは、docblock に `@inheritdoc` だけを持つべきです。
- 適切な大文字、文法、および、句読点を持つ完全な文章を docblock の説明に使用してください。
- `@param` および `@return` タグには、大文字や句読点を使用**しないでください**。
- 型定義では、`boolean` と `integer` の代わりに `bool` と `int` を使用してください。
- 意味をなすとき、配列の型宣言で配列メンバのクラス名を指定してください（`array` よりむしろ `ElementInterface[]`）。
- 現在のクラスのインスタンスを返す連鎖可能なファンクションでは、戻り値の型宣言として `static` を使用するべきです。
- 何も返さないファンクションは、`@return void` を持つべきです。

### インターフェース 対  実装クラス

`@param` , `@return` , `@var` , `@method` and `@property` tags on public service methods should reference Interfaces (when applicable), not their implementation class:

```php
// Bad:
/**
 * @param \craft\base\Element $element
 * @param \craft\base\ElementInterface|\craft\base\Element $element
 */

// Better:
/**
 * @param \craft\base\ElementInterface $element
 */
```

Inline `@var` tags should reference implementation classes, not their interfaces:

```php
// Bad:
/** @var \craft\base\ElementInterface $element */
/** @var \craft\base\ElementInterface|\craft\base\Element $element */

// Better:
/** @var \craft\base\Element $element */
```

## 制御フロー

### Happy Path

Use [them](https://en.wikipedia.org/wiki/Happy_path). In general the execution of a method should only make it all the way to the end if everything went as expected.

```php
// Bad:
if ($condition) {
    // Do stuff

    return true;
}

return false;

// Better:
if (!$condition) {
    return false;
}

// Do stuff

return true;
```

### `if`…`return`…`else`

Don’t do this. There’s no point, and can be misleading at first glance.

```php
// Bad:
if ($condition) {
    return $foo;
} else {
    return $bar;
}

// Better:
if ($condition) {
    return $foo;
}

return $bar;
```

## コントローラー

### 戻り値の型

Controller actions that should complete the request must return either a string (HTML) or a Response object.

```php
// Bad:
$this->asJson($obj);
$this->renderTemplate($template, $variables);

// Better:
return $this->asJson($obj);
return $this->renderTemplate($template, $variables);
```

### JSON アクション

Controller actions that have the option of returning JSON should do so if the request explicitly accepts a JSON response; not if it’s an Ajax request.

```php
// Bad:
if (\Craft::$app->getRequest()->getIsAjax()) {
    return $this->asJson([...]);
}

// Better:
if (\Craft::$app->getRequest()->getAcceptsJson()) {
    return $this->asJson([...]);
}
```

Controller actions that *only* return JSON should require that the request accepts JSON.

```php
$this->requireAcceptsJson();
```

## 例外

- ユーザーエラーの結果として、例外が起こる可能性がある場合、<api:yii\base\UserException> クラス（または、サブクラス）を使用してください。
- の場合のみ、<api:Craft::t()> で例外メッセージを翻訳してください。

## データベースクエリ

- テーブル名は常に `{{%` と `}}`（例：`{{%entries}}`）で囲み、適切に引用されテーブル接頭辞が挿入されるようにします。
- 単一のカラムを参照する場合でも、`'col1, col2'` の代わりに `select()` および `groupBy()` で `['col1', 'col2']` 構文を使用してください。
- `'{{%tablename}}'` の代わりに、`from()` で `['{{%tablename}}']` 構文を使用してください。
- `'col1, col2 desc'` の代わりに、`orderBy()` で `['col1' => SORT_ASC, 'col2' => SORT_DESC]` 構文を使用してください。

### 条件
- テーブル / カラム名や値を自動的に引用するように、可能な限り Yii の[宣言条件構文](api:yii\db\QueryInterface::where())を使用してください。
- 一貫性のために、次のものを使用してください。
  -  `['in', 'col', $values]` の代わりに `['col' => $values]`
  - `['=', 'col', $value]` の代わりに `['col' => $value]`
  - `['like', 'col', '%value%', false]` の代わりに `['like', 'col', 'value']` *（`%` は `value` が片側にのみ必要な場合を除きます。）*
- `NULL` を検索する場合、`['col' => null]` 構文を使用してください。
- `NOT NULL` を検索する場合、`['not', ['col' => null]]` 構文を使用してください。
- 宣言条件構文が使用できない場合（例えば、しばしば join を使うようなケースのように、条件が値ではなく他のテーブル / カラム名を参照するなど）、100%安全かどうか自信がないすべてのカラム名と値を確実に引用符で囲み、クエリパラメータとして追加する必要があります。

```php
// Bad:
$query->where('foo.thing is null');
$query->innerJoin('{{%bar}} bar', 'bar.fooId = foo.id');

// Better:
$query->where(['foo.thing' => null]);
$query->innerJoin('{{%bar}} bar', '[[bar.fooId]] = [[foo.id]]');
```

## Getter と Setter

Getter and setter methods should have a corresponding `@property` tag in the class’s docblock, so IDEs like PhpStorm can be aware of the magic properties.

```php
/**
 * @property User $author
 */
class Entry
{
    private $_author;

    /**
     * @return User
     */
    public function getAuthor()
    {
        return $this->_author;
    }
}
```

For a slight performance improvement and easier debugging, you should generally stick with calling the getter and setter methods directly rather than going through their magic properties.

```php
// Bad:
$oldAuthor = $entry->author;
$entry->author = $newAuthor;

// Better:
$oldAuthor = $entry->getAuthor();
$entry->setAuthor($newAuthor);
```

### App コンポーネントの Getter

App components should have their own getter functions, which call the app component getter method [get()](api:yii\di\ServiceLocator::get()) directly:

```php
/**
 * @return Entries
 */
public function getEntries()
{
    return $this->get('entries');
}
```

And you should use those instead of their magic properties:

```php
// Bad:
\Craft::$app->entries->saveEntry($entry);

// Better:
\Craft::$app->getEntries()->saveEntry($entry);
```

If you will be referencing the same app component multiple times within the same method, save a local reference to it.

```php
// Bad:
\Craft::$app->getEntries()->saveEntry($entry1);
\Craft::$app->getEntries()->saveEntry($entry2);

// Better:
$entriesService = \Craft::$app->getEntries();
$entriesService->saveEntry($entry1);
$entriesService->saveEntry($entry2);
```
