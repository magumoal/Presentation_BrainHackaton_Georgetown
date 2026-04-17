# MRIQC DB Aggregator BrainhackDC Presentation

Quarto reveal.js slide deck for presenting the `mriqc-aggregator` work.

## Files

- `index.qmd`: slide content
- `styles.css`: theme variables and slide component styling
- `_quarto.yml`: reveal.js configuration
- `.github/workflows/publish.yml`: GitHub Pages deployment

## Local editing

If Quarto is already installed:

```bash
quarto preview
```

Or, using Pixi:

```bash
pixi run serve
```

## Build

```bash
quarto render
```

Or:

```bash
pixi run build
```

Static output is written to `_site/`.

## Retheming

The fastest way to change the look is to edit the variables at the top of
`styles.css`:

- fonts
- accent colors
- card radius
- shadows
- background gradients

Most layout blocks in the deck use reusable CSS classes rather than per-slide
styling, so aesthetic tweaks usually happen in `styles.css` without touching the
slide content.

## GitHub Pages

1. Create an empty GitHub repository on the `leej3` account.
2. Add the remote:

   ```bash
   git remote add origin git@github.com:leej3/mriqcdb-aggregator-brainhackdc-presentation.git
   ```

3. Push `main`.
4. In the GitHub repository settings, set Pages to deploy from `GitHub Actions`.
5. Every push to `main` will rebuild and publish the deck.

## Notes

- The current deck uses repo-grounded project details from `mriqc-aggregator`.
- The dashboard slides are intentionally easy to revise as the frontend becomes
  more concrete.

