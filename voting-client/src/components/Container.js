import { useEffect } from 'react';
import Chart from './Chart';
import { useVote } from '../contexts/VotingContext';
import { connectSocket, subscribeToNewVotes } from '../SocketApi';
import Question from './Question';
import Vote from './Vote';
import '../App.css';

function Container() {
    const { setVote } = useVote();

    useEffect(() => {
        connectSocket();
        //get changes and update values
        subscribeToNewVotes((vote) => {
            setVote((prev) => ({ ...prev, [vote]: prev[vote] + 1 }));
        });
    }, [setVote]);

    return (
        <div className="container">
            <Question />
            <Vote />
            <Chart />
        </div>
    );
}

export default Container;