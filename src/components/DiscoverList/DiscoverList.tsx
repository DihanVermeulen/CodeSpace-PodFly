import { useState } from "react";
import { Podcast } from "../../@types/podcast";
import { Masonry } from "@mui/lab";
import { Preview } from "./Preview";
import StyledComponents from "./DiscoverList.styled";

export type DiscoverList = {
  data: Podcast[];
};

export const DiscoverList = (props: DiscoverList) => {
  const [data] = useState(props.data);
  const { StyledLink } = StyledComponents;

  return (
    <>
      {data ? (
        <Masonry columns={2}>
          {data.map((item, index) => (
            <StyledLink key={index} to={`/view/${item.id}`}>
              <Preview title={item.title} image={item.image} />
            </StyledLink>
          ))}
        </Masonry>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};
