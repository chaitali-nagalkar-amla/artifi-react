export interface IUserImageProps {
  viewCode: any;
  type: any;
  imgWidgetData: any;
}

export interface IImageUpdater {
  details: (imageRuleData: any, widgetData: any, onSelectAction: (imageValue: any) => void, onSelectWidget?: any) => any;
  widgetId: string;
  viewCode: string;
  allowAddFlag: any;

}

export interface IImageProps {
  src: string,
  height: number,
  width: number,
  widgetId?: string,
  viewCode?: string,
  deleteWidget?: boolean
}

export interface ImageListProps {
  imageWidgets: Array<IImageWidgetsData>;
  viewCode: any;
}

export interface IImageWidgetsData {
  id: string;
  placeholder: string;
  src: string;
  viewId: string
}

export interface ImageWidgetListProps {
  imageWidgets: any;
  ruleData: any;
  onUpdate: (imageData: any) => void;
}
