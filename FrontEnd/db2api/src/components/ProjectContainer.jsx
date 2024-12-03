import DataSetBuilder from "./apigen";
import MarkdownDisplay from "./MarkdownDisplay";
import CustomAPIGen from "./CustomAPIGen";

export default function ProjectContainer({
  project,
  updateSchema,
  updateCode,
}) {
  if (!project) return null;

  return (
    <>
      <DataSetBuilder
        project={project}
        updateSchema={updateSchema}
        updateCode={updateCode}
      />
      <CustomAPIGen project={project} />
      <MarkdownDisplay content={project.code} />
    </>
  );
}
