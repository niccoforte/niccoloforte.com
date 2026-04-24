const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character] || character;
  });

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const name = String(payload?.name || "").trim();
  const email = String(payload?.email || "").trim();
  const message = String(payload?.message || "").trim();
  const company = String(payload?.company || "").trim();

  if (company) {
    return jsonResponse({ ok: true });
  }

  if (!name || !email || !message) {
    return jsonResponse({ error: "Name, email, and message are required." }, 400);
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL || "work@niccoloforte.com";

  if (!resendApiKey || !fromEmail) {
    return jsonResponse({ error: "Email delivery is not configured." }, 500);
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "niccoloforte.com/contact-form",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `Website message from ${name}`,
      html: `
        <p>You received a new message from niccoloforte.com.</p>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong><br />${safeMessage}</p>
      `,
      text: `You received a new message from niccoloforte.com.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    }),
  });

  if (!resendResponse.ok) {
    const resendError = await resendResponse.text();
    return jsonResponse({ error: resendError || "Failed to send email." }, 502);
  }

  return jsonResponse({ ok: true });
}
