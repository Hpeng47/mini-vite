/*
 * @Date: 2024-05-02 23:14:12
 * @LastEditors: hhp && 775621376@qq.com
 * @LastEditTime: 2024-05-03 01:54:23
 * @FilePath: \vite-vue-min\src\plugins\CompilerSFC.js
 * @Description: 处理vue单文件sfc
 * @Author: hehaipeng
 */
import path from "node:path";
import resolveVueModule from "../utils/resolveVueModule.js";
import fs from "node:fs";
function compilerSFC({ app, root }) {
  app.use(async (ctx, next) => {
    // 判断是否是vue文件
    if (ctx.path.endsWith(".vue")) {
      const sfc = resolveVueModule(root).compilerSFC; // 获取解析vue文件的模块路径
      let content = fs.readFileSync(path.join(root, ctx.path), "utf-8"); // 读取文件
      const { parse, compileTemplate } = await import("file://" + sfc); // 解析vue文件
      const { descriptor } = parse(content); // 解析vue文件的结果
      if (ctx.query.type === "template") {  // 如果是有template参数的文件话
        const { code: templateCode } = compileTemplate(descriptor.template); // 获取编译后template的代码
        ctx.type = "js";
        ctx.body = templateCode; 
        return; // 返回并跳出
      }
      let code = ""; 
      if (descriptor.script) { // 如果有script的话
        const content = descriptor.script.content; // 获取script的代码
        const replaced = content.replace(/export\s+default/, "const sfc_main="); // 替换export default为const sfc_main=
        code += replaced; // 拼接code
      }
      if (descriptor.template) { // 如果有template的话
        const tempRequest = `${ctx.path}?type=template`; // 拼接template文件请求路径
        code += `\nimport {render as sfc_render} from '${tempRequest}' 
        sfc_main.render=sfc_render;
        `;
      }
      code += `export default sfc_main;`; // 默认导出
      ctx.body = code;
      ctx.type = "js";
    } else {
      await next();
    }
  });
}

export default compilerSFC;
