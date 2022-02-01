import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import type { Story } from "@storybook/react";
import * as React from "react";

import { Sandpack } from "../../";
import { SandpackProvider } from "../../contexts/sandpackContext";
import { SandpackThemeProvider } from "../../contexts/themeContext";
import { SandpackPreview } from "../Preview";

import type { CodeEditorProps } from "./index";
import { SandpackCodeEditor } from "./index";

export default {
  title: "components/Code Editor",
  component: SandpackCodeEditor,
};

export const Component: Story<CodeEditorProps> = (args) => (
  <SandpackProvider
    files={{
      "/index.js": {
        code: 'const title = "This is a simple code editor"',
      },
    }}
    customSetup={{
      entry: "/index.js",
    }}
  >
    <SandpackThemeProvider>
      <SandpackCodeEditor {...args} />
    </SandpackThemeProvider>
  </SandpackProvider>
);

export const InlineError: React.FC = () => (
  <SandpackProvider template="react">
    <SandpackThemeProvider>
      <SandpackCodeEditor showInlineErrors showLineNumbers />
      <SandpackPreview />
    </SandpackThemeProvider>
  </SandpackProvider>
);

export const ReactCode: React.FC = () => (
  <SandpackProvider template="react">
    <SandpackThemeProvider>
      <SandpackCodeEditor showLineNumbers />
    </SandpackThemeProvider>
  </SandpackProvider>
);

export const VueCode: React.FC = () => (
  <SandpackProvider template="vue">
    <SandpackThemeProvider>
      <SandpackCodeEditor />
    </SandpackThemeProvider>
  </SandpackProvider>
);

export const DarkTheme: React.FC = () => (
  <SandpackProvider template="vue">
    <SandpackThemeProvider theme="dark">
      <SandpackCodeEditor />
    </SandpackThemeProvider>
  </SandpackProvider>
);

export const ClosableTabs: React.FC = () => (
  <SandpackProvider template="react">
    <SandpackThemeProvider theme="dark">
      <SandpackCodeEditor closableTabs />
    </SandpackThemeProvider>
  </SandpackProvider>
);

export const ExtensionAutocomplete: React.FC = () => (
  <SandpackProvider template="react">
    <SandpackThemeProvider>
      <SandpackCodeEditor
        extensions={[autocompletion()]}
        extensionsKeymap={[completionKeymap]}
        id="extensions"
      />
    </SandpackThemeProvider>
  </SandpackProvider>
);

export const ReadOnly: React.FC = () => {
  return (
    <>
      <p>Read-only by file</p>
      <Sandpack
        customSetup={{ entry: "/index.tsx" }}
        files={{
          "/index.tsx": { code: "", hidden: true },
          "/src/App.tsx": { code: "Hello", readOnly: true, active: true },
          "/src/components/button.tsx": { code: "World", readOnly: false },
        }}
        options={{ showTabs: true, activePath: "/App.tsx" }}
        template="react-ts"
      />

      <p>Read-only global</p>
      <Sandpack
        options={{ showTabs: true, readOnly: true }}
        template="react-ts"
      />

      <p>Read-only global and by file</p>
      <Sandpack
        files={{
          "/index.tsx": { code: "", hidden: true },
          "/src/App.tsx": { code: "Hello", readOnly: true },
          "/src/components/button.tsx": { code: "World", readOnly: false },
        }}
        options={{ showTabs: false, readOnly: true }}
        template="react-ts"
      />

      <p>Read-only global, but no label</p>
      <Sandpack
        files={{
          "/index.tsx": { code: "", hidden: true },
          "/src/App.tsx": { code: "Hello", readOnly: true },
          "/src/components/button.tsx": { code: "World", readOnly: false },
        }}
        options={{ showTabs: false, readOnly: true, showReadOnly: false }}
        template="react-ts"
      />

      <p>Read-only by file, but no label</p>
      <Sandpack
        files={{
          "/index.tsx": { code: "", hidden: true },
          "/src/App.tsx": { code: "Hello", readOnly: true, active: true },
          "/src/components/button.tsx": { code: "World", readOnly: false },
        }}
        options={{ showTabs: true, readOnly: false, showReadOnly: false }}
        template="react-ts"
      />
    </>
  );
};
