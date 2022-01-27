import { useRouter } from "next/router";
import Link from "next/link";

type MovieType = { id: number; title: string };

export const API_KEY = "78c4651e6f70ef92cb879b749825122d";
export const BASIC_URL = "https://api.themoviedb.org/3/movie/popular";
const Home: React.FC<{ results: MovieType[] }> = ({ results }) => {
  const router = useRouter();

  return (
    <ul>
      {!results && <li>Loading...</li>}
      {results?.map((m) => (
        <li key={m.id}>
          {m.title}
          <Link href={`/movies/${m.title}/${m.id}`}>
            <a>Link</a>
          </Link>
          <button onClick={() => router.push(`/movies/${m.title}/${m.id}`)}>
            Detail
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Home;

export async function getServerSideProps() {
  const API_KEY = process.env.NEXT_PUBLIC_KEY;
  const BASIC_URL = "https://api.themoviedb.org/3/movie/popular";

  const res = await fetch("http://localhost:3000/api/movies");
  const { results }: { results: MovieType[] } = await res.json();
  return {
    props: {
      results,
    },
  };
}
