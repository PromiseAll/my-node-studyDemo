const http = require("http");

class Test {
  constructor(name) {
    this.name = name;
  }
  click(fun) {
    console.log("点击");
    fun.call(this);
  }
}

let a = new Test("name");

a.click(function click() {
  console.log(this.name);
  console.log(this);
});

server = http.createServer();
server.listen(3000, "127.0.0.1");
