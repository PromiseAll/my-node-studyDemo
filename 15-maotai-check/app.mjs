import Axios from "axios";
import color from "colors-console";

async function getCategoryList() {
  let data = {
    brandIds: null,
    tagIds: null,
    categoryId: null,
    topLevelId: "868250804392407040",
    keyword: null,
    page: 1,
    size: 100,
    sort: null,
    levelId: "794383030373425152",
    levelCode: "GRHY01",
    integralType: null,
  };
  let res = await Axios.post("https://prod.ggszhg.com/xgt-app/applet/product/search", data);
  let buyList = [];
  let integralList = [];
  res.data.data.content.map((v) => {
    if (v.isSellOut) {
      console.log();
      buyList.push(v);
    }
    if (v.isSellOut && v.integral) {
      integralList.push(v);
    }
  });
  let date = new Date();
  console.log(`当前时间:${date.toLocaleDateString() + date.toLocaleTimeString()}`);
  console.log(`可购买商品数量:${color("green", buyList.length)},送积分商品数量:${color("red", integralList.length)}`);
  buyList.map((v) => console.log(color("green", v.name)));
  integralList.map((v) => console.log(color("red", v.name)));
}
setInterval(() => {
  getCategoryList();
}, 10000);
