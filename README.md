# Admin Dashboard

Static HTML, CSS, and JavaScript dashboard for university admin analytics.

## Files

- `index.html` - Page structure, dashboard cards, tables, SVG placeholders, and section markup.
- `styles.css` - All visual styling, layouts, gradients, hover animations, responsive rules, and chart/card styling.
- `script.js` - Dashboard data, filter behavior, generated cluster cards, heatmap table, line chart, department table, and stacked bar chart.
- `log1.png` - Header logo image.

## Run

Open `index.html` in a browser. No build step or package install is required.

## Main Sections

- **Top navigation**: Markup in `index.html`, styles under `Top navigation` in `styles.css`.
- **Filter bar**: Dropdown markup in `index.html`, custom dropdown behavior in `script.js`.
- **KPI cards**: Static card markup in `index.html`, hover/zoom styling in `styles.css`.
- **Cluster Overview**: Card data comes from `clusters` in `script.js`; cards are rendered by `renderClusters()`.
- **Top Departments**: Data comes from `departments` in `script.js`; rows are rendered by `renderDepartmentTable()`.
- **Student Access Pattern**: Data comes from `lineSeries`; chart is rendered by `renderLineChart()`.
- **Student Engagement Heatmap**: Data comes from `heatmapRows` and `heatmapColumns`; table is rendered by `renderSimpleMatrix()`.
- **Activity Completion chart**: Uses the same `heatmapRows` and `heatmapColumns`; chart is rendered by `renderStackedBarChart()`.

## Editing Data

To update dashboard values, edit the arrays near the top of `script.js`:

- `clusters`
- `lineSeries`
- `departments`
- `heatmapRows`
- `heatmapColumns`

The stacked horizontal chart is linked to the heatmap data, so changes to `heatmapRows` and `heatmapColumns` will also update that chart.

## Styling Notes

Most styling sections in `styles.css` are labeled with comments. Useful areas:

- Theme variables: top of `styles.css`
- KPI cards: `KPI cards`
- Cluster cards: `Cluster overview`
- Analytics card headers: `Shared panel structure`
- Heatmap: `Student Engagement Heatmap`
- Stacked chart tooltip and hover: `Horizontal stacked bar chart`
- Responsive behavior: bottom media queries
