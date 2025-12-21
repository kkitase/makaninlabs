import { GoogleGenAI, Type } from "@google/genai";

export interface StrategyOutput {
  concept: string;
  steps: string[];
  tips: string;
}

export const generateMarketingStrategy = async (
  goal: string
): Promise<StrategyOutput> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp",
    contents: `提供されたビジネスゴールに基づいて、AIを活用したマーケティング戦略の概要を日本語で作成してください。
    
    ビジネスゴール: ${goal}
    
    以下のJSON形式で回答してください:
    {
      "concept": "一言で表す戦略コンセプト",
      "steps": ["ステップ1の内容", "ステップ2の内容", "ステップ3の内容"],
      "tips": "成功のためのワンポイントアドバイス"
    }`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          concept: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          tips: { type: Type.STRING },
        },
        required: ["concept", "steps", "tips"],
      },
    },
  });

  return JSON.parse(response.text || "{}") as StrategyOutput;
};
