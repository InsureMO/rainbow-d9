# Enviroments

Assume the following envs are ready, otherwise contact the tech guy.

- Node 16
- Npm 8
- Yarn 1.22

# Clone repository

- Create a folder in your local machine, such as `your-path-to-d9-root`,
- Clone following repositories under root folder,
	- https://oss.ebaotech.com/d9/d9-tabs
	- https://oss.ebaotech.com/d9/d9-tabs-sample-cra
- Create `package.json` file under root folder, with following content,
	- Copy from `your-path-to-d9-root\d9-tabs-sample-cra\wins-bat-files\workspace.package.json` to `your-path-to-d9-root`,
	- Rename file to `package.json`,
- Copy execute shortcut files from `your-path-to-d9-root\d9-tabs-sample-cra\wins-bat-files\*.bat` to `your-path-to-d9-root`.

## Windows

```bat
@echo off

REM 1. 到D盘
cd /d D:\

REM 2. 创建一个目录叫d9
mkdir d9

REM 3. 进入目录d9
cd d9

REM 4. git clone项目
git clone https://oss.ebaotech.com/d9/d9-tabs.git
git clone https://oss.ebaotech.com/d9/d9-tabs-sample-cra.git

REM 5. 创建一个package.json，内容是标准的
copy "d9-tabs-sample-cra\wins-bat-files\workspace.package.json" .\package.json

REM 6. 用npm安装一个yarn 1.22.10
npm install -g yarn@1.22.19

REM 7. 运行yarn install
yarn install

REM 8. copy d9-tabs-sample-cra/wins-bat-files下面的所有bat文件到当前目录
copy "d9-tabs-sample-cra\wins-bat-files\*.bat" .

REM 9. 依次运行每个bat文件
call build-all.bat
call start-sample.bat
```

# Build

- Run `build-all.bat`,
- Run `start-sample.bat`, to start sample cra.

## Rebuild Tabs Module

- Run `build-tabs.bat`

# Configuration

## Configure UI

- Make sure the sample cra module is started,
- Find markdown configuration files at `your-path-to-d9-root\d9-tabs-sample-cra\src\config`,
- Modify markdown file, all changes should be refreshed to brower automatically.

## Configure Data

- Make sure the sample cra module is started,
- Find json configuration files at `your-path-to-d9-root\d9-tabs-sample-cra\src\data`,
- Modify json file, all changes should be refreshed to brower automatically.

## Commit Changes

Use git push.
