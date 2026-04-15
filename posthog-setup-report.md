<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Landmark Aesthetics Next.js App Router project. The integration uses `instrumentation-client.ts` for client-side initialization (the recommended approach for Next.js 15.3+), a PostHog ingestion reverse proxy via `next.config.js` rewrites, and `posthog-node` for server-side event tracking. Error tracking via `capture_exceptions` is enabled globally, and `captureException` is called explicitly on contact form errors.

| Event | Description | File |
|-------|-------------|------|
| `contact_form_submitted` | User successfully submitted the contact form | `src/app/contact/ContactForm.tsx` |
| `contact_form_submission_failed` | Contact form submission failed (API error or network issue) | `src/app/contact/ContactForm.tsx` |
| `contact_email_sent` | Server-side: email dispatched via ZeptoMail after form submission | `src/app/api/contact/route.ts` |
| `contact_email_failed` | Server-side: email dispatch via ZeptoMail failed | `src/app/api/contact/route.ts` |
| `service_viewed` | Server-side: user visited a specific service detail page | `src/app/services/[single]/page.tsx` |
| `service_booking_clicked` | User clicked "Book your appointment today!" on a service page | `src/app/services/[single]/BookingButton.tsx` |
| `faq_question_expanded` | User expanded an FAQ accordion item | `src/layouts/shortcodes/Accordion.tsx` |
| `cta_button_clicked` | User clicked a button in the Call To Action section | `src/layouts/partials/CTAButtons.tsx` |

### New files created

- `instrumentation-client.ts` — PostHog client-side initialization with session replay and error tracking
- `src/lib/posthog-server.ts` — Singleton PostHog Node.js client for server-side event capture
- `src/app/services/[single]/BookingButton.tsx` — Client component wrapping the booking CTA with click tracking
- `src/layouts/partials/CTAButtons.tsx` — Client component wrapping CTA section buttons with click tracking

### Files modified

- `next.config.js` — Added PostHog ingestion proxy rewrites and `skipTrailingSlashRedirect: true`
- `src/app/contact/ContactForm.tsx` — Added `contact_form_submitted`, `contact_form_submission_failed`, and `captureException` calls
- `src/app/api/contact/route.ts` — Added `contact_email_sent` and `contact_email_failed` server-side events
- `src/app/services/[single]/page.tsx` — Added `service_viewed` server-side event; replaced booking Button with `BookingButton`
- `src/layouts/shortcodes/Accordion.tsx` — Added `faq_question_expanded` event on accordion open
- `src/layouts/partials/CallToAction.tsx` — Replaced inline buttons with `CTAButtons` client component

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/383790/dashboard/1472683
- **Contact Form Submissions** (trend): https://us.posthog.com/project/383790/insights/jOSCGQuY
- **Booking Funnel: Service View → Booking Click → Contact Submitted** (funnel): https://us.posthog.com/project/383790/insights/ctnFMbsT
- **Booking Clicks by Service** (bar chart): https://us.posthog.com/project/383790/insights/z57bTXXM
- **Contact Form Error Rate** (success vs failure): https://us.posthog.com/project/383790/insights/f7tKvJrU
- **FAQ & CTA Engagement** (trend): https://us.posthog.com/project/383790/insights/S6BM7MZS

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
