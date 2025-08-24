"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { Plus, Scroll, Send, User, X } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Streamdown } from "streamdown";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function Assistant() {
  const [message, setMessage] = useState("");
  const [shouldStack, setShouldStack] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [autoSend, setAutoSend] = useState(false);

  const [messages, setMessages] = useState<{ from: string; content: string }[]>(
    []
  );

  // Auto-send message when autoSend is true
  useEffect(() => {
    if (autoSend && message && !isStreaming) {
      setAutoSend(false);
      sendMessage();
    }
  }, [autoSend, message, isStreaming]);

  async function sendMessage() {
    if (!message.trim()) return; // Don't send empty messages

    setIsStreaming(true);

    // Store the message content before clearing it
    const messageToSend = message;

    // append user message
    setMessages((prev) => [...prev, { from: "user", content: messageToSend }]);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/chat/stream", {
        method: "POST",
        body: JSON.stringify({ message: messageToSend }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      // append assistant message
      setMessages((prev) => [...prev, { from: "assistant", content: "" }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        let chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const dataStr = line.slice(5).trim();

          if (!dataStr || dataStr === "[DONE]") continue;

          try {
            const json = JSON.parse(dataStr);

            if (!json.content) continue;

            setMessages((prev) => {
              const prevMessages = [...prev];
              const lastIndex = prevMessages.length - 1;
              if (lastIndex < 0) return prevMessages;

              prevMessages[lastIndex] = {
                ...prevMessages[lastIndex],
                content: prevMessages[lastIndex].content + json.content,
              };

              return prevMessages;
            });
          } catch (e) {
            console.error("Bad JSON line:", dataStr, e);
          }
        }
      }

      setIsStreaming(false);
      return true;
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          from: "assistant",
          content: "Oops something went wrong. Please try again.",
        },
      ]);
      setIsStreaming(false);
    }
  }

  return (
    <div className="h-screen overflow-hidden font-mono flex flex-col justify-between pb-4">
      {/* header - chat tabs */}
      <div className="border-b bg-gray-100 flex">
        <Link
          href="/"
          className="border bg-white p-0 text-sm px-2 py-1 flex gap-x-2 items-center"
        >
          <div className="h-2 w-2 rounded-full bg-[var(--main-red)]"></div>
          <p>New Chat</p>
          <button className="hover:cursor-pointer">
            <X className="h-3 w-3" />
          </button>
        </Link>
        <button className="px-2 hover:cursor-pointer">
          <Plus className="h-3 w-3" />
        </button>
      </div>
      {/* chat messages */}
      <div className="w-full flex-1 flex flex-col p-2 gap-y-2 overflow-y-auto">
        {messages.map((m) => {
          if (m.from === "user") {
            return <UserMessage key={uuidv4()} message={m.content} />;
          } else {
            return <AssistantMessage key={uuidv4()} message={m.content} />;
          }
        })}
      </div>
      <div className="flex flex-col">
        {/* suggestions */}
        {messages.length < 1 && (
          <div className="px-2">
            <p className="text-xs font-semibold">Try Asking:</p>
            <div className="grid grid-cols-3 grid-rows-2 gap-x-2 gap-y-3 mt-2">
              <ChatSuggestion
                question="Can I afford to hire a developer next month?"
                setMessage={setMessage}
                setAutoSend={setAutoSend}
              />
              <ChatSuggestion
                question="What's our burn rate trend?"
                setMessage={setMessage}
                setAutoSend={setAutoSend}
              />
              <ChatSuggestion
                question="What are my top 3 expenses last quarter?"
                setMessage={setMessage}
                setAutoSend={setAutoSend}
              />
              <ChatSuggestion
                question="What's my customer acquisition cost trend?"
                setMessage={setMessage}
                setAutoSend={setAutoSend}
              />
              <ChatSuggestion
                question="How much are we spending on SaaS subscriptions?"
                setMessage={setMessage}
                setAutoSend={setAutoSend}
              />
              <ChatSuggestion
                question="How long are we gonna last?"
                setMessage={setMessage}
                setAutoSend={setAutoSend}
              />
            </div>
          </div>
        )}
        {/* chat box */}
        <div className="px-2 mt-4">
          <div
            className={`border w-full rounded-md flex ${
              shouldStack ? "flex-col items-end" : ""
            } px-4 py-2`}
          >
            <AutoResizeTextarea
              value={message}
              setValue={setMessage}
              placeholder="How can I help you today?"
              setStack={setShouldStack}
            />
            <Button
              onClick={sendMessage}
              className="bg-[var(--main-red)] hover:bg-[var(--main-red)] cursor-pointer"
              disabled={isStreaming}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AssistantMessage({ message }: { message: string }) {
  return (
    <div className="text-xs max-w-[80%] rounded-t-md bg-gray-50 rounded-br-md px-2 py-2 w-fit">
      <Streamdown>{message}</Streamdown>
    </div>
  );
}

function UserMessage({ message }: { message: string }) {
  return (
    <div className="text-xs max-w-[80%] bg-gray-100 w-fit px-2 py-2 rounded-t-md rounded-bl-md self-end">
      {message}
    </div>
  );
}

function ChatSuggestion({
  question,
  setMessage,
  setAutoSend,
}: {
  question: string;
  setMessage: Dispatch<SetStateAction<string>>;
  setAutoSend: Dispatch<SetStateAction<boolean>>;
}) {
  const handleChatSuggestion = () => {
    setMessage(question);
    setAutoSend(true);
  };

  return (
    <Button
      onClick={handleChatSuggestion}
      className="bg-gray-100 text-[0.7rem] rounded-sm text-black cursor-pointer hover:text-[var(--main-red)] hover:font-bold hover:bg-gray-50 transition-all duration-100"
    >
      {question}
    </Button>
  );
}

function AutoResizeTextarea({
  value,
  setValue,
  placeholder,
  setStack,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setStack: Dispatch<SetStateAction<boolean>>;
  placeholder: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = "auto";
      // Set height to scrollHeight, but ensure minimum height
      const newHeight = Math.max(textareaRef.current.scrollHeight, 20);
      textareaRef.current.style.height = newHeight + "px";

      // Update stack state based on height
      setStack(newHeight > 40);
    }
  }, [value, setStack]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      rows={1}
      wrap="soft"
      style={{ minHeight: "20px", maxHeight: "140px" }}
      className="w-full min-w-0 resize-none rounded-none break-words whitespace-normal text-xs border-none ring-0 shadow-none p-0 outline-none bg-transparent"
    />
  );
}
