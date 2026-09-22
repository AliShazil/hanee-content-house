# Content Inventory — ContentHouse Homepage

Single-page Next.js App Router site (`src/app/page.tsx`) built from one layout file and eight section components, rendered in this order: Hero → RecentWork → WhyChooseUs → PlatformConnectHero → OurProcess → FAQ → BookCTA → CreateSomething. No other routes/pages exist.

## Meta / Document Head

**File:** src/app/layout.tsx
**Location in code:** `export const metadata` object

| ID | Current Text | Notes |
|----|--------------|-------|
| meta-1 | "ContentHouse" | `<title>` tag |
| meta-2 | "On-demand videographer, booked when the moment happens." | Meta description |
| meta-3 | "en" | `<html lang>` attribute (not visible copy, included for completeness) |

## Navbar

**File:** src/components/Navbar.tsx
**Location in code:** `<header>` element

| ID | Current Text | Notes |
|----|--------------|-------|
| nav-1 | "Open menu" | `aria-label` on the mobile menu button (hamburger icon, no visible label) |

**File:** src/components/Logo.tsx
**Location in code:** logo link, split across three `<span>` tags

| ID | Current Text | Notes |
|----|--------------|-------|
| nav-2 | "C" | First letter of logo wordmark |
| nav-3 | "ntentHouse" | Remainder of logo wordmark (reads "ContentHouse" with icon badge in between the "C" and this text) |

## Hero

**File:** src/components/Hero.tsx
**Location in code:** `<section>` — image alt, `<h1>`, subtext, stats pill, CTA button

| ID | Current Text | Notes |
|----|--------------|-------|
| hero-1 | "Videographer filming on set at ContentHouse" | `alt` text on hero background image |
| hero-2 | "On Demand Videographer in Miami" | Main `<h1>` headline (rendered across 3 lines via `<br>`) |
| hero-3 | "Book when the moment happens" | Hero subtext, below headline |
| hero-4 | "Same-Day Footage" | Stat pill item 1 |
| hero-5 | "Raw Files Included" | Stat pill item 2 |
| hero-6 | "Rated 5.0" | Stat pill item 3, next to 5-star icon row |
| hero-7 | "Contact Now" | CTA button label (links to `#contact`) |

## Recent Work

**File:** src/components/RecentWork.tsx
**Location in code:** `<section>`, two intro paragraphs + subheading block above the video reel row

| ID | Current Text | Notes |
|----|--------------|-------|
| work-1 | "We build relationships." | First intro line |
| work-2 | "A videographer you can count on, on time, every time." | Second intro line |
| work-3 | "Recent Work" | Small eyebrow/kicker label above heading |
| work-4 | "Made to rewatch." | Section heading |
| work-5 | "Creators, brands, and moments worth keeping." | Section subtext |

*(Note: the reel row below renders 5 video clips with no visible captions or alt text — only video file URLs, which are excluded per your instructions.)*

## Why Choose Us

**File:** src/components/WhyChooseUs.tsx
**Location in code:** `<section>` intro block + `FEATURES` array rendered as 4 feature cards

| ID | Current Text | Notes |
|----|--------------|-------|
| why-1 | "Why ContentHouse" | Small eyebrow/kicker label above heading |
| why-2 | "Why people choose us." | Section heading |
| why-3 | "Prompt Communication" | Feature card 1 — label (kicker) |
| why-4 | "One direct line." | Feature card 1 — heading |
| why-5 | "The person you text is the person holding the camera. No agency, no account manager, nothing lost in between." | Feature card 1 — description |
| why-6 | "Same-Day Footage" | Feature card 2 — label (kicker) |
| why-7 | "Today." | Feature card 2 — heading |
| why-8 | "Your footage lands the same day we film." | Feature card 2 — description |
| why-9 | "Fast and Passport Ready" | Feature card 3 — label (kicker) |
| why-10 | "Anywhere." | Feature card 3 — heading |
| why-11 | "Last-minute bookings are welcome, in Miami or anywhere a flight goes." | Feature card 3 — description |
| why-12 | "Serious Value" | Feature card 4 — label (kicker) |
| why-13 | "Professional quality. Lean footprint." | Feature card 4 — heading |
| why-14 | "No crew on your invoice. You pay for the shoot, not the overhead, while the quality stays fully professional." | Feature card 4 — description |

## Platform Connect Hero

**File:** src/components/PlatformConnectHero.tsx
**Location in code:** `<section>` intro block above the animated platform diagram

| ID | Current Text | Notes |
|----|--------------|-------|
| platform-1 | "Everywhere You Post" | Small eyebrow/kicker label above heading |
| platform-2 | "One shoot. Every platform." | Section heading |
| platform-3 | "Vertical for the feeds, horizontal for the long cut. We film it once and it goes wherever your audience already is." | Section subtext |

*(The diagram itself connects to YouTube, TikTok, Instagram, X, Facebook, and Threads icons — no text labels on the icons; the whole SVG diagram is `aria-hidden`.)*

## Our Process

**File:** src/components/OurProcess.tsx
**Location in code:** `<section>` intro block + `STEPS` array (3 accordion steps) + bottom CTA button

| ID | Current Text | Notes |
|----|--------------|-------|
| process-1 | "Our Process" | Small eyebrow/kicker label above heading |
| process-2 | "From plan to final files." | Section heading |
| process-3 | "01" | Step 1 — number |
| process-4 | "The Plan" | Step 1 — title |
| process-5 | "Tell me what we are filming and where it goes: Instagram, YouTube, wherever you post. Send the location and a deposit, and the date is locked." | Step 1 — body |
| process-6 | "02" | Step 2 — number |
| process-7 | "We Film" | Step 2 — title |
| process-8 | "I show up on time, camera in hand, and shoot the list we agreed on plus a few extra angles along the way. No crew, no clipboard, just the footage." | Step 2 — body |
| process-9 | "03" | Step 3 — number |
| process-10 | "Preview Deliverables" | Step 3 — title |
| process-11 | "Selects land in your inbox within 48 hours. Flag your favorites, I finish the edit, and the final files are yours to post." | Step 3 — body |
| process-12 | "Our Process" | Bottom button label (scrolls back to top of this section) |

## FAQ

**File:** src/components/FAQ.tsx
**Location in code:** `<section>` intro block + `QUESTIONS` array (8 accordion Q&As)

| ID | Current Text | Notes |
|----|--------------|-------|
| faq-1 | "Questions" | Small eyebrow/kicker label above heading |
| faq-2 | "Straight answers." | Section heading |
| faq-3 | "What are your packages?" | Q1 — question |
| faq-4 | "Priced by filming time: two hours is $329, six hours is $629, raw media included. Two hours is the minimum. Extra cameras or bigger projects are quoted on top, so reach out with the idea and we point you to the right service." | Q1 — answer |
| faq-5 | "What do you film?" | Q2 — question |
| faq-6 | "Content for social: reels, TikToks, YouTube, brand day-in-the-life, events, product shoots. If it needs a camera and someone who knows how to use it, it's in scope." | Q2 — answer |
| faq-7 | "Do you travel?" | Q3 — question |
| faq-8 | "Yes. Miami is home base, but flights are welcome. Send the location and dates and we'll quote travel on top." | Q3 — answer |
| faq-9 | "How fast do I get my footage?" | Q4 — question |
| faq-10 | "Raw selects land in your inbox within 48 hours of the shoot. Rush turnaround is available if you need it sooner." | Q4 — answer |
| faq-11 | "Do I get the raw files?" | Q5 — question |
| faq-12 | "Yes, raw media is included in every package. Nothing sits behind an extra fee." | Q5 — answer |
| faq-13 | "How does the deposit work?" | Q6 — question |
| faq-14 | "A deposit locks your date on the calendar. It's applied toward the final invoice, not an add-on cost." | Q6 — answer |
| faq-15 | "How far in advance do I need to book?" | Q7 — question |
| faq-16 | "A few days is usually enough, and last-minute requests are welcome when the calendar allows. Booking earlier just guarantees the date." | Q7 — answer |
| faq-17 | "What if I need to reschedule?" | Q8 — question |
| faq-18 | "Just send a message. Weather and schedule changes happen, one reschedule is free with a heads up." | Q8 — answer |

## Book CTA

**File:** src/components/BookCTA.tsx
**Location in code:** `<section>` — heading, subtext, two buttons

| ID | Current Text | Notes |
|----|--------------|-------|
| book-1 | "Have an idea to film?" | Section heading |
| book-2 | "Our gear is charged and ready, let's make it happen." | Section subtext |
| book-3 | "Book a Shoot" | Primary button label |
| book-4 | "Call Us" | Secondary button label |

## Create Something (Closing Statement)

**File:** src/components/CreateSomething.tsx
**Location in code:** `<section>`, single heading split across two styled `<span>` tags

| ID | Current Text | Notes |
|----|--------------|-------|
| create-1 | "Let's create" | First half of closing statement (brighter text) |
| create-2 | "something worth replaying." | Second half of closing statement (dimmer text) |
