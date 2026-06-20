export const APP_NAME = "LokalChina";

export const DESTINATIONS = [
  { value: "jingdezhen", labelEn: "Jingdezhen", labelZh: "景德镇" },
  { value: "wuyuan", labelEn: "Wuyuan", labelZh: "婺源" },
  { value: "yiwu", labelEn: "Yiwu", labelZh: "义乌" },
  { value: "yongkang", labelEn: "Yongkang", labelZh: "永康" },
  { value: "datong", labelEn: "Datong", labelZh: "大同" },
  { value: "shuozhou", labelEn: "Shuozhou", labelZh: "朔州" },
  { value: "xinzhou", labelEn: "Xinzhou", labelZh: "忻州" },
  { value: "linfen", labelEn: "Linfen", labelZh: "临汾" },
  { value: "jincheng", labelEn: "Jincheng", labelZh: "晋城" },
  { value: "yuncheng", labelEn: "Yuncheng", labelZh: "运城" },
] as const;

export const THEMES = [
  { value: "art", labelEn: "Art & Craft", labelZh: "手工艺" },
  { value: "business", labelEn: "Sourcing & Business", labelZh: "寻源采购" },
  { value: "history", labelEn: "History & Architecture", labelZh: "古建历史" },
  { value: "food", labelEn: "Food & Culinary", labelZh: "美食" },
  { value: "nature", labelEn: "Nature", labelZh: "自然风光" },
  { value: "photography", labelEn: "Photography", labelZh: "摄影" },
  { value: "culture", labelEn: "Culture", labelZh: "文化" },
] as const;

export const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "zh", label: "中文" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "es", label: "Español" },
] as const;

export const EXPERTISE_AREAS = [
  "ceramics",
  "art",
  "sourcing",
  "negotiation",
  "logistics",
  "ecommerce",
  "history",
  "architecture",
  "photography",
  "gaming",
  "tea",
  "food",
] as const;

export const REGIONS = DESTINATIONS;

export const BOOKING_STATUSES = [
  "pending", "confirmed", "paid", "in_progress", "completed", "cancelled",
] as const;

export const CURRENCY = "USD";
export const CURRENCY_SYMBOL = "$";
