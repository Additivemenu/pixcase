import { db } from "@/db";
import { notFound } from "next/navigation";
import React from "react";
import DesignConfigurator from "./DesignConfigurator";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
// step2: custom design
const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;   // url pass configuration id to this page (cross page communication)
  if (!id || typeof id !== "string") {
    return notFound();
  }

  // fetch configuration from db (// we just save configuration data in db in step1)
  const configuration = await db.configuration.findUnique({
    where: { id },
  });
  if (!configuration) {
    return notFound();
  }

  const { imageUrl, width, height } = configuration;  

  return (
    <DesignConfigurator
      configId={configuration.id}
      imageUrl={imageUrl}
      imageDimensions={{ width, height }}
    />
  );
};

export default Page;
