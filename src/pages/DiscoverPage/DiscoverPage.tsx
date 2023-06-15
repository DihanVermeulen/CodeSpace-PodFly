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
  const filterData = (filter: Filter, data: PodcastPreview[]) => {
    switch (filter) {
      case "A-Z": {
        return [...data].sort((a, b) => a.title.localeCompare(b.title));
      }
      case "Z-A": {
        return [...data].sort((a, b) => b.title.localeCompare(a.title));
      }
      case "MOST_RECENT": {
        return [...data].sort(
          (a, b) => b.updated.getTime() - a.updated.getTime()
        );
      }
      case "LEAST_RECENT": {
        return [...data].sort(
          (a, b) => a.updated.getTime() - b.updated.getTime()
        );
      }
      case "ALL":
        return [...data];
      default:
        return [...data];
    }
  };

  const handleFilterData = (
    _event: MouseEvent<HTMLElement>,
    toggleFilter: Filter
  ) => {
    if (toggleFilter !== filter) {
      setFilter(toggleFilter);
      setFilteredData(filterData(toggleFilter, podcasts));
    }
  };

  return (
    <>
      <Space height="4rem" />
      {phase === "LISTING" && <DiscoverList data={podcasts} />}
    </>
  );
};
