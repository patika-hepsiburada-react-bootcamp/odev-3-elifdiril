import { Bar } from 'react-chartjs-2';
import { useVote } from '../contexts/VotingContext';
import '../App.css';

function Chart() {
  const { chartData } = useVote();

  return (
    <div style={{ width: '70%' }}>
      <div style={{ width: '70%' }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            title: { text: 'Favorite PL', display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
}

export default Chart;