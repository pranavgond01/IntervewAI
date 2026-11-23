"use client";

import Editor from "@monaco-editor/react";

type Props = {
  language: string;
  code: string;
  onChange: (value: string) => void;
};

export default function CodingEditor({
  language,
  code,
  onChange,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800 shadow-xl">

      <Editor
        height="600px"
        language={(language ?? "javascript").toLowerCase()}
        theme="vs-dark"
        value={code}
        onChange={(value) =>
          onChange(value || "")
        }
        options={{
          fontSize: 16,

          minimap: {
            enabled: true,
          },

          automaticLayout: true,

          tabSize: 4,

          wordWrap: "on",

          smoothScrolling: true,

          cursorBlinking: "smooth",

          scrollBeyondLastLine: false,

          renderWhitespace: "selection",

          roundedSelection: true,

          formatOnPaste: true,

          formatOnType: true,

          autoIndent: "advanced",

          lineNumbers: "on",

          glyphMargin: true,

          folding: true,

          bracketPairColorization: {
            enabled: true,
          },
        }}
      />

    </div>
  );
}