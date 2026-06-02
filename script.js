// Dashboard data: update these arrays/objects to change card, table, filter, and chart values.
const clusters = [
  { name: "Engineering", students: "38,240", departments: 12, courses: 562, color: "#ff5d66", icon: "icon-building" },
  { name: "Management", students: "14,760", departments: 6, courses: 238, color: "#297dff", icon: "icon-users" },
  { name: "Sciences", students: "7,450", departments: 6, courses: 132, color: "#ff781b", icon: "icon-flask" },
  { name: "Liberal Arts", students: "5,680", departments: 5, courses: 118, color: "#954de6", icon: "icon-book" },
];

const filterCatalog = {
  Engineering: {
    institutes: {
      "University Institute of Engineering": {
        programs: {
          "B.Tech CSE": ["Data Structures", "Operating Systems", "Database Management"],
          "B.Tech Mechanical": ["Thermodynamics", "Machine Design", "Manufacturing Process"],
        },
      },
      "University Institute of Computing": {
        programs: {
          "BCA": ["Web Development", "Programming Fundamentals", "Computer Networks"],
          "MCA": ["Advanced Java", "Cloud Computing", "Software Engineering"],
        },
      },
    },
  },
  Management: {
    institutes: {
      "University School of Business": {
        programs: {
          MBA: ["Business Analytics", "Financial Management", "Marketing Strategy"],
          BBA: ["Principles of Management", "Business Communication", "Accounting"],
        },
      },
    },
  },
  Sciences: {
    institutes: {
      "Institute of Sciences": {
        programs: {
          "B.Sc Physics": ["Applied Physics", "Quantum Mechanics", "Electromagnetism"],
          "B.Sc Chemistry": ["Organic Chemistry", "Analytical Chemistry", "Physical Chemistry"],
        },
      },
    },
  },
  "Liberal Arts": {
    institutes: {
      "Institute of Liberal Arts": {
        programs: {
          BA: ["Communication Studies", "Political Thought", "Psychology"],
          MA: ["Research Methods", "Cultural Studies", "Media Studies"],
        },
      },
    },
  },
};

const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6"];

// Student Access Pattern line chart data.
const lineSeries = [
  { label: "Course Accesses", color: "#18c8f4", values: [18500, 20500, 19800, 21800, 19200, 11200, 9800] },
  { label: "Content Views", color: "#12c6b2", values: [13500, 15500, 14900, 16200, 14100, 8200, 7000] },
];

// Top Departments table data.
const departments = [
  ["Computer Science Engineering", "12,245", 156, 89],
  ["MBA", "5,842", 78, 85],
  ["Mechanical Engineering", "4,215", 64, 82],
  ["B.Pharmacy", "3,256", 48, 80],
  ["BBA", "2,985", 42, 78],
];

// Student Engagement Heatmap table data.
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

// Stacked bar chart data is derived from the Student Engagement Heatmap.
const stackedActivityColors = ["#1889aa", "#f5a23a", "#704ee6", "#55c8c2", "#9bd81c", "#de8200"];
const stackedActivitySeries = heatmapColumns.slice(1).map((label, index) => ({
  label: label
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase()),
  color: stackedActivityColors[index],
}));

const stackedActivityRows = heatmapRows.map(([label, ...values]) => ({ label, values }));

// Utility helpers: DOM lookup and SVG node creation used by all render functions.
const $ = (selector) => document.querySelector(selector);
const svgEl = (name, attrs = {}) => {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
};

// Custom dropdown behavior for the filter bar.
function closeCustomSelects(exceptField) {
  document.querySelectorAll(".filter-field.is-open").forEach((field) => {
    if (field !== exceptField) {
      field.classList.remove("is-open");
      field.querySelector(".custom-select-trigger")?.setAttribute("aria-expanded", "false");
    }
  });
}

function syncCustomSelect(select) {
  const field = select.closest(".filter-field");
  const customSelect = field?.querySelector(".custom-select");
  if (!customSelect) return;

  const trigger = customSelect.querySelector(".custom-select-trigger");
  const menu = customSelect.querySelector(".custom-select-menu");
  const selectedOption = select.options[select.selectedIndex] || select.options[0];
  trigger.textContent = selectedOption?.textContent || "";
  trigger.setAttribute("aria-disabled", String(select.disabled));
  trigger.tabIndex = select.disabled ? -1 : 0;
  menu.innerHTML = "";

  Array.from(select.options).forEach((option, index) => {
    const item = document.createElement("li");
    item.className = `custom-select-option${option.value === select.value ? " is-selected" : ""}`;
    item.textContent = option.textContent;
    item.dataset.value = option.value;
    item.role = "option";
    item.tabIndex = -1;
    item.setAttribute("aria-selected", String(option.value === select.value));
    item.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (select.disabled) return;
      closeCustomSelects();
      select.selectedIndex = index;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    menu.appendChild(item);
  });
}

function moveCustomSelection(select, direction) {
  if (select.disabled) return;
  const nextIndex = Math.min(Math.max(select.selectedIndex + direction, 0), select.options.length - 1);
  if (nextIndex === select.selectedIndex) return;
  select.selectedIndex = nextIndex;
  select.dispatchEvent(new Event("change", { bubbles: true }));
}

function enhanceFilterDropdowns() {
  document.querySelectorAll(".filter-bar select").forEach((select) => {
    const field = select.closest(".filter-field");
    const customSelect = document.createElement("span");
    customSelect.className = "custom-select";
    customSelect.innerHTML = `
      <span class="custom-select-trigger" role="combobox" aria-expanded="false" aria-haspopup="listbox" tabindex="0"></span>
      <ul class="custom-select-menu" role="listbox"></ul>
    `;
    select.after(customSelect);

    const trigger = customSelect.querySelector(".custom-select-trigger");
    const toggleSelect = (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (select.disabled) return;
      const shouldOpen = !field.classList.contains("is-open");
      closeCustomSelects(field);
      field.classList.toggle("is-open", shouldOpen);
      trigger.setAttribute("aria-expanded", String(shouldOpen));
    };

    trigger.addEventListener("click", toggleSelect);
    field.addEventListener("click", (event) => {
      if (event.target.closest(".custom-select-menu")) return;
      toggleSelect(event);
    });
    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleSelect(event);
      }

      if (event.key === "Escape") {
        closeCustomSelects();
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        moveCustomSelection(select, event.key === "ArrowDown" ? 1 : -1);
      }
    });

    select.addEventListener("change", () => closeCustomSelects());
    syncCustomSelect(select);
  });

  document.addEventListener("click", () => closeCustomSelects());
}

// Cluster overview renderer: creates the cards inside #clusterGrid.
function renderClusters(activeClusterNames = clusters.map((cluster) => cluster.name)) {
  const grid = $("#clusterGrid");
  grid.innerHTML = "";

  clusters.forEach((cluster) => {
    const isActive = activeClusterNames.includes(cluster.name);
    const card = document.createElement("article");
    card.className = `cluster-card${isActive ? "" : " is-disabled"}`;
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
    `;
    grid.appendChild(card);
  });
}

// Filter helpers: populate dropdown options and enable/disable dependent filters.
function setSelectOptions(select, placeholder, values) {
  const currentValue = select.value;
  select.innerHTML = `<option value="">${placeholder}</option>`;
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });

  if (values.includes(currentValue)) {
    select.value = currentValue;
  }

  syncCustomSelect(select);
}

function setFilterState(select, isEnabled) {
  select.disabled = !isEnabled;
  select.closest(".filter-field").classList.toggle("is-disabled", !isEnabled);
  syncCustomSelect(select);
}

// Filter state logic: decides which clusters remain active after selections.
function getSelectedCatalog() {
  const selectedCluster = $("#clusterFilter").value;
  const selectedInstitute = $("#instituteFilter").value;
  const selectedProgram = $("#programFilter").value;
  const clusterNames = selectedCluster ? [selectedCluster] : Object.keys(filterCatalog);
  const institutes = clusterNames.flatMap((clusterName) => Object.keys(filterCatalog[clusterName].institutes));
  const programSources = clusterNames.flatMap((clusterName) => {
    const clusterInstitutes = filterCatalog[clusterName].institutes;
    const instituteNames = selectedInstitute ? [selectedInstitute] : Object.keys(clusterInstitutes);
    return instituteNames
      .filter((instituteName) => clusterInstitutes[instituteName])
      .map((instituteName) => clusterInstitutes[instituteName].programs);
  });
  const programs = programSources.flatMap((programMap) => Object.keys(programMap));
  const courses = programSources.flatMap((programMap) => {
    const programNames = selectedProgram ? [selectedProgram] : Object.keys(programMap);
    return programNames.filter((programName) => programMap[programName]).flatMap((programName) => programMap[programName]);
  });

  return { institutes, programs, courses };
}

function clusterMatchesFilters(clusterName) {
  const selectedCluster = $("#clusterFilter").value;
  const selectedInstitute = $("#instituteFilter").value;
  const selectedProgram = $("#programFilter").value;
  const selectedCourse = $("#courseFilter").value;

  if (selectedCluster && clusterName !== selectedCluster) return false;

  const instituteMap = filterCatalog[clusterName].institutes;
  const instituteNames = Object.keys(instituteMap);
  const matchingInstitutes = selectedInstitute ? [selectedInstitute].filter((name) => instituteMap[name]) : instituteNames;
  if (selectedInstitute && matchingInstitutes.length === 0) return false;

  const programMaps = matchingInstitutes.map((name) => instituteMap[name].programs);
  const programNames = programMaps.flatMap((programMap) => Object.keys(programMap));
  const matchingPrograms = selectedProgram ? [selectedProgram].filter((name) => programNames.includes(name)) : programNames;
  if (selectedProgram && matchingPrograms.length === 0) return false;

  if (!selectedCourse) return true;
  return programMaps.some((programMap) =>
    matchingPrograms.some((programName) => programMap[programName]?.includes(selectedCourse))
  );
}

function applyFilters(changedFilter) {
  const clusterSelect = $("#clusterFilter");
  const instituteSelect = $("#instituteFilter");
  const programSelect = $("#programFilter");
  const courseSelect = $("#courseFilter");
  const semesterSelect = $("#semesterFilter");

  if (changedFilter === "cluster") {
    instituteSelect.value = "";
    programSelect.value = "";
    courseSelect.value = "";
    semesterSelect.value = "";
  }

  if (changedFilter === "institute") {
    programSelect.value = "";
    courseSelect.value = "";
    semesterSelect.value = "";
  }

  if (changedFilter === "program") {
    courseSelect.value = "";
    semesterSelect.value = "";
  }

  if (changedFilter === "course" && !courseSelect.value) {
    semesterSelect.value = "";
  }

  const { institutes, programs, courses } = getSelectedCatalog();
  setSelectOptions(instituteSelect, "All Institutes", institutes);
  setSelectOptions(programSelect, "All Programs", programs);
  setSelectOptions(courseSelect, "All Courses", courses);
  setSelectOptions(semesterSelect, "All Semesters", semesters);

  setFilterState(clusterSelect, true);
  setFilterState(instituteSelect, Boolean(clusterSelect.value));
  setFilterState(programSelect, Boolean(instituteSelect.value));
  setFilterState(courseSelect, Boolean(programSelect.value));
  setFilterState(semesterSelect, Boolean(courseSelect.value));

  const activeClusterNames = clusters.filter((cluster) => clusterMatchesFilters(cluster.name)).map((cluster) => cluster.name);
  renderClusters(activeClusterNames);
}

// Filter initialization: wires dropdown change events and renders filtered clusters.
function initFilters() {
  setSelectOptions($("#clusterFilter"), "All Clusters", clusters.map((cluster) => cluster.name));
  applyFilters();

  $("#clusterFilter").addEventListener("change", () => applyFilters("cluster"));
  $("#instituteFilter").addEventListener("change", () => applyFilters("institute"));
  $("#programFilter").addEventListener("change", () => applyFilters("program"));
  $("#courseFilter").addEventListener("change", () => applyFilters("course"));
  $("#semesterFilter").addEventListener("change", () => applyFilters("semester"));
}

// Student Access Pattern renderer: draws the smooth two-line SVG chart.
function renderLineChart() {
  const svg = $("#lineChart");
  if (!svg) return;

  const width = 680;
  const height = 430;
  const padding = { top: 18, right: 18, bottom: 34, left: 46 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = 22000;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const defs = svgEl("defs");
  lineSeries.forEach((series, index) => {
    const gradient = svgEl("linearGradient", { id: `lineFill${index}`, x1: "0", x2: "0", y1: "0", y2: "1" });
    gradient.appendChild(svgEl("stop", { offset: "0%", "stop-color": series.color, "stop-opacity": "0.18" }));
    gradient.appendChild(svgEl("stop", { offset: "100%", "stop-color": series.color, "stop-opacity": "0" }));
    defs.appendChild(gradient);
  });
  svg.appendChild(defs);

  [0, 6000, 11000, 17000, 22000].forEach((tick) => {
    const y = padding.top + chartHeight - (tick / maxValue) * chartHeight;
    svg.appendChild(svgEl("line", { x1: padding.left, x2: width - padding.right, y1: y, y2: y, class: "grid-line" }));
    const text = svgEl("text", { x: 10, y: y + 4, class: "chart-label" });
    text.textContent = tick === 0 ? "0" : `${Math.round(tick / 1000)}k`;
    svg.appendChild(text);
  });

  days.forEach((day, index) => {
    const x = padding.left + (index / (days.length - 1)) * chartWidth;
    const text = svgEl("text", { x, y: height - 12, "text-anchor": "middle", class: "chart-label" });
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
    svg.appendChild(svgEl("path", { d: pathData, fill: "none", stroke: series.color, "stroke-width": 3.2, "stroke-linecap": "round" }));
  });
}

// Top Departments renderer: fills #departmentRows with completion progress bars.
function renderDepartmentTable() {
  const body = $("#departmentRows");
  if (!body) return;

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

// Heatmap cell color helper: maps percentage values to RYG classes.
function cellClass(value, partialThreshold = 70) {
  if (value === null) return "cell-empty";
  if (value >= 70) return "cell-high";
  if (value >= partialThreshold) return "cell-partial";
  return "cell-low";
}

// Matrix renderer: builds the Student Engagement Heatmap table.
function renderSimpleMatrix(tableSelector, columns, rows) {
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
        const className = cellClass(value, 40);
        cell.innerHTML = `<span class="heat-cell ${className}">${value === null ? "-" : `${value}%`}</span>`;
      }
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
}

// Activity Mix renderer: draws horizontal stacked SVG bars by department.
function renderStackedBarChart() {
  const svg = $("#stackedBarChart");
  const tooltip = $("#stackedTooltip");
  if (!svg) return;
  svg.innerHTML = "";

  const width = 720;
  const height = 430;
  const padding = { top: 16, right: 20, bottom: 34, left: 128 };
  const chartWidth = width - padding.left - padding.right;
  const rowPitch = (height - padding.top - padding.bottom) / stackedActivityRows.length;
  const barHeight = 20;
  const maxValue = Math.ceil(
    Math.max(...stackedActivityRows.map((row) => row.values.reduce((sum, value) => sum + value, 0))) / 50
  ) * 50;

  const showStackedTooltip = (event, row) => {
    if (!tooltip) return;
    const total = row.values.reduce((sum, value) => sum + value, 0);
    tooltip.innerHTML = `
      <strong>${row.label}</strong>
      ${stackedActivitySeries
        .map(
          (series, index) => `
            <span><i style="background:${series.color}"></i><b>${series.label}:</b><em>${row.values[index]}%</em></span>
          `
        )
        .join("")}
      <span class="tooltip-total"><i></i><b>Total:</b><em>${total}</em></span>
    `;
    tooltip.classList.add("is-visible");

    const frameRect = tooltip.parentElement.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const pointerX = Number.isFinite(event.clientX) ? event.clientX - frameRect.left : frameRect.width / 2;
    const pointerY = Number.isFinite(event.clientY) ? event.clientY - frameRect.top : frameRect.height / 2;
    const left = Math.min(Math.max(pointerX + 16, 8), frameRect.width - tooltipRect.width - 8);
    const top = Math.min(Math.max(pointerY - tooltipRect.height / 2, 8), frameRect.height - tooltipRect.height - 8);
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  };

  const hideStackedTooltip = () => {
    tooltip?.classList.remove("is-visible");
  };

  Array.from({ length: Math.floor(maxValue / 100) + 1 }, (_, index) => index * 100).forEach((tick) => {
    const x = padding.left + (tick / maxValue) * chartWidth;
    svg.appendChild(svgEl("line", { x1: x, x2: x, y1: padding.top - 6, y2: height - padding.bottom, class: "grid-line" }));
    const text = svgEl("text", { x, y: height - 10, "text-anchor": "middle", class: "chart-label" });
    text.textContent = tick;
    svg.appendChild(text);
  });

  svg.appendChild(svgEl("line", { x1: padding.left, x2: padding.left, y1: padding.top - 6, y2: height - padding.bottom, class: "stacked-axis" }));
  svg.appendChild(svgEl("line", { x1: padding.left, x2: width - padding.right, y1: height - padding.bottom, y2: height - padding.bottom, class: "stacked-axis" }));

  stackedActivityRows.forEach((row, rowIndex) => {
    const rowGroup = svgEl("g", { class: "stacked-row", tabindex: "0" });
    const y = padding.top + rowIndex * rowPitch + (rowPitch - barHeight) / 2;
    const rowBand = svgEl("rect", {
      x: 0,
      y: padding.top + rowIndex * rowPitch,
      width,
      height: rowPitch,
      class: "stacked-row-band",
    });
    rowGroup.appendChild(rowBand);

    const label = svgEl("text", { x: 14, y: y + barHeight / 2 + 5, class: "stacked-label" });
    label.textContent = row.label;
    rowGroup.appendChild(label);

    let cursorX = padding.left;
    row.values.forEach((value, valueIndex) => {
      const segmentWidth = (value / maxValue) * chartWidth;
      const rect = svgEl("rect", {
        x: cursorX,
        y,
        width: Math.max(segmentWidth, 1.5),
        height: barHeight,
        fill: stackedActivitySeries[valueIndex].color,
        class: "stacked-segment",
      });
      rect.appendChild(svgEl("title"));
      rect.querySelector("title").textContent = `${row.label} - ${stackedActivitySeries[valueIndex].label}: ${value}`;
      rowGroup.appendChild(rect);
      cursorX += segmentWidth;
    });

    rowGroup.addEventListener("pointerenter", (event) => {
      rowGroup.classList.add("is-active");
      showStackedTooltip(event, row);
    });
    rowGroup.addEventListener("pointermove", (event) => showStackedTooltip(event, row));
    rowGroup.addEventListener("pointerleave", () => {
      rowGroup.classList.remove("is-active");
      hideStackedTooltip();
    });
    rowGroup.addEventListener("focus", (event) => {
      rowGroup.classList.add("is-active");
      showStackedTooltip(event, row);
    });
    rowGroup.addEventListener("blur", () => {
      rowGroup.classList.remove("is-active");
      hideStackedTooltip();
    });

    svg.appendChild(rowGroup);
  });
}

// Mobile navigation drawer: opens/closes the primary nav on smaller screens.
function initNavigationDrawer() {
  const toggle = $(".drawer-toggle");
  const nav = $("#primaryNav");
  const backdrop = $(".drawer-backdrop");
  if (!toggle || !nav || !backdrop) return;

  const setDrawerOpen = (isOpen) => {
    toggle.classList.toggle("is-open", isOpen);
    nav.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("drawer-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  };

  toggle.addEventListener("click", () => setDrawerOpen(!nav.classList.contains("is-open")));
  backdrop.addEventListener("click", () => setDrawerOpen(false));
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setDrawerOpen(false)));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setDrawerOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1180) setDrawerOpen(false);
  });
}

// Page startup: enhance controls, apply filters, then render all generated visuals.
initNavigationDrawer();
enhanceFilterDropdowns();
initFilters();
renderLineChart();
renderDepartmentTable();
renderSimpleMatrix("#heatmapTable", heatmapColumns, heatmapRows);
renderStackedBarChart();
