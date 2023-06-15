import { DiscoverList } from "../../components/DiscoverList";
import { Space } from "../../styles/utils.styles";
import { useStore } from "zustand";
import { store } from "../../model";
import { useState, useEffect, MouseEvent } from "react";
import { PodcastPreview } from "../../@types/podcast";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";

type Filter = "A-Z" | "Z-A" | "MOST_RECENT" | "LEAST_RECENT" | "ALL";

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
      <Box sx={{ padding: "1rem" }}>
        <ToggleButtonGroup value={filter} onChange={handleFilterData} exclusive>
          <ToggleButton value="ALL">All</ToggleButton>
          <ToggleButton value="A-Z">A - Z</ToggleButton>
          <ToggleButton value="Z-A">Z - A</ToggleButton>
          <ToggleButton value="MOST_RECENT">Most Recent</ToggleButton>
          <ToggleButton value="LEAST_RECENT">Least Recent</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {phase === "LISTING" && filteredData && (
        <DiscoverList data={filteredData} />
      )}
    </>
  );
};
