import { V as VUtils, r as registerWidget, M as MUtils, u as useThrottler, a as useWrapperEventBus, W as WrapperEventTypes } from "./rainbow-d9-n1-O85VQ--g.js";
import { i as init, g as getInstanceByDom } from "./echarts-v5L9gyiQ.js";
import { r as reactExports, R as React } from "./react-lVPkXQtG.js";
import { D as DOM_KEY_WIDGET, a as DOM_ID_WIDGET, u as useGlobalEventBus, G as GlobalEventTypes, b as useGlobalHandlers } from "./rainbow-d9-n2-mgysu2Eb.js";
import { q as qe } from "./styled-components-ziGokluW.js";
import { i as index$1 } from "./rainbow-d9-n3-qhI7dE1K.js";
const REACTION_REFRESH_CHART = "reaction-refresh-chart";
var ChartGlobalEventPrefix;
(function(ChartGlobalEventPrefix2) {
  ChartGlobalEventPrefix2["DATA_CHANGED"] = "chart-data-changed";
})(ChartGlobalEventPrefix || (ChartGlobalEventPrefix = {}));
const redressChartMarker = (content) => {
  if (VUtils.isNotBlank(content.marker)) {
    return content.marker;
  }
  return VUtils.generateUniqueId();
};
const askInitOptions = (options) => {
  if (typeof options === "function") {
    return options();
  }
  return options;
};
const askOptions = (options) => {
  if (typeof options === "function") {
    return options();
  }
  return options;
};
const askSettings = (settings) => {
  if (typeof settings === "function") {
    return settings();
  }
  return settings;
};
const useInitialize = (ref, props) => {
  const { $pp, $wrapped: { $model }, initOptions, options, settings, mergeData, loading } = props;
  const [state, setState] = React.useState({
    domInitialized: false,
    marker: redressChartMarker(props)
  });
  reactExports.useEffect(() => {
    if (state.domInitialized || ref.current == null) {
      return;
    }
    const chart = init(ref.current, null, askInitOptions(initOptions));
    (async () => {
      const data = MUtils.getValue($model, $pp);
      if (data != null) {
        const optionsWithData = await mergeData(askOptions(options), data);
        chart.setOption(optionsWithData, askSettings(settings));
      } else {
        chart.setOption(askOptions(options), askSettings(settings));
        const loadingOptions = loading == null ? void 0 : loading();
        if (Array.isArray(loadingOptions)) {
          chart.showLoading(loadingOptions[0], loadingOptions[1]);
        } else {
          chart.showLoading(loadingOptions);
        }
      }
      setState((state2) => ({ ...state2, domInitialized: true }));
    })();
    return () => {
    };
  }, [state.domInitialized, ref, $pp, $model, initOptions, options, settings, mergeData, loading]);
  reactExports.useEffect(() => {
    if (!state.domInitialized) {
      return;
    }
    const chartRef = ref.current;
    return () => {
      if (chartRef == null) {
        return;
      }
      try {
        const chart = getInstanceByDom(chartRef);
        chart.dispose();
      } catch {
      }
    };
  }, [state.domInitialized, ref]);
  return [state, setState];
};
const useResize = (ref, domInitialized) => {
  reactExports.useEffect(() => {
    if (!domInitialized || ref.current == null) {
      return;
    }
    const chart = getInstanceByDom(ref.current);
    const resizeObserver = new ResizeObserver(() => {
      chart == null ? void 0 : chart.resize();
    });
    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
    };
  }, [domInitialized, ref]);
};
const useDataMerge = (ref, domInitialized, marker, props) => {
  const { $pp, $wrapped: { $model }, options, settings, mergeData } = props;
  const { on, off } = useGlobalEventBus();
  reactExports.useEffect(() => {
    if (!domInitialized || ref.current == null) {
      return;
    }
    const onCustomEvent = (_, prefix, clipped) => {
      if (clipped !== marker) {
        return;
      }
      if (prefix !== ChartGlobalEventPrefix.DATA_CHANGED) {
        return;
      }
      const chart = getInstanceByDom(ref.current);
      const data = MUtils.getValue($model, $pp);
      (async () => {
        if (data != null) {
          const optionsWithData = await mergeData(askOptions(options), data);
          chart.setOption(optionsWithData, askSettings(settings));
          chart.hideLoading();
        }
      })();
    };
    on && on(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    return () => {
      off && off(GlobalEventTypes.CUSTOM_EVENT, onCustomEvent);
    };
  }, [on, off, domInitialized, ref, $pp, $model, options, settings, marker, mergeData]);
};
const AChart = qe.div.attrs(({ id, "data-w": dataW, chartHeight }) => {
  return {
    [DOM_KEY_WIDGET]: dataW ?? "d9-chart",
    [DOM_ID_WIDGET]: id,
    style: {
      "--chart-height": chartHeight ?? "300px"
    }
  };
})`
    display: block;
    position: relative;
    grid-column: var(--grid-column);
    grid-row: var(--grid-row);
    width: 100%;
    height: var(--chart-height);
`;
const Chart = (props) => {
  const { options, settings, marker, mergeData, loading, $wrapped: { $avs: { $disabled, $visible } }, height, ...rest } = props;
  const ref = reactExports.useRef(null);
  const [state] = useInitialize(ref, props);
  useResize(ref, state.domInitialized);
  useDataMerge(ref, state.domInitialized, state.marker, props);
  return React.createElement(AChart, { ...rest, "data-disabled": $disabled, "data-visible": $visible, chartHeight: height, ref });
};
const ChartInitOptionsBuild = index$1.createSyncSnippetBuild("initOptions", []);
const ChartOptionsBuild = index$1.createSyncSnippetBuild("options", []);
const ChartSettingsBuild = index$1.createSyncSnippetBuild("settings", []);
const ChartMergeDataBuild = index$1.createAsyncSnippetBuild("mergeData", ["options", "data"]);
class AbstractChartTranslator extends index$1.SpecificWidgetTranslator {
  shouldWrapByFormCell() {
    return false;
  }
  getAttributeValueBuilders() {
    return [ChartInitOptionsBuild, ChartOptionsBuild, ChartSettingsBuild, ChartMergeDataBuild];
  }
}
const registerChart = (widgetHelper, widgetType) => {
  widgetType = VUtils.isBlank(widgetType) ? "Chart" : widgetType;
  registerWidget({ key: widgetType, JSX: Chart, container: false, array: false });
  const TranslatorClass = class extends AbstractChartTranslator {
    getSupportedType() {
      return widgetType;
    }
    getAttributeNamesMapping() {
      return { [`${widgetType}.merge`]: "mergeData" };
    }
  };
  const repo = widgetHelper.repository;
  repo.register(new TranslatorClass(repo));
};
const useAutonomousFetch = (ref, domInitialized, marker, props) => {
  const { $pp, $wrapped: { $root, $model }, options, settings, mergeData, fetchData, fetchInterval = 10 } = props;
  const globalHandlers = useGlobalHandlers();
  reactExports.useEffect(() => {
    if (!domInitialized || ref.current == null) {
      return;
    }
    const syncData = async () => {
      if (ref.current == null) {
        return;
      }
      const chart = getInstanceByDom(ref.current);
      const data2 = await fetchData({ global: globalHandlers, marker, root: $root, model: $model });
      if (data2 != null) {
        MUtils.setValue($model, $pp, data2);
        const optionsWithData = await mergeData(askOptions(options), data2);
        chart.setOption(optionsWithData, askSettings(settings));
        chart.hideLoading();
      }
    };
    const data = MUtils.getValue($model, $pp);
    if (data == null) {
      syncData();
    }
    const createTimer = () => {
      return setTimeout(async () => {
        await syncData();
        if (ref.current == null) {
          return;
        }
        createTimer();
      }, fetchInterval * 1e3);
    };
    const timer = createTimer();
    return () => {
      try {
        clearTimeout(timer);
      } catch {
      }
    };
  }, [
    globalHandlers,
    domInitialized,
    ref,
    $pp,
    $root,
    $model,
    options,
    settings,
    mergeData,
    marker,
    fetchData,
    fetchInterval
  ]);
};
const AutonomousChart = (props) => {
  const { options, settings, marker, mergeData, loading, fetchData, fetchInterval, $wrapped: { $avs: { $disabled, $visible } }, height, ...rest } = props;
  const ref = reactExports.useRef(null);
  const [state] = useInitialize(ref, props);
  useResize(ref, state.domInitialized);
  useDataMerge(ref, state.domInitialized, state.marker, props);
  useAutonomousFetch(ref, state.domInitialized, state.marker, props);
  return React.createElement(AChart, { ...rest, "data-w": "d9-aut-chart", "data-disabled": $disabled, "data-visible": $visible, chartHeight: height, ref });
};
const AutonomousChartInitOptionsBuild = index$1.createSyncSnippetBuild("initOptions", []);
const AutonomousChartOptionsBuild = index$1.createSyncSnippetBuild("options", []);
const AutonomousChartSettingsBuild = index$1.createSyncSnippetBuild("settings", []);
const AutonomousChartMergeDataBuild = index$1.createAsyncSnippetBuild("mergeData", ["options", "data"]);
const AutonomousChartFetchDataBuild = index$1.createAsyncSnippetBuild("fetchData", ["options"]);
class AbstractAutonomousChartTranslator extends index$1.SpecificWidgetTranslator {
  shouldWrapByFormCell() {
    return false;
  }
  getAttributeValueBuilders() {
    return [
      AutonomousChartInitOptionsBuild,
      AutonomousChartOptionsBuild,
      AutonomousChartSettingsBuild,
      AutonomousChartMergeDataBuild,
      AutonomousChartFetchDataBuild
    ];
  }
}
const registerAutonomousChart = (widgetHelper, widgetType) => {
  widgetType = VUtils.isBlank(widgetType) ? "AutChart" : widgetType;
  registerWidget({ key: widgetType, JSX: AutonomousChart, container: false, array: false });
  const TranslatorClass = class extends AbstractAutonomousChartTranslator {
    getSupportedType() {
      return widgetType;
    }
    getAttributeNamesMapping() {
      return {
        [`${widgetType}.merge`]: "mergeData",
        [`${widgetType}.fetch`]: "fetchData",
        [`${widgetType}.interval`]: "fetchInterval"
      };
    }
  };
  const repo = widgetHelper.repository;
  repo.register(new TranslatorClass(repo));
};
const useReliantWatch = (ref, domInitialized, marker, props) => {
  const { $pp, $wrapped: { $root, $model }, options, settings, mergeData, fetchData, fetchDefer = 1 } = props;
  const globalHandlers = useGlobalHandlers();
  const { replace, clear } = useThrottler();
  const { on, off } = useWrapperEventBus();
  reactExports.useEffect(() => {
    if (!domInitialized || ref.current == null) {
      return;
    }
    const onUnhandledReactionOccurred = (command) => {
      if (command !== REACTION_REFRESH_CHART) {
        return;
      }
      replace(async () => {
        if (ref.current == null) {
          return;
        }
        const chart = getInstanceByDom(ref.current);
        const data = await fetchData({ global: globalHandlers, marker, root: $root, model: $model });
        if (data != null) {
          const optionsWithData = await mergeData(askOptions(options), data);
          chart.setOption(optionsWithData, askSettings(settings));
          chart.hideLoading();
        }
      }, fetchDefer * 1e3);
    };
    on && on(WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, onUnhandledReactionOccurred);
    return () => {
      off && off(WrapperEventTypes.UNHANDLED_REACTION_OCCURRED, onUnhandledReactionOccurred);
    };
  }, [
    globalHandlers,
    on,
    off,
    replace,
    clear,
    domInitialized,
    ref,
    $pp,
    $root,
    $model,
    options,
    settings,
    marker,
    mergeData,
    fetchData,
    fetchDefer
  ]);
};
const ReliantChart = (props) => {
  const { options, settings, marker, mergeData, loading, $wrapped: { $avs: { $disabled, $visible } }, fetchData, height, ...rest } = props;
  const ref = reactExports.useRef(null);
  const [state] = useInitialize(ref, props);
  useResize(ref, state.domInitialized);
  useDataMerge(ref, state.domInitialized, state.marker, props);
  useReliantWatch(ref, state.domInitialized, state.marker, props);
  return React.createElement(AChart, { ...rest, "data-w": "d9-rel-chart", "data-disabled": $disabled, "data-visible": $visible, chartHeight: height, ref });
};
const ReliantChartInitOptionsBuild = index$1.createSyncSnippetBuild("initOptions", []);
const ReliantChartOptionsBuild = index$1.createSyncSnippetBuild("options", []);
const ReliantChartSettingsBuild = index$1.createSyncSnippetBuild("settings", []);
const ReliantChartMergeDataBuild = index$1.createAsyncSnippetBuild("mergeData", ["options", "data"]);
const ReliantChartFetchDataBuild = index$1.createAsyncSnippetBuild("fetchData", ["options"]);
class ReliantChartReactionCriteriaAttributeBuild extends index$1.AbstractReactionAttributeBuild {
  getReactionType() {
    return "criteria";
  }
  getReturnReaction() {
    return REACTION_REFRESH_CHART;
  }
}
const ReliantChartReactionCriteriaBuild = new ReliantChartReactionCriteriaAttributeBuild();
const ReliantChartReactionCriteriaHandlerDetective = index$1.createDefaultMonitorHandlerDetective({
  attributeName: "criteria",
  redressResult: (ret) => ret == null || VUtils.isBlank(ret) ? REACTION_REFRESH_CHART : ret,
  ignoreDefault: true,
  deleteAttribute: true
});
class AbstractReliantChartTranslator extends index$1.SpecificWidgetTranslator {
  shouldWrapByFormCell() {
    return false;
  }
  getAttributeValueBuilders() {
    return [
      ReliantChartInitOptionsBuild,
      ReliantChartOptionsBuild,
      ReliantChartSettingsBuild,
      ReliantChartMergeDataBuild,
      ReliantChartFetchDataBuild,
      ReliantChartReactionCriteriaBuild
    ];
  }
  getReactionHandlerDetectives() {
    return [
      ...super.getReactionHandlerDetectives(),
      ReliantChartReactionCriteriaHandlerDetective
    ];
  }
}
const registerReliantChart = (widgetHelper, widgetType) => {
  widgetType = VUtils.isBlank(widgetType) ? "RelChart" : widgetType;
  registerWidget({ key: widgetType, JSX: ReliantChart, container: false, array: false });
  const TranslatorClass = class extends AbstractReliantChartTranslator {
    getSupportedType() {
      return widgetType;
    }
    getAttributeNamesMapping() {
      return {
        [`${widgetType}.merge`]: "mergeData",
        [`${widgetType}.fetch`]: "fetchData",
        [`${widgetType}.defer`]: "fetchDefer"
      };
    }
  };
  const repo = widgetHelper.repository;
  repo.register(new TranslatorClass(repo));
};
const registerCharts = (widgetHelper, widgetTypes) => {
  registerChart(widgetHelper, widgetTypes == null ? void 0 : widgetTypes.Basic);
  registerAutonomousChart(widgetHelper, widgetTypes == null ? void 0 : widgetTypes.Autonomous);
  registerReliantChart(widgetHelper, widgetTypes == null ? void 0 : widgetTypes.Reliant);
};
export {
  registerCharts as r
};
