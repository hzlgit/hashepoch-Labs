// rem等比适配配置文件
// 基准大小
const baseSize = 16;
// 设置 rem 函数
export default function setRem() {
  // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
  // const scale = document.documentElement.clientWidth / 1920
  let scale = 0;
  if (document.documentElement.clientWidth > 974) {
    scale = document.documentElement.clientWidth / 1920;
  } else if (document.documentElement.clientWidth > 375) {
    scale = document.documentElement.clientWidth / 974;
  } else {
    scale = document.documentElement.clientWidth / 974;
  }

  // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
  document.documentElement.style.fontSize =
    baseSize * Math.min(scale, 2) + "px";
}
