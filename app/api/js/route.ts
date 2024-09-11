import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || "null";
  const scriptContent = `alert('Hello, ${name} from external script!');`;

  return new NextResponse(scriptContent, {
    headers: {
      "Content-Type": "application/javascript",
      "Content-Disposition": 'inline; filename="script-seo.js"',
      "Access-Control-Allow-Origin": "*",
    },
  });
}
