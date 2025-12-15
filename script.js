document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Back to top button
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        backToTopBtn.style.display = "block";
      } else {
        backToTopBtn.style.display = "none";
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // JS cheat sheet: collapsible sections
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      if (!content) return;
      content.classList.toggle("open");
    });
  });

  // Table sorting: click the header to sort that column
  makeTablesSortable();

  // Auto sort the hobby table by Brand when the page loads
  const hobbyTable = document.querySelector(".hobby-table-wrap .skills-table");
  if (hobbyTable) {
    const brandHeader = hobbyTable.querySelector("thead th:nth-child(2)");
    if (brandHeader) brandHeader.click();
  }
});

function makeTablesSortable() {
  const tables = document.querySelectorAll(".skills-table");

  tables.forEach((table) => {
    const thead = table.querySelector("thead");
    const tbody = table.querySelector("tbody");
    if (!thead || !tbody) return;

    const headers = Array.from(thead.querySelectorAll("th"));

    let lastSortedIndex = -1;
    let asc = true;

    function getCellValue(row, index) {
      const cell = row.children[index];
      return cell ? cell.textContent.trim() : "";
    }

    function isNumber(value) {
      return value !== "" && !isNaN(Number(value));
    }

    function sortByColumn(index) {
      const rows = Array.from(tbody.querySelectorAll("tr"));

      // if you click same column again, it reverses sort
      if (lastSortedIndex === index) asc = !asc;
      else {
        asc = true;
        lastSortedIndex = index;
      }

      rows.sort((a, b) => {
        const av = getCellValue(a, index);
        const bv = getCellValue(b, index);

        // if it looks like numbers, sort as numbers (ex: Year)
        const bothNums = isNumber(av) && isNumber(bv);
        if (bothNums) {
          return asc ? Number(av) - Number(bv) : Number(bv) - Number(av);
        }

        // else sort as text
        return asc
          ? av.localeCompare(bv, undefined, { sensitivity: "base" })
          : bv.localeCompare(av, undefined, { sensitivity: "base" });
      });

      // put rows back in the table in sorted order
      rows.forEach((row) => tbody.appendChild(row));
    }

    headers.forEach((th, index) => {
      th.addEventListener("click", () => sortByColumn(index));
    });
  });
}
// Home page terminal typing
document.addEventListener("DOMContentLoaded", () => {
  const cmdEl = document.getElementById("typeCmd");
  const outEl = document.getElementById("typeOut");

  if (!cmdEl || !outEl) return;

  const text = cmdEl.getAttribute("data-text") || "";
  cmdEl.textContent = "";

  let i = 0;

  function typeNext() {
    if (i < text.length) {
      cmdEl.textContent += text[i];
      i++;

      const c = text[i - 1];
      const delay = c === " " ? 40 : 55; // tiny pause on spaces

      setTimeout(typeNext, delay);
      return;
    }

    setTimeout(() => {
      outEl.hidden = false;
    }, 250);
  }

  setTimeout(typeNext, 250);
});

