interface SliderItem {
    title: string;
    imageUrl: string;
}
export interface SliderProps {
    items: SliderItem[];
}
export interface SlideState {
    isFirst: boolean;
    isLast: boolean;
}