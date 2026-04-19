FCC Trademark System — UI Design Specification
Based on the Wealthflow template and your UI inspirations (Trior dashboard, OpnForm settings panel, and the search overlay), here is the exact design language to apply to your FCC prototype:

1. Overall Design Language
Style: Clean, modern SaaS — white/light gray base with deep navy primary, similar to Wealthflow

Feel: Professional government-grade but modern — NOT bureaucratic. Think "fintech meets government portal"

/* Apply these as Tailwind custom colors */
--primary:        #1B3067   /* FCC Navy — matches Wealthflow's deep blue hero */
--primary-light:  #4950BC   /* Secondary blue — for hover states, accents */
--accent:         #F59E0B   /* Amber — for alerts, highlights */
--background:     #F8FAFC   /* Wealthflow's light gray page bg */
--surface:        #FFFFFF   /* Card backgrounds */
--surface-hover:  #F1F5F9   /* Card hover state */
--border:         #E2E8F0   /* Subtle borders like Wealthflow cards */
--text-primary:   #0F172A   /* Near-black headings */
--text-secondary: #64748B   /* Gray body text */
--success:        #16A34A
--danger:         #DC2626
--warning:        #D97706

Font Family: Urbanist (same family as Wealthflow)
- Headings: font-bold, tracking-tight, text-slate-900
- Body: font-normal, text-slate-600, leading-relaxed
- Labels: font-medium, text-xs uppercase tracking-wide, text-slate-500
- Size scale: 
    Hero h1: text-5xl md:text-6xl font-bold
    Section h2: text-3xl font-bold  
    Card h3: text-xl font-semibold
    Body: text-base
    Small/meta: text-sm text-slate-500

 website

 - Full-width dark navy hero (#1B3067) with diagonal angled light beam graphic 
  (SVG gradient overlay, same as Wealthflow's blue gradient slab effect)
- Centered content: FCC logo top-left, nav top-right
- HEADLINE: "Digital Trademark Protection, Now" — white, text-5xl font-bold
- SUBHEADLINE: gray-300, text-lg, max-w-lg
- TWO CTA buttons:
    Primary: white bg, navy text — "Access External Portal"
    Secondary: transparent border white — "FCC Staff Login"
- Hero image: floating glass/acrylic card with trademark certificate mockup
  (same floating slab effect as Wealthflow — use CSS 3D transform + backdrop-blur)

  3 animated counters in a horizontal row with dividers:
  📋 1,247  — Trademarks Recorded
  📁 43     — Applications This Month
  🚢 12     — Ports Covered
  
Style: Large bold number (text-4xl font-bold text-navy), small label below (text-sm text-slate-500)
Use framer-motion useInView + countUp animation

6 cards in 3×2 grid — Wealthflow product card style:
- White bg, rounded-2xl, border border-slate-100, shadow-sm
- Icon top-left (lucide, navy color, 32px)
- Arrow ↗ top-right (gray, hover turns navy)
- Card title: text-xl font-semibold
- Description: text-sm text-slate-500
- Hover: shadow-lg, translate-y-1 (Framer Motion)

Cards:
1. ShieldCheck     — Electronic Register
2. FileCheck       — Digital Workflows
3. Search          — Field Verification
4. CreditCard      — GePG Payments
5. Link2           — BRELA Integration
6. AlertTriangle   — Counterfeit Prevention

Inspired by: Wealthflow navbar + Trior top bar

- Height: h-16
- Background: white, border-b border-slate-100, sticky top-0, z-50
- Left: FCC logo (navy) + "FCC Tanzania" text
- Center: nav links — Home | Apply | My Trademarks | Register | Payments
- Right: 
    Bell icon with red badge (unread count)
    Avatar dropdown (shadcn DropdownMenu):
      - User name + role badge
      - My Profile
      - My Trademarks  
      - Settings
      - Sign Out (red text)
- Mobile: hamburger → Sheet from right

Inspired by: Trior sidebar exactly

- Width: w-64 (expanded) / w-16 (collapsed)
- Background: white, border-r border-slate-100
- Top: FCC logo + "FCC Internal" + collapse toggle button (like Trior's □ icon)
- Search bar: "Search..." with magnifier icon (like Trior)
- Nav items with icons (lucide):
    LayoutDashboard  — Dashboard
    Bell             — Notifications  (badge)
    FileText         — Applications
    BookOpen         — Register
    RefreshCw        — Renewals
    Settings2        — Maintenance
    Ship             — Inspections
    AlertOctagon     — Enforcement
    Users            — User Management (CI only)
    BarChart2        — Reports
    
- "Spaces" section header (like Trior) renamed to "Sections"
  with sub-items for each department

- Bottom: User card with avatar, name, role, online dot
  + "FCC System v1.0" small text
- Active item: navy bg, white text, rounded-lg
- Hover: slate-100 bg


Inspired by: Trior dashboard layout exactly

TOP QUICK ACTION BAR (horizontal cards row):
  [+ New Application] [+ Assign TRO] [+ Schedule Inspection] [View Reports] [Sync TANOGA]
  Each: white card, icon + title + subtitle, rounded-xl, hover shadow
  Same style as Trior's "Create Project / Create Task / Invite to Team" bar

LEFT MAIN COLUMN (60% width):
  "Assigned Applications" card — same as Trior's "Assigned Tasks" 
    - Filter dropdown: "Nearest Due Date" / "Latest" / "Status"
    - Each row: App number + trademark name | applicant | "Due in X days" label | eye icon
    - Hover row highlight
    
  "Recent Activity" card below
    - Timeline feed with avatar + action + timestamp
    - "View All" link top right
    - Each entry: colored dot (green=approved, yellow=pending, red=rejected) + 
      action text + timestamp

RIGHT COLUMN (40% width):
  "Applications Queue" card — same style as Trior's "Projects" grid
    - 2-column card grid
    - Each card: colored icon/logo + trademark name + "X tasks due"
    
  "People" card below
    - Photo grid (3 columns) — use avatar initials if no photo
    - Filter: "All Staff" dropdown
    - Same layout as Trior's People section

    Stats row: 4 cards
  [My Trademarks: 3] [Pending: 1] [Expiring Soon: 1] [Certificates: 2]
  Style: white card, large bold number, label, small trend arrow

Alert banner: amber bg, warning icon, "SAFARI LAGER expires in 52 days — Renew Now →"
  Framer Motion: slide in from top on load

Applications table: same Trior task list style
Quick actions: 4 button cards like Trior quick-action bar

Inspired by: OpnForm settings panel — 3-column card layout

Each section is a collapsed/expanded card:
  Header: icon + "Section Title" + chevron toggle
  Content: form fields with shadcn components
  
CARDS:
  Card 1 — "Information" (applicant details)
  Card 2 — "Trademark Details" (classes, goods, manufacturer)  
  Card 3 — "Documents" (file upload zones)
  Card 4 — "Payment" (GePG section)

Field style (matching OpnForm):
  - Label: font-medium text-sm text-slate-700 mb-1
  - Input: shadcn Input, rounded-lg, border-slate-200, focus:border-blue-500
  - Required asterisk: text-red-500
  - Helper text: text-xs text-slate-500 mt-1
  - Error: text-xs text-red-500 + border-red-400

Step progress bar (top of form):
  Numbered circles connected by line
  Active: filled navy circle
  Completed: green checkmark circle
  Upcoming: gray outline circle
  Label below each circle

  Split layout — LEFT settings panel + RIGHT preview (like OpnForm):

LEFT (35%): 
  Collapsible sections like OpnForm's Information/Submissions/Customization
  - "Application Info" — read-only fields
  - "Documents" — verified checkboxes per doc
  - "BRELA Verification" — verify button + result
  - "Review Notes" — textarea
  - "Decision" — action buttons

RIGHT (65%):
  Full application preview with all trademark details
  Timeline at bottom
  Status progress indicator at top

  Inspired by: The search modal from screenshot 1

Trigger: Cmd+K or Search icon
Overlay: full-screen, blur backdrop (backdrop-blur-sm, bg-black/20)
Modal: white, rounded-2xl, w-[600px], shadow-2xl, p-4

Top bar:
  Search icon + "Search everything..." placeholder + filter icon + X close
  
Filter tabs: All | Applications | Trademarks | Inspections | Users

"Recent activity" section:
  List items: title + right-aligned "Today · 14:03" timestamp
  Hover: light blue highlight (like in screenshot)
  Active/selected: light blue bg with ellipsis menu

"Files" section:
  Each item: colored icon (blue=pdf, code=green, figma=purple) + 
  filename + "Type · Size · Date"

Framer Motion: scale(0.95)→scale(1) + opacity 0→1 on open

// Map to colored pill badges
ACTIVE              → bg-green-100  text-green-700
PENDING_ASSIGNMENT  → bg-gray-100   text-gray-600
UNDER_REVIEW        → bg-blue-100   text-blue-700
REQUIRES_RECTIF.    → bg-amber-100  text-amber-700
APPROVED            → bg-green-100  text-green-800
REJECTED            → bg-red-100    text-red-700
EXPIRING_SOON       → bg-orange-100 text-orange-700
EXPIRED             → bg-gray-100   text-gray-500
DETAINED            → bg-orange-100 text-orange-800
SEIZED              → bg-red-100    text-red-800
CLEARED             → bg-emerald-100 text-emerald-700


shadcn Table component:
- Header: bg-slate-50, text-xs font-medium uppercase tracking-wide text-slate-500
- Rows: white bg, border-b border-slate-50
- Hover: bg-slate-50/50
- Clickable rows: cursor-pointer
- Action column: right-aligned, DropdownMenu with ellipsis trigger
- Pagination: bottom, "Showing 1-10 of 43 results"
- Search input above table (left) + filter buttons (right)

Inspired by: Clean modal + OpnForm field style

shadcn Dialog, max-w-md
Header: FCC logo + "GePG Payment Gateway" title + green "Secure" badge

Content:
  Control Number box: navy bg, white mono font — "GEPG-2026-88421"
  Amount: large bold — "TZS 200,000"
  Description: "New Trademark Recordation — NOKIA"
  
  ─── divider ───
  
  Bank dropdown (shadcn Select): CRDB | NMB | NBC | Equity | M-Pesa
  Payer name: pre-filled input (read-only)
  
  "Pay Now" button: full-width, navy bg, white text, rounded-lg
  
Loading state: spinner + "Processing payment..."
Success state: 
  - Green checkmark animation (Framer Motion draw path)
  - "Payment Successful!"
  - Receipt details in card
  - "Download Receipt" + "Continue" buttons

  @react-pdf/renderer layout:

Header bar: full-width navy (#1B3067) rectangle
  - FCC coat of arms/seal (left)
  - "FAIR COMPETITION COMMISSION" centered, white, bold
  - "United Republic of Tanzania" below, white, smaller

Title section: 
  "TRADEMARK RECORDATION CERTIFICATE" — centered, navy, text-2xl, underlined

Reference row: 
  Certificate No. | Date Issued | Valid Until
  (3-column table, gray borders)

Trademark section:
  "TRADEMARK: COCA-COLA" — large navy bold
  Classes: colored pills
  All trademark details in 2-column grid

Footer:
  Left: QR code placeholder
  Right: 
    "____________________"
    "Chief Inspector of Merchandise Marks"
    "Fair Competition Commission"
    
  Bottom strip: navy, white text — FCC address + contact

  // Page transitions — wrap every page content
const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 }
}
transition: { duration: 0.25, ease: "easeOut" }

// Card stagger entrance
const container = { animate: { transition: { staggerChildren: 0.08 } } }
const item = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

// Modal: scale entrance
initial: { opacity: 0, scale: 0.95 }
animate: { opacity: 1, scale: 1 }

// Stats counter: useInView + count animation (0 → final value over 1.5s)

// Sidebar collapse: layout animation
// Notification bell: rotate animation on new notification
// Status badge change: AnimatePresence with crossfade
// Success state: checkmark SVG path draw animation
// Alert banner: slideInDown from y:-20

| Element       | shadcn Component              |
| ------------- | ----------------------------- |
| All inputs    | <Input> with custom className |
| Dropdowns     | <Select> + <SelectContent>    |
| Date fields   | <Calendar> in <Popover>       |
| Modals        | <Dialog>                      |
| Side panels   | <Sheet side="right">          |
| Notifications | `<Sheet side                  |


