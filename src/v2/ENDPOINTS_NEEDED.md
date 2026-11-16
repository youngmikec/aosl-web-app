# v2 — API gaps and open items

Written while porting the Figma Make export (`Design AOSL Landing Page Most Recent`) into `src/v2`.
v2 has its own `services/` and `models/`; nothing here imports from v1.

Status key: **OK** = works against the current API · **Gap** = needs an API change · **Decision** = needs a product/design answer.

## Screens and the endpoints they use

| Screen (route) | Endpoint(s) | Status |
|---|---|---|
| Home contact form, Contact page | `POST /mails` | OK, see G1 |
| Newsletter (every public page) | `POST /subscribers` | OK |
| Jobs & Training list (`/jobs-trainings`) | `GET /jobs-posts/` (split on `Job.type` WORK/TRAINING) | OK, see G2, G3 |
| Application form | `POST /applications-register` | OK, see G4, G5 |
| Sign in | `POST /users/login` | OK |
| Sign up + email verification | `POST /users/register`, `POST /users/verify` | OK, see G6, G7 |
| Forgot password | `GET /users/resetCode/:email`, `POST /users/resetCode/verify`, `POST /users/forgotPassword` | OK |
| Dashboard: jobs | `GET /jobs-posts/` | OK |
| Dashboard: applications | `GET /applications/?createdBy=<userId>` | OK, see G8 |
| Dashboard: orders | `GET /orders/?createdBy=<userId>&populate=productService` | OK, see G8 |
| Dashboard: profile + password | `PUT /user/me/update` | OK, see G9 |
| Dashboard: notifications drawer | derived from applications | Gap, see G10 |
| Dashboard: activity log (Settings) | none | Gap, see G11 |
| FAQs | static content in `pages/faq` | Gap, see G12 |
| Service detail (`/services/:service`) | static content in `pages/services` | Gap, see G13 |
| Training tab (courses) | same `/jobs-posts/` with `type=TRAINING` | see G3 |

## Gaps (API changes wanted)

**G1 — `POST /mails` phone is required and capped at 11 characters.**
The design's phone field accepts international numbers (`+44 7700 000 000`). v2 normalises `+44…` to `0…` and requires a phone. Suggest: make `phone` optional and allow up to ~20 characters.

**G2 — Job has no location or experience level.**
The design filters by Location and Experience Level and shows a location on each card. `Job` only has `workMode`, `type`, `termDuration`, `companyName`. v2 shows "United Kingdom" and hides the Level and Location filters while the data is absent. Suggest: add `location` (string) and `level` (enum) to the Job model, create/update validators and the admin form.

**G3 — Training/course fields.**
The design shows start date, accredited flag, "what you'll learn" and "skills you'll gain" for courses. Only `termDuration` and `jobRequirements` exist. v2 maps `termDuration` to Duration and `jobRequirements` to skills, and omits the rest. Suggest: add `startDate`, `accredited`, `responsibilities[]` to Job.

**G4 — Application fields the design does not have.**
`POST /applications-register` requires `state`, `nationality`, `certLevel`, `experienceYears`, `role` and `job`. v2 added County/State, Nationality, Highest Qualification and Years of Experience to the form, and sends `role` = job title. **Decision:** keep these extra fields, or relax the validators.

**G5 — CV upload is PDF only.**
`resume` is sent as a base64 data URL and uploaded with Cloudinary's default `image` resource type (`aosl-api/src/services/upload.js`). PDFs work; DOC/DOCX do not. Suggest: `resource_type: "auto"` (or `raw`) so Word files work, then allow `.doc/.docx` in the form.

**G6 — Registration only accepts 197 country names.**
`validateCreate` requires `country` to equal a name in `aosl-api/src/constant/countries.js`. The design's picker lists every ISO country; v2 filters it to the 197 the API accepts (`src/v2/data/apiCountries.ts`). Suggest: accept any ISO country name, or return the supported list from an endpoint.

**G7 — No "resend verification code" endpoint.**
The route is commented out in `aosl-api/src/api/users/routes.js` (`/user/resend-vcode`). A user who loses the signup email cannot get a new code; v2 shows no resend link on that step.

**G8 — `GET /applications` and `GET /orders` are not scoped to the caller.**
They return whatever the query filter matches, for any authenticated user. v2 passes `createdBy=<userId>`, but a signed-in user can omit it and read everyone's records. This is a data-exposure risk in the current API too. Suggest: force `filter.createdBy = req.user.id` for non-admins.
Also: `createdBy` on an application is only set when the client sends it. v2 sends it for signed-in applicants; applications submitted while signed out are not linked to any account.

**G9 — Password change does not require the current password.**
`PUT /user/me/update` hashes whatever `password` is sent. The dashboard's Security tab uses it as-is. Suggest: `PUT /users/me/password` with `{ currentPassword, newPassword }`.

**G10 — Notifications.**
The bell drawer lists one item per application. There is no notifications endpoint. Suggest: `GET /notifications` (+ mark-read) if real notifications are wanted.

**G11 — Activity log.**
Settings > Activity log shows an empty state. Suggest: `GET /users/me/activity` returning `{ action, device, ip, createdAt }[]`.

**G12 — FAQ content is hard-coded.**
Suggest: `GET /faqs/public` (`{ category, question, answer }[]`) with admin CRUD, if the team wants to edit FAQs.

**G13 — Service detail content is hard-coded.**
`/product-services/public` exists (title, subTitle, description, features). It could back the three service pages once its records match the design (photo, checklist items, sub-cards).

**G14 — Latent API bugs seen while reading (not v2-specific).**
- `fetchPublicService` in `api/job/services.js` references `error.message` in its catch block (the variable is `err`) and `searchString` (undefined) when `?q=` is used, so a failure becomes a `ReferenceError`.
- `api/orders/service.js` `fetchService` has `(filter.q = 0 ? filter.q : false)`, an assignment inside a condition.

## Screens without a design (placeholders in v2)

These exist in v1 but are not in the Figma export, so v2 shows a "being rebuilt" placeholder (About us is built; it is static content):
- Invoice (`/invoice/:invoiceId`) and PayPal checkout (`/paypal`). These take real payments; port with care.
- Terms of Service / Privacy Policy pages (linked from forms as plain text).

**Decision:** supply designs for these, or tell me to reuse the v1 look for them.

## Other open items
- Contact details (phone, email, addresses, office hours, social links) are the Figma placeholder values and must be replaced with the real ones.
- "Remember me" on sign-in is shown by the design but has no effect.
- The admin portal link on the sign-in page appears only when `REACT_APP_ADMIN_URL` is set.
- Dependency added to v1's `package.json`: `libphonenumber-js` (phone validation on sign-up).
- Tailwind is 3.1.8 here, which has no `size-*` utilities, so v2 uses `w-* h-*`. If Tailwind is upgraded to 3.4+, that can be simplified.


## Added since the first pass
- **Support chat** (dashboard > Support chat): real-time over Socket.IO (`socket.io-client`), one private conversation with AOSL support, unread badge in the sidebar, "load earlier messages" on scroll, REST fallback while reconnecting. Designed in the dashboard style (no Figma frame).
- **Blog** (`/blogs`, `/blogs/view/:slug`): list with category filters and search, article page with sanitised content, like (once per browser), share links and comments, using `GET /blog-posts/public`, `POST /blog-posts/public/like-blog`, `GET/POST /comments/public…`. Likes are not authenticated on the API, so the once-per-browser limit is client-side only.
- Chat and blog endpoints require the matching `aosl-api` `v2-endpoints` branch to be deployed (and `npm install socket.io` there).
