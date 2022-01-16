import { useMutation, useQueryClient } from 'react-query';
import { LoginUserDto } from '../interfaces/Dto';
import { Requests } from '../services/client/Requests';

const useUser = () => {
    const queryClient = useQueryClient();

    const {
        mutateAsync,
        isLoading,
        data: response,
    } = useMutation((data: LoginUserDto) => Requests.user.loginUser(data), {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('users');
        },
    });

    async function createUser(data: LoginUserDto) {
        await mutateAsync(data);

        return response;
    }

    return { createUser, isLoading };
};

export default useUser;
