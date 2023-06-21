import {
  Card,
  CardBottomBanner,
  Description,
  StyledButtonBase,
} from "./CarouselCard.styled";
import GENRES from "../../../constants/genres";

type CarouselCard = {
  title: string;
  genres: number[];
  image: string;
};

export const CarouselCard = (props: CarouselCard) => {
  const { image, title, genres } = props;
  // @ts-ignore
  const newGenres = genres.map((genre) => GENRES[genre]).join(", ");

  return (
    <Card as="li">
      <StyledButtonBase backgroundimage={image}>
        <CardBottomBanner style={{ backdropFilter: "blur(10px)" }}>
          <Description>
            <dd style={{ textAlign: "left" }}>{title}</dd>
            <dt>{newGenres}</dt>
          </Description>
        </CardBottomBanner>
      </StyledButtonBase>
    </Card>
  );
};
