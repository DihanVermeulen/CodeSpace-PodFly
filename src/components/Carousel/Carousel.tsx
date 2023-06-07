import { CarouselCard } from "../CarouselCard";
import StyledComponents from "./Carousel.styled";
import { useState } from "react";

export type Podcast = {
  id: number;
  title: string;
  image: string;
  description?: string;
  seasons?: number;
  genres: string[];
  updated?: Date;
};

export type Carousel = {
  data: Podcast[];
};

export const Carousel = (props: Carousel) => {
  const { data: propsData } = props;
  const [data] = useState(propsData);

  return (
    <StyledComponents.Carousel>
      {data &&
        data.map((item) => (
          <CarouselCard
            key={item.id}
            genres={item.genres}
            title={item.title}
            image={item.image}
          />
        ))}
    </StyledComponents.Carousel>
  );
};
