import { useMutation, useQueryClient } from 'react-query';
import { ReqLoginUserDto } from '../interfaces/Dto';
import { Requests } from '../services/client/Requests';

const useUser = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isLoading } = useMutation(
        (data: ReqLoginUserDto) => Requests.user.loginUser(data),
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries('users');
            },
        },
    );

    async function createUser(data: ReqLoginUserDto) {
        const response = await mutateAsync(data);

        return response;
    }

    return { createUser, isLoading };
};

export default useUser;
