// Centralized dashboard data keeps the HTML clean and easy to update.
const clusters = [
  { name: "Cluster of Engineering", students: "38,240", departments: 12, courses: 562, color: "#ff5d66", icon: "icon-building" },
  { name: "Cluster of Management", students: "14,760", departments: 6, courses: 238, color: "#297dff", icon: "icon-users" },
  { name: "Cluster of Pharmacy", students: "6,230", departments: 4, courses: 156, color: "#38c85c", icon: "icon-bank" },
  { name: "Cluster of Computer Applications", students: "8,950", departments: 5, courses: 187, color: "#954de6", icon: "icon-grid" },
  { name: "Cluster of Sciences", students: "7,450", departments: 6, courses: 132, color: "#ff781b", icon: "icon-flask" },
  { name: "Cluster of Law", students: "3,820", departments: 3, courses: 96, color: "#22b7c3", icon: "icon-scale" },
  { name: "Cluster of Media", students: "2,980", departments: 2, courses: 74, color: "#ff346f", icon: "icon-camera" },
  { name: "Cluster of Education", students: "1,020", departments: 2, courses: 68, color: "#35c763", icon: "icon-book" },
];

const contentSeries = [
  { label: "Videos", color: "#6a42b8", values: [36, 20, 30, 36, 4, 36, 36, 12, 0] },
  { label: "Presentations", color: "#ff9f1a", values: [0, 0, 16, 0, 0, 14, 15, 6, 0] },
  { label: "Quizzes", color: "#25a7f2", values: [0, 18, 0, 0, 43, 0, 0, 0, 0] },
  { label: "Assignments", color: "#ff343d", values: [24, 35, 0, 14, 0, 0, 12, 22, 30] },
  { label: "PDFs", color: "#35c758", values: [0, 7, 0, 0, 12, 8, 0, 20, 0] },
  { label: "Pages", color: "#8c7d73", values: [0, 0, 14, 0, 0, 4, 5, 0, 30] },
];

const courseLabels = ["2SCSH-103", "2SSPH-141", "2SMT-198", "2SDT-152", "2SEC-101", "2SCP-102", "2SAI-102", "2SBIO-148", "2SMEP-102"];

const lineSeries = [
  { label: "Course Accesses", color: "#2da8ff", values: [740, 930, 900, 990, 870, 380, 330] },
  { label: "Content Views", color: "#35c0a2", values: [450, 640, 590, 720, 610, 240, 130] },
];

const departments = [
  ["Computer Science Engineering", "12,245", 156, 89],
  ["MBA", "5,842", 78, 85],
  ["Mechanical Engineering", "4,215", 64, 82],
  ["B.Pharmacy", "3,256", 48, 80],
  ["BBA", "2,985", 42, 78],
];

const heatmapRows = [
  ["CS-DEPT", 85, 78, 72, 68, 82, 75],
  ["ME-DEPT", 72, 68, 65, 55, 70, 80],
  ["EE-DEPT", 78, 75, 70, 62, 76, 72],
  ["CE-DEPT", 65, 62, 60, 52, 68, 70],
  ["EC-DEPT", 82, 80, 78, 72, 85, 70],
  ["IT-DEPT", 88, 85, 82, 78, 88, 80],
  ["AIML-DEPT", 90, 88, 85, 82, 90, 85],
  ["DS-DEPT", 86, 82, 80, 75, 85, 82],
];

const heatmapColumns = ["", "VIDEOS", "ASSIGNMENTS", "QUIZZES", "FORUMS", "LECTURE NOTES", "PROJECTS"];

const mappingRows = [
  ["CO1", 72, 78, 75, null, 80, null, 70, 76, null, 82, 74],
  ["CO2", 76, null, 80, 74, null, 78, null, 72, 82, null, 76],
  ["CO3", null, 74, 76, 78, null, null, 80, null, 72, 78, 74],
  ["CO4", 80, null, null, 72, 76, 80, null, 78, null, null, 80],
  ["CO5", null, 80, 74, null, 76, null, 76, null, 80, 74, 78],
  ["CO6", 74, 76, null, 80, null, 74, 78, null, 76, null, 80],
];

const mappingColumns = ["", "PO1", "PO2", "PO3", "PO4", "PO5", "PO7", "PO8", "PO9", "PO10", "PO11", "PO12"];

// Small helpers for DOM creation and SVG elements.
const $ = (selector) => document.querySelector(selector);
const svgEl = (name, attrs = {}) => {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
};

function renderClusters() {
  const grid = $("#clusterGrid");

  clusters.forEach((cluster) => {
    const card = document.createElement("article");
    card.className = "cluster-card";
    card.style.setProperty("--accent", cluster.color);
    card.innerHTML = `
      <div class="cluster-title">
        <span class="cluster-icon" style="background:${cluster.color}">
          <svg><use href="#${cluster.icon}"></use></svg>
        </span>
        <span>${cluster.name}</span>
      </div>
      <div class="cluster-metric"><span>Students</span><strong>${cluster.students}</strong></div>
      <div class="cluster-metric"><span>Departments</span><strong>${cluster.departments}</strong></div>
      <div class="cluster-metric"><span>Courses</span><strong>${cluster.courses}</strong></div>
      <a class="cluster-link" href="#">View Details</a>
    `;
    grid.appendChild(card);
  });
}

function renderContentLegend() {
  const legend = $("#contentLegend");
  contentSeries.forEach((item) => {
    const label = document.createElement("span");
    label.innerHTML = `<i class="swatch" style="background:${item.color}"></i>${item.label}`;
    legend.appendChild(label);
  });
}

function renderBarChart() {
  const svg = $("#barChart");
  const width = 720;
  const height = 240;
  const padding = { top: 22, right: 18, bottom: 48, left: 34 };
  const chartHeight = height - padding.top - padding.bottom;
  const chartWidth = width - padding.left - padding.right;
  // Scale from real stacked totals so tall bars never overlap the legend.
  const stackedTotals = courseLabels.map((_, index) =>
    contentSeries.reduce((total, series) => total + series.values[index], 0)
  );
  const maxValue = Math.ceil(Math.max(...stackedTotals) / 15) * 15;
  const barWidth = 20;
  const gap = chartWidth / courseLabels.length;

  [0, maxValue * 0.25, maxValue * 0.5, maxValue * 0.75, maxValue].forEach((tick) => {
    const y = padding.top + chartHeight - (tick / maxValue) * chartHeight;
    svg.appendChild(svgEl("line", { x1: padding.left, x2: width - padding.right, y1: y, y2: y, class: "grid-line" }));
    const text = svgEl("text", { x: 4, y: y + 4, class: "chart-label" });
    text.textContent = Math.round(tick);
    svg.appendChild(text);
  });

  courseLabels.forEach((label, index) => {
    const x = padding.left + index * gap + gap / 2 - barWidth / 2;
    let stackY = padding.top + chartHeight;

    contentSeries.forEach((series) => {
      const segmentHeight = (series.values[index] / maxValue) * chartHeight;
      stackY -= segmentHeight;
      svg.appendChild(svgEl("rect", {
        x,
        y: stackY,
        width: barWidth,
        height: Math.max(segmentHeight, 0),
        rx: 3,
        fill: series.color,
      }));
    });

    const text = svgEl("text", { x: x + barWidth / 2, y: height - 16, "text-anchor": "middle", class: "chart-label" });
    text.textContent = label;
    svg.appendChild(text);
  });
}

// Draw a soft SVG line chart with gradient fill for the two access series.
function renderLineChart() {
  const svg = $("#lineChart");
  const width = 640;
  const height = 280;
  const padding = { top: 18, right: 24, bottom: 48, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = 1000;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const defs = svgEl("defs");
  lineSeries.forEach((series, index) => {
    const gradient = svgEl("linearGradient", { id: `lineFill${index}`, x1: "0", x2: "0", y1: "0", y2: "1" });
    gradient.appendChild(svgEl("stop", { offset: "0%", "stop-color": series.color, "stop-opacity": "0.24" }));
    gradient.appendChild(svgEl("stop", { offset: "100%", "stop-color": series.color, "stop-opacity": "0" }));
    defs.appendChild(gradient);
  });
  svg.appendChild(defs);

  [0, 300, 600, 900, 1000].forEach((tick) => {
    const y = padding.top + chartHeight - (tick / maxValue) * chartHeight;
    svg.appendChild(svgEl("line", { x1: padding.left, x2: width - padding.right, y1: y, y2: y, class: "grid-line" }));
    const text = svgEl("text", { x: 10, y: y + 4, class: "chart-label" });
    text.textContent = tick === 1000 ? "1k" : tick;
    svg.appendChild(text);
  });

  days.forEach((day, index) => {
    const x = padding.left + (index / (days.length - 1)) * chartWidth;
    const text = svgEl("text", { x, y: height - 16, "text-anchor": "middle", class: "chart-label" });
    text.textContent = day;
    svg.appendChild(text);
  });

  lineSeries.forEach((series, index) => {
    const points = series.values.map((value, pointIndex) => ({
      x: padding.left + (pointIndex / (series.values.length - 1)) * chartWidth,
      y: padding.top + chartHeight - (value / maxValue) * chartHeight,
    }));

    const pathData = points.reduce((path, point, pointIndex) => {
      if (pointIndex === 0) return `M ${point.x} ${point.y}`;
      const previous = points[pointIndex - 1];
      const controlX = (previous.x + point.x) / 2;
      return `${path} C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
    }, "");

    const areaPath = `${pathData} L ${points.at(-1).x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;
    svg.appendChild(svgEl("path", { d: areaPath, fill: `url(#lineFill${index})` }));
    svg.appendChild(svgEl("path", { d: pathData, fill: "none", stroke: series.color, "stroke-width": 3, "stroke-linecap": "round" }));

    const legendX = width / 2 - 75 + index * 160;
    svg.appendChild(svgEl("line", { x1: legendX, x2: legendX + 18, y1: height - 5, y2: height - 5, stroke: series.color, "stroke-width": 4 }));
    const legend = svgEl("text", { x: legendX + 26, y: height - 1, class: "chart-label" });
    legend.textContent = series.label;
    svg.appendChild(legend);
  });
}

function renderDepartmentTable() {
  const body = $("#departmentRows");
  departments.forEach(([name, students, courses, completion]) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${students}</td>
      <td>${courses}</td>
      <td><span class="progress"><span>${completion}%</span><span class="bar-track"><i class="bar-fill" style="width:${completion}%"></i></span></span></td>
    `;
    body.appendChild(row);
  });
}

function cellClass(value, partialThreshold = 70) {
  if (value === null) return "cell-empty";
  if (value >= 70) return "cell-high";
  if (value >= partialThreshold) return "cell-partial";
  return "cell-low";
}

function renderSimpleMatrix(tableSelector, columns, rows, mode) {
  const table = $(tableSelector);
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  thead.innerHTML = `<tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr>`;
  rows.forEach((rowData) => {
    const row = document.createElement("tr");
    rowData.forEach((value, index) => {
      const cell = document.createElement(index === 0 ? "th" : "td");
      if (index === 0) {
        cell.textContent = value;
      } else {
        const threshold = mode === "mapping" ? 50 : 40;
        const className = cellClass(value, threshold);
        const suffix = mode === "mapping" ? "" : "%";
        cell.innerHTML = `<span class="${mode === "mapping" ? "map-cell" : "heat-cell"} ${className}">${value === null ? "-" : `${value}${suffix}`}</span>`;
      }
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
}

renderClusters();
renderContentLegend();
renderBarChart();
renderLineChart();
renderDepartmentTable();
renderSimpleMatrix("#heatmapTable", heatmapColumns, heatmapRows, "heatmap");
renderSimpleMatrix("#mappingTable", mappingColumns, mappingRows, "mapping");
