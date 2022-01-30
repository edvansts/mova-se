import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';

const useChallengesContext = () => {
    const context = useContext(ChallengesContext);

    return context;
};

export default useChallengesContext;
