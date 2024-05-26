const favorites = [];

export const displayCharacters = (characters, isHomePage) => {
  const resContainerEl = document.querySelector(".res-container");
  resContainerEl.innerHTML = "";

  characters.forEach((hero) => {
    const resCardEl = document.createElement("div");
    resCardEl.classList.add("res-card");
    resCardEl.innerHTML = `
      <div class="img-container">
        <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" />
        <i class="favorite-icon fa-heart"></i>
      </div>
      <div class="res-info-container">
        <h3>${hero.name}</h3>
      </div>
      `;
    resContainerEl.appendChild(resCardEl);
    const favoriteIconBtn = resCardEl.querySelector(".favorite-icon");
    if (isFavorite(hero)) {
      favoriteIconBtn.classList.add("fa-solid");
    } else {
      favoriteIconBtn.classList.add("fa-regular");
    }
    favoriteIconBtn.addEventListener("click", () => {
      toggleFavorite(hero, favoriteIconBtn, isHomePage);
    });
    resCardEl.addEventListener("click", () => {
      window.location.href = `./superhero.html?id=${hero.id}`;
    });
  });
};

const isFavorite = (hero) => {
  return favorites.some((favorite) => favorite.id === hero.id);
};

// Function to toggle hero in favorites
const toggleFavorite = (hero, favoriteIconBtn, isHomePage) => {
  if (isFavorite(hero)) {
    removeFavorite(hero, isHomePage);
    favoriteIconBtn.classList.remove("fa-solid");
    favoriteIconBtn.classList.add("fa-regular");
  } else {
    addFavorite(hero);
    favoriteIconBtn.classList.remove("fa-regular");
    favoriteIconBtn.classList.add("fa-solid");
  }
};

// Function to add a character to favorites
const addFavorite = (hero) => {
  favorites.push(hero);
};

// Function to remove a character from favorites
export const removeFavorite = (hero, isHomePage) => {
  const index = favorites.findIndex((favorite) => favorite.id === hero.id);
  if (index !== -1) {
    favorites.splice(index, 1);

    if (!isHomePage) {
      displayFavorites(false);
    }
  }
};

export const displayShimmer = () => {
  const resContainerEl = document.querySelector(".res-container");
  resContainerEl.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    const resCardEl = document.createElement("div");
    resCardEl.classList.add("shimmer-card");
    resCardEl.innerHTML = `
      <div class="shimmer-image-holder"></div>
      <div class="shimmer-bar-1"></div>
    `;
    resContainerEl.appendChild(resCardEl);
  }
};

export const displayFavorites = (isHomePage) => {
  const resContainerEl = document.querySelector(".res-container");
  resContainerEl.innerHTML = "";

  if (favorites.length === 0) {
    resContainerEl.innerHTML = "<p>No favorites added yet.</p>";
    return;
  }

  displayCharacters(favorites, isHomePage);
};

export const displayCharacterDetails = (character) => {
  const heroSectionEl = document.querySelector(".hero-section");
  const detailsSectionEl = document.querySelector(".details-section");
  console.log("vfdvfdvfdv");
  console.log(character);
  heroSectionEl.innerHTML = `
            <div class="hero-image">
                <img src="${character[0].thumbnail.path}.${character[0].thumbnail.extension}" alt="Superhero Name" />
            </div>
            <div class="hero-info">
                <h1>${character[0].name}</h1>
                <p class="bio">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
                    bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent bibendum. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit. Praesent bibendum. Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Praesent bibendum. Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit. Praesent bibendum. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Praesent
                    bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Praesent bibendum.
                </p>
            </div>`;

  detailsSectionEl.innerHTML = `
            <div class="tabs">
                <button class="tab-button" data-tab="comics">Comics</button>
                <button class="tab-button" data-tab="events">Events</button>
                <button class="tab-button" data-tab="series">Series</button>
                <button class="tab-button" data-tab="stories">Stories</button>
            </div>`;

  if (character[0].comics.items.length > 0) {
    const comicsContent = character[0].comics.items
      .map((comic) => `<li>${comic.name}</li>`)
      .join("");
    detailsSectionEl.innerHTML += `
                    <div class="tab-content" id="comics">
                        <h2>Comics</h2>
                        <ul class="items-list">
                        ${comicsContent}
                        </ul>
                    </div>
                `;
  } else {
    detailsSectionEl.innerHTML += `
    <div class="tab-content" id="comics">
        <h2>Comics</h2>
        <ul class="items-list">
            No Content available !!
        </ul>
    </div>
`;
  }

  if (character[0].events.items.length > 0) {
    const eventsContent = character[0].events.items
      .map((event) => `<li>${event.name}</li>`)
      .join("");
    detailsSectionEl.innerHTML += `
                    <div class="tab-content" id="events">
                        <h2>Events</h2>
                        <ul class="items-list">
                        ${eventsContent}
                        </ul>
                    </div>
                `;
  } else {
    detailsSectionEl.innerHTML += `
    <div class="tab-content" id="events">
        <h2>Events</h2>
        <ul class="items-list">
        No Content available !!
        </ul>
    </div>
`;
  }

  if (character[0].series.items.length > 0) {
    const seriesContent = character[0].series.items
      .map((series) => `<li>${series.name}</li>`)
      .join("");
    detailsSectionEl.innerHTML += `
                    <div class="tab-content" id="series">
                        <h2>Series</h2>
                        <ul class="items-list">
                        ${seriesContent}
                        </ul>
                    </div>
                `;
  } else {
    detailsSectionEl.innerHTML += `
    <div class="tab-content" id="series">
        <h2>Series</h2>
        <ul class="items-list">
        No Content available !!
        </ul>
    </div>
`;
  }

  if (character[0].stories.items.length > 0) {
    const storiesContent = character[0].stories.items
      .map((story) => `<li>${story.name} - ${story.type}</li>`)
      .join("");
    detailsSectionEl.innerHTML += `
                    <div class="tab-content" id="stories">
                        <h2>Stories</h2>
                        <ul class="items-list">
                        ${storiesContent}
                        </ul>
                    </div>
                `;
  } else {
    detailsSectionEl.innerHTML += `
    <div class="tab-content" id="stories">
        <h2>Stories</h2>
        <ul class="items-list">
        No Content available !!
        </ul>
    </div>
`;
  }
};
