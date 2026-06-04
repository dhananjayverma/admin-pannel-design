// Immediately apply the saved theme (light or dark) on load to prevent theme flash.
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-theme");
}

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

const contentCategories = [
  { key: "pages", label: "Pages", color: "#3f82f3" },
  { key: "ppts", label: "PPTs", color: "#8358ef" },
  { key: "forums", label: "Forums", color: "#f59e0b" },
  { key: "labs", label: "Lab Manuals", color: "#d97706" },
];

const contentDailyRows = [
  { label: "May 20", pages: 4, ppts: 7, forums: 5, labs: 3 },
  { label: "May 21", pages: 5, ppts: 4, forums: 3, labs: 1 },
  { label: "May 22", pages: 18, ppts: 17, forums: 17, labs: 6 },
  { label: "May 23", pages: 40, ppts: 40, forums: 40, labs: 3 },
  { label: "May 24", pages: 22, ppts: 22, forums: 22, labs: 6 },
  { label: "May 25", pages: 48, ppts: 45, forums: 48, labs: 27 },
  { label: "May 26", pages: 46, ppts: 46, forums: 46, labs: 10 },
  { label: "May 27", pages: 158, ppts: 238, forums: 238, labs: 17 },
  { label: "May 28", pages: 222, ppts: 318, forums: 310, labs: 5 },
  { label: "May 29", pages: 210, ppts: 275, forums: 272, labs: 14 },
  { label: "May 30", pages: 160, ppts: 225, forums: 230, labs: 10 },
  { label: "May 31", pages: 60, ppts: 98, forums: 100, labs: 17 },
  { label: "Jun 1", pages: 240, ppts: 322, forums: 268, labs: 11 },
  { label: "Jun 2", pages: 4, ppts: 16, forums: 18, labs: 1 },
];

const contentHourlyRows = [
  { hour: "00:00", pages: 13, ppts: 13, forums: 13, labs: 0 },
  { hour: "01:00", pages: 4, ppts: 4, forums: 3, labs: 2 },
  { hour: "02:00", pages: 0, ppts: 0, forums: 0, labs: 0 },
  { hour: "03:00", pages: 0, ppts: 0, forums: 0, labs: 0 },
  { hour: "04:00", pages: 1, ppts: 1, forums: 1, labs: 0 },
  { hour: "05:00", pages: 1, ppts: 1, forums: 1, labs: 0 },
  { hour: "06:00", pages: 20, ppts: 24, forums: 24, labs: 2 },
  { hour: "07:00", pages: 13, ppts: 16, forums: 13, labs: 5 },
  { hour: "08:00", pages: 7, ppts: 12, forums: 12, labs: 0 },
  { hour: "09:00", pages: 48, ppts: 58, forums: 60, labs: 14 },
  { hour: "10:00", pages: 167, ppts: 215, forums: 215, labs: 10 },
  { hour: "11:00", pages: 153, ppts: 222, forums: 211, labs: 10 },
  { hour: "12:00", pages: 116, ppts: 170, forums: 156, labs: 19 },
  { hour: "13:00", pages: 106, ppts: 141, forums: 137, labs: 10 },
  { hour: "14:00", pages: 138, ppts: 185, forums: 168, labs: 17 },
  { hour: "15:00", pages: 115, ppts: 143, forums: 132, labs: 14 },
  { hour: "16:00", pages: 82, ppts: 126, forums: 128, labs: 6 },
  { hour: "17:00", pages: 14, ppts: 20, forums: 20, labs: 1 },
  { hour: "18:00", pages: 30, ppts: 31, forums: 31, labs: 3 },
  { hour: "19:00", pages: 42, ppts: 57, forums: 57, labs: 3 },
  { hour: "20:00", pages: 21, ppts: 31, forums: 31, labs: 2 },
  { hour: "21:00", pages: 47, ppts: 62, forums: 60, labs: 2 },
  { hour: "22:00", pages: 63, ppts: 86, forums: 85, labs: 3 },
  { hour: "23:00", pages: 45, ppts: 60, forums: 60, labs: 9 },
];

const subpartRows = [
  { key: "outcomes", label: "Outcomes", value: 1301, color: "#10b981" },
  { key: "pages", label: "Pages", value: 1237, color: "#3f82f3" },
  { key: "forum", label: "Forum", value: 1617, color: "#8358ef" },
  { key: "video", label: "Video", value: 117, color: "#f59e0b" },
  { key: "references", label: "References", value: 1903, color: "#e0529c" },
  { key: "labs", label: "Lab Manuals", value: 131, color: "#d97706" },
  { key: "pptTokens", label: "PPT Tokens", value: 8612134, color: "#6366f1" },
  { key: "pageTokens", label: "Page Tokens", value: 5835296, color: "#14b8a6" },
];

const comparisonRows = [
  { label: "Mechanical Engineering", pages: 258, ppts: 370, forums: 376, labs: 33 },
  { label: "Computer Science\nEngineering", pages: 270, ppts: 220, forums: 221, labs: 4 },
  { label: "Aerospace Engineering", pages: 250, ppts: 280, forums: 280, labs: 0 },
  { label: "Biotechnology Engg", pages: 76, ppts: 139, forums: 140, labs: 0 },
  { label: "Food Technology Engg", pages: 64, ppts: 115, forums: 115, labs: 1 },
  { label: "Chemical Engineering", pages: 79, ppts: 88, forums: 89, labs: 1 },
  { label: "Unknown", pages: 65, ppts: 66, forums: 66, labs: 36 },
  { label: "CSE-AIT", pages: 43, ppts: 65, forums: 67, labs: 15 },
  { label: "Education", pages: 50, ppts: 76, forums: 76, labs: 0 },
  { label: "Automobile Engineering", pages: 52, ppts: 53, forums: 53, labs: 15 },
  { label: "Electrical Engineering", pages: 36, ppts: 65, forums: 66, labs: 5 },
  { label: "Electronics and\nCommunicatio...", pages: 45, ppts: 54, forums: 27, labs: 0 },
  { label: "Pharmaceutical Sciences", pages: 28, ppts: 53, forums: 0, labs: 9 },
  { label: "Management", pages: 27, ppts: 31, forums: 30, labs: 0 },
  { label: "Physiotherapy", pages: 23, ppts: 18, forums: 18, labs: 9 },
];

const facultyPerformanceRows = [
  ["Gursimran Kaur", "e16567", "Engineering", "Computer Science", "CONT_24SMT-341 :: PROBABILITY AN...", "CONT_24SMT-341", "Unit 1", 21, 21, 21, 0, 24],
  ["Suman Debnath", "e11804", "Engineering", "Mechanical Engineering", "CONT_25MET-222 :: ENGINEERING TH...", "CONT_25MET-222", "Unit 1", 19, 19, 19, 0, 19],
  ["Gurpreet Singh", "e2560", "Engineering", "Mechanical Engineering", "CONT_24MEH-323 :: FLUID MECHANIC...", "CONT_24MEH-323", "Unit 3", 20, 20, 20, 0, 19],
  ["Gurpreet Singh", "e2560", "Engineering", "Mechanical Engineering", "CONT_24MEH-323 :: FLUID MECHANIC...", "CONT_24MEH-323", "Unit 1", 20, 19, 20, 0, 19],
  ["Showket Ahmad M...", "e12366", "Education", "Education", "CONT_25EDT-206 :: SOCIO-ECONOMI...", "CONT_25EDT-206", "Unit 1", 22, 22, 22, 0, 18],
  ["Parveen Kumar Sai...", "e13339", "Engineering", "Computer Science", "CONT_24CST-352 :: MOBILE APP USER...", "CONT_24CST-352", "Unit 1", 15, 15, 15, 0, 18],
  ["Gurpreet Singh", "e2560", "Engineering", "Mechanical Engineering", "CONT_24MEH-323 :: FLUID MECHANIC...", "CONT_24MEH-323", "Unit 2", 20, 19, 20, 0, 18],
  ["Narinder Singh Kha...", "e1738", "Engineering", "Mechanical Engineering", "CONT_24MET-331 :: ENGINEERING EC...", "CONT_24MET-331", "Unit 1", 16, 15, 16, 0, 17],
  ["Tarunpreet Singh", "e20192", "Engineering", "Aerospace Engineering", "CONT_23AST-402 :: PROFESSIONAL E...", "CONT_23AST-402", "Unit 2", 16, 16, 16, 0, 16],
  ["Sanjeev Kumar Dha...", "e16511", "Engineering", "Aerospace Engineering", "CONT_25ASH-211 :: STRENGTH OF MA...", "CONT_25ASH-211", "Unit 1", 16, 16, 16, 0, 16],
  ["G Prasad", "e14018", "Engineering", "Aerospace Engineering", "CONT_26AST-620 :: AEROSPACE STRU...", "CONT_26AST-620", "Unit 1", 13, 15, 15, 0, 16],
  ["Tarunpreet Singh", "e20192", "Engineering", "Aerospace Engineering", "CONT_23AST-402 :: PROFESSIONAL E...", "CONT_23AST-402", "Unit 1", 16, 16, 16, 0, 16],
  ["Parveen Kumar Sai...", "e13339", "Engineering", "Computer Science", "CONT_24CST-352 :: MOBILE APP USER...", "CONT_24CST-352", "Unit 2", 15, 15, 15, 0, 15],
  ["Gursimran Kaur", "e16567", "Engineering", "Computer Science", "CONT_24SMT-341 :: PROBABILITY AN...", "CONT_24SMT-341", "Unit 2", 15, 20, 20, 0, 15],
  ["Tarunpreet Singh", "e20192", "Engineering", "Aerospace Engineering", "CONT_24AST-311 :: COMBUSTION THE...", "CONT_24AST-311", "Unit 1", 15, 15, 15, 0, 15],
  ["Priyanka Devi", "e16550", "Engineering", "Computer Science", "CONT_23CST-401 :: PARALLEL AND DI...", "CONT_23CST-401", "Unit 2", 15, 15, 15, 0, 15],
  ["Akant Kumar Singh", "e13980", "Engineering", "Automobile Engineering", "CONT_24AET-334 :: DESIGN FOR AUT...", "CONT_24AET-334", "Unit 1", 15, 15, 15, 0, 15],
  ["Suman Debnath", "e11804", "Engineering", "Mechanical Engineering", "CONT_25MET-222 :: ENGINEERING TH...", "CONT_25MET-222", "Unit 2", 13, 20, 20, 0, 14],
  ["Sugandh Gupta", "e13120", "Engineering", "Aerospace Engineering", "CONT_26AST-613 :: SPACE VEHICLES ...", "CONT_26AST-613", "Unit 1", 14, 14, 14, 0, 14],
  ["Rupinder Singh", "e9373", "Engineering", "Mechanical Engineering", "CONT_25MEH-221 :: STRENGTH OF MA...", "CONT_25MEH-221", "Unit 1", 14, 20, 20, 0, 14],
  ["Suman Debnath", "e11804", "Engineering", "Mechanical Engineering", "CONT_26MEH-626 :: COMPUTATIONAL...", "CONT_26MEH-626", "Unit 1", 11, 8, 11, 0, 14],
  ["Vivek Sharma", "e4851", "Engineering", "Mechanical Engineering", "CONT_24MEH-322 :: HEAT TRANSFER", "CONT_24MEH-322", "Unit 1", 14, 15, 15, 0, 14],
  ["Saubhagya Ranjan ...", "e6075", "Engineering", "Chemical Engineering", "CONT_24CHT-311 :: RENEWABLE ENER...", "CONT_24CHT-311", "Unit 1", 15, 15, 15, 0, 13],
  ["Tarunpreet Singh", "e20192", "Engineering", "Aerospace Engineering", "CONT_24AST-311 :: COMBUSTION THE...", "CONT_24AST-311", "Unit 2", 12, 15, 15, 0, 12],
];

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

function getContentTotals(rows = contentDailyRows) {
  return Object.fromEntries(
    contentCategories.map((category) => [
      category.key,
      rows.reduce((sum, row) => sum + row[category.key], 0),
    ])
  );
}

function renderOverviewLegend(selector) {
  const legend = $(selector);
  if (!legend) return;

  legend.innerHTML = contentCategories
    .map((category) => `<span><i style="background:${category.color}"></i>${category.label}</span>`)
    .join("");
}

function renderMonthlyContentChart() {
  const svg = $("#monthlyContentChart");
  if (!svg) return;
  svg.innerHTML = "";

  const width = 760;
  const height = 360;
  const padding = { top: 14, right: 16, bottom: 42, left: 58 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = 1400;
  const monthRows = ["May 2026", "Jun 2026"].map((label) => {
    const monthPrefix = label.slice(0, 3);
    return {
      label,
      values: getContentTotals(contentDailyRows.filter((row) => row.label.startsWith(monthPrefix))),
    };
  });

  [0, 350, 700, 1050, 1400].forEach((tick) => {
    const y = padding.top + chartHeight - (tick / maxValue) * chartHeight;
    svg.appendChild(svgEl("line", { x1: padding.left, x2: width - padding.right, y1: y, y2: y, class: "overview-grid-line" }));
    const label = svgEl("text", { x: 22, y: y + 5, class: "overview-axis-label" });
    label.textContent = tick;
    svg.appendChild(label);
  });

  monthRows.forEach((month, monthIndex) => {
    const groupX = padding.left + (monthIndex + 0.5) * (chartWidth / monthRows.length);
    const barWidth = 20;
    const gap = 6;
    const groupWidth = contentCategories.length * barWidth + (contentCategories.length - 1) * gap;

    contentCategories.forEach((category, categoryIndex) => {
      const value = month.values[category.key];
      const barHeight = (value / maxValue) * chartHeight;
      const x = groupX - groupWidth / 2 + categoryIndex * (barWidth + gap);
      const y = padding.top + chartHeight - barHeight;
      const rect = svgEl("rect", {
        x,
        y,
        width: barWidth,
        height: Math.max(barHeight, value ? 2 : 0),
        rx: 5,
        fill: category.color,
      });
      rect.appendChild(svgEl("title"));
      rect.querySelector("title").textContent = `${month.label} ${category.label}: ${value}`;
      svg.appendChild(rect);
    });

    const text = svgEl("text", { x: groupX, y: height - 14, "text-anchor": "middle", class: "overview-axis-label" });
    text.textContent = month.label;
    svg.appendChild(text);
  });

  svg.appendChild(svgEl("line", { x1: padding.left, x2: width - padding.right, y1: padding.top + chartHeight, y2: padding.top + chartHeight, class: "overview-axis-line" }));
}

function renderTotalContentDonut() {
  const svg = $("#totalContentDonut");
  if (!svg) return;
  svg.innerHTML = "";

  const totals = getContentTotals();
  const total = Object.values(totals).reduce((sum, value) => sum + value, 0);
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  contentCategories.forEach((category) => {
    const value = totals[category.key];
    const length = (value / total) * circumference;
    const circle = svgEl("circle", {
      cx: 130,
      cy: 130,
      r: radius,
      fill: "none",
      stroke: category.color,
      "stroke-width": 38,
      "stroke-dasharray": `${Math.max(length - 5, 0)} ${circumference}`,
      "stroke-dashoffset": -offset,
      "stroke-linecap": "butt",
      transform: "rotate(-90 130 130)",
    });
    circle.appendChild(svgEl("title"));
    circle.querySelector("title").textContent = `${category.label}: ${value}`;
    svg.appendChild(circle);
    offset += length;
  });

  $("#totalContentCount").textContent = total.toLocaleString("en-US");
  renderOverviewLegend("#totalContentLegend");
}

function renderDailyContentChart() {
  const svg = $("#dailyContentChart");
  if (!svg) return;
  svg.innerHTML = "";

  const width = 1200;
  const height = 350;
  const padding = { top: 18, right: 8, bottom: 42, left: 54 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = 340;

  [0, 85, 170, 255, 340].forEach((tick) => {
    const y = padding.top + chartHeight - (tick / maxValue) * chartHeight;
    svg.appendChild(svgEl("line", { x1: padding.left, x2: width - padding.right, y1: y, y2: y, class: "overview-grid-line" }));
    const label = svgEl("text", { x: 20, y: y + 5, class: "overview-axis-label" });
    label.textContent = tick;
    svg.appendChild(label);
  });

  const groupWidth = chartWidth / contentDailyRows.length;
  const barWidth = 9;
  const gap = 4;
  const barsWidth = contentCategories.length * barWidth + (contentCategories.length - 1) * gap;

  contentDailyRows.forEach((row, rowIndex) => {
    const groupLeft = padding.left + rowIndex * groupWidth;
    const groupCenter = groupLeft + groupWidth / 2;

    contentCategories.forEach((category, categoryIndex) => {
      const value = row[category.key];
      const barHeight = (value / maxValue) * chartHeight;
      const x = groupCenter - barsWidth / 2 + categoryIndex * (barWidth + gap);
      const y = padding.top + chartHeight - barHeight;
      const rect = svgEl("rect", {
        x,
        y,
        width: barWidth,
        height: Math.max(barHeight, value ? 2 : 0),
        rx: 3,
        fill: category.color,
      });
      rect.appendChild(svgEl("title"));
      rect.querySelector("title").textContent = `${row.label} ${category.label}: ${value}`;
      svg.appendChild(rect);
    });

    if (rowIndex % 2 === 0 || row.label === "Jun 1") {
      const text = svgEl("text", { x: groupCenter, y: height - 14, "text-anchor": "middle", class: "overview-axis-label" });
      text.textContent = row.label;
      svg.appendChild(text);
    }
  });

  svg.appendChild(svgEl("line", { x1: padding.left, x2: width - padding.right, y1: padding.top + chartHeight, y2: padding.top + chartHeight, class: "overview-axis-line" }));
  renderOverviewLegend("#dailyContentLegend");
}

function renderContentOverview() {
  renderMonthlyContentChart();
  renderTotalContentDonut();
  renderDailyContentChart();
}

function renderHourlyPeakCards() {
  const grid = $("#hourlyPeakCards");
  if (!grid) return;

  const peakClassByKey = {
    pages: "pages",
    ppts: "ppts",
    forums: "forums",
    labs: "labs",
  };

  grid.innerHTML = contentCategories
    .map((category) => {
      const peak = contentHourlyRows.reduce((best, row) => (row[category.key] > best[category.key] ? row : best), contentHourlyRows[0]);
      return `
        <article class="hourly-peak-card ${peakClassByKey[category.key]}">
          <span>Peak ${category.label}</span>
          <strong>${peak.hour}</strong>
          <small>${peak[category.key]} items</small>
        </article>
      `;
    })
    .join("");
}

function renderHourlyPatternChart() {
  const svg = $("#hourlyPatternChart");
  if (!svg) return;
  svg.innerHTML = "";

  const width = 1200;
  const height = 390;
  const padding = { top: 18, right: 8, bottom: 50, left: 54 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = 240;

  [0, 60, 120, 180, 240].forEach((tick) => {
    const y = padding.top + chartHeight - (tick / maxValue) * chartHeight;
    svg.appendChild(svgEl("line", { x1: padding.left, x2: width - padding.right, y1: y, y2: y, class: "overview-grid-line" }));
    const label = svgEl("text", { x: 20, y: y + 5, class: "overview-axis-label" });
    label.textContent = tick;
    svg.appendChild(label);
  });

  const groupWidth = chartWidth / contentHourlyRows.length;
  const barWidth = 7;
  const gap = 5;
  const barsWidth = contentCategories.length * barWidth + (contentCategories.length - 1) * gap;

  contentHourlyRows.forEach((row, rowIndex) => {
    const groupLeft = padding.left + rowIndex * groupWidth;
    const groupCenter = groupLeft + groupWidth / 2;

    contentCategories.forEach((category, categoryIndex) => {
      const value = row[category.key];
      const barHeight = (value / maxValue) * chartHeight;
      const x = groupCenter - barsWidth / 2 + categoryIndex * (barWidth + gap);
      const y = padding.top + chartHeight - barHeight;
      const rect = svgEl("rect", {
        x,
        y,
        width: barWidth,
        height: Math.max(barHeight, value ? 2 : 0),
        rx: 3,
        fill: category.color,
      });
      rect.appendChild(svgEl("title"));
      rect.querySelector("title").textContent = `${row.hour} ${category.label}: ${value}`;
      svg.appendChild(rect);
    });

    if (rowIndex % 3 === 0) {
      const text = svgEl("text", { x: groupCenter, y: height - 16, "text-anchor": "middle", class: "overview-axis-label" });
      text.textContent = row.hour;
      svg.appendChild(text);
    }
  });

  svg.appendChild(svgEl("line", { x1: padding.left, x2: width - padding.right, y1: padding.top + chartHeight, y2: padding.top + chartHeight, class: "overview-axis-line" }));
  renderOverviewLegend("#hourlyContentLegend");
}

function renderHourlyPattern() {
  renderHourlyPeakCards();
  renderHourlyPatternChart();
}

function formatCompactNumber(value) {
  return value.toLocaleString("en-US");
}

function renderSubpartsLegend() {
  const legend = $("#subpartsLegend");
  if (!legend) return;

  legend.innerHTML = subpartRows
    .map(
      (row) => `
        <span>
          <i style="background:${row.color}"></i>
          ${row.label}
          <strong>${formatCompactNumber(row.value)}</strong>
        </span>
      `
    )
    .join("");
}

function renderSubpartsChart() {
  const svg = $("#subpartsChart");
  if (!svg) return;
  svg.innerHTML = "";

  const width = 1200;
  const height = 310;
  const padding = { top: 24, right: 18, bottom: 34, left: 110 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = 10000000;
  const rowPitch = chartHeight / subpartRows.length;
  const barHeight = 30;

  [0, 2500000, 5000000, 7500000, 10000000].forEach((tick) => {
    const x = padding.left + (tick / maxValue) * chartWidth;
    svg.appendChild(svgEl("line", { x1: x, x2: x, y1: padding.top, y2: padding.top + chartHeight, class: "overview-grid-line vertical" }));
    const label = svgEl("text", { x, y: height - 8, "text-anchor": "middle", class: "overview-axis-label" });
    label.textContent = tick;
    svg.appendChild(label);
  });

  subpartRows.forEach((row, index) => {
    const y = padding.top + index * rowPitch + (rowPitch - barHeight) / 2;
    const label = svgEl("text", { x: padding.left - 8, y: y + barHeight / 2 + 5, "text-anchor": "end", class: "breakdown-label" });
    label.textContent = row.label;
    svg.appendChild(label);

    const barWidth = (row.value / maxValue) * chartWidth;
    const rect = svgEl("rect", {
      x: padding.left,
      y,
      width: Math.max(barWidth, row.value ? 1 : 0),
      height: barHeight,
      rx: 4,
      fill: row.color,
    });
    rect.appendChild(svgEl("title"));
    rect.querySelector("title").textContent = `${row.label}: ${formatCompactNumber(row.value)}`;
    svg.appendChild(rect);
  });

  svg.appendChild(svgEl("line", { x1: padding.left, x2: padding.left, y1: padding.top, y2: padding.top + chartHeight, class: "overview-axis-line" }));
  svg.appendChild(svgEl("line", { x1: padding.left, x2: width - padding.right, y1: padding.top + chartHeight, y2: padding.top + chartHeight, class: "overview-axis-line" }));
  renderSubpartsLegend();
}

function renderComparisonBreakdownChart() {
  const svg = $("#comparisonBreakdownChart");
  if (!svg) return;
  svg.innerHTML = "";

  const width = 1200;
  const height = 560;
  const padding = { top: 22, right: 18, bottom: 34, left: 220 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = 380;
  const rowPitch = chartHeight / comparisonRows.length;
  const barHeight = 7;
  const seriesGap = 5;
  const groupHeight = contentCategories.length * barHeight + (contentCategories.length - 1) * seriesGap;

  [0, 95, 190, 285, 380].forEach((tick) => {
    const x = padding.left + (tick / maxValue) * chartWidth;
    svg.appendChild(svgEl("line", { x1: x, x2: x, y1: padding.top, y2: padding.top + chartHeight, class: "overview-grid-line vertical" }));
    const label = svgEl("text", { x, y: height - 8, "text-anchor": "middle", class: "overview-axis-label" });
    label.textContent = tick;
    svg.appendChild(label);
  });

  comparisonRows.forEach((row, rowIndex) => {
    const groupY = padding.top + rowIndex * rowPitch + (rowPitch - groupHeight) / 2;
    const labelLines = row.label.split("\n");
    labelLines.forEach((line, lineIndex) => {
      const text = svgEl("text", {
        x: padding.left - 8,
        y: groupY + groupHeight / 2 - (labelLines.length - 1) * 6 + lineIndex * 12 + 4,
        "text-anchor": "end",
        class: "breakdown-label",
      });
      text.textContent = line;
      svg.appendChild(text);
    });

    contentCategories.forEach((category, categoryIndex) => {
      const value = row[category.key];
      const y = groupY + categoryIndex * (barHeight + seriesGap);
      const rect = svgEl("rect", {
        x: padding.left,
        y,
        width: Math.max((value / maxValue) * chartWidth, value ? 1 : 0),
        height: barHeight,
        rx: 3,
        fill: category.color,
      });
      rect.appendChild(svgEl("title"));
      rect.querySelector("title").textContent = `${row.label.replace("\n", " ")} ${category.label}: ${value}`;
      svg.appendChild(rect);
    });
  });

  svg.appendChild(svgEl("line", { x1: padding.left, x2: padding.left, y1: padding.top, y2: padding.top + chartHeight, class: "overview-axis-line" }));
  svg.appendChild(svgEl("line", { x1: padding.left, x2: width - padding.right, y1: padding.top + chartHeight, y2: padding.top + chartHeight, class: "overview-axis-line" }));
  renderOverviewLegend("#comparisonBreakdownLegend");
}

function renderBreakdownSections() {
  renderSubpartsChart();
  renderComparisonBreakdownChart();
}

function renderFacultyPerformanceTable(rows = facultyPerformanceRows) {
  const body = $("#facultyPerformanceRows");
  if (!body) return;

  body.innerHTML = rows
    .map(([name, id, school, dept, course, code, unit, pages, ppts, forums, labs, total]) => {
      const initial = name.trim().charAt(0).toUpperCase();
      const schoolClass = school.toLowerCase().replace(/\s+/g, "-");
      return `
        <tr>
          <td>
            <div class="faculty-person">
              <span class="faculty-avatar">${initial}</span>
              <span><strong>${name} .</strong><small>${id}</small></span>
            </div>
          </td>
          <td><span class="faculty-badge school-${schoolClass}">${school}</span></td>
          <td><span class="faculty-badge dept-badge">${dept}</span></td>
          <td class="course-cell">${course}</td>
          <td class="code-cell">${code}</td>
          <td><span class="unit-badge">${unit}</span></td>
          <td>${pages}</td>
          <td>${ppts}</td>
          <td>${forums}</td>
          <td>${labs}</td>
          <td><strong class="total-cell">${total}</strong></td>
          <td><button class="row-open-button" type="button" aria-label="Open ${name} row">›</button></td>
        </tr>
      `;
    })
    .join("");
}

function initFacultyPerformanceSearch() {
  const input = $("#facultyPerformanceSearch");
  if (!input) return;

  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    const filteredRows = facultyPerformanceRows.filter((row) => row.join(" ").toLowerCase().includes(query));
    renderFacultyPerformanceTable(filteredRows);
  });
}

function getDepartmentExplorerRows() {
  return facultyPerformanceRows.slice(0, 20).map(([name, id, school, dept, course, code, unit, pages, ppts, forums, labs, total]) => ({
    department: dept,
    name,
    id,
    school,
    course: course.replace("...", ""),
    code,
    unit,
    count: total,
  }));
}

function renderDepartmentExplorerTable(rows = getDepartmentExplorerRows()) {
  const body = $("#departmentExplorerRows");
  if (!body) return;

  body.innerHTML = rows
    .map((row) => {
      const initial = row.name.trim().charAt(0).toUpperCase();
      const schoolClass = row.school.toLowerCase().replace(/\s+/g, "-");
      return `
        <tr>
          <td><span class="faculty-badge dept-badge department-name-badge">${row.department}</span></td>
          <td>
            <div class="faculty-person compact">
              <span class="faculty-avatar">${initial}</span>
              <span><strong>${row.name} .</strong></span>
            </div>
          </td>
          <td><span class="faculty-badge school-${schoolClass}">${row.school}</span></td>
          <td class="code-cell">${row.id}</td>
          <td class="course-cell">${row.course}</td>
          <td class="code-cell">${row.code}</td>
          <td><span class="unit-badge">${row.unit}</span></td>
          <td><strong class="content-count-pill">${row.count}</strong></td>
        </tr>
      `;
    })
    .join("");
}

function initDepartmentExplorerControls() {
  const input = $("#departmentExplorerSearch");
  const select = $("#departmentExplorerFilter");
  if (!input || !select) return;

  const rows = getDepartmentExplorerRows();
  [...new Set(rows.map((row) => row.department))].sort().forEach((department) => {
    const option = document.createElement("option");
    option.value = department;
    option.textContent = department;
    select.appendChild(option);
  });

  const applyExplorerFilters = () => {
    const query = input.value.trim().toLowerCase();
    const department = select.value;
    renderDepartmentExplorerTable(
      rows.filter((row) => {
        const matchesDepartment = !department || row.department === department;
        const matchesQuery = Object.values(row).join(" ").toLowerCase().includes(query);
        return matchesDepartment && matchesQuery;
      })
    );
  };

  input.addEventListener("input", applyExplorerFilters);
  select.addEventListener("change", applyExplorerFilters);
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
  nav.querySelectorAll(".nav-item").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      nav.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
      setDrawerOpen(false);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setDrawerOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1180) setDrawerOpen(false);
  });
}

async function loadNavbar() {
  const mount = $("#navbarMount");
  if (!mount) return;

  const fallbackNavbar = `
    <header class="topbar">
      <a class="brand" href="#" aria-label="Chandigarh University dashboard">
        <img class="brand-logo" src="log1.png" alt="Chandigarh University" />
      </a>

      <button class="drawer-toggle" type="button" aria-label="Open navigation menu" aria-controls="primaryNav" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="main-nav" id="primaryNav" aria-label="Primary navigation">
        <div class="drawer-user">
          <button class="profile compact-profile" aria-label="Open admin menu">
            <span class="profile-initials">RS</span>
            <span>
              <strong>RS</strong>
              <small>Site admin</small>
            </span>
            <span class="chevron">⌄</span>
          </button>
        </div>

        <a class="nav-item" href="#">Home</a>
        <a class="nav-item" href="#">Dashboard</a>
        <a class="nav-item" href="#">My courses</a>
        <a class="nav-item active" href="#">Site administration</a>
        <a class="nav-item" href="#">MOOCs Courses</a>
      </nav>

      <div class="navbar-actions" aria-label="Toolbar">
        <div class="theme-tools" aria-label="Theme controls">
          <button class="plain-icon-button" type="button" aria-label="Light mode">
            <svg viewBox="0 0 24 24"><use href="#icon-sun"></use></svg>
          </button>
          <button class="switch-control" type="button" aria-label="Toggle theme">
            <span></span>
          </button>
          <button class="plain-icon-button" type="button" aria-label="Dark mode">
            <svg viewBox="0 0 24 24"><use href="#icon-moon"></use></svg>
          </button>
        </div>

        <span class="navbar-divider"></span>

        <button class="plain-icon-button" type="button" aria-label="Courses">
          <svg viewBox="0 0 24 24"><use href="#icon-cap"></use></svg>
        </button>
        <button class="plain-icon-button notification-button" type="button" aria-label="Notifications">
          <svg viewBox="0 0 24 24"><use href="#icon-bell"></use></svg>
          <span class="badge">8</span>
        </button>
        <button class="plain-icon-button" type="button" aria-label="Messages">
          <svg viewBox="0 0 24 24"><use href="#icon-message"></use></svg>
        </button>

        <span class="navbar-divider"></span>

        <button class="profile" type="button" aria-label="Open admin menu">
          <span class="profile-initials">RS</span>
          <span class="chevron">⌄</span>
        </button>

        <span class="navbar-divider"></span>

        <label class="edit-mode-toggle">
          <span>Edit mode</span>
          <input type="checkbox" checked />
          <i aria-hidden="true"></i>
        </label>
      </div>
    </header>
    <div class="drawer-backdrop" data-close-drawer></div>
  `;

  try {
    const response = await fetch("Navbar.html");
    if (!response.ok) throw new Error(`Navbar request failed: ${response.status}`);
    mount.innerHTML = await response.text();
  } catch (error) {
    mount.innerHTML = fallbackNavbar;
    console.warn("Using inline navbar fallback. Open through a local server to load Navbar.html.", error);
  }
}

function initTheme() {
  const body = document.body;
  const sunBtn = $(".theme-tools button[aria-label='Light mode']");
  const moonBtn = $(".theme-tools button[aria-label='Dark mode']");
  const toggleBtn = $(".theme-tools .switch-control");

  const setDark = (isDark) => {
    if (isDark) {
      body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  };

  sunBtn?.addEventListener("click", () => setDark(false));
  moonBtn?.addEventListener("click", () => setDark(true));
  toggleBtn?.addEventListener("click", () => setDark(!body.classList.contains("dark-theme")));
}

// Page startup: load the shared navbar, enhance controls, apply filters, then render visuals.
async function initDashboard() {
  await loadNavbar();
  initTheme();
  initNavigationDrawer();
  enhanceFilterDropdowns();
  initFilters();
  renderLineChart();
  renderDepartmentTable();
  renderSimpleMatrix("#heatmapTable", heatmapColumns, heatmapRows);
  renderStackedBarChart();
  renderContentOverview();
  renderHourlyPattern();
  renderBreakdownSections();
  renderFacultyPerformanceTable();
  initFacultyPerformanceSearch();
  renderDepartmentExplorerTable();
  initDepartmentExplorerControls();
}

initDashboard();
