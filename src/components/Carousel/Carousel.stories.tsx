import { Carousel } from "./Carousel";
import { mocks } from "./Carousel.mock";
import { Meta } from "@storybook/react";

const meta: Meta<Carousel> = {
  title: "components/Carousel",
  component: Carousel,
};

export default meta;

const list: Carousel["data"] = new Array(3).fill(undefined).map(mocks.basic);

export const Basic = (args: Carousel) => {
  const { data } = args;
  return <Carousel data={data} />;
};

Basic.args = {
  data: list,
};
