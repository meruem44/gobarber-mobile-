import React, { createContext, useCallback, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState {
    token: string;
    user: object;
};

interface SignInCredentials {
    email: string;
    password: string;
};

interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut: Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData(): Promise<void> {
            const [user, token] =  await AsyncStorage.multiGet([
                '@Gobarber:user',
                '@Gobarber:token'
            ]);

            if (user[1] && token[1]) {
                setData({ token: token[1], user: JSON.parse(user[1]) });
            }

            setLoading(false);
        };
        loadStorageData();
    }, []);

    const signIn = useCallback( async ({ email, password }) => {
        const response = await api.post('/sessions', {
            email, 
            password
        });

        const { user, token } = response.data;

        await AsyncStorage.multiSet([
            ['@Gobarber:user', JSON.stringify(user)],
            ['@Gobarber:token', token]
        ]);

        setData({ user, token });

    }, []);

    const signOut = useCallback( async () => {
        await AsyncStorage.multiRemove(['@Gobarber:token', '@Gobarber:user']);

        setData({} as AuthState);
    }, []);

    return(
        <AuthContext.Provider value={{ user: data?.user, signIn, signOut, loading }} >
            {children}
        </AuthContext.Provider>
    )
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    return context;
};

export { AuthProvider, AuthContext, useAuth };