import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const fontBlack = fetch(
  new URL("../../assets/Montserrat-Black.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const fontRegular = fetch(
  new URL("../../assets/Montserrat-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());
const fontSemiBold = fetch(
  new URL("../../assets/Montserrat-SemiBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const fontBlackData = await fontBlack;
    const fontRegularData = await fontRegular;
    const fontSemiBoldData = await fontSemiBold;
    const { searchParams } = new URL(req.url);

    const hasNumber = searchParams.has("number");
    const number = hasNumber ? searchParams.get("number") : "";
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")
      : "<jakson nimi puuttuu>";

    console.log("searchParams", req.url);

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage:
              "linear-gradient(180deg, #B2004E 0%, #D63169 100%)",
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
            textAlign: "center",
            color: "white",
            fontFamily: "Montserrat",
          }}
        >
          <p style={{ fontSize: 150, fontWeight: 900 }}>&lt;fi/&gt;</p>
          <p style={{ fontWeight: 300, fontSize: 60 }}>
            Webbidevaus.fi jakso {number}:
          </p>
          <p style={{ fontSize: 60, fontWeight: 500, padding: "0 50px" }}>
            {title}
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Montserrat",
            data: fontBlackData,
            style: "normal",
            weight: 900,
          },
          {
            name: "Montserrat",
            data: fontSemiBoldData,
            style: "normal",
            weight: 500,
          },
          {
            name: "Montserrat",
            data: fontRegularData,
            style: "normal",
            weight: 300,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
