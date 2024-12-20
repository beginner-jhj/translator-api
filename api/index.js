import express from "express";
import cors from "cors";
import { getTranslation } from "./translator.js";
import serverless from "serverless-http";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  const body = req.body;
  const { sourceText, targetLang } = body;

  try {
    const { translatedText } = await getTranslation({
      text: sourceText,
      targetLang: targetLang,
    });
    res.status(200).json({ translation: translatedText, serverError: null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ translation: null, serverError: err });
  }
});

app.listen(8080, () => {
  console.log("server is running on port 8080");
});

export const handler = serverless(app);
