# VHIS website — Figma design-system handoff

**Status:** working design proposal for school management review; not an approved identity.  
**Project:** Victory Heritage International School — one public website, three divisions.  
**Editable Figma status:** No Figma file, Stitch export or connected Figma workspace was present in the supplied project. This handoff documents and previews the website system in the workspace for recreation or import into a school-owned Figma file.

## Review before design approval

- The supplied logo reference is used from `assets/vhis-logo.png`. Preserve its aspect ratio, original colors and clear space.
- Palette values sampled or derived from the supplied image are **website UI tokens, not official color codes**. Management should approve or revise them before launch.
- Manrope and Inter are proposed typefaces, subject to brand approval and licensing/availability review.
- Replace illustrative photo references only with approved, rights-cleared VHIS photography and verified alt text.
- All school history, leadership, curriculum, facilities, entry requirements, fees, contact details, events and social profiles need review by VHIS.
- The admissions area is a public enquiry and printable-form experience only; it is not an applicant portal. No tuition rates or payment schedules are displayed.

## Website structure and source files

The public website is now a static, multi-page site. Its shared navigation links to independent page templates instead of scrolling to unrelated homepage sections:

| Page | File |
|---|---|
| Homepage | `index.html` |
| About VHIS | `about.html` |
| Our schools overview | `schools.html` |
| Nursery School | `nursery.html` |
| Primary School | `primary.html` |
| Secondary School | `secondary.html` |
| Academics | `academics.html` |
| Admissions and admission enquiry | `admissions.html` |
| School life overview | `school-life.html` |
| Facilities | `facilities.html` |
| Sports & games | `sports.html` |
| Clubs & societies | `clubs.html` |
| Gallery | `gallery.html` |
| News and events | `news.html` |
| News article detail template | `news-story.html` |
| Contact | `contact.html` |
| Frequently asked questions | `faq.html` |
| Printable application form draft | `application-form.html` |

- `design-system.html` — browser-readable foundation and component showcase.
- `prototype.html` — connected browser prototype with 1440 px desktop, 768 px tablet and 390 px mobile starting views.
- `PROTOTYPE-REVIEW.md` — tested prototype journeys, accessibility/usability review notes and launch dependencies.
- `tokens.json` — semantic color, type, spacing, layout and shape token inventory. Values are a proposal, not brand constants.
- `styles.css` — shared responsive site styling, page templates and component behavior.
- `script.js` — shared menu, homepage carousel, simulated enquiry validation, gallery lightbox and copyright interactions.

Open `prototype.html` to select a responsive viewport and begin the website from its homepage. Use the shared navigation and footer to move between pages. Open `design-system.html` in a browser to review the system. The JSON is a source inventory, not a Figma Variables import plugin file. In Figma, create local variable collections and map the listed tokens by role.

## Figma file structure

Create these ordered pages. Use a desktop-first component source, with responsive frames where specified below.

| Page | Purpose / contents |
|---|---|
| 00 Project Overview | Project objective, audiences, included/excluded scope, approvals, content accuracy rules, prototype map and revision status. |
| 01 Brand Exploration | Approved logo placement, current-identity reference, provisional moodboard and palette exploration; explicitly mark unapproved concepts. |
| 02 Design Foundations | Color, typography, spacing, grids, responsive breakpoints, image treatment, interaction and accessibility standards. |
| 03 Components | Buttons, links, fields, alerts, cards, carousel and content patterns with variants/states. |
| 04 Navigation and Footer | Desktop header, mobile menu, dropdown, breadcrumbs and unified footer. |
| 05 Homepage | Desktop, tablet and mobile home frames, including the three-slide hero. |
| 06 Institutional Pages | About VHIS, history, vision/mission, values, leadership and educational philosophy; use clearly marked placeholders. |
| 07 Division Pages | Shared division template; Nursery, Primary, Secondary. |
| 08 Admissions | Admission overview, process, entry-requirement placeholder, admission-fee-only placeholder, printable draft preview and enquiry. |
| 09 School Life | Facilities, confirmed activities, gallery and approved imagery. |
| 10 News and Events | Listing, cards, dates and individual article detail. |
| 11 Contact and FAQ | General enquiry, verified contact placeholders, location placeholder and eight-category accessible FAQ. |
| 12 Responsive Layouts | Reflow references for 1440, 768 and 390 px; include mobile navigation and forms. |
| 13 Prototype | Connected navigation, carousel, FAQ accordion, simulated enquiry feedback, application-form print preview and gallery browsing. |
| 14 Developer Handoff | Token mapping, component properties, frame/constraint behavior, content dependencies, accessibility and implementation notes. |

## Foundations and provisional palette

Use semantic Figma variable names so a future approved brand palette can replace values without changing component structure.

| Semantic variable | Proposal | Intended role |
|---|---|---|
| `color/primary` | `#A80028` | Sampled VHIS logo crimson; primary action and institutional emphasis |
| `color/primary-dark` | `#600000` | Sampled deep burgundy from the crest; deep backgrounds and header/footer surfaces |
| `color/primary-light` | `#F3DDE3` | Light crimson supporting surface |
| `color/secondary` | `#680019` | Deep burgundy emphasis |
| `color/accent` | `#DB903A` | Sampled logo gold-orange detail; restrained decorative accent |
| `color/background` | `#F8F5F2` | Warm neutral page background |
| `color/surface` | `#FFFEFA` | Cards and form surfaces |
| `color/text-primary` | `#1C2926` | High-emphasis text |
| `color/text-secondary` | `#655D5D` | Secondary text; updated for contrast on light surfaces |
| `color/border` | `#DEDFD8` | Dividers and control borders |
| `color/success` | `#2F684B` | Success feedback |
| `color/warning` | `#855B1F` | Warning feedback |
| `color/error` | `#A33333` | Error feedback |

Additional utility roles in `tokens.json` include on-primary text and focus. The logo's gold-orange is reserved for decorative detail on dark surfaces; use dark text on gold if it becomes a filled surface. Recheck all real text/background combinations—including hover, focus, disabled, form errors and images—against WCAG 2.2 AA in Figma and the browser. Do not rely on color alone to communicate status. Small captions are metadata, not a substitute for readable body text.

## Proposed typography hierarchy

| Style | Typeface | Size / line-height | Use |
|---|---|---|---|
| Display | Manrope 600 | 48–72 / 1.08 | Homepage hero |
| H1 | Manrope 600 | 40–56 / 1.12 | Page title |
| H2 | Manrope 600 | 32–44 / 1.15 | Section title |
| H3 | Manrope 600 | 24 / 1.3 | Card and subsection title |
| Body large | Inter 400 | 17 / 1.65 | Lead copy |
| Body | Inter 400 | 15 / 1.7 | Paragraph and long-form reading |
| Body small | Inter 400 | 12 / 1.65 | Supporting card copy |
| Label | Inter 600 | 12 / 1.4 | Fields, controls and actions |
| Caption | Inter 500 | 10 / 1.5 | Dates and nonessential metadata |

In Figma, create text styles by role (for example `Display / Desktop`, `H1 / Mobile`, `Body / Default`) and preserve text resizing. Use sentence case for interface copy; reserve all-caps and tracking for short overlines.

## Layout, spacing and resizing

- **Desktop:** 1440 px artboard; centered max content width 1200 px; 12 columns; 24 px gutter.
- **Tablet:** 768 px artboard; 8 columns; 32 px side margins; 20 px gutter.
- **Mobile:** 390 px artboard; 4 columns; 18 px side margins; 16 px gutter.
- **Spacing:** 4 px base scale: 4, 8, 12, 16, 24, 32, 48, 64, 96 px.
- Prefer Auto Layout for nav groups, cards, fields, form rows, action groups and stacked sections. Use Hug contents for controls and labels; Fill container for fluid columns and inputs. Use fixed sizing only for known media aspect ratios, icons or target dimensions.
- Set page frames to responsive width and content groups to Fill container. Pin the logo/start and admission action/end in desktop header; let primary navigation wrap or move to the mobile pattern instead of compressing labels.
- Image containers use crop/fill, consistent ratios and documented focal points; keep photography replaceable.
- Avoid unnecessary absolute positioning. Absolute layers are limited to purposeful overlays (image captions, carousel arrows, status/count) inside a clipped media frame.

## Components and variants

Use `Component / Variant=... / State=...` naming. Component families should be reusable across all three divisions.

| Family | Suggested variants / states |
|---|---|
| Button | Primary / Secondary / Text / Light; Small / Default; Default / Hover / Focus / Disabled / Loading |
| Header & navigation | Desktop / Mobile; Default / Scrolled; menu Closed / Open; dropdown Closed / Open / Focus |
| Hero | Institutional / Division; image-left / image-right; desktop / tablet / mobile |
| Division carousel | Nursery / Primary / Secondary; selected indicator; Previous / Next; keyboard focus |
| Division card | Nursery / Primary / Secondary; Default / Hover / Focus |
| Feature card | Image / Text; Default / Hover / Focus |
| News card | News / Event; Image / No image; upcoming / published |
| Gallery card | Grid / Feature; Default / Hover / Focus; meaningful alt-text annotation |
| Breadcrumb | 2–5 levels; current-page state |
| Form field | Text / Email / Telephone / Select / Textarea; Default / Focus / Error / Disabled |
| Application-form preview | Draft / Approved; print/save-as-PDF action; no online submission |
| Alert / feedback | Success / Warning / Error / Information; Icon+text and text-only |
| Footer | Desktop / Tablet / Mobile; approved contact/social content only |
| FAQ accordion | Closed / Open; keyboard focus; category group |

All controls need explicit focus and disabled designs. Minimum interactive target is 44 × 44 px. Error and success feedback need a text label, not only a color. For the public enquiry form, include labeled inputs, privacy/consent copy only after approval and a clear sent/error state when a real service is wired.

## Page-template content checklist

- **Homepage:** institutional introduction and both admission actions; manual three-division carousel; one shared navigation; division cards; approved institutional content; academics; admissions; school life/gallery; news/events; FAQ and contact previews.
- **About VHIS:** school overview, approved history, vision/mission, core values, leadership and philosophy. Do not fabricate people, milestones or statements.
- **Nursery:** Crèche and preschool; approved learning approach, development, facilities, activities and admissions information.
- **Primary:** confirmed classes/year groups, curriculum, teaching, assessment, extracurriculars, facilities and admissions.
- **Secondary:** JSS 1–3 and SSS 1–3; confirmed subjects, labs, ICT, exam preparation, career guidance, clubs, sports and student development. No invented accreditation, affiliation or results.
- **Academics:** overview, curriculum, teaching, assessment, support and extracurricular learning.
- **Admissions:** process, entry requirements placeholder, admission fees only, printable application and enquiry. No tuition fee list or payment schedule.
- **School Life:** confirmed facilities, sports, clubs, activities and gallery.
- **News & Events:** approved dated items, card list and individual article.
- **FAQ:** General, Admissions, Nursery, Primary, Secondary, Academics, School life and Contact.
- **Contact:** verified address, telephone and email when available; clearly marked map/social placeholders until then.

## Prototype and acceptance checks

1. Connect the shared header and footer on all page templates.
2. Link all three division cards and each manual carousel control; use accessible labels and current-slide status.
3. Use native/details behavior or an equivalent keyboard-operable accordion for FAQs.
4. Link the application-form action to its clearly marked local draft preview. Print/save-to-PDF is a browser print action only; no approved school PDF is supplied.
5. Show field-level validation and simulated completion feedback; no enquiry data is transmitted or stored.
6. Connect gallery previews to an accessible modal with next/previous, close and Escape controls.
7. Review desktop, tablet and mobile at 1440 / 768 / 390 px, including long headlines, navigation open, focus, text zoom, narrow form errors and image loading.
8. Check keyboard-only interaction, focus visibility, semantic headings, image alternatives and WCAG contrast after final content and colors are approved.

## Developer handoff and open dependencies

- Tokens are in `tokens.json`; shared CSS custom properties live at the top of `styles.css`.
- Reusable component markup and page patterns are in `index.html`; interactions are in `script.js`.
- The token JSON is an auditable source list, **not** an automatically importable Figma file. Create Figma local variables and text styles from the named entries or use an approved Variables import plugin.
- Before final sign-off, provide an approved vector logo/brand guide if available, approved photographs/usage rights, institutional copy, curriculum information, confirmed contact details, real admission-form file, and any approved operational details.
- Form submission, map embedding, social profiles and downloads must be connected to VHIS-approved destinations before launch.
