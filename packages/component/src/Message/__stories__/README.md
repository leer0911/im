# 消息流组件

用于显示消息，目前包含以下组件：

- MessageText
- MessageMedia（ 图片 ）

## 基础 API（ MessageBase ）

| Name     | Type            | Default | Description  |
| :------- | :-------------- | :------ | :----------- |
| reverse  | bool            | `false` | 是否反向显示 |
| avatar   | string          |         | 头像地址     |
| name     | string          |         | 用户名称     |
| children | React.ReactNode | null    | 聊天内容     |

## MessageText

继承自 MessageBase

| Name | Type | Default | Description |
| :--- | :--- | :------ | :---------- |
|      |      |         |             |

## MessageMedia

继承自 MessageBase

| Name | Type | Default | Description |
| :--- | :--- | :------ | :---------- |
|      |      |         |             |

## MessageMedia

| Name     | Type            | Default | Description |
| :------- | :-------------- | :------ | :---------- |
| message  | React.ReactNode | null    | 快捷内容    |
| children | React.ReactNode | null    | 自定义内容  |
