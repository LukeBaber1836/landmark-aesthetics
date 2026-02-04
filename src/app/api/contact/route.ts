import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SendMailClient } from "zeptomail";

const zeptoUrl = "https://api.zeptomail.com/v1.1/email";
const zeptoToken = process.env.ZEPTOMAIL_API_KEY || "";

const getFormValue = (formData: FormData, key: string) =>
  String(formData.get(key) || "").trim();

export async function POST(request: NextRequest) {
  try {
    if (!zeptoToken) {
      return NextResponse.json(
        { ok: false, message: "Email service is not configured." },
        { status: 500 },
      );
    }

    const formData = await request.formData();

    const name = getFormValue(formData, "name");
    const email = getFormValue(formData, "email");
    const subject = getFormValue(formData, "subject");
    const message = getFormValue(formData, "message");

    if (!email || !message) {
      return NextResponse.json(
        { ok: false, message: "Missing required fields." },
        { status: 400 },
      );
    }

    const client = new SendMailClient({ url: zeptoUrl, token: zeptoToken });

    await client.sendMail({
      from: {
        address: "noreply@landmarkaesthetics.net",
        name: "noreply",
      },
      to: [
        {
          email_address: {
            address: "questions@landmarkaesthetics.net",
            name: "LMA",
          },
        },
      ],
      reply_to: [
        {
          address: email,
          name: name || email,
        },
      ],
      subject: subject || "New Contact Form Submission",
      htmlbody: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ ok: true, message: "Message sent." });
  } catch (error) {
    console.error("Error sending email:", error);
    const message =
      error instanceof Error ? error.message : "Unexpected server error.";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
