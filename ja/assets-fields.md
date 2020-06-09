# アセットフィールド

アセットフィールドでは、[アセット](assets.md)を他のエレメントに関連付けることができます。

## 設定

アセットフィールドの設定は、次の通りです。

- **アップロードを単一のフォルダに限定しますか？** – ファイルのアップロード / 関連付けを単一のフォルダに制限するかどうか。

  有効にすると、次の設定が表示されます。

  - **Upload Location** – The location that files dragged directly onto the field should be saved in.

  If disabled, the following settings will be visible:

  - **Sources** – Which asset volumes (or other asset index sources) the field should be able to relate assets from.
  - **Default Upload Location** – The default location that files dragged directly onto the field should be saved in.

- **許可されるファイルの種類を制限しますか？** 特定の種類のファイルだけをアップロード / 関連付けできるフィールドにするかどうか。
- **Limit** – The maximum number of assets that can be related with the field at once. (Default is no limit.)
- **View Mode** – How the field should appear for authors.
- **Selection Label** – The label that should be used on the field’s selection button.

### マルチサイト設定

マルチサイトがインストールされている場合、次の設定も有効になります。（「高度」のトグルボタンで表示されます）

- **特定のサイトから アセット を関連付けますか?** – 特定のサイトのアセットとの関連付けのみを許可するかどうか。

  有効にすると、サイトを選択するための新しい設定が表示されます。

  無効にすると、関連付けられたアセットは常に現在のサイトから取得されます。

- **サイトごとにリレーションを管理** – それぞれのサイトが関連付けられたアセットの独自のセットを取得するかどうか。

### 動的なサブフォルダパス

「ロケーションをアップロードする」と「既定のアップロードロケーション」設定に定義されるサブフォルダには、オプションで Twig タグ（例：`news/{{ slug }}`）を含めることができます。

ソースエレメント（アセットフィールドを持つエレメント）でサポートされているすべてのプロパティは、ここで使用できます。

::: tip
If you want to include the entry’s ID or UID in a dynamic subfolder path, use `{sourceId}` or `{sourceUid}` rather than `{id}` or `{uid}`, so the source entry’s ID or UID is used rather than the revision / draft’s.
:::

::: tip
If you are creating the Assets field within a [Matrix field](matrix-fields.md), the source element is going to be the Matrix block, _not_ the element that the Matrix field is being created on.

So if your Matrix field is attached to an entry, and you want to output the entry ID in your dynamic subfolder path, use `owner.id` rather than `id`.
:::

## フィールド

Assets fields list all of the currently-related assets, with a button to select new ones.

Clicking the “Add an asset” button will bring up a modal window where you can find and select additional assets, as well as upload new ones.

::: tip
You can also upload assets by dragging files directly onto the assets field or modal window.
:::

### インラインのアセット編集

When you double-click on a related asset, a HUD will appear where you can edit the asset’s title and custom fields, and launch the Image Editor (if it’s an image).

::: tip
You can choose which custom fields should be available for your assets from Settings → Assets → [Volume Name] → Field Layout.
:::

## テンプレート記法

### アセットフィールドによるエレメントの照会

When [querying for elements](dev/element-queries/README.md) that have an Assets field, you can filter the results based on the Assets field data using a query param named after your field’s handle.

Possible values include:

| 値                                                           | 取得するエレメント                                               |
| ----------------------------------------------------------- | ------------------------------------------------------- |
| `':empty:'`                                                 | 関連付けられたアセットを持たない。                                       |
| `':notempty:'`                                              | 少なくとも1つの関連付けられたアセットを持つ。                                 |
| `100`                                                       | that are related to the asset with an ID of 100.        |
| `[100, 200]`                                                | that are related to an asset with an ID of 100 or 200.  |
| `['and', 100, 200]`                                         | that are related to the assets with IDs of 100 and 200. |
| an [Asset](api:craft\elements\Asset) object               | that are related to the asset.                          |
| an [AssetQuery](api:craft\elements\db\AssetQuery) object | that are related to any of the resulting assets.        |

```twig
{# Fetch entries with a related asset #}
{% set entries = craft.entries()
    .<FieldHandle>(':notempty:')
    .all() %}
```

### アセットフィールドデータの操作

If you have an element with an Assets field in your template, you can access its related assets using your Assets field’s handle:

```twig
{% set query = entry.<FieldHandle> %}
```

That will give you an [asset query](dev/element-queries/asset-queries.md), prepped to output all of the related assets for the given field.

To loop through all of the related assets, call [all()](api:craft\db\Query::all()) and then loop over the results:

```twig
{% set relatedAssets = entry.<FieldHandle>.all() %}
{% if relatedAssets|length %}
    <ul>
        {% for rel in relatedAssets %}
            <li><a href="{{ rel.url }}">{{ rel.filename }}</a></li>
        {% endfor %}
    </ul>
{% endif %}
```

::: warning
When using `asset.url` or `asset.getUrl()`, the asset’s source volume must have “Assets in this volume have public URLs” enabled and a “Base URL” setting. Otherwise, the result will always be empty.
:::

If you only want the first related asset, call [one()](api:craft\db\Query::one()) instead, and then make sure it returned something:

```twig
{% set rel = entry.<FieldHandle>.one() %}
{% if rel %}
    <p><a href="{{ rel.url }}">{{ rel.filename }}</a></p>
{% endif %}
```

If you just need to check if there are any related assets (but don’t need to fetch them), you can call [exists()](api:craft\db\Query::exists()):

```twig
{% if entry.<FieldHandle>.exists() %}
    <p>There are related assets!</p>
{% endif %}
```

You can set [parameters](dev/element-queries/asset-queries.md#parameters) on the asset query as well. For example, to ensure that only images are returned, you can set the [kind](dev/element-queries/asset-queries.md#kind) param:

```twig
{% set relatedAssets = clone(entry.<FieldHandle>)
    .kind('image')
    .all() %}
```

::: tip
It’s always a good idea to clone the asset query using the [clone()](./dev/functions.md#clone) function before adjusting its parameters, so the parameters don’t have unexpected consequences later on in your template.
:::

### Saving Assets Fields in Entry Forms

If you have an [entry form](dev/examples/entry-form.md) that needs to contain an Assets field, you will need to submit your field value as a list of asset IDs, in the order you want them to be related.

For example, you could create a list of checkboxes for each of the possible relations:

```twig
{# Include a hidden input first so Craft knows to update the
   existing value, if no checkboxes are checked. #}
{{ hiddenInput('fields[<FieldHandle>]', '') }}

{# Get all of the possible asset options #}
{% set possibleAssets = craft.assets()
  .volume('siteAssets')
  .kind('image')
  .orderBy('filename ASC')
  .withTransforms([
    { width: 100, height: 100 }
  ])
  .all() %}

{# Get the currently related asset IDs #}
{% set relatedAssetIds = entry is defined
  ? entry.<FieldHandle>.ids()
  : [] %}

<ul>
  {% for possibleAsset in possibleAssets %}
    <li>
      <label>
        {{ input('checkbox', 'fields[<FieldHandle>][]', possibleAsset.id, {
          checked: possibleAsset.id in relatedAssetIds
        }) }}
        {{ tag('img', {
          src: possibleAsset.
        }) }}
        {{ possibleAsset.getImg({width: 100, height: 100}) }}
        {{ possibleAsset.filename }}
      </label>
    </li>
    {% endfor %}
</ul>
```

You could then make the checkbox list sortable, so users have control over the order of related assets.

#### Creating New Assets

Assets fields can handle new file uploads as well:

```twig
{{ input('file', 'fields[<FieldHandle>][]', options={
  multiple: true,
}) }}
```

::: tip
Don’t forget to set `enctype="multipart/form-data"` on your `<form>` tag so your browser knows to submit the form as a multipart request.
:::

Alternatively, you can submit Base64-encoded file data, which the Assets field will decode and treat as an uploaded file:

```twig
{{ hiddenInput('fields[<FieldHandle>][]', 'data:image/jpeg;base64,<BASE64DATA>') }}
```

## 関連項目

* [アセットクエリ](dev/element-queries/asset-queries.md)
* <api:craft\elements\Asset>
* [リレーション](relations.md)
