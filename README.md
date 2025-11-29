# Manual Expense Tracker Scaffold

This repository contains a Next.js 14+ scaffold for an expense tracker. All AI-related functionality has been removed—there are no GPT calls, auto-categorization helpers, or background assistants. Categories are managed manually through the settings hook and will be selected explicitly when expense forms are added.

## Development

Install dependencies (already included via `package-lock.json`) and start the dev server:

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Key Notes
- Local storage helpers persist settings, expenses, and recoveries and dispatch storage events for cross-tab sync.
- Currency and expense hooks recalculate home-currency totals without any AI enrichment.
- Custom categories are fully manual—rename, delete, and add operations flow through `useCurrencySettings` and update stored expenses accordingly.

## Next Steps
Build out the remaining UI pages (dashboard, settings, add expense, recoveries) using the provided hooks and Tailwind/shadcn styles. Keep category selection manual and avoid adding AI integrations.
