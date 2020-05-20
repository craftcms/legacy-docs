# 画像の変形

すべての人に実サイズの画像アップロードを要求するのではなく、Craft が代わりにどう処理するかのルールをセットした「画像の変形」を定義することができます。トランスフォームは _非破壊的_ で、アップロードされた元画像には影響しません。

## コントロールパネルからトランスフォームの定義

You can define transforms from the control panel by going to Settings → Assets → Image Transforms and clicking the “New Transform” button.

トランスフォームには、次の設定があります。

* **名前** – ユーザーに対する画像変形の名前
* **ハンドル** – テンプレートに対する画像変形のハンドル
* **モード** – 変換モード
* **幅** – 変換結果の幅
* **高さ** – 変換結果の高さ
* **品質** - 変換結果の画像品質（0 から 100）
* **画像フォーマット** – 変換結果の画像フォーマット

**モード** には、次の値をセットできます。

* **切り抜き** – 指定された幅と高さに画像を切り抜き、必要であれば画像を拡大します。（これがデフォルトのモードです。）
* **フィット**  – すべての寸法が指定された幅と高さに収まる範囲で、可能な限り大きいサイズになるよう画像を拡大・縮小します。
* **ストレッチ** – 指定された幅と高さに画像を伸張します。

**モード**で「切り抜き」がセットされた場合、[焦点](assets.md#focal-points)が設定されていない画像に対して Craft がどのエリアを切り抜きの中心にすべきかを決定する「デフォルトの焦点」プルダウンが表示されます。オプションには、次のものが含まれます。

* 上左
* 上中
* 上右
* 中央 - 左
* 中央 - 中央
* 中央 - 右
* 下部左
* 下部中央
* 下部右

**幅** または **高さ** のいずれかを空白のままにすると、その寸法は画像の縦横比を維持するようセットされます。例えば、600 x 400 ピクセルの画像があり、変形の幅を 60 に設定し、高さを空白のままにした場合、変形した画像の高さは 40 になります。

If you leave **Quality** blank, Craft will use the quality set by your <config:defaultImageQuality> にセットされた品質を使用します。

**画像フォーマット** には、次の値をセットできます。

* jpg
* png
* gif

**画像フォーマット** を空欄のままにすると、Craft は web-safe（.jpg、 .png、または .gif） なら元画像のフォーマットを使い、そうでなければ、そのジョブに最適な画像フォーマットを見つけようと試みます。（おそらく、ImageMagik がインストールされていないために）それを決定できない場合は、.jpg として処理されます。

### CP で定義された画像の変形を適用する

トランスフォームを適用した画像を出力するには、トランスフォームのハンドルをアセットの [getUrl()](api:craft\elements\Asset::getUrl())、[getWidth()](api:craft\elements\Asset::getWidth())、および、[getHeight()](api:craft\elements\Asset::getHeight()) ファンクションに渡します。

```twig
<img src="{{ asset.getUrl('thumb') }}" width="{{ asset.getWidth('thumb') }}" height="{{ asset.getHeight('thumb') }}">
```

## テンプレート内でトランスフォームを定義する

テンプレート内で直接トランスフォームを定義することもできます。

First, you must create a [hash](dev/twig-primer.md#hashes) that defines the transform’s parameters:

```twig
{% set thumb = {
    mode: 'crop',
    width: 100,
    height: 100,
    quality: 75,
    position: 'top-center'
} %}
```

Then you can pass that hash into your asset’s `getUrl()`, `getWidth()`, and `getHeight()` functions:

```twig
<img src="{{ asset.getUrl(thumb) }}" width="{{ asset.getWidth(thumb) }}" height="{{ asset.getHeight(thumb) }}">
```

Note how in that example there are no quotes around “`thumb`”, like there were in the first one. That’s because in the first one, we were passing a [string](dev/twig-primer.md#strings) set to a CP-defined transform’s handle, whereas in this example we’re passing a [variable](dev/twig-primer.md#variables) referencing the `thumb` hash we created within the template.

### 利用可能な値

CP で定義されたトランスフォームで利用可能なすべて設定は、同様にテンプレートで定義されたトランスフォームでも利用できます。

* `mode` プロパティには、`'crop'`、`'fit'`、または `'stretch'` をセットすることができます。
* `mode` に `'crop'` をセットした場合、`position` プロパティに `'top-left'`、`'top-center'`、 `'top-right'`、`'center-left'`、`'center-center'`、`'center-right'`、`'bottom-left'`、`'bottom-center'`、または `'bottom-right'` のいずれかをセットして渡すことができます。
* `width` と `height` は、整数をセットするか、省略できます。
* `quality` は、0 から 100 の間の数値をセットするか、省略できます。
* `format` には、`'jpg'`、`'gif'`、`'png'` をセットするか、省略できます。
