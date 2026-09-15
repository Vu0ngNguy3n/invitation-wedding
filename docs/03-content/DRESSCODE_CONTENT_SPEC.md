# Dress Code Content Specification

Use the existing wedding content/config source, typically `src/config/weddingData.ts`.

Do not create duplicate runtime data files unless current architecture requires it.

## Content

Title:
`DRESS CODE`

Vietnamese:
`Nam: Xin vui lòng mặc vest`

English:
`Gentlemen: Kindly wear a suit`

Palette labels:
- Beige
- Pastel Pink
- Pastel Blue

Recommended values:
- Beige `#E9D8C6`
- Pastel Pink `#F1CDD3`
- Pastel Blue `#CFE1E8`

Accessibility text:
`Màu gợi ý: Beige · Pastel Pink · Pastel Blue`

Conceptual data shape:

```ts
dressCode: {
  title: "DRESS CODE",
  colors: [
    { name: "Beige", value: "#E9D8C6" },
    { name: "Pastel Pink", value: "#F1CDD3" },
    { name: "Pastel Blue", value: "#CFE1E8" }
  ],
  noteVi: "Nam: Xin vui lòng mặc vest",
  noteEn: "Gentlemen: Kindly wear a suit"
}
```

Adapt to existing project types/naming conventions.
