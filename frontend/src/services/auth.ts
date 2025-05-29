import api from './api';

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData extends LoginCredentials {
    name: string;
}

interface AuthResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        localStorage.setItem('token', response.data.token);
        return response.data;
    },

    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', data);
        localStorage.setItem('token', response.data.token);
        return response.data;
    },

    async logout(): Promise<void> {
        localStorage.removeItem('token');
    },

    async getCurrentUser(): Promise<AuthResponse['user']> {
        const response = await api.get<AuthResponse['user']>('/auth/me');
        return response.data;
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
}; 