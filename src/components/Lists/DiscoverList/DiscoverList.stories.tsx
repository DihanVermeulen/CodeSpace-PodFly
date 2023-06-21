import { DiscoverList } from "./DiscoverList";
import { Meta } from "@storybook/react";
import { mocks } from "./DiscoverList.mocks";

const meta: Meta<DiscoverList> = {
  title: "components/DiscoverList",
  component: DiscoverList,
};

export default meta;

const list = new Array(40).fill(undefined).map(mocks.basic);

export const Basic = (args: DiscoverList) => {
  const { data } = args;
  return <DiscoverList data={data} />;
};

Basic.args = {
  data: list,
};
