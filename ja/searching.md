# 検索

このバーが表示されている場所ならどこでも、エレメントを検索できます。

![検索バー](./images/searching-search-bar.png)

## サポートする構文

Craft は次の検索構文をサポートしています。

| この検索によって                 | こちらのエレメントが見つかるでしょう                         |
| ------------------------ | ------------------------------------------ |
| `salty`                  | 「salty」という単語を含んでいる                         |
| `salty dog`              | 「salty」と「dog」の両方を含んでいる。                    |
| `salty OR dog`           | 「salty」または「dog」のいずれか（または、両方）を含んでいる。        |
| `salty -dog`             | 「salty」を含むが「dog」を含んでいない。                   |
| `"salty dog"`            | 正確なフレーズとして「salty dog」を含んでいる。               |
| `*ty`                    | 「ty」で終わる単語を含んでいる。                          |
| `*alt*`                  | 「alt」を含む単語を含んでいる。                          |
| `body:salty`             | `body` フィールドに「salty」を含む。                   |
| `body:salty body:dog`    | `body` フィールドに「salty」と「dog」の両方を含む。          |
| `body:salty OR body:dog` | `body` フィールドに「salty」または「dog」のいずれかを含む。      |
| `body:salty -body:dog`   | `body` フィールドに「salty」を含むが「dog」を含まない。        |
| `body:"salty dog"`       | `body` フィールドに正確なフレーズとして「salty dog」を含む。     |
| `body:*ty`               | `body` フィールドに「ty」で終わる単語を含む。                |
| `body:*alt*`             | `body` フィールドに「alt」を含む単語を含む。                |
| `body::salty`            | `body` フィールドに「salty」がセットされ、それ以外のものがない。     |
| `body::"salty dog"`      | `body` フィールドに「salty dog」がセットされ、それ以外のものがない。 |
| `body::salty*`           | `body` フィールドが「salty」ではじまる。                 |
| `body::*dog`             | `body` フィールドが「dog」で終わる。                    |
| `body:*`                 | `body` フィールドになんらかの値を含む。                    |
| `-body:*`                | `body` フィールドが空である。                         |

## 特定エレメントの属性を検索する

アセット、カテゴリ、エントリ、ユーザー、および、タグは、それぞれ独自の属性を追加して検索することができます。

* **アセット**

  * filename
  * extension
  * kind

* **カテゴリ**

  * title
  * slug

* **エントリ**

  * title
  * slug

* **ユーザー**

  * ユーザー名
  * firstName
  * lastName
  * fullName (firstName + lastName)
  * メール

* **タグ**

  * title


::: warning
Searching is a great way to quickly query content broadly across elements, but if you’re querying field attributes the most precise way is through that field type’s [query parameter](dev/element-queries/#executing-element-queries).
:::

## テンプレート記法

`craft.assets()`, `craft.entries()`, `craft.tags()`, and `craft.users()` support a `search` parameter that you can use to filter their elements by a given search query.

```twig
{# Get the user's search query from the 'q' query-string param #}
{% set searchQuery = craft.app.request.getParam('q') %}

{# Fetch entries that match the search query #}
{% set results = craft.entries()
    .search(searchQuery)
    .all() %}
```

### スコアによる検索結果の順位付け

You can also set the `orderBy` parameter to `'score'` if you want results ordered by best-match to worst-match:

```twig
{% set results = craft.entries()
    .search(searchQuery)
    .orderBy('score')
    .all() %}
```

When you do this, each of the elements returned will have a `searchScore` attribute set, which reveals what their search score was.

::: tip
See our [Search Form](dev/examples/search-form.md) tutorial for a complete example of listing dynamic search results.
:::

## 検索インデックスの再構築

Craft does its best to keep its search indexes as up-to-date as possible, but there are a couple things that might render portions of them inaccurate. If you suspect that your search indexes don’t have the latest and greatest data, you can have Craft rebuild them by bulk-resaving your entries with the `resave/entries` command:

```bash
./craft resave/entries --update-search-index
```

You can specify which entries should be resaved with the `--section` and `--type` options, among others. Run `resave/entries --help` to see a full list of supported options.
