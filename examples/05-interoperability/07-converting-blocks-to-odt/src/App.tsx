import {
  BlockNoteSchema,
  combineByGroup,
  filterSuggestionItems,
  withPageBreak,
} from "@blocknote/core";
import * as locales from "@blocknote/core/locales";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import {
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  getPageBreakReactSlashMenuItems,
  useCreateBlockNote,
} from "@blocknote/react";
import {
  ODTExporter,
  odtDefaultSchemaMappings,
} from "@blocknote/xl-odt-exporter";
import {
  getMultiColumnSlashMenuItems,
  multiColumnDropCursor,
  locales as multiColumnLocales,
  withMultiColumn,
} from "@blocknote/xl-multi-column";
import { useMemo } from "react";

import "./styles.css";

export default function App() {
  // Creates a new editor instance with some initial content.
  const editor = useCreateBlockNote({
    schema: withMultiColumn(withPageBreak(BlockNoteSchema.create())),
    dropCursor: multiColumnDropCursor,
    dictionary: {
      ...locales.en,
      multi_column: multiColumnLocales.en,
    },
    tables: {
      splitCells: true,
      cellTextColor: true,
      cellBackgroundColor: true,
    },
    initialContent: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Welcome to this ",
            styles: {
              italic: true,
            },
          },
          {
            type: "text",
            text: "demo!",
            styles: {
              italic: true,
              bold: true,
            },
          },
        ],
        children: [
          {
            type: "paragraph",
            content: "Hello World nested",
            children: [
              {
                type: "paragraph",
                content: "Hello World double nested",
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This paragraph has a background color",
            styles: { bold: true },
          },
        ],
        props: {
          backgroundColor: "red",
        },
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "This one too, but it's blue",
            styles: { italic: true },
          },
        ],
        props: {
          backgroundColor: "blue",
        },
      },
      {
        type: "paragraph",
        content: "Paragraph",
      },
      {
        type: "heading",
        content: "Heading",
      },
      {
        type: "heading",
        content: "Heading right",
        props: {
          textAlignment: "right",
        },
      },
      {
        type: "paragraph",
        content:
          "justified paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

        props: {
          textAlignment: "justify",
        },
      },
      {
        type: "bulletListItem",
        content:
          "Bullet List Item.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        children: [
          {
            type: "bulletListItem",
            content:
              "Bullet List Item.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          },
          {
            type: "bulletListItem",
            content:
              "Bullet List Item.  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            props: {
              textAlignment: "right",
            },
          },
          {
            type: "numberedListItem",
            content: "Numbered List Item 1",
          },
          {
            type: "numberedListItem",
            content: "Numbered List Item 2",
            children: [
              {
                type: "numberedListItem",
                content: "Numbered List Item Nested 1",
              },
              {
                type: "numberedListItem",
                content: "Numbered List Item Nested 2",
              },
              {
                type: "numberedListItem",
                content: "Numbered List Item Nested funky right",
                props: {
                  textAlignment: "right",
                  backgroundColor: "red",
                  textColor: "blue",
                },
              },
              {
                type: "numberedListItem",
                content: "Numbered List Item Nested funky center",
                props: {
                  textAlignment: "center",
                  backgroundColor: "red",
                  textColor: "blue",
                },
              },
            ],
          },
        ],
      },
      {
        type: "numberedListItem",
        content: "Numbered List Item",
      },
      {
        type: "checkListItem",
        content: "Check List Item",
      },
      {
        type: "table",
        content: {
          type: "tableContent",
          rows: [
            {
              cells: ["Table Cell", "Table Cell", "Table Cell"],
            },
            {
              cells: ["Table Cell", "Table Cell", "Table Cell"],
            },
            {
              cells: ["Table Cell", "Table Cell", "Table Cell"],
            },
          ],
        },
      },
      {
        type: "pageBreak",
      },
      {
        type: "file",
      },
      {
        type: "image",
        props: {
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
          caption:
            "From https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
        },
      },
      {
        type: "image",
        props: {
          previewWidth: 200,
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
          textAlignment: "right",
        },
      },
      {
        type: "video",
        props: {
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
          caption:
            "From https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
        },
      },
      {
        type: "audio",
        props: {
          url: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
          caption:
            "From https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
        },
      },
      {
        type: "paragraph",
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Inline Content:",
            styles: { bold: true },
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Styled Text",
            styles: {
              bold: true,
              italic: true,
              textColor: "red",
              backgroundColor: "blue",
            },
          },
          {
            type: "text",
            text: " ",
            styles: {},
          },
          {
            type: "link",
            content: "Link",
            href: "https://www.blocknotejs.org",
          },
        ],
      },
      {
        type: "table",
        content: {
          type: "tableContent",
          rows: [
            {
              cells: ["Table Cell 1", "Table Cell 2", "Table Cell 3"],
            },
            {
              cells: [
                "Table Cell 4",
                [
                  {
                    type: "text",
                    text: "Table Cell Bold 5",
                    styles: {
                      bold: true,
                    },
                  },
                ],
                "Table Cell 6",
              ],
            },
            {
              cells: ["Table Cell 7", "Table Cell 8", "Table Cell 9"],
            },
          ],
        },
      },
      {
        type: "codeBlock",
        props: {
          language: "javascript",
        },
        content: `const helloWorld = (message) => {
  console.log("Hello World", message);
};`,
      },
      {
        type: "columnList",
        children: [
          {
            type: "column",
            props: {
              width: 0.8,
            },
            children: [
              {
                type: "paragraph",
                content: "This paragraph is in a column!",
              },
            ],
          },
          {
            type: "column",
            props: {
              width: 1.4,
            },
            children: [
              {
                type: "heading",
                content: "So is this heading!",
              },
            ],
          },
          {
            type: "column",
            props: {
              width: 0.8,
            },
            children: [
              {
                type: "paragraph",
                content: "You can have multiple blocks in a column too",
              },
              {
                type: "bulletListItem",
                content: "Block 1",
              },
              {
                type: "bulletListItem",
                content: "Block 2",
              },
              {
                type: "bulletListItem",
                content: "Block 3",
              },
            ],
          },
        ],
      },
    ],
  });
  const getSlashMenuItems = useMemo(() => {
    return async (query: string) =>
      filterSuggestionItems(
        combineByGroup(
          getDefaultReactSlashMenuItems(editor),
          getPageBreakReactSlashMenuItems(editor),
          getMultiColumnSlashMenuItems(editor),
        ),
        query,
      );
  }, [editor]);
  const onDownloadClick = async () => {
    const exporter = new ODTExporter(editor.schema, odtDefaultSchemaMappings);

    const blob = await exporter.toODTDocument(editor.document);

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "My Document (blocknote export).odt";
    document.body.appendChild(link);
    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    );
    link.remove();
    window.URL.revokeObjectURL(link.href);
  };

  // Renders the editor instance, and its contents as HTML below.
  return (
    <div>
      <div className={"edit-buttons"}>
        <button className={"edit-button"} onClick={onDownloadClick}>
          Download .odt
        </button>
      </div>
      <div className="item">
        <BlockNoteView editor={editor} slashMenu={false}>
          <SuggestionMenuController
            triggerCharacter={"/"}
            getItems={getSlashMenuItems}
          />
        </BlockNoteView>
      </div>
    </div>
  );
}
