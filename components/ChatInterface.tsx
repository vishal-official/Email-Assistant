
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { chatWithAssistant } from '../services/gemini';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, setMessages }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMsg = inputValue;
    setInputValue('');
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userMsg, timestamp: new Date() }];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const history = newMessages
        .filter(m => m.role !== 'system')
        .map(m => ({
          role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
          parts: [{ text: m.content }]
        }));
      
      const response = await chatWithAssistant(userMsg, history.slice(0, -1));
      setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date() }]);
    } catch (error) {
      console.error("AI Communication Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "My connection to the cognitive orchestrator was interrupted. Please check your credentials.", timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-10rem)] flex flex-col bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-indigo-100/50 overflow-hidden">
      {/* Header Bar */}
      <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <div>
            <h3 className="text-sm font-bold tracking-tight">Agent Command Center</h3>
            <p className="text-[10px] text-slate-400 font-medium">Gemini 3 Pro Active • Hybrid Mode</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-[9px] font-black text-slate-500 border border-slate-700 px-2 py-0.5 rounded-md uppercase tracking-widest bg-slate-800">Operational</span>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/30 scroll-smooth">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-12">
            <div className="w-20 h-20 bg-white border border-slate-100 rounded-3xl flex items-center justify-center text-indigo-600 mb-6 shadow-xl shadow-indigo-100 ring-4 ring-indigo-50/50">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </div>
            <h4 className="text-xl font-black text-slate-900 tracking-tight">Conversational Orchestrator</h4>
            <p className="text-sm text-slate-500 max-w-sm mt-3 leading-relaxed">
              Every action taken from your briefings is logged here. You can also naturally describe new automation tasks.
            </p>
          </div>
        )}

        {messages.map((msg, i) => {
          if (msg.role === 'system') {
            return (
              <div key={i} className="flex justify-center">
                <div className="bg-white border border-slate-200 text-slate-700 rounded-2xl px-6 py-5 text-xs flex flex-col gap-3 shadow-sm max-w-[90%] relative overflow-hidden ring-1 ring-slate-100">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500 shadow-[2px_0_10px_rgba(16,185,129,0.3)]"></div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      <span className="font-black uppercase tracking-widest text-[10px] text-slate-400">Automated Dispatch Log</span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-300">{msg.timestamp.toLocaleTimeString()}</span>
                  </div>
                  <p className="leading-relaxed font-semibold text-slate-800">{msg.content}</p>
                  {msg.status && (
                    <div className="flex items-center gap-2.5 mt-2 pt-3 border-t border-slate-50">
                      <div className={`w-2 h-2 rounded-full ${msg.status === 'sent' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'} shadow-[0_0_8px_currentColor]`}></div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${msg.status === 'sent' ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {msg.status === 'sent' ? 'Status: Transmitting Link' : 'Status: Delivered & Tracking Context'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          return (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
              <div className={`max-w-[85%] rounded-3xl px-6 py-4 shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white font-medium rounded-br-none shadow-indigo-200' 
                  : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none shadow-slate-200/50'
              }`}>
                <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10 opacity-70">
                   <span className={`text-[9px] font-black uppercase tracking-widest ${msg.role === 'user' ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {msg.role === 'user' ? 'Julian' : 'Agent Assistant'}
                   </span>
                   <span className="text-[9px] font-medium">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                   </span>
                </div>
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 rounded-2xl px-5 py-4 flex gap-1.5 shadow-sm ring-1 ring-slate-100">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-duration:0.6s]"></span>
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Footer Interface */}
      <form onSubmit={handleSubmit} className="p-6 border-t border-slate-100 bg-white shrink-0">
        <div className="relative group max-w-3xl mx-auto">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a natural instruction or request..."
            className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all shadow-inner placeholder:text-slate-400 text-sm font-medium"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-2.5 top-2.5 bottom-2.5 w-12 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-slate-800 disabled:opacity-30 transition-all shadow-xl active:scale-90"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
           <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-slate-300"></div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Gmail Analysis Active</span>
           </div>
           <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-slate-300"></div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Calendar Sync: 100%</span>
           </div>
           <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-slate-300"></div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Style Learning: Enabled</span>
           </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
