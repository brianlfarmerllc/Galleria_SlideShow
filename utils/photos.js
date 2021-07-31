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
    return {
      params: {
        id: data.name.replaceAll(" ", ""),
      },
    };
  });
}
