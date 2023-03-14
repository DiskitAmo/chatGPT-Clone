import query from "../../lib/queryApi";
import { adminDb } from "../../firebaseAdmin";
import admin from "firebase-admin";

export default async function handler(req, res) {
  const { prompt, chatId, model, session } = req.body;

  //console.log("the ask prompt", prompt);
  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt!" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat ID!" });
    return;
  }
  //chatgpt query
  const response = await query(prompt, chatId, model);

  const message = {
    text: response || "chatGPT was unable to find an answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "chatGPT",
      name: "chatGPT",
      avatar: "/logo-1.png",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).send({ answer: message.text });
}
