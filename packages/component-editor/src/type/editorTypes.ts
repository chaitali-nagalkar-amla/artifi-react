export interface IRulePropsType {
  allow?: boolean;
  Allow?: boolean;
  value?: any;
  defaultValue?: string;
  extra?: any;
  message?: string;
  caption?: string;
}

export interface ITextRule {
  widget_key: string;
  ruleId: string;
  RuleCode: string;
  fontSize: IRulePropsType;
  selectable: IRulePropsType;
  groupedMessage: IRulePropsType;
  numberOfTextLines: IRulePropsType;
  textAlign: IRulePropsType;
  effects: IRulePropsType;
  group_key: IRulePropsType;
  canEdit: IRulePropsType;
  caption: IRulePropsType;
  characterLimit: IRulePropsType;
  verticalTextAlign: IRulePropsType;
  price_key: IRulePropsType;
  visible: IRulePropsType;
  text: IRulePropsType;
  textValidation: IRulePropsType;
  showOnOutput: IRulePropsType;
  placeholderText: IRulePropsType;
  canControlVisibility: IRulePropsType;
  fontFamily: IRulePropsType;
  custom_key: IRulePropsType;
  isRequired: IRulePropsType;
  allowScale: IRulePropsType;
  noOfTextLines: IRulePropsType;
  textValidations: IRulePropsType;
  allowMove: IRulePropsType;
  bold: IRulePropsType;
  allowRotation: IRulePropsType;
  italic: IRulePropsType;
  allowDelete: IRulePropsType;
  arrange: IRulePropsType;
  textColor: IRulePropsType;
  resetToDefault: IRulePropsType;
  applyOneColorImprint: IRulePropsType;
  allowSpellcheck: IRulePropsType;
  namelist: IRulePropsType;
  rotate180Degree: IRulePropsType;
  defaultHeight: IRulePropsType;
  defaultWidth: IRulePropsType;
  defaultLeft: IRulePropsType;
  defaultTop: IRulePropsType;
  strokeWidth: IRulePropsType;
  stroke: IRulePropsType;
  textDecoration: IRulePropsType;
  lineHeight: IRulePropsType;
  vAlign: IRulePropsType;
}

export interface IProductViewsData {
  Image: string;
  ImageUniqueName: string;
  Width: number;
  Height: number;
  CanvasUnit: string;
  ProductUnit: string;
  GroupId: number;
  GroupName: string;
  GroupDisplayName: string;
  GroupDisplayOrder: number;
  ProductId: number;
  Views: Array<ICanvasViews>;
}

export interface ICanvasViews {
  Id: number;
  Name: string;
  Code: string;
  DisplayName: string;
  DisplayOrder: number;
  TemplateId: number;
  IsHidden: boolean;
  IsNote: number;
  Note: string;
}

export interface ITemplate {
  Name: string;
  ImageUniqueName: number;
  IsPublic: boolean;
  CanvasWidth: number;
  CanvasHeight: number;
  PrintWidth: number;
  PrintHeight: number;
  CanvasX: number;
  CanvasY: number;
  TemplateCode?: string;
  DisplayImageUniqueName?: string;
  DisplayImageUrl?: string;
  DisplayName?: string;
  DecorationMethodId?: number;
  Id?: number;
  ConstraintsJson?: any;
  DesignJson?: any;
}

export interface IProductVariantData {
  Rules: any;
  ProductViews: Array<IProductViewsData>;
  Templates: any;
  UsedAssetsInDesign: any;
  DecorationMethods?: any;
}

export interface IWidgetAllowed {
  textbox: {
    allow: boolean;
    ruleId: number;
  };
  image: {
    allow: boolean;
    ruleId: number;
  };
  circleText: {
    allow: boolean;
    ruleId: number;
  };
}

export interface ITextBoxRule {
  widget_key: string;
  ruleId: string;
  ruleCode: string;
  fontSize: IRulePropsType;
  allowSelection: IRulePropsType;
  groupedMessage: IRulePropsType;
  numberOfTextLines: IRulePropsType;
  textAlign: IRulePropsType;
  effects: IRulePropsType;
  group_key: IRulePropsType;
  allowEditable: IRulePropsType;
  caption: IRulePropsType;
  characterLimit: IRulePropsType;
  verticalTextAlign: IRulePropsType;
  price_key: IRulePropsType;
  visible: IRulePropsType;
  text: IRulePropsType;
  textValidation: IRulePropsType;
  showOnOutput: IRulePropsType;
  placeholderText: IRulePropsType;
  noOfTextLines: IRulePropsType;
  textValidations: IRulePropsType;
  canControlVisibility: IRulePropsType;
  fontFamily: IRulePropsType;
  custom_key: IRulePropsType;
  isRequired: IRulePropsType;
  allowScale: IRulePropsType;
  allowMove: IRulePropsType;
  bold: IRulePropsType;
  allowRotation: IRulePropsType;
  italic: IRulePropsType;
  allowDelete: IRulePropsType;
  arrange: IRulePropsType;
  textColor: IRulePropsType;
  resetToDefault: IRulePropsType;
  applyOneColorImprint: IRulePropsType;
  allowSpellcheck: IRulePropsType;
  name_list: IRulePropsType;
  rotate180Degree: IRulePropsType;
  defaultHeight: IRulePropsType;
  defaultWidth: IRulePropsType;
  defaultLeft: IRulePropsType;
  defaultTop: IRulePropsType;
  strokeWidth: IRulePropsType;
  stroke: IRulePropsType;
  textDecoration: IRulePropsType;
  lineHeight: IRulePropsType;
  vAlign: IRulePropsType;
  canGrow: IRulePropsType;
}

export interface IImageRule {
  caption: IRulePropsType;
  ruleId: number;
  RuleCode: string;
  widget_key: IRulePropsType;
  selectable: IRulePropsType;
  cliparts: IRulePropsType;
  effects: IRulePropsType;
  allowEditable: IRulePropsType;
  visible: IRulePropsType;
  defaultHeight: IRulePropsType;
  defaultWidth: IRulePropsType;
  defaultLeft: IRulePropsType;
  defaultTop: IRulePropsType;
  showOnOutput: IRulePropsType;
  custom_key: IRulePropsType;
  allowClipartCaption: IRulePropsType;
  allowNoneOption: IRulePropsType;
  userImage: IRulePropsType;
  crop: IRulePropsType;
  allowMove: IRulePropsType;
  allowRotation: IRulePropsType;
  allowScale: IRulePropsType;
  allowDelete: IRulePropsType;
  arrange: IRulePropsType;
  preserveWidgetAspectRatio: IRulePropsType;
  applyOneColorImprint: IRulePropsType;
  widgetBorder: IRulePropsType;
  price_key: IRulePropsType;
  group_key: IRulePropsType;
}

export interface IImageWidgetRule {
  caption: IRulePropsType;
  ruleId: number;
  ruleCode: string;
  widget_key: IRulePropsType;
  allowSelectable: IRulePropsType;
  cliparts: IRulePropsType;
  effects: IRulePropsType;
  selectable: IRulePropsType;
  allowEditable: IRulePropsType;
  visible: IRulePropsType;
  showOnOutput: IRulePropsType;
  custom_key: IRulePropsType;
  allowClipartCaption: IRulePropsType;
  allowNoneOption: IRulePropsType;
  userImage: IRulePropsType;
  crop: IRulePropsType;
  allowMove: IRulePropsType;
  allowRotation: IRulePropsType;
  allowScale: IRulePropsType;
  allowDelete: IRulePropsType;
  arrange: IRulePropsType;
  preserveWidgetAspectRatio: IRulePropsType;
  applyOneColorImprint: IRulePropsType;
  defaultHeight: IRulePropsType;
  defaultWidth: IRulePropsType;
  defaultLeft: IRulePropsType;
  defaultTop: IRulePropsType;
  widgetBorder: IRulePropsType;
  price_key: IRulePropsType;
  group_key: IRulePropsType;
  customFilters: IRulePropsType
}

export const CanvasEvents = {
  // onCanvasObjectModified = "object:modified",
  // onCanvasObjectAdd = "object:added",
  WIDGET_SELECTION_CREATED: "selection:created",
  WIDGET_SELECTION_UPDATED: "selection:updated",
  WIDGET_SELECTION_REMOVED: "selection:cleared",
  WIDGET_MODIFIED: "object:modified",
  // onCanvasObjectMoved = "object:moved",
  //onCanvasObjectRotated = "object:rotated",
  //onCanvasObjectScaled = "object:scaled",
  //onCanvasObjectRemoved = "object:removed",
  ON_CANVAS_RENDERED: "after:render",
  // onCanvasObjectMoving = "object:moving",
  // onCanvasObjectScaling = "object:scaling",
};
