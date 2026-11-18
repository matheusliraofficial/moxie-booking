import type { ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "fill"> & {
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
};

const NextImageStub = (props: Props) => {
  const { fill, priority, sizes, alt = "", ...rest } = props;
  void fill;
  void priority;
  void sizes;
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} {...rest} />;
};

export default NextImageStub;
