// Dashboard data: update these arrays/objects to change card, table, filter, and chart values.
const clusters = [
  { name: "Engineering", students: "38,240", departments: 12, courses: 562, color: "#ff5d66", icon: "icon-building" },
  { name: "Management", students: "14,760", departments: 6, courses: 238, color: "#297dff", icon: "icon-users" },
  { name: "Sciences", students: "7,450", departments: 6, courses: 132, color: "#ff781b", icon: "icon-flask" },
  { name: "Liberal Arts", students: "5,680", departments: 5, courses: 118, color: "#954de6", icon: "icon-book" },
];

const filterRecords = [
  {
    cluster: "Engineering",
    school: "University School of Engineering",
    institute: "University Institute of Engineering",
    department: "Computer Science Engineering",
    program: "B.Tech CSE",
    faculty: "Faculty of Engineering",
    unit: "Academic Affairs",
    date: "2025-05-03",
  },
  {
    cluster: "Engineering",
    school: "University School of Engineering",
    institute: "University Institute of Engineering",
    department: "Mechanical Engineering",
    program: "B.Tech Mechanical",
    faculty: "Faculty of Engineering",
    unit: "Research",
    date: "2025-05-07",
  },
  {
    cluster: "Engineering",
    school: "University School of Computing",
    institute: "University Institute of Computing",
    department: "Computer Applications",
    program: "BCA",
    faculty: "Faculty of Engineering",
    unit: "Admissions",
    date: "2025-05-11",
  },
  {
    cluster: "Engineering",
    school: "University School of Computing",
    institute: "University Institute of Computing",
    department: "Information Technology",
    program: "MCA",
    faculty: "Faculty of Engineering",
    unit: "Examinations",
    date: "2025-05-15",
  },
  {
    cluster: "Management",
    school: "University School of Business",
    institute: "University School of Business",
    department: "Management Studies",
    program: "MBA",
    faculty: "Faculty of Management",
    unit: "Academic Affairs",
    date: "2025-05-18",
  },
  {
    cluster: "Management",
    school: "University School of Business",
    institute: "University School of Business",
    department: "Business Administration",
    program: "BBA",
    faculty: "Faculty of Management",
    unit: "Admissions",
    date: "2025-05-21",
  },
  {
    cluster: "Sciences",
    school: "University School of Sciences",
    institute: "Institute of Sciences",
    department: "Physics",
    program: "B.Sc Physics",
    faculty: "Faculty of Sciences",
    unit: "Research",
    date: "2025-05-24",
  },
  {
    cluster: "Sciences",
    school: "University School of Sciences",
    institute: "Institute of Sciences",
    department: "Chemistry",
    program: "B.Sc Chemistry",
    faculty: "Faculty of Sciences",
    unit: "Examinations",
    date: "2025-05-27",
  },
  {
    cluster: "Liberal Arts",
    school: "University School of Liberal Arts",
    institute: "Institute of Liberal Arts",
    department: "Communication Studies",
    program: "BA",
    faculty: "Faculty of Liberal Arts",
    unit: "Academic Affairs",
    date: "2025-05-29",
  },
  {
    cluster: "Liberal Arts",
    school: "University School of Liberal Arts",
    institute: "Institute of Liberal Arts",
    department: "Psychology",
    program: "MA",
    faculty: "Faculty of Liberal Arts",
    unit: "Research",
    date: "2025-06-02",
  },
];

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
      <span class="custom-select-chevron" aria-hidden="true"></span>
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
  const uniqueValues = [...new Set(values)];
  select.innerHTML = `<option value="">${placeholder}</option>`;
  uniqueValues.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });

  if (uniqueValues.includes(currentValue)) {
    select.value = currentValue;
  }

  syncCustomSelect(select);
}

function setFilterState(select, isEnabled) {
  if (!isEnabled) {
    select.value = "";
  }

  select.disabled = !isEnabled;
  select.closest(".filter-field").classList.toggle("is-disabled", !isEnabled);
  syncCustomSelect(select);
}

function setDateFilterState(input, isEnabled) {
  if (!isEnabled) {
    input.value = "";
    input.closest(".date-field").classList.remove("is-invalid");
  }

  input.disabled = !isEnabled;
  input.closest(".date-field").classList.toggle("is-disabled", !isEnabled);
}

const filterControls = {
  cluster: { selector: "#clusterFilter", placeholder: "All Clusters" },
  school: { selector: "#schoolFilter", placeholder: "All Schools" },
  institute: { selector: "#instituteFilter", placeholder: "All Institutes" },
  department: { selector: "#departmentFilter", placeholder: "All Depts" },
  program: { selector: "#programFilter", placeholder: "All Programs" },
  faculty: { selector: "#facultyFilter", placeholder: "All Faculty" },
  unit: { selector: "#unitFilter", placeholder: "All Units" },
};

const filterLabels = {
  cluster: "Cluster",
  school: "School",
  institute: "Institute",
  department: "Department",
  program: "Program",
  faculty: "Faculty",
  unit: "Unit",
  from: "From",
  to: "To",
};

function getFilterSelections() {
  return Object.fromEntries(
    Object.entries(filterControls).map(([key, config]) => {
      const select = $(config.selector);
      return [key, select.disabled ? "" : select.value];
    })
  );
}

function parseDateInput(value) {
  const trimmed = value.trim();
  if (!trimmed) return null;

  const nativeMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (nativeMatch) {
    const [, yearValue, monthValue, dayValue] = nativeMatch;
    const year = Number(yearValue);
    const month = Number(monthValue);
    const day = Number(dayValue);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : undefined;
  }

  const match = trimmed.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (!match) return undefined;

  const [, dayValue, monthValue, yearValue] = match;
  const day = Number(dayValue);
  const month = Number(monthValue);
  const year = Number(yearValue);
  const date = new Date(year, month - 1, day);

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return undefined;
  }

  return date;
}

function formatDateInput(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function getDateRange() {
  const fromInput = $("#fromFilter");
  const toInput = $("#toFilter");

  if (fromInput.disabled || toInput.disabled) {
    return { from: null, to: null, isValid: true };
  }

  const from = parseDateInput(fromInput.value);
  const to = parseDateInput(toInput.value);
  const hasInvalidDate = from === undefined || to === undefined;
  const hasInvalidRange = from instanceof Date && to instanceof Date && from > to;

  fromInput.closest(".date-field").classList.toggle("is-invalid", from === undefined || hasInvalidRange);
  toInput.closest(".date-field").classList.toggle("is-invalid", to === undefined || hasInvalidRange);

  return {
    from: from instanceof Date ? from : null,
    to: to instanceof Date ? to : null,
    isValid: !hasInvalidDate && !hasInvalidRange,
  };
}

function recordMatchesDate(record, range = getDateRange()) {
  if (!range.isValid) return true;
  const recordDate = new Date(`${record.date}T00:00:00`);
  if (range.from && recordDate < range.from) return false;
  if (range.to && recordDate > range.to) return false;
  return true;
}

function recordMatchesSelections(record, selections, ignoredKey = "") {
  return Object.entries(selections).every(([key, value]) => !value || key === ignoredKey || record[key] === value);
}

function resetFilterValue(key) {
  if (filterControls[key]) {
    const select = $(filterControls[key].selector);
    select.value = "";
  }

  if (key === "from") $("#fromFilter").value = "";
  if (key === "to") $("#toFilter").value = "";

  applyFilters();
}

function resetAllFilters() {
  Object.values(filterControls).forEach((config) => {
    $(config.selector).value = "";
  });
  $("#fromFilter").value = "";
  $("#toFilter").value = "";
  applyFilters();
}

function renderActiveFilterChips() {
  const chips = $("#activeFilterChips");
  const resetButton = $("#resetFilters");
  if (!chips || !resetButton) return;

  const selections = getFilterSelections();
  const range = getDateRange();
  const activeFilters = Object.entries(selections)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => [key, value]);

  if ($("#fromFilter").value && range.from) activeFilters.push(["from", $("#fromFilter").value]);
  if ($("#toFilter").value && range.to) activeFilters.push(["to", $("#toFilter").value]);

  chips.innerHTML = "";
  activeFilters.forEach(([key, value]) => {
    const chip = document.createElement("span");
    const label = document.createElement("span");
    const button = document.createElement("button");

    chip.className = "active-filter-chip";
    label.textContent = `${filterLabels[key]}: ${value}`;
    button.type = "button";
    button.textContent = "×";
    button.setAttribute("aria-label", `Remove ${filterLabels[key]} filter`);
    button.addEventListener("click", () => resetFilterValue(key));
    chip.append(label, button);
    chips.appendChild(chip);
  });

  resetButton.disabled = activeFilters.length === 0;
}

function getFilterValues(key, selections) {
  const range = getDateRange();
  return filterRecords
    .filter((record) => recordMatchesDate(record, range) && recordMatchesSelections(record, selections, key))
    .map((record) => record[key]);
}

function clusterMatchesFilters(clusterName) {
  const selections = getFilterSelections();
  const range = getDateRange();
  return filterRecords.some(
    (record) => record.cluster === clusterName && recordMatchesDate(record, range) && recordMatchesSelections(record, selections)
  );
}

function applyFilters() {
  const refreshOptions = () => {
    const selections = getFilterSelections();
    const hasCluster = Boolean(selections.cluster);

    ["#fromFilter", "#toFilter"].forEach((selector) => setDateFilterState($(selector), hasCluster));

    Object.entries(filterControls).forEach(([key, config]) => {
      const select = $(config.selector);
      setSelectOptions(select, config.placeholder, getFilterValues(key, selections));
      setFilterState(select, key === "cluster" || hasCluster);
    });
  };

  refreshOptions();
  refreshOptions();

  const activeClusterNames = clusters.filter((cluster) => clusterMatchesFilters(cluster.name)).map((cluster) => cluster.name);
  renderClusters(activeClusterNames);
  renderActiveFilterChips();
}

// Filter initialization: wires dropdown change events and renders filtered clusters.
function initFilters() {
  Object.values(filterControls).forEach((config) => {
    $(config.selector).addEventListener("change", applyFilters);
  });

  $("#resetFilters")?.addEventListener("click", resetAllFilters);

  ["#fromFilter", "#toFilter"].forEach((selector) => {
    const input = $(selector);
    input.addEventListener("click", () => {
      input.showPicker?.();
    });
    input.addEventListener("change", () => {
      const date = parseDateInput(input.value);
      if (date instanceof Date) input.value = formatDateInput(date);
      applyFilters();
    });
    input.addEventListener("blur", () => {
      const date = parseDateInput(input.value);
      if (date instanceof Date) input.value = formatDateInput(date);
      applyFilters();
    });
  });

  applyFilters();
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

// Startup KPI animation: briefly shows shuffled values, then restores the real dashboard numbers.
function animateMetricValues() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const metricValues = document.querySelectorAll(".content-metric strong, .stat-card strong");
  const formatter = new Intl.NumberFormat("en-US");
  const burstMetricCard = (valueNode) => {
    const card = valueNode.closest(".content-metric, .stat-card");
    if (!card) return;

    const burst = document.createElement("span");
    burst.className = "metric-burst";

    Array.from({ length: 22 }).forEach((_, index) => {
      const particle = document.createElement("span");
      const angle = -170 + (index * 16);
      const distance = 36 + Math.random() * 54;
      const size = 5 + Math.random() * 6;

      particle.style.setProperty("--x", `${Math.cos(angle * Math.PI / 180) * distance}px`);
      particle.style.setProperty("--y", `${Math.sin(angle * Math.PI / 180) * distance}px`);
      particle.style.setProperty("--delay", `${Math.random() * 180}ms`);
      particle.style.setProperty("--size", `${size}px`);
      burst.appendChild(particle);
    });

    card.appendChild(burst);
    window.setTimeout(() => burst.remove(), 1700);
  };

  metricValues.forEach((valueNode) => {
    const finalText = valueNode.textContent.trim();
    const isPercent = finalText.endsWith("%");
    const digitText = finalText.replace(/[^\d]/g, "");
    const finalValue = Number(digitText);

    if (!Number.isFinite(finalValue) || digitText.length === 0) return;

    const minValue = isPercent ? 1 : Math.max(1, 10 ** Math.max(digitText.length - 1, 0));
    const maxValue = isPercent ? 99 : Math.max(minValue, (10 ** digitText.length) - 1);
    const duration = 1600 + Math.random() * 520;
    const startTime = performance.now();

    const renderRandomValue = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress >= 1) {
        valueNode.textContent = finalText;
        valueNode.classList.remove("metric-value-settled");
        void valueNode.offsetWidth;
        valueNode.classList.add("metric-value-settled");
        burstMetricCard(valueNode);
        return;
      }

      const randomValue = Math.floor(minValue + Math.random() * (maxValue - minValue + 1));
      valueNode.textContent = isPercent ? `${Math.min(randomValue, 99)}%` : formatter.format(randomValue);
      requestAnimationFrame(renderRandomValue);
    };

    renderRandomValue();
  });
}

// Page startup: enhance controls, apply filters, then render all generated visuals.
initNavigationDrawer();
enhanceFilterDropdowns();
initFilters();
animateMetricValues();
renderLineChart();
renderDepartmentTable();
renderSimpleMatrix("#heatmapTable", heatmapColumns, heatmapRows);
renderStackedBarChart();
