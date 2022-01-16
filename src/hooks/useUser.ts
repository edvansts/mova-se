import { useMutation, useQueryClient } from 'react-query';
import { CreateUserDto } from '../interfaces/Dto';
import { User } from '../models/User';
import { Requests } from '../services/client/Requests';

const useUser = () => {
    const queryClient = useQueryClient();

    const { mutateAsync, isLoading } = useMutation(
        (data: CreateUserDto) => Requests.user.createUser(data),
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries('users');
            },
        },
    );

    async function createUser(data: CreateUserDto) {
        await mutateAsync(data);
    }

    return { createUser, isLoading };
};

export default useUser;
