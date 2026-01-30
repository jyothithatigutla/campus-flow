# 🎓 SmartCampus - Next-Gen Campus Management System

![Project Status](https://img.shields.io/badge/Status-Active%20Development-success)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js%2014%20%7C%20Supabase%20%7C%20Tailwind-blue)

**SmartCampus** is a unified Digital Management System (DMS) designed to revolutionize the educational experience by integrating Students, Faculty, and Administration into a single, seamless cloud platform. It replaces outdated manual processes with an intelligent, paperless workflow.

## 🚀 Key Features

### 👨‍🎓 Student Portal
*   **Campus Wallet:** Secure digital wallet for instant fee payments and automated transaction history.
*   **Event Hub:** One-click registration for hackathons, workshops, and cultural fests with team management capabilities.
*   **Smart Attendance:** View real-time attendance history and analytics.
*   **Academic Dashboard:** Centralized access to grades, exam schedules, and syllabus.
*   **Mentor Connect:** Direct, private communication channel with assigned faculty mentors.

### 👩‍🏫 Faculty Portal
*   **Geofenced Attendance:** GPS-enforced attendance marking to eliminate proxying; faculty can open attendance windows that only students within the classroom radius can sign into.
*   **Digital Grading:** fast, error-free grade submission and modification interface.
*   **Leave Management:** Automated workflow for applying and tracking leave requests.
*   **Student Insights:** detailed profiles of student performance and attendance trends.

### 🔐 Security & Architecture
*   **Role-Based Access Control (RBAC):** Strict separation of duties between Admin, Faculty, and Student roles using Supabase RLS.
*   **Real-time Data:** Instant updates using Supabase subscriptions (e.g., for live attendance tracking).
*   **Modern UI/UX:** Built with Tailwind CSS, Shadcn/UI, and Framer Motion for a premium, accessible, and responsive experience.

## 🛠️ Tech Stack

*   **Frontend:** [Next.js 14](https://nextjs.org/) (App Router, Server Actions)
*   **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Components:** [Shadcn/UI](https://ui.shadcn.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Icons:** [Lucide React](https://lucide.dev/)

## ⚡ Getting Started

### Prerequisites
*   Node.js 18+
*   npm or pnpm
*   A Supabase project

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/smartcampus.git
    cd smartcampus
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```bash
smartcampus/
├── app/                  # Next.js App Router pages & layouts
│   ├── (auth)/           # Authentication routes (login, verify)
│   ├── student/          # Student portal routes
│   └── faculty/          # Faculty portal routes & admin
├── components/           # Reusable UI components
│   ├── student/          # Student-specific widgets
│   ├── faculty/          # Faculty-specific widgets
│   └── ui/               # Shadcn UI primitives
├── lib/                  # Utilities (Supabase client, helpers)
└── utils/                # Helper functions
```

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
