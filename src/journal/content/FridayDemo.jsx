import { useState } from "react";
import {
  ChevronLeft,
  Sparkles,
  PawPrint,
  Wrench,
  GraduationCap,
  MapPin,
  Send,
  Home,
  Calendar,
  MessageCircle,
  User,
} from "lucide-react";
import { Badge, BottomNav, Button, IconButton, Input, Tag } from "../../design-system";
import { PracticeDivider } from "../PracticeDivider";

const NEED_CHIPS = [
  { label: "Cleaning", icon: <Sparkles size={16} /> },
  { label: "Dog walking", icon: <PawPrint size={16} /> },
  { label: "Handyman", icon: <Wrench size={16} /> },
  { label: "Tutoring", icon: <GraduationCap size={16} /> },
];

const WHEN_CHIPS = ["Weekday afternoons", "Weekday mornings", "Evenings", "Weekends", "One-off"];
const STARTING_CHIPS = ["Mon, Jun 15", "Tue, Jun 16", "Wed, Jun 17", "Flexible"];
const BUDGET_CHIPS = ["$15-25", "$25-40", "$40-60", "$60+"];

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: <Home size={24} /> },
  { id: "bookings", label: "Bookings", icon: <Calendar size={24} /> },
  { id: "messages", label: "Messages", icon: <MessageCircle size={24} />, badge: 3 },
  { id: "profile", label: "Profile", icon: <User size={24} /> },
];

const fidelityFindings = [
  {
    topic: "Chips",
    verdict: "Honored",
    variant: "success",
    detail:
      "Every single-select group (need, when, starting, budget) is a real `Tag`, not a styled span — icons only on the first group, matching the reference exactly.",
  },
  {
    topic: "Section labels",
    verdict: "Drifted, corrected",
    variant: "warning",
    detail:
      'First pass reached for `Input`\'s built-in `label` prop for "Title"/"Where?", which renders `--text-strong` — the reference shows uppercase eyebrow-style labels instead. Corrected: `Input` now takes an explicit `id`, with a separate `<label className="v-eyebrow">` wired to it via `htmlFor` — same accessible association, right visual token.',
  },
  {
    topic: '"Anything else?" field',
    verdict: "Flagged, not faked",
    variant: "warning",
    detail:
      "No Textarea component exists in the vendored design system — the same gap the planted-issue screen in Thursday's Demo got dinged for borrowing Input's styles to fake. Built a plain `<textarea>` styled from the same tokens `Input` uses (`--border-strong`, `--radius-md`, `--surface-card`) instead of pretending a component exists that doesn't.",
  },
  {
    topic: "Buttons",
    verdict: "Honored",
    variant: "success",
    detail:
      '`Button variant="primary"` with a leading `Send` icon for "Post to your block"; `Button variant="ghost"` for "Cancel" — the spec named the exact variant, so this one had nowhere to drift.',
  },
  {
    topic: "Bottom nav",
    verdict: "Honored",
    variant: "success",
    detail:
      "Vello already ships `BottomNav` with an active-item color and a badge count — reused as-is instead of rebuilding a tab bar by hand.",
  },
  {
    topic: "Accessibility — chip groups",
    verdict: "Fixed",
    variant: "success",
    detail:
      "First pass rendered the chips as inert buttons (visually selectable, nothing tracking which one was). That's a false affordance — looks operable, isn't. Fixed with real `useState` per group, so `aria-pressed` reflects an actual selected state instead of a hardcoded one.",
  },
  {
    topic: "Accessibility — labels",
    verdict: "Pass",
    variant: "success",
    detail:
      'Every field has a real `<label htmlFor>`, including the two that needed a custom one for the eyebrow style. The character counter on "Anything else?" is live, not a static "0 / 400".',
  },
  {
    topic: "Bottom nav badge color",
    verdict: "Fixed",
    variant: "success",
    detail:
      'The reference shows the Messages badge in green; `BottomNav`\'s own CSS hardcodes it to `--accent` (coral), with no prop to override it. Fixed without editing the vendored component: `BottomNav` accepts a `className`, so a scoped rule in `index.css` sets the badge to `--brand-primary` on `--brand-on-primary`. White on olive measures about 4.8:1, passing AA, where white on coral measures about 3.2:1. The missing prop is still a gap in Vello itself.',
  },
  {
    topic: "Accessibility — placeholder contrast",
    verdict: "Fixed",
    variant: "success",
    detail:
      "`Input` ships its placeholder in `--text-subtle`, which measures 3.30:1 on the white field and fails AA (4.5:1). The same contrast failure Thursday 4.2 found. The textarea and the character counter copied that token, so they failed too (the counter at 2.95:1 on the cream page). Fixed without editing the vendored component: a scoped rule in `index.css` sets all three to `--text-muted`, which measures 5.04:1 on white and 4.51:1 on cream. The default in `Input` itself is still a gap in Vello.",
  },
  {
    topic: "Header and bottom nav scope",
    verdict: "Out of scope",
    variant: "neutral",
    detail:
      "The back-button header and the BottomNav tab bar are app-level chrome around the screen, not part of the \"post a request\" component itself — kept in the render for fidelity to the reference, but not part of what this audit is scoring.",
  },
];

export function FridayDemo() {
  const [need, setNeed] = useState(null);
  const [when, setWhen] = useState(null);
  const [starting, setStarting] = useState("Mon, Jun 15");
  const [budget, setBudget] = useState(null);
  const [notes, setNotes] = useState("");

  return (
    <div className="practice-doc">
      <p className="v-eyebrow">Demo</p>
      <h2 className="v-h2">Implement a Vello component end-to-end</h2>
      <p className="v-body practice-doc__intro">
        Implement one Vello component end-to-end, then prove it's faithful
        to the system. The deliverable is the component plus a short design
        fidelity audit: where the design system was honored, where it
        drifted, where it failed accessibility, and how each was corrected.
      </p>

      <PracticeDivider />

      <p className="v-eyebrow practice-doc__label">
        Reference — post a request (Vello screen export)
      </p>
      <img
        className="practice-spec-image"
        src="/PostRequest1.png"
        alt="Vello's post-a-request form, top half: need chips, a title input, when chips, and the start of the starting-date chips"
      />
      <img
        className="practice-spec-image"
        src="/PostRequest2.png"
        alt="Vello's post-a-request form, bottom half: starting-date chips, a location input, budget chips, an optional notes field, and the submit/cancel actions"
      />

      <p className="v-eyebrow practice-doc__label practice-doc__section">
        Implemented
      </p>
      <div className="friday-postrequest-mock">
        <div className="friday-postrequest-mock__intro">
          <div className="friday-postrequest-mock__header">
            <IconButton variant="ghost" label="Back">
              <ChevronLeft size={20} />
            </IconButton>
            <span className="friday-postrequest-mock__title">Post a request</span>
          </div>
          <p className="friday-postrequest-mock__subtitle">
            Tell your block what you need. Verified neighbors nearby can
            reply with a quote.
          </p>
        </div>

        <div className="friday-postrequest-mock__section">
          <span className="v-eyebrow">What do you need?</span>
          <div className="friday-postrequest-mock__chips">
            {NEED_CHIPS.map((c) => (
              <Tag
                key={c.label}
                icon={c.icon}
                selected={need === c.label}
                onClick={() => setNeed(c.label)}
              >
                {c.label}
              </Tag>
            ))}
          </div>
        </div>

        <div className="friday-postrequest-mock__section">
          <label className="v-eyebrow" htmlFor="fpr-title">
            Title
          </label>
          <Input id="fpr-title" placeholder="e.g. Weekday walks for Juniper" />
        </div>

        <div className="friday-postrequest-mock__section">
          <span className="v-eyebrow">When?</span>
          <div className="friday-postrequest-mock__chips">
            {WHEN_CHIPS.map((c) => (
              <Tag key={c} selected={when === c} onClick={() => setWhen(c)}>
                {c}
              </Tag>
            ))}
          </div>
        </div>

        <div className="friday-postrequest-mock__section">
          <span className="v-eyebrow">Starting</span>
          <div className="friday-postrequest-mock__chips">
            {STARTING_CHIPS.map((c) => (
              <Tag key={c} selected={starting === c} onClick={() => setStarting(c)}>
                {c}
              </Tag>
            ))}
          </div>
        </div>

        <div className="friday-postrequest-mock__section">
          <label className="v-eyebrow" htmlFor="fpr-where">
            Where?
          </label>
          <Input
            id="fpr-where"
            leadingIcon={<MapPin size={18} />}
            defaultValue="412 82nd St, Apt 3R"
          />
        </div>

        <div className="friday-postrequest-mock__section">
          <div className="friday-postrequest-mock__sectionhead">
            <span className="v-eyebrow">Budget</span>
            <span className="friday-postrequest-mock__legend">per visit</span>
          </div>
          <div className="friday-postrequest-mock__chips">
            {BUDGET_CHIPS.map((c) => (
              <Tag key={c} selected={budget === c} onClick={() => setBudget(c)}>
                {c}
              </Tag>
            ))}
          </div>
        </div>

        <div className="friday-postrequest-mock__section">
          <div className="friday-postrequest-mock__sectionhead">
            <label className="v-eyebrow" htmlFor="fpr-notes">
              Anything else?
            </label>
            <span className="friday-postrequest-mock__legend">Optional</span>
          </div>
          <textarea
            id="fpr-notes"
            className="friday-postrequest-mock__textarea"
            placeholder="Pets, access, supplies — whatever a neighbor should know before replying."
            maxLength={400}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <span className="friday-postrequest-mock__counter">{notes.length} / 400</span>
        </div>

        <div className="friday-postrequest-mock__actions">
          <Button variant="primary" size="lg" fullWidth leadingIcon={<Send size={18} />}>
            Post to your block
          </Button>
          <Button variant="ghost" className="friday-postrequest-mock__cancel">
            Cancel
          </Button>
        </div>

        <BottomNav items={NAV_ITEMS} value="home" className="friday-postrequest-mock__nav" />
      </div>

      <PracticeDivider />

      <h3 className="v-h3 practice-doc__section">Design fidelity audit</h3>
      <div className="practice-qa-list">
        {fidelityFindings.map((f) => (
          <div className="practice-qa-item" key={f.topic}>
            <p className="practice-qa-item__question">
              <strong>{f.topic}</strong> <Badge variant={f.variant}>{f.verdict}</Badge>
            </p>
            <p className="v-body-sm v-muted">{f.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
