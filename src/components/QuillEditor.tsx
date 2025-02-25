"use client";

import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Quill from "quill";

const QuillEditor = forwardRef(
  (
    {
      readOnly,
      defaultValue,
      onChange,
    }: {
      readOnly?: boolean;
      defaultValue?: string;
      onChange?: (html: string) => void;
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);
    const defaultValueRef = useRef(defaultValue);
    const onChangeRef = useRef(onChange);

    // Local state to prevent SSR execution
    const [isClient, setIsClient] = useState(false);

    // Ensure component is mounted before loading Quill
    useEffect(() => {
      setIsClient(true);
    }, []);

    useLayoutEffect(() => {
      onChangeRef.current = onChange;
    });

    useEffect(() => {
      if (!isClient || !containerRef.current || quillRef.current) return;

      const editorContainer = containerRef.current;

      import("quill").then(({ default: Quill }) => {
        if (!editorContainer) return; // Safety check in case it unmounts before this runs

        const quillDiv = document.createElement("div");
        editorContainer.appendChild(quillDiv);

        const quill = new Quill(quillDiv, {
          theme: "snow",
          readOnly: readOnly || false,
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          },
        });

        quillRef.current = quill;

        if (typeof ref === "function") {
          ref(quill);
        } else if (ref) {
          (ref as React.MutableRefObject<Quill | null>).current = quill;
        }

        if (defaultValueRef.current) {
          quill.root.innerHTML = defaultValueRef.current;
        }

        quill.on(Quill.events.TEXT_CHANGE, () => {
          onChangeRef.current?.(quill.root.innerHTML);
        });
      });

      return () => {
        if (!editorContainer) return; // Ensure container still exists before cleanup

        if (typeof ref === "function") {
          ref(null);
        } else if (ref) {
          (ref as React.MutableRefObject<Quill | null>).current = null;
        }

        quillRef.current = null;
        editorContainer.innerHTML = "";
      };
    }, [isClient, readOnly, ref]);

    return isClient ? (
      <div ref={containerRef} className="rounded-lg border" />
    ) : null;
  },
);

QuillEditor.displayName = "QuillEditor";

export default QuillEditor;
