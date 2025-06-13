import { useState, useEffect } from "react";
import { getApiUrl } from "../config";
import { Category } from "../types/Category";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useGetMe() {
    const [me, setMe] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchMe = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await fetch(`${getApiUrl()}/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setMe(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMe();
      }, []);

      return { me, setMe, isLoading, error };
}