# VHIS Phase 13 — Architecture Approval Review

**Version:** 1.0  
**Prepared:** 2 November 2026  
**Status:** Architecture direction and Render hosting/database choices approved by the VHIS project owner on 2 November 2026; recommendations for storage, region and budget are recorded below  
**Implementation:** Phase 14 local scaffold work may proceed. Paid provisioning and staging deployment remain gated on VHIS account access, documented ownership, privacy review and budget approval  
**Related specification:** [Phase 12 Implementation Specification](./PHASE-12-IMPLEMENTATION-SPEC.md)

## 1. Decision requested

The VHIS project owner approved the architecture direction and selected Render for hosting and PostgreSQL on 2 November 2026. Cloudflare R2, Frankfurt/EU data placement and a $75/month Phase 14 infrastructure cap are recommendations, not yet finance/privacy approval. Formal architecture approval does not authorize paid infrastructure provisioning or production deployment.

The current workspace prototype and architecture materials were uploaded to [the VHIS2 GitHub repository](https://github.com/taican4real/VHIS2). It is public and currently under the personal account `taican4real`; the user chose public visibility and asked that personal-account ownership/transfer rights be documented. No Render or Cloudflare service, database, DNS change or deployment has been provisioned.

## 2. Executive recommendation

Approve the following as the **architecture direction**, subject to provider, cost, privacy and operational decisions:

1. **Modular monolith:** one Next.js App Router application with Payload CMS integrated into the same TypeScript repository and Node.js runtime. Keep public routes, CMS routes and server-only domain modules separate. Do not introduce microservices.
2. **Structured CMS content:** division and public page content use typed, allow-listed CMS fields/blocks rendered through reusable code templates. School editors change content without changing layout code; they cannot supply arbitrary scripts or layouts.
3. **Private enquiries:** admissions/contact submissions live only in access-controlled CMS collections. No anonymous read/list/search/export endpoint, public DTO, sitemap or public relationship may reveal an enquiry or its personal data.
4. **PostgreSQL:** use Payload's supported PostgreSQL adapter and versioned migrations. Use distinct isolated development, staging and production databases; production region, backup tier and provider remain pending.
5. **VHIS-controlled infrastructure:** repository, domain/DNS, hosting, database, media, email and analytics accounts are owned by VHIS or governed by documented ownership, administrator access, portability and transfer rights.
6. **Phase gate:** no full development or Phase 14 provisioning until the technical lead and VHIS owner sign the architecture and associated costs, security/privacy controls and account ownership.

### Preliminary compatibility recommendation

Based on vendor documentation retrieved on 2 November 2026, the proposed technology stack is **plausibly compatible**, but has not been installed or tested in this workspace:

- **Next.js 16.x** is listed by Next.js as Active LTS. Payload's installation requirements currently list Next.js `16.2.6+` as a supported range.
- **Node.js 24 LTS** is a conservative runtime candidate. The current Node release table lists 24.22.2 as LTS; Payload currently requires `^22.23.4 || >=24.22.1`, which includes Node 24.22.2.
- **React:** use the exact React version selected by the official Payload/Next template and lockfile; do not independently upgrade it.
- **PostgreSQL:** use `@payloadcms/db-postgres`; Payload documents that its adapter uses Drizzle ORM and `node-postgres`.
- **Package manager:** use pnpm, which Payload lists as preferred. Pin exact versions in the lockfile after approval.
- **Media:** Payload lists official S3 and R2 storage adapters. Provider-specific CORS, file size, signed access and image transformation behavior still require a later integration test.

These are documentation-based checks, not a compatibility certification. A minimal clean-install/build/start/migration/upload smoke test belongs in Phase 14 after approval; it has not been run.

## 3. Proposed logical design

```text
Public visitor ── HTTPS/CDN/WAF ── Next.js public routes
                                      │
                                      ├── published-only server content queries
                                      ├── allow-listed public DTOs
                                      └── validated enquiry POSTs
                                               │
                                               ▼
VHIS staff ── MFA/admin route ── Payload access control ── PostgreSQL
                                      │                      ├── public content
                                      │                      ├── admin users/roles
                                      │                      ├── private enquiries
                                      │                      └── audit metadata
                                      ├── object storage (media/PDF)
                                      └── mail outbox → transactional email

Development / Staging / Production are isolated environments.
The existing VHIS site stays live until UAT, management approval and cutover.
```

### Runtime and boundaries

- Server-render public pages by default. Use client components only for approved interactions.
- Serve the CMS at a protected route such as `/admin`; authenticate every administrative operation and enforce collection, record and field access server-side.
- Use server-only Payload access for website rendering, then map records to public DTOs. Never pass a privileged Payload client or database credential to browser code.
- The public API is narrow and optional. Server-rendered page reads need not call a public JSON API.
- Public content routes return only published, approved records. Draft preview is authenticated, short-lived, `no-store` and `noindex`.
- Store uploads in approved object storage, not an ephemeral application filesystem. Private originals and permission records are not public assets.
- Persist an enquiry before queueing its notification. A mail outage must not lose a saved enquiry; retry and alert without logging the message or child data.
- Use one application repository/deployment initially. Add a separate worker only if measured workload or platform limitations justify an approved change.

## 4. Hosting options and recommendation

The application architecture does not require a specific hosting vendor. Select a platform that can run the approved Next.js/Payload Node runtime, supports environment separation, provides operational access/backups and fits VHIS budget and data-placement requirements.

| Option | Benefits | Trade-offs / checks | Current disposition |
|---|---|---|---|
| Managed Node.js container + managed PostgreSQL + S3-compatible media | Persistent Node process model, explicit runtime, straightforward Payload upload/image/job behavior, provider portability | Need to compare regional availability, logs, backups/PITR, private staging, deployment/rollback, operating effort and full monthly cost | **Preferred architecture pattern**, provider and price not selected |
| Vercel Pro + separately managed PostgreSQL and media | Strong Next.js integration, global CDN/TLS, convenient previews and hosted build/deployment | Vercel Pro has base and usage charges; Payload documentation states Vercel server uploads are limited to 4.5 MB, requiring client uploads for larger files; validate Payload jobs, cache behavior, direct-upload security, resource limits and total cost | **Viable alternative**, do not assume Hobby is appropriate for a production school site |
| Self-managed VM/container + managed PostgreSQL and object storage | Maximum deployment control and potential vendor flexibility | More patching, reverse-proxy, scaling, uptime, backup, monitoring and incident responsibility for VHIS/developer | Use only if an accountable long-term operations owner is identified |

### Recommendation

Use **Render** for the application service and managed PostgreSQL, as selected by the project owner. Place the service and its database in the **Frankfurt region** so they can use Render's same-region private network. Use **Cloudflare R2 with the EU jurisdiction** for non-production test media and, after media-rights/privacy approval, approved public assets. Keep the integrated app portable as a container. Do not select Vercel solely because the frontend uses Next.js; its Payload upload limit would require additional direct-upload work.

The Frankfurt/EU placement is a recommendation based on Render's available regions and Cloudflare's EU storage jurisdiction, not a legal determination or approval to transfer personal data. Do not store live enquiry data or student images in Phase 14. Do not use Render free PostgreSQL for persistent environments: free databases expire after 30 days and lack recovery capabilities.

### Phase 14 infrastructure estimate (recommendation; not a quote)

For isolated development and private staging using synthetic data, budget against these current published Render prices:

| Phase 14 resource | Recommended plan | Published monthly price |
|---|---|---:|
| Staging Node.js web service | 1 CPU / 2 GB (`1c-2g`) to avoid a tight memory limit for Next.js + Payload | $25 |
| Staging PostgreSQL | 1 GB RAM (`0.5c-1g`) | $19 |
| Development PostgreSQL | 256 MB RAM (`0.1c-256mb`) | $6 |
| Cloudflare R2 | EU jurisdiction; first 10 GB-month and included operations | $0 within free allowance |
| **Estimated baseline** | Excludes email, domain, taxes, overages and any production services | **$50/month** |

Set a **provisional $75/month cap** for Phase 14, subject to finance approval. This includes a contingency for usage and would cover the optional $25 Render Pro workspace plan if required for team controls. Confirm the selected workspace plan, data retention/PITR, billing alerts and final dashboard quote before provisioning. Production resources, email and domain charges require a separate estimate and approval.

## 5. Data and account ownership decision

Before provisioning, VHIS identifies one institutional owner and at least one backup administrator for:

- GitHub organization/repository
- Application hosting
- PostgreSQL
- Object storage/CDN
- Domain registrar and DNS
- Transactional email
- Analytics/Search Console
- Monitoring, backup storage and incident contacts

Use named individual accounts, MFA, least-privilege team membership, billing ownership and documented recovery. Contractor access is delegated, revocable and not the sole administrative path. Store ownership/transfer terms in the development agreement.

## 6. Preliminary monthly cost model

These are **published USD price references observed on 2 November 2026**, not a quotation or approved budget. They do not include taxes, exchange rates, procurement, backups/retention, paid support, email-domain verification, consent tooling, monitoring, traffic overages or staff/developer time. Provider prices and terms can change.

| Service / published reference | Cost indication | Important qualification |
|---|---:|---|
| Render workspace Hobby / Pro | $0 / $25 per month, plus compute | Workspace tier affects collaboration/platform features; service compute is billed separately |
| Render web service | $7/month for 0.5 CPU / 512 MB; $25/month for 1 CPU / 2 GB | Current Phase 14 estimate uses the 1 CPU / 2 GB tier for staging; actual needs should be measured |
| Render PostgreSQL | $6/month for 256 MB; $19/month for 1 GB | Current Phase 14 estimate uses separate development and staging databases; paid databases include PITR, with recovery window based on workspace plan |
| Cloudflare R2 Standard | 10 GB-month, 1M Class A and 10M Class B monthly free allowance; then $0.015/GB-month storage, operation fees, no internet egress charge | Confirm Payload R2 adapter compatibility, object delivery domain, lifecycle, backup and rights-controlled access |
| Resend transactional email | Free allowance: 3,000 emails/month, 100/day; Pro listed at $20/month for 50,000 | Production sender verification, deliverability, support and real enquiry volume determine plan |
| GitHub | Free organization plan; Team listed at $4/user/month | Confirm required branch/ruleset, security and audit features against VHIS collaboration needs |
| Google Analytics 4 | Google describes Analytics as available at no cost | Privacy/consent implementation, account ownership and any third-party tooling remain costs/dependencies |
| Domain, email, monitoring, tax and overage | **Not included in $50 baseline** | Confirm sender/domain, monitoring, retention/RPO/RTO, traffic and support plan before production |

### Illustrative comparison only

- The selected Render Phase 14 baseline is approximately **$50/month** before optional workspace upgrades, taxes and overages ($25 service + $19 staging database + $6 development database).
- R2 and email may initially fit free usage allowances, but free tiers are not a production reliability or retention decision. Resend Pro would add $20/month if required.
- The proposed **$75/month cap is only for Phase 14 development/staging infrastructure**, not production or the complete project.
- Actual Render dashboard pricing, usage, backup retention and any workspace upgrade must be verified before spending.

**Cost approval gate:** the project owner requested a recommendation; finance/billing-owner approval of the $75/month cap and usage alerts is still required before paid provisioning.

## 7. Data, privacy and security decisions

| Area | Proposed control | Required approver/evidence |
|---|---|---|
| Enquiries | Protected collection; no public read API; role-restricted admin; no personal values in logs/email by default | VHIS privacy lead approves fields, lawful basis, notice, retention and permitted recipients |
| Child data/photos | Do not collect unnecessary child data; no student-photo publication until rights/permission status is approved | School owner signs permission, retention and removal workflow |
| Region/processors | Choose data regions and document subprocessors, international transfer and availability implications | VHIS management/privacy adviser approves provider/region |
| Authentication | Invite-only accounts, MFA for privileged roles, login rate limits, secure sessions and offboarding | Named account owners and account-recovery test |
| Uploads | Allowlist formats, inspect signatures, enforce size/pixel limits, image re-encode/scan where supported, private staging originals | Media test with synthetic files and approved configuration |
| Secrets | Provider secret store, separate per environment, validated at startup, no `NEXT_PUBLIC_` prefix for secrets | Secret scan and runtime/client bundle evidence |
| Backups | Automated DB backup/PITR where available; object recovery/versioning; least-privileged backup account | Approved RPO/RTO, retention and staging restore drill |
| Public/admin boundary | DTO allowlists, publish-only reads, no public GraphQL by default, private admin/API | Negative authorization tests for every role and anonymous route |
| Existing site | Keep production domain/site untouched until approved cutover and rollback plan | VHIS launch owner |

No technical design by itself establishes compliance with the Nigeria Data Protection Act 2023; obtain VHIS legal/privacy review before collecting live data.

## 8. Proposed Architecture Decision Records

| ADR | Proposed decision | Status | Decision owner |
|---|---|---|---|
| ADR-001 | Integrated Next.js + Payload modular monolith; no microservices initially | Recommended | VHIS technical lead + project owner |
| ADR-002 | Next.js 16 Active LTS and Payload-supported version; Node 24 LTS candidate; exact patches locked after clean compatibility spike | Preliminary docs check; runtime test pending | Technical lead |
| ADR-003 | Render PostgreSQL; separate development and staging databases in Frankfurt; use paid plans with PITR | Provider selected; exact plan/budget approval pending | Technical lead + project owner |
| ADR-004 | CMS-managed structured content rendered by reusable code templates | Recommended | Product/design owner + technical lead |
| ADR-005 | Enquiry records are private CMS data and excluded from public APIs | Required invariant | Project owner + privacy lead |
| ADR-006 | VHIS controls infrastructure accounts or has documented transfer/ownership rights | Required invariant | VHIS project owner |
| ADR-007 | Render Node.js web service; Frankfurt region; staging baseline 1 CPU / 2 GB | Provider/region selected; account and budget approval pending | Technical lead + project owner |
| ADR-008 | Cloudflare R2 via official Payload R2 adapter; EU jurisdiction | Recommended by project owner request; privacy/rights and account setup pending | Technical lead + privacy lead |
| ADR-009 | Email provider, account and public notification content | Pending | Admissions owner + privacy lead |
| ADR-010 | Analytics and consent configuration | Pending | VHIS owner/privacy lead |

## 9. Remaining Phase 13 approval questions

Phase 13 cannot be signed off until each question has an answer, owner and evidence:

1. **Hosting:** approve managed container as preferred pattern? Which provider and region? Is a vendor account already available?
2. **Database:** approve provider/region, instance baseline, connection pooling, PITR/backup tier and restore test?
3. **Budget:** approve monthly/annual budget cap and usage alert threshold? Who receives billing alerts?
4. **Accounts:** who is the VHIS account owner and backup administrator for every service? Which email/domain should own them?
5. **Privacy/data:** who signs off the NDPA-related review, privacy notice, student-name field, retention, data region and processor list?
6. **Design/content:** provide approved Figma/source of truth, logo usage, final page list, official copy, image permissions and approved application PDF.
7. **Operations:** confirm RPO/RTO, backup retention, support responsibility, on-call/escalation contact and recovery test cadence.
8. **CMS users:** identify initial Super Administrator and School Administrator by named accounts; agree MFA and offboarding.
9. **Email:** confirm sender domain, authorized recipients, acknowledgement policy and whether message content is omitted from notification.
10. **Analytics/integrations:** decide GA4/Search Console ownership, consent approach, WhatsApp/map destinations and whether they are in initial release.
11. **Carousel:** retain manual-only prototype behavior, or explicitly approve a revised autoplay design and accessible pause behavior?
12. **Phase scope:** confirm this architecture approval does not authorize full feature development, real enquiry capture, DNS cutover or production launch.

## 10. Phase 13 compatibility and approval evidence

### Documentation evidence completed

- Payload's official installation documentation lists Node.js `^22.23.4 || >=24.22.1` and Next.js 15.2/15.3/15.4 maintenance lines plus `16.2.6+`.
- Next.js lists v16 as Active LTS and v15 as Maintenance LTS (extended security releases through 31 January 2027).
- Node.js lists v24.22.2 as LTS at the preparation date.
- Payload documents a PostgreSQL adapter using Drizzle and `node-postgres`, plus a Vercel-specific PostgreSQL adapter.
- Payload lists official S3, R2, Google Cloud, Azure and Vercel Blob storage adapters; its docs note the 4.5 MB server upload limit on Vercel and the client-upload workaround.

### Evidence not yet produced

- Clean installation and locked-version build/test on the selected runtime.
- Payload admin auth and collection-access smoke test.
- PostgreSQL migration, connection pooling and staging/production parity check.
- Object upload, deletion, CORS, signed/private access and image derivative test.
- Deploy/rollback and backup/restore test on selected provider/region.
- Written provider quote and cost scenarios.
- Approved privacy/data-processing review.

The VHIS project owner approved the architecture direction in the conversation on 2 November 2026. Do not provision Phase 14 services until the remaining provider, budget, ownership, privacy/security and technical setup decisions are recorded and approved by their accountable owners.

## 11. Official sources reviewed

Sources were checked on **2 November 2026**. Vendor documentation, compatibility ranges and pricing can change; recheck immediately before Phase 14 and lockfile creation.

- [Payload installation requirements and Next.js integration](https://payloadcms.com/docs/getting-started/installation)
- [Payload PostgreSQL adapter](https://payloadcms.com/docs/database/postgres)
- [Payload production deployment guidance](https://payloadcms.com/docs/production/deployment)
- [Payload media storage adapters](https://payloadcms.com/docs/upload/storage-adapters)
- [Next.js support policy](https://nextjs.org/support-policy)
- [Next.js self-hosting guide](https://nextjs.org/docs/app/guides/self-hosting)
- [Node.js release schedule](https://nodejs.org/en/about/previous-releases)
- [Vercel pricing](https://vercel.com/pricing)
- [Neon pricing](https://neon.com/pricing)
- [Cloudflare R2 pricing](https://developers.cloudflare.com/r2/pricing/)
- [Resend pricing](https://resend.com/pricing)
- [GitHub pricing](https://github.com/pricing)
- [Google Analytics setup and pricing information](https://support.google.com/analytics/answer/9304153)

## 12. Approval record

| Role | Name | Decision | Date | Conditions / reference |
|---|---|---|---|---|
| VHIS project owner | Name not provided | **Architecture direction approved** | 2 November 2026 | Approval recorded in project conversation; does not select unresolved providers, approve costs, or waive Phase 14 prerequisites |
| VHIS technical lead | Pending | Pending | Pending | |
| VHIS privacy/legal reviewer | Pending | Pending | Pending | |
| Finance/account owner | Pending | Pending | Pending | |

**Phase 13 architecture direction: Approved by the project owner. Render hosting and database providers are selected. Cloudflare R2/EU and the $75/month Phase 14 cap are recommendations awaiting privacy/finance confirmation. Local scaffold work may proceed; paid provisioning and public/staging deployment remain gated.**
