import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_CLOUD_API_KEY });

async function run() {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-fast-generate-001',
      prompt: 'a cat',
    });
    console.log("SUCCESS");
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}
run();
