import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL || "";
console.log("🌱 Seeding Lokal database...");

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

async function main() {
  // Clean
  await prisma.message.deleteMany();
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.routeGuide.deleteMany();
  await prisma.routeImage.deleteMany();
  await prisma.travelRoute.deleteMany();
  await prisma.guideAvailability.deleteMany();
  await prisma.guideExpertise.deleteMany();
  await prisma.guideRegion.deleteMany();
  await prisma.guideLanguage.deleteMany();
  await prisma.guideProfile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const pwd = await bcrypt.hash("lokal123456", 12);

  // Users
  const admin = await prisma.user.create({
    data: { name: "Admin", email: "admin@lokalchina.com", password: pwd, role: "admin" },
  });
  const traveler = await prisma.user.create({
    data: { name: "Emma Wilson", email: "emma@example.com", password: pwd, role: "traveler", nationality: "USA" },
  });

  // ─── GUIDE 1: Jingdezhen Ceramic Artist ───
  const g1u = await prisma.user.create({
    data: { name: "Lin Yue", email: "linyue@lokalchina.com", password: pwd, role: "guide", phone: "+86-157-7983-0001" },
  });
  const guide1 = await prisma.guideProfile.create({
    data: {
      userId: g1u.id, slug: "lin-yue",
      bio: "Independent ceramic artist based in Jingdezhen for 12 years. Graduate of Jingdezhen Ceramic University, exhibited in Paris, Tokyo, and Sydney. I'll take you into the studios hidden in ancient kiln alleys, introduce you to master craftsmen who don't speak English, and help you create your own porcelain piece from raw clay to finished glaze.",
      bioEn: "Independent ceramic artist based in Jingdezhen for 12 years. Graduate of Jingdezhen Ceramic University, exhibited in Paris, Tokyo, and Sydney. I'll take you into the studios hidden in ancient kiln alleys, introduce you to master craftsmen who don't speak English, and help you create your own porcelain piece from raw clay to finished glaze.",
      bioZh: "景德镇独立陶艺家，驻地12年。景德镇陶瓷大学毕业，作品曾在巴黎、东京、悉尼展出。带你走进古窑弄堂里隐藏的工作室，认识不会说英语的大师工匠，亲手从泥巴到釉面完成一件属于你的瓷器。",
      yearsExperience: 12, dailyRate: 900, hourlyRate: 130, isVerified: true, isAvailable: true,
      guideLanguages: { create: [{ language: "zh", proficiency: "native" }, { language: "en", proficiency: "fluent" }, { language: "fr", proficiency: "conversational" }] },
      guideRegions: { create: [{ region: "jingdezhen" }, { region: "wuyuan" }] },
      guideExpertise: { create: [{ expertise: "ceramics" }, { expertise: "art" }, { expertise: "tea" }, { expertise: "photography" }] },
    },
  });

  // ─── GUIDE 2: Yiwu Sourcing Agent ───
  const g2u = await prisma.user.create({
    data: { name: "Chen Wei", email: "chenwei@lokalchina.com", password: pwd, role: "guide", phone: "+86-139-5790-0002" },
  });
  const guide2 = await prisma.guideProfile.create({
    data: {
      userId: g2u.id, slug: "chen-wei",
      bio: "10-year veteran sourcing agent in Yiwu. I've helped over 200 Amazon sellers, Shopify store owners, and independent brands find reliable suppliers. I speak factory owner's language — I know who's legit, who's not, and how to negotiate the best MOQ. From Yiwu small commodities to Yongkang hardware, I'll make sure you don't get scammed.",
      bioEn: "10-year veteran sourcing agent in Yiwu. I've helped over 200 Amazon sellers, Shopify store owners, and independent brands find reliable suppliers. I speak factory owner's language — I know who's legit, who's not, and how to negotiate the best MOQ. From Yiwu small commodities to Yongkang hardware, I'll make sure you don't get scammed.",
      bioZh: "义乌10年资深采购代理。帮助过200多位亚马逊卖家、独立站创业者和独立品牌找到靠谱供应商。我说工厂老板的语言——知道谁靠谱、谁不靠谱、怎么谈最低起订量。从义乌小商品到永康五金，确保你不踩坑。",
      yearsExperience: 10, dailyRate: 1200, hourlyRate: 180, isVerified: true, isAvailable: true,
      guideLanguages: { create: [{ language: "zh", proficiency: "native" }, { language: "en", proficiency: "fluent" }, { language: "es", proficiency: "conversational" }] },
      guideRegions: { create: [{ region: "yiwu" }, { region: "yongkang" }] },
      guideExpertise: { create: [{ expertise: "sourcing" }, { expertise: "negotiation" }, { expertise: "logistics" }, { expertise: "ecommerce" }] },
    },
  });

  // ─── GUIDE 3: Shanxi Heritage Expert ───
  const g3u = await prisma.user.create({
    data: { name: "Zhao Ming", email: "zhaoming@lokalchina.com", password: pwd, role: "guide", phone: "+86-135-0350-0003" },
  });
  const guide3 = await prisma.guideProfile.create({
    data: {
      userId: g3u.id, slug: "zhao-ming",
      bio: "Former archaeologist turned heritage guide. I worked on the excavation of the Yungang Grottoes and know every beam of Foguang Temple. Since Black Myth: Wukong launched, I've guided gamers, photographers, and history buffs to all 27 game-inspired locations across Shanxi. I don't just show you temples — I tell you what the game got right, and what it missed.",
      bioEn: "Former archaeologist turned heritage guide. I worked on the excavation of the Yungang Grottoes and know every beam of Foguang Temple. Since Black Myth: Wukong launched, I've guided gamers, photographers, and history buffs to all 27 game-inspired locations across Shanxi. I don't just show you temples — I tell you what the game got right, and what it missed.",
      bioZh: "前考古工作者转文化遗产向导。参与过云冈石窟发掘，对佛光寺每一根梁柱如数家珍。自《黑神话：悟空》发布以来，已带领游戏玩家、摄影师、历史爱好者走遍山西27个取景地。我不只是带你逛寺庙——我告诉你游戏里哪些是真实还原，哪些是艺术加工。",
      yearsExperience: 15, dailyRate: 850, hourlyRate: 120, isVerified: true, isAvailable: true,
      guideLanguages: { create: [{ language: "zh", proficiency: "native" }, { language: "en", proficiency: "fluent" }, { language: "ja", proficiency: "conversational" }] },
      guideRegions: { create: [{ region: "datong" }, { region: "shuozhou" }, { region: "xinzhou" }, { region: "linfen" }, { region: "jincheng" }] },
      guideExpertise: { create: [{ expertise: "history" }, { expertise: "architecture" }, { expertise: "photography" }, { expertise: "gaming" }] },
    },
  });

  // ═══════════ ROUTE 1: Jingdezhen + Wuyuan ═══════════
  const route1 = await prisma.travelRoute.create({
    data: {
      slug: "jingdezhen-wuyuan-ceramics",
      titleEn: "Jingdezhen & Wuyuan — Hands-on Ceramics & Aesthetics, 4 Days",
      titleZh: "景德镇+婺源——手作陶瓷与徽派美学，4日",
      destination: "jingdezhen",
      duration: 4,
      theme: "art",
      difficulty: "easy",
      pricePerPerson: 1990,
      currency: "USD",
      descriptionEn: "Immerse yourself in the world's porcelain capital. Get your hands dirty in a real ceramics studio, meet the international artists who've made Jingdezhen their home, explore ancient kiln sites, then unwind in Wuyuan's timeless Hui-style villages — the most photographed countryside in China.",
      descriptionZh: "沉浸在世界瓷都。在真实的陶艺工作室里亲手拉坯，认识定居景德镇的国际艺术家，探访千年古窑遗址，然后在婺源仿佛穿越时空的徽派古村落中放松身心——中国最美的乡村。",
      includedItems: ["Private ceramic artist guide (English-speaking, 4 full days)", "Studio clay & materials fee + kiln firing", "International shipping of your finished piece", "Transport Jingdezhen ↔ Wuyuan (private car)", "3 nights: 2 at Taoxichuan Hotel (David Chipperfield design) + 1 at Wuyuan Skywells (300-year-old mansion, Michelin-listed)", "Daily breakfast + 3 specialty lunches + 1 welcome dinner", "All museum & scenic area tickets"],
      excludedItems: ["International shipping of ceramics", "Dinners (guide recommendations provided)", "Personal expenses", "Travel insurance"],
      itinerary: [
        { day: 1, title: "Meet the Clay", description: "Morning: Tour the Ancient Kiln Folk Customs Museum, watch master artisans at work. Afternoon: Your first pottery wheel session — learn to center, pull, and shape. Evening: Welcome dinner at a local restaurant inside a renovated Ming-dynasty kiln.", meals: "Lunch, Dinner" },
        { day: 2, title: "Artists & Alleys", description: "Morning: Visit Taoxichuan Creative District, meet international resident artists in their studios. Afternoon: Explore Sanbao International Ceramic Village — hidden galleries, experimental kilns, and artisan teahouses. Try 'fingertip porcelain' — tiny pieces you paint and fire in 1 hour.", meals: "Breakfast, Lunch" },
        { day: 3, title: "Kiln Firing & Wuyuan Bound", description: "Morning: Load your glazed pieces into a traditional wood-fired kiln. While it fires, visit the Jingdezhen Ceramic Museum. Afternoon: Private transfer to Wuyuan (1.5h). Check into a restored 300-year-old Hui-style courtyard guesthouse. Evening walk through Likeng Village at golden hour.", meals: "Breakfast, Lunch" },
        { day: 4, title: "Wuyuan's Timeless Beauty", description: "Morning: Sunrise at Huangling Village — terraced fields, sun-drying crops, and misty mountains. Visit Rainbow Bridge, a Song Dynasty covered bridge. Afternoon: Transfer back to Jingdezhen. Pick up your fired ceramics (or arrange international shipping).", meals: "Breakfast, Lunch" },
      ],
      faqs: [
        { question: "Do I need any ceramics experience?", answer: "Zero experience required. Lin Yue is an expert teacher who has taught hundreds of beginners. You'll create something beautiful on day one." },
        { question: "Can I ship my ceramics home?", answer: "Yes! We arrange international shipping. Most pieces arrive within 2-4 weeks. Cost depends on size/weight." },
        { question: "Is this a group tour?", answer: "Absolutely not. This is a private experience — just you (and your companions) with Lin Yue. All pacing is flexible." },
      ],
      maxGroupSize: 4, isActive: true,
      routeGuides: { create: [{ guideProfileId: guide1.id, isFeatured: true }] },
    },
  });

  // ═══════════ ROUTE 2: Yiwu + Yongkang (5 DAYS) ═══════════
  const route2 = await prisma.travelRoute.create({
    data: {
      slug: "yiwu-yongkang-sourcing",
      titleEn: "Yiwu & Yongkang — The Sourcing Expedition, 5 Days",
      titleZh: "义乌+永康——深度寻源采购之旅，5日",
      destination: "yiwu",
      duration: 5,
      theme: "business",
      difficulty: "easy",
      pricePerPerson: 2490,
      currency: "USD",
      descriptionEn: "Five days inside the engine room of global e-commerce. With a veteran agent who's sourced for 200+ Amazon and DTC brands, you'll navigate 75,000+ booths, negotiate directly with factory owners, inspect production lines in Yongkang, and leave with vetted suppliers — not just business cards. No trading company middlemen, no hidden markups.",
      descriptionZh: "五天深入全球电商的引擎核心。由服务过200+亚马逊和DTC品牌的资深代理带队，穿越75,000+个摊位，与工厂老板直接谈判，深入永康产线验厂，带着经过验证的供应商名单离开——而不是一沓名片。没有贸易公司中间商，没有隐藏加价。",
      includedItems: [
        "Private sourcing agent guide (English-speaking, 5 full days)",
        "Pre-trip supplier matching (we research and vet 5-10 suppliers per category)",
        "4 nights hotel near Yiwu Trade City (Aishang Best or Borrman, 9.5+ rated)",
        "Airport pickup from Yiwu or Hangzhou",
        "Factory visit coordination & live interpretation",
        "Sample collection & consolidation service",
        "Logistics workshop (sea/air/rail freight, customs docs, FBA prep)",
        "4 lunches + 1 welcome dinner with strategy session",
        "Ongoing post-trip QC support for first reorder",
      ],
      excludedItems: [
        "Sample costs and shipping fees",
        "3 dinners (guide recommendations provided)",
        "Business visa fee (invitation letter provided free)",
        "Travel insurance",
        "International flights",
      ],
      itinerary: [
        { day: 1, title: "Market Orientation — The Lay of the Land", description: "Morning: Airport pickup. Orientation briefing over coffee — your product categories mapped to specific districts and booth numbers. Afternoon: Walk Districts 1-2 (jewelry, accessories, toys, home decor). Your guide handles all negotiation and translation. Learn the unwritten rules: which vendors to trust, how to spot a trading company posing as a factory. Evening: Welcome strategy dinner — review day's finds, plan tomorrow's targets.", meals: "Lunch, Dinner" },
        { day: 2, title: "Deep Dive — Your Product Categories", description: "Morning: Hit Districts 3-4 (electronics, office supplies, stationery, hardware). Visit pre-matched suppliers identified during our research phase. Afternoon: First factory visits — 2-3 pre-vetted factories outside the market. See production lines, verify quality control processes, negotiate pricing directly. Evening: Sample review session at the hotel. Your agent flags any quality concerns.", meals: "Breakfast, Lunch" },
        { day: 3, title: "Yongkang — The Hardware Capital", description: "Full day in Yongkang (40-min drive). Visit 2-3 factories producing kitchenware, stainless steel goods, power tools, or door hardware — depending on your category. These are the factories that supply major global brands. Direct pricing without Yiwu trading company markup (save 15-30%). Evening: Return to Yiwu. Free night to explore or rest.", meals: "Breakfast, Lunch" },
        { day: 4, title: "Negotiation & Verification", description: "Morning: Return to top-pick suppliers for second-round negotiations. Your agent pushes for best MOQs, payment terms, and production timelines. Afternoon: Visit any remaining category-specific districts. Learn to conduct your own quality inspections — your agent teaches you what to look for. Evening: Shortlist final suppliers.", meals: "Breakfast, Lunch" },
        { day: 5, title: "Deal Close & Logistics", description: "Morning: Final supplier meetings — close deals, sign agreements, collect formal quotations. Afternoon: Logistics deep-dive. Understand sea freight (20-45 days) vs rail (14-25 days) vs air (5-10 days). Customs documentation walkthrough. Amazon FBA labeling and prep requirements explained. Your agent consolidates all samples into one package. Airport or train station drop-off.", meals: "Breakfast, Lunch" },
      ],
      faqs: [
        { question: "Do I need a business visa?", answer: "An M (business) visa is strongly recommended. We provide a free official invitation letter from a registered Yiwu trade company. Processing usually takes 5-10 business days." },
        { question: "I've never sourced from China before. Is this for me?", answer: "Absolutely. This expedition is designed specifically for first-timers. Your guide has seen every rookie mistake and will protect you from scams, hidden markups, and quality bait-and-switches. You'll leave with confidence, not confusion." },
        { question: "What happens after the trip?", answer: "We don't disappear. Your agent remains available for post-trip QC support on your first reorder — we'll inspect the bulk production against your approved samples before shipment." },
        { question: "Can I combine this with a trip to Shanghai or Guangzhou?", answer: "Yes. Yiwu is 1.5h by high-speed train from Shanghai and 1h from Hangzhou. We can arrange add-on days in either city — just ask when booking." },
        { question: "What's the best season to come?", answer: "March-May and September-November are ideal. Avoid Chinese New Year (late Jan–mid Feb, market closed 2-3 weeks). The Yiwu Fair in October is the world's largest small commodities expo — hotel prices spike 2-3x, so book months ahead if you want fair dates." },
      ],
      maxGroupSize: 3, isActive: true,
      routeGuides: { create: [{ guideProfileId: guide2.id, isFeatured: true }] },
    },
  });

  // ═══════════ ROUTE 3: Shanxi Ancient Architecture ═══════════
  const route3 = await prisma.travelRoute.create({
    data: {
      slug: "shanxi-black-myth-pilgrimage",
      titleEn: "Shanxi — Black Myth: Wukong Ancient Architecture Pilgrimage, 6 Days",
      titleZh: "山西——《黑神话：悟空》古建朝圣之旅，6日",
      destination: "datong",
      duration: 6,
      theme: "history",
      difficulty: "moderate",
      pricePerPerson: 2490,
      currency: "USD",
      descriptionEn: "Follow the footsteps of the Destined One through 27 real-world locations that inspired Black Myth: Wukong. From the awe-inspiring Yungang Grottoes to the suspended sculptures of Xiaoxitian, this is the ultimate pilgrimage for gamers, photographers, and anyone who believes the best stories are carved in stone and wood.",
      descriptionZh: "追随天命人的足迹，穿越《黑神话：悟空》的27个真实取景地。从叹为观止的云冈石窟到小西天的悬塑绝唱，这是游戏玩家、摄影师和所有相信最好的故事刻在石头与木头中的人的终极朝圣之旅。",
      includedItems: ["Former archaeologist guide (English-speaking)", "Private vehicle for all transfers", "Entrance fees to all sites", "5 nights accommodation (mix of boutique & local)", "Daily breakfast + 4 local specialty meals", "Custom Black Myth location map & photo guidebook"],
      excludedItems: ["Flights to Datong / from Yuncheng", "Dinners (except 4 included)", "Personal expenses", "Travel insurance"],
      itinerary: [
        { day: 1, title: "Datong — Where it Begins", description: "Morning: Arrive Datong. Visit Yungang Grottoes (UNESCO, 45 major caves, 59,000+ Buddhas) — featured in Chapter 1. Afternoon: Huayan Temple and Shanhua Temple, two Liao/Jin masterpieces. Evening: Datong's ancient city wall at sunset. Welcome dinner with Shanxi knife-cut noodles.", meals: "Lunch, Dinner" },
        { day: 2, title: "Hanging Temple & Wooden Pagoda", description: "Morning: Xuankong Temple (Hanging Temple) — a 1,500-year-old temple built into a sheer cliff face, directly referenced in the game's New West. Afternoon: Yingxian Wooden Pagoda, world's oldest & tallest pure wooden structure (built 1056), featured in Chapter 2 opening cinematic.", meals: "Breakfast, Lunch" },
        { day: 3, title: "Foguang Temple — Tang Dynasty Glory", description: "Morning: Drive to Foguang Temple on Mount Wutai — one of only three surviving Tang Dynasty wooden buildings in China. Its Great East Hall (built 857 AD) is the game's inspiration for the ancient temple levels. Afternoon: Nanchan Temple, another Tang survival. Stay at a monastery guesthouse.", meals: "Breakfast, Lunch, Dinner" },
        { day: 4, title: "Xiaoxitian — The Floating Sculptures", description: "Full-day drive to Linfen. Visit Xiaoxitian Temple — the game's floating statues come directly from its 1,900+ suspended clay sculptures (built 1634). This is the most photographed Black Myth location. Golden hour photography session.", meals: "Breakfast, Lunch" },
        { day: 5, title: "Jincheng — 28 Constellations", description: "Morning: Yuhuang Temple — home to the 28 Constellation God sculptures, some of the finest Yuan Dynasty painted clay works in existence. The game's 'Twenty-Eight Mansions' level directly references these. Afternoon: Qinglian Temple and its Tang Dynasty Buddha Hall.", meals: "Breakfast, Lunch, Dinner" },
        { day: 6, title: "Yongle Palace & Farewell", description: "Morning: Yongle Palace in Ruicheng — Yuan Dynasty Taoist murals covering 1,000+ square meters, rivaling Dunhuang in scale and preservation. A fitting finale. Afternoon: Transfer to Yuncheng Airport for departure.", meals: "Breakfast, Lunch" },
      ],
      faqs: [
        { question: "Do I need to have played Black Myth: Wukong?", answer: "Not at all! While gamers will enjoy the Easter eggs, the architectural and historical value of these sites stands on its own. Many of our guests are purely architecture/history enthusiasts." },
        { question: "How much walking/hiking is involved?", answer: "Moderate. 8,000-15,000 steps daily. Some temples are on mountainsides with stairs. Comfortable walking shoes are essential. We can adjust the pace." },
        { question: "What's the best season?", answer: "April-May and September-October are ideal — mild temperatures, clear skies for photography. Avoid Chinese National Day (Oct 1-7) when sites get crowded." },
      ],
      maxGroupSize: 6, isActive: true,
      routeGuides: { create: [{ guideProfileId: guide3.id, isFeatured: true }] },
    },
  });

  // Add images
  const routeImages: Array<[string, string[]]> = [
    [route1.id, [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=800&fit=crop",
    ]],
    [route2.id, [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200&h=800&fit=crop",
    ]],
    [route3.id, [
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&h=800&fit=crop",
    ]],
  ];
  for (const [routeId, images] of routeImages) {
    for (let i = 0; i < images.length; i++) {
      await prisma.routeImage.create({
        data: { routeId, url: images[i], altEn: `Image ${i + 1}`, altZh: `图片 ${i + 1}`, order: i, isCover: i === 0 },
      });
    }
  }

  // Sample review
  const sampleBooking = await prisma.booking.create({
    data: {
      userId: traveler.id, routeId: route1.id, guideProfileId: guide1.id, status: "completed",
      startDate: new Date("2026-04-10"), endDate: new Date("2026-04-13"),
      numberOfTravelers: 2, totalPrice: 7200,
      travelerInfo: { name: "Emma Wilson", email: "emma@example.com", nationality: "USA" },
    },
  });
  await prisma.review.create({
    data: {
      userId: traveler.id, routeId: route1.id, guideProfileId: guide1.id, bookingId: sampleBooking.id,
      rating: 5, title: "I made my own porcelain! Unforgettable.",
      content: "Lin Yue is a treasure. She took us to studios I'd never have found on my own — we watched a 70-year-old master throw porcelain so thin it glowed. I glazed a tea bowl and she shipped it to my home in California. It arrived perfectly. Wuyuan was the perfect contrast — so peaceful after the creative energy of Jingdezhen.",
    },
  });

  console.log("✅ Lokal seed complete!");
  console.log("   admin@lokalchina.com / lokal123456");
  console.log("   emma@example.com / lokal123456");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
