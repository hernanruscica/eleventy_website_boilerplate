document.addEventListener("DOMContentLoaded", function () {
  var POSTS_PER_PAGE = 2;
  var currentPage = 1;
  var currentFilter = "all";
  var searchQuery = "";

  var postsContainer = document.getElementById("blog-posts");
  var paginationContainer = document.getElementById("blog-pagination");
  var searchInput = document.getElementById("blog-search-input");
  var filterButtons = document.querySelectorAll("[data-filter]");
  var allPosts = Array.from(postsContainer.querySelectorAll(".blog-card"));

  if (!postsContainer || !allPosts.length) return;

  function getPostText(post) {
    var title = post.querySelector(".blog-card__title");
    var excerpt = post.querySelector(".blog-card__excerpt");
    var text = (title ? title.textContent : "") + " " + (excerpt ? excerpt.textContent : "");
    return text.toLowerCase();
  }

  function getFilteredPosts() {
    return allPosts.filter(function (post) {
      var matchCategory = currentFilter === "all" ||
        (post.getAttribute("data-category") || "").split(",").indexOf(currentFilter) !== -1;

      var matchSearch = searchQuery === "" ||
        getPostText(post).indexOf(searchQuery.toLowerCase()) !== -1;

      return matchCategory && matchSearch;
    });
  }

  function renderPosts() {
    var filtered = getFilteredPosts();
    var totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);

    if (currentPage > totalPages) currentPage = totalPages || 1;

    var start = (currentPage - 1) * POSTS_PER_PAGE;
    var end = start + POSTS_PER_PAGE;

    allPosts.forEach(function (post) {
      post.style.display = "none";
    });

    filtered.forEach(function (post, i) {
      post.style.display = i >= start && i < end ? "" : "none";
    });

    renderPagination(totalPages, filtered.length);
  }

  function renderPagination(totalPages, totalResults) {
    paginationContainer.innerHTML = "";

    if (totalPages <= 1) return;

    var prevBtn = document.createElement("button");
    prevBtn.className = "blog-pagination__btn";
    prevBtn.textContent = "\u2190";
    prevBtn.setAttribute("aria-label", "Página anterior");
    if (currentPage === 1) prevBtn.disabled = true;
    prevBtn.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        renderPosts();
        scrollToTop();
      }
    });
    paginationContainer.appendChild(prevBtn);

    for (var i = 1; i <= totalPages; i++) {
      var pageBtn = document.createElement("button");
      pageBtn.className = "blog-pagination__btn" + (i === currentPage ? " active" : "");
      pageBtn.textContent = i;
      pageBtn.setAttribute("aria-label", "Página " + i);
      pageBtn.setAttribute("aria-current", i === currentPage ? "page" : "");
      (function (page) {
        pageBtn.addEventListener("click", function () {
          currentPage = page;
          renderPosts();
          scrollToTop();
        });
      })(i);
      paginationContainer.appendChild(pageBtn);
    }

    var nextBtn = document.createElement("button");
    nextBtn.className = "blog-pagination__btn";
    nextBtn.textContent = "\u2192";
    nextBtn.setAttribute("aria-label", "Página siguiente");
    if (currentPage === totalPages) nextBtn.disabled = true;
    nextBtn.addEventListener("click", function () {
      if (currentPage < totalPages) {
        currentPage++;
        renderPosts();
        scrollToTop();
      }
    });
    paginationContainer.appendChild(nextBtn);
  }

  function scrollToTop() {
    postsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetAndRender() {
    currentPage = 1;
    renderPosts();
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentFilter = btn.getAttribute("data-filter");
      filterButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      resetAndRender();
    });
  });

  if (searchInput) {
    var debounceTimer;
    searchInput.addEventListener("input", function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        searchQuery = searchInput.value.trim();
        resetAndRender();
      }, 250);
    });
  }

  renderPosts();
});
