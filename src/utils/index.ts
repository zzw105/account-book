type checkStrType =
  | 'phone'
  | 'tel'
  | 'card'
  | 'pwd'
  | 'postal'
  | 'QQ'
  | 'email'
  | 'money'
  | 'money'
  | 'URL'
  | 'IP'
  | 'date'
  | 'number'
  | 'english'
  | 'chinese'
  | 'lower'
  | 'upper'
  | 'HTML'
  | 'userName'

export const checkStr = (str: string, type: checkStrType) => {
  switch (type) {
    case 'phone': //手机号码
      return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str)
    case 'tel': //座机
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str)
    case 'card': //身份证
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str)
    case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
      return /^[a-zA-Z]\w{5,17}$/.test(str)
    case 'userName': //用户名，长度在2~18之间，只能包含字母、数字
      return /^[0-9a-zA-Z]{1,17}$/.test(str)
    case 'postal': //邮政编码
      return /[1-9]\d{5}(?!\d)/.test(str)
    case 'QQ': //QQ号
      return /^[1-9][0-9]{4,9}$/.test(str)
    case 'email': //邮箱
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
    case 'money': //金额(小数点2位)
      return /^\d*(?:\.\d{0,2})?$/.test(str)
    case 'URL': //网址
      return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
    case 'IP': //IP
      return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str)
    case 'date': //日期时间
      return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
    case 'number': //数字
      return /^[0-9]$/.test(str)
    case 'english': //英文
      return /^[a-zA-Z]+$/.test(str)
    case 'chinese': //中文
      return /^[\\u4E00-\\u9FA5]+$/.test(str)
    case 'lower': //小写
      return /^[a-z]+$/.test(str)
    case 'upper': //大写
      return /^[A-Z]+$/.test(str)
    case 'HTML': //HTML标记
      return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str)
    default:
      return true
  }
}

export const iconInfoList = [
  {
    name: '购物消费',
    icon: 'buy',
    children: [
      {
        name: '个人护肤',
        icon: 'lip-gloss'
      },
      {
        name: '手机数码',
        icon: 'phone'
      }
    ]
  },
  {
    name: '食品餐饮',
    icon: 'chopsticks-fork',
    children: [
      {
        name: '水果',
        icon: 'apple-one'
      },
      {
        name: '早餐',
        icon: 'bread-machine'
      },
      {
        name: '午餐',
        icon: 'nutrition'
      },
      {
        name: '晚餐',
        icon: 'cooking'
      }
    ]
  }
]
