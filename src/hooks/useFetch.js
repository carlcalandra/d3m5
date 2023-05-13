import { useContext, useEffect, useState } from "react";
import getLastPage from "../utils/getLastPage";
import ErrorContext from "../context/ErrorContext";

const useFetch = (url, headers, itemsPerPage) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refresher, setRefresher] = useState(true);

  const [activePage, setActivePage] = useState(0);

  const [isDelete, setIsDelete] = useState(false);

  const {setErrors} = useContext(ErrorContext); 

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
          setErrors(error);
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
    setRefresher,
    activePage,
    setActivePage,
    setIsDelete,
  ];
};

export default useFetch;
