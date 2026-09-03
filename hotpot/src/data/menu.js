/** 菜单由素材文件名生成；图片路径带上 Vite base（GitHub Pages 的 /hotpot/） */
const asset = (path) => import.meta.env.BASE_URL + path.replace(/^\//, '')

export const CATEGORIES = [
  { id: '底料', label: '底料', hint: '今晚这一锅' },
  { id: '荤', label: '荤菜', hint: '挑喜欢的肉' },
  { id: '素', label: '素菜', hint: '配一点清爽' },
]

export const DISHES = [
  { id: '底料-边炉', category: '底料', name: '边炉', image: asset("dishes/底料/边炉.webp") },
  { id: '底料-番茄锅', category: '底料', name: '番茄锅', image: asset("dishes/底料/番茄锅.webp") },
  { id: '底料-菌汤锅', category: '底料', name: '菌汤锅', image: asset("dishes/底料/菌汤锅.webp") },
  { id: '底料-牛油辣锅', category: '底料', name: '牛油辣锅', image: asset("dishes/底料/牛油辣锅.jpg") },
  { id: '底料-养生清汤锅', category: '底料', name: '养生清汤锅', image: asset("dishes/底料/养生清汤锅.webp") },
  { id: '荤-脆肠', category: '荤', name: '脆肠', image: asset("dishes/荤/脆肠.webp") },
  { id: '荤-肥牛', category: '荤', name: '肥牛', image: asset("dishes/荤/肥牛.webp") },
  { id: '荤-蚝贝', category: '荤', name: '蚝贝', image: asset("dishes/荤/蚝贝.webp") },
  { id: '荤-黑鱼片', category: '荤', name: '黑鱼片', image: asset("dishes/荤/黑鱼片.webp") },
  { id: '荤-黄喉', category: '荤', name: '黄喉', image: asset("dishes/荤/黄喉.webp") },
  { id: '荤-鸡肉', category: '荤', name: '鸡肉', image: asset("dishes/荤/鸡肉.webp") },
  { id: '荤-鸡爪', category: '荤', name: '鸡爪', image: asset("dishes/荤/鸡爪.jpg") },
  { id: '荤-牛肚', category: '荤', name: '牛肚', image: asset("dishes/荤/牛肚.webp") },
  { id: '荤-牛肉丸', category: '荤', name: '牛肉丸', image: asset("dishes/荤/牛肉丸.webp") },
  { id: '荤-生蚝', category: '荤', name: '生蚝', image: asset("dishes/荤/生蚝.webp") },
  { id: '荤-水晶包', category: '荤', name: '水晶包', image: asset("dishes/荤/水晶包.webp") },
  { id: '荤-午餐肉', category: '荤', name: '午餐肉', image: asset("dishes/荤/午餐肉.webp") },
  { id: '荤-虾', category: '荤', name: '虾', image: asset("dishes/荤/虾.webp") },
  { id: '荤-虾滑', category: '荤', name: '虾滑', image: asset("dishes/荤/虾滑.webp") },
  { id: '荤-虾球', category: '荤', name: '虾球', image: asset("dishes/荤/虾球.webp") },
  { id: '荤-小墨鱼', category: '荤', name: '小墨鱼', image: asset("dishes/荤/小墨鱼.webp") },
  { id: '荤-新鲜牛肉', category: '荤', name: '新鲜牛肉', image: asset("dishes/荤/新鲜牛肉.webp") },
  { id: '荤-鸭肠', category: '荤', name: '鸭肠', image: asset("dishes/荤/鸭肠.webp") },
  { id: '荤-鸭血', category: '荤', name: '鸭血', image: asset("dishes/荤/鸭血.webp") },
  { id: '荤-鸭胗', category: '荤', name: '鸭胗', image: asset("dishes/荤/鸭胗.webp") },
  { id: '荤-鱼豆腐', category: '荤', name: '鱼豆腐', image: asset("dishes/荤/鱼豆腐.webp") },
  { id: '荤-鱼丸', category: '荤', name: '鱼丸', image: asset("dishes/荤/鱼丸.webp") },
  { id: '素-冬瓜片', category: '素', name: '冬瓜片', image: asset("dishes/素/冬瓜片.webp") },
  { id: '素-豆泡', category: '素', name: '豆泡', image: asset("dishes/素/豆泡.webp") },
  { id: '素-粉丝', category: '素', name: '粉丝', image: asset("dishes/素/粉丝.webp") },
  { id: '素-腐竹', category: '素', name: '腐竹', image: asset("dishes/素/腐竹.webp") },
  { id: '素-贡菜', category: '素', name: '贡菜', image: asset("dishes/素/贡菜.webp") },
  { id: '素-海带丝', category: '素', name: '海带丝', image: asset("dishes/素/海带丝.webp") },
  { id: '素-年糕', category: '素', name: '年糕', image: asset("dishes/素/年糕.webp") },
  { id: '素-藕片', category: '素', name: '藕片', image: asset("dishes/素/藕片.webp") },
  { id: '素-时令蔬菜', category: '素', name: '时令蔬菜', image: asset("dishes/素/时令蔬菜.webp") },
  { id: '素-笋片', category: '素', name: '笋片', image: asset("dishes/素/笋片.webp") },
  { id: '素-土豆', category: '素', name: '土豆', image: asset("dishes/素/土豆.webp") },
  { id: '素-娃娃菜', category: '素', name: '娃娃菜', image: asset("dishes/素/娃娃菜.webp") },
  { id: '素-鲜豆腐', category: '素', name: '鲜豆腐', image: asset("dishes/素/鲜豆腐.webp") },
  { id: '素-香菇', category: '素', name: '香菇', image: asset("dishes/素/香菇.webp") },
  { id: '素-响铃卷', category: '素', name: '响铃卷', image: asset("dishes/素/响铃卷.webp") },
  { id: '素-血糯米', category: '素', name: '血糯米', image: asset("dishes/素/血糯米.webp") },
  { id: '素-玉米', category: '素', name: '玉米', image: asset("dishes/素/玉米.webp") },
]

export function dishesByCategory(category) {
  return DISHES.filter((d) => d.category === category)
}

export function findDish(id) {
  return DISHES.find((d) => d.id === id)
}