import { ComponentCustomProperties } from "vue";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    copyToClipboard: (text: string, message?: string) => void;
    numberToAccounting: (amount: stirng | number, symbol?: string) => string;
    addressShorten: (
      address: string,
      front: number = 6,
      end: number = -4
    ) => string;
  }
}

export {};
