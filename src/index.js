/*
 * @Date: 2024-04-29 20:44:13
 * @LastEditors: hhp && 775621376@qq.com
 * @LastEditTime: 2024-05-03 01:40:49
 * @FilePath: \vite-vue-min\src\index.js
 * @Description:koa 服务
 * @Author: hehaipeng
 */
import Koa from "koa";
import StaticPlugin from "./plugins/Static.js";
import RewritePath from "./plugins/RewritePath.js";
import resolveVuePlugin from "./plugins/resolveVuePlugin.js";
import compilerSFC from "./plugins/CompilerSFC.js";
import injectHtml from "./plugins/InjectHtml.js";
const app = new Koa();

const root = process.cwd();

// 给中间件提供的上下文
const context = {
  app, // koa实例
  root, // 项目根目录
};

// 中间件
const plugins = [
  injectHtml,  // html注入脚本
  RewritePath, // 路径重写（为了让浏览器能够识别模块引入的路径）
  resolveVuePlugin, // 解析vue插件引入的路径
  compilerSFC, // 编辑vue单文件
  StaticPlugin,
];

plugins.forEach((plugin) => {
  plugin(context);
});

app.listen(5173, () => {
  console.log("vite dev server in http://localhost:5173");
});
