import { Resend } from "resend";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return Response.json(
        { success: false, error: "Email invalide" },
        { status: 400 }
      );
    }

    const notificationHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Segoe UI', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #000000; padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #0a0a0c; border-radius: 16px; border: 1px solid #1a1a1e; overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 2px;">VORTEX MENU</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.7); font-size: 12px; text-transform: uppercase; letter-spacing: 3px;">Admin Notification</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 8px; color: #f2f2f2; font-size: 20px; font-weight: 600;">New Subscriber</h2>
              <p style="margin: 0 0 24px; color: #666; font-size: 14px;">A new user signed up for early access notifications.</p>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background-color: #111114; border-radius: 12px; border: 1px solid #1e1e22; padding: 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #555; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Email Address</span><br>
                          <span style="color: #7c3aed; font-size: 16px; font-weight: 600;">${email}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid #1e1e22;">
                          <span style="color: #555; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Date</span><br>
                          <span style="color: #aaa; font-size: 14px;">${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 32px; border-top: 1px solid #1a1a1e; text-align: center;">
              <p style="margin: 0; color: #333; font-size: 11px;">Vortex Menu &mdash; Internal Notification System</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const confirmationHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #000000; font-family: 'Segoe UI', Arial, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #000000; padding: 40px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #0a0a0c; border-radius: 16px; border: 1px solid #1a1a1e; overflow: hidden;">
          
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%); padding: 48px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 3px;">VORTEX MENU</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.6); font-size: 12px; text-transform: uppercase; letter-spacing: 4px;">The Future of FiveM</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 48px 40px 32px;">
              <h2 style="margin: 0 0 16px; color: #f2f2f2; font-size: 22px; font-weight: 600; text-align: center;">You're on the list!</h2>
              <p style="margin: 0 0 32px; color: #888; font-size: 15px; line-height: 1.7; text-align: center;">
                Thank you for signing up. You'll be among the <span style="color: #7c3aed; font-weight: 600;">first to know</span> when Vortex Menu officially launches.
              </p>

              <!-- Feature highlights -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 32px;">
                <tr>
                  <td style="background-color: #111114; border-radius: 12px; border: 1px solid #1e1e22; padding: 24px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding: 8px 0;">
                          <span style="color: #7c3aed; font-size: 16px;">&#9670;</span>
                          <span style="color: #ccc; font-size: 14px; margin-left: 8px;">Early access to all features</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid #1a1a1e;">
                          <span style="color: #7c3aed; font-size: 16px;">&#9670;</span>
                          <span style="color: #ccc; font-size: 14px; margin-left: 8px;">Exclusive launch day benefits</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-top: 1px solid #1a1a1e;">
                          <span style="color: #7c3aed; font-size: 16px;">&#9670;</span>
                          <span style="color: #ccc; font-size: 14px; margin-left: 8px;">Priority support</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="https://discord.gg/" style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #6d28d9); color: #ffffff; text-decoration: none; padding: 14px 36px; border-radius: 12px; font-size: 14px; font-weight: 600; letter-spacing: 0.5px;">Join our Discord</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="height: 1px; background: linear-gradient(to right, transparent, #2a2a2e, transparent);"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px 32px; text-align: center;">
              <p style="margin: 0 0 8px; color: #444; font-size: 12px;">Stay tuned for something extraordinary.</p>
              <p style="margin: 0; color: #333; font-size: 11px;">&copy; ${new Date().getFullYear()} Vortex Menu. All rights reserved.</p>
            </td>
          </tr>

        </table>

        <!-- Sub-footer -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding: 16px 0; text-align: center;">
              <p style="margin: 0; color: #2a2a2e; font-size: 10px;">You received this email because you signed up on vortexmenu.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Email notification à toi
    await resend.emails.send({
      from: "Vortex Menu <onboarding@resend.dev>",
      to: process.env.NOTIFY_EMAIL!,
      subject: "New Subscriber — Vortex Menu",
      html: notificationHtml,
    });

    // Email de confirmation à l'utilisateur
    await resend.emails.send({
      from: "Vortex Menu <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Vortex Menu",
      html: confirmationHtml,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json(
      { success: false, error: "Erreur lors de l'envoi" },
      { status: 500 }
    );
  }
}
