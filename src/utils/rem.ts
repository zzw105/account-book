export function setRemInit() {
  // 当前页面宽度相对于 750 px(设计稿尺寸)的缩放比例。
  // const baseSize = 100; // postcss-px2rem的内容
  function setRem(designWidth: number, baseSize: number) {
    const scale = document.documentElement.clientWidth / designWidth
    document.documentElement.style.fontSize = `${baseSize * scale}px`
    /*
    if (Number(document.documentElement.style.fontSize.slice(0, -2)) <= 50) {
       document.documentElement.style.fontSize = '50px';
    }
    */
  }
  setRem(750, 100)
  window.addEventListener('resize', function () {
    setRem(750, 100)
  })
}
