import { useLocation, useNavigate } from "react-router-dom";
import { createModalActions, getModalState } from "../model";
import { useEffect } from "react";
import {
  IndividualPodcast,
} from "../@types/podcast";
import { fetchIndividualPodcast, findEpisode } from "../utils/helpers";

export const usePlayer = () => {
  const modalState = getModalState();
  const modalActions = createModalActions();
  const location = useLocation();
  const navigate = useNavigate();

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
          if (
            typeof seasonParam === "string" ||
            typeof episodeParam === "string"
          ) {
            const season = parseInt(seasonParam || "");
            const episode = parseInt(episodeParam || "");
            const podcast = podcastParam;

            if (!isNaN(season) && !isNaN(episode)) {
              const foundEpisode = findEpisode(
                data as IndividualPodcast,
                season,
                episode
              );
              if (typeof foundEpisode !== "undefined") {
                if (!(data instanceof Error))
                  modalActions.updateModalData({
                    episodeNumber: foundEpisode.episode.episode,
                    season: season,
                    episodeTitle: foundEpisode.episode.title,
                    audioSrc: foundEpisode.episode.file,
                    image: data.image,
                    podcast: podcast,
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
