import type { ImgHTMLAttributes } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  src: string;
  alt: string;
};

function NextImageStub({ fill: _fill, priority: _priority, sizes: _sizes, ...rest }: Props) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...rest} />;
}

export default NextImageStub;
