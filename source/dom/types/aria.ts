// ARIA атрибуты
export interface AriaAttributes {
  // Роли и состояния
  role?:
    | "button"
    | "checkbox"
    | "dialog"
    | "gridcell"
    | "link"
    | "menuitem"
    | "menuitemcheckbox"
    | "menuitemradio"
    | "option"
    | "progressbar"
    | "radio"
    | "scrollbar"
    | "searchbox"
    | "slider"
    | "spinbutton"
    | "switch"
    | "tab"
    | "tabpanel"
    | "textbox"
    | "treeitem";
  "aria-expanded"?: boolean;
  "aria-pressed"?: boolean | "mixed";
  "aria-selected"?: boolean;
  "aria-checked"?: boolean | "mixed";
  "aria-disabled"?: boolean;
  "aria-hidden"?: boolean;
  "aria-invalid"?: boolean | "grammar" | "spelling";
  "aria-required"?: boolean;

  // Взаимосвязи
  "aria-controls"?: string;
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  "aria-owns"?: string;
  "aria-flowto"?: string;

  // Живые регионы
  "aria-live"?: "off" | "polite" | "assertive";
  "aria-atomic"?: boolean;
  "aria-relevant"?: "additions" | "removals" | "text" | "all";
  "aria-busy"?: boolean;

  // Drag & Drop
  "aria-grabbed"?: boolean;
  "aria-dropeffect"?: "none" | "copy" | "move" | "link" | "execute" | "popup";

  // Значения и диапазоны
  "aria-valuemin"?: number;
  "aria-valuemax"?: number;
  "aria-valuenow"?: number;
  "aria-valuetext"?: string;

  // Структура документа
  "aria-level"?: number;
  "aria-setsize"?: number;
  "aria-posinset"?: number;
}
