/*
 * @Date: 2024-04-29 21:35:37
 * @LastEditors: hhp && 775621376@qq.com
 * @LastEditTime: 2024-05-03 01:42:08
 * @FilePath: \vite-vue-min\src\utils\ReadStream.js
 * @Description:流的读取
 * @Author: hehaipeng
 */
import Stream from "node:stream";

function ReadStream(stream) {
  if (stream instanceof Stream) {
    return new Promise((res, rej) => {
      let body = "";
      stream.on("data", (chunk) => {
        body += chunk;
      });
      stream.on("end", () => {
        res(body);
      });
      stream.on("error", (err) => {
        rej(err);
      });
    });
  } else {
    return stream;
  }
}
export default ReadStream;
