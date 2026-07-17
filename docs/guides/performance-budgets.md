---
sidebar_position: 5
---

# Performance budgets

Soft guidance for public scenes. Hard caps live in [Asset budgets](/docs/scene-format/asset-budgets).

## Geometry

- Prefer well under **2M** verts and **8M** indices per OBJ.
- Split large worlds into multiple scenes + portals rather than one mega-OBJ.
- Avoid thousands of unique materials; atlases help.

## Textures

- Stay under **4k×4k** total pixels when possible (hard max 4096² and 8192 per side).
- Prefer compressed-on-disk JPEG for albedo; PNG for masks with alpha.
- Do not ship HDR material maps.

## Lighting

- Prefer a small set of lights (directional + few points/spots).
- Shadows and occlusion are toggles in Settings; heavy shadow casters cost fill rate.

## Scripts

- Keep `on_update` light; prefer events/volumes over per-frame work.
- `Engine.httpRequest` is async—do not poll aggressively.
- Pin scripts with `sha256` so cache/CDN cannot silently grow payload.

## Audio

- Keep PCM WAV short; stream-like beds still load fully (≤ 32 MiB).

## Checkpoints

- Design progress around `on_save` / lights / visibility—not full media/world dumps. See [Save & autosave patterns](/docs/guides/save-autosave-patterns).

## Related

- [Asset budgets](/docs/scene-format/asset-budgets)
- [Publish checklist](/docs/guides/publish-checklist)
