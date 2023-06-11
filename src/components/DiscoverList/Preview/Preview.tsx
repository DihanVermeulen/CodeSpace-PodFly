import StyledComponents from "./Preview.styled";
const { Label, Card, Image } = StyledComponents;

export type Preview = {
  image: string;
  title: string;
  seasons: number;
};

export type LoadingImage = {
  src: string;
};

export const Preview = (props: Preview) => {
  const { image, title, seasons } = props;

  return (
    <Card>
      <Image src={image} />
      <dl>
        <Label variant="h1" as="dt" fontSize={"18px"}>
          {title}
        </Label>
        <Label variant="body2" as="dd" color={"#A1A1A1"} fontSize={"14px"}>
          Seasons: {seasons}
        </Label>
      </dl>
    </Card>
  );
};
