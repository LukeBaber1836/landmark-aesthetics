import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const getFormValue = (formData: FormData, key: string) =>
  String(formData.get(key) || "").trim();

export async function POST(request: NextRequest) {
  try {
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

    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "questions@landmarkaesthetics.net",
      replyTo: email,
      subject: subject || "New Contact Form Submission",
      html: `
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
