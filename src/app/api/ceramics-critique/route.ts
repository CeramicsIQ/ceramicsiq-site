import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `You are an experienced ceramics instructor and working studio potter with deep knowledge of throwing, handbuilding, glazing, and kiln firing. You give thoughtful, technically informed critiques of ceramic work.

When you look at a piece, address the following — but only what is actually visible in the image:

1. Form and proportion - shape, balance, foot, rim, any handles or spouts
2. Surface and texture - throwing lines, texture, overall surface quality
3. Glaze work - color, application, movement, depth, any crawling, pinholing, or other effects
4. Technical execution - evenness of walls, craftsmanship, any visible flaws
5. What is working well - be specific and genuine
6. One or two concrete suggestions - actionable and specific to what you can see

Tone: warm but direct, like a studio mentor who respects the maker's effort. Be specific about what you actually see rather than speaking in generalities. If something is not visible or determinable from the image, say so rather than guessing. Keep it focused - under 350 words. A potter should finish reading knowing exactly what to work on next.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          "This tool is not yet active. Check back soon.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const image = formData.get("image") as File | null;
  if (!image) {
    return new Response(JSON.stringify({ error: "No image provided." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 10MB limit
  if (image.size > 10 * 1024 * 1024) {
    return new Response(
      JSON.stringify({ error: "Image must be under 10MB." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(image.type)) {
    return new Response(
      JSON.stringify({ error: "Please upload a JPEG, PNG, or WebP image." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const buffer = await image.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    const mediaType = image.type as
      | "image/jpeg"
      | "image/png"
      | "image/webp"
      | "image/gif";

    const client = new Anthropic({ apiKey });

    const stream = await client.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mediaType, data: base64 },
            },
            {
              type: "text",
              text: "Please critique this ceramic piece.",
            },
          ],
        },
      ],
    });

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(new TextEncoder().encode(chunk.delta.text));
          }
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("Critique error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
