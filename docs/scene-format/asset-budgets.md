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

HDR material maps are not supported. Skyboxes may use Radiance `.hdr` (equirect or six-face); EXR is not supported.

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

## Lights (GPU hard caps)

| Type | Max enabled uploaded |
|------|---------------------:|
| Point | **32** |
| Directional | **4** |
| Spot | **32** |

Overflow keeps the first N enabled lights of each type; extras are ignored and a warning is logged. Prefer staying under these caps for predictable lighting.

## Sky / environment

| Path | Product stance |
|------|----------------|
| Equirect skybox | LDR PNG/JPG/TGA **or** Radiance `.hdr` (64 MiB / 8192² soft caps) |
| Six-face cubemap | `faces` object; square faces; all LDR or all `.hdr` |
| EXR / DDS / KTX env | **Not supported** |

## Scene structure

| Limit | Value |
|-------|------:|
| Instances (schema soft cap) | **8,192** |

## Related

- [Assets reference](/docs/scene-format/assets)
- [Asset pipeline](/docs/guides/asset-pipeline)
- [Publish checklist](/docs/guides/publish-checklist)
- [Performance budgets](/docs/guides/performance-budgets)
