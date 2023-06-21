import { Filter } from "../../@types/filters";
import { useAuth } from "../../hooks";
import { Space } from "../../styles";
import { ToggleButton, ToggleButtonGroup, Box } from "@mui/material";
import { useState, MouseEvent, useEffect } from "react";
import { getFavouritesState } from "../../model";
import { IndividualPodcast } from "../../@types/podcast";
import { FavouritesList } from "../../components/Lists/FavouritesList";

export const FavouritesPage = () => {
  const { getSession } = useAuth();
  const session = getSession();
  const { favouritesList } = getFavouritesState();
  const [filter, setFilter] = useState<Filter>("ALL");
  const [filteredData, setFilteredData] = useState<IndividualPodcast[] | null>(
    null
  );
  const [phase, setPhase] = useState("LOADING");

  useEffect(() => {
    if (favouritesList.length > 0) {
      setPhase("LOADED");
      setFilteredData((prevData) => {
        if (prevData === null || prevData === favouritesList) {
          return filterData(filter, favouritesList);
        }
        return prevData;
      });
    }
  }, [filter, favouritesList]);

  const handleFilterData = (
    _event: MouseEvent<HTMLElement>,
    newFilter: Filter
  ) => {
    if (newFilter !== filter && newFilter !== null) {
      setFilter(newFilter);
      setFilteredData(filterData(newFilter, favouritesList));
    }
  };

  const filterData = (filter: Filter, data: IndividualPodcast[]) => {
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

  return (
    <>
      <Space height={"4rem"} />
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
      {session
        ? phase === "LOADED" &&
          filteredData && <FavouritesList data={filteredData} />
        : "please sign in"}
    </>
  );
};
