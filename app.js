async function getRes(title) {
  try {
    let res = await axios.get(
      `http://www.omdbapi.com/?apikey=a00e3963&t=${title}`
    );
    console.log(res.data);
  } catch (error) {
    console.error(error);
  }
}
