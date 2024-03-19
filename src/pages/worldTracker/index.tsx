import WorldTrackerPage from "@/components/worldTrackerPage";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useFetching } from "@/hooks/fetching";

export interface WorldData {
  countries: string[] | [];
  color: string;
  userName: string;
}

const WorldTracker: NextPage = () => {
  const router = useRouter();
  const username = Cookies.get("username");
  const { data } = useFetching(username);
  const [refreshToggle, setRefreshToggle] = useState(false);

  useEffect(() => {
    if (username === undefined) {
      router.push("/");
    }

    const interval = setInterval(() => {
      setRefreshToggle((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, [refreshToggle]);

  return <WorldTrackerPage data={data} />;
};

export default WorldTracker;
