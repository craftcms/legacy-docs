# プラグイン

::: tip
プラグイン _開発_ のためのドキュメントをお探しの場合は、[Craft の拡張](extend/README.md) セクションをチェックしてください。
:::

Plugins extend Craft’s core functionality. They can introduce new Dashboard widgets, field types, control panel sections, Twig templating features, workflow actions, and more.

## プラグインストア

Craft’s control panel features a Plugin Store, where you can browse through hundreds of free and commercial plugins, install them with a single click, and pay for them.

To access the Plugin Store, click on the “Plugin Store” item in Craft’s control panel navigation. From there you can browse through the various plugin categories and curated lists to discover new plugins.

![The Craft Plugin Store](./images/plugin-store.png)

プラグインをクリックすると、長い説明文やスクリーンショットを含むプラグインに関する詳細をモーダルウィンドウで開きます。

![プラグインストア内のプラグインのモーダルウィンドウ](./images/plugin-store-plugin.png)

## 無料プラグインのインストール

無料プラグインは、「インストール」ボタンをクリックしてインストールできます。インストールと併せて Craft のステータスを更新する、プラグインのインストールページが表示されます。

## 商用プラグインの試用

Craft が開発ドメイン上で実行されている場合、「試用」ボタンをクリックして商用プラグインを試用版としてインストールできます。インストールと併せて Craft のステータスを更新する、プラグインのインストールページが表示されます。

## 商用プラグインの購入

商用プラグインを試して購入する準備ができている場合は、 プラグインストアに戻り、ヘッダーにあるカートアイコンをクリックしてください。カートモーダルの「有効なトライアル」セクションに、プラグインの一覧を確認できます。「カートに追加」ボタンをクリックして、カートにプラグインを追加し、チェックアウトを続行します。

チェックアウトのプロセスが完了すると、インストールしたプラグインは自動的にライセンスを取得します。

## プラグインライセンスの管理

You can manage all of your plugin licenses from your [Craft ID](https://id.craftcms.com/) account, under Licenses → Plugins

まだ Craft ID アカウントをお持ちでない場合は、[id.craftcms.com/register](https://id.craftcms.com/register) にアクセスしてアカウントを作成することができます。

Craft ID アカウントと同じメールアドレスで購入されたすべてのプラグインライセンスは、自動的にアカウントへ追加されます。

プラグインライセンスが表示されない場合は、「Licenses → Claim License」に移動します。ライセンスキーを手動で入力するか、購入に利用したメールアドレスを知っている場合は “Claim licenses by email address” セクションにそれを入力することができます。メールアドレスの所有者であることを確認後、 メールアドレスに関連付けられている未使用のライセンスがアカウントに追加されます。

### Safeguarding Plugin License Keys

By default your plugin license key will be stored in the database and `project.yaml`. You may, however, move that license key to a custom PHP constant and set the key using the `$VARIABLE_NAME` syntax.

If you were to create a `MY_PLUGIN_KEY` environment variable, for example, you could then use `$MY_PLUGIN_KEY` in place of the key itself anywhere the plugin license key is required.

## プラグインライセンスの譲渡

To transfer a plugin license to someone else’s Craft ID account, log into your Craft ID account, and click on the license under Licenses → Plugins, and then click the “Release License” button to release it from your account. Then the other person will be able to claim the license for themselves from the Licenses → Claim License page of their Craft ID account.

## 商用プラグインのライセンス

Commercial plugins in the Plugin Store must follow Craft’s licensing model:

- 開発環境で自由に試すことができますが、本番環境での利用には支払いを必要とします。
- 商用ライセンスは Craft へのインストールごとに1回限り支払う料金で、購入後1年間はアップデートにアクセスできます。
- 追加のアップデートは、年ごとのアップデート料金で入手することができます。
- 質問不要で、ライセンスは購入から30日以内に全額返金することができます。

Additionally, all plugins in the Plugin Store must use either the [MIT License](https://opensource.org/licenses/MIT) or the [Craft License](https://craftcms.github.io/license/). (Generally, free plugins will use the MIT License, and commercial plugins will use the Craft license.)

Together, these rules make plugin licensing safe and predictable for customers, while also helping provide a sustainable business model for plugin vendors.

## 商用プラグインのサポート

We don’t impose any specific support requirements on plugin vendors. You will need to check with them to learn about their support policies, so you know what to expect.

If you feel that a plugin vendor isn’t providing a reasonable level of support for a commercial plugin license, please send and email to <support@craftcms.com> about it.
