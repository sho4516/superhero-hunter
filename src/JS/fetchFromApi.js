export async function fetchCharacters(publicKey, hash, ts) {
  const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data.data.results);
    return data.data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
}

export async function fetchCharacterDetails(publicKey, hash, ts, id) {
  const apiUrl = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data.data.results);
    return data.data.results;
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
}
