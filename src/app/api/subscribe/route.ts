import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function generateGhostToken(adminApiKey: string): string {
  const [id, secret] = adminApiKey.split(":");
  const header = Buffer.from(JSON.stringify({ alg: "HS256", kid: id, typ: "JWT" })).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(JSON.stringify({ iat: now, exp: now + 300, aud: "/admin/" })).toString("base64url");
  const signature = crypto
    .createHmac("sha256", Buffer.from(secret, "hex"))
    .update(header + "." + payload)
    .digest("base64url");
  return header + "." + payload + "." + signature;
}

let cachedNewsletterId: string | null = null;

async function getDefaultNewsletterId(ghostUrl: string, token: string): Promise<string | null> {
  if (cachedNewsletterId) return cachedNewsletterId;
  try {
    const res = await fetch(ghostUrl + "/ghost/api/admin/newsletters/?limit=1", {
      headers: { Authorization: "Ghost " + token, "Accept-Version": "v5.0" },
    });
    const data = await res.json();
    cachedNewsletterId = data.newsletters?.[0]?.id ?? null;
    return cachedNewsletterId;
  } catch { return null; }
}

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();
    if (!email || typeof email !== "string" || !email.includes("@"))
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    const ghostUrl = process.env.GHOST_URL;
    const adminApiKey = process.env.GHOST_ADMIN_API_KEY;
    if (!ghostUrl || !adminApiKey)
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    const token = generateGhostToken(adminApiKey);
    const newsletterId = await getDefaultNewsletterId(ghostUrl, token);
    const member: Record<string, unknown> = { email: email.trim().toLowerCase(), ...(name ? { name } : {}) };
    if (newsletterId) member.newsletters = [{ id: newsletterId }];
    const res = await fetch(ghostUrl + "/ghost/api/admin/members/", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Ghost " + token, "Accept-Version": "v5.0" },
      body: JSON.stringify({ members: [member] }),
    });
    if (res.status === 409) return NextResponse.json({ success: true });
    if (!res.ok) return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
