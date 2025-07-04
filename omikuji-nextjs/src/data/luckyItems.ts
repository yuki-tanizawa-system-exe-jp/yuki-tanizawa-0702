export interface LuckyItem {
  name: string
  category: 'color' | 'food' | 'item'
  description: string
  purchaseUrl: string
  price: string
  image: string
}

export interface LuckyItems {
  color: string
  number: number
  food: string
  item: string
  direction: string
}

export interface DailyQuote {
  quote: string
  author: string
  source: string // 映画・アニメ・ドラマ名
  category: 'movie' | 'anime' | 'drama'
}

// ラッキーアイテムのデータ
export const luckyColors = [
  "赤", "青", "緑", "黄", "紫", "オレンジ", "ピンク", "白", "黒", "金", "銀", "茶"
]

export const luckyFoods = [
  "りんご", "バナナ", "おにぎり", "サンドイッチ", "チョコレート", "ヨーグルト", 
  "緑茶", "コーヒー", "パスタ", "寿司", "ラーメン", "カレー", "サラダ", "フルーツ"
]

export const luckyItems = [
  "ペン", "手帳", "アクセサリー", "ハンカチ", "時計", "本", "音楽", "花",
  "キーホルダー", "マグカップ", "クッション", "香水", "鏡", "財布"
]

// 購入可能なラッキーアイテムのデータ
export const purchasableLuckyItems: Record<string, LuckyItem[]> = {
  // ラッキーカラー関連商品
  "赤": [
    { name: "赤いスカーフ", category: 'color', description: "運気を上げる鮮やかな赤いシルクスカーフ", purchaseUrl: "https://www.amazon.co.jp/s?k=赤+スカーフ", price: "¥2,980", image: "🧣" },
    { name: "赤いマグカップ", category: 'color', description: "毎日の運気アップに最適な赤いマグカップ", purchaseUrl: "https://www.amazon.co.jp/s?k=赤+マグカップ", price: "¥1,280", image: "☕" }
  ],
  "青": [
    { name: "青いペン", category: 'color', description: "集中力を高める青いボールペン", purchaseUrl: "https://www.amazon.co.jp/s?k=青+ボールペン", price: "¥580", image: "🖊️" },
    { name: "青いハンカチ", category: 'color', description: "清涼感のある青いハンカチ", purchaseUrl: "https://www.amazon.co.jp/s?k=青+ハンカチ", price: "¥890", image: "🤧" }
  ],
  "緑": [
    { name: "観葉植物", category: 'color', description: "癒しの緑で運気アップ", purchaseUrl: "https://www.amazon.co.jp/s?k=観葉植物", price: "¥1,980", image: "🌱" },
    { name: "緑茶セット", category: 'color', description: "心を落ち着かせる緑茶セット", purchaseUrl: "https://www.amazon.co.jp/s?k=緑茶+セット", price: "¥2,480", image: "🍵" }
  ],
  "黄": [
    { name: "黄色いキーホルダー", category: 'color', description: "金運アップの黄色いキーホルダー", purchaseUrl: "https://www.amazon.co.jp/s?k=黄色+キーホルダー", price: "¥680", image: "🔑" },
    { name: "黄色い財布", category: 'color', description: "金運を呼ぶ黄色い財布", purchaseUrl: "https://www.amazon.co.jp/s?k=黄色+財布", price: "¥3,980", image: "💛" }
  ],
  "紫": [
    { name: "紫のアロマキャンドル", category: 'color', description: "リラックス効果の紫のキャンドル", purchaseUrl: "https://www.amazon.co.jp/s?k=紫+アロマキャンドル", price: "¥1,580", image: "🕯️" },
    { name: "紫の手帳", category: 'color', description: "直感力を高める紫の手帳", purchaseUrl: "https://www.amazon.co.jp/s?k=紫+手帳", price: "¥2,280", image: "📔" }
  ],
  "オレンジ": [
    { name: "オレンジのクッション", category: 'color', description: "元気をもらえるオレンジのクッション", purchaseUrl: "https://www.amazon.co.jp/s?k=オレンジ+クッション", price: "¥1,880", image: "🧡" },
    { name: "オレンジの香水", category: 'color', description: "活力を与えるオレンジの香り", purchaseUrl: "https://www.amazon.co.jp/s?k=オレンジ+香水", price: "¥4,980", image: "🍊" }
  ],
  "ピンク": [
    { name: "ピンクの鏡", category: 'color', description: "恋愛運アップのピンクの手鏡", purchaseUrl: "https://www.amazon.co.jp/s?k=ピンク+手鏡", price: "¥1,480", image: "🪞" },
    { name: "ピンクの花", category: 'color', description: "愛情運を高めるピンクの花", purchaseUrl: "https://www.amazon.co.jp/s?k=ピンク+造花", price: "¥980", image: "🌸" }
  ],
  "白": [
    { name: "白いハンカチ", category: 'color', description: "清浄な白いハンカチ", purchaseUrl: "https://www.amazon.co.jp/s?k=白+ハンカチ", price: "¥780", image: "🤍" },
    { name: "白い時計", category: 'color', description: "新しいスタートを象徴する白い時計", purchaseUrl: "https://www.amazon.co.jp/s?k=白+腕時計", price: "¥5,980", image: "⌚" }
  ],
  "黒": [
    { name: "黒いペン", category: 'color', description: "集中力を高める黒いペン", purchaseUrl: "https://www.amazon.co.jp/s?k=黒+万年筆", price: "¥2,980", image: "🖋️" },
    { name: "黒いアクセサリー", category: 'color', description: "魔除けの黒いアクセサリー", purchaseUrl: "https://www.amazon.co.jp/s?k=黒+アクセサリー", price: "¥1,980", image: "🖤" }
  ],
  "金": [
    { name: "金のキーホルダー", category: 'color', description: "金運アップの金色キーホルダー", purchaseUrl: "https://www.amazon.co.jp/s?k=金色+キーホルダー", price: "¥1,280", image: "🔑" },
    { name: "金の置物", category: 'color', description: "富を呼ぶ金の置物", purchaseUrl: "https://www.amazon.co.jp/s?k=金+置物", price: "¥3,980", image: "🏆" }
  ],
  "銀": [
    { name: "銀のアクセサリー", category: 'color', description: "浄化作用のある銀のアクセサリー", purchaseUrl: "https://www.amazon.co.jp/s?k=銀+アクセサリー", price: "¥2,480", image: "💍" },
    { name: "銀の時計", category: 'color', description: "時間を大切にする銀の時計", purchaseUrl: "https://www.amazon.co.jp/s?k=銀+腕時計", price: "¥7,980", image: "⌚" }
  ],
  "茶": [
    { name: "茶色の手帳", category: 'color', description: "安定感のある茶色の手帳", purchaseUrl: "https://www.amazon.co.jp/s?k=茶色+手帳", price: "¥1,980", image: "📒" },
    { name: "茶色の財布", category: 'color', description: "堅実な茶色の財布", purchaseUrl: "https://www.amazon.co.jp/s?k=茶色+財布", price: "¥4,980", image: "👛" }
  ],

  // ラッキーフード関連商品
  "りんご": [
    { name: "青森産りんご", category: 'food', description: "新鮮で甘い青森産りんご", purchaseUrl: "https://www.amazon.co.jp/s?k=青森+りんご", price: "¥2,980", image: "🍎" }
  ],
  "バナナ": [
    { name: "有機バナナ", category: 'food', description: "栄養豊富な有機バナナ", purchaseUrl: "https://www.amazon.co.jp/s?k=有機+バナナ", price: "¥680", image: "🍌" }
  ],
  "チョコレート": [
    { name: "高級チョコレート", category: 'food', description: "幸せを運ぶ高級チョコレート", purchaseUrl: "https://www.amazon.co.jp/s?k=高級+チョコレート", price: "¥1,980", image: "🍫" }
  ],
  "緑茶": [
    { name: "静岡茶セット", category: 'food', description: "心を落ち着かせる静岡茶", purchaseUrl: "https://www.amazon.co.jp/s?k=静岡茶", price: "¥1,480", image: "🍵" }
  ],
  "コーヒー": [
    { name: "スペシャルティコーヒー", category: 'food', description: "目覚めの一杯に最適なコーヒー", purchaseUrl: "https://www.amazon.co.jp/s?k=スペシャルティコーヒー", price: "¥2,480", image: "☕" }
  ],

  // ラッキーアイテム関連商品
  "ペン": [
    { name: "高級ボールペン", category: 'item', description: "書き心地抜群の高級ペン", purchaseUrl: "https://www.amazon.co.jp/s?k=高級+ボールペン", price: "¥3,980", image: "🖊️" }
  ],
  "手帳": [
    { name: "2025年手帳", category: 'item', description: "運気アップの手帳", purchaseUrl: "https://www.amazon.co.jp/s?k=2025+手帳", price: "¥1,980", image: "📔" }
  ],
  "アクセサリー": [
    { name: "幸運のアクセサリー", category: 'item', description: "運気を高めるアクセサリー", purchaseUrl: "https://www.amazon.co.jp/s?k=幸運+アクセサリー", price: "¥2,980", image: "💍" }
  ],
  "時計": [
    { name: "運気アップ腕時計", category: 'item', description: "時間を大切にする腕時計", purchaseUrl: "https://www.amazon.co.jp/s?k=腕時計", price: "¥8,980", image: "⌚" }
  ],
  "財布": [
    { name: "金運財布", category: 'item', description: "金運を呼ぶ財布", purchaseUrl: "https://www.amazon.co.jp/s?k=金運+財布", price: "¥5,980", image: "👛" }
  ],
  "キーホルダー": [
    { name: "幸運のキーホルダー", category: 'item', description: "持ち歩ける幸運のお守り", purchaseUrl: "https://www.amazon.co.jp/s?k=幸運+キーホルダー", price: "¥980", image: "🔑" }
  ],
  "マグカップ": [
    { name: "運気アップマグカップ", category: 'item', description: "毎日の運気を高めるマグカップ", purchaseUrl: "https://www.amazon.co.jp/s?k=マグカップ", price: "¥1,480", image: "☕" }
  ],
  "香水": [
    { name: "幸運の香水", category: 'item', description: "運気を高める香り", purchaseUrl: "https://www.amazon.co.jp/s?k=香水", price: "¥4,980", image: "🌸" }
  ],
  "鏡": [
    { name: "幸運の手鏡", category: 'item', description: "美しさと運気を映す鏡", purchaseUrl: "https://www.amazon.co.jp/s?k=手鏡", price: "¥1,980", image: "🪞" }
  ]
}

export const luckyDirections = [
  "北", "南", "東", "西", "北東", "北西", "南東", "南西"
]

// 映画・アニメ・ドラマの名言データ（より長い文章の名言）
export const dailyQuotes: DailyQuote[] = [
  // 厳選したアニメの長い名言
  { quote: "諦めたらそこで試合終了だよ。最後まで希望を捨てちゃいかん。あきらめたらそこで試合終了なんだ", author: "安西先生", source: "スラムダンク", category: "anime" },
  { quote: "真実はいつもひとつ！見た目は子供、頭脳は大人、その名は名探偵コナン！", author: "江戸川コナン", source: "名探偵コナン", category: "anime" },
  { quote: "オレは海賊王になる男だ！仲間がいるから強くなれる。一人じゃ何もできないけど、みんながいれば何でもできる", author: "モンキー・D・ルフィ", source: "ワンピース", category: "anime" },
  { quote: "愛と勇気だけが友達さ。みんなを守るため、正義のために戦うんだ。君も勇気を出して", author: "アンパンマン", source: "アンパンマン", category: "anime" },
  { quote: "月に代わってお仕置きよ！愛と正義のセーラー服美少女戦士、セーラームーン！", author: "セーラームーン", source: "美少女戦士セーラームーン", category: "anime" },
  { quote: "バルス！滅びの呪文だ。ラピュタは滅びぬ、何度でもよみがえるさ。ラピュタの力こそ人類の夢だからだ", author: "シータ", source: "天空の城ラピュタ", category: "anime" },
  { quote: "お前はもう死んでいる。北斗神拳は一子相伝の暗殺拳。お前のような奴に負けるわけにはいかない", author: "ケンシロウ", source: "北斗の拳", category: "anime" },
  { quote: "左手は添えるだけ。シュートは右手一本で打つものだ。フォームが大事なんだ", author: "桜木花道", source: "スラムダンク", category: "anime" },

  // 有名なドラマの長い名言
  { quote: "やられたらやり返す。倍返しだ！お客様は神様です。しかし、悪質なお客様は神様ではありません", author: "半沢直樹", source: "半沢直樹", category: "drama" },
  { quote: "同情するなら金をくれ。お金がないと何もできない。でも、お金があっても愛がなければ意味がない", author: "相沢すず", source: "家なき子", category: "drama" },
  { quote: "愛は勝つ。きっと勝つ。愛は勝つ。心配ないからね。君のそばにいるから", author: "武田鉄矢", source: "101回目のプロポーズ", category: "drama" },
  { quote: "逃げるは恥だが役に立つ。恋愛は面倒くさいけれど、契約結婚なら合理的で効率的です", author: "森山みくり", source: "逃げるは恥だが役に立つ", category: "drama" },
  { quote: "カンチ、セックスしよ。愛してるの。ずっと一緒にいたいの。でも、もう会えないのね", author: "赤名リカ", source: "東京ラブストーリー", category: "drama" },
  { quote: "腐ったミカンの方程式。一つの腐ったミカンがあると、周りのミカンも腐ってしまう。でも人間はミカンじゃない", author: "坂本金八", source: "3年B組金八先生", category: "drama" },
  { quote: "じぇじぇじぇ！びっくりした〜。こんなことがあるなんて思わなかった。人生って不思議だね", author: "天野アキ", source: "あまちゃん", category: "drama" },
  { quote: "事件は会議室で起きてるんじゃない！現場で起きてるんだ！現場を見ろ、現場を！", author: "青島俊作", source: "踊る大捜査線", category: "drama" },

  // 有名な映画の長い名言
  { quote: "それを言っちゃあ、おしまいよ。人生なんてそんなもんさ。でも、それでも生きていかなきゃならないんだ", author: "車寅次郎", source: "男はつらいよ", category: "movie" },
  { quote: "それでも僕はやってない。無実の人間が罪を着せられる。そんな理不尽なことがあっていいのか", author: "加瀬亮", source: "それでも僕はやってない", category: "movie" },
  { quote: "納棺は死への準備ではなく、生への準備です。美しく旅立つことで、残された人たちの心も癒される", author: "本木雅弘", source: "おくりびと", category: "movie" },
  { quote: "君の名前は？僕たちは出会うべくして出会った。時空を超えて結ばれた運命の糸", author: "立花瀧", source: "君の名は。", category: "movie" },
  { quote: "Shall we ダンス？人生は踊りのようなもの。一歩一歩、リズムに合わせて歩んでいこう", author: "役所広司", source: "Shall we ダンス？", category: "movie" },
  { quote: "社長、釣れますか？人生も釣りも同じです。忍耐と運と、そして少しの技術が必要なんです", author: "浜崎伝助", source: "釣りバカ日誌", category: "movie" },

  // バラエティ・現実の人の面白い長い名言
  { quote: "ちょっと何言ってるかわからない。でも、わからないことがわかったから、それはそれで収穫だと思う", author: "サンドウィッチマン", source: "バラエティ", category: "drama" },
  { quote: "ダメよ〜ダメダメ。ダメなものはダメ。でも、ダメじゃないものは大丈夫よ〜", author: "日本エレキテル連合", source: "バラエティ", category: "drama" },
  { quote: "ワイルドだろ〜。男は黙ってワイルドに生きるんだ。ワイルドに、そしてクールに", author: "スギちゃん", source: "バラエティ", category: "drama" },
  { quote: "そんなの関係ねぇ！そんなの関係ねぇ！はい、オッパッピー！人生楽しんだもん勝ちだ", author: "小島よしお", source: "バラエティ", category: "drama" },
  { quote: "生きてるだけで丸儲け。人生なんて、生きてるだけで十分や。あとは笑って過ごそうや", author: "明石家さんま", source: "バラエティ", category: "drama" },
  { quote: "だっふんだ。人生はコントのようなもの。笑いがあれば、どんな困難も乗り越えられる", author: "志村けん", source: "バラエティ", category: "drama" },

  // 政治家・有名人の長い名言
  { quote: "自民党をぶっ壊す。古い体質を変えて、新しい政治を作る。改革なくして成長なし", author: "小泉純一郎", source: "政治", category: "drama" },
  { quote: "感動した！人間は感動することで成長する。心を動かされる体験こそが人生の宝物だ", author: "小泉純一郎", source: "政治", category: "drama" },
  { quote: "記憶にございません。都合の悪いことは忘れる。それも人間の防衛本能かもしれませんね", author: "政治家", source: "政治", category: "drama" },

  // 深い哲学的な名言も追加
  { quote: "人生は選択の連続である。どの道を選ぶかで未来が決まる。後悔のない選択をしよう", author: "哲学者", source: "人生論", category: "drama" },
  { quote: "失敗は成功の母である。失敗から学ぶことで、より大きな成功を手にすることができる", author: "成功者", source: "自己啓発", category: "drama" },
  { quote: "時間は有限である。だからこそ、一瞬一瞬を大切に生きなければならない", author: "時間管理の専門家", source: "時間論", category: "drama" },
  { quote: "愛とは相手の幸せを願うこと。自分の幸せよりも相手の幸せを考えられるのが真の愛", author: "恋愛カウンセラー", source: "愛の哲学", category: "drama" },
  { quote: "夢を持つことは大切だが、それを実現するための努力はもっと大切である", author: "夢追い人", source: "夢実現論", category: "drama" }
]

// 今日のラッキーアイテムを生成する関数
export const getTodayLuckyItems = (): LuckyItems => {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  
  // シードベースの疑似ランダム生成
  const random = (index: number) => {
    const x = Math.sin(seed + index) * 10000
    return x - Math.floor(x)
  }
  
  return {
    color: luckyColors[Math.floor(random(1) * luckyColors.length)],
    number: Math.floor(random(2) * 99) + 1,
    food: luckyFoods[Math.floor(random(3) * luckyFoods.length)],
    item: luckyItems[Math.floor(random(4) * luckyItems.length)],
    direction: luckyDirections[Math.floor(random(5) * luckyDirections.length)]
  }
}

// 今日の一言を取得する関数
export const getTodayQuote = (): DailyQuote => {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  const index = seed % dailyQuotes.length
  return dailyQuotes[index]
}

// ランダムな一言を取得する関数
export const getRandomQuote = (): DailyQuote => {
  const randomIndex = Math.floor(Math.random() * dailyQuotes.length)
  return dailyQuotes[randomIndex]
}