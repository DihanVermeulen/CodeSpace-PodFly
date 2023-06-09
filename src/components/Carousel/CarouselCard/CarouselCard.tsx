import StyledComponents from "./CarouselCard.styled";

type CarouselCard = {
  title: string;
  genres: string[];
  image: string;
};

export const CarouselCard = (props: CarouselCard) => {
  const { image, title, genres } = props;
  const {
    Card,
    CardBottomBanner,
    StyledButtonBase,
    Description,
    BlurredBackground,
  } = StyledComponents;
  return (
    <Card as="li">
      <StyledButtonBase backgroundimage={image}>
        <CardBottomBanner>
          <BlurredBackground></BlurredBackground>
          <Description>
            <dd style={{ textAlign: "left" }}>{title}</dd>
            <dt>{genres}</dt>
          </Description>
        </CardBottomBanner>
      </StyledButtonBase>
    </Card>
  );
};
