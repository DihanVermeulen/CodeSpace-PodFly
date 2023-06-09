import StyledComponents from "./Preview.styled";

export type Preview = {
  image: string;
  title: string;
  // click: () => void;
};

export const Preview = (props: Preview) => {
  const { Label, Card, Image } = StyledComponents;
  const { image, title } = props;

  return (
    <Card>
      <Image src={image} />
      <Label variant="h1" as="h6">
        {title}
      </Label>
    </Card>
  );
};
