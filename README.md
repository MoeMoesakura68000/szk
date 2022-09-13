# Shizuku Launcher

[![Netlify Status](https://api.netlify.com/api/v1/badges/310b5046-067e-4db4-8a97-5411d93d6002/deploy-status)](https://app.netlify.com/sites/shizuku-launcher-next/deploys)

Shizuku Launcher is a simple AWS Virtual Machine helper. Shizuku Launcher offers multiple solutions to keep your credential security and your anonymity.

Now it is written in Next.js.

## 使用Vercel部署

[点击此处](https://vercel.com/new/import?s=https%3A%2F%2Fgithub.com%2FhiDandelion%2Fshizuku-launcher-next)前往Vercel并导入此项目。您无需更改默认的设置即可完成部署。

## 使用Netlify部署

[点击此处](https://app.netlify.com/start/repos/hiDandelion%2Fshizuku-launcher-next)前往Netlify并导入此项目。您无需更改默认的设置即可完成部署。

## 更改默认的远端地址

在使用Shizuku Launcher的远端模式时，远端地址为可选项，这是由于Shizuku Launcher可以设定默认的远端地址。默认的设置将会使用服务提供商（如Vercel/Netlify）的Serverless Function进行托管。

我们无法保证任何提供商都可以提供此类型的托管（如仅支持前端网页的CloudFlare Pages），在此情况下，您必须更改此设置。

如果您需要更改默认的后端地址，您需要新建一个环境变量"NEXT_PUBLIC_DEFAULT_REMOTE"（变量名不包含引号），并将其设置为您的后端地址（请填写完整的协议头且不要在地址末尾加上斜杠"/"）。

## 自行搭建后端

如果您需要自行搭建后端，请参阅[Next.js的部署说明](https://nextjs.org/docs/deployment)，然后依据上一节的教程更改默认的远端地址。
