import { initializeDB } from "@/db/database";
import HomeScreen from "@/screens/HomeScreen";
import { useEffect } from "react";

export default function Index() {

  useEffect(() => {

    initializeDB();
  }, []);

  return (
    <HomeScreen />
  );
}
