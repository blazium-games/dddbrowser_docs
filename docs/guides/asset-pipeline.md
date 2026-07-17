---
sidebar_position: 2
---

# Asset pipeline

How to get content from a DCC tool into a loadable DDDBrowser scene.

## Product formats

| Role | Format |
|------|--------|
| Mesh | **OBJ** (+ separate **MTL**) |
| Textures | PNG / JPG / JPEG / TGA (LDR) |
| Audio | WAV (PCM) |
| Scripts | Luau (`.luau`) |
| Scene | JSON discovered from HTML |

**Not supported:** glTF, GLB, FBX, USD, HDR textures, compressed WAV.

## Recommended export flow

1. **Author** in Blender / Maya / etc.
2. **Export mesh** as Wavefront OBJ with materials.
3. **Export textures** as LDR PNG or JPEG; keep under [asset budgets](/docs/scene-format/asset-budgets).
4. **Host** all files on HTTPS (or Accept Allow HTTP for local `http://` testing).
5. **Reference** URIs in scene JSON `assets[]`, place with `instances[]`.
6. **Validate** by loading the discovery HTML in DDDBrowser.

## OBJ tips

- Prefer **triangulated** meshes (runtime triangulates, but export-time triangles are clearer).
- Keep OBJ under **64 MiB**, MTL under **16 MiB**, verts under ~2M.
- Use relative `mtllib` names that resolve next to the OBJ on the server.
- Colliders: set instance/asset collider fields in scene JSON when needed (see [Instances](/docs/scene-format/instances)).

## Texture tips

- Max **8192** px per side; max **4096²** total pixels; max **64 MiB** file.
- Power-of-two sizes help GPU upload; avoid huge atlases for simple props.

## Audio tips

- Export **PCM WAV** only; cap **32 MiB**.
- Use `audio.ambient` for non-spatial beds.

## Scripts

- Host `.luau` on the scene origin or add hosts under Settings → Script origins.
- Pin public scripts with asset `sha256`.

## Next

- [Publish checklist](/docs/guides/publish-checklist)
- [Asset budgets](/docs/scene-format/asset-budgets)
- [Production template](/docs/examples/basic/production-minimal)
