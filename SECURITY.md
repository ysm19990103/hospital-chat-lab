# Security and privacy

This static app has no API keys, server-side patient store, analytics, remote AI calls, or outbound messaging integration. The group conversations and characters are fictional.

Free-text replies and drafts live only in the current page's memory. Only validated scenario IDs and fixed-template IDs persist under one namespaced localStorage key. Clearing progress only clears this app's data.

User input is escaped before HTML rendering. Common phone-number, identity-number, email, and labelled-patient identifiers are blocked before adding a reply. This is incomplete detection: users must use synthetic or properly de-identified text. Exporting a transcript requires reviewing its content. Exports remain under the user's control; there is no automatic upload.

Online hosting providers may record ordinary access metadata. The standalone offline build embeds the same scripts, styles, and portrait bytes, and makes no runtime network requests. External reference links are only followed when the user opens them.

Communication feedback is a local teaching aid, not clinical decision support, professional assessment, legal advice, or evidence of compliance with a hospital's procedures. It cannot understand all paraphrases, negation, sarcasm, intent, or fabricated claims. Report security issues without including real patient information or credentials.
