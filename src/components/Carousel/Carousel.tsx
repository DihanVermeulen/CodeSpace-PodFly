import { CarouselCard } from "../CarouselCard";
import StyledComponents from "./Carousel.styled";
import { useState } from "react";
import { Podcast } from "../../@types/podcast";

export type Carousel = {
  data: Podcast[];
};

export const Carousel = (props: Carousel) => {
  const [data] = useState(props.data);

  return (
    <>
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
    </>
  );
};
