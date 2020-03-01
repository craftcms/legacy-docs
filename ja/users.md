# ユーザー

Craft はシステムのすべてのメンバーアカウントを「ユーザー」と呼びます。

最初のユーザーアカウントは、[インストール](installation.md)中に作成されます。Solo エディションを使い続けるなら、あなたが作成可能な唯一のアカウントとなります。さらに必要であれば、追加のユーザーアカウントを提供する Pro エディションにアップグレードできます。

## 管理者アカウント

管理者アカウントは、明示的な権限がない次のことを含め、 Craft 内のすべての操作を確実に行うことができる特別なアカウントです。

* 設定セクションに含まれるすべてのこと
* 他のユーザーを管理者にする（Craft Pro のみ）
* 他の管理者を管理する（Craft Pro のみ）

インストール中に作成したユーザーアカウントが、デフォルトで管理者になります。

::: tip
Considering the amount of damage an admin can do, it’s strongly recommended that you be conservative with creating new admin accounts. Only do it if you trust that they know what they’re doing.
:::

## ユーザーグループ

If you have Craft Pro, you can create User Groups to help organize your site’s user accounts, as well as batch-set permissions on them.

To create a new User Group, go to Settings → Users and click the “New Group” button. You can give your group a Name and Handle, plus any permissions you want every user within the group to have.

After you create your groups, you can assign users to groups by going into their account settings and clicking on the Permissions tab.

## 権限

Craft Pro allows you to set permissions on users and groups, such as the ability to access the Control Panel, edit content within certain sections, etc. You can apply these permissions directly to user accounts as well as to user groups. When you apply permissions to a user group, all users that belong to that group will inherit them.

The permissions Craft comes with are:

| 権限                                                               | ハンドル                                        |
| ---------------------------------------------------------------- | ------------------------------------------- |
| システムがオフの場合にサイトにアクセスする                                            | `accessSiteWhenSystemIsOff`                 |
| 管理画面にアクセスする                                                      | `accessCp`                                  |
| ↳&nbsp; システムがオフの場合に管理画面にアクセスする                                   | `accessCpWhenSystemIsOff`                   |
| ↳&nbsp; Craft CMS 起動とプラグインのアップデート                                | `performUpdates`                            |
| ↳&nbsp; _「プラグイン名」_ のアクセス                                         | `accessPlugin-[PluginHandle]`               |
| ユーザーを編集する                                                        | `editUsers`                                 |
| ↳&nbsp; ユーザーを登録する                                                | `registerUsers`                             |
| ↳&nbsp; ユーザー権限を割り当てる                                             | `assignUserPermissions`                     |
| ↳&nbsp; ユーザーを管理                                                  | `administrateUsers`                         |
| ユーザーを削除する                                                        | `deleteUsers`                               |
| _「サイト名」_ を編集する                                                   | `editSite:[SiteUID]`                        |
| エントリを編集する                                                        | `editEntries:[SectionID]`                   |
| ↳&nbsp; エントリを作る                                                  | `editEntries:[SectionUID]`                  |
| ↳&nbsp; ライブの変更を発表する                                              | `createEntries:[SectionUID]`                |
| ↳&nbsp; エントリを削除する                                                | `publishEntries:[SectionUID]`               |
| ↳&nbsp; 他の投稿者のエントリを編集する                                          | `deleteEntries:[SectionUID]`                |
|  ↳&nbsp; 他の作成者の入力のためライブを変更する                                     | `editPeerEntries:[SectionUID]`              |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; 他の投稿者のエントリを削除する                       | `publishPeerEntries:[SectionUID]`           |
| &nbsp;&nbsp;&nbsp;↳&nbsp; 他の投稿者の下書きを編集する                         | `deletePeerEntries:[SectionUID]`            |
|  ↳&nbsp; 他の投稿者の下書きを投稿する                                          | `editPeerEntryDrafts:[SectionUID]`          |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; 他の投稿者の下書きを削除する                        | `publishPeerEntryDrafts:[SectionUID]`       |
| &nbsp;&nbsp;&nbsp;_「グローバル設定名」_ を編集する                             | `deletePeerEntryDrafts:[SectionUID]`        |
| _「カテゴリグループ名」_ を編集する                                              | `editGlobalSet:[GlobalSetUID]`              |
| _「アセットソース名」_ を表示する                                               | `editCategories:[CategoryGroupUID]`         |
| ↳&nbsp; アップロード                                                   | `viewVolume:[VolumeUID]`                    |
| ↳&nbsp; サブフォルダを作成する                                              | `saveAssetInVolume:[VolumeUID]`             |
| ↳&nbsp; ファイルとフォルダーを削除                                            | `createFoldersInVolume:[VolumeUID]`         |
| ↳&nbsp; Remove files and folders                                 | `deleteFilesAndFoldersInVolume:[VolumeUID]` |
| ↳&nbsp; Edit images                                              | `editImagesInVolume:[VolumeUID]`            |
| ↳&nbsp; View files uploaded by other users                       | `viewPeerFilesInVolume:[VolumeUID]`         |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Edit files uploaded by other users    | `editPeerFilesInVolume:[SectionUID]`        |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Replace files uploaded by other users | `replacePeerFilesInVolume:[SectionUID]`     |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Remove files uploaded by other users  | `deletePeerFilesInVolume:[SectionUID]`      |
| &nbsp;&nbsp;&nbsp; ↳&nbsp; Edit images uploaded by other users   | `editPeerImagesInVolume:[SectionUID]`       |

## 一般登録

Craft Pro has the option of allowing public user registration, which is disabled by default.

To enable public registration, go to Settings → Users → Settings, and check the “Allow public registration?” setting. With that checked, you will also have the ability to choose a default user group to which Craft will assign the publicly-registered users.

Once you set up your site to allow public user registration, the last step is to create a [user registration form](dev/examples/user-registration-form.md) on your site’s front end.
