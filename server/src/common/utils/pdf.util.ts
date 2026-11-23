import * as fs from "node:fs/promises";
import * as path from "node:path";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extractPdfText(
  filePath: string,
): Promise<string> {

  const data = await fs.readFile(filePath);

  const loadingTask = getDocument({
    data: new Uint8Array(data),

    standardFontDataUrl: path.join(
      process.cwd(),
      "node_modules",
      "pdfjs-dist",
      "standard_fonts",
    ),

    useSystemFonts: true,
  });

  const pdf = await loadingTask.promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {

    const page = await pdf.getPage(i);

    const content = await page.getTextContent();

    text += content.items
      .map((item: any) => item.str ?? "")
      .join(" ");

    text += "\n";
  }

  return text.trim();
}