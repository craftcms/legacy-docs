# コントロールパネルのセクション

Modules and plugins can add new sections to the control panel using the [EVENT_REGISTER_CP_NAV_ITEMS](api:craft\web\twig\variables\Cp::EVENT_REGISTER_CP_NAV_ITEMS) event:

```php
use craft\events\RegisterCpNavItemsEvent;
use craft\web\twig\variables\Cp;
use yii\base\Event;

public function init()
{
    parent::init();

    Event::on(
        Cp::class,
        Cp::EVENT_REGISTER_CP_NAV_ITEMS,
        function(RegisterCpNavItemsEvent $event) {
            $event->navItems[] = [
                'url' => 'section-url',
                'label' => 'Section Label',
                'icon' => '@ns/prefix/path/to/icon.svg',
            ];
        }
    );

    // ...
}
```

[navItems](api:craft\events\RegisterCpNavItemsEvent::$navItems) 配列内のそれぞれの項目は、次のキーを持つことができます。

- `url` – ナビゲーション項目がリンクする URL。（<api:craft\helpers\UrlHelper::cpUrl()> を実行します。）
- `label` – ユーザーが目にするナビゲーション項目のラベル。
- `icon` – 使用するアイコン SVG のパス。（エイリアスではじめることができます。）
- `badgeCount` _（オプション）_ – ナビゲーション項目に表示されるバッジの数。
- `subnav` _（オプション）_ – セクションにアクセスしたときに表示される、サブナビゲーション項目の配列。（[サブナビゲーション](#subnavs)を参照してください。）


For Craft to properly designate an item as “active,” its `url` must be registered with a relative path to the plugin or module’s control panel section. Any `subnav` paths should begin with `url` in order to appear selected when active.

## サブナビゲーション

If your section has a sub-navigation, each subnav item within your `subnav` array should be represented by a sub-array with `url` and `label` keys:

```php
'subnav' => [
    'foo' => ['label' => 'Foo', 'url' => 'section-url/foo'],
    'bar' => ['label' => 'Bar', 'url' => 'section-url/bar'],
    'baz' => ['label' => 'Baz', 'url' => 'section-url/baz'],
],
```

Your templates can specify which subnav item should be selected by setting a `selectedSubnavItem` variable to the key of the nav item:

```twig
{% set selectedSubnavItem = 'bar' %}
```

## プラグインセクション

Plugins that only need to add one section can set the `$hasCpSection` property on their primary plugin class, rather than using the [EVENT_REGISTER_CP_NAV_ITEMS](api:craft\web\twig\variables\Cp::EVENT_REGISTER_CP_NAV_ITEMS) event:

```php
<?php

namespace ns\prefix;

class Plugin extends \craft\base\Plugin
{
    public $hasCpSection = true;

    // ...
}
```

::: tip
You can alternatively set a `hasCpSection` value in `composer.json` as noted in the [plugin guide](/extend/plugin-guide.md#compser-json). We don’t recommend setting it in both places, however, since the value set in `composer.json` will override your public class property’s value and likely create confusion.
:::

You can modify aspects of the plugin’s control panel nav item by overriding its [getCpNavItem()](api:craft\base\PluginInterface::getCpNavItem()) method:

```php
public function getCpNavItem()
{
    $item = parent::getCpNavItem();
    $item['badgeCount'] = 5;
    $item['subnav'] = [
        'foo' => ['label' => 'Foo', 'url' => 'plugin-handle/foo'],
        'bar' => ['label' => 'Bar', 'url' => 'plugin-handle/bar'],
        'baz' => ['label' => 'Baz', 'url' => 'plugin-handle/baz'],
    ];
    return $item;
}
```

If you do this, Craft will automatically add a new [user permission](user-permissions.md) for your plugin, and only show the nav item for users that have it.

Clicking on a plugin’s section will take the user to `/admin/plugin-handle`, which will attempt to load an `index.html` or `index.twig` template within the plugin’s [template root](template-roots.md) (its `templates/` folder within its base source folder).

::: tip
See [Control Panel Templates](cp-templates.md) for more information about developing Control Panel templates.
:::

Alternatively, you can route `/admin/plugin-handle` requests to a controller action (or a different template) by registering a control panel route from your plugin’s `init()` method:

```php
use craft\events\RegisterUrlRulesEvent;
use craft\web\UrlManager;
use yii\base\Event;

public function init()
{
    Event::on(
        UrlManager::class,
        UrlManager::EVENT_REGISTER_CP_URL_RULES,
        function(RegisterUrlRulesEvent $event) {
            $event->rules['plugin-handle'] = 'plugin-handle/foo/bar';
        }
    );
}
```
