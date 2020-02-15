import { Ref } from '@vue/composition-api';
export interface IDimenstions {
    width: number;
    height: number;
}
export interface IUseWithSizeParams {
    elementRef: Ref<Element>;
    onResize?: Function;
}
declare const useWithSize: ({ elementRef, onResize }?: IUseWithSizeParams) => Readonly<Ref<Readonly<{
    width: number;
    height: number;
}>>>;
export default useWithSize;
