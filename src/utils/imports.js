/*
 * @Date: 2024-05-02 14:25:04
 * @LastEditors: hhp && 775621376@qq.com
 * @LastEditTime: 2024-05-03 01:43:02
 * @FilePath: \vite-vue-min\src\utils\imports.js
 * @Description:重写模块引入工具
 * @Author: hehaipeng
 */
import { parse } from "es-module-lexer";
import MagicString from "magic-string";

const diyModule = "/vitePath";
function RewriteImports(code) {
  const [imports] = parse(code);
  const magicString = new MagicString(code);
  if (imports.length) {
    imports.forEach(({ s, e }) => {
      let id = code.slice(s, e);
      if (/^[^\/\.]/.test(id)) {
        magicString.overwrite(s, e, `${diyModule}/${id}`);
      }
    });
  }
  return magicString.toString();
}

export default RewriteImports;
