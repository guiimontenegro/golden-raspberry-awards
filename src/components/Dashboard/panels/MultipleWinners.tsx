import React from "react";

interface Props {
  years: { year: number; winnerCount: number }[];
}

const MultipleWinners: React.FC<Props> = ({ years }) => (
  <div>
    <h2>List years with multiple winners</h2>
    <table border={1} cellPadding={6}>
      <thead>
        <tr>
          <th>Year</th>
          <th>Win Count</th>
        </tr>
      </thead>
      <tbody>
        {years.map((y) => (
          <tr key={y.year}>
            <td>{y.year}</td>
            <td>{y.winnerCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default MultipleWinners;
