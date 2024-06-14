import { j as jsxRuntimeExports, q as qe, r as reactExports, $ as $e, f as client } from "./react-base-1xesxUK0.js";
import { r as registerCharts } from "./rainbow-d9-echarts-hg6IvJet.js";
import { n as N1Logger, V as VUtils, P as PPUtils, M as MUtils, S as StandaloneRoot, B as BridgeEventBusProvider, o as useBridgeEventBus, p as BridgeToRootEventTypes, E as ExternalDefIndicator, f as MBUtils, D as DeviceDetective } from "./rainbow-d9-n1-gFKePpQk.js";
import { x as utils$3, w as GlobalRoot, y as utils$1, C as CssVars, n as index$1$1, $ as $d9n2, u as useGlobalEventBus, z as UnwrappedButtonBar, A as ButtonBarAlignment, U as UnwrappedButton, G as GlobalEventTypes, g as UnwrappedCaption, T as TreeNodeCheckedChangeFrom, E as UnwrappedSection, B as ButtonInk, e as ButtonFill } from "./rainbow-d9-n2-v6HY_bjb.js";
import { i as index$1, r as registerN2Widgets } from "./rainbow-d9-n3-wStcAEft.js";
import { r as registerPlayground } from "./rainbow-d9-n5-XeFeRsq9.js";
import { r as registerPlayground$1 } from "./rainbow-d9-n6-Itq94XnZ.js";
import { r as registerPlanSelect, u as useDemoMarkdown, C as CustomEventHandler, N as N2DemoDialogHandler, T as ThaiPlanSelection, a as ThaiPlanSelectionData, b as ThaiPlanSelectionMarkdown, P as PlanSelectionCssVars } from "./rainbow-d9-thai-plan-selection-UEQUICP2.js";
import { d as dayjs, W as WeekOfYear, Q as QuarterOfYear, D as Duration, I as IsToday, R as RelativeTime, A as ArraySupport, O as ObjectSupport, C as CustomParseFormat, U as UTC, B as BuddhistEra } from "./dayjs-ZafkOS5_.js";
import { u as use, a as install, b as install$1, c as install$2, d as install$3, e as install$4, f as install$5, h as installLabelLayout, j as installUniversalTransition, k as install$6, l as install$7 } from "./echarts-v5L9gyiQ.js";
import { n as nanoid } from "./vendor-FxhWBsAz.js";
import { M as Markdown } from "./react-markdown-GotOSe77.js";
import { r as remarkGfm } from "./remark-qd4D0pQk.js";
import { S as SyntaxHighlighter, m as materialDark, _ as __vitePreload } from "./react-syntax-highlighter-oxQQ9Dh9.js";
import "./babel-zvTTnt5j.js";
import "./mdast-33DRlCV7.js";
import "./micromark-KvKwYovJ.js";
import "./unist-QXG10VXN.js";
import "./zrender-DEzoFf2M.js";
import "./refractor-9DbcI5Fa.js";
import "./hastscript-Y-cXBd4y.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var define_process_env_default = { GITHUB_STATE: "/home/runner/work/_temp/_runner_file_commands/save_state_cb3e4f61-b762-43c0-9037-8376e6adef6d", npm_package_scripts_build_n5_ci: "cd ./d9-n5 && yarn build-ci", npm_package_scripts_build_sample_cra: "cd ./d9-sample-cra && yarn build", STATS_TRP: "true", DEPLOYMENT_BASEPATH: "/opt/runner", DOTNET_NOLOGO: "1", npm_package_scripts_build_n6_ci: "cd ./d9-n6 && yarn build-ci", npm_package_dependencies__vitejs_plugin_react: "^4.2.1", USER: "runner", npm_config_version_commit_hooks: "true", npm_config_user_agent: "yarn/1.22.21 npm/? node/v18.20.3 linux x64", npm_package_dependencies__types_jest: "^29.5.4", CI: "true", npm_config_bin_links: "true", npm_package_bugs_url: "https://github.com/InsureMO/rainbow-d9/issues", npm_config_wrap_output: "", RUNNER_ENVIRONMENT: "github-hosted", GITHUB_ENV: "/home/runner/work/_temp/_runner_file_commands/set_env_cb3e4f61-b762-43c0-9037-8376e6adef6d", PIPX_HOME: "/opt/pipx", npm_node_execpath: "/opt/hostedtoolcache/node/18.20.3/x64/bin/node", npm_package_scripts_build_thai_all_ci: "yarn build-thai-plan-selection-ci", npm_config_init_version: "1.0.0", npm_package_devDependencies_gh_pages: "^6.1.1", npm_package_dependencies__babel_plugin_proposal_private_property_in_object: "^7.21.11", JAVA_HOME_8_X64: "/usr/lib/jvm/temurin-8-jdk-amd64", SHLVL: "1", HOME: "/home/runner", OLDPWD: "/home/runner/work/rainbow-d9/rainbow-d9", npm_package_browserslist_production_0: ">0.2%", RUNNER_TEMP: "/home/runner/work/_temp", GITHUB_EVENT_PATH: "/home/runner/work/_temp/_github_workflow/event.json", npm_package_scripts_build_all: "yarn build-n123 && yarn build-n5 && yarn build-n6 && yarn build-echarts && yarn build-thai-all", npm_package_browserslist_production_1: "not dead", npm_package_dependencies_react_syntax_highlighter: "^15.5.0", JAVA_HOME_11_X64: "/usr/lib/jvm/temurin-11-jdk-amd64", PIPX_BIN_DIR: "/opt/pipx_bin", GITHUB_REPOSITORY_OWNER: "InsureMO", npm_package_volta_node: "22.2.0", npm_config_init_license: "MIT", npm_package_browserslist_production_2: "not op_mini all", GRADLE_HOME: "/usr/share/gradle-8.8", ANDROID_NDK_LATEST_HOME: "/usr/local/lib/android/sdk/ndk/26.3.11579264", JAVA_HOME_21_X64: "/usr/lib/jvm/temurin-21-jdk-amd64", STATS_RDCL: "true", GITHUB_RETENTION_DAYS: "90", YARN_WRAP_OUTPUT: "false", npm_package_scripts_build_thai_plan_selection_ci: "cd ./d9-thai-plan-selection && yarn build-ci", npm_package_scripts_build_n1: "cd ./d9-n1 && yarn build", npm_config_version_tag_prefix: "v", npm_package_dependencies__rainbow_d9_n2: "1.1.32", GITHUB_REPOSITORY_OWNER_ID: "38915232", POWERSHELL_DISTRIBUTION_CHANNEL: "GitHub-Actions-ubuntu22", AZURE_EXTENSION_DIR: "/opt/az/azcliextensions", GITHUB_HEAD_REF: "", npm_package_scripts_build_n2: "cd ./d9-n2 && yarn build", npm_package_dependencies__types_styled_components: "^5.1.34", npm_package_dependencies__rainbow_d9_n3: "1.1.32", npm_package_dependencies__rainbow_d9_echarts: "1.1.32", SYSTEMD_EXEC_PID: "593", npm_package_scripts_build_echarts: "cd ./d9-echarts && yarn build", npm_package_scripts_build_n3: "cd ./d9-n3 && yarn build", GITHUB_GRAPHQL_URL: "https://api.github.com/graphql", npm_package_description: "Assume the following envs are ready, otherwise contact the tech guy.", npm_package_scripts_predeploy: "npm run build", npm_package_dependencies__rainbow_d9_n5: "1.1.32", GOROOT_1_20_X64: "/opt/hostedtoolcache/go/1.20.14/x64", NVM_DIR: "/home/runner/.nvm", npm_package_readmeFilename: "README.md", npm_package_scripts_build_n5: "cd ./d9-n5 && yarn build", npm_package_dependencies__types_react: "^18.2.21", npm_package_dependencies__testing_library_react: "^13.4.0", npm_package_dependencies__rainbow_d9_n6: "1.1.32", DOTNET_SKIP_FIRST_TIME_EXPERIENCE: "1", GOROOT_1_21_X64: "/opt/hostedtoolcache/go/1.21.11/x64", JAVA_HOME_17_X64: "/usr/lib/jvm/temurin-17-jdk-amd64", ImageVersion: "20240609.1.0", npm_package_scripts_build_n6: "cd ./d9-n6 && yarn build", RUNNER_OS: "Linux", GITHUB_API_URL: "https://api.github.com", GOROOT_1_22_X64: "/opt/hostedtoolcache/go/1.22.4/x64", SWIFT_PATH: "/usr/share/swift/usr/bin", RUNNER_USER: "runner", STATS_V3PS: "true", CHROMEWEBDRIVER: "/usr/local/share/chromedriver-linux64", JOURNAL_STREAM: "8:19333", GITHUB_WORKFLOW: "Publish to NPM", _: "/opt/hostedtoolcache/node/18.20.3/x64/bin/yarn", npm_package_private: "true", npm_package_dependencies_remark_gfm: "4.0.0", npm_package_scripts_build_thai_all: "yarn build-thai-plan-selection", npm_config_registry: "https://registry.yarnpkg.com", ACTIONS_RUNNER_ACTION_ARCHIVE_CACHE: "/opt/actionarchivecache", STATS_D: "true", GITHUB_RUN_ID: "9515610734", STATS_VMFE: "true", npm_package_workspaces_0: "d9-n1", GITHUB_REF_TYPE: "tag", BOOTSTRAP_HASKELL_NONINTERACTIVE: "1", GITHUB_WORKFLOW_SHA: "230ab52acc9d56bb1793ac3f03dc65c512023c49", GITHUB_BASE_REF: "", ImageOS: "ubuntu22", npm_package_scripts_build_n123_ci: "yarn build-n1-ci && yarn build-n2-ci && yarn build-n3-ci", npm_package_workspaces_1: "d9-n2", npm_config_ignore_scripts: "", npm_package_scripts_start: "vite", npm_package_dependencies_github_markdown_css: "^5.5.0", GITHUB_WORKFLOW_REF: "InsureMO/rainbow-d9/.github/workflows/release.yml@refs/tags/r-1.1.33", PERFLOG_LOCATION_SETTING: "RUNNER_PERFLOG", GITHUB_ACTION_REPOSITORY: "", npm_package_workspaces_2: "d9-n3", npm_package_browserslist_development_0: "last 1 chrome version", PATH: "/tmp/yarn--1718366178974-0.7408387310653299:/home/runner/work/rainbow-d9/rainbow-d9/d9-sample-cra/node_modules/.bin:/home/runner/.config/yarn/link/node_modules/.bin:/home/runner/work/rainbow-d9/rainbow-d9/node_modules/.bin:/opt/hostedtoolcache/node/18.20.3/x64/libexec/lib/node_modules/npm/bin/node-gyp-bin:/opt/hostedtoolcache/node/18.20.3/x64/lib/node_modules/npm/bin/node-gyp-bin:/opt/hostedtoolcache/node/18.20.3/x64/bin/node_modules/npm/bin/node-gyp-bin:/tmp/yarn--1718366178778-0.5756901118012074:/home/runner/work/rainbow-d9/rainbow-d9/node_modules/.bin:/home/runner/.config/yarn/link/node_modules/.bin:/home/runner/work/rainbow-d9/rainbow-d9/node_modules/.bin:/opt/hostedtoolcache/node/18.20.3/x64/libexec/lib/node_modules/npm/bin/node-gyp-bin:/opt/hostedtoolcache/node/18.20.3/x64/lib/node_modules/npm/bin/node-gyp-bin:/opt/hostedtoolcache/node/18.20.3/x64/bin/node_modules/npm/bin/node-gyp-bin:/opt/hostedtoolcache/node/18.20.3/x64/bin:/snap/bin:/home/runner/.local/bin:/opt/pipx_bin:/home/runner/.cargo/bin:/home/runner/.config/composer/vendor/bin:/usr/local/.ghcup/bin:/home/runner/.dotnet/tools:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin", NODE: "/opt/hostedtoolcache/node/18.20.3/x64/bin/node", ANT_HOME: "/usr/share/ant", DOTNET_MULTILEVEL_LOOKUP: "0", RUNNER_TRACKING_ID: "github_0f35939d-6637-4ac2-b0e3-f1bb6f04e30b", INVOCATION_ID: "da2226a01bfe4670905d43dee0d7521b", RUNNER_TOOL_CACHE: "/opt/hostedtoolcache", npm_package_name: "@rainbow-d9/sample-cra", npm_package_workspaces_3: "d9-n5", npm_package_browserslist_development_1: "last 1 firefox version", npm_package_repository_type: "git", npm_package_dependencies__types_react_syntax_highlighter: "^15.5.11", npm_package_dependencies__rainbow_d9_thai_plan_selection: "1.1.32", GITHUB_ACTION: "__run_5", GITHUB_RUN_NUMBER: "128", GITHUB_TRIGGERING_ACTOR: "bradwoo8621", RUNNER_ARCH: "X64", XDG_RUNTIME_DIR: "/run/user/1001", AGENT_TOOLSDIRECTORY: "/opt/hostedtoolcache", npm_package_scripts_build_thai_plan_selection: "cd ./d9-thai-plan-selection && yarn build", npm_package_workspaces_4: "d9-n6", npm_package_browserslist_development_2: "last 1 safari version", npm_package_workspaces_5: "d9-echarts", LANG: "C.UTF-8", VCPKG_INSTALLATION_ROOT: "/usr/local/share/vcpkg", npm_package_workspaces_6: "d9-thai-plan-selection", npm_package_dependencies_react_dom: "^18.2.0", CONDA: "/usr/share/miniconda", RUNNER_NAME: "GitHub Actions 5", XDG_CONFIG_HOME: "/home/runner/.config", STATS_VMD: "true", GITHUB_REF_NAME: "r-1.1.33", GITHUB_REPOSITORY: "InsureMO/rainbow-d9", STATS_D_D: "true", npm_lifecycle_script: "vite build", npm_package_workspaces_7: "d9-sample-cra", npm_package_eslintConfig_extends_0: "react-app", npm_package_dependencies_vite_plugin_markdown: "^2.2.0", npm_package_dependencies_react_markdown: "9.0.1", npm_package_dependencies__types_node: "^20.5.3", STATS_UE: "true", ANDROID_NDK_ROOT: "/usr/local/lib/android/sdk/ndk/25.2.9519653", GITHUB_ACTION_REF: "", DEBIAN_FRONTEND: "noninteractive", npm_package_scripts_build_sample_cra_ci: "cd ./d9-sample-cra && yarn build", npm_config_version_git_message: "v%s", npm_package_eslintConfig_extends_1: "react-app/jest", GITHUB_REPOSITORY_ID: "704514093", GITHUB_ACTIONS: "true", npm_lifecycle_event: "build", npm_package_version: "1.1.32", npm_package_repository_url: "git+https://github.com/InsureMO/rainbow-d9.git", npm_package_dependencies__testing_library_jest_dom: "^5.17.0", GITHUB_REF_PROTECTED: "false", npm_config_argv: '{"remain":[],"cooked":["run","build-sample-cra"],"original":["build-sample-cra"]}', npm_package_volta_yarn: "1.22.21", npm_package_scripts_build: "vite build", npm_package_dependencies__testing_library_user_event: "^13.5.0", GITHUB_WORKSPACE: "/home/runner/work/rainbow-d9/rainbow-d9", ACCEPT_EULA: "Y", GITHUB_JOB: "create-sample-pages", RUNNER_PERFLOG: "/home/runner/perflog", npm_package_dependencies_vite: "^5.0.13", GITHUB_SHA: "230ab52acc9d56bb1793ac3f03dc65c512023c49", GITHUB_RUN_ATTEMPT: "1", npm_config_version_git_tag: "true", npm_config_version_git_sign: "", GITHUB_REF: "refs/tags/r-1.1.33", GITHUB_ACTOR: "bradwoo8621", ANDROID_SDK_ROOT: "/usr/local/lib/android/sdk", npm_package_license: "MIT", npm_config_strict_ssl: "true", LEIN_HOME: "/usr/local/lib/lein", npm_package_scripts_build_n123: "yarn build-n1 && yarn build-n2 && yarn build-n3", GITHUB_PATH: "/home/runner/work/_temp/_runner_file_commands/add_path_cb3e4f61-b762-43c0-9037-8376e6adef6d", JAVA_HOME: "/usr/lib/jvm/temurin-11-jdk-amd64", PWD: "/home/runner/work/rainbow-d9/rainbow-d9/d9-sample-cra", GITHUB_ACTOR_ID: "2330098", RUNNER_WORKSPACE: "/home/runner/work/rainbow-d9", npm_execpath: "/opt/hostedtoolcache/node/18.20.3/x64/lib/node_modules/yarn/bin/yarn.js", npm_package_scripts_build_all_ci: "yarn build-n123-ci && yarn build-n5-ci && yarn build-n6-ci && yarn build-echarts-ci && yarn build-thai-all-ci", HOMEBREW_CLEANUP_PERIODIC_FULL_DAYS: "3650", GITHUB_EVENT_NAME: "push", HOMEBREW_NO_AUTO_UPDATE: "1", ANDROID_HOME: "/usr/local/lib/android/sdk", GITHUB_SERVER_URL: "https://github.com", GECKOWEBDRIVER: "/usr/local/share/gecko_driver", LEIN_JAR: "/usr/local/lib/lein/self-installs/leiningen-2.11.2-standalone.jar", GHCUP_INSTALL_BASE_PREFIX: "/usr/local", GITHUB_OUTPUT: "/home/runner/work/_temp/_runner_file_commands/set_output_cb3e4f61-b762-43c0-9037-8376e6adef6d", npm_package_author_name: "Rainbow Team", EDGEWEBDRIVER: "/usr/local/share/edge_driver", STATS_EXT: "true", npm_package_scripts_build_n1_ci: "cd ./d9-n1 && yarn build-ci", npm_config_save_prefix: "^", npm_config_ignore_optional: "", ANDROID_NDK: "/usr/local/lib/android/sdk/ndk/25.2.9519653", SGX_AESM_ADDR: "1", CHROME_BIN: "/usr/bin/google-chrome", npm_package_scripts_build_n2_ci: "cd ./d9-n2 && yarn build-ci", npm_package_scripts_deploy: "gh-pages -d build", npm_package_scripts_preview: "vite preview", SELENIUM_JAR_PATH: "/usr/share/java/selenium-server.jar", STATS_EXTP: "https://provjobdsettingscdn.blob.core.windows.net/settings/provjobdsettings-0.5.181+6/provjobd.data", npm_package_scripts_build_echarts_ci: "cd ./d9-echarts && yarn build-ci", npm_package_scripts_build_n3_ci: "cd ./d9-n3 && yarn build-ci", npm_package_dependencies_web_vitals: "^2.1.4", npm_package_dependencies_typescript: "^5.1.6", INIT_CWD: "/home/runner/work/rainbow-d9/rainbow-d9", ANDROID_NDK_HOME: "/usr/local/lib/android/sdk/ndk/25.2.9519653", GITHUB_STEP_SUMMARY: "/home/runner/work/_temp/_runner_file_commands/step_summary_cb3e4f61-b762-43c0-9037-8376e6adef6d", npm_package_dependencies_react: "^18.2.0", npm_package_dependencies__types_react_dom: "^18.2.7", NODE_ENV: "production" };
dayjs.extend(WeekOfYear);
dayjs.extend(QuarterOfYear);
dayjs.extend(Duration);
dayjs.extend(IsToday);
dayjs.extend(RelativeTime);
dayjs.extend(ArraySupport);
dayjs.extend(ObjectSupport);
dayjs.extend(CustomParseFormat);
dayjs.extend(UTC);
dayjs.extend(BuddhistEra);
(() => {
  if (define_process_env_default.VITE_ENABLE_D9_LOGGER === "true") {
    N1Logger.enableLevel("debug");
  }
  const widgetsHelper = index$1.createOrGetTranslateHelperSingleton();
  registerN2Widgets(widgetsHelper);
  registerCharts(widgetsHelper);
  registerPlanSelect(widgetsHelper);
  registerPlayground(widgetsHelper);
  registerPlayground$1(widgetsHelper);
  utils$3.setCalendarDefaults({
    dateFormat: "DD/MM/YYYY",
    // timeFormat: askDisplayTimeFormat(),
    // datetimeFormat: askDateTimeFormat(),
    useCalendarIcon: true
  });
})();
window.VUtils = VUtils;
window.PPUtils = PPUtils;
window.MUtils = MUtils;
const first = [
  120,
  200,
  150,
  80,
  70,
  110,
  130
];
const second = [
  {
    value: 40,
    name: "Mon"
  },
  {
    value: 38,
    name: "Tue"
  },
  {
    value: 32,
    name: "Wed"
  },
  {
    value: 30,
    name: "Thu"
  },
  {
    value: 28,
    name: "Fri"
  },
  {
    value: 26,
    name: "Sat"
  },
  {
    value: 22,
    name: "Sun"
  }
];
const third = {
  criteria: {
    weekOfYear: 2,
    gender: "F"
  },
  data: [
    {
      value: 40,
      name: "Mon"
    },
    {
      value: 38,
      name: "Tue"
    },
    {
      value: 32,
      name: "Wed"
    },
    {
      value: 30,
      name: "Thu"
    },
    {
      value: 28,
      name: "Fri"
    },
    {
      value: 26,
      name: "Sat"
    },
    {
      value: 22,
      name: "Sun"
    }
  ]
};
const DemoData$b = {
  first,
  second,
  third
};
const markdown$c = "# Page::Demo Tab\n\n## Section::# 10. ECharts\n\n### Section::## 10.1 Simple Charts\n\n- Chart::Use Canvas, Default::first\n	- $fc\n	- options:\n	  ```javascript\n	  return {\n	    xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},\n	    yAxis: {type: 'value'},\n	    series: [{type: 'bar'}]\n	  }\n	  ```\n	- merge:\n	  ```javascript\n	  options.series[0].data = data;\n	  return options;\n	  ```\n- Chart::Use SVG::first\n	- $fc\n	- initOptions:\n	  ```javascript\n	  return { renderer: 'svg' };\n	  ```\n	- options:\n	  ```javascript\n	  return {\n	    xAxis: {type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},\n	    yAxis: {type: 'value'},\n	    series: [{type: 'bar'}]\n	  }\n	  ```\n	- merge:\n	  ```javascript\n	  options.series[0].data = data;\n	  return options;\n	  ```\n- Button::\n	- text: Random Data\n	- click:\n	  ```javascript\n	  const {first: oldFirst, second: oldSecond} = options.model;\n	  options.model.first = new Array(7).fill(0).map(() => Math.ceil(Math.random() * 100));\n	  options.global.root.fire('value-changed', '/first', oldFirst, options.model.first);\n	  ```\n\n### Section::## 10.2 Autonomous Chart\n\n- AutChart::Refresh every 1 second::second\n	- $fc\n	- options:\n	  ```javascript\n	  return {\n	    legend: {top: 'bottom'},\n	    series: [\n	      {\n	        name: 'Nightingale Chart', type: 'pie', radius: ['20%', '60%'], center: ['50%', '50%'], roseType: 'area',\n	        itemStyle: { borderRadius: 8 }\n	      }\n	    ]\n	  }\n	  ```\n	- merge:\n	  ```javascript\n	  options.series[0].data = data;\n	  return options;\n	  ```\n	- fetch:\n	  ```typescript\n	  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(name => {\n	    return { value: Math.ceil(Math.random() * 30) + 20, name };\n	  });\n	  ```\n	- interval: 1\n\n### Section::## 10.3 Chart on External Data\n\n- data-rows-auto-1fr: true\n\n- Dropdown::Month::third.criteria.weekOfYear\n	- options: 1:Jan; 2:Feb; 3:Mar; 4:Apr; 5:May; 6:Jun; 7:Jul; 8:Aug; 9:Sep; 10:Oct; 11:Nov; 12:Dec\n	- place: $row: 1, $col: 1, $cols: 3\n- Dropdown::Gender::third.criteria.gender\n	- options: F:Female;M:Male\n	- place: $row: 2, $col: 1, $cols: 3\n- RelChart::::third.data\n	- place: $row: 1, $rows: 2, $col: 4, $cols: 3\n	- options:\n	  ```javascript\n	  return {\n	    legend: {top: 'bottom'},\n	    series: [\n	      {\n	        name: 'Nightingale Chart', type: 'pie', radius: ['20%', '60%'], center: ['50%', '50%'], roseType: 'area',\n	        itemStyle: { borderRadius: 8 }\n	      }\n	    ]\n	  }\n	  ```\n	- merge:\n	  ```javascript\n	  options.series[0].data = data;\n	  return options;\n	  ```\n	- fetch:\n	  ```typescript\n	  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(name => {\n	    return { value: Math.ceil(Math.random() * 30) + 20, name };\n	  });\n	  ```\n	- criteria:\n		- on: /third.criteria.**";
use([
  install,
  install$1,
  install$2,
  install$3,
  install$4,
  install$5,
  installLabelLayout,
  installUniversalTransition,
  install$6,
  install$7
]);
const ECharts = () => {
  const def = useDemoMarkdown(markdown$c);
  const externalDefs = {
    mergeData: {
      first: (_options, data) => {
        return {
          xAxis: { type: "category", data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
          yAxis: { type: "value" },
          series: [
            { data, type: "bar" }
          ]
        };
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$b, externalDefs })
  ] });
};
const EChartsData = DemoData$b;
const EChartsMarkdown = markdown$c;
const ribs = [
  {
    propA: "Property A 1 @ribs",
    propB: "Property B 1 @ribs"
  },
  {
    propA: "Property A 2 @ribs",
    propB: "Property B 2 @ribs"
  }
];
const DemoData$a = {
  ribs
};
const markdown$b = "# Page::Demo Tab\n\n## Section::# 4. Array Panel\n\n### Ribs::::ribs\n\n- removable, addable, disableOnCannotAdd, !showRowIndex\n- elementTitle:\n	- labelOnValue\n	- property: propA\n- couldAddElement: @ext.couldAddElement\n- initExpanded: `return index === 1`\n- Input::Property A::propA\n- Input::Property B::propB\n";
utils$1.setRibsDefaults({ useSectionStyleIcons: true });
const N2ArrayPanel = () => {
  const def = useDemoMarkdown(markdown$b);
  const externalDefs = {
    couldAddElement: async (options, _handlers) => {
      return (options.model ?? []).length < 5;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$a, externalDefs })
  ] });
};
const N2ArrayPanelData = DemoData$a;
const N2ArrayPanelMarkdown = markdown$b;
const title = "Hello, I am a demo dialog.";
const propA = "Property A @root";
const decorateInput = "123";
const decorateNumberInput3 = 12345.678;
const caption = "Some Caption";
const nested = {
  propA: "Property A @nested"
};
const DemoData$9 = {
  title,
  propA,
  decorateInput,
  "data-value-decorateNumberInput3": 3456,
  decorateNumberInput3,
  caption,
  nested
};
const markdown$a = "# Page::Demo Tab\n\n## Section::# 1.1. Basic Widgets - Decorated Input\n\n- DecoInput::Decorate Input::decorateInput\n	- label:\n		- labelOnValue\n		- property: decorateInput\n		- leads: Masked:\n	- leads: Hello\n	- tails: World\n	- regex: abc$,^def; Starts with \"def\" or ends with \"abc\".\n	- validateScopes: s1\n	- required\n	- data-di-tip-body: return 'Hello, I am a mask input.'\n	- data-di-tip-tag: return 'data-decorate-input'\n	- data-di-tip-max-width: 150\n	- data-di-tip-delay: 2\n	- mask:\n	  ```\n	  return {\n		mask: '**** **** ****',\n		lazy: false,\n		autofix: true\n	  }\n	  ```\n- DecoNumber::Decorate Number Input::decorateNumberInput\n	- label:\n		- valueToLabel: `'Number, Grouping'`\n	- leads: $icons.check;$\n	- tails: %;$icons.caretLeft\n	- numeric\n	- placeholder: A placeholder\n	- grouping\n	- data-tip-title: return 'Hello'\n	- data-tip-body: return 'I am a number input.'\n	- data-tip-tag: return 'data-decorate-input'\n- DecoNumber::0 - 9 are Legal Keys::decorateNumberInput2\n	- leads: $icons.check;$\n	- tails: %;$icons.caretLeft\n	- tip: @ext.tip.numeric2\n	- numeric\n	- onKeyDown: @ext.keydown.numeric\n- DecoNumber::::decorateNumberInput3\n	- data-value2: $pp.decorateNumberInput3\n	- data-value-func:\n	  ```javascript\n	  return options.model.decorateNumberInput3 < 10000 ? 'lt10000': 'gte10000';\n	  ```\n	- label: Contract Value\n	- format: @ext.deco.numericFormat\n	- tip:\n	  ```javascript\n	  // console.log(options.model);\n	  return {body: `Hello, I am number input #3, current value is ${options.model.decorateNumberInput3}.`}\n	  ```\n	- repaint:\n		- on: decorateNumberInput3\n\n## Section::# 1.2. Basic Widgets - Dropdown\n\n- Dropdown::::dropdown\n	- label: Dropdown\n	- options:\n		- 1: Option #1\n		- 2: Option #2\n	- data-tip-body: return 'I am a simple dropdown.'\n- Dropdown::::dropdown2\n	- label: Dropdown #2\n	- options: @ext.dropdown2\n	- data-tip-body:\n	  ```javascript\n	  // console.log(options.model);\n	  return `Hello, I am dropdown #2, current value is ${options.model.dropdown2}.`;\n	  ```\n- MultiDropdown::Multiple Dropdown::multiDropdown\n	- options:\n		- 1: Option #1\n		- 2: Option #2\n		- 3: A very very very very very very very very very very very very very very very very very very long Option #3\n		- 4: Option #4\n		- 5: Option #5\n	- data-tip-body: return 'I am a multiple-choices dropdown.'\n\n## Section::# 1.3. Basic Widgets - Calendar\n\n- DateTime::Buddhist Era::buddhistEra\n	- dateFormat: BBBB/MM/DD\n	- timeFormat: HH\n	- renderOn: desktop, mobile\n	- !autoConfirm\n	- couldPerform:\n	  ```javascript\n	  // April 2024, and after\n	  if (['year', 'month', 'date'].includes(options.checkType)) {\n	    return (options.valueToCheck.year() === 2024 && options.valueToCheck.month() >= 3)\n	      || options.valueToCheck.year() > 2024;\n	  } else {\n	    return options.valueToCheck.hour() >= 9 && options.valueToCheck.hour() < 18;\n	  }\n	  ```\n	- data-tip-body: return 'I am a Buddhist Era date time picker.'\n- Date::Buddhist Year & Month::buddhistEra2\n	- dateFormat: BBBB/MM\n- Date::Hide Shortcuts::date3\n	- data-calendar-hide-shortcuts\n	- autoConfirmOnDate\n- Time::Time Only::time1\n	- timeFormat: HH:mm:ss\n- Date::Only Visible on Desktop::mobileDesktop\n	- renderOn:\n	  ```\n	  // this line canont be ignored, since renderOn attribute build will not treat single line as function body\n	  return ['desktop', 'mobile'];\n	  ```\n- Date::Only Visible on Mobile::mobileDate\n	- renderOn: mobile\n\n## Section::# 1.4. Basic Widgets - Label\n\n- Label::A Label::label\n	- valueToLabel: `'Hello World'`\n	- leads: $icons.check;$\n	- tails: %;$icons.caretLeft\n	- data-tip-body: return 'I am a label.'\n- Caption::A Caption::caption\n	- $fc\n	- text: Hello World\n- Caption::A Caption::caption\n	- $fc\n	- valueToLabel: `'Caption is [' + value + ']'`\n\n## Section::# 1.4. Basic Widgets - Radio\n\n- Radio::A Radio::aRadio\n	- data-tip-body: return 'I am a radio.'\n- Radios::Radio Group::radios1\n	- options:\n		- 1: Option #1\n		- 2: Option #2\n		- 3: Option #3\n		- 4: Option #4\n		- 5: A very very very very very very very very very very very very very very very very very very long Option #5\n	- place: 6\n	- columns: 4\n	- data-tip-body: return 'I am a radios.'\n- Radios::Radio Group, Fake as Toggle Buttons::radios2\n	- data-as-toggle-button\n	- options:\n		- 1: Option #1\n		- 2: Option #2\n		- 3: Option #3\n		- 4: Option #4\n		- 5: Option #5\n	- place: 12\n\n## Section::# 1.5. Basic Widgets - Checkbox\n\n- Checkbox::A Checkbox::aCheckbox\n	- data-tip-body: return 'I am a checkbox.'\n- Checks::Checkbox Group::checks1\n	- options:\n		- 1: Option #1\n		- 2: Option #2\n		- 3: Option #3\n		- 4: Option #4\n		- 5: A very very very very very very very very very very very very very very very very very very long Option #5\n	- place: 6\n	- columns: 4\n	- data-tip-body: return 'I am a checkboxes.'\n- Checks::Checkbox Group::checks2\n	- options:\n		- 1: Option #1\n		- 2: Option #2\n		- 3: Option #3\n		- 4: Option #4\n	- single\n- Checks::Checkbox Group, Fake as Toggle Buttons::checks3\n	- data-as-toggle-button\n	- options:\n		- 1: Option #1\n		- 2: Option #2\n		- 3: Option #3\n		- 4: Option #4\n		- 5: Option #5\n	- place: 12\n\n## Section::# 1.6. Basic Widgets - Button\n\n- Button::\n	- text: Validate Inputs, Scope \"S1\"\n	- click: validate s1\n	- data-tip-body: return 'I am a button.'\n\n- Caption::\n	- text: Dropdown\n		- property: BizTransaction.PaymentMethod\n		- disabled, data-as-label\n		- please: Let you see me.\n		- options: F: Female\n	- click:\n	  ```\n	  const {global: {sc}, root, model} = options;\n	  await sc( 'dialog', 'direct-card', {root, model});\n	  ```\n";
const StyleController = qe.div.attrs({})`
    + div[data-w=d9-page] {
        div[data-w=d9-calendar][data-calendar-hide-shortcuts] {
            div[data-w=d9-calendar-date-picker] {
                grid-template-columns: 1fr;

                > div[data-w=d9-calendar-date-picker-shortcuts] {
                    display: none;
                }
            }
        }

        div[data-w=d9-radios][data-as-toggle-button] {
            > span[data-w=d9-radios-option] {
                border: ${CssVars.BORDER};
                border-radius: ${CssVars.BORDER_RADIUS};
                margin-left: 0;
                margin-right: 0;
                transition: color 0.3s, border-color 0.3s, background-color 0.3s, box-shadow 0.3s;

                &:not(:first-child) {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    margin-left: -1px;
                }

                &:not(:last-child) {
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }

                &:hover {
                    box-shadow: ${CssVars.HOVER_SHADOW};
                }

                &[data-checked=true] {
                    color: ${CssVars.INVERT_COLOR};
                    border-color: ${CssVars.PRIMARY_COLOR};
                    background-color: ${CssVars.PRIMARY_COLOR};

                    &:hover {
                        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
                    }
                }

                > div[data-w=d9-radio] {
                    display: none;
                }
            }
        }

        div[data-w=d9-checkboxes][data-as-toggle-button] {
            > span[data-w=d9-checkboxes-option] {
                border: ${CssVars.BORDER};
                border-radius: ${CssVars.BORDER_RADIUS};
                margin-left: 0;
                margin-right: 8px;
                transition: color 0.3s, border-color 0.3s, background-color 0.3s, box-shadow 0.3s;

                &:hover {
                    box-shadow: ${CssVars.HOVER_SHADOW};
                }

                &[data-checked=true] {
                    color: ${CssVars.INVERT_COLOR};
                    border-color: ${CssVars.PRIMARY_COLOR};
                    background-color: ${CssVars.PRIMARY_COLOR};

                    &:hover {
                        box-shadow: ${CssVars.PRIMARY_HOVER_SHADOW};
                    }
                }

                > div[data-w=d9-checkbox] {
                    display: none;
                }
            }
        }
    }
`;
const N2BasicWidgets = () => {
  const def = useDemoMarkdown(markdown$a);
  const externalDefs = {
    deco: {
      numericFormat: {
        thousandsSeparator: ",",
        radix: ".",
        normalizeZeros: false,
        padFractionalZeros: true,
        scale: 2
      }
    },
    tip: {
      numeric2: { body: /* @__PURE__ */ jsxRuntimeExports.jsxs(index$1$1.TipLabel, { children: [
        "Numeric input #2.",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Tips line #2."
      ] }) }
    },
    keydown: {
      numeric: (event) => {
        console.log(`Key event[key=${event.key}, code=${event.code}] capture.`);
        if (event.key.length === 1 && !["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(event.key)) {
          event.preventDefault();
          return false;
        }
      }
    },
    dropdown2: async (_options) => {
      return [
        { value: "1", label: "Option #1" },
        { value: "2", label: "Option #2" }
      ];
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StyleController, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$9, externalDefs })
  ] });
};
const N2BasicWidgetsData = DemoData$9;
const N2BasicWidgetsMarkdown = markdown$a;
const section1Title = "# 2.1. First Section, Buttons to Open Demo Dialog";
const DemoData$8 = {
  section1Title
};
const markdown$9 = "# Page::Demo Tab\n\n## Section::\n\n- title:\n	- labelOnValue\n	- property: section1Title\n- ButtonBar::::\n	- alignment: left\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.remove\n		- disabled\n	- Button::::\n		- fill: plain\n		- click: dialog:demo-dialog\n		- leads: $icons.check\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.times\n		- ink: danger\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.back\n		- fill: plain\n		- ink: danger\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.arrowDown\n		- ink: success\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.caretDown\n		- fill: plain\n		- ink: success\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.caretLeft\n		- ink: warn\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.caretRight\n		- fill: plain\n		- ink: warn\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.collapse\n		- ink: info\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.expand\n		- fill: plain\n		- ink: info\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.spinner\n		- ink: waive\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.time\n		- fill: plain\n		- ink: waive\n	- Button::::\n		- click: dialog:demo-dialog\n		- leads: $icons.date\n		- fill: plain\n		- ink: primary\n		- disabled\n- ButtonBar::::\n	- alignment: left\n	- Button::::\n		- text: Open Demo Dialog\n		- click: dialog:demo-dialog\n		- leads: [\n		- tails: ]\n	- Button::::\n		- text: Open Demo Dialog\n		- click: dialog:demo-dialog\n		- fill: fill\n		- ink: success\n		- leads: $icons.check;$\n		- disabled\n	- Button::::\n		- text: Open Demo Alert\n		- click: alert: Hello, this is a demo alert.\n		- ink: waive\n		- leads: $icons.check;$\n- ButtonBar::::\n	- alignment: left\n	- Button::::\n		- text: Open Demo Dialog\n		- click: dialog:demo-dialog\n		- fill: plain\n		- ink: danger\n		- leads: $icons.check;$\n		- tails: %;$icons.caretLeft\n		- disabled\n	- Button::::\n		- text: Print in Console\n		- click:\n		  ```javascript\n		  console.log(options);\n		  ```\n		- fill: plain\n		- ink: info\n		- leads: $icons.check;$\n- ButtonBar::::\n	- alignment: left\n	- Button::::\n		- text: Open Demo Dialog\n		- click: dialog:demo-dialog\n		- fill: link\n		- ink: warn\n		- leads: $icons.check;$\n		- disabled\n	- Button::::\n		- text: Open Native Alert\n		- click: custom:custom-alert\n		- fill: link\n		- ink: waive\n		- leads: $icons.check;$\n\n## Section::# 2.2. Last Section, Bottom Bar\n\n- ButtonBar::::\n	- alignment: right\n	- Button::::\n		- text: Exit";
const N2Buttons = () => {
  const def = useDemoMarkdown(markdown$9);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$8 })
  ] });
};
const N2ButtonsData = DemoData$8;
const N2ButtonsMarkdown = markdown$9;
const pagination$1 = {
  pageNumber: 2,
  pageCount: 15,
  pageSize: 20,
  itemCount: 286
};
const DemoData$7 = {
  pagination: pagination$1
};
const markdown$8 = "# Page::Demo Tab\n\n## Section::# 8. Internationalization\n\n- DecoInput::Test1::test1\n	- required\n	- placeholder: Test1\n- Dropdown::Test2::test2\n	- required: Test 2 is required.\n	- options:\n		- F: Female\n		- M: Male\n- Pagination::::pagination\n	- freeWalk\n	- sizes: 10;20;30\n";
$d9n2.intl.labels["zh"] = {
  "# 8. Internationalization": "# 8. 国际化",
  Test1: "测试1",
  Test2: "测试2",
  Female: "女",
  Male: "男",
  "Field is required.": "字段不能为空.",
  "Test 2 is required.": "测试2不能为空.",
  pagination: {
    page: "第",
    of: "页, 共",
    pages: "页,",
    afterSize: "行每页,",
    total: "共",
    unknownItemCount: "???",
    items: "行."
  }
};
const Languages = () => {
  const { fire } = useGlobalEventBus();
  const onEnClicked = () => {
    $d9n2.intl.language = "en-US";
    fire(GlobalEventTypes.LANGUAGE_CHANGED, "en-US");
  };
  const onZhClicked = () => {
    $d9n2.intl.language = "zh";
    fire(GlobalEventTypes.LANGUAGE_CHANGED, "zh");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(UnwrappedButtonBar, { alignment: ButtonBarAlignment.CENTER, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(UnwrappedButton, { onClick: onEnClicked, children: "EN" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UnwrappedButton, { onClick: onZhClicked, children: "ZH" })
  ] });
};
const N2Intl = () => {
  const def = useDemoMarkdown(markdown$8);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$7 })
  ] });
};
const N2IntlData = DemoData$7;
const N2IntlMarkdown = markdown$8;
const a = "";
const b = "b";
const clearMe = "something";
const DemoData$6 = {
  a,
  b,
  clearMe
};
const markdown$7 = "# Page::Demo Tab\n\n## Section::# 7. Monitors\n\n- Input::Property A::a\n	- repaint:\n		- on: a\n- Input::Shadow of Property A::a\n	- disabled\n	- repaint:\n		- on: a\n- Input::Clear Me when Property A Changed::clearMe\n	- disabled\n	- clearMe:\n		- on: a\n- Input::Last 2 Chars of Property A::last2Chars\n	- disabled\n	- watch:\n		- on: a\n		- handle:\n		  ```javascript\n		  model.last2Chars = model.a.slice(-2);\n          return 'repaint';\n		  ```\n- Input::Property B, Disabled When \"A\" Is Empty::b\n	- place: 2, 1\n	- disabled:\n		- on: a\n		- handle: if ((model.a ?? '').length === 0) {\n		  return true;\n		  } else {\n		  return false;\n		  }\n- Input::Property C, Invisible When \"A\" Is Empty::c\n	- place: 3, 1\n	- visible:\n		- on: a\n		- handle:\n		  ```javascript\n		  if ((model.a ?? '').length === 0) {\n		    return false;\n		  } else {\n		    return true;\n		  }\n		  ```\n- Input::Property D::d\n	- place: 4, 1\n	- required\n	- validate:\n		- on: a\n		- handle:\n		  ```javascript\n		  if (VUtils.isBlank(model.a)) {\n		    return value === 'blank' ? {valid: true}: {valid:false, failReason: 'A is blank, D should be \"blank\".'};\n		  } else if (VUtils.isNumber(model.a).test) {\n		    return value === 'number' ? {valid: true}: {valid:false, failReason: 'A is number, D should be \"number\".'};\n		  } else {\n		    return value === 'string' ? {valid: true}: {valid:false, failReason: 'A is string, D should be \"string\"'};\n		  }       \n		  ```\n- Input::Property X::x\n	- place: 5, 1\n	- watch:\n		- on: x\n		- handle:\n		  ```javascript\n		  const oldValue = model.y;\n		  model.y = `${model.x} and y`;\n		  console.log(`[${oldValue}]`, `[${model.y}]`)\n		  return ['value-changed', {path: '/y', from: oldValue, to: model.y}]\n		  ```\n- Input::Property Y::y\n	- place: 5, 4\n	- visible:\n		- on: y\n		- handle: `return (model.y ?? '').startsWith('123')`";
const ALabel = () => {
  const { on, off } = useBridgeEventBus();
  const [changes, setChanges] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const onValueChanged = (args) => {
      setChanges((changes2) => {
        var _a;
        const { absolutePath, from, to } = args;
        const updated = [
          {
            index: (((_a = changes2[0]) == null ? void 0 : _a.index) ?? 0) + 1,
            message: `Value changed at [${absolutePath}] from [${from}] to [${to}].`
          },
          ...changes2
        ];
        updated.length = Math.min(5, updated.length);
        return updated;
      });
    };
    on(BridgeToRootEventTypes.LISTEN_VALUE_CHANGED, onValueChanged);
    return () => {
      off(BridgeToRootEventTypes.LISTEN_VALUE_CHANGED, onValueChanged);
    };
  }, [on, off]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(UnwrappedCaption, { style: { flexDirection: "column", alignItems: "start", margin: "16px 0", height: "unset" }, children: changes.map((change) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { lineHeight: "20px" }, children: `${change.index}. ${change.message}` }) }, change.index);
  }) });
};
const AButton = (props) => {
  const { data } = props;
  const { fire } = useBridgeEventBus();
  const onClicked = () => {
    const oldValue = data.a;
    if (VUtils.isNotEmpty(oldValue)) {
      data.a = "";
      fire(BridgeToRootEventTypes.NOTIFY_VALUE_CHANGED, {
        absolutePath: "/a",
        from: oldValue,
        to: data.a
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(UnwrappedButton, { onClick: onClicked, children: "Clear A" });
};
const N2Monitors = () => {
  const def = useDemoMarkdown(markdown$7);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(BridgeEventBusProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$6 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ALabel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AButton, { data: DemoData$6 })
  ] });
};
const N2MonitorsData = DemoData$6;
const N2MonitorsMarkdown = markdown$7;
const markdown$6 = "# Page::Test Page\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
const DemoData$5 = {
  markdown: markdown$6
};
const markdown$5 = "# Page::Demo Tab\n\n## Section::# 999. D9 Playground\n\n- Playground::::markdown\n  - useCharts\n  - externalDefs: @ext.playground.externalDefs\n  - externalDefsTypes: @ext.playground.externalDefsTypes\n";
const N2Playground = () => {
  const def = useDemoMarkdown(markdown$5);
  const DropdownOptionsWidgets = ["Dropdown", "MultiDropdown", "Checkboxes", "Checks", "Radios"];
  const externalDefs = {
    playground: {
      externalDefs: {
        codes: async () => {
          return [
            { value: "01", label: "Option 01" },
            { value: "02", label: "Option 02" }
          ];
        },
        staticCodes: {
          gender: [
            { value: "F", label: "Female" },
            { value: "M", label: "Male" }
          ]
        }
      },
      mockData: async () => {
        return {
          test: "test 6"
        };
      },
      externalDefsTypes: {
        codes: DropdownOptionsWidgets.map(($wt) => ({
          $wt,
          properties: ["options"],
          label: "Retrieve available options from remote."
        })),
        staticCodes: {
          gender: DropdownOptionsWidgets.map(($wt) => ({
            $wt,
            properties: ["options"],
            label: "Gender options."
          }))
        }
      }
    }
  };
  DemoData$5.markdown = `# Page::Page 2

- Input::Test Input::testInput
  - disabled
- Dropdown::Test Dropdown::testDropdown
  - options: @ext.codes
- Button::
  - $fc
  - $pos: r:2
  - leads: $icons.angleLeft; $icons.angleRight
  - text: Test Button
  - click:
    \`\`\`
    options.global.alert.show('Hello World');
    \`\`\`

## Section::X

- Input::Test Input::testInputX
- Dropdown::Test Dropdown::testDropdownX
  - options: @ext.codes
- Button::
  - $fc
  - $pos: r:2
  - leads: $icons.angleLeft; $icons.angleRight
  - text: Test Button
  - click:
    \`\`\`
    options.global.alert.show('Hello World');
    \`\`\`

## Section::Y

- Input::Test Input::testInputY
- Dropdown::Test Dropdown::testDropdownY
  - options: @ext.codes
- Button::
  - $fc
  - $pos: r:2
  - leads: $icons.angleLeft; $icons.angleRight
  - text: Test Button
  - click:
    \`\`\`
    options.global.alert.show('Hello World');
    \`\`\`

`;
  def.$nodes[0].$nodes[0].mockData = new ExternalDefIndicator("playground.mockData");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalRoot, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$5, externalDefs }) });
};
const PlaygroundData = DemoData$5;
const PlaygroundMarkdown = markdown$5;
const nestedTables = [
  {
    columnA: "Value of Column A, Row #1",
    nested: [
      {
        columnNA: "Value of Column A, Row #1.1"
      },
      {
        columnNA: "Value of Column A, Row #1.2"
      }
    ]
  },
  {
    columnA: "Value of Column A, Row #2"
  },
  {
    columnA: "Value of Column A, Row #3"
  },
  {
    columnA: "Value of Column A, Row #4"
  },
  {
    columnA: "Value of Column A, Row #5"
  },
  {
    columnA: "Value of Column A, Row #6"
  },
  {
    columnA: "Value of Column A, Row #7"
  },
  {
    columnA: "Value of Column A, Row #8"
  },
  {
    columnA: "Value of Column A, Row #9"
  },
  {
    columnA: "Value of Column A, Row #10"
  },
  {
    columnA: "Value of Column A, Row #11"
  },
  {
    columnA: "Value of Column A, Row #12"
  },
  {
    columnA: "Value of Column A, Row #13"
  },
  {
    columnA: "Value of Column A, Row #14"
  },
  {
    columnA: "Value of Column A, Row #15"
  },
  {
    columnA: "Value of Column A, Row #16",
    nested: [
      {
        columnNA: "Value of Column A, Row #16.1"
      },
      {
        columnNA: "Value of Column A, Row #16.2"
      },
      {
        columnNA: "Value of Column A, Row #16.3"
      },
      {
        columnNA: "Value of Column A, Row #16.4"
      },
      {
        columnNA: "Value of Column A, Row #16.5"
      },
      {
        columnNA: "Value of Column A, Row #16.6"
      },
      {
        columnNA: "Value of Column A, Row #16.7"
      },
      {
        columnNA: "Value of Column A, Row #16.8"
      },
      {
        columnNA: "Value of Column A, Row #16.9"
      },
      {
        columnNA: "Value of Column A, Row #16.10"
      },
      {
        columnNA: "Value of Column A, Row #16.11"
      },
      {
        columnNA: "Value of Column A, Row #16.12"
      },
      {
        columnNA: "Value of Column A, Row #16.13"
      },
      {
        columnNA: "Value of Column A, Row #16.14"
      },
      {
        columnNA: "Value of Column A, Row #16.15"
      },
      {
        columnNA: "Value of Column A, Row #16.16"
      },
      {
        columnNA: "Value of Column A, Row #16.17"
      },
      {
        columnNA: "Value of Column A, Row #16.18"
      },
      {
        columnNA: "Value of Column A, Row #16.19"
      },
      {
        columnNA: "Value of Column A, Row #16.20"
      },
      {
        columnNA: "Value of Column A, Row #16.21"
      }
    ]
  }
];
const page = {
  pageNumber: 1,
  pageCount: 3,
  pageSize: 6,
  itemCount: 16
};
const pagination = {
  pageNumber: 2,
  pageCount: 15,
  pageSize: 20,
  itemCount: 286
};
const table2 = [];
const sectionForTable3 = {};
const DemoData$4 = {
  nestedTables,
  page,
  pagination,
  table2,
  sectionForTable3
};
const markdown$4 = "# Page::Demo Tab\n\n## Section::# 3.1. Table\n\n### Table\n\n- property: nestedTables\n- expandable, clickToExpand, addable, removable, !hideClassicCellsOnExpandable\n- omitDefaultRowOperators\n- addLabel: Add New One\n- maxBodyHeight: 400\n- fixedLeadColumns: 1\n- fixedTailColumns: 1\n- operatorsColumnWidth: 200\n- initExpanded: @ext.table1.initExpanded\n- headers:\n	- column:\n		- label: Box\n			- Caption::Column A::\n			- Caption::*::\n		- width: 300\n	- Column B: 300\n	- Column C: 500\n	- Column D: 200\n	- Column E: 200\n	- Column F: 200\n	- Column G: 100\n- Input::::columnA\n- Caption::::\n	- label: Say Hello to World\n	- click: alert: Hello World!\n- Label::::columnC\n- Label::::columnD\n- Label::::columnE\n- Label::::columnF\n- Label::::columnG\n- Table::\n	- property: nested\n	- headers:\n		- Nest Column A: 300\n		- Nest Column B: 300\n	- Label::::columnNA\n	- Label::::columnNB\n- RowOperators::\n	- Button::\n		- text: X\n		- fill: plain\n		- click: alert: X\n		- visible:\n			- on: columnA\n			- handle:\n			  ```javascript\n			  return (model.columnA ?? '').endsWith('#1');\n			  ```\n	- Button::\n		- fill: plain\n		- tails: $icons.view\n		- click: alert: View\n	- Button::\n		- fill: plain\n		- tails: $icons.edit\n		- click: alert: Edit\n	- Button::\n		- fill: plain\n		- tails: $icons.remove\n		- prebuilt: remove\n	- Button::\n		- fill: plain\n		- tails: $icons.expand\n		- prebuilt: expand\n	- Button::\n		- fill: plain\n		- tails: $icons.collapse\n		- prebuilt: collapse\n- Pagination::::page\n	- maxButtons: 3\n\n## Section::# 3.2. Pagination\n\n- Pagination::::pagination\n	- freeWalk\n	- sizes: 10;20;30\n\n## Section::# 3.3. Remote Table\n\n### Table::\n\n- property: table2\n- headers:\n	- Column A: 300\n- Label::::columnA\n- Pagination::::page2\n	- freeWalk\n	- maxButtons: 3\n	- sizes: 6;9;12\n	- valueChanged: @ext.table2.onPageChanged\n\n## Section::# 3.4. Table 3\n\n- property: sectionForTable3\n\n### Table::\n\n- property: table3\n- addable\n- repaint:\n	- on: table3\n- headers:\n	- Column A: 300\n- Label::::columnA\n\n### Button::::\n\n- text: Add Row Into Table3\n- click: @ext.table3.addRow\n";
DemoData$4.table2 = DemoData$4.nestedTables.filter((_, index) => index < 5);
DemoData$4.page2 = JSON.parse(JSON.stringify(DemoData$4.page));
const InternalN2Table = () => {
  const def = useDemoMarkdown(markdown$4);
  const { fire } = useBridgeEventBus();
  const tableInitRef = reactExports.useRef([]);
  const externalDefs = {
    table1: {
      initExpanded: (_, index) => {
        if (tableInitRef.current.includes(index)) {
          return false;
        } else {
          const expanded = index === 1;
          if (expanded) {
            tableInitRef.current.push(index);
            return true;
          } else {
            return false;
          }
        }
      }
    },
    table2: {
      onPageChanged: async (options) => {
        const { newValue: { pageNumber, pageSize } } = options;
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize - 1;
        DemoData$4.table2 = DemoData$4.nestedTables.filter((_, index) => index >= startIndex && index <= endIndex);
      }
    },
    table3: {
      addRow: () => {
        const carrier = DemoData$4.sectionForTable3;
        if (carrier.table3 == null) {
          carrier.table3 = [{ columnA: nanoid() }];
        } else {
          carrier.table3.push({ columnA: nanoid() });
        }
        fire(BridgeToRootEventTypes.NOTIFY_VALUE_CHANGED, {
          absolutePath: "/sectionForTable3.table3",
          from: carrier.table3,
          to: carrier.table3
        });
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$4, externalDefs })
  ] });
};
const N2Table = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BridgeEventBusProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(InternalN2Table, {}) });
};
const N2TableData = DemoData$4;
const N2TableMarkdown = markdown$4;
const tabs = {
  tab1: {
    tab1Input1: "hello"
  },
  tab2: {
    count: 147,
    tab2check1: true
  },
  tab4: {
    tab4Input: "Tab4 world."
  }
};
const DemoData$3 = {
  tabs
};
const markdown$3 = "# Page::Demo Tab\n\n## Section::# 5. Tabs\n\n### Tabs::::tabs\n\n#### Tab::Tab #1::tab1\n\n- Input::First Input In Tab #1::tab1Input1\n\n#### Tab::::tab2\n\n- title:\n	- valueToLabel: `'Tab #2'`\n	- leads: $\n	- tails: $icons.caretLeft\n- badge: Badge\n	- property: count\n	- labelOnValue\n	- ink: info\n- Checkbox::First Check In Tab #2::tab2check1\n\n#### Tab::::tab3\n\n- title: Box\n	- Caption::Tab #3\n\n#### Tab::::tab4\n\n- title: Tab #4\n- body: @ext.tabs.tab4.def\n\n#### Tab::::tab5\n\n- title:\n	- labelOnValue\n	- property: tab5Title\n	- leads: $\n	- tails: $icons.caretLeft\n- data: @ext.tabs.tab5.data\n- Input::First Input In Tab #5::tab5Input\n\n#### Tab::::tab6\n\n- title: Tab #6\n\n#### Tab::::tab7\n\n- title: Tab #7\n\n#### Tab::::tab8\n\n- title: Tab #8\n\n#### Tab::::tab9\n\n- title: Tab #9\n\n#### Tab::::tab10\n\n- title: Tab #10\n\n#### Tab::::tab11\n\n- title: Tab #11\n\n#### Tab::::tab12\n\n- title: Tab #12\n\n#### Tab::::tab13\n\n- title: Tab #13\n\n#### Tab::::tab14\n\n- title: Tab #14\n\n#### Tab::::tab15\n\n- title: Tab #15\n\n#### Tab::::tab16\n\n- title: Tab #16\n\n#### Tab::::tab17\n\n- title: Tab #17\n\n#### Tab::::tab18\n\n- title: Tab #18\n\n#### Tab::::tab19\n\n- title: Tab #19\n\n#### Tab::::tab20\n\n- title: Tab #20\n\n#### Tab::::tab21\n\n- title: Tab #21\n\n#### Tab::::tab22\n\n- title: Tab #22\n\n#### Tab::::tab23\n\n- title: Tab #23\n\n#### Tab::::tab24\n\n- title: Tab #24\n";
const N2Tabs = () => {
  const def = useDemoMarkdown(markdown$3);
  const externalDefs = {
    tabs: {
      tab4: {
        // @ts-ignore
        def: (marker) => {
          return {
            $wt: "Section",
            $nodes: [{
              $wt: "Input.FC",
              label: "Hello Tab4",
              $pp: "tab4Input"
            }]
          };
        }
      },
      tab5: {
        data: async (options) => {
          const { root: root2, model, absolutePath } = options;
          if (model == null) {
            MUtils.setValue(root2, absolutePath, {
              tab5Title: "Tab5 Title",
              tab5Input: "Hello Tab5"
            });
            console.log("set tab5 value");
          }
          console.log(root2, model, absolutePath);
        }
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$3, externalDefs })
  ] });
};
const N2TabsData = DemoData$3;
const N2TabsMarkdown = markdown$3;
const tree = [
  {
    label: "Top #1",
    children: [
      {
        label: "2nd #1.1",
        children: [
          {
            label: "3rd #1.1.1"
          },
          {
            label: "3rd #1.1.2"
          }
        ]
      },
      {
        label: "2nd #1.2",
        children: [
          {
            label: "3rd #1.2.1"
          },
          {
            label: "3rd #1.2.2"
          }
        ]
      }
    ]
  },
  "Top #2",
  {
    label: "Top #3",
    children: [
      {
        label: "2nd #3.1",
        children: [
          {
            label: "3rd #3.1.1"
          },
          {
            label: "3rd #3.1.2"
          }
        ]
      },
      {
        label: "2nd #3.2",
        children: [
          {
            label: "3rd #3.2.1"
          },
          {
            label: "3rd #3.2.2"
          }
        ]
      }
    ]
  }
];
const tree2 = [
  {
    label: "Top #1",
    nodes: [
      {
        label: "2nd #1.1",
        nodes: [
          {
            label: "3rd #1.1.1"
          },
          {
            label: "3rd #1.1.2"
          }
        ]
      },
      {
        label: "2nd #1.2",
        nodes: [
          {
            label: "3rd #1.2.1"
          },
          {
            label: "3rd #1.2.2"
          }
        ]
      }
    ]
  },
  "Top #2",
  {
    label: "Top #3",
    nodes: [
      {
        label: "2nd #3.1",
        nodes: [
          {
            label: "3rd #3.1.1"
          },
          {
            label: "3rd #3.1.2"
          }
        ]
      },
      {
        label: "2nd #3.2",
        nodes: [
          {
            label: "3rd #3.2.1"
          },
          {
            label: {
              text: "3rd #3.2.2"
            }
          }
        ]
      }
    ]
  }
];
const DemoData$2 = {
  tree,
  tree2
};
const markdown$2 = "# Page::Demo Tab\n\n## Section::# 9. N2 Tree\n\n- Tree::::tree\n	- showIndex\n	- initExpandLevel: 0\n	- height: 400\n- Tree::::tree2\n	- detective: @ext.tree2.detective\n- DropdownTree::::dropdownTree\n	- options: @ext.dropdownTree\n- MultiDropdownTree::::multiDropdownTree\n	- options: @ext.dropdownTree";
const syncToChildren = async (def, checked, options) => {
  await (def.$children ?? []).reduce(async (previous, child) => {
    await previous;
    if (child.checkable) {
      await child.check(child, checked, TreeNodeCheckedChangeFrom.FROM_PARENT, options);
    }
    return previous;
  }, Promise.resolve());
};
const syncToParent = async (def, options) => {
  let parent = def.$parent;
  while (parent != null) {
    if (parent.checkable) {
      const allChildChecked = (parent.$children ?? []).filter((child) => child.checkable).every((child) => child.checked(child));
      await parent.check(parent, allChildChecked, TreeNodeCheckedChangeFrom.FROM_CHILD, options);
    }
    parent = parent.$parent;
  }
};
const checkNode = async (def, checked, from, options) => {
  if (def.checked(def) === checked) {
    return;
  }
  def.value.checked = checked;
  switch (from) {
    case TreeNodeCheckedChangeFrom.FROM_SELF:
      await syncToChildren(def, checked, options);
      await syncToParent(def, options);
      break;
    case TreeNodeCheckedChangeFrom.FROM_CHILD:
      await syncToParent(def, options);
      break;
    case TreeNodeCheckedChangeFrom.FROM_PARENT:
      await syncToChildren(def, checked, options);
      break;
  }
};
const removeNode = async (node, handlers) => {
  return new Promise(async (resolve, reject) => {
    try {
      await handlers.global.yesNoDialog.show("Are you sure to remove the node?");
      const index = node.$parent.$children.indexOf(node);
      if (index !== -1) {
        node.$parent.$children.splice(index, 1);
        node.$parent.value.nodes.splice(index, 1);
      }
      handlers.global.yesNoDialog.hide();
      resolve();
    } catch {
      handlers.global.yesNoDialog.hide();
      reject();
    }
  });
};
let newNodeIndex = 1;
const createNewNode = (parent, index) => {
  const label = `New node ${newNodeIndex++}`;
  const item = { label };
  return {
    value: item,
    label,
    $ip2r: `${parent.$ip2r}.nodes[${index}]`,
    $ip2p: `nodes[${index}]`,
    // @ts-ignore
    checkable: true,
    checked: () => item.checked ?? false,
    check: checkNode,
    addable: true,
    add: addNode,
    removable: true,
    remove: removeNode
  };
};
const createPlaceholder = (parent, index) => {
  const label = `Placeholder node ${newNodeIndex}`;
  const item = { label };
  return {
    value: item,
    label,
    $ip2r: `${parent.$ip2r}.nodes[${index}]`,
    $ip2p: `nodes[${index}]`,
    checkable: false,
    addable: false,
    removable: false
  };
};
const createNewNodeCreatorWithoutReturn = (childCount) => {
  return (parent, _handlers) => {
    const child = createNewNode(parent, childCount);
    parent.value.nodes.push(child.value);
    parent.$children.push(child);
  };
};
const createNewNodeCreatorWithNodeDefReturn = (childCount) => {
  return (parent, _handlers) => {
    const child = createNewNode(parent, childCount);
    parent.value.nodes.push(child.value);
    parent.$children.push(child);
    return child;
  };
};
const createNewNodeCreatorWithPlaceholderAndNoReturn = (childCount) => {
  return (parent, handlers) => {
    const placeholder = createPlaceholder(parent, childCount);
    parent.value.nodes.push(placeholder.value);
    parent.$children.push(placeholder);
    return [placeholder, new Promise(async (resolve, reject) => {
      try {
        await handlers.global.yesNoDialog.show("Are you sure to added the node?");
        const child = createNewNode(parent, childCount);
        parent.value.nodes[parent.value.nodes.length - 1] = child.value;
        parent.$children[parent.$children.length - 1] = child;
        handlers.global.yesNoDialog.hide();
        resolve();
      } catch {
        parent.value.nodes.length = parent.value.nodes.length - 1;
        parent.$children.length = parent.$children.length - 1;
        handlers.global.yesNoDialog.hide();
        reject();
      }
    })];
  };
};
const createNewNodeCreatorWithPlaceholderAndNodeDefReturn = (childCount) => {
  return (parent, handlers) => {
    const placeholder = createPlaceholder(parent, childCount);
    parent.value.nodes.push(placeholder.value);
    parent.$children.push(placeholder);
    return [placeholder, new Promise(async (resolve, reject) => {
      try {
        await handlers.global.yesNoDialog.show("Are you sure to added the node?");
        const child = createNewNode(parent, childCount);
        parent.value.nodes[parent.value.nodes.length - 1] = child.value;
        parent.$children[parent.$children.length - 1] = child;
        handlers.global.yesNoDialog.hide();
        resolve(child);
      } catch {
        parent.value.nodes.length = parent.value.nodes.length - 1;
        parent.$children.length = parent.$children.length - 1;
        handlers.global.yesNoDialog.hide();
        reject();
      }
    })];
  };
};
const addNode = async (parent, handlers) => {
  if (parent.$children == null) {
    parent.$children = [];
  }
  if (parent.value.nodes == null) {
    parent.value.nodes = [];
  }
  const childCount = parent.$children.length;
  return [
    // no return
    createNewNodeCreatorWithoutReturn(childCount),
    // return new child node
    createNewNodeCreatorWithNodeDefReturn(childCount),
    // return placeholder, and no return
    createNewNodeCreatorWithPlaceholderAndNoReturn(childCount),
    // return placeholder, and new child node
    createNewNodeCreatorWithPlaceholderAndNodeDefReturn(childCount)
  ][Math.floor(Math.random() * 4)](parent, handlers);
};
const treeDetective = (parentNode) => {
  if (parentNode == null || parentNode.value == null) {
    return [];
  }
  let nodes;
  let parent$ip2r;
  if (Array.isArray(parentNode.value)) {
    nodes = parentNode.value;
    parent$ip2r = parentNode.$ip2r;
  } else {
    nodes = parentNode.value.nodes ?? [];
    parent$ip2r = `${parentNode.$ip2r}.nodes`;
  }
  return nodes.map((item, index) => {
    if (item == null) {
      return null;
    } else {
      const $ip2p = `[${index}]`;
      const $ip2r = PPUtils.concat(parent$ip2r, $ip2p);
      let label;
      let checkable = false;
      let checked = void 0;
      let check = void 0;
      let addable = false;
      let removable = false;
      if (VUtils.isPrimitive(item)) {
        label = `${item ?? ""}`;
      } else {
        if (item.label == null) {
          label = "Unnamed";
        } else if (VUtils.isPrimitive(item.label)) {
          label = `${item.label ?? ""}`;
        } else {
          label = {
            $wt: "Label",
            $pp: "label.text",
            leads: ["$icons.check"],
            tails: ["$icons.remove"]
          };
        }
        checkable = true;
        checked = () => item.checked ?? false;
        check = checkNode;
        addable = true;
        removable = true;
      }
      return {
        value: item,
        $ip2r,
        $ip2p,
        label,
        checkable,
        checked,
        check,
        addable,
        add: addable ? addNode : void 0,
        removable,
        remove: removable ? removeNode : void 0
      };
    }
  }).filter((item) => item != null);
};
const N2Tree = () => {
  const def = useDemoMarkdown(markdown$2);
  const externalDefs = {
    tree2: { detective: treeDetective },
    dropdownTree: () => {
      return [
        {
          value: "1",
          label: "Top #1",
          children: [
            {
              value: "1.1",
              label: "2nd #1.1",
              children: [
                { value: "1.1.1", label: "3rd #1.1.1" },
                { value: "1.1.2", label: "3rd #1.1.2" }
              ]
            },
            {
              value: "1.2",
              label: "2nd #1.2",
              children: [
                { value: "1.2.1", label: "3rd #1.2.1" },
                { value: "1.2.2", label: "3rd #1.2.2" }
              ]
            }
          ]
        },
        { value: "2", label: "Top #2" },
        {
          value: "3",
          label: "Top #3",
          children: [
            {
              value: "3.1",
              label: "2nd #3.1",
              children: [
                { value: "3.1.1", label: "3rd #1.1.1" },
                { value: "3.1.2", label: "3rd #1.1.2" }
              ]
            },
            {
              value: "3.2",
              label: "2nd #3.2",
              children: [
                { value: "3.2.1", label: "3rd #3.2.1" },
                { value: "3.2.2", label: "3rd #3.2.2" }
              ]
            }
          ]
        }
      ];
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$2, externalDefs })
  ] });
};
const N2TreeData = DemoData$2;
const N2TreeMarkdown = markdown$2;
const wizard1 = {
  step1: {
    step1Input1: "hello world"
  },
  step2: {
    step2check1: true
  },
  shared: {
    value: 3456
  }
};
const wizard2 = {
  step1: {
    step1Input1: "abcde"
  },
  step2: {}
};
const DemoData$1 = {
  wizard1,
  wizard2
};
const markdown$1 = "# Page::Demo Tab\n\n## Section::# 6.1. Wizard\n\n### Wizard::::wizard1\n\n- freeWalk, omitWalker\n\n#### WStep::Step #1::step1\n\n- marker: w1s1\n- Input::First Input In Wizard Step #1::step1Input1\n- Button::\n	- text: Next\n	- tails: $icons.angleRight\n	- place: row: 2, col:11, cols:2\n	- click: wstep: w1s2\n\n#### WStep::::step2\n\n- title:\n	- valueToLabel: `'Step #2'`\n	- leads: $\n	- tails: $icons.caretLeft\n- marker: w1s2\n- Checkbox::First Check In Step #2::step2check1\n- Button::\n	- text: Next\n	- leads: $icons.angleLeft\n	- place: row: 2, col:1, cols:2\n	- click: wstep: w1s1\n	- ink: waive\n- Button::\n	- text: Next\n	- tails: $icons.angleRight\n	- place: row: 2, col:11, cols:2\n	- click: wstep: w1s3\n\n#### WStep::::step3\n\n- title: Step #3\n- marker: w1s3\n- Button::\n	- text: Next\n	- leads: $icons.angleLeft\n	- place: row: 2, col:1, cols:2\n	- click: wstep: w1s2\n	- ink: waive\n- Button::\n	- text: Next\n	- tails: $icons.angleRight\n	- place: row: 2, col:11, cols:2\n	- click: wstep: w1s4\n\n#### WStep::::step4\n\n- title: Step #4\n- marker: w1s4\n- Button::\n	- text: Next\n	- leads: $icons.angleLeft\n	- place: row: 2, col:1, cols:2\n	- click: wstep: w1s3\n	- ink: waive\n\n#### WShared::::shared\n\n- Input::Summary Value::value\n	- pos: 12\n\n## Section::# 6.2. Wizard, Not Balloon\n\n### Wizard::::wizard2\n\n- balloon: false\n- reached: 1\n\n#### WStep::Step #1::step1\n\n- Input::First Input In Wizard Step #1::step1Input1\n\n#### WStep::::step2\n\n- title:\n	- valueToLabel: `'Step #2'`\n	- leads: $\n	- tails: $icons.caretLeft\n- Checkbox::First Check In Step #2::step2check1\n\n#### WStep::::step3\n\n- title: Step #3\n\n#### WStep::::step4\n\n- title: Step #4\n";
const N2Wizard = () => {
  const def = useDemoMarkdown(markdown$1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlobalRoot, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CustomEventHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(N2DemoDialogHandler, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData$1 })
  ] });
};
const N2WizardData = DemoData$1;
const N2WizardMarkdown = markdown$1;
const yaml = "";
const DemoData = {
  yaml
};
const markdown = "# Page::Demo Tab\n\n## Section::# 1000. O23 Playground\n\n- O23Playground::::yaml\n	- useN3, useN5, useN6, useN7, useN8\n";
const O23Playground = () => {
  const def = useDemoMarkdown(markdown);
  DemoData.yaml = `code: ApiTest
type: pipeline
enabled: false
route: /api/test
method: get
headers: true
path-params:
  - id
  - name
expose-headers:
  x-a: aaa
  x-b: bbb
`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalRoot, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StandaloneRoot, { ...def, $root: DemoData }) });
};
const O23PlaygroundData = DemoData;
const O23PlaygroundMarkdown = markdown;
const DemoContainer = qe.div.attrs({ "data-w": "d9-demo-container" })`
    display: grid;
    position: relative;
    grid-template-columns: 300px 1fr;
    grid-template-rows: calc(100vh - ${CssVars.SECTION_HEADER_HEIGHT} - 2px) auto;

    &:not([data-active-source=none]) {
        grid-template-rows: 50vh 50vh;
    }
`;
const DemoMenus = qe.div.attrs({
  "data-w": "d9-demo-menus",
  "data-v-scroll": "",
  "data-h-scroll": ""
})`
    display: flex;
    position: sticky;
    grid-row: 1 / span 2;
    top: 0;
    flex-direction: column;
    height: 100vh;
    border-right: ${CssVars.BORDER};
    overflow-x: hidden;
    overflow-y: auto;
`;
const DemoMenuHeader = qe.div`
    display: flex;
    position: sticky;
    top: 0;
    align-items: center;
    padding: 0 calc(${CssVars.SECTION_BODY_PADDING} * 3);
    font-family: ${CssVars.FONT_FAMILY};
    font-size: calc(${CssVars.FONT_SIZE} * 1.4);
    font-weight: ${CssVars.FONT_BOLD};
    color: ${CssVars.INVERT_COLOR};
    background-color: ${CssVars.PRIMARY_COLOR};
    min-height: calc(${CssVars.INPUT_HEIGHT} * 1.6);
    z-index: 1;
`;
const DemoMenu = qe.div`
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 calc(${CssVars.SECTION_BODY_PADDING} * 3);
    font-family: ${CssVars.FONT_FAMILY};
    font-size: calc(${CssVars.FONT_SIZE} * 1.2);
    color: ${CssVars.FONT_COLOR};
    min-height: calc(${CssVars.INPUT_HEIGHT} * 1.4);
    border-bottom: ${CssVars.BORDER};
    transition: all ${CssVars.TRANSITION_DURATION} ${CssVars.TRANSITION_TIMING_FUNCTION};
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &[data-active=true] {
        &:before {
            content: '>>';
            display: block;
            position: relative;
            margin-right: 8px;
        }

        &:after {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background-color: ${CssVars.PRIMARY_COLOR};
            opacity: 0.1;
        }
    }

    &:hover {
        color: ${CssVars.PRIMARY_COLOR};
        background-color: ${CssVars.HOVER_COLOR};
        text-decoration: underline;
    }
`;
const DemoPlayground = qe.div.attrs({ "data-w": "d9-demo-playground" })`
    display: block;
    position: relative;
    overflow: auto;
    padding: 0 calc(${CssVars.SECTION_BODY_PADDING} * 2);
    min-height: 50vh;
`;
const DemoSource = qe.div.attrs({ "data-w": "d9-demo-source" })`
    display: flex;
    position: relative;
    flex-direction: column;
    max-width: 100%;
    background-color: ${CssVars.INVERT_COLOR};
    border-top: ${CssVars.BORDER};
    border-top-width: 2px;
    overflow: hidden;
`;
const DemoSourceHeader = qe.div.attrs({ "data-w": "d9-demo-source-header" })`
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 calc(${CssVars.SECTION_BODY_PADDING} * 2);
    min-height: ${CssVars.SECTION_HEADER_HEIGHT};
    border-bottom: ${CssVars.BORDER};

    > button:not(:first-child) {
        margin-left: 8px;
    }
`;
const DemoSourceBody = qe.div.attrs({ "data-w": "d9-demo-source-body" })`
    display: flex;
    position: relative;
    flex-direction: column;
    row-gap: 16px;
    overflow: auto;
    padding: calc(${CssVars.SECTION_BODY_PADDING} * 2);

    > div[data-w=d9-section] > div[data-w=d9-section-body] {
        display: flex;
        flex-direction: column;
    }
`;
const MarkdownTitle = qe.div`
    display: flex;
    position: relative;
    align-items: center;
    color: ${CssVars.PRIMARY_COLOR};
    font-size: 1.6em;
    font-weight: bold;
`;
const MarkdownContainer = (props) => {
  const { contents } = props;
  let markdowns = [{ title: "", markdown: "" }];
  if (typeof contents === "string") {
    markdowns = [{ title: "", markdown: contents }];
  } else if (Array.isArray(contents)) {
    markdowns = contents.map(({ title: title2, content }) => {
      return {
        title: title2,
        markdown: typeof content === "string" ? content : "```json\n" + JSON.stringify(content, null, 4) + "\n```"
      };
    });
  } else {
    markdowns = [{ title: "", markdown: "```json\n" + JSON.stringify(contents, null, 4) + "\n```" }];
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: markdowns.map(({ title: title2, markdown: markdown2 }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      UnwrappedSection,
      {
        title: VUtils.isNotBlank(title2) ? /* @__PURE__ */ jsxRuntimeExports.jsx(MarkdownTitle, { children: title2 }) : null,
        collapsible: true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Markdown, { className: "markdown-body", remarkPlugins: [remarkGfm], components: {
          code(props2) {
            const { children, className, node, ...rest } = props2;
            const match = /language-(\w+)/.exec(className || "");
            return match ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              SyntaxHighlighter,
              {
                ...rest,
                PreTag: "div",
                children: String(children).replace(/\n$/, ""),
                language: match[1],
                style: materialDark
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("code", { ...rest, className, children });
          }
        }, children: markdown2 })
      },
      VUtils.generateUniqueId()
    );
  }) });
};
const Demos = [
  {
    path: "/n2-basic-widgets",
    label: "1. N2 Basic Widgets",
    C: N2BasicWidgets,
    data: N2BasicWidgetsData,
    markdown: N2BasicWidgetsMarkdown
  },
  { path: "/n2-buttons", label: "2. N2 Buttons", C: N2Buttons, data: N2ButtonsData, markdown: N2ButtonsMarkdown },
  { path: "/n2-table", label: "3. N2 Table", C: N2Table, data: N2TableData, markdown: N2TableMarkdown },
  {
    path: "/n2-array-panel",
    label: "4. N2 Array Panel",
    C: N2ArrayPanel,
    data: N2ArrayPanelData,
    markdown: N2ArrayPanelMarkdown
  },
  { path: "/n2-tabs", label: "5. N2 Tabs", C: N2Tabs, data: N2TabsData, markdown: N2TabsMarkdown },
  { path: "/n2-wizard", label: "6. N2 Wizard", C: N2Wizard, data: N2WizardData, markdown: N2WizardMarkdown },
  {
    path: "/n2-monitors",
    label: "7. N2 Monitors",
    C: N2Monitors,
    data: N2MonitorsData,
    markdown: N2MonitorsMarkdown
  },
  { path: "/n2-intl", label: "8. N2 Internationalization", C: N2Intl, data: N2IntlData, markdown: N2IntlMarkdown },
  { path: "/n2-tree", label: "9. N2 Tree", C: N2Tree, data: N2TreeData, markdown: N2TreeMarkdown },
  { path: "/echarts", label: "10. ECharts", C: ECharts, data: EChartsData, markdown: EChartsMarkdown },
  {
    path: "/thai-plan-selection",
    label: "100. ThaiCloud Plan Selection",
    C: ThaiPlanSelection,
    data: ThaiPlanSelectionData,
    markdown: ThaiPlanSelectionMarkdown
  },
  {
    path: "/playground",
    label: "999. Playground",
    C: N2Playground,
    data: PlaygroundData,
    markdown: PlaygroundMarkdown
  },
  {
    path: "/o23-playground",
    label: "1000. O23 Playground",
    C: O23Playground,
    data: O23PlaygroundData,
    markdown: O23PlaygroundMarkdown
  }
];
const DemoLayoutMenus = (props) => {
  const { route, onMenuClicked } = props;
  const [expanded, setExpanded] = reactExports.useState(false);
  const onClicked = () => {
    if (!MBUtils.isTouchable()) {
      return;
    }
    setExpanded(!expanded);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DemoMenus, { "data-menu-expanded": expanded, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DemoMenuHeader, { onClick: onClicked, children: "Demo List" }),
    Demos.map((demo) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(DemoMenu, { "data-active": route[demo.path], onClick: onMenuClicked(demo.path), children: demo.label }, demo.path);
    })
  ] });
};
const DemoIndex = () => {
  var _a, _b, _c;
  const [pathname, setPathname] = reactExports.useState(localStorage.getItem("PATH") || "/n2-basic-widgets");
  const [activeSource, setActiveSource] = reactExports.useState(
    "none"
    /* NONE */
  );
  const onMenuClicked = (pathname2) => () => {
    localStorage.setItem("PATH", pathname2);
    setPathname(pathname2);
  };
  const onHideAllClicked = () => setActiveSource(
    "none"
    /* NONE */
  );
  const onMarkdownClicked = () => setActiveSource(
    "markdown"
    /* MARKDOWN */
  );
  const onJsonClicked = () => setActiveSource(
    "json"
    /* JSON */
  );
  const route = { [pathname]: true };
  const C = ((_a = Demos.find((demo) => demo.path === pathname)) == null ? void 0 : _a.C) ?? reactExports.Fragment;
  const markdown2 = ((_b = Demos.find((demo) => demo.path === pathname)) == null ? void 0 : _b.markdown) ?? "";
  const json = ((_c = Demos.find((demo) => demo.path === pathname)) == null ? void 0 : _c.data) ?? {};
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DemoContainer, { "data-active-source": activeSource, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceDetective, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DemoLayoutMenus, { route, onMenuClicked }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DemoPlayground, { "data-v-scroll": "", "data-h-scroll": "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(C, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DemoSource, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DemoSourceHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          UnwrappedButton,
          {
            onClick: onHideAllClicked,
            ink: ButtonInk.PRIMARY,
            fill: activeSource === "none" ? ButtonFill.FILL : ButtonFill.PLAIN,
            children: "Hide"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          UnwrappedButton,
          {
            onClick: onMarkdownClicked,
            ink: ButtonInk.PRIMARY,
            fill: activeSource === "markdown" ? ButtonFill.FILL : ButtonFill.PLAIN,
            children: "Markdown"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          UnwrappedButton,
          {
            onClick: onJsonClicked,
            ink: ButtonInk.PRIMARY,
            fill: activeSource === "json" ? ButtonFill.FILL : ButtonFill.PLAIN,
            children: "JSON"
          }
        )
      ] }),
      activeSource === "none" ? null : /* @__PURE__ */ jsxRuntimeExports.jsxs(DemoSourceBody, { "data-v-scroll": "", "data-h-scroll": "", children: [
        activeSource === "markdown" ? /* @__PURE__ */ jsxRuntimeExports.jsx(MarkdownContainer, { contents: markdown2 }) : null,
        activeSource === "json" ? /* @__PURE__ */ jsxRuntimeExports.jsx(MarkdownContainer, { contents: json }) : null
      ] })
    ] })
  ] });
};
const GlobalStyles = $e`
    *, *:before, *:after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    *:focus-visible {
        outline: none;
    }

    html {
        width: 100%;
    }

    body {
        --d9-font-family: -apple-system, Roboto;
        --d9-font-color: #555;
        --d9-font-size: 14px;
        margin: 0;
        font-family: var(--d9-font-family);
        font-size: var(--d9-font-size);
        color: var(--d9-font-color);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        position: relative;
        //background-color        : var(--bg-color);
        overflow-x: hidden;
        width: 100%;
    }

    *, *:before, *:after {
        box-sizing: border-box;
    }

    div[data-w=d9-demo-container] {
        //--d9-font-family: Roboto;
        //--d9-font-color: #555;
        //--d9-font-size: 14px;
        --d9-border-color: #CED4DA;
        --d9-input-height: 32px;
        --d9-common-tabs-font-size: 20px;
        --d9-common-tabs-font-weight: 600;
        --d9-common-tabs-padding: 16px;
        --d9-section-header-title-font-size: 16px;
        --d9-section-header-title-font-weight: 500;
        --d9-section-header-border: 1px solid #eee;
        --d9-caption-font-color: #555;
        --d9-table-header-font-family: Roboto;
        --d9-table-header-font-size: 12px;
        --d9-table-header-font-weight: 400;
        --d9-table-cell-height: 32px;

        div[data-v-scroll],
        div[data-h-scroll] {
            &::-webkit-scrollbar {
                background-color: transparent;
                height: 6px;
                width: 4px;
            }

            &::-webkit-scrollbar-track {
                background-color: rgba(229, 229, 229, 0.5);
                border-radius: 2px;
            }

            &::-webkit-scrollbar-thumb {
                background-color: rgb(193, 193, 193);
                border-radius: 2px;
            }
        }

        div[data-w=d9-section-header-title] {
            > span[data-w=d9-caption] {
                font-size: var(--d9-section-header-title-font-size);
            }
        }

        span[data-r=d9-fc-caption] {
            font-size: 12px;
            font-weight: 300;
            color: #888;
        }

        div[data-w=d9-table-header-cell],
        div[data-w=d9-table-row-index-cell],
        div[data-w=d9-table-no-data-row] {
            color: #888;
        }

        div[data-w=d9-table-header-cell] {
            text-transform: uppercase;
        }

        div[data-w=d9-dropdown][data-as-label=true][data-disabled=true] {
            background-color: transparent;
            border: 0 transparent;
            cursor: text;
            padding: 0;
            font-family: var(--d9-font-family);
            font-size: var(--d9-font-size);
            min-height: var(--d9-input-height);
            color: var(--d9-font-color);
            margin: 0;

            > span[data-clear=true] {
                display: none;
            }
        }

        div[data-w=d9-plan-selection] {
            --d9-plan-selection-background-color: ${CssVars.INVERT_COLOR};

            div[data-w=d9-plan-selection-element-header-title] {
                > span[data-w=d9-caption] {
                    &[data-plan-element-level="0"] {
                        margin-left: 0;
                    }

                    &[data-plan-element-level="1"] {
                        margin-left: ${PlanSelectionCssVars.ELEMENT_INDENT};
                    }

                    &[data-plan-element-level="2"] {
                        margin-left: calc(${PlanSelectionCssVars.ELEMENT_INDENT} * 2);
                    }

                    &[data-plan-element-level="3"] {
                        margin-left: calc(${PlanSelectionCssVars.ELEMENT_INDENT} * 3);
                    }
                }
            }
        }

        div[data-w=d9-section][data-rows-auto-1fr=true] > div[data-w=d9-section-body] {
            grid-template-rows: auto 1fr;
        }
    }

    html[data-touchable=true] {
        div[data-w=d9-demo-container] {
            grid-template-columns: 1fr;

            > div[data-w=d9-demo-menus] {
                position: fixed;
                width: 100vw;
                background-color: ${CssVars.INVERT_COLOR};
                border-right: 0;
                z-index: 100;

                &[data-menu-expanded=false] {
                    height: calc(${CssVars.INPUT_HEIGHT} * 1.6);
                    overflow: hidden;
                }
            }

            > div[data-w=d9-demo-playground] {
                margin-top: calc(${CssVars.INPUT_HEIGHT} * 1.6);
                padding-bottom: calc(${CssVars.INPUT_HEIGHT} * 1.6);
            }
        }
    }

    div[data-w=d9-playground],
    div[data-w=o23-playground] {
        min-height: calc(100vh - 104px);
    }
`;
const App = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalStyles, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DemoIndex, {})
  ] });
};
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    __vitePreload(() => import("./vendor-FxhWBsAz.js").then((n) => n.aY), true ? __vite__mapDeps([0,1,2,3,4]) : void 0).then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};
const root = client.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  /* @__PURE__ */ jsxRuntimeExports.jsx(App, {})
  // </React.StrictMode>
);
reportWebVitals();
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/vendor-FxhWBsAz.js","assets/babel-zvTTnt5j.js","assets/unist-QXG10VXN.js","assets/react-base-1xesxUK0.js","assets/vendor-UDnasYXb.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
