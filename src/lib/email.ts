import nodemailer from "nodemailer";

const transporter =
  process.env.SMTP_HOST && process.env.SMTP_USER
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    : null;

export type SendMailOptions = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export async function sendMail(options: SendMailOptions): Promise<{ ok: boolean; error?: string }> {
  if (!transporter) return { ok: false, error: "SMTP not configured" };
  const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;
  try {
    await transporter.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html ?? options.text,
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Send failed" };
  }
}
