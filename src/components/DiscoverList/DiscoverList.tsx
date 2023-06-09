import { useState } from "react";
import { Podcast } from "../../@types/podcast";
import { Grid } from "@mui/material";
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
        <Grid container columns={{ xs: 2, sm: 3, md: 4 }}>
          {data.map((item, index) => (
            <Grid
              key={index}
              item
              xs={1}
              justifyContent={"center"}
              display={"flex"}
            >
              <StyledLink to={`/view/${item.id}`}>
                <Preview title={item.title} image={item.image} />
              </StyledLink>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};
