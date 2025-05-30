# FinSight

**FinSight** is a modern AI-powered finance platform designed to help users make data-driven financial decisions. Built using the latest web technologies, FinSight combines intelligent analysis with a sleek user experience.

## 🚀 Features

- 🔐 **Authentication with Clerk** – Seamless and secure user authentication and session management.
- 📊 **AI-Driven Insights** – Use AI to get actionable insights from financial data.
- 🧾 **Form Handling** – Robust and reactive forms with validation using React Hook Form and Zod.
- 💾 **PostgreSQL with Supabase** – Modern backend infrastructure for storing user and financial data.
- 💅 **Elegant UI** – Built with **shadcn/ui** and **Tailwind CSS** for a clean, responsive interface.
- ⚡ **Next.js Framework** – High-performance SSR and optimized frontend routing.

## 🛠️ Tech Stack

| Layer        | Technology                     |
|--------------|--------------------------------|
| Frontend     | Next.js, React, Tailwind CSS   |
| UI Library   | shadcn/ui                      |
| Forms        | React Hook Form, Zod           |
| Auth         | Clerk                          |
| Database     | PostgreSQL via Supabase        |
| Styling      | Tailwind CSS                   |

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/finsight.git
cd finsight

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase and Clerk keys to the .env.local file

# Run the development server
npm run dev
