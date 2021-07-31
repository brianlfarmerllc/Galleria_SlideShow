import data from "../db/data.json";

export function getPostData() {
  const allPostData = [];

  data.map((image, index) => {
    const id = index;

    allPostData.push({
      id,
      ...image,
    });
  });

  return allPostData;
}

export function getAllPostIds() {
  return data.map((data, index) => {
    const id = index;
    return {
      params: {
        id: id.toString(),
      },
    };
  });
}

export function getOnePostData(id) {
  const filtered = data[id];

  return { id, ...filtered };
}
