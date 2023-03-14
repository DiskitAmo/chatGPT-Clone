//import openai from "./chatgpt";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const query = async (prompt, chatId, model) => {
  // console.log("the prompt", model);
  const res = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    })
    .then((res) => res.data.choices[0].text)
    .catch((err) => `chatGPT was unable to find an answer for that! ${err}`);
  console.log("The response is:", res);
  return res;
};
export default query;
