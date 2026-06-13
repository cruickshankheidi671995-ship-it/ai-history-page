# 公网部署说明

这个网页是纯静态站点，部署到云端后就可以通过公网网址访问，不依赖本机开机，也不要求访问者和你在同一个局域网。

## 推荐方式：GitHub Pages

1. 在 GitHub 新建一个仓库，例如 `ai-history-page`。
2. 把本项目推送到 GitHub 仓库的 `main` 分支。
3. 进入仓库的 `Settings` -> `Pages`。
4. 在 `Build and deployment` 里选择 `GitHub Actions`。
5. 等待 Actions 运行完成，GitHub 会生成一个公网网址，通常类似：

   `https://你的用户名.github.io/ai-history-page/`

项目里已经包含 `.github/workflows/pages.yml`，推送到 `main` 后会自动发布。

## 备选方式：Vercel

1. 打开 Vercel 并导入这个 Git 仓库。
2. Framework Preset 选择 `Other` 或保持默认静态站设置。
3. Build Command 留空。
4. Output Directory 使用项目根目录。
5. 部署完成后会得到一个类似 `https://xxx.vercel.app` 的网址。

项目里已经包含 `vercel.json`。

## 备选方式：Netlify

1. 打开 Netlify 并导入这个 Git 仓库。
2. Build command 留空。
3. Publish directory 填 `.`。
4. 部署完成后会得到一个类似 `https://xxx.netlify.app` 的网址。

项目里已经包含 `netlify.toml`。

## 本地预览

如果只是本机预览，可以运行：

```powershell
powershell -ExecutionPolicy Bypass -File .\start-server.ps1
```

这只适合本机或局域网预览，不是公网部署。
