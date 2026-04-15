# Nuqta Multi-Page HTML Site Design Specification

## 1. Project Overview

This document defines the design and implementation specification for the first version of the Nuqta website. The site will be a static, multi-page HTML website built with Tailwind CSS for layout and interface patterns, plus one shared custom stylesheet for branded visual effects and theme tokens.

Nuqta should be presented as a mentorship-driven ecosystem for Muslim youth. The website should feel editorial, grounded, and intentional, using the supplied brand direction: a cinematic warm-to-cool background field, strong serif-led typography, restrained monochrome accents, and messaging centered on identity, companionship, leadership, and purpose.

This document is decision-complete. An implementer should be able to build the site without making additional product, content-structure, or visual-system decisions.

The first version will be static HTML, but it must be structured so that event programs, dates, and recurring updates can move into a CMS later without requiring a full redesign.

## 2. Goals and Non-Goals

### Goals

- Present Nuqta clearly as a mentorship-driven ecosystem for Muslim youth.
- Create a distinct branded experience that does not resemble a generic nonprofit template.
- Support a primary "Join the community" call to action.
- Preserve room for support, partnerships, and future donation flows.
- Use a static HTML architecture that is easy to host and easy to extend.
- Keep the system implementation-friendly with shared patterns across four pages.

### Non-Goals

- Building a CMS-backed site.
- Building a JavaScript-heavy application.
- Embedding forms in the first version.
- Requiring final imagery, founder photos, or live destination links before implementation starts.
- Designing around decorative religious motifs or cliché nonprofit visuals.

### Future CMS Direction

The first version is not CMS-backed, but it should be designed for a clean migration path. The most likely future CMS need is structured event and program content, including:

- recurring events
- program modules
- program dates
- announcements or updates
- support links and changing destinations

The implementation should therefore avoid treating event and program sections as one-off prose blocks. Instead, these sections should be laid out as repeatable content units that can later be sourced from a CMS.

## 3. Audience and CTA Priority

### Primary Audience

- Muslim high school students
- MSA leaders
- Youth mentors and youth workers
- Muslim community stakeholders evaluating Nuqta

### Secondary Audience

- Potential supporters and sustainers
- Partner organizations
- Masajid and institutions

### CTA Priority

1. Join the community
2. Support Nuqta
3. Learn the program model

### Core Messaging

- Identity line: "A mentorship-driven ecosystem for Muslim youth."
- Emotional promise: "You were made for more."
- Key framing: Muslim youth are not lacking passion; they are lacking structure, guidance, and consistent community.

## 4. Site Map

The site consists of four static HTML pages:

```text
/index.html
/about.html
/program.html
/support.html
/styles.css
/assets/
  /logos/
  /images/
```

### Page Purposes

#### Home (`index.html`)

Purpose:
- Introduce Nuqta quickly and emotionally
- Establish tone and visual identity
- Drive visitors toward joining the community

Sections:
- Hero
- One-line identity
- Why Nuqta
- Three pillars
- Problem / Solution
- Student journey
- CTA band

#### About (`about.html`)

Purpose:
- Expand the mission, vision, and positioning
- Clarify what Nuqta is and what it is not
- Introduce the credo and founder/advisor section

Sections:
- Intro lead
- Vision
- Mission
- What Nuqta is
- What Nuqta is not
- Why Nuqta
- Credo
- Founders and advisors

#### Program (`program.html`)

Purpose:
- Explain the operating model
- Show how mentorship, suhbah, and leadership development work together
- Present the 2025-2026 structure clearly

Sections:
- Program overview
- 2025-2026 program model
- Events and program cadence
- Three pillars in operational form
- Student experience journey
- Relationship with masajid
- Partnership / bridge section
- CTA to join

#### Support (`support.html`)

Purpose:
- Explain why support matters
- Invite partnership and sustaining support
- Offer external destinations for connection and contribution

Sections:
- Support overview
- Why support Nuqta
- Impact framing
- The ask
- External links block
- Contact / connect block

## 5. Visual System

### Overall Mood

The site should feel:

- Editorial
- Grounded
- Quietly bold
- Warm and atmospheric
- Rooted in faith without depending on visual cliché
- Minimal but not sterile
- Youth-centered without feeling juvenile

### Color Palette

Core brand colors:

- `#212121` as primary ink / charcoal
- `#f5efe6` as warm cream / off-white
- `#b4b4b4` as soft gray / mist

Additional implementation-supporting tones may be derived from the art direction for background effects:

- Deep amber / muted gold for glow accents
- Blue-gray / slate for cool edge atmosphere

### Background Direction

Each page should use a shared ambient background system:

- A warm-to-cool gradient field
- Amber/golden glow concentrated lower-center or lower-right
- Cooler slate and blue-gray tones around edges and bottom corners
- Subtle noise/grain overlay to avoid flat digital gradients
- Content areas layered over soft translucent dark or cream surfaces where required for readability

The background must remain atmospheric, not busy. Readability takes precedence over visual drama.

## 6. Typography and Color Tokens

### Font Stack

Use this type hierarchy:

- Heading font: `Source Serif 4` or `Source Serif Pro`
- Accent / eyebrow font: `Anonymous Pro`
- Body / UI font: `Poppins`

Fallbacks:

- Headings: `Georgia`, `Times New Roman`, `serif`
- Accent: `Courier New`, `monospace`
- Body: `system-ui`, `sans-serif`

### Typography Roles

- Hero title: large serif, high contrast, spacious line height
- Section titles: serif
- Eyebrows and utility labels: monospace
- Body copy, buttons, nav, and cards: sans-serif

The "Horizon" display look shown in the brand materials is not required for v1 and should not be treated as a dependency.

### Theme Tokens

Define these CSS custom properties in `styles.css`:

```css
:root {
  --nuqta-ink: #212121;
  --nuqta-cream: #f5efe6;
  --nuqta-mist: #b4b4b4;
  --nuqta-amber: #c98c3a;
  --nuqta-slate: #62707c;
}
```

These tokens should be used consistently for custom styling, overlays, borders, buttons, and atmospheric effects.

## 7. Shared Layout and Navigation

### Shared Header

All pages must include the same top navigation.

Navigation items:

- Home
- About
- Program
- Support

Primary nav CTA:

- Join the community

### Header Behavior

- Persistent / sticky on desktop
- Compact and stackable on mobile
- Current page link visually indicated
- CTA styled distinctly but still aligned with the muted brand palette
- Navigation should remain keyboard-accessible at all sizes

### Shared Footer

All pages must include a shared footer containing:

- Nuqta wordmark or text treatment
- Short mission line
- Repeated navigation links
- Placeholder external links
- `Est. 2026`

### Shared Page Contract

Every page must include:

- Shared header
- Shared footer
- Shared theme tokens
- Shared CTA styling
- Shared branded background language
- Shared responsive container widths

### Future-Proofing Rules

To support a later CMS migration, the HTML implementation should follow these structural rules:

- Each major page section should have a unique semantic wrapper and stable heading.
- Repeated content blocks should use consistent internal structure across pages.
- Event and program items should be implemented as reusable card or list patterns rather than custom one-off layouts.
- Date, location, audience, and status should be visually separated from descriptive copy wherever applicable.
- Placeholder links and content targets should be centralized and easy to swap.
- Navigation, footer, CTA bands, and contact blocks should be treated as shared partial-style structures, even if duplicated manually in v1.

## 8. Page-by-Page Section Specifications

### Home

#### Hero

Content:

- Nuqta wordmark
- Main headline: "You were made for more."
- One-line identity: "A mentorship-driven ecosystem for Muslim youth."
- Short supporting paragraph introducing the organization
- Primary CTA: Join the community
- Secondary CTA: Learn the program

Visual requirements:

- Large editorial serif headline
- Strong left alignment
- High contrast cream or near-cream content against a darkened atmospheric backdrop
- Space for the brand mark to breathe

#### Why Nuqta

Content requirements:

- Short framing on the gap in structure, guidance, and companionship
- One pull-line or highlighted statement

#### Three Pillars

The homepage must include three pillar cards or columns:

- Mentorship (Tarbiya)
- Community (Suhbah)
- Leadership Development

Each pillar includes:

- Title
- Short descriptor
- One-line outcome

Use "Tarbiya" consistently in the implementation.

#### Problem / Solution

Present as either:

- A two-column desktop block that stacks on mobile, or
- Two sequential contrast panels

Problem side:

- Darker, quieter treatment
- Framed around isolation, inconsistency, and lack of guidance

Solution side:

- Brighter, more hopeful treatment
- Framed around ecosystem-building, companionship, and sustained growth

#### Student Journey

Represent the path as:

- Attend
- Connect
- Grow
- Lead
- Give Back

This can be rendered as a responsive step row, flow line, or stacked progression.

#### CTA Band

Include a short action section near the bottom of the homepage with:

- Join the community
- Support Nuqta

This band should be simple, high-contrast, and quick to understand.

### About

#### Intro Lead

Open with a short editorial paragraph centered on return:

- return to identity
- return to purpose
- return to conviction

#### Vision

Use the shorter provided vision statement as the default:

"To nurture a generation of Muslim high school students who are confident in their faith, grounded in Prophetic character, and equipped to lead and serve their communities with integrity and purpose."

#### Mission

Present mission as:

- One concise paragraph
- Three supporting bullets

The paragraph should emphasize consistent mentorship, Islamic grounding, space-making, and leadership development.

#### What Nuqta Is / Is Not

Render this as a two-column contrast section.

Left column:

- What Nuqta is

Right column:

- What Nuqta is not

The contrast should be clear and readable, not antagonistic.

#### Why Nuqta

Use the longer narrative version here. It should explain:

- the gap
- the fragmentation problem
- the need for structure and companionship
- how Nuqta bridges existing people and institutions

#### Credo

Break the credo into short thematic blocks:

- We are here to return to the point
- At our best
- We are rooted
- We build for what's next
- At our core
- Remember

Do not present it as one large uninterrupted wall of text.

#### Founders and Advisors

Use placeholder cards for:

- Ali Ali
- Omar Khan

Each card includes:

- Name
- Role label
- One-sentence placeholder description
- Framed image placeholder

### Program

#### Program Overview

Start with one concise paragraph explaining that mentorship, suhbah, and leadership development reinforce one another over time.

#### 2025-2026 Program Model

Present four modules:

1. Monthly major event
2. Bi-weekly trainings and workshops
3. MSA visitations
4. Yearly service project

Each module must include:

- What it is
- Why it exists
- What outcome it drives

These can be displayed as stacked cards, a timeline, or a modular grid that collapses to one column on mobile.

#### Events and Program Cadence

Because future CMS support is expected mainly for events and dates, the Program page should reserve a section for structured recurring program information.

This section should be implemented in a way that can later map to CMS entries. Each item should support:

- title
- short label or category
- cadence
- audience
- brief description
- optional date or season text
- optional destination link

For the static version, these values can be hard-coded. The layout should still assume that multiple items may be added, removed, or reordered later.

#### Three Pillars in Practice

Translate the core pillars into operating behaviors:

- Tarbiya through mentorship and development
- Suhbah through belonging and shared growth
- Leadership through training, service, and responsibility

#### Student Experience

Re-use:

- Attend
- Connect
- Grow
- Lead
- Give Back

This time with one short sentence under each step.

#### Relationship with Masajid

Frame Nuqta as:

- not a competitor
- not a replacement
- a bridge that supplies continuity, focus, and youth leadership infrastructure

#### Partnership / Bridge Section

Reference:

- MIST
- institutional partnership potential
- visibility and bridge-building

The wording should remain credible and avoid overclaiming current commitments.

#### CTA

End the page with a strong invitation to join the community.

### Support

#### Support Overview

Lead with a concise statement connecting support for Nuqta to the development of future Muslim leadership.

#### Why Support Nuqta

Use bullet-led impact framing:

- investment multiplies through students, schools, and communities
- each developed student strengthens surrounding institutions
- support builds infrastructure, not just isolated events

#### Impact Framing

Explain that support helps Nuqta:

- connect youth to mentors
- connect MSAs to guidance and structure
- connect communities to one another

#### The Ask

Keep the ask simple and direct:

- Become a sustainer
- Partner with Nuqta
- Help bring the model to more students

#### External Links Block

Use buttons or action cards for placeholder destinations:

- Donation
- Interest form
- Email
- Instagram / social

#### Contact / Connect

Include a text-based block with placeholder contact data and replacement notes for final implementation.

## 9. Responsive Behavior

### Mobile

- Single-column content flow
- Compressed hero spacing
- Navigation stacks or collapses cleanly
- Pillar cards stack vertically
- Program modules stack vertically
- Footer condenses without overcrowding
- Large serif headings scale down without becoming dense

### Tablet

- Two-column layouts where appropriate
- Preserve comfortable whitespace
- Maintain strong visual rhythm between sections

### Desktop

- Wide editorial composition
- Asymmetric hero spacing is allowed
- Contrast sections may sit side-by-side
- Footer and navigation can breathe horizontally

## 10. Accessibility Requirements

The implementation must satisfy these requirements:

- Sufficient color contrast for all text and interactive controls
- Proper semantic heading order
- Keyboard-accessible navigation and links
- Visible focus states
- Reduced-motion-friendly behavior
- Decorative visuals must not impair legibility
- Alt text required for real logos and founder images once assets exist

Additional guidance:

- Large text over atmospheric backgrounds should sit over subtle overlays when needed
- Links and buttons must remain clear without relying on color alone

## 11. Asset and Placeholder Strategy

### Placeholder Policy

The first version may use placeholders for:

- Founder photos
- Donation URL
- Community/join destination
- Social links
- Email destination
- Final logo exports if needed during early build

### Placeholder Rules

- Use framed neutral blocks for missing portrait imagery
- Use stable placeholder token names in code and documentation
- Never fabricate testimonials, impact statistics, or partner lists
- Placeholder content should be obviously temporary but visually integrated

### Link Contract

Use these stable replacement tokens in implementation planning:

- `JOIN_URL`
- `SUPPORT_URL`
- `INSTAGRAM_URL`
- `EMAIL_ADDRESS`

### Future CMS Content Models

The future CMS does not need to own every part of the site. It should primarily manage content that changes over time.

Recommended CMS-managed content types:

#### Event

Fields:

- title
- slug
- short summary
- full description
- event type
- audience
- start date
- end date
- recurring cadence text
- location text
- external link
- status
- featured flag

Use cases:

- monthly major events
- workshops
- visitations
- service projects

#### Program Module

Fields:

- title
- slug
- summary
- purpose
- outcome
- cadence
- audience
- display order

Use cases:

- monthly event
- bi-weekly trainings
- MSA visitations
- yearly service project

#### Founder / Advisor

Fields:

- name
- role
- short bio
- image
- display order

#### Site Link

Fields:

- label
- destination
- category
- active state

Use cases:

- join links
- support links
- Instagram
- email destination

### CMS Migration Strategy

When the site later moves to a CMS-backed setup, the recommended sequence is:

1. Keep the visual design and frontend markup patterns intact.
2. Move only time-sensitive content into structured entries first.
3. Start with Event, Program Module, and Site Link content types.
4. Keep evergreen narrative pages mostly static until frequent editing justifies migrating them too.

This means the initial HTML implementation should separate:

- evergreen narrative content
- repeatable structured content
- destination links

That separation will reduce rework later.

### Asset Contract

Expected final assets:

- Primary Nuqta logo in dark and light variants
- Secondary `N.` mark in dark and light variants
- Founder photos
- Optional background texture asset if CSS-only grain is not used

## 12. Acceptance Criteria

### Information Architecture

- All four pages exist with clear purpose and distinct content
- Homepage communicates the organization in under 30 seconds
- Secondary pages expand the story without repeating the homepage verbatim

### Navigation

- Every page is reachable from the shared header
- The current page is visibly indicated
- The primary CTA remains present and distinct

### Visual System

- The site reads as one coherent branded system
- The background treatment is atmospheric but legible
- Typography hierarchy is consistent across all pages

### Responsive Behavior

- The homepage hero remains readable at small mobile widths
- Pillars and program sections reflow cleanly
- Footer remains usable and readable on mobile

### Accessibility

- Body copy and controls maintain sufficient contrast
- Keyboard focus states are obvious
- Decorative treatments do not compromise content readability
- Motion can be reduced or removed without harming usability

### Placeholder Resilience

- Missing founder photos do not break the layout
- Placeholder links can be replaced later without structural changes
- Placeholder branding assets can be swapped for finals without redesigning page structure

## 13. Open Items for Later Implementation

These are deferred inputs, not blockers:

- Final logo asset exports
- Final founder bios and portraits
- Final donation URL
- Final join/community URL
- Final social URL(s)
- Final email address
- Final wording polish for mission and support copy
- Whether the support page later expands into sponsor tiers or donor-specific messaging
- Whether future CMS adoption should be headless or tied to a site generator
- Which event fields are most important for public display in v1 of the CMS

## Implementation Notes

- Build as pure static HTML, not a single-page app.
- Use Tailwind CSS for layout, spacing, grids, containers, responsive type sizing, and card/button patterns.
- Use one shared `styles.css` file for theme variables, gradients, overlays, grain effects, and reusable branded accents.
- Keep JavaScript optional. If animation is added, it must degrade gracefully and remain non-essential.
- Keep the homepage concise and let About, Program, and Support carry the deeper narrative.
- Treat event and program content as structured repeatable blocks from the start, even while hard-coded in HTML.
- Keep changing data separate in the markup wherever possible so it can later map cleanly to CMS fields.
