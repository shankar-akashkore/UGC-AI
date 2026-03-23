import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_CLOUD_API_KEY });

async function run() {
  try {
    const models = await ai.models.list();
    for await (const model of models) {
        console.log(model.name, model.supportedGenerationMethods);
    }
  } catch (e) {
    console.error(e);
  }
}
run();
