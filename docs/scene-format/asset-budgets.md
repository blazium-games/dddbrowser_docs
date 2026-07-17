---
sidebar_position: 7
---

# Asset budgets

Hard and soft limits enforced at load. Exceeding them fails the scene (or the asset). Prefer staying well under caps for public hosting.

## Models (OBJ / MTL)

| Limit | Value |
|-------|------:|
| OBJ file size | **64 MiB** |
| MTL file size | **16 MiB** |
| Max line length | **1 MiB** |
| Vertices | **~2,097,152** (~2M) |
| Indices | **~8,388,608** (~8M) |
| Meshes | **8,192** |
| Shapes | **4,096** |
| Materials | **4,096** |

**Format:** OBJ + MTL only (no glTF/GLB). Faces are triangulated on load by default—export triangles when possible.

## Textures (LDR)

| Limit | Value |
|-------|------:|
| Formats | PNG, JPG/JPEG, TGA |
| Max dimension (either side) | **8192** px |
| Max total pixels | **4096×4096** |
| Max file size | **64 MiB** |

HDR/EXR textures are not supported for materials or skyboxes (skybox: equirectangular LDR only).

## Audio

| Limit | Value |
|-------|------:|
| Format | WAV, **PCM only** |
| Max file size | **32 MiB** |

## Scripts

| Guidance | Detail |
|----------|--------|
| Format | `.luau` |
| Integrity | Prefer `sha256` pin on public scripts |
| Origin | Same host as scene URL, or Settings → Script origins |

## Scene structure

| Limit | Value |
|-------|------:|
| Instances (schema soft cap) | **8,192** |

## Related

- [Assets reference](/docs/scene-format/assets)
- [Asset pipeline](/docs/guides/asset-pipeline)
- [Publish checklist](/docs/guides/publish-checklist)
- [Performance budgets](/docs/guides/performance-budgets)
