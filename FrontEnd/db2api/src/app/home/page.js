"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Menu, MessageCircle, Plus, Send } from 'lucide-react';

const HomePage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setInputValue('');
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`hidden md:flex flex-col w-80 border-r bg-muted/10 p-4`}>
        <Button 
          className="w-full justify-start mb-4" 
          variant="outline"
          onClick={() => setMessages([])}
        >
          <Plus className="mr-2" />
          New Chat
        </Button>
        <Separator className="my-4" />
        <div className="flex-1 overflow-auto">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start mb-2 text-left truncate"
              >
                <MessageCircle className="mr-2" />
                {msg.text.substring(0, 30)}...
              </Button>
            ))
          ) : (
            <div className="text-center text-muted-foreground pt-8">
              No conversation history
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden absolute left-2 top-2">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-4">
          <Button 
            className="w-full justify-start mb-4" 
            variant="outline"
            onClick={() => setMessages([])}
          >
            <Plus className="mr-2" />
            New Chat
          </Button>
          <Separator className="my-4" />
          <div className="flex-1 overflow-auto">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start mb-2 text-left truncate"
                >
                  <MessageCircle className="mr-2" />
                  {msg.text.substring(0, 30)}...
                </Button>
              ))
            ) : (
              <div className="text-center text-muted-foreground pt-8">
                No conversation history
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Chat Messages */}
        <div className="flex-1 overflow-auto p-4">
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
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <Card className={`max-w-[80%] ${
                  msg.sender === 'user' ? 'bg-primary text-primary-foreground' : ''
                }`}>
                  <CardContent className="p-3">
                    {msg.text}
                  </CardContent>
                </Card>
              </div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2 max-w-3xl mx-auto">
            <Input
              placeholder="Send a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;