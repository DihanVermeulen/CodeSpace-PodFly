import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { createApi } from "../../api";
import { useEffect, useState } from "react";
import { IndividualPodcast } from "../../@types/podcast";
import UtilStyles from "../../styles/utils.styles";

const api = createApi();

export const ViewPodcast = () => {
  const { id } = useParams<{ id: string }>();
  const { Space } = UtilStyles;

  const [podcasts, setPodcasts] = useState<IndividualPodcast | null>(null);

  useEffect(() => {
    const handleFetchIndividualPodcast = async () => {
      if (id)
        try {
          const data: IndividualPodcast | Error =
            await api.getIndividualPodcastList(id);
          setPodcasts(data);
        } catch (error) {
          console.error("Error fetching individual podcast:", error);
        }
    };

    handleFetchIndividualPodcast();
  }, [id]);

  return (
    <>
      {podcasts ? (
        <Box>
          <Space height="4rem"/>
          <Box display={"flex"}>
            <Box>
              <img src={podcasts.seasons[0].image} width={120} />
            </Box>
            <Box display={"flex"} flexDirection={"column"}>
              <Typography>{podcasts.title}</Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
};
