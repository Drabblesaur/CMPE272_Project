import DataSetBuilder from "./apigen";
import MarkdownDisplay from "./MarkdownDisplay";
import CustomAPIGen from "./CustomAPIGen";

export default function ProjectContainer({ project }) {
  if (!project) return null;

  return (
    <>
      <DataSetBuilder project={project} />
      <CustomAPIGen project={project} />
      <MarkdownDisplay content={project.code} />
    </>
  );
}
