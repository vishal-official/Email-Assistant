
export enum AgentType {
  ORCHESTRATOR = 'ORCHESTRATOR',
  EMAIL = 'EMAIL',
  CALENDAR = 'CALENDAR',
  MEMORY = 'MEMORY',
  PARSER = 'PARSER'
}

export enum UrgencyLevel {
  LOW = 'low',
  NORMAL = 'normal',
  URGENT = 'urgent'
}

export interface EmailMessage {
  id: string;
  from: string;
  subject: string;
  body: string;
  received: string;
  isRead: boolean;
  labels: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  attendees: string[];
  description?: string;
  location?: string;
  hangoutLink?: string;
}

export interface EmailDraft {
  to: string;
  subject: string;
  body: string;
  personName: string;
  slot: string;
  type?: 'coordination' | 'reply' | 'approval';
}

export interface BriefingData {
  summary: string;
  meetings: Array<{
    title: string;
    time: string;
    context: string;
    agenda: string[];
    descriptionSummary: string;
    preparation?: string;
  }>;
  urgentItems: Array<{
    messageId: string;
    title: string;
    from: string;
    reason: string;
    deadline?: string;
    action: string;
  }>;
  actionRequiredItems: Array<{
    messageId: string;
    title: string;
    from: string;
    description: string;
    deadline?: string;
    category: 'approval' | 'question' | 'review' | 'confirmation' | 'other';
  }>;
  pendingCalls: Array<{
    person: string;
    topic: string;
    suggestedSlots: string[];
  }>;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  status?: 'sent' | 'pending' | 'delivered';
}

export interface UserPreferences {
  workingHoursStart: string;
  workingHoursEnd: string;
  timezone: string;
  vipContacts: string[];
  autoSchedule: boolean;
  writingStyleSamples: string[];
  briefingDeliveryTime: string;
  briefingEnabled: boolean;
}
