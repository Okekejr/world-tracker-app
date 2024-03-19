import { useEffect, useState } from "react";

export interface WorldData {
  countries: string[] | [];
  color: string;
  userName: string;
}

export const useFetching = (username: string | undefined) => {
  const [data, setData] = useState<WorldData | null>();
  const [refreshToggle, setRefreshToggle] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (username) {
          const response = await fetch("/api/users/getdata");
          const newData = await response.json();
          setData(newData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setRefreshToggle((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, [refreshToggle]);

  return { data, setData };
};
