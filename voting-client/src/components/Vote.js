import { useState } from 'react';
import '../App.css';
import { sendVote } from '../SocketApi';
import { useVote } from '../contexts/VotingContext';

function Vote() {
    const [answer, setAnswer] = useState('');
    const { setVote } = useVote();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!answer) {
            return false;
        }
        //update values
        setVote((prev) => ({ ...prev, [answer]: prev[answer] + 1 }));
        sendVote('new-vote', answer);
    };

    return (
        <div>
            <div onChange={({ target: { value } }) => setAnswer(value)} className="vote-options">
                <input type="radio" value="javaScript" name="javaScript" checked={answer === "javaScript"} readOnly /> JavaScript
                <input type="radio" value="python" name="python" checked={answer === "python"} readOnly /> Python
                <input type="radio" value="java" name="java" checked={answer === "java"} readOnly /> Java
                <input type="radio" value="c" name="c" checked={answer === "c"} readOnly /> C
            </div>
            <div className="vote-options">
                <button onClick={handleSubmit} className="vote-button">Vote</button>
            </div>
        </div>
    );
}

export default Vote;