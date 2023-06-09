import styled from "@emotion/styled";
import { Typography, Skeleton, Stack, Box } from "@mui/material";
import { Carousel } from "../../components/Carousel";
import { useState, useEffect } from "react";
import { Podcast } from "../../@types/podcast";
import utilsStyles from "../../styles/utils.styles";
import { store } from "../../model";
import { useStore } from "zustand";

const Text = styled(Typography)<{ as: string }>`
  font-family: "Poppins", sans-serif;
`;

export const HomePage = () => {
  const podcasts: Podcast[] = useStore(store, (state) => state.list);
  const [phase, setPhase] = useState("LOADING");

  const { Space } = utilsStyles;

  useEffect(() => {
    if (podcasts.length > 0) {
      setPhase("LISTING");
    }
  }, [podcasts]);

  return (
    <>
      <Space height={"4rem"} />
      <Box marginLeft={"0.6rem"}>
        <Text variant="body1" as="p" fontWeight={300}>
          Hi, guest
        </Text>
        <Text variant="h5" as="h2" fontWeight={600}>
          This week's hottest
        </Text>
      </Box>

      {phase === "LISTING" && <Carousel data={podcasts.slice(0, 3)}></Carousel>}
      {phase === "LOADING" && (
        <Stack
          direction={"row"}
          spacing={"10px"}
          paddingTop={"0.3rem"}
          paddingBottom={"0.6rem"}
          marginLeft={"1rem"}
        >
          <Skeleton
            variant="rounded"
            style={{
              minWidth: "300px",
              height: "200px",
              borderRadius: "20px",
            }}
          />
          <Skeleton
            variant="rounded"
            style={{
              minWidth: "300px",
              height: "200px",
              borderRadius: "20px",
            }}
          />
          <Skeleton
            variant="rounded"
            style={{
              minWidth: "300px",
              height: "200px",
              borderRadius: "20px",
            }}
          />
        </Stack>
      )}
      <Space height={"2rem"} />
    </>
  );
};
