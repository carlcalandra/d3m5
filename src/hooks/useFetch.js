import { useEffect, useState } from "react";
import getLastPage from "../utils/getLastPage";

const useFetch = (url, headers, itemsPerPage) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refresher, setRefresher] = useState(false);

  const [errors, setErrors] = useState([]);

  const [activePage, setActivePage] = useState(0);

  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (refresher) {
        setLoading(true);
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: headers,
          });
          if (response.ok) {
            const data = await response.json();
            const lastPage = getLastPage(data, itemsPerPage);
            setData(data);
            if (!isDelete || activePage > lastPage) {
              setActivePage(lastPage);
            }
            setIsDelete(false);
          } else {
            throw Error(await response.text());
          }
        } catch (error) {
          setErrors(prev => [...prev, error]);
        } finally {
          setRefresher(false);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [refresher]);

  return [
    data,
    setData,
    loading,
    errors,
    setErrors,
    setRefresher,
    activePage,
    setActivePage,
    setIsDelete,
  ];
};

export default useFetch;
