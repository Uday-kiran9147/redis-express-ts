/**
 * Jest configuration file.
 * 
 * This configuration file is used to set up Jest for a TypeScript project.
 * It specifies the transform property to use `@swc/jest` for transforming
 * files with `.ts`, `.tsx`, `.js`, and `.jsx` extensions.
 * 
 * @property {Object} transform - An object specifying how to transform files.
 * @property {string} transform.^.+\\.(t|j)sx?$ - A regex pattern to match file extensions.
 * @property {Array} transform.^.+\\.(t|j)sx?$ - An array specifying the transformer to use.
 */
export default {
    transform: {
      "^.+\\.(t|j)sx?$": ["@swc/jest"],
    },
  };