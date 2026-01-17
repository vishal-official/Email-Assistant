# Personal AI Email Assistant

An autonomous AI agent built with React and the Google Gemini 3 Pro API. This assistant manages your Gmail, Calendar, and Drive context through natural language, providing daily briefings and handling meeting coordination.

## Features

- **Proactive Daily Briefing**: Analyzes inbox and calendar to summarize your day, identify urgent tasks, and extract context from previous interactions.
- **Smart Scheduling Coordination**: Automatically detects meeting requests and suggests optimal slots based on your working hours.
- **Iterative Style Learning**: Mimics your specific writing style by learning from your edits to drafted emails.
- **Autonomous Chat Orchestrator**: A command center to track automated actions and provide new instructions to the agent.
- **Real-time Monitoring**: Visual status tracking for dispatched emails (Sent -> Delivered -> Confirmed).

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
