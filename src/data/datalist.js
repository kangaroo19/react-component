

const API_KEY=process.env.REACT_APP_API_KEY



export const { results } = await (
    await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
  ).json();