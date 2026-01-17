
import React, { useState, useEffect } from 'react';
import { BriefingData, ChatMessage, UserPreferences, EmailDraft } from './types';
import { MOCK_EMAILS, MOCK_CALENDAR } from './mockData';
import { generateDailyBriefing, chatWithAssistant, generateEmailDraft } from './services/gemini';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import BriefingView from './components/BriefingView';
import ChatInterface from './components/ChatInterface';
import Settings from './components/Settings';
import DraftModal from './components/DraftModal';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'briefing' | 'chat' | 'settings'>('briefing');
  const [briefing, setBriefing] = useState<BriefingData | null>(null);
  const [isBriefingLoading, setIsBriefingLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences>({
    workingHoursStart: '09:00',
    workingHoursEnd: '18:00',
    timezone: 'America/Los_Angeles',
    vipContacts: ['legal@acmecorp.com', 'sarah.cfo@mycompany.com'],
    autoSchedule: false,
    writingStyleSamples: [],
    briefingDeliveryTime: '07:00',
    briefingEnabled: true
  });

  // Action states
  const [pendingDraft, setPendingDraft] = useState<EmailDraft | null>(null);
  const [isDrafting, setIsDrafting] = useState(false);
  const [isSendingDraft, setIsSendingDraft] = useState(false);

  const handleRefreshBriefing = async () => {
    setIsBriefingLoading(true);
    try {
      const data = await generateDailyBriefing(MOCK_EMAILS, MOCK_CALENDAR, preferences);
      setBriefing(data);
    } catch (error) {
      console.error("Agent synchronization error:", error);
    } finally {
      setIsBriefingLoading(false);
    }
  };

  const handleAction = async (type: 'coordination' | 'reply' | 'approval', data: any) => {
    setIsDrafting(true);
    try {
      let draft: EmailDraft;
      if (type === 'coordination') {
        const callInfo = briefing?.pendingCalls.find(c => c.person === data.person);
        draft = await generateEmailDraft(
          data.person, 
          data.slot, 
          callInfo?.topic || 'Follow-up', 
          preferences.writingStyleSamples
        );
        draft.type = 'coordination';
      } else {
        // Handle approvals or direct replies
        const prompt = `Based on my tone samples, draft a quick ${type} for the item: "${data.title || data.description}". Context: from ${data.from}.`;
        const response = await chatWithAssistant(prompt, []);
        draft = {
          to: data.from || 'recipient@example.com',
          subject: `Re: ${data.title || 'Action Required'}`,
          body: response,
          personName: data.from || 'Contact',
          slot: '',
          type
        };
      }
      setPendingDraft(draft);
    } catch (error) {
      console.error("Draft generation failed:", error);
    } finally {
      setIsDrafting(false);
    }
  };

  const confirmSendDraft = async (finalBody: string) => {
    if (!pendingDraft) return;
    setIsSendingDraft(true);
    
    // Simulate API network latency
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update Writing Style Memory if edited
    if (finalBody !== pendingDraft.body) {
      setPreferences(prev => ({
        ...prev,
        writingStyleSamples: [finalBody, ...prev.writingStyleSamples].slice(0, 5)
      }));
    }

    // DISPATCH LOGGING & TRACKING SIMULATION
    const messageId = Date.now().toString();
    const systemLog: ChatMessage = {
      role: 'system',
      content: `Email Dispatched: "${pendingDraft.subject}" to ${pendingDraft.personName}. Agent is now monitoring for a response.`,
      timestamp: new Date(),
      status: 'sent'
    };
    
    setChatMessages(prev => [...prev, systemLog]);
    setPendingDraft(null);
    setIsSendingDraft(false);
    setActiveTab('chat');

    // Simulate Status Transitions
    setTimeout(() => {
      setChatMessages(prev => prev.map(m => 
        m.content === systemLog.content ? { ...m, status: 'delivered' } : m
      ));
    }, 4000);

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `Confirming: ${pendingDraft.personName} has opened the coordination email. I'll alert you as soon as they select a slot or suggest an alternative.`,
          timestamp: new Date()
        }
      ]);
    }, 8000);
  };

  useEffect(() => {
    handleRefreshBriefing();
  }, []);

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col min-w-0 bg-white shadow-2xl overflow-hidden my-2 mr-2 rounded-3xl border border-slate-200">
        <header className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
             <h1 className="text-xl font-bold text-slate-900 capitalize tracking-tight">{activeTab}</h1>
             {activeTab === 'briefing' && (
               <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-black uppercase tracking-widest">Inbox Live</span>
               </div>
             )}
          </div>
          <div className="flex items-center gap-6">
            {isDrafting && (
              <div className="flex items-center gap-2 text-indigo-600 animate-pulse">
                <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-bold uppercase tracking-wider">Agent Processing...</span>
              </div>
            )}
            <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
               <div className="text-right hidden sm:block">
                 <p className="text-xs font-bold text-slate-900">Julian Doe</p>
                 <p className="text-[10px] text-slate-400">Executive Account</p>
               </div>
               <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100">JD</div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 overflow-y-auto">
            {activeTab === 'dashboard' && (
              <div className="p-8">
                <Dashboard 
                  briefing={briefing} 
                  onRefresh={handleRefreshBriefing} 
                  isLoading={isBriefingLoading} 
                  onScheduleCall={(p, s) => handleAction('coordination', { person: p, slot: s })} 
                />
              </div>
            )}
            {activeTab === 'briefing' && (
              <BriefingView 
                briefing={briefing} 
                isLoading={isBriefingLoading} 
                onRefresh={handleRefreshBriefing} 
                onAction={handleAction}
              />
            )}
            {activeTab === 'chat' && (
              <div className="p-8 h-full">
                <ChatInterface messages={chatMessages} setMessages={setChatMessages} />
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="p-8">
                <Settings preferences={preferences} setPreferences={setPreferences} />
              </div>
            )}
          </div>
        </div>
      </main>

      {pendingDraft && (
        <DraftModal 
          draft={pendingDraft} 
          onConfirm={confirmSendDraft} 
          onCancel={() => setPendingDraft(null)} 
          isSending={isSendingDraft} 
        />
      )}
    </div>
  );
};

export default App;
