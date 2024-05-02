/*
 * @Date: 2024-05-03 01:19:49
 * @LastEditors: hhp && 775621376@qq.com
 * @LastEditTime: 2024-05-03 01:30:06
 * @FilePath: \vite-vue-min\src\plugins\injectHtml.js
 * @Description:注入脚本到html
 * @Author: hehaipeng
 */
import ReadStream from "../utils/readStream.js";
const injectScript = (code) => `<script>${code}</script>`;
function injectHtml({ app, root }) {
  app.use(async (ctx, next) => {
    await next();
    if (ctx.response.is("html")) {
      const html = await ReadStream(ctx.body);
      ctx.body = html.replace(
        "<head>",
        `<head>${injectScript('window.process={env:{NODE_ENV:"development"}}')}`
      );
    }
  });
}
export default injectHtml;
