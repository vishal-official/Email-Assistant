
import React from 'react';
import { BriefingData } from '../types';

interface DashboardProps {
  briefing: BriefingData | null;
  onRefresh: () => void;
  isLoading: boolean;
  onScheduleCall?: (person: string, slot: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ briefing, onRefresh, isLoading, onScheduleCall }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Good morning, Julian!</h2>
          <p className="text-slate-500">Here's what your AI assistant has gathered for today.</p>
        </div>
        <button 
          onClick={onRefresh}
          disabled={isLoading}
          className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-50 disabled:opacity-50 transition-colors"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          )}
          Refresh Sync
        </button>
      </div>

      {!briefing && !isLoading ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
             <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h3 className="text-lg font-semibold">No Briefing Found</h3>
          <p className="text-slate-500 mb-6">Click refresh to sync with your inbox and calendar.</p>
          <button onClick={onRefresh} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">Generate Today's Briefing</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Summary Card */}
          <div className="col-span-1 md:col-span-3 bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
            <div className="relative z-10">
               <h3 className="text-lg font-semibold mb-2 opacity-90">Daily Summary</h3>
               <p className="text-xl leading-relaxed">{isLoading ? "Synchronizing agents and analyzing messages..." : briefing?.summary}</p>
            </div>
            <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {/* Urgent & Important */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <h3 className="font-bold text-slate-900">Urgent & Important</h3>
            </div>
            <div className="space-y-4">
              {isLoading ? (
                [1,2].map(i => <div key={i} className="h-16 bg-slate-100 rounded animate-pulse"></div>)
              ) : briefing?.urgentItems.map((item, idx) => (
                <div key={idx} className="p-3 bg-rose-50 rounded-lg border border-rose-100 group cursor-pointer hover:bg-rose-100 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-bold text-rose-600 uppercase bg-white px-1.5 py-0.5 rounded border border-rose-200">Urgent</span>
                    {item.deadline && <span className="text-[10px] text-rose-500 font-medium">Due: {item.deadline}</span>}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 line-clamp-1 mt-1">{item.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{item.action}</p>
                </div>
              ))}
              {!isLoading && briefing?.urgentItems.length === 0 && (
                <p className="text-xs text-slate-400 italic">No urgent items found.</p>
              )}
            </div>
          </div>

          {/* Action Required */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <h3 className="font-bold text-slate-900">Action Required</h3>
            </div>
            <div className="space-y-4">
              {isLoading ? (
                [1,2].map(i => <div key={i} className="h-16 bg-slate-100 rounded animate-pulse"></div>)
              ) : briefing?.actionRequiredItems.map((item, idx) => (
                <div key={idx} className="p-3 bg-amber-50 rounded-lg border border-amber-100 group cursor-pointer hover:bg-amber-100 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[9px] font-bold text-amber-600 uppercase bg-white px-1.5 py-0.5 rounded border border-amber-200 shadow-sm">
                      ACTION REQUIRED
                    </span>
                    {item.deadline && <span className="text-[10px] text-amber-500 font-medium">{item.deadline}</span>}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 line-clamp-1 mt-1">{item.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{item.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[9px] text-amber-500 font-bold bg-amber-100/50 px-1 py-0.5 rounded uppercase">{item.category}</span>
                    <button className="text-[10px] text-indigo-600 font-bold hover:underline">View Source</button>
                  </div>
                </div>
              ))}
              {!isLoading && briefing?.actionRequiredItems.length === 0 && (
                <p className="text-xs text-slate-400 italic">All actions completed.</p>
              )}
            </div>
          </div>

          {/* Scheduling - ENHANCED WITH INTERACTIVE SLOTS */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <h3 className="font-bold text-slate-900">Calls to Coordinate</h3>
            </div>
            <div className="space-y-4">
              {isLoading ? (
                [1,2].map(i => <div key={i} className="h-20 bg-slate-100 rounded animate-pulse"></div>)
              ) : briefing?.pendingCalls.map((call, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <h4 className="text-sm font-semibold text-slate-900">{call.person}</h4>
                  <p className="text-[10px] text-slate-500 mb-2">{call.topic}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Suggested Slots:</p>
                  <div className="flex flex-wrap gap-1">
                    {call.suggestedSlots.map((slot, sIdx) => (
                      <button 
                        key={sIdx} 
                        onClick={() => onScheduleCall?.(call.person, slot)}
                        className="text-[9px] bg-white border border-slate-200 px-1.5 py-1 rounded text-slate-600 font-bold hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all flex items-center gap-1 group"
                      >
                        {slot}
                        <svg className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              {!isLoading && briefing?.pendingCalls.length === 0 && (
                <p className="text-xs text-slate-400 italic">No calls to schedule.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
