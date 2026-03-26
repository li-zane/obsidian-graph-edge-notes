export interface InternalGraphText {
  alpha?: number;
}

export interface InternalGraphNodeGraphic {
  tint: number;
  alpha: number;
  visible?: boolean;
  x?: number;
  y?: number;
  scale?: {
    x: number;
    y: number;
  };
  clear?: () => void;
  lineStyle?: (width: number, color: number, alpha?: number) => void;
  drawCircle?: (x: number, y: number, radius: number) => void;
  parent?: {
    removeChild: (child: unknown) => void;
  } | null;
  destroy?: () => void;
  eventMode?: string;
  zIndex?: number;
}

export interface InternalGraphNode {
  id: string;
  x: number;
  y: number;
  weight: number;
  rendered?: boolean;
  color?: InternalGraphColor | null;
  type?: string;
  circle?: InternalGraphNodeGraphic | null;
  highlight?: InternalGraphNodeGraphic | null;
  text?: InternalGraphText;
}

export interface InternalGraphContainer {
  sortableChildren?: boolean;
  x?: number;
  y?: number;
  scale?: {
    x: number;
    y: number;
  };
  addChild: (child: unknown) => void;
  removeChild: (child: unknown) => void;
  children: unknown[];
}

export interface InternalGraphLink {
  source: InternalGraphNode;
  target: InternalGraphNode;
  rendered?: boolean;
  line?: {
    tint: number;
    alpha: number;
    visible?: boolean;
  } | null;
  arrow?: {
    tint: number;
    alpha: number;
    visible?: boolean;
  } | null;
}

export interface InternalGraphColor {
  rgb: number;
  a: number;
}

export interface InternalGraphRendererColors {
  line: InternalGraphColor;
  lineHighlight: InternalGraphColor;
  arrow: InternalGraphColor;
  circle?: InternalGraphColor;
  fill?: InternalGraphColor;
  fillHighlight?: InternalGraphColor;
}

export interface InternalGraphRenderer {
  px: {
    stage: InternalGraphContainer;
  };
  containerEl?: HTMLElement;
  hanger?: InternalGraphContainer;
  links: InternalGraphLink[];
  nodeScale: number;
  fNodeSizeMult?: number;
  width?: number;
  height?: number;
  panX: number;
  panY: number;
  scale: number;
  mouseX?: number | null;
  mouseY?: number | null;
  colors?: InternalGraphRendererColors;
  highlightNode?: InternalGraphNode | null;
  getHighlightNode?: () => InternalGraphNode | null;
}
