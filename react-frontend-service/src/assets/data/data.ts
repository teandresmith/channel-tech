export const stateList = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]

export const prefectureList = [
  '愛知県',
  '秋田県',
  '青森県',
  '千葉県',
  '愛媛県',
  '福井県',
  '福岡県',
  '福島県',
  '岐阜県',
  '群馬県',
  '広島県',
  '北海道',
  '兵庫県',
  '茨城県',
  '石川県',
  '岩手県',
  '香川県',
  '鹿児島県',
  '神奈川県',
  '高知県',
  '熊本県',
  '京都府',
  '三重県',
  '宮城県',
  '宮崎県',
  '長野県',
  '長崎県',
  '奈良県',
  '新潟県',
  '大分県',
  '岡山県',
  '大阪府',
  '沖縄県',
  '佐賀県',
  '埼玉県',
  '滋賀県 ',
  '島根県',
  '静岡県',
  '栃木県',
  '徳島県',
  '東京都 ',
  '鳥取県',
  '富山県',
  '和歌山県',
  '山形県',
  '山口県',
  '山梨県',
]

export interface StaticData {
  Shop: {
    Computers: Array<string>
    Phones: Array<string>
    Entertainment: Array<string>
    Products: Array<string>
    AllProductCategories: Array<string>
    Categories: Array<string>
    SubFilters: Array<string>
    Prices: Array<number>
    Brands: Array<string>
    DataMap: EnglishDataMap | JapaneseDataMap
    Home: {
      ShoppingCategories: Array<{ category: string; url: string }>
    }
  }
}

interface EnglishDataMap {
  Computers: {
    Computers: string
    Desktops: string
    Laptops: string
    Monitors: string
    Accessories: string
    'Shop All': string
  }
  Entertainment: {
    Entertainment: string
    TVs: string
    Projectors: string
    'Sound Systems': string
    'Streaming Devices': string
    'Shop All': string
  }
  Phones: {
    Phones: string
    'Mobile Phones': string
    Cases: string
    Chargers: string
    Accessories: string
    'Shop All': string
  }
  Products: {
    'Featured Products': string
    'Top Rated Products': string
    'Newest Products': string
  }
  Prices: {
    100: string
    250: string
    500: string
    1000: string
    1500: string
  }
}

interface JapaneseDataMap {
  Computers: {
    パソコン: string
    デスクトップ: string
    ノートパソコン: string
    画面: string
    アクセサリー: string
    'Shop All': string
  }
  Entertainment: {
    電気機器: string
    テレビ: string
    プロジェクター: string
    'Streaming Devices': string
    スピーカー: string
    'Shop All': string
  }
  Phones: {
    電話: string
    携帯電話: string
    ケース: string
    電気電子: string
    アクセサリー: string
    'Shop All': string
  }
  Products: {
    おすすめ商品: string
    新しい商品: string
    一番商品: string
  }
  Prices: {
    10000: string
    25000: string
    50000: string
    100000: string
    150000: string
  }
}

export const englishLinks: StaticData = {
  Shop: {
    Computers: ['Desktops', 'Laptops', 'Monitors', 'Accessories', 'Shop All'],
    Phones: ['Mobile Phones', 'Cases', 'Chargers', 'Accessories', 'Shop All'],
    Entertainment: [
      'TVs',
      'Projectors',
      'Sound Systems',
      'Streaming Devices',
      'Shop All',
    ],
    Products: ['Featured Products', 'Top Rated Products', 'Newest Products'],
    AllProductCategories: ['Computers', 'Phones', 'Entertainment'],
    Categories: ['Computers', 'Phones', 'Entertainment'],
    SubFilters: ['Brands', 'Prices'],
    Prices: [100, 250, 500, 1000, 1500],
    Brands: [
      'Apple',
      'Asus',
      'Amazon',
      'Google',
      'Sony',
      'Microsoft',
      'HP',
      'Samsung',
    ],
    DataMap: {
      Computers: {
        Computers: 'パソコン',
        Desktops: 'デスクトップ',
        Laptops: 'ノートパソコン',
        Monitors: '画面',
        Accessories: 'アクセサリー',
        'Shop All': 'Shop All',
      },
      Entertainment: {
        Entertainment: '電気機器',
        TVs: 'テレビ',
        Projectors: 'プロジェクター',
        'Sound Systems': 'スピーカー',
        'Streaming Devices': 'Streaming Devices',
        'Shop All': 'Shop All',
      },
      Phones: {
        Phones: '電話',
        'Mobile Phones': '携帯電話',
        Cases: 'ケース',
        Chargers: '電話電子',
        Accessories: 'アクセサリー',
        'Shop All': 'Shop All',
      },
      Products: {
        'Featured Products': 'おすすめ商品',
        'Top Rated Products': '一番商品',
        'Newest Products': '新しい商品',
      },
      Prices: {
        100: '10000',
        250: '25000',
        500: '50000',
        1000: '100000',
        1500: '150000',
      },
    },
    Home: {
      ShoppingCategories: [
        {
          category: 'Laptops',
          url: `/shop?category=Computers&subcategory=Laptops&lang=en`,
        },
        {
          category: 'Desktops',
          url: `/shop?category=Computers&subcategory=Desktops&lang=en`,
        },
        {
          category: 'Sound Systems',
          url: `/shop?category=Entertainment&subcategory=Sound Systems&lang=en`,
        },
        {
          category: 'Mobile Phones',
          url: `/shop?category=Phones&subcategory=Mobile Phones&lang=en`,
        },
        {
          category: 'TVs',
          url: `/shop?category=Entertainment&subcategory=TVs&lang=en`,
        },
        {
          category: 'Shop All',
          url: `/shop`,
        },
      ],
    },
  },
}

export const japaneseLinks = {
  Shop: {
    Computers: [
      'デスクトップ',
      'ノートパソコン',
      '画面',
      'アクセサリー',
      'Shop All',
    ],
    Phones: ['携帯電話', 'ケース', '電話電子', 'アクセサリー', 'Shop All'],
    Entertainment: [
      'テレビ',
      'プロジェクター',
      'スピーカー',
      'Streaming Devices',
      'Shop All',
    ],
    AllProductCategories: ['パソコン', '電話', '電気機器'],
    Products: ['おすすめ商品', '新しい商品', '一番商品'],
    Categories: ['パソコン', '電話', '電気機器'],
    SubFilters: ['ブランド', '価格'],
    Prices: [10000, 25000, 50000, 100000, 150000],
    Brands: [
      'Apple',
      'Asus',
      'Amazon',
      'Google',
      'Sony',
      'Microsoft',
      'HP',
      'Samsung',
    ],
    DataMap: {
      Computers: {
        パソコン: 'Computers',
        デスクトップ: 'Desktops',
        ノートパソコン: 'Laptops',
        画面: 'Monitors',
        アクセサリー: 'Accessories',
        'Shop All': 'Shop All',
      },
      Entertainment: {
        電気機器: 'Entertainment',
        テレビ: 'TVs',
        プロジェクター: 'Projectors',
        'Streaming Devices': 'Streaming Devices',
        スピーカー: 'Sound Systems',
        'Shop All': 'Shop All',
      },
      Phones: {
        電話: 'Phones',
        携帯電話: 'Mobile Phones',
        ケース: 'Cases',
        電気電子: 'Chargers',
        アクセサリー: 'Accessories',
        'Shop All': 'Shop All',
      },
      Products: {
        おすすめ商品: 'Featured Products',
        新しい商品: 'Newest Products',
        一番商品: 'Top Rated Products',
      },
      Prices: {
        10000: '100',
        25000: '250',
        50000: '500',
        100000: '1000',
        150000: '1500',
      },
    },
    Home: {
      ShoppingCategories: [
        {
          category: 'ノートパソコン',
          url: `/shop?category=パソコン&subcategory=ノートパソコン&lang=jp`,
        },
        {
          category: 'パソコン',
          url: `/shop?category=パソコン&subcategory=デスクトップ&lang=jp`,
        },
        {
          category: 'スピーカー',
          url: `/shop?category=電気機器&subcategory=スピーカー&lang=jp`,
        },
        {
          category: '携帯電話',
          url: `/shop?category=電話&subcategory=携帯電話&lang=jp`,
        },
        {
          category: 'テレビ',
          url: `/shop?category=電気機器&subcategory=テレビ&lang=jp`,
        },
        {
          category: 'Shop All',
          url: `/shop`,
        },
      ],
    },
  },
}
