import { AxiosResponse } from 'axios';
import {
    createContext,
    ReactNode,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import CookieAdapter from '../infra/CookieAdapter';
import { ReqCreateUserDto, ResLoginUserDto } from '../interfaces/Dto';
import { User } from '../models/User';
import { setAuthorizationToken } from '../services/client/AxiosMain';
import { Requests } from '../services/client/Requests';

interface UserContextState {
    createUser: (
        data: ReqCreateUserDto,
        token: string,
    ) => Promise<AxiosResponse<ResLoginUserDto, any>>;
    loginUser: (token: string) => Promise<AxiosResponse<ResLoginUserDto, any>>;
    isLoadingCreateUser: boolean;
    isLoadingLoginUser: boolean;
    user: User;
    token: string;
}

export const UserContext = createContext({} as UserContextState);

interface Props {
    children: ReactNode;
}

export function UserProvider({ children }: Props) {
    const queryClient = useQueryClient();

    const { data: user } = useQuery<User>({ queryKey: 'user' });

    const token = useMemo(() => CookieAdapter.get('token'), [user]);

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
            setAuthorizationToken(token);

            const response = await createUserMutation.mutateAsync(data);

            return response;
        },
        [],
    );

    const loginUser = useCallback(async (token: string) => {
        setAuthorizationToken(token);
        const response = await loginUserMutation.mutateAsync();

        return response;
    }, []);

    const value: UserContextState = {
        createUser,
        loginUser,
        isLoadingCreateUser: createUserMutation.isLoading,
        isLoadingLoginUser: loginUserMutation.isLoading,
        user,
        token,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}
