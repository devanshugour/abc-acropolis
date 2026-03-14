import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { recordLogin, updateActivity } from "@/lib/session-activity";
import { successResponse, errorResponse, ErrorCodes } from "@/types/api";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(errorResponse(ErrorCodes.UNAUTHORIZED, "Not signed in"), { status: 401 });
  }

  const user = await prisma.user.findFirst({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json(errorResponse(ErrorCodes.NOT_FOUND, "User not found"), { status: 404 });
  }

  const userAgent = request.headers.get("user-agent");

  try {
    const body = (await request.json().catch(() => ({}))) as { isNewLogin?: boolean };
    if (body.isNewLogin) {
      await recordLogin(user.id, userAgent);
    } else {
      await updateActivity(user.id);
    }
    const activities = await prisma.sessionActivity.findMany({
      where: { userId: user.id },
      orderBy: { lastActivityAt: "desc" },
      take: 5,
    });
    return NextResponse.json(
      successResponse({
        activities: activities.map((a) => ({
          id: a.id,
          loggedInAt: a.loggedInAt.toISOString(),
          lastActivityAt: a.lastActivityAt.toISOString(),
          refreshCount: a.refreshCount,
        })),
      })
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      errorResponse(ErrorCodes.INTERNAL_ERROR, "Failed to update activity"),
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(errorResponse(ErrorCodes.UNAUTHORIZED, "Not signed in"), { status: 401 });
  }

  const user = await prisma.user.findFirst({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json(errorResponse(ErrorCodes.NOT_FOUND, "User not found"), { status: 404 });
  }

  const activities = await prisma.sessionActivity.findMany({
    where: { userId: user.id },
    orderBy: { lastActivityAt: "desc" },
    take: 10,
  });

  return NextResponse.json(
    successResponse({
      activities: activities.map((a) => ({
        id: a.id,
        loggedInAt: a.loggedInAt.toISOString(),
        lastActivityAt: a.lastActivityAt.toISOString(),
        refreshCount: a.refreshCount,
      })),
    })
  );
}
