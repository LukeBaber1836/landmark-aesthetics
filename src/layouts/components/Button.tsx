import Link from "next/link";
import React from "react";
import { TbLoader2 } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";

interface Props {
  link?: string;
  label: string;
  enable?: boolean;
  style?: string;
  showIcon?: boolean;
  type?: "submit" | "reset" | "button";
  isLoading?: boolean;
  isSuccess?: boolean;
}

const Button: React.FC<Props> = ({
  enable = true,
  link,
  label,
  style,
  showIcon = true,
  type = "button",
  isLoading = false,
  isSuccess = false,
}) => {
  const className = style ?? "btn-primary";

  const bgHoverClass =
    className === "btn-primary"
      ? "bg-primary"
      : className === "btn-outline"
        ? "bg-body"
        : className === "btn-secondary"
          ? "bg-body"
          : "bg-body";

  const textHoverClass =
    className === "btn-primary"
      ? "group-hover:text-white"
      : className === "btn-outline"
        ? "group-hover:text-primary"
        : className === "btn-secondary"
          ? "group-hover:text-primary"
          : "group-hover:text-primary";

  const renderIcon = () => {
    if (isSuccess) {
      return (
        <FaCheck
          stroke="currentColor"
          className="inline ml-2 size-5 -translate-y-0.5"
        />
      );
    }

    if (isLoading) {
      return (
        <TbLoader2
          stroke="currentColor"
          className="inline ml-2 size-6 animate-spin"
        />
      );
    }

    return (
      <svg
        className="inline ml-2"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1={7} y1={17} x2={17} y2={7} />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    );
  };

  return (
    <>
      {enable &&
        (link ? (
          <Link
            href={link}
            target={link.startsWith("http") ? "_blank" : "_self"}
            className={`btn ${className} relative overflow-hidden inline-block group hover:shadow-lg hover:shadow-black/50 transition-shadow duration-300 ease-in-out`}
          >
            <span className="absolute left-1/2 top-0 h-full w-0 -translate-x-1/2 transition-all duration-300 ease-[cubic-bezier(1,0,1,1)] group-hover:w-[200%]">
              <span
                className={`block h-full w-full skew-x-45 ${bgHoverClass}`}
              />
            </span>
            <span
              className={`relative inline z-10 transition-colors duration-300 ${textHoverClass}`}
            >
              {label}
              {showIcon && renderIcon()}
            </span>
          </Link>
        ) : (
          <button
            type={type}
            className={`btn ${className} relative overflow-hidden inline-block group`}
            disabled={!enable || isLoading}
          >
            <span className="absolute left-1/2 top-0 h-full w-0 -translate-x-1/2 transition-all duration-300 ease-[cubic-bezier(1,0,1,1)] group-hover:w-[200%]">
              <span
                className={`block h-full w-full skew-x-45 ${bgHoverClass}`}
              />
            </span>
            <span
              className={`relative z-10 transition-colors duration-300 inline ${textHoverClass}`}
            >
              {label}
              {showIcon && renderIcon()}
            </span>
          </button>
        ))}
    </>
  );
};

export default Button;
