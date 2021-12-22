const Controller = {
  search: (ev) => {
    ev.preventDefault();
    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const response = fetch(`/search?q=${data.query}`).then((response) => {
      response.json().then((results) => {
        Controller.updateResults(results, data.query);
        document.getElementById("search").style.height = "100px";
        document.getElementById("title").style.display = "none";
        document.getElementById("output").style.display = "block";
      });
    });
  },

  updateResults: (results, searchWord) => {
    let output = "";

    for (let result of results) {
      result = result.replace(searchWord, `<span class="highlighted">${searchWord}</span>`);
      output += `<p>${result}<p/>`;
    }

    document.getElementById("output").innerHTML = output;
  },
};

const form = document.getElementById("form");
form.addEventListener("submit", Controller.search);
