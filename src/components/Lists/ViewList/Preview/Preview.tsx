import { Box, Card } from "@mui/material";
import { PodcastPreview } from "../../../@types/podcast";
import GENRES from "../../../constants/genres";
import { PreviewImage, PreviewDescription } from "./Preview.styled";

export const Preview = (props: PodcastPreview) => {
  const { image, title, genres, seasons } = props;
  // @ts-ignore
  const newGenres = genres.map((genre) => GENRES[genre]).join(", ");
  return (
    <>
      <Card
        sx={{
          display: "flex",
          width: 300,
          padding: 1,
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <PreviewImage src={image} />
        <Box>
          <PreviewDescription>
            <dt>{title}</dt>
            <dd>seasons: {seasons}</dd>
            <dd style={{ fontSize: 12 }}>genres: {newGenres}</dd>
          </PreviewDescription>
        </Box>
      </Card>
    </>
  );
};
