import { $, cd } from "zx";
import { createWriteStream } from "fs";
// 默认不显示
// $.verbose = false;
console.log($);
// 重定向输出日志
cd("D:/MyProject/Study/my-node-studyDemo/20-zx");
console.log($);

await $`chcp 65001`; //设置编码
// await $`cd D:/MyProject/Study/my-node-studyDemo/ & dir`

// 追加文件
// console.log(
//   await $`git status`.pipe(
//     createWriteStream("d:/MyProject/Study/my-node-studyDemo/20-zx/tmp.txt", {
//       flags: "a", //如果要把内容追加到文件原有的内容的后面，则设置flags为'a',此时设置start无效
//     })
//   )
// );

console.log(
  await $`npm uni -D ws`.pipe(
    createWriteStream("d:/MyProject/Study/my-node-studyDemo/20-zx/tmp.txt", {
      flags: "a", //如果要把内容追加到文件原有的内容的后面，则设置flags为'a',此时设置start无效
    })
  )
);

// await $`npm-check -u -g`;
// let bear = await question("What kind of bear is best? ");
// let token = await question("Choose env variable: ", {
//   choices: Object.keys(process.env),
// });
