export type LocaleKey = "en" | "zh";

type Messages = {
  settingsTitleData: string;
  settingsTitleFilter: string;
  settingsTitleAppearance: string;
  settingsTitleAdvanced: string;
  relationPropertyName: string;
  relationPropertyDesc: string;
  showInGlobalGraphName: string;
  showInGlobalGraphDesc: string;
  showInLocalGraphName: string;
  showInLocalGraphDesc: string;
  showAnnotationsName: string;
  showAnnotationsDesc: string;
  showDetailOnHoverName: string;
  showDetailOnHoverDesc: string;
  labelFontSizeName: string;
  labelFontSizeDesc: string;
  labelOpacityName: string;
  labelOpacityDesc: string;
  labelColorName: string;
  labelColorDesc: string;
  edgeRescanName: string;
  edgeRescanDesc: string;
  debugModeName: string;
  debugModeDesc: string;
  graphSectionTitle: string;
  graphFontSizeName: string;
  graphOpacityName: string;
  graphColorName: string;
};

const EN: Messages = {
  settingsTitleData: "Data",
  settingsTitleFilter: "Filter",
  settingsTitleAppearance: "Appearance",
  settingsTitleAdvanced: "Advanced",
  relationPropertyName: "Relation property",
  relationPropertyDesc: 'Frontmatter property to read edge notes from. Use a YAML list like `("label")[[target]]` or `("label")[[target]]("detail")`.',
  showInGlobalGraphName: "Show in global graph",
  showInGlobalGraphDesc: "Render edge annotations in the global graph view.",
  showInLocalGraphName: "Show in local graph",
  showInLocalGraphDesc: "Render edge annotations in the local graph view.",
  showAnnotationsName: "Show annotations",
  showAnnotationsDesc: "Show or hide all edge annotations in graph views.",
  showDetailOnHoverName: "Show detail on hover",
  showDetailOnHoverDesc: "Show the relation detail text when the mouse is over a label.",
  labelFontSizeName: "Label size ratio",
  labelFontSizeDesc: "Annotation size relative to the connected nodes' label size.",
  labelOpacityName: "Label opacity",
  labelOpacityDesc: "Opacity used for rendered annotations.",
  labelColorName: "Label color",
  labelColorDesc: "Text color used for annotations. Leave empty to follow the current theme text color.",
  edgeRescanName: "Edge rescan interval",
  edgeRescanDesc: "How many animation frames to wait before rescanning graph edges and rebuilding labels.",
  debugModeName: "Debug mode",
  debugModeDesc: "Show a floating debug panel with recent plugin actions and graph binding state.",
  graphSectionTitle: "Graph Edge Notes",
  graphFontSizeName: "Size ratio",
  graphOpacityName: "Opacity",
  graphColorName: "Color"
};

const ZH: Messages = {
  settingsTitleData: "数据",
  settingsTitleFilter: "筛选",
  settingsTitleAppearance: "外观",
  settingsTitleAdvanced: "高级",
  relationPropertyName: "关系属性名",
  relationPropertyDesc: '用于读取边标注的 frontmatter 属性，格式如 `("label")[[target]]` 或 `("label")[[target]]("detail")`。',
  showInGlobalGraphName: "在全局关系图谱显示",
  showInGlobalGraphDesc: "在全局关系图谱中渲染边标注。",
  showInLocalGraphName: "在局部关系图谱显示",
  showInLocalGraphDesc: "在局部关系图谱中渲染边标注。",
  showAnnotationsName: "显示标注",
  showAnnotationsDesc: "控制关系图谱中是否显示所有边标注。",
  showDetailOnHoverName: "悬停显示详情",
  showDetailOnHoverDesc: "鼠标移到标注上时显示 detail 文本。",
  labelFontSizeName: "标注字号",
  labelFontSizeDesc: "关系图谱中标注文本的基础字号。",
  labelOpacityName: "标注透明度",
  labelOpacityDesc: "关系图谱中标注文本的透明度。",
  labelColorName: "标注颜色",
  labelColorDesc: "标注文本颜色。留空则跟随主题文本颜色。",
  edgeRescanName: "边重扫间隔",
  edgeRescanDesc: "每隔多少动画帧重新扫描一次图谱边并重建标注。",
  debugModeName: "调试模式",
  debugModeDesc: "显示浮动调试面板，查看插件动作与图谱绑定状态。",
  graphSectionTitle: "Graph Edge Notes",
  graphFontSizeName: "字号",
  graphOpacityName: "透明度",
  graphColorName: "颜色"
};

export function getLocale(): LocaleKey {
  const language = window.localStorage.getItem("language") ?? "en";
  return language.startsWith("zh") ? "zh" : "en";
}

export function t(): Messages {
  return getLocale() === "zh" ? ZH : EN;
}
