/*
 * @Date: 2024-05-02 15:02:08
 * @LastEditors: hhp && 775621376@qq.com
 * @LastEditTime: 2024-05-03 01:49:27
 * @FilePath: \vite-vue-min\src\plugins\resolveVuePlugin.js
 * @Description:vue相关模块文件路径映射中间件
 * @Author: hehaipeng
 */
import fs from "node:fs";
import resolveVueModule from "../utils/resolveVueModule.js";
const module = /\/vitePath\//;
export default function resolveVuePlugin({ app, root }) {
  app.use(async (ctx, next) => {
    const vueModules = resolveVueModule(root); // 获取vue模块路径
    if (module.test(ctx.path)) { // 判断是否是自定义模块路径
      const code = fs.readFileSync(   // 读取对应的模块
        vueModules[ctx.path.replace(module, "")], 
        "utf-8"
      );
      ctx.type = "js";
      ctx.body = code;
    } else {
      await next();
    }
  });
}
