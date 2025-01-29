"use client";

import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

export interface ButtonLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  title?: string;
}

const ButtonLink = ({
  children,
  className,
  disabled,
  title,
  ...props
}: ButtonLinkProps) => {
  const linkClassName = clsx(
    "rounded-2xl bg-white px-3 py-1",
    className,
    disabled && "cursor-not-allowed opacity-50",
  );
  return (
    <Link
      title={title}
      onClick={(e) => disabled && e.preventDefault()}
      className={linkClassName}
      {...props}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
