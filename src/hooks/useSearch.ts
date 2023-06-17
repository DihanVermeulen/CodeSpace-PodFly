import Fuse from "fuse.js";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type useSearch = unknown[];

export const useSearch = (props: useSearch) => {
  const [query, setQuery] = useState<string>("");
  const [searchData, setSearchData] = useState<any>();
  const [searchParam, setSearchParam] = useSearchParams("search");
  const options = { isCaseSensitive: false, keys: ["title"] };
  const data = [...props];

  const search = (data: unknown[]) => {
    const fuse = new Fuse(data, options);
    const searchTerm = searchParam.get("search");

    const pattern = searchTerm;
    if (pattern !== null)
      return fuse.search(pattern).map((result) => result.item);
  };

  const handleSearch = () => {
    setSearchData(search(data));
  };

  useEffect(() => {
    handleSearch();
  }, [setSearchParam]);

  return {
    query,
    setQuery,
    search,
    searchData,
    setSearchData
  };
};
