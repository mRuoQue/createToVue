/// <reference types="vite/client" />

declare module "*.vue" {
  import { ComponentOptions } from "vue";
  const componentOptions: ComponentOptions;
  export default componentOptions;
}
declare module "vue-cropperjs";

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
