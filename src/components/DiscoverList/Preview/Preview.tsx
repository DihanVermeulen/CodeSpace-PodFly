import StyledComponents from "./Preview.styled";
import { useState } from "react";
import { Skeleton } from "@mui/material";
const { Label, Card, Image } = StyledComponents;
import { LazyLoadImage } from "react-lazy-load-image-component";

export type Preview = {
  image: string;
  title: string;
  seasons: number;
};

export type LoadingImage = {
  src: string;
};

export const Preview = (props: Preview) => {
  const { image, title, seasons } = props;

  return (
    <Card>
      <Image src={image} />
      <dl>
        <Label variant="h1" as="dt" fontSize={"18px"}>
          {title}
        </Label>
        <Label variant="body2" as="dd" color={"#A1A1A1"} fontSize={"14px"}>
          Seasons: {seasons}
        </Label>
      </dl>
    </Card>
  );
};
