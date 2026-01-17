# Personal AI Email Assistant

An autonomous AI agent built with React and the Google Gemini 3 Pro API. This assistant manages your Gmail, Calendar, and Drive context through natural language, providing daily briefings and handling meeting coordination.

## Features
The Personal AI Email Assistant is an autonomous, context-aware executive agent designed to transform a chaotic inbox into a streamlined action plan. Built using the Gemini 3 Pro large language model, it acts as a central orchestrator that bridges the gap between Gmail, Google Calendar, and Google Drive.
Here is a detailed breakdown of the app's capabilities:

🚀 Core Capabilities
1. Autonomous Morning Briefings
Intelligent Summarization: Every morning, the agent analyzes recent emails and upcoming calendar events to generate a "Daily Pulse" — a high-level executive summary of the day's vibe and priorities.
Contextual Meeting Prep: It doesn't just list meetings; it searches your inbox and Drive for relevant documents or recent threads mentioned in the meeting title, providing a "Preparation" and "Recent Context" block for every event.
Summarized Descriptions: Automatically condenses long calendar event descriptions into concise, 1-2 sentence overviews.

2. Smart Scheduling & Call Coordination
Intent Detection: The agent scans incoming emails for scheduling intent (e.g., "let's grab coffee," "we should talk about Q2").
Availability Analysis: It checks your configured working hours and existing calendar conflicts to suggest optimal 30-minute slots.
One-Click Dispatch: From the dashboard, users can select a suggested slot, and the agent will immediately draft a professional invitation.

3. Iterative Style Learning (The "Ghostwriter")
Tone Adaptation: The assistant features a dedicated Memory Agent. When you edit a drafted email, the agent analyzes your changes (greetings, sign-offs, level of formality) and stores these patterns.
Style Persistence: Future drafts are generated using these learned patterns, ensuring the AI communicates exactly like you do over time.

4. High-Precision Urgency Classification
Urgency vs. Importance: Uses Gemini 3's reasoning to distinguish between items that are merely "loud" (newsletters) and those that are truly urgent (client escalations, legal deadlines).
Action Required Extraction: Automatically categorizes tasks into buckets like Approval, Review, Question, or Confirmation, providing a clear "Resolve Now" button for each.

5. Autonomous Command Center
Natural Language Instructions: Users can interact with the Main Orchestrator via a chat interface to set new rules (e.g., "From now on, flag all receipts over $50" or "Summarize newsletters every Friday").
Live Tracking & Monitoring: A transparent log of all autonomous actions. When the agent sends an email, you can track its status (Sent → Delivered → Confirmed) directly within the chat feed.

6. Privacy & Context Integration
Cross-Tool Context: By indexing names and project titles across Mail, Calendar, and Drive, the agent provides a unified view of your professional relationships.
PII Sensitivity: Designed to handle sensitive information by providing summaries and assessments rather than just mirroring raw data.

🛠 Technical Highlights
LLM: Leverages Gemini 3 Pro for complex reasoning and Gemini 3 Flash for low-latency drafting.
Multi-Agent Architecture: Uses specialized sub-agents (Email, Calendar, Memory, Parser) managed by a central Orchestrator.
UI/UX: A high-fidelity, responsive dashboard built with React and Tailwind CSS, featuring a "Gmail-simulated" briefing view for a familiar professional experience.


## Setup Instructions

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd personal-ai-email-assistant
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Ensure you have an API Key from [Google AI Studio](https://aistudio.google.com/).
    The app expects `process.env.API_KEY` to be available.

4.  **Run the app**:
    ```bash
    npm start
    ```

## GitHub Deployment

To push this code to your GitHub account:

1.  Create a new repository on GitHub.
2.  Initialize git in your project folder:
    ```bash
    git init
    git add .
    git commit -m "Initial commit: Personal AI Email Assistant"
    git remote add origin <your-github-repo-url>
    git branch -M main
    git push -u origin main
    ```

## Tech Stack

- **Framework**: React (v19)
- **Styling**: Tailwind CSS
- **AI Model**: Google Gemini 3 Pro (via `@google/genai`)
- **Icons**: Heroicons
