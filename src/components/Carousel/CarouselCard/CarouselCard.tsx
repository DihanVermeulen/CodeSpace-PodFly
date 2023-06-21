import StyledComponents from "./CarouselCard.styled";

type CarouselCard = {
  title: string;
  image: string;
};

export const CarouselCard = (props: CarouselCard) => {
  const { image, title} = props;
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
          </Description>
        </CardBottomBanner>
      </StyledButtonBase>
    </Card>
  );
};
