import { createClient } from "@supabase/supabase-js";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { useState } from "react";

// const files = ["Akai_MPC-1000_E3_Owners_Manual.txt", "Apollo_Twin_X_Hardware_Manual.txt", "Nektar_Impact_LX49,_LX61,_LX88_(EN).txt", "Pro_Tools_Carbon_Systems_Guide.txt", "Pro_Tools_HDX_Card_Install_Guide_75269.txt", "Prophet-5-Users-Guide-1.3.txt", "Prophet-6-Operation-Manual.txt", "S4_S6_Guide_v2022.12.txt", "S4_S6_Operation_22.12.txt", "mpc5000_reference_manual_v2.00_00.txt", "opin0173_U87Ai_068820-A11_10-2014.txt"];
export const useLlm = () => {
  const model = new OpenAI({ openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url) {
    throw new Error("Missing env var NEXT_PUBLIC_SUPABASE_URL");
  }
  if (!key) {
    throw new Error("Missing env var NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  const [chain, setChain] = useState<RetrievalQAChain>();
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const [initializing, setInitializing] = useState(false);

  const initialize = async () => {
    setInitializing(true);

    const client = createClient(url, key);
    const vectorStore = await SupabaseVectorStore.fromExistingIndex(new OpenAIEmbeddings({ openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY }), {
      client: client,
      tableName: "documents",
      queryName: "match_documents",
    });

    console.log("creating chain...");
    const chain_ = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

    setChain(chain_);
    setInitializing(false);
    console.log("done");
  };

  const generateResponse = async (input: string) => {
    if (!chain) {
      await initialize();
      return;
    }

    const res = await chain.call({ question: input, key: input, query: input, chatHistory: chatHistory });
    if (res === undefined) {
      return "Sorry, I don't know.";
    }
    const resText = res?.text;

    setChatHistory([...chatHistory, input, resText]);
    return resText;
  };

  return { initialize, initializing, generateResponse };
};
