export const ViewPodcast = () => {
  const { id } = useParams<{ id: string }>();

  const [podcasts, setPodcasts] = useState();

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

};
