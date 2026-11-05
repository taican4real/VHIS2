# VHIS Phase 10 responsive prototype review

## What is delivered

The project is a connected, static browser prototype for one VHIS website spanning Nursery, Primary and Secondary. Start at `prototype.html`; choose the 1440 px desktop, 768 px tablet or 390 px mobile frame. Each frame loads the real multi-page website so its navigation and page links continue to work in the preview.

This is **not an editable Figma file or Figma-connected prototype**. No Figma workspace/document was available. The browser prototype does not submit forms to a server, store applicant information or provide applicant accounts.

## Pages

The public website includes:

- Homepage, About VHIS and the Our Schools overview
- Nursery, Primary and Secondary division pages
- Academics and Admissions
- School Life, Facilities, Sports & Games, Clubs & Societies and Gallery
- News & Events listing and article/event detail template
- FAQ and Contact

The application form is a printable design-review draft. Use its print action to open the browser print/save-as-PDF interface for a local review copy. It is not an approved school form or a downloadable official PDF.

## Interactions in the browser prototype

| Journey | Prototype behavior |
|---|---|
| Main navigation | Shared navigation, mobile menu, Schools and School Life dropdowns, admissions CTA and page links |
| Division discovery | Manual Nursery / Primary / Secondary carousel, previous/next, indicators and division destinations |
| Admissions enquiry | Parent/guardian, email, phone, student, division and message validation; field error and simulated completion feedback |
| Application form | Draft preview and browser print/save-to-PDF action |
| Gallery browsing | Image preview dialog, next/previous, keyboard arrow keys, Escape/close and focus return |
| FAQ | Native keyboard-operable expand/collapse disclosure |
| News and events | Listing cards link to the article/event detail placeholder |

Form completion is a local demonstration only: entered values are not transmitted or stored. The form must be connected to an approved VHIS service, with privacy and data-retention terms, before launch.

## Responsive and accessibility review

- The prototype launcher provides fixed-width review frames at 1440, 768 and 390 CSS pixels; page content reflows at the existing breakpoints rather than scaling a desktop screenshot.
- Browser smoke tests covered all 17 public pages at all three widths (51 page/viewport checks); no horizontal overflow was observed.
- Navigation menus and FAQ disclosures use native buttons/details, with visible focus styling and keyboard operation.
- Enquiry labels, required-field markers, inline error descriptions, invalid states and live status feedback are present.
- Gallery controls have accessible names; the modal provides a caption, count, previous/next controls, Escape close and focus restoration.
- The homepage carousel is manual, has labeled controls and does not auto-advance. The shared stylesheet includes a reduced-motion preference.
- Meaningful representative photographs have alternative text. Replace all stock imagery with approved, rights-cleared VHIS photography and recheck alternatives.
- Browser-tested journeys include carousel slide changes and division links, mobile-menu Escape/focus return, FAQ expansion, event-to-article navigation, gallery next/Escape/focus return, and enquiry required-field, email, phone and simulated-success states.
- WCAG 2.2 AA is the review benchmark, not a conformance claim. Verify final color contrast, full keyboard flow, zoom/reflow, screen-reader announcements and touch targets against approved final content and browsers.

## Content and production dependencies

All facilities, sports, clubs, events, leadership, contact information, fees, entry requirements, school facts and application instructions that lack school verification remain explicit placeholders. Images are illustrative. No results, awards, affiliations, testimonials or tuition fees have been added.

Before publication, VHIS must approve the brand tokens, website copy, photography and image rights, contact/social destinations, facilities and activities, admissions requirements, official application form, privacy notice and a real enquiry destination.
