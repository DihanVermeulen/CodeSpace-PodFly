import { PodcastPreview } from "../../@types/podcast";
import { Grid } from "@mui/material";
import { Preview } from "./Preview";
import { StyledLink } from "./DiscoverList.styled";

export type DiscoverList = {
  data: PodcastPreview[];
};

export const DiscoverList = (props: DiscoverList) => {
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
                <Preview {...item} />
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
