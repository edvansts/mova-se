import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from '../contexts/UserContext';
import '../styles/global.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
