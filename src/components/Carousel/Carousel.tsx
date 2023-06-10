import { CarouselCard } from "./CarouselCard";
import StyledComponents from "./Carousel.styled";
import { useState, useEffect } from "react";
import { Podcast } from "../../@types/podcast";

export type Carousel = {
  data: Podcast[];
};

export const Carousel = (props: Carousel) => {
  const [data] = useState<Podcast[]>(props.data);
  const [phase, setPhase] = useState("LOADING");

  useEffect(() => {
    if (data.length > 0) {
      setPhase("LISTING");
    }
  }, [props.data]);

  return (
    <>
      <StyledComponents.Carousel>
        {phase === "LISTING" &&
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
