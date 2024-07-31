/**
 * Interface for Form component properties.
 * To be extended by all Form components.
 * 
 * @interface IFormProps
 * @property {any} [entity] - The entity which is passed from parent and to be modified.
 * @property {function} [reloadParent] - A callback function to be called when the form is submitted.
 */
export interface IFormProps {
  entity?: any;
  reloadParent?: () => void;
}