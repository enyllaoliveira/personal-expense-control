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
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="10" width="4" height="11" />
      <rect x="10" y="6" width="4" height="15" />
      <rect x="17" y="3" width="4" height="18" />
      <path d="M22 6L15 13l-4-4-5 5" />
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
      document.body.style.overflowY = "auto";
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-circular" />
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
              <div className="absolute p-2 border rounded-xl">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.3333 4.99984V4.33317C13.3333 3.39975 13.3333 2.93304 13.1517 2.57652C12.9919 2.26292 12.7369 2.00795 12.4233 1.84816C12.0668 1.6665 11.6001 1.6665 10.6667 1.6665H9.33333C8.39991 1.6665 7.9332 1.6665 7.57668 1.84816C7.26308 2.00795 7.00811 2.26292 6.84832 2.57652C6.66667 2.93304 6.66667 3.39975 6.66667 4.33317V4.99984M8.33333 9.58317V13.7498M11.6667 9.58317V13.7498M2.5 4.99984H17.5M15.8333 4.99984V14.3332C15.8333 15.7333 15.8333 16.4334 15.5608 16.9681C15.3212 17.4386 14.9387 17.821 14.4683 18.0607C13.9335 18.3332 13.2335 18.3332 11.8333 18.3332H8.16667C6.76654 18.3332 6.06647 18.3332 5.53169 18.0607C5.06129 17.821 4.67883 17.4386 4.43915 16.9681C4.16667 16.4334 4.16667 15.7333 4.16667 14.3332V4.99984"
                    className="stroke-gray-900"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
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
                  className="stroke-black"
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
