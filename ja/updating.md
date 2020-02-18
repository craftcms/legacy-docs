# アップデートガイド

## コントロールパネルからのアップデート

アップデートが可能になると、Craft のアップデート権限を持つユーザーは CP のサイドバーにあるナビゲーション項目「ユーティリティ」の横にバッジを確認できるようになります。「ユーティリティ」をクリックし、その後「アップデート」を選択します。デフォルトでインストールされているコントロールパネルのダッシュボードにあるアップデートウィジェットを利用することもできます。

このセクションには、Craft CMS のアップデートとプラグインのアップデートの両方を表示します。それぞれのアップデートは、それ自身の「アップデート」ボタンを持っています。クリックすると、 Craft の自動更新プロセスが開始されます。

アップデートページの左上にある「すべてを更新」ボタンを使用して、（アップデート可能な Craft とプラグイン）すべてのアップデートを実行できます。

::: tip
Craft’s [changelog](https://github.com/craftcms/cms/blob/master/CHANGELOG-v3.md) will warn you of any critical changes at the top of the release notes. While there aren’t usually any warnings, it’s always a good idea to check before updating.
:::

## ターミナルからのアップデート

Craft 3.0.38 and 3.1.4 introduced a new `update` console command that can be used to update Craft and plugins.

To see available updates, go to your Craft project in your terminal and run this command:

```bash
./craft update
```

![An example interaction with the <code>update</code> command.](./images/cli-update-info.png)

To update everything all at once, run this command:

```bash
./craft update all
```

To update a specific thing, replace `all` with its handle (either `craft` to update Craft, or a plugin’s handle).

```bash
./craft update element-api
```

![An example interaction with the <code>update <handle></code> command.](./images/cli-update-plugin.png)

You can also pass multiple handles in at once:

```bash
./craft update element-api commerce
```

By default, Craft will update you to the latest available version. To update to a specific version, append `:<version>` to the handle:

```bash
./craft update element-api:2.5.4
```

Craft also provides an `update/composer-install` command, which behaves like the `composer install` command, but doesn’t require you to have Composer installed.
