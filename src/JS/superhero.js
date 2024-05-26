import generateHash from "./generateHash";
import { fetchCharacterDetails } from "./fetchFromApi";
import { displayCharacterDetails } from "./utility";

async function main() {
  const publicKey = "f53161abbeed84688bb04d08b45197f8";
  const privateKey = "ec876d226fc07a895132f724a8d8cf97401d28ca";

  const hash = generateHash(publicKey, privateKey);
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");

  const details = await fetchCharacterDetails(
    publicKey,
    hash.hash,
    hash.timestamp,
    id
  );

  console.log(details);
  displayCharacterDetails(details);

  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      tabContents.forEach((content) => content.classList.remove("active"));
      const tabId = button.getAttribute("data-tab");
      const tabContent = document.getElementById(tabId);
      tabContent.classList.add("active");
    });
  });
}

main();
