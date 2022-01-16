import { useMutation, useQueryClient } from 'react-query';
import { User } from '../models/User';
import { Requests } from '../services/client/Requests';

const useUser = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isLoading } = useMutation(
        (user: User) => Requests.user.createUser(user),
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries('users');
            },
        },
    );

    async function createUser(user: User) {
        await mutateAsync(user);
    }

    return { createUser, isLoading };
};

export default useUser;
