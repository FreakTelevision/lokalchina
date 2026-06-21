"use server";

import { Resend } from "resend";

const RECEIVER_EMAIL = "scarlett.chu03@gmail.com";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const service = (formData.get("service") as string) || "General Inquiry";

  if (!name || !email || !message) {
    return { error: "Please fill in all required fields." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { error: "Email service not configured." };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "LokalChina <onboarding@resend.dev>",
      to: RECEIVER_EMAIL,
      replyTo: email,
      subject: `[${service}] ${subject || "New enquiry"} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px;">
          <h2 style="color: #1a1a2e;">New ${service} Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; font-size: 13px;"><strong>From:</strong></td><td style="font-size: 13px;">${name} (${email})</td></tr>
            <tr><td style="padding: 8px 0; color: #666; font-size: 13px;"><strong>Service:</strong></td><td style="font-size: 13px;">${service}</td></tr>
            ${subject ? `<tr><td style="padding: 8px 0; color: #666; font-size: 13px;"><strong>Subject:</strong></td><td style="font-size: 13px;">${subject}</td></tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p style="font-size: 14px; line-height: 1.6;">${message}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
          <p style="font-size: 11px; color: #999;">Sent via LokalChina contact form</p>
        </div>
      `,
    });
    return { success: true };
  } catch (e) {
    console.error("Email send failed:", e);
    return { error: "Failed to send message. Please try again later." };
  }
}
