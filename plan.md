# PROJECT: keeptouch.app – Slide-in Reconnect Widget MVP

# CONTEXT

• Next.js 14 (app router), Tailwind 3, Typescript, env vars already set.
• /app/api/plan/route.ts exists (gpt-4.1-nano) – returns { plan }.
• Supabase project online; service role key in .env as SUPABASE_SERVICE_KEY.
• Goal: mobile-friendly widget that (1) asks for name → (2) asks blocker → (3) shows blurred plan → (4) captures email, then posts plan + lead to Supabase and sends welcome email.

# DELIVERABLES

1. **UI COMPONENTS**

   - `/components/ReconnectWidget.tsx`
     • Uses React, HeadlessUI Dialog.
     • Bottom-sheet on <1024px, slide-in right panel on ≥1024px.
     • Step machine: name → blocker chips → blurred plan + email form.
     • Blur overlay via Tailwind `backdrop-filter`.
     • LocalStorage key `kt_widget_state` to resume progress.
     • Export as default; no layout shift when hidden.
   - `/components/ui/Chip.tsx`, `/components/ui/PrimaryButton.tsx` – tiny reusable primitives.

2. **HOOKS**

   - `/lib/useLocalStorageState.ts` – generic typed hook.
   - `/lib/useStepMachine.ts` – abstracted step logic (state + next()).

3. **SUPABASE**

   - `/supabase/migrations/20250425_create_leads.sql`
     ```sql
     create table public.leads (
       id uuid primary key default gen_random_uuid(),
       email text not null,
       person text,
       block text,
       plan text,
       created_at timestamptz default now()
     );
     ```
   - `/supabase/functions/collect-lead/index.ts`
     • Verifies hCaptcha (TODO placeholder).
     • Inserts into `leads`, sends magic link or simple welcome email containing the full plan using Supabase Edge Function email.

4. **SERVER ACTION**

   - `/app/actions/sendLead.ts`
     • Wrapper that POSTs to edge function; handles errors; returns success boolean.

5. **PAGES / LAYOUT INTEGRATION**

   - Add `<ReconnectWidget />` just below hero CTA in `/app/page.tsx`.
   - CTA `onClick={() => widgetRef.current?.open()}`.

6. **STYLES**

   - Update `globals.css` with `@layer components { .blur-overlay {...} }`.
   - Add classes for chip selected state.

7. **PACKAGE UPDATES**

npm i @headlessui/react supabase-js@2

8. **TESTS**

- Vitest setup.
- `/components/__tests__/ReconnectWidget.test.tsx` mocks fetch to /api/plan and verifies blur + email gate.

# CODING STANDARDS

• All components fully typed (FC<Props>).
• Comment every non-obvious function block.
• Use Tailwind for spacing, but wrap long class lists in `clsx`.
• Abstract fetch calls to `/lib/api.ts` with `getPlan(name,block)`.

# STEP ORDER FOR WINDSURF

1. ✅ Modify package.json → add dependencies.
2. ✅ Create migration + edge function.
3. ✅ Generate hooks and lib utils.
4. ✅ Build UI primitives.
5. ✅ Build ReconnectWidget (desktop + mobile).
6. ✅ Inject widget into home page.
7. ✅ Write tests.
8. ✅ Print install / build commands at end.

# INSTALLATION & DEPLOYMENT COMMANDS

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run development server
npm run dev

# Build for production
npm run build

# Deploy Supabase migration
supabase db push

# Deploy Supabase Edge Function
supabase functions deploy collect-lead
```

# DO NOT

• Touch existing /app/api/plan/route.ts.
• Implement auth/magic-link beyond simple welcome email placeholder.
• Overwrite tailwind.config.js except to enable backdrop utilities if missing.
