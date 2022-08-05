import multiparty from "multiparty";
import { upload } from "../../server/mux";
import { createReadStream } from "fs";
import { VercelRequest, VercelResponse } from "@vercel/node";

async function handler(req: VercelRequest, res: VercelResponse) {
  const stream = createReadStream("upload.mp4");

  await new Promise((resolve, reject) => {
    const form = new multiparty.Form();

    form.on("part", (part) => {
      if (part.filename === undefined) {
        // filename is not defined when this is a field and not a file
        console.log("got field named " + part.name);
        // ignore field's content
        part.resume();

        if (part.filename !== undefined) {
          // filename is defined when this is a file
          console.log("got file named " + part.name);
          stream.push(part.read());
        }

        part.on("error", (e) => {
          console.error(e);
          reject(e);
        });

        part.on("end", () => {
          resolve(true);
        });
      }
    });

    form.parse(req);
  });
  const meta = await upload(stream);
  return res.status(200).json(meta);
}

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "500mb",
  },
};

export default handler;
