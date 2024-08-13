const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run(year,interest) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt =
    "Give me Significant events that occured in the year " +
    year +
    " in the field of "
    +interest+
    " in json format containing title and description";
  console.log("Asking Gemini");
  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();
  text=text.substring(text.indexOf('['),text.indexOf(']')+1);
  console.log("Got response");
  return JSON.parse(text);
}

module.exports = { run };
