# VHIS Phase 12 — Implementation Architecture and Acceptance Specification

**Status:** Proposed implementation baseline for technical and school review  
**Document version:** 1.0  
**Scope:** Architecture, content schemas, CMS authorization, public APIs and acceptance tests  
**Implementation status:** No production implementation is authorized by this document. It is an architecture and requirements deliverable only.

**Phase 13 review:** The architecture direction in [PHASE-13-ARCHITECTURE-APPROVAL-REVIEW.md](./PHASE-13-ARCHITECTURE-APPROVAL-REVIEW.md) was approved by the VHIS project owner on 2 November 2026. Provider, budget, account-ownership, privacy/security and technical setup decisions remain pending, so Phase 14 provisioning remains gated.

## 1. Purpose and authority

This specification translates the Phase 12 master project prompt into an engineering baseline that can be estimated, reviewed and approved before implementation. It does not claim that a CMS, database, integrations, production website or Figma file already exists.

The Phase 12 master prompt remains the authority for project scope and constraints. The current workspace contains a multi-page static prototype, proposed tokens and a Figma handoff, but **no editable approved Figma file, CMS, package manifest, database, approved application PDF, verified content inventory or production credentials**. The browser prototype can guide visual implementation, but it is not proof of final design approval. The existing VHIS website and Figma designs must be reviewed by the delivery team when access and approval are provided.

The additional VHIS Website Technical Specification (Draft v1.0) is treated as a supporting requirements source. Where it conflicts with previously approved scope/design direction or requires an operational/legal decision, this document records the resolution as pending rather than silently treating draft text as approval.

### Decisions requested before coding

| Decision | Proposed baseline | Approval / verification required |
|---|---|---|
| Application architecture | One TypeScript modular monolith: Next.js App Router with Payload CMS integrated into the same application | Technical lead validates Payload / Next compatibility and operating model |
| Database | Render PostgreSQL, separate development/staging databases; Frankfurt is the recommended region | Project owner selected Render; verify exact plans, budget, retention and recovery objectives before provisioning |
| Hosting | Render Node.js web service in Frankfurt, compatible with the selected Next.js and Payload versions | Project owner selected Render; verify plan, account access, staging access controls and storage integration |
| Styling | Implement the approved design with reusable CSS/Tailwind components; preserve the current prototype palette only if design approval confirms it | Obtain editable approved Figma or signed visual acceptance and approved tokens |
| Public API | Same-origin, server-rendered public pages; narrow read-only `/api/public/*` endpoints only where a client interaction needs them | Confirm whether any external consumer needs public APIs |
| CMS API | Payload admin UI and authenticated Payload endpoints; server-side access rules; public clients never call private/local APIs | Confirm staff identity and administrator onboarding |
| Email | Authenticated transactional provider; enqueue notifications after durable enquiry write | Approve provider, sender domain, recipients and data content |
| Media | Cloudflare R2 via the official Payload R2 adapter; EU jurisdiction recommended | Provider/region recommendation pending privacy and rights approval; synthetic non-production uploads only |
| Enquiry retention | Configurable, enforced deletion policy; production blocked until an approved duration and lawful basis are documented | VHIS management / data-protection lead approves retention and notice |
| Student name field | Include only after VHIS confirms necessity and privacy wording; collect no child date of birth or academic records | Explicit form-field approval |
| Analytics / consent | Privacy-reviewed analytics; no nonessential tracking before consent where required | Approve analytics, consent approach and cookie notice |
| Source control | GitHub repository at [taican4real/VHIS2](https://github.com/taican4real/VHIS2); user selected public visibility and documented personal-account ownership rights | Repository populated with the prototype and project documents; formal VHIS ownership/transfer terms and branch protection remain to be confirmed |
| Carousel motion | Manual controls and indicators; no autoplay, matching the current approved prototype/handoff | Draft technical text mentions automatic rotation; any autoplay requires an explicit design/accessibility approval |
| Contact form | Name, email, optional telephone, subject, message and approved privacy acknowledgement | Confirm whether subject is required and approve final labels/notice |
| Maps / WhatsApp | Optional approved map destination and click-to-chat link; do not embed or expose unverified address/phone | Confirm actual school location, telephone, link target and third-party privacy impact |
| Conversion analytics | Track only approved aggregate events: admissions/contact completion, approved PDF access, tel/WhatsApp clicks | Approve GA4/Search Console ownership, consent and event definitions |

### Architecture principles recommended by VHIS

These are adopted as governing principles for the approved architecture direction. The project owner selected Render for hosting and PostgreSQL; final service configuration, privacy review, cost approval and operational evidence are still required before paid provisioning.

1. **Modular monolith:** one integrated Next.js and Payload CMS application, with explicit internal modules rather than separate microservices, unless a documented compatibility or operational finding requires reconsideration.
2. **Private enquiries:** admissions and contact enquiry records stay in protected CMS collections. They are never returned by public content APIs, public search, sitemaps or anonymous media/content relations.
3. **Structured CMS content:** division pages use reusable templates and validated, CMS-managed content blocks/fields. Routine school-content changes must not require source-code edits; page structure and allowed content types remain developer-controlled.
4. **VHIS account ownership:** domain/DNS, hosting, database, source repository, storage, email delivery, analytics and essential service accounts must be created under VHIS control or have contractually documented ownership, administrator access, portability and transfer rights. Use named least-privilege team access; do not make a developer's personal account the sole owner.
5. **Architecture approval gate:** no full development begins before the technical architecture, compatibility, cost and operating model have been reviewed and formally approved by VHIS.

Pin exact compatible versions at Stage 12.1 after checking official support matrices, security advisories, licenses and hosting constraints. Do not use `latest` in a lockfile, and do not begin full implementation before the technical specification and architecture are approved.

## 2. Scope and invariants

### 2.1 Public website included

Homepage; About VHIS; Nursery; Primary; Secondary; Academics; Admissions; School Life; Facilities; Sports & Games; Clubs & Societies; Gallery; News & Events listing and detail; FAQ; Contact Us; admissions/general enquiries; an approved application PDF; CMS content publishing; SEO; privacy-reviewed analytics; security; responsive UI.

### 2.2 CMS included

Authenticated administration for pages, division content, academic content, admissions information and approved admission-fee information, news, events, galleries, FAQs, navigation, site settings and media. Roles and publication controls must be enforced on the server for every API operation, not merely hidden in the admin UI.

Public page templates and route structure are implemented as reusable application code; approved page and division content is stored in structured CMS fields/blocks. This boundary lets authorized VHIS editors update content without letting CMS content inject executable code or arbitrary page layouts.

### 2.3 Explicit exclusions

No parent/student/staff portal; student records; attendance; marks, results or report cards; CBT/exam management; online school-fee/payment management; timetables; applicant accounts, application submission or tracking; school ERP. Enquiries are contact records for follow-up, not applications or admissions decisions. Do not add excluded functionality without documented scope change and written approval.

### 2.4 Content and privacy rules

- Do not publish unverified claims, staff identities, facilities, curriculum/accreditations, awards, statistics, testimonials, fees, dates, admission requirements or contact information.
- Do not publish child photographs until VHIS confirms rights, appropriate permissions, intended audience and removal process.
- Store only fields required for a parent-facing response. Do not collect date of birth, health information, academic records, identity documents or attachments through public enquiry forms.
- Public content endpoints must never expose draft, private, scheduled, deleted or unapproved data.
- An application download is a single school-approved PDF, not an online application workflow.

## 3. Target architecture

### 3.1 Logical architecture

```text
Public visitors
    │ HTTPS
    ▼
DNS / CDN / WAF / rate limiting
    │
    ▼
VHIS web application (Next.js App Router, React, TypeScript)
    ├── Public pages: server-rendered content, responsive UI, SEO metadata
    ├── /api/public/*: narrow read APIs and enquiry form endpoints
    ├── /admin: Payload CMS, authenticated staff UI
    ├── /api/*: Payload admin/API routes, all collection access-checked
    └── server-only domain services: validation, publishing, mail queue, audit
          │                 │                 │
          ▼                 ▼                 ▼
   PostgreSQL        Object storage      Transactional email
   content, users,   original/private    notifications with
   enquiries, audit  assets/derivatives  minimal PII
          │
          └── scheduled maintenance: retention deletion, backups, health checks
```

### 3.2 Application shape

Use a **modular monolith**, not microservices. One application, one content database and explicit module boundaries keep delivery and operations proportionate to a public school website.

- **Public presentation:** Next.js App Router with server components and server-rendered pages by default. Client components are limited to genuine interactions such as mobile navigation, gallery controls and consent-managed analytics.
- **CMS:** Payload CMS admin and collections integrated into the application. Admin routes require authentication and MFA for privileged users. Private collection authorization is enforced in Payload access functions and service-level checks.
- **Domain services:** application modules for content queries, enquiry intake, media approval, publishing/preview, email delivery, redirects and audit.
- **Database:** PostgreSQL via the CMS-supported adapter and migrations. Schema changes are versioned, reviewed and deployed with a backup/rollback plan.
- **Media:** object storage for images and approved PDFs. Store asset metadata and keys in the CMS/database, not binary content in PostgreSQL. Generate optimized derivatives; apply private/public access by asset state.
- **Email:** provider API behind a small adapter. Enquiry persistence succeeds independently from email delivery; notification failures are retried and visible to authorized operators.
- **No public direct CMS/DB access:** public pages use server-side allow-listed queries. Public APIs use DTOs (explicit response types) and never return raw CMS documents, internal IDs unnecessarily, access-control fields, user records, enquiry data, unpublished media keys or audit data.
- **No public GraphQL by default:** the website has no documented need for a general public query language. Do not expose one without a separate threat model and approval.

### 3.3 Deployment topology

| Environment | Data and access | Required controls |
|---|---|---|
| Development | Local app and isolated development database; synthetic data only | `.env.local` excluded from Git; no production PII or secrets |
| Staging | Private deployment, separate database, storage bucket, email recipient allowlist and test analytics property | Access restricted to reviewers; `noindex`; use synthetic/test submissions; test roles and restore process |
| Production | VHIS-controlled domain, application, database, object storage, email and analytics accounts | HTTPS/HSTS, least privilege, backups/PITR, monitoring, rate limits, approved content, documented rollback |

Keep the current public VHIS site operating until UAT, launch approval, redirect validation and rollback readiness are signed off. Stage changes through protected branches and a reviewed CI pipeline. Production releases are immutable build artifacts; do not make manual code edits on production.

### 3.4 Suggested source layout

```text
src/
  app/
    (site)/                 # Public page routes and layouts
    admin/                  # Payload administration
    api/public/              # Narrow, versioned public route handlers
    sitemap.ts
    robots.ts
  access/                    # Collection, field and role access functions
  blocks/                    # Typed page/division content blocks
  collections/               # Payload collection definitions
  components/                # Approved reusable presentation components
  domain/
    enquiries/               # Intake, validation, privacy and notification
    publishing/              # Review, publish, preview and invalidation
    media/                   # Upload policy and image/permission workflow
    redirects/               # Legacy URL mapping
  lib/
    cms/                      # Server-only Payload client and DTO mappers
    email/                    # Provider adapter and retry/outbox worker
    env/                      # Startup environment validation
    security/                 # Rate limiting, origin and bot checks
  payload.config.ts
tests/
  unit/
  integration/
  e2e/
```

Adapt names to the approved Payload version and Next.js routing conventions; keep domain logic out of page components and HTTP handlers.

### 3.5 Cache and publishing model

- Published public content can be cached at the page/data layer and CDN. Draft/private content is never shared-cacheable.
- Preview mode requires an authenticated CMS user with permission for the specific document, uses a short-lived signed preview token, sets no-store/noindex and is never publicly cacheable.
- On publish, unpublish, delete or redirect change, invalidate only the relevant route/tag and its sitemap/listing dependencies. Confirm invalidation succeeds or enqueue retry; don't report an update as published while stale content can persist indefinitely.
- Publication timestamps are server-generated UTC; event start/end values include the school's confirmed timezone. Display timezone only after VHIS confirms the correct locality/timezone.

### 3.6 Technical controls

- Validate required environment variables at startup; fail closed if secrets, database, storage or email configuration is missing in an environment that requires it.
- Keep secrets in provider-managed secret storage. Never include secret values in client bundles, logs or error responses.
- Use parameterized CMS/database APIs; sanitize rich text at the rendering boundary and allow only approved block types.
- Set security headers (CSP, HSTS in production, frame protections, referrer policy, MIME sniffing protections) consistent with embeds and CMS admin.
- Configure structured logs with correlation/request IDs. Redact form values, email, phone, message, bot tokens, cookies, credentials and authorization headers.
- Backups cover database and media metadata; object storage versioning/replication and retention are specified by the selected provider. Test restoration, not just backup creation.
- Set and monitor explicit recovery objectives before launch: proposed baseline **RPO ≤ 24 h** and **RTO ≤ 8 h**, subject to provider capabilities and management approval.

## 4. Content model and schema conventions

Schemas below describe logical fields; exact Payload field syntax is version-specific and must be generated/tested against the pinned stack. All collection identifiers are internal opaque IDs. Use UTC timestamps and normalized slugs.

### 4.1 Common publishing fields

Publicly publishable collections use:

| Field | Type / constraints | Notes |
|---|---|---|
| `title` | Required string, 1–160 characters | Plain text; trim whitespace |
| `slug` | Required URL-safe string, unique in its collection, lowercase | Stable route key; reserve system routes |
| `status` | `draft \| in_review \| published \| archived` | State transition validated server-side |
| `publishedAt` | UTC datetime, server-managed | Required on publish; cleared/retained by explicit archive policy |
| `reviewedAt`, `reviewedBy` | Nullable datetime / user relation | Written by approved reviewer, immutable to regular editors |
| `createdAt`, `updatedAt` | System timestamps | Never accept from public request bodies |
| `createdBy`, `updatedBy` | User relations / system actor | Not exposed in public DTOs unless an approved author credit is required |
| `seo` | Optional `title` (≤ 60 chars), `description` (≤ 160 chars), `noIndex` boolean | Canonical generated from approved public URL; prevent editor-controlled arbitrary canonical domains |
| `revision` | System version | Enable version history and restore |

Content changes to a published record create a draft revision while the prior approved version remains public. The new revision replaces it only after review and publish. `archived` removes it from public listings and content endpoints.

### 4.2 Rich content blocks

Use a typed allowlist of blocks, not unrestricted HTML or arbitrary JSON:

| Block | Fields | Validation |
|---|---|---|
| `richText` | Lexical/editor state | Sanitize on render; allow approved headings, paragraphs, lists, links; disallow scripts, embedded forms and unsafe inline styles |
| `image` | Media relation, alt text, optional caption | Meaningful image requires reviewed alt text; decorative images use explicit empty alt |
| `callToAction` | Label, internal route or allow-listed external URL, style | Descriptive label; validate internal route; external URL HTTPS and approved |
| `cardGrid` | Heading and 1–6 typed cards | Each card has title, short text, optional image and route |
| `featureSplit` | Heading, text, media, image side | Responsive layout; validated media rights state |
| `quote` | Quote and optional attribution | No testimonial published without explicit school approval/consent |
| `documentLink` | Approved media relation, visible title, file type and size | Only approved/public PDFs; no unreviewed document URL |
| `faqGroup` | FAQ relations | Public API still filters each FAQ to published |

No free-form script, iframe, embed code or raw HTML is accepted from CMS editors.

### 4.3 Collections

#### Users (Payload authentication collection)

| Field | Type / rules |
|---|---|
| `email` | Required, normalized lowercase, unique |
| `name` | Required display name |
| `role` | Required enum from §5; assigned/changed only by Super Administrator under approved onboarding |
| `active` | Boolean; inactive users cannot authenticate or use any API |
| `auth` | Password hash and session/reset fields managed by Payload/auth provider; never readable through client DTOs |
| `mfa` | Required for Super Administrator and School Administrator; enable for all staff where supported |
| `lastLoginAt` | Server-managed audit metadata; not public |

No public registration. Prefer invitation-based accounts, strong password policy, MFA, short-lived recovery tokens, revocation on role/active change and an account recovery process. Do not store a separate plaintext password or duplicate built-in authentication fields.

#### Pages

`title`, unique `slug`, `summary` (≤ 300 chars), `template` enum (`home`, `standard`, `about`, `school-life`, `contact`, `faq`), `content[]` blocks, optional `featuredMedia`, `seo`, `status`, review fields. The homepage is a controlled singleton with route `/`; pages cannot claim reserved division, news, events, admin or API routes.

About page content includes approved history, vision/mission, values and leadership sections as content blocks. No staff biography becomes public without school approval.

#### Divisions

Exactly three controlled slugs: `nursery`, `primary`, `secondary`. Fields: `name`, `slug`, `navigationLabel`, `order` (unique 1–3), `heroMedia`, `heroAlt`, `heroHeadline`, `intro`, `sections[]` typed blocks, `admissionsCta`, `seo`, publishing/version fields.

Content sections represent, where confirmed:

- Nursery: Crèche, Preschool, learning approach, child development, activities, facilities and admissions.
- Primary: approved classes/year groups, curriculum, teaching/learning, assessment, extracurricular activities, facilities and admissions.
- Secondary: JSS 1–3 and SSS 1–3, approved curriculum/subjects, laboratories/ICT, examination preparation, career guidance, clubs/sports and student development.

Do not create numeric achievement/statistic fields or make unverified details mandatory.

#### Academic programmes

Fields: `title`, unique `slug`, `division` relation (optional for cross-division subject), `summary`, `content[]` blocks, `subjects[]` approved plain-text items (optional), `order`, `status`, review/SEO. Only school-confirmed curriculum/programme terminology is publishable. Do not imply accreditation or examination affiliation without explicit approval.

#### Admissions information (singleton)

Fields: `overview`, `processSteps[]` (ordered title and description), `entryRequirements[]` (approved text, initially empty/placeholder), `applicationPdf` relation to an approved media asset, `enquiryFormEnabled`, `privacyNotice` relation/version, `status`, review fields. No tuition schedules or applicant account/tracking fields.

#### Contact information (singleton section in site settings)

Use the public-safe part of Site Settings for approved address, telephone, email, opening hours, map URL/provider and WhatsApp destination. Each value may remain empty until confirmed. The editor must not enter arbitrary map embed HTML, scripts or a client-supplied recipient. A map link/third-party embed and WhatsApp contact remain disabled until VHIS approves destination, privacy impact and mobile behavior.

#### Admission fee records

Fields: `label`, `amount` decimal ≥ 0 (nullable until approved), `currency` ISO code, `division` relation or `all`, `effectiveFrom`, nullable `effectiveTo`, `status`, `approvedBy`, `reviewedAt`, optional public note. Constraint: only a specifically approved **admission fee** can be made public. No tuition, recurring charges or payment schedule is modeled. Do not expose until finance/management approves amount, currency, dates and presentation. Archive superseded records; do not silently overwrite an effective fee.

#### News articles

Fields: common publishing fields; `summary` (required, ≤ 400 chars); `body[]` blocks; `featuredMedia`; `imageAlt`; optional `category`; optional `authorCredit` (approved display string only); optional `relatedDivision[]`; `publishedAt`; `seo`. Reject publication if a required image lacks approved rights/alt text. No unverified results, awards or testimonials.

#### Events

Fields: common publishing fields; `summary`; `body[]`; `startAt`, `endAt` (end ≥ start), `timeZone` (approved IANA zone), optional `locationLabel` (approved text; no fabricated venue); `featuredMedia`; `registrationUrl` optional HTTPS allow-listed URL only when approved; `status`. Past events remain detail-viewable only while published and are filtered from upcoming listings. No student registration/booking functionality.

#### Gallery categories and gallery items

`GalleryCategories`: `name`, unique `slug`, `description` optional, `order`, `status`.

`GalleryItems`: `title` or approved caption, required image relation, `altText`, category relation, `featured` boolean, `capturedAt` optional (do not infer date), `rightsStatus` enum (`pending`, `approved`, `rejected`, `expired`), `permissionReference` restricted/private, `permissionExpiry` optional, `status`, review fields. Public query includes only published items with `rightsStatus=approved`, no expired permission and completed alt text. Private permission references never appear in public DTOs.

#### FAQs

Fields: `question` (required, ≤ 240 chars), `answer` rich text (approved safe blocks), `category` enum (`general`, `admissions`, `nursery`, `primary`, `secondary`, `academics`, `school-life`, `contact`), optional division relation, `order`, `status`, review fields. Reject empty answer, unsupported HTML and unapproved factual claims. Public ordering is category then `order`.

#### Media assets

Use Payload upload metadata plus controlled custom fields: `altText`, `caption`, `visibility` (`private`, `public`), `approvalStatus`, `rightsStatus`, `permissionReference` private, `permissionExpiry`, `focalPoint`, `uploadedBy`, `checksum`, generated `variants`, `mimeType`, `byteSize`. Allowlist raster formats and PDF only; disallow SVG uploads unless sanitized by an approved pipeline. Validate actual file signature, not only extension/MIME header. Enforce configurable size/pixel limits, image re-encoding, malware scanning where supported, safe filenames and no public serving before approval. Originals and private documents require restricted access.

#### Navigation items

Fields: `label`, `parent` self-relation (bounded nesting; maximum 2), `destinationType` (`internal`, `external`, `document`), internal `page`/`division`/`route` relation, external HTTPS URL when approved, `order`, `placement` (`primary`, `footer`, `utility`), `enabled`, `status`. Validate no cyclic parent links, inaccessible targets or duplicate siblings. Enquiry action target is configured route, never arbitrary script.

#### Site settings (singleton)

Fields: approved school display name, approved logo asset, social URLs (HTTPS host allowlist), address/telephone/email (nullable until verified), map link/provider configuration (optional; no exact location until approved), public enquiry recipient reference (server secret/ID, never public), timezone, sitemap defaults, consent settings, canonical host. Separate public-safe fields from server-only values in field-level access. Do not store SMTP credentials, API keys or secrets in CMS.

#### Redirects

Fields: `sourcePath` unique normalized local path, `destinationPath` or approved HTTPS destination, `statusCode` (`301`, `302`), `enabled`, `createdBy`, `reviewedBy`. Reject protocol-relative URLs, open redirects, loops, source collisions with live routes and chains. Preserve path/query rules explicitly. Apply only after review and include old VHIS URLs from approved crawl inventory.

#### Enquiries (private collection; not public content)

| Field | Type / validation |
|---|---|
| `type` | `admissions \| contact` |
| `contactName` | Required trimmed name for the enquiry sender, max 120; admissions API maps parent/guardian name here and contact API maps the visitor's name |
| `email` | Required normalized email, max 254 |
| `phone` | Required, max 32; normalize for validation, preserve display form only if needed |
| `subject` | Contact form only; required after VHIS approves its field/label, 1–160 trimmed characters |
| `studentName` | Optional until VHIS approves necessity/privacy wording; max 120 if enabled |
| `divisionOfInterest` | Required enum: `nursery \| primary \| secondary \| general` (contact form may use `general`) |
| `message` | Required trimmed text, max 3000; reject empty/whitespace and control characters |
| `privacyNoticeVersion` | Required approved version ID for production submission |
| `privacyAcknowledgedAt` | Server timestamp; client sends boolean acknowledgement, server binds it to the active notice version |
| `status` | `new \| assigned \| responded \| closed`; internal follow-up only, not application status/tracking |
| `assignedTo` | Optional user relation restricted to Admissions Officer / School Administrator / Super Administrator |
| `notificationState` | `pending \| sent \| failed`; internal, retryable |
| `createdAt`, `retentionDeleteAt` | Server timestamps; retention date derived from management-approved policy |

Do not persist CAPTCHA tokens, raw IP addresses, full user-agent strings or request bodies in logs. If abuse monitoring needs network identifiers, use a short-lived keyed hash and approved short retention. Do not store message text or other PII in outbound notification payloads beyond what the recipient must see; preferred email is a generic notice and a protected CMS link.

Production creation is disabled until the privacy notice and retention period are approved. A scheduled job deletes records on/after `retentionDeleteAt`, records a non-PII deletion audit event and reports failures. Retention must include provider backups, email queues and logs in the documented policy.

#### Audit log

Append-only records: actor ID/system actor, action, collection, record ID, timestamp, request/correlation ID, changed field names, outcome. Do not store before/after values of enquiry PII, authentication secrets, full message content or uploaded files. Read access is Super Administrator and authorized audit reviewer only; no edit/delete through CMS. Retention and export policy require approval.

### 4.4 Indexes and integrity

- Unique normalized indexes: user email; each public collection slug; division slug; category slug; navigation sibling order/placement where feasible; redirect source path.
- Query indexes: publication status + publication date; category + order; division relation; event start/end; gallery category + order; enquiry createdAt/status/type/retentionDeleteAt; audit timestamp/actor.
- Use database constraints where possible in addition to CMS validation. Validate relations at write time and handle deleted related records by restricting deletion or archiving dependent content.
- Use transactions for content state changes, enquiry persistence and audit writes where supported. Email notification is asynchronous/outbox-based and must not undo a saved enquiry.

## 5. CMS roles, permissions and workflow

### 5.1 Permission model

Roles are fixed application capabilities, not editable content records. A user has one primary role unless a formally approved multi-role design is implemented. Field- and record-level access is enforced server-side for both admin UI and REST/local API.

Legend: **M** manage assigned content; **D** draft/edit; **R** review/approve; **P** publish/unpublish; **Read** read private records; **Triage** assign/status/update enquiry; **—** no access. Each action is limited by record assignment/collection where applicable.

| Collection / capability | Super Admin | School Admin | Academic Content Manager | Admissions Officer | News & Events Editor | Gallery Manager | Content Editor |
|---|---:|---:|---:|---:|---:|---:|---:|
| Users, roles, MFA/security settings | M | — | — | — | — | — | — |
| Global settings, navigation, redirects | M | M | — | — | — | — | — |
| General pages | M/R/P | M/R/P | D/R on academic sections | D/R on admissions sections | — | — | D assigned pages |
| Nursery/Primary/Secondary content | M/R/P | M/R/P | D/R/P assigned academic/division fields | — | — | — | D assigned pages only |
| Academic programmes | M/R/P | M/R/P | M/R/P | — | — | — | D if assigned |
| Admissions information / admission fees | M/R/P | M/R/P | — | M/D/R/P after fee approval policy | — | — | — |
| News articles / events | M/R/P | M/R/P | — | — | M/D/R/P | — | D if assigned |
| Gallery categories/items/media | M/R/P | M/R/P | — | — | — | M/D/R/P | D only when assigned |
| FAQs | M/R/P | M/R/P | D/R/P academic/division categories | D/R/P admissions category | — | — | D assigned categories |
| Enquiries | Read/Triage | Read/Triage | — | Read/Triage | — | — | — |
| Audit log | Read | — | — | — | — | — | — |
| Public read APIs | Not applicable; same published-safe DTOs | | | | | | |

`P` does not permit the author to approve their own revision for high-risk public content. Admission fee records, contact/site settings, application PDF replacement, privacy notice, student-photo permission and redirects require a reviewer distinct from the author. Final policy can require two-person approval for all publication.

Super Administrator access is limited to a minimal named set of VHIS-controlled accounts, MFA required, and reviewed periodically. School Administrator cannot grant roles, read user passwords, inspect secrets or access enquiries unless separately granted an Admissions function. Never create a shared administrator account.

### 5.2 State transitions

```text
draft → in_review → published → archived
             │           │
             └─ changes requested → draft
published → new draft revision (previous revision stays live until approved)
```

- Only a role with `D` can create/edit a draft in its permitted collection/record.
- `in_review` freezes the submitted revision; an editor must withdraw it before editing.
- A reviewer can approve, request changes, or reject with an internal reason.
- `published` requires required fields, related media approval, reviewer identity, approval timestamp and role capability.
- Author cannot approve own high-risk content. `publishedAt` is server-controlled and can be immediate or scheduled only by a publishing role.
- Unpublish/archive creates an audit event and invalidates caches. Deletion is restricted; public content is archived, not hard-deleted, except legal/privacy workflows approved by policy.
- Draft preview is authenticated, scoped to a specific record and expires. It must not be indexable or cacheable.

### 5.3 Access-control implementation requirements

- Deny-by-default access functions; explicit allowlists per role and collection.
- Every relationship lookup is checked; do not trust IDs supplied by a client.
- Field-level access for `role`, enquiry PII, permission references, recipient configuration, private original media, audit data and internal workflow.
- Do not allow user self-registration, role self-change, direct REST bypass, bulk export or arbitrary query-depth/population.
- Limit list results, depth, fields, upload size and operation frequency.
- Use an authorization matrix test for every role × operation × collection, including direct API calls.
- Inactive/deleted users, expired sessions and role changes take effect immediately or after documented session revocation.

## 6. Public API contract

The public website is server-rendered; these endpoints exist only for required client interactions and integrations. Use `/api/public/v1` to make future changes explicit. Content read endpoints return a stable, documented DTO rather than raw Payload documents. Enquiries have no anonymous read endpoint: only authenticated, authorized CMS staff may access their protected collection, and public endpoints must never serialize enquiry records.

### 6.1 Public read endpoints

| Method / path | Purpose and query | Access / caching |
|---|---|---|
| `GET /api/public/v1/site` | Public school name/logo/contact/opening-hours/social links and approved map/WhatsApp destinations only if configured and approved | Public; CDN cache; omit private settings |
| `GET /api/public/v1/pages/{slug}` | Published general page and approved blocks | Public; cache by slug, invalidate on publish |
| `GET /api/public/v1/divisions/{slug}` | One of nursery/primary/secondary | Public; cache; 404 unknown slug |
| `GET /api/public/v1/academics` | Published academic programmes; optional `division` | Public; bounded page size |
| `GET /api/public/v1/admissions` | Published overview/process/approved requirements/approved admission fees and approved PDF metadata | Public; never include private notes or unpublished fees |
| `GET /api/public/v1/news` | Published listing; `cursor`, `limit` (default 12, max 50), optional category | Public; stable order by `publishedAt DESC, id` |
| `GET /api/public/v1/news/{slug}` | Published detail | Public; 404 unpublished/unknown |
| `GET /api/public/v1/events` | Published events; `range=upcoming|past`, cursor/limit bounded | Public; events use approved timezone |
| `GET /api/public/v1/faqs` | Published items; optional validated category; sorted by category/order | Public |
| `GET /api/public/v1/gallery` | Published, rights-approved items; optional category/cursor/limit | Public; never return private permission metadata |
| `GET /application-form.pdf` | Approved current application PDF only | Public file response; 404 if no approved document; safe fixed filename/content type |
| `GET /sitemap.xml`, `GET /robots.txt` | Public route index and crawler policy | Generated from published routes; staging disallows indexing |

Public response envelope for lists:

```json
{
  "data": [],
  "page": { "nextCursor": null, "hasMore": false }
}
```

Single item response: `{ "data": { ... } }`. Include only DTO fields needed by the website, e.g. title, slug, summary, safe content blocks, public media URL/alt, publication date, approved links and SEO values. Do not expose internal CMS `status`, author email, private IDs, permission state, unpublished content or enquiry data.

### 6.2 Enquiry write endpoints

| Method / path | Request fields | Success |
|---|---|---|
| `POST /api/public/v1/admissions-enquiries` | `parentGuardianName`, `email`, `phone`, `studentName?` (only after approval), `divisionOfInterest`, `message`, `privacyAcknowledged`, bot challenge token | `202 Accepted`, opaque `reference` and generic confirmation; do not echo user input |
| `POST /api/public/v1/contact-enquiries` | `name`, `email`, `phone?` only if approved, `subject` when approved, `divisionOfInterest=general`, `message`, `privacyAcknowledged`, bot challenge token | `202 Accepted`, opaque `reference` and generic confirmation |

Server must independently validate body schema, trim and normalize inputs, validate active privacy notice, verify bot token, enforce same-origin/CSRF policy and rate limit before persistence. Persist enquiry and audit metadata durably, then enqueue a notification. A transient email outage does not lose a valid enquiry. The receipt is random and cannot be used to view or track an enquiry.

Errors use a non-sensitive stable shape:

```json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Please review the highlighted fields.",
    "fieldErrors": { "email": "Enter a valid email address." },
    "requestId": "opaque-correlation-id"
  }
}
```

Do not return stack traces, database errors, moderation details, whether an email address already exists, or private record IDs.

### 6.3 HTTP status and error semantics

| Status | Meaning |
|---|---|
| `200` | Read request succeeded |
| `202` | Valid enquiry stored and notification queued |
| `400` | Malformed JSON/query or invalid route parameter |
| `401` | Unauthenticated CMS/admin request |
| `403` | Authenticated but unauthorized CMS/admin request |
| `404` | Unknown, unpublished or inaccessible public resource (do not distinguish draft from absent) |
| `409` | Approved idempotency/conflict case; never leak private state |
| `413` | Request or upload exceeds configured size |
| `415` | Unsupported content type/file type |
| `422` | Field validation failed |
| `429` | Rate limit or bot challenge required |
| `500` | Generic unexpected error with request ID; details only in redacted server logs |
| `503` | Required dependency unavailable; use generic retry guidance |

### 6.4 API and integration safeguards

- HTTPS only in hosted environments; same-origin requests; no permissive wildcard CORS.
- Require CSRF/origin checks for cookie-authenticated mutations. Public POSTs use strict origin validation plus rate limiting and bot protection.
- Reject unknown fields and excessive nested JSON; set request-body limits (proposed enquiry ≤ 10 KB; tune before release).
- Rate limit by a privacy-reviewed combination of short-lived keyed network identifier and global service capacity; proposed initial threshold 5 submissions per 15 minutes per identifier, with accessible challenge/escalation path and monitoring.
- Apply provider-verified CAPTCHA/Turnstile only after server-side token verification. Never trust a client `captchaPassed` boolean.
- Use an idempotency key for retried POSTs, with short, documented retention, to avoid duplicate enquiry records on network retries.
- Notification email contains no full message/child name by default; link to authenticated CMS. Validate recipient is configured, not caller-supplied. Encode all mail values; prevent header injection.
- File upload only for authorized CMS users; allowlist formats and sizes, inspect signatures, sanitize/re-encode image formats, scan where available, store outside web root, randomize storage keys and apply publication ACLs.
- Payload admin REST requests are authenticated, role-checked, rate-limited for login/upload, and have bounded query depth/limit. Disable unused endpoints.
- Application-form route selects only the current approved record. Set correct PDF content type and safe `Content-Disposition`; avoid untrusted filenames or open redirects.

### 6.5 CMS and server-only APIs

Payload admin endpoints are implementation APIs, not a public integration contract. They require a logged-in CMS user and collection/field authorization. Server-side Next.js data access uses a server-only Payload client and maps results to public DTOs. Never pass admin credentials or Payload Local API access into browser code. Enquiry list/detail endpoints and media originals are available only in the CMS to authorized roles.

## 7. Validation, privacy and operational requirements

### 7.1 Form field behavior

- Parent/guardian name: required, 1–120 trimmed characters.
- Email: required, normalized and syntactically valid; send confirmation only if separately approved.
- Phone: required for admissions; contact form optional unless approved. Store normalized form only if needed; retain display value only for follow-up.
- Division: required admissions enum; no arbitrary values.
- Student name: optional and disabled until approved. It is child-related personal data; require explicit data-minimization rationale and notice wording.
- Message: required, maximum 3,000 characters, no attachments.
- Privacy acknowledgement: required at production, with immutable notice version and server timestamp. The school/DPO approves legal basis and exact copy; a technical checkbox does not itself establish compliance.

Client validation improves usability; server validation is authoritative. Return field-level errors without retaining invalid submissions. Error and success feedback must be announced to assistive technology and avoid color-only states.

### 7.2 Nigeria Data Protection Act 2023 review

Before production data collection, VHIS's responsible person/legal adviser must approve purpose, lawful basis, notice, child-data safeguards, recipients/processors, international transfers, retention, access/deletion process, incident response and data-subject handling. This document is a technical design, not legal advice or a claim of compliance.

### 7.3 Observability and operations

- Health checks: liveness and dependency-aware readiness; no secret/config disclosure.
- Monitor server errors, DB connectivity/latency, storage failures, email outbox backlog, form abuse, failed auth, scheduled deletion failures and backup jobs.
- Alert on exhausted storage, repeated notification failures, database connection saturation and failed backups.
- Keep operational logs free of form payloads and credentials; define retention before production.
- Run retention deletion as an idempotent scheduled job; alert on failure and reconcile missed executions.
- Document restore drill, key rotation, staff offboarding, security incident escalation, CMS lockout recovery and production rollback.

## 8. SEO, accessibility and performance requirements

- Unique title and description per approved public route; canonical URLs on the approved domain; `noindex` for staging, preview, admin and nonpublic records.
- Generate sitemap from published canonical content; exclude drafts, private media, admin and redirects. `robots.txt` is environment-aware.
- Structured data only where factual, accurate and applicable (e.g. Organization/School or Article); no ratings, review markup or claims without approved evidence.
- Add Open Graph and social preview metadata using approved page titles, descriptions and public images; no private media or unapproved claims.
- Map legacy URLs from a real crawl/content inventory; verify every redirect target and prevent chains/loops/open redirects.
- Use responsive optimized images and dimension/aspect-ratio reservation; lazy-load below-fold media and prioritize hero assets.
- Target at the 75th percentile when enough real-user field data exists: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Use lab tests as prelaunch evidence, not equivalent proof of field performance.
- WCAG 2.2 AA is the acceptance benchmark: semantic headings/landmarks, keyboard operation, visible focus, contrast, labels/errors, alternatives, reflow at zoom, touch targets, reduced motion and screen-reader testing. A benchmark is not a certification without a complete audit.
- Respect consent/preferences for analytics and third-party embeds. Do not load nonessential analytics before applicable consent.
- If approved, track `admissions_enquiry_submit`, `contact_enquiry_submit`, `application_pdf_download`, `whatsapp_click` and `telephone_click`; send no name, email, phone, message, student data, enquiry reference or other PII. Define whether “submit” means durable server acceptance; deduplicate events and verify against a test property before production.

## 9. CI/CD, migrations and rollback

1. Pull request checks: formatting/lint, typecheck, unit tests, schema validation, dependency/license/security checks, production build and automated accessibility/route tests.
2. Deploy immutable candidate to staging; apply reviewed backward-compatible migrations; run smoke, role, form and restore checks.
3. VHIS content/design/UAT sign-off recorded against a release candidate.
4. Take database backup and verify recent media backup; record release/migration ID.
5. Promote the same artifact to production; run health check and public smoke tests.
6. Monitor error rate, forms/outbox, critical routes and performance.
7. Roll back application artifact independently where possible. Database changes use expand/migrate/contract and a tested restore/forward-fix plan; do not assume code rollback reverses a destructive migration.
8. Maintain DNS/redirect rollback notes; do not switch the existing domain until launch owner approves.

No destructive content/database migration without a verified backup and an explicit rollback decision.

## 10. Acceptance test catalogue

Tests below are release gates. Automated tests should use stable IDs and synthetic data; manual tests record tester, environment, date, evidence and defect ID. Every failure is a defect, not a waiver, unless VHIS records an explicit risk acceptance.

### 10.1 Public pages, responsive UI and navigation

| ID | Test | Expected result |
|---|---|---|
| PUB-001 | Open each of the 16 in-scope public page types on the approved host | Correct page loads with shared approved branding, navigation and footer |
| PUB-002 | Open Nursery, Primary and Secondary from navigation and homepage cards | Correct distinct division page and canonical URL load |
| PUB-013 | Authorized editor changes approved text in each division CMS record and publishes the revision | The matching reusable page template renders the new approved content; no source edit is required; other division content remains unchanged |
| PUB-003 | Navigate by keyboard through desktop nav, dropdowns and CTA | Every destination is reachable; focus is visible; no keyboard trap |
| PUB-004 | Open/close mobile menu by keyboard, touch and Escape | `aria-expanded` matches visibility; Escape closes and focus returns to menu control |
| PUB-005 | Use Schools and School Life dropdowns at desktop/tablet/mobile | Menus expose all in-scope destinations; touch/keyboard activation works |
| PUB-006 | Load each public route at 1440, 768, 390 px and intermediate widths | Content reflows; no horizontal page overflow or clipped essential controls |
| PUB-007 | Zoom to 200% and 400% where applicable; increase text size | Content remains usable without loss of information/functionality |
| PUB-008 | Use skip link and inspect heading/landmark hierarchy | Skip link works; one clear page H1; semantic landmarks and headings are ordered |
| PUB-009 | Disable/reduce motion in OS/browser preferences | Nonessential motion/transitions are removed or reduced |
| PUB-010 | Load images with assistive technology and inspect alternatives | Meaningful images have accurate alt; decorative images are ignored; no filename alt |
| PUB-011 | Review approved logo and semantic colors against signed design | Correct asset/aspect ratio; no unapproved recoloring; approved tokens used |
| PUB-012 | Browse at supported current Chrome, Edge, Firefox and Safari | No critical layout, navigation or interaction defect |

### 10.2 Carousel, gallery, news and FAQ

| ID | Test | Expected result |
|---|---|---|
| UX-001 | Activate previous/next through all carousel slides | Nursery → Primary → Secondary order and wrap behavior match approved interaction |
| UX-002 | Activate each carousel indicator by mouse and keyboard | Correct slide, headline, image alt, link destination and active indicator update together |
| UX-003 | Follow each slide CTA | Nursery, Primary and Secondary routes load respectively |
| UX-004 | Inspect carousel with screen reader and keyboard | Controls have unique names; current slide is conveyed; manual-only behavior unless autoplay is explicitly approved |
| UX-005 | Open gallery item, use next/previous, close and Escape | Correct image/caption/count; controls work; focus returns to triggering item |
| UX-006 | Try gallery modal with keyboard only and at mobile viewport | Focus remains usable in modal; close control reachable; image fits without horizontal overflow |
| UX-007 | Publish/unpublish gallery image and change rights state | Only approved, published, non-expired rights-cleared item is publicly returned |
| UX-008 | Expand/collapse each FAQ category by keyboard | Native disclosure works; state is announced; category/link content remains reachable |
| UX-009 | Select a news/event card | Correct published detail page loads; article/event placeholders are not mistaken for verified content |
| UX-010 | Change published news/event content | Listing/detail update after approved publish and cache invalidation; drafts remain private |

### 10.3 Forms and application PDF

| ID | Test | Expected result |
|---|---|---|
| FORM-001 | Submit admissions form with all fields empty | No record created; each required field has a readable error; focus moves to first invalid field |
| FORM-002 | Submit malformed email, invalid/too-short phone, whitespace-only name/message and invalid division | Server and client reject; specific accessible errors; no PII persisted |
| FORM-003 | Submit valid approved admissions fields and privacy acknowledgement | One private enquiry record created; generic `202` response; no details echoed |
| FORM-004 | Omit/uncheck production privacy acknowledgement | Request rejected; no record, notification or analytics event containing PII |
| FORM-005 | Attempt to send unapproved `studentName`, arbitrary fields or attachments | Request is rejected or unsupported fields stripped according to contract; no unapproved data stored |
| FORM-006 | Submit contact enquiry using the approved contact schema | Private record and correct type; no admissions-only data requirement applied incorrectly |
| FORM-007 | Simulate email provider timeout after database commit | Enquiry remains stored once; outbox retries; operator sees failure; visitor does not receive false data-loss error |
| FORM-008 | Retry same POST with same idempotency key | No duplicate enquiry; stable generic receipt behavior |
| FORM-009 | Submit above rate limit or with invalid bot token | `429`/challenge; no record or email; accessible recovery path remains |
| FORM-010 | Inspect email and server/client logs after valid enquiry | No full message/child name/secrets in notification or logs; authorized CMS link only |
| FORM-011 | Open approved application endpoint with no approved PDF configured | Safe not-found response and no draft/old private asset exposure |
| FORM-012 | Open approved PDF endpoint after approval on desktop/mobile | Correct approved PDF, accessible filename, content type and working print/download behavior |
| FORM-013 | Attempt direct unauthenticated access to enquiry list/detail | `401/403` or non-disclosing `404`; no PII returned |
| FORM-014 | Verify deletion at approved retention date and inspect backup/log policy | Record is deleted per policy; non-PII audit evidence; backups/logs respect approved retention |
| FORM-015 | Submit contact enquiry with an approved subject and privacy acknowledgement | Subject validates and is stored only in the private enquiry record; omitted/invalid subject follows the approved requiredness rule |
| INT-001 | Follow approved map and WhatsApp destinations on desktop and mobile | Links point only to VHIS-approved destinations, open safely and do not expose unverified contact details |
| INT-002 | Review consent state and trigger each approved conversion event | Events fire once with no PII and only under the approved analytics/consent policy |

### 10.4 CMS roles, publication and data isolation

| ID | Test | Expected result |
|---|---|---|
| CMS-001 | Attempt CMS access without authentication | Admin data and APIs unavailable; login flow has safe errors and rate limit |
| CMS-002 | Authenticate inactive user or revoke active user's role/session | Access denied/revoked within documented propagation interval |
| CMS-003 | For each role, create/read/update/delete/publish each collection via UI and direct API | Every action matches §5 matrix; unauthorized actions fail server-side |
| CMS-004 | Content Editor attempts role/permission change or mass export | Denied; no privilege escalation or private data |
| CMS-005 | Non-Admissions role requests enquiry records by UI, REST, relation population or guessed ID | No record or field leakage |
| CMS-014 | Anonymous caller probes public content APIs using enquiry collection names, IDs or query parameters | No enquiry route or relation data is exposed; response contains no enquiry PII |
| CMS-006 | Author submits own high-risk fee/contact/PDF/photo/redirect revision for approval | Self-approval denied; independent authorized reviewer required |
| CMS-007 | Edit a live page and save as draft | Existing approved public page remains live; draft is visible only to authorized preview |
| CMS-008 | Publish, unpublish and archive an item | Required fields/reviewer enforced; correct route/listing visibility and cache invalidation |
| CMS-009 | Request preview using expired, altered or another user's token | Denied, no-store, noindex; no content disclosure |
| CMS-010 | Upload executable, spoofed MIME, oversized, malformed or unsafe SVG file | Rejected/quarantined; no public object; security event recorded without file contents |
| CMS-011 | Upload rights-pending student image and attempt publish | Publish rejected; permission reference remains private |
| CMS-012 | Attempt cyclic navigation, duplicate slug, unsafe redirect or redirect chain | Validation rejects change and audit records result |
| CMS-013 | Inspect audit log and attempt mutation as administrator | Append-only; authorized read only; no PII values/secrets in audit diff |

### 10.5 Security, privacy, SEO and reliability

| ID | Test | Expected result |
|---|---|---|
| SEC-001 | Inspect production TLS, cookies and security headers | HTTPS, secure/HttpOnly/SameSite cookies, HSTS and reviewed CSP/policies |
| SEC-002 | Submit XSS/SQL-like payloads in all text fields and CMS rich text | No execution or query manipulation; safe escaped/rendered output |
| SEC-003 | Submit cross-origin mutation/CSRF and wildcard CORS requests | Request rejected; no credentialed cross-origin access |
| SEC-004 | Inspect built client bundles, source maps, logs and error responses | No DB/email/CMS secrets, internal stack traces or private payloads |
| SEC-005 | Enumerate admin IDs, unpublished slugs, enquiry receipts and private media | No unauthorized object access or existence oracle |
| SEC-006 | Run dependency/license/security scan on release lockfile | No unresolved critical/high issue without documented mitigation/acceptance |
| SEO-001 | Inspect page titles, descriptions, canonical URLs and heading structure | Unique approved metadata; canonical host; no duplicate/missing critical fields |
| SEO-002 | Crawl sitemap/robots at staging and production | Staging noindex/disallowed; production includes published routes only |
| SEO-003 | Inspect structured data | Valid, factual, approved schema; no fabricated review/rating/result claims |
| SEO-004 | Test changed legacy URLs against approved redirect inventory | Correct destination/status; no loop, chain or open redirect |
| PERF-001 | Run production-like Lighthouse/Web Vitals lab tests on key templates | Meets agreed lab budgets; field targets tracked separately at 75th percentile |
| PERF-002 | Inspect responsive image delivery, caching and layout shift | Correct optimized sizes; dimensions reserved; no avoidable CLS |
| OPS-001 | Restore a staging database and representative media backup | Restore meets approved RPO/RTO and documented recovery checklist |
| OPS-002 | Simulate DB, storage and email outages | Readiness/alerts accurate; no success-shaped enquiry response before durable save |
| OPS-003 | Deploy prior release / forward-fix a migration in staging | Rollback procedure works without unplanned loss or exposure |
| OPS-004 | Review logs, alerts, retention job and incident runbook | No PII/secrets in logs; alerts reach VHIS owner; retention failures visible |

### 10.6 Release and UAT gates

| Gate | Required evidence |
|---|---|
| Requirements/design | Signed scope, approved design source, content/asset inventory and unresolved decisions register |
| Architecture | Compatibility spike, version/license matrix, hosting/provider decision, threat/privacy review |
| CMS | Role matrix pass, workflow pass, author/reviewer training and test user offboarding |
| Content | All production text, fees, contact details, school claims, photos and application PDF approved |
| Forms | Server/client tests pass, privacy notice and retention approved, email delivery/retry verified |
| Security/privacy | Security review, dependency scan, access-control tests, NDPA-related review by responsible adviser |
| Quality | Automated tests green, cross-browser/responsive/accessibility reports, no open critical/high defects |
| Recovery | Recent verified backups, restore drill and release rollback evidence |
| SEO/analytics | Metadata, sitemap, redirects, consent, Search Console/analytics approvals verified |
| UAT | Named VHIS owners sign off each page, form, CMS workflow and outstanding accepted risks |
| Production | Controlled release, monitoring, DNS/domain access documented, existing-site rollback plan retained |
| Handover | Source/repository, architecture/schema/runbooks, admin training, provider ownership and support arrangement transferred |

## 11. Phase governance and delivery stages

Each phase has a named deliverable, a demonstrable outcome and a documented acceptance decision. A phase is not complete because work has started or a status report was issued. VHIS reviews the evidence and accepts, rejects or requests corrections. Dependencies and scope changes are recorded before the next phase begins.

| Phase | Deliverable | Demonstration / acceptance evidence | Gate / dependency |
|---|---|---|---|
| 12 — Project Initiation and Technical Discovery | Signed scope, stakeholder/approval map, content and asset inventory, technical specification, risk/dependency register | Walk through scope/exclusions, verified access to current website and design materials, open decisions and estimates | No build commitment until discovery findings and project rules are accepted |
| 13 — Technical Architecture and System Design | Approved architecture, version/provider decision record, data model, API contract, privacy/security design, cost and operating model | Architecture walkthrough, compatibility spike findings, threat/privacy review, key trade-offs and operating cost | Written architecture approval before full development |
| 14 — Development Environment and Infrastructure | VHIS-owned repository/CI, approved minimal Next.js + Payload scaffold, isolated development/staging PostgreSQL, approved object storage, environment-specific secrets, automated checks, private staging deployment, and deployment/recovery/onboarding documentation | Demonstrate a private repository and protected PR; start app/CMS; prove DB connectivity and a non-public test media upload; deploy to staging; show CI, secret separation, health checks, backup/restore and rollback evidence | Phase 13 architecture, provider, cost, ownership, security and budget approvals are prerequisites. Do not build public website features or production content in this phase. Production domain/cutover stays untouched; only narrowly scoped production account/security provisioning may be prepared if explicitly approved |
| 15 — Design System and Frontend Foundation | Approved responsive tokens, accessible component library, layouts, navigation/footer and design-to-code mapping | Demo approved Figma components at 1440/768/390 and intermediate widths; visual review and keyboard checks | Figma or signed visual source, logo and token approval |
| 16 — Public Website Development | All approved public routes and reusable templates with real CMS read integration | Demonstrate pages, navigation, responsive behavior, accessibility and draft exclusion | Approved page inventory, content model and design foundation |
| 17 — CMS and Administrator Development | Authenticated CMS, roles, workflow, media/document controls and admin runbook | Demonstrate each role's allowed/denied UI and direct API actions, author/reviewer workflow, account offboarding | Role matrix and staff identities approved |
| 18 — Database and Content Modelling | Reviewed schemas, migrations/indexes, fixtures, retention jobs and relationship/integrity rules | Migration/integrity tests, version rollback/forward strategy, private-data segregation | Data model and privacy retention rules approved |
| 19 — Forms and Third-Party Integrations | Server-validated contact/admissions forms, protected enquiries, email outbox, approved PDF, and only approved map/WhatsApp/analytics integrations | Demonstrate valid/invalid submissions, spam/limits, notification retry, access control, consent and integration failures | Privacy notice, fields/recipient/retention, PDF and provider accounts approved |
| 20 — Content Migration and Media Integration | Approved content/media, image-rights records, redirects and replacement inventory | VHIS content review, rights/alt-text audit, redirect crawl and exception list | Written content, fee, contact and image approval |
| 21 — SEO and Digital Analytics | Metadata, canonicals, Open Graph, sitemap, robots, structured data, redirects and consent-gated conversion events | Crawl reports, Search Console verification, analytics event QA with synthetic/no-PII test data | Canonical domain, analytics property and consent decisions approved |
| 22 — Security, Privacy and Performance | Security hardening, access review, privacy/retention controls, backup monitoring and performance report | Security scan/review, restoration evidence, privacy review, Core Web Vitals lab/field measurement plan | No unresolved critical/high risks without documented owner acceptance |
| 23 — Quality Assurance and Testing | Automated/manual test reports, accessibility/browser/responsive matrix and defect register | Demonstrate acceptance catalogue; reproduce fixes and rerun regressions | Critical defects resolved; high defects fixed or explicitly accepted by VHIS |
| 24 — User Acceptance Testing | UAT scripts, named testers, results, issue dispositions and formal sign-off | VHIS staff exercise public site and CMS on staging using approved content | Written UAT approval; UAT cannot waive legal/privacy or security blockers |
| 25 — Production Deployment and Launch | Approved release artifact, DNS/cutover/redirect plan, monitoring and rollback record | Controlled launch demo, critical-route/form checks, error/notification/analytics smoke tests | Formal management launch approval; existing website retained until approval |
| 26 — Training and Technical Handover | Source/repository, accounts, architecture/schema/API docs, operating/backup/security runbooks, CMS and admin training | VHIS verifies access to organization-owned accounts/assets, completes a content task and recovery walkthrough | Handover checklist signed; contract deliverables and access transferred |
| 27 — Post-Launch Support and Maintenance | Agreed support window, incident/escalation process, patch/backup cadence, warranty/maintenance records | Review monitoring, incident response, backup/restore evidence and accepted issues | Separate approved support agreement, service levels and ongoing cost |

### 11.1 Project-wide controls

- **Architecture gate:** no full development before Phase 13 architecture approval.
- **Demonstration:** each phase includes working evidence appropriate to that phase, not progress claims alone.
- **Content approval:** VHIS approves institutional content before publication; only authorized staff may publish.
- **Continuity:** existing website remains available until production is approved and cutover/rollback is accepted.
- **Ownership:** source, repository, domains, hosting, database, media, email and analytics accounts remain VHIS-controlled or are transferred under the contract; no essential dependency is held only in a developer's personal account.
- **Change control:** scope, cost, schedule, security and acceptance impact are documented; an authorized VHIS owner approves before work begins.
- **Security/privacy:** threat, access, dependency, data-minimization, retention, backup and incident controls are reviewed throughout, not deferred to launch.
- **Payment:** payment milestones and the final payment are defined in the development agreement and tied to accepted deliverables, verified functionality and completed handover. This document proposes no contract percentage and is not legal or commercial advice.
- **Acceptance record:** each phase has a named VHIS approver, dated evidence, defects/waivers and a written acceptance decision.

### 11.2 Phase 14 implementation sequence

Phase 14 begins only after the Phase 13 exit gate is signed. It establishes a working, demonstrable development foundation; it is not authorization to implement the public website, populate production content, collect real enquiries or launch.

| Sequence | Work | Evidence / acceptance check | Guardrail |
|---|---|---|---|
| 14.1 Account and repository preparation | Create or confirm VHIS-controlled GitHub, hosting, database, object storage and required test-service accounts; create a private repository; establish named least-privilege team access, MFA, branch protection and PR checks | VHIS owner/admin access verified; private repo visible to authorized members; branch protection and offboarding owner recorded | Do not use a developer personal account as sole owner; do not enter production credentials in local/dev config |
| 14.2 Application initialisation | Create the approved integrated Next.js, React, TypeScript, Payload and Tailwind scaffold using supported versions and the approved package manager; pin exact dependencies | Clean install from lockfile; lint/typecheck/test/build pass; app and protected Payload admin start | Scaffold and health checks only; no full page templates, feature collections or public content |
| 14.3 Database provisioning | Provision isolated development and staging PostgreSQL using the approved provider; apply only baseline framework migrations and confirm secure application connectivity | Connection, migration and restart smoke tests pass in both environments; backups/PITR configuration evidence recorded | No production enquiry data; use synthetic accounts/content; no Phase 18 final content schema implementation |
| 14.4 Media storage configuration | Configure approved non-production object-storage bucket(s); verify authorized upload, retrieval, deletion and a small set of non-public test image/PDF files | File-signature/size policy smoke tests; private/public ACL behavior; test derivative or delivery path; delete test objects | No student photographs or unapproved school assets; no public document unless specifically approved |
| 14.5 Environment configuration | Define validated environment-variable schema and `.env.example`; configure separate development/staging/production secret stores and access policies | Startup rejects missing required settings; staging uses only staging credentials; secret scan and bundle review show no secrets | Production secret access is limited to named release operators; never print secrets to logs or commit secret files |
| 14.6 CI/CD implementation | Add pull-request checks (format/lint, typecheck, tests, build, dependency/security/secret scan) and approved staging deployment workflow | Deliberate failing check blocks merge/deploy; successful PR produces traceable staging build and release record | No automatic production deployment; use protected environment approval if production workflow is provisioned |
| 14.7 Staging deployment | Deploy minimal app/CMS scaffold privately; configure TLS/access restriction, `noindex`, health/readiness checks, staging email allowlist and test-only integrations | Authorized reviewer reaches app/admin; unauthenticated admin denied; DB/storage health verified; noindex confirmed; no PII sent to real recipients | Do not point public VHIS domain/DNS at staging; production site remains unchanged |
| 14.8 Documentation and sign-off | Deliver setup/onboarding guide, architecture/version/provider inventory, account ownership/access register, environment setup, CI/CD/deploy/rollback, backup/restore, monitoring and incident contacts | VHIS demonstrates onboarding or access verification; restore/rollback drill completed in staging; Phase 14 checklist and defects signed | Record unknowns and costs; no phase passes with undocumented privileged accounts or untested recovery |

### 11.3 Phase 14 completion target

Phase 14 is accepted only when the following can be demonstrated in a review session:

1. A private, VHIS-controlled GitHub repository with named access and protected production branch.
2. A running minimal Next.js + Payload application with authenticated CMS administration.
3. Development and staging applications connected to their separate PostgreSQL databases.
4. Non-production media storage that can securely upload and retrieve a synthetic test image/document.
5. Environment-specific configuration with no committed or client-exposed secrets.
6. A private staging website with TLS, `noindex`, access controls and functioning health/readiness checks.
7. Automated PR checks and a tested staging deployment workflow.
8. Documented and staging-tested database/media backup restoration and application rollback procedures.
9. VHIS-controlled/transferable account access and a completed onboarding/setup runbook.
10. Written Phase 14 acceptance by the technical lead and VHIS project owner.

All tests use synthetic data. The phase does **not** create the production content schemas, publish real school content, connect live form recipients, provide the official PDF, switch domain/DNS, or begin the Phase 15 design system implementation.

## 12. Source-spec alignment and decisions

The supporting Technical Specification draft adds useful detail. Resolve the following explicitly before relevant work:

| Topic | Reconciled requirement |
|---|---|
| Carousel | The current prototype and earlier design handoff specify manual carousel controls and no autoplay. The newer draft requests automatic rotation paused on hover/focus. Keep manual-only unless VHIS approves a motion behavior change; any autoplay also needs accessible pause controls, reduced-motion handling and focus/visibility rules. |
| Student name | The draft admissions form omits it, while the previous prototype includes it. Keep optional/disabled until VHIS confirms necessity, lawful basis, notice and data minimization. |
| Contact form | Draft adds subject and privacy acknowledgement. Model subject as pending approval; production intake requires an approved notice/version and acknowledgement. |
| Application PDF | Prototype contains only a clearly labeled printable review template. Replace with an approved school PDF before claiming a download; the template must not be offered as the official form. |
| Fees | Only approved admission-fee information may be public. Tuition fees, schedules and bank details remain excluded absent formal scope/content-policy approval. |
| Map and WhatsApp | Optional only after official address/telephone, destination and privacy impact are approved; no invented links or embedded map code. |
| Analytics | GA4/Search Console and conversion events are conditional on account ownership, approved consent/privacy configuration and no-PII event payloads. |
| Third-party infrastructure | Stack and providers in the source draft are proposals; compatibility, security, cost, data-region/transfer and operating support must be evaluated and approved in Phase 13. |

## 13. Open decisions and implementation blockers

Full implementation must not start until these blockers are resolved or explicitly accepted by the project owner:

1. Editable Figma file or documented formal approval of the prototype as visual source of truth.
2. Technical lead approval of exact Next.js/Payload/PostgreSQL versions, hosting, storage, email, backup and operating cost.
3. VHIS-approved final page content, facilities, curriculum, contact data, admission requirements and fee policy.
4. Approved application PDF and accountable owner for future replacement.
5. Data protection contact, privacy notice, lawful basis, student-name decision, retention period and enquiry-access list.
6. Confirmed admin identities, role assignments, MFA and account recovery owner.
7. Approved student-photo permission workflow and media removal request process.
8. Existing-site crawl, legacy URL inventory, redirect sign-off and domain/DNS ownership.
9. Approved analytics/consent policy, Search Console, email sender and provider accounts.
10. UAT owners, browser support matrix, severity definitions, recovery objectives and launch/rollback authority.

**Next approval requested:** review this specification and record decisions. Approval of this document authorizes the team to estimate and proceed through technical discovery/architecture setup as separately agreed; it does not by itself approve full implementation before the architecture gate, production deployment, unverified content, a public data-collection form or excluded functionality.
