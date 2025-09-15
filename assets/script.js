(function () {
  // Ordered list of pages (extensionless slugs)
  // We treat "index" as demographics (step 1).
  const order = ["index", "2-task", "3-prototype", "4-nasatlx", "5-sus", "6-ueq"];

  // Helper: get current slug without extension and without trailing slash
  function currentSlug() {
    let seg = window.location.pathname;
    // Examples:
    // "/" -> "index"
    // "/index.html" -> "index"
    // "/4-nasatlx.html" -> "4-nasatlx"
    // "/4-nasatlx/" -> "4-nasatlx"
    // "/subdir/4-nasatlx" -> "4-nasatlx"

    // Take last path segment
    const parts = seg.split("/").filter(Boolean);
    let last = parts.length ? parts[parts.length - 1] : "";
    if (!last) return "index";

    // Strip ".html" if present
    if (last.endsWith(".html")) last = last.slice(0, -5);

    // Map legacy name (if used) to our start page
    if (last === "1-demographics") return "index";

    return last;
  }

  // Build a map of slug -> href to navigate robustly in any directory
  function hrefFor(slug) {
    // Prefer extension links you actually uploaded
    // (You currently have index.html, 2-task.html, 3-prototype.html, 4-nasatlx.html, 5-sus.html, 6-ueq.html)
    if (slug === "index") return "index.html";
    return slug + ".html";
  }

  const slug = currentSlug();
  const idx = Math.max(0, order.indexOf(slug)); // if not found, fall back to step 1

  // Progress bar
  const pct = Math.round(((idx + 1) / order.length) * 100);
  document.documentElement.style.setProperty("--w", pct + "%");

  // Prev/Next buttons (if present on page)
  const prev = document.getElementById("prevBtn");
  const next = document.getElementById("nextBtn");
  const nextLabel = document.getElementById("nextLabel");

  if (prev) {
    prev.disabled = idx === 0;
    prev.onclick = function () {
      if (idx > 0) window.location.href = hrefFor(order[idx - 1]);
    };
  }
  if (next) {
    next.disabled = idx === order.length - 1;
    next.onclick = function () {
      if (idx < order.length - 1) window.location.href = hrefFor(order[idx + 1]);
    };
  }

  // Optional gating: enable Next only after user ticks the confirm checkbox on form pages
  const confirmBox = document.getElementById("confirmProceed");
  if (confirmBox && next) {
    const update = () => {
      next.disabled = !confirmBox.checked;
      if (nextLabel) {
        nextLabel.textContent = confirmBox.checked
          ? "Next"
          : "Submit the form above, then tick the box to enable Next";
      }
    };
    confirmBox.addEventListener("change", update);
    update();
  }
})();
