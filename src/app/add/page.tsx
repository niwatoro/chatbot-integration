"use client";

import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { useState } from "react";

export default function Page() {
  const [text, setText] = useState("");

  const saveVectors = async () => {
    console.log("creating vector store...");
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    const docs = await textSplitter.createDocuments([text]);

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url) {
      throw new Error("Missing env var NEXT_PUBLIC_SUPABASE_URL");
    }
    if (!key) {
      throw new Error("Missing env var NEXT_PUBLIC_SUPABASE_ANON_KEY");
    }
    const client = createClient(url, key);
    await SupabaseVectorStore.fromDocuments(docs, new OpenAIEmbeddings({ openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY }), {
      client: client,
      tableName: "documents",
      queryName: "match_documents",
    });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-y-3">
      <textarea value={text} className="w-96 h-40 border" onChange={(e) => setText(e.target.value)} />
      <button onClick={() => saveVectors()} className="bg-black text-white p-3 rounded-full w-40 h-12">
        Send
      </button>
    </div>
  );
}
