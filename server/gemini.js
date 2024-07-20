const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(year) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt =
    "Give me some Significant events that occured in the year " +
    year +
    " in json format as if you are a server and responding to a client";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();
  text = text.substring(7, text.length - 4);
  const obj = JSON.parse(text);
  return obj;
}

module.exports = { run };
