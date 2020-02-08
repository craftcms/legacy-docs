# エントリクエリ

**エントリクエリ**を使用して、テンプレートや PHP コード内でエントリを取得できます。

::: code
```twig
{# Create a new entry query #}
{% set myEntryQuery = craft.entries() %}
```
```php
// Create a new entry query
$myEntryQuery = \craft\elements\Entry::find();
```
:::

エレメントクエリを作成すると、結果を絞り込むための[パラメータ](#parameters)をセットできます。さらに、 `.all()` を呼び出して[実行](README.md#executing-element-queries)できます。[Entry](api:craft\elements\Entry) オブジェクトの配列が返されます。

::: tip
エレメントクエリがどのように機能するかについては、[エレメントクエリについて](README.md)を参照してください。
:::

## 実例

次の操作を行うことで、「Blog」セクションに含まれる最新10件のエントリを表示できます。

1. `craft.entries()` でエントリクエリを作成します。
2. [section](#section) および [limit](#limit) パラメータをセットします。
3. `.all()` でエントリを取得します。
4. [for](https://twig.symfony.com/doc/2.x/tags/for.html) タグを使用してエントリをループ処理し、ブログ投稿の HTML を出力します。

```twig
{# Create an entry query with the 'section' and 'limit' parameters #}
{% set myEntryQuery = craft.entries()
    .section('blog')
    .limit(10) %}

{# Fetch the entries #}
{% set entries = myEntryQuery.all() %}

{# Display the entries #}
{% for entry in entries %}
    <article>
        <h1><a href="{{ entry.url }}">{{ entry.title }}</a></h1>
        {{ entry.summary }}
        <a href="{{ entry.url }}">Continue reading</a>
    </article>
{% endfor %}
```

## パラメータ

エントリクエリは、次のパラメータをサポートしています。

<!-- BEGIN PARAMS -->

- [after](#after)
- [ancestorDist](#ancestordist)
- [ancestorOf](#ancestorof)
- [anyStatus](#anystatus)
- [asArray](#asarray)
- [authorGroup](#authorgroup)
- [authorGroupId](#authorgroupid)
- [authorId](#authorid)
- [before](#before)
- [clearCachedResult](#clearcachedresult)
- [dateCreated](#datecreated)
- [dateUpdated](#dateupdated)
- [descendantDist](#descendantdist)
- [descendantOf](#descendantof)
- [draftCreator](#draftcreator)
- [draftId](#draftid)
- [draftOf](#draftof)
- [drafts](#drafts)
- [enabledForSite](#enabledforsite)
- [expiryDate](#expirydate)
- [fixedOrder](#fixedorder)
- [hasDescendants](#hasdescendants)
- [id](#id)
- [ignorePlaceholders](#ignoreplaceholders)
- [inReverse](#inreverse)
- [leaves](#leaves)
- [level](#level)
- [limit](#limit)
- [nextSiblingOf](#nextsiblingof)
- [offset](#offset)
- [orderBy](#orderby)
- [positionedAfter](#positionedafter)
- [positionedBefore](#positionedbefore)
- [postDate](#postdate)
- [preferSites](#prefersites)
- [prevSiblingOf](#prevsiblingof)
- [relatedTo](#relatedto)
- [revisionCreator](#revisioncreator)
- [revisionId](#revisionid)
- [revisionOf](#revisionof)
- [revisions](#revisions)
- [search](#search)
- [section](#section)
- [sectionId](#sectionid)
- [siblingOf](#siblingof)
- [site](#site)
- [siteId](#siteid)
- [slug](#slug)
- [status](#status)
- [title](#title)
- [trashed](#trashed)
- [type](#type)
- [typeId](#typeid)
- [uid](#uid)
- [unique](#unique)
- [uri](#uri)
- [with](#with)

### `after`

特定の日付以降に投稿されたエントリだけに、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値                                                | 取得するエントリ                   |
| ------------------------------------------------ | -------------------------- |
| `'2018-04-01'`                                   | 2018-04-01 以降に投稿されたもの。     |
| [DateTime](http://php.net/class.datetime) オブジェクト | オブジェクトとして表される日付以降に投稿されたもの。 |



::: code
```twig
{# Fetch entries posted this month #}
{% set firstDayOfMonth = date('first day of this month') %}

{% set entries = craft.entries()
    .after(firstDayOfMonth)
    .all() %}
```

```php
// Fetch entries posted this month
$firstDayOfMonth = new \DateTime('first day of this month');

$entries = \craft\elements\Entry::find()
    ->after($firstDayOfMonth)
    ->all();
```
:::


### `ancestorDist`

[ancestorOf](#ancestorof) で指定されたエントリから特定の距離だけ離れているエントリのみに、クエリの結果を絞り込みます。





::: code
```twig
{# Fetch entries above this one #}
{% set entries = craft.entries()
    .ancestorOf(myEntry)
    .ancestorDist(3)
    .all() %}
```

```php
// Fetch entries above this one
$entries = \craft\elements\Entry::find()
    ->ancestorOf($myEntry)
    ->ancestorDist(3)
    ->all();
```
:::


### `ancestorOf`

指定したエントリの先祖であるエントリだけに、クエリの結果を絞り込みます。



利用可能な値には、次のものが含まれます。

| 値                                          | 取得するエントリ            |
| ------------------------------------------ | ------------------- |
| `1`                                        | ID が 1 のエントリの上層。    |
| [Entry](api:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの上層。 |



::: code
```twig
{# Fetch entries above this one #}
{% set entries = craft.entries()
    .ancestorOf(myEntry)
    .all() %}
```

```php
// Fetch entries above this one
$entries = \craft\elements\Entry::find()
    ->ancestorOf($myEntry)
    ->all();
```
:::



::: tip
どれだけ離れた先祖エントリを対象にするか制限したい場合、[ancestorDist](#ancestordist) と組み合わせることができます。
:::


### `anyStatus`

[status](#status) および [enabledForSite](#enabledforsite) パラメータをクリアします。





::: code
```twig
{# Fetch all entries, regardless of status #}
{% set entries = craft.entries()
    .anyStatus()
    .all() %}
```

```php
// Fetch all entries, regardless of status
$entries = \craft\elements\Entry::find()
    ->anyStatus()
    ->all();
```
:::


### `asArray`

[Entry](api:craft\elements\Entry) オブジェクトではなく、データの配列として、マッチしたエントリをクエリが返します。





::: code
```twig
{# Fetch entries as arrays #}
{% set entries = craft.entries()
    .asArray()
    .all() %}
```

```php
// Fetch entries as arrays
$entries = \craft\elements\Entry::find()
    ->asArray()
    ->all();
```
:::


### `authorGroup`

エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値                                                | 取得するエントリ                              |
| ------------------------------------------------ | ------------------------------------- |
| `'foo'`                                          | ハンドルが `foo` のグループ内の投稿者。               |
| `'not foo'`                                      | ハンドルが `foo` のグループ内の投稿者ではない。           |
| `['foo', 'bar']`                                 | ハンドルが `foo` または `bar` のグループ内の投稿者。     |
| `['not', 'foo', 'bar']`                          | ハンドルが `foo` または `bar` のグループ内の投稿者ではない。 |
| [UserGroup](api:craft\models\UserGroup) オブジェクト | オブジェクトで表されるグループ内の投稿者。                 |



::: code
```twig
{# Fetch entries with an author in the Foo user group #}
{% set entries = craft.entries()
    .authorGroup('foo')
    .all() %}
```

```php
// Fetch entries with an author in the Foo user group
$entries = \craft\elements\Entry::find()
    ->authorGroup('foo')
    ->all();
```
:::


### `authorGroupId`

グループの ID ごとに、エントリの投稿者が属するユーザーグループに基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値               | 取得するエントリ                     |
| --------------- | ---------------------------- |
| `1`             | ID が 1 のグループ内の投稿者。           |
| `'not 1'`       | ID が 1 のグループ内の投稿者ではない。       |
| `[1, 2]`        | ID が 1 または 2 のグループ内の投稿者。     |
| `['not', 1, 2]` | ID が 1 または 2 のグループ内の投稿者ではない。 |



::: code
```twig
{# Fetch entries with an author in a group with an ID of 1 #}
{% set entries = craft.entries()
    .authorGroupId(1)
    .all() %}
```

```php
// Fetch entries with an author in a group with an ID of 1
$entries = \craft\elements\Entry::find()
    ->authorGroupId(1)
    ->all();
```
:::


### `authorId`

エントリの投稿者に基づいて、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値               | 取得するエントリ               |
| --------------- | ---------------------- |
| `1`             | ID が 1 の投稿者。           |
| `'not 1'`       | ID が 1 の投稿者ではない。       |
| `[1, 2]`        | ID が 1 または 2 の投稿者。     |
| `['not', 1, 2]` | ID が 1 または 2 の投稿者ではない。 |



::: code
```twig
{# Fetch entries with an author with an ID of 1 #}
{% set entries = craft.entries()
    .authorId(1)
    .all() %}
```

```php
// Fetch entries with an author with an ID of 1
$entries = \craft\elements\Entry::find()
    ->authorId(1)
    ->all();
```
:::


### `before`

特定の日付より前に投稿されたエントリだけに、クエリの結果を絞り込みます。

利用可能な値には、次のものが含まれます。

| 値                                                | 取得するエントリ                  |
| ------------------------------------------------ | ------------------------- |
| `'2018-04-01'`                                   | 2018-04-01 より前に投稿されたもの。   |
| [DateTime](http://php.net/class.datetime) オブジェクト | オブジェクトで表される日付より前に投稿されたもの。 |



::: code
```twig
{# Fetch entries posted before this month #}
{% set firstDayOfMonth = date('first day of this month') %}

{% set entries = craft.entries()
    .before(firstDayOfMonth)
    .all() %}
```

```php
// Fetch entries posted before this month
$firstDayOfMonth = new \DateTime('first day of this month');

$entries = \craft\elements\Entry::find()
    ->before($firstDayOfMonth)
    ->all();
```
:::


### `clearCachedResult`

Clears the cached result.






### `dateCreated`

Narrows the query results based on the entries’ creation dates.



Possible values include:

| 値                                                | 取得するエントリ                             |
| ------------------------------------------------ | ------------------------------------ |
| `'>= 2018-04-01'`                             | 2018-04-01 以降に作成されたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前に作成されたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間に作成されたもの。 |



::: code
```twig
{# Fetch entries created last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set entries = craft.entries()
    .dateCreated(['and', ">= #{start}", "< #{end}"])
    .all() %}
```

```php
// Fetch entries created last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->dateCreated(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


### `dateUpdated`

Narrows the query results based on the entries’ last-updated dates.



Possible values include:

| 値                                                | 取得するエントリ                                 |
| ------------------------------------------------ | ---------------------------------------- |
| `'>= 2018-04-01'`                             | 2018-04-01 以降にアップデートされたもの。               |
| `'< 2018-05-01'`                              | 2018-05-01 より前にアップデートされたもの。              |
| `['and', '>= 2018-04-04', '< 2018-05-01']` | 2018-04-01 から 2018-05-01 の間にアップデートされたもの。 |



::: code
```twig
{# Fetch entries updated in the last week #}
{% set lastWeek = date('1 week ago')|atom %}

{% set entries = craft.entries()
    .dateUpdated(">= #{lastWeek}")
    .all() %}
```

```php
// Fetch entries updated in the last week
$lastWeek = (new \DateTime('1 week ago'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->dateUpdated(">= {$lastWeek}")
    ->all();
```
:::


### `descendantDist`

Narrows the query results to only entries that are up to a certain distance away from the entry specified by [descendantOf](#descendantof).





::: code
```twig
{# Fetch entries below this one #}
{% set entries = craft.entries()
    .descendantOf(myEntry)
    .descendantDist(3)
    .all() %}
```

```php
// Fetch entries below this one
$entries = \craft\elements\Entry::find()
    ->descendantOf($myEntry)
    ->descendantDist(3)
    ->all();
```
:::


### `descendantOf`

Narrows the query results to only entries that are descendants of another entry.



Possible values include:

| 値                                          | 取得するエントリ            |
| ------------------------------------------ | ------------------- |
| `1`                                        | ID が 1 のカテゴリの下層。    |
| [Entry](api:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの下層。 |



::: code
```twig
{# Fetch entries below this one #}
{% set entries = craft.entries()
    .descendantOf(myEntry)
    .all() %}
```

```php
// Fetch entries below this one
$entries = \craft\elements\Entry::find()
    ->descendantOf($myEntry)
    ->all();
```
:::



::: tip
This can be combined with [descendantDist](#descendantdist) if you want to limit how far away the descendant entries can be.
:::


### `draftCreator`

Narrows the query results to only drafts created by a given user.



Possible values include:

| 値                                                           | 取得するエントリ                                       |
| ----------------------------------------------------------- | ---------------------------------------------- |
| `1`                                                         | サイト内で有効になっているもの。                               |
| a [craft\elements\User](api:craft\elements\User) object | created by the user represented by the object. |



::: code
```twig
{# Fetch all entries, including ones disabled for this site #}
{% set entries = craft.entries()
    .enabledForSite(false)
    .all() %}
```

```php
// Fetch all entries, including ones disabled for this site
$entries = \craft\elements\Entry::find()
    ->enabledForSite(false)
    ->all();
```
:::


### `draftId`

Narrows the query results based on the entries’ draft’s ID (from the `drafts` table).



Possible values include:

| 値           | 取得するエントリ    |
| ----------- | ----------- |
| `':empty:'` | 有効期限日を持たない。 |



::: code
```twig
{# Fetch entries expiring this month #}
{% set nextMonth = date('first day of next month')|atom %}

{% set entries = craft.entries()
    .expiryDate("< #{nextMonth}")
    .all() %}
```

```php
// Fetch entries expiring this month
$nextMonth = (new \DateTime('first day of next month'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->expiryDate("< {$nextMonth}")
    ->all();
```
:::


### `draftOf`

Narrows the query results to only drafts of a given entry.



Possible values include:

| 値                                            | 取得するエントリ    |
| -------------------------------------------- | ----------- |
| `1`                                          | ID が 1。     |
| a [Entry](api:craft\elements\Entry) object | ID が 1ではない。 |



::: code
```twig
{# Fetch entries in a specific order #}
{% set entries = craft.entries()
    .id([1, 2, 3, 4, 5])
    .fixedOrder()
    .all() %}
```

```php
// Fetch entries in a specific order
$entries = \craft\elements\Entry::find()
    ->id([1, 2, 3, 4, 5])
    ->fixedOrder()
    ->all();
```
:::


### `drafts`

Narrows the query results to only drafts entries.





::: code
```twig
{# Fetch entries that have descendants #}
{% set entries = craft.entries()
    .hasDescendants()
    .all() %}
```

```php
// Fetch entries that have descendants
$entries = \craft\elements\Entry::find()
    ->hasDescendants()
    ->all();
```
:::


### `enabledForSite`

Narrows the query results based on whether the entries are enabled in the site they’re being queried in, per the [site](#site) parameter.



Possible values include:

| 値                  | 取得するエントリ     |
| ------------------ | ------------ |
| `true` _(default)_ | レベルが 1。      |
| `'not 1'`          | レベルが 1 ではない。 |



::: code
```twig
{# Fetch the entry by its ID #}
{% set entry = craft.entries()
    .id(1)
    .one() %}
```

```php
// Fetch the entry by its ID
$entry = \craft\elements\Entry::find()
    ->id(1)
    ->one();
```
:::


### `expiryDate`

Narrows the query results based on the entries’ expiry dates.

Possible values include:

| 値                                                | 取得するエントリ                                            |
| ------------------------------------------------ | --------------------------------------------------- |
| `1`                                              | ID が 1 のエントリの後。                                     |
| `':notempty:'`                                   | オブジェクトで表されるエントリの後。                                  |
| `'>= 2020-04-01'`                             | that will expire on or after 2020-04-01.            |
| `'< 2020-05-01'`                              | that will expire before 2020-05-01                  |
| `['and', '>= 2020-04-04', '< 2020-05-01']` | that will expire between 2020-04-01 and 2020-05-01. |



::: code
```twig
{# Fetch entries in reverse #}
{% set entries = craft.entries()
    .inReverse()
    .all() %}
```

```php
// Fetch entries in reverse
$entries = \craft\elements\Entry::find()
    ->inReverse()
    ->all();
```
:::


### `fixedOrder`

Causes the query results to be returned in the order specified by [id](#id).





::: code
```twig
{# Fetch entries that have no descendants #}
{% set entries = craft.entries()
    .leaves()
    .all() %}
```

```php
// Fetch entries that have no descendants
$entries = \craft\elements\Entry::find()
    ->leaves()
    ->all();
```
:::


### `hasDescendants`

Narrows the query results based on whether the entries have any descendants.



(This has the opposite effect of calling [leaves](#leaves).)



::: code
```twig
{# Fetch entries positioned at level 3 or above #}
{% set entries = craft.entries()
    .level('>= 3')
    .all() %}
```

```php
// Fetch entries positioned at level 3 or above
$entries = \craft\elements\Entry::find()
    ->level('>= 3')
    ->all();
```
:::


### `id`

Narrows the query results based on the entries’ IDs.



Possible values include:

| 値               | 取得するエントリ                  |
| --------------- | ------------------------- |
| `1`             | ID が 1 のエントリの後。           |
| `'not 1'`       | オブジェクトで表されるエントリの後。        |
| `[1, 2]`        | with an ID of 1 or 2.     |
| `['not', 1, 2]` | not with an ID of 1 or 2. |



::: code
```twig
{# Fetch up to 10 entries  #}
{% set entries = craft.entries()
    .limit(10)
    .all() %}
```

```php
// Fetch up to 10 entries
$entries = \craft\elements\Entry::find()
    ->limit(10)
    ->all();
```
:::



::: tip
This can be combined with [fixedOrder](#fixedorder) if you want the results to be returned in a specific order.
:::


### `ignorePlaceholders`

Causes the query to return matching entries as they are stored in the database, ignoring matching placeholder elements that were set by [craft\services\Elements::setPlaceholderElement()](https://docs.craftcms.com/api/v3/craft-services-elements.html#method-setplaceholderelement).










### `inReverse`

Causes the query results to be returned in reverse order.





::: code
```twig
{# Fetch the next entry #}
{% set entry = craft.entries()
    .nextSiblingOf(myEntry)
    .one() %}
```

```php
// Fetch the next entry
$entry = \craft\elements\Entry::find()
    ->nextSiblingOf($myEntry)
    ->one();
```
:::


### `leaves`

Narrows the query results based on whether the entries are “leaves” (entries with no descendants).



(This has the opposite effect of calling [hasDescendants](#hasdescendants).)



::: code
```twig
{# Fetch all entries except for the first 3 #}
{% set entries = craft.entries()
    .offset(3)
    .all() %}
```

```php
// Fetch all entries except for the first 3
$entries = \craft\elements\Entry::find()
    ->offset(3)
    ->all();
```
:::


### `level`

Narrows the query results based on the entries’ level within the structure.



Possible values include:

| 値               | 取得するエントリ                                 |
| --------------- | ---------------------------------------- |
| `1`             | ID が 1 のエントリの前。                          |
| `'not 1'`       | オブジェクトで表されるエントリの前。                       |
| `'>= 3'`     | with a level greater than or equal to 3. |
| `[1, 2]`        | with a level of 1 or 2                   |
| `['not', 1, 2]` | not with level of 1 or 2.                |



::: code
```twig
{# Fetch all entries in order of date created #}
{% set entries = craft.entries()
    .orderBy('dateCreated asc')
    .all() %}
```

```php
// Fetch all entries in order of date created
$entries = \craft\elements\Entry::find()
    ->orderBy('dateCreated asc')
    ->all();
```
:::


### `limit`

Determines the number of entries that should be returned.



::: code
```twig
{# Fetch entries after this one #}
{% set entries = craft.entries()
    .positionedAfter(myEntry)
    .all() %}
```

```php
// Fetch entries after this one
$entries = \craft\elements\Entry::find()
    ->positionedAfter($myEntry)
    ->all();
```
:::


### `nextSiblingOf`

Narrows the query results to only the entry that comes immediately after another entry.



Possible values include:

| 値                                            | 取得するエントリ                |
| -------------------------------------------- | ----------------------- |
| `'>= 2018-04-01'`                         | 2018-04-01 以降に投稿されたもの。  |
| a [Entry](api:craft\elements\Entry) object | 2018-05-01 より前に投稿されたもの。 |



::: code
```twig
{# Fetch entries before this one #}
{% set entries = craft.entries()
    .positionedBefore(myEntry)
    .all() %}
```

```php
// Fetch entries before this one
$entries = \craft\elements\Entry::find()
    ->positionedBefore($myEntry)
    ->all();
```
:::


### `offset`

Determines how many entries should be skipped in the results.



::: code
```twig
{# Fetch entries posted last month #}
{% set start = date('first day of last month')|atom %}
{% set end = date('first day of this month')|atom %}

{% set entries = craft.entries()
    .postDate(['and', ">= #{start}", "< #{end}"])
    .all() %}
```

```php
// Fetch entries posted last month
$start = (new \DateTime('first day of last month'))->format(\DateTime::ATOM);
$end = (new \DateTime('first day of this month'))->format(\DateTime::ATOM);

$entries = \craft\elements\Entry::find()
    ->postDate(['and', ">= {$start}", "< {$end}"])
    ->all();
```
:::


### `orderBy`

Determines the order that the entries should be returned in.



::: code
```twig
{# Fetch the previous entry #}
{% set entry = craft.entries()
    .prevSiblingOf(myEntry)
    .one() %}
```

```php
// Fetch the previous entry
$entry = \craft\elements\Entry::find()
    ->prevSiblingOf($myEntry)
    ->one();
```
:::


### `positionedAfter`

Narrows the query results to only entries that are positioned after another entry.



Possible values include:

| 値                                          | 取得するエントリ           |
| ------------------------------------------ | ------------------ |
| `1`                                        | ID が 1 のエントリの前。    |
| [Entry](api:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの前。 |



::: code
```twig
{# Fetch all entries that are related to myCategory #}
{% set entries = craft.entries()
    .relatedTo(myCategory)
    .all() %}
```

```php
// Fetch all entries that are related to $myCategory
$entries = \craft\elements\Entry::find()
    ->relatedTo($myCategory)
    ->all();
```
:::


### `positionedBefore`

Narrows the query results to only entries that are positioned before another entry.



Possible values include:

| 値                                            | 取得するエントリ                 |
| -------------------------------------------- | ------------------------ |
| `'foo'`                                      | ハンドルが `foo` のセクション内。     |
| a [Entry](api:craft\elements\Entry) object | ハンドルが `foo` のセクション内ではない。 |



::: code
```twig
{# Get the search query from the 'q' query string param #}
{% set searchQuery = craft.app.request.getQueryParam('q') %}

{# Fetch all entries that match the search query #}
{% set entries = craft.entries()
    .search(searchQuery)
    .all() %}
```

```php
// Get the search query from the 'q' query string param
$searchQuery = \Craft::$app->request->getQueryParam('q');

// Fetch all entries that match the search query
$entries = \craft\elements\Entry::find()
    ->search($searchQuery)
    ->all();
```
:::


### `postDate`

Narrows the query results based on the entries’ post dates.

Possible values include:

| 値         | 取得するエントリ              |
| --------- | --------------------- |
| `1`       | ID が 1 のセクション内。       |
| `'not 1'` | ID が 1 のセクション内ではない。   |
| `[1, 2]`  | ID が 1 または 2 のセクション内。 |



::: code
```twig
{# Fetch entries in the Foo section #}
{% set entries = craft.entries()
    .section('foo')
    .all() %}
```

```php
// Fetch entries in the Foo section
$entries = \craft\elements\Entry::find()
    ->section('foo')
    ->all();
```
:::


### `preferSites`

If [unique](#unique) is set, this determines which site should be selected when querying multi-site elements.



For example, if element “Foo” exists in Site A and Site B, and element “Bar” exists in Site B and Site C, and this is set to `['c', 'b', 'a']`, then Foo will be returned for Site C, and Bar will be returned for Site B.

If this isn’t set, then preference goes to the current site.



::: code
```twig
{# Fetch entries in the section with an ID of 1 #}
{% set entries = craft.entries()
    .sectionId(1)
    .all() %}
```

```php
// Fetch entries in the section with an ID of 1
$entries = \craft\elements\Entry::find()
    ->sectionId(1)
    ->all();
```
:::


### `prevSiblingOf`

Narrows the query results to only the entry that comes immediately before another entry.



Possible values include:

| 値                                          | 取得するエントリ           |
| ------------------------------------------ | ------------------ |
| `1`                                        | ID が 1 のエントリの横。    |
| [Entry](api:craft\elements\Entry) オブジェクト | オブジェクトで表されるエントリの横。 |



::: code
```twig
{# Fetch entries beside this one #}
{% set entries = craft.entries()
    .siblingOf(myEntry)
    .all() %}
```

```php
// Fetch entries beside this one
$entries = \craft\elements\Entry::find()
    ->siblingOf($myEntry)
    ->all();
```
:::


### `relatedTo`

Narrows the query results to only entries that are related to certain other elements.



See [Relations](https://docs.craftcms.com/v3/relations.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch entries from the Foo site #}
{% set entries = craft.entries()
    .site('foo')
    .all() %}
```

```php
// Fetch entries from the Foo site
$entries = \craft\elements\Entry::find()
    ->site('foo')
    ->all();
```
:::


### `revisionCreator`

Narrows the query results to only revisions created by a given user.



Possible values include:

| 値                                                           | 取得するエントリ                                       |
| ----------------------------------------------------------- | ---------------------------------------------- |
| `'foo'`                                                     | ハンドルが `foo` のサイトから。                            |
| a [craft\elements\User](api:craft\elements\User) object | created by the user represented by the object. |



::: code
```twig
{# Fetch entries from the site with an ID of 1 #}
{% set entries = craft.entries()
    .siteId(1)
    .all() %}
```

```php
// Fetch entries from the site with an ID of 1
$entries = \craft\elements\Entry::find()
    ->siteId(1)
    ->all();
```
:::


### `revisionId`

Narrows the query results based on the entries’ revision’s ID (from the `revisions` table).



Possible values include:

| 値       | 取得するエントリ    |
| ------- | ----------- |
| `'foo'` | スラグが `foo`。 |



::: code
```twig
{# Get the requested entry slug from the URL #}
{% set requestedSlug = craft.app.request.getSegment(3) %}

{# Fetch the entry with that slug #}
{% set entry = craft.entries()
    .slug(requestedSlug|literal)
    .one() %}
```

```php
// Get the requested entry slug from the URL
$requestedSlug = \Craft::$app->request->getSegment(3);

// Fetch the entry with that slug
$entry = \craft\elements\Entry::find()
    ->slug(\craft\helpers\Db::escapeParam($requestedSlug))
    ->one();
```
:::


### `revisionOf`

Narrows the query results to only revisions of a given entry.



Possible values include:

| 値                                            | 取得するエントリ                      |
| -------------------------------------------- | ----------------------------- |
| `1`                                          | 公開しているもの。                     |
| a [Entry](api:craft\elements\Entry) object | 保留しているもの（未来の投稿日がセットされた有効なもの）。 |



::: code
```twig
{# Fetch disabled entries #}
{% set entries = {twig-function}
    .status('disabled')
    .all() %}
```

```php
// Fetch disabled entries
$entries = \craft\elements\Entry::find()
    ->status('disabled')
    ->all();
```
:::


### `revisions`

Narrows the query results to only revision entries.





::: code
```twig
{# Fetch entries with a title that contains "Foo" #}
{% set entries = craft.entries()
    .title('*Foo*')
    .all() %}
```

```php
// Fetch entries with a title that contains "Foo"
$entries = \craft\elements\Entry::find()
    ->title('*Foo*')
    ->all();
```
:::


### `search`

Narrows the query results to only entries that match a search query.



See [Searching](https://docs.craftcms.com/v3/searching.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch trashed entries #}
{% set entries = {twig-function}
    .trashed()
    .all() %}
```

```php
// Fetch trashed entries
$entries = \craft\elements\Entry::find()
    ->trashed()
    ->all();
```
:::


### `section`

Narrows the query results based on the sections the entries belong to.

Possible values include:

| 値                                              | 取得するエントリ           |
| ---------------------------------------------- | ------------------ |
| `'Foo'`                                        | タイトルが `Foo`。       |
| `'Foo*'`                                       | タイトルが `Foo` ではじまる。 |
| `'*Foo'`                                       | タイトルが `Foo` で終わる。  |
| `'*Foo*'`                                      | タイトルが `Foo` を含む。   |
| a [Section](api:craft\models\Section) object | タイトルが `Foo` を含まない。 |



::: code
```twig
{# Fetch entries in the Foo section with a Bar entry type #}
{% set entries = craft.entries()
    .section('foo')
    .type('bar')
    .all() %}
```

```php
// Fetch entries in the Foo section with a Bar entry type
$entries = \craft\elements\Entry::find()
    ->section('foo')
    ->type('bar')
    ->all();
```
:::


### `sectionId`

Narrows the query results based on the sections the entries belong to, per the sections’ IDs.

Possible values include:

| 値                       | 取得するエントリ                        |
| ----------------------- | ------------------------------- |
| `'foo'`                 | ハンドルが `foo` のタイプ。               |
| `'not foo'`             | ハンドルが `foo` のタイプではない。           |
| `['foo', 'bar']`        | ハンドルが `foo` または `bar` のタイプ。     |
| `['not', 'foo', 'bar']` | ハンドルが `foo` または `bar` のタイプではない。 |



::: code
```twig
{# Fetch entries of the entry type with an ID of 1 #}
{% set entries = craft.entries()
    .typeId(1)
    .all() %}
```

```php
// Fetch entries of the entry type with an ID of 1
$entries = \craft\elements\Entry::find()
    ->typeId(1)
    ->all();
```
:::


### `siblingOf`

Narrows the query results to only entries that are siblings of another entry.



Possible values include:

| 値                                            | 取得するエントリ         |
| -------------------------------------------- | ---------------- |
| `1`                                          | ID が 1 のタイプ。     |
| a [Entry](api:craft\elements\Entry) object | ID が 1 のタイプではない。 |



::: code
```twig
{# Fetch the entry by its UID #}
{% set entry = craft.entries()
    .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    .one() %}
```

```php
// Fetch the entry by its UID
$entry = \craft\elements\Entry::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


### `site`

Determines which site(s) the entries should be queried in.



The current site will be used by default.

Possible values include:

| 値                                                       | 取得するエントリ           |
| ------------------------------------------------------- | ------------------ |
| `'foo'`                                                 | URI が `foo`。       |
| `'foo*'`                                                | URI が `foo` ではじまる。 |
| `'*foo'`                                                | URI が `foo` で終わる。  |
| a [craft\models\Site](api:craft\models\Site) object | URI が `foo` を含む。   |
| `'not *foo*'`                                           | URI が `foo` を含まない。 |

::: tip
If multiple sites are specified, elements that belong to multiple sites will be returned multiple times. If you only want unique elements to be returned, use [unique](#unique) in conjunction with this.
:::



::: code
```twig
{# Get the requested URI #}
{% set requestedUri = craft.app.request.getPathInfo() %}

{# Fetch the entry with that URI #}
{% set entry = craft.entries()
    .uri(requestedUri|literal)
    .one() %}
```

```php
// Get the requested URI
$requestedUri = \Craft::$app->request->getPathInfo();

// Fetch the entry with that URI
$entry = \craft\elements\Entry::find()
    ->uri(\craft\helpers\Db::escapeParam($requestedUri))
    ->one();
```
:::


### `siteId`

Determines which site(s) the entries should be queried in, per the site’s ID.



The current site will be used by default.



::: code
```twig
{# Fetch entries eager-loaded with the "Related" field’s relations #}
{% set entries = craft.entries()
    .with(['related'])
    .all() %}
```

```php
// Fetch entries eager-loaded with the "Related" field’s relations
$entries = \craft\elements\Entry::find()
    ->with(['related'])
    ->all();
```
:::


### `slug`

Narrows the query results based on the entries’ slugs.



Possible values include:

| Value                       | Fetches entries…                                 |
| --------------------------- | ------------------------------------------------ |
| `'foo'`                     | with a slug of `foo`.                            |
| `'foo*'`                    | with a slug that begins with `foo`.              |
| `'*foo'`                    | with a slug that ends with `foo`.                |
| `'*foo*'`                   | with a slug that contains `foo`.                 |
| `'not *foo*'`               | with a slug that doesn’t contain `foo`.          |
| `['*foo*', '*bar*']`        | with a slug that contains `foo` or `bar`.        |
| `['not', '*foo*', '*bar*']` | with a slug that doesn’t contain `foo` or `bar`. |



::: code
```twig
{# Get the requested entry slug from the URL #}
{% set requestedSlug = craft.app.request.getSegment(3) %}

{# Fetch the entry with that slug #}
{% set entry = craft.entries()
    .slug(requestedSlug|literal)
    .one() %}
```

```php
// Get the requested entry slug from the URL
$requestedSlug = \Craft::$app->request->getSegment(3);

// Fetch the entry with that slug
$entry = \craft\elements\Entry::find()
    ->slug(\craft\helpers\Db::escapeParam($requestedSlug))
    ->one();
```
:::


### `status`

Narrows the query results based on the entries’ statuses.

Possible values include:

| Value                 | Fetches entries…                                            |
| --------------------- | ----------------------------------------------------------- |
| `'live'` _(default)_  | that are live.                                              |
| `'pending'`           | that are pending (enabled with a Post Date in the future).  |
| `'expired'`           | that are expired (enabled with an Expiry Date in the past). |
| `'disabled'`          | that are disabled.                                          |
| `['live', 'pending']` | that are live or pending.                                   |



::: code
```twig
{# Fetch disabled entries #}
{% set entries = craft.entries()
    .status('disabled')
    .all() %}
```

```php
// Fetch disabled entries
$entries = \craft\elements\Entry::find()
    ->status('disabled')
    ->all();
```
:::


### `title`

Narrows the query results based on the entries’ titles.



Possible values include:

| Value                       | Fetches entries…                                  |
| --------------------------- | ------------------------------------------------- |
| `'Foo'`                     | with a title of `Foo`.                            |
| `'Foo*'`                    | with a title that begins with `Foo`.              |
| `'*Foo'`                    | with a title that ends with `Foo`.                |
| `'*Foo*'`                   | with a title that contains `Foo`.                 |
| `'not *Foo*'`               | with a title that doesn’t contain `Foo`.          |
| `['*Foo*', '*Bar*']`        | with a title that contains `Foo` or `Bar`.        |
| `['not', '*Foo*', '*Bar*']` | with a title that doesn’t contain `Foo` or `Bar`. |



::: code
```twig
{# Fetch entries with a title that contains "Foo" #}
{% set entries = craft.entries()
    .title('*Foo*')
    .all() %}
```

```php
// Fetch entries with a title that contains "Foo"
$entries = \craft\elements\Entry::find()
    ->title('*Foo*')
    ->all();
```
:::


### `trashed`

Narrows the query results to only entries that have been soft-deleted.





::: code
```twig
{# Fetch trashed entries #}
{% set entries = craft.entries()
    .trashed()
    .all() %}
```

```php
// Fetch trashed entries
$entries = \craft\elements\Entry::find()
    ->trashed()
    ->all();
```
:::


### `type`

Narrows the query results based on the entries’ entry types.

Possible values include:

| Value                                               | Fetches entries…                               |
| --------------------------------------------------- | ---------------------------------------------- |
| `'foo'`                                             | of a type with a handle of `foo`.              |
| `'not foo'`                                         | not of a type with a handle of `foo`.          |
| `['foo', 'bar']`                                    | of a type with a handle of `foo` or `bar`.     |
| `['not', 'foo', 'bar']`                             | not of a type with a handle of `foo` or `bar`. |
| an [EntryType](api:craft\models\EntryType) object | of a type represented by the object.           |



::: code
```twig
{# Fetch entries in the Foo section with a Bar entry type #}
{% set entries = craft.entries()
    .section('foo')
    .type('bar')
    .all() %}
```

```php
// Fetch entries in the Foo section with a Bar entry type
$entries = \craft\elements\Entry::find()
    ->section('foo')
    ->type('bar')
    ->all();
```
:::


### `typeId`

Narrows the query results based on the entries’ entry types, per the types’ IDs.

Possible values include:

| Value           | Fetches entries…                    |
| --------------- | ----------------------------------- |
| `1`             | of a type with an ID of 1.          |
| `'not 1'`       | not of a type with an ID of 1.      |
| `[1, 2]`        | of a type with an ID of 1 or 2.     |
| `['not', 1, 2]` | not of a type with an ID of 1 or 2. |



::: code
```twig
{# Fetch entries of the entry type with an ID of 1 #}
{% set entries = craft.entries()
    .typeId(1)
    .all() %}
```

```php
// Fetch entries of the entry type with an ID of 1
$entries = \craft\elements\Entry::find()
    ->typeId(1)
    ->all();
```
:::


### `uid`

Narrows the query results based on the entries’ UIDs.





::: code
```twig
{# Fetch the entry by its UID #}
{% set entry = craft.entries()
    .uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    .one() %}
```

```php
// Fetch the entry by its UID
$entry = \craft\elements\Entry::find()
    ->uid('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx')
    ->one();
```
:::


### `unique`

Determines whether only elements with unique IDs should be returned by the query.



This should be used when querying elements from multiple sites at the same time, if “duplicate” results is not desired.



::: code
```twig
{# Fetch unique entries across all sites #}
{% set entries = craft.entries()
    .site('*')
    .unique()
    .all() %}
```

```php
// Fetch unique entries across all sites
$entries = \craft\elements\Entry::find()
    ->site('*')
    ->unique()
    ->all();
```
:::


### `uri`

Narrows the query results based on the entries’ URIs.



Possible values include:

| Value                       | Fetches entries…                                |
| --------------------------- | ----------------------------------------------- |
| `'foo'`                     | with a URI of `foo`.                            |
| `'foo*'`                    | with a URI that begins with `foo`.              |
| `'*foo'`                    | with a URI that ends with `foo`.                |
| `'*foo*'`                   | with a URI that contains `foo`.                 |
| `'not *foo*'`               | with a URI that doesn’t contain `foo`.          |
| `['*foo*', '*bar*']`        | with a URI that contains `foo` or `bar`.        |
| `['not', '*foo*', '*bar*']` | with a URI that doesn’t contain `foo` or `bar`. |



::: code
```twig
{# Get the requested URI #}
{% set requestedUri = craft.app.request.getPathInfo() %}

{# Fetch the entry with that URI #}
{% set entry = craft.entries()
    .uri(requestedUri|literal)
    .one() %}
```

```php
// Get the requested URI
$requestedUri = \Craft::$app->request->getPathInfo();

// Fetch the entry with that URI
$entry = \craft\elements\Entry::find()
    ->uri(\craft\helpers\Db::escapeParam($requestedUri))
    ->one();
```
:::


### `with`

Causes the query to return matching entries eager-loaded with related elements.



See [Eager-Loading Elements](https://docs.craftcms.com/v3/dev/eager-loading-elements.html) for a full explanation of how to work with this parameter.



::: code
```twig
{# Fetch entries eager-loaded with the "Related" field’s relations #}
{% set entries = craft.entries()
    .with(['related'])
    .all() %}
```

```php
// Fetch entries eager-loaded with the "Related" field’s relations
$entries = \craft\elements\Entry::find()
    ->with(['related'])
    ->all();
```
:::



<!-- END PARAMS -->

