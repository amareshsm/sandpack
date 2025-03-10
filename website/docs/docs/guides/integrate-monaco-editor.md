---
sidebar_position: 2
title: Integrate Monaco Editor
---

## Introduction

The [monaco-editor](https://microsoft.github.io/monaco-editor/) is a well-known web technology based code editor that powers VS Code.
This section will guide you on how to use the Monaco Editor in Sandpack

:::info
If you want to jump right into the code check this [**sandbox example**](https://codesandbox.io/s/sandpack-monaco-integration-citxd)
:::

## Install the Monaco library

To use Monaco in Sandpack first we need to install the Monaco library by running the following command:

```
yarn add @monaco-editor/react
```

This library handles the setup process of the Monaco editor and provides a clean API to interact with Monaco from any React environment.
Here is the [GitHub repository](https://github.com/suren-atoyan/monaco-react#readme) if you want to learn more about the library

## Integration

If you are not familiar with the Monaco library this is how a basic `Editor` component looks:

```jsx
import React from "react";
import Editor from "@monaco-editor/react";

function App() {
  return (
    <Editor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
    />
  );
}
```

Now create a component called `MonacoEditor`, and put the Editor component inside a `SandpackStack`.
This is what the `MonacoEditor` component could look like, you can play with the properties to meet your needs.

```jsx
import Editor from "@monaco-editor/react";
import {
  useActiveCode,
  SandpackStack,
  FileTabs,
  useSandpack,
} from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";

function MonacoEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  return (
    <SandpackStack customStyle={{ height: "100vh", margin: 0 }}>
      <FileTabs />
      <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
        <Editor
          width="100%"
          height="100%"
          language="javascript"
          theme="vs-dark"
          key={sandpack.activePath}
          defaultValue={code}
          onChange={(value) => updateCode(value || "")}
        />
      </div>
    </SandpackStack>
  );
}
```

:::info
If you are unfamiliar with any of the code in this guide make sure to check the [**Advances Usage**](https://sandpack.codesandbox.io/docs/advanced-usage/provider) section for a better understanding.
:::

Finally, using a `SandpackProvider` you can integrate the `MonacoEditor` component like the following example:

```jsx
export default function MySandpack() {
  return (
    <SandpackProvider template="react">
      <SandpackLayout theme="dark">
        <MonacoEditor /> // Your Monaco Editor Component
        <SandpackPreview customStyle={{ height: "100vh" }} />
      </SandpackLayout>
    </SandpackProvider>
  );
}
```

Congratulations! 🎉 you can now enjoy the Monaco Editor in Sandpack.
