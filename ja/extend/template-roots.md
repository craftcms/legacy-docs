# テンプレートルート

Modules and plugins can register custom “template roots” for either control panel or front-end templates.

テンプレートルートは、定義済みのテンプレートパス接頭辞から他のテンプレートにアクセスできる、テンプレートを含むディレクトリです。

例えば、`_utils/macros.twig` からアクセスできる共通の Twig ユーティリティマクロを提供するプラグインを作成できます。

そのために、[EVENT_REGISTER_SITE_TEMPLATE_ROOTS](api:craft\web\View::EVENT_REGISTER_SITE_TEMPLATE_ROOTS) イベントを使用します。

```php
use craft\events\RegisterTemplateRootsEvent;
use craft\web\View;
use yii\base\Event;

public function init()
{
    parent::init();

    Event::on(
        View::class,
        View::EVENT_REGISTER_SITE_TEMPLATE_ROOTS,
        function(RegisterTemplateRootsEvent $event) {
            $event->roots['_utils'] = __DIR__ . '/template-utils';
        }
    );
}
```

If you want to register new control panel template roots, use the [EVENT_REGISTER_CP_TEMPLATE_ROOTS](api:craft\web\View::EVENT_REGISTER_CP_TEMPLATE_ROOTS) event instead.

## プラグインコントロールパネルのテンプレート

Plugins get a control panel template root added automatically, named after the plugin handle, which points to the `templates/` folder within the plugin’s base source folder.
