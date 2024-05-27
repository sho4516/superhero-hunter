import generateHash from "./generateHash";
import { displayCharacters } from "./utility";
import { fetchCharacters } from "./fetchFromApi";
import { displayShimmer } from "./utility";
import { displayFavorites } from "./utility";

const favoritesEl = document.getElementById("favorites");
const homeEl = document.getElementById("home");
const searchButtonEl = document.querySelector(".search-button");
const filterInputEl = document.querySelector(".filter-input");

let allSuperheroes = [];
let isHomePage = true;
let filteredSuperheroList = [];

async function main() {
  const publicKey = "f53161abbeed84688bb04d08b45197f8";
  const privateKey = "ec876d226fc07a895132f724a8d8cf97401d28ca";
  displayShimmer();

  const hash = generateHash(publicKey, privateKey);
  if (allSuperheroes.length == 0) {
    allSuperheroes = await fetchCharacters(
      publicKey,
      hash.hash,
      hash.timestamp
    );
  }
  displayCharacters(allSuperheroes, isHomePage);
}

favoritesEl.addEventListener("click", () => {
  isHomePage = false;
  displayFavorites(isHomePage);
});

homeEl.addEventListener("click", () => {
  isHomePage = true;
  main();
});

searchButtonEl.addEventListener("click", () => {
  const searchtext = filterInputEl.value;
  filteredSuperheroList = allSuperheroes.filter((item) => {
    return item.name.toUpperCase().includes(searchtext.toUpperCase());
  });
  displayCharacters(filteredSuperheroList);
  filterInputEl.value = "";
});

main();
