import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  ListItemAvatar,
  Typography,
  LinearProgress,
  Box,
} from "@mui/material";
import { PlayCircleOutline } from "@mui/icons-material";
import { formatTime } from "../../../utils/helpers";
import { useNavigate } from "react-router-dom";

export type PreviouslyListenedList = {
  data: any[];
};

export const PreviouslyListenedList = (props: PreviouslyListenedList) => {
  const { data } = props;
  const navigate = useNavigate();

  const handleNavigate = (
    podcastID: string,
    seasonNumber: number,
    episodeNumber: number
  ) => {
    navigate(
      `/listen?podcast=${podcastID}&season=${seasonNumber}&episode=${episodeNumber}`
    );
  };

  return (
    <List>
      {data &&
        data.map((item, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton
                size="large"
                onClick={() =>
                  handleNavigate(
                    item.podcastID,
                    item.seasonNumber,
                    item.episodeNumber
                  )
                }
              >
                <PlayCircleOutline />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <img src={item.image} width={50} style={{ borderRadius: 10 }} />
            </ListItemAvatar>
            <Box>
              <ListItemText
                primary={item.podcastTitle}
                secondary={
                  <>
                    <Typography component="span">
                      Season: {item.seasonNumber}
                    </Typography>
                    <br />
                    {`Episode: ${item.episodeNumber}`}
                  </>
                }
              ></ListItemText>
              <Box display={"flex"} alignItems={"center"}>
                <LinearProgress
                  sx={{ width: "200px", marginRight: "1rem" }}
                  variant="determinate"
                  value={(item.time / item.duration) * 100}
                />
                <Typography
                  variant="body1"
                  fontSize={12}
                  color={"#a1a1a1"}
                  component="p"
                >
                  {formatTime(item.time)}
                </Typography>
              </Box>
            </Box>
          </ListItem>
        ))}
    </List>
  );
};
