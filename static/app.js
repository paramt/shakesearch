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
};

const form = document.getElementById("form");
form.addEventListener("submit", Controller.search);
window.addEventListener("resize", Controller.handleResize);
Controller.handleResize();
