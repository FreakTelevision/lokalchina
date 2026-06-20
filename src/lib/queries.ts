import { prisma } from "@/lib/db";
import type { Prisma } from "@prisma/client";

export type RouteFilters = {
  destination?: string;
  theme?: string;
  durationMin?: number;
  durationMax?: number;
  search?: string;
  sort?: "price_asc" | "price_desc" | "duration_asc" | "duration_desc";
  page?: number;
  pageSize?: number;
};

export async function getRoutes(filters: RouteFilters) {
  const {
    destination,
    theme,
    durationMin,
    durationMax,
    search,
    sort = "price_asc",
    page = 1,
    pageSize = 12,
  } = filters;

  const where: Prisma.TravelRouteWhereInput = {
    isActive: true,
    ...(destination && { destination }),
    ...(theme && { theme }),
    ...(durationMin !== undefined && { duration: { gte: durationMin } }),
    ...(durationMax !== undefined && {
      duration: { ...((durationMin !== undefined ? { gte: durationMin } : {}) as Record<string, number>), lte: durationMax },
    }),
    ...(search && {
      OR: [
        { titleEn: { contains: search, mode: "insensitive" } },
        { titleZh: { contains: search, mode: "insensitive" } },
        { descriptionEn: { contains: search, mode: "insensitive" } },
        { descriptionZh: { contains: search, mode: "insensitive" } },
        { destination: { contains: search, mode: "insensitive" } },
      ],
    }),
  };

  const orderBy: Prisma.TravelRouteOrderByWithRelationInput =
    sort === "price_desc"
      ? { pricePerPerson: "desc" }
      : sort === "duration_asc"
        ? { duration: "asc" }
        : sort === "duration_desc"
          ? { duration: "desc" }
          : { pricePerPerson: "asc" };

  const [routes, totalCount] = await Promise.all([
    prisma.travelRoute.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        images: { orderBy: { order: "asc" }, take: 1 },
        reviews: { select: { rating: true } },
        routeGuides: {
          include: {
            guideProfile: {
              select: {
                id: true,
                slug: true,
                dailyRate: true,
                isVerified: true,
                user: { select: { name: true, image: true } },
              },
            },
          },
        },
      },
    }),
    prisma.travelRoute.count({ where }),
  ]);

  const routesWithMeta = routes.map((route) => {
    const ratings = route.reviews.map((r) => r.rating);
    const avgRating =
      ratings.length > 0
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : 0;
    return {
      ...route,
      averageRating: Math.round(avgRating * 10) / 10,
      reviewCount: ratings.length,
      coverImage: route.images[0] || null,
      pricePerPerson: Number(route.pricePerPerson),
    };
  });

  return {
    routes: routesWithMeta,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
}

export async function getRouteBySlug(slug: string) {
  const route = await prisma.travelRoute.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { order: "asc" } },
      reviews: {
        include: {
          user: { select: { name: true, image: true } },
        },
        orderBy: { createdAt: "desc" },
      },
      routeGuides: {
        include: {
          guideProfile: {
            include: {
              user: { select: { name: true, image: true } },
              guideLanguages: true,
              guideExpertise: true,
              reviews: { select: { rating: true } },
            },
          },
        },
      },
    },
  });

  if (!route) return null;

  const ratings = route.reviews.map((r) => r.rating);
  const avgRating =
    ratings.length > 0
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : 0;

  return {
    ...route,
    averageRating: Math.round(avgRating * 10) / 10,
    reviewCount: ratings.length,
    pricePerPerson: Number(route.pricePerPerson),
    includedItems: route.includedItems as string[],
    excludedItems: route.excludedItems as string[],
    itinerary: route.itinerary as Array<{
      day: number;
      title: string;
      description: string;
      meals: string;
    }>,
    faqs: (route.faqs as Array<{ question: string; answer: string }>) || [],
    guides: route.routeGuides.map((rg) => {
      const gRatings = rg.guideProfile.reviews.map((r) => r.rating);
      const gAvgRating =
        gRatings.length > 0
          ? gRatings.reduce((a, b) => a + b, 0) / gRatings.length
          : 0;
      return {
        id: rg.guideProfile.id,
        slug: rg.guideProfile.slug,
        name: rg.guideProfile.user.name,
        image: rg.guideProfile.user.image,
        dailyRate: Number(rg.guideProfile.dailyRate),
        isVerified: rg.guideProfile.isVerified,
        isFeatured: rg.isFeatured,
        languages: rg.guideProfile.guideLanguages.map((l) => l.language),
        expertise: rg.guideProfile.guideExpertise.map((e) => e.expertise),
        averageRating: Math.round(gAvgRating * 10) / 10,
      };
    }),
  };
}

export async function getGuides(filters: {
  language?: string;
  expertise?: string;
  region?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const { language, expertise, region, search, page = 1, pageSize = 12 } = filters;

  const where: Prisma.GuideProfileWhereInput = {
    isAvailable: true,
    ...(region && { guideRegions: { some: { region } } }),
    ...(language && { guideLanguages: { some: { language } } }),
    ...(expertise && { guideExpertise: { some: { expertise } } }),
    ...(search && {
      OR: [
        { bio: { contains: search, mode: "insensitive" } },
        { user: { name: { contains: search, mode: "insensitive" } } },
      ],
    }),
  };

  const [guides, totalCount] = await Promise.all([
    prisma.guideProfile.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        user: { select: { name: true, image: true } },
        guideLanguages: true,
        guideExpertise: true,
        guideRegions: true,
        reviews: { select: { rating: true } },
      },
    }),
    prisma.guideProfile.count({ where }),
  ]);

  const guidesWithMeta = guides.map((g) => {
    const ratings = g.reviews.map((r) => r.rating);
    const avgRating =
      ratings.length > 0
        ? ratings.reduce((a, b) => a + b, 0) / ratings.length
        : 0;
    return {
      ...g,
      averageRating: Math.round(avgRating * 10) / 10,
      reviewCount: ratings.length,
      dailyRate: Number(g.dailyRate),
      hourlyRate: Number(g.hourlyRate),
      name: g.user.name,
      image: g.user.image,
      languages: g.guideLanguages.map((l) => ({ language: l.language, proficiency: l.proficiency })),
      expertise: g.guideExpertise.map((e) => e.expertise),
      regions: g.guideRegions.map((r) => r.region),
    };
  });

  return {
    guides: guidesWithMeta,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
}

export async function getGuideBySlug(slug: string) {
  const guide = await prisma.guideProfile.findUnique({
    where: { slug },
    include: {
      user: { select: { name: true, image: true } },
      guideLanguages: true,
      guideExpertise: true,
      guideRegions: true,
      reviews: {
        include: {
          user: { select: { name: true, image: true } },
          travelRoute: { select: { titleEn: true, slug: true } },
        },
        orderBy: { createdAt: "desc" },
      },
      routeGuides: {
        include: {
          travelRoute: {
            include: {
              images: { take: 1, orderBy: { order: "asc" } },
              reviews: { select: { rating: true } },
            },
          },
        },
      },
    },
  });

  if (!guide) return null;

  const ratings = guide.reviews.map((r) => r.rating);
  const avgRating =
    ratings.length > 0
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length
      : 0;

  return {
    ...guide,
    averageRating: Math.round(avgRating * 10) / 10,
    reviewCount: ratings.length,
    dailyRate: Number(guide.dailyRate),
    hourlyRate: Number(guide.hourlyRate),
    name: guide.user.name,
    image: guide.user.image,
    languages: guide.guideLanguages.map((l) => ({ language: l.language, proficiency: l.proficiency })),
    expertise: guide.guideExpertise.map((e) => e.expertise),
    regions: guide.guideRegions.map((r) => r.region),
    routes: guide.routeGuides.map((rg) => {
      const rRatings = rg.travelRoute.reviews.map((r) => r.rating);
      const rAvgRating =
        rRatings.length > 0
          ? rRatings.reduce((a, b) => a + b, 0) / rRatings.length
          : 0;
      return {
        id: rg.travelRoute.id,
        slug: rg.travelRoute.slug,
        titleEn: rg.travelRoute.titleEn,
        titleZh: rg.travelRoute.titleZh,
        destination: rg.travelRoute.destination,
        duration: rg.travelRoute.duration,
        theme: rg.travelRoute.theme,
        difficulty: rg.travelRoute.difficulty,
        pricePerPerson: Number(rg.travelRoute.pricePerPerson),
        maxGroupSize: rg.travelRoute.maxGroupSize,
        averageRating: Math.round(rAvgRating * 10) / 10,
        reviewCount: rRatings.length,
        coverImage: rg.travelRoute.images[0] || null,
      };
    }),
  };
}
