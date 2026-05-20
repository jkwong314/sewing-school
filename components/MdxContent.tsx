import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { MaterialsTable } from "./MaterialsTable";
import { StepList, Step } from "./StepList";
import { Diagram } from "./Diagram";
import {
  JeansMeasureDiagram,
  JeansFoldCrossSection,
  JeansStitchCloseup,
  JeansFinishedDiagram,
  RuffleCutDiagram,
  RuffleTubeDiagram,
  RuffleCasingCrossSection,
  RuffleElasticDiagram,
  RuffleHemCrossSection,
} from "./ProjectDiagrams";

const components: MDXRemoteProps["components"] = {
  MaterialsTable: MaterialsTable as never,
  StepList: StepList as never,
  Step: Step as never,
  Diagram: Diagram as never,
  JeansMeasureDiagram: JeansMeasureDiagram as never,
  JeansFoldCrossSection: JeansFoldCrossSection as never,
  JeansStitchCloseup: JeansStitchCloseup as never,
  JeansFinishedDiagram: JeansFinishedDiagram as never,
  RuffleCutDiagram: RuffleCutDiagram as never,
  RuffleTubeDiagram: RuffleTubeDiagram as never,
  RuffleCasingCrossSection: RuffleCasingCrossSection as never,
  RuffleElasticDiagram: RuffleElasticDiagram as never,
  RuffleHemCrossSection: RuffleHemCrossSection as never,
  h1: (props) => <h1 className="font-display text-4xl text-ink mt-10 mb-4" {...props} />,
  h2: (props) => <h2 className="font-display text-2xl text-ink mt-10 mb-3" {...props} />,
  h3: (props) => <h3 className="font-display text-xl text-ink mt-8 mb-2" {...props} />,
  p: (props) => <p className="text-ink leading-relaxed my-4" {...props} />,
  ul: (props) => <ul className="list-disc list-outside ml-6 my-4 space-y-1 text-ink" {...props} />,
  ol: (props) => <ol className="list-decimal list-outside ml-6 my-4 space-y-1 text-ink" {...props} />,
  a: (props) => (
    <a
      className="text-brown-deep underline decoration-blush decoration-2 underline-offset-4 hover:text-ink"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  blockquote: (props) => (
    <blockquote className="border-l-4 border-blush pl-4 italic text-ink-soft my-6" {...props} />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto dashed-border bg-white">
      <table className="w-full text-left text-ink" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-cream-deep" {...props} />,
  th: (props) => (
    <th
      className="font-mono text-xs uppercase tracking-widest text-brown-deep px-4 py-3 border-b-2 border-border-warm"
      {...props}
    />
  ),
  td: (props) => (
    <td className="px-4 py-3 align-top border-b border-border-warm/50" {...props} />
  ),
};

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};

export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} options={mdxOptions} />;
}
