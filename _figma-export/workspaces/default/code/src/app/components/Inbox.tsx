import { useState } from "react";
import { Search, Send, Sparkles, MoreVertical, Phone, Video } from "lucide-react";

const conversations = [
  { id: 1, name: "Sarah Johnson", initials: "SJ", lastMessage: "Thanks for the quick response!", time: "2m", unread: true },
  { id: 2, name: "Michael Chen", initials: "MC", lastMessage: "When will my order arrive?", time: "15m", unread: true },
  { id: 3, name: "Emma Davis", initials: "ED", lastMessage: "Perfect, just what I needed!", time: "1h", unread: false },
  { id: 4, name: "James Wilson", initials: "JW", lastMessage: "Do you ship internationally?", time: "3h", unread: false },
];

const messages = [
  { id: 1, sender: "customer", text: "Hi! I'm interested in the silver ring.", time: "10:23 AM" },
  { id: 2, sender: "me", text: "Hello! Thanks for reaching out. Which size are you looking for?", time: "10:24 AM" },
  { id: 3, sender: "customer", text: "Size 7 please. Do you have it in stock?", time: "10:25 AM" },
  { id: 4, sender: "me", text: "Yes, we have size 7 available! It will ship within 1-2 business days.", time: "10:26 AM" },
  { id: 5, sender: "customer", text: "Great! I'll place an order now.", time: "10:27 AM" },
  { id: 6, sender: "customer", text: "Thanks for the quick response!", time: "10:28 AM" },
];

const aiSuggestions = [
  "Yes, we ship worldwide! Standard shipping is $15.",
  "Your order will arrive in 3–5 business days.",
  "We offer free returns within 30 days.",
];

export function Inbox() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-full">

      {/* Conversations List */}
      <div className="w-[260px] border-r border-white/[0.06] flex flex-col flex-shrink-0">

        {/* Header */}
        <div className="px-5 py-5 border-b border-white/[0.06]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-semibold text-white">Inbox</h2>
            <span className="px-2 py-0.5 rounded-full bg-white/[0.08] text-[11px] font-semibold text-white/50">2</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
            <input
              type="text"
              placeholder="Search…"
              className="w-full pl-9 pr-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-[12px] focus:outline-none focus:border-white/[0.12] transition-all placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-auto py-2">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`w-full text-left px-4 py-3.5 transition-all duration-150 border-l-2 ${
                selectedConversation === conv.id
                  ? "bg-white/[0.04] border-l-white"
                  : "border-l-transparent hover:bg-white/[0.025]"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-9 h-9 rounded-full bg-white/[0.07] border border-white/[0.08] flex items-center justify-center">
                    <span className="text-[10px] font-semibold text-white/40">{conv.initials}</span>
                  </div>
                  {conv.unread && (
                    <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#080808]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-[13px] font-medium ${conv.unread ? "text-white" : "text-white/50"}`}>
                      {conv.name}
                    </span>
                    <span className="text-[10px] text-white/20 flex-shrink-0 ml-2">{conv.time}</span>
                  </div>
                  <p className={`text-[12px] truncate ${conv.unread ? "text-white/50" : "text-white/25"}`}>
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Chat Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/[0.07] border border-white/[0.08] flex items-center justify-center">
              <span className="text-[10px] font-semibold text-white/40">SJ</span>
            </div>
            <div>
              <div className="text-[13px] font-semibold text-white leading-tight">Sarah Johnson</div>
              <div className="text-[11px] text-emerald-400/60 leading-tight flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                Online
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg hover:bg-white/[0.05] flex items-center justify-center transition-all">
              <Phone className="w-3.5 h-3.5 text-white/30" />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-white/[0.05] flex items-center justify-center transition-all">
              <Video className="w-3.5 h-3.5 text-white/30" />
            </button>
            <button className="w-8 h-8 rounded-lg hover:bg-white/[0.05] flex items-center justify-center transition-all">
              <MoreVertical className="w-3.5 h-3.5 text-white/30" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto px-6 py-5 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-sm px-4 py-3 rounded-2xl ${
                msg.sender === "me"
                  ? "bg-white text-black rounded-br-md"
                  : "bg-white/[0.05] border border-white/[0.07] text-white rounded-bl-md"
              }`}>
                <p className="text-[13px] leading-relaxed">{msg.text}</p>
                <span className={`text-[10px] mt-1 block ${msg.sender === "me" ? "text-black/30" : "text-white/25"}`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* AI Suggestions */}
        <div className="px-6 py-3 border-t border-white/[0.06] bg-white/[0.015] flex-shrink-0">
          <div className="flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3 h-3 text-white/25" />
            <span className="text-[10px] font-semibold text-white/25 uppercase tracking-widest">AI Suggestions</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            {aiSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setMessage(suggestion)}
                className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.06] rounded-lg text-[12px] text-white/40 hover:bg-white/[0.06] hover:text-white/60 transition-all whitespace-nowrap flex-shrink-0"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="px-6 py-4 border-t border-white/[0.06] flex-shrink-0">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Type a message…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && message.trim() && setMessage("")}
              className="flex-1 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-[13px] focus:outline-none focus:border-white/[0.15] transition-all placeholder:text-white/20"
            />
            <button
              onClick={() => setMessage("")}
              disabled={!message.trim()}
              className="px-4 py-2.5 bg-white text-black rounded-xl text-[13px] font-semibold hover:bg-white/90 transition-all disabled:opacity-25 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-white/8"
            >
              <Send className="w-3.5 h-3.5" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
