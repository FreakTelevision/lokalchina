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
      pricePerPerson: 3600,
      currency: "CNY",
      descriptionEn: "Immerse yourself in the world's porcelain capital. Get your hands dirty in a real ceramics studio, meet the international artists who've made Jingdezhen their home, explore ancient kiln sites, then unwind in Wuyuan's timeless Hui-style villages — the most photographed countryside in China.",
      descriptionZh: "沉浸在世界瓷都。在真实的陶艺工作室里亲手拉坯，认识定居景德镇的国际艺术家，探访千年古窑遗址，然后在婺源仿佛穿越时空的徽派古村落中放松身心——中国最美的乡村。",
      includedItems: ["Private ceramic artist guide (English-speaking)", "Studio clay & materials fee", "Kiln firing of your piece (shipped to your home)", "Transport Jingdezhen ↔ Wuyuan", "2 nights boutique hotel, 1 night village guesthouse", "Daily breakfast + 3 specialty lunches"],
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

  // ═══════════ ROUTE 2: Yiwu + Yongkang ═══════════
  const route2 = await prisma.travelRoute.create({
    data: {
      slug: "yiwu-yongkang-sourcing",
      titleEn: "Yiwu & Yongkang — Ultimate Sourcing Expedition, 3 Days",
      titleZh: "义乌+永康——终极寻源采购之旅，3日",
      destination: "yiwu",
      duration: 3,
      theme: "business",
      difficulty: "easy",
      pricePerPerson: 3600,
      currency: "CNY",
      descriptionEn: "Go deep into the world's largest wholesale market with a pro who's sourced for 200+ businesses. Visit the right districts for your product, negotiate face-to-face with factory owners, inspect samples, and understand shipping logistics. Plus: Yongkang, the hardware capital that supplies global kitchenware brands.",
      descriptionZh: "深入全球最大的批发市场，由服务过200+企业的专业采购代理带队。直达适合你产品的正确展区，与工厂老板面对面谈判，验货验样，了解物流通路。外加：永康——全球厨具/五金品牌的供应基地。",
      includedItems: ["Private sourcing agent guide (English-speaking)", "Pre-trip supplier matching (we research before you arrive)", "Factory visit coordination & interpretation", "Sample collection & consolidation service", "Airport pickup & hotel transfer", "Daily lunch with supplier meetings"],
      excludedItems: ["Hotel accommodation", "Dinners", "Sample/shipping costs", "Business visa fee (invitation letter provided)", "Travel insurance"],
      itinerary: [
        { day: 1, title: "Yiwu Market Mastery", description: "Morning: Orientation briefing — your product categories mapped to specific market districts. Visit Districts 1-2 (jewelry, toys, accessories, home decor). Your guide handles all translation and price negotiation. Evening: Strategy dinner to review samples and plan Day 2.", meals: "Lunch, Dinner" },
        { day: 2, title: "Deep Sourcing & Factories", description: "Morning: Continue Yiwu Districts 3-4 (electronics, office supplies, hardware). Afternoon: Visit 2-3 pre-matched factories outside the market for direct pricing. Learn how to verify quality, negotiate MOQs, and avoid common scams.", meals: "Lunch" },
        { day: 3, title: "Yongkang & Logistics", description: "Morning: Transfer to Yongkang (40min) — visit kitchenware and hardware factories that supply major global brands. Afternoon: Logistics workshop — understand sea/air/rail freight options, customs documentation, and Amazon FBA prep. Drop-off at Yiwu Airport or train station.", meals: "Lunch" },
      ],
      faqs: [
        { question: "Do I need a business visa?", answer: "An M (business) visa is recommended. We provide an official invitation letter from a registered Yiwu trade company to support your application." },
        { question: "Can you help with shipping?", answer: "Yes, our logistics partners handle sea, air, and rail freight. We can also coordinate Amazon FBA labeling and prep." },
        { question: "What if I don't know what I want to source?", answer: "That's normal. During pre-trip matching, we'll help you narrow down categories based on your business model and market." },
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
      pricePerPerson: 5100,
      currency: "CNY",
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
