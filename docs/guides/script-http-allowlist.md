---
sidebar_position: 4
---

# Script HTTP & allowlists

Three separate network policies. Do not conflate them.

## 1. Scene travel / asset download

- **Default:** HTTPS
- **Escape hatch:** user **Allow HTTP** confirmation for plain `http://` travel/load
- Applies to the URL bar, portals, and scene asset URIs during load

## 2. `Engine.httpRequest` (script GET)

- Async **HTTPS GET only** (no POST; no plain HTTP)
- **Does not** inherit travel Allow HTTP
- Host policy:
  - Scene origin host is allowed when a scene is active
  - Other hosts require Settings → **Network Policy** allowlist
- Private IPs / link-local targets are blocked
- Native client (not browser CORS)

## 3. Remote Luau origins

- Scripts from the **scene URL host** are allowed
- Other hosts need Settings → **Script origins**
- Separate from Network Policy (executable code vs data GET)

## Author checklist

- [ ] Prefer APIs on the same host as the scene
- [ ] Document any third-party GET hosts for end users (Network Policy)
- [ ] Pin public scripts with `sha256`
- [ ] Never assume Allow HTTP enables `httpRequest`

## Related

- [Application Settings](/docs/settings/application-settings)
- [Luau intro — sandbox](/docs/luau/intro)
- [Engine.httpRequest](/docs/luau/engine-api)
