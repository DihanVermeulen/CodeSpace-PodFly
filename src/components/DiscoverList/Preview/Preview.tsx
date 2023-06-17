import StyledComponents from "./Preview.styled";
const { Label, Card, Image } = StyledComponents;
import { format } from "date-fns";

export type Preview = {
  image: string;
  title: string;
  seasons: number;
  updated: Date;
};

export type LoadingImage = {
  src: string;
};

export const Preview = (props: Preview) => {
  const { image, title, seasons, updated } = props;

  return (
    <Card>
      <Image src={image} loading="lazy" />
      <dl>
        <Label variant="h1" as="dt" fontSize={"18px"}>
          {title}
        </Label>
        <Label variant="body2" as="dd" color={"#A1A1A1"} fontSize={"14px"}>
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
      </dl>
    </Card>
  );
};
