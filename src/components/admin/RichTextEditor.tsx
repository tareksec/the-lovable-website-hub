import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  Code,
  Undo,
  Redo,
  Type,
  Highlighter,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const MenuButton = ({
  onClick,
  isActive = false,
  disabled = false,
  children,
  title,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`bec-editor-toolbar-btn ${isActive ? "is-active" : ""}`}
  >
    {children}
  </button>
);

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [linkNewTab, setLinkNewTab] = useState(true);

  const [imageTab, setImageTab] = useState<"upload" | "url">("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: {
          HTMLAttributes: {
            class: "rounded-lg bg-slate-900 p-4 text-sm text-slate-200 font-mono",
          },
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#08735d] underline font-semibold",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full mx-auto block my-4",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: placeholder || "Start writing your article here...",
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Update content if it changes externally (e.g. initial load)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  const addLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl, target: linkNewTab ? "_blank" : "" })
        .run();
    }
    setLinkModalOpen(false);
    setLinkUrl("");
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run();
    }
    setImageModalOpen(false);
    setImageUrl("");
    setImageAlt("");
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulate progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 200);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(interval);
      setUploadProgress(100);

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      editor.chain().focus().setImage({ src: data.url }).run();
      setImageModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image. (Ensure /api/admin/upload is implemented)");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
      {/* Sticky Toolbar */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center gap-1 p-2 bg-white border-b border-gray-100">
        <div className="flex items-center">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            title="Bold"
          >
            <Bold size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            title="Italic"
          >
            <Italic size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            title="Underline"
          >
            <UnderlineIcon size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            title="Strikethrough"
          >
            <Strikethrough size={16} />
          </MenuButton>
        </div>

        <div className="bec-editor-toolbar-group-sep" />

        <div className="flex items-center">
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive("heading", { level: 1 })}
            title="H1"
          >
            <Heading1 size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive("heading", { level: 2 })}
            title="H2"
          >
            <Heading2 size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive("heading", { level: 3 })}
            title="H3"
          >
            <Heading3 size={16} />
          </MenuButton>
        </div>

        <div className="bec-editor-toolbar-group-sep" />

        <div className="flex items-center">
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <AlignCenter size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            isActive={editor.isActive({ textAlign: "justify" })}
            title="Justify"
          >
            <AlignJustify size={16} />
          </MenuButton>
        </div>

        <div className="bec-editor-toolbar-group-sep" />

        <div className="flex items-center">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            title="Blockquote"
          >
            <Quote size={16} />
          </MenuButton>
        </div>

        <div className="bec-editor-toolbar-group-sep" />

        <div className="flex items-center">
          <MenuButton
            onClick={() => {
              const previousUrl = editor.getAttributes("link")["href"];
              setLinkUrl(previousUrl || "");
              setLinkModalOpen(true);
            }}
            isActive={editor.isActive("link")}
            title="Link"
          >
            <LinkIcon size={16} />
          </MenuButton>
          <MenuButton onClick={() => setImageModalOpen(true)} title="Image">
            <ImageIcon size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            <Minus size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive("codeBlock")}
            title="Code Block"
          >
            <Code size={16} />
          </MenuButton>
        </div>

        <div className="bec-editor-toolbar-group-sep" />

        <div className="flex items-center">
          <input
            type="color"
            className="w-8 h-8 p-1 rounded cursor-pointer border-none bg-transparent"
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
            title="Text Color"
          />
          <MenuButton
            onClick={() => editor.chain().focus().toggleHighlight({ color: "#fcf003" }).run()}
            isActive={editor.isActive("highlight")}
            title="Highlight"
          >
            <Highlighter size={16} />
          </MenuButton>
        </div>

        <div className="bec-editor-toolbar-group-sep" />

        <div className="flex items-center">
          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo size={16} />
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo size={16} />
          </MenuButton>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="p-8 md:p-10 bg-white">
        <EditorContent editor={editor} />
      </div>

      {/* Modals */}
      <AnimatePresence>
        {linkModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm border border-gray-100"
            >
              <h3 className="text-lg font-bold mb-4">Insert Link</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                    URL
                  </label>
                  <input
                    type="url"
                    autoFocus
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="w-full bec-input py-2 text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="new-tab"
                    checked={linkNewTab}
                    onChange={(e) => setLinkNewTab(e.target.checked)}
                    className="rounded text-[#08735d] focus:ring-[#08735d]"
                  />
                  <label htmlFor="new-tab" className="text-sm text-gray-600">
                    Open in new tab
                  </label>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setLinkModalOpen(false)}
                    className="flex-1 py-2 text-sm font-semibold text-gray-500 hover:bg-gray-50 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addLink}
                    className="flex-1 py-2 text-sm font-semibold text-white bg-[#08735d] hover:bg-[#065c4a] rounded-lg"
                  >
                    Insert Link
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {imageModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Insert Image</h3>
                <button
                  onClick={() => setImageModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="flex gap-4 border-b border-gray-100 mb-6">
                <button
                  onClick={() => setImageTab("upload")}
                  className={`pb-2 text-sm font-bold border-b-2 transition-all ${imageTab === "upload" ? "border-[#08735d] text-[#08735d]" : "border-transparent text-gray-400"}`}
                >
                  Upload Image
                </button>
                <button
                  onClick={() => setImageTab("url")}
                  className={`pb-2 text-sm font-bold border-b-2 transition-all ${imageTab === "url" ? "border-[#08735d] text-[#08735d]" : "border-transparent text-gray-400"}`}
                >
                  Image URL
                </button>
              </div>

              {imageTab === "upload" ? (
                <div className="space-y-4">
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];
                      if (file && file.type.startsWith("image/")) handleImageUpload(file);
                    }}
                    className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#08735d] transition-all cursor-pointer bg-gray-50"
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) handleImageUpload(file);
                      };
                      input.click();
                    }}
                  >
                    {uploading ? (
                      <div className="space-y-3">
                        <div className="text-sm font-bold text-[#08735d]">
                          Uploading... {uploadProgress}%
                        </div>
                        <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            className="bg-[#08735d] h-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <ImageIcon size={32} className="mx-auto mb-3 text-gray-300" />
                        <p className="text-sm text-gray-500">Drag image here or click to browse</p>
                        <p className="text-[10px] text-gray-400 mt-1 uppercase">
                          JPG, PNG, WEBP (Max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full bec-input py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                      Alt Text (SEO)
                    </label>
                    <input
                      type="text"
                      placeholder="Image description"
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      className="w-full bec-input py-2 text-sm"
                    />
                  </div>
                  {imageUrl && (
                    <div className="rounded-lg overflow-hidden border border-gray-100 h-32 bg-gray-50">
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                  )}
                  <button
                    onClick={addImage}
                    disabled={!imageUrl}
                    className="w-full py-3 text-sm font-bold text-white bg-[#08735d] hover:bg-[#065c4a] rounded-lg disabled:opacity-50 transition-all"
                  >
                    Insert Image
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
