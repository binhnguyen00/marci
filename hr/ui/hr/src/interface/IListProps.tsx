/**
 * Interface for List component properties.
 * To be extended by all List components.
 *
 * @interface IListProps
 * @property {string} [title] - [Optional] The title of the list.
 * @property {number} [height] - [Optional] The height of the list.
 * @property {function} [onModify] - [Optional] A callback function to be called when the list is modified.
 */
export interface IListProps {
  title?: string;
  height?: number;
  onModify?: (field: string, newValue: any, rollbackValue: any) => void;
  sqlArgs?: any;
  isSelector?: boolean;
  selectRowsCallBack?: (selectedRecords: any[]) => void;
}
