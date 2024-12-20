import { config } from "dotenv";
import * as deepl from "deepl-node";

config({ path: "../.env" });

const translationApiKey = process.env.DEEPL_API_KEY;
const translator = new deepl.Translator(translationApiKey);

export async function getTranslation({ text, targetLang }) {
  try {
    const result = await translator.translateText(text, null, targetLang);
    return { translatedText: result.text };
  } catch (err) {
    throw new Error(err);
  }
}
