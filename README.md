# Discourse Tabler Icons

An open-source Discourse theme component that replaces common Font Awesome icons with **real, official Tabler Icons**.

[Tabler Icons](https://tabler.io/icons) · [Discourse](https://www.discourse.org/) · [Source](https://github.com/figranium/discourse-tabler-icons)

## What it does

Discourse ships with Font Awesome icons. This component registers a Discourse SVG sprite and uses the supported `api.replaceIcon()` interface to replace frequently used icon identifiers with Tabler outline icons. It is intended to work alongside existing themes such as Foundation and Horizon.

It does not inject icon fonts, load a browser-side icon framework, modify Discourse core, or require a Discourse server plugin. All icon artwork is shipped with the component after generation.

## Install

1. In your Discourse administrator interface, go to **Appearance → Themes & components**.
2. Choose **Install**, then **From a git repository**.
3. Enter `https://github.com/figranium/discourse-tabler-icons`.
4. Install it as a **theme component**.
5. Attach it to the active theme. Repeat for additional themes if desired.
6. Reload the site and inspect the sidebar, topic list, topic actions, composer, and profile menu.
7. Test light mode, dark mode, and mobile navigation.

**Before installing:** Confirm that the latest **Build and validate Tabler icons** workflow succeeded and that the generated `assets/icons-sprite.svg` has been committed. The presence of a workflow alone is not proof of a working component.

## Repository layout

| Path | Purpose |
| --- | --- |
| `about.json` | Theme-component metadata and SVG asset registration |
| `assets/icons-sprite.svg` | Generated icon symbols served by Discourse |
| `javascripts/discourse/api-initializers/tabler-icons.js` | Discourse-to-Tabler icon replacements |
| `scripts/build-icons.mjs` | Downloads official Tabler outline SVGs and creates the sprite |
| `.github/workflows/build-icons.yml` | Automated generation, coverage checks, and publication |
| `LICENSE` | MIT license for component code |

## Design and coverage

Icons are SVGs with a 24×24 viewBox, 2px rounded strokes, and `currentColor`. They inherit the theme's text color, making them suitable for light and dark color schemes.

The initializer covers a range of common navigation, topic, user, notification, moderation, and editor icons. Unmapped Discourse icons remain unchanged. Custom plugins can introduce their own icon names; these are not automatically remapped.

### Extending mappings

Add a replacement in `javascripts/discourse/api-initializers/tabler-icons.js`:

```js
api.replaceIcon("magnifying-glass", "tabler-search");
```

The `tabler-search` symbol must exist in `assets/icons-sprite.svg`. The generator creates symbols based on the initializer's referenced names. When the Discourse-facing name differs from the official Tabler filename, add an explicit alias to the generator.

**Never invent Tabler filenames.** Look them up in the [official outline icon directory](https://github.com/tabler/tabler-icons/tree/main/icons/outline). The generator should reject missing names rather than silently substituting another glyph.

## Local build

Requirements: Node.js 22 or later.

```bash
git clone https://github.com/figranium/discourse-tabler-icons.git
cd discourse-tabler-icons
node scripts/build-icons.mjs
```

The script downloads official Tabler SVG files from the upstream repository and assembles them into one Discourse sprite. A missing upstream icon is reported as a build error. The build does not silently use generic placeholder artwork.

## Automated checks

The GitHub Actions workflow runs the generator, parses the result as XML, compares the icon names referenced by the JavaScript initializer against the generated SVG symbol IDs, and commits the generated sprite only if those checks succeed.

The workflow requires repository Actions permissions allowing the GitHub Actions bot to write contents. If publishing fails with HTTP 403, check **Settings → Actions → General → Workflow permissions** and enable read/write permissions for the workflow token, subject to organization policy.

## Troubleshooting

**Workflow fails with a missing icon:** Inspect the reported filename, compare it with the official Tabler outline directory, and correct the alias or mapping. Do not replace it with an unrelated icon.

**Workflow fails with permission denied / HTTP 403:** Check the workflow token's `contents: write` permission and repository or organization Actions restrictions.

**Icons do not change in Discourse:** Confirm the component is attached to the active theme, the generated sprite is present, and the browser cache has been refreshed. Inspect the browser console for theme initializer errors.

**Some icons remain Font Awesome:** They are likely not mapped by this component, or are supplied by a plugin. Extend the mappings using the exact Discourse icon identifier.

**Icon disappears:** Check that the initializer references a symbol actually included in the sprite. The automated coverage test is intended to catch this.

## Limitations

This component is not a promise that every icon across every Discourse plugin will be replaced. Discourse and plugins can introduce new identifiers. A full live compatibility assessment requires testing against a running Discourse instance, including mobile and dark mode.

## License and attribution

Component source code: MIT, copyright Figranium. Official icon artwork: Tabler Icons, MIT, copyright Paweł Kuna and contributors. See the [Tabler Icons upstream repository](https://github.com/tabler/tabler-icons) for the original artwork and license. This is an independent community component, not an official Tabler or Discourse product.
