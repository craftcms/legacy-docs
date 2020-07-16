# グローバル

Globals store content that is available globally throughout your templates. They're a convenient way to make non-Entry content easily editable via the control panel.

Craft はグローバル設定内でグローバルを整理します。それぞれのグローバル設定は、存在するすべてのフィールドや新しいフィールドを利用する独自の[フィールドレイアウト](fields.md#field-layouts)を持ちます。

グローバル設定を作るには、「設定 > グローバル」に移動します。

If you have at least one Global Set, Craft will add a new “Globals” item added to the control panel primary navigation. Clicking on this will take you to a page that lists all of your Global Sets in a sidebar, as well as all of the fields associated with the selected Global Set in the main content area.

::: tip
[エントリ](sections-and-entries.md#entries)とは異なり、特定の URL と関連付けられていないグローバル設定では、ライブプレビュー機能がありません。
:::

## テンプレートでのグローバル設定

任意のテンプレートからハンドル経由でグローバル設定にアクセスできます。

`companyInfo` というハンドルのグローバル設定があり、`yearEstablished` というハンドルのフィールドがある場合、次のコードを使用してそのフィールドへどこからでもアクセスすることができます。

```twig
{{ companyInfo.yearEstablished }}
```

カスタムフィールド以外で利用できる追加のグローバル設定のプロパティについては、リファレンスの <api:craft\elements\GlobalSet> を参照してください。

### Manually Loading Global Sets

In some special situations, like within email templates, Global Sets won’t be available by default. Any Global Set may still be loaded manually. The above example could be loaded with `getSetByHandle()`:

::: code
```twig
{% set companyInfo = craft.globals().getSetByHandle('companyInfo') %}
```
```php
$companyInfo = \Craft::$app->getGlobals()->getSetByHandle('companyInfo');
```
:::

More details are available in the [Globals service class documentation](api:craft\services\Globals).

## マルチサイトでのグローバル設定

If you run multiple sites with Craft, Global Sets are available in all sites. However, you can set the values in those sets on a per site basis, even leaving some fields blank, if desired.

To do that, edit the global set’s fields, and make sure that their “Translation Method” settings are set to “Translate for each site”.

To toggle between sites while viewing Global Sets, use the drop-down menu at the top left of the Global Sets page in the control panel.

![Toggling between sites in Globals](./images/globals-multisite-nav.png)
