# GraphQL API

Craft Pro 版では [GraphQL](https://graphql.org) のAPIを使ってコンテンツを扱うことができます。GraphQL APIにより、シングルページアプリケーション (SPA) や Static Site Generator のような別のアプリケーションでコンテンツを利用することができます。

[[toc]]

## An example query and response

### Query payload

```graphql
{
  entries (section: "news", limit: 2, orderBy: "dateCreated DESC") {
    dateCreated @formatDateTime (format: "Y-m-d")
    title
    children {
      title
    }
    ... on news_article_Entry {
      shortDescription
      featuredImage {
        url @transform (width: 300, immediately: true)
      }
    }
  }
}
```

### The response

```json
{
  "data": {
    "entries": [
      {
        "dateCreated": "2019-08-21",
        "title": "An important news item",
        "children": [],
        "shortDescription": "<p>This is how we roll these days.</p>",
        "featuredImage": [
          {
            "url": "/assets/site/_300xAUTO_crop_center-center_none/glasses.jpg"
          }
        ]
      },
      {
        "dateCreated": "2019-07-02",
        "title": "Dolorem ea eveniet alias",
        "children": [
          {
            "title": "Child entry"
          },
          {
            "title": "This is also a child entry"
          }
        ],
        "shortDescription": "Et omnis explicabo iusto eum nobis. Consequatur debitis architecto est exercitationem vitae velit repellendus. Aut consequatur maiores error ducimus ea et. Rem ipsa asperiores eius quas et omnis. Veniam quasi qui repellendus dignissimos et necessitatibus. Aut a illo tempora.",
        "featuredImage": []
      }
    ]
  }
}
```

## Getting Started

Before you begin, make sure that you are running Craft 3.3 or later, and you’ve got the Pro edition installed.

### Create Your API Endpoint

The first step to adding a GraphQL API to your project is to set up a public endpoint for it.

To do that, create a [URL rule](routing.md#advanced-routing-with-url-rules) from `config/routes.php` that points to the `graphql/api` controller action. For example, the following URL rule would cause `/api` requests to route to the GraphQL API:

```php
return [
    'api' => 'graphql/api',
    // ...
];
```

You can verify that your endpoint is configured correctly, try sending a `{ping}` query to it.

```bash
curl -H "Content-Type: application/graphql" -d '{ping}' http://my-project.test/api
```

(Replace `http://my-project.test/api` with the actual URL to your endpoint.)

If that comes back with the following JSON response, then your GraphQL API is up and running!

```json
{"data":{"ping":"pong"}}
```

### Define Your Schemas

Once you’ve created a GraphQL API endpoint, you need to tell Craft which content should be available from it. (No content is available by default.) You do that by defining a **Schema**.

Craft has two types of schemas:

- The **Public Schema** defines which content should be available publicly.
- You can also define multiple private schemas, which each have their own secret **Access Token**.

You can manage your schemas from the control panel, at GraphQL → Schemas. In addition to defining the scope of each schema, you can also give them expiration dates, or disable them.

::: tip
When performing a GraphQL API request, the schema will be determined automatically based on the token that is supplied (if any). See [below](#querying-a-private-schema) to learn how to do that.
:::

## Sending API Requests

### Using the GraphiQL IDE

The easiest way to start exploring your GraphQL API is with the built-in [GraphiQL](https://github.com/graphql/graphiql) IDE, which is available in the control panel from GraphQL → Explore.

![The built-in GraphiQL IDE](./images/graphiql.png)

### Using Another IDE

Additional GraphQL IDEs are available as well:

* [Insomnia](https://insomnia.rest/)
* [GraphQL Playground](https://github.com/prisma/graphql-playground)
* [GraphQL Playground online](https://www.graphqlbin.com/v2/new)

::: tip
When you are initially exploring the API, make sure that [Dev Mode](config:devMode) is enabled so the IDE can be informed about the entire schema available to it.
:::

### Sending Requests Manually

The GraphQL API can be queried in three ways:

- Using a `GET` request, with the GraphQL query defined by a `query` parameter:
  ```bash
  curl \
    --data-urlencode "query={ping}" \
    http://craft32.test/api
  # or
  curl http://craft32.test/api?query=%7Bping%7D
  ```
- Using a `POST` request with an `application/json` content type, with the GraphQL query defined by a `query` key:
  ```bash
  curl \
    -H "Content-Type: application/json" \
    -d '{"query":"{ping}"}' \
    http://my-project.test/api
  ```
- Using a `POST` request with an `application/graphql` content type, with the GraphQL query defined by the raw request body:
  ```bash
  curl \
    -H "Content-Type: application/graphql" \
    -d '{ping}' \
    http://my-project.test/api
  ```

#### Specifying Variables

If you need to specify any [variables](https://graphql.org/learn/queries/#variables) along with your query, then you must send request as a `POST` request with an `application/json` content type, and include a `variables` key in the JSON body alongside `query`.

```bash
curl \
  -H "Content-Type: application/json" \
  -d '{
        "query": "query($id:[Int]) { entries(id: $id) { id, title } }",
        "variables": { "id": [1, 2, 3] }
      }' \
  http://my-project.test/api
```

#### Querying a Private Schema

The Public Schema will be used by default. To query against a different [schema](#define-your-schemas), pass its Access Token using an `Authorization` header.

```bash
curl \
  -H "Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  -H "Content-Type: application/graphql" \
  -d '{entries{id}}' \
  http://my-project.test/api
```

## Caching

All query results are cached, so that repeated queries can yield results faster. The GraphQL result cache does not have a sophisticated ruleset on invalidating the cache - if the site's content or structure changes, the entire cache is invalidated.

Craft has GraphQL result caching enabled by default, but it can be disabled with the [enableGraphQlCaching](https://docs.craftcms.com/api/v3/craft-config-generalconfig.html#enablegraphqlcaching) config setting.

## Interface Implementation

A defined type exists for each specific interface implementation. For example, if a “News” section has “Article” and “Editorial” entry types, in addition to the `EntryInterface` interface type, two additional types would be defined the GraphQL schema, if the token used allows it: `news_article_Entry` and `news_editorial_Entry` types.

## Query Reference

::: tip
The actual API features will depend on what your schema allows.
:::

<!-- BEGIN QUERIES -->

### The `assets` query
This query is used to query for assets.
| Argument            | Type              | Description                                                                                                                                                |
| ------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                | `[QueryArgument]` | Narrows the query results based on the elements’ IDs.                                                                                                      |
| `uid`               | `[String]`        | Narrows the query results based on the elements’ UIDs.                                                                                                     |
| `status`            | `[String]`        | Narrows the query results based on the elements’ statuses.                                                                                                 |
| `archived`          | `Boolean`         | Narrows the query results to only elements that have been archived.                                                                                        |
| `trashed`           | `Boolean`         | Narrows the query results to only elements that have been soft-deleted.                                                                                    |
| `site`              | `[String]`        | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `siteId`            | `String`          | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `unique`            | `Boolean`         | Determines whether only elements with unique IDs should be returned by the query.                                                                          |
| `enabledForSite`    | `Boolean`         | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.                         |
| `title`             | `[String]`        | Narrows the query results based on the elements’ titles.                                                                                                   |
| `slug`              | `[String]`        | Narrows the query results based on the elements’ slugs.                                                                                                    |
| `uri`               | `[String]`        | Narrows the query results based on the elements’ URIs.                                                                                                     |
| `search`            | `String`          | Narrows the query results to only elements that match a search query.                                                                                      |
| `relatedTo`         | `[Int]`           | Narrows the query results to elements that relate to *any* of the provided element IDs. This argument is ignored, if `relatedToAll` is also used.          |
| `relatedToAll`      | `[Int]`           | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. |
| `ref`               | `[String]`        | Narrows the query results based on a reference string.                                                                                                     |
| `fixedOrder`        | `Boolean`         | Causes the query results to be returned in the order specified by the `id` argument.                                                                       |
| `inReverse`         | `Boolean`         | Causes the query results to be returned in reverse order.                                                                                                  |
| `dateCreated`       | `[String]`        | Narrows the query results based on the elements’ creation dates.                                                                                           |
| `dateUpdated`       | `[String]`        | Narrows the query results based on the elements’ last-updated dates.                                                                                       |
| `offset`            | `Int`             | Sets the offset for paginated results.                                                                                                                     |
| `limit`             | `Int`             | Sets the limit for paginated results.                                                                                                                      |
| `orderBy`           | `String`          | Sets the field the returned elements should be ordered by                                                                                                  |
| `volumeId`          | `[QueryArgument]` | Narrows the query results based on the volumes the assets belong to, per the volumes’ IDs.                                                                 |
| `volume`            | `[String]`        | Narrows the query results based on the volumes the assets belong to, per the volumes’ handles.                                                             |
| `folderId`          | `[QueryArgument]` | Narrows the query results based on the folders the assets belong to, per the folders’ IDs.                                                                 |
| `filename`          | `[String]`        | Narrows the query results based on the assets’ filenames.                                                                                                  |
| `kind`              | `[String]`        | Narrows the query results based on the assets’ file kinds.                                                                                                 |
| `height`            | `[String]`        | Narrows the query results based on the assets’ image heights.                                                                                              |
| `width`             | `[String]`        | Narrows the query results based on the assets’ image widths.                                                                                               |
| `size`              | `[String]`        | Narrows the query results based on the assets’ file sizes (in bytes).                                                                                      |
| `dateModified`      | `String`          | Narrows the query results based on the assets’ files’ last-modified dates.                                                                                 |
| `includeSubfolders` | `Boolean`         | Broadens the query results to include assets from any of the subfolders of the folder specified by `folderId`.                                             |
| `withTransforms`    | `[String]`        | A list of transform handles to preload.                                                                                                                    |

### The `asset` query
This query is used to query for a single asset.
| Argument            | Type              | Description                                                                                                                                                |
| ------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                | `[QueryArgument]` | Narrows the query results based on the elements’ IDs.                                                                                                      |
| `uid`               | `[String]`        | Narrows the query results based on the elements’ UIDs.                                                                                                     |
| `status`            | `[String]`        | Narrows the query results based on the elements’ statuses.                                                                                                 |
| `archived`          | `Boolean`         | Narrows the query results to only elements that have been archived.                                                                                        |
| `trashed`           | `Boolean`         | Narrows the query results to only elements that have been soft-deleted.                                                                                    |
| `site`              | `[String]`        | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `siteId`            | `String`          | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `unique`            | `Boolean`         | Determines whether only elements with unique IDs should be returned by the query.                                                                          |
| `enabledForSite`    | `Boolean`         | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.                         |
| `title`             | `[String]`        | Narrows the query results based on the elements’ titles.                                                                                                   |
| `slug`              | `[String]`        | Narrows the query results based on the elements’ slugs.                                                                                                    |
| `uri`               | `[String]`        | Narrows the query results based on the elements’ URIs.                                                                                                     |
| `search`            | `String`          | Narrows the query results to only elements that match a search query.                                                                                      |
| `relatedTo`         | `[Int]`           | Narrows the query results to elements that relate to *any* of the provided element IDs. This argument is ignored, if `relatedToAll` is also used.          |
| `relatedToAll`      | `[Int]`           | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. |
| `ref`               | `[String]`        | Narrows the query results based on a reference string.                                                                                                     |
| `fixedOrder`        | `Boolean`         | Causes the query results to be returned in the order specified by the `id` argument.                                                                       |
| `inReverse`         | `Boolean`         | Causes the query results to be returned in reverse order.                                                                                                  |
| `dateCreated`       | `[String]`        | Narrows the query results based on the elements’ creation dates.                                                                                           |
| `dateUpdated`       | `[String]`        | Narrows the query results based on the elements’ last-updated dates.                                                                                       |
| `offset`            | `Int`             | Sets the offset for paginated results.                                                                                                                     |
| `limit`             | `Int`             | Sets the limit for paginated results.                                                                                                                      |
| `orderBy`           | `String`          | Sets the field the returned elements should be ordered by                                                                                                  |
| `volumeId`          | `[QueryArgument]` | Narrows the query results based on the volumes the assets belong to, per the volumes’ IDs.                                                                 |
| `volume`            | `[String]`        | Narrows the query results based on the volumes the assets belong to, per the volumes’ handles.                                                             |
| `folderId`          | `[QueryArgument]` | Narrows the query results based on the folders the assets belong to, per the folders’ IDs.                                                                 |
| `filename`          | `[String]`        | Narrows the query results based on the assets’ filenames.                                                                                                  |
| `kind`              | `[String]`        | Narrows the query results based on the assets’ file kinds.                                                                                                 |
| `height`            | `[String]`        | Narrows the query results based on the assets’ image heights.                                                                                              |
| `width`             | `[String]`        | Narrows the query results based on the assets’ image widths.                                                                                               |
| `size`              | `[String]`        | Narrows the query results based on the assets’ file sizes (in bytes).                                                                                      |
| `dateModified`      | `String`          | Narrows the query results based on the assets’ files’ last-modified dates.                                                                                 |
| `includeSubfolders` | `Boolean`         | Broadens the query results to include assets from any of the subfolders of the folder specified by `folderId`.                                             |
| `withTransforms`    | `[String]`        | A list of transform handles to preload.                                                                                                                    |

### The `entries` query
This query is used to query for entries.
| Argument           | Type              | Description                                                                                                                                                |
| ------------------ | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | `[QueryArgument]` | Narrows the query results based on the elements’ IDs.                                                                                                      |
| `uid`              | `[String]`        | Narrows the query results based on the elements’ UIDs.                                                                                                     |
| `status`           | `[String]`        | Narrows the query results based on the elements’ statuses.                                                                                                 |
| `archived`         | `Boolean`         | Narrows the query results to only elements that have been archived.                                                                                        |
| `trashed`          | `Boolean`         | Narrows the query results to only elements that have been soft-deleted.                                                                                    |
| `site`             | `[String]`        | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `siteId`           | `String`          | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `unique`           | `Boolean`         | Determines whether only elements with unique IDs should be returned by the query.                                                                          |
| `enabledForSite`   | `Boolean`         | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.                         |
| `title`            | `[String]`        | Narrows the query results based on the elements’ titles.                                                                                                   |
| `slug`             | `[String]`        | Narrows the query results based on the elements’ slugs.                                                                                                    |
| `uri`              | `[String]`        | Narrows the query results based on the elements’ URIs.                                                                                                     |
| `search`           | `String`          | Narrows the query results to only elements that match a search query.                                                                                      |
| `relatedTo`        | `[Int]`           | Narrows the query results to elements that relate to *any* of the provided element IDs. This argument is ignored, if `relatedToAll` is also used.          |
| `relatedToAll`     | `[Int]`           | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. |
| `ref`              | `[String]`        | Narrows the query results based on a reference string.                                                                                                     |
| `fixedOrder`       | `Boolean`         | Causes the query results to be returned in the order specified by the `id` argument.                                                                       |
| `inReverse`        | `Boolean`         | Causes the query results to be returned in reverse order.                                                                                                  |
| `dateCreated`      | `[String]`        | Narrows the query results based on the elements’ creation dates.                                                                                           |
| `dateUpdated`      | `[String]`        | Narrows the query results based on the elements’ last-updated dates.                                                                                       |
| `offset`           | `Int`             | Sets the offset for paginated results.                                                                                                                     |
| `limit`            | `Int`             | Sets the limit for paginated results.                                                                                                                      |
| `orderBy`          | `String`          | Sets the field the returned elements should be ordered by                                                                                                  |
| `withStructure`    | `Boolean`         | Explicitly determines whether the query should join in the structure data.                                                                                 |
| `structureId`      | `Int`             | Determines which structure data should be joined into the query.                                                                                           |
| `level`            | `Int`             | Narrows the query results based on the elements’ level within the structure.                                                                               |
| `hasDescendants`   | `Boolean`         | Narrows the query results based on whether the elements have any descendants.                                                                              |
| `ancestorOf`       | `Int`             | Narrows the query results to only elements that are ancestors of another element.                                                                          |
| `ancestorDist`     | `Int`             | Narrows the query results to only elements that are up to a certain distance away from the element specified by `ancestorOf`.                              |
| `descendantOf`     | `Int`             | Narrows the query results to only elements that are descendants of another element.                                                                        |
| `descendantDist`   | `Int`             | Narrows the query results to only elements that are up to a certain distance away from the element specified by `descendantOf`.                            |
| `leaves`           | `Boolean`         | Narrows the query results based on whether the elements are “leaves” (element with no descendants).                                                        |
| `nextSiblingOf`    | `Int`             | Narrows the query results to only the entry that comes immediately after another element.                                                                  |
| `prevSiblingOf`    | `Int`             | Narrows the query results to only the entry that comes immediately before another element.                                                                 |
| `positionedAfter`  | `Int`             | Narrows the query results to only entries that are positioned after another element.                                                                       |
| `positionedBefore` | `Int`             | Narrows the query results to only entries that are positioned before another element.                                                                      |
| `editable`         | `Boolean`         | Whether to only return entries that the user has permission to edit.                                                                                       |
| `section`          | `[String]`        | Narrows the query results based on the section handles the entries belong to.                                                                              |
| `sectionId`        | `[QueryArgument]` | Narrows the query results based on the sections the entries belong to, per the sections’ IDs.                                                              |
| `type`             | `[String]`        | Narrows the query results based on the entries’ entry type handles.                                                                                        |
| `typeId`           | `[QueryArgument]` | Narrows the query results based on the entries’ entry types, per the types’ IDs.                                                                           |
| `authorId`         | `[QueryArgument]` | Narrows the query results based on the entries’ authors.                                                                                                   |
| `authorGroup`      | `[String]`        | Narrows the query results based on the user group the entries’ authors belong to.                                                                          |
| `authorGroupId`    | `[QueryArgument]` | Narrows the query results based on the user group the entries’ authors belong to, per the groups’ IDs.                                                     |
| `postDate`         | `[String]`        | Narrows the query results based on the entries’ post dates.                                                                                                |
| `before`           | `String`          | Narrows the query results to only entries that were posted before a certain date.                                                                          |
| `after`            | `String`          | Narrows the query results to only entries that were posted on or after a certain date.                                                                     |
| `expiryDate`       | `[String]`        | Narrows the query results based on the entries’ expiry dates.                                                                                              |

### The `entry` query
This query is used to query for a single entry.
| Argument           | Type              | Description                                                                                                                                                |
| ------------------ | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | `[QueryArgument]` | Narrows the query results based on the elements’ IDs.                                                                                                      |
| `uid`              | `[String]`        | Narrows the query results based on the elements’ UIDs.                                                                                                     |
| `status`           | `[String]`        | Narrows the query results based on the elements’ statuses.                                                                                                 |
| `archived`         | `Boolean`         | Narrows the query results to only elements that have been archived.                                                                                        |
| `trashed`          | `Boolean`         | Narrows the query results to only elements that have been soft-deleted.                                                                                    |
| `site`             | `[String]`        | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `siteId`           | `String`          | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `unique`           | `Boolean`         | Determines whether only elements with unique IDs should be returned by the query.                                                                          |
| `enabledForSite`   | `Boolean`         | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.                         |
| `title`            | `[String]`        | Narrows the query results based on the elements’ titles.                                                                                                   |
| `slug`             | `[String]`        | Narrows the query results based on the elements’ slugs.                                                                                                    |
| `uri`              | `[String]`        | Narrows the query results based on the elements’ URIs.                                                                                                     |
| `search`           | `String`          | Narrows the query results to only elements that match a search query.                                                                                      |
| `relatedTo`        | `[Int]`           | Narrows the query results to elements that relate to *any* of the provided element IDs. This argument is ignored, if `relatedToAll` is also used.          |
| `relatedToAll`     | `[Int]`           | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. |
| `ref`              | `[String]`        | Narrows the query results based on a reference string.                                                                                                     |
| `fixedOrder`       | `Boolean`         | Causes the query results to be returned in the order specified by the `id` argument.                                                                       |
| `inReverse`        | `Boolean`         | Causes the query results to be returned in reverse order.                                                                                                  |
| `dateCreated`      | `[String]`        | Narrows the query results based on the elements’ creation dates.                                                                                           |
| `dateUpdated`      | `[String]`        | Narrows the query results based on the elements’ last-updated dates.                                                                                       |
| `offset`           | `Int`             | Sets the offset for paginated results.                                                                                                                     |
| `limit`            | `Int`             | Sets the limit for paginated results.                                                                                                                      |
| `orderBy`          | `String`          | Sets the field the returned elements should be ordered by                                                                                                  |
| `withStructure`    | `Boolean`         | Explicitly determines whether the query should join in the structure data.                                                                                 |
| `structureId`      | `Int`             | Determines which structure data should be joined into the query.                                                                                           |
| `level`            | `Int`             | Narrows the query results based on the elements’ level within the structure.                                                                               |
| `hasDescendants`   | `Boolean`         | Narrows the query results based on whether the elements have any descendants.                                                                              |
| `ancestorOf`       | `Int`             | Narrows the query results to only elements that are ancestors of another element.                                                                          |
| `ancestorDist`     | `Int`             | Narrows the query results to only elements that are up to a certain distance away from the element specified by `ancestorOf`.                              |
| `descendantOf`     | `Int`             | Narrows the query results to only elements that are descendants of another element.                                                                        |
| `descendantDist`   | `Int`             | Narrows the query results to only elements that are up to a certain distance away from the element specified by `descendantOf`.                            |
| `leaves`           | `Boolean`         | Narrows the query results based on whether the elements are “leaves” (element with no descendants).                                                        |
| `nextSiblingOf`    | `Int`             | Narrows the query results to only the entry that comes immediately after another element.                                                                  |
| `prevSiblingOf`    | `Int`             | Narrows the query results to only the entry that comes immediately before another element.                                                                 |
| `positionedAfter`  | `Int`             | Narrows the query results to only entries that are positioned after another element.                                                                       |
| `positionedBefore` | `Int`             | Narrows the query results to only entries that are positioned before another element.                                                                      |
| `editable`         | `Boolean`         | Whether to only return entries that the user has permission to edit.                                                                                       |
| `section`          | `[String]`        | Narrows the query results based on the section handles the entries belong to.                                                                              |
| `sectionId`        | `[QueryArgument]` | Narrows the query results based on the sections the entries belong to, per the sections’ IDs.                                                              |
| `type`             | `[String]`        | Narrows the query results based on the entries’ entry type handles.                                                                                        |
| `typeId`           | `[QueryArgument]` | Narrows the query results based on the entries’ entry types, per the types’ IDs.                                                                           |
| `authorId`         | `[QueryArgument]` | Narrows the query results based on the entries’ authors.                                                                                                   |
| `authorGroup`      | `[String]`        | Narrows the query results based on the user group the entries’ authors belong to.                                                                          |
| `authorGroupId`    | `[QueryArgument]` | Narrows the query results based on the user group the entries’ authors belong to, per the groups’ IDs.                                                     |
| `postDate`         | `[String]`        | Narrows the query results based on the entries’ post dates.                                                                                                |
| `before`           | `String`          | Narrows the query results to only entries that were posted before a certain date.                                                                          |
| `after`            | `String`          | Narrows the query results to only entries that were posted on or after a certain date.                                                                     |
| `expiryDate`       | `[String]`        | Narrows the query results based on the entries’ expiry dates.                                                                                              |

### The `globalSets` query
This query is used to query for global sets.
| Argument         | Type              | Description                                                                                                                                                |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `[QueryArgument]` | Narrows the query results based on the elements’ IDs.                                                                                                      |
| `uid`            | `[String]`        | Narrows the query results based on the elements’ UIDs.                                                                                                     |
| `status`         | `[String]`        | Narrows the query results based on the elements’ statuses.                                                                                                 |
| `archived`       | `Boolean`         | Narrows the query results to only elements that have been archived.                                                                                        |
| `trashed`        | `Boolean`         | Narrows the query results to only elements that have been soft-deleted.                                                                                    |
| `site`           | `[String]`        | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `siteId`         | `String`          | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `unique`         | `Boolean`         | Determines whether only elements with unique IDs should be returned by the query.                                                                          |
| `enabledForSite` | `Boolean`         | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.                         |
| `title`          | `[String]`        | Narrows the query results based on the elements’ titles.                                                                                                   |
| `slug`           | `[String]`        | Narrows the query results based on the elements’ slugs.                                                                                                    |
| `uri`            | `[String]`        | Narrows the query results based on the elements’ URIs.                                                                                                     |
| `search`         | `String`          | Narrows the query results to only elements that match a search query.                                                                                      |
| `relatedTo`      | `[Int]`           | Narrows the query results to elements that relate to *any* of the provided element IDs. This argument is ignored, if `relatedToAll` is also used.          |
| `relatedToAll`   | `[Int]`           | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. |
| `ref`            | `[String]`        | Narrows the query results based on a reference string.                                                                                                     |
| `fixedOrder`     | `Boolean`         | Causes the query results to be returned in the order specified by the `id` argument.                                                                       |
| `inReverse`      | `Boolean`         | Causes the query results to be returned in reverse order.                                                                                                  |
| `dateCreated`    | `[String]`        | Narrows the query results based on the elements’ creation dates.                                                                                           |
| `dateUpdated`    | `[String]`        | Narrows the query results based on the elements’ last-updated dates.                                                                                       |
| `offset`         | `Int`             | Sets the offset for paginated results.                                                                                                                     |
| `limit`          | `Int`             | Sets the limit for paginated results.                                                                                                                      |
| `orderBy`        | `String`          | Sets the field the returned elements should be ordered by                                                                                                  |
| `handle`         | `[String]`        | Narrows the query results based on the global sets’ handles.                                                                                               |

### The `globalSet` query
This query is used to query for a single global set.
| Argument         | Type              | Description                                                                                                                                                |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `[QueryArgument]` | Narrows the query results based on the elements’ IDs.                                                                                                      |
| `uid`            | `[String]`        | Narrows the query results based on the elements’ UIDs.                                                                                                     |
| `status`         | `[String]`        | Narrows the query results based on the elements’ statuses.                                                                                                 |
| `archived`       | `Boolean`         | Narrows the query results to only elements that have been archived.                                                                                        |
| `trashed`        | `Boolean`         | Narrows the query results to only elements that have been soft-deleted.                                                                                    |
| `site`           | `[String]`        | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `siteId`         | `String`          | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `unique`         | `Boolean`         | Determines whether only elements with unique IDs should be returned by the query.                                                                          |
| `enabledForSite` | `Boolean`         | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.                         |
| `title`          | `[String]`        | Narrows the query results based on the elements’ titles.                                                                                                   |
| `slug`           | `[String]`        | Narrows the query results based on the elements’ slugs.                                                                                                    |
| `uri`            | `[String]`        | Narrows the query results based on the elements’ URIs.                                                                                                     |
| `search`         | `String`          | Narrows the query results to only elements that match a search query.                                                                                      |
| `relatedTo`      | `[Int]`           | Narrows the query results to elements that relate to *any* of the provided element IDs. This argument is ignored, if `relatedToAll` is also used.          |
| `relatedToAll`   | `[Int]`           | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. |
| `ref`            | `[String]`        | Narrows the query results based on a reference string.                                                                                                     |
| `fixedOrder`     | `Boolean`         | Causes the query results to be returned in the order specified by the `id` argument.                                                                       |
| `inReverse`      | `Boolean`         | Causes the query results to be returned in reverse order.                                                                                                  |
| `dateCreated`    | `[String]`        | Narrows the query results based on the elements’ creation dates.                                                                                           |
| `dateUpdated`    | `[String]`        | Narrows the query results based on the elements’ last-updated dates.                                                                                       |
| `offset`         | `Int`             | Sets the offset for paginated results.                                                                                                                     |
| `limit`          | `Int`             | Sets the limit for paginated results.                                                                                                                      |
| `orderBy`        | `String`          | Sets the field the returned elements should be ordered by                                                                                                  |
| `handle`         | `[String]`        | Narrows the query results based on the global sets’ handles.                                                                                               |

### The `users` query
This query is used to query for users.
| Argument         | Type              | Description                                                                                                                                                |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `[QueryArgument]` | Narrows the query results based on the elements’ IDs.                                                                                                      |
| `uid`            | `[String]`        | Narrows the query results based on the elements’ UIDs.                                                                                                     |
| `status`         | `[String]`        | Narrows the query results based on the elements’ statuses.                                                                                                 |
| `archived`       | `Boolean`         | Narrows the query results to only elements that have been archived.                                                                                        |
| `trashed`        | `Boolean`         | Narrows the query results to only elements that have been soft-deleted.                                                                                    |
| `site`           | `[String]`        | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `siteId`         | `String`          | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `unique`         | `Boolean`         | Determines whether only elements with unique IDs should be returned by the query.                                                                          |
| `enabledForSite` | `Boolean`         | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.                         |
| `title`          | `[String]`        | Narrows the query results based on the elements’ titles.                                                                                                   |
| `slug`           | `[String]`        | Narrows the query results based on the elements’ slugs.                                                                                                    |
| `uri`            | `[String]`        | Narrows the query results based on the elements’ URIs.                                                                                                     |
| `search`         | `String`          | Narrows the query results to only elements that match a search query.                                                                                      |
| `relatedTo`      | `[Int]`           | Narrows the query results to elements that relate to *any* of the provided element IDs. This argument is ignored, if `relatedToAll` is also used.          |
| `relatedToAll`   | `[Int]`           | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. |
| `ref`            | `[String]`        | Narrows the query results based on a reference string.                                                                                                     |
| `fixedOrder`     | `Boolean`         | Causes the query results to be returned in the order specified by the `id` argument.                                                                       |
| `inReverse`      | `Boolean`         | Causes the query results to be returned in reverse order.                                                                                                  |
| `dateCreated`    | `[String]`        | Narrows the query results based on the elements’ creation dates.                                                                                           |
| `dateUpdated`    | `[String]`        | Narrows the query results based on the elements’ last-updated dates.                                                                                       |
| `offset`         | `Int`             | Sets the offset for paginated results.                                                                                                                     |
| `limit`          | `Int`             | Sets the limit for paginated results.                                                                                                                      |
| `orderBy`        | `String`          | Sets the field the returned elements should be ordered by                                                                                                  |
| `email`          | `[String]`        | Narrows the query results based on the users’ email addresses.                                                                                             |
| `username`       | `[String]`        | Narrows the query results based on the users’ usernames.                                                                                                   |
| `firstName`      | `[String]`        | Narrows the query results based on the users’ first names.                                                                                                 |
| `lastName`       | `[String]`        | Narrows the query results based on the users’ last names.                                                                                                  |
| `groupId`        | `[QueryArgument]` | Narrows the query results based on the user group the users belong to, per the groups’ IDs.                                                                |
| `group`          | `[QueryArgument]` | Narrows the query results based on the user group the users belong to.                                                                                     |

### The `user` query
This query is used to query for a single user.
| Argument         | Type              | Description                                                                                                                                                |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `[QueryArgument]` | Narrows the query results based on the elements’ IDs.                                                                                                      |
| `uid`            | `[String]`        | Narrows the query results based on the elements’ UIDs.                                                                                                     |
| `status`         | `[String]`        | Narrows the query results based on the elements’ statuses.                                                                                                 |
| `archived`       | `Boolean`         | Narrows the query results to only elements that have been archived.                                                                                        |
| `trashed`        | `Boolean`         | Narrows the query results to only elements that have been soft-deleted.                                                                                    |
| `site`           | `[String]`        | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `siteId`         | `String`          | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `unique`         | `Boolean`         | Determines whether only elements with unique IDs should be returned by the query.                                                                          |
| `enabledForSite` | `Boolean`         | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.                         |
| `title`          | `[String]`        | Narrows the query results based on the elements’ titles.                                                                                                   |
| `slug`           | `[String]`        | Narrows the query results based on the elements’ slugs.                                                                                                    |
| `uri`            | `[String]`        | Narrows the query results based on the elements’ URIs.                                                                                                     |
| `search`         | `String`          | Narrows the query results to only elements that match a search query.                                                                                      |
| `relatedTo`      | `[Int]`           | Narrows the query results to elements that relate to *any* of the provided element IDs. This argument is ignored, if `relatedToAll` is also used.          |
| `relatedToAll`   | `[Int]`           | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. |
| `ref`            | `[String]`        | Narrows the query results based on a reference string.                                                                                                     |
| `fixedOrder`     | `Boolean`         | Causes the query results to be returned in the order specified by the `id` argument.                                                                       |
| `inReverse`      | `Boolean`         | Causes the query results to be returned in reverse order.                                                                                                  |
| `dateCreated`    | `[String]`        | Narrows the query results based on the elements’ creation dates.                                                                                           |
| `dateUpdated`    | `[String]`        | Narrows the query results based on the elements’ last-updated dates.                                                                                       |
| `offset`         | `Int`             | Sets the offset for paginated results.                                                                                                                     |
| `limit`          | `Int`             | Sets the limit for paginated results.                                                                                                                      |
| `orderBy`        | `String`          | Sets the field the returned elements should be ordered by                                                                                                  |
| `email`          | `[String]`        | Narrows the query results based on the users’ email addresses.                                                                                             |
| `username`       | `[String]`        | Narrows the query results based on the users’ usernames.                                                                                                   |
| `firstName`      | `[String]`        | Narrows the query results based on the users’ first names.                                                                                                 |
| `lastName`       | `[String]`        | Narrows the query results based on the users’ last names.                                                                                                  |
| `groupId`        | `[QueryArgument]` | Narrows the query results based on the user group the users belong to, per the groups’ IDs.                                                                |
| `group`          | `[QueryArgument]` | Narrows the query results based on the user group the users belong to.                                                                                     |

### The `tags` query
This query is used to query for tags.
| Argument         | Type              | Description                                                                                                                                                |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `[QueryArgument]` | Narrows the query results based on the elements’ IDs.                                                                                                      |
| `uid`            | `[String]`        | Narrows the query results based on the elements’ UIDs.                                                                                                     |
| `status`         | `[String]`        | Narrows the query results based on the elements’ statuses.                                                                                                 |
| `archived`       | `Boolean`         | Narrows the query results to only elements that have been archived.                                                                                        |
| `trashed`        | `Boolean`         | Narrows the query results to only elements that have been soft-deleted.                                                                                    |
| `site`           | `[String]`        | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `siteId`         | `String`          | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `unique`         | `Boolean`         | Determines whether only elements with unique IDs should be returned by the query.                                                                          |
| `enabledForSite` | `Boolean`         | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.                         |
| `title`          | `[String]`        | Narrows the query results based on the elements’ titles.                                                                                                   |
| `slug`           | `[String]`        | Narrows the query results based on the elements’ slugs.                                                                                                    |
| `uri`            | `[String]`        | Narrows the query results based on the elements’ URIs.                                                                                                     |
| `search`         | `String`          | Narrows the query results to only elements that match a search query.                                                                                      |
| `relatedTo`      | `[Int]`           | Narrows the query results to elements that relate to *any* of the provided element IDs. This argument is ignored, if `relatedToAll` is also used.          |
| `relatedToAll`   | `[Int]`           | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. |
| `ref`            | `[String]`        | Narrows the query results based on a reference string.                                                                                                     |
| `fixedOrder`     | `Boolean`         | Causes the query results to be returned in the order specified by the `id` argument.                                                                       |
| `inReverse`      | `Boolean`         | Causes the query results to be returned in reverse order.                                                                                                  |
| `dateCreated`    | `[String]`        | Narrows the query results based on the elements’ creation dates.                                                                                           |
| `dateUpdated`    | `[String]`        | Narrows the query results based on the elements’ last-updated dates.                                                                                       |
| `offset`         | `Int`             | Sets the offset for paginated results.                                                                                                                     |
| `limit`          | `Int`             | Sets the limit for paginated results.                                                                                                                      |
| `orderBy`        | `String`          | Sets the field the returned elements should be ordered by                                                                                                  |
| `group`          | `[String]`        | Narrows the query results based on the tag groups the tags belong to per the group’s handles.                                                              |
| `groupId`        | `[QueryArgument]` | Narrows the query results based on the tag groups the tags belong to, per the groups’ IDs.                                                                 |

### The `tag` query
This query is used to query for a single tag.
| Argument         | Type              | Description                                                                                                                                                |
| ---------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `[QueryArgument]` | Narrows the query results based on the elements’ IDs.                                                                                                      |
| `uid`            | `[String]`        | Narrows the query results based on the elements’ UIDs.                                                                                                     |
| `status`         | `[String]`        | Narrows the query results based on the elements’ statuses.                                                                                                 |
| `archived`       | `Boolean`         | Narrows the query results to only elements that have been archived.                                                                                        |
| `trashed`        | `Boolean`         | Narrows the query results to only elements that have been soft-deleted.                                                                                    |
| `site`           | `[String]`        | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `siteId`         | `String`          | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `unique`         | `Boolean`         | Determines whether only elements with unique IDs should be returned by the query.                                                                          |
| `enabledForSite` | `Boolean`         | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.                         |
| `title`          | `[String]`        | Narrows the query results based on the elements’ titles.                                                                                                   |
| `slug`           | `[String]`        | Narrows the query results based on the elements’ slugs.                                                                                                    |
| `uri`            | `[String]`        | Narrows the query results based on the elements’ URIs.                                                                                                     |
| `search`         | `String`          | Narrows the query results to only elements that match a search query.                                                                                      |
| `relatedTo`      | `[Int]`           | Narrows the query results to elements that relate to *any* of the provided element IDs. This argument is ignored, if `relatedToAll` is also used.          |
| `relatedToAll`   | `[Int]`           | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. |
| `ref`            | `[String]`        | Narrows the query results based on a reference string.                                                                                                     |
| `fixedOrder`     | `Boolean`         | Causes the query results to be returned in the order specified by the `id` argument.                                                                       |
| `inReverse`      | `Boolean`         | Causes the query results to be returned in reverse order.                                                                                                  |
| `dateCreated`    | `[String]`        | Narrows the query results based on the elements’ creation dates.                                                                                           |
| `dateUpdated`    | `[String]`        | Narrows the query results based on the elements’ last-updated dates.                                                                                       |
| `offset`         | `Int`             | Sets the offset for paginated results.                                                                                                                     |
| `limit`          | `Int`             | Sets the limit for paginated results.                                                                                                                      |
| `orderBy`        | `String`          | Sets the field the returned elements should be ordered by                                                                                                  |
| `group`          | `[String]`        | Narrows the query results based on the tag groups the tags belong to per the group’s handles.                                                              |
| `groupId`        | `[QueryArgument]` | Narrows the query results based on the tag groups the tags belong to, per the groups’ IDs.                                                                 |

### The `categories` query
This query is used to query for categories.
| Argument           | Type              | Description                                                                                                                                                |
| ------------------ | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | `[QueryArgument]` | Narrows the query results based on the elements’ IDs.                                                                                                      |
| `uid`              | `[String]`        | Narrows the query results based on the elements’ UIDs.                                                                                                     |
| `status`           | `[String]`        | Narrows the query results based on the elements’ statuses.                                                                                                 |
| `archived`         | `Boolean`         | Narrows the query results to only elements that have been archived.                                                                                        |
| `trashed`          | `Boolean`         | Narrows the query results to only elements that have been soft-deleted.                                                                                    |
| `site`             | `[String]`        | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `siteId`           | `String`          | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `unique`           | `Boolean`         | Determines whether only elements with unique IDs should be returned by the query.                                                                          |
| `enabledForSite`   | `Boolean`         | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.                         |
| `title`            | `[String]`        | Narrows the query results based on the elements’ titles.                                                                                                   |
| `slug`             | `[String]`        | Narrows the query results based on the elements’ slugs.                                                                                                    |
| `uri`              | `[String]`        | Narrows the query results based on the elements’ URIs.                                                                                                     |
| `search`           | `String`          | Narrows the query results to only elements that match a search query.                                                                                      |
| `relatedTo`        | `[Int]`           | Narrows the query results to elements that relate to *any* of the provided element IDs. This argument is ignored, if `relatedToAll` is also used.          |
| `relatedToAll`     | `[Int]`           | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. |
| `ref`              | `[String]`        | Narrows the query results based on a reference string.                                                                                                     |
| `fixedOrder`       | `Boolean`         | Causes the query results to be returned in the order specified by the `id` argument.                                                                       |
| `inReverse`        | `Boolean`         | Causes the query results to be returned in reverse order.                                                                                                  |
| `dateCreated`      | `[String]`        | Narrows the query results based on the elements’ creation dates.                                                                                           |
| `dateUpdated`      | `[String]`        | Narrows the query results based on the elements’ last-updated dates.                                                                                       |
| `offset`           | `Int`             | Sets the offset for paginated results.                                                                                                                     |
| `limit`            | `Int`             | Sets the limit for paginated results.                                                                                                                      |
| `orderBy`          | `String`          | Sets the field the returned elements should be ordered by                                                                                                  |
| `withStructure`    | `Boolean`         | Explicitly determines whether the query should join in the structure data.                                                                                 |
| `structureId`      | `Int`             | Determines which structure data should be joined into the query.                                                                                           |
| `level`            | `Int`             | Narrows the query results based on the elements’ level within the structure.                                                                               |
| `hasDescendants`   | `Boolean`         | Narrows the query results based on whether the elements have any descendants.                                                                              |
| `ancestorOf`       | `Int`             | Narrows the query results to only elements that are ancestors of another element.                                                                          |
| `ancestorDist`     | `Int`             | Narrows the query results to only elements that are up to a certain distance away from the element specified by `ancestorOf`.                              |
| `descendantOf`     | `Int`             | Narrows the query results to only elements that are descendants of another element.                                                                        |
| `descendantDist`   | `Int`             | Narrows the query results to only elements that are up to a certain distance away from the element specified by `descendantOf`.                            |
| `leaves`           | `Boolean`         | Narrows the query results based on whether the elements are “leaves” (element with no descendants).                                                        |
| `nextSiblingOf`    | `Int`             | Narrows the query results to only the entry that comes immediately after another element.                                                                  |
| `prevSiblingOf`    | `Int`             | Narrows the query results to only the entry that comes immediately before another element.                                                                 |
| `positionedAfter`  | `Int`             | Narrows the query results to only entries that are positioned after another element.                                                                       |
| `positionedBefore` | `Int`             | Narrows the query results to only entries that are positioned before another element.                                                                      |
| `editable`         | `Boolean`         | Whether to only return categories that the user has permission to edit.                                                                                    |
| `group`            | `[String]`        | Narrows the query results based on the category groups the categories belong to per the group’s handles.                                                   |
| `groupId`          | `[QueryArgument]` | Narrows the query results based on the category groups the categories belong to, per the groups’ IDs.                                                      |

### The `category` query
This query is used to query for a single category.
| Argument           | Type              | Description                                                                                                                                                |
| ------------------ | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | `[QueryArgument]` | Narrows the query results based on the elements’ IDs.                                                                                                      |
| `uid`              | `[String]`        | Narrows the query results based on the elements’ UIDs.                                                                                                     |
| `status`           | `[String]`        | Narrows the query results based on the elements’ statuses.                                                                                                 |
| `archived`         | `Boolean`         | Narrows the query results to only elements that have been archived.                                                                                        |
| `trashed`          | `Boolean`         | Narrows the query results to only elements that have been soft-deleted.                                                                                    |
| `site`             | `[String]`        | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `siteId`           | `String`          | Determines which site(s) the elements should be queried in. Defaults to the current (requested) site.                                                      |
| `unique`           | `Boolean`         | Determines whether only elements with unique IDs should be returned by the query.                                                                          |
| `enabledForSite`   | `Boolean`         | Narrows the query results based on whether the elements are enabled in the site they’re being queried in, per the `site` argument.                         |
| `title`            | `[String]`        | Narrows the query results based on the elements’ titles.                                                                                                   |
| `slug`             | `[String]`        | Narrows the query results based on the elements’ slugs.                                                                                                    |
| `uri`              | `[String]`        | Narrows the query results based on the elements’ URIs.                                                                                                     |
| `search`           | `String`          | Narrows the query results to only elements that match a search query.                                                                                      |
| `relatedTo`        | `[Int]`           | Narrows the query results to elements that relate to *any* of the provided element IDs. This argument is ignored, if `relatedToAll` is also used.          |
| `relatedToAll`     | `[Int]`           | Narrows the query results to elements that relate to *all* of the provided element IDs. Using this argument will cause `relatedTo` argument to be ignored. |
| `ref`              | `[String]`        | Narrows the query results based on a reference string.                                                                                                     |
| `fixedOrder`       | `Boolean`         | Causes the query results to be returned in the order specified by the `id` argument.                                                                       |
| `inReverse`        | `Boolean`         | Causes the query results to be returned in reverse order.                                                                                                  |
| `dateCreated`      | `[String]`        | Narrows the query results based on the elements’ creation dates.                                                                                           |
| `dateUpdated`      | `[String]`        | Narrows the query results based on the elements’ last-updated dates.                                                                                       |
| `offset`           | `Int`             | Sets the offset for paginated results.                                                                                                                     |
| `limit`            | `Int`             | Sets the limit for paginated results.                                                                                                                      |
| `orderBy`          | `String`          | Sets the field the returned elements should be ordered by                                                                                                  |
| `withStructure`    | `Boolean`         | Explicitly determines whether the query should join in the structure data.                                                                                 |
| `structureId`      | `Int`             | Determines which structure data should be joined into the query.                                                                                           |
| `level`            | `Int`             | Narrows the query results based on the elements’ level within the structure.                                                                               |
| `hasDescendants`   | `Boolean`         | Narrows the query results based on whether the elements have any descendants.                                                                              |
| `ancestorOf`       | `Int`             | Narrows the query results to only elements that are ancestors of another element.                                                                          |
| `ancestorDist`     | `Int`             | Narrows the query results to only elements that are up to a certain distance away from the element specified by `ancestorOf`.                              |
| `descendantOf`     | `Int`             | Narrows the query results to only elements that are descendants of another element.                                                                        |
| `descendantDist`   | `Int`             | Narrows the query results to only elements that are up to a certain distance away from the element specified by `descendantOf`.                            |
| `leaves`           | `Boolean`         | Narrows the query results based on whether the elements are “leaves” (element with no descendants).                                                        |
| `nextSiblingOf`    | `Int`             | Narrows the query results to only the entry that comes immediately after another element.                                                                  |
| `prevSiblingOf`    | `Int`             | Narrows the query results to only the entry that comes immediately before another element.                                                                 |
| `positionedAfter`  | `Int`             | Narrows the query results to only entries that are positioned after another element.                                                                       |
| `positionedBefore` | `Int`             | Narrows the query results to only entries that are positioned before another element.                                                                      |
| `editable`         | `Boolean`         | Whether to only return categories that the user has permission to edit.                                                                                    |
| `group`            | `[String]`        | Narrows the query results based on the category groups the categories belong to per the group’s handles.                                                   |
| `groupId`          | `[QueryArgument]` | Narrows the query results based on the category groups the categories belong to, per the groups’ IDs.                                                      |

<!-- END QUERIES -->

## List of available directives
Directives are not regulated by permissions and they affect how the returned data is displayed.

<!-- BEGIN DIRECTIVES -->

### The `formatDateTime` directive
This directive allows for formatting any date to the desired format. It can be applied to all fields, but changes anything only when applied to a DateTime field.
| Argument   | Type     | Description                                                                                                                                                       |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `format`   | `String` | This specifies the format to use. It defaults to the [Atom date time format](https://www.php.net/manual/en/class.datetimeinterface.php#datetime.constants.atom]). |
| `timezone` | `String` | The full name of the timezone, defaults to UTC. (E.g., America/New_York)                                                                                          |


### The `transform` directive
This directive is used to return a URL for an [asset tranform](https://docs.craftcms.com/v3/image-transforms.html). It accepts the same arguments you would use for a transform in Craft and adds the `immediately` argument.
| Argument      | Type      | Description                                                                                                      |
| ------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| `handle`      | `String`  | The handle of the named transform to use.                                                                        |
| `transform`   | `String`  | The handle of the named transform to use.                                                                        |
| `width`       | `Int`     | Width for the generated transform                                                                                |
| `height`      | `Int`     | Height for the generated transform                                                                               |
| `mode`        | `String`  | The mode to use for the generated transform.                                                                     |
| `position`    | `String`  | The position to use when cropping, if no focal point specified.                                                  |
| `interlace`   | `String`  | The interlace mode to use for the transform                                                                      |
| `quality`     | `Int`     | The quality of the transform                                                                                     |
| `format`      | `String`  | The format to use for the transform                                                                              |
| `immediately` | `Boolean` | Whether the transform should be generated immediately or only when the image is requested used the generated URL |


### The `markdown` directive
Parses the passed field value as Markdown.
| Argument | Type     | Description                                                                                                                     |
| -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `flavor` | `String` | The “flavor” of Markdown the input should be interpreted with. Accepts the same arguments as yii\helpers\Markdown::process(). |

<!-- END DIRECTIVES -->

## Pre-defined interfaces
Craft defines several interfaces to be implemented by the different GraphQL types.

<!-- BEGIN INTERFACES -->

### The `AssetInterface` interface
This is the interface implemented by all assets.
| Field           | Type       | Description                                                                                   |
| --------------- | ---------- | --------------------------------------------------------------------------------------------- |
| `id`            | `ID`       | The id of the entity                                                                          |
| `uid`           | `String`   | The uid of the entity                                                                         |
| `_count`        | `Int`      | Return a number of related elements for a field.                                              |
| `title`         | `String`   | The element’s title.                                                                          |
| `slug`          | `String`   | The element’s slug.                                                                           |
| `uri`           | `String`   | The element’s URI.                                                                            |
| `enabled`       | `Boolean`  | Whether the element is enabled or not.                                                        |
| `archived`      | `Boolean`  | Whether the element is archived or not.                                                       |
| `siteId`        | `Int`      | The ID of the site the element is associated with.                                            |
| `searchScore`   | `String`   | The element’s search score, if the `search` parameter was used when querying for the element. |
| `trashed`       | `Boolean`  | Whether the element has been soft-deleted or not.                                             |
| `status`        | `String`   | The element's status.                                                                         |
| `dateCreated`   | `DateTime` | The date the element was created.                                                             |
| `dateUpdated`   | `DateTime` | The date the element was last updated.                                                        |
| `volumeId`      | `Int`      | The ID of the volume that the asset belongs to.                                               |
| `folderId`      | `Int`      | The ID of the folder that the asset belongs to.                                               |
| `filename`      | `String`   | The filename of the asset file.                                                               |
| `extension`     | `String`   | The file extension for the asset file.                                                        |
| `hasFocalPoint` | `Boolean`  | Whether a user-defined focal point is set on the asset.                                       |
| `focalPoint`    | `[Float]`  | The focal point represented as an array with `x` and `y` keys, or null if it's not an image.  |
| `kind`          | `String`   | The file kind.                                                                                |
| `size`          | `String`   | The file size in bytes.                                                                       |
| `height`        | `Int`      | The height in pixels or null if it's not an image.                                            |
| `width`         | `Int`      | The width in pixels or null if it's not an image.                                             |
| `img`           | `String`   | An `<img>` tag based on this asset.                                                     |
| `url`           | `String`   | The full URL of the asset. This field accepts the same fields as the `transform` directive.   |
| `mimeType`      | `String`   | The file’s MIME type, if it can be determined.                                                |
| `path`          | `String`   | The asset's path in the volume.                                                               |
| `dateModified`  | `DateTime` | The date the asset file was last modified.                                                    |


### The `EntryInterface` interface
This is the interface implemented by all entries.
| Field           | Type               | Description                                                                                             |
| --------------- | ------------------ | ------------------------------------------------------------------------------------------------------- |
| `id`            | `ID`               | The id of the entity                                                                                    |
| `uid`           | `String`           | The uid of the entity                                                                                   |
| `_count`        | `Int`              | Return a number of related elements for a field.                                                        |
| `title`         | `String`           | The element’s title.                                                                                    |
| `slug`          | `String`           | The element’s slug.                                                                                     |
| `uri`           | `String`           | The element’s URI.                                                                                      |
| `enabled`       | `Boolean`          | Whether the element is enabled or not.                                                                  |
| `archived`      | `Boolean`          | Whether the element is archived or not.                                                                 |
| `siteId`        | `Int`              | The ID of the site the element is associated with.                                                      |
| `searchScore`   | `String`           | The element’s search score, if the `search` parameter was used when querying for the element.           |
| `trashed`       | `Boolean`          | Whether the element has been soft-deleted or not.                                                       |
| `status`        | `String`           | The element's status.                                                                                   |
| `dateCreated`   | `DateTime`         | The date the element was created.                                                                       |
| `dateUpdated`   | `DateTime`         | The date the element was last updated.                                                                  |
| `lft`           | `Int`              | The element’s left position within its structure.                                                       |
| `rgt`           | `Int`              | The element’s right position within its structure.                                                      |
| `level`         | `Int`              | The element’s level within its structure                                                                |
| `root`          | `Int`              | The element’s structure’s root ID                                                                       |
| `structureId`   | `Int`              | The element’s structure ID.                                                                             |
| `sectionId`     | `Int`              | The ID of the section that contains the entry.                                                          |
| `sectionHandle` | `String`           | The handle of the section that contains the entry.                                                      |
| `typeId`        | `Int`              | The ID of the entry type that contains the entry.                                                       |
| `typeHandle`    | `String`           | The handle of the entry type that contains the entry.                                                   |
| `postDate`      | `DateTime`         | The entry's post date.                                                                                  |
| `expiryDate`    | `DateTime`         | The expiry date of the entry.                                                                           |
| `children`      | `[EntryInterface]` | The entry’s children, if the section is a structure. Accepts the same arguments as the `entries` query. |
| `parent`        | `EntryInterface`   | The entry’s parent, if the section is a structure.                                                      |
| `url`           | `String`           | The element’s full URL                                                                                  |


### The `GlobalSetInterface` interface
This is the interface implemented by all global sets.
| Field         | Type       | Description                                                                                   |
| ------------- | ---------- | --------------------------------------------------------------------------------------------- |
| `id`          | `ID`       | The id of the entity                                                                          |
| `uid`         | `String`   | The uid of the entity                                                                         |
| `_count`      | `Int`      | Return a number of related elements for a field.                                              |
| `title`       | `String`   | The element’s title.                                                                          |
| `slug`        | `String`   | The element’s slug.                                                                           |
| `uri`         | `String`   | The element’s URI.                                                                            |
| `enabled`     | `Boolean`  | Whether the element is enabled or not.                                                        |
| `archived`    | `Boolean`  | Whether the element is archived or not.                                                       |
| `siteId`      | `Int`      | The ID of the site the element is associated with.                                            |
| `searchScore` | `String`   | The element’s search score, if the `search` parameter was used when querying for the element. |
| `trashed`     | `Boolean`  | Whether the element has been soft-deleted or not.                                             |
| `status`      | `String`   | The element's status.                                                                         |
| `dateCreated` | `DateTime` | The date the element was created.                                                             |
| `dateUpdated` | `DateTime` | The date the element was last updated.                                                        |
| `name`        | `String`   | The name of the global set.                                                                   |
| `handle`      | `String`   | The handle of the global set.                                                                 |


### The `MatrixBlockInterface` interface
This is the interface implemented by all matrix blocks.
| Field         | Type       | Description                                                                                   |
| ------------- | ---------- | --------------------------------------------------------------------------------------------- |
| `id`          | `ID`       | The id of the entity                                                                          |
| `uid`         | `String`   | The uid of the entity                                                                         |
| `_count`      | `Int`      | Return a number of related elements for a field.                                              |
| `title`       | `String`   | The element’s title.                                                                          |
| `slug`        | `String`   | The element’s slug.                                                                           |
| `uri`         | `String`   | The element’s URI.                                                                            |
| `enabled`     | `Boolean`  | Whether the element is enabled or not.                                                        |
| `archived`    | `Boolean`  | Whether the element is archived or not.                                                       |
| `siteId`      | `Int`      | The ID of the site the element is associated with.                                            |
| `searchScore` | `String`   | The element’s search score, if the `search` parameter was used when querying for the element. |
| `trashed`     | `Boolean`  | Whether the element has been soft-deleted or not.                                             |
| `status`      | `String`   | The element's status.                                                                         |
| `dateCreated` | `DateTime` | The date the element was created.                                                             |
| `dateUpdated` | `DateTime` | The date the element was last updated.                                                        |
| `fieldId`     | `Int`      | The ID of the field that owns the matrix block.                                               |
| `ownerId`     | `Int`      | The ID of the element that owns the matrix block.                                             |
| `typeId`      | `Int`      | The ID of the matrix block's type.                                                            |
| `typeHandle`  | `String`   | The handle of the matrix block's type.                                                        |
| `sortOrder`   | `Int`      | The sort order of the matrix block within the owner element field.                            |


### The `UserInterface` interface
This is the interface implemented by all users.
| Field               | Type             | Description                                                                                   |
| ------------------- | ---------------- | --------------------------------------------------------------------------------------------- |
| `id`                | `ID`             | The id of the entity                                                                          |
| `uid`               | `String`         | The uid of the entity                                                                         |
| `_count`            | `Int`            | Return a number of related elements for a field.                                              |
| `title`             | `String`         | The element’s title.                                                                          |
| `slug`              | `String`         | The element’s slug.                                                                           |
| `uri`               | `String`         | The element’s URI.                                                                            |
| `enabled`           | `Boolean`        | Whether the element is enabled or not.                                                        |
| `archived`          | `Boolean`        | Whether the element is archived or not.                                                       |
| `siteId`            | `Int`            | The ID of the site the element is associated with.                                            |
| `searchScore`       | `String`         | The element’s search score, if the `search` parameter was used when querying for the element. |
| `trashed`           | `Boolean`        | Whether the element has been soft-deleted or not.                                             |
| `status`            | `String`         | The element's status.                                                                         |
| `dateCreated`       | `DateTime`       | The date the element was created.                                                             |
| `dateUpdated`       | `DateTime`       | The date the element was last updated.                                                        |
| `photo`             | `AssetInterface` | The user's photo.                                                                             |
| `friendlyName`      | `String`         | The user's first name or username.                                                            |
| `fullName`          | `String`         | The user's full name.                                                                         |
| `name`              | `String`         | The user's full name or username.                                                             |
| `preferences`       | `String`         | The user’s preferences.                                                                       |
| `preferredLanguage` | `String`         | The user’s preferred language.                                                                |
| `username`          | `String`         | The username.                                                                                 |
| `firstName`         | `String`         | The user's first name.                                                                        |
| `lastName`          | `String`         | The user's last name.                                                                         |
| `email`             | `String`         | The user's email.                                                                             |


### The `CategoryInterface` interface
This is the interface implemented by all categories.
| Field         | Type                  | Description                                                                                   |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------- |
| `id`          | `ID`                  | The id of the entity                                                                          |
| `uid`         | `String`              | The uid of the entity                                                                         |
| `_count`      | `Int`                 | Return a number of related elements for a field.                                              |
| `title`       | `String`              | The element’s title.                                                                          |
| `slug`        | `String`              | The element’s slug.                                                                           |
| `uri`         | `String`              | The element’s URI.                                                                            |
| `enabled`     | `Boolean`             | Whether the element is enabled or not.                                                        |
| `archived`    | `Boolean`             | Whether the element is archived or not.                                                       |
| `siteId`      | `Int`                 | The ID of the site the element is associated with.                                            |
| `searchScore` | `String`              | The element’s search score, if the `search` parameter was used when querying for the element. |
| `trashed`     | `Boolean`             | Whether the element has been soft-deleted or not.                                             |
| `status`      | `String`              | The element's status.                                                                         |
| `dateCreated` | `DateTime`            | The date the element was created.                                                             |
| `dateUpdated` | `DateTime`            | The date the element was last updated.                                                        |
| `lft`         | `Int`                 | The element’s left position within its structure.                                             |
| `rgt`         | `Int`                 | The element’s right position within its structure.                                            |
| `level`       | `Int`                 | The element’s level within its structure                                                      |
| `root`        | `Int`                 | The element’s structure’s root ID                                                             |
| `structureId` | `Int`                 | The element’s structure ID.                                                                   |
| `groupId`     | `Int`                 | The ID of the group that contains the category.                                               |
| `groupHandle` | `String`              | The handle of the group that contains the category.                                           |
| `children`    | `[CategoryInterface]` | The category’s children.                                                                      |
| `parent`      | `CategoryInterface`   | The category’s parent.                                                                        |
| `url`         | `String`              | The element’s full URL                                                                        |


### The `TagInterface` interface
This is the interface implemented by all tags.
| Field         | Type       | Description                                                                                   |
| ------------- | ---------- | --------------------------------------------------------------------------------------------- |
| `id`          | `ID`       | The id of the entity                                                                          |
| `uid`         | `String`   | The uid of the entity                                                                         |
| `_count`      | `Int`      | Return a number of related elements for a field.                                              |
| `title`       | `String`   | The element’s title.                                                                          |
| `slug`        | `String`   | The element’s slug.                                                                           |
| `uri`         | `String`   | The element’s URI.                                                                            |
| `enabled`     | `Boolean`  | Whether the element is enabled or not.                                                        |
| `archived`    | `Boolean`  | Whether the element is archived or not.                                                       |
| `siteId`      | `Int`      | The ID of the site the element is associated with.                                            |
| `searchScore` | `String`   | The element’s search score, if the `search` parameter was used when querying for the element. |
| `trashed`     | `Boolean`  | Whether the element has been soft-deleted or not.                                             |
| `status`      | `String`   | The element's status.                                                                         |
| `dateCreated` | `DateTime` | The date the element was created.                                                             |
| `dateUpdated` | `DateTime` | The date the element was last updated.                                                        |
| `groupId`     | `Int`      | The ID of the group that contains the tag.                                                    |
| `groupHandle` | `String`   | The handle of the group that contains the tag.                                                |

<!-- END INTERFACES -->

