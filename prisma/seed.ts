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

  // ═══════════ ROUTE 1: Jingdezhen (3 DAYS, CERAMICS ONLY) ═══════════
  const route1 = await prisma.travelRoute.create({
    data: {
      slug: "jingdezhen-ceramics",
      titleEn: "Jingdezhen — Hands-on Ceramics & Kiln Heritage, 4 Days",
      titleZh: "景德镇——手作陶瓷与千年窑火，4日",
      destination: "jingdezhen",
      duration: 4,
      theme: "art",
      difficulty: "easy",
      pricePerPerson: 1694,
      currency: "USD",
      descriptionEn: "Four immersive days in the world's porcelain capital. Get your hands dirty in a real ceramics studio, meet the international artists who've made Jingdezhen their home, fire your own piece in a traditional wood kiln, and explore 1,000 years of ceramic heritage — all with a bilingual ceramic artist as your private guide.",
      descriptionZh: "四天沉浸世界瓷都。在真实陶艺工作室亲手拉坯，拜访定居景德镇的国际艺术家，在传统木窑中烧制自己的作品，探索千年陶瓷遗产——由双语陶艺家全程私享导览。",
      includedItems: ["Private ceramic artist guide (English-speaking, 4 full days)", "Studio clay & materials fee + kiln firing", "International shipping of your finished piece", "3 nights at Taoxichuan Hotel (David Chipperfield design)", "Daily breakfast + 3 specialty lunches + 1 welcome dinner", "All museum & workshop entry fees"],
      excludedItems: ["International shipping of ceramics (approx. $40-80 depending on size)", "2 dinners (guide recommendations provided)", "Personal expenses", "Travel insurance"],
      itinerary: [
        { day: 1, title: "Meet the Clay", description: "Morning: Tour the Ancient Kiln Folk Customs Museum, watch master artisans throw porcelain at the wheel. Afternoon: Your first pottery session — learn to center, pull, and shape your own piece. Evening: Welcome dinner inside a renovated Ming-dynasty kiln restaurant.", meals: "Lunch, Dinner" },
        { day: 2, title: "Artists & Alleys", description: "Morning: Visit Taoxichuan Creative District, meet international resident artists in their private studios. Afternoon: Explore Sanbao International Ceramic Village — hidden galleries, experimental kilns, artisan teahouses. Try fingertip porcelain painting. Evening: Free to explore the night market.", meals: "Breakfast, Lunch" },
        { day: 3, title: "Glaze & Fire", description: "Morning: Second pottery session — refine your technique, apply glazes, and decorate your piece with traditional blue-and-white patterns. Afternoon: Load your work into a traditional wood-fired kiln. Visit the Jingdezhen Ceramic Museum while it fires. Evening: Dinner at a legendary local restaurant.", meals: "Breakfast, Lunch" },
        { day: 4, title: "The Master's Touch", description: "Morning: Visit a master artisan's private studio — see museum-grade porcelain being made, learn to distinguish authentic craftsmanship. Pick up your fired piece from the kiln. Afternoon: Walk the old kiln alleys, last-chance ceramic shopping with your guide's expert eye. Transfer to airport or train station.", meals: "Breakfast, Lunch" },
      ],
      faqs: [
        { question: "Do I need any ceramics experience?", answer: "Zero experience required. Lin Yue has taught hundreds of beginners. You'll create something beautiful on day one — guaranteed." },
        { question: "Can I ship my ceramics home?", answer: "Yes! We arrange international shipping. Most pieces arrive within 2-4 weeks. Cost depends on size and weight (typically $40-80)." },
        { question: "How should I get to Jingdezhen?", answer: "High-speed trains from Shanghai (4h), Hangzhou (2.5h), or fly into Jingdezhen Luojia Airport (JDZ). We'll pick you up from either." },
      ],
      maxGroupSize: 4, isActive: true,
      routeGuides: { create: [{ guideProfileId: guide1.id, isFeatured: true }] },
    },
  });

  // ═══════════ ROUTE 2: Zhejiang Supply Chain Expedition (5 DAYS) ═══════════
  const route2 = await prisma.travelRoute.create({
    data: {
      slug: "yiwu-yongkang-sourcing",
      titleEn: "Zhejiang — The Supply Chain Expedition, 5 Days",
      titleZh: "浙江——供应链远征之旅，5日",
      destination: "yiwu",
      duration: 5,
      theme: "business",
      difficulty: "easy",
      pricePerPerson: 2360,
      currency: "USD",
      descriptionEn: "Your personal sourcing mission across Zhejiang's manufacturing heartland — not a cookie-cutter tour. Before you fly, we vet suppliers matched to your exact product needs. During your stay, our veteran agent guides you through Yiwu's 75,000+ booths and escorts you to handpicked factories in the cities that matter to YOUR business — Yongkang for hardware, Zhuji for socks, Shaoxing for textiles, or wherever your supply chain leads. After you leave, we stay: inspecting your bulk production to ensure what ships matches what you approved. No bait-and-switch. No hidden markups. Just vetted suppliers and verified quality.",
      descriptionZh: "你的专属浙江制造业腹地采购任务——不是千篇一律的旅行团。出发前，我们根据你的产品需求精准筛选供应商。行程中，资深代理带你穿越义乌75,000+个摊位，陪同探访你所在行业的关键制造城市——永康五金、诸暨袜业、绍兴纺织，或你的供应链指向的任何地方。离境后我们仍在：检查你的大货生产，确保发出的货和你确认的样品一致。没有偷工减料，没有隐藏加价。",
      includedItems: [
        "Private sourcing agent guide (English-speaking, 5 full days)",
        "★ Pre-trip supplier matching: We research and vet 5-10 suppliers per product category before you arrive — no wasted time",
        "★ Post-trip QC inspection: Your agent inspects bulk production against approved samples before shipment — guaranteed consistency",
        "4 nights hotel near Yiwu Trade City (Aishang Best or Borrman, 9.5+ rated)",
        "Airport pickup from Yiwu or Hangzhou",
        "Customized factory visits to 2-3 manufacturing cities based on your product needs (Yongkang, Zhuji, Shaoxing, Taizhou, Ningbo — you choose)",
        "Live interpretation at every factory and negotiation",
        "Sample collection & consolidation service",
        "Logistics workshop (sea/air/rail freight, customs docs, Amazon FBA prep)",
        "4 lunches + 1 welcome strategy dinner",
      ],
      excludedItems: [
        "Sample costs and shipping fees",
        "3 dinners (guide recommendations provided)",
        "Business visa fee (invitation letter provided free)",
        "Travel insurance",
        "International flights",
      ],
      itinerary: [
        { day: 1, title: "Market Immersion — The Lay of the Land", description: "Morning: Airport pickup. Strategy briefing over coffee — your product categories mapped to specific Yiwu districts and pre-vetted supplier list reviewed. Afternoon: Walk the market with your guide, who handles all translation and negotiation. Learn to spot trading companies posing as factories, understand the unwritten rules of price signaling. Evening: Welcome dinner — review Day 1 finds, finalize which manufacturing cities to visit based on your product interests.", meals: "Lunch, Dinner" },
        { day: 2, title: "Factory Day 1 — Your Chosen Manufacturing Cluster", description: "Full-day excursion to your primary manufacturing city. Your guide has pre-arranged 2-3 factory visits based on pre-trip research. Options include: Yongkang (hardware, kitchenware, tools), Zhuji (socks, hosiery), Shaoxing Keqiao (textiles, fabrics), Taizhou Huangyan (plastics, molds), or Ningbo (appliances, stationery). See production lines, verify QC processes, negotiate factory-direct pricing. Evening: Return to Yiwu.", meals: "Breakfast, Lunch" },
        { day: 3, title: "Factory Day 2 — Second Cluster or Deep Dive", description: "Visit your second chosen manufacturing cluster, or return to the first for additional suppliers. By now you'll have a clear sense of factory capability and pricing benchmarks. Your agent provides real-time comparison analysis — which supplier offers the best quality-to-price ratio for YOUR business model. Evening: Sample review session. Your agent consolidates all samples and flags any quality concerns.", meals: "Breakfast, Lunch" },
        { day: 4, title: "Negotiation & Verification — Back at Yiwu", description: "Morning: Second-round negotiations with top-pick suppliers. Your agent pushes for best MOQs, payment terms, and production timelines. Afternoon: Visit any remaining Yiwu districts relevant to your product mix. Learn to conduct your own quality inspections — your agent teaches you the red flags. Evening: Shortlist final suppliers for each category.", meals: "Breakfast, Lunch" },
        { day: 5, title: "Deal Close, Logistics & Your Post-Trip Shield", description: "Morning: Final supplier meetings — close deals, sign agreements with QC clauses your agent insists on. Afternoon: Logistics deep-dive. Sea freight (20-45 days) vs rail (14-25 days) vs air (5-10 days). Customs documentation. Amazon FBA labeling requirements. Your agent explains how the post-trip QC works: when you reorder, we'll inspect before shipping. Airport or train station drop-off. You leave with vetted suppliers — and a QC safety net.", meals: "Breakfast, Lunch" },
      ],
      faqs: [
        { question: "How does pre-trip supplier matching work?", answer: "After booking, we send you a detailed questionnaire about your product interests. Our guide researches and vets 5-10 suppliers per category before you arrive — checking their export licenses, factory certifications, and client references. You land with a shortlist, not a blank slate." },
        { question: "What happens after I return home?", answer: "This is where we earn our reputation. When you place a reorder, we inspect the bulk production against your approved samples BEFORE shipping. If anything doesn't match — wrong materials, inferior stitching, different dimensions — we catch it and resolve it before it leaves China. You never pay for substandard goods." },
        { question: "Can I visit factories beyond Yongkang?", answer: "Absolutely. Our route is fully flexible. Tell us your product categories and we build the itinerary around YOUR supply chain. Popular combinations include Yiwu + Yongkang (hardware), Yiwu + Zhuji (socks/hosiery), Yiwu + Shaoxing (textiles), and Yiwu + Taizhou (plastics/molds). We can reach most Zhejiang manufacturing clusters within 2 hours." },
        { question: "I've never sourced from China. Is this safe?", answer: "This expedition is designed specifically for first-timers. Your guide has seen every scam in the book — bait-and-switch samples, hidden markups, fake factory certifications. They protect you at every step. Plus, the post-trip QC means even after you leave, someone is watching your back." },
        { question: "What's the best time to come?", answer: "March-May and September-November are ideal. Avoid Chinese New Year (late Jan–mid Feb, market closed 2-3 weeks). The Yiwu Fair in October is the world's largest small commodities expo — hotel prices spike 2-3x, so book months ahead." },
      ],
      maxGroupSize: 3, isActive: true,
      routeGuides: { create: [{ guideProfileId: guide2.id, isFeatured: true }] },
    },
  });

  // ═══════════ ROUTE 3: Shanxi Ancient Architecture (RESEARCH-BASED 6-DAY ITINERARY) ═══════════
  const route3 = await prisma.travelRoute.create({
    data: {
      slug: "shanxi-black-myth-pilgrimage",
      titleEn: "Shanxi — Black Myth: Wukong Architecture Pilgrimage, 6 Days",
      titleZh: "山西——《黑神话：悟空》古建朝圣之旅，6日",
      destination: "shanxi",
      duration: 6,
      theme: "history",
      difficulty: "moderate",
      pricePerPerson: 1660,
      currency: "USD",
      descriptionEn: "Follow the Destined One through 1,500 years of Chinese sacred architecture. This 6-day curated route covers 10 hand-picked S-tier sites — from the colossal Buddhas of Yungang to the floating sculptures of Xiaoxitian — not all 27 game locations (that takes 12+ days). Led by a former archaeologist who has played the game and studied every beam of every temple.",
      descriptionZh: "追随天命人穿越1500年的中国古建圣地。这条6天精选路线涵盖10个S级核心取景地——从云冈巨佛到小西天悬塑——并非全部27个地点（全部走完需12天以上）。由既玩过游戏又研究过中国建筑史的前考古学家带队。",
      includedItems: [
        "Former archaeologist guide (English-speaking, 6 full days)",
        "Private SUV with driver (all fuel, tolls, parking, driver lodging included)",
        "5 nights: boutique courtyard hotels (Jing's Residence Pingyao, Yunzhong Courtyard Datong) + Kempinski Taiyuan",
        "All 10 site entry tickets (Yungang, Huayan, Shanhua, Hanging Temple, Yingxian Pagoda, Foguang, Nanchan, Jinci, Shuanglin, Guangsheng, Xiaoxitian, Yongle Palace, Guandi Temple)",
        "Hanging Temple climbing ticket (pre-booked 7 days ahead — we handle it)",
        "Daily breakfast, 6 lunches, 3 specialty dinners (Datong knife-cut noodles, Pingyao beef, Linfen feast)",
        "Custom Black Myth location map with side-by-side game-to-reality comparison booklet",
        "Airport pickup (Datong) and drop-off (Yuncheng)",
      ],
      excludedItems: [
        "Flights to Datong / from Yuncheng (we recommend flying into Beijing, then 2h high-speed train to Datong)",
        "3 dinners (your guide will recommend the best local spots)",
        "Travel insurance",
        "Personal expenses",
      ],
      itinerary: [
        { day: 1, title: "Datong — The Northern Wei Gateway", description: "Morning: Yungang Grottoes (UNESCO, 51,000+ statues, Chapter 1 backdrop). Morning light is best for Cave 20's colossal Buddha. Afternoon: Huayan Temple (Liao Dynasty, 1038 AD — largest wooden Buddhist shrine in China) + Shanhua Temple (Liao/Jin subtle masterpiece). Evening: Datong Ancient City wall at sunset. Welcome dinner with authentic Shanxi knife-cut noodles.", meals: "Lunch, Dinner" },
        { day: 2, title: "The Cliff & The Pagoda", description: "Morning: Hanging Temple (Xuankong Si, 491 AD) — the only temple integrating Buddhism, Taoism and Confucianism on a sheer cliff face. Game trailer icon. Climbing tickets pre-booked by us 7 days ahead. Afternoon: Yingxian Wooden Pagoda (Liao Dynasty, 1056 AD) — world's tallest all-wood pagoda, 67m, zero nails. Afternoon sunlight on the pagoda is photography gold. Drive to Wutai area for overnight.", meals: "Breakfast, Lunch" },
        { day: 3, title: "Tang Dynasty Glory — Foguang & Nanchan", description: "Morning: Foguang Temple (Tang Dynasty, 857 AD) — Liang Sicheng's 'First National Treasure of China.' The Great East Hall is China's largest surviving Tang wooden structure, directly referenced in the game's ancient temple levels. Afternoon: Nanchan Temple (Tang Dynasty, 782 AD) — China's oldest surviving wooden building. Intimate, exquisite Tang sculptures. Afternoon: Drive to Taiyuan. Overnight at Kempinski Taiyuan.", meals: "Breakfast, Lunch, Dinner" },
        { day: 4, title: "The Sculpture Kingdom — Taiyuan to Pingyao", description: "Morning: Jinci Temple (Song Dynasty, 1023 AD) — the 'Museum of Ancient Chinese Architecture.' Famous wooden dragon columns and the 'Never-Aging Spring.' Afternoon: Shuanglin Temple — 2,000+ painted clay sculptures known as the 'Oriental Colored Sculpture Treasury.' Game's sculptural aesthetics directly inspired here. Evening: Check into Jing's Residence, a restored Qing Dynasty silk merchant mansion. Walk Pingyao Ancient City (UNESCO World Heritage).", meals: "Breakfast, Lunch" },
        { day: 5, title: "The Deep South — Glazed Rainbow & Floating Buddhas", description: "Morning: Guangsheng Temple (Hongtong) — the Feihong 'Flying Rainbow' Glazed Pagoda. 47m of multicolored glazed tiles, Upper + Lower Temples + Water God Temple with Yuan Dynasty murals. Afternoon sun makes the tiles sparkle. Afternoon: Xiaoxitian (Xixian County, 1634 AD) — THE single most photographed game-to-reality location. Over 1,000 miniature Buddha figures suspended from the ceiling in the Mahavira Hall. This is why you came.", meals: "Breakfast, Lunch, Dinner" },
        { day: 6, title: "Yuncheng Finale — Murals & the Warrior God", description: "Morning: Feiyun Tower (Dongyue Temple) — 'China's Number One Wooden Tower.' 345 dougong bracket sets, 32 styles, zero nails. Morning light is best. Midday: Yongle Palace (Yuan Dynasty, 1247 AD) — the 'Dunhuang of mural art.' The Chaoyuan Tu mural with 286 deities is a world masterpiece of religious art. Afternoon: Guandi Temple — largest Guan Yu temple in China, game boss arena inspiration. Transfer to Yuncheng Airport for departure.", meals: "Breakfast, Lunch" },
      ],
      faqs: [
        { question: "Do I need to have played Black Myth: Wukong?", answer: "Not at all! While gamers love the Easter eggs and our guide's behind-the-scenes game insights, the architectural and historical significance of these sites stands entirely on its own. About half our guests are pure architecture enthusiasts." },
        { question: "Which group size gives the best value?", answer: "Our pricing adjusts by group size: solo travelers pay $4,630, couples pay $2,523/person, groups of 3 pay $1,821/person, and groups of 4 pay $1,470/person. The sweet spot is 2-3 travelers — you share guide and vehicle costs while maintaining an intimate experience." },
        { question: "What if Hanging Temple climbing tickets sell out?", answer: "We pre-book 7 days ahead and have a backup plan: Yong'an Temple + Jueshan Temple (both Liao Dynasty, both game-featured, both equally stunning). In peak summer we recommend booking 2+ weeks ahead." },
        { question: "When is the best time to go?", answer: "April-May (spring blooms, ideal temps) and September-October (autumn colors, golden light). Avoid July-August (peak heat + crowds) and December-February (extreme cold, some sites on winter hours). National Day week (Oct 1-7) is mass tourism — we don't operate during that week." },
        { question: "Do I need a visa?", answer: "EU/UK/Japan/Korea/Australia citizens: visa-free for 30 days. US/Canada citizens: use the 240-hour transit policy — fly US→China→Japan/Korea and you don't need a visa. Our 6-day itinerary fits perfectly within the 10-day transit window." },
        { question: "Is this route physically demanding?", answer: "Moderate. 8,000-15,000 steps daily. Hanging Temple involves steep stairs and narrow walkways (ground-level viewing available as alternative). Most temples have uneven stone courtyards and steps without handrails. Comfortable walking shoes essential. We offer a 'gentle pace' version upon request." },
      ],
      maxGroupSize: 4, isActive: true,
      routeGuides: { create: [{ guideProfileId: guide3.id, isFeatured: true }] },
    },
  });

  // Add images
  const routeImages: Array<[string, string[]]> = [
    [route1.id, [
      "/images/routes/jingdezhen/ceramics-1.jpg",
      "/images/routes/jingdezhen/ceramics-2.jpg",
      "/images/routes/jingdezhen/ceramics-3.jpg",
    ]],
    [route2.id, [
      "/images/routes/yiwu/factory-1.jpg",
      "/images/routes/yiwu/original-yiwu-hub.jpg",
      "/images/routes/yiwu/factory-3.jpg",
    ]],
    [route3.id, [
      "/images/pexels-lwr1999-38098072_2.jpg",
      "/images/pexels-neko-170431012-32762553.jpg",
      "/images/pexels-king-siberia-1123639-2247216.jpg",
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
