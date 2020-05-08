# セクションとエントリ

## エントリ

エントリはウェブページに表示させたいコンテンツを保持します。すべてのエントリは投稿者、投稿日、（もし望むなら）有効期限日、（有効・無効の）ステータスと、もちろん、コンテンツを持っています。

エントリの現在の公開バージョンと並行して、エントリのドラフトを作成することもできます。

一般的に、それぞれのエントリはサイトの独自のプライマリー URL に関わり合いを持ちますが、Craft ではテンプレートが必要とするならば、どこからでもエントリを取得できます。

## セクション

エントリを作成する前に、それらを含めるためのセクションを作成しなければなりません。それぞれのセクションには、次のことを定義できます。

* セクション内のエントリが URL を持つかどうか
* エントリの URL をどのように表示するか
* エントリの URL がリクエストされたとき、どのテンプレートを読み込むか
* セクション内でどのような入力タイプが利用可能か、それらの入力タイプはどのようなフィールドを持つ必要があるか

Craft のマルチサイト機能を利用しているなら、次のこともセクションで定義できます。

* Which sites' entries in the section should target
* 新しいエントリ向けに、どのサイトをデフォルトで有効にするか

新しいセクションを作るには、「設定 > セクション」に移動し、「新規セクション」ボタンをクリックします。

### セクションタイプ

すべてのセクションが同じように作成されるわけではありません。Craft には3つの異なるタイプのセクションがあります。

#### シングル

シングルは、次のようなユニークなコンテンツを持つ1回限りのページで利用します。

* ホームページ
* 会社概要ページ
* お問い合わせページ

他のセクションタイプと異なり、シングルは1つのエントリしか関連付けられておらず、編集可能な投稿者、スラグ、投稿日、または有効期限日がありません。

#### チャンネル

チャンネルは、次のような類似するコンテンツのストリームに利用します。

* ブログ
* ニュースのセクション
* レシピ

#### ストラクチャー

ストラクチャーは、複数の類似するエントリを蓄積し、かつ、特定の順序で並び替える必要がある場合に適しています。それらは階層構造を持つこともできます。例として次のものを含みます。

* ドキュメント
* サービスの順序が重要なサービスのセクション
* 会社の組織図

### エントリー URI 形式

チャンネルとストラクチャーセクションでは、「エントリー URI 形式」設定を入力することでシステム内のエントリに URL を割り当てるかどうかを選択できます。

エントリー URI 形式は、セクション内のエントリが保存されるごとにレンダリングされる小さな Twig テンプレートです。 レンダリング結果は、システムのエントリ URI として保存されます。

保存されているエントリは、`object` と名付けられた変数としてテンプレートで利用できます。さらに、各エントリのプロパティやカスタムフィールドの値は、それぞれの変数として利用できます。そのため、次のようなことが可能です。

```twig
{{ author.username }}/{{ slug }}
```

ショートカット構文は、エントリのプロパティを参照する出力タグでも利用できます。

```twig
{author.username}/{slug}
```

ストラクチャーセクションでは、子エントリのためのネストされたパスが必要かもしれません。

```twig
{parent.uri}/{slug}
```

上記のエントリー URI 形式では、トップレベルエントリの URI は `templating` で終わるかもしれないのに対して、ネストされているエントリの URI は `templating/tags` で終わるかもしれません。

ストラクチャーセクションでは、ネストされたパスの前にセグメントを含めることもできます。

```twig
{parent.uri ?? 'docs'}/{slug}
```

上記のテンプレートは次の構文で表すこともできます。

```twig
{% if level == 1 %}docs{% else %}{parent.uri}{% endif %}/{slug}
```

上記のエントリー URI 形式では、トップレベルエントリの URI は `docs/templating` で終わるかもしれないのに対して、ネストされているエントリの URI は `docs/templating/tags` で終わるかもしれません。

### 動的なエントリタイトル

If you’re using Craft Pro, your section can have one or more **preview targets**, which are URLs of pages that your entries will show up on, making it possible for authors to preview entries as they are writing them in the control panel.

Like entry URI formats, these preview target URLs are mini Twig templates that can contain entry properties and other dynamic values.

If entries in your section have their own URLs, then you can create a preview target for the entry’s primary URL using the URL template, `{url}`.

Create additional preview targets for any other areas the entry might show up, such as `news`, or `archive/{postDate|date('Y')}`. If the entries show up on the homepage, you can create a preview target with a blank URL.

![A section’s Preview Targets setting.](./images/preview-targets.png)

::: tip
If you want to include the entry’s ID or UID in a preview target URL, use `{sourceId}` or `{sourceUid}` rather than `{id}` or `{uid}`, so the source entry’s ID or UID is used rather than the draft’s.
:::

::: tip
You can also set the URI to a environment variable (e.g. `$NEWS_INDEX`, or a URL that begins with an alias (e.g. `@rootUrl/news` or `@rootUrl/news/{slug}`). See [Environmental Configuration](config/environments.md) to learn more about how those work.
:::

When an author is editing an entry from a section with custom preview targets, the “Share” button will be replaced with a menu that lists the “Primary entry page” (if the section has an Entry URI Format), plus the names of each preview target.

!\[An entry’s Share menu with 3 custom preview targets.\](./images/share-with-targets.png =294x)

The targets will also be available within Live Preview.

#### Preparing external front ends for Live Preview

If your site’s front end lives outside of Craft, for example as a Vue or React app, you will need to have it check for the existence of a `token` query string parameter (or whatever your <config:tokenParam> config setting is set to). If it’s in the URL, then you will need to pass that same token in the Craft API request that loads the page content. This token will cause the API request to respond with the correct content depending on what’s actually being edited (the source entry or a draft).

You can pass the token via either a `token` query string parameter, or an `X-Craft-Token` header on the API request.

## 入力タイプ

Both Channel and Structure sections let you define multiple types of entries using Entry Types.

You can manage your sections’ Entry Types by clicking the “Edit Entry Types” link beside the section’s name in Settings → Sections. That’ll take you to the section’s entry type index. Clicking on an entry type’s name takes you to its settings page:

![Entry Type Edit Settings](./images/sections-and-entries-entry-types.png)

Entry types have the following settings:

* **名前** – 入力タイプの名前
* **ハンドル** – 入力タイプのテンプレートに対応するハンドル
* **タイトルのフィールドの見る** – この入力タイプのエントリでタイトルフィールドを表示するかどうか
* **タイトルフィールドラベル** – 「タイトル」フィールドのラベルをどうするか

### Dynamic Entry Titles

If you want your entries to have auto-generated titles rather than requiring authors to enter them, you can uncheck the “Show the Title field?” checkbox. When you do, a new “Title Format” setting will appear, where you can define what the auto-generated titles should look like.

The Title Format is a full-blown Twig template, and it will get parsed whenever your entries are saved.

The entry is passed to this template as a variable named `object`. You can reference the entry’s [properties](api:craft\elements\Entry#public-properties) in two ways:

* `{{ object.property }}` _（標準の Twig 構文）_
* `{property}` _（ショートカット構文）_

_Note that the shortcut syntax only has one set of curly braces_.

If Craft finds any of these in your Title Format, it will replace the `{` with `{{object.` and the `}` with `}}`, before passing the template off to Twig for parsing.

You can use Twig filters in both syntaxes:

```twig
{{ object.postDate|date('M j, Y') }}
{postDate|date('M j, Y')}
```

Craft’s [global variables](dev/global-variables.md) are available to these templates as well:

```twig
{{ now|date('Y-m-d') }}
{{ currentUser.username }}
```

Conditionals are also fair game. There’s no shortcut syntax for those, so if you want to use a conditional on one of the entry’s properties, you will need to reference it with the `object` variable:

```twig
{% if object.postDate %}{postDate|date('M j, Y')}{% else %}{{ now|date('M j, Y') }}{% endif %}
```

## エントリの編集

If you have at least one section, there will be an “Entries” tab in the primary CP nav. Clicking on it will take you to the entry index. From there you can navigate to the entry you wish to edit, or create a new one.

You can perform the following actions from the Edit Entry page:

* （選択候補が2つ以上ある場合）入力タイプの選択
* エントリのタイトルの編集
* エントリのスラグの編集
* エントリのカスタムフィールドコンテンツの編集
* エントリーの投稿者の選択（Pro エディションのみ）
* （ストラクチャーセクションに含まれる場合）エントリの親の選択
* エントリの投稿日の選択
* エントリの有効期限の選択（オプション）
* エントリを有効にするかどうかの選択
* エントリの変更を保存
* エントリの新しいドラフトの保存
* ドラフトの公開
* エントリの過去のバージョンの閲覧

If you leave the Post Date blank, Craft will automatically set it the first time an entry is saved as enabled.
