import styled from "@emotion/styled";
import { Typography, Skeleton, Stack } from "@mui/material";
import { Carousel } from "../../components/Carousel";
import { useState } from "react";
import { useEffectOnce } from "react-use";
import { mocks } from "../../components/Carousel/Carousel.mock";
import { Podcast } from "../../@types/podcast";
import { DiscoverList } from "../../components/DiscoverList";
import utilsStyles from "../../styles/utils.styles";
export const HomePage = () => {
  const [carouselPodcasts, setCarouselPodcasts] = useState<Podcast[] | null>(
    null
  );


  return (
    <>
      <Text variant="body1" as="p" fontWeight={300}>
        Hi, guest
      </Text>
      <Text variant="h5" as="h2" fontWeight={600}>
        This week's hottest
      </Text>

      {carouselPodcasts ? (
        <Carousel data={carouselPodcasts}></Carousel>
      ) : (
        <section>skeleton</section>
      )}
    </>
  );
};
