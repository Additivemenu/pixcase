"use client";

import { CaseColor } from "@prisma/client";
import React, { useRef, useEffect } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { cn } from "@/lib/utils";

const PhonePreview = ({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string;
  color: CaseColor;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [renderedDimensions, setRenderedDimensions] = React.useState({
    height: 0,
    width: 0,
  });

  const handleResize = () => {
    if (!ref.current) return;
    const { height, width } = ref.current.getBoundingClientRect();
    setRenderedDimensions({ height, width });
  };
  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // avoid memory leak
  }, [ref.current]);

  let caseBackground = "bg-zinc-950";
  if (color === "blue") {
    caseBackground = "bg-blue-950";
  }
  if (color === "rose") {
    caseBackground = "bg-rose-950";
  }

  return (
    // the wired numbers are for placing img in the center
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          left:
            renderedDimensions.width / 2 -
            renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22,
        }}
      >
        <img
          width={renderedDimensions.width / (3000 / 637)}
          className={cn(
            "phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
            caseBackground
          )}
          src={croppedImageUrl}
        />
      </div>

      <div className="relative h-full w-full z-40">
        <img
          alt="phone"
          src="/clearphone.png"
          className="pointer-events-none h-full w-full antialiased rounded-md"
        />
      </div>
    </AspectRatio>
  );
};

export default PhonePreview;