const Controller = {
  search: (ev) => {
    ev.preventDefault();
    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const response = fetch(`/search?q=${data.query}`).then((response) => {
      response.json().then((results) => {
        Controller.updateTable(results);
        document.getElementById("search").style.height = "100px";
        document.getElementById("title").style.display = "none";
        document.getElementById("output").style.display = "block";
      });
    });
  },

  updateTable: (results) => {
    let output = "";

    for (let result of results) {
      output += `<p>${result}<p/>`;
    }

    document.getElementById("output").innerHTML = output;
  },
};

const form = document.getElementById("form");
form.addEventListener("submit", Controller.search);
