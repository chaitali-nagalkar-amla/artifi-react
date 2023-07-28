export interface FontSizeType {
    Id: number;
    Value: string;
}

export interface IRulePropsType {
  allow?: boolean;
  Allow?: boolean;
  value?: any;
  defaultValue?: string;
  DefaultValue?:string;
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
}


