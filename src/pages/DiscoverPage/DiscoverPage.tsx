import { DiscoverList } from "../../components/DiscoverList";
import { Space } from "../../styles/utils.styles";
import { useStore } from "zustand";
import { store } from "../../model";
import { useState, useEffect, MouseEvent } from "react";
import { PodcastPreview } from "../../@types/podcast";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSearch } from "../../hooks/useSearch";

type Filter = "A-Z" | "Z-A" | "MOST_RECENT" | "LEAST_RECENT" | "ALL";

export const DiscoverPage = () => {
  const podcasts = useStore(store, (state) => state.list);
  const [phase, setPhase] = useState("LOADING");
  const [filteredData, setFilteredData] = useState<PodcastPreview[] | null>(
    null
  );
  const [filter, setFilter] = useState<Filter>("ALL");
  const { searchData, setSearchData } = useSearch(podcasts);

  useEffect(() => {
    if (podcasts.length > 0) {
      setPhase("LISTING");
      setFilteredData((prevData) => {
        if (prevData === null || prevData === podcasts) {
          return filterData(filter, podcasts);
        }
        return prevData;
      });
    }
  }, [filter, podcasts]);

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

  console.log(searchData);

  const handleFilterData = (
    _event: MouseEvent<HTMLElement>,
    toggleFilter: Filter
  ) => {
    if (toggleFilter !== filter) {
      setFilter(toggleFilter);
      setFilteredData(filterData(toggleFilter, podcasts));
      setSearchData([]);
    }
  };

  return (
    <>
      <Space height="4rem" />
      <Box sx={{ padding: "1rem" }}>
        <ToggleButtonGroup
          size="small"
          value={filter}
          onChange={handleFilterData}
          exclusive
          aria-label="sort"
        >
          <ToggleButton sx={{ fontSize: 12 }} value="ALL" aria-label="show all">
            All
          </ToggleButton>
          <ToggleButton sx={{ fontSize: 12 }} value="A-Z" aria-label="a to z">
            A - Z
          </ToggleButton>
          <ToggleButton sx={{ fontSize: 12 }} value="Z-A" aria-label="z to a">
            Z - A
          </ToggleButton>
          <ToggleButton
            sx={{ fontSize: 12 }}
            value="MOST_RECENT"
            aria-label="most recent"
          >
            Most Recent
          </ToggleButton>
          <ToggleButton
            sx={{ fontSize: 12 }}
            value="LEAST_RECENT"
            aria-label="least recent"
          >
            Least Recent
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {phase === "LISTING" && searchData.length > 0 ? (
        <DiscoverList data={searchData} />
      ) : (
        filteredData && <DiscoverList data={filteredData} />
      )}
    </>
  );
};
