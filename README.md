# Discourse Tabler Icons

A lightweight Discourse theme component replacing common Font Awesome icons with consistent, Tabler-inspired outline SVGs.

## Install

1. Go to **Admin → Appearance → Themes & components → Components → Install**.
2. Choose **From a git repository** and enter `https://github.com/figranium/discourse-tabler-icons`.
3. Install, then attach the component to your active theme (e.g. Foundation).
4. Refresh the site. No server rebuild or plugin installation required.

## Implementation

The SVG symbols live in `assets/icons-sprite.svg` and are registered via the `icons-sprite` asset in `about.json`. The initializer maps 67 Discourse icon IDs to 61 reusable outline symbols using `api.replaceIcon`.

Some icons supplied by third-party plugins, custom themes, or future Discourse releases may retain their originals. Extend the SVG sprite and mapping to cover them. This component does not replace emoji, logos, or images.

## Development

Edit SVG `<symbol>` elements with unique `tabler-*` IDs, then add matching entries in the initializer. Keep `viewBox=\"0 0 24 24\"`, stroke-based paths and `currentColor` for dark mode. Test homepage, sidebar, topic list, composer, admin, mobile and dark mode after updates.

## License

MIT. Icon artwork in this initial version is custom outline SVG inspired by Tabler's design language; it is not a verbatim export of the upstream Tabler icon collection. For canonical Tabler glyphs, replace the SVG paths with assets from [Tabler Icons](https://github.com/tabler/tabler-icons) (MIT).
