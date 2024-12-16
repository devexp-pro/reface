type ClassObject = Record<string, boolean>;
type StyleObject = Record<string, string | number>;

type SingleClassValue = string | ClassObject;
type SingleStyleValue = string | StyleObject;

export type ClassValue = SingleClassValue | SingleClassValue[];
export type StyleValue = SingleStyleValue | SingleStyleValue[];

export type BaseAttributes = {
  class?: ClassValue;
  style?: StyleValue;
  id?: string;
  [key: string]: unknown;
};

export interface HTMLAttributes extends BaseAttributes {}
