import { resend } from "@/lib/resend";
import { APP_NAME } from "@/lib/constants";

const FROM_EMAIL = process.env.ADMIN_EMAIL || "noreply@chinatravel.com";

export async function sendBookingConfirmation({
  to,
  bookingId,
  routeName,
  dateRange,
  guideName,
}: {
  to: string;
  bookingId: string;
  routeName: string;
  dateRange: string;
  guideName?: string;
}) {
  try {
    await resend.emails.send({
      from: `${APP_NAME} <${FROM_EMAIL}>`,
      to,
      subject: `Booking Confirmed — ${routeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0f172a;">Booking Confirmed! 🎉</h1>
          <p>Thank you for booking with ${APP_NAME}. Here are your booking details:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Booking ID</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${bookingId}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Route</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${routeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Dates</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${dateRange}</td>
            </tr>
            ${guideName ? `<tr><td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Guide</td><td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${guideName}</td></tr>` : ""}
          </table>
          <p>Your guide will contact you shortly to discuss your itinerary and any special requests.</p>
          <p>If you have any questions, reply to this email or visit our website.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          <p style="color: #64748b; font-size: 12px;">${APP_NAME} — Private Local Guides & Custom Routes in China</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send booking confirmation email:", error);
  }
}

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    await resend.emails.send({
      from: `${APP_NAME} <${FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL || FROM_EMAIL,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #0f172a;">New Contact Form Submission</h1>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p>${message}</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
  }
}
