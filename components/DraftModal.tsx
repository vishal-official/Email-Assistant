
import React, { useState } from 'react';
import { EmailDraft } from '../types';

interface DraftModalProps {
  draft: EmailDraft;
  onConfirm: (finalBody: string) => void;
  onCancel: () => void;
  isSending: boolean;
}

const DraftModal: React.FC<DraftModalProps> = ({ draft, onConfirm, onCancel, isSending }) => {
  const [body, setBody] = useState(draft.body);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900">Finalize Email</h3>
            <span className="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse">
              Learning Mode Active
            </span>
          </div>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 py-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 w-16 uppercase">To:</span>
            <span className="text-sm text-slate-700 font-medium">{draft.to || `${draft.personName.toLowerCase().replace(' ', '.')}@example.com`}</span>
          </div>
          <div className="flex items-center gap-3 py-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 w-16 uppercase">Subject:</span>
            <span className="text-sm text-slate-900 font-bold">{draft.subject}</span>
          </div>
          <div className="pt-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Personalize Message:</span>
              <span className="text-[10px] text-slate-400 italic">Agent learns from your edits</span>
            </div>
            <textarea 
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 leading-relaxed min-h-[220px] focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none resize-none"
              placeholder="Refine the email tone here..."
            />
          </div>
          <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100 flex gap-3 items-start">
             <svg className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             <p className="text-[11px] text-indigo-700 leading-tight">
               By editing this draft, you are teaching the agent your preferred writing style for future coordination.
             </p>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button 
            onClick={onCancel}
            disabled={isSending}
            className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            onClick={() => onConfirm(body)}
            disabled={isSending}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSending ? (
               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            )}
            Send & Update Style
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraftModal;
