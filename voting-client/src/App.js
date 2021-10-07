import './App.css';
import Container from './components/Container';

import { VotingProvider } from './contexts/VotingContext';

function App() {
  return (
    <VotingProvider>
      <Container />
    </VotingProvider>
  );
}

export default App;