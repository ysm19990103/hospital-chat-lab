# Verification — 2026-11-04

## Automated checks

23 Node tests pass. They cover the 8 scenarios and all 24 reference replies, context carried between rounds, useful versus vague replies, pressure-mode outcomes, negated requests, polite Chinese questions, factual refusal to falsify records, unsafe disclosure proposals, fabricated safety arguments in nonclinical conflicts, personal-identifier patterns, 600-character limits, safe HTML rendering, storage whitelisting, transcript content, and exact embedded offline portrait bytes.

Production assets pass the static allowlist, credential-pattern and private-metadata scans, and JavaScript syntax checks. There are no installed application dependencies or remote AI calls.

## Observed browser checks

- Desktop: free-text replies, all three rounds of the night-shift scenario, context-aware feedback, completion panel, and local completion persistence after reload.
- Persistent-pressure mode: all three responses continue to resist; the ending explicitly retains unresolved support needs and provides the appropriate next support path.
- Draft fragments: inserted successfully and preserved Chinese punctuation.
- Reference wording: expansion, favorite toggle, and the phrase library's saved count work.
- Transcript export: preview contains the complete selected session and debrief; manual-copy fallback is shown when clipboard permissions are unavailable.
- Mobile layout: 390 × 844 embedded viewport, readable message flow, bottom navigation, conversation-list navigation, and scenario search inspected in Chromium.

## Verification limits

The managed preview is HTTP. Clipboard access is unavailable there and the app exposes a selectable-text fallback. The cloud browser did not return a downloaded file for the Blob-based Markdown download, so writing that file to a user's disk was not confirmed in that preview. The export preview and generated Markdown contents were verified. The static offline file is independently built and checked for embedded assets; it does not depend on this Blob-download flow.

This is not an independent security audit, accessibility certification, hospital workflow validation, medical efficacy study, or assessment of real-world communication outcomes. Mobile inspection uses a browser iframe rather than a physical phone; the on-screen keyboard, Safari-specific behavior and assistive technology were not tested.

## Known design limits

Responses use transparent local rule matching and fictional scripted branches. Keywords do not prove truth or understanding. The feedback may miss paraphrases, complex negation, sarcasm or intent; it does not assign a professional-competency score. Brief factual safety concerns and concrete support requests are encouraged, without guaranteeing that a real colleague will cooperate.
