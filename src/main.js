//获取网页中的下面写的x，然后转换为对象
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
//声明一个hash数组来贮存添加得网页得logo和url
const hashmap = xObject || [
  {
    logo: "A",
    url: "https://www.acfun.cn",
  },
  {
    logo: "B",
    url: "https://www.bilibili.com",
  },
  {
    logo: "X",
    url: "https://xiedaimala.com",
  },
];

//媒体查询,因为在手机端和PC端搜索的action的地址是不同的，所以通过一个判断来修改地址
if ($(".searchForm").width() > 500) {
  $(".searchForm").attr("action", "https://www.baidu.com/s");
}
//简化显示的url
const simplyUrl = (url) => {
  return url
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
//获取ul
const $siteList = $(".siteList");
//获取最后一个li
const $lastLi = $(".lastLi");
//遍历hash数组得函数，并且把数组里面储存得网页放到最后一个添加按钮得前面
const render = () => {
  //添加之前先把之前的网页删除
  $siteList.find("li:not(.lastLi)").remove();
  hashmap.forEach((node, index) => {
    const $li = $(`<li>
                        <div class="site">
                            <div class="logo">${node.logo[0]}</div>
                            <div class="link">${simplyUrl(node.url)}</div>
                            <svg class="icon close">
                              <use xlink:href="#icon-close"></use>
                            </svg>
                        </div>
                </li>`).insertBefore($lastLi);
    //设置生成的背景颜色
   let color = "#" + Math.floor(Math.random() * (2 << 23)).toString(16);
    console.log(color);
   $li.css("background", color);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); //阻止事件冒泡
      hashmap.splice(index, 1);
      render();
    });
  });
};
//网页的最开始遍历hash来渲染网页
render();
//点击添加按钮之后向hash数组里面添加要添加网页的信息，然后渲染hash数组
$(".addButton").on("click", () => {
  let url = window.prompt("请输入你要添加得网址：");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }

  hashmap.push({ logo: simplyUrl(url)[0], url: url });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashmap);
  localStorage.setItem("x", string);
};