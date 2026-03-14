import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { ContactFormData } from "@/types";
import { successResponse, errorResponse, ErrorCodes } from "@/types/api";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactFormData>;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const subject = body.subject?.trim();
    const message = body.message?.trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        errorResponse(ErrorCodes.VALIDATION_ERROR, "All fields are required"),
        { status: 400 }
      );
    }

    await prisma.contactSubmission.create({
      data: { name, email, subject, message },
    });

    return NextResponse.json(
      successResponse(
        { received: true },
        "Message sent successfully. We'll get back to you soon."
      ),
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      errorResponse(ErrorCodes.INTERNAL_ERROR, "Something went wrong"),
      { status: 500 }
    );
  }
}
