import { SVGProps } from "react";

export interface IChevronIconProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

export function ChevronUp(props: IChevronIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 -2 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...getProps(props)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  );
}

export function ChevronRight(props: IChevronIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...getProps(props)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function ChevronDown(props: IChevronIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 -2 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...getProps(props)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function ChevronLeft(props: IChevronIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...getProps(props)}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function getProps({
  width,
  height,
  ...props
}: IChevronIconProps): SVGProps<SVGSVGElement> {
  return {
    ...props,
    style: {
      ...props.style,
      width: width ?? 24,
      height: height ?? 24,
    },
  };
}
