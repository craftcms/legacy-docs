# `{% requireLogin %}` タグ

このタグは、ユーザーがログインしていることを保証します。そうでない場合、ログインページにリダイレクトし、ログインに成功した後で元のページに戻ります。

```twig
{% requireLogin %}
```

You can place this tag anywhere in your template, including within a conditional. If/when Twig gets to it, the login enforcement will take place.

ログインページの場所は、コンフィグ設定 <config:loginPath> に基づきます。 <config:loginPath>を設定しない場合、デフォルトで `login` になります。カスタムテンプレートで `/login` ルートを処理していない場合、`404` エラーが返されます。コントロールパネルのログインフォームを使用するには、`admin/login` または `[your cpTrigger]/login` をセットしてください。
