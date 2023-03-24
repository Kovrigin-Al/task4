
import { useCallback, useEffect, useState } from "react";

export const useRequest = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);

    const cleanError = useCallback(() => setError(null), []);

    useEffect(() => {
        if (error) {
            alert(error);
            setError(null);
        }
    }, [error])

    const request = useCallback(
        async (url: string, method: 'GET' | "POST" | "PUT" | "DELETE" = "GET", body: any, headers = {}) => {
            setIsLoading(true);
            try {
                if (body) {
                    const requestHeaders = {'Content-Type': 'application/json' }
                    body = JSON.stringify(body);
                    headers = {...requestHeaders, ...headers}
                }
                url = import.meta.env.VITE_SERVER_URL + url;
                const response = await fetch(url, { method, body, headers, });
                setIsLoading(false)
                let jsonResponse;
                if (response.status !== 204) { jsonResponse = await response.json(); }
                if (!response.ok && response.status !== 401) {
                    throw new Error(jsonResponse.message || 'Unknown error')
                }
                return jsonResponse;
            } catch (e) {
                setIsLoading(false)
                if (typeof e === "string") {
                    setError(e)
                } else if (e instanceof Error) {
                    setError(e.message)
                }
                throw e
            }
        },
        []
    );

    return { isLoading, request, error, cleanError };
};