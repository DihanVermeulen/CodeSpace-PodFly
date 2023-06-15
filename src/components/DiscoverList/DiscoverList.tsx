import { useState } from "react";
import { PodcastPreview } from "../../@types/podcast";
import { Grid } from "@mui/material";
import { Preview } from "./Preview";
import StyledComponents from "./DiscoverList.styled";

export type DiscoverList = {
  data: PodcastPreview[];
};

export const DiscoverList = (props: DiscoverList) => {
  const { StyledLink } = StyledComponents;
  const { data } = props;

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
                <Preview
                  title={item.title}
                  image={item.image}
                  seasons={item.seasons}
                />
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
