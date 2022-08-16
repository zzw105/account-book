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
        name: '日常家居',
        icon: 'cooking-pot'
      },
      {
        name: '个人护肤',
        icon: 'lip-gloss'
      },
      {
        name: '手机数码',
        icon: 'phone'
      },

      {
        name: '虚拟充值',
        icon: 'finance'
      },
      {
        name: '生活电器',
        icon: 'washing-machine'
      },
      {
        name: '配饰腕表',
        icon: 'iwatch'
      },
      {
        name: '母婴玩具',
        icon: 'baby-bottle'
      },
      {
        name: '服饰运动',
        icon: 'clothes-crew-neck'
      },
      {
        name: '宠物用品',
        icon: 'dog'
      },
      {
        name: '办公用具',
        icon: 'paperclip'
      },
      {
        name: '装修装饰',
        icon: 'building-one'
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
      },
      {
        name: '酒水饮料',
        icon: 'bottle-one'
      },
      {
        name: '休闲零食',
        icon: 'candy'
      },
      {
        name: '生鲜食品',
        icon: 'chicken'
      },
      {
        name: '请客吃饭',
        icon: 'chicken'
      },
      {
        name: '粮油调味',
        icon: 'bottle-three'
      }
    ]
  },
  {
    name: '交通出行',
    icon: 'road',
    children: [
      {
        name: '打车',
        icon: 'taxi'
      },
      {
        name: '公共交通',
        icon: 'bus-two'
      },
      {
        name: '停车费',
        icon: 'parking'
      },
      {
        name: '加油',
        icon: 'petrol'
      },
      {
        name: '火车',
        icon: 'train'
      },
      {
        name: '飞机',
        icon: 'airplane'
      },
      {
        name: '保养修车',
        icon: 'car'
      }
    ]
  },
  {
    name: '休闲娱乐',
    icon: 'gamepad',
    children: [
      {
        name: '游戏',
        icon: 'gamepad'
      },
      {
        name: '旅游度假',
        icon: 'trunk'
      },
      {
        name: '电影唱歌',
        icon: 'movie'
      },
      {
        name: '运动健身',
        icon: 'dumbbell'
      },
      {
        name: '足浴按摩',
        icon: 'massage-table'
      },
      {
        name: '棋牌桌游',
        icon: 'poker'
      },
      {
        name: '酒吧',
        icon: 'cocktail'
      },
      {
        name: '演出',
        icon: 'tickets-two'
      }
    ]
  },
  {
    name: '居家生活',
    icon: 'home-two',
    children: [
      {
        name: '话费宽带',
        icon: 'phone-call'
      },
      {
        name: '电费',
        icon: 'lightning'
      },
      {
        name: '水费',
        icon: 'water-level'
      },
      {
        name: '燃气费',
        icon: 'fire'
      },
      {
        name: '物业费',
        icon: 'city'
      },
      {
        name: '房租还贷',
        icon: 'bank'
      },
      {
        name: '车位费',
        icon: 'garage'
      },
      {
        name: '家政清洁',
        icon: 'vacuum-cleaner'
      }
    ]
  },
  {
    name: '文化教育',
    icon: 'bachelor-cap',
    children: [
      {
        name: '学费',
        icon: 'degree-hat'
      },
      {
        name: '书包杂志',
        icon: 'book-open'
      },
      {
        name: '培训考试',
        icon: 'bookshelf'
      }
    ]
  },
  {
    name: '送礼人情',
    icon: 'gift',
    children: [
      {
        name: '孝敬长辈',
        icon: 'love-and-help'
      },
      {
        name: '礼物',
        icon: 'gift'
      },
      {
        name: '借出',
        icon: 'expenses-one'
      },
      {
        name: '红包',
        icon: 'red-envelope'
      },
      {
        name: '打赏',
        icon: 'pay-code'
      }
    ]
  },
  {
    name: '医疗健康',
    icon: 'stethoscope',
    children: [
      {
        name: '滋补保养',
        icon: 'health-products'
      },
      {
        name: '医院',
        icon: 'hospital-four'
      },
      {
        name: '买药',
        icon: 'pills'
      }
    ]
  },
  {
    name: '其他',
    icon: 'more-four',
    children: [
      {
        name: '其他',
        icon: 'more-four'
      }
    ]
  }
]
