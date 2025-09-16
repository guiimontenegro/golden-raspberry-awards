import React, { useState } from "react";
import type { Movie } from "../../../types";

interface Props {
  winners: Movie[];
  onSearch: (year: number) => void;
}

const WinnersByYear: React.FC<Props> = ({ winners, onSearch }) => {
  const [inputYear, setInputYear] = useState("");

  const handleSearch = () => {
    if (inputYear) onSearch(Number(inputYear));
  };

  return (
    <div>
      <h2>List movie winners by year</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          placeholder="Search by year"
          value={inputYear}
          onChange={(e) => setInputYear(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {winners.length > 0 && (
        <table border={1} cellPadding={6}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Year</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.year}</td>
                <td>{m.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WinnersByYear;
