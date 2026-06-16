# 部署指南

## GitHub Pages 部署步骤

### 1. 创建GitHub仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角 **"+"** → **"New repository"**
3. 填写仓库名称（如 `body-guardians`）
4. 选择 **Public**（公开仓库才能使用GitHub Pages）
5. 点击 **"Create repository"**

### 2. 初始化本地Git仓库并推送代码

在项目根目录打开终端，执行以下命令：

```bash
# 初始化Git仓库
git init

# 添加所有文件到暂存区
git add .

# 提交代码
git commit -m "Initial commit: 身体守护者游戏"

# 添加远程仓库（替换YOUR_USERNAME为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/body-guardians.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

### 3. 启用GitHub Pages

1. 在GitHub仓库页面，点击 **"Settings"**
2. 左侧菜单找到 **"Pages"**
3. 在 **"Source"** 下拉菜单中选择：
   - **Branch**: `main`
   - **Folder**: `/ (root)`
4. 点击 **"Save"**

### 4. 等待部署

- 部署会自动开始
- 页面右上角会有黄色 **"Deploying..."** 状态
- 等待1-2分钟后，刷新页面
- 你的游戏将上线：`https://YOUR_USERNAME.github.io/body-guardians/`

### 5. 自定义域名（可选）

如果你有自定义域名：

1. 在仓库的 **Settings → Pages** 中
2. 在 **"Custom domain"** 输入你的域名
3. 在你的域名DNS设置中添加：
   - CNAME记录指向 `YOUR_USERNAME.github.io`
4. 勾选 **"Enforce HTTPS"**

---

## 本地预览

如果想在本地预览生产版本：

```bash
npm run preview
```

然后访问 `http://localhost:4173`

---

## 自动化部署

每次你 `push` 代码到 `main` 分支，GitHub Actions 会自动：
1. 安装依赖
2. 构建项目
3. 部署到GitHub Pages

---

## 项目结构

```
body-guardians/
├── dist/                  # 构建输出目录（部署用）
├── src/                   # 源代码
│   ├── components/       # Vue组件
│   ├── views/            # 页面视图
│   ├── stores/           # 状态管理
│   └── data/             # 游戏数据
├── .github/
│   └── workflows/
│       └── deploy.yml    # 自动化部署配置
├── public/               # 静态资源
├── vite.config.js        # Vite配置
└── package.json          # 项目配置
```

---

## 技术栈

- Vue 3.4.21
- Vite 5.4.1
- Vue Router 4.3.0
- Pinia 2.1.7
- Tailwind CSS 3.4.3

---

祝你的游戏在比赛中取得好成绩！🏆