# Field Types

Plugins can provide custom field types by creating a class that implements <api:craft\base\FieldInterface> and <api:craft\base\FieldTrait>. The class will serve both as a way to communicate various things about your field type (with static methods), and as a model that fields of its type will be instantiated with.

As a convenience, you can extend <api:craft\base\Field>, which provides a base field type implementation.

You can refer to Craft’s own field classes for examples. They are located in `vendor/craftcms/cms/src/fields/`.

## Registering Custom Field Types

Once you have created your field class, you will need to register it with the Fields service, so Craft will know about it when populating the list of available field types:

```php
<?php
namespace ns\prefix;

use craft\events\RegisterComponentTypesEvent;
use craft\services\Fields;
use yii\base\Event;

class Plugin extends \craft\base\Plugin
{
    public function init()
    {
        Event::on(Fields::class, Fields::EVENT_REGISTER_FIELD_TYPES, function(RegisterComponentTypesEvent $event) {
            $event->types[] = MyField::class;
        });

        // ...
    }

    // ...
}
```

## Delta Saving Field Content

Craft can track field content edits as they happen, saving only what changed. This improves performance since only the delta will be posted and saved rather than all field content.

If your field type uses or extends one of the field templates that ships with Craft, you won’t need to make any changes to take advantage of this feature.

If your field type provides its own template, you’ll need to add two lines to enable delta saving. The template needs to...

1. ensure delta saving is active with `{% do view.setIsDeltaRegistrationActive(true) %}`.
2. provide a handle for tracking field edits with `{% do view.registerDeltaName(field.handle) %}`.

These can be called anywhere in the template, and the field handle should match your frontend input(s).

To verify that your field is utilizing delta saving, inspect the `$_POST` data when saving an Element. Your field should only appear in the `fields` array if changes were made.

If you do not implement delta saving for your field, its entire contents will be saved along with its parent Element.
