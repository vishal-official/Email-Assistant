
import React from 'react';
import { BriefingData } from '../types';

interface BriefingViewProps {
  briefing: BriefingData | null;
  isLoading: boolean;
  onRefresh: () => void;
  onAction?: (type: 'coordination' | 'reply' | 'approval', data: any) => void;
}

const BriefingView: React.FC<BriefingViewProps> = ({ briefing, isLoading, onRefresh, onAction }) => {
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-12 space-y-6">
        <div className="h-8 w-48 bg-slate-200 rounded animate-pulse"></div>
        <div className="h-96 bg-white border border-slate-200 rounded-xl animate-pulse shadow-sm"></div>
      </div>
    );
  }

  if (!briefing) return null;

  return (
    <div className="h-full flex flex-col">
      {/* Gmail Simulation Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-inner">AM</div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900">AgentMail Assistant</h3>
              <span className="text-[10px] text-slate-400">&lt;assistant@agentmail.ai&gt;</span>
            </div>
            <p className="text-xs text-slate-500">To: Julian &lt;julian@work.com&gt;</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Inbox</p>
          <p className="text-xs text-slate-400">7:00 AM (0 minutes ago)</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
        <div className="max-w-3xl mx-auto bg-white border border-slate-200 shadow-lg rounded-xl overflow-hidden">
          <div className="p-10 space-y-10">
            <div>
               <h2 className="text-2xl font-bold text-slate-900 mb-4">Subject: Your Daily Briefing & Action Plan - {new Date().toLocaleDateString()}</h2>
               <div className="w-full h-px bg-slate-100"></div>
            </div>

            <div className="bg-indigo-50/50 border-l-4 border-indigo-600 p-6 rounded-r-xl">
               <h4 className="text-xs font-bold text-indigo-600 uppercase mb-2 tracking-wide">Morning Perspective</h4>
               <p className="text-lg text-slate-800 leading-relaxed italic">
                 "{briefing.summary}"
               </p>
            </div>

            {/* Today's Meetings Section */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Today's Meetings
              </h3>
              <div className="space-y-4">
                {briefing.meetings.length === 0 ? (
                  <p className="text-sm text-slate-500 italic px-4">No meetings scheduled for today.</p>
                ) : briefing.meetings.map((meeting, i) => (
                  <div key={i} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:border-indigo-100 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-900 text-base">{meeting.title}</h4>
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{meeting.time}</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Brief Summary</span>
                        <p className="text-sm text-slate-700 leading-relaxed">{meeting.descriptionSummary}</p>
                      </div>
                      {meeting.context && (
                        <div>
                          <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Recent Context</span>
                          <p className="text-xs text-slate-500 italic leading-relaxed">{meeting.context}</p>
                        </div>
                      )}
                      {meeting.agenda && meeting.agenda.length > 0 && (
                        <div className="pt-2">
                           <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-2">Key Agenda Items</span>
                           <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {meeting.agenda.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                                   <div className="w-1 h-1 bg-indigo-400 rounded-full mt-1.5 shrink-0"></div>
                                   <span>{item}</span>
                                </li>
                              ))}
                           </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Calls to Coordinate
              </h3>
              <div className="space-y-3">
                {briefing.pendingCalls.map((call, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-center justify-between group hover:border-indigo-200 transition-colors">
                    <div>
                      <h4 className="font-bold text-slate-900">{call.person}</h4>
                      <p className="text-xs text-slate-500">{call.topic}</p>
                    </div>
                    <div className="flex gap-2">
                      {call.suggestedSlots.map((slot, sIdx) => (
                        <button 
                          key={sIdx}
                          onClick={() => onAction?.('coordination', { person: call.person, slot })}
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
               <h3 className="text-sm font-bold text-rose-500 uppercase tracking-widest flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                High Priority Briefing
              </h3>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {briefing.urgentItems.map((item, i) => (
                  <div key={i} className="p-6 bg-white hover:bg-slate-50 transition-colors flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] font-bold bg-rose-600 text-white px-1.5 py-0.5 rounded">URGENT</span>
                        <span className="text-xs font-medium text-slate-400">From: {item.from}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600 italic">Agent Assessment: {item.action}</p>
                    </div>
                    <button 
                      onClick={() => onAction?.('reply', item)}
                      className="shrink-0 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-800 shadow-md transition-all active:scale-95"
                    >
                      Resolve Now
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
               <h3 className="text-sm font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Pending Tasks
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {briefing.actionRequiredItems.map((item, i) => (
                  <div key={i} className="p-6 bg-amber-50/30 border border-amber-100 rounded-xl">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[10px] font-bold text-amber-600 uppercase bg-amber-100 px-2 py-0.5 rounded mb-2 inline-block tracking-wide">{item.category}</span>
                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                      </div>
                      {item.deadline && <span className="text-[10px] font-bold text-rose-500 uppercase">Deadline: {item.deadline}</span>}
                    </div>
                    <p className="text-sm text-slate-600 mb-4">{item.description}</p>
                    <div className="flex gap-2">
                       <button onClick={() => onAction?.('approval', item)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 shadow-sm transition-all active:scale-95">Quick Approve</button>
                       <button onClick={() => onAction?.('reply', item)} className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 shadow-sm transition-all active:scale-95">Reply Draft</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="pt-10 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-400 mb-4">You have {briefing.meetings.length} meetings today and {briefing.urgentItems.length + briefing.actionRequiredItems.length} items awaiting action.</p>
              <button onClick={onRefresh} className="text-xs font-bold text-indigo-600 hover:underline">Mark All as Read & Log</button>
              <p className="mt-8 text-[10px] text-slate-300 uppercase tracking-widest">Delivered by AgentMail Assistant • Powered by Gemini 3 Pro</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BriefingView;
