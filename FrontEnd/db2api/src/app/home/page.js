"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Layout, Menu, MessageCircle, Plus, Send } from "lucide-react";

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue.trim(), sender: "user" }]);
      setInputValue("");
    }
  };

  const MessageHistory = ({ className = "" }) => (
    <>
      <Button
        variant="outline"
        className="w-full justify-start mb-4"
        onClick={() => setMessages([])}
      >
        <Plus className="mr-2" />
        New Chat
      </Button>
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
    <div className="flex h-screen bg-background">
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
            messages.map((msg, index) => (
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
                  <CardContent className="p-3">{msg.text}</CardContent>
                </Card>
              </div>
            ))
          )}
        </div>

        <form
          onSubmit={handleSendMessage}
          className="border-t p-4 flex gap-2 bg-background w-full max-w-3xl mx-auto"
        >
          <Input
            placeholder="Send a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </main>
    </div>
  );
};

export default HomePage;