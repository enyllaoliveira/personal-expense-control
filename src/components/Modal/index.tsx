"use client";
import RenderHTML from "../RenderHTML";
import clsx from "clsx";
import { FC, ReactNode, useEffect } from "react";

export default function Modal({
  isOpen,
  children,
  onClose,
  className,
  Icon = ({ className }: { className: string }) => (
    <svg
      className={className}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {status === "suport" ? (
        <path
          d="M9.13626 9.13628L4.92893 4.92896M4.92893 19.0711L9.16797 14.8321M14.8611 14.8638L19.0684 19.0711M19.0684 4.92896L14.8287 9.16862M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
          stroke="#5E9ECF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M8 8.5H8.01M4.56274 3.43726L2.93726 5.06274C2.59136 5.40864 2.4184 5.5816 2.29472 5.78343C2.18506 5.96237 2.10425 6.15746 2.05526 6.36154C2 6.59171 2 6.8363 2 7.32548L2 10.1745C2 10.6637 2 10.9083 2.05526 11.1385C2.10425 11.3425 2.18506 11.5376 2.29472 11.7166C2.4184 11.9184 2.59135 12.0914 2.93726 12.4373L10.6059 20.1059C11.7939 21.2939 12.388 21.888 13.0729 22.1105C13.6755 22.3063 14.3245 22.3063 14.927 22.1105C15.612 21.888 16.2061 21.2939 17.3941 20.1059L19.6059 17.8941C20.7939 16.7061 21.388 16.112 21.6105 15.427C21.8063 14.8245 21.8063 14.1755 21.6105 13.5729C21.388 12.888 20.7939 12.2939 19.6059 11.1059L11.9373 3.43726C11.5914 3.09136 11.4184 2.9184 11.2166 2.79472C11.0376 2.68506 10.8425 2.60425 10.6385 2.55526C10.4083 2.5 10.1637 2.5 9.67452 2.5L6.82548 2.5C6.3363 2.5 6.09171 2.5 5.86154 2.55526C5.65746 2.60425 5.46237 2.68506 5.28343 2.79472C5.0816 2.9184 4.90865 3.09135 4.56274 3.43726ZM8.5 8.5C8.5 8.77614 8.27614 9 8 9C7.72386 9 7.5 8.77614 7.5 8.5C7.5 8.22386 7.72386 8 8 8C8.27614 8 8.5 8.22386 8.5 8.5Z"
          className={clsx({
            "stroke-gray-700": status !== "warning",
            "stroke-black": status === "warning",
          })}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  ),
  status = "normal",
  titleHeader,
  description,
  subtitle,
  descriptionAction,
  withoutIcons = false,
  blockClose = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  Icon?: FC<{ className: string }>;
  status?: "warning" | "success" | "error" | "normal" | "suport";
  titleHeader?: string;
  description?: string;
  withoutIcons?: boolean;
  blockClose?: boolean;
  subtitle?: string;
  descriptionAction?: string;
}) {
  const colors = {
    normal: {
      primary: "bg-white",
      secondary: "bg-gray-200",
    },
    warning: {
      primary: "bg-orange-100",
      secondary: "bg-orange-50",
    },
    success: {
      primary: "bg-green-100",
      secondary: "bg-green-50",
    },
    error: {
      primary: "bg-red-100",
      secondary: "bg-red-50",
    },
    suport: {
      primary: "bg-white",
      secondary: "bg-white",
    },
  };

  useEffect(() => {
    if (!isOpen) document.body.style.overflowY = "auto";

    if (isOpen) {
      document.body.style.overflowY = "hidden";
      window.scrollTo(0, 0);
    }
  }, [isOpen]);

  return isOpen ? (
    <div
      className="fixed left-0 right-0 top-0 bottom-0 bg-gray-900/70 backdrop-blur z-[100] flex items-center justify-center sm:justify-start sm:items-end overflow-y-auto"
      onClick={blockClose ? () => {} : onClose}
      aria-modal
      tabIndex={-1}
      role="dialog"
    >
      <div
        className={clsx(
          "absolute z-[10000] bg-white p-6 max-w-9/10 sm:w-full max-h-screen-80 sm:max-h-none sm:min-h-[calc(100vh)] overflow-y-auto rounded-xl sm:rounded-none sm:!py-4 sm:max-w-full sm:static ",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div
            className={clsx("flex items-start mb-4 gap-4 ", {
              "justify-end": withoutIcons,
              "justify-between": !withoutIcons,
            })}
          >
            {!withoutIcons && status !== "warning" && (
              <div className="size-12 relative items-center justify-center flex my-auto">
                <div
                  className={clsx("absolute w-full h-full border rounded-xl", {
                    "bg-white": status === "normal",
                    [colors[status].secondary]: status !== "normal",
                  })}
                />
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-circular ${colors[status].primary}`}
                />
                <Icon
                  className={clsx(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20",
                    {
                      "text-primary-gray-900": status === "normal",
                    }
                  )}
                />
              </div>
            )}

            {status === "warning" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="rounded"
              >
                <rect width="24" height="24" fill="#ffffff" rx="4" />

                <path
                  fill="none"
                  stroke="#111827"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 3.75h6M4.5 6.75h15M18.75 6.75l-.75 12.75a2.25 2.25 0 01-2.25 2.25H8.25a2.25 2.25 0 01-2.25-2.25l-.75-12.75m10.5 0V5.25A2.25 2.25 0 0012 3H9a2.25 2.25 0 00-2.25 2.25v1.5"
                />
              </svg>
            )}
            <div className="flex flex-col gap-1 ">
              <h1 className="text-gray-900 text-lg font-semibold my-auto ">
                {" "}
                {titleHeader}{" "}
              </h1>
              {description && (
                <RenderHTML
                  rawHTML={description}
                  tag="p"
                  className="text-sm text-gray-600 font-normal"
                />
              )}
            </div>

            <button
              className="outline-none"
              onClick={blockClose ? () => {} : () => onClose()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  className="stroke-primary-700"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {status !== "warning" && status !== "suport" && <hr />}
        </div>

        <div className="flex flex-col gap-1 ">
          <h1 className="text-gray-900 text-lg font-semibold my-auto z-[100]">
            {" "}
            {subtitle}{" "}
          </h1>
          {descriptionAction && (
            <RenderHTML
              rawHTML={descriptionAction}
              tag="p"
              className="text-sm text-gray-600 font-normal z-[100]"
            />
          )}
        </div>

        {children}
      </div>
    </div>
  ) : null;
}
