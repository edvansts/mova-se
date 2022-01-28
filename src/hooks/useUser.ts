import { isEmpty } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import CookieAdapter from '../infra/CookieAdapter';
import { ReqCreateUserDto } from '../interfaces/Dto';
import { User } from '../models/User';
import { setToken } from '../services/client/AxiosMain';
import { Requests } from '../services/client/Requests';

const useUser = () => {
    const queryClient = useQueryClient();

    const { data: user } = useQuery<User>({ queryKey: 'user' });

    const loginUserMutation = useMutation(() => Requests.user.loginUser(), {
        onSuccess: data => {
            // Invalidate and refetch
            queryClient.invalidateQueries('user');
            queryClient.setQueryData('user', data.data.user);
        },
    });

    const createUserMutation = useMutation(
        (data: ReqCreateUserDto) => Requests.user.createUser(data),
        {
            onSuccess: data => {
                // Invalidate and refetch
                queryClient.invalidateQueries('user');
                queryClient.setQueryData('user', data.data.user);
            },
        },
    );

    const createUser = useCallback(
        async (data: ReqCreateUserDto, token: string) => {
            CookieAdapter.set('token', token);
            setToken(token);

            const response = await createUserMutation.mutateAsync(data);

            return response;
        },
        [],
    );

    const loginUser = useCallback(async (token: string) => {
        setToken(token);
        const response = await loginUserMutation.mutateAsync();

        return response;
    }, []);

    return {
        createUser,
        isLoadingCreateUser: createUserMutation.isLoading,
        isLoadingLoginUser: loginUserMutation.isLoading,
        user,
        loginUser,
    };
};

export default useUser;
