import MDEditor, { MDEditorProps } from "@uiw/react-md-editor";

export default function MarkdownEditor({ value, onChange }: MDEditorProps) {
  return (
    <div className="container">
      <MDEditor value={value} onChange={onChange} />
      <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
    </div>
  );
}
