# SportEvent Manager

A comprehensive event management system for sports organizations, built with React, TypeScript, and Supabase.

## Features

- 🏆 Tournament Management
  - Create and manage tournaments with different formats (elimination, round-robin, groups)
  - Track matches and results
  - Generate tournament brackets

- 📅 Event Organization
  - Schedule and manage sports events
  - Track participant registrations
  - Monitor event capacity and status

- 🏊‍♂️ Venue Management
  - Manage swimming pools and sports facilities
  - Track venue specifications and features
  - Monitor venue availability

- 👥 User Management
  - Role-based access control
  - User profiles and authentication
  - Participant registration and tracking

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide Icons
  - React Router

- **Backend:**
  - Supabase
  - PostgreSQL
  - Row Level Security

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/sportevent-manager.git
   cd sportevent-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/      # React context providers
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and API clients
├── pages/         # Application pages/routes
├── types/         # TypeScript type definitions
└── migrations/    # Database migrations
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.