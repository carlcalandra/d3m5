import { useEffect, useState } from "react";

const useFetch = (url, headers) => {

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(url, {
                    method:"GET",
                    headers:headers,
                })
                if (response.ok) {
                    setData(await response.json());
                } else {
                    throw Error(await response.text());
                }
                
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false)
            }

        }
        fetchData();

    },[])

    return [data, setData, loading, error];
}

export default useFetch;
