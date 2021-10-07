import { createContext, useState, useContext, useEffect } from 'react';

const VotingContext = createContext();

const INITIALVOTES = {
  javaScript: 0,
  python: 0,
  java: 0,
  c: 0,
};

export const VotingProvider = ({ children }) => {
  const [vote, setVote] = useState(JSON.parse(localStorage.getItem("initialVotes")) || INITIALVOTES);
  const [totalVote, setTotalVote] = useState(0);

  const [chartData, setChartData] = useState({
    labels: ['JavaScript', 'Python', 'Java', 'C'],
    datasets: [
      {
        label: '% of Votes',
        data: [
          (totalVote > 0 ? vote.javaScript / totalVote * 100 : 0),
          (totalVote > 0 ? vote.python / totalVote * 100 : 0),
          (totalVote > 0 ? vote.java / totalVote * 100 : 0),
          (totalVote > 0 ? vote.c / totalVote * 100 : 0),
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(142, 42, 236, 0.2)',
          'rgba(100, 250, 1, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(142, 42, 236, 1)',
          'rgba(100, 250, 1, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    localStorage.setItem("initialVotes", JSON.stringify(vote));
    setTotalVote(vote.javaScript + vote.python + vote.java + vote.c);
    //calculate the total vote
    let _totalVote = vote.javaScript + vote.python + vote.java + vote.c;
    setChartData((prev) => (
      {
        ...prev,
        datasets: [
          ...prev.datasets,
          {
            ...prev.datasets[0],
            // set values according to state is initial or not
            data: [
              (_totalVote > 0 ? vote.javaScript / _totalVote * 100 : 0),
              (_totalVote > 0 ? vote.python / _totalVote * 100 : 0),
              (_totalVote > 0 ? vote.java / _totalVote * 100 : 0),
              (_totalVote > 0 ? vote.c / _totalVote * 100 : 0),
            ],
          },
        ],
      }));
  }, [vote]);

  const values = {
    vote, setVote, chartData
  };

  return <VotingContext.Provider value={values}>{children}</VotingContext.Provider>;
};

export const useVote = () => useContext(VotingContext);