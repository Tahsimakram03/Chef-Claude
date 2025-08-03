import { HfInference } from "@huggingface/inference";

// This is the system prompt that guides the AI model's behavior.
const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

const HF_ACCESS_TOKEN = import.meta.env.VITE_APP_HF_ACCESS_TOKEN;

// Initialize the HfInference client only if the token exists.
// This prevents the app from crashing on startup.
let hf;
if (HF_ACCESS_TOKEN) {
  hf = new HfInference(HF_ACCESS_TOKEN);
}

/**
 * Fetches a recipe recommendation from the Mistral AI model.
 * @param {string[]} ingredientsArr - An array of ingredients.
 * @returns {Promise<string>} The recipe content in Markdown format or an error message.
 */
export async function getRecipeFromMistral(ingredientsArr) {
  // Check for the token here, right before making the API call.
  if (!hf) {
    console.error("Missing Hugging Face API Token.");
    // Return a helpful error message to be displayed in the UI.
    return `
## Error: Missing API Key

Please make sure you have:
1.  Created a **.env** file in the root of your project (the same level as package.json).
2.  Added your Hugging Face token like this: \`VITE_APP_HF_ACCESS_TOKEN=hf_your_token_here\`
3.  **Restarted your development server** after creating or changing the .env file.
    `;
  }

  // Joins the array of ingredients into a single comma-separated string for the prompt.
  const ingredientsString = ingredientsArr.join(", ");

  try {
    // Makes the API call to the Hugging Face Inference API.
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
      ],
      max_tokens: 1024, // Sets the maximum length of the generated recipe.
    });

    // Returns the content of the AI's message.
    return response.choices[0].message.content;
  } catch (err) {
    // Logs the error to the console for debugging.
    console.error("Error fetching recipe:", err.message);
    // Returns a user-friendly error message.
    return "Sorry, I couldn't generate a recipe right now. Please check the console for more details.";
  }
}
