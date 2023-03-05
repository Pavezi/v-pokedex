/*
import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "https://pokeapi.co/api/v2/"
});

export default api;
*/
import axios from 'axios';

export const API_URL = 'https://pokeapi.co/api/v2/';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getNextPokemon = async (nextUrl: string): Promise<any> => {
    try {
        const response = await api.get(nextUrl);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const getPokemonList = async (offset: number = 0, limit: number = 20): Promise<any> => {
    try {
        const response = await api.get(`pokemon?offset=${offset}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
