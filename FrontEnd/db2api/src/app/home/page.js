"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Layout, Menu, MessageCircle, Plus, Send, Moon,Sun,Download} from "lucide-react";

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  // Scroll to bottom effect
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageText = inputValue.trim();
    if (messageText) {
      setMessages([...messages, { text: messageText, sender: "user", timestamp: new Date() }]);
      setInputValue("");

      // Simulate response
      setIsTyping(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Thanks for your message! 👋", 
          sender: "bot",
          timestamp: new Date()
        }]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const exportChat = () => {
    const chatHistory = messages.map(msg => 
      `[${new Date(msg.timestamp).toLocaleTimeString()}] ${msg.sender}: ${msg.text}`
    ).join('\n');
    
    const blob = new Blob([chatHistory], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-history.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const MessageHistory = ({ className = "" }) => (
    <>
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          className="w-full justify-start mr-2"
          onClick={() => setMessages([])}
        >
          <Plus className="mr-2" />
          New Chat
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={exportChat}
          disabled={messages.length === 0}
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
      <Separator className="my-4" />
      <div className={`flex-1 overflow-auto ${className}`}>
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start mb-2 text-left truncate"
            >
              <MessageCircle className="mr-2" />
              {msg.text.substring(0, 30)}
              {msg.text.length > 30 && "..."}
            </Button>
          ))
        ) : (
          <div className="text-center text-muted-foreground pt-8">
            No conversation history
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className={`flex h-screen bg-background transition-colors duration-300 ${
      isDarkMode ? 'dark' : ''
    }`}>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex fixed h-screen flex-col w-80 border-r bg-muted/10 p-4 transition-all duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-80"
        }`}
      >
        <MessageHistory />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute left-4 top-4 z-20"
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-4">
          <MessageHistory className="mt-8" />
        </SheetContent>
      </Sheet>

      {/* Top Bar */}
      <div className="fixed top-4 right-4 flex gap-2 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <Sun /> : <Moon />}
        </Button>
      </div>

      {/* Sidebar Toggle (Desktop) */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="hidden md:flex fixed top-4 left-4 z-20"
      >
        <Layout />
      </Button>

      {/* Main Content */}
      <main
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-80" : "md:ml-0"
        }`}
      >
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <Card className="w-full max-w-lg">
                <CardContent className="p-6 text-center">
                  <h1 className="text-2xl font-bold mb-2">Welcome to db2api</h1>
                  <p className="text-muted-foreground">
                    Start building your API routes.
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <Card
                    className={`max-w-[80%] ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : ""
                    }`}
                  >
                    <CardContent className="p-3">
                      <div>{msg.text}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <Card>
                    <CardContent className="p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <form
          onSubmit={handleSendMessage}
          className="flex items-center border-t p-4 md:p-6 bg-muted/10"
        >
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 mr-2"
          />
          <Button type="submit" variant="primary" size="icon">
            <Send />
          </Button>
        </form>
      </main>
    </div>
  );
};

export default HomePage;
