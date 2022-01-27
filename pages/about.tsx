import { useEffect, useState } from "react";

type MovieType = { id: number; title: string };

const ComponentName = () => {
  const BASIC_URL = "https://api.themoviedb.org/3/movie/popular";
  const API_KEY = "78c4651e6f70ef92cb879b749825122d";
  const [Movie, setMovie] = useState<MovieType[]>();
  useEffect(() => {
    (async () => {
      const res = await fetch(`${BASIC_URL}?api_key=${API_KEY}`);
      const data: { results: MovieType[] } = await res.json();
      setMovie(data.results);
    })();
  }, []);
  return (
    <ul>
      {!Movie && <li>Loading...</li>}
      {Movie?.map((m) => (
        <li key={m.id}>{m.title}</li>
      ))}
    </ul>
  );
};

export default ComponentName;
