# ヘッドレス化

Craft のテンプレートシステムは、Craft のコンテンツを取得する唯一の方法ではありません。

Craft を通常のウェブサイト（または、それに加える）の代わりにコンテンツ API として動作するという意味でのヘッドレス CMS として使用する場合、いくつかの方法があります。

To see exactly what enabling Headless Mode does, see the [`headlessMode` config setting](../config/config-settings.md#headlessmode).

::: tip
Check out CraftQuest’s [Headless Craft CMS](https://craftquest.io/courses/headless-craft) course to learn more about using Craft as a headless CMS.
:::

## GraphQL

Craft comes with a built-in, self-generating [GraphQL API](../graphql.md).

## JSON API

The first-party [Element API](https://github.com/craftcms/element-api) offers a simple way to create a read-only [JSON API](http://jsonapi.org/) for your content.

## REST API

Watch Nate Iler’s [How to Create a Full REST API](http://dotall.com/sessions/how-to-create-a-full-rest-api-with-craft-3) presentation from Dot All 2017 for an in-depth look at how to create a REST API with Craft.

## カスタムなもの

Modules and plugins can define custom front-end [controllers](https://www.yiiframework.com/doc/guide/2.0/en/structure-controllers) that provide new HTTP endpoints. See [Extending Craft](../extend/README.md) to get started.
