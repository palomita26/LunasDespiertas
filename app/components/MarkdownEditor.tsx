import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";

export default function MarkdownEditor({
  value,
  onChange,
  className,
}: MDEditorProps) {
  return (
    <div className={className}>
      <MDEditor height={1000} value={value} onChange={onChange} />
      {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
    </div>
  );
}
