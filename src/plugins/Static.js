/*
 * @Date: 2024-04-29 20:48:18
 * @LastEditors: hhp && 775621376@qq.com
 * @LastEditTime: 2024-04-29 23:16:04
 * @FilePath: \vite-vue-min\src\plugins\Static.js
 * @Description:StaticPlugin静态文件中间件
 * @Author: hehaipeng
 */
import Static from "koa-static";
function StaticPlugin({ app, root }) {
  app.use(Static(root));
}

export default StaticPlugin;
