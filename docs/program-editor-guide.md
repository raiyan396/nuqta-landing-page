# Program Editor Guide

Use Sanity for program content and an external form or registration page for
signups. Google Forms, Givebutter, and other HTTPS registration links all work.

## One-time Setup

1. Create a Sanity project on the free plan and use the `production` dataset.
2. Add the project ID in two places:
   - Local Studio: `SANITY_STUDIO_PROJECT_ID` in `.env.local`.
   - Public website: `assets/js/sanity-config.js`.
3. From the project root, run `npm install`, then `npm run studio:dev`.
4. In Sanity project settings, add the public site domain to CORS so the static
   website can read published content from the CDN. For local testing with
   `python3 -m http.server`, run:

   ```sh
   npx sanity login
   npx sanity cors add http://localhost:8000 --no-credentials
   ```

   Add any deployed website domain the same way.

## Add a New Program

1. Open Sanity Studio and create a new `Program`.
2. Add the title, then generate the slug from the title.
3. Choose the program type:
   - `One-time event` for dated events that should appear in Upcoming programs.
   - `Recurring program` or `Evergreen program` for items that should appear in
     Ongoing spaces below upcoming events.
4. Add a short summary. Add the full description if the card needs more detail.
5. Add optional details such as location, audience, fee, partners, and deadline.

## Upload the Flyer Image

1. Upload the event flyer or polaroid-style image in `Polaroid/flyer image`.
2. Fill in the required alt text. Keep it short and descriptive.
3. The public page requests the direct Sanity asset URL, so no image library is
   needed on the static site.

## Connect Registration

1. Create the Google Form, Givebutter event, or other registration page.
2. Copy the public HTTPS registration URL.
3. Paste it into `Registration form URL`.
4. Choose a CTA label such as `Register`, `Apply`, or `Get Tickets`.

The public CTA opens the registration link in a new tab. The website does not
collect or manage registrations directly.

## Feature, Archive, or Expire

- To feature an item, turn on `Feature this item`. Featured future events render
  with stronger presentation and sort above non-featured events.
- To publish an item, use Sanity's `Publish` button.
- To archive an item immediately, unpublish it in Sanity.
- To let the page hide it automatically, set `Expiration date/time`. If that is
  blank, the page uses `End date/time`, then `Start date/time`.

Expired one-time events do not appear on the public page. Recurring and evergreen
programs only appear below upcoming events when their program type is explicitly
set to `Recurring program` or `Evergreen program`.
