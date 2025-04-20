"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Bot, Send, X, Maximize, Minimize, MessageSquare } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
};

const GeminiChatComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Namaste! I am Kisan Mitra, your trusted farming assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const isOpen = searchParams.get("chat-bot") === "1";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateGeminiResponse = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate response");
      }

      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error("Error generating response:", error);
      return "I'm having trouble processing your request right now. Please try again later.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const messageId = crypto.randomUUID(); // Using crypto.randomUUID() for stable IDs

    const userMessage: Message = {
      id: messageId,
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      let prompt = `You are Kisan Mitra, a knowledgeable farming assistant on KrishiVaani. Always identify as Kisan Mitra in your responses. The user asks: "${input}". `;

      if (user) {
        prompt += `The user is a ${user.farmer_type} farmer named ${user.full_name}. `;
      }

      const recentMessages = messages
        .slice(-4)
        .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
        .join("\n");

      prompt += `Recent conversation:\n${recentMessages}\n\nProvide a helpful, concise response about farming. Focus on practical advice.`;

      const responseText = await generateGeminiResponse(prompt);

      const botMessage: Message = {
        id: crypto.randomUUID(),
        content: responseText,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content:
          "I'm having trouble processing your request right now. Please try again later.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (isOpen) {
      params.delete("chat-bot");
    } else {
      params.set("chat-bot", "1");
    }
    router.push(`?${params.toString()}`);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  return (
    <>
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-green-600 hover:bg-green-700 p-0 z-50"
          aria-label="Open Kisan Mitra assistant"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
      )}

      {isOpen && (
        <Card
          className={cn(
            "fixed bottom-6 right-6 w-80 md:w-96 shadow-xl z-50 border-green-200 transition-all duration-300",
            isMinimized ? "h-14" : "h-[500px]"
          )}
        >
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between bg-green-50">
            <div className="flex items-center">
              <Bot className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="font-medium text-green-800">Kisan Mitra</h3>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={toggleMinimize}
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? (
                  <Maximize className="h-4 w-4" />
                ) : (
                  <Minimize className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={toggleChat}
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <ScrollArea className="flex-1 p-4 h-[380px]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex flex-col max-w-[80%] rounded-lg p-3",
                        message.role === "user"
                          ? "ml-auto bg-green-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      )}
                    >
                      {message.role === "assistant" ? (
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm">{message.content}</p>
                      )}
                      <span className="text-xs opacity-70 mt-1 self-end">
                        {message.timestamp.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex flex-col max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <CardFooter className="p-3 border-t">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything about farming..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send message</span>
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
};

const GeminiChat = () => (
  <Suspense>
    <GeminiChatComponent />
  </Suspense>
);

export default GeminiChat;
