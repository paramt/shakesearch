const Controller = {
  search: (ev) => {
    ev.preventDefault();
    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const response = fetch(`/search?q=${data.query}`).then((response) => {
      response.json().then((results) => {
        Controller.updateResults(results, data.query);
        document.getElementById("search").classList.add("collapsed");
        document.getElementById("title").style.display = "none";
        document.getElementById("output").style.display = "block";
      });
    });
  },

  updateResults: (results, searchWord) => {
    let output = "";

    for (let result of results) {
      result = result.replaceAll(searchWord, `<span class="highlighted">${searchWord}</span>`);
      output += `<pre>${result}</pre>`;
    }

    if (!output) {
      output = "<pre>No results found</pre>";
    }

    document.getElementById("output").innerHTML = output;
  },

  handleResize: () => {
    let query = document.getElementById("query");

    if (window.innerWidth < 500) {
      query.placeholder = "Search the works of Shakespeare";
    } else if (window.innerWidth < 700) {
      query.placeholder = "Search the complete works of Shakespeare";
    } else {
      query.placeholder = "Search the complete works of William Shakespeare";
    }
  },

  backToTop: () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },

  toggleBackToTop: () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      document.getElementById("top").style.opacity = "1";
    } else {
      document.getElementById("top").style.opacity = "0";
    }
  },
};

document.getElementById("form").addEventListener("submit", Controller.search);
document.getElementById("top").addEventListener("click", Controller.backToTop);
window.addEventListener("resize", Controller.handleResize);
window.addEventListener("scroll", Controller.toggleBackToTop);
Controller.handleResize();
