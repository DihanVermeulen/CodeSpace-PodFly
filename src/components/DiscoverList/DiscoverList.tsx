import { useState } from "react";
import { Podcast } from "../../@types/podcast";
import { Masonry } from "@mui/lab";
import { Preview } from "./Preview";
import { Link } from "react-router-dom";

export type DiscoverList = {
  data: Podcast[];
};

export const DiscoverList = (props: DiscoverList) => {
  const [data] = useState(props.data);

  return (
    <>
      {data ? (
        <Masonry columns={2}>
          {data.map((item, index) => (
            <Link to={`/view/${item.id}`}>
              <Preview key={index} title={item.title} image={item.image} />
            </Link>
          ))}
        </Masonry>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};
