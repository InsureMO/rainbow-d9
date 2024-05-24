var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { f as CssConstants, C as CssVars, D as DOM_KEY_WIDGET, g as UnwrappedCaption, b as useGlobalHandlers, I as IntlLabel } from "./rainbow-d9-n2-UDT0tXmP.js";
import { a as color, R as React, r as reactExports, O as jsYaml, P as DiagramModel, Q as CanvasWidget, S as NodeModel, U as createEngine, X as PortModel, Y as PortModelAlignment, Z as DefaultLinkModel, _ as AbstractModelFactory, $ as AbstractReactFactory, a0 as PortWidget } from "./vendor-lWAx8mHf.js";
import { V as VUtils, r as registerWidget, g as useCreateEventBus, M as MUtils, P as PPUtils } from "./rainbow-d9-n1-w3ml04nl.js";
import { q as qe } from "./styled-components-uSKKRtA-.js";
import { i as index$1 } from "./rainbow-d9-n3-wXfS8j79.js";
const EDITOR_BACKGROUND_BLOCK_SIZE = "var(--o23-playground-editor-background-block-size, 48px)";
const EDITOR_BACKGROUND_LINE_COLOR = `var(--o23-playground-editor-background-line-color, ${color(CssConstants.PRIMARY_COLOR).alpha(0.08)})`;
const NODE_START_COLOR = "#ffb56b";
const NODE_END_COLOR = "#e0b35f";
const NEXT_STEP_PORT_COLOR = "#1f6b73";
const PREVIOUS_STEP_PORT_COLOR = "#00618b";
const REST_API_VARIABLE_PORT_COLOR = "#87a55f";
const PlaygroundCssVars = {
  EDITOR_BACKGROUND_BLOCK_SIZE,
  EDITOR_BACKGROUND_LINE_COLOR,
  EDITOR_BACKGROUND_IMAGE: `var(--o23-playground-editor-background-image, linear-gradient(to right, ${EDITOR_BACKGROUND_LINE_COLOR} 1px, transparent 1px), linear-gradient(to bottom, ${EDITOR_BACKGROUND_LINE_COLOR} 1px, transparent 1px))`,
  EDITOR_BACKGROUND_SIZE: `var(--o23-playground-editor-background-size, ${EDITOR_BACKGROUND_BLOCK_SIZE} ${EDITOR_BACKGROUND_BLOCK_SIZE})`,
  EDITOR_BACKGROUND_POSITION: `var(--o23-playground-editor-background-position, -1px -1px)`,
  EDITOR_ERROR_COLOR: `var(--o23-playground-viewer-error-color, ${CssVars.DANGER_COLOR})`,
  NODE_BORDER_RADIUS: `var(--o23-playground-node-border-radius, 8px)`,
  NODE_BACKGROUND: `var(--o23-playground-node-background, ${CssVars.BACKGROUND_COLOR})`,
  NODE_TITLE_PADDING: `var(--o23-playground-node-title-padding, 0 10px)`,
  NODE_MIN_WIDTH: `var(--o23-playground-node-min-width, 160px)`,
  NODE_ICON_SIZE: `var(--o23-playground-node-icon-size, 14px)`,
  NODE_PORT_HEIGHT: `var(--o23-playground-node-port-height, 20px)`,
  NODE_NEXT_STEP_PORT_FONT_SIZE: `var(--o23-playground-next-step-port-font-size, 0.6em)`,
  NODE_NEXT_STEP_PORT_FONT_WEIGHT: `var(--o23-playground-next-step-port-font-weight, 600)`,
  NODE_NEXT_STEP_PORT_COLOR: `var(--o23-playground-next-step-port-color, ${CssVars.INVERT_COLOR})`,
  NODE_NEXT_STEP_PORT_BACKGROUND: `var(--o23-playground-next-step-port-background, ${NEXT_STEP_PORT_COLOR})`,
  NODE_NEXT_STEP_PORT_BORDER: `var(--o23-playground-next-step-port-border, 1px solid ${color(NEXT_STEP_PORT_COLOR).darken(0.1).fade(0.5)})`,
  NODE_NEXT_STEP_PORT_PADDING: `var(--o23-playground-next-step-port-padding, 0 8px 0 12px)`,
  NODE_PREVIOUS_STEP_PORT_FONT_SIZE: `var(--o23-playground-previous-step-port-font-size, 0.6em)`,
  NODE_PREVIOUS_STEP_PORT_FONT_WEIGHT: `var(--o23-playground-previous-step-port-font-weight, 600)`,
  NODE_PREVIOUS_STEP_PORT_COLOR: `var(--o23-playground-previous-step-port-color, ${CssVars.INVERT_COLOR})`,
  NODE_PREVIOUS_STEP_PORT_BACKGROUND: `var(--o23-playground-previous-step-port-background, ${PREVIOUS_STEP_PORT_COLOR})`,
  NODE_PREVIOUS_STEP_PORT_BORDER: `var(--o23-playground-previous-step-port-border, 1px solid ${color(PREVIOUS_STEP_PORT_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_PREVIOUS_STEP_PORT_PADDING: `var(--o23-playground-previous-step-port-padding, 0 12px 0 8px)`,
  NODE_REST_API_VARIABLE_PORT_FONT_SIZE: `var(--o23-playground-rest-api-variable-port-font-size, 0.6em)`,
  NODE_REST_API_VARIABLE_PORT_FONT_WEIGHT: `var(--o23-playground-rest-api-variable-port-font-weight, 600)`,
  NODE_REST_API_VARIABLE_PORT_COLOR: `var(--o23-playground-rest-api-variable-port-color, ${CssVars.INVERT_COLOR})`,
  NODE_REST_API_VARIABLE_PORT_BACKGROUND: `var(--o23-playground-rest-api-variable-port-background, ${REST_API_VARIABLE_PORT_COLOR})`,
  NODE_REST_API_VARIABLE_PORT_BORDER: `var(--o23-playground-rest-api-variable-port-border, 1px solid ${color(REST_API_VARIABLE_PORT_COLOR).darken(0.1).opaquer(0.5)})`,
  NODE_REST_API_VARIABLE_PORT_PADDING: `var(--o23-playground-rest-api-variable-port-padding, 0 12px 0 8px)`,
  NODE_START_BORDER_COLOR: `var(--o23-playground-node-start-border-color, ${NODE_START_COLOR})`,
  NODE_START_BORDER: `var(--o23-playground-node-start-border, 2px solid ${NODE_START_COLOR})`,
  NODE_START_TITLE_FONT_WEIGHT: `var(--o23-playground-node-start-title-font-weight, 600)`,
  NODE_START_TITLE_COLOR: `var(--o23-playground-node-start-title-color, ${CssVars.INVERT_COLOR})`,
  NODE_START_TITLE_BACKGROUND: `var(--o23-playground-node-start-title-background, linear-gradient(135deg, ${NODE_START_COLOR} 0%, ${color(NODE_START_COLOR).alpha(0.7)} 70%, ${color(NODE_START_COLOR).alpha(0.5)} 100%))`,
  NODE_START_SECOND_TITLE_DECORATION: "var(--o23-playground-node-start-second-title-decoration, underline double)",
  NODE_START_BODY_HEIGHT: `var(--o23-playground-node-start-body-height, 32px)`,
  NODE_START_BODY_PADDING: `var(--o23-playground-node-start-body-padding, 4px 0)`,
  NODE_END_BORDER_COLOR: `var(--o23-playground-node-end-border-color, ${NODE_END_COLOR})`,
  NODE_END_BORDER: `var(--o23-playground-node-end-border, 2px solid ${NODE_END_COLOR})`,
  NODE_END_TITLE_FONT_WEIGHT: `var(--o23-playground-node-end-title-font-weight, 600)`,
  NODE_END_TITLE_COLOR: `var(--o23-playground-node-end-title-color, ${CssVars.INVERT_COLOR})`,
  NODE_END_TITLE_BACKGROUND: `var(--o23-playground-node-end-title-background, linear-gradient(135deg, ${NODE_END_COLOR} 0%, ${color(NODE_END_COLOR).alpha(0.7)} 70%, ${color(NODE_END_COLOR).alpha(0.5)} 100%))`,
  NODE_END_BODY_HEIGHT: `var(--o23-playground-node-end-body-height, 32px)`,
  NODE_END_BODY_PADDING: `var(--o23-playground-node-end-body-padding, 4px 0)`
};
const _NextStepPortModel = class _NextStepPortModel extends PortModel {
  constructor() {
    super({
      type: _NextStepPortModel.TYPE,
      name: _NextStepPortModel.NAME,
      alignment: PortModelAlignment.RIGHT
    });
  }
  createLinkModel() {
    const link = new DefaultLinkModel();
    link.setSourcePort(this);
    return link;
  }
};
__publicField(_NextStepPortModel, "TYPE", "next-step-port");
__publicField(_NextStepPortModel, "NAME", "next-step");
let NextStepPortModel = _NextStepPortModel;
class NextStepPortFactory extends AbstractModelFactory {
  constructor() {
    super(NextStepPortModel.TYPE);
  }
  generateModel(_event) {
    return new NextStepPortModel();
  }
}
const NextStepPortContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-next-step-port" })`
    display: flex;
    position: relative;
    align-self: end;
    align-items: center;
    justify-self: end;
    color: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_COLOR};
    background: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_BACKGROUND};
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    border: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_BORDER};
    border-top-left-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-left-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    font-weight: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_FONT_WEIGHT};
    font-size: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_FONT_SIZE};
    text-transform: uppercase;
    padding: ${PlaygroundCssVars.NODE_NEXT_STEP_PORT_PADDING};
    margin-right: -1px;
    grid-column: 3;

    > div:first-child {
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 100%;
    }
`;
const NextStepPortWidget = (props) => {
  const { port, engine } = props;
  return React.createElement(
    NextStepPortContainer,
    null,
    React.createElement(PortWidget, { port, engine }),
    React.createElement(
      "span",
      null,
      React.createElement(IntlLabel, { keys: ["o23", "port", "next"], value: "Out" })
    )
  );
};
const _PreviousStepPortModel = class _PreviousStepPortModel extends PortModel {
  constructor() {
    super({
      type: _PreviousStepPortModel.TYPE,
      name: _PreviousStepPortModel.NAME,
      alignment: PortModelAlignment.LEFT
    });
  }
  createLinkModel() {
    return new DefaultLinkModel();
  }
};
__publicField(_PreviousStepPortModel, "TYPE", "previous-step-port");
__publicField(_PreviousStepPortModel, "NAME", "previous-step");
let PreviousStepPortModel = _PreviousStepPortModel;
class PreviousStepPortFactory extends AbstractModelFactory {
  constructor() {
    super(PreviousStepPortModel.TYPE);
  }
  generateModel(_event) {
    return new PreviousStepPortModel();
  }
}
const PreviousStepPortContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-previous-step-port" })`
    display: flex;
    position: relative;
    align-self: end;
    align-items: center;
    justify-self: start;
    color: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_COLOR};
    background: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_BACKGROUND};
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    border: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_BORDER};
    border-top-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    font-weight: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_FONT_WEIGHT};
    font-size: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_FONT_SIZE};
    text-transform: uppercase;
    padding: ${PlaygroundCssVars.NODE_PREVIOUS_STEP_PORT_PADDING};
    margin-left: -1px;
    grid-column: 1;

    > div:first-child {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 100%;
    }
`;
const PreviousStepPortWidget = (props) => {
  const { port, engine } = props;
  return React.createElement(
    PreviousStepPortContainer,
    null,
    React.createElement(PortWidget, { port, engine }),
    React.createElement(
      "span",
      null,
      React.createElement(IntlLabel, { keys: ["o23", "port", "previous"], value: "In" })
    )
  );
};
const NodeContainer = qe.div`
    display: flex;
    position: relative;
    flex-direction: column;
    border-radius: var(--border-radius);
    border: var(--border);
    background-color: var(--background-color);
    min-width: ${PlaygroundCssVars.NODE_MIN_WIDTH};
`;
const NodeHeader = qe.div`
    display: flex;
    position: relative;
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    background: var(--background);
    padding: var(--padding);
    margin-top: -2px;
`;
const NodeTitle = qe(UnwrappedCaption)`
    flex-grow: 1;
    color: var(--color);
    font-weight: var(--font-weight);
`;
const NodeSecondTitle = qe(UnwrappedCaption)`
    justify-content: flex-end;
    color: var(--color);
    font-weight: var(--font-weight);
    text-decoration: var(--text-decoration);
`;
const NodeBody = qe.div`
    display: grid;
    position: relative;
    grid-column: 1 / span 2;
    grid-row: 2;
    grid-template-columns: auto minmax(40px, 1fr) auto;
    min-height: var(--min-height);
    padding: var(--padding);
`;
const NodeWrapper = (props) => {
  const { children, ...rest } = props;
  return React.createElement(NodeContainer, { ...rest }, children);
};
const _EndNodeModel = class _EndNodeModel extends NodeModel {
  constructor() {
    super({ type: _EndNodeModel.TYPE });
    this.addPort(new PreviousStepPortModel());
  }
};
__publicField(_EndNodeModel, "TYPE", "end-node");
let EndNodeModel = _EndNodeModel;
const EndNodeContainer = qe(NodeWrapper).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-end-node",
  style: {
    "--border-radius": PlaygroundCssVars.NODE_BORDER_RADIUS,
    "--border": PlaygroundCssVars.NODE_END_BORDER,
    "--background-color": PlaygroundCssVars.NODE_BACKGROUND
  }
})``;
const EndNodeHeader = qe(NodeHeader).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-end-node-header",
  style: {
    "--border-radius": PlaygroundCssVars.NODE_BORDER_RADIUS,
    "--background": PlaygroundCssVars.NODE_END_TITLE_BACKGROUND,
    "--padding": PlaygroundCssVars.NODE_TITLE_PADDING
  }
})``;
const EndNodeTitle = qe(NodeTitle).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-end-node-title",
  style: {
    "--color": PlaygroundCssVars.NODE_END_TITLE_COLOR,
    "--font-weight": PlaygroundCssVars.NODE_END_TITLE_FONT_WEIGHT
  }
})``;
const EndNodeBody = qe(NodeBody).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-end-node-body",
  style: {
    "--min-height": PlaygroundCssVars.NODE_END_BODY_HEIGHT,
    "--padding": PlaygroundCssVars.NODE_END_BODY_PADDING
  }
})``;
const EndNodeWidget = (props) => {
  const { node, engine } = props;
  return React.createElement(
    EndNodeContainer,
    null,
    React.createElement(
      EndNodeHeader,
      null,
      React.createElement(
        EndNodeTitle,
        null,
        React.createElement(IntlLabel, { keys: ["o23", "node", "end"], value: "End" })
      )
    ),
    React.createElement(
      EndNodeBody,
      null,
      React.createElement(PreviousStepPortWidget, { port: node.getPort(PreviousStepPortModel.NAME), engine })
    )
  );
};
class EndNodeFactory extends AbstractReactFactory {
  constructor() {
    super(EndNodeModel.TYPE);
  }
  generateReactWidget(event) {
    return React.createElement(EndNodeWidget, { engine: this.engine, node: event.model });
  }
  generateModel(_event) {
    throw new Error("DO NOT use EndNodeFactory#generateModel.");
  }
}
const _StartNodeModel = class _StartNodeModel extends NodeModel {
  constructor(def) {
    super({ type: _StartNodeModel.TYPE });
    __publicField(this, "def");
    this.def = def;
    this.addPort(new NextStepPortModel());
  }
  routeTo(node) {
    const port = this.getPort(NextStepPortModel.NAME);
    const link = port.createLinkModel();
    link.setTargetPort(node.getPort(PreviousStepPortModel.NAME));
    return link;
  }
};
__publicField(_StartNodeModel, "TYPE", "start-node");
let StartNodeModel = _StartNodeModel;
class FileDefLoader {
  constructor(options) {
    __publicField(this, "_redress");
    this._redress = options == null ? void 0 : options.redress;
  }
  dashToCamel(key) {
    return key.replace(/-(.)/g, (_, group1) => group1.toUpperCase());
  }
  redressKeyCase(given) {
    if (given == null) {
      return given;
    } else if (Array.isArray(given)) {
      return given.map((item) => this.redressKeyCase(item));
    } else if (typeof given === "object") {
      return Object.keys(given).reduce((redressed, key) => {
        if (key.indexOf("-") !== -1) {
          redressed[this.dashToCamel(key)] = this.redressKeyCase(given[key]);
        } else {
          redressed[key] = this.redressKeyCase(given[key]);
        }
        return redressed;
      }, {});
    } else {
      return given;
    }
  }
  redressDef(given) {
    if (this._redress) {
      given = this._redress(given);
    }
    return this.redressKeyCase(given);
  }
  parse(content) {
    const def = this.doParse(content);
    return this.redressDef(def);
  }
}
class YamlDefLoader extends FileDefLoader {
  doParse(content) {
    try {
      return jsYaml.load(content);
    } catch (e) {
      console.group("Failed to parse yaml content to O23 definition.");
      console.error(e);
      console.log(content);
      console.groupEnd();
      throw new Error("Failed to parse yaml content to O23 definition.");
    }
  }
}
const isPipelineDef = (def) => def.type === "pipeline";
const RestApiVariablePortContainer = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-rest-api-variable-port" })`
    display: flex;
    position: relative;
    align-self: end;
    align-items: center;
    justify-self: start;
    color: ${PlaygroundCssVars.NODE_REST_API_VARIABLE_PORT_COLOR};
    background: ${PlaygroundCssVars.NODE_REST_API_VARIABLE_PORT_BACKGROUND};
    height: ${PlaygroundCssVars.NODE_PORT_HEIGHT};
    border: ${PlaygroundCssVars.NODE_REST_API_VARIABLE_PORT_BORDER};
    border-top-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    border-bottom-right-radius: calc(${PlaygroundCssVars.NODE_PORT_HEIGHT} / 2);
    font-weight: ${PlaygroundCssVars.NODE_REST_API_VARIABLE_PORT_FONT_WEIGHT};
    font-size: ${PlaygroundCssVars.NODE_REST_API_VARIABLE_PORT_FONT_SIZE};
    text-transform: capitalize;
    padding: ${PlaygroundCssVars.NODE_REST_API_VARIABLE_PORT_PADDING};
    margin-left: -1px;
    grid-column: 1;
`;
const RestApiVariablePortWidget = (props) => {
  const { label } = props;
  return React.createElement(
    RestApiVariablePortContainer,
    null,
    React.createElement(
      "span",
      null,
      React.createElement(IntlLabel, { keys: ["o23", "rest-api", "variable", label], value: label })
    )
  );
};
const StartNodeContainer = qe(NodeWrapper).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-start-node",
  style: {
    "--border-radius": PlaygroundCssVars.NODE_BORDER_RADIUS,
    "--border": PlaygroundCssVars.NODE_START_BORDER,
    "--background-color": PlaygroundCssVars.NODE_BACKGROUND
  }
})``;
const StartNodeHeader = qe(NodeHeader).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-start-node-header",
  style: {
    "--border-radius": PlaygroundCssVars.NODE_BORDER_RADIUS,
    "--background": PlaygroundCssVars.NODE_START_TITLE_BACKGROUND,
    "--padding": PlaygroundCssVars.NODE_TITLE_PADDING
  }
})``;
const StartNodeTitle = qe(NodeTitle).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-start-node-title",
  style: {
    "--color": PlaygroundCssVars.NODE_START_TITLE_COLOR,
    "--font-weight": PlaygroundCssVars.NODE_START_TITLE_FONT_WEIGHT
  }
})`
    &[data-role=route] {
        text-decoration: ${PlaygroundCssVars.NODE_START_SECOND_TITLE_DECORATION};
    }
`;
const StartNodeSecondTitle = qe(NodeSecondTitle).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-start-node-title",
  style: {
    "--color": PlaygroundCssVars.NODE_START_TITLE_COLOR,
    "--font-weight": PlaygroundCssVars.NODE_START_TITLE_FONT_WEIGHT,
    "--text-decoration": PlaygroundCssVars.NODE_START_SECOND_TITLE_DECORATION
  }
})`
    &[data-role=method] {
        text-decoration: unset;
        text-transform: uppercase;
    }
`;
const StartNodeBody = qe(NodeBody).attrs({
  [DOM_KEY_WIDGET]: "o23-playground-start-node-body",
  style: {
    "--min-height": PlaygroundCssVars.NODE_START_BODY_HEIGHT,
    "--padding": PlaygroundCssVars.NODE_START_BODY_PADDING
  }
})``;
const StartNodeWidget = (props) => {
  const { node, engine } = props;
  const def = node.def;
  const firstTitleRole = () => {
    if (isPipelineDef(def) && VUtils.isNotBlank(def.route)) {
      return "route";
    }
    return void 0;
  };
  const firstTitle = () => {
    if (isPipelineDef(def) && VUtils.isNotBlank(def.route)) {
      return def.route;
    }
    return React.createElement(IntlLabel, { keys: ["o23", "node", "start"], value: "Start" });
  };
  const secondTitleRole = () => {
    if (isPipelineDef(def) && VUtils.isNotBlank(def.route)) {
      return "method";
    }
    return void 0;
  };
  const secondTitle = () => {
    if (isPipelineDef(def)) {
      if (VUtils.isNotBlank(def.route)) {
        return `[${def.method || "post"}]`;
      } else {
        return React.createElement(IntlLabel, { keys: ["o23", "pipeline", "type", def.type], value: "Rest API" });
      }
    }
    return React.createElement(IntlLabel, { keys: ["o23", "pipeline", "type", def.type], value: def.type.replace("-", "") });
  };
  return React.createElement(
    StartNodeContainer,
    null,
    React.createElement(
      StartNodeHeader,
      null,
      React.createElement(StartNodeTitle, { "data-role": firstTitleRole() }, firstTitle()),
      React.createElement(StartNodeSecondTitle, { "data-role": secondTitleRole() }, secondTitle())
    ),
    React.createElement(
      StartNodeBody,
      null,
      isPipelineDef(def) ? React.createElement(
        React.Fragment,
        null,
        VUtils.isNotBlank(def.route) ? null : React.createElement(RestApiVariablePortWidget, { label: (def.method || "post").toUpperCase() }),
        React.createElement(RestApiVariablePortWidget, { label: "Headers" }),
        React.createElement(RestApiVariablePortWidget, { label: "Path Parameters" }),
        React.createElement(RestApiVariablePortWidget, { label: "Query Parameters" }),
        React.createElement(RestApiVariablePortWidget, { label: "Expose Headers" }),
        React.createElement(RestApiVariablePortWidget, { label: "Expose File" })
      ) : null,
      React.createElement(NextStepPortWidget, { port: node.getPort(NextStepPortModel.NAME), engine })
    )
  );
};
class StartNodeFactory extends AbstractReactFactory {
  constructor() {
    super(StartNodeModel.TYPE);
  }
  generateReactWidget(event) {
    return React.createElement(StartNodeWidget, { engine: this.engine, node: event.model });
  }
  generateModel(_event) {
    throw new Error("DO NOT use StartNodeFactory#generateModel.");
  }
}
const initEngine = (engine) => {
  const portFactories = engine.getPortFactories();
  portFactories.registerFactory(new NextStepPortFactory());
  portFactories.registerFactory(new PreviousStepPortFactory());
  const nodeFactories = engine.getNodeFactories();
  nodeFactories.registerFactory(new StartNodeFactory());
  nodeFactories.registerFactory(new EndNodeFactory());
};
const EditorWrapper = qe.div.attrs({
  [DOM_KEY_WIDGET]: "o23-playground-editor",
  "data-v-scroll": "",
  "data-h-scroll": ""
})`
    display: block;
    position: relative;
    align-self: stretch;
    background-image: ${PlaygroundCssVars.EDITOR_BACKGROUND_IMAGE};
    background-size: ${PlaygroundCssVars.EDITOR_BACKGROUND_SIZE};
    background-position: ${PlaygroundCssVars.EDITOR_BACKGROUND_POSITION};
    overflow: auto;

    > div.o23-playground-editor-content {
        height: 100%;
    }
`;
const ParseError = qe.div.attrs({ [DOM_KEY_WIDGET]: "o23-playground-viewer-error" })`
    display: flex;
    position: relative;
    align-items: center;
    padding: 16px 32px;
    color: ${PlaygroundCssVars.EDITOR_ERROR_COLOR};
    font-size: 1.5em;
    font-style: italic;
    font-weight: 500;
`;
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: props.content, hasError: false };
  }
  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true, error };
  }
  componentDidCatch(_error, _errorInfo) {
  }
  componentDidUpdate(_prevProps, prevState) {
    if (prevState.content !== this.props.content) {
      this.setState({ content: this.props.content, hasError: false });
    }
  }
  render() {
    if (this.state.hasError) {
      return React.createElement(ParseError, null, "Something went wrong.");
    }
    return this.props.children;
  }
}
const createDiagramEngine = () => {
  const engine = createEngine();
  initEngine(engine);
  return engine;
};
const EditorKernel = (props) => {
  const { content, parser } = props;
  const vwRef = reactExports.useRef(null);
  const [state, setState] = reactExports.useState(() => {
    const engine = createDiagramEngine();
    try {
      const def = parser.parse(content ?? "");
      return { engine, content, parser, def };
    } catch (e) {
      console.error(e);
      return { engine, content, parser, message: e.message };
    }
  });
  reactExports.useEffect(() => {
    if (parser === state.parser && content === state.content) {
      return;
    }
    try {
      const def = parser.parse(content ?? "");
      setState((state2) => ({ engine: state2.engine, content, parser, def }));
    } catch (e) {
      console.error(e);
      setState((state2) => ({ engine: state2.engine, content, parser, message: e.message }));
    }
  }, [parser, content, state.content, state.parser]);
  if (VUtils.isNotBlank(state.message)) {
    return React.createElement(
      EditorWrapper,
      null,
      React.createElement(ParseError, null, state.message)
    );
  } else if (VUtils.isBlank(state.content)) {
    return React.createElement(
      EditorWrapper,
      null,
      React.createElement(
        ParseError,
        null,
        React.createElement(IntlLabel, { keys: ["o23", "error", "no-content"], value: "No content given." })
      )
    );
  } else if (state.def == null) {
    return React.createElement(
      EditorWrapper,
      null,
      React.createElement(
        ParseError,
        null,
        React.createElement(IntlLabel, { keys: ["o23", "error", "no-def"], value: "No definition parsed." })
      )
    );
  }
  try {
    const startNode = new StartNodeModel(state.def);
    startNode.setPosition(100, 100);
    const endNode = new EndNodeModel();
    endNode.setPosition(500, 100);
    const link = startNode.routeTo(endNode);
    const model = new DiagramModel();
    model.addAll(startNode, endNode, link);
    state.engine.setModel(model);
    return React.createElement(
      EditorWrapper,
      { ref: vwRef },
      React.createElement(
        ErrorBoundary,
        { content },
        React.createElement(CanvasWidget, { engine: state.engine, className: "o23-playground-editor-content" })
      )
    );
  } catch (error) {
    return React.createElement(
      EditorWrapper,
      null,
      React.createElement(ParseError, null, error.message || React.createElement(IntlLabel, { keys: ["o23", "error", "parse"], value: "Parse error occurred." }))
    );
  }
};
const Editor = (props) => {
  return React.createElement(EditorKernel, { ...props });
};
var PlaygroundEventTypes;
(function(PlaygroundEventTypes2) {
  PlaygroundEventTypes2["CONTENT_CHANGED"] = "content-changed";
})(PlaygroundEventTypes || (PlaygroundEventTypes = {}));
const Context = reactExports.createContext({});
Context.displayName = "EventBus";
const PlaygroundEventBusProvider = (props) => {
  const { children } = props;
  const bus = useCreateEventBus("o23-playground");
  return React.createElement(Context.Provider, { value: bus }, children);
};
const usePlaygroundEventBus = () => reactExports.useContext(Context);
const PlaygroundBridge = (props) => {
  const { content, onContentChanged } = props;
  const { on, off } = usePlaygroundEventBus();
  reactExports.useEffect(() => {
    const onChanged = (changed) => {
      if ((content ?? "") === (changed ?? "")) {
        return;
      }
      (async () => await onContentChanged(changed))();
    };
    on(PlaygroundEventTypes.CONTENT_CHANGED, onChanged);
    return () => {
      off(PlaygroundEventTypes.CONTENT_CHANGED, onChanged);
    };
  }, [on, off, content, onContentChanged]);
  return React.createElement(reactExports.Fragment, null);
};
const PlaygroundWrapper = qe.div.attrs(() => {
  return {
    [DOM_KEY_WIDGET]: "o23-playground",
    style: {
      "--min-height": "500px",
      "--grid-columns": `1fr`,
      "--grid-rows": "1fr"
    }
  };
})`
    display: grid;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    grid-template-columns: var(--grid-columns);
    grid-template-rows: var(--grid-rows);
    min-height: var(--min-height);
    height: var(--min-height);
    border: ${CssVars.BORDER};
    border-radius: ${CssVars.BORDER_RADIUS};
    overflow: hidden;

    &[data-visible=false] {
        display: none;
    }
`;
const PlaygroundDelegate = (props) => {
  const { $pp, $wrapped, usage, parser, ...rest } = props;
  const { $p2r, $onValueChange, $avs: { $disabled, $visible } } = $wrapped;
  const ref = reactExports.useRef(null);
  const globalHandlers = useGlobalHandlers();
  const [state, setState] = reactExports.useState(() => {
    return { parser: parser ?? new YamlDefLoader() };
  });
  reactExports.useEffect(() => {
    setState((state2) => ({ ...state2, parser: parser ?? new YamlDefLoader() }));
  }, [parser]);
  const onContentChanged = async (content2) => {
    await $onValueChange(content2, false, { global: globalHandlers });
  };
  const content = MUtils.getValue($wrapped.$model, $pp);
  return React.createElement(
    PlaygroundWrapper,
    { ...rest, "data-disabled": $disabled, "data-visible": $visible, id: PPUtils.asId(PPUtils.absolute($p2r, $pp), props.id), ref },
    React.createElement(PlaygroundBridge, { content, onContentChanged }),
    React.createElement(Editor, { content, usage, parser: state.parser })
  );
};
const Playground = (props) => {
  return React.createElement(
    PlaygroundEventBusProvider,
    null,
    React.createElement(PlaygroundDelegate, { ...props })
  );
};
class AbstractPlaygroundTranslator extends index$1.SpecificWidgetTranslator {
  beautifyProperties(def) {
    return super.beautifyProperties(this.beautifyColumnSpan(def, 12));
  }
  shouldWrapByFormCell() {
    return false;
  }
  getAttributeNamesMapping() {
    const keys = ["useN3", "useN5", "useN6", "useN7", "useN8"];
    return keys.reduce((mapping, key) => {
      mapping[`${this.getSupportedType()}.${key}`] = `usage.${key}`;
      return mapping;
    }, {});
  }
}
const registerPlayground = (widgetHelper, widgetType) => {
  widgetType = VUtils.isBlank(widgetType) ? "O23Playground" : widgetType;
  registerWidget({ key: widgetType, JSX: Playground, container: false, array: false });
  const TranslatorClass = class extends AbstractPlaygroundTranslator {
    getSupportedType() {
      return widgetType;
    }
  };
  const repo = widgetHelper.repository;
  repo.register(new TranslatorClass(repo));
};
export {
  registerPlayground as r
};
