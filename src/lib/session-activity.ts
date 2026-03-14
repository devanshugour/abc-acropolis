import { prisma } from "@/lib/db";

export async function recordLogin(userId: string, userAgent?: string | null) {
  await prisma.sessionActivity.create({
    data: {
      userId,
      userAgent: userAgent ?? undefined,
    },
  });
}

export async function updateActivity(userId: string) {
  const latest = await prisma.sessionActivity.findFirst({
    where: { userId },
    orderBy: { lastActivityAt: "desc" },
  });
  if (latest) {
    await prisma.sessionActivity.update({
      where: { id: latest.id },
      data: {
        lastActivityAt: new Date(),
        refreshCount: { increment: 1 },
      },
    });
  }
}

export async function getSessionActivity(userId: string) {
  return prisma.sessionActivity.findMany({
    where: { userId },
    orderBy: { lastActivityAt: "desc" },
    take: 10,
  });
}
