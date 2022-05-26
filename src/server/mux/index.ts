import Mux from "@mux/mux-node";
import fetch from "node-fetch";

const token = process.env.MUX_ACCESS_TOKEN_ID as string;
const secret = process.env.MUX_SECRET_KEY as string;

/**
 * Used for programmatic access of Video assets
 */
const mux = new Mux(token, secret, {});

const { Video } = mux;

export async function upload(stream: NodeJS.ReadableStream) {
  try {
    const upload = await Video.Uploads.create({
      new_asset_settings: { playback_policy: "public" },
    });
    const res = await fetch(upload.url, { method: "PUT", body: stream });
    console.log(`File uploaded`);
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}
