import path from "path";
import fs from "node:fs";
export default function resolveVueModule(root) {
  // node_modules路径
  const node_modules = path.join(root, "node_modules");
  // 获取vue的compiler-sfc 根路径
  const sfcPath = path.join(node_modules, "@vue", "compiler-sfc");
  // 获取vue的compiler-sfc package.json路径
  const sfcPackage = JSON.parse(
    fs.readFileSync(path.join(sfcPath, "package.json"), "utf-8")
  );
  // 设置vue的compiler-sfc package.json type为module
  sfcPackage.type = "module";
  fs.writeFileSync(
    path.join(sfcPath, "package.json"),
    JSON.stringify(sfcPackage)
  );
  // 获取vue的compiler-sfc 模块路径
  const compilerSFC = path.join(sfcPath, sfcPackage.module);

  // 除了compiler-sfc 其他模块路径规则是一样的 [模块名].esm-bundler.js
  const reservedPath = (name) => {
    return path.join(
      node_modules,
      `@vue/${name}`,
      "dist",
      `${name}.esm-bundler.js`
    );
  };

  const runtimeDom = reservedPath("runtime-dom");
  const runtimeCore = reservedPath("runtime-core");
  const reactivity = reservedPath("reactivity");
  const shared = reservedPath("shared");

  // 依赖映射表 映射vue相关模块文件路径，因为依赖中也可能引入别的依赖
  return {
    compilerSFC,
    "@vue/runtime-core": runtimeCore,
    "@vue/runtime-dom": runtimeDom,
    "@vue/reactivity": reactivity,
    "@vue/shared": shared,
    vue: runtimeDom,
  };
}
