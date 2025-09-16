import React, { useEffect, useState } from "react";
import { fetchMovies } from "../../api/moviesApi";
import type { Movie } from "../../types";

const MAX_VISIBLE_PAGES = 5;

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [year, setYear] = useState<number | "">("");
  const [winner, setWinner] = useState<boolean | "">("");

  useEffect(() => {
    fetchMovies(
      page,
      size,
      year ? Number(year) : undefined,
      winner === "" ? undefined : (winner as boolean)
    )
      .then((data) => {
        setMovies(data.content);
        setTotalPages(data.totalPages);
      })
      .catch(console.error);
  }, [page, size, year, winner]);

  const getVisiblePages = () => {
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    let start = Math.max(0, page - Math.floor(MAX_VISIBLE_PAGES / 2));
    let end = start + MAX_VISIBLE_PAGES;

    if (end > totalPages) {
      end = totalPages;
      start = end - MAX_VISIBLE_PAGES;
    }

    return Array.from({ length: end - start }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="main">
      <div className="content-wrapper">
        <h1>List Movies</h1>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Year</th>
              <th>Title</th>
              <th>Winner?</th>
            </tr>
            <tr>
              <th></th>
              <th>
                <input
                  type="number"
                  placeholder="Filter by year"
                  value={year}
                  onChange={(e) =>
                    setYear(e.target.value ? Number(e.target.value) : "")
                  }
                  style={{ width: "100%" }}
                />
              </th>
              <th></th>
              <th>
                <select
                  value={winner === "" ? "" : winner ? "true" : "false"}
                  onChange={(e) =>
                    setWinner(
                      e.target.value === "" ? "" : e.target.value === "true"
                    )
                  }
                  style={{ width: "100%" }}
                >
                  <option value="">Yes/No</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.year}</td>
                <td>{m.title}</td>
                <td>{m.winner ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button disabled={page === 0} onClick={() => setPage(0)}>
            {"|<"}
          </button>
          <button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
            {"<"}
          </button>

          {visiblePages.map((p) => (
            <button
              key={p}
              className={p === page ? "active-page" : ""}
              onClick={() => setPage(p)}
            >
              {p + 1}
            </button>
          ))}

          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            {">"}
          </button>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(totalPages - 1)}
          >
            {">|"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
