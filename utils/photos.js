import data from "../db/data.json";

export function getPostData() {
  const allPostData = [];

  data.map((image) => {
    const id = image.name.split(" ").join("");

    allPostData.push({
      id,
      ...image,
    });
  });

  return allPostData;
}

export function getAllPostIds() {
  return data.map((data) => {
    const id = data.name.split(" ").join("");
    return {
      params: {
        id: id,
      },
    };
  });
}

export function getOnePostData(id) {
  const filtered = data.filter((data) => data.name.split(" ").join("") === id);

  return { id, ...filtered };
}
