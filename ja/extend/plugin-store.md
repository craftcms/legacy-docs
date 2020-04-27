# プラグインストアでの配布

プラグインをシステム内のプラグインストアと [plugins.craftcms.com](https://plugins.craftcms.com/) で利用可能にしたい場合、このガイドに従ってください。

## ライセンスの選択

プラグインストア内のすべてのプラグインは、2つのライセンスのうちのいずれかでなければなりません。

- **[MIT](https://opensource.org/licenses/MIT)** – プラグインに対して請求を予定していない場合に使用します。あなたにクレジットを返す限り、あなたのコードで他の人がしたいことを行うことを許可します。（[実例](https://github.com/craftcms/element-api/blob/v2/LICENSE.md)）
- **[Craft](https://craftcms.github.io/license/)** – プラグインに対して請求を予定し、支払いなしであなたのコードを使用することを阻止したい場合に使用します。（[実例](https://github.com/craftcms/cms/blob/develop/LICENSE.md)）

プラグインリポジトリのルートに `LICENSE.md` ファイルを作成し、著作権表示からはじめて、ライセンステキストをペーストします。

```
Copyright © <YourName>
```

::: tip
Craft ライセンスにする場合、`composer.json` ファイルの `license` の値を `MIT` から `proprietary` に変更することを忘れないでください。
:::

## プラグインの登録

プラグインを登録するには、はじめに GitHub の公開リポジトリに公開されていることを確認してください。次に [id.craftcms.com](https://id.craftcms.com) で Craft ID アカウントを作成し、GitHub アカウントに接続します。

::: warning
プラグインが GitHub の organization アカウントで公開されている場合、GitHub アカウントの認証時にその組織がチェックされていることを確認してください。
:::

From your Craft ID account, you’ll need to first go to “Account Settings”, make sure “Enable plugin developer features” is checked under your username, and choose “Save”.

Once plugin developer features are enabled, add your plugin by going to Plugins → “Add a plugin”, and choose the “Select” button next to your plugin’s repository. You will then be able to edit its description, screenshots, and other details.

### 価格の選択

If you wish to sell your plugin, choose a price point that makes sense. Here are some suggested price ranges to consider:

| 価格帯       | 使用例                             |
| --------- | ------------------------------- |
| $10-$29   | 軽量な「プラグアンドプレイ」ユーティリティとインテグレーション |
| $49-$99   | 複雑なフィールドタイプとインテグレーション           |
| $149-$249 | 重要な新しいシステム機能を追加するプラグイン          |
| $499-$999 | 主要、または、高度にニッチなアプリケーション          |

You will also be required to pick a Renewal Price, which is the annual fee the Plugin Store will charge customers who wish to continue installing new updates, after the first year. Pick a Renewal Price that is around 20-50% of the initial Price. For example, if you are charging $99 for your plugin, your Renewal Price should be between $19-$49.

Pixel & Tonic takes a 20% processing fee on all plugin sales; be sure to factor that into your plugin pricing.

::: warning
If you initially submit your plugin as free, you will not be allowed to change it to commercial later. You can, however, give it a commercial [edition](plugin-editions.md) that offers extended functionality, as long as you don’t remove crucial functionality from the free edition.
:::

### Declare Craft Version Support

Every plugin needs to explicitly require a minimum Craft CMS version in `composer.json`:

```json
"require": {
    "craftcms/cms": "^3.0.0"
}
```

### Submit for Approval

Once you’re ready to submit the plugin, click the “Submit for approval” button. Once your plugin is approved, it will become visible on [plugins.craftcms.com](https://plugins.craftcms.com/). It won’t necessarily be available in the in-app Plugin Store yet, though, unless your plugin already has at least one [release](#plugin-releases).

::: tip
You might want to register your plugin with [Packagist](https://packagist.org/) in addition to the Plugin Store, so that people can install and update your plugin from the command line. But Packagist isn’t a requirement for the Plugin Store.
:::

## プラグインのリリース

To release a new version of your plugin, first decide on the version number. The Plugin Store follows the same [Semantic Versioning](https://semver.org/) conventions supported by Composer:

- バージョンは3つ、または、4つのセグメント（例：`1.2.3` または `1.2.3.4`）が必要です。
- プレリリースバージョンには、リリース識別子（`-alpha.X`、`-beta.X`、または、`-RCX`）が必要です。

Once you’ve decided on a version, follow these steps:

1. プラグインが[更新履歴](changelogs-and-updates.md)を持つ場合、新しいバージョンがリリース日を含めた正しいフォーマットの見出しを持つことを確認してください。

   ```markdown
   ## 3.0.0 - 2018-03-31
   ```

2. プラグインの `composer.json` ファイルに `version` プロパティを含む場合、新しいバージョンがセットされていることを確認してください。

3. すべて問題なく Git にコミットされたら、オプションとして `v` からはじめてバージョン番号にちなんで名付けられた[タグを作成](https://git-scm.com/book/en/v2/Git-Basics-Tagging)してください（例：`v3.0.0` または `v3.0.0-beta.1`）。タグ名の接頭辞に `release-` を付けることも許可されています（例：`release-3.0.0` または `release-v3.0.0`）。

4. 最新のコミットと新しいバージョンタグを GitHub にプッシュしてください。この時点で、プラグインストアはそのリリースについて自動的に通知を受け取り、それを記録しはじめます。すべてうまくいった場合、1〜2分でプラグインストアに表示されます。
