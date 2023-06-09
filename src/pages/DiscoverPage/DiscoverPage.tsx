import { DiscoverList } from "../../components/DiscoverList";
import utilsStyles from "../../styles/utils.styles";
import { useStore } from "zustand";
import { store } from "../../model";
import { useState, useEffect } from "react";

const { Space } = utilsStyles;

export const DiscoverPage = () => {
  const podcasts = useStore(store, (state) => state.list);
  const [phase, setPhase] = useState("LOADING");

  useEffect(() => {
    if (podcasts.length > 0) {
      setPhase("LISTING");
    }
  }, [podcasts]);

  return (
    <>
      <Space height="4rem" />
      {phase === "LISTING" && <DiscoverList data={podcasts} />}
    </>
  );
};
