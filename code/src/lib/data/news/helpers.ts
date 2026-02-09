type LexicalNode = {
  type?: string;
  text?: string;
  children?: LexicalNode[];
};

export const formatArticleDate = (value?: string | null) => {
  if (!value) {
    return "Unpublished";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unpublished";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const nodeToText = (node: LexicalNode): string => {
  if (typeof node.text === "string") {
    return node.text;
  }

  if (!Array.isArray(node.children)) {
    return "";
  }

  const childrenText = node.children.map(nodeToText).join("");

  if (node.type === "paragraph") {
    return childrenText.length > 0 ? `${childrenText}\n\n` : "";
  }

  if (node.type === "linebreak") {
    return "\n";
  }

  return childrenText;
};

export const lexicalToText = (value: unknown) => {
  if (typeof value === "string") {
    return value;
  }

  if (!value || typeof value !== "object") {
    return "";
  }

  const root = (value as { root?: LexicalNode }).root;

  if (!root || !Array.isArray(root.children)) {
    return "";
  }

  return root.children.map(nodeToText).join("").trim();
};

export const resolveMediaUrl = (value: unknown) => {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const url = (value as { url?: string }).url;
  return typeof url === "string" && url.length > 0 ? url : undefined;
};
