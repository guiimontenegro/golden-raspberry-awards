import React from "react";

interface Studio {
  name: string;
  winCount: number;
}

interface Props {
  studios: Studio[];
}

const TopStudios: React.FC<Props> = ({ studios }) => {
  const topStudios = [...studios]
    .sort((a, b) => b.winCount - a.winCount)
    .slice(0, 3);

  return (
    <div>
      <h2>Top 3 studios with winners</h2>
      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Win Count</th>
          </tr>
        </thead>
        <tbody>
          {topStudios.map((s) => (
            <tr key={s.name}>
              <td>{s.name}</td>
              <td>{s.winCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopStudios;
