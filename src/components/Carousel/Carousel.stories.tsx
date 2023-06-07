import { Carousel } from "./Carousel";
import { mocks } from "./Carousel.mock";
import { StoryObj, Meta } from "@storybook/react";

const meta: Meta<Carousel> = {
  title: "components/Carousel",
};

export default meta;

const list: Carousel["data"] = new Array(3).fill(undefined).map(mocks.basic);

export const Basic = () => <Carousel data={list} />;
