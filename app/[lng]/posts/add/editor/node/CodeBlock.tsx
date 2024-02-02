import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';

type Props = {
  node: any;
  updateAttributes: any;
  extension: any;
};

const CodeBlock = ({
  node: {
    attrs: { language: defaultLanguage },
  },
  updateAttributes,
  extension,
}: Props) => {
  return (
    <NodeViewWrapper className="code-block" style={{ position: 'relative' }}>
      <select
        className="absolute right-1.5 top-1.5"
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(event) => updateAttributes({ language: event.target.value })}
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {extension.options.lowlight
          .listLanguages()
          .map((lang: any, index: number) => (
            <option key={index} value={lang}>
              {lang}
            </option>
          ))}
      </select>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlock;
