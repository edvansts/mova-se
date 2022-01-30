import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

const useCountdownContext = () => {
    const context = useContext(CountdownContext);

    return context;
};

export default useCountdownContext;
