/**
 *  @description 使用 svg-captcha 生成 图形校验码
 *  @author mhz
 */

const svgCaptcha = require('svg-captcha')
const createCaptcha = ({
  size = 2, // 验证码长度
  fontSize = 40, // 验证码文字尺寸
  noise = 5, // 干扰线条数量 0-5
  width = 120, // 生成svg的宽度
  height = 45, // 生成svg的高度
  color = true, // 验证码字符颜色
  background = '#fff' // 验证码图片背景颜色
}) => {
  //  若创建算数式验证码，将create改为createMathExpr
  const newCaptcha = svgCaptcha.create({
    size,
    fontSize,
    noise,
    width,
    height,
    color,
    background
  })

  //	注意 svg-captcha 生成校验码svg后，有两个返回参数，一个data（svg代码），一个text（验证码文字）
  return {
    data: newCaptcha.data,
    text: newCaptcha.text
  }
}

module.exports = {
  createCaptcha
}