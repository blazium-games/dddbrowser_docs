---
sidebar_position: 1
---

# Publish checklist

Ship a production scene that loads cleanly in DDDBrowser.

## Before you host

- [ ] Scene JSON validates (required fields, unique asset/instance ids)
- [ ] Models are **OBJ + MTL** only (no glTF/GLB)
- [ ] Textures are LDR PNG/JPG/TGA within [budgets](/docs/scene-format/asset-budgets)
- [ ] Audio is PCM WAV ≤ 32 MiB
- [ ] Scripts are `.luau`; public scripts have `sha256` pins
- [ ] `movementBounds` set if the playable area exceeds ±100
- [ ] Portal triggers: exactly one of `autoTrigger` / `manualTrigger` / `scriptTrigger`

## Discovery HTML

- [ ] Prefer `<script id="blazium-scene" type="application/vnd.blazium.scene+json">` with full scene JSON
- [ ] Or provide discoverable metadata for travel/portal **preview** (not a catalog UI)
- [ ] Thumbnail URL is HTTPS and within texture limits

## Hosting / network

- [ ] Prefer **HTTPS** for the page and all asset URIs
- [ ] If using plain HTTP locally: document that users must accept **Allow HTTP**
- [ ] Script `Engine.httpRequest` stays HTTPS + Network Policy (travel Allow HTTP does **not** enable it)
- [ ] Cross-origin `.luau` hosts listed under Settings → Script origins

## Authoring stance

- [ ] Scene is hand-authored or generated **JSON** (no reliance on Level Builder)
- [ ] Follow [Asset pipeline](/docs/guides/asset-pipeline)

## Verify in client

- [ ] Load the URL in DDDBrowser (Windows release)
- [ ] Leave instance and reload (cache revalidation path)
- [ ] If using portals: confirm → destination loads (one scene at a time)
- [ ] If using autosave: checkpoint restores; media omissions understood ([Scene features](/docs/using/scene-features))

## Related guides

- [Asset pipeline](/docs/guides/asset-pipeline)
- [Portal travel authoring](/docs/guides/portal-travel-authoring)
- [Script HTTP allowlist](/docs/guides/script-http-allowlist)
- [Production template](/docs/examples/basic/production-minimal)
