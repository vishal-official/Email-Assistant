
import { EmailMessage, CalendarEvent } from './types';

export const MOCK_EMAILS: EmailMessage[] = [
  {
    id: 'msg-1',
    from: 'legal@acmecorp.com',
    subject: 'URGENT: Contract Review - Acme Corp Q3',
    body: 'Hi, we need you to review the attached contract for the Q3 partnership by end of day today. There are several changes in the liability section that require your approval.',
    received: new Date(Date.now() - 3600000).toISOString(),
    isRead: false,
    labels: ['Inbox']
  },
  {
    id: 'msg-2',
    from: 'jane.doe@example.com',
    subject: 'Q2 Planning discussion',
    body: 'Hey! We should really talk about the Q2 budget. Are you free next Tuesday at 2pm or Wednesday at 10am for a quick call?',
    received: new Date(Date.now() - 86400000).toISOString(),
    isRead: true,
    labels: ['Inbox']
  },
  {
    id: 'msg-3',
    from: 'newsletter@techcrunch.com',
    subject: 'Daily Crunch: AI is everywhere',
    body: 'Today in tech: Gemini 3 Pro is out and changing everything. Also, startup funding is up 20%...',
    received: new Date(Date.now() - 43200000).toISOString(),
    isRead: false,
    labels: ['Inbox', 'Newsletters']
  },
  {
    id: 'msg-4',
    from: 'sarah.cfo@mycompany.com',
    subject: 'Budget Approval Required',
    body: 'I have uploaded the latest budget proposal to Drive. Please review the "Q1_Strategy.pdf" and let me know if we can proceed with the hires.',
    received: new Date(Date.now() - 172800000).toISOString(),
    isRead: true,
    labels: ['Inbox', 'Important']
  },
  {
    id: 'msg-5',
    from: 'dev-team-lead@example.com',
    subject: 'Question regarding the new API architecture',
    body: 'Quick question: are we sticking with GraphQL for the mobile app or moving to gRPC as discussed? I need to know before we start the sprint tomorrow morning.',
    received: new Date(Date.now() - 7200000).toISOString(),
    isRead: false,
    labels: ['Inbox']
  }
];

export const MOCK_CALENDAR: CalendarEvent[] = [
  {
    id: 'cal-1',
    title: 'Project X Review',
    start: '2025-05-20T09:00:00Z',
    end: '2025-05-20T10:00:00Z',
    attendees: ['john.smith@example.com', 'sarah.johnson@example.com'],
    description: 'Weekly follow-up on Q1 deliverables and budget adjustments.',
    location: 'Conference Room B',
    hangoutLink: 'https://meet.google.com/abc-defg-hij'
  },
  {
    id: 'cal-2',
    title: 'Client Call - Global Tech',
    start: '2025-05-20T14:00:00Z',
    end: '2025-05-20T15:00:00Z',
    attendees: ['mike.client@globaltech.com'],
    description: 'Initial discovery call for the new cloud migration project.',
    location: 'Online'
  }
];

export const MOCK_DRIVE_DOCS = [
  { name: 'Q1_Strategy.pdf', lastModified: '2025-05-18' },
  { name: 'Acme_Contract_Draft.docx', lastModified: '2025-05-19' }
];
