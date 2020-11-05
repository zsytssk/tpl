## 目标

- 能正式上线的功能

  - webpack 配置
    - cdn `__webpack_public_path__`
    - 环境变量
    - babel + ts
  - react
    - router
    - redux
    - ui
    - 国际化
    - 微服务
    - 本地服务器

- 我不会的内容
  - redux

### string-replace-loader

```ts
{
    test: /\.route\.(j|t)s(x?)$/,
    loader: 'string-replace-loader',
    options: {
        search: 'lazyImport((.*)),',
        replace: (match, p1, offset, string) =>
            dev ? `require${p1}.default,` : `React.lazy(() => import${p1}),`,
        flags: 'g',
    },
}
```
