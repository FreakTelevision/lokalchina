"use server";

import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/db";
import { registerSchema } from "@/lib/validations";

export async function registerUser(data: z.infer<typeof registerSchema>) {
  const validated = registerSchema.safeParse(data);
  if (!validated.success) {
    return { error: validated.error.issues[0].message };
  }

  const { name, email, password } = validated.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with this email already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "traveler",
    },
  });

  return { success: true, userId: user.id };
}
