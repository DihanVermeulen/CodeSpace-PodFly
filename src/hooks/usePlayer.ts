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
      // Maximises modal if the URL contains "/listen"
      modalActions.maximiseModal();
      if (!modalState.isOpen) modalActions.openModal();

      // Disables scrolling
      document.body.style.overflow = "hidden";

      /** Search parameters from URL query */
      const searchParams = new URLSearchParams(location.search);
      const podcastParam = searchParams.get("podcast");
      const seasonParam = searchParams.get("season");
      const episodeParam = searchParams.get("episode");
      if (typeof podcastParam === "string")
        fetchIndividualPodcast(podcastParam).then((data) => {
          console.log("fetched data: ", data);
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
                  image: data.image,
                });
              }
            }
          }
        });
    } else {
      modalActions.minimiseModal();
      // Enables scrolling
      document.body.style.overflow = "auto";
    }
  }, [location]);

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

  /**
   * Fetches an individual podcast
   * @param id - id of podcast
   * @returns {Promise<IndividualPodcast | Error >}
   */
  const fetchIndividualPodcast = (
    id: string
  ): Promise<IndividualPodcast | Error> => {
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

  const handleCloseModal = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
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
