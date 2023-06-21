import { PodcastPreview } from "../../../@types/podcast";
import { Label, Card, Image } from "./Preview.styled";
import { format } from "date-fns";
import GENRES from "../../../constants/genres";

export const Preview = (props: PodcastPreview) => {
  const { image, title, seasons, updated, genres } = props;
  const newGenres = [];
  for (const genre of genres) {
    newGenres.push(GENRES[genre]);
  }
  return (
    <Card>
      <Image src={image} loading="lazy" />
      <dl>
        <Label variant="h1" as="dt" fontSize={"18px"}>
          {title}
        </Label>
        <div style={{ textAlign: "end" }}>
          <Label variant="body2" as="dd" fontSize={"14px"}>
            Seasons: {seasons}
          </Label>
          <Label
            variant="body1"
            as="dd"
            fontSize={"12px"}
            color={"#a1a1a1"}
            style={{ margin: 0, fontWeight: 300 }}
          >
            updated: {format(updated, "dd LLLL yyyy")}
          </Label>
          <Label
            variant="body1"
            as="dd"
            fontSize={"12px"}
            color={"#a1a1a1"}
            style={{ margin: 0, fontWeight: 300 }}
          >
            genres: {newGenres.join(", ")}
          </Label>
        </div>
      </dl>
    </Card>
  );
};
