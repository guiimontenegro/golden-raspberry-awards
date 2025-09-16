import React, { useEffect, useState } from "react";
import {
  fetchYearsWithMultipleWinners,
  fetchStudiosWithWinCount,
  fetchMaxMinWinIntervalForProducers,
  fetchWinnersByYear,
} from "../../api/moviesApi";
import MultipleWinners from "./panels/MultipleWinners";
import TopStudios from "./panels/TopStudios";
import ProducersInterval from "./panels/ProducersInterval";
import WinnersByYear from "./panels/WinnersByYear";

interface YearWinner {
  year: number;
  winnerCount: number;
}

interface StudioWin {
  name: string;
  winCount: number;
}

interface ProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

interface IntervalData {
  min: ProducerInterval[];
  max: ProducerInterval[];
}

interface WinnerMovie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

const Dashboard: React.FC = () => {
  const [years, setYears] = useState<YearWinner[]>([]);
  const [studios, setStudios] = useState<StudioWin[]>([]);
  const [interval, setInterval] = useState<IntervalData>({ min: [], max: [] });
  const [winners, setWinners] = useState<WinnerMovie[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    fetchYearsWithMultipleWinners().then((data) => setYears(data.years));
    fetchStudiosWithWinCount().then((data) => setStudios(data.studios));
    fetchMaxMinWinIntervalForProducers().then((data) => setInterval(data));
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchWinnersByYear(selectedYear).then((data) =>
        setWinners(Array.isArray(data) ? data : [data])
      );
    }
  }, [selectedYear]);

  return (
    <>
      <h1>Golden Raspberry Dashboard</h1>
      <div className="grid">
        <div className="panel">
          <MultipleWinners years={years} />
        </div>
        <div className="panel">
          <TopStudios studios={studios} />
        </div>
        <div className="panel">
          <ProducersInterval interval={interval} />
        </div>
        <div className="panel">
          <WinnersByYear winners={winners} onSearch={setSelectedYear} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
