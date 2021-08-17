import Axios from "axios";
import color from "colors-console";
import cryptoJs from "crypto-js";
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
    integralType: 'INTEGRAL',
  };
  let res = await Axios.post("https://prod.ggszhg.com/xgt-app/applet/product/search", data);
  let integralList = [];
  res.data.data.content.map((v) => {
    if (!v.isSellOut) {
      integralList.push(v);
    }
  });
  let date = new Date();
  console.log(`当前时间:${date.toLocaleDateString() + date.toLocaleTimeString()}`);
  console.log(
    `可购买积分商品数量:${color("green", integralList.length)}`
  );
  integralList.map((v) => console.log(color("green", v.id)));
  // integralList.map((v) => console.log(color("red", v.name)));
}

async function ll() {
  let data = {
    productId: "845128508794474496",
  };

  let params = {

  };

  let res = await Axios.post(
    "https://prod.ggszhg.com/xgt-app-not-enter/applet/product/detail",
    data,
    {
      params: {
        ...params,
        sign: sign(params, data),
      },
    }
  ).catch((err) => {
    // console.log(err.res);
  });
  console.log(res.data.data);
}


getCategoryList()

// getDetail();

function sign(t, n) {
  var r = [];
  for (var a in t) r.push("".concat(a, "=").concat(t[a]));
  var o = "".concat(r.join("&")).concat("e348db70-2e67-4a72-9578-8b40ad809cbb");
  let data =
    (n && (o = "".concat(o).concat(JSON.stringify(n))),
    (o = o.replace(/a/gm, "c").replace(/e/gm, "g").replace(new RegExp(" ", "gm"), "")),
    cryptoJs.MD5(o).toString().toUpperCase());
  return data;
}
