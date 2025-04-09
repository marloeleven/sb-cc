import { Aside } from "@/components/home/aside";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ContentLayout } from "../content-layout";
import { Content } from "./content";

export function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
export function Home() {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  return <ContentLayout aside={<Aside />} content={<Content />} />;
}
