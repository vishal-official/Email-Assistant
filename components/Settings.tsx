
import React from 'react';
import { UserPreferences } from '../types';

interface SettingsProps {
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
}

const Settings: React.FC<SettingsProps> = ({ preferences, setPreferences }) => {
  const handleChange = (key: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const clearStyleSamples = () => {
    handleChange('writingStyleSamples', []);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      {/* Daily Briefing Config */}
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-bold mb-6">Delivery & Scheduling</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg border border-indigo-100">
            <div>
              <h4 className="text-sm font-bold text-indigo-900">Email Briefing Inbox</h4>
              <p className="text-xs text-indigo-700">Display daily briefings as interactive emails for quick execution.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={preferences.briefingEnabled}
                onChange={(e) => handleChange('briefingEnabled', e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Morning Inbox Refresh</label>
            <div className="flex items-center gap-3">
               <input 
                  type="time" 
                  value={preferences.briefingDeliveryTime}
                  onChange={(e) => handleChange('briefingDeliveryTime', e.target.value)}
                  className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-900"
                />
                <span className="text-xs text-slate-500">Scheduled daily briefing update.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Writing Style Memory */}
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Writing Style Memory</h3>
          <button 
            onClick={clearStyleSamples}
            className="text-xs text-rose-600 font-bold hover:underline"
          >
            Reset Memory
          </button>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-slate-500 mb-4 leading-relaxed">
            The agent continuously learns from the edits you make to draft emails. Here are the last few patterns it's replicating:
          </p>
          
          {preferences.writingStyleSamples.length === 0 ? (
            <div className="p-4 border-2 border-dashed border-slate-100 rounded-xl text-center">
              <p className="text-xs text-slate-400 font-medium">No samples learned yet. Personalize a coordination draft to start teaching the agent.</p>
            </div>
          ) : (
            preferences.writingStyleSamples.map((sample, idx) => (
              <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl relative group">
                <span className="absolute top-2 right-3 text-[9px] font-bold text-slate-300 uppercase">Pattern {idx + 1}</span>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed pr-8 italic">
                  "{sample}"
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Standard Settings */}
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h3 className="text-xl font-bold mb-6">Core Agent Preferences</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Working Hours Start</label>
              <input 
                type="time" 
                value={preferences.workingHoursStart}
                onChange={(e) => handleChange('workingHoursStart', e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Working Hours End</label>
              <input 
                type="time" 
                value={preferences.workingHoursEnd}
                onChange={(e) => handleChange('workingHoursEnd', e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">VIP Contacts</label>
            <textarea 
              rows={2}
              value={preferences.vipContacts.join(', ')}
              onChange={(e) => handleChange('vipContacts', e.target.value.split(',').map(s => s.trim()))}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
              placeholder="boss@company.com, legal@company.com..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
