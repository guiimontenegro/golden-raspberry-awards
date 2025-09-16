import React from "react";

interface Interval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

interface Props {
  interval: {
    min: Interval[];
    max: Interval[];
  };
}

const ProducersInterval: React.FC<Props> = ({ interval }) => (
  <div>
    <h2>Producers with longest and shortest interval between wins</h2>

    <div style={{ marginBottom: "1rem" }}>
      <h3>Maximum</h3>
      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Producer</th>
            <th>Interval</th>
            <th>Previous Year</th>
            <th>Following Year</th>
          </tr>
        </thead>
        <tbody>
          {interval.max?.map((p) => (
            <tr key={p.producer + p.previousWin}>
              <td>{p.producer}</td>
              <td>{p.interval}</td>
              <td>{p.previousWin}</td>
              <td>{p.followingWin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div>
      <h3>Minimum</h3>
      <table border={1} cellPadding={6}>
        <thead>
          <tr>
            <th>Producer</th>
            <th>Interval</th>
            <th>Previous Year</th>
            <th>Following Year</th>
          </tr>
        </thead>
        <tbody>
          {interval.min?.map((p) => (
            <tr key={p.producer + p.previousWin}>
              <td>{p.producer}</td>
              <td>{p.interval}</td>
              <td>{p.previousWin}</td>
              <td>{p.followingWin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ProducersInterval;
