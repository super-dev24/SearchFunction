import { data } from "../data";

const newData = { ...data };

export const search = (input) => {
  const { people, artists } = newData;
  if (input.length === 0) {
    return;
  }
  const scored = people.map((person) => {
    let score = 0,
      matches = [];
    const { name, gerne, movies, location } = person;
    const music = gerne.map((item) => artists[item]).flat();
    if (name.toLocaleLowerCase().includes(input)) {
      score += 4;
      matches.push("name");
    }
    if (gerne.join("").toLocaleLowerCase().includes(input)) {
      score++;
      matches.push("movies");
    }
    if (movies.join("").toLocaleLowerCase().includes(input)) {
      score++;
      matches.push("movies");
    }
    if (location.toLocaleLowerCase().includes(input)) {
      score++;
      matches.push("location");
    }
    if (music.join("").toLocaleLowerCase().includes(input)) {
      score += 2;
      matches.push("artists");
    }
    return {
      name,
      score,
      matches,
    };
  });
  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item, index) => {
      return {
        id: index + 1,
        ...item,
      };
    });
};

export const addMusicArtist = (category, value) => {
  console.log("ca", category, value);
  const { artists } = newData;
  Object.keys(artists).forEach((key) => {
    if (key === category) {
      artists[key] = [...artists[key], value];
    }
  });
};
