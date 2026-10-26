"use client";

import { useState } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import type { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading2,
  Heading3,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Redo2,
  Undo2,
  Unlink,
} from "lucide-react";
import { toArticleHtml } from "@/lib/blog-content";

type RichTextEditorProps = {
  id: string;
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

// Tambahkan https:// jika admin hanya menulis "example.com"
function normalizeUrl(value: string) {
  const url = value.trim();
  if (!url) return "";
  if (/^(https?:\/\/|mailto:)/i.test(url)) return url;
  return `https://${url}`;
}

export default function RichTextEditor({
  id,
  value,
  onChange,
  placeholder = "Write your article here...",
}: RichTextEditorProps) {
  const editor = useEditor({
    // Hindari hydration mismatch di Next.js App Router
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        code: false,
        codeBlock: false,
        horizontalRule: false,
        strike: false,
        underline: false,
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
          protocols: ["http", "https", "mailto"],
        },
      }),
    ],
    // Konten lama berupa plain text dikonversi ke paragraf HTML
    content: toArticleHtml(value),
    editorProps: {
      attributes: {
        id,
        role: "textbox",
        "aria-multiline": "true",
        "aria-label": "Article content",
        class:
          "rich-content min-h-[320px] px-5 py-4 text-base leading-8 text-black/80 outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.isEmpty ? "" : editor.getHTML());
    },
  });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white focus-within:border-[#880A18]">
      {editor ? (
        <>
          <Toolbar editor={editor} />
          <div className="relative">
            {editor.isEmpty && (
              <p className="pointer-events-none absolute left-5 top-4 text-base leading-8 text-black/35">
                {placeholder}
              </p>
            )}
            <EditorContent editor={editor} />
          </div>
        </>
      ) : (
        <div className="min-h-[370px] animate-pulse bg-[#FCFAF7]" />
      )}
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  // Re-render toolbar hanya saat status format berubah
  const state = useEditorState({
    editor,
    selector: ({ editor }) => ({
      // Paragraf di dalam list/quote tidak dihitung sebagai Paragraph aktif
      paragraph:
        editor.isActive("paragraph") &&
        !editor.isActive("bulletList") &&
        !editor.isActive("orderedList") &&
        !editor.isActive("blockquote"),
      h2: editor.isActive("heading", { level: 2 }),
      h3: editor.isActive("heading", { level: 3 }),
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      bulletList: editor.isActive("bulletList"),
      orderedList: editor.isActive("orderedList"),
      blockquote: editor.isActive("blockquote"),
      link: editor.isActive("link"),
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    }),
  });

  function openLinkForm() {
    setLinkUrl(editor.getAttributes("link").href ?? "");
    setLinkOpen(true);
  }

  function applyLink() {
    const href = normalizeUrl(linkUrl);
    const chain = editor.chain().focus().extendMarkRange("link");

    if (href) {
      chain.setLink({ href }).run();
    } else {
      chain.unsetLink().run();
    }

    setLinkOpen(false);
  }

  function removeLink() {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setLinkOpen(false);
  }

  return (
    <div className="border-b border-gray-200 bg-[#FCFAF7]">
      <div className="flex flex-wrap items-center gap-1 px-2 py-2">
        <ToolbarButton
          label="Paragraph"
          active={state.paragraph}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <Pilcrow size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Heading 2"
          active={state.h2}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Heading 3"
          active={state.h3}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 size={16} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          label="Bold"
          active={state.bold}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={state.italic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          label="Bullet list"
          active={state.bulletList}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={state.orderedList}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Quote"
          active={state.blockquote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote size={16} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          label="Add link"
          active={state.link || linkOpen}
          onClick={() => (linkOpen ? setLinkOpen(false) : openLinkForm())}
        >
          <LinkIcon size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Remove link"
          disabled={!state.link}
          onClick={removeLink}
        >
          <Unlink size={16} />
        </ToolbarButton>

        <div className="ml-auto flex items-center gap-1">
          <ToolbarButton
            label="Undo"
            disabled={!state.canUndo}
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo2 size={16} />
          </ToolbarButton>
          <ToolbarButton
            label="Redo"
            disabled={!state.canRedo}
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo2 size={16} />
          </ToolbarButton>
        </div>
      </div>

      {linkOpen && (
        <div className="flex flex-wrap items-center gap-2 border-t border-gray-200 px-3 py-2">
          <input
            type="url"
            value={linkUrl}
            autoFocus
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={(e) => {
              // Enter jangan submit form artikel
              if (e.key === "Enter") {
                e.preventDefault();
                applyLink();
              }
              if (e.key === "Escape") setLinkOpen(false);
            }}
            placeholder="https://example.com"
            aria-label="Link URL"
            className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-[#880A18]"
          />
          <button
            type="button"
            onClick={applyLink}
            className="rounded-full bg-[#880A18] px-4 py-1.5 text-sm font-semibold text-white hover:bg-[#6E0814]"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={() => setLinkOpen(false)}
            className="rounded-full px-3 py-1.5 text-sm font-semibold text-black/60"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

function ToolbarButton({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      // Jaga seleksi teks di editor saat tombol diklik
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-lg transition disabled:cursor-not-allowed disabled:opacity-30 ${
        active
          ? "bg-[#880A18] text-white"
          : "text-black/70 hover:bg-[#FFCA18]/30 hover:text-[#880A18]"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-6 w-px bg-gray-300" aria-hidden="true" />;
}
