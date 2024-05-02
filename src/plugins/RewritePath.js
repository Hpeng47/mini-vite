/*
 * @Date: 2024-04-29 21:08:22
 * @LastEditors: hhp && 775621376@qq.com
 * @LastEditTime: 2024-05-03 01:44:52
 * @FilePath: \vite-vue-min\src\plugins\Rewritepath.js
 * @Description:处理js或ts文件
 * @Author: hehaipeng
 */
import ReadStream from "../utils/readStream.js";
import esbuild from "esbuild";
import RewriteImports from "../utils/imports.js";
function RewritePathPlugin({ app, root }) {
  app.use(async (ctx, next) => {
    await next();
    //判断后缀
    if (ctx.response.is("ts") || ctx.response.is("js")) {
      const data = await ReadStream(ctx.body); // 获取代码
      const RewriteImportsData = RewriteImports(data); // 重写代码中的import路径
      const { code } = esbuild.transformSync(RewriteImportsData, { // esbuild转换代码
        loader: "ts",
        target: "es2015",
      });
      ctx.body = code; // 替换body  
      ctx.type = "js"; // 替换type
    }
  });
}
export default RewritePathPlugin;
