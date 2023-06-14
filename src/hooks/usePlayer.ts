import { useLocation, useNavigate } from "react-router-dom";
import { createModalActions, getModalState } from "../model";
import { createApi } from "../api";
import { useEffect } from "react";
import {
  IndividualPodcast,
  IndividualPodcastEpisode,
  IndividualPodcastSeason,
} from "../@types/podcast";

export const usePlayer = () => {
  const modalState = getModalState();
  const modalActions = createModalActions();
  const location = useLocation();
  const navigate = useNavigate();
  const api = createApi();

  useEffect(() => {
    if (location.pathname.startsWith("/listen")) {
      modalActions.maximiseModal();
      const searchParams = new URLSearchParams(location.search);
      const seasonParam = searchParams.get("season");
      const episodeParam = searchParams.get("episode");

      fetchIndividualPodcast("8256").then((data) => {
        if (
          typeof seasonParam === "string" ||
          typeof episodeParam === "string"
        ) {
          const season = parseInt(seasonParam || "");
          const episode = parseInt(episodeParam || "");

          if (!isNaN(season) && !isNaN(episode)) {
            const foundEpisode = findEpisode(
              data as IndividualPodcast,
              season,
              episode
            );
            if (typeof foundEpisode !== "undefined") {
              modalActions.updateModalData({
                episodeNumber: foundEpisode.episode.episode,
                season: season,
                episodeTitle: foundEpisode.episode.title,
                audioSrc: foundEpisode.episode.file,
              });
            }
          }
        }
      });
    } else {
      modalActions.minimiseModal();
    }
  }, [location, modalActions]);

  const findEpisode = (
    data: IndividualPodcast,
    seasonNumber: number,
    episodeNumber: number
  ) => {
    const season: IndividualPodcastSeason | undefined = data.seasons.find(
      (item) => item.season === seasonNumber
    );

    const episode: IndividualPodcastEpisode | undefined = season?.episodes.find(
      (item) => item.episode === episodeNumber
    );
    if (typeof episode !== "undefined") {
      return {
        episode,
      };
    }
  };

  const fetchIndividualPodcast = (id: string) => {
    return new Promise((resolve, reject) => {
      try {
        const data = api.getIndividualPodcastList(id);
        if (!(data instanceof Error)) {
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleCloseModal = () => {
    setTimeout(() => {
      if (modalState.isMaximised) {
        navigate(-1);
      } else {
        modalActions.updateModalData(null);
        modalActions.closeModal();
      }
    }, 0);
  };

  const handleMaximiseModal = () => {
    console.log("Maximising modal");
    navigate("/listen?showId=", {
      state: { background: location },
    });
    modalActions.maximiseModal();
  };

  return {
    modalState,
    handleCloseModal,
    handleMaximiseModal,
  };
};
