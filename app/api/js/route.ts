import { NextResponse } from "next/server";
//import supabase from "../../scripts/db";

// Handle GET request
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") || null;
  const domain = req.url.split("/api")[0];

  if (id) {
    console.log("id has been added:", id);
    const scriptContent = `
      const body = document.body.innerHTML;
      //console.log(body);
      async function sendData(data) {
        const url = window.location;
        const payload = {
          "content": data,
          "url": url,
        }
        const res = await fetch("${domain}/api/js?id=${id}",{
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify(payload),
        });
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
    return new NextResponse("<h1>null</h1>", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
}

// Handle POST request
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(JSON.parse(body));

    //const { error } = await supabase
    //  .from("pages")
    //  .insert({ url: body.url, content: body.content });
    //
    //if (error) console.log(error);

    return new Response(
      JSON.stringify({ message: "Data received successfully" }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
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
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "application/json",
        },
      },
    );
  }
}

// Handle OPTIONS (preflight request)
export async function OPTIONS() {
  return new Response(null, {
    status: 204, // No Content
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
