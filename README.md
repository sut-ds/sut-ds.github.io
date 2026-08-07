# Foundations of Data Science — Course Website

Official website for the **Foundations of Data Science** course at the Department of Electrical Engineering, Sharif University of Technology.

**Production URL:** [https://sut-ds.github.io](https://sut-ds.github.io)

## Stack

* Next.js (App Router) + React + TypeScript
* CSS design tokens + CSS Modules
* Self-hosted fonts via `@fontsource` + `next/font/local`
* In-repo typed course content under [`content/`](./content/)
* Static export → **GitHub Pages** (org site `sut-ds.github.io`; empty `basePath`)

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production static export (`out/`) |
| `npm run start` | Serve the Node build (optional; Pages uses `out/`) |
| `npm run lint` | ESLint (includes jsx-a11y) |
| `npm run typecheck` | TypeScript check |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content update workflow

Staff update the live site by editing files and merging to `main` — no CMS required.

### 1. Branch from `main`

```bash
git checkout main
git pull
git checkout -b content/short-description
```

### 2. Edit the right module

| What to change | File |
| --- | --- |
| Course name / tagline | `content/course.ts` |
| Syllabus copy, grading table weights | `content/syllabus.ts` |
| Nav / empty-state strings | `content/chrome.ts` |
| Lectures (+ materials) | `content/lectures.ts` |
| Workshops (TA, video, notebooks) | `content/workshops.ts` (`workshopOverrides`) |
| Assignments / projects / due dates / TA owners | `content/assignments.ts` |
| Schedule dates | `content/schedule.ts` (or official dates when ready) |
| Resources | `content/resources.ts` |
| Staff contacts / photos | `content/staff.ts` + `public/images/staff/` |
| FAQ | `content/faq.ts` |
| Announcements | `content/announcements.ts` |

**Rules**

* Keep drafts as `publish: false` until ready.
* Do **not** invent deadlines, grade weights, video URLs, or contact addresses.
* Prefer stable `slug` values once a URL has been shared.
* Workshop media: set overrides in `content/workshops.ts` (see file header comments).
* Assignment logos: `public/images/assignments/<slug>.svg` + `logo` field.
* Material files: prefer `public/materials/...` and link with `external: false`.

### 3. Verify locally

```bash
npm run lint
npm run typecheck
npm run build
npm run dev
```

Spot-check the changed pages before opening a PR.

### 4. Open a PR → merge to `main`

Push the branch, open a pull request, and merge when green. Pushing to `main` runs [`.github/workflows/publish.yml`](./.github/workflows/publish.yml), which builds the static site and deploys to GitHub Pages.

Manual redeploy: Actions → **Deploy to GitHub Pages** → **Run workflow**.

## Hosting / deploy

* Target: `https://sut-ds.github.io` (no `basePath`)
* Build output: `out/` (`output: "export"`, `trailingSlash: true`)
* CI: lint → typecheck → build → upload Pages artifact on `main` / `master`
* Repo setting (one-time): **Settings → Pages → Source: GitHub Actions**

## Deferred items

These do **not** block the public shell; publish when staff confirm:

* Official calendar dates (provisional Mehr→Dey table is live)
* Grade weight percentages (table shows TBD)
* Lecture / workshop / assignment material files and videos
* Remaining staff emails, Telegram handles, and photos
* Assignment `dueAt` / `taIds` as owners are assigned
* Optional lecture/assignment detail routes

## License

See [LICENSE](./LICENSE).
