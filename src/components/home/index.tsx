import { Aside } from "@/components/home/aside";
import { ContentLayout } from "../content-layout";
import { Content } from "./content";

export function Home() {
  return <ContentLayout aside={<Aside />} content={<Content />} />;
}
