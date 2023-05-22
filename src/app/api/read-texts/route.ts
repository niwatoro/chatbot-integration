import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  const { files } = await req.json();

  const textsDir = path.join(process.cwd(), "/public/texts");
  const texts = await Promise.all(
    (files as string[]).map(async (file) => {
      const filePath = path.join(textsDir, file);
      const text = await fs.readFile(filePath, "utf8");
      return text;
    })
  );

  return new Response(JSON.stringify(texts));
}
