import { CarouselCard } from "./CarouselCard";
import StyledComponents from "./Carousel.styled";
import { useState, useEffect } from "react";
import { PodcastPreview } from "../../@types/podcast";
import { CleanLink } from "../../styles";

export type Carousel = {
  data: PodcastPreview[];
};

export const Carousel = (props: Carousel) => {
  const [data] = useState<PodcastPreview[]>(props.data);
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
            <CleanLink key={item.id} to={`/view/${item.id}`}>
              <CarouselCard {...item} />
            </CleanLink>
          ))}
      </StyledComponents.Carousel>
    </>
  );
};
