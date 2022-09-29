var container = document.getElementById("container");
var data = [];

var page = 1;

document.getElementById("next").addEventListener("click", () => {
  page = page + 1;
  container.innerHTML = "";
  getData(page);
});
document.getElementById("prev").addEventListener("click", () => {
  page = page - 1;
  container.innerHTML = "";
  getData(page);
});

function getData(page) {
  console.log(page);

  let load = document.createElement("h1");
  load.innerText = "Loading...";
  container.append(load);

  fetch(
    `https://api.github.com/search/repositories?q=stars:%3E1+language:javascript&page=${page}`
  )
    .then((res) => res.json())
    .then((res) => {
      container.innerHTML = "";

      res.items.map((e) => {
        console.log(e);

        var card = document.createElement("div");
        card.setAttribute("id", "card");

        card.addEventListener("click", () => {
          window.location.href = `${e.owner.html_url}`;
        });

        var name = document.createElement("p");
        name.setAttribute("id", "name");
        name.innerText = e.name;

        var img = document.createElement("img");
        img.setAttribute("id", "img");
        img.src = e.owner.avatar_url;

        var lang = document.createElement("p");
        lang.setAttribute("id", "lang");
        lang.innerText = e.language;

        var stars = document.createElement("p");
        stars.setAttribute("id", "stars");
        stars.innerText = `Stars Count - ${e.stargazers_count}`;

        var forks = document.createElement("p");
        forks.setAttribute("id", "forks");
        forks.innerText = `Forks Count - ${e.forks_count}`;

        card.append(img, name, lang, stars, forks);
        container.append(card);
      });
    });
}

getData(page);
