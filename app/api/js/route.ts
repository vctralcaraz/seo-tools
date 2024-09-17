import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || null;

  if (id) {
    console.log("id has been added:", id);
    const scriptContent = `
      const body = document.body.innerHTML;
      console.log(body);
    `;

    return new NextResponse(scriptContent, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } else {
    console.log("no id has been added");
    return new NextResponse(`<h1>null</h1>`);
  }
}
