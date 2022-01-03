export const modules = options => ({
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "link"],
    [
      { list: "ordered" },
      { list: "bullet" },
    ],
    ['clean']
  ]
});

export const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "color",
  "clean"
];
