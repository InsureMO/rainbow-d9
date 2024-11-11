import { c as commonjsGlobal, g as getDefaultExportFromCjs } from "./babel-CtyNlyuP.js";
import { h as hastscript } from "./hastscript-0R1XyDv_.js";
import { b8 as parseEntities_1 } from "./vendor-CMazD7wM.js";
var prismCore = { exports: {} };
(function(module) {
  var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
  /**
   * Prism: Lightweight, robust, elegant syntax highlighting
   *
   * @license MIT <https://opensource.org/licenses/MIT>
   * @author Lea Verou <https://lea.verou.me>
   * @namespace
   * @public
   */
  var Prism2 = function(_self2) {
    var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
    var uniqueId = 0;
    var plainTextGrammar = {};
    var _ = {
      /**
       * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
       * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
       * additional languages or plugins yourself.
       *
       * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
       *
       * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
       * empty Prism object into the global scope before loading the Prism script like this:
       *
       * ```js
       * window.Prism = window.Prism || {};
       * Prism.manual = true;
       * // add a new <script> to load Prism's script
       * ```
       *
       * @default false
       * @type {boolean}
       * @memberof Prism
       * @public
       */
      manual: _self2.Prism && _self2.Prism.manual,
      /**
       * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
       * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
       * own worker, you don't want it to do this.
       *
       * By setting this value to `true`, Prism will not add its own listeners to the worker.
       *
       * You obviously have to change this value before Prism executes. To do this, you can add an
       * empty Prism object into the global scope before loading the Prism script like this:
       *
       * ```js
       * window.Prism = window.Prism || {};
       * Prism.disableWorkerMessageHandler = true;
       * // Load Prism's script
       * ```
       *
       * @default false
       * @type {boolean}
       * @memberof Prism
       * @public
       */
      disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
      /**
       * A namespace for utility methods.
       *
       * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
       * change or disappear at any time.
       *
       * @namespace
       * @memberof Prism
       */
      util: {
        encode: function encode2(tokens) {
          if (tokens instanceof Token) {
            return new Token(tokens.type, encode2(tokens.content), tokens.alias);
          } else if (Array.isArray(tokens)) {
            return tokens.map(encode2);
          } else {
            return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
          }
        },
        /**
         * Returns the name of the type of the given value.
         *
         * @param {any} o
         * @returns {string}
         * @example
         * type(null)      === 'Null'
         * type(undefined) === 'Undefined'
         * type(123)       === 'Number'
         * type('foo')     === 'String'
         * type(true)      === 'Boolean'
         * type([1, 2])    === 'Array'
         * type({})        === 'Object'
         * type(String)    === 'Function'
         * type(/abc+/)    === 'RegExp'
         */
        type: function(o) {
          return Object.prototype.toString.call(o).slice(8, -1);
        },
        /**
         * Returns a unique number for the given object. Later calls will still return the same number.
         *
         * @param {Object} obj
         * @returns {number}
         */
        objId: function(obj) {
          if (!obj["__id"]) {
            Object.defineProperty(obj, "__id", { value: ++uniqueId });
          }
          return obj["__id"];
        },
        /**
         * Creates a deep clone of the given object.
         *
         * The main intended use of this function is to clone language definitions.
         *
         * @param {T} o
         * @param {Record<number, any>} [visited]
         * @returns {T}
         * @template T
         */
        clone: function deepClone(o, visited) {
          visited = visited || {};
          var clone;
          var id;
          switch (_.util.type(o)) {
            case "Object":
              id = _.util.objId(o);
              if (visited[id]) {
                return visited[id];
              }
              clone = /** @type {Record<string, any>} */
              {};
              visited[id] = clone;
              for (var key in o) {
                if (o.hasOwnProperty(key)) {
                  clone[key] = deepClone(o[key], visited);
                }
              }
              return (
                /** @type {any} */
                clone
              );
            case "Array":
              id = _.util.objId(o);
              if (visited[id]) {
                return visited[id];
              }
              clone = [];
              visited[id] = clone;
              /** @type {Array} */
              /** @type {any} */
              o.forEach(function(v, i) {
                clone[i] = deepClone(v, visited);
              });
              return (
                /** @type {any} */
                clone
              );
            default:
              return o;
          }
        },
        /**
         * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
         *
         * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
         *
         * @param {Element} element
         * @returns {string}
         */
        getLanguage: function(element) {
          while (element) {
            var m = lang.exec(element.className);
            if (m) {
              return m[1].toLowerCase();
            }
            element = element.parentElement;
          }
          return "none";
        },
        /**
         * Sets the Prism `language-xxxx` class of the given element.
         *
         * @param {Element} element
         * @param {string} language
         * @returns {void}
         */
        setLanguage: function(element, language) {
          element.className = element.className.replace(RegExp(lang, "gi"), "");
          element.classList.add("language-" + language);
        },
        /**
         * Returns the script element that is currently executing.
         *
         * This does __not__ work for line script element.
         *
         * @returns {HTMLScriptElement | null}
         */
        currentScript: function() {
          if (typeof document === "undefined") {
            return null;
          }
          if ("currentScript" in document && 1 < 2) {
            return (
              /** @type {any} */
              document.currentScript
            );
          }
          try {
            throw new Error();
          } catch (err) {
            var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
            if (src) {
              var scripts = document.getElementsByTagName("script");
              for (var i in scripts) {
                if (scripts[i].src == src) {
                  return scripts[i];
                }
              }
            }
            return null;
          }
        },
        /**
         * Returns whether a given class is active for `element`.
         *
         * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
         * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
         * given class is just the given class with a `no-` prefix.
         *
         * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
         * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
         * ancestors have the given class or the negated version of it, then the default activation will be returned.
         *
         * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
         * version of it, the class is considered active.
         *
         * @param {Element} element
         * @param {string} className
         * @param {boolean} [defaultActivation=false]
         * @returns {boolean}
         */
        isActive: function(element, className, defaultActivation) {
          var no = "no-" + className;
          while (element) {
            var classList = element.classList;
            if (classList.contains(className)) {
              return true;
            }
            if (classList.contains(no)) {
              return false;
            }
            element = element.parentElement;
          }
          return !!defaultActivation;
        }
      },
      /**
       * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
       *
       * @namespace
       * @memberof Prism
       * @public
       */
      languages: {
        /**
         * The grammar for plain, unformatted text.
         */
        plain: plainTextGrammar,
        plaintext: plainTextGrammar,
        text: plainTextGrammar,
        txt: plainTextGrammar,
        /**
         * Creates a deep copy of the language with the given id and appends the given tokens.
         *
         * If a token in `redef` also appears in the copied language, then the existing token in the copied language
         * will be overwritten at its original position.
         *
         * ## Best practices
         *
         * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
         * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
         * understand the language definition because, normally, the order of tokens matters in Prism grammars.
         *
         * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
         * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
         *
         * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
         * @param {Grammar} redef The new tokens to append.
         * @returns {Grammar} The new language created.
         * @public
         * @example
         * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
         *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
         *     // at its original position
         *     'comment': { ... },
         *     // CSS doesn't have a 'color' token, so this token will be appended
         *     'color': /\b(?:red|green|blue)\b/
         * });
         */
        extend: function(id, redef) {
          var lang2 = _.util.clone(_.languages[id]);
          for (var key in redef) {
            lang2[key] = redef[key];
          }
          return lang2;
        },
        /**
         * Inserts tokens _before_ another token in a language definition or any other grammar.
         *
         * ## Usage
         *
         * This helper method makes it easy to modify existing languages. For example, the CSS language definition
         * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
         * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
         * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
         * this:
         *
         * ```js
         * Prism.languages.markup.style = {
         *     // token
         * };
         * ```
         *
         * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
         * before existing tokens. For the CSS example above, you would use it like this:
         *
         * ```js
         * Prism.languages.insertBefore('markup', 'cdata', {
         *     'style': {
         *         // token
         *     }
         * });
         * ```
         *
         * ## Special cases
         *
         * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
         * will be ignored.
         *
         * This behavior can be used to insert tokens after `before`:
         *
         * ```js
         * Prism.languages.insertBefore('markup', 'comment', {
         *     'comment': Prism.languages.markup.comment,
         *     // tokens after 'comment'
         * });
         * ```
         *
         * ## Limitations
         *
         * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
         * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
         * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
         * deleting properties which is necessary to insert at arbitrary positions.
         *
         * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
         * Instead, it will create a new object and replace all references to the target object with the new one. This
         * can be done without temporarily deleting properties, so the iteration order is well-defined.
         *
         * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
         * you hold the target object in a variable, then the value of the variable will not change.
         *
         * ```js
         * var oldMarkup = Prism.languages.markup;
         * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
         *
         * assert(oldMarkup !== Prism.languages.markup);
         * assert(newMarkup === Prism.languages.markup);
         * ```
         *
         * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
         * object to be modified.
         * @param {string} before The key to insert before.
         * @param {Grammar} insert An object containing the key-value pairs to be inserted.
         * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
         * object to be modified.
         *
         * Defaults to `Prism.languages`.
         * @returns {Grammar} The new grammar object.
         * @public
         */
        insertBefore: function(inside, before, insert, root) {
          root = root || /** @type {any} */
          _.languages;
          var grammar = root[inside];
          var ret = {};
          for (var token in grammar) {
            if (grammar.hasOwnProperty(token)) {
              if (token == before) {
                for (var newToken in insert) {
                  if (insert.hasOwnProperty(newToken)) {
                    ret[newToken] = insert[newToken];
                  }
                }
              }
              if (!insert.hasOwnProperty(token)) {
                ret[token] = grammar[token];
              }
            }
          }
          var old = root[inside];
          root[inside] = ret;
          _.languages.DFS(_.languages, function(key, value) {
            if (value === old && key != inside) {
              this[key] = ret;
            }
          });
          return ret;
        },
        // Traverse a language definition with Depth First Search
        DFS: function DFS(o, callback, type, visited) {
          visited = visited || {};
          var objId = _.util.objId;
          for (var i in o) {
            if (o.hasOwnProperty(i)) {
              callback.call(o, i, o[i], type || i);
              var property = o[i];
              var propertyType = _.util.type(property);
              if (propertyType === "Object" && !visited[objId(property)]) {
                visited[objId(property)] = true;
                DFS(property, callback, null, visited);
              } else if (propertyType === "Array" && !visited[objId(property)]) {
                visited[objId(property)] = true;
                DFS(property, callback, i, visited);
              }
            }
          }
        }
      },
      plugins: {},
      /**
       * This is the most high-level function in Prism’s API.
       * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
       * each one of them.
       *
       * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
       *
       * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
       * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
       * @memberof Prism
       * @public
       */
      highlightAll: function(async, callback) {
        _.highlightAllUnder(document, async, callback);
      },
      /**
       * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
       * {@link Prism.highlightElement} on each one of them.
       *
       * The following hooks will be run:
       * 1. `before-highlightall`
       * 2. `before-all-elements-highlight`
       * 3. All hooks of {@link Prism.highlightElement} for each element.
       *
       * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
       * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
       * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
       * @memberof Prism
       * @public
       */
      highlightAllUnder: function(container, async, callback) {
        var env = {
          callback,
          container,
          selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        };
        _.hooks.run("before-highlightall", env);
        env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
        _.hooks.run("before-all-elements-highlight", env);
        for (var i = 0, element; element = env.elements[i++]; ) {
          _.highlightElement(element, async === true, env.callback);
        }
      },
      /**
       * Highlights the code inside a single element.
       *
       * The following hooks will be run:
       * 1. `before-sanity-check`
       * 2. `before-highlight`
       * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
       * 4. `before-insert`
       * 5. `after-highlight`
       * 6. `complete`
       *
       * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
       * the element's language.
       *
       * @param {Element} element The element containing the code.
       * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
       * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
       * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
       * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
       *
       * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
       * asynchronous highlighting to work. You can build your own bundle on the
       * [Download page](https://prismjs.com/download.html).
       * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
       * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
       * @memberof Prism
       * @public
       */
      highlightElement: function(element, async, callback) {
        var language = _.util.getLanguage(element);
        var grammar = _.languages[language];
        _.util.setLanguage(element, language);
        var parent = element.parentElement;
        if (parent && parent.nodeName.toLowerCase() === "pre") {
          _.util.setLanguage(parent, language);
        }
        var code = element.textContent;
        var env = {
          element,
          language,
          grammar,
          code
        };
        function insertHighlightedCode(highlightedCode) {
          env.highlightedCode = highlightedCode;
          _.hooks.run("before-insert", env);
          env.element.innerHTML = env.highlightedCode;
          _.hooks.run("after-highlight", env);
          _.hooks.run("complete", env);
          callback && callback.call(env.element);
        }
        _.hooks.run("before-sanity-check", env);
        parent = env.element.parentElement;
        if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
          parent.setAttribute("tabindex", "0");
        }
        if (!env.code) {
          _.hooks.run("complete", env);
          callback && callback.call(env.element);
          return;
        }
        _.hooks.run("before-highlight", env);
        if (!env.grammar) {
          insertHighlightedCode(_.util.encode(env.code));
          return;
        }
        if (async && _self2.Worker) {
          var worker = new Worker(_.filename);
          worker.onmessage = function(evt) {
            insertHighlightedCode(evt.data);
          };
          worker.postMessage(JSON.stringify({
            language: env.language,
            code: env.code,
            immediateClose: true
          }));
        } else {
          insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
        }
      },
      /**
       * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
       * and the language definitions to use, and returns a string with the HTML produced.
       *
       * The following hooks will be run:
       * 1. `before-tokenize`
       * 2. `after-tokenize`
       * 3. `wrap`: On each {@link Token}.
       *
       * @param {string} text A string with the code to be highlighted.
       * @param {Grammar} grammar An object containing the tokens to use.
       *
       * Usually a language definition like `Prism.languages.markup`.
       * @param {string} language The name of the language definition passed to `grammar`.
       * @returns {string} The highlighted HTML.
       * @memberof Prism
       * @public
       * @example
       * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
       */
      highlight: function(text, grammar, language) {
        var env = {
          code: text,
          grammar,
          language
        };
        _.hooks.run("before-tokenize", env);
        if (!env.grammar) {
          throw new Error('The language "' + env.language + '" has no grammar.');
        }
        env.tokens = _.tokenize(env.code, env.grammar);
        _.hooks.run("after-tokenize", env);
        return Token.stringify(_.util.encode(env.tokens), env.language);
      },
      /**
       * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
       * and the language definitions to use, and returns an array with the tokenized code.
       *
       * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
       *
       * This method could be useful in other contexts as well, as a very crude parser.
       *
       * @param {string} text A string with the code to be highlighted.
       * @param {Grammar} grammar An object containing the tokens to use.
       *
       * Usually a language definition like `Prism.languages.markup`.
       * @returns {TokenStream} An array of strings and tokens, a token stream.
       * @memberof Prism
       * @public
       * @example
       * let code = `var foo = 0;`;
       * let tokens = Prism.tokenize(code, Prism.languages.javascript);
       * tokens.forEach(token => {
       *     if (token instanceof Prism.Token && token.type === 'number') {
       *         console.log(`Found numeric literal: ${token.content}`);
       *     }
       * });
       */
      tokenize: function(text, grammar) {
        var rest = grammar.rest;
        if (rest) {
          for (var token in rest) {
            grammar[token] = rest[token];
          }
          delete grammar.rest;
        }
        var tokenList = new LinkedList();
        addAfter(tokenList, tokenList.head, text);
        matchGrammar(text, tokenList, grammar, tokenList.head, 0);
        return toArray(tokenList);
      },
      /**
       * @namespace
       * @memberof Prism
       * @public
       */
      hooks: {
        all: {},
        /**
         * Adds the given callback to the list of callbacks for the given hook.
         *
         * The callback will be invoked when the hook it is registered for is run.
         * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
         *
         * One callback function can be registered to multiple hooks and the same hook multiple times.
         *
         * @param {string} name The name of the hook.
         * @param {HookCallback} callback The callback function which is given environment variables.
         * @public
         */
        add: function(name, callback) {
          var hooks = _.hooks.all;
          hooks[name] = hooks[name] || [];
          hooks[name].push(callback);
        },
        /**
         * Runs a hook invoking all registered callbacks with the given environment variables.
         *
         * Callbacks will be invoked synchronously and in the order in which they were registered.
         *
         * @param {string} name The name of the hook.
         * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
         * @public
         */
        run: function(name, env) {
          var callbacks = _.hooks.all[name];
          if (!callbacks || !callbacks.length) {
            return;
          }
          for (var i = 0, callback; callback = callbacks[i++]; ) {
            callback(env);
          }
        }
      },
      Token
    };
    _self2.Prism = _;
    function Token(type, content, alias2, matchedStr) {
      this.type = type;
      this.content = content;
      this.alias = alias2;
      this.length = (matchedStr || "").length | 0;
    }
    Token.stringify = function stringify2(o, language) {
      if (typeof o == "string") {
        return o;
      }
      if (Array.isArray(o)) {
        var s = "";
        o.forEach(function(e) {
          s += stringify2(e, language);
        });
        return s;
      }
      var env = {
        type: o.type,
        content: stringify2(o.content, language),
        tag: "span",
        classes: ["token", o.type],
        attributes: {},
        language
      };
      var aliases = o.alias;
      if (aliases) {
        if (Array.isArray(aliases)) {
          Array.prototype.push.apply(env.classes, aliases);
        } else {
          env.classes.push(aliases);
        }
      }
      _.hooks.run("wrap", env);
      var attributes2 = "";
      for (var name in env.attributes) {
        attributes2 += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
      }
      return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes2 + ">" + env.content + "</" + env.tag + ">";
    };
    function matchPattern(pattern, pos, text, lookbehind) {
      pattern.lastIndex = pos;
      var match = pattern.exec(text);
      if (match && lookbehind && match[1]) {
        var lookbehindLength = match[1].length;
        match.index += lookbehindLength;
        match[0] = match[0].slice(lookbehindLength);
      }
      return match;
    }
    function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
      for (var token in grammar) {
        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
          continue;
        }
        var patterns = grammar[token];
        patterns = Array.isArray(patterns) ? patterns : [patterns];
        for (var j = 0; j < patterns.length; ++j) {
          if (rematch && rematch.cause == token + "," + j) {
            return;
          }
          var patternObj = patterns[j];
          var inside = patternObj.inside;
          var lookbehind = !!patternObj.lookbehind;
          var greedy = !!patternObj.greedy;
          var alias2 = patternObj.alias;
          if (greedy && !patternObj.pattern.global) {
            var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
            patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
          }
          var pattern = patternObj.pattern || patternObj;
          for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
            if (rematch && pos >= rematch.reach) {
              break;
            }
            var str = currentNode.value;
            if (tokenList.length > text.length) {
              return;
            }
            if (str instanceof Token) {
              continue;
            }
            var removeCount = 1;
            var match;
            if (greedy) {
              match = matchPattern(pattern, pos, text, lookbehind);
              if (!match || match.index >= text.length) {
                break;
              }
              var from = match.index;
              var to = match.index + match[0].length;
              var p = pos;
              p += currentNode.value.length;
              while (from >= p) {
                currentNode = currentNode.next;
                p += currentNode.value.length;
              }
              p -= currentNode.value.length;
              pos = p;
              if (currentNode.value instanceof Token) {
                continue;
              }
              for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                removeCount++;
                p += k.value.length;
              }
              removeCount--;
              str = text.slice(pos, p);
              match.index -= pos;
            } else {
              match = matchPattern(pattern, 0, str, lookbehind);
              if (!match) {
                continue;
              }
            }
            var from = match.index;
            var matchStr = match[0];
            var before = str.slice(0, from);
            var after = str.slice(from + matchStr.length);
            var reach = pos + str.length;
            if (rematch && reach > rematch.reach) {
              rematch.reach = reach;
            }
            var removeFrom = currentNode.prev;
            if (before) {
              removeFrom = addAfter(tokenList, removeFrom, before);
              pos += before.length;
            }
            removeRange(tokenList, removeFrom, removeCount);
            var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias2, matchStr);
            currentNode = addAfter(tokenList, removeFrom, wrapped);
            if (after) {
              addAfter(tokenList, currentNode, after);
            }
            if (removeCount > 1) {
              var nestedRematch = {
                cause: token + "," + j,
                reach
              };
              matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
              if (rematch && nestedRematch.reach > rematch.reach) {
                rematch.reach = nestedRematch.reach;
              }
            }
          }
        }
      }
    }
    function LinkedList() {
      var head = { value: null, prev: null, next: null };
      var tail = { value: null, prev: head, next: null };
      head.next = tail;
      this.head = head;
      this.tail = tail;
      this.length = 0;
    }
    function addAfter(list, node, value) {
      var next = node.next;
      var newNode = { value, prev: node, next };
      node.next = newNode;
      next.prev = newNode;
      list.length++;
      return newNode;
    }
    function removeRange(list, node, count) {
      var next = node.next;
      for (var i = 0; i < count && next !== list.tail; i++) {
        next = next.next;
      }
      node.next = next;
      next.prev = node;
      list.length -= i;
    }
    function toArray(list) {
      var array = [];
      var node = list.head.next;
      while (node !== list.tail) {
        array.push(node.value);
        node = node.next;
      }
      return array;
    }
    if (!_self2.document) {
      if (!_self2.addEventListener) {
        return _;
      }
      if (!_.disableWorkerMessageHandler) {
        _self2.addEventListener("message", function(evt) {
          var message = JSON.parse(evt.data);
          var lang2 = message.language;
          var code = message.code;
          var immediateClose = message.immediateClose;
          _self2.postMessage(_.highlight(code, _.languages[lang2], lang2));
          if (immediateClose) {
            _self2.close();
          }
        }, false);
      }
      return _;
    }
    var script = _.util.currentScript();
    if (script) {
      _.filename = script.src;
      if (script.hasAttribute("data-manual")) {
        _.manual = true;
      }
    }
    function highlightAutomaticallyCallback() {
      if (!_.manual) {
        _.highlightAll();
      }
    }
    if (!_.manual) {
      var readyState = document.readyState;
      if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
        document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
      } else {
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(highlightAutomaticallyCallback);
        } else {
          window.setTimeout(highlightAutomaticallyCallback, 16);
        }
      }
    }
    return _;
  }(_self);
  if (module.exports) {
    module.exports = Prism2;
  }
  if (typeof commonjsGlobal !== "undefined") {
    commonjsGlobal.Prism = Prism2;
  }
})(prismCore);
var prismCoreExports = prismCore.exports;
var markup_1 = markup$1;
markup$1.displayName = "markup";
markup$1.aliases = ["html", "mathml", "svg", "xml", "ssml", "atom", "rss"];
function markup$1(Prism2) {
  Prism2.languages.markup = {
    comment: {
      pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
      greedy: true
    },
    prolog: {
      pattern: /<\?[\s\S]+?\?>/,
      greedy: true
    },
    doctype: {
      // https://www.w3.org/TR/xml/#NT-doctypedecl
      pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
      greedy: true,
      inside: {
        "internal-subset": {
          pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
          lookbehind: true,
          greedy: true,
          inside: null
          // see below
        },
        string: {
          pattern: /"[^"]*"|'[^']*'/,
          greedy: true
        },
        punctuation: /^<!|>$|[[\]]/,
        "doctype-tag": /^DOCTYPE/i,
        name: /[^\s<>'"]+/
      }
    },
    cdata: {
      pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
      greedy: true
    },
    tag: {
      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
      greedy: true,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/,
          inside: {
            punctuation: /^<\/?/,
            namespace: /^[^\s>\/:]+:/
          }
        },
        "special-attr": [],
        "attr-value": {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
          inside: {
            punctuation: [
              {
                pattern: /^=/,
                alias: "attr-equals"
              },
              /"|'/
            ]
          }
        },
        punctuation: /\/?>/,
        "attr-name": {
          pattern: /[^\s>\/]+/,
          inside: {
            namespace: /^[^\s>\/:]+:/
          }
        }
      }
    },
    entity: [
      {
        pattern: /&[\da-z]{1,8};/i,
        alias: "named-entity"
      },
      /&#x?[\da-f]{1,8};/i
    ]
  };
  Prism2.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism2.languages.markup["entity"];
  Prism2.languages.markup["doctype"].inside["internal-subset"].inside = Prism2.languages.markup;
  Prism2.hooks.add("wrap", function(env) {
    if (env.type === "entity") {
      env.attributes["title"] = env.content.value.replace(/&amp;/, "&");
    }
  });
  Object.defineProperty(Prism2.languages.markup.tag, "addInlined", {
    /**
     * Adds an inlined language to markup.
     *
     * An example of an inlined language is CSS with `<style>` tags.
     *
     * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
     * case insensitive.
     * @param {string} lang The language key.
     * @example
     * addInlined('style', 'css');
     */
    value: function addInlined(tagName, lang) {
      var includedCdataInside = {};
      includedCdataInside["language-" + lang] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: true,
        inside: Prism2.languages[lang]
      };
      includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
      var inside = {
        "included-cdata": {
          pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
          inside: includedCdataInside
        }
      };
      inside["language-" + lang] = {
        pattern: /[\s\S]+/,
        inside: Prism2.languages[lang]
      };
      var def = {};
      def[tagName] = {
        pattern: RegExp(
          /(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(
            /__/g,
            function() {
              return tagName;
            }
          ),
          "i"
        ),
        lookbehind: true,
        greedy: true,
        inside
      };
      Prism2.languages.insertBefore("markup", "cdata", def);
    }
  });
  Object.defineProperty(Prism2.languages.markup.tag, "addAttribute", {
    /**
     * Adds an pattern to highlight languages embedded in HTML attributes.
     *
     * An example of an inlined language is CSS with `style` attributes.
     *
     * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
     * case insensitive.
     * @param {string} lang The language key.
     * @example
     * addAttribute('style', 'css');
     */
    value: function(attrName, lang) {
      Prism2.languages.markup.tag.inside["special-attr"].push({
        pattern: RegExp(
          /(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
          "i"
        ),
        lookbehind: true,
        inside: {
          "attr-name": /^[^\s=]+/,
          "attr-value": {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: true,
                alias: [lang, "language-" + lang],
                inside: Prism2.languages[lang]
              },
              punctuation: [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                /"|'/
              ]
            }
          }
        }
      });
    }
  });
  Prism2.languages.html = Prism2.languages.markup;
  Prism2.languages.mathml = Prism2.languages.markup;
  Prism2.languages.svg = Prism2.languages.markup;
  Prism2.languages.xml = Prism2.languages.extend("markup", {});
  Prism2.languages.ssml = Prism2.languages.xml;
  Prism2.languages.atom = Prism2.languages.xml;
  Prism2.languages.rss = Prism2.languages.xml;
}
var css_1 = css$1;
css$1.displayName = "css";
css$1.aliases = [];
function css$1(Prism2) {
  (function(Prism3) {
    var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
    Prism3.languages.css = {
      comment: /\/\*[\s\S]*?\*\//,
      atrule: {
        pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
        inside: {
          rule: /^@[\w-]+/,
          "selector-function-argument": {
            pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
            lookbehind: true,
            alias: "selector"
          },
          keyword: {
            pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
            lookbehind: true
          }
          // See rest below
        }
      },
      url: {
        // https://drafts.csswg.org/css-values-3/#urls
        pattern: RegExp(
          "\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)",
          "i"
        ),
        greedy: true,
        inside: {
          function: /^url/i,
          punctuation: /^\(|\)$/,
          string: {
            pattern: RegExp("^" + string.source + "$"),
            alias: "url"
          }
        }
      },
      selector: {
        pattern: RegExp(
          `(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"
        ),
        lookbehind: true
      },
      string: {
        pattern: string,
        greedy: true
      },
      property: {
        pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
        lookbehind: true
      },
      important: /!important\b/i,
      function: {
        pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
        lookbehind: true
      },
      punctuation: /[(){};:,]/
    };
    Prism3.languages.css["atrule"].inside.rest = Prism3.languages.css;
    var markup2 = Prism3.languages.markup;
    if (markup2) {
      markup2.tag.addInlined("style", "css");
      markup2.tag.addAttribute("style", "css");
    }
  })(Prism2);
}
var clike_1 = clike$1;
clike$1.displayName = "clike";
clike$1.aliases = [];
function clike$1(Prism2) {
  Prism2.languages.clike = {
    comment: [
      {
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: true,
        greedy: true
      },
      {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: true,
        greedy: true
      }
    ],
    string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: true
    },
    "class-name": {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
      lookbehind: true,
      inside: {
        punctuation: /[.\\]/
      }
    },
    keyword: /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
    boolean: /\b(?:false|true)\b/,
    function: /\b\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/
  };
}
var javascript_1 = javascript;
javascript.displayName = "javascript";
javascript.aliases = ["js"];
function javascript(Prism2) {
  Prism2.languages.javascript = Prism2.languages.extend("clike", {
    "class-name": [
      Prism2.languages.clike["class-name"],
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
        lookbehind: true
      }
    ],
    keyword: [
      {
        pattern: /((?:^|\})\s*)catch\b/,
        lookbehind: true
      },
      {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: true
      }
    ],
    // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
    function: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    number: {
      pattern: RegExp(
        /(^|[^\w$])/.source + "(?:" + // constant
        (/NaN|Infinity/.source + "|" + // binary integer
        /0[bB][01]+(?:_[01]+)*n?/.source + "|" + // octal integer
        /0[oO][0-7]+(?:_[0-7]+)*n?/.source + "|" + // hexadecimal integer
        /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + "|" + // decimal bigint
        /\d+(?:_\d+)*n/.source + "|" + // decimal number (integer or float) but no bigint
        /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ")" + /(?![\w$])/.source
      ),
      lookbehind: true
    },
    operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
  });
  Prism2.languages.javascript["class-name"][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
  Prism2.languages.insertBefore("javascript", "keyword", {
    regex: {
      // eslint-disable-next-line regexp/no-dupe-characters-character-class
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: true,
      greedy: true,
      inside: {
        "regex-source": {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: true,
          alias: "language-regex",
          inside: Prism2.languages.regex
        },
        "regex-delimiter": /^\/|\/$/,
        "regex-flags": /^[a-z]+$/
      }
    },
    // This must be declared before keyword because we use "function" inside the look-forward
    "function-variable": {
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: "function"
    },
    parameter: [
      {
        pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: true,
        inside: Prism2.languages.javascript
      },
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: true,
        inside: Prism2.languages.javascript
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: true,
        inside: Prism2.languages.javascript
      },
      {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: true,
        inside: Prism2.languages.javascript
      }
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
  });
  Prism2.languages.insertBefore("javascript", "string", {
    hashbang: {
      pattern: /^#!.*/,
      greedy: true,
      alias: "comment"
    },
    "template-string": {
      pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
      greedy: true,
      inside: {
        "template-punctuation": {
          pattern: /^`|`$/,
          alias: "string"
        },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
          lookbehind: true,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation"
            },
            rest: Prism2.languages.javascript
          }
        },
        string: /[\s\S]+/
      }
    },
    "string-property": {
      pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
      lookbehind: true,
      greedy: true,
      alias: "property"
    }
  });
  Prism2.languages.insertBefore("javascript", "operator", {
    "literal-property": {
      pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
      lookbehind: true,
      alias: "property"
    }
  });
  if (Prism2.languages.markup) {
    Prism2.languages.markup.tag.addInlined("script", "javascript");
    Prism2.languages.markup.tag.addAttribute(
      /on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
      "javascript"
    );
  }
  Prism2.languages.js = Prism2.languages.javascript;
}
var ctx = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof commonjsGlobal === "object" ? commonjsGlobal : {};
var restore = capture();
ctx.Prism = { manual: true, disableWorkerMessageHandler: true };
var h = hastscript;
var decode = parseEntities_1;
var Prism = prismCoreExports;
var markup = markup_1;
var css = css_1;
var clike = clike_1;
var js = javascript_1;
restore();
var own = {}.hasOwnProperty;
function Refractor() {
}
Refractor.prototype = Prism;
var refract = new Refractor();
var core = refract;
refract.highlight = highlight;
refract.register = register;
refract.alias = alias;
refract.registered = registered;
refract.listLanguages = listLanguages;
register(markup);
register(css);
register(clike);
register(js);
refract.util.encode = encode;
refract.Token.stringify = stringify;
function register(grammar) {
  if (typeof grammar !== "function" || !grammar.displayName) {
    throw new Error("Expected `function` for `grammar`, got `" + grammar + "`");
  }
  if (refract.languages[grammar.displayName] === void 0) {
    grammar(refract);
  }
}
function alias(name, alias2) {
  var languages = refract.languages;
  var map = name;
  var key;
  var list;
  var length;
  var index;
  if (alias2) {
    map = {};
    map[name] = alias2;
  }
  for (key in map) {
    list = map[key];
    list = typeof list === "string" ? [list] : list;
    length = list.length;
    index = -1;
    while (++index < length) {
      languages[list[index]] = languages[key];
    }
  }
}
function highlight(value, name) {
  var sup = Prism.highlight;
  var grammar;
  if (typeof value !== "string") {
    throw new Error("Expected `string` for `value`, got `" + value + "`");
  }
  if (refract.util.type(name) === "Object") {
    grammar = name;
    name = null;
  } else {
    if (typeof name !== "string") {
      throw new Error("Expected `string` for `name`, got `" + name + "`");
    }
    if (own.call(refract.languages, name)) {
      grammar = refract.languages[name];
    } else {
      throw new Error("Unknown language: `" + name + "` is not registered");
    }
  }
  return sup.call(this, value, grammar, name);
}
function registered(language) {
  if (typeof language !== "string") {
    throw new Error("Expected `string` for `language`, got `" + language + "`");
  }
  return own.call(refract.languages, language);
}
function listLanguages() {
  var languages = refract.languages;
  var list = [];
  var language;
  for (language in languages) {
    if (own.call(languages, language) && typeof languages[language] === "object") {
      list.push(language);
    }
  }
  return list;
}
function stringify(value, language, parent) {
  var env;
  if (typeof value === "string") {
    return { type: "text", value };
  }
  if (refract.util.type(value) === "Array") {
    return stringifyAll(value, language);
  }
  env = {
    type: value.type,
    content: refract.Token.stringify(value.content, language, parent),
    tag: "span",
    classes: ["token", value.type],
    attributes: {},
    language,
    parent
  };
  if (value.alias) {
    env.classes = env.classes.concat(value.alias);
  }
  refract.hooks.run("wrap", env);
  return h(
    env.tag + "." + env.classes.join("."),
    attributes(env.attributes),
    env.content
  );
}
function stringifyAll(values, language) {
  var result = [];
  var length = values.length;
  var index = -1;
  var value;
  while (++index < length) {
    value = values[index];
    if (value !== "" && value !== null && value !== void 0) {
      result.push(value);
    }
  }
  index = -1;
  length = result.length;
  while (++index < length) {
    value = result[index];
    result[index] = refract.Token.stringify(value, language, result);
  }
  return result;
}
function encode(tokens) {
  return tokens;
}
function attributes(attrs) {
  var key;
  for (key in attrs) {
    attrs[key] = decode(attrs[key]);
  }
  return attrs;
}
function capture() {
  var defined = "Prism" in ctx;
  var current = defined ? ctx.Prism : void 0;
  return restore2;
  function restore2() {
    if (defined) {
      ctx.Prism = current;
    } else {
      delete ctx.Prism;
    }
    defined = void 0;
    current = void 0;
  }
}
var abap_1;
var hasRequiredAbap;
function requireAbap() {
  if (hasRequiredAbap) return abap_1;
  hasRequiredAbap = 1;
  abap_1 = abap;
  abap.displayName = "abap";
  abap.aliases = [];
  function abap(Prism2) {
    Prism2.languages.abap = {
      comment: /^\*.*/m,
      string: /(`|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
      "string-template": {
        pattern: /([|}])(?:\\.|[^\\|{\r\n])*(?=[|{])/,
        lookbehind: true,
        alias: "string"
      },
      /* End Of Line comments should not interfere with strings when the
      quote character occurs within them. We assume a string being highlighted
      inside an EOL comment is more acceptable than the opposite.
      */
      "eol-comment": {
        pattern: /(^|\s)".*/m,
        lookbehind: true,
        alias: "comment"
      },
      keyword: {
        pattern: /(\s|\.|^)(?:SCIENTIFIC_WITH_LEADING_ZERO|SCALE_PRESERVING_SCIENTIFIC|RMC_COMMUNICATION_FAILURE|END-ENHANCEMENT-SECTION|MULTIPLY-CORRESPONDING|SUBTRACT-CORRESPONDING|VERIFICATION-MESSAGE|DIVIDE-CORRESPONDING|ENHANCEMENT-SECTION|CURRENCY_CONVERSION|RMC_SYSTEM_FAILURE|START-OF-SELECTION|MOVE-CORRESPONDING|RMC_INVALID_STATUS|CUSTOMER-FUNCTION|END-OF-DEFINITION|ENHANCEMENT-POINT|SYSTEM-EXCEPTIONS|ADD-CORRESPONDING|SCALE_PRESERVING|SELECTION-SCREEN|CURSOR-SELECTION|END-OF-SELECTION|LOAD-OF-PROGRAM|SCROLL-BOUNDARY|SELECTION-TABLE|EXCEPTION-TABLE|IMPLEMENTATIONS|PARAMETER-TABLE|RIGHT-JUSTIFIED|UNIT_CONVERSION|AUTHORITY-CHECK|LIST-PROCESSING|SIGN_AS_POSTFIX|COL_BACKGROUND|IMPLEMENTATION|INTERFACE-POOL|TRANSFORMATION|IDENTIFICATION|ENDENHANCEMENT|LINE-SELECTION|INITIALIZATION|LEFT-JUSTIFIED|SELECT-OPTIONS|SELECTION-SETS|COMMUNICATION|CORRESPONDING|DECIMAL_SHIFT|PRINT-CONTROL|VALUE-REQUEST|CHAIN-REQUEST|FUNCTION-POOL|FIELD-SYMBOLS|FUNCTIONALITY|INVERTED-DATE|SELECTION-SET|CLASS-METHODS|OUTPUT-LENGTH|CLASS-CODING|COL_NEGATIVE|ERRORMESSAGE|FIELD-GROUPS|HELP-REQUEST|NO-EXTENSION|NO-TOPOFPAGE|REDEFINITION|DISPLAY-MODE|ENDINTERFACE|EXIT-COMMAND|FIELD-SYMBOL|NO-SCROLLING|SHORTDUMP-ID|ACCESSPOLICY|CLASS-EVENTS|COL_POSITIVE|DECLARATIONS|ENHANCEMENTS|FILTER-TABLE|SWITCHSTATES|SYNTAX-CHECK|TRANSPORTING|ASYNCHRONOUS|SYNTAX-TRACE|TOKENIZATION|USER-COMMAND|WITH-HEADING|ABAP-SOURCE|BREAK-POINT|CHAIN-INPUT|COMPRESSION|FIXED-POINT|NEW-SECTION|NON-UNICODE|OCCURRENCES|RESPONSIBLE|SYSTEM-CALL|TRACE-TABLE|ABBREVIATED|CHAR-TO-HEX|END-OF-FILE|ENDFUNCTION|ENVIRONMENT|ASSOCIATION|COL_HEADING|EDITOR-CALL|END-OF-PAGE|ENGINEERING|IMPLEMENTED|INTENSIFIED|RADIOBUTTON|SYSTEM-EXIT|TOP-OF-PAGE|TRANSACTION|APPLICATION|CONCATENATE|DESTINATION|ENHANCEMENT|IMMEDIATELY|NO-GROUPING|PRECOMPILED|REPLACEMENT|TITLE-LINES|ACTIVATION|BYTE-ORDER|CLASS-POOL|CONNECTION|CONVERSION|DEFINITION|DEPARTMENT|EXPIRATION|INHERITING|MESSAGE-ID|NO-HEADING|PERFORMING|QUEUE-ONLY|RIGHTSPACE|SCIENTIFIC|STATUSINFO|STRUCTURES|SYNCPOINTS|WITH-TITLE|ATTRIBUTES|BOUNDARIES|CLASS-DATA|COL_NORMAL|DD\/MM\/YYYY|DESCENDING|INTERFACES|LINE-COUNT|MM\/DD\/YYYY|NON-UNIQUE|PRESERVING|SELECTIONS|STATEMENTS|SUBROUTINE|TRUNCATION|TYPE-POOLS|ARITHMETIC|BACKGROUND|ENDPROVIDE|EXCEPTIONS|IDENTIFIER|INDEX-LINE|OBLIGATORY|PARAMETERS|PERCENTAGE|PUSHBUTTON|RESOLUTION|COMPONENTS|DEALLOCATE|DISCONNECT|DUPLICATES|FIRST-LINE|HEAD-LINES|NO-DISPLAY|OCCURRENCE|RESPECTING|RETURNCODE|SUBMATCHES|TRACE-FILE|ASCENDING|BYPASSING|ENDMODULE|EXCEPTION|EXCLUDING|EXPORTING|INCREMENT|MATCHCODE|PARAMETER|PARTIALLY|PREFERRED|REFERENCE|REPLACING|RETURNING|SELECTION|SEPARATED|SPECIFIED|STATEMENT|TIMESTAMP|TYPE-POOL|ACCEPTING|APPENDAGE|ASSIGNING|COL_GROUP|COMPARING|CONSTANTS|DANGEROUS|IMPORTING|INSTANCES|LEFTSPACE|LOG-POINT|QUICKINFO|READ-ONLY|SCROLLING|SQLSCRIPT|STEP-LOOP|TOP-LINES|TRANSLATE|APPENDING|AUTHORITY|CHARACTER|COMPONENT|CONDITION|DIRECTORY|DUPLICATE|MESSAGING|RECEIVING|SUBSCREEN|ACCORDING|COL_TOTAL|END-LINES|ENDMETHOD|ENDSELECT|EXPANDING|EXTENSION|INCLUDING|INFOTYPES|INTERFACE|INTERVALS|LINE-SIZE|PF-STATUS|PROCEDURE|PROTECTED|REQUESTED|RESUMABLE|RIGHTPLUS|SAP-SPOOL|SECONDARY|STRUCTURE|SUBSTRING|TABLEVIEW|NUMOFCHAR|ADJACENT|ANALYSIS|ASSIGNED|BACKWARD|CHANNELS|CHECKBOX|CONTINUE|CRITICAL|DATAINFO|DD\/MM\/YY|DURATION|ENCODING|ENDCLASS|FUNCTION|LEFTPLUS|LINEFEED|MM\/DD\/YY|OVERFLOW|RECEIVED|SKIPPING|SORTABLE|STANDARD|SUBTRACT|SUPPRESS|TABSTRIP|TITLEBAR|TRUNCATE|UNASSIGN|WHENEVER|ANALYZER|COALESCE|COMMENTS|CONDENSE|DECIMALS|DEFERRED|ENDWHILE|EXPLICIT|KEYWORDS|MESSAGES|POSITION|PRIORITY|RECEIVER|RENAMING|TIMEZONE|TRAILING|ALLOCATE|CENTERED|CIRCULAR|CONTROLS|CURRENCY|DELETING|DESCRIBE|DISTANCE|ENDCATCH|EXPONENT|EXTENDED|GENERATE|IGNORING|INCLUDES|INTERNAL|MAJOR-ID|MODIFIER|NEW-LINE|OPTIONAL|PROPERTY|ROLLBACK|STARTING|SUPPLIED|ABSTRACT|CHANGING|CONTEXTS|CREATING|CUSTOMER|DATABASE|DAYLIGHT|DEFINING|DISTINCT|DIVISION|ENABLING|ENDCHAIN|ESCAPING|HARMLESS|IMPLICIT|INACTIVE|LANGUAGE|MINOR-ID|MULTIPLY|NEW-PAGE|NO-TITLE|POS_HIGH|SEPARATE|TEXTPOOL|TRANSFER|SELECTOR|DBMAXLEN|ITERATOR|ARCHIVE|BIT-XOR|BYTE-CO|COLLECT|COMMENT|CURRENT|DEFAULT|DISPLAY|ENDFORM|EXTRACT|LEADING|LISTBOX|LOCATOR|MEMBERS|METHODS|NESTING|POS_LOW|PROCESS|PROVIDE|RAISING|RESERVE|SECONDS|SUMMARY|VISIBLE|BETWEEN|BIT-AND|BYTE-CS|CLEANUP|COMPUTE|CONTROL|CONVERT|DATASET|ENDCASE|FORWARD|HEADERS|HOTSPOT|INCLUDE|INVERSE|KEEPING|NO-ZERO|OBJECTS|OVERLAY|PADDING|PATTERN|PROGRAM|REFRESH|SECTION|SUMMING|TESTING|VERSION|WINDOWS|WITHOUT|BIT-NOT|BYTE-CA|BYTE-NA|CASTING|CONTEXT|COUNTRY|DYNAMIC|ENABLED|ENDLOOP|EXECUTE|FRIENDS|HANDLER|HEADING|INITIAL|\*-INPUT|LOGFILE|MAXIMUM|MINIMUM|NO-GAPS|NO-SIGN|PRAGMAS|PRIMARY|PRIVATE|REDUCED|REPLACE|REQUEST|RESULTS|UNICODE|WARNING|ALIASES|BYTE-CN|BYTE-NS|CALLING|COL_KEY|COLUMNS|CONNECT|ENDEXEC|ENTRIES|EXCLUDE|FILTERS|FURTHER|HELP-ID|LOGICAL|MAPPING|MESSAGE|NAMETAB|OPTIONS|PACKAGE|PERFORM|RECEIVE|STATICS|VARYING|BINDING|CHARLEN|GREATER|XSTRLEN|ACCEPT|APPEND|DETAIL|ELSEIF|ENDING|ENDTRY|FORMAT|FRAMES|GIVING|HASHED|HEADER|IMPORT|INSERT|MARGIN|MODULE|NATIVE|OBJECT|OFFSET|REMOTE|RESUME|SAVING|SIMPLE|SUBMIT|TABBED|TOKENS|UNIQUE|UNPACK|UPDATE|WINDOW|YELLOW|ACTUAL|ASPECT|CENTER|CURSOR|DELETE|DIALOG|DIVIDE|DURING|ERRORS|EVENTS|EXTEND|FILTER|HANDLE|HAVING|IGNORE|LITTLE|MEMORY|NO-GAP|OCCURS|OPTION|PERSON|PLACES|PUBLIC|REDUCE|REPORT|RESULT|SINGLE|SORTED|SWITCH|SYNTAX|TARGET|VALUES|WRITER|ASSERT|BLOCKS|BOUNDS|BUFFER|CHANGE|COLUMN|COMMIT|CONCAT|COPIES|CREATE|DDMMYY|DEFINE|ENDIAN|ESCAPE|EXPAND|KERNEL|LAYOUT|LEGACY|LEVELS|MMDDYY|NUMBER|OUTPUT|RANGES|READER|RETURN|SCREEN|SEARCH|SELECT|SHARED|SOURCE|STABLE|STATIC|SUBKEY|SUFFIX|TABLES|UNWIND|YYMMDD|ASSIGN|BACKUP|BEFORE|BINARY|BIT-OR|BLANKS|CLIENT|CODING|COMMON|DEMAND|DYNPRO|EXCEPT|EXISTS|EXPORT|FIELDS|GLOBAL|GROUPS|LENGTH|LOCALE|MEDIUM|METHOD|MODIFY|NESTED|OTHERS|REJECT|SCROLL|SUPPLY|SYMBOL|ENDFOR|STRLEN|ALIGN|BEGIN|BOUND|ENDAT|ENTRY|EVENT|FINAL|FLUSH|GRANT|INNER|SHORT|USING|WRITE|AFTER|BLACK|BLOCK|CLOCK|COLOR|COUNT|DUMMY|EMPTY|ENDDO|ENDON|GREEN|INDEX|INOUT|LEAVE|LEVEL|LINES|MODIF|ORDER|OUTER|RANGE|RESET|RETRY|RIGHT|SMART|SPLIT|STYLE|TABLE|THROW|UNDER|UNTIL|UPPER|UTF-8|WHERE|ALIAS|BLANK|CLEAR|CLOSE|EXACT|FETCH|FIRST|FOUND|GROUP|LLANG|LOCAL|OTHER|REGEX|SPOOL|TITLE|TYPES|VALID|WHILE|ALPHA|BOXED|CATCH|CHAIN|CHECK|CLASS|COVER|ENDIF|EQUIV|FIELD|FLOOR|FRAME|INPUT|LOWER|MATCH|NODES|PAGES|PRINT|RAISE|ROUND|SHIFT|SPACE|SPOTS|STAMP|STATE|TASKS|TIMES|TRMAC|ULINE|UNION|VALUE|WIDTH|EQUAL|LOG10|TRUNC|BLOB|CASE|CEIL|CLOB|COND|EXIT|FILE|GAPS|HOLD|INCL|INTO|KEEP|KEYS|LAST|LINE|LONG|LPAD|MAIL|MODE|OPEN|PINK|READ|ROWS|TEST|THEN|ZERO|AREA|BACK|BADI|BYTE|CAST|EDIT|EXEC|FAIL|FIND|FKEQ|FONT|FREE|GKEQ|HIDE|INIT|ITNO|LATE|LOOP|MAIN|MARK|MOVE|NEXT|NULL|RISK|ROLE|UNIT|WAIT|ZONE|BASE|CALL|CODE|DATA|DATE|FKGE|GKGE|HIGH|KIND|LEFT|LIST|MASK|MESH|NAME|NODE|PACK|PAGE|POOL|SEND|SIGN|SIZE|SOME|STOP|TASK|TEXT|TIME|USER|VARY|WITH|WORD|BLUE|CONV|COPY|DEEP|ELSE|FORM|FROM|HINT|ICON|JOIN|LIKE|LOAD|ONLY|PART|SCAN|SKIP|SORT|TYPE|UNIX|VIEW|WHEN|WORK|ACOS|ASIN|ATAN|COSH|EACH|FRAC|LESS|RTTI|SINH|SQRT|TANH|AVG|BIT|DIV|ISO|LET|OUT|PAD|SQL|ALL|CI_|CPI|END|LOB|LPI|MAX|MIN|NEW|OLE|RUN|SET|\?TO|YES|ABS|ADD|AND|BIG|FOR|HDB|JOB|LOW|NOT|SAP|TRY|VIA|XML|ANY|GET|IDS|KEY|MOD|OFF|PUT|RAW|RED|REF|SUM|TAB|XSD|CNT|COS|EXP|LOG|SIN|TAN|XOR|AT|CO|CP|DO|GT|ID|IF|NS|OR|BT|CA|CS|GE|NA|NB|EQ|IN|LT|NE|NO|OF|ON|PF|TO|AS|BY|CN|IS|LE|NP|UP|E|I|M|O|Z|C|X)\b/i,
        lookbehind: true
      },
      /* Numbers can be only integers. Decimal or Hex appear only as strings */
      number: /\b\d+\b/,
      /* Operators must always be surrounded by whitespace, they cannot be put
      adjacent to operands.
      */
      operator: {
        pattern: /(\s)(?:\*\*?|<[=>]?|>=?|\?=|[-+\/=])(?=\s)/,
        lookbehind: true
      },
      "string-operator": {
        pattern: /(\s)&&?(?=\s)/,
        lookbehind: true,
        /* The official editor highlights */
        alias: "keyword"
      },
      "token-operator": [
        {
          /* Special operators used to access structure components, class methods/attributes, etc. */
          pattern: /(\w)(?:->?|=>|[~|{}])(?=\w)/,
          lookbehind: true,
          alias: "punctuation"
        },
        {
          /* Special tokens used do delimit string templates */
          pattern: /[|{}]/,
          alias: "punctuation"
        }
      ],
      punctuation: /[,.:()]/
    };
  }
  return abap_1;
}
var abnf_1;
var hasRequiredAbnf;
function requireAbnf() {
  if (hasRequiredAbnf) return abnf_1;
  hasRequiredAbnf = 1;
  abnf_1 = abnf;
  abnf.displayName = "abnf";
  abnf.aliases = [];
  function abnf(Prism2) {
    (function(Prism3) {
      var coreRules = "(?:ALPHA|BIT|CHAR|CR|CRLF|CTL|DIGIT|DQUOTE|HEXDIG|HTAB|LF|LWSP|OCTET|SP|VCHAR|WSP)";
      Prism3.languages.abnf = {
        comment: /;.*/,
        string: {
          pattern: /(?:%[is])?"[^"\n\r]*"/,
          greedy: true,
          inside: {
            punctuation: /^%[is]/
          }
        },
        range: {
          pattern: /%(?:b[01]+-[01]+|d\d+-\d+|x[A-F\d]+-[A-F\d]+)/i,
          alias: "number"
        },
        terminal: {
          pattern: /%(?:b[01]+(?:\.[01]+)*|d\d+(?:\.\d+)*|x[A-F\d]+(?:\.[A-F\d]+)*)/i,
          alias: "number"
        },
        repetition: {
          pattern: /(^|[^\w-])(?:\d*\*\d*|\d+)/,
          lookbehind: true,
          alias: "operator"
        },
        definition: {
          pattern: /(^[ \t]*)(?:[a-z][\w-]*|<[^<>\r\n]*>)(?=\s*=)/m,
          lookbehind: true,
          alias: "keyword",
          inside: {
            punctuation: /<|>/
          }
        },
        "core-rule": {
          pattern: RegExp(
            "(?:(^|[^<\\w-])" + coreRules + "|<" + coreRules + ">)(?![\\w-])",
            "i"
          ),
          lookbehind: true,
          alias: ["rule", "constant"],
          inside: {
            punctuation: /<|>/
          }
        },
        rule: {
          pattern: /(^|[^<\w-])[a-z][\w-]*|<[^<>\r\n]*>/i,
          lookbehind: true,
          inside: {
            punctuation: /<|>/
          }
        },
        operator: /=\/?|\//,
        punctuation: /[()\[\]]/
      };
    })(Prism2);
  }
  return abnf_1;
}
var actionscript_1;
var hasRequiredActionscript;
function requireActionscript() {
  if (hasRequiredActionscript) return actionscript_1;
  hasRequiredActionscript = 1;
  actionscript_1 = actionscript;
  actionscript.displayName = "actionscript";
  actionscript.aliases = [];
  function actionscript(Prism2) {
    Prism2.languages.actionscript = Prism2.languages.extend("javascript", {
      keyword: /\b(?:as|break|case|catch|class|const|default|delete|do|dynamic|each|else|extends|final|finally|for|function|get|if|implements|import|in|include|instanceof|interface|internal|is|namespace|native|new|null|override|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|use|var|void|while|with)\b/,
      operator: /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/
    });
    Prism2.languages.actionscript["class-name"].alias = "function";
    delete Prism2.languages.actionscript["parameter"];
    delete Prism2.languages.actionscript["literal-property"];
    if (Prism2.languages.markup) {
      Prism2.languages.insertBefore("actionscript", "string", {
        xml: {
          pattern: /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/,
          lookbehind: true,
          inside: Prism2.languages.markup
        }
      });
    }
  }
  return actionscript_1;
}
var ada_1;
var hasRequiredAda;
function requireAda() {
  if (hasRequiredAda) return ada_1;
  hasRequiredAda = 1;
  ada_1 = ada;
  ada.displayName = "ada";
  ada.aliases = [];
  function ada(Prism2) {
    Prism2.languages.ada = {
      comment: /--.*/,
      string: /"(?:""|[^"\r\f\n])*"/,
      number: [
        {
          pattern: /\b\d(?:_?\d)*#[\dA-F](?:_?[\dA-F])*(?:\.[\dA-F](?:_?[\dA-F])*)?#(?:E[+-]?\d(?:_?\d)*)?/i
        },
        {
          pattern: /\b\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:E[+-]?\d(?:_?\d)*)?\b/i
        }
      ],
      "attr-name": /\b'\w+/,
      keyword: /\b(?:abort|abs|abstract|accept|access|aliased|all|and|array|at|begin|body|case|constant|declare|delay|delta|digits|do|else|elsif|end|entry|exception|exit|for|function|generic|goto|if|in|interface|is|limited|loop|mod|new|not|null|of|others|out|overriding|package|pragma|private|procedure|protected|raise|range|record|rem|renames|requeue|return|reverse|select|separate|some|subtype|synchronized|tagged|task|terminate|then|type|until|use|when|while|with|xor)\b/i,
      boolean: /\b(?:false|true)\b/i,
      operator: /<[=>]?|>=?|=>?|:=|\/=?|\*\*?|[&+-]/,
      punctuation: /\.\.?|[,;():]/,
      char: /'.'/,
      variable: /\b[a-z](?:\w)*\b/i
    };
  }
  return ada_1;
}
var agda_1;
var hasRequiredAgda;
function requireAgda() {
  if (hasRequiredAgda) return agda_1;
  hasRequiredAgda = 1;
  agda_1 = agda;
  agda.displayName = "agda";
  agda.aliases = [];
  function agda(Prism2) {
    (function(Prism3) {
      Prism3.languages.agda = {
        comment: /\{-[\s\S]*?(?:-\}|$)|--.*/,
        string: {
          pattern: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/,
          greedy: true
        },
        punctuation: /[(){}⦃⦄.;@]/,
        "class-name": {
          pattern: /((?:data|record) +)\S+/,
          lookbehind: true
        },
        function: {
          pattern: /(^[ \t]*)(?!\s)[^:\r\n]+(?=:)/m,
          lookbehind: true
        },
        operator: {
          pattern: /(^\s*|\s)(?:[=|:∀→λ\\?_]|->)(?=\s)/,
          lookbehind: true
        },
        keyword: /\b(?:Set|abstract|constructor|data|eta-equality|field|forall|hiding|import|in|inductive|infix|infixl|infixr|instance|let|macro|module|mutual|no-eta-equality|open|overlap|pattern|postulate|primitive|private|public|quote|quoteContext|quoteGoal|quoteTerm|record|renaming|rewrite|syntax|tactic|unquote|unquoteDecl|unquoteDef|using|variable|where|with)\b/
      };
    })(Prism2);
  }
  return agda_1;
}
var al_1;
var hasRequiredAl;
function requireAl() {
  if (hasRequiredAl) return al_1;
  hasRequiredAl = 1;
  al_1 = al;
  al.displayName = "al";
  al.aliases = [];
  function al(Prism2) {
    Prism2.languages.al = {
      comment: /\/\/.*|\/\*[\s\S]*?\*\//,
      string: {
        pattern: /'(?:''|[^'\r\n])*'(?!')|"(?:""|[^"\r\n])*"(?!")/,
        greedy: true
      },
      function: {
        pattern: /(\b(?:event|procedure|trigger)\s+|(?:^|[^.])\.\s*)[a-z_]\w*(?=\s*\()/i,
        lookbehind: true
      },
      keyword: [
        // keywords
        /\b(?:array|asserterror|begin|break|case|do|downto|else|end|event|exit|for|foreach|function|if|implements|in|indataset|interface|internal|local|of|procedure|program|protected|repeat|runonclient|securityfiltering|suppressdispose|temporary|then|to|trigger|until|var|while|with|withevents)\b/i,
        // objects and metadata that are used like keywords
        /\b(?:action|actions|addafter|addbefore|addfirst|addlast|area|assembly|chartpart|codeunit|column|controladdin|cuegroup|customizes|dataitem|dataset|dotnet|elements|enum|enumextension|extends|field|fieldattribute|fieldelement|fieldgroup|fieldgroups|fields|filter|fixed|grid|group|key|keys|label|labels|layout|modify|moveafter|movebefore|movefirst|movelast|page|pagecustomization|pageextension|part|profile|query|repeater|report|requestpage|schema|separator|systempart|table|tableelement|tableextension|textattribute|textelement|type|usercontrol|value|xmlport)\b/i
      ],
      number: /\b(?:0x[\da-f]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)(?:F|LL?|U(?:LL?)?)?\b/i,
      boolean: /\b(?:false|true)\b/i,
      variable: /\b(?:Curr(?:FieldNo|Page|Report)|x?Rec|RequestOptionsPage)\b/,
      "class-name": /\b(?:automation|biginteger|bigtext|blob|boolean|byte|char|clienttype|code|completiontriggererrorlevel|connectiontype|database|dataclassification|datascope|date|dateformula|datetime|decimal|defaultlayout|dialog|dictionary|dotnetassembly|dotnettypedeclaration|duration|errorinfo|errortype|executioncontext|executionmode|fieldclass|fieldref|fieldtype|file|filterpagebuilder|guid|httpclient|httpcontent|httpheaders|httprequestmessage|httpresponsemessage|instream|integer|joker|jsonarray|jsonobject|jsontoken|jsonvalue|keyref|list|moduledependencyinfo|moduleinfo|none|notification|notificationscope|objecttype|option|outstream|pageresult|record|recordid|recordref|reportformat|securityfilter|sessionsettings|tableconnectiontype|tablefilter|testaction|testfield|testfilterfield|testpage|testpermissions|testrequestpage|text|textbuilder|textconst|textencoding|time|transactionmodel|transactiontype|variant|verbosity|version|view|views|webserviceactioncontext|webserviceactionresultcode|xmlattribute|xmlattributecollection|xmlcdata|xmlcomment|xmldeclaration|xmldocument|xmldocumenttype|xmlelement|xmlnamespacemanager|xmlnametable|xmlnode|xmlnodelist|xmlprocessinginstruction|xmlreadoptions|xmltext|xmlwriteoptions)\b/i,
      operator: /\.\.|:[=:]|[-+*/]=?|<>|[<>]=?|=|\b(?:and|div|mod|not|or|xor)\b/i,
      punctuation: /[()\[\]{}:.;,]/
    };
  }
  return al_1;
}
var antlr4_1;
var hasRequiredAntlr4;
function requireAntlr4() {
  if (hasRequiredAntlr4) return antlr4_1;
  hasRequiredAntlr4 = 1;
  antlr4_1 = antlr4;
  antlr4.displayName = "antlr4";
  antlr4.aliases = ["g4"];
  function antlr4(Prism2) {
    Prism2.languages.antlr4 = {
      comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
      string: {
        pattern: /'(?:\\.|[^\\'\r\n])*'/,
        greedy: true
      },
      "character-class": {
        pattern: /\[(?:\\.|[^\\\]\r\n])*\]/,
        greedy: true,
        alias: "regex",
        inside: {
          range: {
            pattern: /([^[]|(?:^|[^\\])(?:\\\\)*\\\[)-(?!\])/,
            lookbehind: true,
            alias: "punctuation"
          },
          escape: /\\(?:u(?:[a-fA-F\d]{4}|\{[a-fA-F\d]+\})|[pP]\{[=\w-]+\}|[^\r\nupP])/,
          punctuation: /[\[\]]/
        }
      },
      action: {
        pattern: /\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})*\}/,
        greedy: true,
        inside: {
          content: {
            // this might be C, C++, Python, Java, C#, or any other language ANTLR4 compiles to
            pattern: /(\{)[\s\S]+(?=\})/,
            lookbehind: true
          },
          punctuation: /[{}]/
        }
      },
      command: {
        pattern: /(->\s*(?!\s))(?:\s*(?:,\s*)?\b[a-z]\w*(?:\s*\([^()\r\n]*\))?)+(?=\s*;)/i,
        lookbehind: true,
        inside: {
          function: /\b\w+(?=\s*(?:[,(]|$))/,
          punctuation: /[,()]/
        }
      },
      annotation: {
        pattern: /@\w+(?:::\w+)*/,
        alias: "keyword"
      },
      label: {
        pattern: /#[ \t]*\w+/,
        alias: "punctuation"
      },
      keyword: /\b(?:catch|channels|finally|fragment|grammar|import|lexer|locals|mode|options|parser|returns|throws|tokens)\b/,
      definition: [
        {
          pattern: /\b[a-z]\w*(?=\s*:)/,
          alias: ["rule", "class-name"]
        },
        {
          pattern: /\b[A-Z]\w*(?=\s*:)/,
          alias: ["token", "constant"]
        }
      ],
      constant: /\b[A-Z][A-Z_]*\b/,
      operator: /\.\.|->|[|~]|[*+?]\??/,
      punctuation: /[;:()=]/
    };
    Prism2.languages.g4 = Prism2.languages.antlr4;
  }
  return antlr4_1;
}
var apacheconf_1;
var hasRequiredApacheconf;
function requireApacheconf() {
  if (hasRequiredApacheconf) return apacheconf_1;
  hasRequiredApacheconf = 1;
  apacheconf_1 = apacheconf;
  apacheconf.displayName = "apacheconf";
  apacheconf.aliases = [];
  function apacheconf(Prism2) {
    Prism2.languages.apacheconf = {
      comment: /#.*/,
      "directive-inline": {
        pattern: /(^[\t ]*)\b(?:AcceptFilter|AcceptPathInfo|AccessFileName|Action|Add(?:Alt|AltByEncoding|AltByType|Charset|DefaultCharset|Description|Encoding|Handler|Icon|IconByEncoding|IconByType|InputFilter|Language|ModuleInfo|OutputFilter|OutputFilterByType|Type)|Alias|AliasMatch|Allow(?:CONNECT|EncodedSlashes|Methods|Override|OverrideList)?|Anonymous(?:_LogEmail|_MustGiveEmail|_NoUserID|_VerifyEmail)?|AsyncRequestWorkerFactor|Auth(?:BasicAuthoritative|BasicFake|BasicProvider|BasicUseDigestAlgorithm|DBDUserPWQuery|DBDUserRealmQuery|DBMGroupFile|DBMType|DBMUserFile|Digest(?:Algorithm|Domain|NonceLifetime|Provider|Qop|ShmemSize)|Form(?:Authoritative|Body|DisableNoStore|FakeBasicAuth|Location|LoginRequiredLocation|LoginSuccessLocation|LogoutLocation|Method|Mimetype|Password|Provider|SitePassphrase|Size|Username)|GroupFile|LDAP(?:AuthorizePrefix|BindAuthoritative|BindDN|BindPassword|CharsetConfig|CompareAsUser|CompareDNOnServer|DereferenceAliases|GroupAttribute|GroupAttributeIsDN|InitialBindAsUser|InitialBindPattern|MaxSubGroupDepth|RemoteUserAttribute|RemoteUserIsDN|SearchAsUser|SubGroupAttribute|SubGroupClass|Url)|Merging|Name|nCache(?:Context|Enable|ProvideFor|SOCache|Timeout)|nzFcgiCheckAuthnProvider|nzFcgiDefineProvider|Type|UserFile|zDBDLoginToReferer|zDBDQuery|zDBDRedirectQuery|zDBMType|zSendForbiddenOnFailure)|BalancerGrowth|BalancerInherit|BalancerMember|BalancerPersist|BrowserMatch|BrowserMatchNoCase|BufferedLogs|BufferSize|Cache(?:DefaultExpire|DetailHeader|DirLength|DirLevels|Disable|Enable|File|Header|IgnoreCacheControl|IgnoreHeaders|IgnoreNoLastMod|IgnoreQueryString|IgnoreURLSessionIdentifiers|KeyBaseURL|LastModifiedFactor|Lock|LockMaxAge|LockPath|MaxExpire|MaxFileSize|MinExpire|MinFileSize|NegotiatedDocs|QuickHandler|ReadSize|ReadTime|Root|Socache(?:MaxSize|MaxTime|MinTime|ReadSize|ReadTime)?|StaleOnError|StoreExpired|StoreNoStore|StorePrivate)|CGIDScriptTimeout|CGIMapExtension|CharsetDefault|CharsetOptions|CharsetSourceEnc|CheckCaseOnly|CheckSpelling|ChrootDir|ContentDigest|CookieDomain|CookieExpires|CookieName|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|Dav|DavDepthInfinity|DavGenericLockDB|DavLockDB|DavMinTimeout|DBDExptime|DBDInitSQL|DBDKeep|DBDMax|DBDMin|DBDParams|DBDPersist|DBDPrepareSQL|DBDriver|DefaultIcon|DefaultLanguage|DefaultRuntimeDir|DefaultType|Define|Deflate(?:BufferSize|CompressionLevel|FilterNote|InflateLimitRequestBody|InflateRatio(?:Burst|Limit)|MemLevel|WindowSize)|Deny|DirectoryCheckHandler|DirectoryIndex|DirectoryIndexRedirect|DirectorySlash|DocumentRoot|DTracePrivileges|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|Error|ErrorDocument|ErrorLog|ErrorLogFormat|Example|ExpiresActive|ExpiresByType|ExpiresDefault|ExtendedStatus|ExtFilterDefine|ExtFilterOptions|FallbackResource|FileETag|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceLanguagePriority|ForceType|ForensicLog|GprofDir|GracefulShutdownTimeout|Group|Header|HeaderName|Heartbeat(?:Address|Listen|MaxServers|Storage)|HostnameLookups|IdentityCheck|IdentityCheckTimeout|ImapBase|ImapDefault|ImapMenu|Include|IncludeOptional|Index(?:HeadInsert|Ignore|IgnoreReset|Options|OrderDefault|StyleSheet)|InputSed|ISAPI(?:AppendLogToErrors|AppendLogToQuery|CacheFile|FakeAsync|LogNotSupported|ReadAheadBuffer)|KeepAlive|KeepAliveTimeout|KeptBodySize|LanguagePriority|LDAP(?:CacheEntries|CacheTTL|ConnectionPoolTTL|ConnectionTimeout|LibraryDebug|OpCacheEntries|OpCacheTTL|ReferralHopLimit|Referrals|Retries|RetryDelay|SharedCacheFile|SharedCacheSize|Timeout|TrustedClientCert|TrustedGlobalCert|TrustedMode|VerifyServerCert)|Limit(?:InternalRecursion|Request(?:Body|Fields|FieldSize|Line)|XMLRequestBody)|Listen|ListenBackLog|LoadFile|LoadModule|LogFormat|LogLevel|LogMessage|LuaAuthzProvider|LuaCodeCache|Lua(?:Hook(?:AccessChecker|AuthChecker|CheckUserID|Fixups|InsertFilter|Log|MapToStorage|TranslateName|TypeChecker)|Inherit|InputFilter|MapHandler|OutputFilter|PackageCPath|PackagePath|QuickHandler|Root|Scope)|Max(?:ConnectionsPerChild|KeepAliveRequests|MemFree|RangeOverlaps|RangeReversals|Ranges|RequestWorkers|SpareServers|SpareThreads|Threads)|MergeTrailers|MetaDir|MetaFiles|MetaSuffix|MimeMagicFile|MinSpareServers|MinSpareThreads|MMapFile|ModemStandard|ModMimeUsePathInfo|MultiviewsMatch|Mutex|NameVirtualHost|NoProxy|NWSSLTrustedCerts|NWSSLUpgradeable|Options|Order|OutputSed|PassEnv|PidFile|PrivilegesMode|Protocol|ProtocolEcho|Proxy(?:AddHeaders|BadHeader|Block|Domain|ErrorOverride|ExpressDBMFile|ExpressDBMType|ExpressEnable|FtpDirCharset|FtpEscapeWildcards|FtpListOnWildcard|HTML(?:BufSize|CharsetOut|DocType|Enable|Events|Extended|Fixups|Interp|Links|Meta|StripComments|URLMap)|IOBufferSize|MaxForwards|Pass(?:Inherit|InterpolateEnv|Match|Reverse|ReverseCookieDomain|ReverseCookiePath)?|PreserveHost|ReceiveBufferSize|Remote|RemoteMatch|Requests|SCGIInternalRedirect|SCGISendfile|Set|SourceAddress|Status|Timeout|Via)|ReadmeName|ReceiveBufferSize|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ReflectorHeader|RemoteIP(?:Header|InternalProxy|InternalProxyList|ProxiesHeader|TrustedProxy|TrustedProxyList)|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|RequestReadTimeout|Require|Rewrite(?:Base|Cond|Engine|Map|Options|Rule)|RLimitCPU|RLimitMEM|RLimitNPROC|Satisfy|ScoreBoardFile|Script(?:Alias|AliasMatch|InterpreterSource|Log|LogBuffer|LogLength|Sock)?|SecureListen|SeeRequestTail|SendBufferSize|Server(?:Admin|Alias|Limit|Name|Path|Root|Signature|Tokens)|Session(?:Cookie(?:Name|Name2|Remove)|Crypto(?:Cipher|Driver|Passphrase|PassphraseFile)|DBD(?:CookieName|CookieName2|CookieRemove|DeleteLabel|InsertLabel|PerUser|SelectLabel|UpdateLabel)|Env|Exclude|Header|Include|MaxAge)?|SetEnv|SetEnvIf|SetEnvIfExpr|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|SSIEndTag|SSIErrorMsg|SSIETag|SSILastModified|SSILegacyExprParser|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSL(?:CACertificateFile|CACertificatePath|CADNRequestFile|CADNRequestPath|CARevocationCheck|CARevocationFile|CARevocationPath|CertificateChainFile|CertificateFile|CertificateKeyFile|CipherSuite|Compression|CryptoDevice|Engine|FIPS|HonorCipherOrder|InsecureRenegotiation|OCSP(?:DefaultResponder|Enable|OverrideResponder|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|UseRequestNonce)|OpenSSLConfCmd|Options|PassPhraseDialog|Protocol|Proxy(?:CACertificateFile|CACertificatePath|CARevocation(?:Check|File|Path)|CheckPeer(?:CN|Expire|Name)|CipherSuite|Engine|MachineCertificate(?:ChainFile|File|Path)|Protocol|Verify|VerifyDepth)|RandomSeed|RenegBufferSize|Require|RequireSSL|Session(?:Cache|CacheTimeout|TicketKeyFile|Tickets)|SRPUnknownUserSeed|SRPVerifierFile|Stapling(?:Cache|ErrorCacheTimeout|FakeTryLater|ForceURL|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|ReturnResponderErrors|StandardCacheTimeout)|StrictSNIVHostCheck|UserName|UseStapling|VerifyClient|VerifyDepth)|StartServers|StartThreads|Substitute|Suexec|SuexecUserGroup|ThreadLimit|ThreadsPerChild|ThreadStackSize|TimeOut|TraceEnable|TransferLog|TypesConfig|UnDefine|UndefMacro|UnsetEnv|Use|UseCanonicalName|UseCanonicalPhysicalPort|User|UserDir|VHostCGIMode|VHostCGIPrivs|VHostGroup|VHostPrivs|VHostSecure|VHostUser|Virtual(?:DocumentRoot|ScriptAlias)(?:IP)?|WatchdogInterval|XBitHack|xml2EncAlias|xml2EncDefault|xml2StartParse)\b/im,
        lookbehind: true,
        alias: "property"
      },
      "directive-block": {
        pattern: /<\/?\b(?:Auth[nz]ProviderAlias|Directory|DirectoryMatch|Else|ElseIf|Files|FilesMatch|If|IfDefine|IfModule|IfVersion|Limit|LimitExcept|Location|LocationMatch|Macro|Proxy|Require(?:All|Any|None)|VirtualHost)\b.*>/i,
        inside: {
          "directive-block": {
            pattern: /^<\/?\w+/,
            inside: {
              punctuation: /^<\/?/
            },
            alias: "tag"
          },
          "directive-block-parameter": {
            pattern: /.*[^>]/,
            inside: {
              punctuation: /:/,
              string: {
                pattern: /("|').*\1/,
                inside: {
                  variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/
                }
              }
            },
            alias: "attr-value"
          },
          punctuation: />/
        },
        alias: "tag"
      },
      "directive-flags": {
        pattern: /\[(?:[\w=],?)+\]/,
        alias: "keyword"
      },
      string: {
        pattern: /("|').*\1/,
        inside: {
          variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/
        }
      },
      variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/,
      regex: /\^?.*\$|\^.*\$?/
    };
  }
  return apacheconf_1;
}
var sql_1;
var hasRequiredSql;
function requireSql() {
  if (hasRequiredSql) return sql_1;
  hasRequiredSql = 1;
  sql_1 = sql;
  sql.displayName = "sql";
  sql.aliases = [];
  function sql(Prism2) {
    Prism2.languages.sql = {
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
        lookbehind: true
      },
      variable: [
        {
          pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
          greedy: true
        },
        /@[\w.$]+/
      ],
      string: {
        pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
        greedy: true,
        lookbehind: true
      },
      identifier: {
        pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
        greedy: true,
        lookbehind: true,
        inside: {
          punctuation: /^`|`$/
        }
      },
      function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
      // Should we highlight user defined functions too?
      keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
      boolean: /\b(?:FALSE|NULL|TRUE)\b/i,
      number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
      operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
      punctuation: /[;[\]()`,.]/
    };
  }
  return sql_1;
}
var apex_1;
var hasRequiredApex;
function requireApex() {
  if (hasRequiredApex) return apex_1;
  hasRequiredApex = 1;
  var refractorSql = requireSql();
  apex_1 = apex;
  apex.displayName = "apex";
  apex.aliases = [];
  function apex(Prism2) {
    Prism2.register(refractorSql);
    (function(Prism3) {
      var keywords = /\b(?:(?:after|before)(?=\s+[a-z])|abstract|activate|and|any|array|as|asc|autonomous|begin|bigdecimal|blob|boolean|break|bulk|by|byte|case|cast|catch|char|class|collect|commit|const|continue|currency|date|datetime|decimal|default|delete|desc|do|double|else|end|enum|exception|exit|export|extends|final|finally|float|for|from|get(?=\s*[{};])|global|goto|group|having|hint|if|implements|import|in|inner|insert|instanceof|int|integer|interface|into|join|like|limit|list|long|loop|map|merge|new|not|null|nulls|number|object|of|on|or|outer|override|package|parallel|pragma|private|protected|public|retrieve|return|rollback|select|set|short|sObject|sort|static|string|super|switch|synchronized|system|testmethod|then|this|throw|time|transaction|transient|trigger|try|undelete|update|upsert|using|virtual|void|webservice|when|where|while|(?:inherited|with|without)\s+sharing)\b/i;
      var className = /\b(?:(?=[a-z_]\w*\s*[<\[])|(?!<keyword>))[A-Z_]\w*(?:\s*\.\s*[A-Z_]\w*)*\b(?:\s*(?:\[\s*\]|<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>))*/.source.replace(
        /<keyword>/g,
        function() {
          return keywords.source;
        }
      );
      function insertClassName(pattern) {
        return RegExp(
          pattern.replace(/<CLASS-NAME>/g, function() {
            return className;
          }),
          "i"
        );
      }
      var classNameInside = {
        keyword: keywords,
        punctuation: /[()\[\]{};,:.<>]/
      };
      Prism3.languages.apex = {
        comment: Prism3.languages.clike.comment,
        string: Prism3.languages.clike.string,
        sql: {
          pattern: /((?:[=,({:]|\breturn)\s*)\[[^\[\]]*\]/i,
          lookbehind: true,
          greedy: true,
          alias: "language-sql",
          inside: Prism3.languages.sql
        },
        annotation: {
          pattern: /@\w+\b/,
          alias: "punctuation"
        },
        "class-name": [
          {
            pattern: insertClassName(
              /(\b(?:class|enum|extends|implements|instanceof|interface|new|trigger\s+\w+\s+on)\s+)<CLASS-NAME>/.source
            ),
            lookbehind: true,
            inside: classNameInside
          },
          {
            // cast
            pattern: insertClassName(
              /(\(\s*)<CLASS-NAME>(?=\s*\)\s*[\w(])/.source
            ),
            lookbehind: true,
            inside: classNameInside
          },
          {
            // variable/parameter declaration and return types
            pattern: insertClassName(/<CLASS-NAME>(?=\s*\w+\s*[;=,(){:])/.source),
            inside: classNameInside
          }
        ],
        trigger: {
          pattern: /(\btrigger\s+)\w+\b/i,
          lookbehind: true,
          alias: "class-name"
        },
        keyword: keywords,
        function: /\b[a-z_]\w*(?=\s*\()/i,
        boolean: /\b(?:false|true)\b/i,
        number: /(?:\B\.\d+|\b\d+(?:\.\d+|L)?)\b/i,
        operator: /[!=](?:==?)?|\?\.?|&&|\|\||--|\+\+|[-+*/^&|]=?|:|<<?=?|>{1,3}=?/,
        punctuation: /[()\[\]{};,.]/
      };
    })(Prism2);
  }
  return apex_1;
}
var apl_1;
var hasRequiredApl;
function requireApl() {
  if (hasRequiredApl) return apl_1;
  hasRequiredApl = 1;
  apl_1 = apl;
  apl.displayName = "apl";
  apl.aliases = [];
  function apl(Prism2) {
    Prism2.languages.apl = {
      comment: /(?:⍝|#[! ]).*$/m,
      string: {
        pattern: /'(?:[^'\r\n]|'')*'/,
        greedy: true
      },
      number: /¯?(?:\d*\.?\b\d+(?:e[+¯]?\d+)?|¯|∞)(?:j¯?(?:(?:\d+(?:\.\d+)?|\.\d+)(?:e[+¯]?\d+)?|¯|∞))?/i,
      statement: /:[A-Z][a-z][A-Za-z]*\b/,
      "system-function": {
        pattern: /⎕[A-Z]+/i,
        alias: "function"
      },
      constant: /[⍬⌾#⎕⍞]/,
      function: /[-+×÷⌈⌊∣|⍳⍸?*⍟○!⌹<≤=>≥≠≡≢∊⍷∪∩~∨∧⍱⍲⍴,⍪⌽⊖⍉↑↓⊂⊃⊆⊇⌷⍋⍒⊤⊥⍕⍎⊣⊢⍁⍂≈⍯↗¤→]/,
      "monadic-operator": {
        pattern: /[\\\/⌿⍀¨⍨⌶&∥]/,
        alias: "operator"
      },
      "dyadic-operator": {
        pattern: /[.⍣⍠⍤∘⌸@⌺⍥]/,
        alias: "operator"
      },
      assignment: {
        pattern: /←/,
        alias: "keyword"
      },
      punctuation: /[\[;\]()◇⋄]/,
      dfn: {
        pattern: /[{}⍺⍵⍶⍹∇⍫:]/,
        alias: "builtin"
      }
    };
  }
  return apl_1;
}
var applescript_1;
var hasRequiredApplescript;
function requireApplescript() {
  if (hasRequiredApplescript) return applescript_1;
  hasRequiredApplescript = 1;
  applescript_1 = applescript;
  applescript.displayName = "applescript";
  applescript.aliases = [];
  function applescript(Prism2) {
    Prism2.languages.applescript = {
      comment: [
        // Allow one level of nesting
        /\(\*(?:\(\*(?:[^*]|\*(?!\)))*\*\)|(?!\(\*)[\s\S])*?\*\)/,
        /--.+/,
        /#.+/
      ],
      string: /"(?:\\.|[^"\\\r\n])*"/,
      number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e-?\d+)?\b/i,
      operator: [
        /[&=≠≤≥*+\-\/÷^]|[<>]=?/,
        /\b(?:(?:begin|end|start)s? with|(?:contains?|(?:does not|doesn't) contain)|(?:is|isn't|is not) (?:contained by|in)|(?:(?:is|isn't|is not) )?(?:greater|less) than(?: or equal)?(?: to)?|(?:comes|(?:does not|doesn't) come) (?:after|before)|(?:is|isn't|is not) equal(?: to)?|(?:(?:does not|doesn't) equal|equal to|equals|is not|isn't)|(?:a )?(?:ref(?: to)?|reference to)|(?:and|as|div|mod|not|or))\b/
      ],
      keyword: /\b(?:about|above|after|against|apart from|around|aside from|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|continue|copy|does|eighth|else|end|equal|error|every|exit|false|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|instead of|into|is|it|its|last|local|me|middle|my|ninth|of|on|onto|out of|over|prop|property|put|repeat|return|returning|second|set|seventh|since|sixth|some|tell|tenth|that|the|then|third|through|thru|timeout|times|to|transaction|true|try|until|where|while|whose|with|without)\b/,
      "class-name": /\b(?:POSIX file|RGB color|alias|application|boolean|centimeters|centimetres|class|constant|cubic centimeters|cubic centimetres|cubic feet|cubic inches|cubic meters|cubic metres|cubic yards|date|degrees Celsius|degrees Fahrenheit|degrees Kelvin|feet|file|gallons|grams|inches|integer|kilograms|kilometers|kilometres|list|liters|litres|meters|metres|miles|number|ounces|pounds|quarts|real|record|reference|script|square feet|square kilometers|square kilometres|square meters|square metres|square miles|square yards|text|yards)\b/,
      punctuation: /[{}():,¬«»《》]/
    };
  }
  return applescript_1;
}
var aql_1;
var hasRequiredAql;
function requireAql() {
  if (hasRequiredAql) return aql_1;
  hasRequiredAql = 1;
  aql_1 = aql;
  aql.displayName = "aql";
  aql.aliases = [];
  function aql(Prism2) {
    Prism2.languages.aql = {
      comment: /\/\/.*|\/\*[\s\S]*?\*\//,
      property: {
        pattern: /([{,]\s*)(?:(?!\d)\w+|(["'´`])(?:(?!\2)[^\\\r\n]|\\.)*\2)(?=\s*:)/,
        lookbehind: true,
        greedy: true
      },
      string: {
        pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\.)*\1/,
        greedy: true
      },
      identifier: {
        pattern: /([´`])(?:(?!\1)[^\\\r\n]|\\.)*\1/,
        greedy: true
      },
      variable: /@@?\w+/,
      keyword: [
        {
          pattern: /(\bWITH\s+)COUNT(?=\s+INTO\b)/i,
          lookbehind: true
        },
        /\b(?:AGGREGATE|ALL|AND|ANY|ASC|COLLECT|DESC|DISTINCT|FILTER|FOR|GRAPH|IN|INBOUND|INSERT|INTO|K_PATHS|K_SHORTEST_PATHS|LET|LIKE|LIMIT|NONE|NOT|NULL|OR|OUTBOUND|REMOVE|REPLACE|RETURN|SHORTEST_PATH|SORT|UPDATE|UPSERT|WINDOW|WITH)\b/i,
        // pseudo keywords get a lookbehind to avoid false positives
        {
          pattern: /(^|[^\w.[])(?:KEEP|PRUNE|SEARCH|TO)\b/i,
          lookbehind: true
        },
        {
          pattern: /(^|[^\w.[])(?:CURRENT|NEW|OLD)\b/,
          lookbehind: true
        },
        {
          pattern: /\bOPTIONS(?=\s*\{)/i
        }
      ],
      function: /\b(?!\d)\w+(?=\s*\()/,
      boolean: /\b(?:false|true)\b/i,
      range: {
        pattern: /\.\./,
        alias: "operator"
      },
      number: [
        /\b0b[01]+/i,
        /\b0x[0-9a-f]+/i,
        /(?:\B\.\d+|\b(?:0|[1-9]\d*)(?:\.\d+)?)(?:e[+-]?\d+)?/i
      ],
      operator: /\*{2,}|[=!]~|[!=<>]=?|&&|\|\||[-+*/%]/,
      punctuation: /::|[?.:,;()[\]{}]/
    };
  }
  return aql_1;
}
var c_1;
var hasRequiredC;
function requireC() {
  if (hasRequiredC) return c_1;
  hasRequiredC = 1;
  c_1 = c;
  c.displayName = "c";
  c.aliases = [];
  function c(Prism2) {
    Prism2.languages.c = Prism2.languages.extend("clike", {
      comment: {
        pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
        greedy: true
      },
      string: {
        // https://en.cppreference.com/w/c/language/string_literal
        pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
        greedy: true
      },
      "class-name": {
        pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
        lookbehind: true
      },
      keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
      function: /\b[a-z_]\w*(?=\s*\()/i,
      number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
      operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
    });
    Prism2.languages.insertBefore("c", "string", {
      char: {
        // https://en.cppreference.com/w/c/language/character_constant
        pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,
        greedy: true
      }
    });
    Prism2.languages.insertBefore("c", "string", {
      macro: {
        // allow for multiline macro definitions
        // spaces after the # character compile fine with gcc
        pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
        lookbehind: true,
        greedy: true,
        alias: "property",
        inside: {
          string: [
            {
              // highlight the path of the include statement as a string
              pattern: /^(#\s*include\s*)<[^>]+>/,
              lookbehind: true
            },
            Prism2.languages.c["string"]
          ],
          char: Prism2.languages.c["char"],
          comment: Prism2.languages.c["comment"],
          "macro-name": [
            {
              pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
              lookbehind: true
            },
            {
              pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
              lookbehind: true,
              alias: "function"
            }
          ],
          // highlight macro directives as keywords
          directive: {
            pattern: /^(#\s*)[a-z]+/,
            lookbehind: true,
            alias: "keyword"
          },
          "directive-hash": /^#/,
          punctuation: /##|\\(?=[\r\n])/,
          expression: {
            pattern: /\S[\s\S]*/,
            inside: Prism2.languages.c
          }
        }
      }
    });
    Prism2.languages.insertBefore("c", "function", {
      // highlight predefined macros as constants
      constant: /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/
    });
    delete Prism2.languages.c["boolean"];
  }
  return c_1;
}
var cpp_1;
var hasRequiredCpp;
function requireCpp() {
  if (hasRequiredCpp) return cpp_1;
  hasRequiredCpp = 1;
  var refractorC = requireC();
  cpp_1 = cpp;
  cpp.displayName = "cpp";
  cpp.aliases = [];
  function cpp(Prism2) {
    Prism2.register(refractorC);
    (function(Prism3) {
      var keyword = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/;
      var modName = /\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(
        /<keyword>/g,
        function() {
          return keyword.source;
        }
      );
      Prism3.languages.cpp = Prism3.languages.extend("c", {
        "class-name": [
          {
            pattern: RegExp(
              /(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source.replace(
                /<keyword>/g,
                function() {
                  return keyword.source;
                }
              )
            ),
            lookbehind: true
          },
          // This is intended to capture the class name of method implementations like:
          //   void foo::bar() const {}
          // However! The `foo` in the above example could also be a namespace, so we only capture the class name if
          // it starts with an uppercase letter. This approximation should give decent results.
          /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
          // This will capture the class name before destructors like:
          //   Foo::~Foo() {}
          /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
          // This also intends to capture the class name of method implementations but here the class has template
          // parameters, so it can't be a namespace (until C++ adds generic namespaces).
          /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/
        ],
        keyword,
        number: {
          pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
          greedy: true
        },
        operator: />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
        boolean: /\b(?:false|true)\b/
      });
      Prism3.languages.insertBefore("cpp", "string", {
        module: {
          // https://en.cppreference.com/w/cpp/language/modules
          pattern: RegExp(
            /(\b(?:import|module)\s+)/.source + "(?:" + // header-name
            /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|<[^<>\r\n]*>/.source + "|" + // module name or partition or both
            /<mod-name>(?:\s*:\s*<mod-name>)?|:\s*<mod-name>/.source.replace(
              /<mod-name>/g,
              function() {
                return modName;
              }
            ) + ")"
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            string: /^[<"][\s\S]+/,
            operator: /:/,
            punctuation: /\./
          }
        },
        "raw-string": {
          pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
          alias: "string",
          greedy: true
        }
      });
      Prism3.languages.insertBefore("cpp", "keyword", {
        "generic-function": {
          pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
          inside: {
            function: /^\w+/,
            generic: {
              pattern: /<[\s\S]+/,
              alias: "class-name",
              inside: Prism3.languages.cpp
            }
          }
        }
      });
      Prism3.languages.insertBefore("cpp", "operator", {
        "double-colon": {
          pattern: /::/,
          alias: "punctuation"
        }
      });
      Prism3.languages.insertBefore("cpp", "class-name", {
        // the base clause is an optional list of parent classes
        // https://en.cppreference.com/w/cpp/language/class
        "base-clause": {
          pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
          lookbehind: true,
          greedy: true,
          inside: Prism3.languages.extend("cpp", {})
        }
      });
      Prism3.languages.insertBefore(
        "inside",
        "double-colon",
        {
          // All untokenized words that are not namespaces should be class names
          "class-name": /\b[a-z_]\w*\b(?!\s*::)/i
        },
        Prism3.languages.cpp["base-clause"]
      );
    })(Prism2);
  }
  return cpp_1;
}
var arduino_1;
var hasRequiredArduino;
function requireArduino() {
  if (hasRequiredArduino) return arduino_1;
  hasRequiredArduino = 1;
  var refractorCpp = requireCpp();
  arduino_1 = arduino;
  arduino.displayName = "arduino";
  arduino.aliases = ["ino"];
  function arduino(Prism2) {
    Prism2.register(refractorCpp);
    Prism2.languages.arduino = Prism2.languages.extend("cpp", {
      keyword: /\b(?:String|array|bool|boolean|break|byte|case|catch|continue|default|do|double|else|finally|for|function|goto|if|in|instanceof|int|integer|long|loop|new|null|return|setup|string|switch|throw|try|void|while|word)\b/,
      constant: /\b(?:ANALOG_MESSAGE|DEFAULT|DIGITAL_MESSAGE|EXTERNAL|FIRMATA_STRING|HIGH|INPUT|INPUT_PULLUP|INTERNAL|INTERNAL1V1|INTERNAL2V56|LED_BUILTIN|LOW|OUTPUT|REPORT_ANALOG|REPORT_DIGITAL|SET_PIN_MODE|SYSEX_START|SYSTEM_RESET)\b/,
      builtin: /\b(?:Audio|BSSID|Bridge|Client|Console|EEPROM|Esplora|EsploraTFT|Ethernet|EthernetClient|EthernetServer|EthernetUDP|File|FileIO|FileSystem|Firmata|GPRS|GSM|GSMBand|GSMClient|GSMModem|GSMPIN|GSMScanner|GSMServer|GSMVoiceCall|GSM_SMS|HttpClient|IPAddress|IRread|Keyboard|KeyboardController|LiquidCrystal|LiquidCrystal_I2C|Mailbox|Mouse|MouseController|PImage|Process|RSSI|RobotControl|RobotMotor|SD|SPI|SSID|Scheduler|Serial|Server|Servo|SoftwareSerial|Stepper|Stream|TFT|Task|USBHost|WiFi|WiFiClient|WiFiServer|WiFiUDP|Wire|YunClient|YunServer|abs|addParameter|analogRead|analogReadResolution|analogReference|analogWrite|analogWriteResolution|answerCall|attach|attachGPRS|attachInterrupt|attached|autoscroll|available|background|beep|begin|beginPacket|beginSD|beginSMS|beginSpeaker|beginTFT|beginTransmission|beginWrite|bit|bitClear|bitRead|bitSet|bitWrite|blink|blinkVersion|buffer|changePIN|checkPIN|checkPUK|checkReg|circle|cityNameRead|cityNameWrite|clear|clearScreen|click|close|compassRead|config|connect|connected|constrain|cos|countryNameRead|countryNameWrite|createChar|cursor|debugPrint|delay|delayMicroseconds|detach|detachInterrupt|digitalRead|digitalWrite|disconnect|display|displayLogos|drawBMP|drawCompass|encryptionType|end|endPacket|endSMS|endTransmission|endWrite|exists|exitValue|fill|find|findUntil|flush|gatewayIP|get|getAsynchronously|getBand|getButton|getCurrentCarrier|getIMEI|getKey|getModifiers|getOemKey|getPINUsed|getResult|getSignalStrength|getSocket|getVoiceCallStatus|getXChange|getYChange|hangCall|height|highByte|home|image|interrupts|isActionDone|isDirectory|isListening|isPIN|isPressed|isValid|keyPressed|keyReleased|keyboardRead|knobRead|leftToRight|line|lineFollowConfig|listen|listenOnLocalhost|loadImage|localIP|lowByte|macAddress|maintain|map|max|messageAvailable|micros|millis|min|mkdir|motorsStop|motorsWrite|mouseDragged|mouseMoved|mousePressed|mouseReleased|move|noAutoscroll|noBlink|noBuffer|noCursor|noDisplay|noFill|noInterrupts|noListenOnLocalhost|noStroke|noTone|onReceive|onRequest|open|openNextFile|overflow|parseCommand|parseFloat|parseInt|parsePacket|pauseMode|peek|pinMode|playFile|playMelody|point|pointTo|position|pow|prepare|press|print|printFirmwareVersion|printVersion|println|process|processInput|pulseIn|put|random|randomSeed|read|readAccelerometer|readBlue|readButton|readBytes|readBytesUntil|readGreen|readJoystickButton|readJoystickSwitch|readJoystickX|readJoystickY|readLightSensor|readMessage|readMicrophone|readNetworks|readRed|readSlider|readString|readStringUntil|readTemperature|ready|rect|release|releaseAll|remoteIP|remoteNumber|remotePort|remove|requestFrom|retrieveCallingNumber|rewindDirectory|rightToLeft|rmdir|robotNameRead|robotNameWrite|run|runAsynchronously|runShellCommand|runShellCommandAsynchronously|running|scanNetworks|scrollDisplayLeft|scrollDisplayRight|seek|sendAnalog|sendDigitalPortPair|sendDigitalPorts|sendString|sendSysex|serialEvent|setBand|setBitOrder|setClockDivider|setCursor|setDNS|setDataMode|setFirmwareVersion|setMode|setPINUsed|setSpeed|setTextSize|setTimeout|shiftIn|shiftOut|shutdown|sin|size|sqrt|startLoop|step|stop|stroke|subnetMask|switchPIN|tan|tempoWrite|text|tone|transfer|tuneWrite|turn|updateIR|userNameRead|userNameWrite|voiceCall|waitContinue|width|write|writeBlue|writeGreen|writeJSON|writeMessage|writeMicroseconds|writeRGB|writeRed|yield)\b/
    });
    Prism2.languages.ino = Prism2.languages.arduino;
  }
  return arduino_1;
}
var arff_1;
var hasRequiredArff;
function requireArff() {
  if (hasRequiredArff) return arff_1;
  hasRequiredArff = 1;
  arff_1 = arff;
  arff.displayName = "arff";
  arff.aliases = [];
  function arff(Prism2) {
    Prism2.languages.arff = {
      comment: /%.*/,
      string: {
        pattern: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      keyword: /@(?:attribute|data|end|relation)\b/i,
      number: /\b\d+(?:\.\d+)?\b/,
      punctuation: /[{},]/
    };
  }
  return arff_1;
}
var asciidoc_1;
var hasRequiredAsciidoc;
function requireAsciidoc() {
  if (hasRequiredAsciidoc) return asciidoc_1;
  hasRequiredAsciidoc = 1;
  asciidoc_1 = asciidoc;
  asciidoc.displayName = "asciidoc";
  asciidoc.aliases = ["adoc"];
  function asciidoc(Prism2) {
    (function(Prism3) {
      var attributes2 = {
        pattern: /(^[ \t]*)\[(?!\[)(?:(["'$`])(?:(?!\2)[^\\]|\\.)*\2|\[(?:[^\[\]\\]|\\.)*\]|[^\[\]\\"'$`]|\\.)*\]/m,
        lookbehind: true,
        inside: {
          quoted: {
            pattern: /([$`])(?:(?!\1)[^\\]|\\.)*\1/,
            inside: {
              punctuation: /^[$`]|[$`]$/
            }
          },
          interpreted: {
            pattern: /'(?:[^'\\]|\\.)*'/,
            inside: {
              punctuation: /^'|'$/
              // See rest below
            }
          },
          string: /"(?:[^"\\]|\\.)*"/,
          variable: /\w+(?==)/,
          punctuation: /^\[|\]$|,/,
          operator: /=/,
          // The negative look-ahead prevents blank matches
          "attr-value": /(?!^\s+$).+/
        }
      };
      var asciidoc2 = Prism3.languages.asciidoc = {
        "comment-block": {
          pattern: /^(\/{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1/m,
          alias: "comment"
        },
        table: {
          pattern: /^\|={3,}(?:(?:\r?\n|\r(?!\n)).*)*?(?:\r?\n|\r)\|={3,}$/m,
          inside: {
            specifiers: {
              pattern: /(?:(?:(?:\d+(?:\.\d+)?|\.\d+)[+*](?:[<^>](?:\.[<^>])?|\.[<^>])?|[<^>](?:\.[<^>])?|\.[<^>])[a-z]*|[a-z]+)(?=\|)/,
              alias: "attr-value"
            },
            punctuation: {
              pattern: /(^|[^\\])[|!]=*/,
              lookbehind: true
            }
            // See rest below
          }
        },
        "passthrough-block": {
          pattern: /^(\+{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
          inside: {
            punctuation: /^\++|\++$/
            // See rest below
          }
        },
        // Literal blocks and listing blocks
        "literal-block": {
          pattern: /^(-{4,}|\.{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
          inside: {
            punctuation: /^(?:-+|\.+)|(?:-+|\.+)$/
            // See rest below
          }
        },
        // Sidebar blocks, quote blocks, example blocks and open blocks
        "other-block": {
          pattern: /^(--|\*{4,}|_{4,}|={4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
          inside: {
            punctuation: /^(?:-+|\*+|_+|=+)|(?:-+|\*+|_+|=+)$/
            // See rest below
          }
        },
        // list-punctuation and list-label must appear before indented-block
        "list-punctuation": {
          pattern: /(^[ \t]*)(?:-|\*{1,5}|\.{1,5}|(?:[a-z]|\d+)\.|[xvi]+\))(?= )/im,
          lookbehind: true,
          alias: "punctuation"
        },
        "list-label": {
          pattern: /(^[ \t]*)[a-z\d].+(?::{2,4}|;;)(?=\s)/im,
          lookbehind: true,
          alias: "symbol"
        },
        "indented-block": {
          pattern: /((\r?\n|\r)\2)([ \t]+)\S.*(?:(?:\r?\n|\r)\3.+)*(?=\2{2}|$)/,
          lookbehind: true
        },
        comment: /^\/\/.*/m,
        title: {
          pattern: /^.+(?:\r?\n|\r)(?:={3,}|-{3,}|~{3,}|\^{3,}|\+{3,})$|^={1,5} .+|^\.(?![\s.]).*/m,
          alias: "important",
          inside: {
            punctuation: /^(?:\.|=+)|(?:=+|-+|~+|\^+|\++)$/
            // See rest below
          }
        },
        "attribute-entry": {
          pattern: /^:[^:\r\n]+:(?: .*?(?: \+(?:\r?\n|\r).*?)*)?$/m,
          alias: "tag"
        },
        attributes: attributes2,
        hr: {
          pattern: /^'{3,}$/m,
          alias: "punctuation"
        },
        "page-break": {
          pattern: /^<{3,}$/m,
          alias: "punctuation"
        },
        admonition: {
          pattern: /^(?:CAUTION|IMPORTANT|NOTE|TIP|WARNING):/m,
          alias: "keyword"
        },
        callout: [
          {
            pattern: /(^[ \t]*)<?\d*>/m,
            lookbehind: true,
            alias: "symbol"
          },
          {
            pattern: /<\d+>/,
            alias: "symbol"
          }
        ],
        macro: {
          pattern: /\b[a-z\d][a-z\d-]*::?(?:[^\s\[\]]*\[(?:[^\]\\"']|(["'])(?:(?!\1)[^\\]|\\.)*\1|\\.)*\])/,
          inside: {
            function: /^[a-z\d-]+(?=:)/,
            punctuation: /^::?/,
            attributes: {
              pattern: /(?:\[(?:[^\]\\"']|(["'])(?:(?!\1)[^\\]|\\.)*\1|\\.)*\])/,
              inside: attributes2.inside
            }
          }
        },
        inline: {
          /*
          The initial look-behind prevents the highlighting of escaped quoted text.
          Quoted text can be multi-line but cannot span an empty line.
          All quoted text can have attributes before [foobar, 'foobar', baz="bar"].
          First, we handle the constrained quotes.
          Those must be bounded by non-word chars and cannot have spaces between the delimiter and the first char.
          They are, in order: _emphasis_, ``double quotes'', `single quotes', `monospace`, 'emphasis', *strong*, +monospace+ and #unquoted#
          Then we handle the unconstrained quotes.
          Those do not have the restrictions of the constrained quotes.
          They are, in order: __emphasis__, **strong**, ++monospace++, +++passthrough+++, ##unquoted##, $$passthrough$$, ~subscript~, ^superscript^, {attribute-reference}, [[anchor]], [[[bibliography anchor]]], <<xref>>, (((indexes))) and ((indexes))
          */
          pattern: /(^|[^\\])(?:(?:\B\[(?:[^\]\\"']|(["'])(?:(?!\2)[^\\]|\\.)*\2|\\.)*\])?(?:\b_(?!\s)(?: _|[^_\\\r\n]|\\.)+(?:(?:\r?\n|\r)(?: _|[^_\\\r\n]|\\.)+)*_\b|\B``(?!\s).+?(?:(?:\r?\n|\r).+?)*''\B|\B`(?!\s)(?:[^`'\s]|\s+\S)+['`]\B|\B(['*+#])(?!\s)(?: \3|(?!\3)[^\\\r\n]|\\.)+(?:(?:\r?\n|\r)(?: \3|(?!\3)[^\\\r\n]|\\.)+)*\3\B)|(?:\[(?:[^\]\\"']|(["'])(?:(?!\4)[^\\]|\\.)*\4|\\.)*\])?(?:(__|\*\*|\+\+\+?|##|\$\$|[~^]).+?(?:(?:\r?\n|\r).+?)*\5|\{[^}\r\n]+\}|\[\[\[?.+?(?:(?:\r?\n|\r).+?)*\]?\]\]|<<.+?(?:(?:\r?\n|\r).+?)*>>|\(\(\(?.+?(?:(?:\r?\n|\r).+?)*\)?\)\)))/m,
          lookbehind: true,
          inside: {
            attributes: attributes2,
            url: {
              pattern: /^(?:\[\[\[?.+?\]?\]\]|<<.+?>>)$/,
              inside: {
                punctuation: /^(?:\[\[\[?|<<)|(?:\]\]\]?|>>)$/
              }
            },
            "attribute-ref": {
              pattern: /^\{.+\}$/,
              inside: {
                variable: {
                  pattern: /(^\{)[a-z\d,+_-]+/,
                  lookbehind: true
                },
                operator: /^[=?!#%@$]|!(?=[:}])/,
                punctuation: /^\{|\}$|::?/
              }
            },
            italic: {
              pattern: /^(['_])[\s\S]+\1$/,
              inside: {
                punctuation: /^(?:''?|__?)|(?:''?|__?)$/
              }
            },
            bold: {
              pattern: /^\*[\s\S]+\*$/,
              inside: {
                punctuation: /^\*\*?|\*\*?$/
              }
            },
            punctuation: /^(?:``?|\+{1,3}|##?|\$\$|[~^]|\(\(\(?)|(?:''?|\+{1,3}|##?|\$\$|[~^`]|\)?\)\))$/
          }
        },
        replacement: {
          pattern: /\((?:C|R|TM)\)/,
          alias: "builtin"
        },
        entity: /&#?[\da-z]{1,8};/i,
        "line-continuation": {
          pattern: /(^| )\+$/m,
          lookbehind: true,
          alias: "punctuation"
        }
      };
      function copyFromAsciiDoc(keys) {
        keys = keys.split(" ");
        var o = {};
        for (var i = 0, l = keys.length; i < l; i++) {
          o[keys[i]] = asciidoc2[keys[i]];
        }
        return o;
      }
      attributes2.inside["interpreted"].inside.rest = copyFromAsciiDoc(
        "macro inline replacement entity"
      );
      asciidoc2["passthrough-block"].inside.rest = copyFromAsciiDoc("macro");
      asciidoc2["literal-block"].inside.rest = copyFromAsciiDoc("callout");
      asciidoc2["table"].inside.rest = copyFromAsciiDoc(
        "comment-block passthrough-block literal-block other-block list-punctuation indented-block comment title attribute-entry attributes hr page-break admonition list-label callout macro inline replacement entity line-continuation"
      );
      asciidoc2["other-block"].inside.rest = copyFromAsciiDoc(
        "table list-punctuation indented-block comment attribute-entry attributes hr page-break admonition list-label macro inline replacement entity line-continuation"
      );
      asciidoc2["title"].inside.rest = copyFromAsciiDoc(
        "macro inline replacement entity"
      );
      Prism3.hooks.add("wrap", function(env) {
        if (env.type === "entity") {
          env.attributes["title"] = env.content.value.replace(/&amp;/, "&");
        }
      });
      Prism3.languages.adoc = Prism3.languages.asciidoc;
    })(Prism2);
  }
  return asciidoc_1;
}
var asm6502_1;
var hasRequiredAsm6502;
function requireAsm6502() {
  if (hasRequiredAsm6502) return asm6502_1;
  hasRequiredAsm6502 = 1;
  asm6502_1 = asm6502;
  asm6502.displayName = "asm6502";
  asm6502.aliases = [];
  function asm6502(Prism2) {
    Prism2.languages.asm6502 = {
      comment: /;.*/,
      directive: {
        pattern: /\.\w+(?= )/,
        alias: "property"
      },
      string: /(["'`])(?:\\.|(?!\1)[^\\\r\n])*\1/,
      "op-code": {
        pattern: /\b(?:ADC|AND|ASL|BCC|BCS|BEQ|BIT|BMI|BNE|BPL|BRK|BVC|BVS|CLC|CLD|CLI|CLV|CMP|CPX|CPY|DEC|DEX|DEY|EOR|INC|INX|INY|JMP|JSR|LDA|LDX|LDY|LSR|NOP|ORA|PHA|PHP|PLA|PLP|ROL|ROR|RTI|RTS|SBC|SEC|SED|SEI|STA|STX|STY|TAX|TAY|TSX|TXA|TXS|TYA|adc|and|asl|bcc|bcs|beq|bit|bmi|bne|bpl|brk|bvc|bvs|clc|cld|cli|clv|cmp|cpx|cpy|dec|dex|dey|eor|inc|inx|iny|jmp|jsr|lda|ldx|ldy|lsr|nop|ora|pha|php|pla|plp|rol|ror|rti|rts|sbc|sec|sed|sei|sta|stx|sty|tax|tay|tsx|txa|txs|tya)\b/,
        alias: "keyword"
      },
      "hex-number": {
        pattern: /#?\$[\da-f]{1,4}\b/i,
        alias: "number"
      },
      "binary-number": {
        pattern: /#?%[01]+\b/,
        alias: "number"
      },
      "decimal-number": {
        pattern: /#?\b\d+\b/,
        alias: "number"
      },
      register: {
        pattern: /\b[xya]\b/i,
        alias: "variable"
      },
      punctuation: /[(),:]/
    };
  }
  return asm6502_1;
}
var asmatmel_1;
var hasRequiredAsmatmel;
function requireAsmatmel() {
  if (hasRequiredAsmatmel) return asmatmel_1;
  hasRequiredAsmatmel = 1;
  asmatmel_1 = asmatmel;
  asmatmel.displayName = "asmatmel";
  asmatmel.aliases = [];
  function asmatmel(Prism2) {
    Prism2.languages.asmatmel = {
      comment: {
        pattern: /;.*/,
        greedy: true
      },
      string: {
        pattern: /(["'`])(?:\\.|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      constant: /\b(?:PORT[A-Z]|DDR[A-Z]|(?:DD|P)[A-Z](?:\d|[0-2]\d|3[01]))\b/,
      directive: {
        pattern: /\.\w+(?= )/,
        alias: "property"
      },
      "r-register": {
        pattern: /\br(?:\d|[12]\d|3[01])\b/,
        alias: "variable"
      },
      "op-code": {
        pattern: /\b(?:ADC|ADD|ADIW|AND|ANDI|ASR|BCLR|BLD|BRBC|BRBS|BRCC|BRCS|BREAK|BREQ|BRGE|BRHC|BRHS|BRID|BRIE|BRLO|BRLT|BRMI|BRNE|BRPL|BRSH|BRTC|BRTS|BRVC|BRVS|BSET|BST|CALL|CBI|CBR|CLC|CLH|CLI|CLN|CLR|CLS|CLT|CLV|CLZ|COM|CP|CPC|CPI|CPSE|DEC|DES|EICALL|EIJMP|ELPM|EOR|FMUL|FMULS|FMULSU|ICALL|IJMP|IN|INC|JMP|LAC|LAS|LAT|LD|LD[A-Za-z0-9]|LPM|LSL|LSR|MOV|MOVW|MUL|MULS|MULSU|NEG|NOP|OR|ORI|OUT|POP|PUSH|RCALL|RET|RETI|RJMP|ROL|ROR|SBC|SBCI|SBI|SBIC|SBIS|SBIW|SBR|SBRC|SBRS|SEC|SEH|SEI|SEN|SER|SES|SET|SEV|SEZ|SLEEP|SPM|ST|ST[A-Z0-9]|SUB|SUBI|SWAP|TST|WDR|XCH|adc|add|adiw|and|andi|asr|bclr|bld|brbc|brbs|brcc|brcs|break|breq|brge|brhc|brhs|brid|brie|brlo|brlt|brmi|brne|brpl|brsh|brtc|brts|brvc|brvs|bset|bst|call|cbi|cbr|clc|clh|cli|cln|clr|cls|clt|clv|clz|com|cp|cpc|cpi|cpse|dec|des|eicall|eijmp|elpm|eor|fmul|fmuls|fmulsu|icall|ijmp|in|inc|jmp|lac|las|lat|ld|ld[a-z0-9]|lpm|lsl|lsr|mov|movw|mul|muls|mulsu|neg|nop|or|ori|out|pop|push|rcall|ret|reti|rjmp|rol|ror|sbc|sbci|sbi|sbic|sbis|sbiw|sbr|sbrc|sbrs|sec|seh|sei|sen|ser|ses|set|sev|sez|sleep|spm|st|st[a-zA-Z0-9]|sub|subi|swap|tst|wdr|xch)\b/,
        alias: "keyword"
      },
      "hex-number": {
        pattern: /#?\$[\da-f]{2,4}\b/i,
        alias: "number"
      },
      "binary-number": {
        pattern: /#?%[01]+\b/,
        alias: "number"
      },
      "decimal-number": {
        pattern: /#?\b\d+\b/,
        alias: "number"
      },
      register: {
        pattern: /\b[acznvshtixy]\b/i,
        alias: "variable"
      },
      operator: />>=?|<<=?|&&?|\|\|?|[-+*/%&|^!=<>?]=?/,
      punctuation: /[(),:]/
    };
  }
  return asmatmel_1;
}
var csharp_1;
var hasRequiredCsharp;
function requireCsharp() {
  if (hasRequiredCsharp) return csharp_1;
  hasRequiredCsharp = 1;
  csharp_1 = csharp;
  csharp.displayName = "csharp";
  csharp.aliases = ["dotnet", "cs"];
  function csharp(Prism2) {
    (function(Prism3) {
      function replace(pattern, replacements) {
        return pattern.replace(/<<(\d+)>>/g, function(m, index) {
          return "(?:" + replacements[+index] + ")";
        });
      }
      function re(pattern, replacements, flags) {
        return RegExp(replace(pattern, replacements), "");
      }
      function nested(pattern, depthLog2) {
        for (var i = 0; i < depthLog2; i++) {
          pattern = pattern.replace(/<<self>>/g, function() {
            return "(?:" + pattern + ")";
          });
        }
        return pattern.replace(/<<self>>/g, "[^\\s\\S]");
      }
      var keywordKinds = {
        // keywords which represent a return or variable type
        type: "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void",
        // keywords which are used to declare a type
        typeDeclaration: "class enum interface record struct",
        // contextual keywords
        // ("var" and "dynamic" are missing because they are used like types)
        contextual: "add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)",
        // all other keywords
        other: "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield"
      };
      function keywordsToPattern(words) {
        return "\\b(?:" + words.trim().replace(/ /g, "|") + ")\\b";
      }
      var typeDeclarationKeywords = keywordsToPattern(
        keywordKinds.typeDeclaration
      );
      var keywords = RegExp(
        keywordsToPattern(
          keywordKinds.type + " " + keywordKinds.typeDeclaration + " " + keywordKinds.contextual + " " + keywordKinds.other
        )
      );
      var nonTypeKeywords = keywordsToPattern(
        keywordKinds.typeDeclaration + " " + keywordKinds.contextual + " " + keywordKinds.other
      );
      var nonContextualKeywords = keywordsToPattern(
        keywordKinds.type + " " + keywordKinds.typeDeclaration + " " + keywordKinds.other
      );
      var generic = nested(/<(?:[^<>;=+\-*/%&|^]|<<self>>)*>/.source, 2);
      var nestedRound = nested(/\((?:[^()]|<<self>>)*\)/.source, 2);
      var name = /@?\b[A-Za-z_]\w*\b/.source;
      var genericName = replace(/<<0>>(?:\s*<<1>>)?/.source, [name, generic]);
      var identifier = replace(/(?!<<0>>)<<1>>(?:\s*\.\s*<<1>>)*/.source, [
        nonTypeKeywords,
        genericName
      ]);
      var array = /\[\s*(?:,\s*)*\]/.source;
      var typeExpressionWithoutTuple = replace(
        /<<0>>(?:\s*(?:\?\s*)?<<1>>)*(?:\s*\?)?/.source,
        [identifier, array]
      );
      var tupleElement = replace(
        /[^,()<>[\];=+\-*/%&|^]|<<0>>|<<1>>|<<2>>/.source,
        [generic, nestedRound, array]
      );
      var tuple = replace(/\(<<0>>+(?:,<<0>>+)+\)/.source, [tupleElement]);
      var typeExpression = replace(
        /(?:<<0>>|<<1>>)(?:\s*(?:\?\s*)?<<2>>)*(?:\s*\?)?/.source,
        [tuple, identifier, array]
      );
      var typeInside = {
        keyword: keywords,
        punctuation: /[<>()?,.:[\]]/
      };
      var character = /'(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'/.source;
      var regularString = /"(?:\\.|[^\\"\r\n])*"/.source;
      var verbatimString = /@"(?:""|\\[\s\S]|[^\\"])*"(?!")/.source;
      Prism3.languages.csharp = Prism3.languages.extend("clike", {
        string: [
          {
            pattern: re(/(^|[^$\\])<<0>>/.source, [verbatimString]),
            lookbehind: true,
            greedy: true
          },
          {
            pattern: re(/(^|[^@$\\])<<0>>/.source, [regularString]),
            lookbehind: true,
            greedy: true
          }
        ],
        "class-name": [
          {
            // Using static
            // using static System.Math;
            pattern: re(/(\busing\s+static\s+)<<0>>(?=\s*;)/.source, [
              identifier
            ]),
            lookbehind: true,
            inside: typeInside
          },
          {
            // Using alias (type)
            // using Project = PC.MyCompany.Project;
            pattern: re(/(\busing\s+<<0>>\s*=\s*)<<1>>(?=\s*;)/.source, [
              name,
              typeExpression
            ]),
            lookbehind: true,
            inside: typeInside
          },
          {
            // Using alias (alias)
            // using Project = PC.MyCompany.Project;
            pattern: re(/(\busing\s+)<<0>>(?=\s*=)/.source, [name]),
            lookbehind: true
          },
          {
            // Type declarations
            // class Foo<A, B>
            // interface Foo<out A, B>
            pattern: re(/(\b<<0>>\s+)<<1>>/.source, [
              typeDeclarationKeywords,
              genericName
            ]),
            lookbehind: true,
            inside: typeInside
          },
          {
            // Single catch exception declaration
            // catch(Foo)
            // (things like catch(Foo e) is covered by variable declaration)
            pattern: re(/(\bcatch\s*\(\s*)<<0>>/.source, [identifier]),
            lookbehind: true,
            inside: typeInside
          },
          {
            // Name of the type parameter of generic constraints
            // where Foo : class
            pattern: re(/(\bwhere\s+)<<0>>/.source, [name]),
            lookbehind: true
          },
          {
            // Casts and checks via as and is.
            // as Foo<A>, is Bar<B>
            // (things like if(a is Foo b) is covered by variable declaration)
            pattern: re(/(\b(?:is(?:\s+not)?|as)\s+)<<0>>/.source, [
              typeExpressionWithoutTuple
            ]),
            lookbehind: true,
            inside: typeInside
          },
          {
            // Variable, field and parameter declaration
            // (Foo bar, Bar baz, Foo[,,] bay, Foo<Bar, FooBar<Bar>> bax)
            pattern: re(
              /\b<<0>>(?=\s+(?!<<1>>|with\s*\{)<<2>>(?:\s*[=,;:{)\]]|\s+(?:in|when)\b))/.source,
              [typeExpression, nonContextualKeywords, name]
            ),
            inside: typeInside
          }
        ],
        keyword: keywords,
        // https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/lexical-structure#literals
        number: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
        operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
        punctuation: /\?\.?|::|[{}[\];(),.:]/
      });
      Prism3.languages.insertBefore("csharp", "number", {
        range: {
          pattern: /\.\./,
          alias: "operator"
        }
      });
      Prism3.languages.insertBefore("csharp", "punctuation", {
        "named-parameter": {
          pattern: re(/([(,]\s*)<<0>>(?=\s*:)/.source, [name]),
          lookbehind: true,
          alias: "punctuation"
        }
      });
      Prism3.languages.insertBefore("csharp", "class-name", {
        namespace: {
          // namespace Foo.Bar {}
          // using Foo.Bar;
          pattern: re(
            /(\b(?:namespace|using)\s+)<<0>>(?:\s*\.\s*<<0>>)*(?=\s*[;{])/.source,
            [name]
          ),
          lookbehind: true,
          inside: {
            punctuation: /\./
          }
        },
        "type-expression": {
          // default(Foo), typeof(Foo<Bar>), sizeof(int)
          pattern: re(
            /(\b(?:default|sizeof|typeof)\s*\(\s*(?!\s))(?:[^()\s]|\s(?!\s)|<<0>>)*(?=\s*\))/.source,
            [nestedRound]
          ),
          lookbehind: true,
          alias: "class-name",
          inside: typeInside
        },
        "return-type": {
          // Foo<Bar> ForBar(); Foo IFoo.Bar() => 0
          // int this[int index] => 0; T IReadOnlyList<T>.this[int index] => this[index];
          // int Foo => 0; int Foo { get; set } = 0;
          pattern: re(
            /<<0>>(?=\s+(?:<<1>>\s*(?:=>|[({]|\.\s*this\s*\[)|this\s*\[))/.source,
            [typeExpression, identifier]
          ),
          inside: typeInside,
          alias: "class-name"
        },
        "constructor-invocation": {
          // new List<Foo<Bar[]>> { }
          pattern: re(/(\bnew\s+)<<0>>(?=\s*[[({])/.source, [typeExpression]),
          lookbehind: true,
          inside: typeInside,
          alias: "class-name"
        },
        /*'explicit-implementation': {
        // int IFoo<Foo>.Bar => 0; void IFoo<Foo<Foo>>.Foo<T>();
        pattern: replace(/\b<<0>>(?=\.<<1>>)/, className, methodOrPropertyDeclaration),
        inside: classNameInside,
        alias: 'class-name'
        },*/
        "generic-method": {
          // foo<Bar>()
          pattern: re(/<<0>>\s*<<1>>(?=\s*\()/.source, [name, generic]),
          inside: {
            function: re(/^<<0>>/.source, [name]),
            generic: {
              pattern: RegExp(generic),
              alias: "class-name",
              inside: typeInside
            }
          }
        },
        "type-list": {
          // The list of types inherited or of generic constraints
          // class Foo<F> : Bar, IList<FooBar>
          // where F : Bar, IList<int>
          pattern: re(
            /\b((?:<<0>>\s+<<1>>|record\s+<<1>>\s*<<5>>|where\s+<<2>>)\s*:\s*)(?:<<3>>|<<4>>|<<1>>\s*<<5>>|<<6>>)(?:\s*,\s*(?:<<3>>|<<4>>|<<6>>))*(?=\s*(?:where|[{;]|=>|$))/.source,
            [
              typeDeclarationKeywords,
              genericName,
              name,
              typeExpression,
              keywords.source,
              nestedRound,
              /\bnew\s*\(\s*\)/.source
            ]
          ),
          lookbehind: true,
          inside: {
            "record-arguments": {
              pattern: re(/(^(?!new\s*\()<<0>>\s*)<<1>>/.source, [
                genericName,
                nestedRound
              ]),
              lookbehind: true,
              greedy: true,
              inside: Prism3.languages.csharp
            },
            keyword: keywords,
            "class-name": {
              pattern: RegExp(typeExpression),
              greedy: true,
              inside: typeInside
            },
            punctuation: /[,()]/
          }
        },
        preprocessor: {
          pattern: /(^[\t ]*)#.*/m,
          lookbehind: true,
          alias: "property",
          inside: {
            // highlight preprocessor directives as keywords
            directive: {
              pattern: /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
              lookbehind: true,
              alias: "keyword"
            }
          }
        }
      });
      var regularStringOrCharacter = regularString + "|" + character;
      var regularStringCharacterOrComment = replace(
        /\/(?![*/])|\/\/[^\r\n]*[\r\n]|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>/.source,
        [regularStringOrCharacter]
      );
      var roundExpression = nested(
        replace(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [
          regularStringCharacterOrComment
        ]),
        2
      );
      var attrTarget = /\b(?:assembly|event|field|method|module|param|property|return|type)\b/.source;
      var attr = replace(/<<0>>(?:\s*\(<<1>>*\))?/.source, [
        identifier,
        roundExpression
      ]);
      Prism3.languages.insertBefore("csharp", "class-name", {
        attribute: {
          // Attributes
          // [Foo], [Foo(1), Bar(2, Prop = "foo")], [return: Foo(1), Bar(2)], [assembly: Foo(Bar)]
          pattern: re(
            /((?:^|[^\s\w>)?])\s*\[\s*)(?:<<0>>\s*:\s*)?<<1>>(?:\s*,\s*<<1>>)*(?=\s*\])/.source,
            [attrTarget, attr]
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            target: {
              pattern: re(/^<<0>>(?=\s*:)/.source, [attrTarget]),
              alias: "keyword"
            },
            "attribute-arguments": {
              pattern: re(/\(<<0>>*\)/.source, [roundExpression]),
              inside: Prism3.languages.csharp
            },
            "class-name": {
              pattern: RegExp(identifier),
              inside: {
                punctuation: /\./
              }
            },
            punctuation: /[:,]/
          }
        }
      });
      var formatString = /:[^}\r\n]+/.source;
      var mInterpolationRound = nested(
        replace(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [
          regularStringCharacterOrComment
        ]),
        2
      );
      var mInterpolation = replace(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [
        mInterpolationRound,
        formatString
      ]);
      var sInterpolationRound = nested(
        replace(
          /[^"'/()]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>|\(<<self>>*\)/.source,
          [regularStringOrCharacter]
        ),
        2
      );
      var sInterpolation = replace(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [
        sInterpolationRound,
        formatString
      ]);
      function createInterpolationInside(interpolation, interpolationRound) {
        return {
          interpolation: {
            pattern: re(/((?:^|[^{])(?:\{\{)*)<<0>>/.source, [interpolation]),
            lookbehind: true,
            inside: {
              "format-string": {
                pattern: re(/(^\{(?:(?![}:])<<0>>)*)<<1>>(?=\}$)/.source, [
                  interpolationRound,
                  formatString
                ]),
                lookbehind: true,
                inside: {
                  punctuation: /^:/
                }
              },
              punctuation: /^\{|\}$/,
              expression: {
                pattern: /[\s\S]+/,
                alias: "language-csharp",
                inside: Prism3.languages.csharp
              }
            }
          },
          string: /[\s\S]+/
        };
      }
      Prism3.languages.insertBefore("csharp", "string", {
        "interpolation-string": [
          {
            pattern: re(
              /(^|[^\\])(?:\$@|@\$)"(?:""|\\[\s\S]|\{\{|<<0>>|[^\\{"])*"/.source,
              [mInterpolation]
            ),
            lookbehind: true,
            greedy: true,
            inside: createInterpolationInside(mInterpolation, mInterpolationRound)
          },
          {
            pattern: re(/(^|[^@\\])\$"(?:\\.|\{\{|<<0>>|[^\\"{])*"/.source, [
              sInterpolation
            ]),
            lookbehind: true,
            greedy: true,
            inside: createInterpolationInside(sInterpolation, sInterpolationRound)
          }
        ],
        char: {
          pattern: RegExp(character),
          greedy: true
        }
      });
      Prism3.languages.dotnet = Prism3.languages.cs = Prism3.languages.csharp;
    })(Prism2);
  }
  return csharp_1;
}
var aspnet_1;
var hasRequiredAspnet;
function requireAspnet() {
  if (hasRequiredAspnet) return aspnet_1;
  hasRequiredAspnet = 1;
  var refractorCsharp = requireCsharp();
  aspnet_1 = aspnet;
  aspnet.displayName = "aspnet";
  aspnet.aliases = [];
  function aspnet(Prism2) {
    Prism2.register(refractorCsharp);
    Prism2.languages.aspnet = Prism2.languages.extend("markup", {
      "page-directive": {
        pattern: /<%\s*@.*%>/,
        alias: "tag",
        inside: {
          "page-directive": {
            pattern: /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master(?:Type)?|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/i,
            alias: "tag"
          },
          rest: Prism2.languages.markup.tag.inside
        }
      },
      directive: {
        pattern: /<%.*%>/,
        alias: "tag",
        inside: {
          directive: {
            pattern: /<%\s*?[$=%#:]{0,2}|%>/,
            alias: "tag"
          },
          rest: Prism2.languages.csharp
        }
      }
    });
    Prism2.languages.aspnet.tag.pattern = /<(?!%)\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/;
    Prism2.languages.insertBefore(
      "inside",
      "punctuation",
      {
        directive: Prism2.languages.aspnet["directive"]
      },
      Prism2.languages.aspnet.tag.inside["attr-value"]
    );
    Prism2.languages.insertBefore("aspnet", "comment", {
      "asp-comment": {
        pattern: /<%--[\s\S]*?--%>/,
        alias: ["asp", "comment"]
      }
    });
    Prism2.languages.insertBefore(
      "aspnet",
      Prism2.languages.javascript ? "script" : "tag",
      {
        "asp-script": {
          pattern: /(<script(?=.*runat=['"]?server\b)[^>]*>)[\s\S]*?(?=<\/script>)/i,
          lookbehind: true,
          alias: ["asp", "script"],
          inside: Prism2.languages.csharp || {}
        }
      }
    );
  }
  return aspnet_1;
}
var autohotkey_1;
var hasRequiredAutohotkey;
function requireAutohotkey() {
  if (hasRequiredAutohotkey) return autohotkey_1;
  hasRequiredAutohotkey = 1;
  autohotkey_1 = autohotkey;
  autohotkey.displayName = "autohotkey";
  autohotkey.aliases = [];
  function autohotkey(Prism2) {
    Prism2.languages.autohotkey = {
      comment: [
        {
          pattern: /(^|\s);.*/,
          lookbehind: true
        },
        {
          pattern: /(^[\t ]*)\/\*(?:[\r\n](?![ \t]*\*\/)|[^\r\n])*(?:[\r\n][ \t]*\*\/)?/m,
          lookbehind: true,
          greedy: true
        }
      ],
      tag: {
        // labels
        pattern: /^([ \t]*)[^\s,`":]+(?=:[ \t]*$)/m,
        lookbehind: true
      },
      string: /"(?:[^"\n\r]|"")*"/,
      variable: /%\w+%/,
      number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
      operator: /\?|\/\/?=?|:=|\|[=|]?|&[=&]?|\+[=+]?|-[=-]?|\*[=*]?|<(?:<=?|>|=)?|>>?=?|[.^!=~]=?|\b(?:AND|NOT|OR)\b/,
      boolean: /\b(?:false|true)\b/,
      selector: /\b(?:AutoTrim|BlockInput|Break|Click|ClipWait|Continue|Control|ControlClick|ControlFocus|ControlGet|ControlGetFocus|ControlGetPos|ControlGetText|ControlMove|ControlSend|ControlSendRaw|ControlSetText|CoordMode|Critical|DetectHiddenText|DetectHiddenWindows|Drive|DriveGet|DriveSpaceFree|EnvAdd|EnvDiv|EnvGet|EnvMult|EnvSet|EnvSub|EnvUpdate|Exit|ExitApp|FileAppend|FileCopy|FileCopyDir|FileCreateDir|FileCreateShortcut|FileDelete|FileEncoding|FileGetAttrib|FileGetShortcut|FileGetSize|FileGetTime|FileGetVersion|FileInstall|FileMove|FileMoveDir|FileRead|FileReadLine|FileRecycle|FileRecycleEmpty|FileRemoveDir|FileSelectFile|FileSelectFolder|FileSetAttrib|FileSetTime|FormatTime|GetKeyState|Gosub|Goto|GroupActivate|GroupAdd|GroupClose|GroupDeactivate|Gui|GuiControl|GuiControlGet|Hotkey|ImageSearch|IniDelete|IniRead|IniWrite|Input|InputBox|KeyWait|ListHotkeys|ListLines|ListVars|Loop|Menu|MouseClick|MouseClickDrag|MouseGetPos|MouseMove|MsgBox|OnExit|OutputDebug|Pause|PixelGetColor|PixelSearch|PostMessage|Process|Progress|Random|RegDelete|RegRead|RegWrite|Reload|Repeat|Return|Run|RunAs|RunWait|Send|SendEvent|SendInput|SendMessage|SendMode|SendPlay|SendRaw|SetBatchLines|SetCapslockState|SetControlDelay|SetDefaultMouseSpeed|SetEnv|SetFormat|SetKeyDelay|SetMouseDelay|SetNumlockState|SetRegView|SetScrollLockState|SetStoreCapslockMode|SetTimer|SetTitleMatchMode|SetWinDelay|SetWorkingDir|Shutdown|Sleep|Sort|SoundBeep|SoundGet|SoundGetWaveVolume|SoundPlay|SoundSet|SoundSetWaveVolume|SplashImage|SplashTextOff|SplashTextOn|SplitPath|StatusBarGetText|StatusBarWait|StringCaseSense|StringGetPos|StringLeft|StringLen|StringLower|StringMid|StringReplace|StringRight|StringSplit|StringTrimLeft|StringTrimRight|StringUpper|Suspend|SysGet|Thread|ToolTip|Transform|TrayTip|URLDownloadToFile|WinActivate|WinActivateBottom|WinClose|WinGet|WinGetActiveStats|WinGetActiveTitle|WinGetClass|WinGetPos|WinGetText|WinGetTitle|WinHide|WinKill|WinMaximize|WinMenuSelectItem|WinMinimize|WinMinimizeAll|WinMinimizeAllUndo|WinMove|WinRestore|WinSet|WinSetTitle|WinShow|WinWait|WinWaitActive|WinWaitClose|WinWaitNotActive)\b/i,
      constant: /\b(?:a_ahkpath|a_ahkversion|a_appdata|a_appdatacommon|a_autotrim|a_batchlines|a_caretx|a_carety|a_computername|a_controldelay|a_cursor|a_dd|a_ddd|a_dddd|a_defaultmousespeed|a_desktop|a_desktopcommon|a_detecthiddentext|a_detecthiddenwindows|a_endchar|a_eventinfo|a_exitreason|a_fileencoding|a_formatfloat|a_formatinteger|a_gui|a_guicontrol|a_guicontrolevent|a_guievent|a_guiheight|a_guiwidth|a_guix|a_guiy|a_hour|a_iconfile|a_iconhidden|a_iconnumber|a_icontip|a_index|a_ipaddress1|a_ipaddress2|a_ipaddress3|a_ipaddress4|a_is64bitos|a_isadmin|a_iscompiled|a_iscritical|a_ispaused|a_issuspended|a_isunicode|a_keydelay|a_language|a_lasterror|a_linefile|a_linenumber|a_loopfield|a_loopfileattrib|a_loopfiledir|a_loopfileext|a_loopfilefullpath|a_loopfilelongpath|a_loopfilename|a_loopfileshortname|a_loopfileshortpath|a_loopfilesize|a_loopfilesizekb|a_loopfilesizemb|a_loopfiletimeaccessed|a_loopfiletimecreated|a_loopfiletimemodified|a_loopreadline|a_loopregkey|a_loopregname|a_loopregsubkey|a_loopregtimemodified|a_loopregtype|a_mday|a_min|a_mm|a_mmm|a_mmmm|a_mon|a_mousedelay|a_msec|a_mydocuments|a_now|a_nowutc|a_numbatchlines|a_ostype|a_osversion|a_priorhotkey|a_priorkey|a_programfiles|a_programs|a_programscommon|a_ptrsize|a_regview|a_screendpi|a_screenheight|a_screenwidth|a_scriptdir|a_scriptfullpath|a_scripthwnd|a_scriptname|a_sec|a_space|a_startmenu|a_startmenucommon|a_startup|a_startupcommon|a_stringcasesense|a_tab|a_temp|a_thisfunc|a_thishotkey|a_thislabel|a_thismenu|a_thismenuitem|a_thismenuitempos|a_tickcount|a_timeidle|a_timeidlephysical|a_timesincepriorhotkey|a_timesincethishotkey|a_titlematchmode|a_titlematchmodespeed|a_username|a_wday|a_windelay|a_windir|a_workingdir|a_yday|a_year|a_yweek|a_yyyy|clipboard|clipboardall|comspec|errorlevel|programfiles)\b/i,
      builtin: /\b(?:abs|acos|asc|asin|atan|ceil|chr|class|comobjactive|comobjarray|comobjconnect|comobjcreate|comobjerror|comobjflags|comobjget|comobjquery|comobjtype|comobjvalue|cos|dllcall|exp|fileexist|Fileopen|floor|format|il_add|il_create|il_destroy|instr|isfunc|islabel|IsObject|ln|log|ltrim|lv_add|lv_delete|lv_deletecol|lv_getcount|lv_getnext|lv_gettext|lv_insert|lv_insertcol|lv_modify|lv_modifycol|lv_setimagelist|mod|numget|numput|onmessage|regexmatch|regexreplace|registercallback|round|rtrim|sb_seticon|sb_setparts|sb_settext|sin|sqrt|strlen|strreplace|strsplit|substr|tan|tv_add|tv_delete|tv_get|tv_getchild|tv_getcount|tv_getnext|tv_getparent|tv_getprev|tv_getselection|tv_gettext|tv_modify|varsetcapacity|winactive|winexist|__Call|__Get|__New|__Set)\b/i,
      symbol: /\b(?:alt|altdown|altup|appskey|backspace|browser_back|browser_favorites|browser_forward|browser_home|browser_refresh|browser_search|browser_stop|bs|capslock|ctrl|ctrlbreak|ctrldown|ctrlup|del|delete|down|end|enter|esc|escape|f1|f10|f11|f12|f13|f14|f15|f16|f17|f18|f19|f2|f20|f21|f22|f23|f24|f3|f4|f5|f6|f7|f8|f9|home|ins|insert|joy1|joy10|joy11|joy12|joy13|joy14|joy15|joy16|joy17|joy18|joy19|joy2|joy20|joy21|joy22|joy23|joy24|joy25|joy26|joy27|joy28|joy29|joy3|joy30|joy31|joy32|joy4|joy5|joy6|joy7|joy8|joy9|joyaxes|joybuttons|joyinfo|joyname|joypov|joyr|joyu|joyv|joyx|joyy|joyz|lalt|launch_app1|launch_app2|launch_mail|launch_media|lbutton|lcontrol|lctrl|left|lshift|lwin|lwindown|lwinup|mbutton|media_next|media_play_pause|media_prev|media_stop|numlock|numpad0|numpad1|numpad2|numpad3|numpad4|numpad5|numpad6|numpad7|numpad8|numpad9|numpadadd|numpadclear|numpaddel|numpaddiv|numpaddot|numpaddown|numpadend|numpadenter|numpadhome|numpadins|numpadleft|numpadmult|numpadpgdn|numpadpgup|numpadright|numpadsub|numpadup|pgdn|pgup|printscreen|ralt|rbutton|rcontrol|rctrl|right|rshift|rwin|rwindown|rwinup|scrolllock|shift|shiftdown|shiftup|space|tab|up|volume_down|volume_mute|volume_up|wheeldown|wheelleft|wheelright|wheelup|xbutton1|xbutton2)\b/i,
      important: /#\b(?:AllowSameLineComments|ClipboardTimeout|CommentFlag|DerefChar|ErrorStdOut|EscapeChar|HotkeyInterval|HotkeyModifierTimeout|Hotstring|If|IfTimeout|IfWinActive|IfWinExist|IfWinNotActive|IfWinNotExist|Include|IncludeAgain|InputLevel|InstallKeybdHook|InstallMouseHook|KeyHistory|MaxHotkeysPerInterval|MaxMem|MaxThreads|MaxThreadsBuffer|MaxThreadsPerHotkey|MenuMaskKey|NoEnv|NoTrayIcon|Persistent|SingleInstance|UseHook|Warn|WinActivateForce)\b/i,
      keyword: /\b(?:Abort|AboveNormal|Add|ahk_class|ahk_exe|ahk_group|ahk_id|ahk_pid|All|Alnum|Alpha|AltSubmit|AltTab|AltTabAndMenu|AltTabMenu|AltTabMenuDismiss|AlwaysOnTop|AutoSize|Background|BackgroundTrans|BelowNormal|between|BitAnd|BitNot|BitOr|BitShiftLeft|BitShiftRight|BitXOr|Bold|Border|Button|ByRef|Catch|Checkbox|Checked|CheckedGray|Choose|ChooseString|Close|Color|ComboBox|Contains|ControlList|Count|Date|DateTime|Days|DDL|Default|DeleteAll|Delimiter|Deref|Destroy|Digit|Disable|Disabled|DropDownList|Edit|Eject|Else|Enable|Enabled|Error|Exist|Expand|ExStyle|FileSystem|Finally|First|Flash|Float|FloatFast|Focus|Font|for|global|Grid|Group|GroupBox|GuiClose|GuiContextMenu|GuiDropFiles|GuiEscape|GuiSize|Hdr|Hidden|Hide|High|HKCC|HKCR|HKCU|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_LOCAL_MACHINE|HKEY_USERS|HKLM|HKU|Hours|HScroll|Icon|IconSmall|ID|IDLast|If|IfEqual|IfExist|IfGreater|IfGreaterOrEqual|IfInString|IfLess|IfLessOrEqual|IfMsgBox|IfNotEqual|IfNotExist|IfNotInString|IfWinActive|IfWinExist|IfWinNotActive|IfWinNotExist|Ignore|ImageList|in|Integer|IntegerFast|Interrupt|is|italic|Join|Label|LastFound|LastFoundExist|Limit|Lines|List|ListBox|ListView|local|Lock|Logoff|Low|Lower|Lowercase|MainWindow|Margin|Maximize|MaximizeBox|MaxSize|Minimize|MinimizeBox|MinMax|MinSize|Minutes|MonthCal|Mouse|Move|Multi|NA|No|NoActivate|NoDefault|NoHide|NoIcon|NoMainWindow|norm|Normal|NoSort|NoSortHdr|NoStandard|Not|NoTab|NoTimers|Number|Off|Ok|On|OwnDialogs|Owner|Parse|Password|Picture|Pixel|Pos|Pow|Priority|ProcessName|Radio|Range|Read|ReadOnly|Realtime|Redraw|Region|REG_BINARY|REG_DWORD|REG_EXPAND_SZ|REG_MULTI_SZ|REG_SZ|Relative|Rename|Report|Resize|Restore|Retry|RGB|Screen|Seconds|Section|Serial|SetLabel|ShiftAltTab|Show|Single|Slider|SortDesc|Standard|static|Status|StatusBar|StatusCD|strike|Style|Submit|SysMenu|Tab2|TabStop|Text|Theme|Throw|Tile|ToggleCheck|ToggleEnable|ToolWindow|Top|Topmost|TransColor|Transparent|Tray|TreeView|Try|TryAgain|Type|UnCheck|underline|Unicode|Unlock|Until|UpDown|Upper|Uppercase|UseErrorLevel|Vis|VisFirst|Visible|VScroll|Wait|WaitClose|WantCtrlA|WantF2|WantReturn|While|Wrap|Xdigit|xm|xp|xs|Yes|ym|yp|ys)\b/i,
      function: /[^(); \t,\n+*\-=?>:\\\/<&%\[\]]+(?=\()/,
      punctuation: /[{}[\]():,]/
    };
  }
  return autohotkey_1;
}
var autoit_1;
var hasRequiredAutoit;
function requireAutoit() {
  if (hasRequiredAutoit) return autoit_1;
  hasRequiredAutoit = 1;
  autoit_1 = autoit;
  autoit.displayName = "autoit";
  autoit.aliases = [];
  function autoit(Prism2) {
    Prism2.languages.autoit = {
      comment: [
        /;.*/,
        {
          // The multi-line comments delimiters can actually be commented out with ";"
          pattern: /(^[\t ]*)#(?:comments-start|cs)[\s\S]*?^[ \t]*#(?:ce|comments-end)/m,
          lookbehind: true
        }
      ],
      url: {
        pattern: /(^[\t ]*#include\s+)(?:<[^\r\n>]+>|"[^\r\n"]+")/m,
        lookbehind: true
      },
      string: {
        pattern: /(["'])(?:\1\1|(?!\1)[^\r\n])*\1/,
        greedy: true,
        inside: {
          variable: /([%$@])\w+\1/
        }
      },
      directive: {
        pattern: /(^[\t ]*)#[\w-]+/m,
        lookbehind: true,
        alias: "keyword"
      },
      function: /\b\w+(?=\()/,
      // Variables and macros
      variable: /[$@]\w+/,
      keyword: /\b(?:Case|Const|Continue(?:Case|Loop)|Default|Dim|Do|Else(?:If)?|End(?:Func|If|Select|Switch|With)|Enum|Exit(?:Loop)?|For|Func|Global|If|In|Local|Next|Null|ReDim|Select|Static|Step|Switch|Then|To|Until|Volatile|WEnd|While|With)\b/i,
      number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i,
      boolean: /\b(?:False|True)\b/i,
      operator: /<[=>]?|[-+*\/=&>]=?|[?^]|\b(?:And|Not|Or)\b/i,
      punctuation: /[\[\]().,:]/
    };
  }
  return autoit_1;
}
var avisynth_1;
var hasRequiredAvisynth;
function requireAvisynth() {
  if (hasRequiredAvisynth) return avisynth_1;
  hasRequiredAvisynth = 1;
  avisynth_1 = avisynth;
  avisynth.displayName = "avisynth";
  avisynth.aliases = ["avs"];
  function avisynth(Prism2) {
    (function(Prism3) {
      function replace(pattern, replacements) {
        return pattern.replace(/<<(\d+)>>/g, function(m, index) {
          return replacements[+index];
        });
      }
      function re(pattern, replacements, flags) {
        return RegExp(replace(pattern, replacements), flags);
      }
      var types = /bool|clip|float|int|string|val/.source;
      var internals = [
        // bools
        /is(?:bool|clip|float|int|string)|defined|(?:(?:internal)?function|var)?exists?/.source,
        // control
        /apply|assert|default|eval|import|nop|select|undefined/.source,
        // global
        /opt_(?:allowfloataudio|avipadscanlines|dwchannelmask|enable_(?:b64a|planartopackedrgb|v210|y3_10_10|y3_10_16)|usewaveextensible|vdubplanarhack)|set(?:cachemode|maxcpu|memorymax|planarlegacyalignment|workingdir)/.source,
        // conv
        /hex(?:value)?|value/.source,
        // numeric
        /abs|ceil|continued(?:denominator|numerator)?|exp|floor|fmod|frac|log(?:10)?|max|min|muldiv|pi|pow|rand|round|sign|spline|sqrt/.source,
        // trig
        /a?sinh?|a?cosh?|a?tan[2h]?/.source,
        // bit
        /(?:bit(?:and|not|x?or|[lr]?shift[aslu]?|sh[lr]|sa[lr]|[lr]rotatel?|ro[rl]|te?st|set(?:count)?|cl(?:ea)?r|ch(?:an)?ge?))/.source,
        // runtime
        /average(?:[bgr]|chroma[uv]|luma)|(?:[rgb]|chroma[uv]|luma|rgb|[yuv](?=difference(?:fromprevious|tonext)))difference(?:fromprevious|tonext)?|[yuvrgb]plane(?:median|min|max|minmaxdifference)/.source,
        // script
        /getprocessinfo|logmsg|script(?:dir(?:utf8)?|file(?:utf8)?|name(?:utf8)?)|setlogparams/.source,
        // string
        /chr|(?:fill|find|left|mid|replace|rev|right)str|format|[lu]case|ord|str(?:cmpi?|fromutf8|len|toutf8)|time|trim(?:all|left|right)/.source,
        // version
        /isversionorgreater|version(?:number|string)/.source,
        // helper
        /buildpixeltype|colorspacenametopixeltype/.source,
        // avsplus
        /addautoloaddir|on(?:cpu|cuda)|prefetch|setfiltermtmode/.source
      ].join("|");
      var properties = [
        // content
        /has(?:audio|video)/.source,
        // resolution
        /height|width/.source,
        // framerate
        /frame(?:count|rate)|framerate(?:denominator|numerator)/.source,
        // interlacing
        /getparity|is(?:field|frame)based/.source,
        // color format
        /bitspercomponent|componentsize|hasalpha|is(?:planar(?:rgba?)?|interleaved|rgb(?:24|32|48|64)?|y(?:8|u(?:va?|y2))?|yv(?:12|16|24|411)|420|422|444|packedrgb)|numcomponents|pixeltype/.source,
        // audio
        /audio(?:bits|channels|duration|length(?:[fs]|hi|lo)?|rate)|isaudio(?:float|int)/.source
      ].join("|");
      var filters = [
        // source
        /avi(?:file)?source|directshowsource|image(?:reader|source|sourceanim)|opendmlsource|segmented(?:avisource|directshowsource)|wavsource/.source,
        // color
        /coloryuv|convertbacktoyuy2|convertto(?:RGB(?:24|32|48|64)|(?:planar)?RGBA?|Y8?|YV(?:12|16|24|411)|YUVA?(?:411|420|422|444)|YUY2)|fixluminance|gr[ae]yscale|invert|levels|limiter|mergea?rgb|merge(?:chroma|luma)|rgbadjust|show(?:alpha|blue|green|red)|swapuv|tweak|[uv]toy8?|ytouv/.source,
        // overlay
        /(?:colorkey|reset)mask|layer|mask(?:hs)?|merge|overlay|subtract/.source,
        // geometry
        /addborders|(?:bicubic|bilinear|blackman|gauss|lanczos4|lanczos|point|sinc|spline(?:16|36|64))resize|crop(?:bottom)?|flip(?:horizontal|vertical)|(?:horizontal|vertical)?reduceby2|letterbox|skewrows|turn(?:180|left|right)/.source,
        // pixel
        /blur|fixbrokenchromaupsampling|generalconvolution|(?:spatial|temporal)soften|sharpen/.source,
        // timeline
        /trim|(?:un)?alignedsplice|(?:assume|assumescaled|change|convert)FPS|(?:delete|duplicate)frame|dissolve|fade(?:in|io|out)[02]?|freezeframe|interleave|loop|reverse|select(?:even|odd|(?:range)?every)/.source,
        // interlace
        /assume[bt]ff|assume(?:field|frame)based|bob|complementparity|doubleweave|peculiarblend|pulldown|separate(?:columns|fields|rows)|swapfields|weave(?:columns|rows)?/.source,
        // audio
        /amplify(?:db)?|assumesamplerate|audiodub(?:ex)?|audiotrim|convertaudioto(?:(?:8|16|24|32)bit|float)|converttomono|delayaudio|ensurevbrmp3sync|get(?:left|right)?channel|kill(?:audio|video)|mergechannels|mixaudio|monotostereo|normalize|resampleaudio|ssrc|supereq|timestretch/.source,
        // conditional
        /animate|applyrange|conditional(?:filter|reader|select)|frameevaluate|scriptclip|tcp(?:server|source)|writefile(?:end|if|start)?/.source,
        // export
        /imagewriter/.source,
        // debug
        /blackness|blankclip|colorbars(?:hd)?|compare|dumpfiltergraph|echo|histogram|info|messageclip|preroll|setgraphanalysis|show(?:framenumber|smpte|time)|showfiveversions|stack(?:horizontal|vertical)|subtitle|tone|version/.source
      ].join("|");
      var allinternals = [internals, properties, filters].join("|");
      Prism3.languages.avisynth = {
        comment: [
          {
            // Matches [* *] nestable block comments, but only supports 1 level of nested comments
            // /\[\*(?:[^\[*]|\[(?!\*)|\*(?!\])|<self>)*\*\]/
            pattern: /(^|[^\\])\[\*(?:[^\[*]|\[(?!\*)|\*(?!\])|\[\*(?:[^\[*]|\[(?!\*)|\*(?!\]))*\*\])*\*\]/,
            lookbehind: true,
            greedy: true
          },
          {
            // Matches /* */ block comments
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true,
            greedy: true
          },
          {
            // Matches # comments
            pattern: /(^|[^\\$])#.*/,
            lookbehind: true,
            greedy: true
          }
        ],
        // Handle before strings because optional arguments are surrounded by double quotes
        argument: {
          pattern: re(/\b(?:<<0>>)\s+("?)\w+\1/.source, [types], "i"),
          inside: {
            keyword: /^\w+/
          }
        },
        // Optional argument assignment
        "argument-label": {
          pattern: /([,(][\s\\]*)\w+\s*=(?!=)/,
          lookbehind: true,
          inside: {
            "argument-name": {
              pattern: /^\w+/,
              alias: "punctuation"
            },
            punctuation: /=$/
          }
        },
        string: [
          {
            // triple double-quoted
            pattern: /"""[\s\S]*?"""/,
            greedy: true
          },
          {
            // single double-quoted
            pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
            greedy: true,
            inside: {
              constant: {
                // These *are* case-sensitive!
                pattern: /\b(?:DEFAULT_MT_MODE|(?:MAINSCRIPT|PROGRAM|SCRIPT)DIR|(?:MACHINE|USER)_(?:CLASSIC|PLUS)_PLUGINS)\b/
              }
            }
          }
        ],
        // The special "last" variable that takes the value of the last implicitly returned clip
        variable: /\b(?:last)\b/i,
        boolean: /\b(?:false|no|true|yes)\b/i,
        keyword: /\b(?:catch|else|for|function|global|if|return|try|while|__END__)\b/i,
        constant: /\bMT_(?:MULTI_INSTANCE|NICE_FILTER|SERIALIZED|SPECIAL_MT)\b/,
        // AviSynth's internal functions, filters, and properties
        "builtin-function": {
          pattern: re(/\b(?:<<0>>)\b/.source, [allinternals], "i"),
          alias: "function"
        },
        "type-cast": {
          pattern: re(/\b(?:<<0>>)(?=\s*\()/.source, [types], "i"),
          alias: "keyword"
        },
        // External/user-defined filters
        function: {
          pattern: /\b[a-z_]\w*(?=\s*\()|(\.)[a-z_]\w*\b/i,
          lookbehind: true
        },
        // Matches a \ as the first or last character on a line
        "line-continuation": {
          pattern: /(^[ \t]*)\\|\\(?=[ \t]*$)/m,
          lookbehind: true,
          alias: "punctuation"
        },
        number: /\B\$(?:[\da-f]{6}|[\da-f]{8})\b|(?:(?:\b|\B-)\d+(?:\.\d*)?\b|\B\.\d+\b)/i,
        operator: /\+\+?|[!=<>]=?|&&|\|\||[?:*/%-]/,
        punctuation: /[{}\[\]();,.]/
      };
      Prism3.languages.avs = Prism3.languages.avisynth;
    })(Prism2);
  }
  return avisynth_1;
}
var avroIdl_1;
var hasRequiredAvroIdl;
function requireAvroIdl() {
  if (hasRequiredAvroIdl) return avroIdl_1;
  hasRequiredAvroIdl = 1;
  avroIdl_1 = avroIdl;
  avroIdl.displayName = "avroIdl";
  avroIdl.aliases = [];
  function avroIdl(Prism2) {
    Prism2.languages["avro-idl"] = {
      comment: {
        pattern: /\/\/.*|\/\*[\s\S]*?\*\//,
        greedy: true
      },
      string: {
        pattern: /(^|[^\\])"(?:[^\r\n"\\]|\\.)*"/,
        lookbehind: true,
        greedy: true
      },
      annotation: {
        pattern: /@(?:[$\w.-]|`[^\r\n`]+`)+/,
        greedy: true,
        alias: "function"
      },
      "function-identifier": {
        pattern: /`[^\r\n`]+`(?=\s*\()/,
        greedy: true,
        alias: "function"
      },
      identifier: {
        pattern: /`[^\r\n`]+`/,
        greedy: true
      },
      "class-name": {
        pattern: /(\b(?:enum|error|protocol|record|throws)\b\s+)[$\w]+/,
        lookbehind: true,
        greedy: true
      },
      keyword: /\b(?:array|boolean|bytes|date|decimal|double|enum|error|false|fixed|float|idl|import|int|local_timestamp_ms|long|map|null|oneway|protocol|record|schema|string|throws|time_ms|timestamp_ms|true|union|uuid|void)\b/,
      function: /\b[a-z_]\w*(?=\s*\()/i,
      number: [
        {
          pattern: /(^|[^\w.])-?(?:(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|0x(?:[a-f0-9]+(?:\.[a-f0-9]*)?|\.[a-f0-9]+)(?:p[+-]?\d+)?)[dfl]?(?![\w.])/i,
          lookbehind: true
        },
        /-?\b(?:Infinity|NaN)\b/
      ],
      operator: /=/,
      punctuation: /[()\[\]{}<>.:,;-]/
    };
    Prism2.languages.avdl = Prism2.languages["avro-idl"];
  }
  return avroIdl_1;
}
var bash_1;
var hasRequiredBash;
function requireBash() {
  if (hasRequiredBash) return bash_1;
  hasRequiredBash = 1;
  bash_1 = bash;
  bash.displayName = "bash";
  bash.aliases = ["shell"];
  function bash(Prism2) {
    (function(Prism3) {
      var envVars = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b";
      var commandAfterHeredoc = {
        pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
        lookbehind: true,
        alias: "punctuation",
        // this looks reasonably well in all themes
        inside: null
        // see below
      };
      var insideString = {
        bash: commandAfterHeredoc,
        environment: {
          pattern: RegExp("\\$" + envVars),
          alias: "constant"
        },
        variable: [
          // [0]: Arithmetic Environment
          {
            pattern: /\$?\(\([\s\S]+?\)\)/,
            greedy: true,
            inside: {
              // If there is a $ sign at the beginning highlight $(( and )) as variable
              variable: [
                {
                  pattern: /(^\$\(\([\s\S]+)\)\)/,
                  lookbehind: true
                },
                /^\$\(\(/
              ],
              number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
              // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
              operator: /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
              // If there is no $ sign at the beginning highlight (( and )) as punctuation
              punctuation: /\(\(?|\)\)?|,|;/
            }
          },
          // [1]: Command Substitution
          {
            pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
            greedy: true,
            inside: {
              variable: /^\$\(|^`|\)$|`$/
            }
          },
          // [2]: Brace expansion
          {
            pattern: /\$\{[^}]+\}/,
            greedy: true,
            inside: {
              operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
              punctuation: /[\[\]]/,
              environment: {
                pattern: RegExp("(\\{)" + envVars),
                lookbehind: true,
                alias: "constant"
              }
            }
          },
          /\$(?:\w+|[#?*!@$])/
        ],
        // Escape sequences from echo and printf's manuals, and escaped quotes.
        entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/
      };
      Prism3.languages.bash = {
        shebang: {
          pattern: /^#!\s*\/.*/,
          alias: "important"
        },
        comment: {
          pattern: /(^|[^"{\\$])#.*/,
          lookbehind: true
        },
        "function-name": [
          // a) function foo {
          // b) foo() {
          // c) function foo() {
          // but not “foo {”
          {
            // a) and c)
            pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
            lookbehind: true,
            alias: "function"
          },
          {
            // b)
            pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
            alias: "function"
          }
        ],
        // Highlight variable names as variables in for and select beginnings.
        "for-or-select": {
          pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
          alias: "variable",
          lookbehind: true
        },
        // Highlight variable names as variables in the left-hand part
        // of assignments (“=” and “+=”).
        "assign-left": {
          pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
          inside: {
            environment: {
              pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + envVars),
              lookbehind: true,
              alias: "constant"
            }
          },
          alias: "variable",
          lookbehind: true
        },
        string: [
          // Support for Here-documents https://en.wikipedia.org/wiki/Here_document
          {
            pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
            lookbehind: true,
            greedy: true,
            inside: insideString
          },
          // Here-document with quotes around the tag
          // → No expansion (so no “inside”).
          {
            pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
            lookbehind: true,
            greedy: true,
            inside: {
              bash: commandAfterHeredoc
            }
          },
          // “Normal” string
          {
            // https://www.gnu.org/software/bash/manual/html_node/Double-Quotes.html
            pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
            lookbehind: true,
            greedy: true,
            inside: insideString
          },
          {
            // https://www.gnu.org/software/bash/manual/html_node/Single-Quotes.html
            pattern: /(^|[^$\\])'[^']*'/,
            lookbehind: true,
            greedy: true
          },
          {
            // https://www.gnu.org/software/bash/manual/html_node/ANSI_002dC-Quoting.html
            pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
            greedy: true,
            inside: {
              entity: insideString.entity
            }
          }
        ],
        environment: {
          pattern: RegExp("\\$?" + envVars),
          alias: "constant"
        },
        variable: insideString.variable,
        function: {
          pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
          lookbehind: true
        },
        keyword: {
          pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
          lookbehind: true
        },
        // https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
        builtin: {
          pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
          lookbehind: true,
          // Alias added to make those easier to distinguish from strings.
          alias: "class-name"
        },
        boolean: {
          pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
          lookbehind: true
        },
        "file-descriptor": {
          pattern: /\B&\d\b/,
          alias: "important"
        },
        operator: {
          // Lots of redirections here, but not just that.
          pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
          inside: {
            "file-descriptor": {
              pattern: /^\d/,
              alias: "important"
            }
          }
        },
        punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
        number: {
          pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
          lookbehind: true
        }
      };
      commandAfterHeredoc.inside = Prism3.languages.bash;
      var toBeCopied = [
        "comment",
        "function-name",
        "for-or-select",
        "assign-left",
        "string",
        "environment",
        "function",
        "keyword",
        "builtin",
        "boolean",
        "file-descriptor",
        "operator",
        "punctuation",
        "number"
      ];
      var inside = insideString.variable[1].inside;
      for (var i = 0; i < toBeCopied.length; i++) {
        inside[toBeCopied[i]] = Prism3.languages.bash[toBeCopied[i]];
      }
      Prism3.languages.shell = Prism3.languages.bash;
    })(Prism2);
  }
  return bash_1;
}
var basic_1;
var hasRequiredBasic;
function requireBasic() {
  if (hasRequiredBasic) return basic_1;
  hasRequiredBasic = 1;
  basic_1 = basic;
  basic.displayName = "basic";
  basic.aliases = [];
  function basic(Prism2) {
    Prism2.languages.basic = {
      comment: {
        pattern: /(?:!|REM\b).+/i,
        inside: {
          keyword: /^REM/i
        }
      },
      string: {
        pattern: /"(?:""|[!#$%&'()*,\/:;<=>?^\w +\-.])*"/,
        greedy: true
      },
      number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:E[+-]?\d+)?/i,
      keyword: /\b(?:AS|BEEP|BLOAD|BSAVE|CALL(?: ABSOLUTE)?|CASE|CHAIN|CHDIR|CLEAR|CLOSE|CLS|COM|COMMON|CONST|DATA|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DIM|DO|DOUBLE|ELSE|ELSEIF|END|ENVIRON|ERASE|ERROR|EXIT|FIELD|FILES|FOR|FUNCTION|GET|GOSUB|GOTO|IF|INPUT|INTEGER|IOCTL|KEY|KILL|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|MKDIR|NAME|NEXT|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPTION BASE|OUT|POKE|PUT|READ|REDIM|REM|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SELECT CASE|SHARED|SHELL|SINGLE|SLEEP|STATIC|STEP|STOP|STRING|SUB|SWAP|SYSTEM|THEN|TIMER|TO|TROFF|TRON|TYPE|UNLOCK|UNTIL|USING|VIEW PRINT|WAIT|WEND|WHILE|WRITE)(?:\$|\b)/i,
      function: /\b(?:ABS|ACCESS|ACOS|ANGLE|AREA|ARITHMETIC|ARRAY|ASIN|ASK|AT|ATN|BASE|BEGIN|BREAK|CAUSE|CEIL|CHR|CLIP|COLLATE|COLOR|CON|COS|COSH|COT|CSC|DATE|DATUM|DEBUG|DECIMAL|DEF|DEG|DEGREES|DELETE|DET|DEVICE|DISPLAY|DOT|ELAPSED|EPS|ERASABLE|EXLINE|EXP|EXTERNAL|EXTYPE|FILETYPE|FIXED|FP|GO|GRAPH|HANDLER|IDN|IMAGE|IN|INT|INTERNAL|IP|IS|KEYED|LBOUND|LCASE|LEFT|LEN|LENGTH|LET|LINE|LINES|LOG|LOG10|LOG2|LTRIM|MARGIN|MAT|MAX|MAXNUM|MID|MIN|MISSING|MOD|NATIVE|NUL|NUMERIC|OF|OPTION|ORD|ORGANIZATION|OUTIN|OUTPUT|PI|POINT|POINTER|POINTS|POS|PRINT|PROGRAM|PROMPT|RAD|RADIANS|RANDOMIZE|RECORD|RECSIZE|RECTYPE|RELATIVE|REMAINDER|REPEAT|REST|RETRY|REWRITE|RIGHT|RND|ROUND|RTRIM|SAME|SEC|SELECT|SEQUENTIAL|SET|SETTER|SGN|SIN|SINH|SIZE|SKIP|SQR|STANDARD|STATUS|STR|STREAM|STYLE|TAB|TAN|TANH|TEMPLATE|TEXT|THERE|TIME|TIMEOUT|TRACE|TRANSFORM|TRUNCATE|UBOUND|UCASE|USE|VAL|VARIABLE|VIEWPORT|WHEN|WINDOW|WITH|ZER|ZONEWIDTH)(?:\$|\b)/i,
      operator: /<[=>]?|>=?|[+\-*\/^=&]|\b(?:AND|EQV|IMP|NOT|OR|XOR)\b/i,
      punctuation: /[,;:()]/
    };
  }
  return basic_1;
}
var batch_1;
var hasRequiredBatch;
function requireBatch() {
  if (hasRequiredBatch) return batch_1;
  hasRequiredBatch = 1;
  batch_1 = batch;
  batch.displayName = "batch";
  batch.aliases = [];
  function batch(Prism2) {
    (function(Prism3) {
      var variable = /%%?[~:\w]+%?|!\S+!/;
      var parameter = {
        pattern: /\/[a-z?]+(?=[ :]|$):?|-[a-z]\b|--[a-z-]+\b/im,
        alias: "attr-name",
        inside: {
          punctuation: /:/
        }
      };
      var string = /"(?:[\\"]"|[^"])*"(?!")/;
      var number = /(?:\b|-)\d+\b/;
      Prism3.languages.batch = {
        comment: [
          /^::.*/m,
          {
            pattern: /((?:^|[&(])[ \t]*)rem\b(?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
            lookbehind: true
          }
        ],
        label: {
          pattern: /^:.*/m,
          alias: "property"
        },
        command: [
          {
            // FOR command
            pattern: /((?:^|[&(])[ \t]*)for(?: \/[a-z?](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* \S+ in \([^)]+\) do/im,
            lookbehind: true,
            inside: {
              keyword: /\b(?:do|in)\b|^for\b/i,
              string,
              parameter,
              variable,
              number,
              punctuation: /[()',]/
            }
          },
          {
            // IF command
            pattern: /((?:^|[&(])[ \t]*)if(?: \/[a-z?](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* (?:not )?(?:cmdextversion \d+|defined \w+|errorlevel \d+|exist \S+|(?:"[^"]*"|(?!")(?:(?!==)\S)+)?(?:==| (?:equ|geq|gtr|leq|lss|neq) )(?:"[^"]*"|[^\s"]\S*))/im,
            lookbehind: true,
            inside: {
              keyword: /\b(?:cmdextversion|defined|errorlevel|exist|not)\b|^if\b/i,
              string,
              parameter,
              variable,
              number,
              operator: /\^|==|\b(?:equ|geq|gtr|leq|lss|neq)\b/i
            }
          },
          {
            // ELSE command
            pattern: /((?:^|[&()])[ \t]*)else\b/im,
            lookbehind: true,
            inside: {
              keyword: /^else\b/i
            }
          },
          {
            // SET command
            pattern: /((?:^|[&(])[ \t]*)set(?: \/[a-z](?:[ :](?:"[^"]*"|[^\s"/]\S*))?)* (?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
            lookbehind: true,
            inside: {
              keyword: /^set\b/i,
              string,
              parameter,
              variable: [variable, /\w+(?=(?:[*\/%+\-&^|]|<<|>>)?=)/],
              number,
              operator: /[*\/%+\-&^|]=?|<<=?|>>=?|[!~_=]/,
              punctuation: /[()',]/
            }
          },
          {
            // Other commands
            pattern: /((?:^|[&(])[ \t]*@?)\w+\b(?:"(?:[\\"]"|[^"])*"(?!")|[^"^&)\r\n]|\^(?:\r\n|[\s\S]))*/m,
            lookbehind: true,
            inside: {
              keyword: /^\w+\b/,
              string,
              parameter,
              label: {
                pattern: /(^\s*):\S+/m,
                lookbehind: true,
                alias: "property"
              },
              variable,
              number,
              operator: /\^/
            }
          }
        ],
        operator: /[&@]/,
        punctuation: /[()']/
      };
    })(Prism2);
  }
  return batch_1;
}
var bbcode_1;
var hasRequiredBbcode;
function requireBbcode() {
  if (hasRequiredBbcode) return bbcode_1;
  hasRequiredBbcode = 1;
  bbcode_1 = bbcode;
  bbcode.displayName = "bbcode";
  bbcode.aliases = ["shortcode"];
  function bbcode(Prism2) {
    Prism2.languages.bbcode = {
      tag: {
        pattern: /\[\/?[^\s=\]]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+))?(?:\s+[^\s=\]]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+))*\s*\]/,
        inside: {
          tag: {
            pattern: /^\[\/?[^\s=\]]+/,
            inside: {
              punctuation: /^\[\/?/
            }
          },
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'"\]=]+)/,
            inside: {
              punctuation: [
                /^=/,
                {
                  pattern: /^(\s*)["']|["']$/,
                  lookbehind: true
                }
              ]
            }
          },
          punctuation: /\]/,
          "attr-name": /[^\s=\]]+/
        }
      }
    };
    Prism2.languages.shortcode = Prism2.languages.bbcode;
  }
  return bbcode_1;
}
var bicep_1;
var hasRequiredBicep;
function requireBicep() {
  if (hasRequiredBicep) return bicep_1;
  hasRequiredBicep = 1;
  bicep_1 = bicep;
  bicep.displayName = "bicep";
  bicep.aliases = [];
  function bicep(Prism2) {
    Prism2.languages.bicep = {
      comment: [
        {
          // multiline comments eg /* ASDF */
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: true,
          greedy: true
        },
        {
          // singleline comments eg // ASDF
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      property: [
        {
          pattern: /([\r\n][ \t]*)[a-z_]\w*(?=[ \t]*:)/i,
          lookbehind: true
        },
        {
          pattern: /([\r\n][ \t]*)'(?:\\.|\$(?!\{)|[^'\\\r\n$])*'(?=[ \t]*:)/,
          lookbehind: true,
          greedy: true
        }
      ],
      string: [
        {
          pattern: /'''[^'][\s\S]*?'''/,
          greedy: true
        },
        {
          pattern: /(^|[^\\'])'(?:\\.|\$(?!\{)|[^'\\\r\n$])*'/,
          lookbehind: true,
          greedy: true
        }
      ],
      "interpolated-string": {
        pattern: /(^|[^\\'])'(?:\\.|\$(?:(?!\{)|\{[^{}\r\n]*\})|[^'\\\r\n$])*'/,
        lookbehind: true,
        greedy: true,
        inside: {
          interpolation: {
            pattern: /\$\{[^{}\r\n]*\}/,
            inside: {
              expression: {
                pattern: /(^\$\{)[\s\S]+(?=\}$)/,
                lookbehind: true
              },
              punctuation: /^\$\{|\}$/
            }
          },
          string: /[\s\S]+/
        }
      },
      datatype: {
        pattern: /(\b(?:output|param)\b[ \t]+\w+[ \t]+)\w+\b/,
        lookbehind: true,
        alias: "class-name"
      },
      boolean: /\b(?:false|true)\b/,
      // https://github.com/Azure/bicep/blob/114a3251b4e6e30082a58729f19a8cc4e374ffa6/src/textmate/bicep.tmlanguage#L184
      keyword: /\b(?:existing|for|if|in|module|null|output|param|resource|targetScope|var)\b/,
      decorator: /@\w+\b/,
      function: /\b[a-z_]\w*(?=[ \t]*\()/i,
      number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:E[+-]?\d+)?/i,
      operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
      punctuation: /[{}[\];(),.:]/
    };
    Prism2.languages.bicep["interpolated-string"].inside["interpolation"].inside["expression"].inside = Prism2.languages.bicep;
  }
  return bicep_1;
}
var birb_1;
var hasRequiredBirb;
function requireBirb() {
  if (hasRequiredBirb) return birb_1;
  hasRequiredBirb = 1;
  birb_1 = birb;
  birb.displayName = "birb";
  birb.aliases = [];
  function birb(Prism2) {
    Prism2.languages.birb = Prism2.languages.extend("clike", {
      string: {
        pattern: /r?("|')(?:\\.|(?!\1)[^\\])*\1/,
        greedy: true
      },
      "class-name": [
        /\b[A-Z](?:[\d_]*[a-zA-Z]\w*)?\b/,
        // matches variable and function return types (parameters as well).
        /\b(?:[A-Z]\w*|(?!(?:var|void)\b)[a-z]\w*)(?=\s+\w+\s*[;,=()])/
      ],
      keyword: /\b(?:assert|break|case|class|const|default|else|enum|final|follows|for|grab|if|nest|new|next|noSeeb|return|static|switch|throw|var|void|while)\b/,
      operator: /\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?|:/,
      variable: /\b[a-z_]\w*\b/
    });
    Prism2.languages.insertBefore("birb", "function", {
      metadata: {
        pattern: /<\w+>/,
        greedy: true,
        alias: "symbol"
      }
    });
  }
  return birb_1;
}
var bison_1;
var hasRequiredBison;
function requireBison() {
  if (hasRequiredBison) return bison_1;
  hasRequiredBison = 1;
  var refractorC = requireC();
  bison_1 = bison;
  bison.displayName = "bison";
  bison.aliases = [];
  function bison(Prism2) {
    Prism2.register(refractorC);
    Prism2.languages.bison = Prism2.languages.extend("c", {});
    Prism2.languages.insertBefore("bison", "comment", {
      bison: {
        // This should match all the beginning of the file
        // including the prologue(s), the bison declarations and
        // the grammar rules.
        pattern: /^(?:[^%]|%(?!%))*%%[\s\S]*?%%/,
        inside: {
          c: {
            // Allow for one level of nested braces
            pattern: /%\{[\s\S]*?%\}|\{(?:\{[^}]*\}|[^{}])*\}/,
            inside: {
              delimiter: {
                pattern: /^%?\{|%?\}$/,
                alias: "punctuation"
              },
              "bison-variable": {
                pattern: /[$@](?:<[^\s>]+>)?[\w$]+/,
                alias: "variable",
                inside: {
                  punctuation: /<|>/
                }
              },
              rest: Prism2.languages.c
            }
          },
          comment: Prism2.languages.c.comment,
          string: Prism2.languages.c.string,
          property: /\S+(?=:)/,
          keyword: /%\w+/,
          number: {
            pattern: /(^|[^@])\b(?:0x[\da-f]+|\d+)/i,
            lookbehind: true
          },
          punctuation: /%[%?]|[|:;\[\]<>]/
        }
      }
    });
  }
  return bison_1;
}
var bnf_1;
var hasRequiredBnf;
function requireBnf() {
  if (hasRequiredBnf) return bnf_1;
  hasRequiredBnf = 1;
  bnf_1 = bnf;
  bnf.displayName = "bnf";
  bnf.aliases = ["rbnf"];
  function bnf(Prism2) {
    Prism2.languages.bnf = {
      string: {
        pattern: /"[^\r\n"]*"|'[^\r\n']*'/
      },
      definition: {
        pattern: /<[^<>\r\n\t]+>(?=\s*::=)/,
        alias: ["rule", "keyword"],
        inside: {
          punctuation: /^<|>$/
        }
      },
      rule: {
        pattern: /<[^<>\r\n\t]+>/,
        inside: {
          punctuation: /^<|>$/
        }
      },
      operator: /::=|[|()[\]{}*+?]|\.{3}/
    };
    Prism2.languages.rbnf = Prism2.languages.bnf;
  }
  return bnf_1;
}
var brainfuck_1;
var hasRequiredBrainfuck;
function requireBrainfuck() {
  if (hasRequiredBrainfuck) return brainfuck_1;
  hasRequiredBrainfuck = 1;
  brainfuck_1 = brainfuck;
  brainfuck.displayName = "brainfuck";
  brainfuck.aliases = [];
  function brainfuck(Prism2) {
    Prism2.languages.brainfuck = {
      pointer: {
        pattern: /<|>/,
        alias: "keyword"
      },
      increment: {
        pattern: /\+/,
        alias: "inserted"
      },
      decrement: {
        pattern: /-/,
        alias: "deleted"
      },
      branching: {
        pattern: /\[|\]/,
        alias: "important"
      },
      operator: /[.,]/,
      comment: /\S+/
    };
  }
  return brainfuck_1;
}
var brightscript_1;
var hasRequiredBrightscript;
function requireBrightscript() {
  if (hasRequiredBrightscript) return brightscript_1;
  hasRequiredBrightscript = 1;
  brightscript_1 = brightscript;
  brightscript.displayName = "brightscript";
  brightscript.aliases = [];
  function brightscript(Prism2) {
    Prism2.languages.brightscript = {
      comment: /(?:\brem|').*/i,
      "directive-statement": {
        pattern: /(^[\t ]*)#(?:const|else(?:[\t ]+if)?|end[\t ]+if|error|if).*/im,
        lookbehind: true,
        alias: "property",
        inside: {
          "error-message": {
            pattern: /(^#error).+/,
            lookbehind: true
          },
          directive: {
            pattern: /^#(?:const|else(?:[\t ]+if)?|end[\t ]+if|error|if)/,
            alias: "keyword"
          },
          expression: {
            pattern: /[\s\S]+/,
            inside: null
            // see below
          }
        }
      },
      property: {
        pattern: /([\r\n{,][\t ]*)(?:(?!\d)\w+|"(?:[^"\r\n]|"")*"(?!"))(?=[ \t]*:)/,
        lookbehind: true,
        greedy: true
      },
      string: {
        pattern: /"(?:[^"\r\n]|"")*"(?!")/,
        greedy: true
      },
      "class-name": {
        pattern: /(\bAs[\t ]+)\w+/i,
        lookbehind: true
      },
      keyword: /\b(?:As|Dim|Each|Else|Elseif|End|Exit|For|Function|Goto|If|In|Print|Return|Step|Stop|Sub|Then|To|While)\b/i,
      boolean: /\b(?:false|true)\b/i,
      function: /\b(?!\d)\w+(?=[\t ]*\()/,
      number: /(?:\b\d+(?:\.\d+)?(?:[ed][+-]\d+)?|&h[a-f\d]+)\b[%&!#]?/i,
      operator: /--|\+\+|>>=?|<<=?|<>|[-+*/\\<>]=?|[:^=?]|\b(?:and|mod|not|or)\b/i,
      punctuation: /[.,;()[\]{}]/,
      constant: /\b(?:LINE_NUM)\b/i
    };
    Prism2.languages.brightscript["directive-statement"].inside.expression.inside = Prism2.languages.brightscript;
  }
  return brightscript_1;
}
var bro_1;
var hasRequiredBro;
function requireBro() {
  if (hasRequiredBro) return bro_1;
  hasRequiredBro = 1;
  bro_1 = bro;
  bro.displayName = "bro";
  bro.aliases = [];
  function bro(Prism2) {
    Prism2.languages.bro = {
      comment: {
        pattern: /(^|[^\\$])#.*/,
        lookbehind: true,
        inside: {
          italic: /\b(?:FIXME|TODO|XXX)\b/
        }
      },
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      boolean: /\b[TF]\b/,
      function: {
        pattern: /(\b(?:event|function|hook)[ \t]+)\w+(?:::\w+)?/,
        lookbehind: true
      },
      builtin: /(?:@(?:load(?:-(?:plugin|sigs))?|unload|prefixes|ifn?def|else|(?:end)?if|DIR|FILENAME))|(?:&?(?:add_func|create_expire|default|delete_func|encrypt|error_handler|expire_func|group|log|mergeable|optional|persistent|priority|raw_output|read_expire|redef|rotate_interval|rotate_size|synchronized|type_column|write_expire))/,
      constant: {
        pattern: /(\bconst[ \t]+)\w+/i,
        lookbehind: true
      },
      keyword: /\b(?:add|addr|alarm|any|bool|break|const|continue|count|delete|double|else|enum|event|export|file|for|function|global|hook|if|in|int|interval|local|module|next|of|opaque|pattern|port|print|record|return|schedule|set|string|subnet|table|time|timeout|using|vector|when)\b/,
      operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&|\|\|?|\?|\*|\/|~|\^|%/,
      number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      punctuation: /[{}[\];(),.:]/
    };
  }
  return bro_1;
}
var bsl_1;
var hasRequiredBsl;
function requireBsl() {
  if (hasRequiredBsl) return bsl_1;
  hasRequiredBsl = 1;
  bsl_1 = bsl;
  bsl.displayName = "bsl";
  bsl.aliases = [];
  function bsl(Prism2) {
    Prism2.languages.bsl = {
      comment: /\/\/.*/,
      string: [
        // Строки
        // Strings
        {
          pattern: /"(?:[^"]|"")*"(?!")/,
          greedy: true
        },
        // Дата и время
        // Date & time
        {
          pattern: /'(?:[^'\r\n\\]|\\.)*'/
        }
      ],
      keyword: [
        {
          // RU
          pattern: /(^|[^\w\u0400-\u0484\u0487-\u052f\u1d2b\u1d78\u2de0-\u2dff\ua640-\ua69f\ufe2e\ufe2f])(?:пока|для|новый|прервать|попытка|исключение|вызватьисключение|иначе|конецпопытки|неопределено|функция|перем|возврат|конецфункции|если|иначеесли|процедура|конецпроцедуры|тогда|знач|экспорт|конецесли|из|каждого|истина|ложь|по|цикл|конеццикла|выполнить)(?![\w\u0400-\u0484\u0487-\u052f\u1d2b\u1d78\u2de0-\u2dff\ua640-\ua69f\ufe2e\ufe2f])/i,
          lookbehind: true
        },
        {
          // EN
          pattern: /\b(?:break|do|each|else|elseif|enddo|endfunction|endif|endprocedure|endtry|except|execute|export|false|for|function|if|in|new|null|procedure|raise|return|then|to|true|try|undefined|val|var|while)\b/i
        }
      ],
      number: {
        pattern: /(^(?=\d)|[^\w\u0400-\u0484\u0487-\u052f\u1d2b\u1d78\u2de0-\u2dff\ua640-\ua69f\ufe2e\ufe2f])(?:\d+(?:\.\d*)?|\.\d+)(?:E[+-]?\d+)?/i,
        lookbehind: true
      },
      operator: [
        /[<>+\-*/]=?|[%=]/,
        // RU
        {
          pattern: /(^|[^\w\u0400-\u0484\u0487-\u052f\u1d2b\u1d78\u2de0-\u2dff\ua640-\ua69f\ufe2e\ufe2f])(?:и|или|не)(?![\w\u0400-\u0484\u0487-\u052f\u1d2b\u1d78\u2de0-\u2dff\ua640-\ua69f\ufe2e\ufe2f])/i,
          lookbehind: true
        },
        // EN
        {
          pattern: /\b(?:and|not|or)\b/i
        }
      ],
      punctuation: /\(\.|\.\)|[()\[\]:;,.]/,
      directive: [
        // Теги препроцессора вида &Клиент, &Сервер, ...
        // Preprocessor tags of the type &Client, &Server, ...
        {
          pattern: /^([ \t]*)&.*/m,
          lookbehind: true,
          greedy: true,
          alias: "important"
        },
        // Инструкции препроцессора вида:
        // #Если Сервер Тогда
        // ...
        // #КонецЕсли
        // Preprocessor instructions of the form:
        // #If Server Then
        // ...
        // #EndIf
        {
          pattern: /^([ \t]*)#.*/gm,
          lookbehind: true,
          greedy: true,
          alias: "important"
        }
      ]
    };
    Prism2.languages.oscript = Prism2.languages["bsl"];
  }
  return bsl_1;
}
var cfscript_1;
var hasRequiredCfscript;
function requireCfscript() {
  if (hasRequiredCfscript) return cfscript_1;
  hasRequiredCfscript = 1;
  cfscript_1 = cfscript;
  cfscript.displayName = "cfscript";
  cfscript.aliases = [];
  function cfscript(Prism2) {
    Prism2.languages.cfscript = Prism2.languages.extend("clike", {
      comment: [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: true,
          inside: {
            annotation: {
              pattern: /(?:^|[^.])@[\w\.]+/,
              alias: "punctuation"
            }
          }
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      keyword: /\b(?:abstract|break|catch|component|continue|default|do|else|extends|final|finally|for|function|if|in|include|package|private|property|public|remote|required|rethrow|return|static|switch|throw|try|var|while|xml)\b(?!\s*=)/,
      operator: [
        /\+\+|--|&&|\|\||::|=>|[!=]==|<=?|>=?|[-+*/%&|^!=<>]=?|\?(?:\.|:)?|[?:]/,
        /\b(?:and|contains|eq|equal|eqv|gt|gte|imp|is|lt|lte|mod|not|or|xor)\b/
      ],
      scope: {
        pattern: /\b(?:application|arguments|cgi|client|cookie|local|session|super|this|variables)\b/,
        alias: "global"
      },
      type: {
        pattern: /\b(?:any|array|binary|boolean|date|guid|numeric|query|string|struct|uuid|void|xml)\b/,
        alias: "builtin"
      }
    });
    Prism2.languages.insertBefore("cfscript", "keyword", {
      // This must be declared before keyword because we use "function" inside the lookahead
      "function-variable": {
        pattern: /[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
      }
    });
    delete Prism2.languages.cfscript["class-name"];
    Prism2.languages.cfc = Prism2.languages["cfscript"];
  }
  return cfscript_1;
}
var chaiscript_1;
var hasRequiredChaiscript;
function requireChaiscript() {
  if (hasRequiredChaiscript) return chaiscript_1;
  hasRequiredChaiscript = 1;
  var refractorCpp = requireCpp();
  chaiscript_1 = chaiscript;
  chaiscript.displayName = "chaiscript";
  chaiscript.aliases = [];
  function chaiscript(Prism2) {
    Prism2.register(refractorCpp);
    Prism2.languages.chaiscript = Prism2.languages.extend("clike", {
      string: {
        pattern: /(^|[^\\])'(?:[^'\\]|\\[\s\S])*'/,
        lookbehind: true,
        greedy: true
      },
      "class-name": [
        {
          // e.g. class Rectangle { ... }
          pattern: /(\bclass\s+)\w+/,
          lookbehind: true
        },
        {
          // e.g. attr Rectangle::height, def Rectangle::area() { ... }
          pattern: /(\b(?:attr|def)\s+)\w+(?=\s*::)/,
          lookbehind: true
        }
      ],
      keyword: /\b(?:attr|auto|break|case|catch|class|continue|def|default|else|finally|for|fun|global|if|return|switch|this|try|var|while)\b/,
      number: [Prism2.languages.cpp.number, /\b(?:Infinity|NaN)\b/],
      operator: />>=?|<<=?|\|\||&&|:[:=]?|--|\+\+|[=!<>+\-*/%|&^]=?|[?~]|`[^`\r\n]{1,4}`/
    });
    Prism2.languages.insertBefore("chaiscript", "operator", {
      "parameter-type": {
        // e.g. def foo(int x, Vector y) {...}
        pattern: /([,(]\s*)\w+(?=\s+\w)/,
        lookbehind: true,
        alias: "class-name"
      }
    });
    Prism2.languages.insertBefore("chaiscript", "string", {
      "string-interpolation": {
        pattern: /(^|[^\\])"(?:[^"$\\]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})*"/,
        lookbehind: true,
        greedy: true,
        inside: {
          interpolation: {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\}/,
            lookbehind: true,
            inside: {
              "interpolation-expression": {
                pattern: /(^\$\{)[\s\S]+(?=\}$)/,
                lookbehind: true,
                inside: Prism2.languages.chaiscript
              },
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              }
            }
          },
          string: /[\s\S]+/
        }
      }
    });
  }
  return chaiscript_1;
}
var cil_1;
var hasRequiredCil;
function requireCil() {
  if (hasRequiredCil) return cil_1;
  hasRequiredCil = 1;
  cil_1 = cil;
  cil.displayName = "cil";
  cil.aliases = [];
  function cil(Prism2) {
    Prism2.languages.cil = {
      comment: /\/\/.*/,
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      directive: {
        pattern: /(^|\W)\.[a-z]+(?=\s)/,
        lookbehind: true,
        alias: "class-name"
      },
      // Actually an assembly reference
      variable: /\[[\w\.]+\]/,
      keyword: /\b(?:abstract|ansi|assembly|auto|autochar|beforefieldinit|bool|bstr|byvalstr|catch|char|cil|class|currency|date|decimal|default|enum|error|explicit|extends|extern|famandassem|family|famorassem|final(?:ly)?|float32|float64|hidebysig|u?int(?:8|16|32|64)?|iant|idispatch|implements|import|initonly|instance|interface|iunknown|literal|lpstr|lpstruct|lptstr|lpwstr|managed|method|native(?:Type)?|nested|newslot|object(?:ref)?|pinvokeimpl|private|privatescope|public|reqsecobj|rtspecialname|runtime|sealed|sequential|serializable|specialname|static|string|struct|syschar|tbstr|unicode|unmanagedexp|unsigned|value(?:type)?|variant|virtual|void)\b/,
      function: /\b(?:(?:constrained|no|readonly|tail|unaligned|volatile)\.)?(?:conv\.(?:[iu][1248]?|ovf\.[iu][1248]?(?:\.un)?|r\.un|r4|r8)|ldc\.(?:i4(?:\.\d+|\.[mM]1|\.s)?|i8|r4|r8)|ldelem(?:\.[iu][1248]?|\.r[48]|\.ref|a)?|ldind\.(?:[iu][1248]?|r[48]|ref)|stelem\.?(?:i[1248]?|r[48]|ref)?|stind\.(?:i[1248]?|r[48]|ref)?|end(?:fault|filter|finally)|ldarg(?:\.[0-3s]|a(?:\.s)?)?|ldloc(?:\.\d+|\.s)?|sub(?:\.ovf(?:\.un)?)?|mul(?:\.ovf(?:\.un)?)?|add(?:\.ovf(?:\.un)?)?|stloc(?:\.[0-3s])?|refany(?:type|val)|blt(?:\.un)?(?:\.s)?|ble(?:\.un)?(?:\.s)?|bgt(?:\.un)?(?:\.s)?|bge(?:\.un)?(?:\.s)?|unbox(?:\.any)?|init(?:blk|obj)|call(?:i|virt)?|brfalse(?:\.s)?|bne\.un(?:\.s)?|ldloca(?:\.s)?|brzero(?:\.s)?|brtrue(?:\.s)?|brnull(?:\.s)?|brinst(?:\.s)?|starg(?:\.s)?|leave(?:\.s)?|shr(?:\.un)?|rem(?:\.un)?|div(?:\.un)?|clt(?:\.un)?|alignment|castclass|ldvirtftn|beq(?:\.s)?|ckfinite|ldsflda|ldtoken|localloc|mkrefany|rethrow|cgt\.un|arglist|switch|stsfld|sizeof|newobj|newarr|ldsfld|ldnull|ldflda|isinst|throw|stobj|stfld|ldstr|ldobj|ldlen|ldftn|ldfld|cpobj|cpblk|break|br\.s|xor|shl|ret|pop|not|nop|neg|jmp|dup|cgt|ceq|box|and|or|br)\b/,
      boolean: /\b(?:false|true)\b/,
      number: /\b-?(?:0x[0-9a-f]+|\d+)(?:\.[0-9a-f]+)?\b/i,
      punctuation: /[{}[\];(),:=]|IL_[0-9A-Za-z]+/
    };
  }
  return cil_1;
}
var clojure_1;
var hasRequiredClojure;
function requireClojure() {
  if (hasRequiredClojure) return clojure_1;
  hasRequiredClojure = 1;
  clojure_1 = clojure;
  clojure.displayName = "clojure";
  clojure.aliases = [];
  function clojure(Prism2) {
    Prism2.languages.clojure = {
      comment: {
        pattern: /;.*/,
        greedy: true
      },
      string: {
        pattern: /"(?:[^"\\]|\\.)*"/,
        greedy: true
      },
      char: /\\\w+/,
      symbol: {
        pattern: /(^|[\s()\[\]{},])::?[\w*+!?'<>=/.-]+/,
        lookbehind: true
      },
      keyword: {
        pattern: /(\()(?:-|->|->>|\.|\.\.|\*|\/|\+|<|<=|=|==|>|>=|accessor|agent|agent-errors|aget|alength|all-ns|alter|and|append-child|apply|array-map|aset|aset-boolean|aset-byte|aset-char|aset-double|aset-float|aset-int|aset-long|aset-short|assert|assoc|await|await-for|bean|binding|bit-and|bit-not|bit-or|bit-shift-left|bit-shift-right|bit-xor|boolean|branch\?|butlast|byte|cast|char|children|class|clear-agent-errors|comment|commute|comp|comparator|complement|concat|cond|conj|cons|constantly|construct-proxy|contains\?|count|create-ns|create-struct|cycle|dec|declare|def|def-|definline|definterface|defmacro|defmethod|defmulti|defn|defn-|defonce|defproject|defprotocol|defrecord|defstruct|deftype|deref|difference|disj|dissoc|distinct|do|doall|doc|dorun|doseq|dosync|dotimes|doto|double|down|drop|drop-while|edit|end\?|ensure|eval|every\?|false\?|ffirst|file-seq|filter|find|find-doc|find-ns|find-var|first|float|flush|fn|fnseq|for|frest|gensym|get|get-proxy-class|hash-map|hash-set|identical\?|identity|if|if-let|if-not|import|in-ns|inc|index|insert-child|insert-left|insert-right|inspect-table|inspect-tree|instance\?|int|interleave|intersection|into|into-array|iterate|join|key|keys|keyword|keyword\?|last|lazy-cat|lazy-cons|left|lefts|let|line-seq|list|list\*|load|load-file|locking|long|loop|macroexpand|macroexpand-1|make-array|make-node|map|map-invert|map\?|mapcat|max|max-key|memfn|merge|merge-with|meta|min|min-key|monitor-enter|name|namespace|neg\?|new|newline|next|nil\?|node|not|not-any\?|not-every\?|not=|ns|ns-imports|ns-interns|ns-map|ns-name|ns-publics|ns-refers|ns-resolve|ns-unmap|nth|nthrest|or|parse|partial|path|peek|pop|pos\?|pr|pr-str|print|print-str|println|println-str|prn|prn-str|project|proxy|proxy-mappings|quot|quote|rand|rand-int|range|re-find|re-groups|re-matcher|re-matches|re-pattern|re-seq|read|read-line|recur|reduce|ref|ref-set|refer|rem|remove|remove-method|remove-ns|rename|rename-keys|repeat|replace|replicate|resolve|rest|resultset-seq|reverse|rfirst|right|rights|root|rrest|rseq|second|select|select-keys|send|send-off|seq|seq-zip|seq\?|set|set!|short|slurp|some|sort|sort-by|sorted-map|sorted-map-by|sorted-set|special-symbol\?|split-at|split-with|str|string\?|struct|struct-map|subs|subvec|symbol|symbol\?|sync|take|take-nth|take-while|test|throw|time|to-array|to-array-2d|tree-seq|true\?|try|union|up|update-proxy|val|vals|var|var-get|var-set|var\?|vector|vector-zip|vector\?|when|when-first|when-let|when-not|with-local-vars|with-meta|with-open|with-out-str|xml-seq|xml-zip|zero\?|zipmap|zipper)(?=[\s)]|$)/,
        lookbehind: true
      },
      boolean: /\b(?:false|nil|true)\b/,
      number: {
        pattern: /(^|[^\w$@])(?:\d+(?:[/.]\d+)?(?:e[+-]?\d+)?|0x[a-f0-9]+|[1-9]\d?r[a-z0-9]+)[lmn]?(?![\w$@])/i,
        lookbehind: true
      },
      function: {
        pattern: /((?:^|[^'])\()[\w*+!?'<>=/.-]+(?=[\s)]|$)/,
        lookbehind: true
      },
      operator: /[#@^`~]/,
      punctuation: /[{}\[\](),]/
    };
  }
  return clojure_1;
}
var cmake_1;
var hasRequiredCmake;
function requireCmake() {
  if (hasRequiredCmake) return cmake_1;
  hasRequiredCmake = 1;
  cmake_1 = cmake;
  cmake.displayName = "cmake";
  cmake.aliases = [];
  function cmake(Prism2) {
    Prism2.languages.cmake = {
      comment: /#.*/,
      string: {
        pattern: /"(?:[^\\"]|\\.)*"/,
        greedy: true,
        inside: {
          interpolation: {
            pattern: /\$\{(?:[^{}$]|\$\{[^{}$]*\})*\}/,
            inside: {
              punctuation: /\$\{|\}/,
              variable: /\w+/
            }
          }
        }
      },
      variable: /\b(?:CMAKE_\w+|\w+_(?:(?:BINARY|SOURCE)_DIR|DESCRIPTION|HOMEPAGE_URL|ROOT|VERSION(?:_MAJOR|_MINOR|_PATCH|_TWEAK)?)|(?:ANDROID|APPLE|BORLAND|BUILD_SHARED_LIBS|CACHE|CPACK_(?:ABSOLUTE_DESTINATION_FILES|COMPONENT_INCLUDE_TOPLEVEL_DIRECTORY|ERROR_ON_ABSOLUTE_INSTALL_DESTINATION|INCLUDE_TOPLEVEL_DIRECTORY|INSTALL_DEFAULT_DIRECTORY_PERMISSIONS|INSTALL_SCRIPT|PACKAGING_INSTALL_PREFIX|SET_DESTDIR|WARN_ON_ABSOLUTE_INSTALL_DESTINATION)|CTEST_(?:BINARY_DIRECTORY|BUILD_COMMAND|BUILD_NAME|BZR_COMMAND|BZR_UPDATE_OPTIONS|CHANGE_ID|CHECKOUT_COMMAND|CONFIGURATION_TYPE|CONFIGURE_COMMAND|COVERAGE_COMMAND|COVERAGE_EXTRA_FLAGS|CURL_OPTIONS|CUSTOM_(?:COVERAGE_EXCLUDE|ERROR_EXCEPTION|ERROR_MATCH|ERROR_POST_CONTEXT|ERROR_PRE_CONTEXT|MAXIMUM_FAILED_TEST_OUTPUT_SIZE|MAXIMUM_NUMBER_OF_(?:ERRORS|WARNINGS)|MAXIMUM_PASSED_TEST_OUTPUT_SIZE|MEMCHECK_IGNORE|POST_MEMCHECK|POST_TEST|PRE_MEMCHECK|PRE_TEST|TESTS_IGNORE|WARNING_EXCEPTION|WARNING_MATCH)|CVS_CHECKOUT|CVS_COMMAND|CVS_UPDATE_OPTIONS|DROP_LOCATION|DROP_METHOD|DROP_SITE|DROP_SITE_CDASH|DROP_SITE_PASSWORD|DROP_SITE_USER|EXTRA_COVERAGE_GLOB|GIT_COMMAND|GIT_INIT_SUBMODULES|GIT_UPDATE_CUSTOM|GIT_UPDATE_OPTIONS|HG_COMMAND|HG_UPDATE_OPTIONS|LABELS_FOR_SUBPROJECTS|MEMORYCHECK_(?:COMMAND|COMMAND_OPTIONS|SANITIZER_OPTIONS|SUPPRESSIONS_FILE|TYPE)|NIGHTLY_START_TIME|P4_CLIENT|P4_COMMAND|P4_OPTIONS|P4_UPDATE_OPTIONS|RUN_CURRENT_SCRIPT|SCP_COMMAND|SITE|SOURCE_DIRECTORY|SUBMIT_URL|SVN_COMMAND|SVN_OPTIONS|SVN_UPDATE_OPTIONS|TEST_LOAD|TEST_TIMEOUT|TRIGGER_SITE|UPDATE_COMMAND|UPDATE_OPTIONS|UPDATE_VERSION_ONLY|USE_LAUNCHERS)|CYGWIN|ENV|EXECUTABLE_OUTPUT_PATH|GHS-MULTI|IOS|LIBRARY_OUTPUT_PATH|MINGW|MSVC(?:10|11|12|14|60|70|71|80|90|_IDE|_TOOLSET_VERSION|_VERSION)?|MSYS|PROJECT_(?:BINARY_DIR|DESCRIPTION|HOMEPAGE_URL|NAME|SOURCE_DIR|VERSION|VERSION_(?:MAJOR|MINOR|PATCH|TWEAK))|UNIX|WIN32|WINCE|WINDOWS_PHONE|WINDOWS_STORE|XCODE|XCODE_VERSION))\b/,
      property: /\b(?:cxx_\w+|(?:ARCHIVE_OUTPUT_(?:DIRECTORY|NAME)|COMPILE_DEFINITIONS|COMPILE_PDB_NAME|COMPILE_PDB_OUTPUT_DIRECTORY|EXCLUDE_FROM_DEFAULT_BUILD|IMPORTED_(?:IMPLIB|LIBNAME|LINK_DEPENDENT_LIBRARIES|LINK_INTERFACE_LANGUAGES|LINK_INTERFACE_LIBRARIES|LINK_INTERFACE_MULTIPLICITY|LOCATION|NO_SONAME|OBJECTS|SONAME)|INTERPROCEDURAL_OPTIMIZATION|LIBRARY_OUTPUT_DIRECTORY|LIBRARY_OUTPUT_NAME|LINK_FLAGS|LINK_INTERFACE_LIBRARIES|LINK_INTERFACE_MULTIPLICITY|LOCATION|MAP_IMPORTED_CONFIG|OSX_ARCHITECTURES|OUTPUT_NAME|PDB_NAME|PDB_OUTPUT_DIRECTORY|RUNTIME_OUTPUT_DIRECTORY|RUNTIME_OUTPUT_NAME|STATIC_LIBRARY_FLAGS|VS_CSHARP|VS_DOTNET_REFERENCEPROP|VS_DOTNET_REFERENCE|VS_GLOBAL_SECTION_POST|VS_GLOBAL_SECTION_PRE|VS_GLOBAL|XCODE_ATTRIBUTE)_\w+|\w+_(?:CLANG_TIDY|COMPILER_LAUNCHER|CPPCHECK|CPPLINT|INCLUDE_WHAT_YOU_USE|OUTPUT_NAME|POSTFIX|VISIBILITY_PRESET)|ABSTRACT|ADDITIONAL_MAKE_CLEAN_FILES|ADVANCED|ALIASED_TARGET|ALLOW_DUPLICATE_CUSTOM_TARGETS|ANDROID_(?:ANT_ADDITIONAL_OPTIONS|API|API_MIN|ARCH|ASSETS_DIRECTORIES|GUI|JAR_DEPENDENCIES|NATIVE_LIB_DEPENDENCIES|NATIVE_LIB_DIRECTORIES|PROCESS_MAX|PROGUARD|PROGUARD_CONFIG_PATH|SECURE_PROPS_PATH|SKIP_ANT_STEP|STL_TYPE)|ARCHIVE_OUTPUT_DIRECTORY|ATTACHED_FILES|ATTACHED_FILES_ON_FAIL|AUTOGEN_(?:BUILD_DIR|ORIGIN_DEPENDS|PARALLEL|SOURCE_GROUP|TARGETS_FOLDER|TARGET_DEPENDS)|AUTOMOC|AUTOMOC_(?:COMPILER_PREDEFINES|DEPEND_FILTERS|EXECUTABLE|MACRO_NAMES|MOC_OPTIONS|SOURCE_GROUP|TARGETS_FOLDER)|AUTORCC|AUTORCC_EXECUTABLE|AUTORCC_OPTIONS|AUTORCC_SOURCE_GROUP|AUTOUIC|AUTOUIC_EXECUTABLE|AUTOUIC_OPTIONS|AUTOUIC_SEARCH_PATHS|BINARY_DIR|BUILDSYSTEM_TARGETS|BUILD_RPATH|BUILD_RPATH_USE_ORIGIN|BUILD_WITH_INSTALL_NAME_DIR|BUILD_WITH_INSTALL_RPATH|BUNDLE|BUNDLE_EXTENSION|CACHE_VARIABLES|CLEAN_NO_CUSTOM|COMMON_LANGUAGE_RUNTIME|COMPATIBLE_INTERFACE_(?:BOOL|NUMBER_MAX|NUMBER_MIN|STRING)|COMPILE_(?:DEFINITIONS|FEATURES|FLAGS|OPTIONS|PDB_NAME|PDB_OUTPUT_DIRECTORY)|COST|CPACK_DESKTOP_SHORTCUTS|CPACK_NEVER_OVERWRITE|CPACK_PERMANENT|CPACK_STARTUP_SHORTCUTS|CPACK_START_MENU_SHORTCUTS|CPACK_WIX_ACL|CROSSCOMPILING_EMULATOR|CUDA_EXTENSIONS|CUDA_PTX_COMPILATION|CUDA_RESOLVE_DEVICE_SYMBOLS|CUDA_SEPARABLE_COMPILATION|CUDA_STANDARD|CUDA_STANDARD_REQUIRED|CXX_EXTENSIONS|CXX_STANDARD|CXX_STANDARD_REQUIRED|C_EXTENSIONS|C_STANDARD|C_STANDARD_REQUIRED|DEBUG_CONFIGURATIONS|DEFINE_SYMBOL|DEFINITIONS|DEPENDS|DEPLOYMENT_ADDITIONAL_FILES|DEPLOYMENT_REMOTE_DIRECTORY|DISABLED|DISABLED_FEATURES|ECLIPSE_EXTRA_CPROJECT_CONTENTS|ECLIPSE_EXTRA_NATURES|ENABLED_FEATURES|ENABLED_LANGUAGES|ENABLE_EXPORTS|ENVIRONMENT|EXCLUDE_FROM_ALL|EXCLUDE_FROM_DEFAULT_BUILD|EXPORT_NAME|EXPORT_PROPERTIES|EXTERNAL_OBJECT|EchoString|FAIL_REGULAR_EXPRESSION|FIND_LIBRARY_USE_LIB32_PATHS|FIND_LIBRARY_USE_LIB64_PATHS|FIND_LIBRARY_USE_LIBX32_PATHS|FIND_LIBRARY_USE_OPENBSD_VERSIONING|FIXTURES_CLEANUP|FIXTURES_REQUIRED|FIXTURES_SETUP|FOLDER|FRAMEWORK|Fortran_FORMAT|Fortran_MODULE_DIRECTORY|GENERATED|GENERATOR_FILE_NAME|GENERATOR_IS_MULTI_CONFIG|GHS_INTEGRITY_APP|GHS_NO_SOURCE_GROUP_FILE|GLOBAL_DEPENDS_DEBUG_MODE|GLOBAL_DEPENDS_NO_CYCLES|GNUtoMS|HAS_CXX|HEADER_FILE_ONLY|HELPSTRING|IMPLICIT_DEPENDS_INCLUDE_TRANSFORM|IMPORTED|IMPORTED_(?:COMMON_LANGUAGE_RUNTIME|CONFIGURATIONS|GLOBAL|IMPLIB|LIBNAME|LINK_DEPENDENT_LIBRARIES|LINK_INTERFACE_(?:LANGUAGES|LIBRARIES|MULTIPLICITY)|LOCATION|NO_SONAME|OBJECTS|SONAME)|IMPORT_PREFIX|IMPORT_SUFFIX|INCLUDE_DIRECTORIES|INCLUDE_REGULAR_EXPRESSION|INSTALL_NAME_DIR|INSTALL_RPATH|INSTALL_RPATH_USE_LINK_PATH|INTERFACE_(?:AUTOUIC_OPTIONS|COMPILE_DEFINITIONS|COMPILE_FEATURES|COMPILE_OPTIONS|INCLUDE_DIRECTORIES|LINK_DEPENDS|LINK_DIRECTORIES|LINK_LIBRARIES|LINK_OPTIONS|POSITION_INDEPENDENT_CODE|SOURCES|SYSTEM_INCLUDE_DIRECTORIES)|INTERPROCEDURAL_OPTIMIZATION|IN_TRY_COMPILE|IOS_INSTALL_COMBINED|JOB_POOLS|JOB_POOL_COMPILE|JOB_POOL_LINK|KEEP_EXTENSION|LABELS|LANGUAGE|LIBRARY_OUTPUT_DIRECTORY|LINKER_LANGUAGE|LINK_(?:DEPENDS|DEPENDS_NO_SHARED|DIRECTORIES|FLAGS|INTERFACE_LIBRARIES|INTERFACE_MULTIPLICITY|LIBRARIES|OPTIONS|SEARCH_END_STATIC|SEARCH_START_STATIC|WHAT_YOU_USE)|LISTFILE_STACK|LOCATION|MACOSX_BUNDLE|MACOSX_BUNDLE_INFO_PLIST|MACOSX_FRAMEWORK_INFO_PLIST|MACOSX_PACKAGE_LOCATION|MACOSX_RPATH|MACROS|MANUALLY_ADDED_DEPENDENCIES|MEASUREMENT|MODIFIED|NAME|NO_SONAME|NO_SYSTEM_FROM_IMPORTED|OBJECT_DEPENDS|OBJECT_OUTPUTS|OSX_ARCHITECTURES|OUTPUT_NAME|PACKAGES_FOUND|PACKAGES_NOT_FOUND|PARENT_DIRECTORY|PASS_REGULAR_EXPRESSION|PDB_NAME|PDB_OUTPUT_DIRECTORY|POSITION_INDEPENDENT_CODE|POST_INSTALL_SCRIPT|PREDEFINED_TARGETS_FOLDER|PREFIX|PRE_INSTALL_SCRIPT|PRIVATE_HEADER|PROCESSORS|PROCESSOR_AFFINITY|PROJECT_LABEL|PUBLIC_HEADER|REPORT_UNDEFINED_PROPERTIES|REQUIRED_FILES|RESOURCE|RESOURCE_LOCK|RULE_LAUNCH_COMPILE|RULE_LAUNCH_CUSTOM|RULE_LAUNCH_LINK|RULE_MESSAGES|RUNTIME_OUTPUT_DIRECTORY|RUN_SERIAL|SKIP_AUTOGEN|SKIP_AUTOMOC|SKIP_AUTORCC|SKIP_AUTOUIC|SKIP_BUILD_RPATH|SKIP_RETURN_CODE|SOURCES|SOURCE_DIR|SOVERSION|STATIC_LIBRARY_FLAGS|STATIC_LIBRARY_OPTIONS|STRINGS|SUBDIRECTORIES|SUFFIX|SYMBOLIC|TARGET_ARCHIVES_MAY_BE_SHARED_LIBS|TARGET_MESSAGES|TARGET_SUPPORTS_SHARED_LIBS|TESTS|TEST_INCLUDE_FILE|TEST_INCLUDE_FILES|TIMEOUT|TIMEOUT_AFTER_MATCH|TYPE|USE_FOLDERS|VALUE|VARIABLES|VERSION|VISIBILITY_INLINES_HIDDEN|VS_(?:CONFIGURATION_TYPE|COPY_TO_OUT_DIR|DEBUGGER_(?:COMMAND|COMMAND_ARGUMENTS|ENVIRONMENT|WORKING_DIRECTORY)|DEPLOYMENT_CONTENT|DEPLOYMENT_LOCATION|DOTNET_REFERENCES|DOTNET_REFERENCES_COPY_LOCAL|GLOBAL_KEYWORD|GLOBAL_PROJECT_TYPES|GLOBAL_ROOTNAMESPACE|INCLUDE_IN_VSIX|IOT_STARTUP_TASK|KEYWORD|RESOURCE_GENERATOR|SCC_AUXPATH|SCC_LOCALPATH|SCC_PROJECTNAME|SCC_PROVIDER|SDK_REFERENCES|SHADER_(?:DISABLE_OPTIMIZATIONS|ENABLE_DEBUG|ENTRYPOINT|FLAGS|MODEL|OBJECT_FILE_NAME|OUTPUT_HEADER_FILE|TYPE|VARIABLE_NAME)|STARTUP_PROJECT|TOOL_OVERRIDE|USER_PROPS|WINRT_COMPONENT|WINRT_EXTENSIONS|WINRT_REFERENCES|XAML_TYPE)|WILL_FAIL|WIN32_EXECUTABLE|WINDOWS_EXPORT_ALL_SYMBOLS|WORKING_DIRECTORY|WRAP_EXCLUDE|XCODE_(?:EMIT_EFFECTIVE_PLATFORM_NAME|EXPLICIT_FILE_TYPE|FILE_ATTRIBUTES|LAST_KNOWN_FILE_TYPE|PRODUCT_TYPE|SCHEME_(?:ADDRESS_SANITIZER|ADDRESS_SANITIZER_USE_AFTER_RETURN|ARGUMENTS|DISABLE_MAIN_THREAD_CHECKER|DYNAMIC_LIBRARY_LOADS|DYNAMIC_LINKER_API_USAGE|ENVIRONMENT|EXECUTABLE|GUARD_MALLOC|MAIN_THREAD_CHECKER_STOP|MALLOC_GUARD_EDGES|MALLOC_SCRIBBLE|MALLOC_STACK|THREAD_SANITIZER(?:_STOP)?|UNDEFINED_BEHAVIOUR_SANITIZER(?:_STOP)?|ZOMBIE_OBJECTS))|XCTEST)\b/,
      keyword: /\b(?:add_compile_definitions|add_compile_options|add_custom_command|add_custom_target|add_definitions|add_dependencies|add_executable|add_library|add_link_options|add_subdirectory|add_test|aux_source_directory|break|build_command|build_name|cmake_host_system_information|cmake_minimum_required|cmake_parse_arguments|cmake_policy|configure_file|continue|create_test_sourcelist|ctest_build|ctest_configure|ctest_coverage|ctest_empty_binary_directory|ctest_memcheck|ctest_read_custom_files|ctest_run_script|ctest_sleep|ctest_start|ctest_submit|ctest_test|ctest_update|ctest_upload|define_property|else|elseif|enable_language|enable_testing|endforeach|endfunction|endif|endmacro|endwhile|exec_program|execute_process|export|export_library_dependencies|file|find_file|find_library|find_package|find_path|find_program|fltk_wrap_ui|foreach|function|get_cmake_property|get_directory_property|get_filename_component|get_property|get_source_file_property|get_target_property|get_test_property|if|include|include_directories|include_external_msproject|include_guard|include_regular_expression|install|install_files|install_programs|install_targets|link_directories|link_libraries|list|load_cache|load_command|macro|make_directory|mark_as_advanced|math|message|option|output_required_files|project|qt_wrap_cpp|qt_wrap_ui|remove|remove_definitions|return|separate_arguments|set|set_directory_properties|set_property|set_source_files_properties|set_target_properties|set_tests_properties|site_name|source_group|string|subdir_depends|subdirs|target_compile_definitions|target_compile_features|target_compile_options|target_include_directories|target_link_directories|target_link_libraries|target_link_options|target_sources|try_compile|try_run|unset|use_mangled_mesa|utility_source|variable_requires|variable_watch|while|write_file)(?=\s*\()\b/,
      boolean: /\b(?:FALSE|OFF|ON|TRUE)\b/,
      namespace: /\b(?:INTERFACE|PRIVATE|PROPERTIES|PUBLIC|SHARED|STATIC|TARGET_OBJECTS)\b/,
      operator: /\b(?:AND|DEFINED|EQUAL|GREATER|LESS|MATCHES|NOT|OR|STREQUAL|STRGREATER|STRLESS|VERSION_EQUAL|VERSION_GREATER|VERSION_LESS)\b/,
      inserted: {
        pattern: /\b\w+::\w+\b/,
        alias: "class-name"
      },
      number: /\b\d+(?:\.\d+)*\b/,
      function: /\b[a-z_]\w*(?=\s*\()\b/i,
      punctuation: /[()>}]|\$[<{]/
    };
  }
  return cmake_1;
}
var cobol_1;
var hasRequiredCobol;
function requireCobol() {
  if (hasRequiredCobol) return cobol_1;
  hasRequiredCobol = 1;
  cobol_1 = cobol;
  cobol.displayName = "cobol";
  cobol.aliases = [];
  function cobol(Prism2) {
    Prism2.languages.cobol = {
      comment: {
        pattern: /\*>.*|(^[ \t]*)\*.*/m,
        lookbehind: true,
        greedy: true
      },
      string: {
        pattern: /[xzgn]?(?:"(?:[^\r\n"]|"")*"(?!")|'(?:[^\r\n']|'')*'(?!'))/i,
        greedy: true
      },
      level: {
        pattern: /(^[ \t]*)\d+\b/m,
        lookbehind: true,
        greedy: true,
        alias: "number"
      },
      "class-name": {
        // https://github.com/antlr/grammars-v4/blob/42edd5b687d183b5fa679e858a82297bd27141e7/cobol85/Cobol85.g4#L1015
        pattern: /(\bpic(?:ture)?\s+)(?:(?:[-\w$/,:*+<>]|\.(?!\s|$))(?:\(\d+\))?)+/i,
        lookbehind: true,
        inside: {
          number: {
            pattern: /(\()\d+/,
            lookbehind: true
          },
          punctuation: /[()]/
        }
      },
      keyword: {
        pattern: /(^|[^\w-])(?:ABORT|ACCEPT|ACCESS|ADD|ADDRESS|ADVANCING|AFTER|ALIGNED|ALL|ALPHABET|ALPHABETIC|ALPHABETIC-LOWER|ALPHABETIC-UPPER|ALPHANUMERIC|ALPHANUMERIC-EDITED|ALSO|ALTER|ALTERNATE|ANY|ARE|AREA|AREAS|AS|ASCENDING|ASCII|ASSIGN|ASSOCIATED-DATA|ASSOCIATED-DATA-LENGTH|AT|ATTRIBUTE|AUTHOR|AUTO|AUTO-SKIP|BACKGROUND-COLOR|BACKGROUND-COLOUR|BASIS|BEEP|BEFORE|BEGINNING|BELL|BINARY|BIT|BLANK|BLINK|BLOCK|BOTTOM|BOUNDS|BY|BYFUNCTION|BYTITLE|CALL|CANCEL|CAPABLE|CCSVERSION|CD|CF|CH|CHAINING|CHANGED|CHANNEL|CHARACTER|CHARACTERS|CLASS|CLASS-ID|CLOCK-UNITS|CLOSE|CLOSE-DISPOSITION|COBOL|CODE|CODE-SET|COL|COLLATING|COLUMN|COM-REG|COMMA|COMMITMENT|COMMON|COMMUNICATION|COMP|COMP-1|COMP-2|COMP-3|COMP-4|COMP-5|COMPUTATIONAL|COMPUTATIONAL-1|COMPUTATIONAL-2|COMPUTATIONAL-3|COMPUTATIONAL-4|COMPUTATIONAL-5|COMPUTE|CONFIGURATION|CONTAINS|CONTENT|CONTINUE|CONTROL|CONTROL-POINT|CONTROLS|CONVENTION|CONVERTING|COPY|CORR|CORRESPONDING|COUNT|CRUNCH|CURRENCY|CURSOR|DATA|DATA-BASE|DATE|DATE-COMPILED|DATE-WRITTEN|DAY|DAY-OF-WEEK|DBCS|DE|DEBUG-CONTENTS|DEBUG-ITEM|DEBUG-LINE|DEBUG-NAME|DEBUG-SUB-1|DEBUG-SUB-2|DEBUG-SUB-3|DEBUGGING|DECIMAL-POINT|DECLARATIVES|DEFAULT|DEFAULT-DISPLAY|DEFINITION|DELETE|DELIMITED|DELIMITER|DEPENDING|DESCENDING|DESTINATION|DETAIL|DFHRESP|DFHVALUE|DISABLE|DISK|DISPLAY|DISPLAY-1|DIVIDE|DIVISION|DONTCARE|DOUBLE|DOWN|DUPLICATES|DYNAMIC|EBCDIC|EGCS|EGI|ELSE|EMI|EMPTY-CHECK|ENABLE|END|END-ACCEPT|END-ADD|END-CALL|END-COMPUTE|END-DELETE|END-DIVIDE|END-EVALUATE|END-IF|END-MULTIPLY|END-OF-PAGE|END-PERFORM|END-READ|END-RECEIVE|END-RETURN|END-REWRITE|END-SEARCH|END-START|END-STRING|END-SUBTRACT|END-UNSTRING|END-WRITE|ENDING|ENTER|ENTRY|ENTRY-PROCEDURE|ENVIRONMENT|EOL|EOP|EOS|ERASE|ERROR|ESCAPE|ESI|EVALUATE|EVENT|EVERY|EXCEPTION|EXCLUSIVE|EXHIBIT|EXIT|EXPORT|EXTEND|EXTENDED|EXTERNAL|FD|FILE|FILE-CONTROL|FILLER|FINAL|FIRST|FOOTING|FOR|FOREGROUND-COLOR|FOREGROUND-COLOUR|FROM|FULL|FUNCTION|FUNCTION-POINTER|FUNCTIONNAME|GENERATE|GIVING|GLOBAL|GO|GOBACK|GRID|GROUP|HEADING|HIGH-VALUE|HIGH-VALUES|HIGHLIGHT|I-O|I-O-CONTROL|ID|IDENTIFICATION|IF|IMPLICIT|IMPORT|IN|INDEX|INDEXED|INDICATE|INITIAL|INITIALIZE|INITIATE|INPUT|INPUT-OUTPUT|INSPECT|INSTALLATION|INTEGER|INTO|INVALID|INVOKE|IS|JUST|JUSTIFIED|KANJI|KEPT|KEY|KEYBOARD|LABEL|LANGUAGE|LAST|LB|LD|LEADING|LEFT|LEFTLINE|LENGTH|LENGTH-CHECK|LIBACCESS|LIBPARAMETER|LIBRARY|LIMIT|LIMITS|LINAGE|LINAGE-COUNTER|LINE|LINE-COUNTER|LINES|LINKAGE|LIST|LOCAL|LOCAL-STORAGE|LOCK|LONG-DATE|LONG-TIME|LOW-VALUE|LOW-VALUES|LOWER|LOWLIGHT|MEMORY|MERGE|MESSAGE|MMDDYYYY|MODE|MODULES|MORE-LABELS|MOVE|MULTIPLE|MULTIPLY|NAMED|NATIONAL|NATIONAL-EDITED|NATIVE|NEGATIVE|NETWORK|NEXT|NO|NO-ECHO|NULL|NULLS|NUMBER|NUMERIC|NUMERIC-DATE|NUMERIC-EDITED|NUMERIC-TIME|OBJECT-COMPUTER|OCCURS|ODT|OF|OFF|OMITTED|ON|OPEN|OPTIONAL|ORDER|ORDERLY|ORGANIZATION|OTHER|OUTPUT|OVERFLOW|OVERLINE|OWN|PACKED-DECIMAL|PADDING|PAGE|PAGE-COUNTER|PASSWORD|PERFORM|PF|PH|PIC|PICTURE|PLUS|POINTER|PORT|POSITION|POSITIVE|PRINTER|PRINTING|PRIVATE|PROCEDURE|PROCEDURE-POINTER|PROCEDURES|PROCEED|PROCESS|PROGRAM|PROGRAM-ID|PROGRAM-LIBRARY|PROMPT|PURGE|QUEUE|QUOTE|QUOTES|RANDOM|RD|READ|READER|REAL|RECEIVE|RECEIVED|RECORD|RECORDING|RECORDS|RECURSIVE|REDEFINES|REEL|REF|REFERENCE|REFERENCES|RELATIVE|RELEASE|REMAINDER|REMARKS|REMOTE|REMOVAL|REMOVE|RENAMES|REPLACE|REPLACING|REPORT|REPORTING|REPORTS|REQUIRED|RERUN|RESERVE|RESET|RETURN|RETURN-CODE|RETURNING|REVERSE-VIDEO|REVERSED|REWIND|REWRITE|RF|RH|RIGHT|ROUNDED|RUN|SAME|SAVE|SCREEN|SD|SEARCH|SECTION|SECURE|SECURITY|SEGMENT|SEGMENT-LIMIT|SELECT|SEND|SENTENCE|SEPARATE|SEQUENCE|SEQUENTIAL|SET|SHARED|SHAREDBYALL|SHAREDBYRUNUNIT|SHARING|SHIFT-IN|SHIFT-OUT|SHORT-DATE|SIGN|SIZE|SORT|SORT-CONTROL|SORT-CORE-SIZE|SORT-FILE-SIZE|SORT-MERGE|SORT-MESSAGE|SORT-MODE-SIZE|SORT-RETURN|SOURCE|SOURCE-COMPUTER|SPACE|SPACES|SPECIAL-NAMES|STANDARD|STANDARD-1|STANDARD-2|START|STATUS|STOP|STRING|SUB-QUEUE-1|SUB-QUEUE-2|SUB-QUEUE-3|SUBTRACT|SUM|SUPPRESS|SYMBOL|SYMBOLIC|SYNC|SYNCHRONIZED|TABLE|TALLY|TALLYING|TAPE|TASK|TERMINAL|TERMINATE|TEST|TEXT|THEN|THREAD|THREAD-LOCAL|THROUGH|THRU|TIME|TIMER|TIMES|TITLE|TO|TODAYS-DATE|TODAYS-NAME|TOP|TRAILING|TRUNCATED|TYPE|TYPEDEF|UNDERLINE|UNIT|UNSTRING|UNTIL|UP|UPON|USAGE|USE|USING|VALUE|VALUES|VARYING|VIRTUAL|WAIT|WHEN|WHEN-COMPILED|WITH|WORDS|WORKING-STORAGE|WRITE|YEAR|YYYYDDD|YYYYMMDD|ZERO-FILL|ZEROES|ZEROS)(?![\w-])/i,
        lookbehind: true
      },
      boolean: {
        pattern: /(^|[^\w-])(?:false|true)(?![\w-])/i,
        lookbehind: true
      },
      number: {
        pattern: /(^|[^\w-])(?:[+-]?(?:(?:\d+(?:[.,]\d+)?|[.,]\d+)(?:e[+-]?\d+)?|zero))(?![\w-])/i,
        lookbehind: true
      },
      operator: [
        /<>|[<>]=?|[=+*/&]/,
        {
          pattern: /(^|[^\w-])(?:-|and|equal|greater|less|not|or|than)(?![\w-])/i,
          lookbehind: true
        }
      ],
      punctuation: /[.:,()]/
    };
  }
  return cobol_1;
}
var coffeescript_1;
var hasRequiredCoffeescript;
function requireCoffeescript() {
  if (hasRequiredCoffeescript) return coffeescript_1;
  hasRequiredCoffeescript = 1;
  coffeescript_1 = coffeescript;
  coffeescript.displayName = "coffeescript";
  coffeescript.aliases = ["coffee"];
  function coffeescript(Prism2) {
    (function(Prism3) {
      var comment = /#(?!\{).+/;
      var interpolation = {
        pattern: /#\{[^}]+\}/,
        alias: "variable"
      };
      Prism3.languages.coffeescript = Prism3.languages.extend("javascript", {
        comment,
        string: [
          // Strings are multiline
          {
            pattern: /'(?:\\[\s\S]|[^\\'])*'/,
            greedy: true
          },
          {
            // Strings are multiline
            pattern: /"(?:\\[\s\S]|[^\\"])*"/,
            greedy: true,
            inside: {
              interpolation
            }
          }
        ],
        keyword: /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
        "class-member": {
          pattern: /@(?!\d)\w+/,
          alias: "variable"
        }
      });
      Prism3.languages.insertBefore("coffeescript", "comment", {
        "multiline-comment": {
          pattern: /###[\s\S]+?###/,
          alias: "comment"
        },
        // Block regexp can contain comments and interpolation
        "block-regex": {
          pattern: /\/{3}[\s\S]*?\/{3}/,
          alias: "regex",
          inside: {
            comment,
            interpolation
          }
        }
      });
      Prism3.languages.insertBefore("coffeescript", "string", {
        "inline-javascript": {
          pattern: /`(?:\\[\s\S]|[^\\`])*`/,
          inside: {
            delimiter: {
              pattern: /^`|`$/,
              alias: "punctuation"
            },
            script: {
              pattern: /[\s\S]+/,
              alias: "language-javascript",
              inside: Prism3.languages.javascript
            }
          }
        },
        // Block strings
        "multiline-string": [
          {
            pattern: /'''[\s\S]*?'''/,
            greedy: true,
            alias: "string"
          },
          {
            pattern: /"""[\s\S]*?"""/,
            greedy: true,
            alias: "string",
            inside: {
              interpolation
            }
          }
        ]
      });
      Prism3.languages.insertBefore("coffeescript", "keyword", {
        // Object property
        property: /(?!\d)\w+(?=\s*:(?!:))/
      });
      delete Prism3.languages.coffeescript["template-string"];
      Prism3.languages.coffee = Prism3.languages.coffeescript;
    })(Prism2);
  }
  return coffeescript_1;
}
var concurnas_1;
var hasRequiredConcurnas;
function requireConcurnas() {
  if (hasRequiredConcurnas) return concurnas_1;
  hasRequiredConcurnas = 1;
  concurnas_1 = concurnas;
  concurnas.displayName = "concurnas";
  concurnas.aliases = ["conc"];
  function concurnas(Prism2) {
    Prism2.languages.concurnas = {
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?(?:\*\/|$)|\/\/.*)/,
        lookbehind: true,
        greedy: true
      },
      langext: {
        pattern: /\b\w+\s*\|\|[\s\S]+?\|\|/,
        greedy: true,
        inside: {
          "class-name": /^\w+/,
          string: {
            pattern: /(^\s*\|\|)[\s\S]+(?=\|\|$)/,
            lookbehind: true
          },
          punctuation: /\|\|/
        }
      },
      function: {
        pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/,
        lookbehind: true
      },
      keyword: /\b(?:abstract|actor|also|annotation|assert|async|await|bool|boolean|break|byte|case|catch|changed|char|class|closed|constant|continue|def|default|del|double|elif|else|enum|every|extends|false|finally|float|for|from|global|gpudef|gpukernel|if|import|in|init|inject|int|lambda|local|long|loop|match|new|nodefault|null|of|onchange|open|out|override|package|parfor|parforsync|post|pre|private|protected|provide|provider|public|return|shared|short|single|size_t|sizeof|super|sync|this|throw|trait|trans|transient|true|try|typedef|unchecked|using|val|var|void|while|with)\b/,
      boolean: /\b(?:false|true)\b/,
      number: /\b0b[01][01_]*L?\b|\b0x(?:[\da-f_]*\.)?[\da-f_p+-]+\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfls]?/i,
      punctuation: /[{}[\];(),.:]/,
      operator: /<==|>==|=>|->|<-|<>|&==|&<>|\?:?|\.\?|\+\+|--|[-+*/=<>]=?|[!^~]|\b(?:and|as|band|bor|bxor|comp|is|isnot|mod|or)\b=?/,
      annotation: {
        pattern: /@(?:\w+:)?(?:\w+|\[[^\]]+\])?/,
        alias: "builtin"
      }
    };
    Prism2.languages.insertBefore("concurnas", "langext", {
      "regex-literal": {
        pattern: /\br("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
        greedy: true,
        inside: {
          interpolation: {
            pattern: /((?:^|[^\\])(?:\\{2})*)\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: true,
            inside: Prism2.languages.concurnas
          },
          regex: /[\s\S]+/
        }
      },
      "string-literal": {
        pattern: /(?:\B|\bs)("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
        greedy: true,
        inside: {
          interpolation: {
            pattern: /((?:^|[^\\])(?:\\{2})*)\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: true,
            inside: Prism2.languages.concurnas
          },
          string: /[\s\S]+/
        }
      }
    });
    Prism2.languages.conc = Prism2.languages.concurnas;
  }
  return concurnas_1;
}
var coq_1;
var hasRequiredCoq;
function requireCoq() {
  if (hasRequiredCoq) return coq_1;
  hasRequiredCoq = 1;
  coq_1 = coq;
  coq.displayName = "coq";
  coq.aliases = [];
  function coq(Prism2) {
    (function(Prism3) {
      var commentSource = /\(\*(?:[^(*]|\((?!\*)|\*(?!\))|<self>)*\*\)/.source;
      for (var i = 0; i < 2; i++) {
        commentSource = commentSource.replace(/<self>/g, function() {
          return commentSource;
        });
      }
      commentSource = commentSource.replace(/<self>/g, "[]");
      Prism3.languages.coq = {
        comment: RegExp(commentSource),
        string: {
          pattern: /"(?:[^"]|"")*"(?!")/,
          greedy: true
        },
        attribute: [
          {
            pattern: RegExp(
              /#\[(?:[^\[\]("]|"(?:[^"]|"")*"(?!")|\((?!\*)|<comment>)*\]/.source.replace(
                /<comment>/g,
                function() {
                  return commentSource;
                }
              )
            ),
            greedy: true,
            alias: "attr-name",
            inside: {
              comment: RegExp(commentSource),
              string: {
                pattern: /"(?:[^"]|"")*"(?!")/,
                greedy: true
              },
              operator: /=/,
              punctuation: /^#\[|\]$|[,()]/
            }
          },
          {
            pattern: /\b(?:Cumulative|Global|Local|Monomorphic|NonCumulative|Polymorphic|Private|Program)\b/,
            alias: "attr-name"
          }
        ],
        keyword: /\b(?:Abort|About|Add|Admit|Admitted|All|Arguments|As|Assumptions|Axiom|Axioms|Back|BackTo|Backtrace|BinOp|BinOpSpec|BinRel|Bind|Blacklist|Canonical|Case|Cd|Check|Class|Classes|Close|CoFixpoint|CoInductive|Coercion|Coercions|Collection|Combined|Compute|Conjecture|Conjectures|Constant|Constants|Constraint|Constructors|Context|Corollary|Create|CstOp|Custom|Cut|Debug|Declare|Defined|Definition|Delimit|Dependencies|Dependent|Derive|Diffs|Drop|Elimination|End|Entry|Equality|Eval|Example|Existential|Existentials|Existing|Export|Extern|Extraction|Fact|Fail|Field|File|Firstorder|Fixpoint|Flags|Focus|From|Funclass|Function|Functional|GC|Generalizable|Goal|Grab|Grammar|Graph|Guarded|Haskell|Heap|Hide|Hint|HintDb|Hints|Hypotheses|Hypothesis|IF|Identity|Immediate|Implicit|Implicits|Import|Include|Induction|Inductive|Infix|Info|Initial|InjTyp|Inline|Inspect|Instance|Instances|Intro|Intros|Inversion|Inversion_clear|JSON|Language|Left|Lemma|Let|Lia|Libraries|Library|Load|LoadPath|Locate|Ltac|Ltac2|ML|Match|Method|Minimality|Module|Modules|Morphism|Next|NoInline|Notation|Number|OCaml|Obligation|Obligations|Opaque|Open|Optimize|Parameter|Parameters|Parametric|Path|Paths|Prenex|Preterm|Primitive|Print|Profile|Projections|Proof|Prop|PropBinOp|PropOp|PropUOp|Property|Proposition|Pwd|Qed|Quit|Rec|Record|Recursive|Redirect|Reduction|Register|Relation|Remark|Remove|Require|Reserved|Reset|Resolve|Restart|Rewrite|Right|Ring|Rings|SProp|Saturate|Save|Scheme|Scope|Scopes|Search|SearchHead|SearchPattern|SearchRewrite|Section|Separate|Set|Setoid|Show|Signatures|Solve|Solver|Sort|Sortclass|Sorted|Spec|Step|Strategies|Strategy|String|Structure|SubClass|Subgraph|SuchThat|Tactic|Term|TestCompile|Theorem|Time|Timeout|To|Transparent|Type|Typeclasses|Types|Typing|UnOp|UnOpSpec|Undelimit|Undo|Unfocus|Unfocused|Unfold|Universe|Universes|Unshelve|Variable|Variables|Variant|Verbose|View|Visibility|Zify|_|apply|as|at|by|cofix|else|end|exists|exists2|fix|for|forall|fun|if|in|let|match|measure|move|removed|return|struct|then|using|wf|where|with)\b/,
        number: /\b(?:0x[a-f0-9][a-f0-9_]*(?:\.[a-f0-9_]+)?(?:p[+-]?\d[\d_]*)?|\d[\d_]*(?:\.[\d_]+)?(?:e[+-]?\d[\d_]*)?)\b/i,
        punct: {
          pattern: /@\{|\{\||\[=|:>/,
          alias: "punctuation"
        },
        operator: /\/\\|\\\/|\.{2,3}|:{1,2}=|\*\*|[-=]>|<(?:->?|[+:=>]|<:)|>(?:=|->)|\|[-|]?|[-!%&*+/<=>?@^~']/,
        punctuation: /\.\(|`\(|@\{|`\{|\{\||\[=|:>|[:.,;(){}\[\]]/
      };
    })(Prism2);
  }
  return coq_1;
}
var ruby_1;
var hasRequiredRuby;
function requireRuby() {
  if (hasRequiredRuby) return ruby_1;
  hasRequiredRuby = 1;
  ruby_1 = ruby;
  ruby.displayName = "ruby";
  ruby.aliases = ["rb"];
  function ruby(Prism2) {
    (function(Prism3) {
      Prism3.languages.ruby = Prism3.languages.extend("clike", {
        comment: {
          pattern: /#.*|^=begin\s[\s\S]*?^=end/m,
          greedy: true
        },
        "class-name": {
          pattern: /(\b(?:class|module)\s+|\bcatch\s+\()[\w.\\]+|\b[A-Z_]\w*(?=\s*\.\s*new\b)/,
          lookbehind: true,
          inside: {
            punctuation: /[.\\]/
          }
        },
        keyword: /\b(?:BEGIN|END|alias|and|begin|break|case|class|def|define_method|defined|do|each|else|elsif|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|private|protected|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,
        operator: /\.{2,3}|&\.|===|<?=>|[!=]?~|(?:&&|\|\||<<|>>|\*\*|[+\-*/%<>!^&|=])=?|[?:]/,
        punctuation: /[(){}[\].,;]/
      });
      Prism3.languages.insertBefore("ruby", "operator", {
        "double-colon": {
          pattern: /::/,
          alias: "punctuation"
        }
      });
      var interpolation = {
        pattern: /((?:^|[^\\])(?:\\{2})*)#\{(?:[^{}]|\{[^{}]*\})*\}/,
        lookbehind: true,
        inside: {
          content: {
            pattern: /^(#\{)[\s\S]+(?=\}$)/,
            lookbehind: true,
            inside: Prism3.languages.ruby
          },
          delimiter: {
            pattern: /^#\{|\}$/,
            alias: "punctuation"
          }
        }
      };
      delete Prism3.languages.ruby.function;
      var percentExpression = "(?:" + [
        /([^a-zA-Z0-9\s{(\[<=])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
        /\((?:[^()\\]|\\[\s\S]|\((?:[^()\\]|\\[\s\S])*\))*\)/.source,
        /\{(?:[^{}\\]|\\[\s\S]|\{(?:[^{}\\]|\\[\s\S])*\})*\}/.source,
        /\[(?:[^\[\]\\]|\\[\s\S]|\[(?:[^\[\]\\]|\\[\s\S])*\])*\]/.source,
        /<(?:[^<>\\]|\\[\s\S]|<(?:[^<>\\]|\\[\s\S])*>)*>/.source
      ].join("|") + ")";
      var symbolName = /(?:"(?:\\.|[^"\\\r\n])*"|(?:\b[a-zA-Z_]\w*|[^\s\0-\x7F]+)[?!]?|\$.)/.source;
      Prism3.languages.insertBefore("ruby", "keyword", {
        "regex-literal": [
          {
            pattern: RegExp(
              /%r/.source + percentExpression + /[egimnosux]{0,6}/.source
            ),
            greedy: true,
            inside: {
              interpolation,
              regex: /[\s\S]+/
            }
          },
          {
            pattern: /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[egimnosux]{0,6}(?=\s*(?:$|[\r\n,.;})#]))/,
            lookbehind: true,
            greedy: true,
            inside: {
              interpolation,
              regex: /[\s\S]+/
            }
          }
        ],
        variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
        symbol: [
          {
            pattern: RegExp(/(^|[^:]):/.source + symbolName),
            lookbehind: true,
            greedy: true
          },
          {
            pattern: RegExp(
              /([\r\n{(,][ \t]*)/.source + symbolName + /(?=:(?!:))/.source
            ),
            lookbehind: true,
            greedy: true
          }
        ],
        "method-definition": {
          pattern: /(\bdef\s+)\w+(?:\s*\.\s*\w+)?/,
          lookbehind: true,
          inside: {
            function: /\b\w+$/,
            keyword: /^self\b/,
            "class-name": /^\w+/,
            punctuation: /\./
          }
        }
      });
      Prism3.languages.insertBefore("ruby", "string", {
        "string-literal": [
          {
            pattern: RegExp(/%[qQiIwWs]?/.source + percentExpression),
            greedy: true,
            inside: {
              interpolation,
              string: /[\s\S]+/
            }
          },
          {
            pattern: /("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,
            greedy: true,
            inside: {
              interpolation,
              string: /[\s\S]+/
            }
          },
          {
            pattern: /<<[-~]?([a-z_]\w*)[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
            alias: "heredoc-string",
            greedy: true,
            inside: {
              delimiter: {
                pattern: /^<<[-~]?[a-z_]\w*|\b[a-z_]\w*$/i,
                inside: {
                  symbol: /\b\w+/,
                  punctuation: /^<<[-~]?/
                }
              },
              interpolation,
              string: /[\s\S]+/
            }
          },
          {
            pattern: /<<[-~]?'([a-z_]\w*)'[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
            alias: "heredoc-string",
            greedy: true,
            inside: {
              delimiter: {
                pattern: /^<<[-~]?'[a-z_]\w*'|\b[a-z_]\w*$/i,
                inside: {
                  symbol: /\b\w+/,
                  punctuation: /^<<[-~]?'|'$/
                }
              },
              string: /[\s\S]+/
            }
          }
        ],
        "command-literal": [
          {
            pattern: RegExp(/%x/.source + percentExpression),
            greedy: true,
            inside: {
              interpolation,
              command: {
                pattern: /[\s\S]+/,
                alias: "string"
              }
            }
          },
          {
            pattern: /`(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|[^\\`#\r\n])*`/,
            greedy: true,
            inside: {
              interpolation,
              command: {
                pattern: /[\s\S]+/,
                alias: "string"
              }
            }
          }
        ]
      });
      delete Prism3.languages.ruby.string;
      Prism3.languages.insertBefore("ruby", "number", {
        builtin: /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Fixnum|Float|Hash|IO|Integer|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|Stat|String|Struct|Symbol|TMS|Thread|ThreadGroup|Time|TrueClass)\b/,
        constant: /\b[A-Z][A-Z0-9_]*(?:[?!]|\b)/
      });
      Prism3.languages.rb = Prism3.languages.ruby;
    })(Prism2);
  }
  return ruby_1;
}
var crystal_1;
var hasRequiredCrystal;
function requireCrystal() {
  if (hasRequiredCrystal) return crystal_1;
  hasRequiredCrystal = 1;
  var refractorRuby = requireRuby();
  crystal_1 = crystal;
  crystal.displayName = "crystal";
  crystal.aliases = [];
  function crystal(Prism2) {
    Prism2.register(refractorRuby);
    (function(Prism3) {
      Prism3.languages.crystal = Prism3.languages.extend("ruby", {
        keyword: [
          /\b(?:__DIR__|__END_LINE__|__FILE__|__LINE__|abstract|alias|annotation|as|asm|begin|break|case|class|def|do|else|elsif|end|ensure|enum|extend|for|fun|if|ifdef|include|instance_sizeof|lib|macro|module|next|of|out|pointerof|private|protected|ptr|require|rescue|return|select|self|sizeof|struct|super|then|type|typeof|undef|uninitialized|union|unless|until|when|while|with|yield)\b/,
          {
            pattern: /(\.\s*)(?:is_a|responds_to)\?/,
            lookbehind: true
          }
        ],
        number: /\b(?:0b[01_]*[01]|0o[0-7_]*[0-7]|0x[\da-fA-F_]*[\da-fA-F]|(?:\d(?:[\d_]*\d)?)(?:\.[\d_]*\d)?(?:[eE][+-]?[\d_]*\d)?)(?:_(?:[uif](?:8|16|32|64))?)?\b/,
        operator: [/->/, Prism3.languages.ruby.operator],
        punctuation: /[(){}[\].,;\\]/
      });
      Prism3.languages.insertBefore("crystal", "string-literal", {
        attribute: {
          pattern: /@\[.*?\]/,
          inside: {
            delimiter: {
              pattern: /^@\[|\]$/,
              alias: "punctuation"
            },
            attribute: {
              pattern: /^(\s*)\w+/,
              lookbehind: true,
              alias: "class-name"
            },
            args: {
              pattern: /\S(?:[\s\S]*\S)?/,
              inside: Prism3.languages.crystal
            }
          }
        },
        expansion: {
          pattern: /\{(?:\{.*?\}|%.*?%)\}/,
          inside: {
            content: {
              pattern: /^(\{.)[\s\S]+(?=.\}$)/,
              lookbehind: true,
              inside: Prism3.languages.crystal
            },
            delimiter: {
              pattern: /^\{[\{%]|[\}%]\}$/,
              alias: "operator"
            }
          }
        },
        char: {
          pattern: /'(?:[^\\\r\n]{1,2}|\\(?:.|u(?:[A-Fa-f0-9]{1,4}|\{[A-Fa-f0-9]{1,6}\})))'/,
          greedy: true
        }
      });
    })(Prism2);
  }
  return crystal_1;
}
var cshtml_1;
var hasRequiredCshtml;
function requireCshtml() {
  if (hasRequiredCshtml) return cshtml_1;
  hasRequiredCshtml = 1;
  var refractorCsharp = requireCsharp();
  cshtml_1 = cshtml;
  cshtml.displayName = "cshtml";
  cshtml.aliases = ["razor"];
  function cshtml(Prism2) {
    Prism2.register(refractorCsharp);
    (function(Prism3) {
      var commentLike = /\/(?![/*])|\/\/.*[\r\n]|\/\*[^*]*(?:\*(?!\/)[^*]*)*\*\//.source;
      var stringLike = /@(?!")|"(?:[^\r\n\\"]|\\.)*"|@"(?:[^\\"]|""|\\[\s\S])*"(?!")/.source + "|" + /'(?:(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'|(?=[^\\](?!')))/.source;
      function nested(pattern, depthLog2) {
        for (var i = 0; i < depthLog2; i++) {
          pattern = pattern.replace(/<self>/g, function() {
            return "(?:" + pattern + ")";
          });
        }
        return pattern.replace(/<self>/g, "[^\\s\\S]").replace(/<str>/g, "(?:" + stringLike + ")").replace(/<comment>/g, "(?:" + commentLike + ")");
      }
      var round = nested(/\((?:[^()'"@/]|<str>|<comment>|<self>)*\)/.source, 2);
      var square = nested(/\[(?:[^\[\]'"@/]|<str>|<comment>|<self>)*\]/.source, 2);
      var curly = nested(/\{(?:[^{}'"@/]|<str>|<comment>|<self>)*\}/.source, 2);
      var angle = nested(/<(?:[^<>'"@/]|<str>|<comment>|<self>)*>/.source, 2);
      var tagAttrs = /(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?/.source;
      var tagContent = /(?!\d)[^\s>\/=$<%]+/.source + tagAttrs + /\s*\/?>/.source;
      var tagRegion = /\B@?/.source + "(?:" + /<([a-zA-Z][\w:]*)/.source + tagAttrs + /\s*>/.source + "(?:" + (/[^<]/.source + "|" + // all tags that are not the start tag
      // eslint-disable-next-line regexp/strict
      /<\/?(?!\1\b)/.source + tagContent + "|" + // nested start tag
      nested(
        // eslint-disable-next-line regexp/strict
        /<\1/.source + tagAttrs + /\s*>/.source + "(?:" + (/[^<]/.source + "|" + // all tags that are not the start tag
        // eslint-disable-next-line regexp/strict
        /<\/?(?!\1\b)/.source + tagContent + "|<self>") + ")*" + // eslint-disable-next-line regexp/strict
        /<\/\1\s*>/.source,
        2
      )) + ")*" + // eslint-disable-next-line regexp/strict
      /<\/\1\s*>/.source + "|" + /</.source + tagContent + ")";
      Prism3.languages.cshtml = Prism3.languages.extend("markup", {});
      var csharpWithHtml = Prism3.languages.insertBefore(
        "csharp",
        "string",
        {
          html: {
            pattern: RegExp(tagRegion),
            greedy: true,
            inside: Prism3.languages.cshtml
          }
        },
        {
          csharp: Prism3.languages.extend("csharp", {})
        }
      );
      var cs = {
        pattern: /\S[\s\S]*/,
        alias: "language-csharp",
        inside: csharpWithHtml
      };
      Prism3.languages.insertBefore("cshtml", "prolog", {
        "razor-comment": {
          pattern: /@\*[\s\S]*?\*@/,
          greedy: true,
          alias: "comment"
        },
        block: {
          pattern: RegExp(
            /(^|[^@])@/.source + "(?:" + [
              // @{ ... }
              curly,
              // @code{ ... }
              /(?:code|functions)\s*/.source + curly,
              // @for (...) { ... }
              /(?:for|foreach|lock|switch|using|while)\s*/.source + round + /\s*/.source + curly,
              // @do { ... } while (...);
              /do\s*/.source + curly + /\s*while\s*/.source + round + /(?:\s*;)?/.source,
              // @try { ... } catch (...) { ... } finally { ... }
              /try\s*/.source + curly + /\s*catch\s*/.source + round + /\s*/.source + curly + /\s*finally\s*/.source + curly,
              // @if (...) {...} else if (...) {...} else {...}
              /if\s*/.source + round + /\s*/.source + curly + "(?:" + /\s*else/.source + "(?:" + /\s+if\s*/.source + round + ")?" + /\s*/.source + curly + ")*"
            ].join("|") + ")"
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            keyword: /^@\w*/,
            csharp: cs
          }
        },
        directive: {
          pattern: /^([ \t]*)@(?:addTagHelper|attribute|implements|inherits|inject|layout|model|namespace|page|preservewhitespace|removeTagHelper|section|tagHelperPrefix|using)(?=\s).*/m,
          lookbehind: true,
          greedy: true,
          inside: {
            keyword: /^@\w+/,
            csharp: cs
          }
        },
        value: {
          pattern: RegExp(
            /(^|[^@])@/.source + /(?:await\b\s*)?/.source + "(?:" + /\w+\b/.source + "|" + round + ")(?:" + /[?!]?\.\w+\b/.source + "|" + round + "|" + square + "|" + angle + round + ")*"
          ),
          lookbehind: true,
          greedy: true,
          alias: "variable",
          inside: {
            keyword: /^@/,
            csharp: cs
          }
        },
        "delegate-operator": {
          pattern: /(^|[^@])@(?=<)/,
          lookbehind: true,
          alias: "operator"
        }
      });
      Prism3.languages.razor = Prism3.languages.cshtml;
    })(Prism2);
  }
  return cshtml_1;
}
var csp_1;
var hasRequiredCsp;
function requireCsp() {
  if (hasRequiredCsp) return csp_1;
  hasRequiredCsp = 1;
  csp_1 = csp;
  csp.displayName = "csp";
  csp.aliases = [];
  function csp(Prism2) {
    (function(Prism3) {
      function value(source) {
        return RegExp(
          /([ \t])/.source + "(?:" + source + ")" + /(?=[\s;]|$)/.source,
          "i"
        );
      }
      Prism3.languages.csp = {
        directive: {
          pattern: /(^|[\s;])(?:base-uri|block-all-mixed-content|(?:child|connect|default|font|frame|img|manifest|media|object|prefetch|script|style|worker)-src|disown-opener|form-action|frame-(?:ancestors|options)|input-protection(?:-(?:clip|selectors))?|navigate-to|plugin-types|policy-uri|referrer|reflected-xss|report-(?:to|uri)|require-sri-for|sandbox|(?:script|style)-src-(?:attr|elem)|upgrade-insecure-requests)(?=[\s;]|$)/i,
          lookbehind: true,
          alias: "property"
        },
        scheme: {
          pattern: value(/[a-z][a-z0-9.+-]*:/.source),
          lookbehind: true
        },
        none: {
          pattern: value(/'none'/.source),
          lookbehind: true,
          alias: "keyword"
        },
        nonce: {
          pattern: value(/'nonce-[-+/\w=]+'/.source),
          lookbehind: true,
          alias: "number"
        },
        hash: {
          pattern: value(/'sha(?:256|384|512)-[-+/\w=]+'/.source),
          lookbehind: true,
          alias: "number"
        },
        host: {
          pattern: value(
            /[a-z][a-z0-9.+-]*:\/\/[^\s;,']*/.source + "|" + /\*[^\s;,']*/.source + "|" + /[a-z0-9-]+(?:\.[a-z0-9-]+)+(?::[\d*]+)?(?:\/[^\s;,']*)?/.source
          ),
          lookbehind: true,
          alias: "url",
          inside: {
            important: /\*/
          }
        },
        keyword: [
          {
            pattern: value(/'unsafe-[a-z-]+'/.source),
            lookbehind: true,
            alias: "unsafe"
          },
          {
            pattern: value(/'[a-z-]+'/.source),
            lookbehind: true,
            alias: "safe"
          }
        ],
        punctuation: /;/
      };
    })(Prism2);
  }
  return csp_1;
}
var cssExtras_1;
var hasRequiredCssExtras;
function requireCssExtras() {
  if (hasRequiredCssExtras) return cssExtras_1;
  hasRequiredCssExtras = 1;
  cssExtras_1 = cssExtras;
  cssExtras.displayName = "cssExtras";
  cssExtras.aliases = [];
  function cssExtras(Prism2) {
    (function(Prism3) {
      var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
      var selectorInside;
      Prism3.languages.css.selector = {
        pattern: Prism3.languages.css.selector.pattern,
        lookbehind: true,
        inside: selectorInside = {
          "pseudo-element": /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
          "pseudo-class": /:[-\w]+/,
          class: /\.[-\w]+/,
          id: /#[-\w]+/,
          attribute: {
            pattern: RegExp(`\\[(?:[^[\\]"']|` + string.source + ")*\\]"),
            greedy: true,
            inside: {
              punctuation: /^\[|\]$/,
              "case-sensitivity": {
                pattern: /(\s)[si]$/i,
                lookbehind: true,
                alias: "keyword"
              },
              namespace: {
                pattern: /^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,
                lookbehind: true,
                inside: {
                  punctuation: /\|$/
                }
              },
              "attr-name": {
                pattern: /^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/,
                lookbehind: true
              },
              "attr-value": [
                string,
                {
                  pattern: /(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/,
                  lookbehind: true
                }
              ],
              operator: /[|~*^$]?=/
            }
          },
          "n-th": [
            {
              pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
              lookbehind: true,
              inside: {
                number: /[\dn]+/,
                operator: /[+-]/
              }
            },
            {
              pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i,
              lookbehind: true
            }
          ],
          combinator: />|\+|~|\|\|/,
          // the `tag` token has been existed and removed.
          // because we can't find a perfect tokenize to match it.
          // if you want to add it, please read https://github.com/PrismJS/prism/pull/2373 first.
          punctuation: /[(),]/
        }
      };
      Prism3.languages.css["atrule"].inside["selector-function-argument"].inside = selectorInside;
      Prism3.languages.insertBefore("css", "property", {
        variable: {
          pattern: /(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,
          lookbehind: true
        }
      });
      var unit = {
        pattern: /(\b\d+)(?:%|[a-z]+(?![\w-]))/,
        lookbehind: true
      };
      var number = {
        pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
        lookbehind: true
      };
      Prism3.languages.insertBefore("css", "function", {
        operator: {
          pattern: /(\s)[+\-*\/](?=\s)/,
          lookbehind: true
        },
        // CAREFUL!
        // Previewers and Inline color use hexcode and color.
        hexcode: {
          pattern: /\B#[\da-f]{3,8}\b/i,
          alias: "color"
        },
        color: [
          {
            pattern: /(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i,
            lookbehind: true
          },
          {
            pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
            inside: {
              unit,
              number,
              function: /[\w-]+(?=\()/,
              punctuation: /[(),]/
            }
          }
        ],
        // it's important that there is no boundary assertion after the hex digits
        entity: /\\[\da-f]{1,8}/i,
        unit,
        number
      });
    })(Prism2);
  }
  return cssExtras_1;
}
var csv_1;
var hasRequiredCsv;
function requireCsv() {
  if (hasRequiredCsv) return csv_1;
  hasRequiredCsv = 1;
  csv_1 = csv;
  csv.displayName = "csv";
  csv.aliases = [];
  function csv(Prism2) {
    Prism2.languages.csv = {
      value: /[^\r\n,"]+|"(?:[^"]|"")*"(?!")/,
      punctuation: /,/
    };
  }
  return csv_1;
}
var cypher_1;
var hasRequiredCypher;
function requireCypher() {
  if (hasRequiredCypher) return cypher_1;
  hasRequiredCypher = 1;
  cypher_1 = cypher;
  cypher.displayName = "cypher";
  cypher.aliases = [];
  function cypher(Prism2) {
    Prism2.languages.cypher = {
      // https://neo4j.com/docs/cypher-manual/current/syntax/comments/
      comment: /\/\/.*/,
      string: {
        pattern: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/,
        greedy: true
      },
      "class-name": {
        pattern: /(:\s*)(?:\w+|`(?:[^`\\\r\n])*`)(?=\s*[{):])/,
        lookbehind: true,
        greedy: true
      },
      relationship: {
        pattern: /(-\[\s*(?:\w+\s*|`(?:[^`\\\r\n])*`\s*)?:\s*|\|\s*:\s*)(?:\w+|`(?:[^`\\\r\n])*`)/,
        lookbehind: true,
        greedy: true,
        alias: "property"
      },
      identifier: {
        pattern: /`(?:[^`\\\r\n])*`/,
        greedy: true
      },
      variable: /\$\w+/,
      // https://neo4j.com/docs/cypher-manual/current/syntax/reserved/
      keyword: /\b(?:ADD|ALL|AND|AS|ASC|ASCENDING|ASSERT|BY|CALL|CASE|COMMIT|CONSTRAINT|CONTAINS|CREATE|CSV|DELETE|DESC|DESCENDING|DETACH|DISTINCT|DO|DROP|ELSE|END|ENDS|EXISTS|FOR|FOREACH|IN|INDEX|IS|JOIN|KEY|LIMIT|LOAD|MANDATORY|MATCH|MERGE|NODE|NOT|OF|ON|OPTIONAL|OR|ORDER(?=\s+BY)|PERIODIC|REMOVE|REQUIRE|RETURN|SCALAR|SCAN|SET|SKIP|START|STARTS|THEN|UNION|UNIQUE|UNWIND|USING|WHEN|WHERE|WITH|XOR|YIELD)\b/i,
      function: /\b\w+\b(?=\s*\()/,
      boolean: /\b(?:false|null|true)\b/i,
      number: /\b(?:0x[\da-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/,
      // https://neo4j.com/docs/cypher-manual/current/syntax/operators/
      operator: /:|<--?|--?>?|<>|=~?|[<>]=?|[+*/%^|]|\.\.\.?/,
      punctuation: /[()[\]{},;.]/
    };
  }
  return cypher_1;
}
var d_1;
var hasRequiredD;
function requireD() {
  if (hasRequiredD) return d_1;
  hasRequiredD = 1;
  d_1 = d;
  d.displayName = "d";
  d.aliases = [];
  function d(Prism2) {
    Prism2.languages.d = Prism2.languages.extend("clike", {
      comment: [
        {
          // Shebang
          pattern: /^\s*#!.+/,
          greedy: true
        },
        {
          pattern: RegExp(
            /(^|[^\\])/.source + "(?:" + [
              // /+ comment +/
              // Allow one level of nesting
              /\/\+(?:\/\+(?:[^+]|\+(?!\/))*\+\/|(?!\/\+)[\s\S])*?\+\//.source,
              // // comment
              /\/\/.*/.source,
              // /* comment */
              /\/\*[\s\S]*?\*\//.source
            ].join("|") + ")"
          ),
          lookbehind: true,
          greedy: true
        }
      ],
      string: [
        {
          pattern: RegExp(
            [
              // r"", x""
              /\b[rx]"(?:\\[\s\S]|[^\\"])*"[cwd]?/.source,
              // q"[]", q"()", q"<>", q"{}"
              /\bq"(?:\[[\s\S]*?\]|\([\s\S]*?\)|<[\s\S]*?>|\{[\s\S]*?\})"/.source,
              // q"IDENT
              // ...
              // IDENT"
              /\bq"((?!\d)\w+)$[\s\S]*?^\1"/.source,
              // q"//", q"||", etc.
              // eslint-disable-next-line regexp/strict
              /\bq"(.)[\s\S]*?\2"/.source,
              // eslint-disable-next-line regexp/strict
              /(["`])(?:\\[\s\S]|(?!\3)[^\\])*\3[cwd]?/.source
            ].join("|"),
            "m"
          ),
          greedy: true
        },
        {
          pattern: /\bq\{(?:\{[^{}]*\}|[^{}])*\}/,
          greedy: true,
          alias: "token-string"
        }
      ],
      // In order: $, keywords and special tokens, globally defined symbols
      keyword: /\$|\b(?:__(?:(?:DATE|EOF|FILE|FUNCTION|LINE|MODULE|PRETTY_FUNCTION|TIMESTAMP|TIME|VENDOR|VERSION)__|gshared|parameters|traits|vector)|abstract|alias|align|asm|assert|auto|body|bool|break|byte|case|cast|catch|cdouble|cent|cfloat|char|class|const|continue|creal|dchar|debug|default|delegate|delete|deprecated|do|double|dstring|else|enum|export|extern|false|final|finally|float|for|foreach|foreach_reverse|function|goto|idouble|if|ifloat|immutable|import|inout|int|interface|invariant|ireal|lazy|long|macro|mixin|module|new|nothrow|null|out|override|package|pragma|private|protected|ptrdiff_t|public|pure|real|ref|return|scope|shared|short|size_t|static|string|struct|super|switch|synchronized|template|this|throw|true|try|typedef|typeid|typeof|ubyte|ucent|uint|ulong|union|unittest|ushort|version|void|volatile|wchar|while|with|wstring)\b/,
      number: [
        // The lookbehind and the negative look-ahead try to prevent bad highlighting of the .. operator
        // Hexadecimal numbers must be handled separately to avoid problems with exponent "e"
        /\b0x\.?[a-f\d_]+(?:(?!\.\.)\.[a-f\d_]*)?(?:p[+-]?[a-f\d_]+)?[ulfi]{0,4}/i,
        {
          pattern: /((?:\.\.)?)(?:\b0b\.?|\b|\.)\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:e[+-]?\d[\d_]*)?[ulfi]{0,4}/i,
          lookbehind: true
        }
      ],
      operator: /\|[|=]?|&[&=]?|\+[+=]?|-[-=]?|\.?\.\.|=[>=]?|!(?:i[ns]\b|<>?=?|>=?|=)?|\bi[ns]\b|(?:<[<>]?|>>?>?|\^\^|[*\/%^~])=?/
    });
    Prism2.languages.insertBefore("d", "string", {
      // Characters
      // 'a', '\\', '\n', '\xFF', '\377', '\uFFFF', '\U0010FFFF', '\quot'
      char: /'(?:\\(?:\W|\w+)|[^\\])'/
    });
    Prism2.languages.insertBefore("d", "keyword", {
      property: /\B@\w*/
    });
    Prism2.languages.insertBefore("d", "function", {
      register: {
        // Iasm registers
        pattern: /\b(?:[ABCD][LHX]|E?(?:BP|DI|SI|SP)|[BS]PL|[ECSDGF]S|CR[0234]|[DS]IL|DR[012367]|E[ABCD]X|X?MM[0-7]|R(?:1[0-5]|[89])[BWD]?|R[ABCD]X|R[BS]P|R[DS]I|TR[3-7]|XMM(?:1[0-5]|[89])|YMM(?:1[0-5]|\d))\b|\bST(?:\([0-7]\)|\b)/,
        alias: "variable"
      }
    });
  }
  return d_1;
}
var dart_1;
var hasRequiredDart;
function requireDart() {
  if (hasRequiredDart) return dart_1;
  hasRequiredDart = 1;
  dart_1 = dart;
  dart.displayName = "dart";
  dart.aliases = [];
  function dart(Prism2) {
    (function(Prism3) {
      var keywords = [
        /\b(?:async|sync|yield)\*/,
        /\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|covariant|default|deferred|do|dynamic|else|enum|export|extends|extension|external|factory|final|finally|for|get|hide|if|implements|import|in|interface|library|mixin|new|null|on|operator|part|rethrow|return|set|show|static|super|switch|sync|this|throw|try|typedef|var|void|while|with|yield)\b/
      ];
      var packagePrefix = /(^|[^\w.])(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source;
      var className = {
        pattern: RegExp(packagePrefix + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),
        lookbehind: true,
        inside: {
          namespace: {
            pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
            inside: {
              punctuation: /\./
            }
          }
        }
      };
      Prism3.languages.dart = Prism3.languages.extend("clike", {
        "class-name": [
          className,
          {
            // variables and parameters
            // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
            pattern: RegExp(
              packagePrefix + /[A-Z]\w*(?=\s+\w+\s*[;,=()])/.source
            ),
            lookbehind: true,
            inside: className.inside
          }
        ],
        keyword: keywords,
        operator: /\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/
      });
      Prism3.languages.insertBefore("dart", "string", {
        "string-literal": {
          pattern: /r?(?:("""|''')[\s\S]*?\1|(["'])(?:\\.|(?!\2)[^\\\r\n])*\2(?!\2))/,
          greedy: true,
          inside: {
            interpolation: {
              pattern: /((?:^|[^\\])(?:\\{2})*)\$(?:\w+|\{(?:[^{}]|\{[^{}]*\})*\})/,
              lookbehind: true,
              inside: {
                punctuation: /^\$\{?|\}$/,
                expression: {
                  pattern: /[\s\S]+/,
                  inside: Prism3.languages.dart
                }
              }
            },
            string: /[\s\S]+/
          }
        },
        string: void 0
      });
      Prism3.languages.insertBefore("dart", "class-name", {
        metadata: {
          pattern: /@\w+/,
          alias: "function"
        }
      });
      Prism3.languages.insertBefore("dart", "class-name", {
        generics: {
          pattern: /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
          inside: {
            "class-name": className,
            keyword: keywords,
            punctuation: /[<>(),.:]/,
            operator: /[?&|]/
          }
        }
      });
    })(Prism2);
  }
  return dart_1;
}
var dataweave_1;
var hasRequiredDataweave;
function requireDataweave() {
  if (hasRequiredDataweave) return dataweave_1;
  hasRequiredDataweave = 1;
  dataweave_1 = dataweave;
  dataweave.displayName = "dataweave";
  dataweave.aliases = [];
  function dataweave(Prism2) {
    (function(Prism3) {
      Prism3.languages.dataweave = {
        url: /\b[A-Za-z]+:\/\/[\w/:.?=&-]+|\burn:[\w:.?=&-]+/,
        property: {
          pattern: /(?:\b\w+#)?(?:"(?:\\.|[^\\"\r\n])*"|\b\w+)(?=\s*[:@])/,
          greedy: true
        },
        string: {
          pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
          greedy: true
        },
        "mime-type": /\b(?:application|audio|image|multipart|text|video)\/[\w+-]+/,
        date: {
          pattern: /\|[\w:+-]+\|/,
          greedy: true
        },
        comment: [
          {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true,
            greedy: true
          },
          {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
          }
        ],
        regex: {
          pattern: /\/(?:[^\\\/\r\n]|\\[^\r\n])+\//,
          greedy: true
        },
        keyword: /\b(?:and|as|at|case|do|else|fun|if|input|is|match|not|ns|null|or|output|type|unless|update|using|var)\b/,
        function: /\b[A-Z_]\w*(?=\s*\()/i,
        number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
        punctuation: /[{}[\];(),.:@]/,
        operator: /<<|>>|->|[<>~=]=?|!=|--?-?|\+\+?|!|\?/,
        boolean: /\b(?:false|true)\b/
      };
    })(Prism2);
  }
  return dataweave_1;
}
var dax_1;
var hasRequiredDax;
function requireDax() {
  if (hasRequiredDax) return dax_1;
  hasRequiredDax = 1;
  dax_1 = dax;
  dax.displayName = "dax";
  dax.aliases = [];
  function dax(Prism2) {
    Prism2.languages.dax = {
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/).*)/,
        lookbehind: true
      },
      "data-field": {
        pattern: /'(?:[^']|'')*'(?!')(?:\[[ \w\xA0-\uFFFF]+\])?|\w+\[[ \w\xA0-\uFFFF]+\]/,
        alias: "symbol"
      },
      measure: {
        pattern: /\[[ \w\xA0-\uFFFF]+\]/,
        alias: "constant"
      },
      string: {
        pattern: /"(?:[^"]|"")*"(?!")/,
        greedy: true
      },
      function: /\b(?:ABS|ACOS|ACOSH|ACOT|ACOTH|ADDCOLUMNS|ADDMISSINGITEMS|ALL|ALLCROSSFILTERED|ALLEXCEPT|ALLNOBLANKROW|ALLSELECTED|AND|APPROXIMATEDISTINCTCOUNT|ASIN|ASINH|ATAN|ATANH|AVERAGE|AVERAGEA|AVERAGEX|BETA\.DIST|BETA\.INV|BLANK|CALCULATE|CALCULATETABLE|CALENDAR|CALENDARAUTO|CEILING|CHISQ\.DIST|CHISQ\.DIST\.RT|CHISQ\.INV|CHISQ\.INV\.RT|CLOSINGBALANCEMONTH|CLOSINGBALANCEQUARTER|CLOSINGBALANCEYEAR|COALESCE|COMBIN|COMBINA|COMBINEVALUES|CONCATENATE|CONCATENATEX|CONFIDENCE\.NORM|CONFIDENCE\.T|CONTAINS|CONTAINSROW|CONTAINSSTRING|CONTAINSSTRINGEXACT|CONVERT|COS|COSH|COT|COTH|COUNT|COUNTA|COUNTAX|COUNTBLANK|COUNTROWS|COUNTX|CROSSFILTER|CROSSJOIN|CURRENCY|CURRENTGROUP|CUSTOMDATA|DATATABLE|DATE|DATEADD|DATEDIFF|DATESBETWEEN|DATESINPERIOD|DATESMTD|DATESQTD|DATESYTD|DATEVALUE|DAY|DEGREES|DETAILROWS|DISTINCT|DISTINCTCOUNT|DISTINCTCOUNTNOBLANK|DIVIDE|EARLIER|EARLIEST|EDATE|ENDOFMONTH|ENDOFQUARTER|ENDOFYEAR|EOMONTH|ERROR|EVEN|EXACT|EXCEPT|EXP|EXPON\.DIST|FACT|FALSE|FILTER|FILTERS|FIND|FIRSTDATE|FIRSTNONBLANK|FIRSTNONBLANKVALUE|FIXED|FLOOR|FORMAT|GCD|GENERATE|GENERATEALL|GENERATESERIES|GEOMEAN|GEOMEANX|GROUPBY|HASONEFILTER|HASONEVALUE|HOUR|IF|IF\.EAGER|IFERROR|IGNORE|INT|INTERSECT|ISBLANK|ISCROSSFILTERED|ISEMPTY|ISERROR|ISEVEN|ISFILTERED|ISINSCOPE|ISLOGICAL|ISNONTEXT|ISNUMBER|ISO\.CEILING|ISODD|ISONORAFTER|ISSELECTEDMEASURE|ISSUBTOTAL|ISTEXT|KEEPFILTERS|KEYWORDMATCH|LASTDATE|LASTNONBLANK|LASTNONBLANKVALUE|LCM|LEFT|LEN|LN|LOG|LOG10|LOOKUPVALUE|LOWER|MAX|MAXA|MAXX|MEDIAN|MEDIANX|MID|MIN|MINA|MINUTE|MINX|MOD|MONTH|MROUND|NATURALINNERJOIN|NATURALLEFTOUTERJOIN|NEXTDAY|NEXTMONTH|NEXTQUARTER|NEXTYEAR|NONVISUAL|NORM\.DIST|NORM\.INV|NORM\.S\.DIST|NORM\.S\.INV|NOT|NOW|ODD|OPENINGBALANCEMONTH|OPENINGBALANCEQUARTER|OPENINGBALANCEYEAR|OR|PARALLELPERIOD|PATH|PATHCONTAINS|PATHITEM|PATHITEMREVERSE|PATHLENGTH|PERCENTILE\.EXC|PERCENTILE\.INC|PERCENTILEX\.EXC|PERCENTILEX\.INC|PERMUT|PI|POISSON\.DIST|POWER|PREVIOUSDAY|PREVIOUSMONTH|PREVIOUSQUARTER|PREVIOUSYEAR|PRODUCT|PRODUCTX|QUARTER|QUOTIENT|RADIANS|RAND|RANDBETWEEN|RANK\.EQ|RANKX|RELATED|RELATEDTABLE|REMOVEFILTERS|REPLACE|REPT|RIGHT|ROLLUP|ROLLUPADDISSUBTOTAL|ROLLUPGROUP|ROLLUPISSUBTOTAL|ROUND|ROUNDDOWN|ROUNDUP|ROW|SAMEPERIODLASTYEAR|SAMPLE|SEARCH|SECOND|SELECTCOLUMNS|SELECTEDMEASURE|SELECTEDMEASUREFORMATSTRING|SELECTEDMEASURENAME|SELECTEDVALUE|SIGN|SIN|SINH|SQRT|SQRTPI|STARTOFMONTH|STARTOFQUARTER|STARTOFYEAR|STDEV\.P|STDEV\.S|STDEVX\.P|STDEVX\.S|SUBSTITUTE|SUBSTITUTEWITHINDEX|SUM|SUMMARIZE|SUMMARIZECOLUMNS|SUMX|SWITCH|T\.DIST|T\.DIST\.2T|T\.DIST\.RT|T\.INV|T\.INV\.2T|TAN|TANH|TIME|TIMEVALUE|TODAY|TOPN|TOPNPERLEVEL|TOPNSKIP|TOTALMTD|TOTALQTD|TOTALYTD|TREATAS|TRIM|TRUE|TRUNC|UNICHAR|UNICODE|UNION|UPPER|USERELATIONSHIP|USERNAME|USEROBJECTID|USERPRINCIPALNAME|UTCNOW|UTCTODAY|VALUE|VALUES|VAR\.P|VAR\.S|VARX\.P|VARX\.S|WEEKDAY|WEEKNUM|XIRR|XNPV|YEAR|YEARFRAC)(?=\s*\()/i,
      keyword: /\b(?:DEFINE|EVALUATE|MEASURE|ORDER\s+BY|RETURN|VAR|START\s+AT|ASC|DESC)\b/i,
      boolean: {
        pattern: /\b(?:FALSE|NULL|TRUE)\b/i,
        alias: "constant"
      },
      number: /\b\d+(?:\.\d*)?|\B\.\d+\b/,
      operator: /:=|[-+*\/=^]|&&?|\|\||<(?:=>?|<|>)?|>[>=]?|\b(?:IN|NOT)\b/i,
      punctuation: /[;\[\](){}`,.]/
    };
  }
  return dax_1;
}
var dhall_1;
var hasRequiredDhall;
function requireDhall() {
  if (hasRequiredDhall) return dhall_1;
  hasRequiredDhall = 1;
  dhall_1 = dhall;
  dhall.displayName = "dhall";
  dhall.aliases = [];
  function dhall(Prism2) {
    Prism2.languages.dhall = {
      // Multi-line comments can be nested. E.g. {- foo {- bar -} -}
      // The multi-line pattern is essentially this:
      //   \{-(?:[^-{]|-(?!\})|\{(?!-)|<SELF>)*-\}
      comment: /--.*|\{-(?:[^-{]|-(?!\})|\{(?!-)|\{-(?:[^-{]|-(?!\})|\{(?!-))*-\})*-\}/,
      string: {
        pattern: /"(?:[^"\\]|\\.)*"|''(?:[^']|'(?!')|'''|''\$\{)*''(?!'|\$)/,
        greedy: true,
        inside: {
          interpolation: {
            pattern: /\$\{[^{}]*\}/,
            inside: {
              expression: {
                pattern: /(^\$\{)[\s\S]+(?=\}$)/,
                lookbehind: true,
                alias: "language-dhall",
                inside: null
                // see blow
              },
              punctuation: /\$\{|\}/
            }
          }
        }
      },
      label: {
        pattern: /`[^`]*`/,
        greedy: true
      },
      url: {
        // https://github.com/dhall-lang/dhall-lang/blob/5fde8ef1bead6fb4e999d3c1ffe7044cd019d63a/standard/dhall.abnf#L596
        pattern: /\bhttps?:\/\/[\w.:%!$&'*+;=@~-]+(?:\/[\w.:%!$&'*+;=@~-]*)*(?:\?[/?\w.:%!$&'*+;=@~-]*)?/,
        greedy: true
      },
      env: {
        // https://github.com/dhall-lang/dhall-lang/blob/5fde8ef1bead6fb4e999d3c1ffe7044cd019d63a/standard/dhall.abnf#L661
        pattern: /\benv:(?:(?!\d)\w+|"(?:[^"\\=]|\\.)*")/,
        greedy: true,
        inside: {
          function: /^env/,
          operator: /^:/,
          variable: /[\s\S]+/
        }
      },
      hash: {
        // https://github.com/dhall-lang/dhall-lang/blob/5fde8ef1bead6fb4e999d3c1ffe7044cd019d63a/standard/dhall.abnf#L725
        pattern: /\bsha256:[\da-fA-F]{64}\b/,
        inside: {
          function: /sha256/,
          operator: /:/,
          number: /[\da-fA-F]{64}/
        }
      },
      // https://github.com/dhall-lang/dhall-lang/blob/5fde8ef1bead6fb4e999d3c1ffe7044cd019d63a/standard/dhall.abnf#L359
      keyword: /\b(?:as|assert|else|forall|if|in|let|merge|missing|then|toMap|using|with)\b|\u2200/,
      builtin: /\b(?:None|Some)\b/,
      boolean: /\b(?:False|True)\b/,
      number: /\bNaN\b|-?\bInfinity\b|[+-]?\b(?:0x[\da-fA-F]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/,
      operator: /\/\\|\/\/\\\\|&&|\|\||===|[!=]=|\/\/|->|\+\+|::|[+*#@=:?<>|\\\u2227\u2a53\u2261\u2afd\u03bb\u2192]/,
      punctuation: /\.\.|[{}\[\](),./]/,
      // we'll just assume that every capital word left is a type name
      "class-name": /\b[A-Z]\w*\b/
    };
    Prism2.languages.dhall.string.inside.interpolation.inside.expression.inside = Prism2.languages.dhall;
  }
  return dhall_1;
}
var diff_1;
var hasRequiredDiff;
function requireDiff() {
  if (hasRequiredDiff) return diff_1;
  hasRequiredDiff = 1;
  diff_1 = diff;
  diff.displayName = "diff";
  diff.aliases = [];
  function diff(Prism2) {
    (function(Prism3) {
      Prism3.languages.diff = {
        coord: [
          // Match all kinds of coord lines (prefixed by "+++", "---" or "***").
          /^(?:\*{3}|-{3}|\+{3}).*$/m,
          // Match "@@ ... @@" coord lines in unified diff.
          /^@@.*@@$/m,
          // Match coord lines in normal diff (starts with a number).
          /^\d.*$/m
        ]
        // deleted, inserted, unchanged, diff
      };
      var PREFIXES = {
        "deleted-sign": "-",
        "deleted-arrow": "<",
        "inserted-sign": "+",
        "inserted-arrow": ">",
        unchanged: " ",
        diff: "!"
      };
      Object.keys(PREFIXES).forEach(function(name) {
        var prefix = PREFIXES[name];
        var alias2 = [];
        if (!/^\w+$/.test(name)) {
          alias2.push(/\w+/.exec(name)[0]);
        }
        if (name === "diff") {
          alias2.push("bold");
        }
        Prism3.languages.diff[name] = {
          pattern: RegExp(
            "^(?:[" + prefix + "].*(?:\r\n?|\n|(?![\\s\\S])))+",
            "m"
          ),
          alias: alias2,
          inside: {
            line: {
              pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/,
              lookbehind: true
            },
            prefix: {
              pattern: /[\s\S]/,
              alias: /\w+/.exec(name)[0]
            }
          }
        };
      });
      Object.defineProperty(Prism3.languages.diff, "PREFIXES", {
        value: PREFIXES
      });
    })(Prism2);
  }
  return diff_1;
}
var markupTemplating_1;
var hasRequiredMarkupTemplating;
function requireMarkupTemplating() {
  if (hasRequiredMarkupTemplating) return markupTemplating_1;
  hasRequiredMarkupTemplating = 1;
  markupTemplating_1 = markupTemplating;
  markupTemplating.displayName = "markupTemplating";
  markupTemplating.aliases = [];
  function markupTemplating(Prism2) {
    (function(Prism3) {
      function getPlaceholder(language, index) {
        return "___" + language.toUpperCase() + index + "___";
      }
      Object.defineProperties(Prism3.languages["markup-templating"] = {}, {
        buildPlaceholders: {
          /**
           * Tokenize all inline templating expressions matching `placeholderPattern`.
           *
           * If `replaceFilter` is provided, only matches of `placeholderPattern` for which `replaceFilter` returns
           * `true` will be replaced.
           *
           * @param {object} env The environment of the `before-tokenize` hook.
           * @param {string} language The language id.
           * @param {RegExp} placeholderPattern The matches of this pattern will be replaced by placeholders.
           * @param {(match: string) => boolean} [replaceFilter]
           */
          value: function(env, language, placeholderPattern, replaceFilter) {
            if (env.language !== language) {
              return;
            }
            var tokenStack = env.tokenStack = [];
            env.code = env.code.replace(placeholderPattern, function(match) {
              if (typeof replaceFilter === "function" && !replaceFilter(match)) {
                return match;
              }
              var i = tokenStack.length;
              var placeholder;
              while (env.code.indexOf(placeholder = getPlaceholder(language, i)) !== -1) {
                ++i;
              }
              tokenStack[i] = match;
              return placeholder;
            });
            env.grammar = Prism3.languages.markup;
          }
        },
        tokenizePlaceholders: {
          /**
           * Replace placeholders with proper tokens after tokenizing.
           *
           * @param {object} env The environment of the `after-tokenize` hook.
           * @param {string} language The language id.
           */
          value: function(env, language) {
            if (env.language !== language || !env.tokenStack) {
              return;
            }
            env.grammar = Prism3.languages[language];
            var j = 0;
            var keys = Object.keys(env.tokenStack);
            function walkTokens(tokens) {
              for (var i = 0; i < tokens.length; i++) {
                if (j >= keys.length) {
                  break;
                }
                var token = tokens[i];
                if (typeof token === "string" || token.content && typeof token.content === "string") {
                  var k = keys[j];
                  var t = env.tokenStack[k];
                  var s = typeof token === "string" ? token : token.content;
                  var placeholder = getPlaceholder(language, k);
                  var index = s.indexOf(placeholder);
                  if (index > -1) {
                    ++j;
                    var before = s.substring(0, index);
                    var middle = new Prism3.Token(
                      language,
                      Prism3.tokenize(t, env.grammar),
                      "language-" + language,
                      t
                    );
                    var after = s.substring(index + placeholder.length);
                    var replacement = [];
                    if (before) {
                      replacement.push.apply(replacement, walkTokens([before]));
                    }
                    replacement.push(middle);
                    if (after) {
                      replacement.push.apply(replacement, walkTokens([after]));
                    }
                    if (typeof token === "string") {
                      tokens.splice.apply(tokens, [i, 1].concat(replacement));
                    } else {
                      token.content = replacement;
                    }
                  }
                } else if (token.content) {
                  walkTokens(token.content);
                }
              }
              return tokens;
            }
            walkTokens(env.tokens);
          }
        }
      });
    })(Prism2);
  }
  return markupTemplating_1;
}
var django_1;
var hasRequiredDjango;
function requireDjango() {
  if (hasRequiredDjango) return django_1;
  hasRequiredDjango = 1;
  var refractorMarkupTemplating = requireMarkupTemplating();
  django_1 = django;
  django.displayName = "django";
  django.aliases = ["jinja2"];
  function django(Prism2) {
    Prism2.register(refractorMarkupTemplating);
    (function(Prism3) {
      Prism3.languages.django = {
        comment: /^\{#[\s\S]*?#\}$/,
        tag: {
          pattern: /(^\{%[+-]?\s*)\w+/,
          lookbehind: true,
          alias: "keyword"
        },
        delimiter: {
          pattern: /^\{[{%][+-]?|[+-]?[}%]\}$/,
          alias: "punctuation"
        },
        string: {
          pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        },
        filter: {
          pattern: /(\|)\w+/,
          lookbehind: true,
          alias: "function"
        },
        test: {
          pattern: /(\bis\s+(?:not\s+)?)(?!not\b)\w+/,
          lookbehind: true,
          alias: "function"
        },
        function: /\b[a-z_]\w+(?=\s*\()/i,
        keyword: /\b(?:and|as|by|else|for|if|import|in|is|loop|not|or|recursive|with|without)\b/,
        operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
        number: /\b\d+(?:\.\d+)?\b/,
        boolean: /[Ff]alse|[Nn]one|[Tt]rue/,
        variable: /\b\w+\b/,
        punctuation: /[{}[\](),.:;]/
      };
      var pattern = /\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}|\{#[\s\S]*?#\}/g;
      var markupTemplating = Prism3.languages["markup-templating"];
      Prism3.hooks.add("before-tokenize", function(env) {
        markupTemplating.buildPlaceholders(env, "django", pattern);
      });
      Prism3.hooks.add("after-tokenize", function(env) {
        markupTemplating.tokenizePlaceholders(env, "django");
      });
      Prism3.languages.jinja2 = Prism3.languages.django;
      Prism3.hooks.add("before-tokenize", function(env) {
        markupTemplating.buildPlaceholders(env, "jinja2", pattern);
      });
      Prism3.hooks.add("after-tokenize", function(env) {
        markupTemplating.tokenizePlaceholders(env, "jinja2");
      });
    })(Prism2);
  }
  return django_1;
}
var dnsZoneFile_1;
var hasRequiredDnsZoneFile;
function requireDnsZoneFile() {
  if (hasRequiredDnsZoneFile) return dnsZoneFile_1;
  hasRequiredDnsZoneFile = 1;
  dnsZoneFile_1 = dnsZoneFile;
  dnsZoneFile.displayName = "dnsZoneFile";
  dnsZoneFile.aliases = [];
  function dnsZoneFile(Prism2) {
    Prism2.languages["dns-zone-file"] = {
      comment: /;.*/,
      string: {
        pattern: /"(?:\\.|[^"\\\r\n])*"/,
        greedy: true
      },
      variable: [
        {
          pattern: /(^\$ORIGIN[ \t]+)\S+/m,
          lookbehind: true
        },
        {
          pattern: /(^|\s)@(?=\s|$)/,
          lookbehind: true
        }
      ],
      keyword: /^\$(?:INCLUDE|ORIGIN|TTL)(?=\s|$)/m,
      class: {
        // https://tools.ietf.org/html/rfc1035#page-13
        pattern: /(^|\s)(?:CH|CS|HS|IN)(?=\s|$)/,
        lookbehind: true,
        alias: "keyword"
      },
      type: {
        // https://en.wikipedia.org/wiki/List_of_DNS_record_types
        pattern: /(^|\s)(?:A|A6|AAAA|AFSDB|APL|ATMA|CAA|CDNSKEY|CDS|CERT|CNAME|DHCID|DLV|DNAME|DNSKEY|DS|EID|GID|GPOS|HINFO|HIP|IPSECKEY|ISDN|KEY|KX|LOC|MAILA|MAILB|MB|MD|MF|MG|MINFO|MR|MX|NAPTR|NB|NBSTAT|NIMLOC|NINFO|NS|NSAP|NSAP-PTR|NSEC|NSEC3|NSEC3PARAM|NULL|NXT|OPENPGPKEY|PTR|PX|RKEY|RP|RRSIG|RT|SIG|SINK|SMIMEA|SOA|SPF|SRV|SSHFP|TA|TKEY|TLSA|TSIG|TXT|UID|UINFO|UNSPEC|URI|WKS|X25)(?=\s|$)/,
        lookbehind: true,
        alias: "keyword"
      },
      punctuation: /[()]/
    };
    Prism2.languages["dns-zone"] = Prism2.languages["dns-zone-file"];
  }
  return dnsZoneFile_1;
}
var docker_1;
var hasRequiredDocker;
function requireDocker() {
  if (hasRequiredDocker) return docker_1;
  hasRequiredDocker = 1;
  docker_1 = docker;
  docker.displayName = "docker";
  docker.aliases = ["dockerfile"];
  function docker(Prism2) {
    (function(Prism3) {
      var spaceAfterBackSlash = /\\[\r\n](?:\s|\\[\r\n]|#.*(?!.))*(?![\s#]|\\[\r\n])/.source;
      var space = /(?:[ \t]+(?![ \t])(?:<SP_BS>)?|<SP_BS>)/.source.replace(
        /<SP_BS>/g,
        function() {
          return spaceAfterBackSlash;
        }
      );
      var string = /"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*"|'(?:[^'\\\r\n]|\\(?:\r\n|[\s\S]))*'/.source;
      var option = /--[\w-]+=(?:<STR>|(?!["'])(?:[^\s\\]|\\.)+)/.source.replace(
        /<STR>/g,
        function() {
          return string;
        }
      );
      var stringRule = {
        pattern: RegExp(string),
        greedy: true
      };
      var commentRule = {
        pattern: /(^[ \t]*)#.*/m,
        lookbehind: true,
        greedy: true
      };
      function re(source, flags) {
        source = source.replace(/<OPT>/g, function() {
          return option;
        }).replace(/<SP>/g, function() {
          return space;
        });
        return RegExp(source, flags);
      }
      Prism3.languages.docker = {
        instruction: {
          pattern: /(^[ \t]*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)(?:\\.|[^\r\n\\])*(?:\\$(?:\s|#.*$)*(?![\s#])(?:\\.|[^\r\n\\])*)*/im,
          lookbehind: true,
          greedy: true,
          inside: {
            options: {
              pattern: re(
                /(^(?:ONBUILD<SP>)?\w+<SP>)<OPT>(?:<SP><OPT>)*/.source,
                "i"
              ),
              lookbehind: true,
              greedy: true,
              inside: {
                property: {
                  pattern: /(^|\s)--[\w-]+/,
                  lookbehind: true
                },
                string: [
                  stringRule,
                  {
                    pattern: /(=)(?!["'])(?:[^\s\\]|\\.)+/,
                    lookbehind: true
                  }
                ],
                operator: /\\$/m,
                punctuation: /=/
              }
            },
            keyword: [
              {
                // https://docs.docker.com/engine/reference/builder/#healthcheck
                pattern: re(
                  /(^(?:ONBUILD<SP>)?HEALTHCHECK<SP>(?:<OPT><SP>)*)(?:CMD|NONE)\b/.source,
                  "i"
                ),
                lookbehind: true,
                greedy: true
              },
              {
                // https://docs.docker.com/engine/reference/builder/#from
                pattern: re(
                  /(^(?:ONBUILD<SP>)?FROM<SP>(?:<OPT><SP>)*(?!--)[^ \t\\]+<SP>)AS/.source,
                  "i"
                ),
                lookbehind: true,
                greedy: true
              },
              {
                // https://docs.docker.com/engine/reference/builder/#onbuild
                pattern: re(/(^ONBUILD<SP>)\w+/.source, "i"),
                lookbehind: true,
                greedy: true
              },
              {
                pattern: /^\w+/,
                greedy: true
              }
            ],
            comment: commentRule,
            string: stringRule,
            variable: /\$(?:\w+|\{[^{}"'\\]*\})/,
            operator: /\\$/m
          }
        },
        comment: commentRule
      };
      Prism3.languages.dockerfile = Prism3.languages.docker;
    })(Prism2);
  }
  return docker_1;
}
var dot_1;
var hasRequiredDot;
function requireDot() {
  if (hasRequiredDot) return dot_1;
  hasRequiredDot = 1;
  dot_1 = dot;
  dot.displayName = "dot";
  dot.aliases = ["gv"];
  function dot(Prism2) {
    (function(Prism3) {
      var ID = "(?:" + [
        // an identifier
        /[a-zA-Z_\x80-\uFFFF][\w\x80-\uFFFF]*/.source,
        // a number
        /-?(?:\.\d+|\d+(?:\.\d*)?)/.source,
        // a double-quoted string
        /"[^"\\]*(?:\\[\s\S][^"\\]*)*"/.source,
        // HTML-like string
        /<(?:[^<>]|(?!<!--)<(?:[^<>"']|"[^"]*"|'[^']*')+>|<!--(?:[^-]|-(?!->))*-->)*>/.source
      ].join("|") + ")";
      var IDInside = {
        markup: {
          pattern: /(^<)[\s\S]+(?=>$)/,
          lookbehind: true,
          alias: ["language-markup", "language-html", "language-xml"],
          inside: Prism3.languages.markup
        }
      };
      function withID(source, flags) {
        return RegExp(
          source.replace(/<ID>/g, function() {
            return ID;
          }),
          flags
        );
      }
      Prism3.languages.dot = {
        comment: {
          pattern: /\/\/.*|\/\*[\s\S]*?\*\/|^#.*/m,
          greedy: true
        },
        "graph-name": {
          pattern: withID(
            /(\b(?:digraph|graph|subgraph)[ \t\r\n]+)<ID>/.source,
            "i"
          ),
          lookbehind: true,
          greedy: true,
          alias: "class-name",
          inside: IDInside
        },
        "attr-value": {
          pattern: withID(/(=[ \t\r\n]*)<ID>/.source),
          lookbehind: true,
          greedy: true,
          inside: IDInside
        },
        "attr-name": {
          pattern: withID(/([\[;, \t\r\n])<ID>(?=[ \t\r\n]*=)/.source),
          lookbehind: true,
          greedy: true,
          inside: IDInside
        },
        keyword: /\b(?:digraph|edge|graph|node|strict|subgraph)\b/i,
        "compass-point": {
          pattern: /(:[ \t\r\n]*)(?:[ewc_]|[ns][ew]?)(?![\w\x80-\uFFFF])/,
          lookbehind: true,
          alias: "builtin"
        },
        node: {
          pattern: withID(/(^|[^-.\w\x80-\uFFFF\\])<ID>/.source),
          lookbehind: true,
          greedy: true,
          inside: IDInside
        },
        operator: /[=:]|-[->]/,
        punctuation: /[\[\]{};,]/
      };
      Prism3.languages.gv = Prism3.languages.dot;
    })(Prism2);
  }
  return dot_1;
}
var ebnf_1;
var hasRequiredEbnf;
function requireEbnf() {
  if (hasRequiredEbnf) return ebnf_1;
  hasRequiredEbnf = 1;
  ebnf_1 = ebnf;
  ebnf.displayName = "ebnf";
  ebnf.aliases = [];
  function ebnf(Prism2) {
    Prism2.languages.ebnf = {
      comment: /\(\*[\s\S]*?\*\)/,
      string: {
        pattern: /"[^"\r\n]*"|'[^'\r\n]*'/,
        greedy: true
      },
      special: {
        pattern: /\?[^?\r\n]*\?/,
        greedy: true,
        alias: "class-name"
      },
      definition: {
        pattern: /^([\t ]*)[a-z]\w*(?:[ \t]+[a-z]\w*)*(?=\s*=)/im,
        lookbehind: true,
        alias: ["rule", "keyword"]
      },
      rule: /\b[a-z]\w*(?:[ \t]+[a-z]\w*)*\b/i,
      punctuation: /\([:/]|[:/]\)|[.,;()[\]{}]/,
      operator: /[-=|*/!]/
    };
  }
  return ebnf_1;
}
var editorconfig_1;
var hasRequiredEditorconfig;
function requireEditorconfig() {
  if (hasRequiredEditorconfig) return editorconfig_1;
  hasRequiredEditorconfig = 1;
  editorconfig_1 = editorconfig;
  editorconfig.displayName = "editorconfig";
  editorconfig.aliases = [];
  function editorconfig(Prism2) {
    Prism2.languages.editorconfig = {
      // https://editorconfig-specification.readthedocs.io
      comment: /[;#].*/,
      section: {
        pattern: /(^[ \t]*)\[.+\]/m,
        lookbehind: true,
        alias: "selector",
        inside: {
          regex: /\\\\[\[\]{},!?.*]/,
          // Escape special characters with '\\'
          operator: /[!?]|\.\.|\*{1,2}/,
          punctuation: /[\[\]{},]/
        }
      },
      key: {
        pattern: /(^[ \t]*)[^\s=]+(?=[ \t]*=)/m,
        lookbehind: true,
        alias: "attr-name"
      },
      value: {
        pattern: /=.*/,
        alias: "attr-value",
        inside: {
          punctuation: /^=/
        }
      }
    };
  }
  return editorconfig_1;
}
var eiffel_1;
var hasRequiredEiffel;
function requireEiffel() {
  if (hasRequiredEiffel) return eiffel_1;
  hasRequiredEiffel = 1;
  eiffel_1 = eiffel;
  eiffel.displayName = "eiffel";
  eiffel.aliases = [];
  function eiffel(Prism2) {
    Prism2.languages.eiffel = {
      comment: /--.*/,
      string: [
        // Aligned-verbatim-strings
        {
          pattern: /"([^[]*)\[[\s\S]*?\]\1"/,
          greedy: true
        },
        // Non-aligned-verbatim-strings
        {
          pattern: /"([^{]*)\{[\s\S]*?\}\1"/,
          greedy: true
        },
        // Single-line string
        {
          pattern: /"(?:%(?:(?!\n)\s)*\n\s*%|%\S|[^%"\r\n])*"/,
          greedy: true
        }
      ],
      // normal char | special char | char code
      char: /'(?:%.|[^%'\r\n])+'/,
      keyword: /\b(?:across|agent|alias|all|and|as|assign|attached|attribute|check|class|convert|create|Current|debug|deferred|detachable|do|else|elseif|end|ensure|expanded|export|external|feature|from|frozen|if|implies|inherit|inspect|invariant|like|local|loop|not|note|obsolete|old|once|or|Precursor|redefine|rename|require|rescue|Result|retry|select|separate|some|then|undefine|until|variant|Void|when|xor)\b/i,
      boolean: /\b(?:False|True)\b/i,
      // Convention: class-names are always all upper-case characters
      "class-name": /\b[A-Z][\dA-Z_]*\b/,
      number: [
        // hexa | octal | bin
        /\b0[xcb][\da-f](?:_*[\da-f])*\b/i,
        // Decimal
        /(?:\b\d(?:_*\d)*)?\.(?:(?:\d(?:_*\d)*)?e[+-]?)?\d(?:_*\d)*\b|\b\d(?:_*\d)*\b\.?/i
      ],
      punctuation: /:=|<<|>>|\(\||\|\)|->|\.(?=\w)|[{}[\];(),:?]/,
      operator: /\\\\|\|\.\.\||\.\.|\/[~\/=]?|[><]=?|[-+*^=~]/
    };
  }
  return eiffel_1;
}
var ejs_1;
var hasRequiredEjs;
function requireEjs() {
  if (hasRequiredEjs) return ejs_1;
  hasRequiredEjs = 1;
  var refractorMarkupTemplating = requireMarkupTemplating();
  ejs_1 = ejs;
  ejs.displayName = "ejs";
  ejs.aliases = ["eta"];
  function ejs(Prism2) {
    Prism2.register(refractorMarkupTemplating);
    (function(Prism3) {
      Prism3.languages.ejs = {
        delimiter: {
          pattern: /^<%[-_=]?|[-_]?%>$/,
          alias: "punctuation"
        },
        comment: /^#[\s\S]*/,
        "language-javascript": {
          pattern: /[\s\S]+/,
          inside: Prism3.languages.javascript
        }
      };
      Prism3.hooks.add("before-tokenize", function(env) {
        var ejsPattern = /<%(?!%)[\s\S]+?%>/g;
        Prism3.languages["markup-templating"].buildPlaceholders(
          env,
          "ejs",
          ejsPattern
        );
      });
      Prism3.hooks.add("after-tokenize", function(env) {
        Prism3.languages["markup-templating"].tokenizePlaceholders(env, "ejs");
      });
      Prism3.languages.eta = Prism3.languages.ejs;
    })(Prism2);
  }
  return ejs_1;
}
var elixir_1;
var hasRequiredElixir;
function requireElixir() {
  if (hasRequiredElixir) return elixir_1;
  hasRequiredElixir = 1;
  elixir_1 = elixir;
  elixir.displayName = "elixir";
  elixir.aliases = [];
  function elixir(Prism2) {
    Prism2.languages.elixir = {
      doc: {
        pattern: /@(?:doc|moduledoc)\s+(?:("""|''')[\s\S]*?\1|("|')(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2)/,
        inside: {
          attribute: /^@\w+/,
          string: /['"][\s\S]+/
        }
      },
      comment: {
        pattern: /#.*/,
        greedy: true
      },
      // ~r"""foo""" (multi-line), ~r'''foo''' (multi-line), ~r/foo/, ~r|foo|, ~r"foo", ~r'foo', ~r(foo), ~r[foo], ~r{foo}, ~r<foo>
      regex: {
        pattern: /~[rR](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[uismxfr]*/,
        greedy: true
      },
      string: [
        {
          // ~s"""foo""" (multi-line), ~s'''foo''' (multi-line), ~s/foo/, ~s|foo|, ~s"foo", ~s'foo', ~s(foo), ~s[foo], ~s{foo} (with interpolation care), ~s<foo>
          pattern: /~[cCsSwW](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|#\{[^}]+\}|#(?!\{)|[^#\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[csa]?/,
          greedy: true,
          inside: {
            // See interpolation below
          }
        },
        {
          pattern: /("""|''')[\s\S]*?\1/,
          greedy: true,
          inside: {
            // See interpolation below
          }
        },
        {
          // Multi-line strings are allowed
          pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          greedy: true,
          inside: {
            // See interpolation below
          }
        }
      ],
      atom: {
        // Look-behind prevents bad highlighting of the :: operator
        pattern: /(^|[^:]):\w+/,
        lookbehind: true,
        alias: "symbol"
      },
      module: {
        pattern: /\b[A-Z]\w*\b/,
        alias: "class-name"
      },
      // Look-ahead prevents bad highlighting of the :: operator
      "attr-name": /\b\w+\??:(?!:)/,
      argument: {
        // Look-behind prevents bad highlighting of the && operator
        pattern: /(^|[^&])&\d+/,
        lookbehind: true,
        alias: "variable"
      },
      attribute: {
        pattern: /@\w+/,
        alias: "variable"
      },
      function: /\b[_a-zA-Z]\w*[?!]?(?:(?=\s*(?:\.\s*)?\()|(?=\/\d))/,
      number: /\b(?:0[box][a-f\d_]+|\d[\d_]*)(?:\.[\d_]+)?(?:e[+-]?[\d_]+)?\b/i,
      keyword: /\b(?:after|alias|and|case|catch|cond|def(?:callback|delegate|exception|impl|macro|module|n|np|p|protocol|struct)?|do|else|end|fn|for|if|import|not|or|quote|raise|require|rescue|try|unless|unquote|use|when)\b/,
      boolean: /\b(?:false|nil|true)\b/,
      operator: [
        /\bin\b|&&?|\|[|>]?|\\\\|::|\.\.\.?|\+\+?|-[->]?|<[-=>]|>=|!==?|\B!|=(?:==?|[>~])?|[*\/^]/,
        {
          // We don't want to match <<
          pattern: /([^<])<(?!<)/,
          lookbehind: true
        },
        {
          // We don't want to match >>
          pattern: /([^>])>(?!>)/,
          lookbehind: true
        }
      ],
      punctuation: /<<|>>|[.,%\[\]{}()]/
    };
    Prism2.languages.elixir.string.forEach(function(o) {
      o.inside = {
        interpolation: {
          pattern: /#\{[^}]+\}/,
          inside: {
            delimiter: {
              pattern: /^#\{|\}$/,
              alias: "punctuation"
            },
            rest: Prism2.languages.elixir
          }
        }
      };
    });
  }
  return elixir_1;
}
var elm_1;
var hasRequiredElm;
function requireElm() {
  if (hasRequiredElm) return elm_1;
  hasRequiredElm = 1;
  elm_1 = elm;
  elm.displayName = "elm";
  elm.aliases = [];
  function elm(Prism2) {
    Prism2.languages.elm = {
      comment: /--.*|\{-[\s\S]*?-\}/,
      char: {
        pattern: /'(?:[^\\'\r\n]|\\(?:[abfnrtv\\']|\d+|x[0-9a-fA-F]+|u\{[0-9a-fA-F]+\}))'/,
        greedy: true
      },
      string: [
        {
          // Multiline strings are wrapped in triple ". Quotes may appear unescaped.
          pattern: /"""[\s\S]*?"""/,
          greedy: true
        },
        {
          pattern: /"(?:[^\\"\r\n]|\\.)*"/,
          greedy: true
        }
      ],
      "import-statement": {
        // The imported or hidden names are not included in this import
        // statement. This is because we want to highlight those exactly like
        // we do for the names in the program.
        pattern: /(^[\t ]*)import\s+[A-Z]\w*(?:\.[A-Z]\w*)*(?:\s+as\s+(?:[A-Z]\w*)(?:\.[A-Z]\w*)*)?(?:\s+exposing\s+)?/m,
        lookbehind: true,
        inside: {
          keyword: /\b(?:as|exposing|import)\b/
        }
      },
      keyword: /\b(?:alias|as|case|else|exposing|if|in|infixl|infixr|let|module|of|then|type)\b/,
      // These are builtin variables only. Constructors are highlighted later as a constant.
      builtin: /\b(?:abs|acos|always|asin|atan|atan2|ceiling|clamp|compare|cos|curry|degrees|e|flip|floor|fromPolar|identity|isInfinite|isNaN|logBase|max|min|negate|never|not|pi|radians|rem|round|sin|sqrt|tan|toFloat|toPolar|toString|truncate|turns|uncurry|xor)\b/,
      // decimal integers and floating point numbers | hexadecimal integers
      number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0x[0-9a-f]+)\b/i,
      // Most of this is needed because of the meaning of a single '.'.
      // If it stands alone freely, it is the function composition.
      // It may also be a separator between a module name and an identifier => no
      // operator. If it comes together with other special characters it is an
      // operator too.
      // Valid operator characters in 0.18: +-/*=.$<>:&|^?%#@~!
      // Ref: https://groups.google.com/forum/#!msg/elm-dev/0AHSnDdkSkQ/E0SVU70JEQAJ
      operator: /\s\.\s|[+\-/*=.$<>:&|^?%#@~!]{2,}|[+\-/*=$<>:&|^?%#@~!]/,
      // In Elm, nearly everything is a variable, do not highlight these.
      hvariable: /\b(?:[A-Z]\w*\.)*[a-z]\w*\b/,
      constant: /\b(?:[A-Z]\w*\.)*[A-Z]\w*\b/,
      punctuation: /[{}[\]|(),.:]/
    };
  }
  return elm_1;
}
var erb_1;
var hasRequiredErb;
function requireErb() {
  if (hasRequiredErb) return erb_1;
  hasRequiredErb = 1;
  var refractorRuby = requireRuby();
  var refractorMarkupTemplating = requireMarkupTemplating();
  erb_1 = erb;
  erb.displayName = "erb";
  erb.aliases = [];
  function erb(Prism2) {
    Prism2.register(refractorRuby);
    Prism2.register(refractorMarkupTemplating);
    (function(Prism3) {
      Prism3.languages.erb = {
        delimiter: {
          pattern: /^(\s*)<%=?|%>(?=\s*$)/,
          lookbehind: true,
          alias: "punctuation"
        },
        ruby: {
          pattern: /\s*\S[\s\S]*/,
          alias: "language-ruby",
          inside: Prism3.languages.ruby
        }
      };
      Prism3.hooks.add("before-tokenize", function(env) {
        var erbPattern = /<%=?(?:[^\r\n]|[\r\n](?!=begin)|[\r\n]=begin\s(?:[^\r\n]|[\r\n](?!=end))*[\r\n]=end)+?%>/g;
        Prism3.languages["markup-templating"].buildPlaceholders(
          env,
          "erb",
          erbPattern
        );
      });
      Prism3.hooks.add("after-tokenize", function(env) {
        Prism3.languages["markup-templating"].tokenizePlaceholders(env, "erb");
      });
    })(Prism2);
  }
  return erb_1;
}
var erlang_1;
var hasRequiredErlang;
function requireErlang() {
  if (hasRequiredErlang) return erlang_1;
  hasRequiredErlang = 1;
  erlang_1 = erlang;
  erlang.displayName = "erlang";
  erlang.aliases = [];
  function erlang(Prism2) {
    Prism2.languages.erlang = {
      comment: /%.+/,
      string: {
        pattern: /"(?:\\.|[^\\"\r\n])*"/,
        greedy: true
      },
      "quoted-function": {
        pattern: /'(?:\\.|[^\\'\r\n])+'(?=\()/,
        alias: "function"
      },
      "quoted-atom": {
        pattern: /'(?:\\.|[^\\'\r\n])+'/,
        alias: "atom"
      },
      boolean: /\b(?:false|true)\b/,
      keyword: /\b(?:after|case|catch|end|fun|if|of|receive|try|when)\b/,
      number: [
        /\$\\?./,
        /\b\d+#[a-z0-9]+/i,
        /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i
      ],
      function: /\b[a-z][\w@]*(?=\()/,
      variable: {
        // Look-behind is used to prevent wrong highlighting of atoms containing "@"
        pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/,
        lookbehind: true
      },
      operator: [
        /[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:and|andalso|band|bnot|bor|bsl|bsr|bxor|div|not|or|orelse|rem|xor)\b/,
        {
          // We don't want to match <<
          pattern: /(^|[^<])<(?!<)/,
          lookbehind: true
        },
        {
          // We don't want to match >>
          pattern: /(^|[^>])>(?!>)/,
          lookbehind: true
        }
      ],
      atom: /\b[a-z][\w@]*/,
      punctuation: /[()[\]{}:;,.#|]|<<|>>/
    };
  }
  return erlang_1;
}
var lua_1;
var hasRequiredLua;
function requireLua() {
  if (hasRequiredLua) return lua_1;
  hasRequiredLua = 1;
  lua_1 = lua;
  lua.displayName = "lua";
  lua.aliases = [];
  function lua(Prism2) {
    Prism2.languages.lua = {
      comment: /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,
      // \z may be used to skip the following space
      string: {
        pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[^z]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,
        greedy: true
      },
      number: /\b0x[a-f\d]+(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
      keyword: /\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
      function: /(?!\d)\w+(?=\s*(?:[({]))/,
      operator: [
        /[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,
        {
          // Match ".." but don't break "..."
          pattern: /(^|[^.])\.\.(?!\.)/,
          lookbehind: true
        }
      ],
      punctuation: /[\[\](){},;]|\.+|:+/
    };
  }
  return lua_1;
}
var etlua_1;
var hasRequiredEtlua;
function requireEtlua() {
  if (hasRequiredEtlua) return etlua_1;
  hasRequiredEtlua = 1;
  var refractorLua = requireLua();
  var refractorMarkupTemplating = requireMarkupTemplating();
  etlua_1 = etlua;
  etlua.displayName = "etlua";
  etlua.aliases = [];
  function etlua(Prism2) {
    Prism2.register(refractorLua);
    Prism2.register(refractorMarkupTemplating);
    (function(Prism3) {
      Prism3.languages.etlua = {
        delimiter: {
          pattern: /^<%[-=]?|-?%>$/,
          alias: "punctuation"
        },
        "language-lua": {
          pattern: /[\s\S]+/,
          inside: Prism3.languages.lua
        }
      };
      Prism3.hooks.add("before-tokenize", function(env) {
        var pattern = /<%[\s\S]+?%>/g;
        Prism3.languages["markup-templating"].buildPlaceholders(
          env,
          "etlua",
          pattern
        );
      });
      Prism3.hooks.add("after-tokenize", function(env) {
        Prism3.languages["markup-templating"].tokenizePlaceholders(env, "etlua");
      });
    })(Prism2);
  }
  return etlua_1;
}
var excelFormula_1;
var hasRequiredExcelFormula;
function requireExcelFormula() {
  if (hasRequiredExcelFormula) return excelFormula_1;
  hasRequiredExcelFormula = 1;
  excelFormula_1 = excelFormula;
  excelFormula.displayName = "excelFormula";
  excelFormula.aliases = [];
  function excelFormula(Prism2) {
    Prism2.languages["excel-formula"] = {
      comment: {
        pattern: /(\bN\(\s*)"(?:[^"]|"")*"(?=\s*\))/i,
        lookbehind: true,
        greedy: true
      },
      string: {
        pattern: /"(?:[^"]|"")*"(?!")/,
        greedy: true
      },
      reference: {
        // https://www.ablebits.com/office-addins-blog/2015/12/08/excel-reference-another-sheet-workbook/
        // Sales!B2
        // 'Winter sales'!B2
        // [Sales.xlsx]Jan!B2:B5
        // D:\Reports\[Sales.xlsx]Jan!B2:B5
        // '[Sales.xlsx]Jan sales'!B2:B5
        // 'D:\Reports\[Sales.xlsx]Jan sales'!B2:B5
        pattern: /(?:'[^']*'|(?:[^\s()[\]{}<>*?"';,$&]*\[[^^\s()[\]{}<>*?"']+\])?\w+)!/,
        greedy: true,
        alias: "string",
        inside: {
          operator: /!$/,
          punctuation: /'/,
          sheet: {
            pattern: /[^[\]]+$/,
            alias: "function"
          },
          file: {
            pattern: /\[[^[\]]+\]$/,
            inside: {
              punctuation: /[[\]]/
            }
          },
          path: /[\s\S]+/
        }
      },
      "function-name": {
        pattern: /\b[A-Z]\w*(?=\()/i,
        alias: "keyword"
      },
      range: {
        pattern: /\$?\b(?:[A-Z]+\$?\d+:\$?[A-Z]+\$?\d+|[A-Z]+:\$?[A-Z]+|\d+:\$?\d+)\b/i,
        alias: "property",
        inside: {
          operator: /:/,
          cell: /\$?[A-Z]+\$?\d+/i,
          column: /\$?[A-Z]+/i,
          row: /\$?\d+/
        }
      },
      cell: {
        // Excel is case insensitive, so the string "foo1" could be either a variable or a cell.
        // To combat this, we match cells case insensitive, if the contain at least one "$", and case sensitive otherwise.
        pattern: /\b[A-Z]+\d+\b|\$[A-Za-z]+\$?\d+\b|\b[A-Za-z]+\$\d+\b/,
        alias: "property"
      },
      number: /(?:\b\d+(?:\.\d+)?|\B\.\d+)(?:e[+-]?\d+)?\b/i,
      boolean: /\b(?:FALSE|TRUE)\b/i,
      operator: /[-+*/^%=&,]|<[=>]?|>=?/,
      punctuation: /[[\]();{}|]/
    };
    Prism2.languages["xlsx"] = Prism2.languages["xls"] = Prism2.languages["excel-formula"];
  }
  return excelFormula_1;
}
var factor_1;
var hasRequiredFactor;
function requireFactor() {
  if (hasRequiredFactor) return factor_1;
  hasRequiredFactor = 1;
  factor_1 = factor;
  factor.displayName = "factor";
  factor.aliases = [];
  function factor(Prism2) {
    (function(Prism3) {
      var comment_inside = {
        function: /\b(?:BUGS?|FIX(?:MES?)?|NOTES?|TODOS?|XX+|HACKS?|WARN(?:ING)?|\?{2,}|!{2,})\b/
      };
      var string_inside = {
        number: /\\[^\s']|%\w/
      };
      var factor2 = {
        comment: [
          {
            // ! single-line exclamation point comments with whitespace after/around the !
            pattern: /(^|\s)(?:! .*|!$)/,
            lookbehind: true,
            inside: comment_inside
          },
          /* from basis/multiline: */
          {
            // /* comment */, /* comment*/
            pattern: /(^|\s)\/\*\s[\s\S]*?\*\/(?=\s|$)/,
            lookbehind: true,
            greedy: true,
            inside: comment_inside
          },
          {
            // ![[ comment ]] , ![===[ comment]===]
            pattern: /(^|\s)!\[(={0,6})\[\s[\s\S]*?\]\2\](?=\s|$)/,
            lookbehind: true,
            greedy: true,
            inside: comment_inside
          }
        ],
        number: [
          {
            // basic base 10 integers 9, -9
            pattern: /(^|\s)[+-]?\d+(?=\s|$)/,
            lookbehind: true
          },
          {
            // base prefix integers 0b010 0o70 0xad 0d10 0XAD -0xa9
            pattern: /(^|\s)[+-]?0(?:b[01]+|o[0-7]+|d\d+|x[\dA-F]+)(?=\s|$)/i,
            lookbehind: true
          },
          {
            // fractional ratios 1/5 -1/5 and the literal float approximations 1/5. -1/5.
            pattern: /(^|\s)[+-]?\d+\/\d+\.?(?=\s|$)/,
            lookbehind: true
          },
          {
            // positive mixed numbers 23+1/5 +23+1/5
            pattern: /(^|\s)\+?\d+\+\d+\/\d+(?=\s|$)/,
            lookbehind: true
          },
          {
            // negative mixed numbers -23-1/5
            pattern: /(^|\s)-\d+-\d+\/\d+(?=\s|$)/,
            lookbehind: true
          },
          {
            // basic decimal floats -0.01 0. .0 .1 -.1 -1. -12.13 +12.13
            // and scientific notation with base 10 exponents 3e4 3e-4 .3e-4
            pattern: /(^|\s)[+-]?(?:\d*\.\d+|\d+\.\d*|\d+)(?:e[+-]?\d+)?(?=\s|$)/i,
            lookbehind: true
          },
          {
            // NAN literal syntax NAN: 80000deadbeef, NAN: a
            pattern: /(^|\s)NAN:\s+[\da-fA-F]+(?=\s|$)/,
            lookbehind: true
          },
          {
            /*
            base prefix floats 0x1.0p3 (8.0) 0b1.010p2 (5.0) 0x1.p1 0b1.11111111p11111...
            "The normalized hex form ±0x1.MMMMMMMMMMMMM[pP]±EEEE allows any floating-point number to be specified precisely.
            The values of MMMMMMMMMMMMM and EEEE map directly to the mantissa and exponent fields of the binary IEEE 754 representation."
            <https://docs.factorcode.org/content/article-syntax-floats.html>
            */
            pattern: /(^|\s)[+-]?0(?:b1\.[01]*|o1\.[0-7]*|d1\.\d*|x1\.[\dA-F]*)p\d+(?=\s|$)/i,
            lookbehind: true
          }
        ],
        // R/ regexp?\/\\/
        regexp: {
          pattern: /(^|\s)R\/\s(?:\\\S|[^\\/])*\/(?:[idmsr]*|[idmsr]+-[idmsr]+)(?=\s|$)/,
          lookbehind: true,
          alias: "number",
          inside: {
            variable: /\\\S/,
            keyword: /[+?*\[\]^$(){}.|]/,
            operator: {
              pattern: /(\/)[idmsr]+(?:-[idmsr]+)?/,
              lookbehind: true
            }
          }
        },
        boolean: {
          pattern: /(^|\s)[tf](?=\s|$)/,
          lookbehind: true
        },
        // SBUF" asd", URL" ://...", P" /etc/"
        "custom-string": {
          pattern: /(^|\s)[A-Z0-9\-]+"\s(?:\\\S|[^"\\])*"/,
          lookbehind: true,
          greedy: true,
          alias: "string",
          inside: {
            number: /\\\S|%\w|\//
          }
        },
        "multiline-string": [
          {
            // STRING: name \n content \n ; -> CONSTANT: name "content" (symbol)
            pattern: /(^|\s)STRING:\s+\S+(?:\n|\r\n).*(?:\n|\r\n)\s*;(?=\s|$)/,
            lookbehind: true,
            greedy: true,
            alias: "string",
            inside: {
              number: string_inside.number,
              // trailing semicolon on its own line
              "semicolon-or-setlocal": {
                pattern: /([\r\n][ \t]*);(?=\s|$)/,
                lookbehind: true,
                alias: "function"
              }
            }
          },
          {
            // HEREDOC: marker \n content \n marker ; -> "content" (immediate)
            pattern: /(^|\s)HEREDOC:\s+\S+(?:\n|\r\n).*(?:\n|\r\n)\s*\S+(?=\s|$)/,
            lookbehind: true,
            greedy: true,
            alias: "string",
            inside: string_inside
          },
          {
            // [[ string ]], [==[ string]==]
            pattern: /(^|\s)\[(={0,6})\[\s[\s\S]*?\]\2\](?=\s|$)/,
            lookbehind: true,
            greedy: true,
            alias: "string",
            inside: string_inside
          }
        ],
        "special-using": {
          pattern: /(^|\s)USING:(?:\s\S+)*(?=\s+;(?:\s|$))/,
          lookbehind: true,
          alias: "function",
          inside: {
            // this is essentially a regex for vocab names, which i don't want to specify
            // but the USING: gets picked up as a vocab name
            string: {
              pattern: /(\s)[^:\s]+/,
              lookbehind: true
            }
          }
        },
        /* this description of stack effect literal syntax is not complete and not as specific as theoretically possible
        trying to do better is more work and regex-computation-time than it's worth though.
        - we'd like to have the "delimiter" parts of the stack effect [ (, --, and ) ] be a different (less-important or comment-like) colour to the stack effect contents
        - we'd like if nested stack effects were treated as such rather than just appearing flat (with `inside`)
        - we'd like if the following variable name conventions were recognised specifically:
        special row variables = ..a b..
        type and stack effect annotations end with a colon = ( quot: ( a: ( -- ) -- b ) -- x ), ( x: number -- )
        word throws unconditional error = *
        any other word-like variable name = a ? q' etc
        https://docs.factorcode.org/content/article-effects.html
        these are pretty complicated to highlight properly without a real parser, and therefore out of scope
        the old pattern, which may be later useful, was: (^|\s)(?:call|execute|eval)?\((?:\s+[^"\r\n\t ]\S*)*?\s+--(?:\s+[^"\n\t ]\S*)*?\s+\)(?=\s|$)
        */
        // current solution is not great
        "stack-effect-delimiter": [
          {
            // opening parenthesis
            pattern: /(^|\s)(?:call|eval|execute)?\((?=\s)/,
            lookbehind: true,
            alias: "operator"
          },
          {
            // middle --
            pattern: /(\s)--(?=\s)/,
            lookbehind: true,
            alias: "operator"
          },
          {
            // closing parenthesis
            pattern: /(\s)\)(?=\s|$)/,
            lookbehind: true,
            alias: "operator"
          }
        ],
        combinators: {
          pattern: null,
          lookbehind: true,
          alias: "keyword"
        },
        "kernel-builtin": {
          pattern: null,
          lookbehind: true,
          alias: "variable"
        },
        "sequences-builtin": {
          pattern: null,
          lookbehind: true,
          alias: "variable"
        },
        "math-builtin": {
          pattern: null,
          lookbehind: true,
          alias: "variable"
        },
        "constructor-word": {
          // <array> but not <=>
          pattern: /(^|\s)<(?!=+>|-+>)\S+>(?=\s|$)/,
          lookbehind: true,
          alias: "keyword"
        },
        "other-builtin-syntax": {
          pattern: null,
          lookbehind: true,
          alias: "operator"
        },
        /*
        full list of supported word naming conventions: (the convention appears outside of the [brackets])
        set-[x]
        change-[x]
        with-[x]
        new-[x]
        >[string]
        [base]>
        [string]>[number]
        +[symbol]+
        [boolean-word]?
        ?[of]
        [slot-reader]>>
        >>[slot-setter]
        [slot-writer]<<
        ([implementation-detail])
        [mutater]!
        [variant]*
        [prettyprint].
        $[help-markup]
        <constructors>, SYNTAX:, etc are supported by their own patterns.
        `with` and `new` from `kernel` are their own builtins.
        see <https://docs.factorcode.org/content/article-conventions.html>
        */
        "conventionally-named-word": {
          pattern: /(^|\s)(?!")(?:(?:change|new|set|with)-\S+|\$\S+|>[^>\s]+|[^:>\s]+>|[^>\s]+>[^>\s]+|\+[^+\s]+\+|[^?\s]+\?|\?[^?\s]+|[^>\s]+>>|>>[^>\s]+|[^<\s]+<<|\([^()\s]+\)|[^!\s]+!|[^*\s]\S*\*|[^.\s]\S*\.)(?=\s|$)/,
          lookbehind: true,
          alias: "keyword"
        },
        "colon-syntax": {
          pattern: /(^|\s)(?:[A-Z0-9\-]+#?)?:{1,2}\s+(?:;\S+|(?!;)\S+)(?=\s|$)/,
          lookbehind: true,
          greedy: true,
          alias: "function"
        },
        "semicolon-or-setlocal": {
          pattern: /(\s)(?:;|:>)(?=\s|$)/,
          lookbehind: true,
          alias: "function"
        },
        // do not highlight leading } or trailing X{ at the begin/end of the file as it's invalid syntax
        "curly-brace-literal-delimiter": [
          {
            // opening
            pattern: /(^|\s)[a-z]*\{(?=\s)/i,
            lookbehind: true,
            alias: "operator"
          },
          {
            // closing
            pattern: /(\s)\}(?=\s|$)/,
            lookbehind: true,
            alias: "operator"
          }
        ],
        // do not highlight leading ] or trailing [ at the begin/end of the file as it's invalid syntax
        "quotation-delimiter": [
          {
            // opening
            pattern: /(^|\s)\[(?=\s)/,
            lookbehind: true,
            alias: "operator"
          },
          {
            // closing
            pattern: /(\s)\](?=\s|$)/,
            lookbehind: true,
            alias: "operator"
          }
        ],
        "normal-word": {
          pattern: /(^|\s)[^"\s]\S*(?=\s|$)/,
          lookbehind: true
        },
        /*
        basic first-class string "a"
        with escaped double-quote "a\""
        escaped backslash "\\"
        and general escapes since Factor has so many "\N"
        syntax that works in the reference implementation that isn't fully
        supported because it's an implementation detail:
        "string 1""string 2" -> 2 strings (works anyway)
        "string"5 -> string, 5
        "string"[ ] -> string, quotation
        { "a"} -> array<string>
        the rest of those examples all properly recognise the string, but not
        the other object (number, quotation, etc)
        this is fine for a regex-only implementation.
        */
        string: {
          pattern: /"(?:\\\S|[^"\\])*"/,
          greedy: true,
          inside: string_inside
        }
      };
      var escape = function(str) {
        return (str + "").replace(/([.?*+\^$\[\]\\(){}|\-])/g, "\\$1");
      };
      var arrToWordsRegExp = function(arr) {
        return new RegExp("(^|\\s)(?:" + arr.map(escape).join("|") + ")(?=\\s|$)");
      };
      var builtins = {
        "kernel-builtin": [
          "or",
          "2nipd",
          "4drop",
          "tuck",
          "wrapper",
          "nip",
          "wrapper?",
          "callstack>array",
          "die",
          "dupd",
          "callstack",
          "callstack?",
          "3dup",
          "hashcode",
          "pick",
          "4nip",
          "build",
          ">boolean",
          "nipd",
          "clone",
          "5nip",
          "eq?",
          "?",
          "=",
          "swapd",
          "2over",
          "clear",
          "2dup",
          "get-retainstack",
          "not",
          "tuple?",
          "dup",
          "3nipd",
          "call",
          "-rotd",
          "object",
          "drop",
          "assert=",
          "assert?",
          "-rot",
          "execute",
          "boa",
          "get-callstack",
          "curried?",
          "3drop",
          "pickd",
          "overd",
          "over",
          "roll",
          "3nip",
          "swap",
          "and",
          "2nip",
          "rotd",
          "throw",
          "(clone)",
          "hashcode*",
          "spin",
          "reach",
          "4dup",
          "equal?",
          "get-datastack",
          "assert",
          "2drop",
          "<wrapper>",
          "boolean?",
          "identity-hashcode",
          "identity-tuple?",
          "null",
          "composed?",
          "new",
          "5drop",
          "rot",
          "-roll",
          "xor",
          "identity-tuple",
          "boolean"
        ],
        "other-builtin-syntax": [
          // syntax
          "=======",
          "recursive",
          "flushable",
          ">>",
          "<<<<<<",
          "M\\",
          "B",
          "PRIVATE>",
          "\\",
          "======",
          "final",
          "inline",
          "delimiter",
          "deprecated",
          "<PRIVATE",
          ">>>>>>",
          "<<<<<<<",
          "parse-complex",
          "malformed-complex",
          "read-only",
          ">>>>>>>",
          "call-next-method",
          "<<",
          "foldable",
          // literals
          "$",
          "$[",
          "${"
        ],
        "sequences-builtin": [
          "member-eq?",
          "mismatch",
          "append",
          "assert-sequence=",
          "longer",
          "repetition",
          "clone-like",
          "3sequence",
          "assert-sequence?",
          "last-index-from",
          "reversed",
          "index-from",
          "cut*",
          "pad-tail",
          "join-as",
          "remove-eq!",
          "concat-as",
          "but-last",
          "snip",
          "nths",
          "nth",
          "sequence",
          "longest",
          "slice?",
          "<slice>",
          "remove-nth",
          "tail-slice",
          "empty?",
          "tail*",
          "member?",
          "virtual-sequence?",
          "set-length",
          "drop-prefix",
          "iota",
          "unclip",
          "bounds-error?",
          "unclip-last-slice",
          "non-negative-integer-expected",
          "non-negative-integer-expected?",
          "midpoint@",
          "longer?",
          "?set-nth",
          "?first",
          "rest-slice",
          "prepend-as",
          "prepend",
          "fourth",
          "sift",
          "subseq-start",
          "new-sequence",
          "?last",
          "like",
          "first4",
          "1sequence",
          "reverse",
          "slice",
          "virtual@",
          "repetition?",
          "set-last",
          "index",
          "4sequence",
          "max-length",
          "set-second",
          "immutable-sequence",
          "first2",
          "first3",
          "supremum",
          "unclip-slice",
          "suffix!",
          "insert-nth",
          "tail",
          "3append",
          "short",
          "suffix",
          "concat",
          "flip",
          "immutable?",
          "reverse!",
          "2sequence",
          "sum",
          "delete-all",
          "indices",
          "snip-slice",
          "<iota>",
          "check-slice",
          "sequence?",
          "head",
          "append-as",
          "halves",
          "sequence=",
          "collapse-slice",
          "?second",
          "slice-error?",
          "product",
          "bounds-check?",
          "bounds-check",
          "immutable",
          "virtual-exemplar",
          "harvest",
          "remove",
          "pad-head",
          "last",
          "set-fourth",
          "cartesian-product",
          "remove-eq",
          "shorten",
          "shorter",
          "reversed?",
          "shorter?",
          "shortest",
          "head-slice",
          "pop*",
          "tail-slice*",
          "but-last-slice",
          "iota?",
          "append!",
          "cut-slice",
          "new-resizable",
          "head-slice*",
          "sequence-hashcode",
          "pop",
          "set-nth",
          "?nth",
          "second",
          "join",
          "immutable-sequence?",
          "<reversed>",
          "3append-as",
          "virtual-sequence",
          "subseq?",
          "remove-nth!",
          "length",
          "last-index",
          "lengthen",
          "assert-sequence",
          "copy",
          "move",
          "third",
          "first",
          "tail?",
          "set-first",
          "prefix",
          "bounds-error",
          "<repetition>",
          "exchange",
          "surround",
          "cut",
          "min-length",
          "set-third",
          "push-all",
          "head?",
          "subseq-start-from",
          "delete-slice",
          "rest",
          "sum-lengths",
          "head*",
          "infimum",
          "remove!",
          "glue",
          "slice-error",
          "subseq",
          "push",
          "replace-slice",
          "subseq-as",
          "unclip-last"
        ],
        "math-builtin": [
          "number=",
          "next-power-of-2",
          "?1+",
          "fp-special?",
          "imaginary-part",
          "float>bits",
          "number?",
          "fp-infinity?",
          "bignum?",
          "fp-snan?",
          "denominator",
          "gcd",
          "*",
          "+",
          "fp-bitwise=",
          "-",
          "u>=",
          "/",
          ">=",
          "bitand",
          "power-of-2?",
          "log2-expects-positive",
          "neg?",
          "<",
          "log2",
          ">",
          "integer?",
          "number",
          "bits>double",
          "2/",
          "zero?",
          "bits>float",
          "float?",
          "shift",
          "ratio?",
          "rect>",
          "even?",
          "ratio",
          "fp-sign",
          "bitnot",
          ">fixnum",
          "complex?",
          "/i",
          "integer>fixnum",
          "/f",
          "sgn",
          ">bignum",
          "next-float",
          "u<",
          "u>",
          "mod",
          "recip",
          "rational",
          ">float",
          "2^",
          "integer",
          "fixnum?",
          "neg",
          "fixnum",
          "sq",
          "bignum",
          ">rect",
          "bit?",
          "fp-qnan?",
          "simple-gcd",
          "complex",
          "<fp-nan>",
          "real",
          ">fraction",
          "double>bits",
          "bitor",
          "rem",
          "fp-nan-payload",
          "real-part",
          "log2-expects-positive?",
          "prev-float",
          "align",
          "unordered?",
          "float",
          "fp-nan?",
          "abs",
          "bitxor",
          "integer>fixnum-strict",
          "u<=",
          "odd?",
          "<=",
          "/mod",
          ">integer",
          "real?",
          "rational?",
          "numerator"
        ]
        // that's all for now
      };
      Object.keys(builtins).forEach(function(k) {
        factor2[k].pattern = arrToWordsRegExp(builtins[k]);
      });
      var combinators = [
        // kernel
        "2bi",
        "while",
        "2tri",
        "bi*",
        "4dip",
        "both?",
        "same?",
        "tri@",
        "curry",
        "prepose",
        "3bi",
        "?if",
        "tri*",
        "2keep",
        "3keep",
        "curried",
        "2keepd",
        "when",
        "2bi*",
        "2tri*",
        "4keep",
        "bi@",
        "keepdd",
        "do",
        "unless*",
        "tri-curry",
        "if*",
        "loop",
        "bi-curry*",
        "when*",
        "2bi@",
        "2tri@",
        "with",
        "2with",
        "either?",
        "bi",
        "until",
        "3dip",
        "3curry",
        "tri-curry*",
        "tri-curry@",
        "bi-curry",
        "keepd",
        "compose",
        "2dip",
        "if",
        "3tri",
        "unless",
        "tuple",
        "keep",
        "2curry",
        "tri",
        "most",
        "while*",
        "dip",
        "composed",
        "bi-curry@",
        // sequences
        "find-last-from",
        "trim-head-slice",
        "map-as",
        "each-from",
        "none?",
        "trim-tail",
        "partition",
        "if-empty",
        "accumulate*",
        "reject!",
        "find-from",
        "accumulate-as",
        "collector-for-as",
        "reject",
        "map",
        "map-sum",
        "accumulate!",
        "2each-from",
        "follow",
        "supremum-by",
        "map!",
        "unless-empty",
        "collector",
        "padding",
        "reduce-index",
        "replicate-as",
        "infimum-by",
        "trim-tail-slice",
        "count",
        "find-index",
        "filter",
        "accumulate*!",
        "reject-as",
        "map-integers",
        "map-find",
        "reduce",
        "selector",
        "interleave",
        "2map",
        "filter-as",
        "binary-reduce",
        "map-index-as",
        "find",
        "produce",
        "filter!",
        "replicate",
        "cartesian-map",
        "cartesian-each",
        "find-index-from",
        "map-find-last",
        "3map-as",
        "3map",
        "find-last",
        "selector-as",
        "2map-as",
        "2map-reduce",
        "accumulate",
        "each",
        "each-index",
        "accumulate*-as",
        "when-empty",
        "all?",
        "collector-as",
        "push-either",
        "new-like",
        "collector-for",
        "2selector",
        "push-if",
        "2all?",
        "map-reduce",
        "3each",
        "any?",
        "trim-slice",
        "2reduce",
        "change-nth",
        "produce-as",
        "2each",
        "trim",
        "trim-head",
        "cartesian-find",
        "map-index",
        // math
        "if-zero",
        "each-integer",
        "unless-zero",
        "(find-integer)",
        "when-zero",
        "find-last-integer",
        "(all-integers?)",
        "times",
        "(each-integer)",
        "find-integer",
        "all-integers?",
        // math.combinators
        "unless-negative",
        "if-positive",
        "when-positive",
        "when-negative",
        "unless-positive",
        "if-negative",
        // combinators
        "case",
        "2cleave",
        "cond>quot",
        "case>quot",
        "3cleave",
        "wrong-values",
        "to-fixed-point",
        "alist>quot",
        "cond",
        "cleave",
        "call-effect",
        "recursive-hashcode",
        "spread",
        "deep-spread>quot",
        // combinators.short-circuit
        "2||",
        "0||",
        "n||",
        "0&&",
        "2&&",
        "3||",
        "1||",
        "1&&",
        "n&&",
        "3&&",
        // combinators.smart
        "smart-unless*",
        "keep-inputs",
        "reduce-outputs",
        "smart-when*",
        "cleave>array",
        "smart-with",
        "smart-apply",
        "smart-if",
        "inputs/outputs",
        "output>sequence-n",
        "map-outputs",
        "map-reduce-outputs",
        "dropping",
        "output>array",
        "smart-map-reduce",
        "smart-2map-reduce",
        "output>array-n",
        "nullary",
        "input<sequence",
        "append-outputs",
        "drop-inputs",
        "inputs",
        "smart-2reduce",
        "drop-outputs",
        "smart-reduce",
        "preserving",
        "smart-when",
        "outputs",
        "append-outputs-as",
        "smart-unless",
        "smart-if*",
        "sum-outputs",
        "input<sequence-unsafe",
        "output>sequence"
        // tafn
      ];
      factor2.combinators.pattern = arrToWordsRegExp(combinators);
      Prism3.languages.factor = factor2;
    })(Prism2);
  }
  return factor_1;
}
var _false;
var hasRequired_false;
function require_false() {
  if (hasRequired_false) return _false;
  hasRequired_false = 1;
  _false = $false;
  $false.displayName = "$false";
  $false.aliases = [];
  function $false(Prism2) {
    (function(Prism3) {
      Prism3.languages["false"] = {
        comment: {
          pattern: /\{[^}]*\}/
        },
        string: {
          pattern: /"[^"]*"/,
          greedy: true
        },
        "character-code": {
          pattern: /'(?:[^\r]|\r\n?)/,
          alias: "number"
        },
        "assembler-code": {
          pattern: /\d+`/,
          alias: "important"
        },
        number: /\d+/,
        operator: /[-!#$%&'*+,./:;=>?@\\^_`|~ßø]/,
        punctuation: /\[|\]/,
        variable: /[a-z]/,
        "non-standard": {
          pattern: /[()<BDO®]/,
          alias: "bold"
        }
      };
    })(Prism2);
  }
  return _false;
}
var firestoreSecurityRules_1;
var hasRequiredFirestoreSecurityRules;
function requireFirestoreSecurityRules() {
  if (hasRequiredFirestoreSecurityRules) return firestoreSecurityRules_1;
  hasRequiredFirestoreSecurityRules = 1;
  firestoreSecurityRules_1 = firestoreSecurityRules;
  firestoreSecurityRules.displayName = "firestoreSecurityRules";
  firestoreSecurityRules.aliases = [];
  function firestoreSecurityRules(Prism2) {
    Prism2.languages["firestore-security-rules"] = Prism2.languages.extend(
      "clike",
      {
        comment: /\/\/.*/,
        keyword: /\b(?:allow|function|if|match|null|return|rules_version|service)\b/,
        operator: /&&|\|\||[<>!=]=?|[-+*/%]|\b(?:in|is)\b/
      }
    );
    delete Prism2.languages["firestore-security-rules"]["class-name"];
    Prism2.languages.insertBefore("firestore-security-rules", "keyword", {
      path: {
        pattern: /(^|[\s(),])(?:\/(?:[\w\xA0-\uFFFF]+|\{[\w\xA0-\uFFFF]+(?:=\*\*)?\}|\$\([\w\xA0-\uFFFF.]+\)))+/,
        lookbehind: true,
        greedy: true,
        inside: {
          variable: {
            pattern: /\{[\w\xA0-\uFFFF]+(?:=\*\*)?\}|\$\([\w\xA0-\uFFFF.]+\)/,
            inside: {
              operator: /=/,
              keyword: /\*\*/,
              punctuation: /[.$(){}]/
            }
          },
          punctuation: /\//
        }
      },
      method: {
        // to make the pattern shorter, the actual method names are omitted
        pattern: /(\ballow\s+)[a-z]+(?:\s*,\s*[a-z]+)*(?=\s*[:;])/,
        lookbehind: true,
        alias: "builtin",
        inside: {
          punctuation: /,/
        }
      }
    });
  }
  return firestoreSecurityRules_1;
}
var flow_1;
var hasRequiredFlow;
function requireFlow() {
  if (hasRequiredFlow) return flow_1;
  hasRequiredFlow = 1;
  flow_1 = flow;
  flow.displayName = "flow";
  flow.aliases = [];
  function flow(Prism2) {
    (function(Prism3) {
      Prism3.languages.flow = Prism3.languages.extend("javascript", {});
      Prism3.languages.insertBefore("flow", "keyword", {
        type: [
          {
            pattern: /\b(?:[Bb]oolean|Function|[Nn]umber|[Ss]tring|any|mixed|null|void)\b/,
            alias: "tag"
          }
        ]
      });
      Prism3.languages.flow["function-variable"].pattern = /(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=\s*(?:function\b|(?:\([^()]*\)(?:\s*:\s*\w+)?|(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/i;
      delete Prism3.languages.flow["parameter"];
      Prism3.languages.insertBefore("flow", "operator", {
        "flow-punctuation": {
          pattern: /\{\||\|\}/,
          alias: "punctuation"
        }
      });
      if (!Array.isArray(Prism3.languages.flow.keyword)) {
        Prism3.languages.flow.keyword = [Prism3.languages.flow.keyword];
      }
      Prism3.languages.flow.keyword.unshift(
        {
          pattern: /(^|[^$]\b)(?:Class|declare|opaque|type)\b(?!\$)/,
          lookbehind: true
        },
        {
          pattern: /(^|[^$]\B)\$(?:Diff|Enum|Exact|Keys|ObjMap|PropertyType|Record|Shape|Subtype|Supertype|await)\b(?!\$)/,
          lookbehind: true
        }
      );
    })(Prism2);
  }
  return flow_1;
}
var fortran_1;
var hasRequiredFortran;
function requireFortran() {
  if (hasRequiredFortran) return fortran_1;
  hasRequiredFortran = 1;
  fortran_1 = fortran;
  fortran.displayName = "fortran";
  fortran.aliases = [];
  function fortran(Prism2) {
    Prism2.languages.fortran = {
      "quoted-number": {
        pattern: /[BOZ](['"])[A-F0-9]+\1/i,
        alias: "number"
      },
      string: {
        pattern: /(?:\b\w+_)?(['"])(?:\1\1|&(?:\r\n?|\n)(?:[ \t]*!.*(?:\r\n?|\n)|(?![ \t]*!))|(?!\1).)*(?:\1|&)/,
        inside: {
          comment: {
            pattern: /(&(?:\r\n?|\n)\s*)!.*/,
            lookbehind: true
          }
        }
      },
      comment: {
        pattern: /!.*/,
        greedy: true
      },
      boolean: /\.(?:FALSE|TRUE)\.(?:_\w+)?/i,
      number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[ED][+-]?\d+)?(?:_\w+)?/i,
      keyword: [
        // Types
        /\b(?:CHARACTER|COMPLEX|DOUBLE ?PRECISION|INTEGER|LOGICAL|REAL)\b/i,
        // END statements
        /\b(?:END ?)?(?:BLOCK ?DATA|DO|FILE|FORALL|FUNCTION|IF|INTERFACE|MODULE(?! PROCEDURE)|PROGRAM|SELECT|SUBROUTINE|TYPE|WHERE)\b/i,
        // Statements
        /\b(?:ALLOCATABLE|ALLOCATE|BACKSPACE|CALL|CASE|CLOSE|COMMON|CONTAINS|CONTINUE|CYCLE|DATA|DEALLOCATE|DIMENSION|DO|END|EQUIVALENCE|EXIT|EXTERNAL|FORMAT|GO ?TO|IMPLICIT(?: NONE)?|INQUIRE|INTENT|INTRINSIC|MODULE PROCEDURE|NAMELIST|NULLIFY|OPEN|OPTIONAL|PARAMETER|POINTER|PRINT|PRIVATE|PUBLIC|READ|RETURN|REWIND|SAVE|SELECT|STOP|TARGET|WHILE|WRITE)\b/i,
        // Others
        /\b(?:ASSIGNMENT|DEFAULT|ELEMENTAL|ELSE|ELSEIF|ELSEWHERE|ENTRY|IN|INCLUDE|INOUT|KIND|NULL|ONLY|OPERATOR|OUT|PURE|RECURSIVE|RESULT|SEQUENCE|STAT|THEN|USE)\b/i
      ],
      operator: [
        /\*\*|\/\/|=>|[=\/]=|[<>]=?|::|[+\-*=%]|\.[A-Z]+\./i,
        {
          // Use lookbehind to prevent confusion with (/ /)
          pattern: /(^|(?!\().)\/(?!\))/,
          lookbehind: true
        }
      ],
      punctuation: /\(\/|\/\)|[(),;:&]/
    };
  }
  return fortran_1;
}
var fsharp_1;
var hasRequiredFsharp;
function requireFsharp() {
  if (hasRequiredFsharp) return fsharp_1;
  hasRequiredFsharp = 1;
  fsharp_1 = fsharp;
  fsharp.displayName = "fsharp";
  fsharp.aliases = [];
  function fsharp(Prism2) {
    Prism2.languages.fsharp = Prism2.languages.extend("clike", {
      comment: [
        {
          pattern: /(^|[^\\])\(\*(?!\))[\s\S]*?\*\)/,
          lookbehind: true,
          greedy: true
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      string: {
        pattern: /(?:"""[\s\S]*?"""|@"(?:""|[^"])*"|"(?:\\[\s\S]|[^\\"])*")B?/,
        greedy: true
      },
      "class-name": {
        pattern: /(\b(?:exception|inherit|interface|new|of|type)\s+|\w\s*:\s*|\s:\??>\s*)[.\w]+\b(?:\s*(?:->|\*)\s*[.\w]+\b)*(?!\s*[:.])/,
        lookbehind: true,
        inside: {
          operator: /->|\*/,
          punctuation: /\./
        }
      },
      keyword: /\b(?:let|return|use|yield)(?:!\B|\b)|\b(?:abstract|and|as|asr|assert|atomic|base|begin|break|checked|class|component|const|constraint|constructor|continue|default|delegate|do|done|downcast|downto|eager|elif|else|end|event|exception|extern|external|false|finally|fixed|for|fun|function|functor|global|if|in|include|inherit|inline|interface|internal|land|lazy|lor|lsl|lsr|lxor|match|member|method|mixin|mod|module|mutable|namespace|new|not|null|object|of|open|or|override|parallel|private|process|protected|public|pure|rec|sealed|select|sig|static|struct|tailcall|then|to|trait|true|try|type|upcast|val|virtual|void|volatile|when|while|with)\b/,
      number: [
        /\b0x[\da-fA-F]+(?:LF|lf|un)?\b/,
        /\b0b[01]+(?:uy|y)?\b/,
        /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[fm]|e[+-]?\d+)?\b/i,
        /\b\d+(?:[IlLsy]|UL|u[lsy]?)?\b/
      ],
      operator: /([<>~&^])\1\1|([*.:<>&])\2|<-|->|[!=:]=|<?\|{1,3}>?|\??(?:<=|>=|<>|[-+*/%=<>])\??|[!?^&]|~[+~-]|:>|:\?>?/
    });
    Prism2.languages.insertBefore("fsharp", "keyword", {
      preprocessor: {
        pattern: /(^[\t ]*)#.*/m,
        lookbehind: true,
        alias: "property",
        inside: {
          directive: {
            pattern: /(^#)\b(?:else|endif|if|light|line|nowarn)\b/,
            lookbehind: true,
            alias: "keyword"
          }
        }
      }
    });
    Prism2.languages.insertBefore("fsharp", "punctuation", {
      "computation-expression": {
        pattern: /\b[_a-z]\w*(?=\s*\{)/i,
        alias: "keyword"
      }
    });
    Prism2.languages.insertBefore("fsharp", "string", {
      annotation: {
        pattern: /\[<.+?>\]/,
        greedy: true,
        inside: {
          punctuation: /^\[<|>\]$/,
          "class-name": {
            pattern: /^\w+$|(^|;\s*)[A-Z]\w*(?=\()/,
            lookbehind: true
          },
          "annotation-content": {
            pattern: /[\s\S]+/,
            inside: Prism2.languages.fsharp
          }
        }
      },
      char: {
        pattern: /'(?:[^\\']|\\(?:.|\d{3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}|U[a-fA-F\d]{8}))'B?/,
        greedy: true
      }
    });
  }
  return fsharp_1;
}
var ftl_1;
var hasRequiredFtl;
function requireFtl() {
  if (hasRequiredFtl) return ftl_1;
  hasRequiredFtl = 1;
  var refractorMarkupTemplating = requireMarkupTemplating();
  ftl_1 = ftl;
  ftl.displayName = "ftl";
  ftl.aliases = [];
  function ftl(Prism2) {
    Prism2.register(refractorMarkupTemplating);
    (function(Prism3) {
      var FTL_EXPR = /[^<()"']|\((?:<expr>)*\)|<(?!#--)|<#--(?:[^-]|-(?!->))*-->|"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'/.source;
      for (var i = 0; i < 2; i++) {
        FTL_EXPR = FTL_EXPR.replace(/<expr>/g, function() {
          return FTL_EXPR;
        });
      }
      FTL_EXPR = FTL_EXPR.replace(/<expr>/g, /[^\s\S]/.source);
      var ftl2 = {
        comment: /<#--[\s\S]*?-->/,
        string: [
          {
            // raw string
            pattern: /\br("|')(?:(?!\1)[^\\]|\\.)*\1/,
            greedy: true
          },
          {
            pattern: RegExp(
              /("|')(?:(?!\1|\$\{)[^\\]|\\.|\$\{(?:(?!\})(?:<expr>))*\})*\1/.source.replace(
                /<expr>/g,
                function() {
                  return FTL_EXPR;
                }
              )
            ),
            greedy: true,
            inside: {
              interpolation: {
                pattern: RegExp(
                  /((?:^|[^\\])(?:\\\\)*)\$\{(?:(?!\})(?:<expr>))*\}/.source.replace(
                    /<expr>/g,
                    function() {
                      return FTL_EXPR;
                    }
                  )
                ),
                lookbehind: true,
                inside: {
                  "interpolation-punctuation": {
                    pattern: /^\$\{|\}$/,
                    alias: "punctuation"
                  },
                  rest: null
                }
              }
            }
          }
        ],
        keyword: /\b(?:as)\b/,
        boolean: /\b(?:false|true)\b/,
        "builtin-function": {
          pattern: /((?:^|[^?])\?\s*)\w+/,
          lookbehind: true,
          alias: "function"
        },
        function: /\b\w+(?=\s*\()/,
        number: /\b\d+(?:\.\d+)?\b/,
        operator: /\.\.[<*!]?|->|--|\+\+|&&|\|\||\?{1,2}|[-+*/%!=<>]=?|\b(?:gt|gte|lt|lte)\b/,
        punctuation: /[,;.:()[\]{}]/
      };
      ftl2.string[1].inside.interpolation.inside.rest = ftl2;
      Prism3.languages.ftl = {
        "ftl-comment": {
          // the pattern is shortened to be more efficient
          pattern: /^<#--[\s\S]*/,
          alias: "comment"
        },
        "ftl-directive": {
          pattern: /^<[\s\S]+>$/,
          inside: {
            directive: {
              pattern: /(^<\/?)[#@][a-z]\w*/i,
              lookbehind: true,
              alias: "keyword"
            },
            punctuation: /^<\/?|\/?>$/,
            content: {
              pattern: /\s*\S[\s\S]*/,
              alias: "ftl",
              inside: ftl2
            }
          }
        },
        "ftl-interpolation": {
          pattern: /^\$\{[\s\S]*\}$/,
          inside: {
            punctuation: /^\$\{|\}$/,
            content: {
              pattern: /\s*\S[\s\S]*/,
              alias: "ftl",
              inside: ftl2
            }
          }
        }
      };
      Prism3.hooks.add("before-tokenize", function(env) {
        var pattern = RegExp(
          /<#--[\s\S]*?-->|<\/?[#@][a-zA-Z](?:<expr>)*?>|\$\{(?:<expr>)*?\}/.source.replace(
            /<expr>/g,
            function() {
              return FTL_EXPR;
            }
          ),
          "gi"
        );
        Prism3.languages["markup-templating"].buildPlaceholders(
          env,
          "ftl",
          pattern
        );
      });
      Prism3.hooks.add("after-tokenize", function(env) {
        Prism3.languages["markup-templating"].tokenizePlaceholders(env, "ftl");
      });
    })(Prism2);
  }
  return ftl_1;
}
var gap_1;
var hasRequiredGap;
function requireGap() {
  if (hasRequiredGap) return gap_1;
  hasRequiredGap = 1;
  gap_1 = gap;
  gap.displayName = "gap";
  gap.aliases = [];
  function gap(Prism2) {
    Prism2.languages.gap = {
      shell: {
        pattern: /^gap>[\s\S]*?(?=^gap>|$(?![\s\S]))/m,
        greedy: true,
        inside: {
          gap: {
            pattern: /^(gap>).+(?:(?:\r(?:\n|(?!\n))|\n)>.*)*/,
            lookbehind: true,
            inside: null
            // see below
          },
          punctuation: /^gap>/
        }
      },
      comment: {
        pattern: /#.*/,
        greedy: true
      },
      string: {
        pattern: /(^|[^\\'"])(?:'(?:[^\r\n\\']|\\.){1,10}'|"(?:[^\r\n\\"]|\\.)*"(?!")|"""[\s\S]*?""")/,
        lookbehind: true,
        greedy: true,
        inside: {
          continuation: {
            pattern: /([\r\n])>/,
            lookbehind: true,
            alias: "punctuation"
          }
        }
      },
      keyword: /\b(?:Assert|Info|IsBound|QUIT|TryNextMethod|Unbind|and|atomic|break|continue|do|elif|else|end|fi|for|function|if|in|local|mod|not|od|or|quit|readonly|readwrite|rec|repeat|return|then|until|while)\b/,
      boolean: /\b(?:false|true)\b/,
      function: /\b[a-z_]\w*(?=\s*\()/i,
      number: {
        pattern: /(^|[^\w.]|\.\.)(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?(?:_[a-z]?)?(?=$|[^\w.]|\.\.)/,
        lookbehind: true
      },
      continuation: {
        pattern: /([\r\n])>/,
        lookbehind: true,
        alias: "punctuation"
      },
      operator: /->|[-+*/^~=!]|<>|[<>]=?|:=|\.\./,
      punctuation: /[()[\]{},;.:]/
    };
    Prism2.languages.gap.shell.inside.gap.inside = Prism2.languages.gap;
  }
  return gap_1;
}
var gcode_1;
var hasRequiredGcode;
function requireGcode() {
  if (hasRequiredGcode) return gcode_1;
  hasRequiredGcode = 1;
  gcode_1 = gcode;
  gcode.displayName = "gcode";
  gcode.aliases = [];
  function gcode(Prism2) {
    Prism2.languages.gcode = {
      comment: /;.*|\B\(.*?\)\B/,
      string: {
        pattern: /"(?:""|[^"])*"/,
        greedy: true
      },
      keyword: /\b[GM]\d+(?:\.\d+)?\b/,
      property: /\b[A-Z]/,
      checksum: {
        pattern: /(\*)\d+/,
        lookbehind: true,
        alias: "number"
      },
      // T0:0:0
      punctuation: /[:*]/
    };
  }
  return gcode_1;
}
var gdscript_1;
var hasRequiredGdscript;
function requireGdscript() {
  if (hasRequiredGdscript) return gdscript_1;
  hasRequiredGdscript = 1;
  gdscript_1 = gdscript;
  gdscript.displayName = "gdscript";
  gdscript.aliases = [];
  function gdscript(Prism2) {
    Prism2.languages.gdscript = {
      comment: /#.*/,
      string: {
        pattern: /@?(?:("|')(?:(?!\1)[^\n\\]|\\[\s\S])*\1(?!"|')|"""(?:[^\\]|\\[\s\S])*?""")/,
        greedy: true
      },
      "class-name": {
        // class_name Foo, extends Bar, class InnerClass
        // export(int) var baz, export(int, 0) var i
        // as Node
        // const FOO: int = 9, var bar: bool = true
        // func add(reference: Item, amount: int) -> Item:
        pattern: /(^(?:class|class_name|extends)[ \t]+|^export\([ \t]*|\bas[ \t]+|(?:\b(?:const|var)[ \t]|[,(])[ \t]*\w+[ \t]*:[ \t]*|->[ \t]*)[a-zA-Z_]\w*/m,
        lookbehind: true
      },
      keyword: /\b(?:and|as|assert|break|breakpoint|class|class_name|const|continue|elif|else|enum|export|extends|for|func|if|in|is|master|mastersync|match|not|null|onready|or|pass|preload|puppet|puppetsync|remote|remotesync|return|self|setget|signal|static|tool|var|while|yield)\b/,
      function: /\b[a-z_]\w*(?=[ \t]*\()/i,
      variable: /\$\w+/,
      number: [
        /\b0b[01_]+\b|\b0x[\da-fA-F_]+\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.[\d_]+)(?:e[+-]?[\d_]+)?\b/,
        /\b(?:INF|NAN|PI|TAU)\b/
      ],
      constant: /\b[A-Z][A-Z_\d]*\b/,
      boolean: /\b(?:false|true)\b/,
      operator: /->|:=|&&|\|\||<<|>>|[-+*/%&|!<>=]=?|[~^]/,
      punctuation: /[.:,;()[\]{}]/
    };
  }
  return gdscript_1;
}
var gedcom_1;
var hasRequiredGedcom;
function requireGedcom() {
  if (hasRequiredGedcom) return gedcom_1;
  hasRequiredGedcom = 1;
  gedcom_1 = gedcom;
  gedcom.displayName = "gedcom";
  gedcom.aliases = [];
  function gedcom(Prism2) {
    Prism2.languages.gedcom = {
      "line-value": {
        // Preceded by level, optional pointer, and tag
        pattern: /(^[\t ]*\d+ +(?:@\w[\w!"$%&'()*+,\-./:;<=>?[\\\]^`{|}~\x80-\xfe #]*@ +)?\w+ ).+/m,
        lookbehind: true,
        inside: {
          pointer: {
            pattern: /^@\w[\w!"$%&'()*+,\-./:;<=>?[\\\]^`{|}~\x80-\xfe #]*@$/,
            alias: "variable"
          }
        }
      },
      tag: {
        // Preceded by level and optional pointer
        pattern: /(^[\t ]*\d+ +(?:@\w[\w!"$%&'()*+,\-./:;<=>?[\\\]^`{|}~\x80-\xfe #]*@ +)?)\w+/m,
        lookbehind: true,
        alias: "string"
      },
      level: {
        pattern: /(^[\t ]*)\d+/m,
        lookbehind: true,
        alias: "number"
      },
      pointer: {
        pattern: /@\w[\w!"$%&'()*+,\-./:;<=>?[\\\]^`{|}~\x80-\xfe #]*@/,
        alias: "variable"
      }
    };
  }
  return gedcom_1;
}
var gherkin_1;
var hasRequiredGherkin;
function requireGherkin() {
  if (hasRequiredGherkin) return gherkin_1;
  hasRequiredGherkin = 1;
  gherkin_1 = gherkin;
  gherkin.displayName = "gherkin";
  gherkin.aliases = [];
  function gherkin(Prism2) {
    (function(Prism3) {
      var tableRow = /(?:\r?\n|\r)[ \t]*\|.+\|(?:(?!\|).)*/.source;
      Prism3.languages.gherkin = {
        pystring: {
          pattern: /("""|''')[\s\S]+?\1/,
          alias: "string"
        },
        comment: {
          pattern: /(^[ \t]*)#.*/m,
          lookbehind: true
        },
        tag: {
          pattern: /(^[ \t]*)@\S*/m,
          lookbehind: true
        },
        feature: {
          pattern: /((?:^|\r?\n|\r)[ \t]*)(?:Ability|Ahoy matey!|Arwedd|Aspekt|Besigheid Behoefte|Business Need|Caracteristica|Característica|Egenskab|Egenskap|Eiginleiki|Feature|Fīča|Fitur|Fonctionnalité|Fonksyonalite|Funcionalidade|Funcionalitat|Functionalitate|Funcţionalitate|Funcționalitate|Functionaliteit|Fungsi|Funkcia|Funkcija|Funkcionalitāte|Funkcionalnost|Funkcja|Funksie|Funktionalität|Funktionalitéit|Funzionalità|Hwaet|Hwæt|Jellemző|Karakteristik|Lastnost|Mak|Mogucnost|laH|Mogućnost|Moznosti|Možnosti|OH HAI|Omadus|Ominaisuus|Osobina|Özellik|Potrzeba biznesowa|perbogh|poQbogh malja'|Požadavek|Požiadavka|Pretty much|Qap|Qu'meH 'ut|Savybė|Tính năng|Trajto|Vermoë|Vlastnosť|Właściwość|Značilnost|Δυνατότητα|Λειτουργία|Могућност|Мөмкинлек|Особина|Свойство|Үзенчәлеклелек|Функционал|Функционалност|Функция|Функціонал|תכונה|خاصية|خصوصیت|صلاحیت|کاروبار کی ضرورت|وِیژگی|रूप लेख|ਖਾਸੀਅਤ|ਨਕਸ਼ ਨੁਹਾਰ|ਮੁਹਾਂਦਰਾ|గుణము|ಹೆಚ್ಚಳ|ความต้องการทางธุรกิจ|ความสามารถ|โครงหลัก|기능|フィーチャ|功能|機能):(?:[^:\r\n]+(?:\r?\n|\r|$))*/,
          lookbehind: true,
          inside: {
            important: {
              pattern: /(:)[^\r\n]+/,
              lookbehind: true
            },
            keyword: /[^:\r\n]+:/
          }
        },
        scenario: {
          pattern: /(^[ \t]*)(?:Abstract Scenario|Abstrakt Scenario|Achtergrond|Aer|Ær|Agtergrond|All y'all|Antecedentes|Antecedents|Atburðarás|Atburðarásir|Awww, look mate|B4|Background|Baggrund|Bakgrund|Bakgrunn|Bakgrunnur|Beispiele|Beispiller|Bối cảnh|Cefndir|Cenario|Cenário|Cenario de Fundo|Cenário de Fundo|Cenarios|Cenários|Contesto|Context|Contexte|Contexto|Conto|Contoh|Contone|Dæmi|Dasar|Dead men tell no tales|Delineacao do Cenario|Delineação do Cenário|Dis is what went down|Dữ liệu|Dyagram Senaryo|Dyagram senaryo|Egzanp|Ejemplos|Eksempler|Ekzemploj|Enghreifftiau|Esbozo do escenario|Escenari|Escenario|Esempi|Esquema de l'escenari|Esquema del escenario|Esquema do Cenario|Esquema do Cenário|EXAMPLZ|Examples|Exempel|Exemple|Exemples|Exemplos|First off|Fono|Forgatókönyv|Forgatókönyv vázlat|Fundo|Geçmiş|Grundlage|Hannergrond|ghantoH|Háttér|Heave to|Istorik|Juhtumid|Keadaan|Khung kịch bản|Khung tình huống|Kịch bản|Koncept|Konsep skenario|Kontèks|Kontekst|Kontekstas|Konteksts|Kontext|Konturo de la scenaro|Latar Belakang|lut chovnatlh|lut|lutmey|Lýsing Atburðarásar|Lýsing Dæma|MISHUN SRSLY|MISHUN|Menggariskan Senario|mo'|Náčrt Scenára|Náčrt Scénáře|Náčrt Scenáru|Oris scenarija|Örnekler|Osnova|Osnova Scenára|Osnova scénáře|Osnutek|Ozadje|Paraugs|Pavyzdžiai|Példák|Piemēri|Plan du scénario|Plan du Scénario|Plan Senaryo|Plan senaryo|Plang vum Szenario|Pozadí|Pozadie|Pozadina|Príklady|Příklady|Primer|Primeri|Primjeri|Przykłady|Raamstsenaarium|Reckon it's like|Rerefons|Scenár|Scénář|Scenarie|Scenarij|Scenarijai|Scenarijaus šablonas|Scenariji|Scenārijs|Scenārijs pēc parauga|Scenarijus|Scenario|Scénario|Scenario Amlinellol|Scenario Outline|Scenario Template|Scenariomal|Scenariomall|Scenarios|Scenariu|Scenariusz|Scenaro|Schema dello scenario|Se ðe|Se the|Se þe|Senario|Senaryo Deskripsyon|Senaryo deskripsyon|Senaryo|Senaryo taslağı|Shiver me timbers|Situācija|Situai|Situasie Uiteensetting|Situasie|Skenario konsep|Skenario|Skica|Structura scenariu|Structură scenariu|Struktura scenarija|Stsenaarium|Swa hwaer swa|Swa|Swa hwær swa|Szablon scenariusza|Szenario|Szenariogrundriss|Tapaukset|Tapaus|Tapausaihio|Taust|Tausta|Template Keadaan|Template Senario|Template Situai|The thing of it is|Tình huống|Variantai|Voorbeelde|Voorbeelden|Wharrimean is|Yo-ho-ho|You'll wanna|Założenia|Παραδείγματα|Περιγραφή Σεναρίου|Σενάρια|Σενάριο|Υπόβαθρο|Кереш|Контекст|Концепт|Мисаллар|Мисоллар|Основа|Передумова|Позадина|Предистория|Предыстория|Приклади|Пример|Примери|Примеры|Рамка на сценарий|Скица|Структура сценарија|Структура сценария|Структура сценарію|Сценарий|Сценарий структураси|Сценарийның төзелеше|Сценарији|Сценарио|Сценарій|Тарих|Үрнәкләр|דוגמאות|רקע|תבנית תרחיש|תרחיש|الخلفية|الگوی سناریو|امثلة|پس منظر|زمینه|سناریو|سيناريو|سيناريو مخطط|مثالیں|منظر نامے کا خاکہ|منظرنامہ|نمونه ها|उदाहरण|परिदृश्य|परिदृश्य रूपरेखा|पृष्ठभूमि|ਉਦਾਹਰਨਾਂ|ਪਟਕਥਾ|ਪਟਕਥਾ ਢਾਂਚਾ|ਪਟਕਥਾ ਰੂਪ ਰੇਖਾ|ਪਿਛੋਕੜ|ఉదాహరణలు|కథనం|నేపథ్యం|సన్నివేశం|ಉದಾಹರಣೆಗಳು|ಕಥಾಸಾರಾಂಶ|ವಿವರಣೆ|ಹಿನ್ನೆಲೆ|โครงสร้างของเหตุการณ์|ชุดของตัวอย่าง|ชุดของเหตุการณ์|แนวคิด|สรุปเหตุการณ์|เหตุการณ์|배경|시나리오|시나리오 개요|예|サンプル|シナリオ|シナリオアウトライン|シナリオテンプレ|シナリオテンプレート|テンプレ|例|例子|剧本|剧本大纲|劇本|劇本大綱|场景|场景大纲|場景|場景大綱|背景):[^:\r\n]*/m,
          lookbehind: true,
          inside: {
            important: {
              pattern: /(:)[^\r\n]*/,
              lookbehind: true
            },
            keyword: /[^:\r\n]+:/
          }
        },
        "table-body": {
          // Look-behind is used to skip the table head, which has the same format as any table row
          pattern: RegExp("(" + tableRow + ")(?:" + tableRow + ")+"),
          lookbehind: true,
          inside: {
            outline: {
              pattern: /<[^>]+>/,
              alias: "variable"
            },
            td: {
              pattern: /\s*[^\s|][^|]*/,
              alias: "string"
            },
            punctuation: /\|/
          }
        },
        "table-head": {
          pattern: RegExp(tableRow),
          inside: {
            th: {
              pattern: /\s*[^\s|][^|]*/,
              alias: "variable"
            },
            punctuation: /\|/
          }
        },
        atrule: {
          pattern: /(^[ \t]+)(?:'a|'ach|'ej|7|a|A také|A taktiež|A tiež|A zároveň|Aber|Ac|Adott|Akkor|Ak|Aleshores|Ale|Ali|Allora|Alors|Als|Ama|Amennyiben|Amikor|Ampak|an|AN|Ananging|And y'all|And|Angenommen|Anrhegedig a|An|Apabila|Atès|Atesa|Atunci|Avast!|Aye|A|awer|Bagi|Banjur|Bet|Biết|Blimey!|Buh|But at the end of the day I reckon|But y'all|But|BUT|Cal|Când|Cand|Cando|Ce|Cuando|Če|Ða ðe|Ða|Dadas|Dada|Dados|Dado|DaH ghu' bejlu'|dann|Dann|Dano|Dan|Dar|Dat fiind|Data|Date fiind|Date|Dati fiind|Dati|Daţi fiind|Dați fiind|DEN|Dato|De|Den youse gotta|Dengan|Diberi|Diyelim ki|Donada|Donat|Donitaĵo|Do|Dun|Duota|Ðurh|Eeldades|Ef|Eğer ki|Entao|Então|Entón|E|En|Entonces|Epi|És|Etant donnée|Etant donné|Et|Étant données|Étant donnée|Étant donné|Etant données|Etant donnés|Étant donnés|Fakat|Gangway!|Gdy|Gegeben seien|Gegeben sei|Gegeven|Gegewe|ghu' noblu'|Gitt|Given y'all|Given|Givet|Givun|Ha|Cho|I CAN HAZ|In|Ir|It's just unbelievable|I|Ja|Jeśli|Jeżeli|Kad|Kada|Kadar|Kai|Kaj|Když|Keď|Kemudian|Ketika|Khi|Kiedy|Ko|Kuid|Kui|Kun|Lan|latlh|Le sa a|Let go and haul|Le|Lè sa a|Lè|Logo|Lorsqu'<|Lorsque|mä|Maar|Mais|Mając|Ma|Majd|Maka|Manawa|Mas|Men|Menawa|Mutta|Nalika|Nalikaning|Nanging|Når|När|Nato|Nhưng|Niin|Njuk|O zaman|Och|Og|Oletetaan|Ond|Onda|Oraz|Pak|Pero|Però|Podano|Pokiaľ|Pokud|Potem|Potom|Privzeto|Pryd|Quan|Quand|Quando|qaSDI'|Så|Sed|Se|Siis|Sipoze ke|Sipoze Ke|Sipoze|Si|Şi|Și|Soit|Stel|Tada|Tad|Takrat|Tak|Tapi|Ter|Tetapi|Tha the|Tha|Then y'all|Then|Thì|Thurh|Toda|Too right|Un|Und|ugeholl|Và|vaj|Vendar|Ve|wann|Wanneer|WEN|Wenn|When y'all|When|Wtedy|Wun|Y'know|Yeah nah|Yna|Youse know like when|Youse know when youse got|Y|Za predpokladu|Za předpokladu|Zadan|Zadani|Zadano|Zadate|Zadato|Zakładając|Zaradi|Zatati|Þa þe|Þa|Þá|Þegar|Þurh|Αλλά|Δεδομένου|Και|Όταν|Τότε|А також|Агар|Але|Али|Аммо|А|Әгәр|Әйтик|Әмма|Бирок|Ва|Вә|Дадено|Дано|Допустим|Если|Задате|Задати|Задато|И|І|К тому же|Када|Кад|Когато|Когда|Коли|Ләкин|Лекин|Нәтиҗәдә|Нехай|Но|Онда|Припустимо, що|Припустимо|Пусть|Также|Та|Тогда|Тоді|То|Унда|Һәм|Якщо|אבל|אזי|אז|בהינתן|וגם|כאשר|آنگاه|اذاً|اگر|اما|اور|با فرض|بالفرض|بفرض|پھر|تب|ثم|جب|عندما|فرض کیا|لكن|لیکن|متى|هنگامی|و|अगर|और|कदा|किन्तु|चूंकि|जब|तथा|तदा|तब|परन्तु|पर|यदि|ਅਤੇ|ਜਦੋਂ|ਜਿਵੇਂ ਕਿ|ਜੇਕਰ|ਤਦ|ਪਰ|అప్పుడు|ఈ పరిస్థితిలో|కాని|చెప్పబడినది|మరియు|ಆದರೆ|ನಂತರ|ನೀಡಿದ|ಮತ್ತು|ಸ್ಥಿತಿಯನ್ನು|กำหนดให้|ดังนั้น|แต่|เมื่อ|และ|그러면<|그리고<|단<|만약<|만일<|먼저<|조건<|하지만<|かつ<|しかし<|ただし<|ならば<|もし<|並且<|但し<|但是<|假如<|假定<|假設<|假设<|前提<|同时<|同時<|并且<|当<|當<|而且<|那么<|那麼<)(?=[ \t])/m,
          lookbehind: true
        },
        string: {
          pattern: /"(?:\\.|[^"\\\r\n])*"|'(?:\\.|[^'\\\r\n])*'/,
          inside: {
            outline: {
              pattern: /<[^>]+>/,
              alias: "variable"
            }
          }
        },
        outline: {
          pattern: /<[^>]+>/,
          alias: "variable"
        }
      };
    })(Prism2);
  }
  return gherkin_1;
}
var git_1;
var hasRequiredGit;
function requireGit() {
  if (hasRequiredGit) return git_1;
  hasRequiredGit = 1;
  git_1 = git;
  git.displayName = "git";
  git.aliases = [];
  function git(Prism2) {
    Prism2.languages.git = {
      /*
       * A simple one line comment like in a git status command
       * For instance:
       * $ git status
       * # On branch infinite-scroll
       * # Your branch and 'origin/sharedBranches/frontendTeam/infinite-scroll' have diverged,
       * # and have 1 and 2 different commits each, respectively.
       * nothing to commit (working directory clean)
       */
      comment: /^#.*/m,
      /*
       * Regexp to match the changed lines in a git diff output. Check the example below.
       */
      deleted: /^[-–].*/m,
      inserted: /^\+.*/m,
      /*
       * a string (double and simple quote)
       */
      string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
      /*
       * a git command. It starts with a random prompt finishing by a $, then "git" then some other parameters
       * For instance:
       * $ git add file.txt
       */
      command: {
        pattern: /^.*\$ git .*$/m,
        inside: {
          /*
           * A git command can contain a parameter starting by a single or a double dash followed by a string
           * For instance:
           * $ git diff --cached
           * $ git log -p
           */
          parameter: /\s--?\w+/
        }
      },
      /*
       * Coordinates displayed in a git diff command
       * For instance:
       * $ git diff
       * diff --git file.txt file.txt
       * index 6214953..1d54a52 100644
       * --- file.txt
       * +++ file.txt
       * @@ -1 +1,2 @@
       * -Here's my tetx file
       * +Here's my text file
       * +And this is the second line
       */
      coord: /^@@.*@@$/m,
      /*
       * Match a "commit [SHA1]" line in a git log output.
       * For instance:
       * $ git log
       * commit a11a14ef7e26f2ca62d4b35eac455ce636d0dc09
       * Author: lgiraudel
       * Date:   Mon Feb 17 11:18:34 2014 +0100
       *
       *     Add of a new line
       */
      "commit-sha1": /^commit \w{40}$/m
    };
  }
  return git_1;
}
var glsl_1;
var hasRequiredGlsl;
function requireGlsl() {
  if (hasRequiredGlsl) return glsl_1;
  hasRequiredGlsl = 1;
  var refractorC = requireC();
  glsl_1 = glsl;
  glsl.displayName = "glsl";
  glsl.aliases = [];
  function glsl(Prism2) {
    Prism2.register(refractorC);
    Prism2.languages.glsl = Prism2.languages.extend("c", {
      keyword: /\b(?:active|asm|atomic_uint|attribute|[ibdu]?vec[234]|bool|break|buffer|case|cast|centroid|class|coherent|common|const|continue|d?mat[234](?:x[234])?|default|discard|do|double|else|enum|extern|external|false|filter|fixed|flat|float|for|fvec[234]|goto|half|highp|hvec[234]|[iu]?sampler2DMS(?:Array)?|[iu]?sampler2DRect|[iu]?samplerBuffer|[iu]?samplerCube|[iu]?samplerCubeArray|[iu]?sampler[123]D|[iu]?sampler[12]DArray|[iu]?image2DMS(?:Array)?|[iu]?image2DRect|[iu]?imageBuffer|[iu]?imageCube|[iu]?imageCubeArray|[iu]?image[123]D|[iu]?image[12]DArray|if|in|inline|inout|input|int|interface|invariant|layout|long|lowp|mediump|namespace|noinline|noperspective|out|output|partition|patch|precise|precision|public|readonly|resource|restrict|return|sample|sampler[12]DArrayShadow|sampler[12]DShadow|sampler2DRectShadow|sampler3DRect|samplerCubeArrayShadow|samplerCubeShadow|shared|short|sizeof|smooth|static|struct|subroutine|superp|switch|template|this|true|typedef|uint|uniform|union|unsigned|using|varying|void|volatile|while|writeonly)\b/
    });
  }
  return glsl_1;
}
var gml_1;
var hasRequiredGml;
function requireGml() {
  if (hasRequiredGml) return gml_1;
  hasRequiredGml = 1;
  gml_1 = gml;
  gml.displayName = "gml";
  gml.aliases = [];
  function gml(Prism2) {
    Prism2.languages.gamemakerlanguage = Prism2.languages.gml = Prism2.languages.extend("clike", {
      keyword: /\b(?:break|case|continue|default|do|else|enum|exit|for|globalvar|if|repeat|return|switch|until|var|while)\b/,
      number: /(?:\b0x[\da-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ulf]{0,4}/i,
      operator: /--|\+\+|[-+%/=]=?|!=|\*\*?=?|<[<=>]?|>[=>]?|&&?|\^\^?|\|\|?|~|\b(?:and|at|not|or|with|xor)\b/,
      constant: /\b(?:GM_build_date|GM_version|action_(?:continue|restart|reverse|stop)|all|gamespeed_(?:fps|microseconds)|global|local|noone|other|pi|pointer_(?:invalid|null)|self|timezone_(?:local|utc)|undefined|ev_(?:create|destroy|step|alarm|keyboard|mouse|collision|other|draw|draw_(?:begin|end|post|pre)|keypress|keyrelease|trigger|(?:left|middle|no|right)_button|(?:left|middle|right)_press|(?:left|middle|right)_release|mouse_(?:enter|leave|wheel_down|wheel_up)|global_(?:left|middle|right)_button|global_(?:left|middle|right)_press|global_(?:left|middle|right)_release|joystick(?:1|2)_(?:button1|button2|button3|button4|button5|button6|button7|button8|down|left|right|up)|outside|boundary|game_start|game_end|room_start|room_end|no_more_lives|animation_end|end_of_path|no_more_health|user\d|gui|gui_begin|gui_end|step_(?:begin|end|normal))|vk_(?:alt|anykey|backspace|control|delete|down|end|enter|escape|home|insert|left|nokey|pagedown|pageup|pause|printscreen|return|right|shift|space|tab|up|f\d|numpad\d|add|decimal|divide|lalt|lcontrol|lshift|multiply|ralt|rcontrol|rshift|subtract)|achievement_(?:filter_(?:all_players|favorites_only|friends_only)|friends_info|info|leaderboard_info|our_info|pic_loaded|show_(?:achievement|bank|friend_picker|leaderboard|profile|purchase_prompt|ui)|type_challenge|type_score_challenge)|asset_(?:font|object|path|room|script|shader|sound|sprite|tiles|timeline|unknown)|audio_(?:3d|falloff_(?:exponent_distance|exponent_distance_clamped|inverse_distance|inverse_distance_clamped|linear_distance|linear_distance_clamped|none)|mono|new_system|old_system|stereo)|bm_(?:add|complex|dest_alpha|dest_color|dest_colour|inv_dest_alpha|inv_dest_color|inv_dest_colour|inv_src_alpha|inv_src_color|inv_src_colour|max|normal|one|src_alpha|src_alpha_sat|src_color|src_colour|subtract|zero)|browser_(?:chrome|firefox|ie|ie_mobile|not_a_browser|opera|safari|safari_mobile|tizen|unknown|windows_store)|buffer_(?:bool|f16|f32|f64|fast|fixed|generalerror|grow|invalidtype|network|outofbounds|outofspace|s16|s32|s8|seek_end|seek_relative|seek_start|string|text|u16|u32|u64|u8|vbuffer|wrap)|c_(?:aqua|black|blue|dkgray|fuchsia|gray|green|lime|ltgray|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow)|cmpfunc_(?:always|equal|greater|greaterequal|less|lessequal|never|notequal)|cr_(?:appstart|arrow|beam|cross|default|drag|handpoint|hourglass|none|size_all|size_nesw|size_ns|size_nwse|size_we|uparrow)|cull_(?:clockwise|counterclockwise|noculling)|device_(?:emulator|tablet)|device_ios_(?:ipad|ipad_retina|iphone|iphone5|iphone6|iphone6plus|iphone_retina|unknown)|display_(?:landscape|landscape_flipped|portrait|portrait_flipped)|dll_(?:cdecl|cdel|stdcall)|ds_type_(?:grid|list|map|priority|queue|stack)|ef_(?:cloud|ellipse|explosion|firework|flare|rain|ring|smoke|smokeup|snow|spark|star)|fa_(?:archive|bottom|center|directory|hidden|left|middle|readonly|right|sysfile|top|volumeid)|fb_login_(?:default|fallback_to_webview|forcing_safari|forcing_webview|no_fallback_to_webview|use_system_account)|iap_(?:available|canceled|ev_consume|ev_product|ev_purchase|ev_restore|ev_storeload|failed|purchased|refunded|status_available|status_loading|status_processing|status_restoring|status_unavailable|status_uninitialised|storeload_failed|storeload_ok|unavailable)|leaderboard_type_(?:number|time_mins_secs)|lighttype_(?:dir|point)|matrix_(?:projection|view|world)|mb_(?:any|left|middle|none|right)|network_(?:config_(?:connect_timeout|disable_reliable_udp|enable_reliable_udp|use_non_blocking_socket)|socket_(?:bluetooth|tcp|udp)|type_(?:connect|data|disconnect|non_blocking_connect))|of_challenge_(?:lose|tie|win)|os_(?:android|ios|linux|macosx|ps3|ps4|psvita|unknown|uwp|win32|win8native|windows|winphone|xboxone)|phy_debug_render_(?:aabb|collision_pairs|coms|core_shapes|joints|obb|shapes)|phy_joint_(?:anchor_1_x|anchor_1_y|anchor_2_x|anchor_2_y|angle|angle_limits|damping_ratio|frequency|length_1|length_2|lower_angle_limit|max_force|max_length|max_motor_force|max_motor_torque|max_torque|motor_force|motor_speed|motor_torque|reaction_force_x|reaction_force_y|reaction_torque|speed|translation|upper_angle_limit)|phy_particle_data_flag_(?:category|color|colour|position|typeflags|velocity)|phy_particle_flag_(?:colormixing|colourmixing|elastic|powder|spring|tensile|viscous|wall|water|zombie)|phy_particle_group_flag_(?:rigid|solid)|pr_(?:linelist|linestrip|pointlist|trianglefan|trianglelist|trianglestrip)|ps_(?:distr|shape)_(?:diamond|ellipse|gaussian|invgaussian|line|linear|rectangle)|pt_shape_(?:circle|cloud|disk|explosion|flare|line|pixel|ring|smoke|snow|spark|sphere|square|star)|ty_(?:real|string)|gp_(?:face\d|axislh|axislv|axisrh|axisrv|padd|padl|padr|padu|select|shoulderl|shoulderlb|shoulderr|shoulderrb|start|stickl|stickr)|lb_disp_(?:none|numeric|time_ms|time_sec)|lb_sort_(?:ascending|descending|none)|ov_(?:achievements|community|friends|gamegroup|players|settings)|ugc_(?:filetype_(?:community|microtrans)|list_(?:Favorited|Followed|Published|Subscribed|UsedOrPlayed|VotedDown|VotedOn|VotedUp|WillVoteLater)|match_(?:AllGuides|Artwork|Collections|ControllerBindings|IntegratedGuides|Items|Items_Mtx|Items_ReadyToUse|Screenshots|UsableInGame|Videos|WebGuides)|query_(?:AcceptedForGameRankedByAcceptanceDate|CreatedByFriendsRankedByPublicationDate|FavoritedByFriendsRankedByPublicationDate|NotYetRated)|query_RankedBy(?:NumTimesReported|PublicationDate|TextSearch|TotalVotesAsc|Trend|Vote|VotesUp)|result_success|sortorder_CreationOrder(?:Asc|Desc)|sortorder_(?:ForModeration|LastUpdatedDesc|SubscriptionDateDesc|TitleAsc|VoteScoreDesc)|visibility_(?:friends_only|private|public))|vertex_usage_(?:binormal|blendindices|blendweight|color|colour|depth|fog|normal|position|psize|sample|tangent|texcoord|textcoord)|vertex_type_(?:float\d|color|colour|ubyte4)|input_type|layerelementtype_(?:background|instance|oldtilemap|particlesystem|sprite|tile|tilemap|undefined)|se_(?:chorus|compressor|echo|equalizer|flanger|gargle|none|reverb)|text_type|tile_(?:flip|index_mask|mirror|rotate)|(?:obj|rm|scr|spr)\w+)\b/,
      variable: /\b(?:alarm|application_surface|async_load|background_(?:alpha|blend|color|colour|foreground|height|hspeed|htiled|index|showcolor|showcolour|visible|vspeed|vtiled|width|x|xscale|y|yscale)|bbox_(?:bottom|left|right|top)|browser_(?:height|width)|caption_(?:health|lives|score)|current_(?:day|hour|minute|month|second|time|weekday|year)|cursor_sprite|debug_mode|delta_time|direction|display_aa|error_(?:last|occurred)|event_(?:action|number|object|type)|fps|fps_real|friction|game_(?:display|project|save)_(?:id|name)|gamemaker_(?:pro|registered|version)|gravity|gravity_direction|(?:h|v)speed|health|iap_data|id|image_(?:alpha|angle|blend|depth|index|number|speed|xscale|yscale)|instance_(?:count|id)|keyboard_(?:key|lastchar|lastkey|string)|layer|lives|mask_index|mouse_(?:button|lastbutton|x|y)|object_index|os_(?:browser|device|type|version)|path_(?:endaction|index|orientation|position|positionprevious|scale|speed)|persistent|phy_(?:rotation|(?:col_normal|collision|com|linear_velocity|position|speed)_(?:x|y)|angular_(?:damping|velocity)|position_(?:x|y)previous|speed|linear_damping|bullet|fixed_rotation|active|mass|inertia|dynamic|kinematic|sleeping|collision_points)|pointer_(?:invalid|null)|room|room_(?:caption|first|height|last|persistent|speed|width)|score|secure_mode|show_(?:health|lives|score)|solid|speed|sprite_(?:height|index|width|xoffset|yoffset)|temp_directory|timeline_(?:index|loop|position|running|speed)|transition_(?:color|kind|steps)|undefined|view_(?:angle|current|enabled|(?:h|v)(?:border|speed)|(?:h|w|x|y)port|(?:h|w|x|y)view|object|surface_id|visible)|visible|webgl_enabled|working_directory|(?:x|y)(?:previous|start)|x|y|argument(?:_relitive|_count|\d)|argument|global|local|other|self)\b/
    });
  }
  return gml_1;
}
var gn_1;
var hasRequiredGn;
function requireGn() {
  if (hasRequiredGn) return gn_1;
  hasRequiredGn = 1;
  gn_1 = gn;
  gn.displayName = "gn";
  gn.aliases = ["gni"];
  function gn(Prism2) {
    Prism2.languages.gn = {
      comment: {
        pattern: /#.*/,
        greedy: true
      },
      "string-literal": {
        pattern: /(^|[^\\"])"(?:[^\r\n"\\]|\\.)*"/,
        lookbehind: true,
        greedy: true,
        inside: {
          interpolation: {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$(?:\{[\s\S]*?\}|[a-zA-Z_]\w*|0x[a-fA-F0-9]{2})/,
            lookbehind: true,
            inside: {
              number: /^\$0x[\s\S]{2}$/,
              variable: /^\$\w+$/,
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              expression: {
                pattern: /[\s\S]+/,
                inside: null
                // see below
              }
            }
          },
          string: /[\s\S]+/
        }
      },
      keyword: /\b(?:else|if)\b/,
      boolean: /\b(?:false|true)\b/,
      "builtin-function": {
        // a few functions get special highlighting to improve readability
        pattern: /\b(?:assert|defined|foreach|import|pool|print|template|tool|toolchain)(?=\s*\()/i,
        alias: "keyword"
      },
      function: /\b[a-z_]\w*(?=\s*\()/i,
      constant: /\b(?:current_cpu|current_os|current_toolchain|default_toolchain|host_cpu|host_os|root_build_dir|root_gen_dir|root_out_dir|target_cpu|target_gen_dir|target_os|target_out_dir)\b/,
      number: /-?\b\d+\b/,
      operator: /[-+!=<>]=?|&&|\|\|/,
      punctuation: /[(){}[\],.]/
    };
    Prism2.languages.gn["string-literal"].inside["interpolation"].inside["expression"].inside = Prism2.languages.gn;
    Prism2.languages.gni = Prism2.languages.gn;
  }
  return gn_1;
}
var goModule_1;
var hasRequiredGoModule;
function requireGoModule() {
  if (hasRequiredGoModule) return goModule_1;
  hasRequiredGoModule = 1;
  goModule_1 = goModule;
  goModule.displayName = "goModule";
  goModule.aliases = [];
  function goModule(Prism2) {
    Prism2.languages["go-mod"] = Prism2.languages["go-module"] = {
      comment: {
        pattern: /\/\/.*/,
        greedy: true
      },
      version: {
        pattern: /(^|[\s()[\],])v\d+\.\d+\.\d+(?:[+-][-+.\w]*)?(?![^\s()[\],])/,
        lookbehind: true,
        alias: "number"
      },
      "go-version": {
        pattern: /((?:^|\s)go\s+)\d+(?:\.\d+){1,2}/,
        lookbehind: true,
        alias: "number"
      },
      keyword: {
        pattern: /^([ \t]*)(?:exclude|go|module|replace|require|retract)\b/m,
        lookbehind: true
      },
      operator: /=>/,
      punctuation: /[()[\],]/
    };
  }
  return goModule_1;
}
var go_1;
var hasRequiredGo;
function requireGo() {
  if (hasRequiredGo) return go_1;
  hasRequiredGo = 1;
  go_1 = go;
  go.displayName = "go";
  go.aliases = [];
  function go(Prism2) {
    Prism2.languages.go = Prism2.languages.extend("clike", {
      string: {
        pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,
        lookbehind: true,
        greedy: true
      },
      keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
      boolean: /\b(?:_|false|iota|nil|true)\b/,
      number: [
        // binary and octal integers
        /\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
        // hexadecimal integers and floats
        /\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
        // decimal integers and floats
        /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i
      ],
      operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
      builtin: /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
    });
    Prism2.languages.insertBefore("go", "string", {
      char: {
        pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/,
        greedy: true
      }
    });
    delete Prism2.languages.go["class-name"];
  }
  return go_1;
}
var graphql_1;
var hasRequiredGraphql;
function requireGraphql() {
  if (hasRequiredGraphql) return graphql_1;
  hasRequiredGraphql = 1;
  graphql_1 = graphql;
  graphql.displayName = "graphql";
  graphql.aliases = [];
  function graphql(Prism2) {
    Prism2.languages.graphql = {
      comment: /#.*/,
      description: {
        pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
        greedy: true,
        alias: "string",
        inside: {
          "language-markdown": {
            pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
            lookbehind: true,
            inside: Prism2.languages.markdown
          }
        }
      },
      string: {
        pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
        greedy: true
      },
      number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
      boolean: /\b(?:false|true)\b/,
      variable: /\$[a-z_]\w*/i,
      directive: {
        pattern: /@[a-z_]\w*/i,
        alias: "function"
      },
      "attr-name": {
        pattern: /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
        greedy: true
      },
      "atom-input": {
        pattern: /\b[A-Z]\w*Input\b/,
        alias: "class-name"
      },
      scalar: /\b(?:Boolean|Float|ID|Int|String)\b/,
      constant: /\b[A-Z][A-Z_\d]*\b/,
      "class-name": {
        pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
        lookbehind: true
      },
      fragment: {
        pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
        lookbehind: true,
        alias: "function"
      },
      "definition-mutation": {
        pattern: /(\bmutation\s+)[a-zA-Z_]\w*/,
        lookbehind: true,
        alias: "function"
      },
      "definition-query": {
        pattern: /(\bquery\s+)[a-zA-Z_]\w*/,
        lookbehind: true,
        alias: "function"
      },
      keyword: /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
      operator: /[!=|&]|\.{3}/,
      "property-query": /\w+(?=\s*\()/,
      object: /\w+(?=\s*\{)/,
      punctuation: /[!(){}\[\]:=,]/,
      property: /\w+/
    };
    Prism2.hooks.add("after-tokenize", function afterTokenizeGraphql(env) {
      if (env.language !== "graphql") {
        return;
      }
      var validTokens = env.tokens.filter(function(token) {
        return typeof token !== "string" && token.type !== "comment" && token.type !== "scalar";
      });
      var currentIndex = 0;
      function getToken(offset) {
        return validTokens[currentIndex + offset];
      }
      function isTokenType(types, offset) {
        offset = offset || 0;
        for (var i2 = 0; i2 < types.length; i2++) {
          var token = getToken(i2 + offset);
          if (!token || token.type !== types[i2]) {
            return false;
          }
        }
        return true;
      }
      function findClosingBracket(open, close) {
        var stackHeight = 1;
        for (var i2 = currentIndex; i2 < validTokens.length; i2++) {
          var token = validTokens[i2];
          var content = token.content;
          if (token.type === "punctuation" && typeof content === "string") {
            if (open.test(content)) {
              stackHeight++;
            } else if (close.test(content)) {
              stackHeight--;
              if (stackHeight === 0) {
                return i2;
              }
            }
          }
        }
        return -1;
      }
      function addAlias(token, alias2) {
        var aliases = token.alias;
        if (!aliases) {
          token.alias = aliases = [];
        } else if (!Array.isArray(aliases)) {
          token.alias = aliases = [aliases];
        }
        aliases.push(alias2);
      }
      for (; currentIndex < validTokens.length; ) {
        var startToken = validTokens[currentIndex++];
        if (startToken.type === "keyword" && startToken.content === "mutation") {
          var inputVariables = [];
          if (isTokenType(["definition-mutation", "punctuation"]) && getToken(1).content === "(") {
            currentIndex += 2;
            var definitionEnd = findClosingBracket(/^\($/, /^\)$/);
            if (definitionEnd === -1) {
              continue;
            }
            for (; currentIndex < definitionEnd; currentIndex++) {
              var t = getToken(0);
              if (t.type === "variable") {
                addAlias(t, "variable-input");
                inputVariables.push(t.content);
              }
            }
            currentIndex = definitionEnd + 1;
          }
          if (isTokenType(["punctuation", "property-query"]) && getToken(0).content === "{") {
            currentIndex++;
            addAlias(getToken(0), "property-mutation");
            if (inputVariables.length > 0) {
              var mutationEnd = findClosingBracket(/^\{$/, /^\}$/);
              if (mutationEnd === -1) {
                continue;
              }
              for (var i = currentIndex; i < mutationEnd; i++) {
                var varToken = validTokens[i];
                if (varToken.type === "variable" && inputVariables.indexOf(varToken.content) >= 0) {
                  addAlias(varToken, "variable-input");
                }
              }
            }
          }
        }
      }
    });
  }
  return graphql_1;
}
var groovy_1;
var hasRequiredGroovy;
function requireGroovy() {
  if (hasRequiredGroovy) return groovy_1;
  hasRequiredGroovy = 1;
  groovy_1 = groovy;
  groovy.displayName = "groovy";
  groovy.aliases = [];
  function groovy(Prism2) {
    Prism2.languages.groovy = Prism2.languages.extend("clike", {
      string: [
        {
          // https://groovy-lang.org/syntax.html#_dollar_slashy_string
          pattern: /("""|''')(?:[^\\]|\\[\s\S])*?\1|\$\/(?:[^/$]|\$(?:[/$]|(?![/$]))|\/(?!\$))*\/\$/,
          greedy: true
        },
        {
          // TODO: Slash strings (e.g. /foo/) can contain line breaks but this will cause a lot of trouble with
          // simple division (see JS regex), so find a fix maybe?
          pattern: /(["'/])(?:\\.|(?!\1)[^\\\r\n])*\1/,
          greedy: true
        }
      ],
      keyword: /\b(?:abstract|as|assert|boolean|break|byte|case|catch|char|class|const|continue|def|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|in|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\b/,
      number: /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?\d+)?)[glidf]?\b/i,
      operator: {
        pattern: /(^|[^.])(?:~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.\.(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\|[|=]?|\/=?|\^=?|%=?)/,
        lookbehind: true
      },
      punctuation: /\.+|[{}[\];(),:$]/
    });
    Prism2.languages.insertBefore("groovy", "string", {
      shebang: {
        pattern: /#!.+/,
        alias: "comment"
      }
    });
    Prism2.languages.insertBefore("groovy", "punctuation", {
      "spock-block": /\b(?:and|cleanup|expect|given|setup|then|when|where):/
    });
    Prism2.languages.insertBefore("groovy", "function", {
      annotation: {
        pattern: /(^|[^.])@\w+/,
        lookbehind: true,
        alias: "punctuation"
      }
    });
    Prism2.hooks.add("wrap", function(env) {
      if (env.language === "groovy" && env.type === "string") {
        var delimiter = env.content.value[0];
        if (delimiter != "'") {
          var pattern = /([^\\])(?:\$(?:\{.*?\}|[\w.]+))/;
          if (delimiter === "$") {
            pattern = /([^\$])(?:\$(?:\{.*?\}|[\w.]+))/;
          }
          env.content.value = env.content.value.replace(/&lt;/g, "<").replace(/&amp;/g, "&");
          env.content = Prism2.highlight(env.content.value, {
            expression: {
              pattern,
              lookbehind: true,
              inside: Prism2.languages.groovy
            }
          });
          env.classes.push(delimiter === "/" ? "regex" : "gstring");
        }
      }
    });
  }
  return groovy_1;
}
var haml_1;
var hasRequiredHaml;
function requireHaml() {
  if (hasRequiredHaml) return haml_1;
  hasRequiredHaml = 1;
  var refractorRuby = requireRuby();
  haml_1 = haml;
  haml.displayName = "haml";
  haml.aliases = [];
  function haml(Prism2) {
    Prism2.register(refractorRuby);
    (function(Prism3) {
      Prism3.languages.haml = {
        // Multiline stuff should appear before the rest
        "multiline-comment": {
          pattern: /((?:^|\r?\n|\r)([\t ]*))(?:\/|-#).*(?:(?:\r?\n|\r)\2[\t ].+)*/,
          lookbehind: true,
          alias: "comment"
        },
        "multiline-code": [
          {
            pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*,[\t ]*(?:(?:\r?\n|\r)\2[\t ].*,[\t ]*)*(?:(?:\r?\n|\r)\2[\t ].+)/,
            lookbehind: true,
            inside: Prism3.languages.ruby
          },
          {
            pattern: /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*\|[\t ]*(?:(?:\r?\n|\r)\2[\t ].*\|[\t ]*)*/,
            lookbehind: true,
            inside: Prism3.languages.ruby
          }
        ],
        // See at the end of the file for known filters
        filter: {
          pattern: /((?:^|\r?\n|\r)([\t ]*)):[\w-]+(?:(?:\r?\n|\r)(?:\2[\t ].+|\s*?(?=\r?\n|\r)))+/,
          lookbehind: true,
          inside: {
            "filter-name": {
              pattern: /^:[\w-]+/,
              alias: "symbol"
            }
          }
        },
        markup: {
          pattern: /((?:^|\r?\n|\r)[\t ]*)<.+/,
          lookbehind: true,
          inside: Prism3.languages.markup
        },
        doctype: {
          pattern: /((?:^|\r?\n|\r)[\t ]*)!!!(?: .+)?/,
          lookbehind: true
        },
        tag: {
          // Allows for one nested group of braces
          pattern: /((?:^|\r?\n|\r)[\t ]*)[%.#][\w\-#.]*[\w\-](?:\([^)]+\)|\{(?:\{[^}]+\}|[^{}])+\}|\[[^\]]+\])*[\/<>]*/,
          lookbehind: true,
          inside: {
            attributes: [
              {
                // Lookbehind tries to prevent interpolations from breaking it all
                // Allows for one nested group of braces
                pattern: /(^|[^#])\{(?:\{[^}]+\}|[^{}])+\}/,
                lookbehind: true,
                inside: Prism3.languages.ruby
              },
              {
                pattern: /\([^)]+\)/,
                inside: {
                  "attr-value": {
                    pattern: /(=\s*)(?:"(?:\\.|[^\\"\r\n])*"|[^)\s]+)/,
                    lookbehind: true
                  },
                  "attr-name": /[\w:-]+(?=\s*!?=|\s*[,)])/,
                  punctuation: /[=(),]/
                }
              },
              {
                pattern: /\[[^\]]+\]/,
                inside: Prism3.languages.ruby
              }
            ],
            punctuation: /[<>]/
          }
        },
        code: {
          pattern: /((?:^|\r?\n|\r)[\t ]*(?:[~-]|[&!]?=)).+/,
          lookbehind: true,
          inside: Prism3.languages.ruby
        },
        // Interpolations in plain text
        interpolation: {
          pattern: /#\{[^}]+\}/,
          inside: {
            delimiter: {
              pattern: /^#\{|\}$/,
              alias: "punctuation"
            },
            ruby: {
              pattern: /[\s\S]+/,
              inside: Prism3.languages.ruby
            }
          }
        },
        punctuation: {
          pattern: /((?:^|\r?\n|\r)[\t ]*)[~=\-&!]+/,
          lookbehind: true
        }
      };
      var filter_pattern = "((?:^|\\r?\\n|\\r)([\\t ]*)):{{filter_name}}(?:(?:\\r?\\n|\\r)(?:\\2[\\t ].+|\\s*?(?=\\r?\\n|\\r)))+";
      var filters = [
        "css",
        {
          filter: "coffee",
          language: "coffeescript"
        },
        "erb",
        "javascript",
        "less",
        "markdown",
        "ruby",
        "scss",
        "textile"
      ];
      var all_filters = {};
      for (var i = 0, l = filters.length; i < l; i++) {
        var filter = filters[i];
        filter = typeof filter === "string" ? {
          filter,
          language: filter
        } : filter;
        if (Prism3.languages[filter.language]) {
          all_filters["filter-" + filter.filter] = {
            pattern: RegExp(
              filter_pattern.replace("{{filter_name}}", function() {
                return filter.filter;
              })
            ),
            lookbehind: true,
            inside: {
              "filter-name": {
                pattern: /^:[\w-]+/,
                alias: "symbol"
              },
              text: {
                pattern: /[\s\S]+/,
                alias: [filter.language, "language-" + filter.language],
                inside: Prism3.languages[filter.language]
              }
            }
          };
        }
      }
      Prism3.languages.insertBefore("haml", "filter", all_filters);
    })(Prism2);
  }
  return haml_1;
}
var handlebars_1;
var hasRequiredHandlebars;
function requireHandlebars() {
  if (hasRequiredHandlebars) return handlebars_1;
  hasRequiredHandlebars = 1;
  var refractorMarkupTemplating = requireMarkupTemplating();
  handlebars_1 = handlebars;
  handlebars.displayName = "handlebars";
  handlebars.aliases = ["hbs"];
  function handlebars(Prism2) {
    Prism2.register(refractorMarkupTemplating);
    (function(Prism3) {
      Prism3.languages.handlebars = {
        comment: /\{\{![\s\S]*?\}\}/,
        delimiter: {
          pattern: /^\{\{\{?|\}\}\}?$/,
          alias: "punctuation"
        },
        string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
        number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][+-]?\d+)?/,
        boolean: /\b(?:false|true)\b/,
        block: {
          pattern: /^(\s*(?:~\s*)?)[#\/]\S+?(?=\s*(?:~\s*)?$|\s)/,
          lookbehind: true,
          alias: "keyword"
        },
        brackets: {
          pattern: /\[[^\]]+\]/,
          inside: {
            punctuation: /\[|\]/,
            variable: /[\s\S]+/
          }
        },
        punctuation: /[!"#%&':()*+,.\/;<=>@\[\\\]^`{|}~]/,
        variable: /[^!"#%&'()*+,\/;<=>@\[\\\]^`{|}~\s]+/
      };
      Prism3.hooks.add("before-tokenize", function(env) {
        var handlebarsPattern = /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g;
        Prism3.languages["markup-templating"].buildPlaceholders(
          env,
          "handlebars",
          handlebarsPattern
        );
      });
      Prism3.hooks.add("after-tokenize", function(env) {
        Prism3.languages["markup-templating"].tokenizePlaceholders(
          env,
          "handlebars"
        );
      });
      Prism3.languages.hbs = Prism3.languages.handlebars;
    })(Prism2);
  }
  return handlebars_1;
}
var haskell_1;
var hasRequiredHaskell;
function requireHaskell() {
  if (hasRequiredHaskell) return haskell_1;
  hasRequiredHaskell = 1;
  haskell_1 = haskell;
  haskell.displayName = "haskell";
  haskell.aliases = ["hs"];
  function haskell(Prism2) {
    Prism2.languages.haskell = {
      comment: {
        pattern: /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--(?:(?=.)[^-!#$%*+=?&@|~.:<>^\\\/].*|$)|\{-[\s\S]*?-\})/m,
        lookbehind: true
      },
      char: {
        pattern: /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|ACK|BEL|BS|CAN|CR|DC1|DC2|DC3|DC4|DEL|DLE|EM|ENQ|EOT|ESC|ETB|ETX|FF|FS|GS|HT|LF|NAK|NUL|RS|SI|SO|SOH|SP|STX|SUB|SYN|US|VT|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
        alias: "string"
      },
      string: {
        pattern: /"(?:[^\\"]|\\(?:\S|\s+\\))*"/,
        greedy: true
      },
      keyword: /\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
      "import-statement": {
        // The imported or hidden names are not included in this import
        // statement. This is because we want to highlight those exactly like
        // we do for the names in the program.
        pattern: /(^[\t ]*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
        lookbehind: true,
        inside: {
          keyword: /\b(?:as|hiding|import|qualified)\b/,
          punctuation: /\./
        }
      },
      // These are builtin variables only. Constructors are highlighted later as a constant.
      builtin: /\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
      // decimal integers and floating point numbers | octal integers | hexadecimal integers
      number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
      operator: [
        {
          // infix operator
          pattern: /`(?:[A-Z][\w']*\.)*[_a-z][\w']*`/,
          greedy: true
        },
        {
          // function composition
          pattern: /(\s)\.(?=\s)/,
          lookbehind: true
        },
        // Most of this is needed because of the meaning of a single '.'.
        // If it stands alone freely, it is the function composition.
        // It may also be a separator between a module name and an identifier => no
        // operator. If it comes together with other special characters it is an
        // operator too.
        //
        // This regex means: /[-!#$%*+=?&@|~.:<>^\\\/]+/ without /\./.
        /[-!#$%*+=?&@|~:<>^\\\/][-!#$%*+=?&@|~.:<>^\\\/]*|\.[-!#$%*+=?&@|~.:<>^\\\/]+/
      ],
      // In Haskell, nearly everything is a variable, do not highlight these.
      hvariable: {
        pattern: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*/,
        inside: {
          punctuation: /\./
        }
      },
      constant: {
        pattern: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*/,
        inside: {
          punctuation: /\./
        }
      },
      punctuation: /[{}[\];(),.:]/
    };
    Prism2.languages.hs = Prism2.languages.haskell;
  }
  return haskell_1;
}
var haxe_1;
var hasRequiredHaxe;
function requireHaxe() {
  if (hasRequiredHaxe) return haxe_1;
  hasRequiredHaxe = 1;
  haxe_1 = haxe;
  haxe.displayName = "haxe";
  haxe.aliases = [];
  function haxe(Prism2) {
    Prism2.languages.haxe = Prism2.languages.extend("clike", {
      string: {
        // Strings can be multi-line
        pattern: /"(?:[^"\\]|\\[\s\S])*"/,
        greedy: true
      },
      "class-name": [
        {
          pattern: /(\b(?:abstract|class|enum|extends|implements|interface|new|typedef)\s+)[A-Z_]\w*/,
          lookbehind: true
        },
        // based on naming convention
        /\b[A-Z]\w*/
      ],
      // The final look-ahead prevents highlighting of keywords if expressions such as "haxe.macro.Expr"
      keyword: /\bthis\b|\b(?:abstract|as|break|case|cast|catch|class|continue|default|do|dynamic|else|enum|extends|extern|final|for|from|function|if|implements|import|in|inline|interface|macro|new|null|operator|overload|override|package|private|public|return|static|super|switch|throw|to|try|typedef|untyped|using|var|while)(?!\.)\b/,
      function: {
        pattern: /\b[a-z_]\w*(?=\s*(?:<[^<>]*>\s*)?\()/i,
        greedy: true
      },
      operator: /\.{3}|\+\+|--|&&|\|\||->|=>|(?:<<?|>{1,3}|[-+*/%!=&|^])=?|[?:~]/
    });
    Prism2.languages.insertBefore("haxe", "string", {
      "string-interpolation": {
        pattern: /'(?:[^'\\]|\\[\s\S])*'/,
        greedy: true,
        inside: {
          interpolation: {
            pattern: /(^|[^\\])\$(?:\w+|\{[^{}]+\})/,
            lookbehind: true,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{?|\}$/,
                alias: "punctuation"
              },
              expression: {
                pattern: /[\s\S]+/,
                inside: Prism2.languages.haxe
              }
            }
          },
          string: /[\s\S]+/
        }
      }
    });
    Prism2.languages.insertBefore("haxe", "class-name", {
      regex: {
        pattern: /~\/(?:[^\/\\\r\n]|\\.)+\/[a-z]*/,
        greedy: true,
        inside: {
          "regex-flags": /\b[a-z]+$/,
          "regex-source": {
            pattern: /^(~\/)[\s\S]+(?=\/$)/,
            lookbehind: true,
            alias: "language-regex",
            inside: Prism2.languages.regex
          },
          "regex-delimiter": /^~\/|\/$/
        }
      }
    });
    Prism2.languages.insertBefore("haxe", "keyword", {
      preprocessor: {
        pattern: /#(?:else|elseif|end|if)\b.*/,
        alias: "property"
      },
      metadata: {
        pattern: /@:?[\w.]+/,
        alias: "symbol"
      },
      reification: {
        pattern: /\$(?:\w+|(?=\{))/,
        alias: "important"
      }
    });
  }
  return haxe_1;
}
var hcl_1;
var hasRequiredHcl;
function requireHcl() {
  if (hasRequiredHcl) return hcl_1;
  hasRequiredHcl = 1;
  hcl_1 = hcl;
  hcl.displayName = "hcl";
  hcl.aliases = [];
  function hcl(Prism2) {
    Prism2.languages.hcl = {
      comment: /(?:\/\/|#).*|\/\*[\s\S]*?(?:\*\/|$)/,
      heredoc: {
        pattern: /<<-?(\w+\b)[\s\S]*?^[ \t]*\1/m,
        greedy: true,
        alias: "string"
      },
      keyword: [
        {
          pattern: /(?:data|resource)\s+(?:"(?:\\[\s\S]|[^\\"])*")(?=\s+"[\w-]+"\s+\{)/i,
          inside: {
            type: {
              pattern: /(resource|data|\s+)(?:"(?:\\[\s\S]|[^\\"])*")/i,
              lookbehind: true,
              alias: "variable"
            }
          }
        },
        {
          pattern: /(?:backend|module|output|provider|provisioner|variable)\s+(?:[\w-]+|"(?:\\[\s\S]|[^\\"])*")\s+(?=\{)/i,
          inside: {
            type: {
              pattern: /(backend|module|output|provider|provisioner|variable)\s+(?:[\w-]+|"(?:\\[\s\S]|[^\\"])*")\s+/i,
              lookbehind: true,
              alias: "variable"
            }
          }
        },
        /[\w-]+(?=\s+\{)/
      ],
      property: [/[-\w\.]+(?=\s*=(?!=))/, /"(?:\\[\s\S]|[^\\"])+"(?=\s*[:=])/],
      string: {
        pattern: /"(?:[^\\$"]|\\[\s\S]|\$(?:(?=")|\$+(?!\$)|[^"${])|\$\{(?:[^{}"]|"(?:[^\\"]|\\[\s\S])*")*\})*"/,
        greedy: true,
        inside: {
          interpolation: {
            pattern: /(^|[^$])\$\{(?:[^{}"]|"(?:[^\\"]|\\[\s\S])*")*\}/,
            lookbehind: true,
            inside: {
              type: {
                pattern: /(\b(?:count|data|local|module|path|self|terraform|var)\b\.)[\w\*]+/i,
                lookbehind: true,
                alias: "variable"
              },
              keyword: /\b(?:count|data|local|module|path|self|terraform|var)\b/i,
              function: /\w+(?=\()/,
              string: {
                pattern: /"(?:\\[\s\S]|[^\\"])*"/,
                greedy: true
              },
              number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,
              punctuation: /[!\$#%&'()*+,.\/;<=>@\[\\\]^`{|}~?:]/
            }
          }
        }
      },
      number: /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,
      boolean: /\b(?:false|true)\b/i,
      punctuation: /[=\[\]{}]/
    };
  }
  return hcl_1;
}
var hlsl_1;
var hasRequiredHlsl;
function requireHlsl() {
  if (hasRequiredHlsl) return hlsl_1;
  hasRequiredHlsl = 1;
  var refractorC = requireC();
  hlsl_1 = hlsl;
  hlsl.displayName = "hlsl";
  hlsl.aliases = [];
  function hlsl(Prism2) {
    Prism2.register(refractorC);
    Prism2.languages.hlsl = Prism2.languages.extend("c", {
      // Regarding keywords and class names:
      // The list of all keywords was split into 'keyword' and 'class-name' tokens based on whether they are capitalized.
      // https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-keywords
      // https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-reserved-words
      "class-name": [
        Prism2.languages.c["class-name"],
        /\b(?:AppendStructuredBuffer|BlendState|Buffer|ByteAddressBuffer|CompileShader|ComputeShader|ConsumeStructuredBuffer|DepthStencilState|DepthStencilView|DomainShader|GeometryShader|Hullshader|InputPatch|LineStream|OutputPatch|PixelShader|PointStream|RWBuffer|RWByteAddressBuffer|RWStructuredBuffer|RWTexture(?:1D|1DArray|2D|2DArray|3D)|RasterizerState|RenderTargetView|SamplerComparisonState|SamplerState|StructuredBuffer|Texture(?:1D|1DArray|2D|2DArray|2DMS|2DMSArray|3D|Cube|CubeArray)|TriangleStream|VertexShader)\b/
      ],
      keyword: [
        // HLSL keyword
        /\b(?:asm|asm_fragment|auto|break|case|catch|cbuffer|centroid|char|class|column_major|compile|compile_fragment|const|const_cast|continue|default|delete|discard|do|dynamic_cast|else|enum|explicit|export|extern|for|friend|fxgroup|goto|groupshared|if|in|inline|inout|interface|line|lineadj|linear|long|matrix|mutable|namespace|new|nointerpolation|noperspective|operator|out|packoffset|pass|pixelfragment|point|precise|private|protected|public|register|reinterpret_cast|return|row_major|sample|sampler|shared|short|signed|sizeof|snorm|stateblock|stateblock_state|static|static_cast|string|struct|switch|tbuffer|technique|technique10|technique11|template|texture|this|throw|triangle|triangleadj|try|typedef|typename|uniform|union|unorm|unsigned|using|vector|vertexfragment|virtual|void|volatile|while)\b/,
        // scalar, vector, and matrix types
        /\b(?:bool|double|dword|float|half|int|min(?:10float|12int|16(?:float|int|uint))|uint)(?:[1-4](?:x[1-4])?)?\b/
      ],
      // https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-appendix-grammar#floating-point-numbers
      number: /(?:(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+)?|\b0x[\da-fA-F]+)[fFhHlLuU]?\b/,
      boolean: /\b(?:false|true)\b/
    });
  }
  return hlsl_1;
}
var hoon_1;
var hasRequiredHoon;
function requireHoon() {
  if (hasRequiredHoon) return hoon_1;
  hasRequiredHoon = 1;
  hoon_1 = hoon;
  hoon.displayName = "hoon";
  hoon.aliases = [];
  function hoon(Prism2) {
    Prism2.languages.hoon = {
      comment: {
        pattern: /::.*/,
        greedy: true
      },
      string: {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: true
      },
      constant: /%(?:\.[ny]|[\w-]+)/,
      "class-name": /@(?:[a-z0-9-]*[a-z0-9])?|\*/i,
      function: /(?:\+[-+] {2})?(?:[a-z](?:[a-z0-9-]*[a-z0-9])?)/,
      keyword: /\.[\^\+\*=\?]|![><:\.=\?!]|=[>|:,\.\-\^<+;/~\*\?]|\?[>|:\.\-\^<\+&~=@!]|\|[\$_%:\.\-\^~\*=@\?]|\+[|\$\+\*]|:[_\-\^\+~\*]|%[_:\.\-\^\+~\*=]|\^[|:\.\-\+&~\*=\?]|\$[|_%:<>\-\^&~@=\?]|;[:<\+;\/~\*=]|~[>|\$_%<\+\/&=\?!]|--|==/
    };
  }
  return hoon_1;
}
var hpkp_1;
var hasRequiredHpkp;
function requireHpkp() {
  if (hasRequiredHpkp) return hpkp_1;
  hasRequiredHpkp = 1;
  hpkp_1 = hpkp;
  hpkp.displayName = "hpkp";
  hpkp.aliases = [];
  function hpkp(Prism2) {
    Prism2.languages.hpkp = {
      directive: {
        pattern: /\b(?:includeSubDomains|max-age|pin-sha256|preload|report-to|report-uri|strict)(?=[\s;=]|$)/i,
        alias: "property"
      },
      operator: /=/,
      punctuation: /;/
    };
  }
  return hpkp_1;
}
var hsts_1;
var hasRequiredHsts;
function requireHsts() {
  if (hasRequiredHsts) return hsts_1;
  hasRequiredHsts = 1;
  hsts_1 = hsts;
  hsts.displayName = "hsts";
  hsts.aliases = [];
  function hsts(Prism2) {
    Prism2.languages.hsts = {
      directive: {
        pattern: /\b(?:includeSubDomains|max-age|preload)(?=[\s;=]|$)/i,
        alias: "property"
      },
      operator: /=/,
      punctuation: /;/
    };
  }
  return hsts_1;
}
var http_1;
var hasRequiredHttp;
function requireHttp() {
  if (hasRequiredHttp) return http_1;
  hasRequiredHttp = 1;
  http_1 = http;
  http.displayName = "http";
  http.aliases = [];
  function http(Prism2) {
    (function(Prism3) {
      function headerValueOf(name) {
        return RegExp("(^(?:" + name + "):[ 	]*(?![ 	]))[^]+", "i");
      }
      Prism3.languages.http = {
        "request-line": {
          pattern: /^(?:CONNECT|DELETE|GET|HEAD|OPTIONS|PATCH|POST|PRI|PUT|SEARCH|TRACE)\s(?:https?:\/\/|\/)\S*\sHTTP\/[\d.]+/m,
          inside: {
            // HTTP Method
            method: {
              pattern: /^[A-Z]+\b/,
              alias: "property"
            },
            // Request Target e.g. http://example.com, /path/to/file
            "request-target": {
              pattern: /^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,
              lookbehind: true,
              alias: "url",
              inside: Prism3.languages.uri
            },
            // HTTP Version
            "http-version": {
              pattern: /^(\s)HTTP\/[\d.]+/,
              lookbehind: true,
              alias: "property"
            }
          }
        },
        "response-status": {
          pattern: /^HTTP\/[\d.]+ \d+ .+/m,
          inside: {
            // HTTP Version
            "http-version": {
              pattern: /^HTTP\/[\d.]+/,
              alias: "property"
            },
            // Status Code
            "status-code": {
              pattern: /^(\s)\d+(?=\s)/,
              lookbehind: true,
              alias: "number"
            },
            // Reason Phrase
            "reason-phrase": {
              pattern: /^(\s).+/,
              lookbehind: true,
              alias: "string"
            }
          }
        },
        header: {
          pattern: /^[\w-]+:.+(?:(?:\r\n?|\n)[ \t].+)*/m,
          inside: {
            "header-value": [
              {
                pattern: headerValueOf(/Content-Security-Policy/.source),
                lookbehind: true,
                alias: ["csp", "languages-csp"],
                inside: Prism3.languages.csp
              },
              {
                pattern: headerValueOf(/Public-Key-Pins(?:-Report-Only)?/.source),
                lookbehind: true,
                alias: ["hpkp", "languages-hpkp"],
                inside: Prism3.languages.hpkp
              },
              {
                pattern: headerValueOf(/Strict-Transport-Security/.source),
                lookbehind: true,
                alias: ["hsts", "languages-hsts"],
                inside: Prism3.languages.hsts
              },
              {
                pattern: headerValueOf(/[^:]+/.source),
                lookbehind: true
              }
            ],
            "header-name": {
              pattern: /^[^:]+/,
              alias: "keyword"
            },
            punctuation: /^:/
          }
        }
      };
      var langs = Prism3.languages;
      var httpLanguages = {
        "application/javascript": langs.javascript,
        "application/json": langs.json || langs.javascript,
        "application/xml": langs.xml,
        "text/xml": langs.xml,
        "text/html": langs.html,
        "text/css": langs.css,
        "text/plain": langs.plain
      };
      var suffixTypes = {
        "application/json": true,
        "application/xml": true
      };
      function getSuffixPattern(contentType2) {
        var suffix = contentType2.replace(/^[a-z]+\//, "");
        var suffixPattern = "\\w+/(?:[\\w.-]+\\+)+" + suffix + "(?![+\\w.-])";
        return "(?:" + contentType2 + "|" + suffixPattern + ")";
      }
      var options;
      for (var contentType in httpLanguages) {
        if (httpLanguages[contentType]) {
          options = options || {};
          var pattern = suffixTypes[contentType] ? getSuffixPattern(contentType) : contentType;
          options[contentType.replace(/\//g, "-")] = {
            pattern: RegExp(
              "(" + /content-type:\s*/.source + pattern + /(?:(?:\r\n?|\n)[\w-].*)*(?:\r(?:\n|(?!\n))|\n)/.source + ")" + // This is a little interesting:
              // The HTTP format spec required 1 empty line before the body to make everything unambiguous.
              // However, when writing code by hand (e.g. to display on a website) people can forget about this,
              // so we want to be liberal here. We will allow the empty line to be omitted if the first line of
              // the body does not start with a [\w-] character (as headers do).
              /[^ \t\w-][\s\S]*/.source,
              "i"
            ),
            lookbehind: true,
            inside: httpLanguages[contentType]
          };
        }
      }
      if (options) {
        Prism3.languages.insertBefore("http", "header", options);
      }
    })(Prism2);
  }
  return http_1;
}
var ichigojam_1;
var hasRequiredIchigojam;
function requireIchigojam() {
  if (hasRequiredIchigojam) return ichigojam_1;
  hasRequiredIchigojam = 1;
  ichigojam_1 = ichigojam;
  ichigojam.displayName = "ichigojam";
  ichigojam.aliases = [];
  function ichigojam(Prism2) {
    Prism2.languages.ichigojam = {
      comment: /(?:\B'|REM)(?:[^\n\r]*)/i,
      string: {
        pattern: /"(?:""|[!#$%&'()*,\/:;<=>?^\w +\-.])*"/,
        greedy: true
      },
      number: /\B#[0-9A-F]+|\B`[01]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:E[+-]?\d+)?/i,
      keyword: /\b(?:BEEP|BPS|CASE|CLEAR|CLK|CLO|CLP|CLS|CLT|CLV|CONT|COPY|ELSE|END|FILE|FILES|FOR|GOSUB|GOTO|GSB|IF|INPUT|KBD|LED|LET|LIST|LOAD|LOCATE|LRUN|NEW|NEXT|OUT|PLAY|POKE|PRINT|PWM|REM|RENUM|RESET|RETURN|RIGHT|RTN|RUN|SAVE|SCROLL|SLEEP|SRND|STEP|STOP|SUB|TEMPO|THEN|TO|UART|VIDEO|WAIT)(?:\$|\b)/i,
      function: /\b(?:ABS|ANA|ASC|BIN|BTN|DEC|END|FREE|HELP|HEX|I2CR|I2CW|IN|INKEY|LEN|LINE|PEEK|RND|SCR|SOUND|STR|TICK|USR|VER|VPEEK|ZER)(?:\$|\b)/i,
      label: /(?:\B@\S+)/,
      operator: /<[=>]?|>=?|\|\||&&|[+\-*\/=|&^~!]|\b(?:AND|NOT|OR)\b/i,
      punctuation: /[\[,;:()\]]/
    };
  }
  return ichigojam_1;
}
var icon_1;
var hasRequiredIcon;
function requireIcon() {
  if (hasRequiredIcon) return icon_1;
  hasRequiredIcon = 1;
  icon_1 = icon;
  icon.displayName = "icon";
  icon.aliases = [];
  function icon(Prism2) {
    Prism2.languages.icon = {
      comment: /#.*/,
      string: {
        pattern: /(["'])(?:(?!\1)[^\\\r\n_]|\\.|_(?!\1)(?:\r\n|[\s\S]))*\1/,
        greedy: true
      },
      number: /\b(?:\d+r[a-z\d]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b|\.\d+\b/i,
      "builtin-keyword": {
        pattern: /&(?:allocated|ascii|clock|collections|cset|current|date|dateline|digits|dump|e|error(?:number|text|value)?|errout|fail|features|file|host|input|lcase|letters|level|line|main|null|output|phi|pi|pos|progname|random|regions|source|storage|subject|time|trace|ucase|version)\b/,
        alias: "variable"
      },
      directive: {
        pattern: /\$\w+/,
        alias: "builtin"
      },
      keyword: /\b(?:break|by|case|create|default|do|else|end|every|fail|global|if|initial|invocable|link|local|next|not|of|procedure|record|repeat|return|static|suspend|then|to|until|while)\b/,
      function: /\b(?!\d)\w+(?=\s*[({]|\s*!\s*\[)/,
      operator: /[+-]:(?!=)|(?:[\/?@^%&]|\+\+?|--?|==?=?|~==?=?|\*\*?|\|\|\|?|<(?:->?|<?=?)|>>?=?)(?::=)?|:(?:=:?)?|[!.\\|~]/,
      punctuation: /[\[\](){},;]/
    };
  }
  return icon_1;
}
var icuMessageFormat_1;
var hasRequiredIcuMessageFormat;
function requireIcuMessageFormat() {
  if (hasRequiredIcuMessageFormat) return icuMessageFormat_1;
  hasRequiredIcuMessageFormat = 1;
  icuMessageFormat_1 = icuMessageFormat;
  icuMessageFormat.displayName = "icuMessageFormat";
  icuMessageFormat.aliases = [];
  function icuMessageFormat(Prism2) {
    (function(Prism3) {
      function nested(source, level) {
        if (level <= 0) {
          return /[]/.source;
        } else {
          return source.replace(/<SELF>/g, function() {
            return nested(source, level - 1);
          });
        }
      }
      var stringPattern = /'[{}:=,](?:[^']|'')*'(?!')/;
      var escape = {
        pattern: /''/,
        greedy: true,
        alias: "operator"
      };
      var string = {
        pattern: stringPattern,
        greedy: true,
        inside: {
          escape
        }
      };
      var argumentSource = nested(
        /\{(?:[^{}']|'(?![{},'])|''|<STR>|<SELF>)*\}/.source.replace(
          /<STR>/g,
          function() {
            return stringPattern.source;
          }
        ),
        8
      );
      var nestedMessage = {
        pattern: RegExp(argumentSource),
        inside: {
          message: {
            pattern: /^(\{)[\s\S]+(?=\}$)/,
            lookbehind: true,
            inside: null
            // see below
          },
          "message-delimiter": {
            pattern: /./,
            alias: "punctuation"
          }
        }
      };
      Prism3.languages["icu-message-format"] = {
        argument: {
          pattern: RegExp(argumentSource),
          greedy: true,
          inside: {
            content: {
              pattern: /^(\{)[\s\S]+(?=\}$)/,
              lookbehind: true,
              inside: {
                "argument-name": {
                  pattern: /^(\s*)[^{}:=,\s]+/,
                  lookbehind: true
                },
                "choice-style": {
                  // https://unicode-org.github.io/icu-docs/apidoc/released/icu4c/classicu_1_1ChoiceFormat.html#details
                  pattern: /^(\s*,\s*choice\s*,\s*)\S(?:[\s\S]*\S)?/,
                  lookbehind: true,
                  inside: {
                    punctuation: /\|/,
                    range: {
                      pattern: /^(\s*)[+-]?(?:\d+(?:\.\d*)?|\u221e)\s*[<#\u2264]/,
                      lookbehind: true,
                      inside: {
                        operator: /[<#\u2264]/,
                        number: /\S+/
                      }
                    },
                    rest: null
                    // see below
                  }
                },
                "plural-style": {
                  // https://unicode-org.github.io/icu-docs/apidoc/released/icu4j/com/ibm/icu/text/PluralFormat.html#:~:text=Patterns%20and%20Their%20Interpretation
                  pattern: /^(\s*,\s*(?:plural|selectordinal)\s*,\s*)\S(?:[\s\S]*\S)?/,
                  lookbehind: true,
                  inside: {
                    offset: /^offset:\s*\d+/,
                    "nested-message": nestedMessage,
                    selector: {
                      pattern: /=\d+|[^{}:=,\s]+/,
                      inside: {
                        keyword: /^(?:few|many|one|other|two|zero)$/
                      }
                    }
                  }
                },
                "select-style": {
                  // https://unicode-org.github.io/icu-docs/apidoc/released/icu4j/com/ibm/icu/text/SelectFormat.html#:~:text=Patterns%20and%20Their%20Interpretation
                  pattern: /^(\s*,\s*select\s*,\s*)\S(?:[\s\S]*\S)?/,
                  lookbehind: true,
                  inside: {
                    "nested-message": nestedMessage,
                    selector: {
                      pattern: /[^{}:=,\s]+/,
                      inside: {
                        keyword: /^other$/
                      }
                    }
                  }
                },
                keyword: /\b(?:choice|plural|select|selectordinal)\b/,
                "arg-type": {
                  pattern: /\b(?:date|duration|number|ordinal|spellout|time)\b/,
                  alias: "keyword"
                },
                "arg-skeleton": {
                  pattern: /(,\s*)::[^{}:=,\s]+/,
                  lookbehind: true
                },
                "arg-style": {
                  pattern: /(,\s*)(?:currency|full|integer|long|medium|percent|short)(?=\s*$)/,
                  lookbehind: true
                },
                "arg-style-text": {
                  pattern: RegExp(
                    /(^\s*,\s*(?=\S))/.source + nested(/(?:[^{}']|'[^']*'|\{(?:<SELF>)?\})+/.source, 8) + "$"
                  ),
                  lookbehind: true,
                  alias: "string"
                },
                punctuation: /,/
              }
            },
            "argument-delimiter": {
              pattern: /./,
              alias: "operator"
            }
          }
        },
        escape,
        string
      };
      nestedMessage.inside.message.inside = Prism3.languages["icu-message-format"];
      Prism3.languages["icu-message-format"].argument.inside.content.inside["choice-style"].inside.rest = Prism3.languages["icu-message-format"];
    })(Prism2);
  }
  return icuMessageFormat_1;
}
var idris_1;
var hasRequiredIdris;
function requireIdris() {
  if (hasRequiredIdris) return idris_1;
  hasRequiredIdris = 1;
  var refractorHaskell = requireHaskell();
  idris_1 = idris;
  idris.displayName = "idris";
  idris.aliases = ["idr"];
  function idris(Prism2) {
    Prism2.register(refractorHaskell);
    Prism2.languages.idris = Prism2.languages.extend("haskell", {
      comment: {
        pattern: /(?:(?:--|\|\|\|).*$|\{-[\s\S]*?-\})/m
      },
      keyword: /\b(?:Type|case|class|codata|constructor|corecord|data|do|dsl|else|export|if|implementation|implicit|import|impossible|in|infix|infixl|infixr|instance|interface|let|module|mutual|namespace|of|parameters|partial|postulate|private|proof|public|quoteGoal|record|rewrite|syntax|then|total|using|where|with)\b/,
      builtin: void 0
    });
    Prism2.languages.insertBefore("idris", "keyword", {
      "import-statement": {
        pattern: /(^\s*import\s+)(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*/m,
        lookbehind: true,
        inside: {
          punctuation: /\./
        }
      }
    });
    Prism2.languages.idr = Prism2.languages.idris;
  }
  return idris_1;
}
var iecst_1;
var hasRequiredIecst;
function requireIecst() {
  if (hasRequiredIecst) return iecst_1;
  hasRequiredIecst = 1;
  iecst_1 = iecst;
  iecst.displayName = "iecst";
  iecst.aliases = [];
  function iecst(Prism2) {
    Prism2.languages.iecst = {
      comment: [
        {
          pattern: /(^|[^\\])(?:\/\*[\s\S]*?(?:\*\/|$)|\(\*[\s\S]*?(?:\*\)|$)|\{[\s\S]*?(?:\}|$))/,
          lookbehind: true,
          greedy: true
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      keyword: [
        /\b(?:END_)?(?:PROGRAM|CONFIGURATION|INTERFACE|FUNCTION_BLOCK|FUNCTION|ACTION|TRANSITION|TYPE|STRUCT|(?:INITIAL_)?STEP|NAMESPACE|LIBRARY|CHANNEL|FOLDER|RESOURCE|VAR_(?:ACCESS|CONFIG|EXTERNAL|GLOBAL|INPUT|IN_OUT|OUTPUT|TEMP)|VAR|METHOD|PROPERTY)\b/i,
        /\b(?:AT|BY|(?:END_)?(?:CASE|FOR|IF|REPEAT|WHILE)|CONSTANT|CONTINUE|DO|ELSE|ELSIF|EXIT|EXTENDS|FROM|GET|GOTO|IMPLEMENTS|JMP|NON_RETAIN|OF|PRIVATE|PROTECTED|PUBLIC|RETAIN|RETURN|SET|TASK|THEN|TO|UNTIL|USING|WITH|__CATCH|__ENDTRY|__FINALLY|__TRY)\b/
      ],
      "class-name": /\b(?:ANY|ARRAY|BOOL|BYTE|U?(?:D|L|S)?INT|(?:D|L)?WORD|DATE(?:_AND_TIME)?|DT|L?REAL|POINTER|STRING|TIME(?:_OF_DAY)?|TOD)\b/,
      address: {
        pattern: /%[IQM][XBWDL][\d.]*|%[IQ][\d.]*/,
        alias: "symbol"
      },
      number: /\b(?:16#[\da-f]+|2#[01_]+|0x[\da-f]+)\b|\b(?:D|DT|T|TOD)#[\d_shmd:]*|\b[A-Z]*#[\d.,_]*|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      boolean: /\b(?:FALSE|NULL|TRUE)\b/,
      operator: /S?R?:?=>?|&&?|\*\*?|<[=>]?|>=?|[-:^/+#]|\b(?:AND|EQ|EXPT|GE|GT|LE|LT|MOD|NE|NOT|OR|XOR)\b/,
      function: /\b[a-z_]\w*(?=\s*\()/i,
      punctuation: /[()[\].,;]/
    };
  }
  return iecst_1;
}
var ignore_1;
var hasRequiredIgnore;
function requireIgnore() {
  if (hasRequiredIgnore) return ignore_1;
  hasRequiredIgnore = 1;
  ignore_1 = ignore;
  ignore.displayName = "ignore";
  ignore.aliases = ["gitignore", "hgignore", "npmignore"];
  function ignore(Prism2) {
    (function(Prism3) {
      Prism3.languages.ignore = {
        // https://git-scm.com/docs/gitignore
        comment: /^#.*/m,
        entry: {
          pattern: /\S(?:.*(?:(?:\\ )|\S))?/,
          alias: "string",
          inside: {
            operator: /^!|\*\*?|\?/,
            regex: {
              pattern: /(^|[^\\])\[[^\[\]]*\]/,
              lookbehind: true
            },
            punctuation: /\//
          }
        }
      };
      Prism3.languages.gitignore = Prism3.languages.ignore;
      Prism3.languages.hgignore = Prism3.languages.ignore;
      Prism3.languages.npmignore = Prism3.languages.ignore;
    })(Prism2);
  }
  return ignore_1;
}
var inform7_1;
var hasRequiredInform7;
function requireInform7() {
  if (hasRequiredInform7) return inform7_1;
  hasRequiredInform7 = 1;
  inform7_1 = inform7;
  inform7.displayName = "inform7";
  inform7.aliases = [];
  function inform7(Prism2) {
    Prism2.languages.inform7 = {
      string: {
        pattern: /"[^"]*"/,
        inside: {
          substitution: {
            pattern: /\[[^\[\]]+\]/,
            inside: {
              delimiter: {
                pattern: /\[|\]/,
                alias: "punctuation"
              }
              // See rest below
            }
          }
        }
      },
      comment: {
        pattern: /\[[^\[\]]+\]/,
        greedy: true
      },
      title: {
        pattern: /^[ \t]*(?:book|chapter|part(?! of)|section|table|volume)\b.+/im,
        alias: "important"
      },
      number: {
        pattern: /(^|[^-])(?:\b\d+(?:\.\d+)?(?:\^\d+)?(?:(?!\d)\w+)?|\b(?:eight|eleven|five|four|nine|one|seven|six|ten|three|twelve|two))\b(?!-)/i,
        lookbehind: true
      },
      verb: {
        pattern: /(^|[^-])\b(?:answering|applying to|are|asking|attacking|be(?:ing)?|burning|buying|called|carries|carry(?! out)|carrying|climbing|closing|conceal(?:ing|s)?|consulting|contain(?:ing|s)?|cutting|drinking|dropping|eating|enclos(?:es?|ing)|entering|examining|exiting|getting|giving|going|ha(?:s|ve|ving)|hold(?:ing|s)?|impl(?:ies|y)|incorporat(?:es?|ing)|inserting|is|jumping|kissing|listening|locking|looking|mean(?:ing|s)?|opening|provid(?:es?|ing)|pulling|pushing|putting|relat(?:es?|ing)|removing|searching|see(?:ing|s)?|setting|showing|singing|sleeping|smelling|squeezing|support(?:ing|s)?|swearing|switching|taking|tasting|telling|thinking|throwing|touching|turning|tying|unlock(?:ing|s)?|var(?:ies|y|ying)|waiting|waking|waving|wear(?:ing|s)?)\b(?!-)/i,
        lookbehind: true,
        alias: "operator"
      },
      keyword: {
        pattern: /(^|[^-])\b(?:after|before|carry out|check|continue the action|definition(?= *:)|do nothing|else|end (?:if|the story|unless)|every turn|if|include|instead(?: of)?|let|move|no|now|otherwise|repeat|report|resume the story|rule for|running through|say(?:ing)?|stop the action|test|try(?:ing)?|understand|unless|use|when|while|yes)\b(?!-)/i,
        lookbehind: true
      },
      property: {
        pattern: /(^|[^-])\b(?:adjacent(?! to)|carried|closed|concealed|contained|dark|described|edible|empty|enclosed|enterable|even|female|fixed in place|full|handled|held|improper-named|incorporated|inedible|invisible|lighted|lit|lock(?:able|ed)|male|marked for listing|mentioned|negative|neuter|non-(?:empty|full|recurring)|odd|opaque|open(?:able)?|plural-named|portable|positive|privately-named|proper-named|provided|publically-named|pushable between rooms|recurring|related|rubbing|scenery|seen|singular-named|supported|swinging|switch(?:able|ed(?: off| on)?)|touch(?:able|ed)|transparent|unconcealed|undescribed|unlit|unlocked|unmarked for listing|unmentioned|unopenable|untouchable|unvisited|variable|visible|visited|wearable|worn)\b(?!-)/i,
        lookbehind: true,
        alias: "symbol"
      },
      position: {
        pattern: /(^|[^-])\b(?:above|adjacent to|back side of|below|between|down|east|everywhere|front side|here|in|inside(?: from)?|north(?:east|west)?|nowhere|on(?: top of)?|other side|outside(?: from)?|parts? of|regionally in|south(?:east|west)?|through|up|west|within)\b(?!-)/i,
        lookbehind: true,
        alias: "keyword"
      },
      type: {
        pattern: /(^|[^-])\b(?:actions?|activit(?:ies|y)|actors?|animals?|backdrops?|containers?|devices?|directions?|doors?|holders?|kinds?|lists?|m[ae]n|nobody|nothing|nouns?|numbers?|objects?|people|persons?|player(?:'s holdall)?|regions?|relations?|rooms?|rule(?:book)?s?|scenes?|someone|something|supporters?|tables?|texts?|things?|time|vehicles?|wom[ae]n)\b(?!-)/i,
        lookbehind: true,
        alias: "variable"
      },
      punctuation: /[.,:;(){}]/
    };
    Prism2.languages.inform7["string"].inside["substitution"].inside.rest = Prism2.languages.inform7;
    Prism2.languages.inform7["string"].inside["substitution"].inside.rest.text = {
      pattern: /\S(?:\s*\S)*/,
      alias: "comment"
    };
  }
  return inform7_1;
}
var ini_1;
var hasRequiredIni;
function requireIni() {
  if (hasRequiredIni) return ini_1;
  hasRequiredIni = 1;
  ini_1 = ini;
  ini.displayName = "ini";
  ini.aliases = [];
  function ini(Prism2) {
    Prism2.languages.ini = {
      /**
       * The component mimics the behavior of the Win32 API parser.
       *
       * @see {@link https://github.com/PrismJS/prism/issues/2775#issuecomment-787477723}
       */
      comment: {
        pattern: /(^[ \f\t\v]*)[#;][^\n\r]*/m,
        lookbehind: true
      },
      section: {
        pattern: /(^[ \f\t\v]*)\[[^\n\r\]]*\]?/m,
        lookbehind: true,
        inside: {
          "section-name": {
            pattern: /(^\[[ \f\t\v]*)[^ \f\t\v\]]+(?:[ \f\t\v]+[^ \f\t\v\]]+)*/,
            lookbehind: true,
            alias: "selector"
          },
          punctuation: /\[|\]/
        }
      },
      key: {
        pattern: /(^[ \f\t\v]*)[^ \f\n\r\t\v=]+(?:[ \f\t\v]+[^ \f\n\r\t\v=]+)*(?=[ \f\t\v]*=)/m,
        lookbehind: true,
        alias: "attr-name"
      },
      value: {
        pattern: /(=[ \f\t\v]*)[^ \f\n\r\t\v]+(?:[ \f\t\v]+[^ \f\n\r\t\v]+)*/,
        lookbehind: true,
        alias: "attr-value",
        inside: {
          "inner-value": {
            pattern: /^("|').+(?=\1$)/,
            lookbehind: true
          }
        }
      },
      punctuation: /=/
    };
  }
  return ini_1;
}
var io_1;
var hasRequiredIo;
function requireIo() {
  if (hasRequiredIo) return io_1;
  hasRequiredIo = 1;
  io_1 = io;
  io.displayName = "io";
  io.aliases = [];
  function io(Prism2) {
    Prism2.languages.io = {
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?(?:\*\/|$)|\/\/.*|#.*)/,
        lookbehind: true,
        greedy: true
      },
      "triple-quoted-string": {
        pattern: /"""(?:\\[\s\S]|(?!""")[^\\])*"""/,
        greedy: true,
        alias: "string"
      },
      string: {
        pattern: /"(?:\\.|[^\\\r\n"])*"/,
        greedy: true
      },
      keyword: /\b(?:activate|activeCoroCount|asString|block|break|call|catch|clone|collectGarbage|compileString|continue|do|doFile|doMessage|doString|else|elseif|exit|for|foreach|forward|getEnvironmentVariable|getSlot|hasSlot|if|ifFalse|ifNil|ifNilEval|ifTrue|isActive|isNil|isResumable|list|message|method|parent|pass|pause|perform|performWithArgList|print|println|proto|raise|raiseResumable|removeSlot|resend|resume|schedulerSleepSeconds|self|sender|setSchedulerSleepSeconds|setSlot|shallowCopy|slotNames|super|system|then|thisBlock|thisContext|try|type|uniqueId|updateSlot|wait|while|write|yield)\b/,
      builtin: /\b(?:Array|AudioDevice|AudioMixer|BigNum|Block|Box|Buffer|CFunction|CGI|Color|Curses|DBM|DNSResolver|DOConnection|DOProxy|DOServer|Date|Directory|Duration|DynLib|Error|Exception|FFT|File|Fnmatch|Font|Future|GL|GLE|GLScissor|GLU|GLUCylinder|GLUQuadric|GLUSphere|GLUT|Host|Image|Importer|LinkList|List|Lobby|Locals|MD5|MP3Decoder|MP3Encoder|Map|Message|Movie|Notification|Number|Object|OpenGL|Point|Protos|Random|Regex|SGML|SGMLElement|SGMLParser|SQLite|Sequence|Server|ShowMessage|SleepyCat|SleepyCatCursor|Socket|SocketManager|Sound|Soup|Store|String|Tree|UDPSender|UPDReceiver|URL|User|Warning|WeakLink)\b/,
      boolean: /\b(?:false|nil|true)\b/,
      number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e-?\d+)?/i,
      operator: /[=!*/%+\-^&|]=|>>?=?|<<?=?|:?:?=|\+\+?|--?|\*\*?|\/\/?|%|\|\|?|&&?|\b(?:and|not|or|return)\b|@@?|\?\??|\.\./,
      punctuation: /[{}[\];(),.:]/
    };
  }
  return io_1;
}
var j_1;
var hasRequiredJ;
function requireJ() {
  if (hasRequiredJ) return j_1;
  hasRequiredJ = 1;
  j_1 = j;
  j.displayName = "j";
  j.aliases = [];
  function j(Prism2) {
    Prism2.languages.j = {
      comment: {
        pattern: /\bNB\..*/,
        greedy: true
      },
      string: {
        pattern: /'(?:''|[^'\r\n])*'/,
        greedy: true
      },
      keyword: /\b(?:(?:CR|LF|adverb|conjunction|def|define|dyad|monad|noun|verb)\b|(?:assert|break|case|catch[dt]?|continue|do|else|elseif|end|fcase|for|for_\w+|goto_\w+|if|label_\w+|return|select|throw|try|while|whilst)\.)/,
      verb: {
        // Negative look-ahead prevents bad highlighting
        // of ^: ;. =. =: !. !:
        pattern: /(?!\^:|;\.|[=!][.:])(?:\{(?:\.|::?)?|p(?:\.\.?|:)|[=!\]]|[<>+*\-%$|,#][.:]?|[?^]\.?|[;\[]:?|[~}"i][.:]|[ACeEIjLor]\.|(?:[_\/\\qsux]|_?\d):)/,
        alias: "keyword"
      },
      number: /\b_?(?:(?!\d:)\d+(?:\.\d+)?(?:(?:ad|ar|[ejpx])_?\d+(?:\.\d+)?)*(?:b_?[\da-z]+(?:\.[\da-z]+)?)?|_\b(?!\.))/,
      adverb: {
        pattern: /[~}]|[\/\\]\.?|[bfM]\.|t[.:]/,
        alias: "builtin"
      },
      operator: /[=a][.:]|_\./,
      conjunction: {
        pattern: /&(?:\.:?|:)?|[.:@][.:]?|[!D][.:]|[;dHT]\.|`:?|[\^LS]:|"/,
        alias: "variable"
      },
      punctuation: /[()]/
    };
  }
  return j_1;
}
var java_1;
var hasRequiredJava;
function requireJava() {
  if (hasRequiredJava) return java_1;
  hasRequiredJava = 1;
  java_1 = java;
  java.displayName = "java";
  java.aliases = [];
  function java(Prism2) {
    (function(Prism3) {
      var keywords = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;
      var classNamePrefix = /(^|[^\w.])(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source;
      var className = {
        pattern: RegExp(classNamePrefix + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),
        lookbehind: true,
        inside: {
          namespace: {
            pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
            inside: {
              punctuation: /\./
            }
          },
          punctuation: /\./
        }
      };
      Prism3.languages.java = Prism3.languages.extend("clike", {
        string: {
          pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,
          lookbehind: true,
          greedy: true
        },
        "class-name": [
          className,
          {
            // variables and parameters
            // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
            pattern: RegExp(
              classNamePrefix + /[A-Z]\w*(?=\s+\w+\s*[;,=()])/.source
            ),
            lookbehind: true,
            inside: className.inside
          }
        ],
        keyword: keywords,
        function: [
          Prism3.languages.clike.function,
          {
            pattern: /(::\s*)[a-z_]\w*/,
            lookbehind: true
          }
        ],
        number: /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
        operator: {
          pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
          lookbehind: true
        }
      });
      Prism3.languages.insertBefore("java", "string", {
        "triple-quoted-string": {
          // http://openjdk.java.net/jeps/355#Description
          pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
          greedy: true,
          alias: "string"
        },
        char: {
          pattern: /'(?:\\.|[^'\\\r\n]){1,6}'/,
          greedy: true
        }
      });
      Prism3.languages.insertBefore("java", "class-name", {
        annotation: {
          pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
          lookbehind: true,
          alias: "punctuation"
        },
        generics: {
          pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
          inside: {
            "class-name": className,
            keyword: keywords,
            punctuation: /[<>(),.:]/,
            operator: /[?&|]/
          }
        },
        namespace: {
          pattern: RegExp(
            /(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(
              /<keyword>/g,
              function() {
                return keywords.source;
              }
            )
          ),
          lookbehind: true,
          inside: {
            punctuation: /\./
          }
        }
      });
    })(Prism2);
  }
  return java_1;
}
var javadoclike_1;
var hasRequiredJavadoclike;
function requireJavadoclike() {
  if (hasRequiredJavadoclike) return javadoclike_1;
  hasRequiredJavadoclike = 1;
  javadoclike_1 = javadoclike;
  javadoclike.displayName = "javadoclike";
  javadoclike.aliases = [];
  function javadoclike(Prism2) {
    (function(Prism3) {
      var javaDocLike = Prism3.languages.javadoclike = {
        parameter: {
          pattern: /(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*@(?:arg|arguments|param)\s+)\w+/m,
          lookbehind: true
        },
        keyword: {
          // keywords are the first word in a line preceded be an `@` or surrounded by curly braces.
          // @word, {@word}
          pattern: /(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,
          lookbehind: true
        },
        punctuation: /[{}]/
      };
      function docCommentSupport(lang, callback) {
        var tokenName = "doc-comment";
        var grammar = Prism3.languages[lang];
        if (!grammar) {
          return;
        }
        var token = grammar[tokenName];
        if (!token) {
          var definition = {};
          definition[tokenName] = {
            pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,
            lookbehind: true,
            alias: "comment"
          };
          grammar = Prism3.languages.insertBefore(lang, "comment", definition);
          token = grammar[tokenName];
        }
        if (token instanceof RegExp) {
          token = grammar[tokenName] = {
            pattern: token
          };
        }
        if (Array.isArray(token)) {
          for (var i = 0, l = token.length; i < l; i++) {
            if (token[i] instanceof RegExp) {
              token[i] = {
                pattern: token[i]
              };
            }
            callback(token[i]);
          }
        } else {
          callback(token);
        }
      }
      function addSupport(languages, docLanguage) {
        if (typeof languages === "string") {
          languages = [languages];
        }
        languages.forEach(function(lang) {
          docCommentSupport(lang, function(pattern) {
            if (!pattern.inside) {
              pattern.inside = {};
            }
            pattern.inside.rest = docLanguage;
          });
        });
      }
      Object.defineProperty(javaDocLike, "addSupport", {
        value: addSupport
      });
      javaDocLike.addSupport(["java", "javascript", "php"], javaDocLike);
    })(Prism2);
  }
  return javadoclike_1;
}
var javadoc_1;
var hasRequiredJavadoc;
function requireJavadoc() {
  if (hasRequiredJavadoc) return javadoc_1;
  hasRequiredJavadoc = 1;
  var refractorJava = requireJava();
  var refractorJavadoclike = requireJavadoclike();
  javadoc_1 = javadoc;
  javadoc.displayName = "javadoc";
  javadoc.aliases = [];
  function javadoc(Prism2) {
    Prism2.register(refractorJava);
    Prism2.register(refractorJavadoclike);
    (function(Prism3) {
      var codeLinePattern = /(^(?:[\t ]*(?:\*\s*)*))[^*\s].*$/m;
      var memberReference = /#\s*\w+(?:\s*\([^()]*\))?/.source;
      var reference = /(?:\b[a-zA-Z]\w+\s*\.\s*)*\b[A-Z]\w*(?:\s*<mem>)?|<mem>/.source.replace(
        /<mem>/g,
        function() {
          return memberReference;
        }
      );
      Prism3.languages.javadoc = Prism3.languages.extend("javadoclike", {});
      Prism3.languages.insertBefore("javadoc", "keyword", {
        reference: {
          pattern: RegExp(
            /(@(?:exception|link|linkplain|see|throws|value)\s+(?:\*\s*)?)/.source + "(?:" + reference + ")"
          ),
          lookbehind: true,
          inside: {
            function: {
              pattern: /(#\s*)\w+(?=\s*\()/,
              lookbehind: true
            },
            field: {
              pattern: /(#\s*)\w+/,
              lookbehind: true
            },
            namespace: {
              pattern: /\b(?:[a-z]\w*\s*\.\s*)+/,
              inside: {
                punctuation: /\./
              }
            },
            "class-name": /\b[A-Z]\w*/,
            keyword: Prism3.languages.java.keyword,
            punctuation: /[#()[\],.]/
          }
        },
        "class-name": {
          // @param <T> the first generic type parameter
          pattern: /(@param\s+)<[A-Z]\w*>/,
          lookbehind: true,
          inside: {
            punctuation: /[.<>]/
          }
        },
        "code-section": [
          {
            pattern: /(\{@code\s+(?!\s))(?:[^\s{}]|\s+(?![\s}])|\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})*\})+(?=\s*\})/,
            lookbehind: true,
            inside: {
              code: {
                // there can't be any HTML inside of {@code} tags
                pattern: codeLinePattern,
                lookbehind: true,
                inside: Prism3.languages.java,
                alias: "language-java"
              }
            }
          },
          {
            pattern: /(<(code|pre|tt)>(?!<code>)\s*)\S(?:\S|\s+\S)*?(?=\s*<\/\2>)/,
            lookbehind: true,
            inside: {
              line: {
                pattern: codeLinePattern,
                lookbehind: true,
                inside: {
                  // highlight HTML tags and entities
                  tag: Prism3.languages.markup.tag,
                  entity: Prism3.languages.markup.entity,
                  code: {
                    // everything else is Java code
                    pattern: /.+/,
                    inside: Prism3.languages.java,
                    alias: "language-java"
                  }
                }
              }
            }
          }
        ],
        tag: Prism3.languages.markup.tag,
        entity: Prism3.languages.markup.entity
      });
      Prism3.languages.javadoclike.addSupport("java", Prism3.languages.javadoc);
    })(Prism2);
  }
  return javadoc_1;
}
var javastacktrace_1;
var hasRequiredJavastacktrace;
function requireJavastacktrace() {
  if (hasRequiredJavastacktrace) return javastacktrace_1;
  hasRequiredJavastacktrace = 1;
  javastacktrace_1 = javastacktrace;
  javastacktrace.displayName = "javastacktrace";
  javastacktrace.aliases = [];
  function javastacktrace(Prism2) {
    Prism2.languages.javastacktrace = {
      // java.sql.SQLException: Violation of unique constraint MY_ENTITY_UK_1: duplicate value(s) for column(s) MY_COLUMN in statement [...]
      // Caused by: java.sql.SQLException: Violation of unique constraint MY_ENTITY_UK_1: duplicate value(s) for column(s) MY_COLUMN in statement [...]
      // Caused by: com.example.myproject.MyProjectServletException
      // Caused by: MidLevelException: LowLevelException
      // Suppressed: Resource$CloseFailException: Resource ID = 0
      summary: {
        pattern: /^([\t ]*)(?:(?:Caused by:|Suppressed:|Exception in thread "[^"]*")[\t ]+)?[\w$.]+(?::.*)?$/m,
        lookbehind: true,
        inside: {
          keyword: {
            pattern: /^([\t ]*)(?:(?:Caused by|Suppressed)(?=:)|Exception in thread)/m,
            lookbehind: true
          },
          // the current thread if the summary starts with 'Exception in thread'
          string: {
            pattern: /^(\s*)"[^"]*"/,
            lookbehind: true
          },
          exceptions: {
            pattern: /^(:?\s*)[\w$.]+(?=:|$)/,
            lookbehind: true,
            inside: {
              "class-name": /[\w$]+$/,
              namespace: /\b[a-z]\w*\b/,
              punctuation: /\./
            }
          },
          message: {
            pattern: /(:\s*)\S.*/,
            lookbehind: true,
            alias: "string"
          },
          punctuation: /:/
        }
      },
      // at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1166)
      // at org.hsqldb.jdbc.Util.throwError(Unknown Source) here could be some notes
      // at java.base/java.lang.Class.forName0(Native Method)
      // at Util.<init>(Unknown Source)
      // at com.foo.loader/foo@9.0/com.foo.Main.run(Main.java:101)
      // at com.foo.loader//com.foo.bar.App.run(App.java:12)
      // at acme@2.1/org.acme.Lib.test(Lib.java:80)
      // at MyClass.mash(MyClass.java:9)
      //
      // More information:
      // https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/lang/StackTraceElement.html#toString()
      //
      // A valid Java module name is defined as:
      //   "A module name consists of one or more Java identifiers (§3.8) separated by "." tokens."
      // https://docs.oracle.com/javase/specs/jls/se9/html/jls-6.html#jls-ModuleName
      //
      // A Java module version is defined by this class:
      // https://docs.oracle.com/javase/9/docs/api/java/lang/module/ModuleDescriptor.Version.html
      // This is the implementation of the `parse` method in JDK13:
      // https://github.com/matcdac/jdk/blob/2305df71d1b7710266ae0956d73927a225132c0f/src/java.base/share/classes/java/lang/module/ModuleDescriptor.java#L1108
      // However, to keep this simple, a version will be matched by the pattern /@[\w$.+-]*/.
      "stack-frame": {
        pattern: /^([\t ]*)at (?:[\w$./]|@[\w$.+-]*\/)+(?:<init>)?\([^()]*\)/m,
        lookbehind: true,
        inside: {
          keyword: {
            pattern: /^(\s*)at(?= )/,
            lookbehind: true
          },
          source: [
            // (Main.java:15)
            // (Main.scala:15)
            {
              pattern: /(\()\w+\.\w+:\d+(?=\))/,
              lookbehind: true,
              inside: {
                file: /^\w+\.\w+/,
                punctuation: /:/,
                "line-number": {
                  pattern: /\b\d+\b/,
                  alias: "number"
                }
              }
            },
            // (Unknown Source)
            // (Native Method)
            // (...something...)
            {
              pattern: /(\()[^()]*(?=\))/,
              lookbehind: true,
              inside: {
                keyword: /^(?:Native Method|Unknown Source)$/
              }
            }
          ],
          "class-name": /[\w$]+(?=\.(?:<init>|[\w$]+)\()/,
          function: /(?:<init>|[\w$]+)(?=\()/,
          "class-loader": {
            pattern: /(\s)[a-z]\w*(?:\.[a-z]\w*)*(?=\/[\w@$.]*\/)/,
            lookbehind: true,
            alias: "namespace",
            inside: {
              punctuation: /\./
            }
          },
          module: {
            pattern: /([\s/])[a-z]\w*(?:\.[a-z]\w*)*(?:@[\w$.+-]*)?(?=\/)/,
            lookbehind: true,
            inside: {
              version: {
                pattern: /(@)[\s\S]+/,
                lookbehind: true,
                alias: "number"
              },
              punctuation: /[@.]/
            }
          },
          namespace: {
            pattern: /(?:\b[a-z]\w*\.)+/,
            inside: {
              punctuation: /\./
            }
          },
          punctuation: /[()/.]/
        }
      },
      // ... 32 more
      // ... 32 common frames omitted
      more: {
        pattern: /^([\t ]*)\.{3} \d+ [a-z]+(?: [a-z]+)*/m,
        lookbehind: true,
        inside: {
          punctuation: /\.{3}/,
          number: /\d+/,
          keyword: /\b[a-z]+(?: [a-z]+)*\b/
        }
      }
    };
  }
  return javastacktrace_1;
}
var jexl_1;
var hasRequiredJexl;
function requireJexl() {
  if (hasRequiredJexl) return jexl_1;
  hasRequiredJexl = 1;
  jexl_1 = jexl;
  jexl.displayName = "jexl";
  jexl.aliases = [];
  function jexl(Prism2) {
    Prism2.languages.jexl = {
      string: /(["'])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
      transform: {
        pattern: /(\|\s*)[a-zA-Zа-яА-Я_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF$][\wа-яА-Я\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF$]*/,
        alias: "function",
        lookbehind: true
      },
      function: /[a-zA-Zа-яА-Я_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF$][\wа-яА-Я\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF$]*\s*(?=\()/,
      number: /\b\d+(?:\.\d+)?\b|\B\.\d+\b/,
      operator: /[<>!]=?|-|\+|&&|==|\|\|?|\/\/?|[?:*^%]/,
      boolean: /\b(?:false|true)\b/,
      keyword: /\bin\b/,
      punctuation: /[{}[\](),.]/
    };
  }
  return jexl_1;
}
var jolie_1;
var hasRequiredJolie;
function requireJolie() {
  if (hasRequiredJolie) return jolie_1;
  hasRequiredJolie = 1;
  jolie_1 = jolie;
  jolie.displayName = "jolie";
  jolie.aliases = [];
  function jolie(Prism2) {
    Prism2.languages.jolie = Prism2.languages.extend("clike", {
      string: {
        pattern: /(^|[^\\])"(?:\\[\s\S]|[^"\\])*"/,
        lookbehind: true,
        greedy: true
      },
      "class-name": {
        pattern: /((?:\b(?:as|courier|embed|in|inputPort|outputPort|service)\b|@)[ \t]*)\w+/,
        lookbehind: true
      },
      keyword: /\b(?:as|cH|comp|concurrent|constants|courier|cset|csets|default|define|else|embed|embedded|execution|exit|extender|for|foreach|forward|from|global|if|import|in|include|init|inputPort|install|instanceof|interface|is_defined|linkIn|linkOut|main|new|nullProcess|outputPort|over|private|provide|public|scope|sequential|service|single|spawn|synchronized|this|throw|throws|type|undef|until|while|with)\b/,
      function: /\b[a-z_]\w*(?=[ \t]*[@(])/i,
      number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?l?/i,
      operator: /-[-=>]?|\+[+=]?|<[<=]?|[>=*!]=?|&&|\|\||[?\/%^@|]/,
      punctuation: /[()[\]{},;.:]/,
      builtin: /\b(?:Byte|any|bool|char|double|enum|float|int|length|long|ranges|regex|string|undefined|void)\b/
    });
    Prism2.languages.insertBefore("jolie", "keyword", {
      aggregates: {
        pattern: /(\bAggregates\s*:\s*)(?:\w+(?:\s+with\s+\w+)?\s*,\s*)*\w+(?:\s+with\s+\w+)?/,
        lookbehind: true,
        inside: {
          keyword: /\bwith\b/,
          "class-name": /\w+/,
          punctuation: /,/
        }
      },
      redirects: {
        pattern: /(\bRedirects\s*:\s*)(?:\w+\s*=>\s*\w+\s*,\s*)*(?:\w+\s*=>\s*\w+)/,
        lookbehind: true,
        inside: {
          punctuation: /,/,
          "class-name": /\w+/,
          operator: /=>/
        }
      },
      property: {
        pattern: /\b(?:Aggregates|[Ii]nterfaces|Java|Javascript|Jolie|[Ll]ocation|OneWay|[Pp]rotocol|Redirects|RequestResponse)\b(?=[ \t]*:)/
      }
    });
  }
  return jolie_1;
}
var jq_1;
var hasRequiredJq;
function requireJq() {
  if (hasRequiredJq) return jq_1;
  hasRequiredJq = 1;
  jq_1 = jq;
  jq.displayName = "jq";
  jq.aliases = [];
  function jq(Prism2) {
    (function(Prism3) {
      var interpolation = /\\\((?:[^()]|\([^()]*\))*\)/.source;
      var string = RegExp(
        /(^|[^\\])"(?:[^"\r\n\\]|\\[^\r\n(]|__)*"/.source.replace(
          /__/g,
          function() {
            return interpolation;
          }
        )
      );
      var stringInterpolation = {
        interpolation: {
          pattern: RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + interpolation),
          lookbehind: true,
          inside: {
            content: {
              pattern: /^(\\\()[\s\S]+(?=\)$)/,
              lookbehind: true,
              inside: null
              // see below
            },
            punctuation: /^\\\(|\)$/
          }
        }
      };
      var jq2 = Prism3.languages.jq = {
        comment: /#.*/,
        property: {
          pattern: RegExp(string.source + /(?=\s*:(?!:))/.source),
          lookbehind: true,
          greedy: true,
          inside: stringInterpolation
        },
        string: {
          pattern: string,
          lookbehind: true,
          greedy: true,
          inside: stringInterpolation
        },
        function: {
          pattern: /(\bdef\s+)[a-z_]\w+/i,
          lookbehind: true
        },
        variable: /\B\$\w+/,
        "property-literal": {
          pattern: /\b[a-z_]\w*(?=\s*:(?!:))/i,
          alias: "property"
        },
        keyword: /\b(?:as|break|catch|def|elif|else|end|foreach|if|import|include|label|module|modulemeta|null|reduce|then|try|while)\b/,
        boolean: /\b(?:false|true)\b/,
        number: /(?:\b\d+\.|\B\.)?\b\d+(?:[eE][+-]?\d+)?\b/,
        operator: [
          {
            pattern: /\|=?/,
            alias: "pipe"
          },
          /\.\.|[!=<>]?=|\?\/\/|\/\/=?|[-+*/%]=?|[<>?]|\b(?:and|not|or)\b/
        ],
        "c-style-function": {
          pattern: /\b[a-z_]\w*(?=\s*\()/i,
          alias: "function"
        },
        punctuation: /::|[()\[\]{},:;]|\.(?=\s*[\[\w$])/,
        dot: {
          pattern: /\./,
          alias: "important"
        }
      };
      stringInterpolation.interpolation.inside.content.inside = jq2;
    })(Prism2);
  }
  return jq_1;
}
var jsExtras_1;
var hasRequiredJsExtras;
function requireJsExtras() {
  if (hasRequiredJsExtras) return jsExtras_1;
  hasRequiredJsExtras = 1;
  jsExtras_1 = jsExtras;
  jsExtras.displayName = "jsExtras";
  jsExtras.aliases = [];
  function jsExtras(Prism2) {
    (function(Prism3) {
      Prism3.languages.insertBefore("javascript", "function-variable", {
        "method-variable": {
          pattern: RegExp(
            "(\\.\\s*)" + Prism3.languages.javascript["function-variable"].pattern.source
          ),
          lookbehind: true,
          alias: ["function-variable", "method", "function", "property-access"]
        }
      });
      Prism3.languages.insertBefore("javascript", "function", {
        method: {
          pattern: RegExp(
            "(\\.\\s*)" + Prism3.languages.javascript["function"].source
          ),
          lookbehind: true,
          alias: ["function", "property-access"]
        }
      });
      Prism3.languages.insertBefore("javascript", "constant", {
        "known-class-name": [
          {
            // standard built-ins
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
            pattern: /\b(?:(?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|(?:Weak)?(?:Map|Set)|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|WebAssembly)\b/,
            alias: "class-name"
          },
          {
            // errors
            pattern: /\b(?:[A-Z]\w*)Error\b/,
            alias: "class-name"
          }
        ]
      });
      function withId(source, flags) {
        return RegExp(
          source.replace(/<ID>/g, function() {
            return /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/.source;
          }),
          flags
        );
      }
      Prism3.languages.insertBefore("javascript", "keyword", {
        imports: {
          // https://tc39.es/ecma262/#sec-imports
          pattern: withId(
            /(\bimport\b\s*)(?:<ID>(?:\s*,\s*(?:\*\s*as\s+<ID>|\{[^{}]*\}))?|\*\s*as\s+<ID>|\{[^{}]*\})(?=\s*\bfrom\b)/.source
          ),
          lookbehind: true,
          inside: Prism3.languages.javascript
        },
        exports: {
          // https://tc39.es/ecma262/#sec-exports
          pattern: withId(
            /(\bexport\b\s*)(?:\*(?:\s*as\s+<ID>)?(?=\s*\bfrom\b)|\{[^{}]*\})/.source
          ),
          lookbehind: true,
          inside: Prism3.languages.javascript
        }
      });
      Prism3.languages.javascript["keyword"].unshift(
        {
          pattern: /\b(?:as|default|export|from|import)\b/,
          alias: "module"
        },
        {
          pattern: /\b(?:await|break|catch|continue|do|else|finally|for|if|return|switch|throw|try|while|yield)\b/,
          alias: "control-flow"
        },
        {
          pattern: /\bnull\b/,
          alias: ["null", "nil"]
        },
        {
          pattern: /\bundefined\b/,
          alias: "nil"
        }
      );
      Prism3.languages.insertBefore("javascript", "operator", {
        spread: {
          pattern: /\.{3}/,
          alias: "operator"
        },
        arrow: {
          pattern: /=>/,
          alias: "operator"
        }
      });
      Prism3.languages.insertBefore("javascript", "punctuation", {
        "property-access": {
          pattern: withId(/(\.\s*)#?<ID>/.source),
          lookbehind: true
        },
        "maybe-class-name": {
          pattern: /(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,
          lookbehind: true
        },
        dom: {
          // this contains only a few commonly used DOM variables
          pattern: /\b(?:document|(?:local|session)Storage|location|navigator|performance|window)\b/,
          alias: "variable"
        },
        console: {
          pattern: /\bconsole(?=\s*\.)/,
          alias: "class-name"
        }
      });
      var maybeClassNameTokens = [
        "function",
        "function-variable",
        "method",
        "method-variable",
        "property-access"
      ];
      for (var i = 0; i < maybeClassNameTokens.length; i++) {
        var token = maybeClassNameTokens[i];
        var value = Prism3.languages.javascript[token];
        if (Prism3.util.type(value) === "RegExp") {
          value = Prism3.languages.javascript[token] = {
            pattern: value
          };
        }
        var inside = value.inside || {};
        value.inside = inside;
        inside["maybe-class-name"] = /^[A-Z][\s\S]*/;
      }
    })(Prism2);
  }
  return jsExtras_1;
}
var jsTemplates_1;
var hasRequiredJsTemplates;
function requireJsTemplates() {
  if (hasRequiredJsTemplates) return jsTemplates_1;
  hasRequiredJsTemplates = 1;
  jsTemplates_1 = jsTemplates;
  jsTemplates.displayName = "jsTemplates";
  jsTemplates.aliases = [];
  function jsTemplates(Prism2) {
    (function(Prism3) {
      var templateString = Prism3.languages.javascript["template-string"];
      var templateLiteralPattern = templateString.pattern.source;
      var interpolationObject = templateString.inside["interpolation"];
      var interpolationPunctuationObject = interpolationObject.inside["interpolation-punctuation"];
      var interpolationPattern = interpolationObject.pattern.source;
      function createTemplate(language, tag) {
        if (!Prism3.languages[language]) {
          return void 0;
        }
        return {
          pattern: RegExp("((?:" + tag + ")\\s*)" + templateLiteralPattern),
          lookbehind: true,
          greedy: true,
          inside: {
            "template-punctuation": {
              pattern: /^`|`$/,
              alias: "string"
            },
            "embedded-code": {
              pattern: /[\s\S]+/,
              alias: language
            }
          }
        };
      }
      Prism3.languages.javascript["template-string"] = [
        // styled-jsx:
        //   css`a { color: #25F; }`
        // styled-components:
        //   styled.h1`color: red;`
        createTemplate(
          "css",
          /\b(?:styled(?:\([^)]*\))?(?:\s*\.\s*\w+(?:\([^)]*\))*)*|css(?:\s*\.\s*(?:global|resolve))?|createGlobalStyle|keyframes)/.source
        ),
        // html`<p></p>`
        // div.innerHTML = `<p></p>`
        createTemplate("html", /\bhtml|\.\s*(?:inner|outer)HTML\s*\+?=/.source),
        // svg`<path fill="#fff" d="M55.37 ..."/>`
        createTemplate("svg", /\bsvg/.source),
        // md`# h1`, markdown`## h2`
        createTemplate("markdown", /\b(?:markdown|md)/.source),
        // gql`...`, graphql`...`, graphql.experimental`...`
        createTemplate(
          "graphql",
          /\b(?:gql|graphql(?:\s*\.\s*experimental)?)/.source
        ),
        // sql`...`
        createTemplate("sql", /\bsql/.source),
        // vanilla template string
        templateString
      ].filter(Boolean);
      function getPlaceholder(counter, language) {
        return "___" + language.toUpperCase() + "_" + counter + "___";
      }
      function tokenizeWithHooks(code, grammar, language) {
        var env = {
          code,
          grammar,
          language
        };
        Prism3.hooks.run("before-tokenize", env);
        env.tokens = Prism3.tokenize(env.code, env.grammar);
        Prism3.hooks.run("after-tokenize", env);
        return env.tokens;
      }
      function tokenizeInterpolationExpression(expression) {
        var tempGrammar = {};
        tempGrammar["interpolation-punctuation"] = interpolationPunctuationObject;
        var tokens = Prism3.tokenize(expression, tempGrammar);
        if (tokens.length === 3) {
          var args = [1, 1];
          args.push.apply(
            args,
            tokenizeWithHooks(tokens[1], Prism3.languages.javascript, "javascript")
          );
          tokens.splice.apply(tokens, args);
        }
        return new Prism3.Token(
          "interpolation",
          tokens,
          interpolationObject.alias,
          expression
        );
      }
      function tokenizeEmbedded(code, grammar, language) {
        var _tokens = Prism3.tokenize(code, {
          interpolation: {
            pattern: RegExp(interpolationPattern),
            lookbehind: true
          }
        });
        var placeholderCounter = 0;
        var placeholderMap = {};
        var embeddedCode = _tokens.map(function(token) {
          if (typeof token === "string") {
            return token;
          } else {
            var interpolationExpression = token.content;
            var placeholder;
            while (code.indexOf(
              placeholder = getPlaceholder(placeholderCounter++, language)
            ) !== -1) {
            }
            placeholderMap[placeholder] = interpolationExpression;
            return placeholder;
          }
        }).join("");
        var embeddedTokens = tokenizeWithHooks(embeddedCode, grammar, language);
        var placeholders = Object.keys(placeholderMap);
        placeholderCounter = 0;
        function walkTokens(tokens) {
          for (var i = 0; i < tokens.length; i++) {
            if (placeholderCounter >= placeholders.length) {
              return;
            }
            var token = tokens[i];
            if (typeof token === "string" || typeof token.content === "string") {
              var placeholder = placeholders[placeholderCounter];
              var s = typeof token === "string" ? token : (
                /** @type {string} */
                token.content
              );
              var index = s.indexOf(placeholder);
              if (index !== -1) {
                ++placeholderCounter;
                var before = s.substring(0, index);
                var middle = tokenizeInterpolationExpression(
                  placeholderMap[placeholder]
                );
                var after = s.substring(index + placeholder.length);
                var replacement = [];
                if (before) {
                  replacement.push(before);
                }
                replacement.push(middle);
                if (after) {
                  var afterTokens = [after];
                  walkTokens(afterTokens);
                  replacement.push.apply(replacement, afterTokens);
                }
                if (typeof token === "string") {
                  tokens.splice.apply(tokens, [i, 1].concat(replacement));
                  i += replacement.length - 1;
                } else {
                  token.content = replacement;
                }
              }
            } else {
              var content = token.content;
              if (Array.isArray(content)) {
                walkTokens(content);
              } else {
                walkTokens([content]);
              }
            }
          }
        }
        walkTokens(embeddedTokens);
        return new Prism3.Token(
          language,
          embeddedTokens,
          "language-" + language,
          code
        );
      }
      var supportedLanguages = {
        javascript: true,
        js: true,
        typescript: true,
        ts: true,
        jsx: true,
        tsx: true
      };
      Prism3.hooks.add("after-tokenize", function(env) {
        if (!(env.language in supportedLanguages)) {
          return;
        }
        function findTemplateStrings(tokens) {
          for (var i = 0, l = tokens.length; i < l; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
              continue;
            }
            var content = token.content;
            if (!Array.isArray(content)) {
              if (typeof content !== "string") {
                findTemplateStrings([content]);
              }
              continue;
            }
            if (token.type === "template-string") {
              var embedded = content[1];
              if (content.length === 3 && typeof embedded !== "string" && embedded.type === "embedded-code") {
                var code = stringContent(embedded);
                var alias2 = embedded.alias;
                var language = Array.isArray(alias2) ? alias2[0] : alias2;
                var grammar = Prism3.languages[language];
                if (!grammar) {
                  continue;
                }
                content[1] = tokenizeEmbedded(code, grammar, language);
              }
            } else {
              findTemplateStrings(content);
            }
          }
        }
        findTemplateStrings(env.tokens);
      });
      function stringContent(value) {
        if (typeof value === "string") {
          return value;
        } else if (Array.isArray(value)) {
          return value.map(stringContent).join("");
        } else {
          return stringContent(value.content);
        }
      }
    })(Prism2);
  }
  return jsTemplates_1;
}
var typescript_1;
var hasRequiredTypescript;
function requireTypescript() {
  if (hasRequiredTypescript) return typescript_1;
  hasRequiredTypescript = 1;
  typescript_1 = typescript;
  typescript.displayName = "typescript";
  typescript.aliases = ["ts"];
  function typescript(Prism2) {
    (function(Prism3) {
      Prism3.languages.typescript = Prism3.languages.extend("javascript", {
        "class-name": {
          pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
          lookbehind: true,
          greedy: true,
          inside: null
          // see below
        },
        builtin: /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
      });
      Prism3.languages.typescript.keyword.push(
        /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
        // keywords that have to be followed by an identifier
        /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
        // This is for `import type *, {}`
        /\btype\b(?=\s*(?:[\{*]|$))/
      );
      delete Prism3.languages.typescript["parameter"];
      delete Prism3.languages.typescript["literal-property"];
      var typeInside = Prism3.languages.extend("typescript", {});
      delete typeInside["class-name"];
      Prism3.languages.typescript["class-name"].inside = typeInside;
      Prism3.languages.insertBefore("typescript", "function", {
        decorator: {
          pattern: /@[$\w\xA0-\uFFFF]+/,
          inside: {
            at: {
              pattern: /^@/,
              alias: "operator"
            },
            function: /^[\s\S]+/
          }
        },
        "generic-function": {
          // e.g. foo<T extends "bar" | "baz">( ...
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
          greedy: true,
          inside: {
            function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
            generic: {
              pattern: /<[\s\S]+/,
              // everything after the first <
              alias: "class-name",
              inside: typeInside
            }
          }
        }
      });
      Prism3.languages.ts = Prism3.languages.typescript;
    })(Prism2);
  }
  return typescript_1;
}
var jsdoc_1;
var hasRequiredJsdoc;
function requireJsdoc() {
  if (hasRequiredJsdoc) return jsdoc_1;
  hasRequiredJsdoc = 1;
  var refractorJavadoclike = requireJavadoclike();
  var refractorTypescript = requireTypescript();
  jsdoc_1 = jsdoc;
  jsdoc.displayName = "jsdoc";
  jsdoc.aliases = [];
  function jsdoc(Prism2) {
    Prism2.register(refractorJavadoclike);
    Prism2.register(refractorTypescript);
    (function(Prism3) {
      var javascript2 = Prism3.languages.javascript;
      var type = /\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})+\}/.source;
      var parameterPrefix = "(@(?:arg|argument|param|property)\\s+(?:" + type + "\\s+)?)";
      Prism3.languages.jsdoc = Prism3.languages.extend("javadoclike", {
        parameter: {
          // @param {string} foo - foo bar
          pattern: RegExp(
            parameterPrefix + /(?:(?!\s)[$\w\xA0-\uFFFF.])+(?=\s|$)/.source
          ),
          lookbehind: true,
          inside: {
            punctuation: /\./
          }
        }
      });
      Prism3.languages.insertBefore("jsdoc", "keyword", {
        "optional-parameter": {
          // @param {string} [baz.foo="bar"] foo bar
          pattern: RegExp(
            parameterPrefix + /\[(?:(?!\s)[$\w\xA0-\uFFFF.])+(?:=[^[\]]+)?\](?=\s|$)/.source
          ),
          lookbehind: true,
          inside: {
            parameter: {
              pattern: /(^\[)[$\w\xA0-\uFFFF\.]+/,
              lookbehind: true,
              inside: {
                punctuation: /\./
              }
            },
            code: {
              pattern: /(=)[\s\S]*(?=\]$)/,
              lookbehind: true,
              inside: javascript2,
              alias: "language-javascript"
            },
            punctuation: /[=[\]]/
          }
        },
        "class-name": [
          {
            pattern: RegExp(
              /(@(?:augments|class|extends|interface|memberof!?|template|this|typedef)\s+(?:<TYPE>\s+)?)[A-Z]\w*(?:\.[A-Z]\w*)*/.source.replace(
                /<TYPE>/g,
                function() {
                  return type;
                }
              )
            ),
            lookbehind: true,
            inside: {
              punctuation: /\./
            }
          },
          {
            pattern: RegExp("(@[a-z]+\\s+)" + type),
            lookbehind: true,
            inside: {
              string: javascript2.string,
              number: javascript2.number,
              boolean: javascript2.boolean,
              keyword: Prism3.languages.typescript.keyword,
              operator: /=>|\.\.\.|[&|?:*]/,
              punctuation: /[.,;=<>{}()[\]]/
            }
          }
        ],
        example: {
          pattern: /(@example\s+(?!\s))(?:[^@\s]|\s+(?!\s))+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,
          lookbehind: true,
          inside: {
            code: {
              pattern: /^([\t ]*(?:\*\s*)?)\S.*$/m,
              lookbehind: true,
              inside: javascript2,
              alias: "language-javascript"
            }
          }
        }
      });
      Prism3.languages.javadoclike.addSupport("javascript", Prism3.languages.jsdoc);
    })(Prism2);
  }
  return jsdoc_1;
}
var json_1;
var hasRequiredJson;
function requireJson() {
  if (hasRequiredJson) return json_1;
  hasRequiredJson = 1;
  json_1 = json;
  json.displayName = "json";
  json.aliases = ["webmanifest"];
  function json(Prism2) {
    Prism2.languages.json = {
      property: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
        lookbehind: true,
        greedy: true
      },
      string: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
        lookbehind: true,
        greedy: true
      },
      comment: {
        pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
        greedy: true
      },
      number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
      punctuation: /[{}[\],]/,
      operator: /:/,
      boolean: /\b(?:false|true)\b/,
      null: {
        pattern: /\bnull\b/,
        alias: "keyword"
      }
    };
    Prism2.languages.webmanifest = Prism2.languages.json;
  }
  return json_1;
}
var json5_1;
var hasRequiredJson5;
function requireJson5() {
  if (hasRequiredJson5) return json5_1;
  hasRequiredJson5 = 1;
  var refractorJson = requireJson();
  json5_1 = json5;
  json5.displayName = "json5";
  json5.aliases = [];
  function json5(Prism2) {
    Prism2.register(refractorJson);
    (function(Prism3) {
      var string = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/;
      Prism3.languages.json5 = Prism3.languages.extend("json", {
        property: [
          {
            pattern: RegExp(string.source + "(?=\\s*:)"),
            greedy: true
          },
          {
            pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/,
            alias: "unquoted"
          }
        ],
        string: {
          pattern: string,
          greedy: true
        },
        number: /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/
      });
    })(Prism2);
  }
  return json5_1;
}
var jsonp_1;
var hasRequiredJsonp;
function requireJsonp() {
  if (hasRequiredJsonp) return jsonp_1;
  hasRequiredJsonp = 1;
  var refractorJson = requireJson();
  jsonp_1 = jsonp;
  jsonp.displayName = "jsonp";
  jsonp.aliases = [];
  function jsonp(Prism2) {
    Prism2.register(refractorJson);
    Prism2.languages.jsonp = Prism2.languages.extend("json", {
      punctuation: /[{}[\]();,.]/
    });
    Prism2.languages.insertBefore("jsonp", "punctuation", {
      function: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*\()/
    });
  }
  return jsonp_1;
}
var jsstacktrace_1;
var hasRequiredJsstacktrace;
function requireJsstacktrace() {
  if (hasRequiredJsstacktrace) return jsstacktrace_1;
  hasRequiredJsstacktrace = 1;
  jsstacktrace_1 = jsstacktrace;
  jsstacktrace.displayName = "jsstacktrace";
  jsstacktrace.aliases = [];
  function jsstacktrace(Prism2) {
    Prism2.languages.jsstacktrace = {
      "error-message": {
        pattern: /^\S.*/m,
        alias: "string"
      },
      "stack-frame": {
        pattern: /(^[ \t]+)at[ \t].*/m,
        lookbehind: true,
        inside: {
          "not-my-code": {
            pattern: /^at[ \t]+(?!\s)(?:node\.js|<unknown>|.*(?:node_modules|\(<anonymous>\)|\(<unknown>|<anonymous>$|\(internal\/|\(node\.js)).*/m,
            alias: "comment"
          },
          filename: {
            pattern: /(\bat\s+(?!\s)|\()(?:[a-zA-Z]:)?[^():]+(?=:)/,
            lookbehind: true,
            alias: "url"
          },
          function: {
            pattern: /(\bat\s+(?:new\s+)?)(?!\s)[_$a-zA-Z\xA0-\uFFFF<][.$\w\xA0-\uFFFF<>]*/,
            lookbehind: true,
            inside: {
              punctuation: /\./
            }
          },
          punctuation: /[()]/,
          keyword: /\b(?:at|new)\b/,
          alias: {
            pattern: /\[(?:as\s+)?(?!\s)[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\]/,
            alias: "variable"
          },
          "line-number": {
            pattern: /:\d+(?::\d+)?\b/,
            alias: "number",
            inside: {
              punctuation: /:/
            }
          }
        }
      }
    };
  }
  return jsstacktrace_1;
}
var jsx_1;
var hasRequiredJsx;
function requireJsx() {
  if (hasRequiredJsx) return jsx_1;
  hasRequiredJsx = 1;
  jsx_1 = jsx;
  jsx.displayName = "jsx";
  jsx.aliases = [];
  function jsx(Prism2) {
    (function(Prism3) {
      var javascript2 = Prism3.util.clone(Prism3.languages.javascript);
      var space = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source;
      var braces = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source;
      var spread = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;
      function re(source, flags) {
        source = source.replace(/<S>/g, function() {
          return space;
        }).replace(/<BRACES>/g, function() {
          return braces;
        }).replace(/<SPREAD>/g, function() {
          return spread;
        });
        return RegExp(source, flags);
      }
      spread = re(spread).source;
      Prism3.languages.jsx = Prism3.languages.extend("markup", javascript2);
      Prism3.languages.jsx.tag.pattern = re(
        /<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source
      );
      Prism3.languages.jsx.tag.inside["tag"].pattern = /^<\/?[^\s>\/]*/;
      Prism3.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/;
      Prism3.languages.jsx.tag.inside["tag"].inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/;
      Prism3.languages.jsx.tag.inside["comment"] = javascript2["comment"];
      Prism3.languages.insertBefore(
        "inside",
        "attr-name",
        {
          spread: {
            pattern: re(/<SPREAD>/.source),
            inside: Prism3.languages.jsx
          }
        },
        Prism3.languages.jsx.tag
      );
      Prism3.languages.insertBefore(
        "inside",
        "special-attr",
        {
          script: {
            // Allow for two levels of nesting
            pattern: re(/=<BRACES>/.source),
            alias: "language-javascript",
            inside: {
              "script-punctuation": {
                pattern: /^=(?=\{)/,
                alias: "punctuation"
              },
              rest: Prism3.languages.jsx
            }
          }
        },
        Prism3.languages.jsx.tag
      );
      var stringifyToken = function(token) {
        if (!token) {
          return "";
        }
        if (typeof token === "string") {
          return token;
        }
        if (typeof token.content === "string") {
          return token.content;
        }
        return token.content.map(stringifyToken).join("");
      };
      var walkTokens = function(tokens) {
        var openedTags = [];
        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];
          var notTagNorBrace = false;
          if (typeof token !== "string") {
            if (token.type === "tag" && token.content[0] && token.content[0].type === "tag") {
              if (token.content[0].content[0].content === "</") {
                if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {
                  openedTags.pop();
                }
              } else {
                if (token.content[token.content.length - 1].content === "/>") ;
                else {
                  openedTags.push({
                    tagName: stringifyToken(token.content[0].content[1]),
                    openedBraces: 0
                  });
                }
              }
            } else if (openedTags.length > 0 && token.type === "punctuation" && token.content === "{") {
              openedTags[openedTags.length - 1].openedBraces++;
            } else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === "punctuation" && token.content === "}") {
              openedTags[openedTags.length - 1].openedBraces--;
            } else {
              notTagNorBrace = true;
            }
          }
          if (notTagNorBrace || typeof token === "string") {
            if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
              var plainText = stringifyToken(token);
              if (i < tokens.length - 1 && (typeof tokens[i + 1] === "string" || tokens[i + 1].type === "plain-text")) {
                plainText += stringifyToken(tokens[i + 1]);
                tokens.splice(i + 1, 1);
              }
              if (i > 0 && (typeof tokens[i - 1] === "string" || tokens[i - 1].type === "plain-text")) {
                plainText = stringifyToken(tokens[i - 1]) + plainText;
                tokens.splice(i - 1, 1);
                i--;
              }
              tokens[i] = new Prism3.Token(
                "plain-text",
                plainText,
                null,
                plainText
              );
            }
          }
          if (token.content && typeof token.content !== "string") {
            walkTokens(token.content);
          }
        }
      };
      Prism3.hooks.add("after-tokenize", function(env) {
        if (env.language !== "jsx" && env.language !== "tsx") {
          return;
        }
        walkTokens(env.tokens);
      });
    })(Prism2);
  }
  return jsx_1;
}
var julia_1;
var hasRequiredJulia;
function requireJulia() {
  if (hasRequiredJulia) return julia_1;
  hasRequiredJulia = 1;
  julia_1 = julia;
  julia.displayName = "julia";
  julia.aliases = [];
  function julia(Prism2) {
    Prism2.languages.julia = {
      comment: {
        // support one level of nested comments
        // https://github.com/JuliaLang/julia/pull/6128
        pattern: /(^|[^\\])(?:#=(?:[^#=]|=(?!#)|#(?!=)|#=(?:[^#=]|=(?!#)|#(?!=))*=#)*=#|#.*)/,
        lookbehind: true
      },
      regex: {
        // https://docs.julialang.org/en/v1/manual/strings/#Regular-Expressions-1
        pattern: /r"(?:\\.|[^"\\\r\n])*"[imsx]{0,4}/,
        greedy: true
      },
      string: {
        // https://docs.julialang.org/en/v1/manual/strings/#String-Basics-1
        // https://docs.julialang.org/en/v1/manual/strings/#non-standard-string-literals-1
        // https://docs.julialang.org/en/v1/manual/running-external-programs/#Running-External-Programs-1
        pattern: /"""[\s\S]+?"""|(?:\b\w+)?"(?:\\.|[^"\\\r\n])*"|`(?:[^\\`\r\n]|\\.)*`/,
        greedy: true
      },
      char: {
        // https://docs.julialang.org/en/v1/manual/strings/#man-characters-1
        pattern: /(^|[^\w'])'(?:\\[^\r\n][^'\r\n]*|[^\\\r\n])'/,
        lookbehind: true,
        greedy: true
      },
      keyword: /\b(?:abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|in|let|local|macro|module|print|println|quote|return|struct|try|type|typealias|using|while)\b/,
      boolean: /\b(?:false|true)\b/,
      number: /(?:\b(?=\d)|\B(?=\.))(?:0[box])?(?:[\da-f]+(?:_[\da-f]+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[efp][+-]?\d+(?:_\d+)*)?j?/i,
      // https://docs.julialang.org/en/v1/manual/mathematical-operations/
      // https://docs.julialang.org/en/v1/manual/mathematical-operations/#Operator-Precedence-and-Associativity-1
      operator: /&&|\|\||[-+*^%÷⊻&$\\]=?|\/[\/=]?|!=?=?|\|[=>]?|<(?:<=?|[=:|])?|>(?:=|>>?=?)?|==?=?|[~≠≤≥'√∛]/,
      punctuation: /::?|[{}[\]();,.?]/,
      // https://docs.julialang.org/en/v1/base/numbers/#Base.im
      constant: /\b(?:(?:Inf|NaN)(?:16|32|64)?|im|pi)\b|[πℯ]/
    };
  }
  return julia_1;
}
var keepalived_1;
var hasRequiredKeepalived;
function requireKeepalived() {
  if (hasRequiredKeepalived) return keepalived_1;
  hasRequiredKeepalived = 1;
  keepalived_1 = keepalived;
  keepalived.displayName = "keepalived";
  keepalived.aliases = [];
  function keepalived(Prism2) {
    Prism2.languages.keepalived = {
      comment: {
        pattern: /[#!].*/,
        greedy: true
      },
      string: {
        pattern: /(^|[^\\])(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/,
        lookbehind: true,
        greedy: true
      },
      // support IPv4, IPv6, subnet mask
      ip: {
        pattern: RegExp(
          /\b(?:(?:(?:[\da-f]{1,4}:){7}[\da-f]{1,4}|(?:[\da-f]{1,4}:){6}:[\da-f]{1,4}|(?:[\da-f]{1,4}:){5}:(?:[\da-f]{1,4}:)?[\da-f]{1,4}|(?:[\da-f]{1,4}:){4}:(?:[\da-f]{1,4}:){0,2}[\da-f]{1,4}|(?:[\da-f]{1,4}:){3}:(?:[\da-f]{1,4}:){0,3}[\da-f]{1,4}|(?:[\da-f]{1,4}:){2}:(?:[\da-f]{1,4}:){0,4}[\da-f]{1,4}|(?:[\da-f]{1,4}:){6}<ipv4>|(?:[\da-f]{1,4}:){0,5}:<ipv4>|::(?:[\da-f]{1,4}:){0,5}<ipv4>|[\da-f]{1,4}::(?:[\da-f]{1,4}:){0,5}[\da-f]{1,4}|::(?:[\da-f]{1,4}:){0,6}[\da-f]{1,4}|(?:[\da-f]{1,4}:){1,7}:)(?:\/\d{1,3})?|<ipv4>(?:\/\d{1,2})?)\b/.source.replace(
            /<ipv4>/g,
            function() {
              return /(?:(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d))/.source;
            }
          ),
          "i"
        ),
        alias: "number"
      },
      // support *nix / Windows, directory / file
      path: {
        pattern: /(\s)\/(?:[^\/\s]+\/)*[^\/\s]*|\b[a-zA-Z]:\\(?:[^\\\s]+\\)*[^\\\s]*/,
        lookbehind: true,
        alias: "string"
      },
      variable: /\$\{?\w+\}?/,
      email: {
        pattern: /[\w-]+@[\w-]+(?:\.[\w-]{2,3}){1,2}/,
        alias: "string"
      },
      "conditional-configuration": {
        pattern: /@\^?[\w-]+/,
        alias: "variable"
      },
      operator: /=/,
      property: /\b(?:BFD_CHECK|DNS_CHECK|FILE_CHECK|HTTP_GET|MISC_CHECK|NAME|PING_CHECK|SCRIPTS|SMTP_CHECK|SSL|SSL_GET|TCP_CHECK|UDP_CHECK|accept|advert_int|alpha|auth_pass|auth_type|authentication|bfd_cpu_affinity|bfd_instance|bfd_no_swap|bfd_priority|bfd_process_name|bfd_rlimit_rttime|bfd_rt_priority|bind_if|bind_port|bindto|ca|certificate|check_unicast_src|checker|checker_cpu_affinity|checker_log_all_failures|checker_no_swap|checker_priority|checker_rlimit_rttime|checker_rt_priority|child_wait_time|connect_ip|connect_port|connect_timeout|dbus_service_name|debug|default_interface|delay|delay_before_retry|delay_loop|digest|dont_track_primary|dynamic|dynamic_interfaces|enable_(?:dbus|script_security|sni|snmp_checker|snmp_rfc|snmp_rfcv2|snmp_rfcv3|snmp_vrrp|traps)|end|fall|fast_recovery|file|flag-[123]|fork_delay|full_command|fwmark|garp_group|garp_interval|garp_lower_prio_delay|garp_lower_prio_repeat|garp_master_delay|garp_master_refresh|garp_master_refresh_repeat|garp_master_repeat|global_defs|global_tracking|gna_interval|group|ha_suspend|hashed|helo_name|higher_prio_send_advert|hoplimit|http_protocol|hysteresis|idle_tx|include|inhibit_on_failure|init_fail|init_file|instance|interface|interfaces|interval|ip_family|ipvs_process_name|keepalived.conf|kernel_rx_buf_size|key|linkbeat_interfaces|linkbeat_use_polling|log_all_failures|log_unknown_vrids|lower_prio_no_advert|lthreshold|lvs_flush|lvs_flush_onstop|lvs_method|lvs_netlink_cmd_rcv_bufs|lvs_netlink_cmd_rcv_bufs_force|lvs_netlink_monitor_rcv_bufs|lvs_netlink_monitor_rcv_bufs_force|lvs_notify_fifo|lvs_notify_fifo_script|lvs_sched|lvs_sync_daemon|max_auto_priority|max_hops|mcast_src_ip|mh-fallback|mh-port|min_auto_priority_delay|min_rx|min_tx|misc_dynamic|misc_path|misc_timeout|multiplier|name|namespace_with_ipsets|native_ipv6|neighbor_ip|net_namespace|net_namespace_ipvs|nftables|nftables_counters|nftables_ifindex|nftables_priority|no_accept|no_checker_emails|no_email_faults|nopreempt|notification_email|notification_email_from|notify|notify_backup|notify_deleted|notify_down|notify_fault|notify_fifo|notify_fifo_script|notify_master|notify_master_rx_lower_pri|notify_priority_changes|notify_stop|notify_up|old_unicast_checksum|omega|ops|param_match|passive|password|path|persistence_engine|persistence_granularity|persistence_timeout|preempt|preempt_delay|priority|process|process_monitor_rcv_bufs|process_monitor_rcv_bufs_force|process_name|process_names|promote_secondaries|protocol|proxy_arp|proxy_arp_pvlan|quorum|quorum_down|quorum_max|quorum_up|random_seed|real_server|regex|regex_max_offset|regex_min_offset|regex_no_match|regex_options|regex_stack|reload_repeat|reload_time_file|require_reply|retry|rise|router_id|rs_init_notifies|script|script_user|sh-fallback|sh-port|shutdown_script|shutdown_script_timeout|skip_check_adv_addr|smtp_alert|smtp_alert_checker|smtp_alert_vrrp|smtp_connect_timeout|smtp_helo_name|smtp_server|snmp_socket|sorry_server|sorry_server_inhibit|sorry_server_lvs_method|source_ip|start|startup_script|startup_script_timeout|state|static_ipaddress|static_routes|static_rules|status_code|step|strict_mode|sync_group_tracking_weight|terminate_delay|timeout|track_bfd|track_file|track_group|track_interface|track_process|track_script|track_src_ip|ttl|type|umask|unicast_peer|unicast_src_ip|unicast_ttl|url|use_ipvlan|use_pid_dir|use_vmac|user|uthreshold|val[123]|version|virtual_ipaddress|virtual_ipaddress_excluded|virtual_router_id|virtual_routes|virtual_rules|virtual_server|virtual_server_group|virtualhost|vmac_xmit_base|vrrp|vrrp_(?:check_unicast_src|cpu_affinity|garp_interval|garp_lower_prio_delay|garp_lower_prio_repeat|garp_master_delay|garp_master_refresh|garp_master_refresh_repeat|garp_master_repeat|gna_interval|higher_prio_send_advert|instance|ipsets|iptables|lower_prio_no_advert|mcast_group4|mcast_group6|min_garp|netlink_cmd_rcv_bufs|netlink_cmd_rcv_bufs_force|netlink_monitor_rcv_bufs|netlink_monitor_rcv_bufs_force|no_swap|notify_fifo|notify_fifo_script|notify_priority_changes|priority|process_name|rlimit_rttime|rt_priority|rx_bufs_multiplier|rx_bufs_policy|script|skip_check_adv_addr|startup_delay|strict|sync_group|track_process|version)|warmup|weight)\b/,
      constant: /\b(?:A|AAAA|AH|BACKUP|CNAME|DR|MASTER|MX|NAT|NS|PASS|SCTP|SOA|TCP|TUN|TXT|UDP|dh|fo|lblc|lblcr|lc|mh|nq|ovf|rr|sed|sh|wlc|wrr)\b/,
      number: {
        pattern: /(^|[^\w.-])-?\d+(?:\.\d+)?/,
        lookbehind: true
      },
      boolean: /\b(?:false|no|off|on|true|yes)\b/,
      punctuation: /[\{\}]/
    };
  }
  return keepalived_1;
}
var keyman_1;
var hasRequiredKeyman;
function requireKeyman() {
  if (hasRequiredKeyman) return keyman_1;
  hasRequiredKeyman = 1;
  keyman_1 = keyman;
  keyman.displayName = "keyman";
  keyman.aliases = [];
  function keyman(Prism2) {
    Prism2.languages.keyman = {
      comment: {
        pattern: /\bc .*/i,
        greedy: true
      },
      string: {
        pattern: /"[^"\r\n]*"|'[^'\r\n]*'/,
        greedy: true
      },
      "virtual-key": {
        pattern: /\[\s*(?:(?:ALT|CAPS|CTRL|LALT|LCTRL|NCAPS|RALT|RCTRL|SHIFT)\s+)*(?:[TKU]_[\w?]+|[A-E]\d\d?|"[^"\r\n]*"|'[^'\r\n]*')\s*\]/i,
        greedy: true,
        alias: "function"
        // alias for styles
      },
      // https://help.keyman.com/developer/language/guide/headers
      "header-keyword": {
        pattern: /&\w+/,
        alias: "bold"
        // alias for styles
      },
      "header-statement": {
        pattern: /\b(?:bitmap|bitmaps|caps always off|caps on only|copyright|hotkey|language|layout|message|name|shift frees caps|version)\b/i,
        alias: "bold"
        // alias for styles
      },
      "rule-keyword": {
        pattern: /\b(?:any|baselayout|beep|call|context|deadkey|dk|if|index|layer|notany|nul|outs|platform|reset|return|save|set|store|use)\b/i,
        alias: "keyword"
      },
      "structural-keyword": {
        pattern: /\b(?:ansi|begin|group|match|nomatch|unicode|using keys)\b/i,
        alias: "keyword"
      },
      "compile-target": {
        pattern: /\$(?:keyman|keymanonly|keymanweb|kmfl|weaver):/i,
        alias: "property"
      },
      // U+####, x###, d### characters and numbers
      number: /\b(?:U\+[\dA-F]+|d\d+|x[\da-f]+|\d+)\b/i,
      operator: /[+>\\$]|\.\./,
      punctuation: /[()=,]/
    };
  }
  return keyman_1;
}
var kotlin_1;
var hasRequiredKotlin;
function requireKotlin() {
  if (hasRequiredKotlin) return kotlin_1;
  hasRequiredKotlin = 1;
  kotlin_1 = kotlin;
  kotlin.displayName = "kotlin";
  kotlin.aliases = ["kt", "kts"];
  function kotlin(Prism2) {
    (function(Prism3) {
      Prism3.languages.kotlin = Prism3.languages.extend("clike", {
        keyword: {
          // The lookbehind prevents wrong highlighting of e.g. kotlin.properties.get
          pattern: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
          lookbehind: true
        },
        function: [
          {
            pattern: /(?:`[^\r\n`]+`|\b\w+)(?=\s*\()/,
            greedy: true
          },
          {
            pattern: /(\.)(?:`[^\r\n`]+`|\w+)(?=\s*\{)/,
            lookbehind: true,
            greedy: true
          }
        ],
        number: /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
        operator: /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/
      });
      delete Prism3.languages.kotlin["class-name"];
      var interpolationInside = {
        "interpolation-punctuation": {
          pattern: /^\$\{?|\}$/,
          alias: "punctuation"
        },
        expression: {
          pattern: /[\s\S]+/,
          inside: Prism3.languages.kotlin
        }
      };
      Prism3.languages.insertBefore("kotlin", "string", {
        // https://kotlinlang.org/spec/expressions.html#string-interpolation-expressions
        "string-literal": [
          {
            pattern: /"""(?:[^$]|\$(?:(?!\{)|\{[^{}]*\}))*?"""/,
            alias: "multiline",
            inside: {
              interpolation: {
                pattern: /\$(?:[a-z_]\w*|\{[^{}]*\})/i,
                inside: interpolationInside
              },
              string: /[\s\S]+/
            }
          },
          {
            pattern: /"(?:[^"\\\r\n$]|\\.|\$(?:(?!\{)|\{[^{}]*\}))*"/,
            alias: "singleline",
            inside: {
              interpolation: {
                pattern: /((?:^|[^\\])(?:\\{2})*)\$(?:[a-z_]\w*|\{[^{}]*\})/i,
                lookbehind: true,
                inside: interpolationInside
              },
              string: /[\s\S]+/
            }
          }
        ],
        char: {
          // https://kotlinlang.org/spec/expressions.html#character-literals
          pattern: /'(?:[^'\\\r\n]|\\(?:.|u[a-fA-F0-9]{0,4}))'/,
          greedy: true
        }
      });
      delete Prism3.languages.kotlin["string"];
      Prism3.languages.insertBefore("kotlin", "keyword", {
        annotation: {
          pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
          alias: "builtin"
        }
      });
      Prism3.languages.insertBefore("kotlin", "function", {
        label: {
          pattern: /\b\w+@|@\w+\b/,
          alias: "symbol"
        }
      });
      Prism3.languages.kt = Prism3.languages.kotlin;
      Prism3.languages.kts = Prism3.languages.kotlin;
    })(Prism2);
  }
  return kotlin_1;
}
var kumir_1;
var hasRequiredKumir;
function requireKumir() {
  if (hasRequiredKumir) return kumir_1;
  hasRequiredKumir = 1;
  kumir_1 = kumir;
  kumir.displayName = "kumir";
  kumir.aliases = ["kum"];
  function kumir(Prism2) {
    (function(Prism3) {
      var nonId = /\s\x00-\x1f\x22-\x2f\x3a-\x3f\x5b-\x5e\x60\x7b-\x7e/.source;
      function wrapId(pattern, flags) {
        return RegExp(pattern.replace(/<nonId>/g, nonId), flags);
      }
      Prism3.languages.kumir = {
        comment: {
          pattern: /\|.*/
        },
        prolog: {
          pattern: /#.*/,
          greedy: true
        },
        string: {
          pattern: /"[^\n\r"]*"|'[^\n\r']*'/,
          greedy: true
        },
        boolean: {
          pattern: wrapId(/(^|[<nonId>])(?:да|нет)(?=[<nonId>]|$)/.source),
          lookbehind: true
        },
        "operator-word": {
          pattern: wrapId(/(^|[<nonId>])(?:и|или|не)(?=[<nonId>]|$)/.source),
          lookbehind: true,
          alias: "keyword"
        },
        "system-variable": {
          pattern: wrapId(/(^|[<nonId>])знач(?=[<nonId>]|$)/.source),
          lookbehind: true,
          alias: "keyword"
        },
        type: [
          {
            pattern: wrapId(
              /(^|[<nonId>])(?:вещ|лит|лог|сим|цел)(?:\x20*таб)?(?=[<nonId>]|$)/.source
            ),
            lookbehind: true,
            alias: "builtin"
          },
          {
            pattern: wrapId(
              /(^|[<nonId>])(?:компл|сканкод|файл|цвет)(?=[<nonId>]|$)/.source
            ),
            lookbehind: true,
            alias: "important"
          }
        ],
        /**
         * Should be performed after searching for type names because of "таб".
         * "таб" is a reserved word, but never used without a preceding type name.
         * "НАЗНАЧИТЬ", "Фввод", and "Фвывод" are not reserved words.
         */
        keyword: {
          pattern: wrapId(
            /(^|[<nonId>])(?:алг|арг(?:\x20*рез)?|ввод|ВКЛЮЧИТЬ|вс[её]|выбор|вывод|выход|дано|для|до|дс|если|иначе|исп|использовать|кон(?:(?:\x20+|_)исп)?|кц(?:(?:\x20+|_)при)?|надо|нач|нс|нц|от|пауза|пока|при|раза?|рез|стоп|таб|то|утв|шаг)(?=[<nonId>]|$)/.source
          ),
          lookbehind: true
        },
        /** Should be performed after searching for reserved words. */
        name: {
          // eslint-disable-next-line regexp/no-super-linear-backtracking
          pattern: wrapId(
            /(^|[<nonId>])[^\d<nonId>][^<nonId>]*(?:\x20+[^<nonId>]+)*(?=[<nonId>]|$)/.source
          ),
          lookbehind: true
        },
        /** Should be performed after searching for names. */
        number: {
          pattern: wrapId(
            /(^|[<nonId>])(?:\B\$[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)(?=[<nonId>]|$)/.source,
            "i"
          ),
          lookbehind: true
        },
        /** Should be performed after searching for words. */
        punctuation: /:=|[(),:;\[\]]/,
        /**
         * Should be performed after searching for
         * - numeric constants (because of "+" and "-");
         * - punctuation marks (because of ":=" and "=").
         */
        "operator-char": {
          pattern: /\*\*?|<[=>]?|>=?|[-+/=]/,
          alias: "operator"
        }
      };
      Prism3.languages.kum = Prism3.languages.kumir;
    })(Prism2);
  }
  return kumir_1;
}
var kusto_1;
var hasRequiredKusto;
function requireKusto() {
  if (hasRequiredKusto) return kusto_1;
  hasRequiredKusto = 1;
  kusto_1 = kusto;
  kusto.displayName = "kusto";
  kusto.aliases = [];
  function kusto(Prism2) {
    Prism2.languages.kusto = {
      comment: {
        pattern: /\/\/.*/,
        greedy: true
      },
      string: {
        pattern: /```[\s\S]*?```|[hH]?(?:"(?:[^\r\n\\"]|\\.)*"|'(?:[^\r\n\\']|\\.)*'|@(?:"[^\r\n"]*"|'[^\r\n']*'))/,
        greedy: true
      },
      verb: {
        pattern: /(\|\s*)[a-z][\w-]*/i,
        lookbehind: true,
        alias: "keyword"
      },
      command: {
        pattern: /\.[a-z][a-z\d-]*\b/,
        alias: "keyword"
      },
      "class-name": /\b(?:bool|datetime|decimal|dynamic|guid|int|long|real|string|timespan)\b/,
      keyword: /\b(?:access|alias|and|anti|as|asc|auto|between|by|(?:contains|(?:ends|starts)with|has(?:perfix|suffix)?)(?:_cs)?|database|declare|desc|external|from|fullouter|has_all|in|ingestion|inline|inner|innerunique|into|(?:left|right)(?:anti(?:semi)?|inner|outer|semi)?|let|like|local|not|of|on|or|pattern|print|query_parameters|range|restrict|schema|set|step|table|tables|to|view|where|with|matches\s+regex|nulls\s+(?:first|last))(?![\w-])/,
      boolean: /\b(?:false|null|true)\b/,
      function: /\b[a-z_]\w*(?=\s*\()/,
      datetime: [
        {
          // RFC 822 + RFC 850
          pattern: /\b(?:(?:Fri|Friday|Mon|Monday|Sat|Saturday|Sun|Sunday|Thu|Thursday|Tue|Tuesday|Wed|Wednesday)\s*,\s*)?\d{1,2}(?:\s+|-)(?:Apr|Aug|Dec|Feb|Jan|Jul|Jun|Mar|May|Nov|Oct|Sep)(?:\s+|-)\d{2}\s+\d{2}:\d{2}(?::\d{2})?(?:\s*(?:\b(?:[A-Z]|(?:[ECMT][DS]|GM|U)T)|[+-]\d{4}))?\b/,
          alias: "number"
        },
        {
          // ISO 8601
          pattern: /[+-]?\b(?:\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)?|\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?)Z?/,
          alias: "number"
        }
      ],
      number: /\b(?:0x[0-9A-Fa-f]+|\d+(?:\.\d+)?(?:[Ee][+-]?\d+)?)(?:(?:min|sec|[mnµ]s|[dhms]|microsecond|tick)\b)?|[+-]?\binf\b/,
      operator: /=>|[!=]~|[!=<>]=?|[-+*/%|]|\.\./,
      punctuation: /[()\[\]{},;.:]/
    };
  }
  return kusto_1;
}
var latex_1;
var hasRequiredLatex;
function requireLatex() {
  if (hasRequiredLatex) return latex_1;
  hasRequiredLatex = 1;
  latex_1 = latex;
  latex.displayName = "latex";
  latex.aliases = ["tex", "context"];
  function latex(Prism2) {
    (function(Prism3) {
      var funcPattern = /\\(?:[^a-z()[\]]|[a-z*]+)/i;
      var insideEqu = {
        "equation-command": {
          pattern: funcPattern,
          alias: "regex"
        }
      };
      Prism3.languages.latex = {
        comment: /%.*/,
        // the verbatim environment prints whitespace to the document
        cdata: {
          pattern: /(\\begin\{((?:lstlisting|verbatim)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
          lookbehind: true
        },
        /*
         * equations can be between $$ $$ or $ $ or \( \) or \[ \]
         * (all are multiline)
         */
        equation: [
          {
            pattern: /\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
            inside: insideEqu,
            alias: "string"
          },
          {
            pattern: /(\\begin\{((?:align|eqnarray|equation|gather|math|multline)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
            lookbehind: true,
            inside: insideEqu,
            alias: "string"
          }
        ],
        /*
         * arguments which are keywords or references are highlighted
         * as keywords
         */
        keyword: {
          pattern: /(\\(?:begin|cite|documentclass|end|label|ref|usepackage)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
          lookbehind: true
        },
        url: {
          pattern: /(\\url\{)[^}]+(?=\})/,
          lookbehind: true
        },
        /*
         * section or chapter headlines are highlighted as bold so that
         * they stand out more
         */
        headline: {
          pattern: /(\\(?:chapter|frametitle|paragraph|part|section|subparagraph|subsection|subsubparagraph|subsubsection|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
          lookbehind: true,
          alias: "class-name"
        },
        function: {
          pattern: funcPattern,
          alias: "selector"
        },
        punctuation: /[[\]{}&]/
      };
      Prism3.languages.tex = Prism3.languages.latex;
      Prism3.languages.context = Prism3.languages.latex;
    })(Prism2);
  }
  return latex_1;
}
var php_1;
var hasRequiredPhp;
function requirePhp() {
  if (hasRequiredPhp) return php_1;
  hasRequiredPhp = 1;
  var refractorMarkupTemplating = requireMarkupTemplating();
  php_1 = php;
  php.displayName = "php";
  php.aliases = [];
  function php(Prism2) {
    Prism2.register(refractorMarkupTemplating);
    (function(Prism3) {
      var comment = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/;
      var constant = [
        {
          pattern: /\b(?:false|true)\b/i,
          alias: "boolean"
        },
        {
          pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i,
          greedy: true,
          lookbehind: true
        },
        {
          pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i,
          greedy: true,
          lookbehind: true
        },
        /\b(?:null)\b/i,
        /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/
      ];
      var number = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i;
      var operator = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/;
      var punctuation = /[{}\[\](),:;]/;
      Prism3.languages.php = {
        delimiter: {
          pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
          alias: "important"
        },
        comment,
        variable: /\$+(?:\w+\b|(?=\{))/,
        package: {
          pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
          lookbehind: true,
          inside: {
            punctuation: /\\/
          }
        },
        "class-name-definition": {
          pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
          lookbehind: true,
          alias: "class-name"
        },
        "function-definition": {
          pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,
          lookbehind: true,
          alias: "function"
        },
        keyword: [
          {
            pattern: /(\(\s*)\b(?:array|bool|boolean|float|int|integer|object|string)\b(?=\s*\))/i,
            alias: "type-casting",
            greedy: true,
            lookbehind: true
          },
          {
            pattern: /([(,?]\s*)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string)\b(?=\s*\$)/i,
            alias: "type-hint",
            greedy: true,
            lookbehind: true
          },
          {
            pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string|void)\b/i,
            alias: "return-type",
            greedy: true,
            lookbehind: true
          },
          {
            pattern: /\b(?:array(?!\s*\()|bool|float|int|iterable|mixed|object|string|void)\b/i,
            alias: "type-declaration",
            greedy: true
          },
          {
            pattern: /(\|\s*)(?:false|null)\b|\b(?:false|null)(?=\s*\|)/i,
            alias: "type-declaration",
            greedy: true,
            lookbehind: true
          },
          {
            pattern: /\b(?:parent|self|static)(?=\s*::)/i,
            alias: "static-context",
            greedy: true
          },
          {
            // yield from
            pattern: /(\byield\s+)from\b/i,
            lookbehind: true
          },
          // `class` is always a keyword unlike other keywords
          /\bclass\b/i,
          {
            // https://www.php.net/manual/en/reserved.keywords.php
            //
            // keywords cannot be preceded by "->"
            // the complex lookbehind means `(?<!(?:->|::)\s*)`
            pattern: /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|new|or|parent|print|private|protected|public|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield|__halt_compiler)\b/i,
            lookbehind: true
          }
        ],
        "argument-name": {
          pattern: /([(,]\s+)\b[a-z_]\w*(?=\s*:(?!:))/i,
          lookbehind: true
        },
        "class-name": [
          {
            pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
            greedy: true,
            lookbehind: true
          },
          {
            pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i,
            greedy: true,
            lookbehind: true
          },
          {
            pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i,
            greedy: true
          },
          {
            pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
            alias: "class-name-fully-qualified",
            greedy: true,
            lookbehind: true,
            inside: {
              punctuation: /\\/
            }
          },
          {
            pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
            alias: "class-name-fully-qualified",
            greedy: true,
            inside: {
              punctuation: /\\/
            }
          },
          {
            pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
            alias: "class-name-fully-qualified",
            greedy: true,
            lookbehind: true,
            inside: {
              punctuation: /\\/
            }
          },
          {
            pattern: /\b[a-z_]\w*(?=\s*\$)/i,
            alias: "type-declaration",
            greedy: true
          },
          {
            pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
            alias: ["class-name-fully-qualified", "type-declaration"],
            greedy: true,
            inside: {
              punctuation: /\\/
            }
          },
          {
            pattern: /\b[a-z_]\w*(?=\s*::)/i,
            alias: "static-context",
            greedy: true
          },
          {
            pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
            alias: ["class-name-fully-qualified", "static-context"],
            greedy: true,
            inside: {
              punctuation: /\\/
            }
          },
          {
            pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,
            alias: "type-hint",
            greedy: true,
            lookbehind: true
          },
          {
            pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
            alias: ["class-name-fully-qualified", "type-hint"],
            greedy: true,
            lookbehind: true,
            inside: {
              punctuation: /\\/
            }
          },
          {
            pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,
            alias: "return-type",
            greedy: true,
            lookbehind: true
          },
          {
            pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
            alias: ["class-name-fully-qualified", "return-type"],
            greedy: true,
            lookbehind: true,
            inside: {
              punctuation: /\\/
            }
          }
        ],
        constant,
        function: {
          pattern: /(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,
          lookbehind: true,
          inside: {
            punctuation: /\\/
          }
        },
        property: {
          pattern: /(->\s*)\w+/,
          lookbehind: true
        },
        number,
        operator,
        punctuation
      };
      var string_interpolation = {
        pattern: /\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/,
        lookbehind: true,
        inside: Prism3.languages.php
      };
      var string = [
        {
          pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
          alias: "nowdoc-string",
          greedy: true,
          inside: {
            delimiter: {
              pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
              alias: "symbol",
              inside: {
                punctuation: /^<<<'?|[';]$/
              }
            }
          }
        },
        {
          pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
          alias: "heredoc-string",
          greedy: true,
          inside: {
            delimiter: {
              pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
              alias: "symbol",
              inside: {
                punctuation: /^<<<"?|[";]$/
              }
            },
            interpolation: string_interpolation
          }
        },
        {
          pattern: /`(?:\\[\s\S]|[^\\`])*`/,
          alias: "backtick-quoted-string",
          greedy: true
        },
        {
          pattern: /'(?:\\[\s\S]|[^\\'])*'/,
          alias: "single-quoted-string",
          greedy: true
        },
        {
          pattern: /"(?:\\[\s\S]|[^\\"])*"/,
          alias: "double-quoted-string",
          greedy: true,
          inside: {
            interpolation: string_interpolation
          }
        }
      ];
      Prism3.languages.insertBefore("php", "variable", {
        string,
        attribute: {
          pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
          greedy: true,
          inside: {
            "attribute-content": {
              pattern: /^(#\[)[\s\S]+(?=\]$)/,
              lookbehind: true,
              // inside can appear subset of php
              inside: {
                comment,
                string,
                "attribute-class-name": [
                  {
                    pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
                    alias: "class-name",
                    greedy: true,
                    lookbehind: true
                  },
                  {
                    pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
                    alias: ["class-name", "class-name-fully-qualified"],
                    greedy: true,
                    lookbehind: true,
                    inside: {
                      punctuation: /\\/
                    }
                  }
                ],
                constant,
                number,
                operator,
                punctuation
              }
            },
            delimiter: {
              pattern: /^#\[|\]$/,
              alias: "punctuation"
            }
          }
        }
      });
      Prism3.hooks.add("before-tokenize", function(env) {
        if (!/<\?/.test(env.code)) {
          return;
        }
        var phpPattern = /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/g;
        Prism3.languages["markup-templating"].buildPlaceholders(
          env,
          "php",
          phpPattern
        );
      });
      Prism3.hooks.add("after-tokenize", function(env) {
        Prism3.languages["markup-templating"].tokenizePlaceholders(env, "php");
      });
    })(Prism2);
  }
  return php_1;
}
var latte_1;
var hasRequiredLatte;
function requireLatte() {
  if (hasRequiredLatte) return latte_1;
  hasRequiredLatte = 1;
  var refractorMarkupTemplating = requireMarkupTemplating();
  var refractorPhp = requirePhp();
  latte_1 = latte;
  latte.displayName = "latte";
  latte.aliases = [];
  function latte(Prism2) {
    Prism2.register(refractorMarkupTemplating);
    Prism2.register(refractorPhp);
    (function(Prism3) {
      Prism3.languages.latte = {
        comment: /^\{\*[\s\S]*/,
        "latte-tag": {
          // https://latte.nette.org/en/tags
          pattern: /(^\{(?:\/(?=[a-z]))?)(?:[=_]|[a-z]\w*\b(?!\())/i,
          lookbehind: true,
          alias: "important"
        },
        delimiter: {
          pattern: /^\{\/?|\}$/,
          alias: "punctuation"
        },
        php: {
          pattern: /\S(?:[\s\S]*\S)?/,
          alias: "language-php",
          inside: Prism3.languages.php
        }
      };
      var markupLatte = Prism3.languages.extend("markup", {});
      Prism3.languages.insertBefore(
        "inside",
        "attr-value",
        {
          "n-attr": {
            pattern: /n:[\w-]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+))?/,
            inside: {
              "attr-name": {
                pattern: /^[^\s=]+/,
                alias: "important"
              },
              "attr-value": {
                pattern: /=[\s\S]+/,
                inside: {
                  punctuation: [
                    /^=/,
                    {
                      pattern: /^(\s*)["']|["']$/,
                      lookbehind: true
                    }
                  ],
                  php: {
                    pattern: /\S(?:[\s\S]*\S)?/,
                    inside: Prism3.languages.php
                  }
                }
              }
            }
          }
        },
        markupLatte.tag
      );
      Prism3.hooks.add("before-tokenize", function(env) {
        if (env.language !== "latte") {
          return;
        }
        var lattePattern = /\{\*[\s\S]*?\*\}|\{[^'"\s{}*](?:[^"'/{}]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|\/\*(?:[^*]|\*(?!\/))*\*\/)*\}/g;
        Prism3.languages["markup-templating"].buildPlaceholders(
          env,
          "latte",
          lattePattern
        );
        env.grammar = markupLatte;
      });
      Prism3.hooks.add("after-tokenize", function(env) {
        Prism3.languages["markup-templating"].tokenizePlaceholders(env, "latte");
      });
    })(Prism2);
  }
  return latte_1;
}
var less_1;
var hasRequiredLess;
function requireLess() {
  if (hasRequiredLess) return less_1;
  hasRequiredLess = 1;
  less_1 = less;
  less.displayName = "less";
  less.aliases = [];
  function less(Prism2) {
    Prism2.languages.less = Prism2.languages.extend("css", {
      comment: [
        /\/\*[\s\S]*?\*\//,
        {
          pattern: /(^|[^\\])\/\/.*/,
          lookbehind: true
        }
      ],
      atrule: {
        pattern: /@[\w-](?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};\s]|\s+(?!\s))*?(?=\s*\{)/,
        inside: {
          punctuation: /[:()]/
        }
      },
      // selectors and mixins are considered the same
      selector: {
        pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@\s]|\s+(?!\s))*?(?=\s*\{)/,
        inside: {
          // mixin parameters
          variable: /@+[\w-]+/
        }
      },
      property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/,
      operator: /[+\-*\/]/
    });
    Prism2.languages.insertBefore("less", "property", {
      variable: [
        // Variable declaration (the colon must be consumed!)
        {
          pattern: /@[\w-]+\s*:/,
          inside: {
            punctuation: /:/
          }
        },
        // Variable usage
        /@@?[\w-]+/
      ],
      "mixin-usage": {
        pattern: /([{;]\s*)[.#](?!\d)[\w-].*?(?=[(;])/,
        lookbehind: true,
        alias: "function"
      }
    });
  }
  return less_1;
}
var scheme_1;
var hasRequiredScheme;
function requireScheme() {
  if (hasRequiredScheme) return scheme_1;
  hasRequiredScheme = 1;
  scheme_1 = scheme;
  scheme.displayName = "scheme";
  scheme.aliases = [];
  function scheme(Prism2) {
    (function(Prism3) {
      Prism3.languages.scheme = {
        // this supports "normal" single-line comments:
        //   ; comment
        // and (potentially nested) multiline comments:
        //   #| comment #| nested |# still comment |#
        // (only 1 level of nesting is supported)
        comment: /;.*|#;\s*(?:\((?:[^()]|\([^()]*\))*\)|\[(?:[^\[\]]|\[[^\[\]]*\])*\])|#\|(?:[^#|]|#(?!\|)|\|(?!#)|#\|(?:[^#|]|#(?!\|)|\|(?!#))*\|#)*\|#/,
        string: {
          pattern: /"(?:[^"\\]|\\.)*"/,
          greedy: true
        },
        symbol: {
          pattern: /'[^()\[\]#'\s]+/,
          greedy: true
        },
        char: {
          pattern: /#\\(?:[ux][a-fA-F\d]+\b|[-a-zA-Z]+\b|[\uD800-\uDBFF][\uDC00-\uDFFF]|\S)/,
          greedy: true
        },
        "lambda-parameter": [
          // https://www.cs.cmu.edu/Groups/AI/html/r4rs/r4rs_6.html#SEC30
          {
            pattern: /((?:^|[^'`#])[(\[]lambda\s+)(?:[^|()\[\]'\s]+|\|(?:[^\\|]|\\.)*\|)/,
            lookbehind: true
          },
          {
            pattern: /((?:^|[^'`#])[(\[]lambda\s+[(\[])[^()\[\]']+/,
            lookbehind: true
          }
        ],
        keyword: {
          pattern: /((?:^|[^'`#])[(\[])(?:begin|case(?:-lambda)?|cond(?:-expand)?|define(?:-library|-macro|-record-type|-syntax|-values)?|defmacro|delay(?:-force)?|do|else|except|export|guard|if|import|include(?:-ci|-library-declarations)?|lambda|let(?:rec)?(?:-syntax|-values|\*)?|let\*-values|only|parameterize|prefix|(?:quasi-?)?quote|rename|set!|syntax-(?:case|rules)|unless|unquote(?:-splicing)?|when)(?=[()\[\]\s]|$)/,
          lookbehind: true
        },
        builtin: {
          // all functions of the base library of R7RS plus some of built-ins of R5Rs
          pattern: /((?:^|[^'`#])[(\[])(?:abs|and|append|apply|assoc|ass[qv]|binary-port\?|boolean=?\?|bytevector(?:-append|-copy|-copy!|-length|-u8-ref|-u8-set!|\?)?|caar|cadr|call-with-(?:current-continuation|port|values)|call\/cc|car|cdar|cddr|cdr|ceiling|char(?:->integer|-ready\?|\?|<\?|<=\?|=\?|>\?|>=\?)|close-(?:input-port|output-port|port)|complex\?|cons|current-(?:error|input|output)-port|denominator|dynamic-wind|eof-object\??|eq\?|equal\?|eqv\?|error|error-object(?:-irritants|-message|\?)|eval|even\?|exact(?:-integer-sqrt|-integer\?|\?)?|expt|features|file-error\?|floor(?:-quotient|-remainder|\/)?|flush-output-port|for-each|gcd|get-output-(?:bytevector|string)|inexact\??|input-port(?:-open\?|\?)|integer(?:->char|\?)|lcm|length|list(?:->string|->vector|-copy|-ref|-set!|-tail|\?)?|make-(?:bytevector|list|parameter|string|vector)|map|max|member|memq|memv|min|modulo|negative\?|newline|not|null\?|number(?:->string|\?)|numerator|odd\?|open-(?:input|output)-(?:bytevector|string)|or|output-port(?:-open\?|\?)|pair\?|peek-char|peek-u8|port\?|positive\?|procedure\?|quotient|raise|raise-continuable|rational\?|rationalize|read-(?:bytevector|bytevector!|char|error\?|line|string|u8)|real\?|remainder|reverse|round|set-c[ad]r!|square|string(?:->list|->number|->symbol|->utf8|->vector|-append|-copy|-copy!|-fill!|-for-each|-length|-map|-ref|-set!|\?|<\?|<=\?|=\?|>\?|>=\?)?|substring|symbol(?:->string|\?|=\?)|syntax-error|textual-port\?|truncate(?:-quotient|-remainder|\/)?|u8-ready\?|utf8->string|values|vector(?:->list|->string|-append|-copy|-copy!|-fill!|-for-each|-length|-map|-ref|-set!|\?)?|with-exception-handler|write-(?:bytevector|char|string|u8)|zero\?)(?=[()\[\]\s]|$)/,
          lookbehind: true
        },
        operator: {
          pattern: /((?:^|[^'`#])[(\[])(?:[-+*%/]|[<>]=?|=>?)(?=[()\[\]\s]|$)/,
          lookbehind: true
        },
        number: {
          // The number pattern from [the R7RS spec](https://small.r7rs.org/attachment/r7rs.pdf).
          //
          // <number>      := <num 2>|<num 8>|<num 10>|<num 16>
          // <num R>       := <prefix R><complex R>
          // <complex R>   := <real R>(?:@<real R>|<imaginary R>)?|<imaginary R>
          // <imaginary R> := [+-](?:<ureal R>|(?:inf|nan)\.0)?i
          // <real R>      := [+-]?<ureal R>|[+-](?:inf|nan)\.0
          // <ureal R>     := <uint R>(?:\/<uint R>)?
          //                | <decimal R>
          //
          // <decimal 10>  := (?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?
          // <uint R>      := <digit R>+
          // <prefix R>    := <radix R>(?:#[ei])?|(?:#[ei])?<radix R>
          // <radix 2>     := #b
          // <radix 8>     := #o
          // <radix 10>    := (?:#d)?
          // <radix 16>    := #x
          // <digit 2>     := [01]
          // <digit 8>     := [0-7]
          // <digit 10>    := \d
          // <digit 16>    := [0-9a-f]
          //
          // The problem with this grammar is that the resulting regex is way to complex, so we simplify by grouping all
          // non-decimal bases together. This results in a decimal (dec) and combined binary, octal, and hexadecimal (box)
          // pattern:
          pattern: RegExp(
            SortedBNF({
              "<ureal dec>": /\d+(?:\/\d+)|(?:\d+(?:\.\d*)?|\.\d+)(?:[esfdl][+-]?\d+)?/.source,
              "<real dec>": /[+-]?<ureal dec>|[+-](?:inf|nan)\.0/.source,
              "<imaginary dec>": /[+-](?:<ureal dec>|(?:inf|nan)\.0)?i/.source,
              "<complex dec>": /<real dec>(?:@<real dec>|<imaginary dec>)?|<imaginary dec>/.source,
              "<num dec>": /(?:#d(?:#[ei])?|#[ei](?:#d)?)?<complex dec>/.source,
              "<ureal box>": /[0-9a-f]+(?:\/[0-9a-f]+)?/.source,
              "<real box>": /[+-]?<ureal box>|[+-](?:inf|nan)\.0/.source,
              "<imaginary box>": /[+-](?:<ureal box>|(?:inf|nan)\.0)?i/.source,
              "<complex box>": /<real box>(?:@<real box>|<imaginary box>)?|<imaginary box>/.source,
              "<num box>": /#[box](?:#[ei])?|(?:#[ei])?#[box]<complex box>/.source,
              "<number>": /(^|[()\[\]\s])(?:<num dec>|<num box>)(?=[()\[\]\s]|$)/.source
            }),
            "i"
          ),
          lookbehind: true
        },
        boolean: {
          pattern: /(^|[()\[\]\s])#(?:[ft]|false|true)(?=[()\[\]\s]|$)/,
          lookbehind: true
        },
        function: {
          pattern: /((?:^|[^'`#])[(\[])(?:[^|()\[\]'\s]+|\|(?:[^\\|]|\\.)*\|)(?=[()\[\]\s]|$)/,
          lookbehind: true
        },
        identifier: {
          pattern: /(^|[()\[\]\s])\|(?:[^\\|]|\\.)*\|(?=[()\[\]\s]|$)/,
          lookbehind: true,
          greedy: true
        },
        punctuation: /[()\[\]']/
      };
      function SortedBNF(grammar) {
        for (var key in grammar) {
          grammar[key] = grammar[key].replace(/<[\w\s]+>/g, function(key2) {
            return "(?:" + grammar[key2].trim() + ")";
          });
        }
        return grammar[key];
      }
    })(Prism2);
  }
  return scheme_1;
}
var lilypond_1;
var hasRequiredLilypond;
function requireLilypond() {
  if (hasRequiredLilypond) return lilypond_1;
  hasRequiredLilypond = 1;
  var refractorScheme = requireScheme();
  lilypond_1 = lilypond;
  lilypond.displayName = "lilypond";
  lilypond.aliases = [];
  function lilypond(Prism2) {
    Prism2.register(refractorScheme);
    (function(Prism3) {
      var schemeExpression = /\((?:[^();"#\\]|\\[\s\S]|;.*(?!.)|"(?:[^"\\]|\\.)*"|#(?:\{(?:(?!#\})[\s\S])*#\}|[^{])|<expr>)*\)/.source;
      var recursivenessLog2 = 5;
      for (var i = 0; i < recursivenessLog2; i++) {
        schemeExpression = schemeExpression.replace(/<expr>/g, function() {
          return schemeExpression;
        });
      }
      schemeExpression = schemeExpression.replace(/<expr>/g, /[^\s\S]/.source);
      var lilypond2 = Prism3.languages.lilypond = {
        comment: /%(?:(?!\{).*|\{[\s\S]*?%\})/,
        "embedded-scheme": {
          pattern: RegExp(
            /(^|[=\s])#(?:"(?:[^"\\]|\\.)*"|[^\s()"]*(?:[^\s()]|<expr>))/.source.replace(
              /<expr>/g,
              function() {
                return schemeExpression;
              }
            ),
            "m"
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            scheme: {
              pattern: /^(#)[\s\S]+$/,
              lookbehind: true,
              alias: "language-scheme",
              inside: {
                "embedded-lilypond": {
                  pattern: /#\{[\s\S]*?#\}/,
                  greedy: true,
                  inside: {
                    punctuation: /^#\{|#\}$/,
                    lilypond: {
                      pattern: /[\s\S]+/,
                      alias: "language-lilypond",
                      inside: null
                      // see below
                    }
                  }
                },
                rest: Prism3.languages.scheme
              }
            },
            punctuation: /#/
          }
        },
        string: {
          pattern: /"(?:[^"\\]|\\.)*"/,
          greedy: true
        },
        "class-name": {
          pattern: /(\\new\s+)[\w-]+/,
          lookbehind: true
        },
        keyword: {
          pattern: /\\[a-z][-\w]*/i,
          inside: {
            punctuation: /^\\/
          }
        },
        operator: /[=|]|<<|>>/,
        punctuation: {
          pattern: /(^|[a-z\d])(?:'+|,+|[_^]?-[_^]?(?:[-+^!>._]|(?=\d))|[_^]\.?|[.!])|[{}()[\]<>^~]|\\[()[\]<>\\!]|--|__/,
          lookbehind: true
        },
        number: /\b\d+(?:\/\d+)?\b/
      };
      lilypond2["embedded-scheme"].inside["scheme"].inside["embedded-lilypond"].inside["lilypond"].inside = lilypond2;
      Prism3.languages.ly = lilypond2;
    })(Prism2);
  }
  return lilypond_1;
}
var liquid_1;
var hasRequiredLiquid;
function requireLiquid() {
  if (hasRequiredLiquid) return liquid_1;
  hasRequiredLiquid = 1;
  var refractorMarkupTemplating = requireMarkupTemplating();
  liquid_1 = liquid;
  liquid.displayName = "liquid";
  liquid.aliases = [];
  function liquid(Prism2) {
    Prism2.register(refractorMarkupTemplating);
    Prism2.languages.liquid = {
      comment: {
        pattern: /(^\{%\s*comment\s*%\})[\s\S]+(?=\{%\s*endcomment\s*%\}$)/,
        lookbehind: true
      },
      delimiter: {
        pattern: /^\{(?:\{\{|[%\{])-?|-?(?:\}\}|[%\}])\}$/,
        alias: "punctuation"
      },
      string: {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: true
      },
      keyword: /\b(?:as|assign|break|(?:end)?(?:capture|case|comment|for|form|if|paginate|raw|style|tablerow|unless)|continue|cycle|decrement|echo|else|elsif|in|include|increment|limit|liquid|offset|range|render|reversed|section|when|with)\b/,
      object: /\b(?:address|all_country_option_tags|article|block|blog|cart|checkout|collection|color|country|country_option_tags|currency|current_page|current_tags|customer|customer_address|date|discount_allocation|discount_application|external_video|filter|filter_value|font|forloop|fulfillment|generic_file|gift_card|group|handle|image|line_item|link|linklist|localization|location|measurement|media|metafield|model|model_source|order|page|page_description|page_image|page_title|part|policy|product|product_option|recommendations|request|robots|routes|rule|script|search|selling_plan|selling_plan_allocation|selling_plan_group|shipping_method|shop|shop_locale|sitemap|store_availability|tax_line|template|theme|transaction|unit_price_measurement|user_agent|variant|video|video_source)\b/,
      function: [
        {
          pattern: /(\|\s*)\w+/,
          lookbehind: true,
          alias: "filter"
        },
        {
          // array functions
          pattern: /(\.\s*)(?:first|last|size)/,
          lookbehind: true
        }
      ],
      boolean: /\b(?:false|nil|true)\b/,
      range: {
        pattern: /\.\./,
        alias: "operator"
      },
      // https://github.com/Shopify/liquid/blob/698f5e0d967423e013f6169d9111bd969bd78337/lib/liquid/lexer.rb#L21
      number: /\b\d+(?:\.\d+)?\b/,
      operator: /[!=]=|<>|[<>]=?|[|?:=-]|\b(?:and|contains(?=\s)|or)\b/,
      punctuation: /[.,\[\]()]/,
      empty: {
        pattern: /\bempty\b/,
        alias: "keyword"
      }
    };
    Prism2.hooks.add("before-tokenize", function(env) {
      var liquidPattern = /\{%\s*comment\s*%\}[\s\S]*?\{%\s*endcomment\s*%\}|\{(?:%[\s\S]*?%|\{\{[\s\S]*?\}\}|\{[\s\S]*?\})\}/g;
      var insideRaw = false;
      Prism2.languages["markup-templating"].buildPlaceholders(
        env,
        "liquid",
        liquidPattern,
        function(match) {
          var tagMatch = /^\{%-?\s*(\w+)/.exec(match);
          if (tagMatch) {
            var tag = tagMatch[1];
            if (tag === "raw" && !insideRaw) {
              insideRaw = true;
              return true;
            } else if (tag === "endraw") {
              insideRaw = false;
              return true;
            }
          }
          return !insideRaw;
        }
      );
    });
    Prism2.hooks.add("after-tokenize", function(env) {
      Prism2.languages["markup-templating"].tokenizePlaceholders(env, "liquid");
    });
  }
  return liquid_1;
}
var lisp_1;
var hasRequiredLisp;
function requireLisp() {
  if (hasRequiredLisp) return lisp_1;
  hasRequiredLisp = 1;
  lisp_1 = lisp;
  lisp.displayName = "lisp";
  lisp.aliases = [];
  function lisp(Prism2) {
    (function(Prism3) {
      function simple_form(name) {
        return RegExp(/(\()/.source + "(?:" + name + ")" + /(?=[\s\)])/.source);
      }
      function primitive(pattern) {
        return RegExp(
          /([\s([])/.source + "(?:" + pattern + ")" + /(?=[\s)])/.source
        );
      }
      var symbol = /(?!\d)[-+*/~!@$%^=<>{}\w]+/.source;
      var marker = "&" + symbol;
      var par = "(\\()";
      var endpar = "(?=\\))";
      var space = "(?=\\s)";
      var nestedPar = /(?:[^()]|\((?:[^()]|\((?:[^()]|\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\))*\))*\))*/.source;
      var language = {
        // Three or four semicolons are considered a heading.
        // See https://www.gnu.org/software/emacs/manual/html_node/elisp/Comment-Tips.html
        heading: {
          pattern: /;;;.*/,
          alias: ["comment", "title"]
        },
        comment: /;.*/,
        string: {
          pattern: /"(?:[^"\\]|\\.)*"/,
          greedy: true,
          inside: {
            argument: /[-A-Z]+(?=[.,\s])/,
            symbol: RegExp("`" + symbol + "'")
          }
        },
        "quoted-symbol": {
          pattern: RegExp("#?'" + symbol),
          alias: ["variable", "symbol"]
        },
        "lisp-property": {
          pattern: RegExp(":" + symbol),
          alias: "property"
        },
        splice: {
          pattern: RegExp(",@?" + symbol),
          alias: ["symbol", "variable"]
        },
        keyword: [
          {
            pattern: RegExp(
              par + "(?:and|(?:cl-)?letf|cl-loop|cond|cons|error|if|(?:lexical-)?let\\*?|message|not|null|or|provide|require|setq|unless|use-package|when|while)" + space
            ),
            lookbehind: true
          },
          {
            pattern: RegExp(
              par + "(?:append|by|collect|concat|do|finally|for|in|return)" + space
            ),
            lookbehind: true
          }
        ],
        declare: {
          pattern: simple_form(/declare/.source),
          lookbehind: true,
          alias: "keyword"
        },
        interactive: {
          pattern: simple_form(/interactive/.source),
          lookbehind: true,
          alias: "keyword"
        },
        boolean: {
          pattern: primitive(/nil|t/.source),
          lookbehind: true
        },
        number: {
          pattern: primitive(/[-+]?\d+(?:\.\d*)?/.source),
          lookbehind: true
        },
        defvar: {
          pattern: RegExp(par + "def(?:const|custom|group|var)\\s+" + symbol),
          lookbehind: true,
          inside: {
            keyword: /^def[a-z]+/,
            variable: RegExp(symbol)
          }
        },
        defun: {
          pattern: RegExp(
            par + /(?:cl-)?(?:defmacro|defun\*?)\s+/.source + symbol + /\s+\(/.source + nestedPar + /\)/.source
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            keyword: /^(?:cl-)?def\S+/,
            // See below, this property needs to be defined later so that it can
            // reference the language object.
            arguments: null,
            function: {
              pattern: RegExp("(^\\s)" + symbol),
              lookbehind: true
            },
            punctuation: /[()]/
          }
        },
        lambda: {
          pattern: RegExp(
            par + "lambda\\s+\\(\\s*(?:&?" + symbol + "(?:\\s+&?" + symbol + ")*\\s*)?\\)"
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            keyword: /^lambda/,
            // See below, this property needs to be defined later so that it can
            // reference the language object.
            arguments: null,
            punctuation: /[()]/
          }
        },
        car: {
          pattern: RegExp(par + symbol),
          lookbehind: true
        },
        punctuation: [
          // open paren, brackets, and close paren
          /(?:['`,]?\(|[)\[\]])/,
          // cons
          {
            pattern: /(\s)\.(?=\s)/,
            lookbehind: true
          }
        ]
      };
      var arg = {
        "lisp-marker": RegExp(marker),
        varform: {
          pattern: RegExp(
            /\(/.source + symbol + /\s+(?=\S)/.source + nestedPar + /\)/.source
          ),
          inside: language
        },
        argument: {
          pattern: RegExp(/(^|[\s(])/.source + symbol),
          lookbehind: true,
          alias: "variable"
        },
        rest: language
      };
      var forms = "\\S+(?:\\s+\\S+)*";
      var arglist = {
        pattern: RegExp(par + nestedPar + endpar),
        lookbehind: true,
        inside: {
          "rest-vars": {
            pattern: RegExp("&(?:body|rest)\\s+" + forms),
            inside: arg
          },
          "other-marker-vars": {
            pattern: RegExp("&(?:aux|optional)\\s+" + forms),
            inside: arg
          },
          keys: {
            pattern: RegExp("&key\\s+" + forms + "(?:\\s+&allow-other-keys)?"),
            inside: arg
          },
          argument: {
            pattern: RegExp(symbol),
            alias: "variable"
          },
          punctuation: /[()]/
        }
      };
      language["lambda"].inside.arguments = arglist;
      language["defun"].inside.arguments = Prism3.util.clone(arglist);
      language["defun"].inside.arguments.inside.sublist = arglist;
      Prism3.languages.lisp = language;
      Prism3.languages.elisp = language;
      Prism3.languages.emacs = language;
      Prism3.languages["emacs-lisp"] = language;
    })(Prism2);
  }
  return lisp_1;
}
var livescript_1;
var hasRequiredLivescript;
function requireLivescript() {
  if (hasRequiredLivescript) return livescript_1;
  hasRequiredLivescript = 1;
  livescript_1 = livescript;
  livescript.displayName = "livescript";
  livescript.aliases = [];
  function livescript(Prism2) {
    Prism2.languages.livescript = {
      comment: [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
          lookbehind: true
        },
        {
          pattern: /(^|[^\\])#.*/,
          lookbehind: true
        }
      ],
      "interpolated-string": {
        /* Look-behind and look-ahead prevents wrong behavior of the greedy pattern
         * forcing it to match """-quoted string when it would otherwise match "-quoted first. */
        pattern: /(^|[^"])("""|")(?:\\[\s\S]|(?!\2)[^\\])*\2(?!")/,
        lookbehind: true,
        greedy: true,
        inside: {
          variable: {
            pattern: /(^|[^\\])#[a-z_](?:-?[a-z]|[\d_])*/m,
            lookbehind: true
          },
          interpolation: {
            pattern: /(^|[^\\])#\{[^}]+\}/m,
            lookbehind: true,
            inside: {
              "interpolation-punctuation": {
                pattern: /^#\{|\}$/,
                alias: "variable"
              }
              // See rest below
            }
          },
          string: /[\s\S]+/
        }
      },
      string: [
        {
          pattern: /('''|')(?:\\[\s\S]|(?!\1)[^\\])*\1/,
          greedy: true
        },
        {
          pattern: /<\[[\s\S]*?\]>/,
          greedy: true
        },
        /\\[^\s,;\])}]+/
      ],
      regex: [
        {
          pattern: /\/\/(?:\[[^\r\n\]]*\]|\\.|(?!\/\/)[^\\\[])+\/\/[gimyu]{0,5}/,
          greedy: true,
          inside: {
            comment: {
              pattern: /(^|[^\\])#.*/,
              lookbehind: true
            }
          }
        },
        {
          pattern: /\/(?:\[[^\r\n\]]*\]|\\.|[^/\\\r\n\[])+\/[gimyu]{0,5}/,
          greedy: true
        }
      ],
      keyword: {
        pattern: /(^|(?!-).)\b(?:break|case|catch|class|const|continue|default|do|else|extends|fallthrough|finally|for(?: ever)?|function|if|implements|it|let|loop|new|null|otherwise|own|return|super|switch|that|then|this|throw|try|unless|until|var|void|when|while|yield)(?!-)\b/m,
        lookbehind: true
      },
      "keyword-operator": {
        pattern: /(^|[^-])\b(?:(?:delete|require|typeof)!|(?:and|by|delete|export|from|import(?: all)?|in|instanceof|is(?: not|nt)?|not|of|or|til|to|typeof|with|xor)(?!-)\b)/m,
        lookbehind: true,
        alias: "operator"
      },
      boolean: {
        pattern: /(^|[^-])\b(?:false|no|off|on|true|yes)(?!-)\b/m,
        lookbehind: true
      },
      argument: {
        // Don't match .&. nor &&
        pattern: /(^|(?!\.&\.)[^&])&(?!&)\d*/m,
        lookbehind: true,
        alias: "variable"
      },
      number: /\b(?:\d+~[\da-z]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[a-z]\w*)?)/i,
      identifier: /[a-z_](?:-?[a-z]|[\d_])*/i,
      operator: [
        // Spaced .
        {
          pattern: /( )\.(?= )/,
          lookbehind: true
        },
        // Full list, in order:
        // .= .~ .. ...
        // .&. .^. .<<. .>>. .>>>.
        // := :: ::=
        // &&
        // || |>
        // < << <<< <<<<
        // <- <-- <-! <--!
        // <~ <~~ <~! <~~!
        // <| <= <?
        // > >> >= >?
        // - -- -> -->
        // + ++
        // @ @@
        // % %%
        // * **
        // ! != !~=
        // !~> !~~>
        // !-> !-->
        // ~ ~> ~~> ~=
        // = ==
        // ^ ^^
        // / ?
        /\.(?:[=~]|\.\.?)|\.(?:[&|^]|<<|>>>?)\.|:(?:=|:=?)|&&|\|[|>]|<(?:<<?<?|--?!?|~~?!?|[|=?])?|>[>=?]?|-(?:->?|>)?|\+\+?|@@?|%%?|\*\*?|!(?:~?=|--?>|~?~>)?|~(?:~?>|=)?|==?|\^\^?|[\/?]/
      ],
      punctuation: /[(){}\[\]|.,:;`]/
    };
    Prism2.languages.livescript["interpolated-string"].inside["interpolation"].inside.rest = Prism2.languages.livescript;
  }
  return livescript_1;
}
var llvm_1;
var hasRequiredLlvm;
function requireLlvm() {
  if (hasRequiredLlvm) return llvm_1;
  hasRequiredLlvm = 1;
  llvm_1 = llvm;
  llvm.displayName = "llvm";
  llvm.aliases = [];
  function llvm(Prism2) {
    (function(Prism3) {
      Prism3.languages.llvm = {
        comment: /;.*/,
        string: {
          pattern: /"[^"]*"/,
          greedy: true
        },
        boolean: /\b(?:false|true)\b/,
        variable: /[%@!#](?:(?!\d)(?:[-$.\w]|\\[a-f\d]{2})+|\d+)/i,
        label: /(?!\d)(?:[-$.\w]|\\[a-f\d]{2})+:/i,
        type: {
          pattern: /\b(?:double|float|fp128|half|i[1-9]\d*|label|metadata|ppc_fp128|token|void|x86_fp80|x86_mmx)\b/,
          alias: "class-name"
        },
        keyword: /\b[a-z_][a-z_0-9]*\b/,
        number: /[+-]?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|\b0x[\dA-Fa-f]+\b|\b0xK[\dA-Fa-f]{20}\b|\b0x[ML][\dA-Fa-f]{32}\b|\b0xH[\dA-Fa-f]{4}\b/,
        punctuation: /[{}[\];(),.!*=<>]/
      };
    })(Prism2);
  }
  return llvm_1;
}
var log_1;
var hasRequiredLog;
function requireLog() {
  if (hasRequiredLog) return log_1;
  hasRequiredLog = 1;
  log_1 = log;
  log.displayName = "log";
  log.aliases = [];
  function log(Prism2) {
    Prism2.languages.log = {
      string: {
        // Single-quoted strings must not be confused with plain text. E.g. Can't isn't Susan's Chris' toy
        pattern: /"(?:[^"\\\r\n]|\\.)*"|'(?![st] | \w)(?:[^'\\\r\n]|\\.)*'/,
        greedy: true
      },
      exception: {
        pattern: /(^|[^\w.])[a-z][\w.]*(?:Error|Exception):.*(?:(?:\r\n?|\n)[ \t]*(?:at[ \t].+|\.{3}.*|Caused by:.*))+(?:(?:\r\n?|\n)[ \t]*\.\.\. .*)?/,
        lookbehind: true,
        greedy: true,
        alias: ["javastacktrace", "language-javastacktrace"],
        inside: Prism2.languages["javastacktrace"] || {
          keyword: /\bat\b/,
          function: /[a-z_][\w$]*(?=\()/,
          punctuation: /[.:()]/
        }
      },
      level: [
        {
          pattern: /\b(?:ALERT|CRIT|CRITICAL|EMERG|EMERGENCY|ERR|ERROR|FAILURE|FATAL|SEVERE)\b/,
          alias: ["error", "important"]
        },
        {
          pattern: /\b(?:WARN|WARNING|WRN)\b/,
          alias: ["warning", "important"]
        },
        {
          pattern: /\b(?:DISPLAY|INF|INFO|NOTICE|STATUS)\b/,
          alias: ["info", "keyword"]
        },
        {
          pattern: /\b(?:DBG|DEBUG|FINE)\b/,
          alias: ["debug", "keyword"]
        },
        {
          pattern: /\b(?:FINER|FINEST|TRACE|TRC|VERBOSE|VRB)\b/,
          alias: ["trace", "comment"]
        }
      ],
      property: {
        pattern: /((?:^|[\]|])[ \t]*)[a-z_](?:[\w-]|\b\/\b)*(?:[. ]\(?\w(?:[\w-]|\b\/\b)*\)?)*:(?=\s)/im,
        lookbehind: true
      },
      separator: {
        pattern: /(^|[^-+])-{3,}|={3,}|\*{3,}|- - /m,
        lookbehind: true,
        alias: "comment"
      },
      url: /\b(?:file|ftp|https?):\/\/[^\s|,;'"]*[^\s|,;'">.]/,
      email: {
        pattern: /(^|\s)[-\w+.]+@[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)+(?=\s)/,
        lookbehind: true,
        alias: "url"
      },
      "ip-address": {
        pattern: /\b(?:\d{1,3}(?:\.\d{1,3}){3})\b/,
        alias: "constant"
      },
      "mac-address": {
        pattern: /\b[a-f0-9]{2}(?::[a-f0-9]{2}){5}\b/i,
        alias: "constant"
      },
      domain: {
        pattern: /(^|\s)[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)*\.[a-z][a-z0-9-]+(?=\s)/,
        lookbehind: true,
        alias: "constant"
      },
      uuid: {
        pattern: /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i,
        alias: "constant"
      },
      hash: {
        pattern: /\b(?:[a-f0-9]{32}){1,2}\b/i,
        alias: "constant"
      },
      "file-path": {
        pattern: /\b[a-z]:[\\/][^\s|,;:(){}\[\]"']+|(^|[\s:\[\](>|])\.{0,2}\/\w[^\s|,;:(){}\[\]"']*/i,
        lookbehind: true,
        greedy: true,
        alias: "string"
      },
      date: {
        pattern: RegExp(
          /\b\d{4}[-/]\d{2}[-/]\d{2}(?:T(?=\d{1,2}:)|(?=\s\d{1,2}:))/.source + "|" + /\b\d{1,4}[-/ ](?:\d{1,2}|Apr|Aug|Dec|Feb|Jan|Jul|Jun|Mar|May|Nov|Oct|Sep)[-/ ]\d{2,4}T?\b/.source + "|" + /\b(?:(?:Fri|Mon|Sat|Sun|Thu|Tue|Wed)(?:\s{1,2}(?:Apr|Aug|Dec|Feb|Jan|Jul|Jun|Mar|May|Nov|Oct|Sep))?|Apr|Aug|Dec|Feb|Jan|Jul|Jun|Mar|May|Nov|Oct|Sep)\s{1,2}\d{1,2}\b/.source,
          "i"
        ),
        alias: "number"
      },
      time: {
        pattern: /\b\d{1,2}:\d{1,2}:\d{1,2}(?:[.,:]\d+)?(?:\s?[+-]\d{2}:?\d{2}|Z)?\b/,
        alias: "number"
      },
      boolean: /\b(?:false|null|true)\b/i,
      number: {
        pattern: /(^|[^.\w])(?:0x[a-f0-9]+|0o[0-7]+|0b[01]+|v?\d[\da-f]*(?:\.\d+)*(?:e[+-]?\d+)?[a-z]{0,3}\b)\b(?!\.\w)/i,
        lookbehind: true
      },
      operator: /[;:?<=>~/@!$%&+\-|^(){}*#]/,
      punctuation: /[\[\].,]/
    };
  }
  return log_1;
}
var lolcode_1;
var hasRequiredLolcode;
function requireLolcode() {
  if (hasRequiredLolcode) return lolcode_1;
  hasRequiredLolcode = 1;
  lolcode_1 = lolcode;
  lolcode.displayName = "lolcode";
  lolcode.aliases = [];
  function lolcode(Prism2) {
    Prism2.languages.lolcode = {
      comment: [/\bOBTW\s[\s\S]*?\sTLDR\b/, /\bBTW.+/],
      string: {
        pattern: /"(?::.|[^":])*"/,
        inside: {
          variable: /:\{[^}]+\}/,
          symbol: [/:\([a-f\d]+\)/i, /:\[[^\]]+\]/, /:[)>o":]/]
        },
        greedy: true
      },
      number: /(?:\B-)?(?:\b\d+(?:\.\d*)?|\B\.\d+)/,
      symbol: {
        pattern: /(^|\s)(?:A )?(?:BUKKIT|NOOB|NUMBAR|NUMBR|TROOF|YARN)(?=\s|,|$)/,
        lookbehind: true,
        inside: {
          keyword: /A(?=\s)/
        }
      },
      label: {
        pattern: /((?:^|\s)(?:IM IN YR|IM OUTTA YR) )[a-zA-Z]\w*/,
        lookbehind: true,
        alias: "string"
      },
      function: {
        pattern: /((?:^|\s)(?:HOW IZ I|I IZ|IZ) )[a-zA-Z]\w*/,
        lookbehind: true
      },
      keyword: [
        {
          pattern: /(^|\s)(?:AN|FOUND YR|GIMMEH|GTFO|HAI|HAS A|HOW IZ I|I HAS A|I IZ|IF U SAY SO|IM IN YR|IM OUTTA YR|IS NOW(?: A)?|ITZ(?: A)?|IZ|KTHX|KTHXBYE|LIEK(?: A)?|MAEK|MEBBE|MKAY|NERFIN|NO WAI|O HAI IM|O RLY\?|OIC|OMG|OMGWTF|R|SMOOSH|SRS|TIL|UPPIN|VISIBLE|WILE|WTF\?|YA RLY|YR)(?=\s|,|$)/,
          lookbehind: true
        },
        /'Z(?=\s|,|$)/
      ],
      boolean: {
        pattern: /(^|\s)(?:FAIL|WIN)(?=\s|,|$)/,
        lookbehind: true
      },
      variable: {
        pattern: /(^|\s)IT(?=\s|,|$)/,
        lookbehind: true
      },
      operator: {
        pattern: /(^|\s)(?:NOT|BOTH SAEM|DIFFRINT|(?:ALL|ANY|BIGGR|BOTH|DIFF|EITHER|MOD|PRODUKT|QUOSHUNT|SMALLR|SUM|WON) OF)(?=\s|,|$)/,
        lookbehind: true
      },
      punctuation: /\.{3}|…|,|!/
    };
  }
  return lolcode_1;
}
var magma_1;
var hasRequiredMagma;
function requireMagma() {
  if (hasRequiredMagma) return magma_1;
  hasRequiredMagma = 1;
  magma_1 = magma;
  magma.displayName = "magma";
  magma.aliases = [];
  function magma(Prism2) {
    Prism2.languages.magma = {
      output: {
        pattern: /^(>.*(?:\r(?:\n|(?!\n))|\n))(?!>)(?:.+|(?:\r(?:\n|(?!\n))|\n)(?!>).*)(?:(?:\r(?:\n|(?!\n))|\n)(?!>).*)*/m,
        lookbehind: true,
        greedy: true
      },
      comment: {
        pattern: /\/\/.*|\/\*[\s\S]*?\*\//,
        greedy: true
      },
      string: {
        pattern: /(^|[^\\"])"(?:[^\r\n\\"]|\\.)*"/,
        lookbehind: true,
        greedy: true
      },
      // http://magma.maths.usyd.edu.au/magma/handbook/text/82
      keyword: /\b(?:_|adj|and|assert|assert2|assert3|assigned|break|by|case|cat|catch|clear|cmpeq|cmpne|continue|declare|default|delete|diff|div|do|elif|else|end|eq|error|eval|exists|exit|for|forall|forward|fprintf|freeze|function|ge|gt|if|iload|import|in|intrinsic|is|join|le|load|local|lt|meet|mod|ne|not|notadj|notin|notsubset|or|print|printf|procedure|quit|random|read|readi|repeat|require|requirege|requirerange|restore|return|save|sdiff|select|subset|then|time|to|try|until|vprint|vprintf|vtime|when|where|while|xor)\b/,
      boolean: /\b(?:false|true)\b/,
      generator: {
        pattern: /\b[a-z_]\w*(?=\s*<)/i,
        alias: "class-name"
      },
      function: /\b[a-z_]\w*(?=\s*\()/i,
      number: {
        pattern: /(^|[^\w.]|\.\.)(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?(?:_[a-z]?)?(?=$|[^\w.]|\.\.)/,
        lookbehind: true
      },
      operator: /->|[-+*/^~!|#=]|:=|\.\./,
      punctuation: /[()[\]{}<>,;.:]/
    };
  }
  return magma_1;
}
var makefile_1;
var hasRequiredMakefile;
function requireMakefile() {
  if (hasRequiredMakefile) return makefile_1;
  hasRequiredMakefile = 1;
  makefile_1 = makefile;
  makefile.displayName = "makefile";
  makefile.aliases = [];
  function makefile(Prism2) {
    Prism2.languages.makefile = {
      comment: {
        pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
        lookbehind: true
      },
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      "builtin-target": {
        pattern: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
        alias: "builtin"
      },
      target: {
        pattern: /^(?:[^:=\s]|[ \t]+(?![\s:]))+(?=\s*:(?!=))/m,
        alias: "symbol",
        inside: {
          variable: /\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/
        }
      },
      variable: /\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
      // Directives
      keyword: /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
      function: {
        pattern: /(\()(?:abspath|addsuffix|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:list|s)?)(?=[ \t])/,
        lookbehind: true
      },
      operator: /(?:::|[?:+!])?=|[|@]/,
      punctuation: /[:;(){}]/
    };
  }
  return makefile_1;
}
var markdown_1;
var hasRequiredMarkdown;
function requireMarkdown() {
  if (hasRequiredMarkdown) return markdown_1;
  hasRequiredMarkdown = 1;
  markdown_1 = markdown;
  markdown.displayName = "markdown";
  markdown.aliases = ["md"];
  function markdown(Prism2) {
    (function(Prism3) {
      var inner = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
      function createInline(pattern) {
        pattern = pattern.replace(/<inner>/g, function() {
          return inner;
        });
        return RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + pattern + ")");
      }
      var tableCell = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source;
      var tableRow = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(
        /__/g,
        function() {
          return tableCell;
        }
      );
      var tableLine = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;
      Prism3.languages.markdown = Prism3.languages.extend("markup", {});
      Prism3.languages.insertBefore("markdown", "prolog", {
        "front-matter-block": {
          pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
          lookbehind: true,
          greedy: true,
          inside: {
            punctuation: /^---|---$/,
            "front-matter": {
              pattern: /\S+(?:\s+\S+)*/,
              alias: ["yaml", "language-yaml"],
              inside: Prism3.languages.yaml
            }
          }
        },
        blockquote: {
          // > ...
          pattern: /^>(?:[\t ]*>)*/m,
          alias: "punctuation"
        },
        table: {
          pattern: RegExp(
            "^" + tableRow + tableLine + "(?:" + tableRow + ")*",
            "m"
          ),
          inside: {
            "table-data-rows": {
              pattern: RegExp(
                "^(" + tableRow + tableLine + ")(?:" + tableRow + ")*$"
              ),
              lookbehind: true,
              inside: {
                "table-data": {
                  pattern: RegExp(tableCell),
                  inside: Prism3.languages.markdown
                },
                punctuation: /\|/
              }
            },
            "table-line": {
              pattern: RegExp("^(" + tableRow + ")" + tableLine + "$"),
              lookbehind: true,
              inside: {
                punctuation: /\||:?-{3,}:?/
              }
            },
            "table-header-row": {
              pattern: RegExp("^" + tableRow + "$"),
              inside: {
                "table-header": {
                  pattern: RegExp(tableCell),
                  alias: "important",
                  inside: Prism3.languages.markdown
                },
                punctuation: /\|/
              }
            }
          }
        },
        code: [
          {
            // Prefixed by 4 spaces or 1 tab and preceded by an empty line
            pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
            lookbehind: true,
            alias: "keyword"
          },
          {
            // ```optional language
            // code block
            // ```
            pattern: /^```[\s\S]*?^```$/m,
            greedy: true,
            inside: {
              "code-block": {
                pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
                lookbehind: true
              },
              "code-language": {
                pattern: /^(```).+/,
                lookbehind: true
              },
              punctuation: /```/
            }
          }
        ],
        title: [
          {
            // title 1
            // =======
            // title 2
            // -------
            pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
            alias: "important",
            inside: {
              punctuation: /==+$|--+$/
            }
          },
          {
            // # title 1
            // ###### title 6
            pattern: /(^\s*)#.+/m,
            lookbehind: true,
            alias: "important",
            inside: {
              punctuation: /^#+|#+$/
            }
          }
        ],
        hr: {
          // ***
          // ---
          // * * *
          // -----------
          pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
          lookbehind: true,
          alias: "punctuation"
        },
        list: {
          // * item
          // + item
          // - item
          // 1. item
          pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
          lookbehind: true,
          alias: "punctuation"
        },
        "url-reference": {
          // [id]: http://example.com "Optional title"
          // [id]: http://example.com 'Optional title'
          // [id]: http://example.com (Optional title)
          // [id]: <http://example.com> "Optional title"
          pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
          inside: {
            variable: {
              pattern: /^(!?\[)[^\]]+/,
              lookbehind: true
            },
            string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
            punctuation: /^[\[\]!:]|[<>]/
          },
          alias: "url"
        },
        bold: {
          // **strong**
          // __strong__
          // allow one nested instance of italic text using the same delimiter
          pattern: createInline(
            /\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            content: {
              pattern: /(^..)[\s\S]+(?=..$)/,
              lookbehind: true,
              inside: {}
              // see below
            },
            punctuation: /\*\*|__/
          }
        },
        italic: {
          // *em*
          // _em_
          // allow one nested instance of bold text using the same delimiter
          pattern: createInline(
            /\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            content: {
              pattern: /(^.)[\s\S]+(?=.$)/,
              lookbehind: true,
              inside: {}
              // see below
            },
            punctuation: /[*_]/
          }
        },
        strike: {
          // ~~strike through~~
          // ~strike~
          // eslint-disable-next-line regexp/strict
          pattern: createInline(/(~~?)(?:(?!~)<inner>)+\2/.source),
          lookbehind: true,
          greedy: true,
          inside: {
            content: {
              pattern: /(^~~?)[\s\S]+(?=\1$)/,
              lookbehind: true,
              inside: {}
              // see below
            },
            punctuation: /~~?/
          }
        },
        "code-snippet": {
          // `code`
          // ``code``
          pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
          lookbehind: true,
          greedy: true,
          alias: ["code", "keyword"]
        },
        url: {
          // [example](http://example.com "Optional title")
          // [example][id]
          // [example] [id]
          pattern: createInline(
            /!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            operator: /^!/,
            content: {
              pattern: /(^\[)[^\]]+(?=\])/,
              lookbehind: true,
              inside: {}
              // see below
            },
            variable: {
              pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
              lookbehind: true
            },
            url: {
              pattern: /(^\]\()[^\s)]+/,
              lookbehind: true
            },
            string: {
              pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
              lookbehind: true
            }
          }
        }
      });
      ["url", "bold", "italic", "strike"].forEach(function(token) {
        ["url", "bold", "italic", "strike", "code-snippet"].forEach(function(inside) {
          if (token !== inside) {
            Prism3.languages.markdown[token].inside.content.inside[inside] = Prism3.languages.markdown[inside];
          }
        });
      });
      Prism3.hooks.add("after-tokenize", function(env) {
        if (env.language !== "markdown" && env.language !== "md") {
          return;
        }
        function walkTokens(tokens) {
          if (!tokens || typeof tokens === "string") {
            return;
          }
          for (var i = 0, l = tokens.length; i < l; i++) {
            var token = tokens[i];
            if (token.type !== "code") {
              walkTokens(token.content);
              continue;
            }
            var codeLang = token.content[1];
            var codeBlock = token.content[3];
            if (codeLang && codeBlock && codeLang.type === "code-language" && codeBlock.type === "code-block" && typeof codeLang.content === "string") {
              var lang = codeLang.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp");
              lang = (/[a-z][\w-]*/i.exec(lang) || [""])[0].toLowerCase();
              var alias2 = "language-" + lang;
              if (!codeBlock.alias) {
                codeBlock.alias = [alias2];
              } else if (typeof codeBlock.alias === "string") {
                codeBlock.alias = [codeBlock.alias, alias2];
              } else {
                codeBlock.alias.push(alias2);
              }
            }
          }
        }
        walkTokens(env.tokens);
      });
      Prism3.hooks.add("wrap", function(env) {
        if (env.type !== "code-block") {
          return;
        }
        var codeLang = "";
        for (var i = 0, l = env.classes.length; i < l; i++) {
          var cls = env.classes[i];
          var match = /language-(.+)/.exec(cls);
          if (match) {
            codeLang = match[1];
            break;
          }
        }
        var grammar = Prism3.languages[codeLang];
        if (!grammar) {
          if (codeLang && codeLang !== "none" && Prism3.plugins.autoloader) {
            var id = "md-" + (/* @__PURE__ */ new Date()).valueOf() + "-" + Math.floor(Math.random() * 1e16);
            env.attributes["id"] = id;
            Prism3.plugins.autoloader.loadLanguages(codeLang, function() {
              var ele = document.getElementById(id);
              if (ele) {
                ele.innerHTML = Prism3.highlight(
                  ele.textContent,
                  Prism3.languages[codeLang],
                  codeLang
                );
              }
            });
          }
        } else {
          env.content = Prism3.highlight(
            textContent(env.content.value),
            grammar,
            codeLang
          );
        }
      });
      var tagPattern = RegExp(Prism3.languages.markup.tag.pattern.source, "gi");
      var KNOWN_ENTITY_NAMES = {
        amp: "&",
        lt: "<",
        gt: ">",
        quot: '"'
      };
      var fromCodePoint = String.fromCodePoint || String.fromCharCode;
      function textContent(html) {
        var text = html.replace(tagPattern, "");
        text = text.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function(m, code) {
          code = code.toLowerCase();
          if (code[0] === "#") {
            var value;
            if (code[1] === "x") {
              value = parseInt(code.slice(2), 16);
            } else {
              value = Number(code.slice(1));
            }
            return fromCodePoint(value);
          } else {
            var known = KNOWN_ENTITY_NAMES[code];
            if (known) {
              return known;
            }
            return m;
          }
        });
        return text;
      }
      Prism3.languages.md = Prism3.languages.markdown;
    })(Prism2);
  }
  return markdown_1;
}
var matlab_1;
var hasRequiredMatlab;
function requireMatlab() {
  if (hasRequiredMatlab) return matlab_1;
  hasRequiredMatlab = 1;
  matlab_1 = matlab;
  matlab.displayName = "matlab";
  matlab.aliases = [];
  function matlab(Prism2) {
    Prism2.languages.matlab = {
      comment: [/%\{[\s\S]*?\}%/, /%.+/],
      string: {
        pattern: /\B'(?:''|[^'\r\n])*'/,
        greedy: true
      },
      // FIXME We could handle imaginary numbers as a whole
      number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
      keyword: /\b(?:NaN|break|case|catch|continue|else|elseif|end|for|function|if|inf|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
      function: /\b(?!\d)\w+(?=\s*\()/,
      operator: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
      punctuation: /\.{3}|[.,;\[\](){}!]/
    };
  }
  return matlab_1;
}
var maxscript_1;
var hasRequiredMaxscript;
function requireMaxscript() {
  if (hasRequiredMaxscript) return maxscript_1;
  hasRequiredMaxscript = 1;
  maxscript_1 = maxscript;
  maxscript.displayName = "maxscript";
  maxscript.aliases = [];
  function maxscript(Prism2) {
    (function(Prism3) {
      var keywords = /\b(?:about|and|animate|as|at|attributes|by|case|catch|collect|continue|coordsys|do|else|exit|fn|for|from|function|global|if|in|local|macroscript|mapped|max|not|of|off|on|or|parameters|persistent|plugin|rcmenu|return|rollout|set|struct|then|throw|to|tool|try|undo|utility|when|where|while|with)\b/i;
      Prism3.languages.maxscript = {
        comment: {
          pattern: /\/\*[\s\S]*?(?:\*\/|$)|--.*/,
          greedy: true
        },
        string: {
          pattern: /(^|[^"\\@])(?:"(?:[^"\\]|\\[\s\S])*"|@"[^"]*")/,
          lookbehind: true,
          greedy: true
        },
        path: {
          pattern: /\$(?:[\w/\\.*?]|'[^']*')*/,
          greedy: true,
          alias: "string"
        },
        "function-call": {
          pattern: RegExp(
            "((?:" + // start of line
            (/^/.source + "|" + // operators and other language constructs
            /[;=<>+\-*/^({\[]/.source + "|" + // keywords as part of statements
            /\b(?:and|by|case|catch|collect|do|else|if|in|not|or|return|then|to|try|where|while|with)\b/.source) + ")[ 	]*)(?!" + keywords.source + ")" + /[a-z_]\w*\b/.source + "(?=[ 	]*(?:" + // variable
            ("(?!" + keywords.source + ")" + /[a-z_]/.source + "|" + // number
            /\d|-\.?\d/.source + "|" + // other expressions or literals
            /[({'"$@#?]/.source) + "))",
            "im"
          ),
          lookbehind: true,
          greedy: true,
          alias: "function"
        },
        "function-definition": {
          pattern: /(\b(?:fn|function)\s+)\w+\b/i,
          lookbehind: true,
          alias: "function"
        },
        argument: {
          pattern: /\b[a-z_]\w*(?=:)/i,
          alias: "attr-name"
        },
        keyword: keywords,
        boolean: /\b(?:false|true)\b/,
        time: {
          pattern: /(^|[^\w.])(?:(?:(?:\d+(?:\.\d*)?|\.\d+)(?:[eEdD][+-]\d+|[LP])?[msft])+|\d+:\d+(?:\.\d*)?)(?![\w.:])/,
          lookbehind: true,
          alias: "number"
        },
        number: [
          {
            pattern: /(^|[^\w.])(?:(?:\d+(?:\.\d*)?|\.\d+)(?:[eEdD][+-]\d+|[LP])?|0x[a-fA-F0-9]+)(?![\w.:])/,
            lookbehind: true
          },
          /\b(?:e|pi)\b/
        ],
        constant: /\b(?:dontcollect|ok|silentValue|undefined|unsupplied)\b/,
        color: {
          pattern: /\b(?:black|blue|brown|gray|green|orange|red|white|yellow)\b/i,
          alias: "constant"
        },
        operator: /[-+*/<>=!]=?|[&^?]|#(?!\()/,
        punctuation: /[()\[\]{}.:,;]|#(?=\()|\\$/m
      };
    })(Prism2);
  }
  return maxscript_1;
}
var mel_1;
var hasRequiredMel;
function requireMel() {
  if (hasRequiredMel) return mel_1;
  hasRequiredMel = 1;
  mel_1 = mel;
  mel.displayName = "mel";
  mel.aliases = [];
  function mel(Prism2) {
    Prism2.languages.mel = {
      comment: /\/\/.*/,
      code: {
        pattern: /`(?:\\.|[^\\`\r\n])*`/,
        greedy: true,
        alias: "italic",
        inside: {
          delimiter: {
            pattern: /^`|`$/,
            alias: "punctuation"
          }
          // See rest below
        }
      },
      string: {
        pattern: /"(?:\\.|[^\\"\r\n])*"/,
        greedy: true
      },
      variable: /\$\w+/,
      number: /\b0x[\da-fA-F]+\b|\b\d+(?:\.\d*)?|\B\.\d+/,
      flag: {
        pattern: /-[^\d\W]\w*/,
        alias: "operator"
      },
      keyword: /\b(?:break|case|continue|default|do|else|float|for|global|if|in|int|matrix|proc|return|string|switch|vector|while)\b/,
      function: /\b\w+(?=\()|\b(?:CBG|HfAddAttractorToAS|HfAssignAS|HfBuildEqualMap|HfBuildFurFiles|HfBuildFurImages|HfCancelAFR|HfConnectASToHF|HfCreateAttractor|HfDeleteAS|HfEditAS|HfPerformCreateAS|HfRemoveAttractorFromAS|HfSelectAttached|HfSelectAttractors|HfUnAssignAS|Mayatomr|about|abs|addAttr|addAttributeEditorNodeHelp|addDynamic|addNewShelfTab|addPP|addPanelCategory|addPrefixToName|advanceToNextDrivenKey|affectedNet|affects|aimConstraint|air|alias|aliasAttr|align|alignCtx|alignCurve|alignSurface|allViewFit|ambientLight|angle|angleBetween|animCone|animCurveEditor|animDisplay|animView|annotate|appendStringArray|applicationName|applyAttrPreset|applyTake|arcLenDimContext|arcLengthDimension|arclen|arrayMapper|art3dPaintCtx|artAttrCtx|artAttrPaintVertexCtx|artAttrSkinPaintCtx|artAttrTool|artBuildPaintMenu|artFluidAttrCtx|artPuttyCtx|artSelectCtx|artSetPaintCtx|artUserPaintCtx|assignCommand|assignInputDevice|assignViewportFactories|attachCurve|attachDeviceAttr|attachSurface|attrColorSliderGrp|attrCompatibility|attrControlGrp|attrEnumOptionMenu|attrEnumOptionMenuGrp|attrFieldGrp|attrFieldSliderGrp|attrNavigationControlGrp|attrPresetEditWin|attributeExists|attributeInfo|attributeMenu|attributeQuery|autoKeyframe|autoPlace|bakeClip|bakeFluidShading|bakePartialHistory|bakeResults|bakeSimulation|basename|basenameEx|batchRender|bessel|bevel|bevelPlus|binMembership|bindSkin|blend2|blendShape|blendShapeEditor|blendShapePanel|blendTwoAttr|blindDataType|boneLattice|boundary|boxDollyCtx|boxZoomCtx|bufferCurve|buildBookmarkMenu|buildKeyframeMenu|button|buttonManip|cacheFile|cacheFileCombine|cacheFileMerge|cacheFileTrack|camera|cameraView|canCreateManip|canvas|capitalizeString|catch|catchQuiet|ceil|changeSubdivComponentDisplayLevel|changeSubdivRegion|channelBox|character|characterMap|characterOutlineEditor|characterize|chdir|checkBox|checkBoxGrp|checkDefaultRenderGlobals|choice|circle|circularFillet|clamp|clear|clearCache|clip|clipEditor|clipEditorCurrentTimeCtx|clipSchedule|clipSchedulerOutliner|clipTrimBefore|closeCurve|closeSurface|cluster|cmdFileOutput|cmdScrollFieldExecuter|cmdScrollFieldReporter|cmdShell|coarsenSubdivSelectionList|collision|color|colorAtPoint|colorEditor|colorIndex|colorIndexSliderGrp|colorSliderButtonGrp|colorSliderGrp|columnLayout|commandEcho|commandLine|commandPort|compactHairSystem|componentEditor|compositingInterop|computePolysetVolume|condition|cone|confirmDialog|connectAttr|connectControl|connectDynamic|connectJoint|connectionInfo|constrain|constrainValue|constructionHistory|container|containsMultibyte|contextInfo|control|convertFromOldLayers|convertIffToPsd|convertLightmap|convertSolidTx|convertTessellation|convertUnit|copyArray|copyFlexor|copyKey|copySkinWeights|cos|cpButton|cpCache|cpClothSet|cpCollision|cpConstraint|cpConvClothToMesh|cpForces|cpGetSolverAttr|cpPanel|cpProperty|cpRigidCollisionFilter|cpSeam|cpSetEdit|cpSetSolverAttr|cpSolver|cpSolverTypes|cpTool|cpUpdateClothUVs|createDisplayLayer|createDrawCtx|createEditor|createLayeredPsdFile|createMotionField|createNewShelf|createNode|createRenderLayer|createSubdivRegion|cross|crossProduct|ctxAbort|ctxCompletion|ctxEditMode|ctxTraverse|currentCtx|currentTime|currentTimeCtx|currentUnit|curve|curveAddPtCtx|curveCVCtx|curveEPCtx|curveEditorCtx|curveIntersect|curveMoveEPCtx|curveOnSurface|curveSketchCtx|cutKey|cycleCheck|cylinder|dagPose|date|defaultLightListCheckBox|defaultNavigation|defineDataServer|defineVirtualDevice|deformer|deg_to_rad|delete|deleteAttr|deleteShadingGroupsAndMaterials|deleteShelfTab|deleteUI|deleteUnusedBrushes|delrandstr|detachCurve|detachDeviceAttr|detachSurface|deviceEditor|devicePanel|dgInfo|dgdirty|dgeval|dgtimer|dimWhen|directKeyCtx|directionalLight|dirmap|dirname|disable|disconnectAttr|disconnectJoint|diskCache|displacementToPoly|displayAffected|displayColor|displayCull|displayLevelOfDetail|displayPref|displayRGBColor|displaySmoothness|displayStats|displayString|displaySurface|distanceDimContext|distanceDimension|doBlur|dolly|dollyCtx|dopeSheetEditor|dot|dotProduct|doubleProfileBirailSurface|drag|dragAttrContext|draggerContext|dropoffLocator|duplicate|duplicateCurve|duplicateSurface|dynCache|dynControl|dynExport|dynExpression|dynGlobals|dynPaintEditor|dynParticleCtx|dynPref|dynRelEdPanel|dynRelEditor|dynamicLoad|editAttrLimits|editDisplayLayerGlobals|editDisplayLayerMembers|editRenderLayerAdjustment|editRenderLayerGlobals|editRenderLayerMembers|editor|editorTemplate|effector|emit|emitter|enableDevice|encodeString|endString|endsWith|env|equivalent|equivalentTol|erf|error|eval|evalDeferred|evalEcho|event|exactWorldBoundingBox|exclusiveLightCheckBox|exec|executeForEachObject|exists|exp|expression|expressionEditorListen|extendCurve|extendSurface|extrude|fcheck|fclose|feof|fflush|fgetline|fgetword|file|fileBrowserDialog|fileDialog|fileExtension|fileInfo|filetest|filletCurve|filter|filterCurve|filterExpand|filterStudioImport|findAllIntersections|findAnimCurves|findKeyframe|findMenuItem|findRelatedSkinCluster|finder|firstParentOf|fitBspline|flexor|floatEq|floatField|floatFieldGrp|floatScrollBar|floatSlider|floatSlider2|floatSliderButtonGrp|floatSliderGrp|floor|flow|fluidCacheInfo|fluidEmitter|fluidVoxelInfo|flushUndo|fmod|fontDialog|fopen|formLayout|format|fprint|frameLayout|fread|freeFormFillet|frewind|fromNativePath|fwrite|gamma|gauss|geometryConstraint|getApplicationVersionAsFloat|getAttr|getClassification|getDefaultBrush|getFileList|getFluidAttr|getInputDeviceRange|getMayaPanelTypes|getModifiers|getPanel|getParticleAttr|getPluginResource|getenv|getpid|glRender|glRenderEditor|globalStitch|gmatch|goal|gotoBindPose|grabColor|gradientControl|gradientControlNoAttr|graphDollyCtx|graphSelectContext|graphTrackCtx|gravity|grid|gridLayout|group|groupObjectsByName|hardenPointCurve|hardware|hardwareRenderPanel|headsUpDisplay|headsUpMessage|help|helpLine|hermite|hide|hilite|hitTest|hotBox|hotkey|hotkeyCheck|hsv_to_rgb|hudButton|hudSlider|hudSliderButton|hwReflectionMap|hwRender|hwRenderLoad|hyperGraph|hyperPanel|hyperShade|hypot|iconTextButton|iconTextCheckBox|iconTextRadioButton|iconTextRadioCollection|iconTextScrollList|iconTextStaticLabel|ikHandle|ikHandleCtx|ikHandleDisplayScale|ikSolver|ikSplineHandleCtx|ikSystem|ikSystemInfo|ikfkDisplayMethod|illustratorCurves|image|imfPlugins|inheritTransform|insertJoint|insertJointCtx|insertKeyCtx|insertKnotCurve|insertKnotSurface|instance|instanceable|instancer|intField|intFieldGrp|intScrollBar|intSlider|intSliderGrp|interToUI|internalVar|intersect|iprEngine|isAnimCurve|isConnected|isDirty|isParentOf|isSameObject|isTrue|isValidObjectName|isValidString|isValidUiName|isolateSelect|itemFilter|itemFilterAttr|itemFilterRender|itemFilterType|joint|jointCluster|jointCtx|jointDisplayScale|jointLattice|keyTangent|keyframe|keyframeOutliner|keyframeRegionCurrentTimeCtx|keyframeRegionDirectKeyCtx|keyframeRegionDollyCtx|keyframeRegionInsertKeyCtx|keyframeRegionMoveKeyCtx|keyframeRegionScaleKeyCtx|keyframeRegionSelectKeyCtx|keyframeRegionSetKeyCtx|keyframeRegionTrackCtx|keyframeStats|lassoContext|lattice|latticeDeformKeyCtx|launch|launchImageEditor|layerButton|layeredShaderPort|layeredTexturePort|layout|layoutDialog|lightList|lightListEditor|lightListPanel|lightlink|lineIntersection|linearPrecision|linstep|listAnimatable|listAttr|listCameras|listConnections|listDeviceAttachments|listHistory|listInputDeviceAxes|listInputDeviceButtons|listInputDevices|listMenuAnnotation|listNodeTypes|listPanelCategories|listRelatives|listSets|listTransforms|listUnselected|listerEditor|loadFluid|loadNewShelf|loadPlugin|loadPluginLanguageResources|loadPrefObjects|localizedPanelLabel|lockNode|loft|log|longNameOf|lookThru|ls|lsThroughFilter|lsType|lsUI|mag|makeIdentity|makeLive|makePaintable|makeRoll|makeSingleSurface|makeTubeOn|makebot|manipMoveContext|manipMoveLimitsCtx|manipOptions|manipRotateContext|manipRotateLimitsCtx|manipScaleContext|manipScaleLimitsCtx|marker|match|max|memory|menu|menuBarLayout|menuEditor|menuItem|menuItemToShelf|menuSet|menuSetPref|messageLine|min|minimizeApp|mirrorJoint|modelCurrentTimeCtx|modelEditor|modelPanel|mouse|movIn|movOut|move|moveIKtoFK|moveKeyCtx|moveVertexAlongDirection|multiProfileBirailSurface|mute|nParticle|nameCommand|nameField|namespace|namespaceInfo|newPanelItems|newton|nodeCast|nodeIconButton|nodeOutliner|nodePreset|nodeType|noise|nonLinear|normalConstraint|normalize|nurbsBoolean|nurbsCopyUVSet|nurbsCube|nurbsEditUV|nurbsPlane|nurbsSelect|nurbsSquare|nurbsToPoly|nurbsToPolygonsPref|nurbsToSubdiv|nurbsToSubdivPref|nurbsUVSet|nurbsViewDirectionVector|objExists|objectCenter|objectLayer|objectType|objectTypeUI|obsoleteProc|oceanNurbsPreviewPlane|offsetCurve|offsetCurveOnSurface|offsetSurface|openGLExtension|openMayaPref|optionMenu|optionMenuGrp|optionVar|orbit|orbitCtx|orientConstraint|outlinerEditor|outlinerPanel|overrideModifier|paintEffectsDisplay|pairBlend|palettePort|paneLayout|panel|panelConfiguration|panelHistory|paramDimContext|paramDimension|paramLocator|parent|parentConstraint|particle|particleExists|particleInstancer|particleRenderInfo|partition|pasteKey|pathAnimation|pause|pclose|percent|performanceOptions|pfxstrokes|pickWalk|picture|pixelMove|planarSrf|plane|play|playbackOptions|playblast|plugAttr|plugNode|pluginInfo|pluginResourceUtil|pointConstraint|pointCurveConstraint|pointLight|pointMatrixMult|pointOnCurve|pointOnSurface|pointPosition|poleVectorConstraint|polyAppend|polyAppendFacetCtx|polyAppendVertex|polyAutoProjection|polyAverageNormal|polyAverageVertex|polyBevel|polyBlendColor|polyBlindData|polyBoolOp|polyBridgeEdge|polyCacheMonitor|polyCheck|polyChipOff|polyClipboard|polyCloseBorder|polyCollapseEdge|polyCollapseFacet|polyColorBlindData|polyColorDel|polyColorPerVertex|polyColorSet|polyCompare|polyCone|polyCopyUV|polyCrease|polyCreaseCtx|polyCreateFacet|polyCreateFacetCtx|polyCube|polyCut|polyCutCtx|polyCylinder|polyCylindricalProjection|polyDelEdge|polyDelFacet|polyDelVertex|polyDuplicateAndConnect|polyDuplicateEdge|polyEditUV|polyEditUVShell|polyEvaluate|polyExtrudeEdge|polyExtrudeFacet|polyExtrudeVertex|polyFlipEdge|polyFlipUV|polyForceUV|polyGeoSampler|polyHelix|polyInfo|polyInstallAction|polyLayoutUV|polyListComponentConversion|polyMapCut|polyMapDel|polyMapSew|polyMapSewMove|polyMergeEdge|polyMergeEdgeCtx|polyMergeFacet|polyMergeFacetCtx|polyMergeUV|polyMergeVertex|polyMirrorFace|polyMoveEdge|polyMoveFacet|polyMoveFacetUV|polyMoveUV|polyMoveVertex|polyNormal|polyNormalPerVertex|polyNormalizeUV|polyOptUvs|polyOptions|polyOutput|polyPipe|polyPlanarProjection|polyPlane|polyPlatonicSolid|polyPoke|polyPrimitive|polyPrism|polyProjection|polyPyramid|polyQuad|polyQueryBlindData|polyReduce|polySelect|polySelectConstraint|polySelectConstraintMonitor|polySelectCtx|polySelectEditCtx|polySeparate|polySetToFaceNormal|polySewEdge|polyShortestPathCtx|polySmooth|polySoftEdge|polySphere|polySphericalProjection|polySplit|polySplitCtx|polySplitEdge|polySplitRing|polySplitVertex|polyStraightenUVBorder|polySubdivideEdge|polySubdivideFacet|polyToSubdiv|polyTorus|polyTransfer|polyTriangulate|polyUVSet|polyUnite|polyWedgeFace|popen|popupMenu|pose|pow|preloadRefEd|print|progressBar|progressWindow|projFileViewer|projectCurve|projectTangent|projectionContext|projectionManip|promptDialog|propModCtx|propMove|psdChannelOutliner|psdEditTextureFile|psdExport|psdTextureFile|putenv|pwd|python|querySubdiv|quit|rad_to_deg|radial|radioButton|radioButtonGrp|radioCollection|radioMenuItemCollection|rampColorPort|rand|randomizeFollicles|randstate|rangeControl|readTake|rebuildCurve|rebuildSurface|recordAttr|recordDevice|redo|reference|referenceEdit|referenceQuery|refineSubdivSelectionList|refresh|refreshAE|registerPluginResource|rehash|reloadImage|removeJoint|removeMultiInstance|removePanelCategory|rename|renameAttr|renameSelectionList|renameUI|render|renderGlobalsNode|renderInfo|renderLayerButton|renderLayerParent|renderLayerPostProcess|renderLayerUnparent|renderManip|renderPartition|renderQualityNode|renderSettings|renderThumbnailUpdate|renderWindowEditor|renderWindowSelectContext|renderer|reorder|reorderDeformers|requires|reroot|resampleFluid|resetAE|resetPfxToPolyCamera|resetTool|resolutionNode|retarget|reverseCurve|reverseSurface|revolve|rgb_to_hsv|rigidBody|rigidSolver|roll|rollCtx|rootOf|rot|rotate|rotationInterpolation|roundConstantRadius|rowColumnLayout|rowLayout|runTimeCommand|runup|sampleImage|saveAllShelves|saveAttrPreset|saveFluid|saveImage|saveInitialState|saveMenu|savePrefObjects|savePrefs|saveShelf|saveToolSettings|scale|scaleBrushBrightness|scaleComponents|scaleConstraint|scaleKey|scaleKeyCtx|sceneEditor|sceneUIReplacement|scmh|scriptCtx|scriptEditorInfo|scriptJob|scriptNode|scriptTable|scriptToShelf|scriptedPanel|scriptedPanelType|scrollField|scrollLayout|sculpt|searchPathArray|seed|selLoadSettings|select|selectContext|selectCurveCV|selectKey|selectKeyCtx|selectKeyframeRegionCtx|selectMode|selectPref|selectPriority|selectType|selectedNodes|selectionConnection|separator|setAttr|setAttrEnumResource|setAttrMapping|setAttrNiceNameResource|setConstraintRestPosition|setDefaultShadingGroup|setDrivenKeyframe|setDynamic|setEditCtx|setEditor|setFluidAttr|setFocus|setInfinity|setInputDeviceMapping|setKeyCtx|setKeyPath|setKeyframe|setKeyframeBlendshapeTargetWts|setMenuMode|setNodeNiceNameResource|setNodeTypeFlag|setParent|setParticleAttr|setPfxToPolyCamera|setPluginResource|setProject|setStampDensity|setStartupMessage|setState|setToolTo|setUITemplate|setXformManip|sets|shadingConnection|shadingGeometryRelCtx|shadingLightRelCtx|shadingNetworkCompare|shadingNode|shapeCompare|shelfButton|shelfLayout|shelfTabLayout|shellField|shortNameOf|showHelp|showHidden|showManipCtx|showSelectionInTitle|showShadingGroupAttrEditor|showWindow|sign|simplify|sin|singleProfileBirailSurface|size|sizeBytes|skinCluster|skinPercent|smoothCurve|smoothTangentSurface|smoothstep|snap2to2|snapKey|snapMode|snapTogetherCtx|snapshot|soft|softMod|softModCtx|sort|sound|soundControl|source|spaceLocator|sphere|sphrand|spotLight|spotLightPreviewPort|spreadSheetEditor|spring|sqrt|squareSurface|srtContext|stackTrace|startString|startsWith|stitchAndExplodeShell|stitchSurface|stitchSurfacePoints|strcmp|stringArrayCatenate|stringArrayContains|stringArrayCount|stringArrayInsertAtIndex|stringArrayIntersector|stringArrayRemove|stringArrayRemoveAtIndex|stringArrayRemoveDuplicates|stringArrayRemoveExact|stringArrayToString|stringToStringArray|strip|stripPrefixFromName|stroke|subdAutoProjection|subdCleanTopology|subdCollapse|subdDuplicateAndConnect|subdEditUV|subdListComponentConversion|subdMapCut|subdMapSewMove|subdMatchTopology|subdMirror|subdToBlind|subdToPoly|subdTransferUVsToCache|subdiv|subdivCrease|subdivDisplaySmoothness|substitute|substituteAllString|substituteGeometry|substring|surface|surfaceSampler|surfaceShaderList|swatchDisplayPort|switchTable|symbolButton|symbolCheckBox|sysFile|system|tabLayout|tan|tangentConstraint|texLatticeDeformContext|texManipContext|texMoveContext|texMoveUVShellContext|texRotateContext|texScaleContext|texSelectContext|texSelectShortestPathCtx|texSmudgeUVContext|texWinToolCtx|text|textCurves|textField|textFieldButtonGrp|textFieldGrp|textManip|textScrollList|textToShelf|textureDisplacePlane|textureHairColor|texturePlacementContext|textureWindow|threadCount|threePointArcCtx|timeControl|timePort|timerX|toNativePath|toggle|toggleAxis|toggleWindowVisibility|tokenize|tokenizeList|tolerance|tolower|toolButton|toolCollection|toolDropped|toolHasOptions|toolPropertyWindow|torus|toupper|trace|track|trackCtx|transferAttributes|transformCompare|transformLimits|translator|trim|trunc|truncateFluidCache|truncateHairCache|tumble|tumbleCtx|turbulence|twoPointArcCtx|uiRes|uiTemplate|unassignInputDevice|undo|undoInfo|ungroup|uniform|unit|unloadPlugin|untangleUV|untitledFileName|untrim|upAxis|updateAE|userCtx|uvLink|uvSnapshot|validateShelfName|vectorize|view2dToolCtx|viewCamera|viewClipPlane|viewFit|viewHeadOn|viewLookAt|viewManip|viewPlace|viewSet|visor|volumeAxis|vortex|waitCursor|warning|webBrowser|webBrowserPrefs|whatIs|window|windowPref|wire|wireContext|workspace|wrinkle|wrinkleContext|writeTake|xbmLangPathList|xform)\b/,
      operator: [
        /\+[+=]?|-[-=]?|&&|\|\||[<>]=|[*\/!=]=?|[%^]/,
        {
          // We don't want to match <<
          pattern: /(^|[^<])<(?!<)/,
          lookbehind: true
        },
        {
          // We don't want to match >>
          pattern: /(^|[^>])>(?!>)/,
          lookbehind: true
        }
      ],
      punctuation: /<<|>>|[.,:;?\[\](){}]/
    };
    Prism2.languages.mel["code"].inside.rest = Prism2.languages.mel;
  }
  return mel_1;
}
var mermaid_1;
var hasRequiredMermaid;
function requireMermaid() {
  if (hasRequiredMermaid) return mermaid_1;
  hasRequiredMermaid = 1;
  mermaid_1 = mermaid;
  mermaid.displayName = "mermaid";
  mermaid.aliases = [];
  function mermaid(Prism2) {
    Prism2.languages.mermaid = {
      comment: {
        pattern: /%%.*/,
        greedy: true
      },
      style: {
        pattern: /^([ \t]*(?:classDef|linkStyle|style)[ \t]+[\w$-]+[ \t]+)\w.*[^\s;]/m,
        lookbehind: true,
        inside: {
          property: /\b\w[\w-]*(?=[ \t]*:)/,
          operator: /:/,
          punctuation: /,/
        }
      },
      "inter-arrow-label": {
        pattern: /([^<>ox.=-])(?:-[-.]|==)(?![<>ox.=-])[ \t]*(?:"[^"\r\n]*"|[^\s".=-](?:[^\r\n.=-]*[^\s.=-])?)[ \t]*(?:\.+->?|--+[->]|==+[=>])(?![<>ox.=-])/,
        lookbehind: true,
        greedy: true,
        inside: {
          arrow: {
            pattern: /(?:\.+->?|--+[->]|==+[=>])$/,
            alias: "operator"
          },
          label: {
            pattern: /^([\s\S]{2}[ \t]*)\S(?:[\s\S]*\S)?/,
            lookbehind: true,
            alias: "property"
          },
          "arrow-head": {
            pattern: /^\S+/,
            alias: ["arrow", "operator"]
          }
        }
      },
      arrow: [
        // This might look complex but it really isn't.
        // There are many possible arrows (see tests) and it's impossible to fit all of them into one pattern. The
        // problem is that we only have one lookbehind per pattern. However, we cannot disallow too many arrow
        // characters in the one lookbehind because that would create too many false negatives. So we have to split the
        // arrows into different patterns.
        {
          // ER diagram
          pattern: /(^|[^{}|o.-])[|}][|o](?:--|\.\.)[|o][|{](?![{}|o.-])/,
          lookbehind: true,
          alias: "operator"
        },
        {
          // flow chart
          // (?:==+|--+|-\.*-)
          pattern: /(^|[^<>ox.=-])(?:[<ox](?:==+|--+|-\.*-)[>ox]?|(?:==+|--+|-\.*-)[>ox]|===+|---+|-\.+-)(?![<>ox.=-])/,
          lookbehind: true,
          alias: "operator"
        },
        {
          // sequence diagram
          pattern: /(^|[^<>()x-])(?:--?(?:>>|[x>)])(?![<>()x])|(?:<<|[x<(])--?(?!-))/,
          lookbehind: true,
          alias: "operator"
        },
        {
          // class diagram
          pattern: /(^|[^<>|*o.-])(?:[*o]--|--[*o]|<\|?(?:--|\.\.)|(?:--|\.\.)\|?>|--|\.\.)(?![<>|*o.-])/,
          lookbehind: true,
          alias: "operator"
        }
      ],
      label: {
        pattern: /(^|[^|<])\|(?:[^\r\n"|]|"[^"\r\n]*")+\|/,
        lookbehind: true,
        greedy: true,
        alias: "property"
      },
      text: {
        pattern: /(?:[(\[{]+|\b>)(?:[^\r\n"()\[\]{}]|"[^"\r\n]*")+(?:[)\]}]+|>)/,
        alias: "string"
      },
      string: {
        pattern: /"[^"\r\n]*"/,
        greedy: true
      },
      annotation: {
        pattern: /<<(?:abstract|choice|enumeration|fork|interface|join|service)>>|\[\[(?:choice|fork|join)\]\]/i,
        alias: "important"
      },
      keyword: [
        // This language has both case-sensitive and case-insensitive keywords
        {
          pattern: /(^[ \t]*)(?:action|callback|class|classDef|classDiagram|click|direction|erDiagram|flowchart|gantt|gitGraph|graph|journey|link|linkStyle|pie|requirementDiagram|sequenceDiagram|stateDiagram|stateDiagram-v2|style|subgraph)(?![\w$-])/m,
          lookbehind: true,
          greedy: true
        },
        {
          pattern: /(^[ \t]*)(?:activate|alt|and|as|autonumber|deactivate|else|end(?:[ \t]+note)?|loop|opt|par|participant|rect|state|note[ \t]+(?:over|(?:left|right)[ \t]+of))(?![\w$-])/im,
          lookbehind: true,
          greedy: true
        }
      ],
      entity: /#[a-z0-9]+;/,
      operator: {
        pattern: /(\w[ \t]*)&(?=[ \t]*\w)|:::|:/,
        lookbehind: true
      },
      punctuation: /[(){};]/
    };
  }
  return mermaid_1;
}
var mizar_1;
var hasRequiredMizar;
function requireMizar() {
  if (hasRequiredMizar) return mizar_1;
  hasRequiredMizar = 1;
  mizar_1 = mizar;
  mizar.displayName = "mizar";
  mizar.aliases = [];
  function mizar(Prism2) {
    Prism2.languages.mizar = {
      comment: /::.+/,
      keyword: /@proof\b|\b(?:according|aggregate|all|and|antonym|are|as|associativity|assume|asymmetry|attr|be|begin|being|by|canceled|case|cases|clusters?|coherence|commutativity|compatibility|connectedness|consider|consistency|constructors|contradiction|correctness|def|deffunc|define|definitions?|defpred|do|does|end|environ|equals|ex|exactly|existence|for|from|func|given|hence|hereby|holds|idempotence|identity|iff?|implies|involutiveness|irreflexivity|is|it|let|means|mode|non|not|notations?|now|of|or|otherwise|over|per|pred|prefix|projectivity|proof|provided|qua|reconsider|redefine|reduce|reducibility|reflexivity|registrations?|requirements|reserve|sch|schemes?|section|selector|set|sethood|st|struct|such|suppose|symmetry|synonym|take|that|the|then|theorems?|thesis|thus|to|transitivity|uniqueness|vocabular(?:ies|y)|when|where|with|wrt)\b/,
      parameter: {
        pattern: /\$(?:10|\d)/,
        alias: "variable"
      },
      variable: /\b\w+(?=:)/,
      number: /(?:\b|-)\d+\b/,
      operator: /\.\.\.|->|&|\.?=/,
      punctuation: /\(#|#\)|[,:;\[\](){}]/
    };
  }
  return mizar_1;
}
var mongodb_1;
var hasRequiredMongodb;
function requireMongodb() {
  if (hasRequiredMongodb) return mongodb_1;
  hasRequiredMongodb = 1;
  mongodb_1 = mongodb;
  mongodb.displayName = "mongodb";
  mongodb.aliases = [];
  function mongodb(Prism2) {
    (function(Prism3) {
      var operators = [
        // query and projection
        "$eq",
        "$gt",
        "$gte",
        "$in",
        "$lt",
        "$lte",
        "$ne",
        "$nin",
        "$and",
        "$not",
        "$nor",
        "$or",
        "$exists",
        "$type",
        "$expr",
        "$jsonSchema",
        "$mod",
        "$regex",
        "$text",
        "$where",
        "$geoIntersects",
        "$geoWithin",
        "$near",
        "$nearSphere",
        "$all",
        "$elemMatch",
        "$size",
        "$bitsAllClear",
        "$bitsAllSet",
        "$bitsAnyClear",
        "$bitsAnySet",
        "$comment",
        "$elemMatch",
        "$meta",
        "$slice",
        // update
        "$currentDate",
        "$inc",
        "$min",
        "$max",
        "$mul",
        "$rename",
        "$set",
        "$setOnInsert",
        "$unset",
        "$addToSet",
        "$pop",
        "$pull",
        "$push",
        "$pullAll",
        "$each",
        "$position",
        "$slice",
        "$sort",
        "$bit",
        // aggregation pipeline stages
        "$addFields",
        "$bucket",
        "$bucketAuto",
        "$collStats",
        "$count",
        "$currentOp",
        "$facet",
        "$geoNear",
        "$graphLookup",
        "$group",
        "$indexStats",
        "$limit",
        "$listLocalSessions",
        "$listSessions",
        "$lookup",
        "$match",
        "$merge",
        "$out",
        "$planCacheStats",
        "$project",
        "$redact",
        "$replaceRoot",
        "$replaceWith",
        "$sample",
        "$set",
        "$skip",
        "$sort",
        "$sortByCount",
        "$unionWith",
        "$unset",
        "$unwind",
        "$setWindowFields",
        // aggregation pipeline operators
        "$abs",
        "$accumulator",
        "$acos",
        "$acosh",
        "$add",
        "$addToSet",
        "$allElementsTrue",
        "$and",
        "$anyElementTrue",
        "$arrayElemAt",
        "$arrayToObject",
        "$asin",
        "$asinh",
        "$atan",
        "$atan2",
        "$atanh",
        "$avg",
        "$binarySize",
        "$bsonSize",
        "$ceil",
        "$cmp",
        "$concat",
        "$concatArrays",
        "$cond",
        "$convert",
        "$cos",
        "$dateFromParts",
        "$dateToParts",
        "$dateFromString",
        "$dateToString",
        "$dayOfMonth",
        "$dayOfWeek",
        "$dayOfYear",
        "$degreesToRadians",
        "$divide",
        "$eq",
        "$exp",
        "$filter",
        "$first",
        "$floor",
        "$function",
        "$gt",
        "$gte",
        "$hour",
        "$ifNull",
        "$in",
        "$indexOfArray",
        "$indexOfBytes",
        "$indexOfCP",
        "$isArray",
        "$isNumber",
        "$isoDayOfWeek",
        "$isoWeek",
        "$isoWeekYear",
        "$last",
        "$last",
        "$let",
        "$literal",
        "$ln",
        "$log",
        "$log10",
        "$lt",
        "$lte",
        "$ltrim",
        "$map",
        "$max",
        "$mergeObjects",
        "$meta",
        "$min",
        "$millisecond",
        "$minute",
        "$mod",
        "$month",
        "$multiply",
        "$ne",
        "$not",
        "$objectToArray",
        "$or",
        "$pow",
        "$push",
        "$radiansToDegrees",
        "$range",
        "$reduce",
        "$regexFind",
        "$regexFindAll",
        "$regexMatch",
        "$replaceOne",
        "$replaceAll",
        "$reverseArray",
        "$round",
        "$rtrim",
        "$second",
        "$setDifference",
        "$setEquals",
        "$setIntersection",
        "$setIsSubset",
        "$setUnion",
        "$size",
        "$sin",
        "$slice",
        "$split",
        "$sqrt",
        "$stdDevPop",
        "$stdDevSamp",
        "$strcasecmp",
        "$strLenBytes",
        "$strLenCP",
        "$substr",
        "$substrBytes",
        "$substrCP",
        "$subtract",
        "$sum",
        "$switch",
        "$tan",
        "$toBool",
        "$toDate",
        "$toDecimal",
        "$toDouble",
        "$toInt",
        "$toLong",
        "$toObjectId",
        "$toString",
        "$toLower",
        "$toUpper",
        "$trim",
        "$trunc",
        "$type",
        "$week",
        "$year",
        "$zip",
        "$count",
        "$dateAdd",
        "$dateDiff",
        "$dateSubtract",
        "$dateTrunc",
        "$getField",
        "$rand",
        "$sampleRate",
        "$setField",
        "$unsetField",
        // aggregation pipeline query modifiers
        "$comment",
        "$explain",
        "$hint",
        "$max",
        "$maxTimeMS",
        "$min",
        "$orderby",
        "$query",
        "$returnKey",
        "$showDiskLoc",
        "$natural"
      ];
      var builtinFunctions = [
        "ObjectId",
        "Code",
        "BinData",
        "DBRef",
        "Timestamp",
        "NumberLong",
        "NumberDecimal",
        "MaxKey",
        "MinKey",
        "RegExp",
        "ISODate",
        "UUID"
      ];
      operators = operators.map(function(operator) {
        return operator.replace("$", "\\$");
      });
      var operatorsSource = "(?:" + operators.join("|") + ")\\b";
      Prism3.languages.mongodb = Prism3.languages.extend("javascript", {});
      Prism3.languages.insertBefore("mongodb", "string", {
        property: {
          pattern: /(?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)(?=\s*:)/,
          greedy: true,
          inside: {
            keyword: RegExp(`^(['"])?` + operatorsSource + "(?:\\1)?$")
          }
        }
      });
      Prism3.languages.mongodb.string.inside = {
        url: {
          // url pattern
          pattern: /https?:\/\/[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b[-\w()@:%+.~#?&/=]*/i,
          greedy: true
        },
        entity: {
          // ipv4
          pattern: /\b(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d\d?|2[0-4]\d|25[0-5])\b/,
          greedy: true
        }
      };
      Prism3.languages.insertBefore("mongodb", "constant", {
        builtin: {
          pattern: RegExp("\\b(?:" + builtinFunctions.join("|") + ")\\b"),
          alias: "keyword"
        }
      });
    })(Prism2);
  }
  return mongodb_1;
}
var monkey_1;
var hasRequiredMonkey;
function requireMonkey() {
  if (hasRequiredMonkey) return monkey_1;
  hasRequiredMonkey = 1;
  monkey_1 = monkey;
  monkey.displayName = "monkey";
  monkey.aliases = [];
  function monkey(Prism2) {
    Prism2.languages.monkey = {
      comment: {
        pattern: /^#Rem\s[\s\S]*?^#End|'.+/im,
        greedy: true
      },
      string: {
        pattern: /"[^"\r\n]*"/,
        greedy: true
      },
      preprocessor: {
        pattern: /(^[ \t]*)#.+/m,
        lookbehind: true,
        greedy: true,
        alias: "property"
      },
      function: /\b\w+(?=\()/,
      "type-char": {
        pattern: /\b[?%#$]/,
        alias: "class-name"
      },
      number: {
        pattern: /((?:\.\.)?)(?:(?:\b|\B-\.?|\B\.)\d+(?:(?!\.\.)\.\d*)?|\$[\da-f]+)/i,
        lookbehind: true
      },
      keyword: /\b(?:Abstract|Array|Bool|Case|Catch|Class|Const|Continue|Default|Eachin|Else|ElseIf|End|EndIf|Exit|Extends|Extern|False|Field|Final|Float|For|Forever|Function|Global|If|Implements|Import|Inline|Int|Interface|Local|Method|Module|New|Next|Null|Object|Private|Property|Public|Repeat|Return|Select|Self|Step|Strict|String|Super|Then|Throw|To|True|Try|Until|Void|Wend|While)\b/i,
      operator: /\.\.|<[=>]?|>=?|:?=|(?:[+\-*\/&~|]|\b(?:Mod|Shl|Shr)\b)=?|\b(?:And|Not|Or)\b/i,
      punctuation: /[.,:;()\[\]]/
    };
  }
  return monkey_1;
}
var moonscript_1;
var hasRequiredMoonscript;
function requireMoonscript() {
  if (hasRequiredMoonscript) return moonscript_1;
  hasRequiredMoonscript = 1;
  moonscript_1 = moonscript;
  moonscript.displayName = "moonscript";
  moonscript.aliases = ["moon"];
  function moonscript(Prism2) {
    Prism2.languages.moonscript = {
      comment: /--.*/,
      string: [
        {
          pattern: /'[^']*'|\[(=*)\[[\s\S]*?\]\1\]/,
          greedy: true
        },
        {
          pattern: /"[^"]*"/,
          greedy: true,
          inside: {
            interpolation: {
              pattern: /#\{[^{}]*\}/,
              inside: {
                moonscript: {
                  pattern: /(^#\{)[\s\S]+(?=\})/,
                  lookbehind: true,
                  inside: null
                  // see beow
                },
                "interpolation-punctuation": {
                  pattern: /#\{|\}/,
                  alias: "punctuation"
                }
              }
            }
          }
        }
      ],
      "class-name": [
        {
          pattern: /(\b(?:class|extends)[ \t]+)\w+/,
          lookbehind: true
        },
        // class-like names start with a capital letter
        /\b[A-Z]\w*/
      ],
      keyword: /\b(?:class|continue|do|else|elseif|export|extends|for|from|if|import|in|local|nil|return|self|super|switch|then|unless|using|when|while|with)\b/,
      variable: /@@?\w*/,
      property: {
        pattern: /\b(?!\d)\w+(?=:)|(:)(?!\d)\w+/,
        lookbehind: true
      },
      function: {
        pattern: /\b(?:_G|_VERSION|assert|collectgarbage|coroutine\.(?:create|resume|running|status|wrap|yield)|debug\.(?:debug|getfenv|gethook|getinfo|getlocal|getmetatable|getregistry|getupvalue|setfenv|sethook|setlocal|setmetatable|setupvalue|traceback)|dofile|error|getfenv|getmetatable|io\.(?:close|flush|input|lines|open|output|popen|read|stderr|stdin|stdout|tmpfile|type|write)|ipairs|load|loadfile|loadstring|math\.(?:abs|acos|asin|atan|atan2|ceil|cos|cosh|deg|exp|floor|fmod|frexp|ldexp|log|log10|max|min|modf|pi|pow|rad|random|randomseed|sin|sinh|sqrt|tan|tanh)|module|next|os\.(?:clock|date|difftime|execute|exit|getenv|remove|rename|setlocale|time|tmpname)|package\.(?:cpath|loaded|loadlib|path|preload|seeall)|pairs|pcall|print|rawequal|rawget|rawset|require|select|setfenv|setmetatable|string\.(?:byte|char|dump|find|format|gmatch|gsub|len|lower|match|rep|reverse|sub|upper)|table\.(?:concat|insert|maxn|remove|sort)|tonumber|tostring|type|unpack|xpcall)\b/,
        inside: {
          punctuation: /\./
        }
      },
      boolean: /\b(?:false|true)\b/,
      number: /(?:\B\.\d+|\b\d+\.\d+|\b\d+(?=[eE]))(?:[eE][-+]?\d+)?\b|\b(?:0x[a-fA-F\d]+|\d+)(?:U?LL)?\b/,
      operator: /\.{3}|[-=]>|~=|(?:[-+*/%<>!=]|\.\.)=?|[:#^]|\b(?:and|or)\b=?|\b(?:not)\b/,
      punctuation: /[.,()[\]{}\\]/
    };
    Prism2.languages.moonscript.string[1].inside.interpolation.inside.moonscript.inside = Prism2.languages.moonscript;
    Prism2.languages.moon = Prism2.languages.moonscript;
  }
  return moonscript_1;
}
var n1ql_1;
var hasRequiredN1ql;
function requireN1ql() {
  if (hasRequiredN1ql) return n1ql_1;
  hasRequiredN1ql = 1;
  n1ql_1 = n1ql;
  n1ql.displayName = "n1ql";
  n1ql.aliases = [];
  function n1ql(Prism2) {
    Prism2.languages.n1ql = {
      comment: {
        pattern: /\/\*[\s\S]*?(?:$|\*\/)|--.*/,
        greedy: true
      },
      string: {
        pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\]|\1\1)*\1/,
        greedy: true
      },
      identifier: {
        pattern: /`(?:\\[\s\S]|[^\\`]|``)*`/,
        greedy: true
      },
      parameter: /\$[\w.]+/,
      // https://docs.couchbase.com/server/current/n1ql/n1ql-language-reference/reservedwords.html#n1ql-reserved-words
      keyword: /\b(?:ADVISE|ALL|ALTER|ANALYZE|AS|ASC|AT|BEGIN|BINARY|BOOLEAN|BREAK|BUCKET|BUILD|BY|CALL|CAST|CLUSTER|COLLATE|COLLECTION|COMMIT|COMMITTED|CONNECT|CONTINUE|CORRELATE|CORRELATED|COVER|CREATE|CURRENT|DATABASE|DATASET|DATASTORE|DECLARE|DECREMENT|DELETE|DERIVED|DESC|DESCRIBE|DISTINCT|DO|DROP|EACH|ELEMENT|EXCEPT|EXCLUDE|EXECUTE|EXPLAIN|FETCH|FILTER|FLATTEN|FLUSH|FOLLOWING|FOR|FORCE|FROM|FTS|FUNCTION|GOLANG|GRANT|GROUP|GROUPS|GSI|HASH|HAVING|IF|IGNORE|ILIKE|INCLUDE|INCREMENT|INDEX|INFER|INLINE|INNER|INSERT|INTERSECT|INTO|IS|ISOLATION|JAVASCRIPT|JOIN|KEY|KEYS|KEYSPACE|KNOWN|LANGUAGE|LAST|LEFT|LET|LETTING|LEVEL|LIMIT|LSM|MAP|MAPPING|MATCHED|MATERIALIZED|MERGE|MINUS|MISSING|NAMESPACE|NEST|NL|NO|NTH_VALUE|NULL|NULLS|NUMBER|OBJECT|OFFSET|ON|OPTION|OPTIONS|ORDER|OTHERS|OUTER|OVER|PARSE|PARTITION|PASSWORD|PATH|POOL|PRECEDING|PREPARE|PRIMARY|PRIVATE|PRIVILEGE|PROBE|PROCEDURE|PUBLIC|RANGE|RAW|REALM|REDUCE|RENAME|RESPECT|RETURN|RETURNING|REVOKE|RIGHT|ROLE|ROLLBACK|ROW|ROWS|SATISFIES|SAVEPOINT|SCHEMA|SCOPE|SELECT|SELF|SEMI|SET|SHOW|SOME|START|STATISTICS|STRING|SYSTEM|TIES|TO|TRAN|TRANSACTION|TRIGGER|TRUNCATE|UNBOUNDED|UNDER|UNION|UNIQUE|UNKNOWN|UNNEST|UNSET|UPDATE|UPSERT|USE|USER|USING|VALIDATE|VALUE|VALUES|VIA|VIEW|WHERE|WHILE|WINDOW|WITH|WORK|XOR)\b/i,
      function: /\b[a-z_]\w*(?=\s*\()/i,
      boolean: /\b(?:FALSE|TRUE)\b/i,
      number: /(?:\b\d+\.|\B\.)\d+e[+\-]?\d+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
      operator: /[-+*\/%]|!=|==?|\|\||<[>=]?|>=?|\b(?:AND|ANY|ARRAY|BETWEEN|CASE|ELSE|END|EVERY|EXISTS|FIRST|IN|LIKE|NOT|OR|THEN|VALUED|WHEN|WITHIN)\b/i,
      punctuation: /[;[\](),.{}:]/
    };
  }
  return n1ql_1;
}
var n4js_1;
var hasRequiredN4js;
function requireN4js() {
  if (hasRequiredN4js) return n4js_1;
  hasRequiredN4js = 1;
  n4js_1 = n4js;
  n4js.displayName = "n4js";
  n4js.aliases = ["n4jsd"];
  function n4js(Prism2) {
    Prism2.languages.n4js = Prism2.languages.extend("javascript", {
      // Keywords from N4JS language spec: https://numberfour.github.io/n4js/spec/N4JSSpec.html
      keyword: /\b(?:Array|any|boolean|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|module|new|null|number|package|private|protected|public|return|set|static|string|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/
    });
    Prism2.languages.insertBefore("n4js", "constant", {
      // Annotations in N4JS spec: https://numberfour.github.io/n4js/spec/N4JSSpec.html#_annotations
      annotation: {
        pattern: /@+\w+/,
        alias: "operator"
      }
    });
    Prism2.languages.n4jsd = Prism2.languages.n4js;
  }
  return n4js_1;
}
var nand2tetrisHdl_1;
var hasRequiredNand2tetrisHdl;
function requireNand2tetrisHdl() {
  if (hasRequiredNand2tetrisHdl) return nand2tetrisHdl_1;
  hasRequiredNand2tetrisHdl = 1;
  nand2tetrisHdl_1 = nand2tetrisHdl;
  nand2tetrisHdl.displayName = "nand2tetrisHdl";
  nand2tetrisHdl.aliases = [];
  function nand2tetrisHdl(Prism2) {
    Prism2.languages["nand2tetris-hdl"] = {
      comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
      keyword: /\b(?:BUILTIN|CHIP|CLOCKED|IN|OUT|PARTS)\b/,
      boolean: /\b(?:false|true)\b/,
      function: /\b[A-Za-z][A-Za-z0-9]*(?=\()/,
      number: /\b\d+\b/,
      operator: /=|\.\./,
      punctuation: /[{}[\];(),:]/
    };
  }
  return nand2tetrisHdl_1;
}
var naniscript_1;
var hasRequiredNaniscript;
function requireNaniscript() {
  if (hasRequiredNaniscript) return naniscript_1;
  hasRequiredNaniscript = 1;
  naniscript_1 = naniscript;
  naniscript.displayName = "naniscript";
  naniscript.aliases = [];
  function naniscript(Prism2) {
    (function(Prism3) {
      var expressionDef = /\{[^\r\n\[\]{}]*\}/;
      var params = {
        "quoted-string": {
          pattern: /"(?:[^"\\]|\\.)*"/,
          alias: "operator"
        },
        "command-param-id": {
          pattern: /(\s)\w+:/,
          lookbehind: true,
          alias: "property"
        },
        "command-param-value": [
          {
            pattern: expressionDef,
            alias: "selector"
          },
          {
            pattern: /([\t ])\S+/,
            lookbehind: true,
            greedy: true,
            alias: "operator"
          },
          {
            pattern: /\S(?:.*\S)?/,
            alias: "operator"
          }
        ]
      };
      Prism3.languages.naniscript = {
        // ; ...
        comment: {
          pattern: /^([\t ]*);.*/m,
          lookbehind: true
        },
        // > ...
        // Define is a control line starting with '>' followed by a word, a space and a text.
        define: {
          pattern: /^>.+/m,
          alias: "tag",
          inside: {
            value: {
              pattern: /(^>\w+[\t ]+)(?!\s)[^{}\r\n]+/,
              lookbehind: true,
              alias: "operator"
            },
            key: {
              pattern: /(^>)\w+/,
              lookbehind: true
            }
          }
        },
        // # ...
        label: {
          pattern: /^([\t ]*)#[\t ]*\w+[\t ]*$/m,
          lookbehind: true,
          alias: "regex"
        },
        command: {
          pattern: /^([\t ]*)@\w+(?=[\t ]|$).*/m,
          lookbehind: true,
          alias: "function",
          inside: {
            "command-name": /^@\w+/,
            expression: {
              pattern: expressionDef,
              greedy: true,
              alias: "selector"
            },
            "command-params": {
              pattern: /\s*\S[\s\S]*/,
              inside: params
            }
          }
        },
        // Generic is any line that doesn't start with operators: ;>#@
        "generic-text": {
          pattern: /(^[ \t]*)[^#@>;\s].*/m,
          lookbehind: true,
          alias: "punctuation",
          inside: {
            // \{ ... \} ... \[ ... \] ... \"
            "escaped-char": /\\[{}\[\]"]/,
            expression: {
              pattern: expressionDef,
              greedy: true,
              alias: "selector"
            },
            "inline-command": {
              pattern: /\[[\t ]*\w[^\r\n\[\]]*\]/,
              greedy: true,
              alias: "function",
              inside: {
                "command-params": {
                  pattern: /(^\[[\t ]*\w+\b)[\s\S]+(?=\]$)/,
                  lookbehind: true,
                  inside: params
                },
                "command-param-name": {
                  pattern: /^(\[[\t ]*)\w+/,
                  lookbehind: true,
                  alias: "name"
                },
                "start-stop-char": /[\[\]]/
              }
            }
          }
        }
      };
      Prism3.languages.nani = Prism3.languages["naniscript"];
      Prism3.hooks.add("after-tokenize", function(env) {
        var tokens = env.tokens;
        tokens.forEach(function(token) {
          if (typeof token !== "string" && token.type === "generic-text") {
            var content = getTextContent(token);
            if (!isBracketsBalanced(content)) {
              token.type = "bad-line";
              token.content = content;
            }
          }
        });
      });
      function isBracketsBalanced(input) {
        var brackets = "[]{}";
        var stack = [];
        for (var i = 0; i < input.length; i++) {
          var bracket = input[i];
          var bracketsIndex = brackets.indexOf(bracket);
          if (bracketsIndex !== -1) {
            if (bracketsIndex % 2 === 0) {
              stack.push(bracketsIndex + 1);
            } else if (stack.pop() !== bracketsIndex) {
              return false;
            }
          }
        }
        return stack.length === 0;
      }
      function getTextContent(token) {
        if (typeof token === "string") {
          return token;
        } else if (Array.isArray(token)) {
          return token.map(getTextContent).join("");
        } else {
          return getTextContent(token.content);
        }
      }
    })(Prism2);
  }
  return naniscript_1;
}
var nasm_1;
var hasRequiredNasm;
function requireNasm() {
  if (hasRequiredNasm) return nasm_1;
  hasRequiredNasm = 1;
  nasm_1 = nasm;
  nasm.displayName = "nasm";
  nasm.aliases = [];
  function nasm(Prism2) {
    Prism2.languages.nasm = {
      comment: /;.*$/m,
      string: /(["'`])(?:\\.|(?!\1)[^\\\r\n])*\1/,
      label: {
        pattern: /(^\s*)[A-Za-z._?$][\w.?$@~#]*:/m,
        lookbehind: true,
        alias: "function"
      },
      keyword: [
        /\[?BITS (?:16|32|64)\]?/,
        {
          pattern: /(^\s*)section\s*[a-z.]+:?/im,
          lookbehind: true
        },
        /(?:extern|global)[^;\r\n]*/i,
        /(?:CPU|DEFAULT|FLOAT).*$/m
      ],
      register: {
        pattern: /\b(?:st\d|[xyz]mm\d\d?|[cdt]r\d|r\d\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp|di|si|sp)|[cdefgs]s)\b/i,
        alias: "variable"
      },
      number: /(?:\b|(?=\$))(?:0[hx](?:\.[\da-f]+|[\da-f]+(?:\.[\da-f]+)?)(?:p[+-]?\d+)?|\d[\da-f]+[hx]|\$\d[\da-f]*|0[oq][0-7]+|[0-7]+[oq]|0[by][01]+|[01]+[by]|0[dt]\d+|(?:\d+(?:\.\d+)?|\.\d+)(?:\.?e[+-]?\d+)?[dt]?)\b/i,
      operator: /[\[\]*+\-\/%<>=&|$!]/
    };
  }
  return nasm_1;
}
var neon_1;
var hasRequiredNeon;
function requireNeon() {
  if (hasRequiredNeon) return neon_1;
  hasRequiredNeon = 1;
  neon_1 = neon;
  neon.displayName = "neon";
  neon.aliases = [];
  function neon(Prism2) {
    Prism2.languages.neon = {
      comment: {
        pattern: /#.*/,
        greedy: true
      },
      datetime: {
        pattern: /(^|[[{(=:,\s])\d\d\d\d-\d\d?-\d\d?(?:(?:[Tt]| +)\d\d?:\d\d:\d\d(?:\.\d*)? *(?:Z|[-+]\d\d?(?::?\d\d)?)?)?(?=$|[\]}),\s])/,
        lookbehind: true,
        alias: "number"
      },
      key: {
        pattern: /(^|[[{(,\s])[^,:=[\]{}()'"\s]+(?=\s*:(?:$|[\]}),\s])|\s*=)/,
        lookbehind: true,
        alias: "atrule"
      },
      number: {
        pattern: /(^|[[{(=:,\s])[+-]?(?:0x[\da-fA-F]+|0o[0-7]+|0b[01]+|(?:\d+(?:\.\d*)?|\.?\d+)(?:[eE][+-]?\d+)?)(?=$|[\]}),:=\s])/,
        lookbehind: true
      },
      boolean: {
        pattern: /(^|[[{(=:,\s])(?:false|no|true|yes)(?=$|[\]}),:=\s])/i,
        lookbehind: true
      },
      null: {
        pattern: /(^|[[{(=:,\s])(?:null)(?=$|[\]}),:=\s])/i,
        lookbehind: true,
        alias: "keyword"
      },
      string: {
        pattern: /(^|[[{(=:,\s])(?:('''|""")\r?\n(?:(?:[^\r\n]|\r?\n(?![\t ]*\2))*\r?\n)?[\t ]*\2|'[^'\r\n]*'|"(?:\\.|[^\\"\r\n])*")/,
        lookbehind: true,
        greedy: true
      },
      literal: {
        pattern: /(^|[[{(=:,\s])(?:[^#"',:=[\]{}()\s`-]|[:-][^"',=[\]{}()\s])(?:[^,:=\]})(\s]|:(?![\s,\]})]|$)|[ \t]+[^#,:=\]})(\s])*/,
        lookbehind: true,
        alias: "string"
      },
      punctuation: /[,:=[\]{}()-]/
    };
  }
  return neon_1;
}
var nevod_1;
var hasRequiredNevod;
function requireNevod() {
  if (hasRequiredNevod) return nevod_1;
  hasRequiredNevod = 1;
  nevod_1 = nevod;
  nevod.displayName = "nevod";
  nevod.aliases = [];
  function nevod(Prism2) {
    Prism2.languages.nevod = {
      comment: /\/\/.*|(?:\/\*[\s\S]*?(?:\*\/|$))/,
      string: {
        pattern: /(?:"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!'))!?\*?/,
        greedy: true,
        inside: {
          "string-attrs": /!$|!\*$|\*$/
        }
      },
      namespace: {
        pattern: /(@namespace\s+)[a-zA-Z0-9\-.]+(?=\s*\{)/,
        lookbehind: true
      },
      pattern: {
        pattern: /(@pattern\s+)?#?[a-zA-Z0-9\-.]+(?:\s*\(\s*(?:~\s*)?[a-zA-Z0-9\-.]+\s*(?:,\s*(?:~\s*)?[a-zA-Z0-9\-.]*)*\))?(?=\s*=)/,
        lookbehind: true,
        inside: {
          "pattern-name": {
            pattern: /^#?[a-zA-Z0-9\-.]+/,
            alias: "class-name"
          },
          fields: {
            pattern: /\(.*\)/,
            inside: {
              "field-name": {
                pattern: /[a-zA-Z0-9\-.]+/,
                alias: "variable"
              },
              punctuation: /[,()]/,
              operator: {
                pattern: /~/,
                alias: "field-hidden-mark"
              }
            }
          }
        }
      },
      search: {
        pattern: /(@search\s+|#)[a-zA-Z0-9\-.]+(?:\.\*)?(?=\s*;)/,
        alias: "function",
        lookbehind: true
      },
      keyword: /@(?:having|inside|namespace|outside|pattern|require|search|where)\b/,
      "standard-pattern": {
        pattern: /\b(?:Alpha|AlphaNum|Any|Blank|End|LineBreak|Num|NumAlpha|Punct|Space|Start|Symbol|Word|WordBreak)\b(?:\([a-zA-Z0-9\-.,\s+]*\))?/,
        inside: {
          "standard-pattern-name": {
            pattern: /^[a-zA-Z0-9\-.]+/,
            alias: "builtin"
          },
          quantifier: {
            pattern: /\b\d+(?:\s*\+|\s*-\s*\d+)?(?!\w)/,
            alias: "number"
          },
          "standard-pattern-attr": {
            pattern: /[a-zA-Z0-9\-.]+/,
            alias: "builtin"
          },
          punctuation: /[,()]/
        }
      },
      quantifier: {
        pattern: /\b\d+(?:\s*\+|\s*-\s*\d+)?(?!\w)/,
        alias: "number"
      },
      operator: [
        {
          pattern: /=/,
          alias: "pattern-def"
        },
        {
          pattern: /&/,
          alias: "conjunction"
        },
        {
          pattern: /~/,
          alias: "exception"
        },
        {
          pattern: /\?/,
          alias: "optionality"
        },
        {
          pattern: /[[\]]/,
          alias: "repetition"
        },
        {
          pattern: /[{}]/,
          alias: "variation"
        },
        {
          pattern: /[+_]/,
          alias: "sequence"
        },
        {
          pattern: /\.{2,3}/,
          alias: "span"
        }
      ],
      "field-capture": [
        {
          pattern: /([a-zA-Z0-9\-.]+\s*\()\s*[a-zA-Z0-9\-.]+\s*:\s*[a-zA-Z0-9\-.]+(?:\s*,\s*[a-zA-Z0-9\-.]+\s*:\s*[a-zA-Z0-9\-.]+)*(?=\s*\))/,
          lookbehind: true,
          inside: {
            "field-name": {
              pattern: /[a-zA-Z0-9\-.]+/,
              alias: "variable"
            },
            colon: /:/
          }
        },
        {
          pattern: /[a-zA-Z0-9\-.]+\s*:/,
          inside: {
            "field-name": {
              pattern: /[a-zA-Z0-9\-.]+/,
              alias: "variable"
            },
            colon: /:/
          }
        }
      ],
      punctuation: /[:;,()]/,
      name: /[a-zA-Z0-9\-.]+/
    };
  }
  return nevod_1;
}
var nginx_1;
var hasRequiredNginx;
function requireNginx() {
  if (hasRequiredNginx) return nginx_1;
  hasRequiredNginx = 1;
  nginx_1 = nginx;
  nginx.displayName = "nginx";
  nginx.aliases = [];
  function nginx(Prism2) {
    (function(Prism3) {
      var variable = /\$(?:\w[a-z\d]*(?:_[^\x00-\x1F\s"'\\()$]*)?|\{[^}\s"'\\]+\})/i;
      Prism3.languages.nginx = {
        comment: {
          pattern: /(^|[\s{};])#.*/,
          lookbehind: true,
          greedy: true
        },
        directive: {
          pattern: /(^|\s)\w(?:[^;{}"'\\\s]|\\.|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\s+(?:#.*(?!.)|(?![#\s])))*?(?=\s*[;{])/,
          lookbehind: true,
          greedy: true,
          inside: {
            string: {
              pattern: /((?:^|[^\\])(?:\\\\)*)(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/,
              lookbehind: true,
              greedy: true,
              inside: {
                escape: {
                  pattern: /\\["'\\nrt]/,
                  alias: "entity"
                },
                variable
              }
            },
            comment: {
              pattern: /(\s)#.*/,
              lookbehind: true,
              greedy: true
            },
            keyword: {
              pattern: /^\S+/,
              greedy: true
            },
            // other patterns
            boolean: {
              pattern: /(\s)(?:off|on)(?!\S)/,
              lookbehind: true
            },
            number: {
              pattern: /(\s)\d+[a-z]*(?!\S)/i,
              lookbehind: true
            },
            variable
          }
        },
        punctuation: /[{};]/
      };
    })(Prism2);
  }
  return nginx_1;
}
var nim_1;
var hasRequiredNim;
function requireNim() {
  if (hasRequiredNim) return nim_1;
  hasRequiredNim = 1;
  nim_1 = nim;
  nim.displayName = "nim";
  nim.aliases = [];
  function nim(Prism2) {
    Prism2.languages.nim = {
      comment: {
        pattern: /#.*/,
        greedy: true
      },
      string: {
        // Double-quoted strings can be prefixed by an identifier (Generalized raw string literals)
        pattern: /(?:\b(?!\d)(?:\w|\\x[89a-fA-F][0-9a-fA-F])+)?(?:"""[\s\S]*?"""(?!")|"(?:\\[\s\S]|""|[^"\\])*")/,
        greedy: true
      },
      char: {
        // Character literals are handled specifically to prevent issues with numeric type suffixes
        pattern: /'(?:\\(?:\d+|x[\da-fA-F]{0,2}|.)|[^'])'/,
        greedy: true
      },
      function: {
        pattern: /(?:(?!\d)(?:\w|\\x[89a-fA-F][0-9a-fA-F])+|`[^`\r\n]+`)\*?(?:\[[^\]]+\])?(?=\s*\()/,
        greedy: true,
        inside: {
          operator: /\*$/
        }
      },
      // We don't want to highlight operators (and anything really) inside backticks
      identifier: {
        pattern: /`[^`\r\n]+`/,
        greedy: true,
        inside: {
          punctuation: /`/
        }
      },
      // The negative look ahead prevents wrong highlighting of the .. operator
      number: /\b(?:0[xXoObB][\da-fA-F_]+|\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:[eE][+-]?\d[\d_]*)?)(?:'?[iuf]\d*)?/,
      keyword: /\b(?:addr|as|asm|atomic|bind|block|break|case|cast|concept|const|continue|converter|defer|discard|distinct|do|elif|else|end|enum|except|export|finally|for|from|func|generic|if|import|include|interface|iterator|let|macro|method|mixin|nil|object|out|proc|ptr|raise|ref|return|static|template|try|tuple|type|using|var|when|while|with|without|yield)\b/,
      operator: {
        // Look behind and look ahead prevent wrong highlighting of punctuations [. .] {. .} (. .)
        // but allow the slice operator .. to take precedence over them
        // One can define his own operators in Nim so all combination of operators might be an operator.
        pattern: /(^|[({\[](?=\.\.)|(?![({\[]\.).)(?:(?:[=+\-*\/<>@$~&%|!?^:\\]|\.\.|\.(?![)}\]]))+|\b(?:and|div|in|is|isnot|mod|not|notin|of|or|shl|shr|xor)\b)/m,
        lookbehind: true
      },
      punctuation: /[({\[]\.|\.[)}\]]|[`(){}\[\],:]/
    };
  }
  return nim_1;
}
var nix_1;
var hasRequiredNix;
function requireNix() {
  if (hasRequiredNix) return nix_1;
  hasRequiredNix = 1;
  nix_1 = nix;
  nix.displayName = "nix";
  nix.aliases = [];
  function nix(Prism2) {
    Prism2.languages.nix = {
      comment: {
        pattern: /\/\*[\s\S]*?\*\/|#.*/,
        greedy: true
      },
      string: {
        pattern: /"(?:[^"\\]|\\[\s\S])*"|''(?:(?!'')[\s\S]|''(?:'|\\|\$\{))*''/,
        greedy: true,
        inside: {
          interpolation: {
            // The lookbehind ensures the ${} is not preceded by \ or ''
            pattern: /(^|(?:^|(?!'').)[^\\])\$\{(?:[^{}]|\{[^}]*\})*\}/,
            lookbehind: true,
            inside: null
            // see below
          }
        }
      },
      url: [
        /\b(?:[a-z]{3,7}:\/\/)[\w\-+%~\/.:#=?&]+/,
        {
          pattern: /([^\/])(?:[\w\-+%~.:#=?&]*(?!\/\/)[\w\-+%~\/.:#=?&])?(?!\/\/)\/[\w\-+%~\/.:#=?&]*/,
          lookbehind: true
        }
      ],
      antiquotation: {
        pattern: /\$(?=\{)/,
        alias: "important"
      },
      number: /\b\d+\b/,
      keyword: /\b(?:assert|builtins|else|if|in|inherit|let|null|or|then|with)\b/,
      function: /\b(?:abort|add|all|any|attrNames|attrValues|baseNameOf|compareVersions|concatLists|currentSystem|deepSeq|derivation|dirOf|div|elem(?:At)?|fetch(?:Tarball|url)|filter(?:Source)?|fromJSON|genList|getAttr|getEnv|hasAttr|hashString|head|import|intersectAttrs|is(?:Attrs|Bool|Function|Int|List|Null|String)|length|lessThan|listToAttrs|map|mul|parseDrvName|pathExists|read(?:Dir|File)|removeAttrs|replaceStrings|seq|sort|stringLength|sub(?:string)?|tail|throw|to(?:File|JSON|Path|String|XML)|trace|typeOf)\b|\bfoldl'\B/,
      boolean: /\b(?:false|true)\b/,
      operator: /[=!<>]=?|\+\+?|\|\||&&|\/\/|->?|[?@]/,
      punctuation: /[{}()[\].,:;]/
    };
    Prism2.languages.nix.string.inside.interpolation.inside = Prism2.languages.nix;
  }
  return nix_1;
}
var nsis_1;
var hasRequiredNsis;
function requireNsis() {
  if (hasRequiredNsis) return nsis_1;
  hasRequiredNsis = 1;
  nsis_1 = nsis;
  nsis.displayName = "nsis";
  nsis.aliases = [];
  function nsis(Prism2) {
    Prism2.languages.nsis = {
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|[#;].*)/,
        lookbehind: true,
        greedy: true
      },
      string: {
        pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      keyword: {
        pattern: /(^[\t ]*)(?:Abort|Add(?:BrandingImage|Size)|AdvSplash|Allow(?:RootDirInstall|SkipFiles)|AutoCloseWindow|BG(?:Font|Gradient|Image)|Banner|BrandingText|BringToFront|CRCCheck|Call(?:InstDLL)?|Caption|ChangeUI|CheckBitmap|ClearErrors|CompletedText|ComponentText|CopyFiles|Create(?:Directory|Font|ShortCut)|Delete(?:INISec|INIStr|RegKey|RegValue)?|Detail(?:Print|sButtonText)|Dialer|Dir(?:Text|Var|Verify)|EnableWindow|Enum(?:RegKey|RegValue)|Exch|Exec(?:Shell(?:Wait)?|Wait)?|ExpandEnvStrings|File(?:BufSize|Close|ErrorText|Open|Read|ReadByte|ReadUTF16LE|ReadWord|Seek|Write|WriteByte|WriteUTF16LE|WriteWord)?|Find(?:Close|First|Next|Window)|FlushINI|Get(?:CurInstType|CurrentAddress|DLLVersion(?:Local)?|DlgItem|ErrorLevel|FileTime(?:Local)?|FullPathName|Function(?:Address|End)?|InstDirError|LabelAddress|TempFileName)|Goto|HideWindow|Icon|If(?:Abort|Errors|FileExists|RebootFlag|Silent)|InitPluginsDir|InstProgressFlags|Inst(?:Type(?:GetText|SetText)?)|Install(?:ButtonText|Colors|Dir(?:RegKey)?)|Int(?:64|Ptr)?CmpU?|Int(?:64)?Fmt|Int(?:Ptr)?Op|IsWindow|Lang(?:DLL|String)|License(?:BkColor|Data|ForceSelection|LangString|Text)|LoadLanguageFile|LockWindow|Log(?:Set|Text)|Manifest(?:DPIAware|SupportedOS)|Math|MessageBox|MiscButtonText|NSISdl|Name|Nop|OutFile|PE(?:DllCharacteristics|SubsysVer)|Page(?:Callbacks)?|Pop|Push|Quit|RMDir|Read(?:EnvStr|INIStr|RegDWORD|RegStr)|Reboot|RegDLL|Rename|RequestExecutionLevel|ReserveFile|Return|SearchPath|Section(?:End|GetFlags|GetInstTypes|GetSize|GetText|Group|In|SetFlags|SetInstTypes|SetSize|SetText)?|SendMessage|Set(?:AutoClose|BrandingImage|Compress|Compressor(?:DictSize)?|CtlColors|CurInstType|DatablockOptimize|DateSave|Details(?:Print|View)|ErrorLevel|Errors|FileAttributes|Font|OutPath|Overwrite|PluginUnload|RebootFlag|RegView|ShellVarContext|Silent)|Show(?:InstDetails|UninstDetails|Window)|Silent(?:Install|UnInstall)|Sleep|SpaceTexts|Splash|StartMenu|Str(?:CmpS?|Cpy|Len)|SubCaption|System|UnRegDLL|Unicode|UninstPage|Uninstall(?:ButtonText|Caption|Icon|SubCaption|Text)|UserInfo|VI(?:AddVersionKey|FileVersion|ProductVersion)|VPatch|Var|WindowIcon|Write(?:INIStr|Reg(?:Bin|DWORD|ExpandStr|MultiStr|None|Str)|Uninstaller)|XPStyle|ns(?:Dialogs|Exec))\b/m,
        lookbehind: true
      },
      property: /\b(?:ARCHIVE|FILE_(?:ATTRIBUTE_ARCHIVE|ATTRIBUTE_NORMAL|ATTRIBUTE_OFFLINE|ATTRIBUTE_READONLY|ATTRIBUTE_SYSTEM|ATTRIBUTE_TEMPORARY)|HK(?:(?:CR|CU|LM)(?:32|64)?|DD|PD|U)|HKEY_(?:CLASSES_ROOT|CURRENT_CONFIG|CURRENT_USER|DYN_DATA|LOCAL_MACHINE|PERFORMANCE_DATA|USERS)|ID(?:ABORT|CANCEL|IGNORE|NO|OK|RETRY|YES)|MB_(?:ABORTRETRYIGNORE|DEFBUTTON1|DEFBUTTON2|DEFBUTTON3|DEFBUTTON4|ICONEXCLAMATION|ICONINFORMATION|ICONQUESTION|ICONSTOP|OK|OKCANCEL|RETRYCANCEL|RIGHT|RTLREADING|SETFOREGROUND|TOPMOST|USERICON|YESNO)|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SYSTEM|TEMPORARY|admin|all|auto|both|colored|false|force|hide|highest|lastused|leave|listonly|none|normal|notset|off|on|open|print|show|silent|silentlog|smooth|textonly|true|user)\b/,
      constant: /\$\{[!\w\.:\^-]+\}|\$\([!\w\.:\^-]+\)/,
      variable: /\$\w[\w\.]*/,
      number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
      operator: /--?|\+\+?|<=?|>=?|==?=?|&&?|\|\|?|[?*\/~^%]/,
      punctuation: /[{}[\];(),.:]/,
      important: {
        pattern: /(^[\t ]*)!(?:addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversion|gettlbversion|if|ifdef|ifmacrodef|ifmacrondef|ifndef|include|insertmacro|macro|macroend|makensis|packhdr|pragma|searchparse|searchreplace|system|tempfile|undef|verbose|warning)\b/im,
        lookbehind: true
      }
    };
  }
  return nsis_1;
}
var objectivec_1;
var hasRequiredObjectivec;
function requireObjectivec() {
  if (hasRequiredObjectivec) return objectivec_1;
  hasRequiredObjectivec = 1;
  var refractorC = requireC();
  objectivec_1 = objectivec;
  objectivec.displayName = "objectivec";
  objectivec.aliases = ["objc"];
  function objectivec(Prism2) {
    Prism2.register(refractorC);
    Prism2.languages.objectivec = Prism2.languages.extend("c", {
      string: {
        pattern: /@?"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
        greedy: true
      },
      keyword: /\b(?:asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|in|inline|int|long|register|return|self|short|signed|sizeof|static|struct|super|switch|typedef|typeof|union|unsigned|void|volatile|while)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
      operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
    });
    delete Prism2.languages.objectivec["class-name"];
    Prism2.languages.objc = Prism2.languages.objectivec;
  }
  return objectivec_1;
}
var ocaml_1;
var hasRequiredOcaml;
function requireOcaml() {
  if (hasRequiredOcaml) return ocaml_1;
  hasRequiredOcaml = 1;
  ocaml_1 = ocaml;
  ocaml.displayName = "ocaml";
  ocaml.aliases = [];
  function ocaml(Prism2) {
    Prism2.languages.ocaml = {
      comment: {
        pattern: /\(\*[\s\S]*?\*\)/,
        greedy: true
      },
      char: {
        pattern: /'(?:[^\\\r\n']|\\(?:.|[ox]?[0-9a-f]{1,3}))'/i,
        greedy: true
      },
      string: [
        {
          pattern: /"(?:\\(?:[\s\S]|\r\n)|[^\\\r\n"])*"/,
          greedy: true
        },
        {
          pattern: /\{([a-z_]*)\|[\s\S]*?\|\1\}/,
          greedy: true
        }
      ],
      number: [
        // binary and octal
        /\b(?:0b[01][01_]*|0o[0-7][0-7_]*)\b/i,
        // hexadecimal
        /\b0x[a-f0-9][a-f0-9_]*(?:\.[a-f0-9_]*)?(?:p[+-]?\d[\d_]*)?(?!\w)/i,
        // decimal
        /\b\d[\d_]*(?:\.[\d_]*)?(?:e[+-]?\d[\d_]*)?(?!\w)/i
      ],
      directive: {
        pattern: /\B#\w+/,
        alias: "property"
      },
      label: {
        pattern: /\B~\w+/,
        alias: "property"
      },
      "type-variable": {
        pattern: /\B'\w+/,
        alias: "function"
      },
      variant: {
        pattern: /`\w+/,
        alias: "symbol"
      },
      // For the list of keywords and operators,
      // see: http://caml.inria.fr/pub/docs/manual-ocaml/lex.html#sec84
      keyword: /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|nonrec|object|of|open|private|rec|sig|struct|then|to|try|type|val|value|virtual|when|where|while|with)\b/,
      boolean: /\b(?:false|true)\b/,
      "operator-like-punctuation": {
        pattern: /\[[<>|]|[>|]\]|\{<|>\}/,
        alias: "punctuation"
      },
      // Custom operators are allowed
      operator: /\.[.~]|:[=>]|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lsl|lsr|lxor|mod|or)\b/,
      punctuation: /;;|::|[(){}\[\].,:;#]|\b_\b/
    };
  }
  return ocaml_1;
}
var opencl_1;
var hasRequiredOpencl;
function requireOpencl() {
  if (hasRequiredOpencl) return opencl_1;
  hasRequiredOpencl = 1;
  var refractorC = requireC();
  opencl_1 = opencl;
  opencl.displayName = "opencl";
  opencl.aliases = [];
  function opencl(Prism2) {
    Prism2.register(refractorC);
    (function(Prism3) {
      Prism3.languages.opencl = Prism3.languages.extend("c", {
        // Extracted from the official specs (2.0) and http://streamcomputing.eu/downloads/?opencl.lang (opencl-keywords, opencl-types) and http://sourceforge.net/tracker/?func=detail&aid=2957794&group_id=95717&atid=612384 (Words2, partly Words3)
        keyword: /\b(?:(?:__)?(?:constant|global|kernel|local|private|read_only|read_write|write_only)|__attribute__|auto|(?:bool|u?(?:char|int|long|short)|half|quad)(?:2|3|4|8|16)?|break|case|complex|const|continue|(?:double|float)(?:16(?:x(?:1|2|4|8|16))?|1x(?:1|2|4|8|16)|2(?:x(?:1|2|4|8|16))?|3|4(?:x(?:1|2|4|8|16))?|8(?:x(?:1|2|4|8|16))?)?|default|do|else|enum|extern|for|goto|if|imaginary|inline|packed|pipe|register|restrict|return|signed|sizeof|static|struct|switch|typedef|uniform|union|unsigned|void|volatile|while)\b/,
        // Extracted from http://streamcomputing.eu/downloads/?opencl.lang (opencl-const)
        // Math Constants: https://www.khronos.org/registry/OpenCL/sdk/2.1/docs/man/xhtml/mathConstants.html
        // Macros and Limits: https://www.khronos.org/registry/OpenCL/sdk/2.1/docs/man/xhtml/macroLimits.html
        number: /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[fuhl]{0,4}/i,
        boolean: /\b(?:false|true)\b/,
        "constant-opencl-kernel": {
          pattern: /\b(?:CHAR_(?:BIT|MAX|MIN)|CLK_(?:ADDRESS_(?:CLAMP(?:_TO_EDGE)?|NONE|REPEAT)|FILTER_(?:LINEAR|NEAREST)|(?:GLOBAL|LOCAL)_MEM_FENCE|NORMALIZED_COORDS_(?:FALSE|TRUE))|CL_(?:BGRA|(?:HALF_)?FLOAT|INTENSITY|LUMINANCE|A?R?G?B?[Ax]?|(?:(?:UN)?SIGNED|[US]NORM)_(?:INT(?:8|16|32))|UNORM_(?:INT_101010|SHORT_(?:555|565)))|(?:DBL|FLT|HALF)_(?:DIG|EPSILON|(?:MAX|MIN)(?:(?:_10)?_EXP)?|MANT_DIG)|FLT_RADIX|HUGE_VALF?|(?:INT|LONG|SCHAR|SHRT)_(?:MAX|MIN)|INFINITY|MAXFLOAT|M_(?:[12]_PI|2_SQRTPI|E|LN(?:2|10)|LOG(?:2|10)E?|PI(?:_[24])?|SQRT(?:1_2|2))(?:_F|_H)?|NAN|(?:UCHAR|UINT|ULONG|USHRT)_MAX)\b/,
          alias: "constant"
        }
      });
      Prism3.languages.insertBefore("opencl", "class-name", {
        // https://www.khronos.org/registry/OpenCL/sdk/2.1/docs/man/xhtml/scalarDataTypes.html
        // https://www.khronos.org/registry/OpenCL/sdk/2.1/docs/man/xhtml/otherDataTypes.html
        "builtin-type": {
          pattern: /\b(?:_cl_(?:command_queue|context|device_id|event|kernel|mem|platform_id|program|sampler)|cl_(?:image_format|mem_fence_flags)|clk_event_t|event_t|image(?:1d_(?:array_|buffer_)?t|2d_(?:array_(?:depth_|msaa_depth_|msaa_)?|depth_|msaa_depth_|msaa_)?t|3d_t)|intptr_t|ndrange_t|ptrdiff_t|queue_t|reserve_id_t|sampler_t|size_t|uintptr_t)\b/,
          alias: "keyword"
        }
      });
      var attributes2 = {
        // Extracted from http://streamcomputing.eu/downloads/?opencl_host.lang (opencl-types and opencl-host)
        "type-opencl-host": {
          pattern: /\b(?:cl_(?:GLenum|GLint|GLuin|addressing_mode|bitfield|bool|buffer_create_type|build_status|channel_(?:order|type)|(?:u?(?:char|int|long|short)|double|float)(?:2|3|4|8|16)?|command_(?:queue(?:_info|_properties)?|type)|context(?:_info|_properties)?|device_(?:exec_capabilities|fp_config|id|info|local_mem_type|mem_cache_type|type)|(?:event|sampler)(?:_info)?|filter_mode|half|image_info|kernel(?:_info|_work_group_info)?|map_flags|mem(?:_flags|_info|_object_type)?|platform_(?:id|info)|profiling_info|program(?:_build_info|_info)?))\b/,
          alias: "keyword"
        },
        "boolean-opencl-host": {
          pattern: /\bCL_(?:FALSE|TRUE)\b/,
          alias: "boolean"
        },
        // Extracted from cl.h (2.0) and http://streamcomputing.eu/downloads/?opencl_host.lang (opencl-const)
        "constant-opencl-host": {
          pattern: /\bCL_(?:A|ABGR|ADDRESS_(?:CLAMP(?:_TO_EDGE)?|MIRRORED_REPEAT|NONE|REPEAT)|ARGB|BGRA|BLOCKING|BUFFER_CREATE_TYPE_REGION|BUILD_(?:ERROR|IN_PROGRESS|NONE|PROGRAM_FAILURE|SUCCESS)|COMMAND_(?:ACQUIRE_GL_OBJECTS|BARRIER|COPY_(?:BUFFER(?:_RECT|_TO_IMAGE)?|IMAGE(?:_TO_BUFFER)?)|FILL_(?:BUFFER|IMAGE)|MAP(?:_BUFFER|_IMAGE)|MARKER|MIGRATE(?:_SVM)?_MEM_OBJECTS|NATIVE_KERNEL|NDRANGE_KERNEL|READ_(?:BUFFER(?:_RECT)?|IMAGE)|RELEASE_GL_OBJECTS|SVM_(?:FREE|MAP|MEMCPY|MEMFILL|UNMAP)|TASK|UNMAP_MEM_OBJECT|USER|WRITE_(?:BUFFER(?:_RECT)?|IMAGE))|COMPILER_NOT_AVAILABLE|COMPILE_PROGRAM_FAILURE|COMPLETE|CONTEXT_(?:DEVICES|INTEROP_USER_SYNC|NUM_DEVICES|PLATFORM|PROPERTIES|REFERENCE_COUNT)|DEPTH(?:_STENCIL)?|DEVICE_(?:ADDRESS_BITS|AFFINITY_DOMAIN_(?:L[1-4]_CACHE|NEXT_PARTITIONABLE|NUMA)|AVAILABLE|BUILT_IN_KERNELS|COMPILER_AVAILABLE|DOUBLE_FP_CONFIG|ENDIAN_LITTLE|ERROR_CORRECTION_SUPPORT|EXECUTION_CAPABILITIES|EXTENSIONS|GLOBAL_(?:MEM_(?:CACHELINE_SIZE|CACHE_SIZE|CACHE_TYPE|SIZE)|VARIABLE_PREFERRED_TOTAL_SIZE)|HOST_UNIFIED_MEMORY|IL_VERSION|IMAGE(?:2D_MAX_(?:HEIGHT|WIDTH)|3D_MAX_(?:DEPTH|HEIGHT|WIDTH)|_BASE_ADDRESS_ALIGNMENT|_MAX_ARRAY_SIZE|_MAX_BUFFER_SIZE|_PITCH_ALIGNMENT|_SUPPORT)|LINKER_AVAILABLE|LOCAL_MEM_SIZE|LOCAL_MEM_TYPE|MAX_(?:CLOCK_FREQUENCY|COMPUTE_UNITS|CONSTANT_ARGS|CONSTANT_BUFFER_SIZE|GLOBAL_VARIABLE_SIZE|MEM_ALLOC_SIZE|NUM_SUB_GROUPS|ON_DEVICE_(?:EVENTS|QUEUES)|PARAMETER_SIZE|PIPE_ARGS|READ_IMAGE_ARGS|READ_WRITE_IMAGE_ARGS|SAMPLERS|WORK_GROUP_SIZE|WORK_ITEM_DIMENSIONS|WORK_ITEM_SIZES|WRITE_IMAGE_ARGS)|MEM_BASE_ADDR_ALIGN|MIN_DATA_TYPE_ALIGN_SIZE|NAME|NATIVE_VECTOR_WIDTH_(?:CHAR|DOUBLE|FLOAT|HALF|INT|LONG|SHORT)|NOT_(?:AVAILABLE|FOUND)|OPENCL_C_VERSION|PARENT_DEVICE|PARTITION_(?:AFFINITY_DOMAIN|BY_AFFINITY_DOMAIN|BY_COUNTS|BY_COUNTS_LIST_END|EQUALLY|FAILED|MAX_SUB_DEVICES|PROPERTIES|TYPE)|PIPE_MAX_(?:ACTIVE_RESERVATIONS|PACKET_SIZE)|PLATFORM|PREFERRED_(?:GLOBAL_ATOMIC_ALIGNMENT|INTEROP_USER_SYNC|LOCAL_ATOMIC_ALIGNMENT|PLATFORM_ATOMIC_ALIGNMENT|VECTOR_WIDTH_(?:CHAR|DOUBLE|FLOAT|HALF|INT|LONG|SHORT))|PRINTF_BUFFER_SIZE|PROFILE|PROFILING_TIMER_RESOLUTION|QUEUE_(?:ON_(?:DEVICE_(?:MAX_SIZE|PREFERRED_SIZE|PROPERTIES)|HOST_PROPERTIES)|PROPERTIES)|REFERENCE_COUNT|SINGLE_FP_CONFIG|SUB_GROUP_INDEPENDENT_FORWARD_PROGRESS|SVM_(?:ATOMICS|CAPABILITIES|COARSE_GRAIN_BUFFER|FINE_GRAIN_BUFFER|FINE_GRAIN_SYSTEM)|TYPE(?:_ACCELERATOR|_ALL|_CPU|_CUSTOM|_DEFAULT|_GPU)?|VENDOR(?:_ID)?|VERSION)|DRIVER_VERSION|EVENT_(?:COMMAND_(?:EXECUTION_STATUS|QUEUE|TYPE)|CONTEXT|REFERENCE_COUNT)|EXEC_(?:KERNEL|NATIVE_KERNEL|STATUS_ERROR_FOR_EVENTS_IN_WAIT_LIST)|FILTER_(?:LINEAR|NEAREST)|FLOAT|FP_(?:CORRECTLY_ROUNDED_DIVIDE_SQRT|DENORM|FMA|INF_NAN|ROUND_TO_INF|ROUND_TO_NEAREST|ROUND_TO_ZERO|SOFT_FLOAT)|GLOBAL|HALF_FLOAT|IMAGE_(?:ARRAY_SIZE|BUFFER|DEPTH|ELEMENT_SIZE|FORMAT|FORMAT_MISMATCH|FORMAT_NOT_SUPPORTED|HEIGHT|NUM_MIP_LEVELS|NUM_SAMPLES|ROW_PITCH|SLICE_PITCH|WIDTH)|INTENSITY|INVALID_(?:ARG_INDEX|ARG_SIZE|ARG_VALUE|BINARY|BUFFER_SIZE|BUILD_OPTIONS|COMMAND_QUEUE|COMPILER_OPTIONS|CONTEXT|DEVICE|DEVICE_PARTITION_COUNT|DEVICE_QUEUE|DEVICE_TYPE|EVENT|EVENT_WAIT_LIST|GLOBAL_OFFSET|GLOBAL_WORK_SIZE|GL_OBJECT|HOST_PTR|IMAGE_DESCRIPTOR|IMAGE_FORMAT_DESCRIPTOR|IMAGE_SIZE|KERNEL|KERNEL_ARGS|KERNEL_DEFINITION|KERNEL_NAME|LINKER_OPTIONS|MEM_OBJECT|MIP_LEVEL|OPERATION|PIPE_SIZE|PLATFORM|PROGRAM|PROGRAM_EXECUTABLE|PROPERTY|QUEUE_PROPERTIES|SAMPLER|VALUE|WORK_DIMENSION|WORK_GROUP_SIZE|WORK_ITEM_SIZE)|KERNEL_(?:ARG_(?:ACCESS_(?:NONE|QUALIFIER|READ_ONLY|READ_WRITE|WRITE_ONLY)|ADDRESS_(?:CONSTANT|GLOBAL|LOCAL|PRIVATE|QUALIFIER)|INFO_NOT_AVAILABLE|NAME|TYPE_(?:CONST|NAME|NONE|PIPE|QUALIFIER|RESTRICT|VOLATILE))|ATTRIBUTES|COMPILE_NUM_SUB_GROUPS|COMPILE_WORK_GROUP_SIZE|CONTEXT|EXEC_INFO_SVM_FINE_GRAIN_SYSTEM|EXEC_INFO_SVM_PTRS|FUNCTION_NAME|GLOBAL_WORK_SIZE|LOCAL_MEM_SIZE|LOCAL_SIZE_FOR_SUB_GROUP_COUNT|MAX_NUM_SUB_GROUPS|MAX_SUB_GROUP_SIZE_FOR_NDRANGE|NUM_ARGS|PREFERRED_WORK_GROUP_SIZE_MULTIPLE|PRIVATE_MEM_SIZE|PROGRAM|REFERENCE_COUNT|SUB_GROUP_COUNT_FOR_NDRANGE|WORK_GROUP_SIZE)|LINKER_NOT_AVAILABLE|LINK_PROGRAM_FAILURE|LOCAL|LUMINANCE|MAP_(?:FAILURE|READ|WRITE|WRITE_INVALIDATE_REGION)|MEM_(?:ALLOC_HOST_PTR|ASSOCIATED_MEMOBJECT|CONTEXT|COPY_HOST_PTR|COPY_OVERLAP|FLAGS|HOST_NO_ACCESS|HOST_PTR|HOST_READ_ONLY|HOST_WRITE_ONLY|KERNEL_READ_AND_WRITE|MAP_COUNT|OBJECT_(?:ALLOCATION_FAILURE|BUFFER|IMAGE1D|IMAGE1D_ARRAY|IMAGE1D_BUFFER|IMAGE2D|IMAGE2D_ARRAY|IMAGE3D|PIPE)|OFFSET|READ_ONLY|READ_WRITE|REFERENCE_COUNT|SIZE|SVM_ATOMICS|SVM_FINE_GRAIN_BUFFER|TYPE|USES_SVM_POINTER|USE_HOST_PTR|WRITE_ONLY)|MIGRATE_MEM_OBJECT_(?:CONTENT_UNDEFINED|HOST)|MISALIGNED_SUB_BUFFER_OFFSET|NONE|NON_BLOCKING|OUT_OF_(?:HOST_MEMORY|RESOURCES)|PIPE_(?:MAX_PACKETS|PACKET_SIZE)|PLATFORM_(?:EXTENSIONS|HOST_TIMER_RESOLUTION|NAME|PROFILE|VENDOR|VERSION)|PROFILING_(?:COMMAND_(?:COMPLETE|END|QUEUED|START|SUBMIT)|INFO_NOT_AVAILABLE)|PROGRAM_(?:BINARIES|BINARY_SIZES|BINARY_TYPE(?:_COMPILED_OBJECT|_EXECUTABLE|_LIBRARY|_NONE)?|BUILD_(?:GLOBAL_VARIABLE_TOTAL_SIZE|LOG|OPTIONS|STATUS)|CONTEXT|DEVICES|IL|KERNEL_NAMES|NUM_DEVICES|NUM_KERNELS|REFERENCE_COUNT|SOURCE)|QUEUED|QUEUE_(?:CONTEXT|DEVICE|DEVICE_DEFAULT|ON_DEVICE|ON_DEVICE_DEFAULT|OUT_OF_ORDER_EXEC_MODE_ENABLE|PROFILING_ENABLE|PROPERTIES|REFERENCE_COUNT|SIZE)|R|RA|READ_(?:ONLY|WRITE)_CACHE|RG|RGB|RGBA|RGBx|RGx|RUNNING|Rx|SAMPLER_(?:ADDRESSING_MODE|CONTEXT|FILTER_MODE|LOD_MAX|LOD_MIN|MIP_FILTER_MODE|NORMALIZED_COORDS|REFERENCE_COUNT)|(?:UN)?SIGNED_INT(?:8|16|32)|SNORM_INT(?:8|16)|SUBMITTED|SUCCESS|UNORM_INT(?:8|16|24|_101010|_101010_2)|UNORM_SHORT_(?:555|565)|VERSION_(?:1_0|1_1|1_2|2_0|2_1)|sBGRA|sRGB|sRGBA|sRGBx)\b/,
          alias: "constant"
        },
        // Extracted from cl.h (2.0) and http://streamcomputing.eu/downloads/?opencl_host.lang (opencl-host)
        "function-opencl-host": {
          pattern: /\bcl(?:BuildProgram|CloneKernel|CompileProgram|Create(?:Buffer|CommandQueue(?:WithProperties)?|Context|ContextFromType|Image|Image2D|Image3D|Kernel|KernelsInProgram|Pipe|ProgramWith(?:Binary|BuiltInKernels|IL|Source)|Sampler|SamplerWithProperties|SubBuffer|SubDevices|UserEvent)|Enqueue(?:(?:Barrier|Marker)(?:WithWaitList)?|Copy(?:Buffer(?:Rect|ToImage)?|Image(?:ToBuffer)?)|(?:Fill|Map)(?:Buffer|Image)|MigrateMemObjects|NDRangeKernel|NativeKernel|(?:Read|Write)(?:Buffer(?:Rect)?|Image)|SVM(?:Free|Map|MemFill|Memcpy|MigrateMem|Unmap)|Task|UnmapMemObject|WaitForEvents)|Finish|Flush|Get(?:CommandQueueInfo|ContextInfo|Device(?:AndHostTimer|IDs|Info)|Event(?:Profiling)?Info|ExtensionFunctionAddress(?:ForPlatform)?|HostTimer|ImageInfo|Kernel(?:ArgInfo|Info|SubGroupInfo|WorkGroupInfo)|MemObjectInfo|PipeInfo|Platform(?:IDs|Info)|Program(?:Build)?Info|SamplerInfo|SupportedImageFormats)|LinkProgram|(?:Release|Retain)(?:CommandQueue|Context|Device|Event|Kernel|MemObject|Program|Sampler)|SVM(?:Alloc|Free)|Set(?:CommandQueueProperty|DefaultDeviceCommandQueue|EventCallback|Kernel|Kernel(?:Arg(?:SVMPointer)?|ExecInfo)|MemObjectDestructorCallback|UserEventStatus)|Unload(?:Platform)?Compiler|WaitForEvents)\b/,
          alias: "function"
        }
      };
      Prism3.languages.insertBefore("c", "keyword", attributes2);
      if (Prism3.languages.cpp) {
        attributes2["type-opencl-host-cpp"] = {
          pattern: /\b(?:Buffer|BufferGL|BufferRenderGL|CommandQueue|Context|Device|DeviceCommandQueue|EnqueueArgs|Event|Image|Image1D|Image1DArray|Image1DBuffer|Image2D|Image2DArray|Image2DGL|Image3D|Image3DGL|ImageFormat|ImageGL|Kernel|KernelFunctor|LocalSpaceArg|Memory|NDRange|Pipe|Platform|Program|SVMAllocator|SVMTraitAtomic|SVMTraitCoarse|SVMTraitFine|SVMTraitReadOnly|SVMTraitReadWrite|SVMTraitWriteOnly|Sampler|UserEvent)\b/,
          alias: "keyword"
        };
        Prism3.languages.insertBefore("cpp", "keyword", attributes2);
      }
    })(Prism2);
  }
  return opencl_1;
}
var openqasm_1;
var hasRequiredOpenqasm;
function requireOpenqasm() {
  if (hasRequiredOpenqasm) return openqasm_1;
  hasRequiredOpenqasm = 1;
  openqasm_1 = openqasm;
  openqasm.displayName = "openqasm";
  openqasm.aliases = ["qasm"];
  function openqasm(Prism2) {
    Prism2.languages.openqasm = {
      comment: /\/\*[\s\S]*?\*\/|\/\/.*/,
      string: {
        pattern: /"[^"\r\n\t]*"|'[^'\r\n\t]*'/,
        greedy: true
      },
      keyword: /\b(?:CX|OPENQASM|U|barrier|boxas|boxto|break|const|continue|ctrl|def|defcal|defcalgrammar|delay|else|end|for|gate|gphase|if|in|include|inv|kernel|lengthof|let|measure|pow|reset|return|rotary|stretchinf|while)\b|#pragma\b/,
      "class-name": /\b(?:angle|bit|bool|creg|fixed|float|int|length|qreg|qubit|stretch|uint)\b/,
      function: /\b(?:cos|exp|ln|popcount|rotl|rotr|sin|sqrt|tan)\b(?=\s*\()/,
      constant: /\b(?:euler|pi|tau)\b|π|𝜏|ℇ/,
      number: {
        pattern: /(^|[^.\w$])(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?(?:dt|ns|us|µs|ms|s)?/i,
        lookbehind: true
      },
      operator: /->|>>=?|<<=?|&&|\|\||\+\+|--|[!=<>&|~^+\-*/%]=?|@/,
      punctuation: /[(){}\[\];,:.]/
    };
    Prism2.languages.qasm = Prism2.languages.openqasm;
  }
  return openqasm_1;
}
var oz_1;
var hasRequiredOz;
function requireOz() {
  if (hasRequiredOz) return oz_1;
  hasRequiredOz = 1;
  oz_1 = oz;
  oz.displayName = "oz";
  oz.aliases = [];
  function oz(Prism2) {
    Prism2.languages.oz = {
      comment: {
        pattern: /\/\*[\s\S]*?\*\/|%.*/,
        greedy: true
      },
      string: {
        pattern: /"(?:[^"\\]|\\[\s\S])*"/,
        greedy: true
      },
      atom: {
        pattern: /'(?:[^'\\]|\\[\s\S])*'/,
        greedy: true,
        alias: "builtin"
      },
      keyword: /\$|\[\]|\b(?:_|at|attr|case|catch|choice|class|cond|declare|define|dis|else(?:case|if)?|end|export|fail|false|feat|finally|from|fun|functor|if|import|in|local|lock|meth|nil|not|of|or|prepare|proc|prop|raise|require|self|skip|then|thread|true|try|unit)\b/,
      function: [
        /\b[a-z][A-Za-z\d]*(?=\()/,
        {
          pattern: /(\{)[A-Z][A-Za-z\d]*\b/,
          lookbehind: true
        }
      ],
      number: /\b(?:0[bx][\da-f]+|\d+(?:\.\d*)?(?:e~?\d+)?)\b|&(?:[^\\]|\\(?:\d{3}|.))/i,
      variable: /`(?:[^`\\]|\\.)+`/,
      "attr-name": /\b\w+(?=[ \t]*:(?![:=]))/,
      operator: /:(?:=|::?)|<[-:=]?|=(?:=|<?:?)|>=?:?|\\=:?|!!?|[|#+\-*\/,~^@]|\b(?:andthen|div|mod|orelse)\b/,
      punctuation: /[\[\](){}.:;?]/
    };
  }
  return oz_1;
}
var parigp_1;
var hasRequiredParigp;
function requireParigp() {
  if (hasRequiredParigp) return parigp_1;
  hasRequiredParigp = 1;
  parigp_1 = parigp;
  parigp.displayName = "parigp";
  parigp.aliases = [];
  function parigp(Prism2) {
    Prism2.languages.parigp = {
      comment: /\/\*[\s\S]*?\*\/|\\\\.*/,
      string: {
        pattern: /"(?:[^"\\\r\n]|\\.)*"/,
        greedy: true
      },
      // PARI/GP does not care about white spaces at all
      // so let's process the keywords to build an appropriate regexp
      // (e.g. "b *r *e *a *k", etc.)
      keyword: function() {
        var keywords = [
          "breakpoint",
          "break",
          "dbg_down",
          "dbg_err",
          "dbg_up",
          "dbg_x",
          "forcomposite",
          "fordiv",
          "forell",
          "forpart",
          "forprime",
          "forstep",
          "forsubgroup",
          "forvec",
          "for",
          "iferr",
          "if",
          "local",
          "my",
          "next",
          "return",
          "until",
          "while"
        ];
        keywords = keywords.map(function(keyword) {
          return keyword.split("").join(" *");
        }).join("|");
        return RegExp("\\b(?:" + keywords + ")\\b");
      }(),
      function: /\b\w(?:[\w ]*\w)?(?= *\()/,
      number: {
        // The lookbehind and the negative lookahead prevent from breaking the .. operator
        pattern: /((?:\. *\. *)?)(?:\b\d(?: *\d)*(?: *(?!\. *\.)\.(?: *\d)*)?|\. *\d(?: *\d)*)(?: *e *(?:[+-] *)?\d(?: *\d)*)?/i,
        lookbehind: true
      },
      operator: /\. *\.|[*\/!](?: *=)?|%(?: *=|(?: *#)?(?: *')*)?|\+(?: *[+=])?|-(?: *[-=>])?|<(?: *>|(?: *<)?(?: *=)?)?|>(?: *>)?(?: *=)?|=(?: *=){0,2}|\\(?: *\/)?(?: *=)?|&(?: *&)?|\| *\||['#~^]/,
      punctuation: /[\[\]{}().,:;|]/
    };
  }
  return parigp_1;
}
var parser_1;
var hasRequiredParser;
function requireParser() {
  if (hasRequiredParser) return parser_1;
  hasRequiredParser = 1;
  parser_1 = parser;
  parser.displayName = "parser";
  parser.aliases = [];
  function parser(Prism2) {
    (function(Prism3) {
      var parser2 = Prism3.languages.parser = Prism3.languages.extend("markup", {
        keyword: {
          pattern: /(^|[^^])(?:\^(?:case|eval|for|if|switch|throw)\b|@(?:BASE|CLASS|GET(?:_DEFAULT)?|OPTIONS|SET_DEFAULT|USE)\b)/,
          lookbehind: true
        },
        variable: {
          pattern: /(^|[^^])\B\$(?:\w+|(?=[.{]))(?:(?:\.|::?)\w+)*(?:\.|::?)?/,
          lookbehind: true,
          inside: {
            punctuation: /\.|:+/
          }
        },
        function: {
          pattern: /(^|[^^])\B[@^]\w+(?:(?:\.|::?)\w+)*(?:\.|::?)?/,
          lookbehind: true,
          inside: {
            keyword: {
              pattern: /(^@)(?:GET_|SET_)/,
              lookbehind: true
            },
            punctuation: /\.|:+/
          }
        },
        escape: {
          pattern: /\^(?:[$^;@()\[\]{}"':]|#[a-f\d]*)/i,
          alias: "builtin"
        },
        punctuation: /[\[\](){};]/
      });
      parser2 = Prism3.languages.insertBefore("parser", "keyword", {
        "parser-comment": {
          pattern: /(\s)#.*/,
          lookbehind: true,
          alias: "comment"
        },
        expression: {
          // Allow for 3 levels of depth
          pattern: /(^|[^^])\((?:[^()]|\((?:[^()]|\((?:[^()])*\))*\))*\)/,
          greedy: true,
          lookbehind: true,
          inside: {
            string: {
              pattern: /(^|[^^])(["'])(?:(?!\2)[^^]|\^[\s\S])*\2/,
              lookbehind: true
            },
            keyword: parser2.keyword,
            variable: parser2.variable,
            function: parser2.function,
            boolean: /\b(?:false|true)\b/,
            number: /\b(?:0x[a-f\d]+|\d+(?:\.\d*)?(?:e[+-]?\d+)?)\b/i,
            escape: parser2.escape,
            operator: /[~+*\/\\%]|!(?:\|\|?|=)?|&&?|\|\|?|==|<[<=]?|>[>=]?|-[fd]?|\b(?:def|eq|ge|gt|in|is|le|lt|ne)\b/,
            punctuation: parser2.punctuation
          }
        }
      });
      Prism3.languages.insertBefore(
        "inside",
        "punctuation",
        {
          expression: parser2.expression,
          keyword: parser2.keyword,
          variable: parser2.variable,
          function: parser2.function,
          escape: parser2.escape,
          "parser-punctuation": {
            pattern: parser2.punctuation,
            alias: "punctuation"
          }
        },
        parser2["tag"].inside["attr-value"]
      );
    })(Prism2);
  }
  return parser_1;
}
var pascal_1;
var hasRequiredPascal;
function requirePascal() {
  if (hasRequiredPascal) return pascal_1;
  hasRequiredPascal = 1;
  pascal_1 = pascal;
  pascal.displayName = "pascal";
  pascal.aliases = ["objectpascal"];
  function pascal(Prism2) {
    Prism2.languages.pascal = {
      directive: {
        pattern: /\{\$[\s\S]*?\}/,
        greedy: true,
        alias: ["marco", "property"]
      },
      comment: {
        pattern: /\(\*[\s\S]*?\*\)|\{[\s\S]*?\}|\/\/.*/,
        greedy: true
      },
      string: {
        pattern: /(?:'(?:''|[^'\r\n])*'(?!')|#[&$%]?[a-f\d]+)+|\^[a-z]/i,
        greedy: true
      },
      asm: {
        pattern: /(\basm\b)[\s\S]+?(?=\bend\s*[;[])/i,
        lookbehind: true,
        greedy: true,
        inside: null
        // see below
      },
      keyword: [
        {
          // Turbo Pascal
          pattern: /(^|[^&])\b(?:absolute|array|asm|begin|case|const|constructor|destructor|do|downto|else|end|file|for|function|goto|if|implementation|inherited|inline|interface|label|nil|object|of|operator|packed|procedure|program|record|reintroduce|repeat|self|set|string|then|to|type|unit|until|uses|var|while|with)\b/i,
          lookbehind: true
        },
        {
          // Free Pascal
          pattern: /(^|[^&])\b(?:dispose|exit|false|new|true)\b/i,
          lookbehind: true
        },
        {
          // Object Pascal
          pattern: /(^|[^&])\b(?:class|dispinterface|except|exports|finalization|finally|initialization|inline|library|on|out|packed|property|raise|resourcestring|threadvar|try)\b/i,
          lookbehind: true
        },
        {
          // Modifiers
          pattern: /(^|[^&])\b(?:absolute|abstract|alias|assembler|bitpacked|break|cdecl|continue|cppdecl|cvar|default|deprecated|dynamic|enumerator|experimental|export|external|far|far16|forward|generic|helper|implements|index|interrupt|iochecks|local|message|name|near|nodefault|noreturn|nostackframe|oldfpccall|otherwise|overload|override|pascal|platform|private|protected|public|published|read|register|reintroduce|result|safecall|saveregisters|softfloat|specialize|static|stdcall|stored|strict|unaligned|unimplemented|varargs|virtual|write)\b/i,
          lookbehind: true
        }
      ],
      number: [
        // Hexadecimal, octal and binary
        /(?:[&%]\d+|\$[a-f\d]+)/i,
        // Decimal
        /\b\d+(?:\.\d+)?(?:e[+-]?\d+)?/i
      ],
      operator: [
        /\.\.|\*\*|:=|<[<=>]?|>[>=]?|[+\-*\/]=?|[@^=]/,
        {
          pattern: /(^|[^&])\b(?:and|as|div|exclude|in|include|is|mod|not|or|shl|shr|xor)\b/,
          lookbehind: true
        }
      ],
      punctuation: /\(\.|\.\)|[()\[\]:;,.]/
    };
    Prism2.languages.pascal.asm.inside = Prism2.languages.extend("pascal", {
      asm: void 0,
      keyword: void 0,
      operator: void 0
    });
    Prism2.languages.objectpascal = Prism2.languages.pascal;
  }
  return pascal_1;
}
var pascaligo_1;
var hasRequiredPascaligo;
function requirePascaligo() {
  if (hasRequiredPascaligo) return pascaligo_1;
  hasRequiredPascaligo = 1;
  pascaligo_1 = pascaligo;
  pascaligo.displayName = "pascaligo";
  pascaligo.aliases = [];
  function pascaligo(Prism2) {
    (function(Prism3) {
      var braces = /\((?:[^()]|\((?:[^()]|\([^()]*\))*\))*\)/.source;
      var type = /(?:\b\w+(?:<braces>)?|<braces>)/.source.replace(
        /<braces>/g,
        function() {
          return braces;
        }
      );
      var pascaligo2 = Prism3.languages.pascaligo = {
        comment: /\(\*[\s\S]+?\*\)|\/\/.*/,
        string: {
          pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1|\^[a-z]/i,
          greedy: true
        },
        "class-name": [
          {
            pattern: RegExp(
              /(\btype\s+\w+\s+is\s+)<type>/.source.replace(
                /<type>/g,
                function() {
                  return type;
                }
              ),
              "i"
            ),
            lookbehind: true,
            inside: null
            // see below
          },
          {
            pattern: RegExp(
              /<type>(?=\s+is\b)/.source.replace(/<type>/g, function() {
                return type;
              }),
              "i"
            ),
            inside: null
            // see below
          },
          {
            pattern: RegExp(
              /(:\s*)<type>/.source.replace(/<type>/g, function() {
                return type;
              })
            ),
            lookbehind: true,
            inside: null
            // see below
          }
        ],
        keyword: {
          pattern: /(^|[^&])\b(?:begin|block|case|const|else|end|fail|for|from|function|if|is|nil|of|remove|return|skip|then|type|var|while|with)\b/i,
          lookbehind: true
        },
        boolean: {
          pattern: /(^|[^&])\b(?:False|True)\b/i,
          lookbehind: true
        },
        builtin: {
          pattern: /(^|[^&])\b(?:bool|int|list|map|nat|record|string|unit)\b/i,
          lookbehind: true
        },
        function: /\b\w+(?=\s*\()/,
        number: [
          // Hexadecimal, octal and binary
          /%[01]+|&[0-7]+|\$[a-f\d]+/i,
          // Decimal
          /\b\d+(?:\.\d+)?(?:e[+-]?\d+)?(?:mtz|n)?/i
        ],
        operator: /->|=\/=|\.\.|\*\*|:=|<[<=>]?|>[>=]?|[+\-*\/]=?|[@^=|]|\b(?:and|mod|or)\b/,
        punctuation: /\(\.|\.\)|[()\[\]:;,.{}]/
      };
      var classNameInside = [
        "comment",
        "keyword",
        "builtin",
        "operator",
        "punctuation"
      ].reduce(function(accum, key) {
        accum[key] = pascaligo2[key];
        return accum;
      }, {});
      pascaligo2["class-name"].forEach(function(p) {
        p.inside = classNameInside;
      });
    })(Prism2);
  }
  return pascaligo_1;
}
var pcaxis_1;
var hasRequiredPcaxis;
function requirePcaxis() {
  if (hasRequiredPcaxis) return pcaxis_1;
  hasRequiredPcaxis = 1;
  pcaxis_1 = pcaxis;
  pcaxis.displayName = "pcaxis";
  pcaxis.aliases = ["px"];
  function pcaxis(Prism2) {
    Prism2.languages.pcaxis = {
      string: /"[^"]*"/,
      keyword: {
        pattern: /((?:^|;)\s*)[-A-Z\d]+(?:\s*\[[-\w]+\])?(?:\s*\("[^"]*"(?:,\s*"[^"]*")*\))?(?=\s*=)/,
        lookbehind: true,
        greedy: true,
        inside: {
          keyword: /^[-A-Z\d]+/,
          language: {
            pattern: /^(\s*)\[[-\w]+\]/,
            lookbehind: true,
            inside: {
              punctuation: /^\[|\]$/,
              property: /[-\w]+/
            }
          },
          "sub-key": {
            pattern: /^(\s*)\S[\s\S]*/,
            lookbehind: true,
            inside: {
              parameter: {
                pattern: /"[^"]*"/,
                alias: "property"
              },
              punctuation: /^\(|\)$|,/
            }
          }
        }
      },
      operator: /=/,
      tlist: {
        pattern: /TLIST\s*\(\s*\w+(?:(?:\s*,\s*"[^"]*")+|\s*,\s*"[^"]*"-"[^"]*")?\s*\)/,
        greedy: true,
        inside: {
          function: /^TLIST/,
          property: {
            pattern: /^(\s*\(\s*)\w+/,
            lookbehind: true
          },
          string: /"[^"]*"/,
          punctuation: /[(),]/,
          operator: /-/
        }
      },
      punctuation: /[;,]/,
      number: {
        pattern: /(^|\s)\d+(?:\.\d+)?(?!\S)/,
        lookbehind: true
      },
      boolean: /NO|YES/
    };
    Prism2.languages.px = Prism2.languages.pcaxis;
  }
  return pcaxis_1;
}
var peoplecode_1;
var hasRequiredPeoplecode;
function requirePeoplecode() {
  if (hasRequiredPeoplecode) return peoplecode_1;
  hasRequiredPeoplecode = 1;
  peoplecode_1 = peoplecode;
  peoplecode.displayName = "peoplecode";
  peoplecode.aliases = ["pcode"];
  function peoplecode(Prism2) {
    Prism2.languages.peoplecode = {
      comment: RegExp(
        [
          // C-style multiline comments
          /\/\*[\s\S]*?\*\//.source,
          // REM comments
          /\bREM[^;]*;/.source,
          // Nested <* *> comments
          /<\*(?:[^<*]|\*(?!>)|<(?!\*)|<\*(?:(?!\*>)[\s\S])*\*>)*\*>/.source,
          // /+ +/ comments
          /\/\+[\s\S]*?\+\//.source
        ].join("|")
      ),
      string: {
        pattern: /'(?:''|[^'\r\n])*'(?!')|"(?:""|[^"\r\n])*"(?!")/,
        greedy: true
      },
      variable: /%\w+/,
      "function-definition": {
        pattern: /((?:^|[^\w-])(?:function|method)\s+)\w+/i,
        lookbehind: true,
        alias: "function"
      },
      "class-name": {
        pattern: /((?:^|[^-\w])(?:as|catch|class|component|create|extends|global|implements|instance|local|of|property|returns)\s+)\w+(?::\w+)*/i,
        lookbehind: true,
        inside: {
          punctuation: /:/
        }
      },
      keyword: /\b(?:abstract|alias|as|catch|class|component|constant|create|declare|else|end-(?:class|evaluate|for|function|get|if|method|set|try|while)|evaluate|extends|for|function|get|global|if|implements|import|instance|library|local|method|null|of|out|peopleCode|private|program|property|protected|readonly|ref|repeat|returns?|set|step|then|throw|to|try|until|value|when(?:-other)?|while)\b/i,
      "operator-keyword": {
        pattern: /\b(?:and|not|or)\b/i,
        alias: "operator"
      },
      function: /[_a-z]\w*(?=\s*\()/i,
      boolean: /\b(?:false|true)\b/i,
      number: /\b\d+(?:\.\d+)?\b/,
      operator: /<>|[<>]=?|!=|\*\*|[-+*/|=@]/,
      punctuation: /[:.;,()[\]]/
    };
    Prism2.languages.pcode = Prism2.languages.peoplecode;
  }
  return peoplecode_1;
}
var perl_1;
var hasRequiredPerl;
function requirePerl() {
  if (hasRequiredPerl) return perl_1;
  hasRequiredPerl = 1;
  perl_1 = perl;
  perl.displayName = "perl";
  perl.aliases = [];
  function perl(Prism2) {
    (function(Prism3) {
      var brackets = /(?:\((?:[^()\\]|\\[\s\S])*\)|\{(?:[^{}\\]|\\[\s\S])*\}|\[(?:[^[\]\\]|\\[\s\S])*\]|<(?:[^<>\\]|\\[\s\S])*>)/.source;
      Prism3.languages.perl = {
        comment: [
          {
            // POD
            pattern: /(^\s*)=\w[\s\S]*?=cut.*/m,
            lookbehind: true,
            greedy: true
          },
          {
            pattern: /(^|[^\\$])#.*/,
            lookbehind: true,
            greedy: true
          }
        ],
        // TODO Could be nice to handle Heredoc too.
        string: [
          {
            pattern: RegExp(
              /\b(?:q|qq|qw|qx)(?![a-zA-Z0-9])\s*/.source + "(?:" + [
                // q/.../
                /([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
                // q a...a
                // eslint-disable-next-line regexp/strict
                /([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,
                // q(...)
                // q{...}
                // q[...]
                // q<...>
                brackets
              ].join("|") + ")"
            ),
            greedy: true
          },
          // "...", `...`
          {
            pattern: /("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/,
            greedy: true
          },
          // '...'
          // FIXME Multi-line single-quoted strings are not supported as they would break variables containing '
          {
            pattern: /'(?:[^'\\\r\n]|\\.)*'/,
            greedy: true
          }
        ],
        regex: [
          {
            pattern: RegExp(
              /\b(?:m|qr)(?![a-zA-Z0-9])\s*/.source + "(?:" + [
                // m/.../
                /([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
                // m a...a
                // eslint-disable-next-line regexp/strict
                /([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,
                // m(...)
                // m{...}
                // m[...]
                // m<...>
                brackets
              ].join("|") + ")" + /[msixpodualngc]*/.source
            ),
            greedy: true
          },
          // The lookbehinds prevent -s from breaking
          {
            pattern: RegExp(
              /(^|[^-])\b(?:s|tr|y)(?![a-zA-Z0-9])\s*/.source + "(?:" + [
                // s/.../.../
                // eslint-disable-next-line regexp/strict
                /([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,
                // s a...a...a
                // eslint-disable-next-line regexp/strict
                /([a-zA-Z0-9])(?:(?!\3)[^\\]|\\[\s\S])*\3(?:(?!\3)[^\\]|\\[\s\S])*\3/.source,
                // s(...)(...)
                // s{...}{...}
                // s[...][...]
                // s<...><...>
                // s(...)[...]
                brackets + /\s*/.source + brackets
              ].join("|") + ")" + /[msixpodualngcer]*/.source
            ),
            lookbehind: true,
            greedy: true
          },
          // /.../
          // The look-ahead tries to prevent two divisions on
          // the same line from being highlighted as regex.
          // This does not support multi-line regex.
          {
            pattern: /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|x|xor)\b))/,
            greedy: true
          }
        ],
        // FIXME Not sure about the handling of ::, ', and #
        variable: [
          // ${^POSTMATCH}
          /[&*$@%]\{\^[A-Z]+\}/,
          // $^V
          /[&*$@%]\^[A-Z_]/,
          // ${...}
          /[&*$@%]#?(?=\{)/,
          // $foo
          /[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+(?![\w$]))+(?:::)*/,
          // $1
          /[&*$@%]\d+/,
          // $_, @_, %!
          // The negative lookahead prevents from breaking the %= operator
          /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/
        ],
        filehandle: {
          // <>, <FOO>, _
          pattern: /<(?![<=])\S*?>|\b_\b/,
          alias: "symbol"
        },
        "v-string": {
          // v1.2, 1.2.3
          pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/,
          alias: "string"
        },
        function: {
          pattern: /(\bsub[ \t]+)\w+/,
          lookbehind: true
        },
        keyword: /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
        number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
        operator: /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|xor)\b/,
        punctuation: /[{}[\];(),:]/
      };
    })(Prism2);
  }
  return perl_1;
}
var phpExtras_1;
var hasRequiredPhpExtras;
function requirePhpExtras() {
  if (hasRequiredPhpExtras) return phpExtras_1;
  hasRequiredPhpExtras = 1;
  var refractorPhp = requirePhp();
  phpExtras_1 = phpExtras;
  phpExtras.displayName = "phpExtras";
  phpExtras.aliases = [];
  function phpExtras(Prism2) {
    Prism2.register(refractorPhp);
    Prism2.languages.insertBefore("php", "variable", {
      this: {
        pattern: /\$this\b/,
        alias: "keyword"
      },
      global: /\$(?:GLOBALS|HTTP_RAW_POST_DATA|_(?:COOKIE|ENV|FILES|GET|POST|REQUEST|SERVER|SESSION)|argc|argv|http_response_header|php_errormsg)\b/,
      scope: {
        pattern: /\b[\w\\]+::/,
        inside: {
          keyword: /\b(?:parent|self|static)\b/,
          punctuation: /::|\\/
        }
      }
    });
  }
  return phpExtras_1;
}
var phpdoc_1;
var hasRequiredPhpdoc;
function requirePhpdoc() {
  if (hasRequiredPhpdoc) return phpdoc_1;
  hasRequiredPhpdoc = 1;
  var refractorPhp = requirePhp();
  var refractorJavadoclike = requireJavadoclike();
  phpdoc_1 = phpdoc;
  phpdoc.displayName = "phpdoc";
  phpdoc.aliases = [];
  function phpdoc(Prism2) {
    Prism2.register(refractorPhp);
    Prism2.register(refractorJavadoclike);
    (function(Prism3) {
      var typeExpression = /(?:\b[a-zA-Z]\w*|[|\\[\]])+/.source;
      Prism3.languages.phpdoc = Prism3.languages.extend("javadoclike", {
        parameter: {
          pattern: RegExp(
            "(@(?:global|param|property(?:-read|-write)?|var)\\s+(?:" + typeExpression + "\\s+)?)\\$\\w+"
          ),
          lookbehind: true
        }
      });
      Prism3.languages.insertBefore("phpdoc", "keyword", {
        "class-name": [
          {
            pattern: RegExp(
              "(@(?:global|package|param|property(?:-read|-write)?|return|subpackage|throws|var)\\s+)" + typeExpression
            ),
            lookbehind: true,
            inside: {
              keyword: /\b(?:array|bool|boolean|callback|double|false|float|int|integer|mixed|null|object|resource|self|string|true|void)\b/,
              punctuation: /[|\\[\]()]/
            }
          }
        ]
      });
      Prism3.languages.javadoclike.addSupport("php", Prism3.languages.phpdoc);
    })(Prism2);
  }
  return phpdoc_1;
}
var plsql_1;
var hasRequiredPlsql;
function requirePlsql() {
  if (hasRequiredPlsql) return plsql_1;
  hasRequiredPlsql = 1;
  var refractorSql = requireSql();
  plsql_1 = plsql;
  plsql.displayName = "plsql";
  plsql.aliases = [];
  function plsql(Prism2) {
    Prism2.register(refractorSql);
    Prism2.languages.plsql = Prism2.languages.extend("sql", {
      comment: {
        pattern: /\/\*[\s\S]*?\*\/|--.*/,
        greedy: true
      },
      // https://docs.oracle.com/en/database/oracle/oracle-database/21/lnpls/plsql-reserved-words-keywords.html
      keyword: /\b(?:A|ACCESSIBLE|ADD|AGENT|AGGREGATE|ALL|ALTER|AND|ANY|ARRAY|AS|ASC|AT|ATTRIBUTE|AUTHID|AVG|BEGIN|BETWEEN|BFILE_BASE|BINARY|BLOB_BASE|BLOCK|BODY|BOTH|BOUND|BULK|BY|BYTE|C|CALL|CALLING|CASCADE|CASE|CHAR|CHARACTER|CHARSET|CHARSETFORM|CHARSETID|CHAR_BASE|CHECK|CLOB_BASE|CLONE|CLOSE|CLUSTER|CLUSTERS|COLAUTH|COLLECT|COLUMNS|COMMENT|COMMIT|COMMITTED|COMPILED|COMPRESS|CONNECT|CONSTANT|CONSTRUCTOR|CONTEXT|CONTINUE|CONVERT|COUNT|CRASH|CREATE|CREDENTIAL|CURRENT|CURSOR|CUSTOMDATUM|DANGLING|DATA|DATE|DATE_BASE|DAY|DECLARE|DEFAULT|DEFINE|DELETE|DESC|DETERMINISTIC|DIRECTORY|DISTINCT|DOUBLE|DROP|DURATION|ELEMENT|ELSE|ELSIF|EMPTY|END|ESCAPE|EXCEPT|EXCEPTION|EXCEPTIONS|EXCLUSIVE|EXECUTE|EXISTS|EXIT|EXTERNAL|FETCH|FINAL|FIRST|FIXED|FLOAT|FOR|FORALL|FORCE|FROM|FUNCTION|GENERAL|GOTO|GRANT|GROUP|HASH|HAVING|HEAP|HIDDEN|HOUR|IDENTIFIED|IF|IMMEDIATE|IMMUTABLE|IN|INCLUDING|INDEX|INDEXES|INDICATOR|INDICES|INFINITE|INSERT|INSTANTIABLE|INT|INTERFACE|INTERSECT|INTERVAL|INTO|INVALIDATE|IS|ISOLATION|JAVA|LANGUAGE|LARGE|LEADING|LENGTH|LEVEL|LIBRARY|LIKE|LIKE2|LIKE4|LIKEC|LIMIT|LIMITED|LOCAL|LOCK|LONG|LOOP|MAP|MAX|MAXLEN|MEMBER|MERGE|MIN|MINUS|MINUTE|MOD|MODE|MODIFY|MONTH|MULTISET|MUTABLE|NAME|NAN|NATIONAL|NATIVE|NCHAR|NEW|NOCOMPRESS|NOCOPY|NOT|NOWAIT|NULL|NUMBER_BASE|OBJECT|OCICOLL|OCIDATE|OCIDATETIME|OCIDURATION|OCIINTERVAL|OCILOBLOCATOR|OCINUMBER|OCIRAW|OCIREF|OCIREFCURSOR|OCIROWID|OCISTRING|OCITYPE|OF|OLD|ON|ONLY|OPAQUE|OPEN|OPERATOR|OPTION|OR|ORACLE|ORADATA|ORDER|ORGANIZATION|ORLANY|ORLVARY|OTHERS|OUT|OVERLAPS|OVERRIDING|PACKAGE|PARALLEL_ENABLE|PARAMETER|PARAMETERS|PARENT|PARTITION|PASCAL|PERSISTABLE|PIPE|PIPELINED|PLUGGABLE|POLYMORPHIC|PRAGMA|PRECISION|PRIOR|PRIVATE|PROCEDURE|PUBLIC|RAISE|RANGE|RAW|READ|RECORD|REF|REFERENCE|RELIES_ON|REM|REMAINDER|RENAME|RESOURCE|RESULT|RESULT_CACHE|RETURN|RETURNING|REVERSE|REVOKE|ROLLBACK|ROW|SAMPLE|SAVE|SAVEPOINT|SB1|SB2|SB4|SECOND|SEGMENT|SELECT|SELF|SEPARATE|SEQUENCE|SERIALIZABLE|SET|SHARE|SHORT|SIZE|SIZE_T|SOME|SPARSE|SQL|SQLCODE|SQLDATA|SQLNAME|SQLSTATE|STANDARD|START|STATIC|STDDEV|STORED|STRING|STRUCT|STYLE|SUBMULTISET|SUBPARTITION|SUBSTITUTABLE|SUBTYPE|SUM|SYNONYM|TABAUTH|TABLE|TDO|THE|THEN|TIME|TIMESTAMP|TIMEZONE_ABBR|TIMEZONE_HOUR|TIMEZONE_MINUTE|TIMEZONE_REGION|TO|TRAILING|TRANSACTION|TRANSACTIONAL|TRUSTED|TYPE|UB1|UB2|UB4|UNDER|UNION|UNIQUE|UNPLUG|UNSIGNED|UNTRUSTED|UPDATE|USE|USING|VALIST|VALUE|VALUES|VARIABLE|VARIANCE|VARRAY|VARYING|VIEW|VIEWS|VOID|WHEN|WHERE|WHILE|WITH|WORK|WRAPPED|WRITE|YEAR|ZONE)\b/i,
      // https://docs.oracle.com/en/database/oracle/oracle-database/21/lnpls/plsql-language-fundamentals.html#GUID-96A42F7C-7A71-4B90-8255-CA9C8BD9722E
      operator: /:=?|=>|[<>^~!]=|\.\.|\|\||\*\*|[-+*/%<>=@]/
    });
    Prism2.languages.insertBefore("plsql", "operator", {
      label: {
        pattern: /<<\s*\w+\s*>>/,
        alias: "symbol"
      }
    });
  }
  return plsql_1;
}
var powerquery_1;
var hasRequiredPowerquery;
function requirePowerquery() {
  if (hasRequiredPowerquery) return powerquery_1;
  hasRequiredPowerquery = 1;
  powerquery_1 = powerquery;
  powerquery.displayName = "powerquery";
  powerquery.aliases = [];
  function powerquery(Prism2) {
    Prism2.languages.powerquery = {
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: true,
        greedy: true
      },
      "quoted-identifier": {
        pattern: /#"(?:[^"\r\n]|"")*"(?!")/,
        greedy: true
      },
      string: {
        pattern: /(?:#!)?"(?:[^"\r\n]|"")*"(?!")/,
        greedy: true
      },
      constant: [
        /\bDay\.(?:Friday|Monday|Saturday|Sunday|Thursday|Tuesday|Wednesday)\b/,
        /\bTraceLevel\.(?:Critical|Error|Information|Verbose|Warning)\b/,
        /\bOccurrence\.(?:All|First|Last)\b/,
        /\bOrder\.(?:Ascending|Descending)\b/,
        /\bRoundingMode\.(?:AwayFromZero|Down|ToEven|TowardZero|Up)\b/,
        /\bMissingField\.(?:Error|Ignore|UseNull)\b/,
        /\bQuoteStyle\.(?:Csv|None)\b/,
        /\bJoinKind\.(?:FullOuter|Inner|LeftAnti|LeftOuter|RightAnti|RightOuter)\b/,
        /\bGroupKind\.(?:Global|Local)\b/,
        /\bExtraValues\.(?:Error|Ignore|List)\b/,
        /\bJoinAlgorithm\.(?:Dynamic|LeftHash|LeftIndex|PairwiseHash|RightHash|RightIndex|SortMerge)\b/,
        /\bJoinSide\.(?:Left|Right)\b/,
        /\bPrecision\.(?:Decimal|Double)\b/,
        /\bRelativePosition\.From(?:End|Start)\b/,
        /\bTextEncoding\.(?:Ascii|BigEndianUnicode|Unicode|Utf16|Utf8|Windows)\b/,
        /\b(?:Any|Binary|Date|DateTime|DateTimeZone|Duration|Function|Int16|Int32|Int64|Int8|List|Logical|None|Number|Record|Table|Text|Time)\.Type\b/,
        /\bnull\b/
      ],
      boolean: /\b(?:false|true)\b/,
      keyword: /\b(?:and|as|each|else|error|if|in|is|let|meta|not|nullable|optional|or|otherwise|section|shared|then|try|type)\b|#(?:binary|date|datetime|datetimezone|duration|infinity|nan|sections|shared|table|time)\b/,
      function: {
        pattern: /(^|[^#\w.])[a-z_][\w.]*(?=\s*\()/i,
        lookbehind: true
      },
      "data-type": {
        pattern: /\b(?:any|anynonnull|binary|date|datetime|datetimezone|duration|function|list|logical|none|number|record|table|text|time)\b/,
        alias: "class-name"
      },
      number: {
        pattern: /\b0x[\da-f]+\b|(?:[+-]?(?:\b\d+\.)?\b\d+|[+-]\.\d+|(^|[^.])\B\.\d+)(?:e[+-]?\d+)?\b/i,
        lookbehind: true
      },
      operator: /[-+*\/&?@^]|<(?:=>?|>)?|>=?|=>?|\.\.\.?/,
      punctuation: /[,;\[\](){}]/
    };
    Prism2.languages.pq = Prism2.languages["powerquery"];
    Prism2.languages.mscript = Prism2.languages["powerquery"];
  }
  return powerquery_1;
}
var powershell_1;
var hasRequiredPowershell;
function requirePowershell() {
  if (hasRequiredPowershell) return powershell_1;
  hasRequiredPowershell = 1;
  powershell_1 = powershell;
  powershell.displayName = "powershell";
  powershell.aliases = [];
  function powershell(Prism2) {
    (function(Prism3) {
      var powershell2 = Prism3.languages.powershell = {
        comment: [
          {
            pattern: /(^|[^`])<#[\s\S]*?#>/,
            lookbehind: true
          },
          {
            pattern: /(^|[^`])#.*/,
            lookbehind: true
          }
        ],
        string: [
          {
            pattern: /"(?:`[\s\S]|[^`"])*"/,
            greedy: true,
            inside: null
            // see below
          },
          {
            pattern: /'(?:[^']|'')*'/,
            greedy: true
          }
        ],
        // Matches name spaces as well as casts, attribute decorators. Force starting with letter to avoid matching array indices
        // Supports two levels of nested brackets (e.g. `[OutputType([System.Collections.Generic.List[int]])]`)
        namespace: /\[[a-z](?:\[(?:\[[^\]]*\]|[^\[\]])*\]|[^\[\]])*\]/i,
        boolean: /\$(?:false|true)\b/i,
        variable: /\$\w+\b/,
        // Cmdlets and aliases. Aliases should come last, otherwise "write" gets preferred over "write-host" for example
        // Get-Command | ?{ $_.ModuleName -match "Microsoft.PowerShell.(Util|Core|Management)" }
        // Get-Alias | ?{ $_.ReferencedCommand.Module.Name -match "Microsoft.PowerShell.(Util|Core|Management)" }
        function: [
          /\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|ForEach|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Sort|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Tee|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Where|Write)-[a-z]+\b/i,
          /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i
        ],
        // per http://technet.microsoft.com/en-us/library/hh847744.aspx
        keyword: /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
        operator: {
          pattern: /(^|\W)(?:!|-(?:b?(?:and|x?or)|as|(?:Not)?(?:Contains|In|Like|Match)|eq|ge|gt|is(?:Not)?|Join|le|lt|ne|not|Replace|sh[lr])\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
          lookbehind: true
        },
        punctuation: /[|{}[\];(),.]/
      };
      powershell2.string[0].inside = {
        function: {
          // Allow for one level of nesting
          pattern: /(^|[^`])\$\((?:\$\([^\r\n()]*\)|(?!\$\()[^\r\n)])*\)/,
          lookbehind: true,
          inside: powershell2
        },
        boolean: powershell2.boolean,
        variable: powershell2.variable
      };
    })(Prism2);
  }
  return powershell_1;
}
var processing_1;
var hasRequiredProcessing;
function requireProcessing() {
  if (hasRequiredProcessing) return processing_1;
  hasRequiredProcessing = 1;
  processing_1 = processing;
  processing.displayName = "processing";
  processing.aliases = [];
  function processing(Prism2) {
    Prism2.languages.processing = Prism2.languages.extend("clike", {
      keyword: /\b(?:break|case|catch|class|continue|default|else|extends|final|for|if|implements|import|new|null|private|public|return|static|super|switch|this|try|void|while)\b/,
      // Spaces are allowed between function name and parenthesis
      function: /\b\w+(?=\s*\()/,
      operator: /<[<=]?|>[>=]?|&&?|\|\|?|[%?]|[!=+\-*\/]=?/
    });
    Prism2.languages.insertBefore("processing", "number", {
      // Special case: XML is a type
      constant: /\b(?!XML\b)[A-Z][A-Z\d_]+\b/,
      type: {
        pattern: /\b(?:boolean|byte|char|color|double|float|int|[A-Z]\w*)\b/,
        alias: "class-name"
      }
    });
  }
  return processing_1;
}
var prolog_1;
var hasRequiredProlog;
function requireProlog() {
  if (hasRequiredProlog) return prolog_1;
  hasRequiredProlog = 1;
  prolog_1 = prolog;
  prolog.displayName = "prolog";
  prolog.aliases = [];
  function prolog(Prism2) {
    Prism2.languages.prolog = {
      // Syntax depends on the implementation
      comment: {
        pattern: /\/\*[\s\S]*?\*\/|%.*/,
        greedy: true
      },
      // Depending on the implementation, strings may allow escaped newlines and quote-escape
      string: {
        pattern: /(["'])(?:\1\1|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1(?!\1)/,
        greedy: true
      },
      builtin: /\b(?:fx|fy|xf[xy]?|yfx?)\b/,
      // FIXME: Should we list all null-ary predicates (not followed by a parenthesis) like halt, trace, etc.?
      function: /\b[a-z]\w*(?:(?=\()|\/\d+)/,
      number: /\b\d+(?:\.\d*)?/,
      // Custom operators are allowed
      operator: /[:\\=><\-?*@\/;+^|!$.]+|\b(?:is|mod|not|xor)\b/,
      punctuation: /[(){}\[\],]/
    };
  }
  return prolog_1;
}
var promql_1;
var hasRequiredPromql;
function requirePromql() {
  if (hasRequiredPromql) return promql_1;
  hasRequiredPromql = 1;
  promql_1 = promql;
  promql.displayName = "promql";
  promql.aliases = [];
  function promql(Prism2) {
    (function(Prism3) {
      var aggregations = [
        "sum",
        "min",
        "max",
        "avg",
        "group",
        "stddev",
        "stdvar",
        "count",
        "count_values",
        "bottomk",
        "topk",
        "quantile"
      ];
      var vectorMatching = [
        "on",
        "ignoring",
        "group_right",
        "group_left",
        "by",
        "without"
      ];
      var offsetModifier = ["offset"];
      var keywords = aggregations.concat(vectorMatching, offsetModifier);
      Prism3.languages.promql = {
        comment: {
          pattern: /(^[ \t]*)#.*/m,
          lookbehind: true
        },
        "vector-match": {
          // Match the comma-separated label lists inside vector matching:
          pattern: new RegExp(
            "((?:" + vectorMatching.join("|") + ")\\s*)\\([^)]*\\)"
          ),
          lookbehind: true,
          inside: {
            "label-key": {
              pattern: /\b[^,]+\b/,
              alias: "attr-name"
            },
            punctuation: /[(),]/
          }
        },
        "context-labels": {
          pattern: /\{[^{}]*\}/,
          inside: {
            "label-key": {
              pattern: /\b[a-z_]\w*(?=\s*(?:=|![=~]))/,
              alias: "attr-name"
            },
            "label-value": {
              pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/,
              greedy: true,
              alias: "attr-value"
            },
            punctuation: /\{|\}|=~?|![=~]|,/
          }
        },
        "context-range": [
          {
            pattern: /\[[\w\s:]+\]/,
            // [1m]
            inside: {
              punctuation: /\[|\]|:/,
              "range-duration": {
                pattern: /\b(?:\d+(?:[smhdwy]|ms))+\b/i,
                alias: "number"
              }
            }
          },
          {
            pattern: /(\boffset\s+)\w+/,
            // offset 1m
            lookbehind: true,
            inside: {
              "range-duration": {
                pattern: /\b(?:\d+(?:[smhdwy]|ms))+\b/i,
                alias: "number"
              }
            }
          }
        ],
        keyword: new RegExp("\\b(?:" + keywords.join("|") + ")\\b", "i"),
        function: /\b[a-z_]\w*(?=\s*\()/i,
        number: /[-+]?(?:(?:\b\d+(?:\.\d+)?|\B\.\d+)(?:e[-+]?\d+)?\b|\b(?:0x[0-9a-f]+|nan|inf)\b)/i,
        operator: /[\^*/%+-]|==|!=|<=|<|>=|>|\b(?:and|or|unless)\b/i,
        punctuation: /[{};()`,.[\]]/
      };
    })(Prism2);
  }
  return promql_1;
}
var properties_1;
var hasRequiredProperties;
function requireProperties() {
  if (hasRequiredProperties) return properties_1;
  hasRequiredProperties = 1;
  properties_1 = properties;
  properties.displayName = "properties";
  properties.aliases = [];
  function properties(Prism2) {
    Prism2.languages.properties = {
      comment: /^[ \t]*[#!].*$/m,
      "attr-value": {
        pattern: /(^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+(?: *[=:] *(?! )| ))(?:\\(?:\r\n|[\s\S])|[^\\\r\n])+/m,
        lookbehind: true
      },
      "attr-name": /^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+(?= *[=:]| )/m,
      punctuation: /[=:]/
    };
  }
  return properties_1;
}
var protobuf_1;
var hasRequiredProtobuf;
function requireProtobuf() {
  if (hasRequiredProtobuf) return protobuf_1;
  hasRequiredProtobuf = 1;
  protobuf_1 = protobuf;
  protobuf.displayName = "protobuf";
  protobuf.aliases = [];
  function protobuf(Prism2) {
    (function(Prism3) {
      var builtinTypes = /\b(?:bool|bytes|double|s?fixed(?:32|64)|float|[su]?int(?:32|64)|string)\b/;
      Prism3.languages.protobuf = Prism3.languages.extend("clike", {
        "class-name": [
          {
            pattern: /(\b(?:enum|extend|message|service)\s+)[A-Za-z_]\w*(?=\s*\{)/,
            lookbehind: true
          },
          {
            pattern: /(\b(?:rpc\s+\w+|returns)\s*\(\s*(?:stream\s+)?)\.?[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*(?=\s*\))/,
            lookbehind: true
          }
        ],
        keyword: /\b(?:enum|extend|extensions|import|message|oneof|option|optional|package|public|repeated|required|reserved|returns|rpc(?=\s+\w)|service|stream|syntax|to)\b(?!\s*=\s*\d)/,
        function: /\b[a-z_]\w*(?=\s*\()/i
      });
      Prism3.languages.insertBefore("protobuf", "operator", {
        map: {
          pattern: /\bmap<\s*[\w.]+\s*,\s*[\w.]+\s*>(?=\s+[a-z_]\w*\s*[=;])/i,
          alias: "class-name",
          inside: {
            punctuation: /[<>.,]/,
            builtin: builtinTypes
          }
        },
        builtin: builtinTypes,
        "positional-class-name": {
          pattern: /(?:\b|\B\.)[a-z_]\w*(?:\.[a-z_]\w*)*(?=\s+[a-z_]\w*\s*[=;])/i,
          alias: "class-name",
          inside: {
            punctuation: /\./
          }
        },
        annotation: {
          pattern: /(\[\s*)[a-z_]\w*(?=\s*=)/i,
          lookbehind: true
        }
      });
    })(Prism2);
  }
  return protobuf_1;
}
var psl_1;
var hasRequiredPsl;
function requirePsl() {
  if (hasRequiredPsl) return psl_1;
  hasRequiredPsl = 1;
  psl_1 = psl;
  psl.displayName = "psl";
  psl.aliases = [];
  function psl(Prism2) {
    Prism2.languages.psl = {
      comment: {
        pattern: /#.*/,
        greedy: true
      },
      string: {
        pattern: /"(?:\\.|[^\\"])*"/,
        greedy: true,
        inside: {
          symbol: /\\[ntrbA-Z"\\]/
        }
      },
      "heredoc-string": {
        pattern: /<<<([a-zA-Z_]\w*)[\r\n](?:.*[\r\n])*?\1\b/,
        alias: "string",
        greedy: true
      },
      keyword: /\b(?:__multi|__single|case|default|do|else|elsif|exit|export|for|foreach|function|if|last|line|local|next|requires|return|switch|until|while|word)\b/,
      constant: /\b(?:ALARM|CHART_ADD_GRAPH|CHART_DELETE_GRAPH|CHART_DESTROY|CHART_LOAD|CHART_PRINT|EOF|OFFLINE|OK|PSL_PROF_LOG|R_CHECK_HORIZ|R_CHECK_VERT|R_CLICKER|R_COLUMN|R_FRAME|R_ICON|R_LABEL|R_LABEL_CENTER|R_LIST_MULTIPLE|R_LIST_MULTIPLE_ND|R_LIST_SINGLE|R_LIST_SINGLE_ND|R_MENU|R_POPUP|R_POPUP_SCROLLED|R_RADIO_HORIZ|R_RADIO_VERT|R_ROW|R_SCALE_HORIZ|R_SCALE_VERT|R_SEP_HORIZ|R_SEP_VERT|R_SPINNER|R_TEXT_FIELD|R_TEXT_FIELD_LABEL|R_TOGGLE|TRIM_LEADING|TRIM_LEADING_AND_TRAILING|TRIM_REDUNDANT|TRIM_TRAILING|VOID|WARN)\b/,
      boolean: /\b(?:FALSE|False|NO|No|TRUE|True|YES|Yes|false|no|true|yes)\b/,
      variable: /\b(?:PslDebug|errno|exit_status)\b/,
      builtin: {
        pattern: /\b(?:PslExecute|PslFunctionCall|PslFunctionExists|PslSetOptions|_snmp_debug|acos|add_diary|annotate|annotate_get|ascii_to_ebcdic|asctime|asin|atan|atexit|batch_set|blackout|cat|ceil|chan_exists|change_state|close|code_cvt|cond_signal|cond_wait|console_type|convert_base|convert_date|convert_locale_date|cos|cosh|create|date|dcget_text|destroy|destroy_lock|dget_text|difference|dump_hist|ebcdic_to_ascii|encrypt|event_archive|event_catalog_get|event_check|event_query|event_range_manage|event_range_query|event_report|event_schedule|event_trigger|event_trigger2|execute|exists|exp|fabs|file|floor|fmod|fopen|fseek|ftell|full_discovery|get|get_chan_info|get_ranges|get_text|get_vars|getenv|gethostinfo|getpid|getpname|grep|history|history_get_retention|in_transition|index|int|internal|intersection|is_var|isnumber|join|kill|length|lines|lock|lock_info|log|log10|loge|matchline|msg_check|msg_get_format|msg_get_severity|msg_printf|msg_sprintf|ntharg|nthargf|nthline|nthlinef|num_bytes|num_consoles|pconfig|popen|poplines|pow|print|printf|proc_exists|process|random|read|readln|refresh_parameters|remote_check|remote_close|remote_event_query|remote_event_trigger|remote_file_send|remote_open|remove|replace|rindex|sec_check_priv|sec_store_get|sec_store_set|set|set_alarm_ranges|set_locale|share|sin|sinh|sleep|snmp_agent_config|snmp_agent_start|snmp_agent_stop|snmp_close|snmp_config|snmp_get|snmp_get_next|snmp_h_get|snmp_h_get_next|snmp_h_set|snmp_open|snmp_set|snmp_trap_ignore|snmp_trap_listen|snmp_trap_raise_std_trap|snmp_trap_receive|snmp_trap_register_im|snmp_trap_send|snmp_walk|sopen|sort|splitline|sprintf|sqrt|srandom|str_repeat|strcasecmp|subset|substr|system|tail|tan|tanh|text_domain|time|tmpnam|tolower|toupper|trace_psl_process|trim|union|unique|unlock|unset|va_arg|va_start|write)\b/,
        alias: "builtin-function"
      },
      "foreach-variable": {
        pattern: /(\bforeach\s+(?:(?:\w+\b|"(?:\\.|[^\\"])*")\s+){0,2})[_a-zA-Z]\w*(?=\s*\()/,
        lookbehind: true,
        greedy: true
      },
      function: /\b[_a-z]\w*\b(?=\s*\()/i,
      number: /\b(?:0x[0-9a-f]+|\d+(?:\.\d+)?)\b/i,
      operator: /--|\+\+|&&=?|\|\|=?|<<=?|>>=?|[=!]~|[-+*/%&|^!=<>]=?|\.|[:?]/,
      punctuation: /[(){}\[\];,]/
    };
  }
  return psl_1;
}
var pug_1;
var hasRequiredPug;
function requirePug() {
  if (hasRequiredPug) return pug_1;
  hasRequiredPug = 1;
  pug_1 = pug;
  pug.displayName = "pug";
  pug.aliases = [];
  function pug(Prism2) {
    (function(Prism3) {
      Prism3.languages.pug = {
        // Multiline stuff should appear before the rest
        // This handles both single-line and multi-line comments
        comment: {
          pattern: /(^([\t ]*))\/\/.*(?:(?:\r?\n|\r)\2[\t ].+)*/m,
          lookbehind: true
        },
        // All the tag-related part is in lookbehind
        // so that it can be highlighted by the "tag" pattern
        "multiline-script": {
          pattern: /(^([\t ]*)script\b.*\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ].+|\s*?(?=\r?\n|\r)))+/m,
          lookbehind: true,
          inside: Prism3.languages.javascript
        },
        // See at the end of the file for known filters
        filter: {
          pattern: /(^([\t ]*)):.+(?:(?:\r?\n|\r(?!\n))(?:\2[\t ].+|\s*?(?=\r?\n|\r)))+/m,
          lookbehind: true,
          inside: {
            "filter-name": {
              pattern: /^:[\w-]+/,
              alias: "variable"
            },
            text: /\S[\s\S]*/
          }
        },
        "multiline-plain-text": {
          pattern: /(^([\t ]*)[\w\-#.]+\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ].+|\s*?(?=\r?\n|\r)))+/m,
          lookbehind: true
        },
        markup: {
          pattern: /(^[\t ]*)<.+/m,
          lookbehind: true,
          inside: Prism3.languages.markup
        },
        doctype: {
          pattern: /((?:^|\n)[\t ]*)doctype(?: .+)?/,
          lookbehind: true
        },
        // This handle all conditional and loop keywords
        "flow-control": {
          pattern: /(^[\t ]*)(?:case|default|each|else|if|unless|when|while)\b(?: .+)?/m,
          lookbehind: true,
          inside: {
            each: {
              pattern: /^each .+? in\b/,
              inside: {
                keyword: /\b(?:each|in)\b/,
                punctuation: /,/
              }
            },
            branch: {
              pattern: /^(?:case|default|else|if|unless|when|while)\b/,
              alias: "keyword"
            },
            rest: Prism3.languages.javascript
          }
        },
        keyword: {
          pattern: /(^[\t ]*)(?:append|block|extends|include|prepend)\b.+/m,
          lookbehind: true
        },
        mixin: [
          // Declaration
          {
            pattern: /(^[\t ]*)mixin .+/m,
            lookbehind: true,
            inside: {
              keyword: /^mixin/,
              function: /\w+(?=\s*\(|\s*$)/,
              punctuation: /[(),.]/
            }
          },
          // Usage
          {
            pattern: /(^[\t ]*)\+.+/m,
            lookbehind: true,
            inside: {
              name: {
                pattern: /^\+\w+/,
                alias: "function"
              },
              rest: Prism3.languages.javascript
            }
          }
        ],
        script: {
          pattern: /(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]).+/m,
          lookbehind: true,
          inside: Prism3.languages.javascript
        },
        "plain-text": {
          pattern: /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]).+/m,
          lookbehind: true
        },
        tag: {
          pattern: /(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,
          lookbehind: true,
          inside: {
            attributes: [
              {
                pattern: /&[^(]+\([^)]+\)/,
                inside: Prism3.languages.javascript
              },
              {
                pattern: /\([^)]+\)/,
                inside: {
                  "attr-value": {
                    pattern: /(=\s*(?!\s))(?:\{[^}]*\}|[^,)\r\n]+)/,
                    lookbehind: true,
                    inside: Prism3.languages.javascript
                  },
                  "attr-name": /[\w-]+(?=\s*!?=|\s*[,)])/,
                  punctuation: /[!=(),]+/
                }
              }
            ],
            punctuation: /:/,
            "attr-id": /#[\w\-]+/,
            "attr-class": /\.[\w\-]+/
          }
        },
        code: [
          {
            pattern: /(^[\t ]*(?:-|!?=)).+/m,
            lookbehind: true,
            inside: Prism3.languages.javascript
          }
        ],
        punctuation: /[.\-!=|]+/
      };
      var filter_pattern = /(^([\t ]*)):<filter_name>(?:(?:\r?\n|\r(?!\n))(?:\2[\t ].+|\s*?(?=\r?\n|\r)))+/.source;
      var filters = [
        {
          filter: "atpl",
          language: "twig"
        },
        {
          filter: "coffee",
          language: "coffeescript"
        },
        "ejs",
        "handlebars",
        "less",
        "livescript",
        "markdown",
        {
          filter: "sass",
          language: "scss"
        },
        "stylus"
      ];
      var all_filters = {};
      for (var i = 0, l = filters.length; i < l; i++) {
        var filter = filters[i];
        filter = typeof filter === "string" ? {
          filter,
          language: filter
        } : filter;
        if (Prism3.languages[filter.language]) {
          all_filters["filter-" + filter.filter] = {
            pattern: RegExp(
              filter_pattern.replace("<filter_name>", function() {
                return filter.filter;
              }),
              "m"
            ),
            lookbehind: true,
            inside: {
              "filter-name": {
                pattern: /^:[\w-]+/,
                alias: "variable"
              },
              text: {
                pattern: /\S[\s\S]*/,
                alias: [filter.language, "language-" + filter.language],
                inside: Prism3.languages[filter.language]
              }
            }
          };
        }
      }
      Prism3.languages.insertBefore("pug", "filter", all_filters);
    })(Prism2);
  }
  return pug_1;
}
var puppet_1;
var hasRequiredPuppet;
function requirePuppet() {
  if (hasRequiredPuppet) return puppet_1;
  hasRequiredPuppet = 1;
  puppet_1 = puppet;
  puppet.displayName = "puppet";
  puppet.aliases = [];
  function puppet(Prism2) {
    (function(Prism3) {
      Prism3.languages.puppet = {
        heredoc: [
          // Matches the content of a quoted heredoc string (subject to interpolation)
          {
            pattern: /(@\("([^"\r\n\/):]+)"(?:\/[nrts$uL]*)?\).*(?:\r?\n|\r))(?:.*(?:\r?\n|\r(?!\n)))*?[ \t]*(?:\|[ \t]*)?(?:-[ \t]*)?\2/,
            lookbehind: true,
            alias: "string",
            inside: {
              // Matches the end tag
              punctuation: /(?=\S).*\S(?= *$)/
              // See interpolation below
            }
          },
          // Matches the content of an unquoted heredoc string (no interpolation)
          {
            pattern: /(@\(([^"\r\n\/):]+)(?:\/[nrts$uL]*)?\).*(?:\r?\n|\r))(?:.*(?:\r?\n|\r(?!\n)))*?[ \t]*(?:\|[ \t]*)?(?:-[ \t]*)?\2/,
            lookbehind: true,
            greedy: true,
            alias: "string",
            inside: {
              // Matches the end tag
              punctuation: /(?=\S).*\S(?= *$)/
            }
          },
          // Matches the start tag of heredoc strings
          {
            pattern: /@\("?(?:[^"\r\n\/):]+)"?(?:\/[nrts$uL]*)?\)/,
            alias: "string",
            inside: {
              punctuation: {
                pattern: /(\().+?(?=\))/,
                lookbehind: true
              }
            }
          }
        ],
        "multiline-comment": {
          pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
          lookbehind: true,
          greedy: true,
          alias: "comment"
        },
        regex: {
          // Must be prefixed with the keyword "node" or a non-word char
          pattern: /((?:\bnode\s+|[~=\(\[\{,]\s*|[=+]>\s*|^\s*))\/(?:[^\/\\]|\\[\s\S])+\/(?:[imx]+\b|\B)/,
          lookbehind: true,
          greedy: true,
          inside: {
            // Extended regexes must have the x flag. They can contain single-line comments.
            "extended-regex": {
              pattern: /^\/(?:[^\/\\]|\\[\s\S])+\/[im]*x[im]*$/,
              inside: {
                comment: /#.*/
              }
            }
          }
        },
        comment: {
          pattern: /(^|[^\\])#.*/,
          lookbehind: true,
          greedy: true
        },
        string: {
          // Allow for one nested level of double quotes inside interpolation
          pattern: /(["'])(?:\$\{(?:[^'"}]|(["'])(?:(?!\2)[^\\]|\\[\s\S])*\2)+\}|\$(?!\{)|(?!\1)[^\\$]|\\[\s\S])*\1/,
          greedy: true,
          inside: {
            "double-quoted": {
              pattern: /^"[\s\S]*"$/,
              inside: {
                // See interpolation below
              }
            }
          }
        },
        variable: {
          pattern: /\$(?:::)?\w+(?:::\w+)*/,
          inside: {
            punctuation: /::/
          }
        },
        "attr-name": /(?:\b\w+|\*)(?=\s*=>)/,
        function: [
          {
            pattern: /(\.)(?!\d)\w+/,
            lookbehind: true
          },
          /\b(?:contain|debug|err|fail|include|info|notice|realize|require|tag|warning)\b|\b(?!\d)\w+(?=\()/
        ],
        number: /\b(?:0x[a-f\d]+|\d+(?:\.\d+)?(?:e-?\d+)?)\b/i,
        boolean: /\b(?:false|true)\b/,
        // Includes words reserved for future use
        keyword: /\b(?:application|attr|case|class|consumes|default|define|else|elsif|function|if|import|inherits|node|private|produces|type|undef|unless)\b/,
        datatype: {
          pattern: /\b(?:Any|Array|Boolean|Callable|Catalogentry|Class|Collection|Data|Default|Enum|Float|Hash|Integer|NotUndef|Numeric|Optional|Pattern|Regexp|Resource|Runtime|Scalar|String|Struct|Tuple|Type|Undef|Variant)\b/,
          alias: "symbol"
        },
        operator: /=[=~>]?|![=~]?|<(?:<\|?|[=~|-])?|>[>=]?|->?|~>|\|>?>?|[*\/%+?]|\b(?:and|in|or)\b/,
        punctuation: /[\[\]{}().,;]|:+/
      };
      var interpolation = [
        {
          // Allow for one nested level of braces inside interpolation
          pattern: /(^|[^\\])\$\{(?:[^'"{}]|\{[^}]*\}|(["'])(?:(?!\2)[^\\]|\\[\s\S])*\2)+\}/,
          lookbehind: true,
          inside: {
            "short-variable": {
              // Negative look-ahead prevent wrong highlighting of functions
              pattern: /(^\$\{)(?!\w+\()(?:::)?\w+(?:::\w+)*/,
              lookbehind: true,
              alias: "variable",
              inside: {
                punctuation: /::/
              }
            },
            delimiter: {
              pattern: /^\$/,
              alias: "variable"
            },
            rest: Prism3.languages.puppet
          }
        },
        {
          pattern: /(^|[^\\])\$(?:::)?\w+(?:::\w+)*/,
          lookbehind: true,
          alias: "variable",
          inside: {
            punctuation: /::/
          }
        }
      ];
      Prism3.languages.puppet["heredoc"][0].inside.interpolation = interpolation;
      Prism3.languages.puppet["string"].inside["double-quoted"].inside.interpolation = interpolation;
    })(Prism2);
  }
  return puppet_1;
}
var pure_1;
var hasRequiredPure;
function requirePure() {
  if (hasRequiredPure) return pure_1;
  hasRequiredPure = 1;
  pure_1 = pure;
  pure.displayName = "pure";
  pure.aliases = [];
  function pure(Prism2) {
    (function(Prism3) {
      Prism3.languages.pure = {
        comment: [
          {
            pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
            lookbehind: true
          },
          {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true
          },
          /#!.+/
        ],
        "inline-lang": {
          pattern: /%<[\s\S]+?%>/,
          greedy: true,
          inside: {
            lang: {
              pattern: /(^%< *)-\*-.+?-\*-/,
              lookbehind: true,
              alias: "comment"
            },
            delimiter: {
              pattern: /^%<.*|%>$/,
              alias: "punctuation"
            }
          }
        },
        string: {
          pattern: /"(?:\\.|[^"\\\r\n])*"/,
          greedy: true
        },
        number: {
          // The look-behind prevents wrong highlighting of the .. operator
          pattern: /((?:\.\.)?)(?:\b(?:inf|nan)\b|\b0x[\da-f]+|(?:\b(?:0b)?\d+(?:\.\d+)?|\B\.\d+)(?:e[+-]?\d+)?L?)/i,
          lookbehind: true
        },
        keyword: /\b(?:NULL|ans|break|bt|case|catch|cd|clear|const|def|del|dump|else|end|exit|extern|false|force|help|if|infix[lr]?|interface|let|ls|mem|namespace|nonfix|of|otherwise|outfix|override|postfix|prefix|private|public|pwd|quit|run|save|show|stats|then|throw|trace|true|type|underride|using|when|with)\b/,
        function: /\b(?:abs|add_(?:addr|constdef|(?:fundef|interface|macdef|typedef)(?:_at)?|vardef)|all|any|applp?|arity|bigintp?|blob(?:_crc|_size|p)?|boolp?|byte_c?string(?:_pointer)?|byte_(?:matrix|pointer)|calloc|cat|catmap|ceil|char[ps]?|check_ptrtag|chr|clear_sentry|clearsym|closurep?|cmatrixp?|cols?|colcat(?:map)?|colmap|colrev|colvector(?:p|seq)?|complex(?:_float_(?:matrix|pointer)|_matrix(?:_view)?|_pointer|p)?|conj|cookedp?|cst|cstring(?:_(?:dup|list|vector))?|curry3?|cyclen?|del_(?:constdef|fundef|interface|macdef|typedef|vardef)|delete|diag(?:mat)?|dim|dmatrixp?|do|double(?:_matrix(?:_view)?|_pointer|p)?|dowith3?|drop|dropwhile|eval(?:cmd)?|exactp|filter|fix|fixity|flip|float(?:_matrix|_pointer)|floor|fold[lr]1?|frac|free|funp?|functionp?|gcd|get(?:_(?:byte|constdef|double|float|fundef|int(?:64)?|interface(?:_typedef)?|long|macdef|pointer|ptrtag|sentry|short|string|typedef|vardef))?|globsym|hash|head|id|im|imatrixp?|index|inexactp|infp|init|insert|int(?:_matrix(?:_view)?|_pointer|p)?|int64_(?:matrix|pointer)|integerp?|iteraten?|iterwhile|join|keys?|lambdap?|last(?:err(?:pos)?)?|lcd|list[2p]?|listmap|make_ptrtag|malloc|map|matcat|matrixp?|max|member|min|nanp|nargs|nmatrixp?|null|numberp?|ord|pack(?:ed)?|pointer(?:_cast|_tag|_type|p)?|pow|pred|ptrtag|put(?:_(?:byte|double|float|int(?:64)?|long|pointer|short|string))?|rationalp?|re|realp?|realloc|recordp?|redim|reduce(?:_with)?|refp?|repeatn?|reverse|rlistp?|round|rows?|rowcat(?:map)?|rowmap|rowrev|rowvector(?:p|seq)?|same|scan[lr]1?|sentry|sgn|short_(?:matrix|pointer)|slice|smatrixp?|sort|split|str|strcat|stream|stride|string(?:_(?:dup|list|vector)|p)?|subdiag(?:mat)?|submat|subseq2?|substr|succ|supdiag(?:mat)?|symbolp?|tail|take|takewhile|thunkp?|transpose|trunc|tuplep?|typep|ubyte|uint(?:64)?|ulong|uncurry3?|unref|unzip3?|update|ushort|vals?|varp?|vector(?:p|seq)?|void|zip3?|zipwith3?)\b/,
        special: {
          pattern: /\b__[a-z]+__\b/i,
          alias: "builtin"
        },
        // Any combination of operator chars can be an operator
        // eslint-disable-next-line no-misleading-character-class
        operator: /(?:[!"#$%&'*+,\-.\/:<=>?@\\^`|~\u00a1-\u00bf\u00d7-\u00f7\u20d0-\u2bff]|\b_+\b)+|\b(?:and|div|mod|not|or)\b/,
        // FIXME: How can we prevent | and , to be highlighted as operator when they are used alone?
        punctuation: /[(){}\[\];,|]/
      };
      var inlineLanguages = [
        "c",
        {
          lang: "c++",
          alias: "cpp"
        },
        "fortran"
      ];
      var inlineLanguageRe = /%< *-\*- *<lang>\d* *-\*-[\s\S]+?%>/.source;
      inlineLanguages.forEach(function(lang) {
        var alias2 = lang;
        if (typeof lang !== "string") {
          alias2 = lang.alias;
          lang = lang.lang;
        }
        if (Prism3.languages[alias2]) {
          var o = {};
          o["inline-lang-" + alias2] = {
            pattern: RegExp(
              inlineLanguageRe.replace(
                "<lang>",
                lang.replace(/([.+*?\/\\(){}\[\]])/g, "\\$1")
              ),
              "i"
            ),
            inside: Prism3.util.clone(Prism3.languages.pure["inline-lang"].inside)
          };
          o["inline-lang-" + alias2].inside.rest = Prism3.util.clone(
            Prism3.languages[alias2]
          );
          Prism3.languages.insertBefore("pure", "inline-lang", o);
        }
      });
      if (Prism3.languages.c) {
        Prism3.languages.pure["inline-lang"].inside.rest = Prism3.util.clone(
          Prism3.languages.c
        );
      }
    })(Prism2);
  }
  return pure_1;
}
var purebasic_1;
var hasRequiredPurebasic;
function requirePurebasic() {
  if (hasRequiredPurebasic) return purebasic_1;
  hasRequiredPurebasic = 1;
  purebasic_1 = purebasic;
  purebasic.displayName = "purebasic";
  purebasic.aliases = [];
  function purebasic(Prism2) {
    Prism2.languages.purebasic = Prism2.languages.extend("clike", {
      comment: /;.*/,
      keyword: /\b(?:align|and|as|break|calldebugger|case|compilercase|compilerdefault|compilerelse|compilerelseif|compilerendif|compilerendselect|compilererror|compilerif|compilerselect|continue|data|datasection|debug|debuglevel|declare|declarec|declarecdll|declaredll|declaremodule|default|define|dim|disableasm|disabledebugger|disableexplicit|else|elseif|enableasm|enabledebugger|enableexplicit|end|enddatasection|enddeclaremodule|endenumeration|endif|endimport|endinterface|endmacro|endmodule|endprocedure|endselect|endstructure|endstructureunion|endwith|enumeration|extends|fakereturn|for|foreach|forever|global|gosub|goto|if|import|importc|includebinary|includefile|includepath|interface|macro|module|newlist|newmap|next|not|or|procedure|procedurec|procedurecdll|proceduredll|procedurereturn|protected|prototype|prototypec|read|redim|repeat|restore|return|runtime|select|shared|static|step|structure|structureunion|swap|threaded|to|until|wend|while|with|xincludefile|xor)\b/i,
      function: /\b\w+(?:\.\w+)?\s*(?=\()/,
      number: /(?:\$[\da-f]+|\b-?(?:\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?)\b/i,
      operator: /(?:@\*?|\?|\*)\w+|-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|?\||[~^%?*/@]/
    });
    Prism2.languages.insertBefore("purebasic", "keyword", {
      tag: /#\w+\$?/,
      asm: {
        pattern: /(^[\t ]*)!.*/m,
        lookbehind: true,
        alias: "tag",
        inside: {
          comment: /;.*/,
          string: {
            pattern: /(["'`])(?:\\.|(?!\1)[^\\\r\n])*\1/,
            greedy: true
          },
          // Anonymous label references, i.e.: jmp @b
          "label-reference-anonymous": {
            pattern: /(!\s*j[a-z]+\s+)@[fb]/i,
            lookbehind: true,
            alias: "fasm-label"
          },
          // Named label reference, i.e.: jne label1
          "label-reference-addressed": {
            pattern: /(!\s*j[a-z]+\s+)[A-Z._?$@][\w.?$@~#]*/i,
            lookbehind: true,
            alias: "fasm-label"
          },
          keyword: [
            /\b(?:extern|global)\b[^;\r\n]*/i,
            /\b(?:CPU|DEFAULT|FLOAT)\b.*/
          ],
          function: {
            pattern: /^([\t ]*!\s*)[\da-z]+(?=\s|$)/im,
            lookbehind: true
          },
          "function-inline": {
            pattern: /(:\s*)[\da-z]+(?=\s)/i,
            lookbehind: true,
            alias: "function"
          },
          label: {
            pattern: /^([\t ]*!\s*)[A-Za-z._?$@][\w.?$@~#]*(?=:)/m,
            lookbehind: true,
            alias: "fasm-label"
          },
          register: /\b(?:st\d|[xyz]mm\d\d?|[cdt]r\d|r\d\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp|di|si|sp)|[cdefgs]s|mm\d+)\b/i,
          number: /(?:\b|-|(?=\$))(?:0[hx](?:[\da-f]*\.)?[\da-f]+(?:p[+-]?\d+)?|\d[\da-f]+[hx]|\$\d[\da-f]*|0[oq][0-7]+|[0-7]+[oq]|0[by][01]+|[01]+[by]|0[dt]\d+|(?:\d+(?:\.\d+)?|\.\d+)(?:\.?e[+-]?\d+)?[dt]?)\b/i,
          operator: /[\[\]*+\-/%<>=&|$!,.:]/
        }
      }
    });
    delete Prism2.languages.purebasic["class-name"];
    delete Prism2.languages.purebasic["boolean"];
    Prism2.languages.pbfasm = Prism2.languages["purebasic"];
  }
  return purebasic_1;
}
var purescript_1;
var hasRequiredPurescript;
function requirePurescript() {
  if (hasRequiredPurescript) return purescript_1;
  hasRequiredPurescript = 1;
  var refractorHaskell = requireHaskell();
  purescript_1 = purescript;
  purescript.displayName = "purescript";
  purescript.aliases = ["purs"];
  function purescript(Prism2) {
    Prism2.register(refractorHaskell);
    Prism2.languages.purescript = Prism2.languages.extend("haskell", {
      keyword: /\b(?:ado|case|class|data|derive|do|else|forall|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b|∀/,
      "import-statement": {
        // The imported or hidden names are not included in this import
        // statement. This is because we want to highlight those exactly like
        // we do for the names in the program.
        pattern: /(^[\t ]*)import\s+[A-Z][\w']*(?:\.[A-Z][\w']*)*(?:\s+as\s+[A-Z][\w']*(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
        lookbehind: true,
        inside: {
          keyword: /\b(?:as|hiding|import)\b/,
          punctuation: /\./
        }
      },
      // These are builtin functions only. Constructors are highlighted later as a constant.
      builtin: /\b(?:absurd|add|ap|append|apply|between|bind|bottom|clamp|compare|comparing|compose|conj|const|degree|discard|disj|div|eq|flap|flip|gcd|identity|ifM|join|lcm|liftA1|liftM1|map|max|mempty|min|mod|mul|negate|not|notEq|one|otherwise|recip|show|sub|top|unit|unless|unlessM|void|when|whenM|zero)\b/,
      operator: [
        // Infix operators
        Prism2.languages.haskell.operator[0],
        // ASCII operators
        Prism2.languages.haskell.operator[2],
        // All UTF16 Unicode operator symbols
        // This regex is equivalent to /(?=[\x80-\uFFFF])[\p{gc=Math_Symbol}\p{gc=Currency_Symbol}\p{Modifier_Symbol}\p{Other_Symbol}]/u
        // See https://github.com/PrismJS/prism/issues/3006 for more details.
        /[\xa2-\xa6\xa8\xa9\xac\xae-\xb1\xb4\xb8\xd7\xf7\u02c2-\u02c5\u02d2-\u02df\u02e5-\u02eb\u02ed\u02ef-\u02ff\u0375\u0384\u0385\u03f6\u0482\u058d-\u058f\u0606-\u0608\u060b\u060e\u060f\u06de\u06e9\u06fd\u06fe\u07f6\u07fe\u07ff\u09f2\u09f3\u09fa\u09fb\u0af1\u0b70\u0bf3-\u0bfa\u0c7f\u0d4f\u0d79\u0e3f\u0f01-\u0f03\u0f13\u0f15-\u0f17\u0f1a-\u0f1f\u0f34\u0f36\u0f38\u0fbe-\u0fc5\u0fc7-\u0fcc\u0fce\u0fcf\u0fd5-\u0fd8\u109e\u109f\u1390-\u1399\u166d\u17db\u1940\u19de-\u19ff\u1b61-\u1b6a\u1b74-\u1b7c\u1fbd\u1fbf-\u1fc1\u1fcd-\u1fcf\u1fdd-\u1fdf\u1fed-\u1fef\u1ffd\u1ffe\u2044\u2052\u207a-\u207c\u208a-\u208c\u20a0-\u20bf\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211e-\u2123\u2125\u2127\u2129\u212e\u213a\u213b\u2140-\u2144\u214a-\u214d\u214f\u218a\u218b\u2190-\u2307\u230c-\u2328\u232b-\u2426\u2440-\u244a\u249c-\u24e9\u2500-\u2767\u2794-\u27c4\u27c7-\u27e5\u27f0-\u2982\u2999-\u29d7\u29dc-\u29fb\u29fe-\u2b73\u2b76-\u2b95\u2b97-\u2bff\u2ce5-\u2cea\u2e50\u2e51\u2e80-\u2e99\u2e9b-\u2ef3\u2f00-\u2fd5\u2ff0-\u2ffb\u3004\u3012\u3013\u3020\u3036\u3037\u303e\u303f\u309b\u309c\u3190\u3191\u3196-\u319f\u31c0-\u31e3\u3200-\u321e\u322a-\u3247\u3250\u3260-\u327f\u328a-\u32b0\u32c0-\u33ff\u4dc0-\u4dff\ua490-\ua4c6\ua700-\ua716\ua720\ua721\ua789\ua78a\ua828-\ua82b\ua836-\ua839\uaa77-\uaa79\uab5b\uab6a\uab6b\ufb29\ufbb2-\ufbc1\ufdfc\ufdfd\ufe62\ufe64-\ufe66\ufe69\uff04\uff0b\uff1c-\uff1e\uff3e\uff40\uff5c\uff5e\uffe0-\uffe6\uffe8-\uffee\ufffc\ufffd]/
      ]
    });
    Prism2.languages.purs = Prism2.languages.purescript;
  }
  return purescript_1;
}
var python_1;
var hasRequiredPython;
function requirePython() {
  if (hasRequiredPython) return python_1;
  hasRequiredPython = 1;
  python_1 = python;
  python.displayName = "python";
  python.aliases = ["py"];
  function python(Prism2) {
    Prism2.languages.python = {
      comment: {
        pattern: /(^|[^\\])#.*/,
        lookbehind: true,
        greedy: true
      },
      "string-interpolation": {
        pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
        greedy: true,
        inside: {
          interpolation: {
            // "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
            pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
            lookbehind: true,
            inside: {
              "format-spec": {
                pattern: /(:)[^:(){}]+(?=\}$)/,
                lookbehind: true
              },
              "conversion-option": {
                pattern: /![sra](?=[:}]$)/,
                alias: "punctuation"
              },
              rest: null
            }
          },
          string: /[\s\S]+/
        }
      },
      "triple-quoted-string": {
        pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
        greedy: true,
        alias: "string"
      },
      string: {
        pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
        greedy: true
      },
      function: {
        pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
        lookbehind: true
      },
      "class-name": {
        pattern: /(\bclass\s+)\w+/i,
        lookbehind: true
      },
      decorator: {
        pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
        lookbehind: true,
        alias: ["annotation", "punctuation"],
        inside: {
          punctuation: /\./
        }
      },
      keyword: /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
      builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
      boolean: /\b(?:False|None|True)\b/,
      number: /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
      operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
      punctuation: /[{}[\];(),.:]/
    };
    Prism2.languages.python["string-interpolation"].inside["interpolation"].inside.rest = Prism2.languages.python;
    Prism2.languages.py = Prism2.languages.python;
  }
  return python_1;
}
var q_1;
var hasRequiredQ;
function requireQ() {
  if (hasRequiredQ) return q_1;
  hasRequiredQ = 1;
  q_1 = q;
  q.displayName = "q";
  q.aliases = [];
  function q(Prism2) {
    Prism2.languages.q = {
      string: /"(?:\\.|[^"\\\r\n])*"/,
      comment: [
        // From http://code.kx.com/wiki/Reference/Slash:
        // When / is following a space (or a right parenthesis, bracket, or brace), it is ignored with the rest of the line.
        {
          pattern: /([\t )\]}])\/.*/,
          lookbehind: true,
          greedy: true
        },
        // From http://code.kx.com/wiki/Reference/Slash:
        // A line which has / as its first character and contains at least one other non-whitespace character is a whole-line comment and is ignored entirely.
        // A / on a line by itself begins a multiline comment which is terminated by the next \ on a line by itself.
        // If a / is not matched by a \, the multiline comment is unterminated and continues to end of file.
        // The / and \ must be the first char on the line, but may be followed by any amount of whitespace.
        {
          pattern: /(^|\r?\n|\r)\/[\t ]*(?:(?:\r?\n|\r)(?:.*(?:\r?\n|\r(?!\n)))*?(?:\\(?=[\t ]*(?:\r?\n|\r))|$)|\S.*)/,
          lookbehind: true,
          greedy: true
        },
        // From http://code.kx.com/wiki/Reference/Slash:
        // A \ on a line by itself with no preceding matching / will comment to end of file.
        {
          pattern: /^\\[\t ]*(?:\r?\n|\r)[\s\S]+/m,
          greedy: true
        },
        {
          pattern: /^#!.+/m,
          greedy: true
        }
      ],
      symbol: /`(?::\S+|[\w.]*)/,
      datetime: {
        pattern: /0N[mdzuvt]|0W[dtz]|\d{4}\.\d\d(?:m|\.\d\d(?:T(?:\d\d(?::\d\d(?::\d\d(?:[.:]\d\d\d)?)?)?)?)?[dz]?)|\d\d:\d\d(?::\d\d(?:[.:]\d\d\d)?)?[uvt]?/,
        alias: "number"
      },
      // The negative look-ahead prevents bad highlighting
      // of verbs 0: and 1:
      number: /\b(?![01]:)(?:0N[hje]?|0W[hj]?|0[wn]|0x[\da-fA-F]+|\d+(?:\.\d*)?(?:e[+-]?\d+)?[hjfeb]?)/,
      keyword: /\\\w+\b|\b(?:abs|acos|aj0?|all|and|any|asc|asin|asof|atan|attr|avgs?|binr?|by|ceiling|cols|cor|cos|count|cov|cross|csv|cut|delete|deltas|desc|dev|differ|distinct|div|do|dsave|ej|enlist|eval|except|exec|exit|exp|fby|fills|first|fkeys|flip|floor|from|get|getenv|group|gtime|hclose|hcount|hdel|hopen|hsym|iasc|identity|idesc|if|ij|in|insert|inter|inv|keys?|last|like|list|ljf?|load|log|lower|lsq|ltime|ltrim|mavg|maxs?|mcount|md5|mdev|med|meta|mins?|mmax|mmin|mmu|mod|msum|neg|next|not|null|or|over|parse|peach|pj|plist|prds?|prev|prior|rand|rank|ratios|raze|read0|read1|reciprocal|reval|reverse|rload|rotate|rsave|rtrim|save|scan|scov|sdev|select|set|setenv|show|signum|sin|sqrt|ssr?|string|sublist|sums?|sv|svar|system|tables|tan|til|trim|txf|type|uj|ungroup|union|update|upper|upsert|value|var|views?|vs|wavg|where|while|within|wj1?|wsum|ww|xasc|xbar|xcols?|xdesc|xexp|xgroup|xkey|xlog|xprev|xrank)\b/,
      adverb: {
        pattern: /['\/\\]:?|\beach\b/,
        alias: "function"
      },
      verb: {
        pattern: /(?:\B\.\B|\b[01]:|<[=>]?|>=?|[:+\-*%,!?~=|$&#@^]):?|\b_\b:?/,
        alias: "operator"
      },
      punctuation: /[(){}\[\];.]/
    };
  }
  return q_1;
}
var qml_1;
var hasRequiredQml;
function requireQml() {
  if (hasRequiredQml) return qml_1;
  hasRequiredQml = 1;
  qml_1 = qml;
  qml.displayName = "qml";
  qml.aliases = [];
  function qml(Prism2) {
    (function(Prism3) {
      var jsString = /"(?:\\.|[^\\"\r\n])*"|'(?:\\.|[^\\'\r\n])*'/.source;
      var jsComment = /\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))*\*\//.source;
      var jsExpr = /(?:[^\\()[\]{}"'/]|<string>|\/(?![*/])|<comment>|\(<expr>*\)|\[<expr>*\]|\{<expr>*\}|\\[\s\S])/.source.replace(/<string>/g, function() {
        return jsString;
      }).replace(/<comment>/g, function() {
        return jsComment;
      });
      for (var i = 0; i < 2; i++) {
        jsExpr = jsExpr.replace(/<expr>/g, function() {
          return jsExpr;
        });
      }
      jsExpr = jsExpr.replace(/<expr>/g, "[^\\s\\S]");
      Prism3.languages.qml = {
        comment: {
          pattern: /\/\/.*|\/\*[\s\S]*?\*\//,
          greedy: true
        },
        "javascript-function": {
          pattern: RegExp(
            /((?:^|;)[ \t]*)function\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*\(<js>*\)\s*\{<js>*\}/.source.replace(
              /<js>/g,
              function() {
                return jsExpr;
              }
            ),
            "m"
          ),
          lookbehind: true,
          greedy: true,
          alias: "language-javascript",
          inside: Prism3.languages.javascript
        },
        "class-name": {
          pattern: /((?:^|[:;])[ \t]*)(?!\d)\w+(?=[ \t]*\{|[ \t]+on\b)/m,
          lookbehind: true
        },
        property: [
          {
            pattern: /((?:^|[;{])[ \t]*)(?!\d)\w+(?:\.\w+)*(?=[ \t]*:)/m,
            lookbehind: true
          },
          {
            pattern: /((?:^|[;{])[ \t]*)property[ \t]+(?!\d)\w+(?:\.\w+)*[ \t]+(?!\d)\w+(?:\.\w+)*(?=[ \t]*:)/m,
            lookbehind: true,
            inside: {
              keyword: /^property/,
              property: /\w+(?:\.\w+)*/
            }
          }
        ],
        "javascript-expression": {
          pattern: RegExp(
            /(:[ \t]*)(?![\s;}[])(?:(?!$|[;}])<js>)+/.source.replace(
              /<js>/g,
              function() {
                return jsExpr;
              }
            ),
            "m"
          ),
          lookbehind: true,
          greedy: true,
          alias: "language-javascript",
          inside: Prism3.languages.javascript
        },
        string: {
          pattern: /"(?:\\.|[^\\"\r\n])*"/,
          greedy: true
        },
        keyword: /\b(?:as|import|on)\b/,
        punctuation: /[{}[\]:;,]/
      };
    })(Prism2);
  }
  return qml_1;
}
var qore_1;
var hasRequiredQore;
function requireQore() {
  if (hasRequiredQore) return qore_1;
  hasRequiredQore = 1;
  qore_1 = qore;
  qore.displayName = "qore";
  qore.aliases = [];
  function qore(Prism2) {
    Prism2.languages.qore = Prism2.languages.extend("clike", {
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:\/\/|#).*)/,
        lookbehind: true
      },
      // Overridden to allow unescaped multi-line strings
      string: {
        pattern: /("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/,
        greedy: true
      },
      keyword: /\b(?:abstract|any|assert|binary|bool|boolean|break|byte|case|catch|char|class|code|const|continue|data|default|do|double|else|enum|extends|final|finally|float|for|goto|hash|if|implements|import|inherits|instanceof|int|interface|long|my|native|new|nothing|null|object|our|own|private|reference|rethrow|return|short|soft(?:bool|date|float|int|list|number|string)|static|strictfp|string|sub|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/,
      boolean: /\b(?:false|true)\b/i,
      function: /\$?\b(?!\d)\w+(?=\()/,
      number: /\b(?:0b[01]+|0x(?:[\da-f]*\.)?[\da-fp\-]+|(?:\d+(?:\.\d+)?|\.\d+)(?:e\d+)?[df]|(?:\d+(?:\.\d+)?|\.\d+))\b/i,
      operator: {
        pattern: /(^|[^.])(?:\+[+=]?|-[-=]?|[!=](?:==?|~)?|>>?=?|<(?:=>?|<=?)?|&[&=]?|\|[|=]?|[*\/%^]=?|[~?])/,
        lookbehind: true
      },
      variable: /\$(?!\d)\w+\b/
    });
  }
  return qore_1;
}
var qsharp_1;
var hasRequiredQsharp;
function requireQsharp() {
  if (hasRequiredQsharp) return qsharp_1;
  hasRequiredQsharp = 1;
  qsharp_1 = qsharp;
  qsharp.displayName = "qsharp";
  qsharp.aliases = ["qs"];
  function qsharp(Prism2) {
    (function(Prism3) {
      function replace(pattern, replacements) {
        return pattern.replace(/<<(\d+)>>/g, function(m, index) {
          return "(?:" + replacements[+index] + ")";
        });
      }
      function re(pattern, replacements, flags) {
        return RegExp(replace(pattern, replacements), "");
      }
      function nested(pattern, depthLog2) {
        for (var i = 0; i < depthLog2; i++) {
          pattern = pattern.replace(/<<self>>/g, function() {
            return "(?:" + pattern + ")";
          });
        }
        return pattern.replace(/<<self>>/g, "[^\\s\\S]");
      }
      var keywordKinds = {
        // keywords which represent a return or variable type
        type: "Adj BigInt Bool Ctl Double false Int One Pauli PauliI PauliX PauliY PauliZ Qubit Range Result String true Unit Zero",
        // all other keywords
        other: "Adjoint adjoint apply as auto body borrow borrowing Controlled controlled distribute elif else fail fixup for function if in internal intrinsic invert is let mutable namespace new newtype open operation repeat return self set until use using while within"
      };
      function keywordsToPattern(words) {
        return "\\b(?:" + words.trim().replace(/ /g, "|") + ")\\b";
      }
      var keywords = RegExp(
        keywordsToPattern(keywordKinds.type + " " + keywordKinds.other)
      );
      var identifier = /\b[A-Za-z_]\w*\b/.source;
      var qualifiedName = replace(/<<0>>(?:\s*\.\s*<<0>>)*/.source, [identifier]);
      var typeInside = {
        keyword: keywords,
        punctuation: /[<>()?,.:[\]]/
      };
      var regularString = /"(?:\\.|[^\\"])*"/.source;
      Prism3.languages.qsharp = Prism3.languages.extend("clike", {
        comment: /\/\/.*/,
        string: [
          {
            pattern: re(/(^|[^$\\])<<0>>/.source, [regularString]),
            lookbehind: true,
            greedy: true
          }
        ],
        "class-name": [
          {
            // open Microsoft.Quantum.Canon;
            // open Microsoft.Quantum.Canon as CN;
            pattern: re(/(\b(?:as|open)\s+)<<0>>(?=\s*(?:;|as\b))/.source, [
              qualifiedName
            ]),
            lookbehind: true,
            inside: typeInside
          },
          {
            // namespace Quantum.App1;
            pattern: re(/(\bnamespace\s+)<<0>>(?=\s*\{)/.source, [qualifiedName]),
            lookbehind: true,
            inside: typeInside
          }
        ],
        keyword: keywords,
        number: /(?:\b0(?:x[\da-f]+|b[01]+|o[0-7]+)|(?:\B\.\d+|\b\d+(?:\.\d*)?)(?:e[-+]?\d+)?)l?\b/i,
        operator: /\band=|\bor=|\band\b|\bnot\b|\bor\b|<[-=]|[-=]>|>>>=?|<<<=?|\^\^\^=?|\|\|\|=?|&&&=?|w\/=?|~~~|[*\/+\-^=!%]=?/,
        punctuation: /::|[{}[\];(),.:]/
      });
      Prism3.languages.insertBefore("qsharp", "number", {
        range: {
          pattern: /\.\./,
          alias: "operator"
        }
      });
      var interpolationExpr = nested(
        replace(/\{(?:[^"{}]|<<0>>|<<self>>)*\}/.source, [regularString]),
        2
      );
      Prism3.languages.insertBefore("qsharp", "string", {
        "interpolation-string": {
          pattern: re(/\$"(?:\\.|<<0>>|[^\\"{])*"/.source, [interpolationExpr]),
          greedy: true,
          inside: {
            interpolation: {
              pattern: re(/((?:^|[^\\])(?:\\\\)*)<<0>>/.source, [
                interpolationExpr
              ]),
              lookbehind: true,
              inside: {
                punctuation: /^\{|\}$/,
                expression: {
                  pattern: /[\s\S]+/,
                  alias: "language-qsharp",
                  inside: Prism3.languages.qsharp
                }
              }
            },
            string: /[\s\S]+/
          }
        }
      });
    })(Prism2);
    Prism2.languages.qs = Prism2.languages.qsharp;
  }
  return qsharp_1;
}
var r_1;
var hasRequiredR;
function requireR() {
  if (hasRequiredR) return r_1;
  hasRequiredR = 1;
  r_1 = r;
  r.displayName = "r";
  r.aliases = [];
  function r(Prism2) {
    Prism2.languages.r = {
      comment: /#.*/,
      string: {
        pattern: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      "percent-operator": {
        // Includes user-defined operators
        // and %%, %*%, %/%, %in%, %o%, %x%
        pattern: /%[^%\s]*%/,
        alias: "operator"
      },
      boolean: /\b(?:FALSE|TRUE)\b/,
      ellipsis: /\.\.(?:\.|\d+)/,
      number: [
        /\b(?:Inf|NaN)\b/,
        /(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+(?:\.\d*)?|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/
      ],
      keyword: /\b(?:NA|NA_character_|NA_complex_|NA_integer_|NA_real_|NULL|break|else|for|function|if|in|next|repeat|while)\b/,
      operator: /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,
      punctuation: /[(){}\[\],;]/
    };
  }
  return r_1;
}
var racket_1;
var hasRequiredRacket;
function requireRacket() {
  if (hasRequiredRacket) return racket_1;
  hasRequiredRacket = 1;
  var refractorScheme = requireScheme();
  racket_1 = racket;
  racket.displayName = "racket";
  racket.aliases = ["rkt"];
  function racket(Prism2) {
    Prism2.register(refractorScheme);
    Prism2.languages.racket = Prism2.languages.extend("scheme", {
      "lambda-parameter": {
        // the racket lambda syntax is a lot more complex, so we won't even attempt to capture it.
        // this will just prevent false positives of the `function` pattern
        pattern: /([(\[]lambda\s+[(\[])[^()\[\]'\s]+/,
        lookbehind: true
      }
    });
    Prism2.languages.insertBefore("racket", "string", {
      lang: {
        pattern: /^#lang.+/m,
        greedy: true,
        alias: "keyword"
      }
    });
    Prism2.languages.rkt = Prism2.languages.racket;
  }
  return racket_1;
}
var reason_1;
var hasRequiredReason;
function requireReason() {
  if (hasRequiredReason) return reason_1;
  hasRequiredReason = 1;
  reason_1 = reason;
  reason.displayName = "reason";
  reason.aliases = [];
  function reason(Prism2) {
    Prism2.languages.reason = Prism2.languages.extend("clike", {
      string: {
        pattern: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/,
        greedy: true
      },
      // 'class-name' must be matched *after* 'constructor' defined below
      "class-name": /\b[A-Z]\w*/,
      keyword: /\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|or|private|rec|sig|struct|switch|then|to|try|type|val|virtual|when|while|with)\b/,
      operator: /\.{3}|:[:=]|\|>|->|=(?:==?|>)?|<=?|>=?|[|^?'#!~`]|[+\-*\/]\.?|\b(?:asr|land|lor|lsl|lsr|lxor|mod)\b/
    });
    Prism2.languages.insertBefore("reason", "class-name", {
      char: {
        pattern: /'(?:\\x[\da-f]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^'\\\r\n])'/,
        greedy: true
      },
      // Negative look-ahead prevents from matching things like String.capitalize
      constructor: /\b[A-Z]\w*\b(?!\s*\.)/,
      label: {
        pattern: /\b[a-z]\w*(?=::)/,
        alias: "symbol"
      }
    });
    delete Prism2.languages.reason.function;
  }
  return reason_1;
}
var regex_1;
var hasRequiredRegex;
function requireRegex() {
  if (hasRequiredRegex) return regex_1;
  hasRequiredRegex = 1;
  regex_1 = regex;
  regex.displayName = "regex";
  regex.aliases = [];
  function regex(Prism2) {
    (function(Prism3) {
      var specialEscape = {
        pattern: /\\[\\(){}[\]^$+*?|.]/,
        alias: "escape"
      };
      var escape = /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/;
      var charSet = {
        pattern: /\.|\\[wsd]|\\p\{[^{}]+\}/i,
        alias: "class-name"
      };
      var charSetWithoutDot = {
        pattern: /\\[wsd]|\\p\{[^{}]+\}/i,
        alias: "class-name"
      };
      var rangeChar = "(?:[^\\\\-]|" + escape.source + ")";
      var range = RegExp(rangeChar + "-" + rangeChar);
      var groupName = {
        pattern: /(<|')[^<>']+(?=[>']$)/,
        lookbehind: true,
        alias: "variable"
      };
      Prism3.languages.regex = {
        "char-class": {
          pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
          lookbehind: true,
          inside: {
            "char-class-negation": {
              pattern: /(^\[)\^/,
              lookbehind: true,
              alias: "operator"
            },
            "char-class-punctuation": {
              pattern: /^\[|\]$/,
              alias: "punctuation"
            },
            range: {
              pattern: range,
              inside: {
                escape,
                "range-punctuation": {
                  pattern: /-/,
                  alias: "operator"
                }
              }
            },
            "special-escape": specialEscape,
            "char-set": charSetWithoutDot,
            escape
          }
        },
        "special-escape": specialEscape,
        "char-set": charSet,
        backreference: [
          {
            // a backreference which is not an octal escape
            pattern: /\\(?![123][0-7]{2})[1-9]/,
            alias: "keyword"
          },
          {
            pattern: /\\k<[^<>']+>/,
            alias: "keyword",
            inside: {
              "group-name": groupName
            }
          }
        ],
        anchor: {
          pattern: /[$^]|\\[ABbGZz]/,
          alias: "function"
        },
        escape,
        group: [
          {
            // https://docs.oracle.com/javase/10/docs/api/java/util/regex/Pattern.html
            // https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference?view=netframework-4.7.2#grouping-constructs
            // (), (?<name>), (?'name'), (?>), (?:), (?=), (?!), (?<=), (?<!), (?is-m), (?i-m:)
            pattern: /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
            alias: "punctuation",
            inside: {
              "group-name": groupName
            }
          },
          {
            pattern: /\)/,
            alias: "punctuation"
          }
        ],
        quantifier: {
          pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/,
          alias: "number"
        },
        alternation: {
          pattern: /\|/,
          alias: "keyword"
        }
      };
    })(Prism2);
  }
  return regex_1;
}
var rego_1;
var hasRequiredRego;
function requireRego() {
  if (hasRequiredRego) return rego_1;
  hasRequiredRego = 1;
  rego_1 = rego;
  rego.displayName = "rego";
  rego.aliases = [];
  function rego(Prism2) {
    Prism2.languages.rego = {
      comment: /#.*/,
      property: {
        pattern: /(^|[^\\.])(?:"(?:\\.|[^\\"\r\n])*"|`[^`]*`|\b[a-z_]\w*\b)(?=\s*:(?!=))/i,
        lookbehind: true,
        greedy: true
      },
      string: {
        pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"|`[^`]*`/,
        lookbehind: true,
        greedy: true
      },
      keyword: /\b(?:as|default|else|import|not|null|package|set(?=\s*\()|some|with)\b/,
      boolean: /\b(?:false|true)\b/,
      function: {
        pattern: /\b[a-z_]\w*\b(?:\s*\.\s*\b[a-z_]\w*\b)*(?=\s*\()/i,
        inside: {
          namespace: /\b\w+\b(?=\s*\.)/,
          punctuation: /\./
        }
      },
      number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
      operator: /[-+*/%|&]|[<>:=]=?|!=|\b_\b/,
      punctuation: /[,;.\[\]{}()]/
    };
  }
  return rego_1;
}
var renpy_1;
var hasRequiredRenpy;
function requireRenpy() {
  if (hasRequiredRenpy) return renpy_1;
  hasRequiredRenpy = 1;
  renpy_1 = renpy;
  renpy.displayName = "renpy";
  renpy.aliases = ["rpy"];
  function renpy(Prism2) {
    Prism2.languages.renpy = {
      comment: {
        pattern: /(^|[^\\])#.+/,
        lookbehind: true
      },
      string: {
        pattern: /("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\])*\2|(?:^#?(?:(?:[0-9a-fA-F]){3}|[0-9a-fA-F]{6})$)/m,
        greedy: true
      },
      function: /\b[a-z_]\w*(?=\()/i,
      property: /\b(?:Update|UpdateVersion|action|activate_sound|adv_nvl_transition|after_load_transition|align|alpha|alt|anchor|antialias|area|auto|background|bar_invert|bar_resizing|bar_vertical|black_color|bold|bottom_bar|bottom_gutter|bottom_margin|bottom_padding|box_reverse|box_wrap|can_update|caret|child|color|crop|default_afm_enable|default_afm_time|default_fullscreen|default_text_cps|developer|directory_name|drag_handle|drag_joined|drag_name|drag_raise|draggable|dragged|drop_shadow|drop_shadow_color|droppable|dropped|easein|easeout|edgescroll|end_game_transition|end_splash_transition|enter_replay_transition|enter_sound|enter_transition|enter_yesno_transition|executable_name|exit_replay_transition|exit_sound|exit_transition|exit_yesno_transition|fadein|fadeout|first_indent|first_spacing|fit_first|focus|focus_mask|font|foreground|game_main_transition|get_installed_packages|google_play_key|google_play_salt|ground|has_music|has_sound|has_voice|height|help|hinting|hover|hover_background|hover_color|hover_sound|hovered|hyperlink_functions|idle|idle_color|image_style|include_update|insensitive|insensitive_background|insensitive_color|inside|intra_transition|italic|justify|kerning|keyboard_focus|language|layer_clipping|layers|layout|left_bar|left_gutter|left_margin|left_padding|length|line_leading|line_overlap_split|line_spacing|linear|main_game_transition|main_menu_music|maximum|min_width|minimum|minwidth|modal|mouse|mousewheel|name|narrator_menu|newline_indent|nvl_adv_transition|offset|order_reverse|outlines|overlay_functions|pos|position|prefix|radius|range|rest_indent|right_bar|right_gutter|right_margin|right_padding|rotate|rotate_pad|ruby_style|sample_sound|save_directory|say_attribute_transition|screen_height|screen_width|scrollbars|selected_hover|selected_hover_color|selected_idle|selected_idle_color|selected_insensitive|show_side_image|show_two_window|side_spacing|side_xpos|side_ypos|size|size_group|slow_cps|slow_cps_multiplier|spacing|strikethrough|subpixel|text_align|text_style|text_xpos|text_y_fudge|text_ypos|thumb|thumb_offset|thumb_shadow|thumbnail_height|thumbnail_width|time|top_bar|top_gutter|top_margin|top_padding|translations|underline|unscrollable|update|value|version|version_name|version_tuple|vertical|width|window_hide_transition|window_icon|window_left_padding|window_show_transition|window_title|windows_icon|xadjustment|xalign|xanchor|xanchoraround|xaround|xcenter|xfill|xinitial|xmargin|xmaximum|xminimum|xoffset|xofsset|xpadding|xpos|xsize|xzoom|yadjustment|yalign|yanchor|yanchoraround|yaround|ycenter|yfill|yinitial|ymargin|ymaximum|yminimum|yoffset|ypadding|ypos|ysize|ysizexysize|yzoom|zoom|zorder)\b/,
      tag: /\b(?:bar|block|button|buttoscreenn|drag|draggroup|fixed|frame|grid|[hv]box|hotbar|hotspot|image|imagebutton|imagemap|input|key|label|menu|mm_menu_frame|mousearea|nvl|parallel|screen|self|side|tag|text|textbutton|timer|vbar|viewport|window)\b|\$/,
      keyword: /\b(?:None|add|adjustment|alignaround|allow|angle|animation|around|as|assert|behind|box_layout|break|build|cache|call|center|changed|child_size|choice|circles|class|clear|clicked|clipping|clockwise|config|contains|continue|corner1|corner2|counterclockwise|def|default|define|del|delay|disabled|disabled_text|dissolve|elif|else|event|except|exclude|exec|expression|fade|finally|for|from|function|global|gm_root|has|hide|id|if|import|in|init|is|jump|knot|lambda|left|less_rounded|mm_root|movie|music|null|on|onlayer|pass|pause|persistent|play|print|python|queue|raise|random|renpy|repeat|return|right|rounded_window|scene|scope|set|show|slow|slow_abortable|slow_done|sound|stop|store|style|style_group|substitute|suffix|theme|transform|transform_anchor|transpose|try|ui|unhovered|updater|use|voice|while|widget|widget_hover|widget_selected|widget_text|yield)\b/,
      boolean: /\b(?:[Ff]alse|[Tt]rue)\b/,
      number: /(?:\b(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*(?:\.\d*)?)|\B\.\d+)(?:e[+-]?\d+)?j?/i,
      operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:and|at|not|or|with)\b/,
      punctuation: /[{}[\];(),.:]/
    };
    Prism2.languages.rpy = Prism2.languages.renpy;
  }
  return renpy_1;
}
var rest_1;
var hasRequiredRest;
function requireRest() {
  if (hasRequiredRest) return rest_1;
  hasRequiredRest = 1;
  rest_1 = rest;
  rest.displayName = "rest";
  rest.aliases = [];
  function rest(Prism2) {
    Prism2.languages.rest = {
      table: [
        {
          pattern: /(^[\t ]*)(?:\+[=-]+)+\+(?:\r?\n|\r)(?:\1[+|].+[+|](?:\r?\n|\r))+\1(?:\+[=-]+)+\+/m,
          lookbehind: true,
          inside: {
            punctuation: /\||(?:\+[=-]+)+\+/
          }
        },
        {
          pattern: /(^[\t ]*)=+ [ =]*=(?:(?:\r?\n|\r)\1.+)+(?:\r?\n|\r)\1=+ [ =]*=(?=(?:\r?\n|\r){2}|\s*$)/m,
          lookbehind: true,
          inside: {
            punctuation: /[=-]+/
          }
        }
      ],
      // Directive-like patterns
      "substitution-def": {
        pattern: /(^[\t ]*\.\. )\|(?:[^|\s](?:[^|]*[^|\s])?)\| [^:]+::/m,
        lookbehind: true,
        inside: {
          substitution: {
            pattern: /^\|(?:[^|\s]|[^|\s][^|]*[^|\s])\|/,
            alias: "attr-value",
            inside: {
              punctuation: /^\||\|$/
            }
          },
          directive: {
            pattern: /( )(?! )[^:]+::/,
            lookbehind: true,
            alias: "function",
            inside: {
              punctuation: /::$/
            }
          }
        }
      },
      "link-target": [
        {
          pattern: /(^[\t ]*\.\. )\[[^\]]+\]/m,
          lookbehind: true,
          alias: "string",
          inside: {
            punctuation: /^\[|\]$/
          }
        },
        {
          pattern: /(^[\t ]*\.\. )_(?:`[^`]+`|(?:[^:\\]|\\.)+):/m,
          lookbehind: true,
          alias: "string",
          inside: {
            punctuation: /^_|:$/
          }
        }
      ],
      directive: {
        pattern: /(^[\t ]*\.\. )[^:]+::/m,
        lookbehind: true,
        alias: "function",
        inside: {
          punctuation: /::$/
        }
      },
      comment: {
        // The two alternatives try to prevent highlighting of blank comments
        pattern: /(^[\t ]*\.\.)(?:(?: .+)?(?:(?:\r?\n|\r).+)+| .+)(?=(?:\r?\n|\r){2}|$)/m,
        lookbehind: true
      },
      title: [
        // Overlined and underlined
        {
          pattern: /^(([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2+)(?:\r?\n|\r).+(?:\r?\n|\r)\1$/m,
          inside: {
            punctuation: /^[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+|[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/,
            important: /.+/
          }
        },
        // Underlined only
        {
          pattern: /(^|(?:\r?\n|\r){2}).+(?:\r?\n|\r)([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2+(?=\r?\n|\r|$)/,
          lookbehind: true,
          inside: {
            punctuation: /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/,
            important: /.+/
          }
        }
      ],
      hr: {
        pattern: /((?:\r?\n|\r){2})([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2{3,}(?=(?:\r?\n|\r){2})/,
        lookbehind: true,
        alias: "punctuation"
      },
      field: {
        pattern: /(^[\t ]*):[^:\r\n]+:(?= )/m,
        lookbehind: true,
        alias: "attr-name"
      },
      "command-line-option": {
        pattern: /(^[\t ]*)(?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?(?:, (?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?)*(?=(?:\r?\n|\r)? {2,}\S)/im,
        lookbehind: true,
        alias: "symbol"
      },
      "literal-block": {
        pattern: /::(?:\r?\n|\r){2}([ \t]+)(?![ \t]).+(?:(?:\r?\n|\r)\1.+)*/,
        inside: {
          "literal-block-punctuation": {
            pattern: /^::/,
            alias: "punctuation"
          }
        }
      },
      "quoted-literal-block": {
        pattern: /::(?:\r?\n|\r){2}([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]).*(?:(?:\r?\n|\r)\1.*)*/,
        inside: {
          "literal-block-punctuation": {
            pattern: /^(?:::|([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\1*)/m,
            alias: "punctuation"
          }
        }
      },
      "list-bullet": {
        pattern: /(^[\t ]*)(?:[*+\-•‣⁃]|\(?(?:\d+|[a-z]|[ivxdclm]+)\)|(?:\d+|[a-z]|[ivxdclm]+)\.)(?= )/im,
        lookbehind: true,
        alias: "punctuation"
      },
      "doctest-block": {
        pattern: /(^[\t ]*)>>> .+(?:(?:\r?\n|\r).+)*/m,
        lookbehind: true,
        inside: {
          punctuation: /^>>>/
        }
      },
      inline: [
        {
          pattern: /(^|[\s\-:\/'"<(\[{])(?::[^:]+:`.*?`|`.*?`:[^:]+:|(\*\*?|``?|\|)(?!\s)(?:(?!\2).)*\S\2(?=[\s\-.,:;!?\\\/'")\]}]|$))/m,
          lookbehind: true,
          inside: {
            bold: {
              pattern: /(^\*\*).+(?=\*\*$)/,
              lookbehind: true
            },
            italic: {
              pattern: /(^\*).+(?=\*$)/,
              lookbehind: true
            },
            "inline-literal": {
              pattern: /(^``).+(?=``$)/,
              lookbehind: true,
              alias: "symbol"
            },
            role: {
              pattern: /^:[^:]+:|:[^:]+:$/,
              alias: "function",
              inside: {
                punctuation: /^:|:$/
              }
            },
            "interpreted-text": {
              pattern: /(^`).+(?=`$)/,
              lookbehind: true,
              alias: "attr-value"
            },
            substitution: {
              pattern: /(^\|).+(?=\|$)/,
              lookbehind: true,
              alias: "attr-value"
            },
            punctuation: /\*\*?|``?|\|/
          }
        }
      ],
      link: [
        {
          pattern: /\[[^\[\]]+\]_(?=[\s\-.,:;!?\\\/'")\]}]|$)/,
          alias: "string",
          inside: {
            punctuation: /^\[|\]_$/
          }
        },
        {
          pattern: /(?:\b[a-z\d]+(?:[_.:+][a-z\d]+)*_?_|`[^`]+`_?_|_`[^`]+`)(?=[\s\-.,:;!?\\\/'")\]}]|$)/i,
          alias: "string",
          inside: {
            punctuation: /^_?`|`$|`?_?_$/
          }
        }
      ],
      // Line block start,
      // quote attribution,
      // explicit markup start,
      // and anonymous hyperlink target shortcut (__)
      punctuation: {
        pattern: /(^[\t ]*)(?:\|(?= |$)|(?:---?|—|\.\.|__)(?= )|\.\.$)/m,
        lookbehind: true
      }
    };
  }
  return rest_1;
}
var rip_1;
var hasRequiredRip;
function requireRip() {
  if (hasRequiredRip) return rip_1;
  hasRequiredRip = 1;
  rip_1 = rip;
  rip.displayName = "rip";
  rip.aliases = [];
  function rip(Prism2) {
    Prism2.languages.rip = {
      comment: {
        pattern: /#.*/,
        greedy: true
      },
      char: {
        pattern: /\B`[^\s`'",.:;#\/\\()<>\[\]{}]\b/,
        greedy: true
      },
      string: {
        pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      regex: {
        pattern: /(^|[^/])\/(?!\/)(?:\[[^\n\r\]]*\]|\\.|[^/\\\r\n\[])+\/(?=\s*(?:$|[\r\n,.;})]))/,
        lookbehind: true,
        greedy: true
      },
      keyword: /(?:=>|->)|\b(?:case|catch|class|else|exit|finally|if|raise|return|switch|try)\b/,
      builtin: /@|\bSystem\b/,
      boolean: /\b(?:false|true)\b/,
      date: /\b\d{4}-\d{2}-\d{2}\b/,
      time: /\b\d{2}:\d{2}:\d{2}\b/,
      datetime: /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\b/,
      symbol: /:[^\d\s`'",.:;#\/\\()<>\[\]{}][^\s`'",.:;#\/\\()<>\[\]{}]*/,
      number: /[+-]?\b(?:\d+\.\d+|\d+)\b/,
      punctuation: /(?:\.{2,3})|[`,.:;=\/\\()<>\[\]{}]/,
      reference: /[^\d\s`'",.:;#\/\\()<>\[\]{}][^\s`'",.:;#\/\\()<>\[\]{}]*/
    };
  }
  return rip_1;
}
var roboconf_1;
var hasRequiredRoboconf;
function requireRoboconf() {
  if (hasRequiredRoboconf) return roboconf_1;
  hasRequiredRoboconf = 1;
  roboconf_1 = roboconf;
  roboconf.displayName = "roboconf";
  roboconf.aliases = [];
  function roboconf(Prism2) {
    Prism2.languages.roboconf = {
      comment: /#.*/,
      keyword: {
        pattern: /(^|\s)(?:(?:external|import)\b|(?:facet|instance of)(?=[ \t]+[\w-]+[ \t]*\{))/,
        lookbehind: true
      },
      component: {
        pattern: /[\w-]+(?=[ \t]*\{)/,
        alias: "variable"
      },
      property: /[\w.-]+(?=[ \t]*:)/,
      value: {
        pattern: /(=[ \t]*(?![ \t]))[^,;]+/,
        lookbehind: true,
        alias: "attr-value"
      },
      optional: {
        pattern: /\(optional\)/,
        alias: "builtin"
      },
      wildcard: {
        pattern: /(\.)\*/,
        lookbehind: true,
        alias: "operator"
      },
      punctuation: /[{},.;:=]/
    };
  }
  return roboconf_1;
}
var robotframework_1;
var hasRequiredRobotframework;
function requireRobotframework() {
  if (hasRequiredRobotframework) return robotframework_1;
  hasRequiredRobotframework = 1;
  robotframework_1 = robotframework;
  robotframework.displayName = "robotframework";
  robotframework.aliases = [];
  function robotframework(Prism2) {
    (function(Prism3) {
      var comment = {
        pattern: /(^[ \t]*| {2}|\t)#.*/m,
        lookbehind: true,
        greedy: true
      };
      var variable = {
        pattern: /((?:^|[^\\])(?:\\{2})*)[$@&%]\{(?:[^{}\r\n]|\{[^{}\r\n]*\})*\}/,
        lookbehind: true,
        inside: {
          punctuation: /^[$@&%]\{|\}$/
        }
      };
      function createSection(name, inside) {
        var extendecInside = {};
        extendecInside["section-header"] = {
          pattern: /^ ?\*{3}.+?\*{3}/,
          alias: "keyword"
        };
        for (var token in inside) {
          extendecInside[token] = inside[token];
        }
        extendecInside["tag"] = {
          pattern: /([\r\n](?: {2}|\t)[ \t]*)\[[-\w]+\]/,
          lookbehind: true,
          inside: {
            punctuation: /\[|\]/
          }
        };
        extendecInside["variable"] = variable;
        extendecInside["comment"] = comment;
        return {
          pattern: RegExp(
            /^ ?\*{3}[ \t]*<name>[ \t]*\*{3}(?:.|[\r\n](?!\*{3}))*/.source.replace(
              /<name>/g,
              function() {
                return name;
              }
            ),
            "im"
          ),
          alias: "section",
          inside: extendecInside
        };
      }
      var docTag = {
        pattern: /(\[Documentation\](?: {2}|\t)[ \t]*)(?![ \t]|#)(?:.|(?:\r\n?|\n)[ \t]*\.{3})+/,
        lookbehind: true,
        alias: "string"
      };
      var testNameLike = {
        pattern: /([\r\n] ?)(?!#)(?:\S(?:[ \t]\S)*)+/,
        lookbehind: true,
        alias: "function",
        inside: {
          variable
        }
      };
      var testPropertyLike = {
        pattern: /([\r\n](?: {2}|\t)[ \t]*)(?!\[|\.{3}|#)(?:\S(?:[ \t]\S)*)+/,
        lookbehind: true,
        inside: {
          variable
        }
      };
      Prism3.languages["robotframework"] = {
        settings: createSection("Settings", {
          documentation: {
            pattern: /([\r\n] ?Documentation(?: {2}|\t)[ \t]*)(?![ \t]|#)(?:.|(?:\r\n?|\n)[ \t]*\.{3})+/,
            lookbehind: true,
            alias: "string"
          },
          property: {
            pattern: /([\r\n] ?)(?!\.{3}|#)(?:\S(?:[ \t]\S)*)+/,
            lookbehind: true
          }
        }),
        variables: createSection("Variables"),
        "test-cases": createSection("Test Cases", {
          "test-name": testNameLike,
          documentation: docTag,
          property: testPropertyLike
        }),
        keywords: createSection("Keywords", {
          "keyword-name": testNameLike,
          documentation: docTag,
          property: testPropertyLike
        }),
        tasks: createSection("Tasks", {
          "task-name": testNameLike,
          documentation: docTag,
          property: testPropertyLike
        }),
        comment
      };
      Prism3.languages.robot = Prism3.languages["robotframework"];
    })(Prism2);
  }
  return robotframework_1;
}
var rust_1;
var hasRequiredRust;
function requireRust() {
  if (hasRequiredRust) return rust_1;
  hasRequiredRust = 1;
  rust_1 = rust;
  rust.displayName = "rust";
  rust.aliases = [];
  function rust(Prism2) {
    (function(Prism3) {
      var multilineComment = /\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source;
      for (var i = 0; i < 2; i++) {
        multilineComment = multilineComment.replace(/<self>/g, function() {
          return multilineComment;
        });
      }
      multilineComment = multilineComment.replace(/<self>/g, function() {
        return /[^\s\S]/.source;
      });
      Prism3.languages.rust = {
        comment: [
          {
            pattern: RegExp(/(^|[^\\])/.source + multilineComment),
            lookbehind: true,
            greedy: true
          },
          {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
          }
        ],
        string: {
          pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
          greedy: true
        },
        char: {
          pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
          greedy: true
        },
        attribute: {
          pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
          greedy: true,
          alias: "attr-name",
          inside: {
            string: null
            // see below
          }
        },
        // Closure params should not be confused with bitwise OR |
        "closure-params": {
          pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
          lookbehind: true,
          greedy: true,
          inside: {
            "closure-punctuation": {
              pattern: /^\||\|$/,
              alias: "punctuation"
            },
            rest: null
            // see below
          }
        },
        "lifetime-annotation": {
          pattern: /'\w+/,
          alias: "symbol"
        },
        "fragment-specifier": {
          pattern: /(\$\w+:)[a-z]+/,
          lookbehind: true,
          alias: "punctuation"
        },
        variable: /\$\w+/,
        "function-definition": {
          pattern: /(\bfn\s+)\w+/,
          lookbehind: true,
          alias: "function"
        },
        "type-definition": {
          pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/,
          lookbehind: true,
          alias: "class-name"
        },
        "module-declaration": [
          {
            pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
            lookbehind: true,
            alias: "namespace"
          },
          {
            pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
            lookbehind: true,
            alias: "namespace",
            inside: {
              punctuation: /::/
            }
          }
        ],
        keyword: [
          // https://github.com/rust-lang/reference/blob/master/src/keywords.md
          /\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
          // primitives and str
          // https://doc.rust-lang.org/stable/rust-by-example/primitives.html
          /\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/
        ],
        // functions can technically start with an upper-case letter, but this will introduce a lot of false positives
        // and Rust's naming conventions recommend snake_case anyway.
        // https://doc.rust-lang.org/1.0.0/style/style/naming/README.html
        function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
        macro: {
          pattern: /\b\w+!/,
          alias: "property"
        },
        constant: /\b[A-Z_][A-Z_\d]+\b/,
        "class-name": /\b[A-Z]\w*\b/,
        namespace: {
          pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
          inside: {
            punctuation: /::/
          }
        },
        // Hex, oct, bin, dec numbers with visual separators and type suffix
        number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,
        boolean: /\b(?:false|true)\b/,
        punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
        operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/
      };
      Prism3.languages.rust["closure-params"].inside.rest = Prism3.languages.rust;
      Prism3.languages.rust["attribute"].inside["string"] = Prism3.languages.rust["string"];
    })(Prism2);
  }
  return rust_1;
}
var sas_1;
var hasRequiredSas;
function requireSas() {
  if (hasRequiredSas) return sas_1;
  hasRequiredSas = 1;
  sas_1 = sas;
  sas.displayName = "sas";
  sas.aliases = [];
  function sas(Prism2) {
    (function(Prism3) {
      var stringPattern = /(?:"(?:""|[^"])*"(?!")|'(?:''|[^'])*'(?!'))/.source;
      var number = /\b(?:\d[\da-f]*x|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i;
      var numericConstant = {
        pattern: RegExp(stringPattern + "[bx]"),
        alias: "number"
      };
      var macroVariable = {
        pattern: /&[a-z_]\w*/i
      };
      var macroKeyword = {
        pattern: /((?:^|\s|=|\())%(?:ABORT|BY|CMS|COPY|DISPLAY|DO|ELSE|END|EVAL|GLOBAL|GO|GOTO|IF|INC|INCLUDE|INDEX|INPUT|KTRIM|LENGTH|LET|LIST|LOCAL|PUT|QKTRIM|QSCAN|QSUBSTR|QSYSFUNC|QUPCASE|RETURN|RUN|SCAN|SUBSTR|SUPERQ|SYMDEL|SYMEXIST|SYMGLOBL|SYMLOCAL|SYSCALL|SYSEVALF|SYSEXEC|SYSFUNC|SYSGET|SYSRPUT|THEN|TO|TSO|UNQUOTE|UNTIL|UPCASE|WHILE|WINDOW)\b/i,
        lookbehind: true,
        alias: "keyword"
      };
      var step = {
        pattern: /(^|\s)(?:proc\s+\w+|data(?!=)|quit|run)\b/i,
        alias: "keyword",
        lookbehind: true
      };
      var comment = [
        /\/\*[\s\S]*?\*\//,
        {
          pattern: /(^[ \t]*|;\s*)\*[^;]*;/m,
          lookbehind: true
        }
      ];
      var string = {
        pattern: RegExp(stringPattern),
        greedy: true
      };
      var punctuation = /[$%@.(){}\[\];,\\]/;
      var func = {
        pattern: /%?\b\w+(?=\()/,
        alias: "keyword"
      };
      var args = {
        function: func,
        "arg-value": {
          pattern: /(=\s*)[A-Z\.]+/i,
          lookbehind: true
        },
        operator: /=/,
        "macro-variable": macroVariable,
        arg: {
          pattern: /[A-Z]+/i,
          alias: "keyword"
        },
        number,
        "numeric-constant": numericConstant,
        punctuation,
        string
      };
      var format = {
        pattern: /\b(?:format|put)\b=?[\w'$.]+/i,
        inside: {
          keyword: /^(?:format|put)(?==)/i,
          equals: /=/,
          format: {
            pattern: /(?:\w|\$\d)+\.\d?/,
            alias: "number"
          }
        }
      };
      var altformat = {
        pattern: /\b(?:format|put)\s+[\w']+(?:\s+[$.\w]+)+(?=;)/i,
        inside: {
          keyword: /^(?:format|put)/i,
          format: {
            pattern: /[\w$]+\.\d?/,
            alias: "number"
          }
        }
      };
      var globalStatements = {
        pattern: /((?:^|\s)=?)(?:catname|checkpoint execute_always|dm|endsas|filename|footnote|%include|libname|%list|lock|missing|options|page|resetline|%run|sasfile|skip|sysecho|title\d?)\b/i,
        lookbehind: true,
        alias: "keyword"
      };
      var submitStatement = {
        pattern: /(^|\s)(?:submit(?:\s+(?:load|norun|parseonly))?|endsubmit)\b/i,
        lookbehind: true,
        alias: "keyword"
      };
      var actionSets = /aStore|accessControl|aggregation|audio|autotune|bayesianNetClassifier|bioMedImage|boolRule|builtins|cardinality|cdm|clustering|conditionalRandomFields|configuration|copula|countreg|dataDiscovery|dataPreprocess|dataSciencePilot|dataStep|decisionTree|deduplication|deepLearn|deepNeural|deepRnn|ds2|ecm|entityRes|espCluster|explainModel|factmac|fastKnn|fcmpact|fedSql|freqTab|gVarCluster|gam|gleam|graphSemiSupLearn|hiddenMarkovModel|hyperGroup|ica|image|iml|kernalPca|langModel|ldaTopic|loadStreams|mbc|mixed|mlTools|modelPublishing|network|neuralNet|nmf|nonParametricBayes|nonlinear|optNetwork|optimization|panel|pca|percentile|phreg|pls|qkb|qlim|quantreg|recommend|regression|reinforcementLearn|robustPca|ruleMining|sampling|sandwich|sccasl|search(?:Analytics)?|sentimentAnalysis|sequence|session(?:Prop)?|severity|simSystem|simple|smartData|sparkEmbeddedProcess|sparseML|spatialreg|spc|stabilityMonitoring|svDataDescription|svm|table|text(?:Filters|Frequency|Mining|Parse|Rule(?:Develop|Score)|Topic|Util)|timeData|transpose|tsInfo|tsReconcile|uniTimeSeries|varReduce/.source;
      var casActions = {
        pattern: RegExp(
          /(^|\s)(?:action\s+)?(?:<act>)\.[a-z]+\b[^;]+/.source.replace(
            /<act>/g,
            function() {
              return actionSets;
            }
          ),
          "i"
        ),
        lookbehind: true,
        inside: {
          keyword: RegExp(
            /(?:<act>)\.[a-z]+\b/.source.replace(/<act>/g, function() {
              return actionSets;
            }),
            "i"
          ),
          action: {
            pattern: /(?:action)/i,
            alias: "keyword"
          },
          comment,
          function: func,
          "arg-value": args["arg-value"],
          operator: args.operator,
          argument: args.arg,
          number,
          "numeric-constant": numericConstant,
          punctuation,
          string
        }
      };
      var keywords = {
        pattern: /((?:^|\s)=?)(?:after|analysis|and|array|barchart|barwidth|begingraph|by|call|cas|cbarline|cfill|class(?:lev)?|close|column|computed?|contains|continue|data(?==)|define|delete|describe|document|do\s+over|do|dol|drop|dul|else|end(?:comp|source)?|entryTitle|eval(?:uate)?|exec(?:ute)?|exit|file(?:name)?|fill(?:attrs)?|flist|fnc|function(?:list)?|global|goto|group(?:by)?|headline|headskip|histogram|if|infile|keep|keylabel|keyword|label|layout|leave|legendlabel|length|libname|loadactionset|merge|midpoints|_?null_|name|noobs|nowd|ods|options|or|otherwise|out(?:put)?|over(?:lay)?|plot|print|put|raise|ranexp|rannor|rbreak|retain|return|select|session|sessref|set|source|statgraph|sum|summarize|table|temp|terminate|then\s+do|then|title\d?|to|var|when|where|xaxisopts|y2axisopts|yaxisopts)\b/i,
        lookbehind: true
      };
      Prism3.languages.sas = {
        datalines: {
          pattern: /^([ \t]*)(?:cards|(?:data)?lines);[\s\S]+?^[ \t]*;/im,
          lookbehind: true,
          alias: "string",
          inside: {
            keyword: {
              pattern: /^(?:cards|(?:data)?lines)/i
            },
            punctuation: /;/
          }
        },
        "proc-sql": {
          pattern: /(^proc\s+(?:fed)?sql(?:\s+[\w|=]+)?;)[\s\S]+?(?=^(?:proc\s+\w+|data|quit|run);|(?![\s\S]))/im,
          lookbehind: true,
          inside: {
            sql: {
              pattern: RegExp(
                /^[ \t]*(?:select|alter\s+table|(?:create|describe|drop)\s+(?:index|table(?:\s+constraints)?|view)|create\s+unique\s+index|insert\s+into|update)(?:<str>|[^;"'])+;/.source.replace(
                  /<str>/g,
                  function() {
                    return stringPattern;
                  }
                ),
                "im"
              ),
              alias: "language-sql",
              inside: Prism3.languages.sql
            },
            "global-statements": globalStatements,
            "sql-statements": {
              pattern: /(^|\s)(?:disconnect\s+from|begin|commit|exec(?:ute)?|reset|rollback|validate)\b/i,
              lookbehind: true,
              alias: "keyword"
            },
            number,
            "numeric-constant": numericConstant,
            punctuation,
            string
          }
        },
        "proc-groovy": {
          pattern: /(^proc\s+groovy(?:\s+[\w|=]+)?;)[\s\S]+?(?=^(?:proc\s+\w+|data|quit|run);|(?![\s\S]))/im,
          lookbehind: true,
          inside: {
            comment,
            groovy: {
              pattern: RegExp(
                /(^[ \t]*submit(?:\s+(?:load|norun|parseonly))?)(?:<str>|[^"'])+?(?=endsubmit;)/.source.replace(
                  /<str>/g,
                  function() {
                    return stringPattern;
                  }
                ),
                "im"
              ),
              lookbehind: true,
              alias: "language-groovy",
              inside: Prism3.languages.groovy
            },
            keyword: keywords,
            "submit-statement": submitStatement,
            "global-statements": globalStatements,
            number,
            "numeric-constant": numericConstant,
            punctuation,
            string
          }
        },
        "proc-lua": {
          pattern: /(^proc\s+lua(?:\s+[\w|=]+)?;)[\s\S]+?(?=^(?:proc\s+\w+|data|quit|run);|(?![\s\S]))/im,
          lookbehind: true,
          inside: {
            comment,
            lua: {
              pattern: RegExp(
                /(^[ \t]*submit(?:\s+(?:load|norun|parseonly))?)(?:<str>|[^"'])+?(?=endsubmit;)/.source.replace(
                  /<str>/g,
                  function() {
                    return stringPattern;
                  }
                ),
                "im"
              ),
              lookbehind: true,
              alias: "language-lua",
              inside: Prism3.languages.lua
            },
            keyword: keywords,
            "submit-statement": submitStatement,
            "global-statements": globalStatements,
            number,
            "numeric-constant": numericConstant,
            punctuation,
            string
          }
        },
        "proc-cas": {
          pattern: /(^proc\s+cas(?:\s+[\w|=]+)?;)[\s\S]+?(?=^(?:proc\s+\w+|quit|data);|(?![\s\S]))/im,
          lookbehind: true,
          inside: {
            comment,
            "statement-var": {
              pattern: /((?:^|\s)=?)saveresult\s[^;]+/im,
              lookbehind: true,
              inside: {
                statement: {
                  pattern: /^saveresult\s+\S+/i,
                  inside: {
                    keyword: /^(?:saveresult)/i
                  }
                },
                rest: args
              }
            },
            "cas-actions": casActions,
            statement: {
              pattern: /((?:^|\s)=?)(?:default|(?:un)?set|on|output|upload)[^;]+/im,
              lookbehind: true,
              inside: args
            },
            step,
            keyword: keywords,
            function: func,
            format,
            altformat,
            "global-statements": globalStatements,
            number,
            "numeric-constant": numericConstant,
            punctuation,
            string
          }
        },
        "proc-args": {
          pattern: RegExp(
            /(^proc\s+\w+\s+)(?!\s)(?:[^;"']|<str>)+;/.source.replace(
              /<str>/g,
              function() {
                return stringPattern;
              }
            ),
            "im"
          ),
          lookbehind: true,
          inside: args
        },
        /*Special keywords within macros*/
        "macro-keyword": macroKeyword,
        "macro-variable": macroVariable,
        "macro-string-functions": {
          pattern: /((?:^|\s|=))%(?:BQUOTE|NRBQUOTE|NRQUOTE|NRSTR|QUOTE|STR)\(.*?(?:[^%]\))/i,
          lookbehind: true,
          inside: {
            function: {
              pattern: /%(?:BQUOTE|NRBQUOTE|NRQUOTE|NRSTR|QUOTE|STR)/i,
              alias: "keyword"
            },
            "macro-keyword": macroKeyword,
            "macro-variable": macroVariable,
            "escaped-char": {
              pattern: /%['"()<>=¬^~;,#]/
            },
            punctuation
          }
        },
        "macro-declaration": {
          pattern: /^%macro[^;]+(?=;)/im,
          inside: {
            keyword: /%macro/i
          }
        },
        "macro-end": {
          pattern: /^%mend[^;]+(?=;)/im,
          inside: {
            keyword: /%mend/i
          }
        },
        /*%_zscore(headcir, _lhc, _mhc, _shc, headcz, headcpct, _Fheadcz); */
        macro: {
          pattern: /%_\w+(?=\()/,
          alias: "keyword"
        },
        input: {
          pattern: /\binput\s[-\w\s/*.$&]+;/i,
          inside: {
            input: {
              alias: "keyword",
              pattern: /^input/i
            },
            comment,
            number,
            "numeric-constant": numericConstant
          }
        },
        "options-args": {
          pattern: /(^options)[-'"|/\\<>*+=:()\w\s]*(?=;)/im,
          lookbehind: true,
          inside: args
        },
        "cas-actions": casActions,
        comment,
        function: func,
        format,
        altformat,
        "numeric-constant": numericConstant,
        datetime: {
          // '1jan2013'd, '9:25:19pm't, '18jan2003:9:27:05am'dt
          pattern: RegExp(stringPattern + "(?:dt?|t)"),
          alias: "number"
        },
        string,
        step,
        keyword: keywords,
        // In SAS Studio syntax highlighting, these operators are styled like keywords
        "operator-keyword": {
          pattern: /\b(?:eq|ge|gt|in|le|lt|ne|not)\b/i,
          alias: "operator"
        },
        // Decimal (1.2e23), hexadecimal (0c1x)
        number,
        operator: /\*\*?|\|\|?|!!?|¦¦?|<[>=]?|>[<=]?|[-+\/=&]|[~¬^]=?/,
        punctuation
      };
    })(Prism2);
  }
  return sas_1;
}
var sass_1;
var hasRequiredSass;
function requireSass() {
  if (hasRequiredSass) return sass_1;
  hasRequiredSass = 1;
  sass_1 = sass;
  sass.displayName = "sass";
  sass.aliases = [];
  function sass(Prism2) {
    (function(Prism3) {
      Prism3.languages.sass = Prism3.languages.extend("css", {
        // Sass comments don't need to be closed, only indented
        comment: {
          pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m,
          lookbehind: true,
          greedy: true
        }
      });
      Prism3.languages.insertBefore("sass", "atrule", {
        // We want to consume the whole line
        "atrule-line": {
          // Includes support for = and + shortcuts
          pattern: /^(?:[ \t]*)[@+=].+/m,
          greedy: true,
          inside: {
            atrule: /(?:@[\w-]+|[+=])/
          }
        }
      });
      delete Prism3.languages.sass.atrule;
      var variable = /\$[-\w]+|#\{\$[-\w]+\}/;
      var operator = [
        /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|not|or)\b/,
        {
          pattern: /(\s)-(?=\s)/,
          lookbehind: true
        }
      ];
      Prism3.languages.insertBefore("sass", "property", {
        // We want to consume the whole line
        "variable-line": {
          pattern: /^[ \t]*\$.+/m,
          greedy: true,
          inside: {
            punctuation: /:/,
            variable,
            operator
          }
        },
        // We want to consume the whole line
        "property-line": {
          pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
          greedy: true,
          inside: {
            property: [
              /[^:\s]+(?=\s*:)/,
              {
                pattern: /(:)[^:\s]+/,
                lookbehind: true
              }
            ],
            punctuation: /:/,
            variable,
            operator,
            important: Prism3.languages.sass.important
          }
        }
      });
      delete Prism3.languages.sass.property;
      delete Prism3.languages.sass.important;
      Prism3.languages.insertBefore("sass", "punctuation", {
        selector: {
          pattern: /^([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/m,
          lookbehind: true,
          greedy: true
        }
      });
    })(Prism2);
  }
  return sass_1;
}
var scala_1;
var hasRequiredScala;
function requireScala() {
  if (hasRequiredScala) return scala_1;
  hasRequiredScala = 1;
  var refractorJava = requireJava();
  scala_1 = scala;
  scala.displayName = "scala";
  scala.aliases = [];
  function scala(Prism2) {
    Prism2.register(refractorJava);
    Prism2.languages.scala = Prism2.languages.extend("java", {
      "triple-quoted-string": {
        pattern: /"""[\s\S]*?"""/,
        greedy: true,
        alias: "string"
      },
      string: {
        pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      keyword: /<-|=>|\b(?:abstract|case|catch|class|def|do|else|extends|final|finally|for|forSome|if|implicit|import|lazy|match|new|null|object|override|package|private|protected|return|sealed|self|super|this|throw|trait|try|type|val|var|while|with|yield)\b/,
      number: /\b0x(?:[\da-f]*\.)?[\da-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e\d+)?[dfl]?/i,
      builtin: /\b(?:Any|AnyRef|AnyVal|Boolean|Byte|Char|Double|Float|Int|Long|Nothing|Short|String|Unit)\b/,
      symbol: /'[^\d\s\\]\w*/
    });
    Prism2.languages.insertBefore("scala", "triple-quoted-string", {
      "string-interpolation": {
        pattern: /\b[a-z]\w*(?:"""(?:[^$]|\$(?:[^{]|\{(?:[^{}]|\{[^{}]*\})*\}))*?"""|"(?:[^$"\r\n]|\$(?:[^{]|\{(?:[^{}]|\{[^{}]*\})*\}))*")/i,
        greedy: true,
        inside: {
          id: {
            pattern: /^\w+/,
            greedy: true,
            alias: "function"
          },
          escape: {
            pattern: /\\\$"|\$[$"]/,
            greedy: true,
            alias: "symbol"
          },
          interpolation: {
            pattern: /\$(?:\w+|\{(?:[^{}]|\{[^{}]*\})*\})/,
            greedy: true,
            inside: {
              punctuation: /^\$\{?|\}$/,
              expression: {
                pattern: /[\s\S]+/,
                inside: Prism2.languages.scala
              }
            }
          },
          string: /[\s\S]+/
        }
      }
    });
    delete Prism2.languages.scala["class-name"];
    delete Prism2.languages.scala["function"];
  }
  return scala_1;
}
var scss_1;
var hasRequiredScss;
function requireScss() {
  if (hasRequiredScss) return scss_1;
  hasRequiredScss = 1;
  scss_1 = scss;
  scss.displayName = "scss";
  scss.aliases = [];
  function scss(Prism2) {
    Prism2.languages.scss = Prism2.languages.extend("css", {
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: true
      },
      atrule: {
        pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
        inside: {
          rule: /@[\w-]+/
          // See rest below
        }
      },
      // url, compassified
      url: /(?:[-a-z]+-)?url(?=\()/i,
      // CSS selector regex is not appropriate for Sass
      // since there can be lot more things (var, @ directive, nesting..)
      // a selector must start at the end of a property or after a brace (end of other rules or nesting)
      // it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
      // the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
      // can "pass" as a selector- e.g: proper#{$erty})
      // this one was hard to do, so please be careful if you edit this one :)
      selector: {
        // Initial look-ahead is used to prevent matching of blank selectors
        pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,
        inside: {
          parent: {
            pattern: /&/,
            alias: "important"
          },
          placeholder: /%[-\w]+/,
          variable: /\$[-\w]+|#\{\$[-\w]+\}/
        }
      },
      property: {
        pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
        inside: {
          variable: /\$[-\w]+|#\{\$[-\w]+\}/
        }
      }
    });
    Prism2.languages.insertBefore("scss", "atrule", {
      keyword: [
        /@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i,
        {
          pattern: /( )(?:from|through)(?= )/,
          lookbehind: true
        }
      ]
    });
    Prism2.languages.insertBefore("scss", "important", {
      // var and interpolated vars
      variable: /\$[-\w]+|#\{\$[-\w]+\}/
    });
    Prism2.languages.insertBefore("scss", "function", {
      "module-modifier": {
        pattern: /\b(?:as|hide|show|with)\b/i,
        alias: "keyword"
      },
      placeholder: {
        pattern: /%[-\w]+/,
        alias: "selector"
      },
      statement: {
        pattern: /\B!(?:default|optional)\b/i,
        alias: "keyword"
      },
      boolean: /\b(?:false|true)\b/,
      null: {
        pattern: /\bnull\b/,
        alias: "keyword"
      },
      operator: {
        pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/,
        lookbehind: true
      }
    });
    Prism2.languages.scss["atrule"].inside.rest = Prism2.languages.scss;
  }
  return scss_1;
}
var shellSession_1;
var hasRequiredShellSession;
function requireShellSession() {
  if (hasRequiredShellSession) return shellSession_1;
  hasRequiredShellSession = 1;
  var refractorBash = requireBash();
  shellSession_1 = shellSession;
  shellSession.displayName = "shellSession";
  shellSession.aliases = [];
  function shellSession(Prism2) {
    Prism2.register(refractorBash);
    (function(Prism3) {
      var strings = [
        // normal string
        /"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/.source,
        /'[^']*'/.source,
        /\$'(?:[^'\\]|\\[\s\S])*'/.source,
        // here doc
        // 2 capturing groups
        /<<-?\s*(["']?)(\w+)\1\s[\s\S]*?[\r\n]\2/.source
      ].join("|");
      Prism3.languages["shell-session"] = {
        command: {
          pattern: RegExp(
            // user info
            /^/.source + "(?:" + // <user> ":" ( <path> )?
            (/[^\s@:$#%*!/\\]+@[^\r\n@:$#%*!/\\]+(?::[^\0-\x1F$#%*?"<>:;|]+)?/.source + "|" + // <path>
            // Since the path pattern is quite general, we will require it to start with a special character to
            // prevent false positives.
            /[/~.][^\0-\x1F$#%*?"<>@:;|]*/.source) + ")?" + // shell symbol
            /[$#%](?=\s)/.source + // bash command
            /(?:[^\\\r\n \t'"<$]|[ \t](?:(?!#)|#.*$)|\\(?:[^\r]|\r\n?)|\$(?!')|<(?!<)|<<str>>)+/.source.replace(
              /<<str>>/g,
              function() {
                return strings;
              }
            ),
            "m"
          ),
          greedy: true,
          inside: {
            info: {
              // foo@bar:~/files$ exit
              // foo@bar$ exit
              // ~/files$ exit
              pattern: /^[^#$%]+/,
              alias: "punctuation",
              inside: {
                user: /^[^\s@:$#%*!/\\]+@[^\r\n@:$#%*!/\\]+/,
                punctuation: /:/,
                path: /[\s\S]+/
              }
            },
            bash: {
              pattern: /(^[$#%]\s*)\S[\s\S]*/,
              lookbehind: true,
              alias: "language-bash",
              inside: Prism3.languages.bash
            },
            "shell-symbol": {
              pattern: /^[$#%]/,
              alias: "important"
            }
          }
        },
        output: /.(?:.*(?:[\r\n]|.$))*/
      };
      Prism3.languages["sh-session"] = Prism3.languages["shellsession"] = Prism3.languages["shell-session"];
    })(Prism2);
  }
  return shellSession_1;
}
var smali_1;
var hasRequiredSmali;
function requireSmali() {
  if (hasRequiredSmali) return smali_1;
  hasRequiredSmali = 1;
  smali_1 = smali;
  smali.displayName = "smali";
  smali.aliases = [];
  function smali(Prism2) {
    Prism2.languages.smali = {
      comment: /#.*/,
      string: {
        pattern: /"(?:[^\r\n\\"]|\\.)*"|'(?:[^\r\n\\']|\\(?:.|u[\da-fA-F]{4}))'/,
        greedy: true
      },
      "class-name": {
        pattern: /(^|[^L])L(?:(?:\w+|`[^`\r\n]*`)\/)*(?:[\w$]+|`[^`\r\n]*`)(?=\s*;)/,
        lookbehind: true,
        inside: {
          "class-name": {
            pattern: /(^L|\/)(?:[\w$]+|`[^`\r\n]*`)$/,
            lookbehind: true
          },
          namespace: {
            pattern: /^(L)(?:(?:\w+|`[^`\r\n]*`)\/)+/,
            lookbehind: true,
            inside: {
              punctuation: /\//
            }
          },
          builtin: /^L/
        }
      },
      builtin: [
        {
          // Reference: https://github.com/JesusFreke/smali/wiki/TypesMethodsAndFields#types
          pattern: /([();\[])[BCDFIJSVZ]+/,
          lookbehind: true
        },
        {
          // e.g. .field mWifiOnUid:I
          pattern: /([\w$>]:)[BCDFIJSVZ]/,
          lookbehind: true
        }
      ],
      keyword: [
        {
          pattern: /(\.end\s+)[\w-]+/,
          lookbehind: true
        },
        {
          pattern: /(^|[^\w.-])\.(?!\d)[\w-]+/,
          lookbehind: true
        },
        {
          pattern: /(^|[^\w.-])(?:abstract|annotation|bridge|constructor|enum|final|interface|private|protected|public|runtime|static|synthetic|system|transient)(?![\w.-])/,
          lookbehind: true
        }
      ],
      function: {
        pattern: /(^|[^\w.-])(?:\w+|<[\w$-]+>)(?=\()/,
        lookbehind: true
      },
      field: {
        pattern: /[\w$]+(?=:)/,
        alias: "variable"
      },
      register: {
        pattern: /(^|[^\w.-])[vp]\d(?![\w.-])/,
        lookbehind: true,
        alias: "variable"
      },
      boolean: {
        pattern: /(^|[^\w.-])(?:false|true)(?![\w.-])/,
        lookbehind: true
      },
      number: {
        pattern: /(^|[^/\w.-])-?(?:NAN|INFINITY|0x(?:[\dA-F]+(?:\.[\dA-F]*)?|\.[\dA-F]+)(?:p[+-]?[\dA-F]+)?|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)[dflst]?(?![\w.-])/i,
        lookbehind: true
      },
      label: {
        pattern: /(:)\w+/,
        lookbehind: true,
        alias: "property"
      },
      operator: /->|\.\.|[\[=]/,
      punctuation: /[{}(),;:]/
    };
  }
  return smali_1;
}
var smalltalk_1;
var hasRequiredSmalltalk;
function requireSmalltalk() {
  if (hasRequiredSmalltalk) return smalltalk_1;
  hasRequiredSmalltalk = 1;
  smalltalk_1 = smalltalk;
  smalltalk.displayName = "smalltalk";
  smalltalk.aliases = [];
  function smalltalk(Prism2) {
    Prism2.languages.smalltalk = {
      comment: {
        pattern: /"(?:""|[^"])*"/,
        greedy: true
      },
      char: {
        pattern: /\$./,
        greedy: true
      },
      string: {
        pattern: /'(?:''|[^'])*'/,
        greedy: true
      },
      symbol: /#[\da-z]+|#(?:-|([+\/\\*~<>=@%|&?!])\1?)|#(?=\()/i,
      "block-arguments": {
        pattern: /(\[\s*):[^\[|]*\|/,
        lookbehind: true,
        inside: {
          variable: /:[\da-z]+/i,
          punctuation: /\|/
        }
      },
      "temporary-variables": {
        pattern: /\|[^|]+\|/,
        inside: {
          variable: /[\da-z]+/i,
          punctuation: /\|/
        }
      },
      keyword: /\b(?:new|nil|self|super)\b/,
      boolean: /\b(?:false|true)\b/,
      number: [
        /\d+r-?[\dA-Z]+(?:\.[\dA-Z]+)?(?:e-?\d+)?/,
        /\b\d+(?:\.\d+)?(?:e-?\d+)?/
      ],
      operator: /[<=]=?|:=|~[~=]|\/\/?|\\\\|>[>=]?|[!^+\-*&|,@]/,
      punctuation: /[.;:?\[\](){}]/
    };
  }
  return smalltalk_1;
}
var smarty_1;
var hasRequiredSmarty;
function requireSmarty() {
  if (hasRequiredSmarty) return smarty_1;
  hasRequiredSmarty = 1;
  var refractorMarkupTemplating = requireMarkupTemplating();
  smarty_1 = smarty;
  smarty.displayName = "smarty";
  smarty.aliases = [];
  function smarty(Prism2) {
    Prism2.register(refractorMarkupTemplating);
    (function(Prism3) {
      Prism3.languages.smarty = {
        comment: {
          pattern: /^\{\*[\s\S]*?\*\}/,
          greedy: true
        },
        "embedded-php": {
          pattern: /^\{php\}[\s\S]*?\{\/php\}/,
          greedy: true,
          inside: {
            smarty: {
              pattern: /^\{php\}|\{\/php\}$/,
              inside: null
              // see below
            },
            php: {
              pattern: /[\s\S]+/,
              alias: "language-php",
              inside: Prism3.languages.php
            }
          }
        },
        string: [
          {
            pattern: /"(?:\\.|[^"\\\r\n])*"/,
            greedy: true,
            inside: {
              interpolation: {
                pattern: /\{[^{}]*\}|`[^`]*`/,
                inside: {
                  "interpolation-punctuation": {
                    pattern: /^[{`]|[`}]$/,
                    alias: "punctuation"
                  },
                  expression: {
                    pattern: /[\s\S]+/,
                    inside: null
                    // see below
                  }
                }
              },
              variable: /\$\w+/
            }
          },
          {
            pattern: /'(?:\\.|[^'\\\r\n])*'/,
            greedy: true
          }
        ],
        keyword: {
          pattern: /(^\{\/?)[a-z_]\w*\b(?!\()/i,
          lookbehind: true,
          greedy: true
        },
        delimiter: {
          pattern: /^\{\/?|\}$/,
          greedy: true,
          alias: "punctuation"
        },
        number: /\b0x[\dA-Fa-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][-+]?\d+)?/,
        variable: [
          /\$(?!\d)\w+/,
          /#(?!\d)\w+#/,
          {
            pattern: /(\.|->|\w\s*=)(?!\d)\w+\b(?!\()/,
            lookbehind: true
          },
          {
            pattern: /(\[)(?!\d)\w+(?=\])/,
            lookbehind: true
          }
        ],
        function: {
          pattern: /(\|\s*)@?[a-z_]\w*|\b[a-z_]\w*(?=\()/i,
          lookbehind: true
        },
        "attr-name": /\b[a-z_]\w*(?=\s*=)/i,
        boolean: /\b(?:false|no|off|on|true|yes)\b/,
        punctuation: /[\[\](){}.,:`]|->/,
        operator: [
          /[+\-*\/%]|==?=?|[!<>]=?|&&|\|\|?/,
          /\bis\s+(?:not\s+)?(?:div|even|odd)(?:\s+by)?\b/,
          /\b(?:and|eq|gt?e|gt|lt?e|lt|mod|neq?|not|or)\b/
        ]
      };
      Prism3.languages.smarty["embedded-php"].inside.smarty.inside = Prism3.languages.smarty;
      Prism3.languages.smarty.string[0].inside.interpolation.inside.expression.inside = Prism3.languages.smarty;
      var string = /"(?:\\.|[^"\\\r\n])*"|'(?:\\.|[^'\\\r\n])*'/;
      var smartyPattern = RegExp(
        // comments
        /\{\*[\s\S]*?\*\}/.source + "|" + // php tags
        /\{php\}[\s\S]*?\{\/php\}/.source + "|" + // smarty blocks
        /\{(?:[^{}"']|<str>|\{(?:[^{}"']|<str>|\{(?:[^{}"']|<str>)*\})*\})*\}/.source.replace(
          /<str>/g,
          function() {
            return string.source;
          }
        ),
        "g"
      );
      Prism3.hooks.add("before-tokenize", function(env) {
        var smartyLiteralStart = "{literal}";
        var smartyLiteralEnd = "{/literal}";
        var smartyLiteralMode = false;
        Prism3.languages["markup-templating"].buildPlaceholders(
          env,
          "smarty",
          smartyPattern,
          function(match) {
            if (match === smartyLiteralEnd) {
              smartyLiteralMode = false;
            }
            if (!smartyLiteralMode) {
              if (match === smartyLiteralStart) {
                smartyLiteralMode = true;
              }
              return true;
            }
            return false;
          }
        );
      });
      Prism3.hooks.add("after-tokenize", function(env) {
        Prism3.languages["markup-templating"].tokenizePlaceholders(env, "smarty");
      });
    })(Prism2);
  }
  return smarty_1;
}
var sml_1;
var hasRequiredSml;
function requireSml() {
  if (hasRequiredSml) return sml_1;
  hasRequiredSml = 1;
  sml_1 = sml;
  sml.displayName = "sml";
  sml.aliases = ["smlnj"];
  function sml(Prism2) {
    (function(Prism3) {
      var keywords = /\b(?:abstype|and|andalso|as|case|datatype|do|else|end|eqtype|exception|fn|fun|functor|handle|if|in|include|infix|infixr|let|local|nonfix|of|op|open|orelse|raise|rec|sharing|sig|signature|struct|structure|then|type|val|where|while|with|withtype)\b/i;
      Prism3.languages.sml = {
        // allow one level of nesting
        comment: /\(\*(?:[^*(]|\*(?!\))|\((?!\*)|\(\*(?:[^*(]|\*(?!\))|\((?!\*))*\*\))*\*\)/,
        string: {
          pattern: /#?"(?:[^"\\]|\\.)*"/,
          greedy: true
        },
        "class-name": [
          {
            // This is only an approximation since the real grammar is context-free
            //
            // Why the main loop so complex?
            // The main loop is approximately the same as /(?:\s*(?:[*,]|->)\s*<TERMINAL>)*/ which is, obviously, a lot
            // simpler. The difference is that if a comma is the last iteration of the loop, then the terminal must be
            // followed by a long identifier.
            pattern: RegExp(
              /((?:^|[^:]):\s*)<TERMINAL>(?:\s*(?:(?:\*|->)\s*<TERMINAL>|,\s*<TERMINAL>(?:(?=<NOT-LAST>)|(?!<NOT-LAST>)\s+<LONG-ID>)))*/.source.replace(/<NOT-LAST>/g, function() {
                return /\s*(?:[*,]|->)/.source;
              }).replace(/<TERMINAL>/g, function() {
                return /(?:'[\w']*|<LONG-ID>|\((?:[^()]|\([^()]*\))*\)|\{(?:[^{}]|\{[^{}]*\})*\})(?:\s+<LONG-ID>)*/.source;
              }).replace(/<LONG-ID>/g, function() {
                return /(?!<KEYWORD>)[a-z\d_][\w'.]*/.source;
              }).replace(/<KEYWORD>/g, function() {
                return keywords.source;
              }),
              "i"
            ),
            lookbehind: true,
            greedy: true,
            inside: null
            // see below
          },
          {
            pattern: /((?:^|[^\w'])(?:datatype|exception|functor|signature|structure|type)\s+)[a-z_][\w'.]*/i,
            lookbehind: true
          }
        ],
        function: {
          pattern: /((?:^|[^\w'])fun\s+)[a-z_][\w'.]*/i,
          lookbehind: true
        },
        keyword: keywords,
        variable: {
          pattern: /(^|[^\w'])'[\w']*/,
          lookbehind: true
        },
        number: /~?\b(?:\d+(?:\.\d+)?(?:e~?\d+)?|0x[\da-f]+)\b/i,
        word: {
          pattern: /\b0w(?:\d+|x[\da-f]+)\b/i,
          alias: "constant"
        },
        boolean: /\b(?:false|true)\b/i,
        operator: /\.\.\.|:[>=:]|=>?|->|[<>]=?|[!+\-*/^#|@~]/,
        punctuation: /[(){}\[\].:,;]/
      };
      Prism3.languages.sml["class-name"][0].inside = Prism3.languages.sml;
      Prism3.languages.smlnj = Prism3.languages.sml;
    })(Prism2);
  }
  return sml_1;
}
var solidity_1;
var hasRequiredSolidity;
function requireSolidity() {
  if (hasRequiredSolidity) return solidity_1;
  hasRequiredSolidity = 1;
  solidity_1 = solidity;
  solidity.displayName = "solidity";
  solidity.aliases = ["sol"];
  function solidity(Prism2) {
    Prism2.languages.solidity = Prism2.languages.extend("clike", {
      "class-name": {
        pattern: /(\b(?:contract|enum|interface|library|new|struct|using)\s+)(?!\d)[\w$]+/,
        lookbehind: true
      },
      keyword: /\b(?:_|anonymous|as|assembly|assert|break|calldata|case|constant|constructor|continue|contract|default|delete|do|else|emit|enum|event|external|for|from|function|if|import|indexed|inherited|interface|internal|is|let|library|mapping|memory|modifier|new|payable|pragma|private|public|pure|require|returns?|revert|selfdestruct|solidity|storage|struct|suicide|switch|this|throw|using|var|view|while)\b/,
      operator: /=>|->|:=|=:|\*\*|\+\+|--|\|\||&&|<<=?|>>=?|[-+*/%^&|<>!=]=?|[~?]/
    });
    Prism2.languages.insertBefore("solidity", "keyword", {
      builtin: /\b(?:address|bool|byte|u?int(?:8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?|string|bytes(?:[1-9]|[12]\d|3[0-2])?)\b/
    });
    Prism2.languages.insertBefore("solidity", "number", {
      version: {
        pattern: /([<>]=?|\^)\d+\.\d+\.\d+\b/,
        lookbehind: true,
        alias: "number"
      }
    });
    Prism2.languages.sol = Prism2.languages.solidity;
  }
  return solidity_1;
}
var solutionFile_1;
var hasRequiredSolutionFile;
function requireSolutionFile() {
  if (hasRequiredSolutionFile) return solutionFile_1;
  hasRequiredSolutionFile = 1;
  solutionFile_1 = solutionFile;
  solutionFile.displayName = "solutionFile";
  solutionFile.aliases = [];
  function solutionFile(Prism2) {
    (function(Prism3) {
      var guid = {
        // https://en.wikipedia.org/wiki/Universally_unique_identifier#Format
        pattern: /\{[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}\}/i,
        alias: "constant",
        inside: {
          punctuation: /[{}]/
        }
      };
      Prism3.languages["solution-file"] = {
        comment: {
          pattern: /#.*/,
          greedy: true
        },
        string: {
          pattern: /"[^"\r\n]*"|'[^'\r\n]*'/,
          greedy: true,
          inside: {
            guid
          }
        },
        object: {
          // Foo
          //   Bar("abs") = 9
          //   EndBar
          //   Prop = TRUE
          // EndFoo
          pattern: /^([ \t]*)(?:([A-Z]\w*)\b(?=.*(?:\r\n?|\n)(?:\1[ \t].*(?:\r\n?|\n))*\1End\2(?=[ \t]*$))|End[A-Z]\w*(?=[ \t]*$))/m,
          lookbehind: true,
          greedy: true,
          alias: "keyword"
        },
        property: {
          pattern: /^([ \t]*)(?!\s)[^\r\n"#=()]*[^\s"#=()](?=\s*=)/m,
          lookbehind: true,
          inside: {
            guid
          }
        },
        guid,
        number: /\b\d+(?:\.\d+)*\b/,
        boolean: /\b(?:FALSE|TRUE)\b/,
        operator: /=/,
        punctuation: /[(),]/
      };
      Prism3.languages["sln"] = Prism3.languages["solution-file"];
    })(Prism2);
  }
  return solutionFile_1;
}
var soy_1;
var hasRequiredSoy;
function requireSoy() {
  if (hasRequiredSoy) return soy_1;
  hasRequiredSoy = 1;
  var refractorMarkupTemplating = requireMarkupTemplating();
  soy_1 = soy;
  soy.displayName = "soy";
  soy.aliases = [];
  function soy(Prism2) {
    Prism2.register(refractorMarkupTemplating);
    (function(Prism3) {
      var stringPattern = /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
      var numberPattern = /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|\b0x[\dA-F]+\b/;
      Prism3.languages.soy = {
        comment: [
          /\/\*[\s\S]*?\*\//,
          {
            pattern: /(\s)\/\/.*/,
            lookbehind: true,
            greedy: true
          }
        ],
        "command-arg": {
          pattern: /(\{+\/?\s*(?:alias|call|delcall|delpackage|deltemplate|namespace|template)\s+)\.?[\w.]+/,
          lookbehind: true,
          alias: "string",
          inside: {
            punctuation: /\./
          }
        },
        parameter: {
          pattern: /(\{+\/?\s*@?param\??\s+)\.?[\w.]+/,
          lookbehind: true,
          alias: "variable"
        },
        keyword: [
          {
            pattern: /(\{+\/?[^\S\r\n]*)(?:\\[nrt]|alias|call|case|css|default|delcall|delpackage|deltemplate|else(?:if)?|fallbackmsg|for(?:each)?|if(?:empty)?|lb|let|literal|msg|namespace|nil|@?param\??|rb|sp|switch|template|xid)/,
            lookbehind: true
          },
          /\b(?:any|as|attributes|bool|css|float|html|in|int|js|list|map|null|number|string|uri)\b/
        ],
        delimiter: {
          pattern: /^\{+\/?|\/?\}+$/,
          alias: "punctuation"
        },
        property: /\w+(?==)/,
        variable: {
          pattern: /\$[^\W\d]\w*(?:\??(?:\.\w+|\[[^\]]+\]))*/,
          inside: {
            string: {
              pattern: stringPattern,
              greedy: true
            },
            number: numberPattern,
            punctuation: /[\[\].?]/
          }
        },
        string: {
          pattern: stringPattern,
          greedy: true
        },
        function: [
          /\w+(?=\()/,
          {
            pattern: /(\|[^\S\r\n]*)\w+/,
            lookbehind: true
          }
        ],
        boolean: /\b(?:false|true)\b/,
        number: numberPattern,
        operator: /\?:?|<=?|>=?|==?|!=|[+*/%-]|\b(?:and|not|or)\b/,
        punctuation: /[{}()\[\]|.,:]/
      };
      Prism3.hooks.add("before-tokenize", function(env) {
        var soyPattern = /\{\{.+?\}\}|\{.+?\}|\s\/\/.*|\/\*[\s\S]*?\*\//g;
        var soyLitteralStart = "{literal}";
        var soyLitteralEnd = "{/literal}";
        var soyLitteralMode = false;
        Prism3.languages["markup-templating"].buildPlaceholders(
          env,
          "soy",
          soyPattern,
          function(match) {
            if (match === soyLitteralEnd) {
              soyLitteralMode = false;
            }
            if (!soyLitteralMode) {
              if (match === soyLitteralStart) {
                soyLitteralMode = true;
              }
              return true;
            }
            return false;
          }
        );
      });
      Prism3.hooks.add("after-tokenize", function(env) {
        Prism3.languages["markup-templating"].tokenizePlaceholders(env, "soy");
      });
    })(Prism2);
  }
  return soy_1;
}
var turtle_1;
var hasRequiredTurtle;
function requireTurtle() {
  if (hasRequiredTurtle) return turtle_1;
  hasRequiredTurtle = 1;
  turtle_1 = turtle;
  turtle.displayName = "turtle";
  turtle.aliases = [];
  function turtle(Prism2) {
    Prism2.languages.turtle = {
      comment: {
        pattern: /#.*/,
        greedy: true
      },
      "multiline-string": {
        pattern: /"""(?:(?:""?)?(?:[^"\\]|\\.))*"""|'''(?:(?:''?)?(?:[^'\\]|\\.))*'''/,
        greedy: true,
        alias: "string",
        inside: {
          comment: /#.*/
        }
      },
      string: {
        pattern: /"(?:[^\\"\r\n]|\\.)*"|'(?:[^\\'\r\n]|\\.)*'/,
        greedy: true
      },
      url: {
        pattern: /<(?:[^\x00-\x20<>"{}|^`\\]|\\(?:u[\da-fA-F]{4}|U[\da-fA-F]{8}))*>/,
        greedy: true,
        inside: {
          punctuation: /[<>]/
        }
      },
      function: {
        pattern: /(?:(?![-.\d\xB7])[-.\w\xB7\xC0-\uFFFD]+)?:(?:(?![-.])(?:[-.:\w\xC0-\uFFFD]|%[\da-f]{2}|\\.)+)?/i,
        inside: {
          "local-name": {
            pattern: /([^:]*:)[\s\S]+/,
            lookbehind: true
          },
          prefix: {
            pattern: /[\s\S]+/,
            inside: {
              punctuation: /:/
            }
          }
        }
      },
      number: /[+-]?\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,
      punctuation: /[{}.,;()[\]]|\^\^/,
      boolean: /\b(?:false|true)\b/,
      keyword: [/(?:\ba|@prefix|@base)\b|=/, /\b(?:base|graph|prefix)\b/i],
      tag: {
        pattern: /@[a-z]+(?:-[a-z\d]+)*/i,
        inside: {
          punctuation: /@/
        }
      }
    };
    Prism2.languages.trig = Prism2.languages["turtle"];
  }
  return turtle_1;
}
var sparql_1;
var hasRequiredSparql;
function requireSparql() {
  if (hasRequiredSparql) return sparql_1;
  hasRequiredSparql = 1;
  var refractorTurtle = requireTurtle();
  sparql_1 = sparql;
  sparql.displayName = "sparql";
  sparql.aliases = ["rq"];
  function sparql(Prism2) {
    Prism2.register(refractorTurtle);
    Prism2.languages.sparql = Prism2.languages.extend("turtle", {
      boolean: /\b(?:false|true)\b/i,
      variable: {
        pattern: /[?$]\w+/,
        greedy: true
      }
    });
    Prism2.languages.insertBefore("sparql", "punctuation", {
      keyword: [
        /\b(?:A|ADD|ALL|AS|ASC|ASK|BNODE|BY|CLEAR|CONSTRUCT|COPY|CREATE|DATA|DEFAULT|DELETE|DESC|DESCRIBE|DISTINCT|DROP|EXISTS|FILTER|FROM|GROUP|HAVING|INSERT|INTO|LIMIT|LOAD|MINUS|MOVE|NAMED|NOT|NOW|OFFSET|OPTIONAL|ORDER|RAND|REDUCED|SELECT|SEPARATOR|SERVICE|SILENT|STRUUID|UNION|USING|UUID|VALUES|WHERE)\b/i,
        /\b(?:ABS|AVG|BIND|BOUND|CEIL|COALESCE|CONCAT|CONTAINS|COUNT|DATATYPE|DAY|ENCODE_FOR_URI|FLOOR|GROUP_CONCAT|HOURS|IF|IRI|isBLANK|isIRI|isLITERAL|isNUMERIC|isURI|LANG|LANGMATCHES|LCASE|MAX|MD5|MIN|MINUTES|MONTH|REGEX|REPLACE|ROUND|sameTerm|SAMPLE|SECONDS|SHA1|SHA256|SHA384|SHA512|STR|STRAFTER|STRBEFORE|STRDT|STRENDS|STRLANG|STRLEN|STRSTARTS|SUBSTR|SUM|TIMEZONE|TZ|UCASE|URI|YEAR)\b(?=\s*\()/i,
        /\b(?:BASE|GRAPH|PREFIX)\b/i
      ]
    });
    Prism2.languages.rq = Prism2.languages.sparql;
  }
  return sparql_1;
}
var splunkSpl_1;
var hasRequiredSplunkSpl;
function requireSplunkSpl() {
  if (hasRequiredSplunkSpl) return splunkSpl_1;
  hasRequiredSplunkSpl = 1;
  splunkSpl_1 = splunkSpl;
  splunkSpl.displayName = "splunkSpl";
  splunkSpl.aliases = [];
  function splunkSpl(Prism2) {
    Prism2.languages["splunk-spl"] = {
      comment: /`comment\("(?:\\.|[^\\"])*"\)`/,
      string: {
        pattern: /"(?:\\.|[^\\"])*"/,
        greedy: true
      },
      // https://docs.splunk.com/Documentation/Splunk/7.3.0/SearchReference/ListOfSearchCommands
      keyword: /\b(?:abstract|accum|addcoltotals|addinfo|addtotals|analyzefields|anomalies|anomalousvalue|anomalydetection|append|appendcols|appendcsv|appendlookup|appendpipe|arules|associate|audit|autoregress|bin|bucket|bucketdir|chart|cluster|cofilter|collect|concurrency|contingency|convert|correlate|datamodel|dbinspect|dedup|delete|delta|diff|erex|eval|eventcount|eventstats|extract|fieldformat|fields|fieldsummary|filldown|fillnull|findtypes|folderize|foreach|format|from|gauge|gentimes|geom|geomfilter|geostats|head|highlight|history|iconify|input|inputcsv|inputlookup|iplocation|join|kmeans|kv|kvform|loadjob|localize|localop|lookup|makecontinuous|makemv|makeresults|map|mcollect|metadata|metasearch|meventcollect|mstats|multikv|multisearch|mvcombine|mvexpand|nomv|outlier|outputcsv|outputlookup|outputtext|overlap|pivot|predict|rangemap|rare|regex|relevancy|reltime|rename|replace|rest|return|reverse|rex|rtorder|run|savedsearch|script|scrub|search|searchtxn|selfjoin|sendemail|set|setfields|sichart|sirare|sistats|sitimechart|sitop|sort|spath|stats|strcat|streamstats|table|tags|tail|timechart|timewrap|top|transaction|transpose|trendline|tscollect|tstats|typeahead|typelearner|typer|union|uniq|untable|where|x11|xmlkv|xmlunescape|xpath|xyseries)\b/i,
      "operator-word": {
        pattern: /\b(?:and|as|by|not|or|xor)\b/i,
        alias: "operator"
      },
      function: /\b\w+(?=\s*\()/,
      property: /\b\w+(?=\s*=(?!=))/,
      date: {
        // MM/DD/YYYY(:HH:MM:SS)?
        pattern: /\b\d{1,2}\/\d{1,2}\/\d{1,4}(?:(?::\d{1,2}){3})?\b/,
        alias: "number"
      },
      number: /\b\d+(?:\.\d+)?\b/,
      boolean: /\b(?:f|false|t|true)\b/i,
      operator: /[<>=]=?|[-+*/%|]/,
      punctuation: /[()[\],]/
    };
  }
  return splunkSpl_1;
}
var sqf_1;
var hasRequiredSqf;
function requireSqf() {
  if (hasRequiredSqf) return sqf_1;
  hasRequiredSqf = 1;
  sqf_1 = sqf;
  sqf.displayName = "sqf";
  sqf.aliases = [];
  function sqf(Prism2) {
    Prism2.languages.sqf = Prism2.languages.extend("clike", {
      string: {
        pattern: /"(?:(?:"")?[^"])*"(?!")|'(?:[^'])*'/,
        greedy: true
      },
      keyword: /\b(?:breakOut|breakTo|call|case|catch|default|do|echo|else|execFSM|execVM|exitWith|for|forEach|forEachMember|forEachMemberAgent|forEachMemberTeam|from|goto|if|nil|preprocessFile|preprocessFileLineNumbers|private|scopeName|spawn|step|switch|then|throw|to|try|while|with)\b/i,
      boolean: /\b(?:false|true)\b/i,
      function: /\b(?:abs|accTime|acos|action|actionIDs|actionKeys|actionKeysImages|actionKeysNames|actionKeysNamesArray|actionName|actionParams|activateAddons|activatedAddons|activateKey|add3DENConnection|add3DENEventHandler|add3DENLayer|addAction|addBackpack|addBackpackCargo|addBackpackCargoGlobal|addBackpackGlobal|addCamShake|addCuratorAddons|addCuratorCameraArea|addCuratorEditableObjects|addCuratorEditingArea|addCuratorPoints|addEditorObject|addEventHandler|addForce|addForceGeneratorRTD|addGoggles|addGroupIcon|addHandgunItem|addHeadgear|addItem|addItemCargo|addItemCargoGlobal|addItemPool|addItemToBackpack|addItemToUniform|addItemToVest|addLiveStats|addMagazine|addMagazineAmmoCargo|addMagazineCargo|addMagazineCargoGlobal|addMagazineGlobal|addMagazinePool|addMagazines|addMagazineTurret|addMenu|addMenuItem|addMissionEventHandler|addMPEventHandler|addMusicEventHandler|addOwnedMine|addPlayerScores|addPrimaryWeaponItem|addPublicVariableEventHandler|addRating|addResources|addScore|addScoreSide|addSecondaryWeaponItem|addSwitchableUnit|addTeamMember|addToRemainsCollector|addTorque|addUniform|addVehicle|addVest|addWaypoint|addWeapon|addWeaponCargo|addWeaponCargoGlobal|addWeaponGlobal|addWeaponItem|addWeaponPool|addWeaponTurret|admin|agent|agents|AGLToASL|aimedAtTarget|aimPos|airDensityCurveRTD|airDensityRTD|airplaneThrottle|airportSide|AISFinishHeal|alive|all3DENEntities|allAirports|allControls|allCurators|allCutLayers|allDead|allDeadMen|allDisplays|allGroups|allMapMarkers|allMines|allMissionObjects|allow3DMode|allowCrewInImmobile|allowCuratorLogicIgnoreAreas|allowDamage|allowDammage|allowFileOperations|allowFleeing|allowGetIn|allowSprint|allPlayers|allSimpleObjects|allSites|allTurrets|allUnits|allUnitsUAV|allVariables|ammo|ammoOnPylon|animate|animateBay|animateDoor|animatePylon|animateSource|animationNames|animationPhase|animationSourcePhase|animationState|append|apply|armoryPoints|arrayIntersect|asin|ASLToAGL|ASLToATL|assert|assignAsCargo|assignAsCargoIndex|assignAsCommander|assignAsDriver|assignAsGunner|assignAsTurret|assignCurator|assignedCargo|assignedCommander|assignedDriver|assignedGunner|assignedItems|assignedTarget|assignedTeam|assignedVehicle|assignedVehicleRole|assignItem|assignTeam|assignToAirport|atan|atan2|atg|ATLToASL|attachedObject|attachedObjects|attachedTo|attachObject|attachTo|attackEnabled|backpack|backpackCargo|backpackContainer|backpackItems|backpackMagazines|backpackSpaceFor|behaviour|benchmark|binocular|blufor|boundingBox|boundingBoxReal|boundingCenter|briefingName|buildingExit|buildingPos|buldozer_EnableRoadDiag|buldozer_IsEnabledRoadDiag|buldozer_LoadNewRoads|buldozer_reloadOperMap|buttonAction|buttonSetAction|cadetMode|callExtension|camCommand|camCommit|camCommitPrepared|camCommitted|camConstuctionSetParams|camCreate|camDestroy|cameraEffect|cameraEffectEnableHUD|cameraInterest|cameraOn|cameraView|campaignConfigFile|camPreload|camPreloaded|camPrepareBank|camPrepareDir|camPrepareDive|camPrepareFocus|camPrepareFov|camPrepareFovRange|camPreparePos|camPrepareRelPos|camPrepareTarget|camSetBank|camSetDir|camSetDive|camSetFocus|camSetFov|camSetFovRange|camSetPos|camSetRelPos|camSetTarget|camTarget|camUseNVG|canAdd|canAddItemToBackpack|canAddItemToUniform|canAddItemToVest|cancelSimpleTaskDestination|canFire|canMove|canSlingLoad|canStand|canSuspend|canTriggerDynamicSimulation|canUnloadInCombat|canVehicleCargo|captive|captiveNum|cbChecked|cbSetChecked|ceil|channelEnabled|cheatsEnabled|checkAIFeature|checkVisibility|civilian|className|clear3DENAttribute|clear3DENInventory|clearAllItemsFromBackpack|clearBackpackCargo|clearBackpackCargoGlobal|clearForcesRTD|clearGroupIcons|clearItemCargo|clearItemCargoGlobal|clearItemPool|clearMagazineCargo|clearMagazineCargoGlobal|clearMagazinePool|clearOverlay|clearRadio|clearVehicleInit|clearWeaponCargo|clearWeaponCargoGlobal|clearWeaponPool|clientOwner|closeDialog|closeDisplay|closeOverlay|collapseObjectTree|collect3DENHistory|collectiveRTD|combatMode|commandArtilleryFire|commandChat|commander|commandFire|commandFollow|commandFSM|commandGetOut|commandingMenu|commandMove|commandRadio|commandStop|commandSuppressiveFire|commandTarget|commandWatch|comment|commitOverlay|compile|compileFinal|completedFSM|composeText|configClasses|configFile|configHierarchy|configName|configNull|configProperties|configSourceAddonList|configSourceMod|configSourceModList|confirmSensorTarget|connectTerminalToUAV|controlNull|controlsGroupCtrl|copyFromClipboard|copyToClipboard|copyWaypoints|cos|count|countEnemy|countFriendly|countSide|countType|countUnknown|create3DENComposition|create3DENEntity|createAgent|createCenter|createDialog|createDiaryLink|createDiaryRecord|createDiarySubject|createDisplay|createGearDialog|createGroup|createGuardedPoint|createLocation|createMarker|createMarkerLocal|createMenu|createMine|createMissionDisplay|createMPCampaignDisplay|createSimpleObject|createSimpleTask|createSite|createSoundSource|createTask|createTeam|createTrigger|createUnit|createVehicle|createVehicleCrew|createVehicleLocal|crew|ctAddHeader|ctAddRow|ctClear|ctCurSel|ctData|ctFindHeaderRows|ctFindRowHeader|ctHeaderControls|ctHeaderCount|ctRemoveHeaders|ctRemoveRows|ctrlActivate|ctrlAddEventHandler|ctrlAngle|ctrlAutoScrollDelay|ctrlAutoScrollRewind|ctrlAutoScrollSpeed|ctrlChecked|ctrlClassName|ctrlCommit|ctrlCommitted|ctrlCreate|ctrlDelete|ctrlEnable|ctrlEnabled|ctrlFade|ctrlHTMLLoaded|ctrlIDC|ctrlIDD|ctrlMapAnimAdd|ctrlMapAnimClear|ctrlMapAnimCommit|ctrlMapAnimDone|ctrlMapCursor|ctrlMapMouseOver|ctrlMapScale|ctrlMapScreenToWorld|ctrlMapWorldToScreen|ctrlModel|ctrlModelDirAndUp|ctrlModelScale|ctrlParent|ctrlParentControlsGroup|ctrlPosition|ctrlRemoveAllEventHandlers|ctrlRemoveEventHandler|ctrlScale|ctrlSetActiveColor|ctrlSetAngle|ctrlSetAutoScrollDelay|ctrlSetAutoScrollRewind|ctrlSetAutoScrollSpeed|ctrlSetBackgroundColor|ctrlSetChecked|ctrlSetDisabledColor|ctrlSetEventHandler|ctrlSetFade|ctrlSetFocus|ctrlSetFont|ctrlSetFontH1|ctrlSetFontH1B|ctrlSetFontH2|ctrlSetFontH2B|ctrlSetFontH3|ctrlSetFontH3B|ctrlSetFontH4|ctrlSetFontH4B|ctrlSetFontH5|ctrlSetFontH5B|ctrlSetFontH6|ctrlSetFontH6B|ctrlSetFontHeight|ctrlSetFontHeightH1|ctrlSetFontHeightH2|ctrlSetFontHeightH3|ctrlSetFontHeightH4|ctrlSetFontHeightH5|ctrlSetFontHeightH6|ctrlSetFontHeightSecondary|ctrlSetFontP|ctrlSetFontPB|ctrlSetFontSecondary|ctrlSetForegroundColor|ctrlSetModel|ctrlSetModelDirAndUp|ctrlSetModelScale|ctrlSetPixelPrecision|ctrlSetPosition|ctrlSetScale|ctrlSetStructuredText|ctrlSetText|ctrlSetTextColor|ctrlSetTextColorSecondary|ctrlSetTextSecondary|ctrlSetTooltip|ctrlSetTooltipColorBox|ctrlSetTooltipColorShade|ctrlSetTooltipColorText|ctrlShow|ctrlShown|ctrlText|ctrlTextHeight|ctrlTextSecondary|ctrlTextWidth|ctrlType|ctrlVisible|ctRowControls|ctRowCount|ctSetCurSel|ctSetData|ctSetHeaderTemplate|ctSetRowTemplate|ctSetValue|ctValue|curatorAddons|curatorCamera|curatorCameraArea|curatorCameraAreaCeiling|curatorCoef|curatorEditableObjects|curatorEditingArea|curatorEditingAreaType|curatorMouseOver|curatorPoints|curatorRegisteredObjects|curatorSelected|curatorWaypointCost|current3DENOperation|currentChannel|currentCommand|currentMagazine|currentMagazineDetail|currentMagazineDetailTurret|currentMagazineTurret|currentMuzzle|currentNamespace|currentTask|currentTasks|currentThrowable|currentVisionMode|currentWaypoint|currentWeapon|currentWeaponMode|currentWeaponTurret|currentZeroing|cursorObject|cursorTarget|customChat|customRadio|cutFadeOut|cutObj|cutRsc|cutText|damage|date|dateToNumber|daytime|deActivateKey|debriefingText|debugFSM|debugLog|deg|delete3DENEntities|deleteAt|deleteCenter|deleteCollection|deleteEditorObject|deleteGroup|deleteGroupWhenEmpty|deleteIdentity|deleteLocation|deleteMarker|deleteMarkerLocal|deleteRange|deleteResources|deleteSite|deleteStatus|deleteTeam|deleteVehicle|deleteVehicleCrew|deleteWaypoint|detach|detectedMines|diag_activeMissionFSMs|diag_activeScripts|diag_activeSQFScripts|diag_activeSQSScripts|diag_captureFrame|diag_captureFrameToFile|diag_captureSlowFrame|diag_codePerformance|diag_drawMode|diag_dynamicSimulationEnd|diag_enable|diag_enabled|diag_fps|diag_fpsMin|diag_frameNo|diag_lightNewLoad|diag_list|diag_log|diag_logSlowFrame|diag_mergeConfigFile|diag_recordTurretLimits|diag_setLightNew|diag_tickTime|diag_toggle|dialog|diarySubjectExists|didJIP|didJIPOwner|difficulty|difficultyEnabled|difficultyEnabledRTD|difficultyOption|direction|directSay|disableAI|disableCollisionWith|disableConversation|disableDebriefingStats|disableMapIndicators|disableNVGEquipment|disableRemoteSensors|disableSerialization|disableTIEquipment|disableUAVConnectability|disableUserInput|displayAddEventHandler|displayCtrl|displayNull|displayParent|displayRemoveAllEventHandlers|displayRemoveEventHandler|displaySetEventHandler|dissolveTeam|distance|distance2D|distanceSqr|distributionRegion|do3DENAction|doArtilleryFire|doFire|doFollow|doFSM|doGetOut|doMove|doorPhase|doStop|doSuppressiveFire|doTarget|doWatch|drawArrow|drawEllipse|drawIcon|drawIcon3D|drawLine|drawLine3D|drawLink|drawLocation|drawPolygon|drawRectangle|drawTriangle|driver|drop|dynamicSimulationDistance|dynamicSimulationDistanceCoef|dynamicSimulationEnabled|dynamicSimulationSystemEnabled|east|edit3DENMissionAttributes|editObject|editorSetEventHandler|effectiveCommander|emptyPositions|enableAI|enableAIFeature|enableAimPrecision|enableAttack|enableAudioFeature|enableAutoStartUpRTD|enableAutoTrimRTD|enableCamShake|enableCaustics|enableChannel|enableCollisionWith|enableCopilot|enableDebriefingStats|enableDiagLegend|enableDynamicSimulation|enableDynamicSimulationSystem|enableEndDialog|enableEngineArtillery|enableEnvironment|enableFatigue|enableGunLights|enableInfoPanelComponent|enableIRLasers|enableMimics|enablePersonTurret|enableRadio|enableReload|enableRopeAttach|enableSatNormalOnDetail|enableSaving|enableSentences|enableSimulation|enableSimulationGlobal|enableStamina|enableStressDamage|enableTeamSwitch|enableTraffic|enableUAVConnectability|enableUAVWaypoints|enableVehicleCargo|enableVehicleSensor|enableWeaponDisassembly|endl|endLoadingScreen|endMission|engineOn|enginesIsOnRTD|enginesPowerRTD|enginesRpmRTD|enginesTorqueRTD|entities|environmentEnabled|estimatedEndServerTime|estimatedTimeLeft|evalObjectArgument|everyBackpack|everyContainer|exec|execEditorScript|exp|expectedDestination|exportJIPMessages|eyeDirection|eyePos|face|faction|fadeMusic|fadeRadio|fadeSound|fadeSpeech|failMission|fillWeaponsFromPool|find|findCover|findDisplay|findEditorObject|findEmptyPosition|findEmptyPositionReady|findIf|findNearestEnemy|finishMissionInit|finite|fire|fireAtTarget|firstBackpack|flag|flagAnimationPhase|flagOwner|flagSide|flagTexture|fleeing|floor|flyInHeight|flyInHeightASL|fog|fogForecast|fogParams|forceAddUniform|forceAtPositionRTD|forcedMap|forceEnd|forceFlagTexture|forceFollowRoad|forceGeneratorRTD|forceMap|forceRespawn|forceSpeed|forceWalk|forceWeaponFire|forceWeatherChange|forgetTarget|format|formation|formationDirection|formationLeader|formationMembers|formationPosition|formationTask|formatText|formLeader|freeLook|fromEditor|fuel|fullCrew|gearIDCAmmoCount|gearSlotAmmoCount|gearSlotData|get3DENActionState|get3DENAttribute|get3DENCamera|get3DENConnections|get3DENEntity|get3DENEntityID|get3DENGrid|get3DENIconsVisible|get3DENLayerEntities|get3DENLinesVisible|get3DENMissionAttribute|get3DENMouseOver|get3DENSelected|getAimingCoef|getAllEnvSoundControllers|getAllHitPointsDamage|getAllOwnedMines|getAllSoundControllers|getAmmoCargo|getAnimAimPrecision|getAnimSpeedCoef|getArray|getArtilleryAmmo|getArtilleryComputerSettings|getArtilleryETA|getAssignedCuratorLogic|getAssignedCuratorUnit|getBackpackCargo|getBleedingRemaining|getBurningValue|getCameraViewDirection|getCargoIndex|getCenterOfMass|getClientState|getClientStateNumber|getCompatiblePylonMagazines|getConnectedUAV|getContainerMaxLoad|getCursorObjectParams|getCustomAimCoef|getDammage|getDescription|getDir|getDirVisual|getDLCAssetsUsage|getDLCAssetsUsageByName|getDLCs|getDLCUsageTime|getEditorCamera|getEditorMode|getEditorObjectScope|getElevationOffset|getEngineTargetRpmRTD|getEnvSoundController|getFatigue|getFieldManualStartPage|getForcedFlagTexture|getFriend|getFSMVariable|getFuelCargo|getGroupIcon|getGroupIconParams|getGroupIcons|getHideFrom|getHit|getHitIndex|getHitPointDamage|getItemCargo|getMagazineCargo|getMarkerColor|getMarkerPos|getMarkerSize|getMarkerType|getMass|getMissionConfig|getMissionConfigValue|getMissionDLCs|getMissionLayerEntities|getMissionLayers|getModelInfo|getMousePosition|getMusicPlayedTime|getNumber|getObjectArgument|getObjectChildren|getObjectDLC|getObjectMaterials|getObjectProxy|getObjectTextures|getObjectType|getObjectViewDistance|getOxygenRemaining|getPersonUsedDLCs|getPilotCameraDirection|getPilotCameraPosition|getPilotCameraRotation|getPilotCameraTarget|getPlateNumber|getPlayerChannel|getPlayerScores|getPlayerUID|getPlayerUIDOld|getPos|getPosASL|getPosASLVisual|getPosASLW|getPosATL|getPosATLVisual|getPosVisual|getPosWorld|getPylonMagazines|getRelDir|getRelPos|getRemoteSensorsDisabled|getRepairCargo|getResolution|getRotorBrakeRTD|getShadowDistance|getShotParents|getSlingLoad|getSoundController|getSoundControllerResult|getSpeed|getStamina|getStatValue|getSuppression|getTerrainGrid|getTerrainHeightASL|getText|getTotalDLCUsageTime|getTrimOffsetRTD|getUnitLoadout|getUnitTrait|getUserMFDText|getUserMFDValue|getVariable|getVehicleCargo|getWeaponCargo|getWeaponSway|getWingsOrientationRTD|getWingsPositionRTD|getWPPos|glanceAt|globalChat|globalRadio|goggles|group|groupChat|groupFromNetId|groupIconSelectable|groupIconsVisible|groupId|groupOwner|groupRadio|groupSelectedUnits|groupSelectUnit|grpNull|gunner|gusts|halt|handgunItems|handgunMagazine|handgunWeapon|handsHit|hasInterface|hasPilotCamera|hasWeapon|hcAllGroups|hcGroupParams|hcLeader|hcRemoveAllGroups|hcRemoveGroup|hcSelected|hcSelectGroup|hcSetGroup|hcShowBar|hcShownBar|headgear|hideBody|hideObject|hideObjectGlobal|hideSelection|hint|hintC|hintCadet|hintSilent|hmd|hostMission|htmlLoad|HUDMovementLevels|humidity|image|importAllGroups|importance|in|inArea|inAreaArray|incapacitatedState|independent|inflame|inflamed|infoPanel|infoPanelComponentEnabled|infoPanelComponents|infoPanels|inGameUISetEventHandler|inheritsFrom|initAmbientLife|inPolygon|inputAction|inRangeOfArtillery|insertEditorObject|intersect|is3DEN|is3DENMultiplayer|isAbleToBreathe|isAgent|isAimPrecisionEnabled|isArray|isAutoHoverOn|isAutonomous|isAutoStartUpEnabledRTD|isAutotest|isAutoTrimOnRTD|isBleeding|isBurning|isClass|isCollisionLightOn|isCopilotEnabled|isDamageAllowed|isDedicated|isDLCAvailable|isEngineOn|isEqualTo|isEqualType|isEqualTypeAll|isEqualTypeAny|isEqualTypeArray|isEqualTypeParams|isFilePatchingEnabled|isFlashlightOn|isFlatEmpty|isForcedWalk|isFormationLeader|isGroupDeletedWhenEmpty|isHidden|isInRemainsCollector|isInstructorFigureEnabled|isIRLaserOn|isKeyActive|isKindOf|isLaserOn|isLightOn|isLocalized|isManualFire|isMarkedForCollection|isMultiplayer|isMultiplayerSolo|isNil|isNull|isNumber|isObjectHidden|isObjectRTD|isOnRoad|isPipEnabled|isPlayer|isRealTime|isRemoteExecuted|isRemoteExecutedJIP|isServer|isShowing3DIcons|isSimpleObject|isSprintAllowed|isStaminaEnabled|isSteamMission|isStreamFriendlyUIEnabled|isStressDamageEnabled|isText|isTouchingGround|isTurnedOut|isTutHintsEnabled|isUAVConnectable|isUAVConnected|isUIContext|isUniformAllowed|isVehicleCargo|isVehicleRadarOn|isVehicleSensorEnabled|isWalking|isWeaponDeployed|isWeaponRested|itemCargo|items|itemsWithMagazines|join|joinAs|joinAsSilent|joinSilent|joinString|kbAddDatabase|kbAddDatabaseTargets|kbAddTopic|kbHasTopic|kbReact|kbRemoveTopic|kbTell|kbWasSaid|keyImage|keyName|knowsAbout|land|landAt|landResult|language|laserTarget|lbAdd|lbClear|lbColor|lbColorRight|lbCurSel|lbData|lbDelete|lbIsSelected|lbPicture|lbPictureRight|lbSelection|lbSetColor|lbSetColorRight|lbSetCurSel|lbSetData|lbSetPicture|lbSetPictureColor|lbSetPictureColorDisabled|lbSetPictureColorSelected|lbSetPictureRight|lbSetPictureRightColor|lbSetPictureRightColorDisabled|lbSetPictureRightColorSelected|lbSetSelectColor|lbSetSelectColorRight|lbSetSelected|lbSetText|lbSetTextRight|lbSetTooltip|lbSetValue|lbSize|lbSort|lbSortByValue|lbText|lbTextRight|lbValue|leader|leaderboardDeInit|leaderboardGetRows|leaderboardInit|leaderboardRequestRowsFriends|leaderboardRequestRowsGlobal|leaderboardRequestRowsGlobalAroundUser|leaderboardsRequestUploadScore|leaderboardsRequestUploadScoreKeepBest|leaderboardState|leaveVehicle|libraryCredits|libraryDisclaimers|lifeState|lightAttachObject|lightDetachObject|lightIsOn|lightnings|limitSpeed|linearConversion|lineBreak|lineIntersects|lineIntersectsObjs|lineIntersectsSurfaces|lineIntersectsWith|linkItem|list|listObjects|listRemoteTargets|listVehicleSensors|ln|lnbAddArray|lnbAddColumn|lnbAddRow|lnbClear|lnbColor|lnbColorRight|lnbCurSelRow|lnbData|lnbDeleteColumn|lnbDeleteRow|lnbGetColumnsPosition|lnbPicture|lnbPictureRight|lnbSetColor|lnbSetColorRight|lnbSetColumnsPos|lnbSetCurSelRow|lnbSetData|lnbSetPicture|lnbSetPictureColor|lnbSetPictureColorRight|lnbSetPictureColorSelected|lnbSetPictureColorSelectedRight|lnbSetPictureRight|lnbSetText|lnbSetTextRight|lnbSetValue|lnbSize|lnbSort|lnbSortByValue|lnbText|lnbTextRight|lnbValue|load|loadAbs|loadBackpack|loadFile|loadGame|loadIdentity|loadMagazine|loadOverlay|loadStatus|loadUniform|loadVest|local|localize|locationNull|locationPosition|lock|lockCameraTo|lockCargo|lockDriver|locked|lockedCargo|lockedDriver|lockedTurret|lockIdentity|lockTurret|lockWP|log|logEntities|logNetwork|logNetworkTerminate|lookAt|lookAtPos|magazineCargo|magazines|magazinesAllTurrets|magazinesAmmo|magazinesAmmoCargo|magazinesAmmoFull|magazinesDetail|magazinesDetailBackpack|magazinesDetailUniform|magazinesDetailVest|magazinesTurret|magazineTurretAmmo|mapAnimAdd|mapAnimClear|mapAnimCommit|mapAnimDone|mapCenterOnCamera|mapGridPosition|markAsFinishedOnSteam|markerAlpha|markerBrush|markerColor|markerDir|markerPos|markerShape|markerSize|markerText|markerType|max|members|menuAction|menuAdd|menuChecked|menuClear|menuCollapse|menuData|menuDelete|menuEnable|menuEnabled|menuExpand|menuHover|menuPicture|menuSetAction|menuSetCheck|menuSetData|menuSetPicture|menuSetValue|menuShortcut|menuShortcutText|menuSize|menuSort|menuText|menuURL|menuValue|min|mineActive|mineDetectedBy|missionConfigFile|missionDifficulty|missionName|missionNamespace|missionStart|missionVersion|modelToWorld|modelToWorldVisual|modelToWorldVisualWorld|modelToWorldWorld|modParams|moonIntensity|moonPhase|morale|move|move3DENCamera|moveInAny|moveInCargo|moveInCommander|moveInDriver|moveInGunner|moveInTurret|moveObjectToEnd|moveOut|moveTime|moveTo|moveToCompleted|moveToFailed|musicVolume|name|nameSound|nearEntities|nearestBuilding|nearestLocation|nearestLocations|nearestLocationWithDubbing|nearestObject|nearestObjects|nearestTerrainObjects|nearObjects|nearObjectsReady|nearRoads|nearSupplies|nearTargets|needReload|netId|netObjNull|newOverlay|nextMenuItemIndex|nextWeatherChange|nMenuItems|numberOfEnginesRTD|numberToDate|objectCurators|objectFromNetId|objectParent|objNull|objStatus|onBriefingGear|onBriefingGroup|onBriefingNotes|onBriefingPlan|onBriefingTeamSwitch|onCommandModeChanged|onDoubleClick|onEachFrame|onGroupIconClick|onGroupIconOverEnter|onGroupIconOverLeave|onHCGroupSelectionChanged|onMapSingleClick|onPlayerConnected|onPlayerDisconnected|onPreloadFinished|onPreloadStarted|onShowNewObject|onTeamSwitch|openCuratorInterface|openDLCPage|openDSInterface|openMap|openSteamApp|openYoutubeVideo|opfor|orderGetIn|overcast|overcastForecast|owner|param|params|parseNumber|parseSimpleArray|parseText|parsingNamespace|particlesQuality|pi|pickWeaponPool|pitch|pixelGrid|pixelGridBase|pixelGridNoUIScale|pixelH|pixelW|playableSlotsNumber|playableUnits|playAction|playActionNow|player|playerRespawnTime|playerSide|playersNumber|playGesture|playMission|playMove|playMoveNow|playMusic|playScriptedMission|playSound|playSound3D|position|positionCameraToWorld|posScreenToWorld|posWorldToScreen|ppEffectAdjust|ppEffectCommit|ppEffectCommitted|ppEffectCreate|ppEffectDestroy|ppEffectEnable|ppEffectEnabled|ppEffectForceInNVG|precision|preloadCamera|preloadObject|preloadSound|preloadTitleObj|preloadTitleRsc|primaryWeapon|primaryWeaponItems|primaryWeaponMagazine|priority|processDiaryLink|processInitCommands|productVersion|profileName|profileNamespace|profileNameSteam|progressLoadingScreen|progressPosition|progressSetPosition|publicVariable|publicVariableClient|publicVariableServer|pushBack|pushBackUnique|putWeaponPool|queryItemsPool|queryMagazinePool|queryWeaponPool|rad|radioChannelAdd|radioChannelCreate|radioChannelRemove|radioChannelSetCallSign|radioChannelSetLabel|radioVolume|rain|rainbow|random|rank|rankId|rating|rectangular|registeredTasks|registerTask|reload|reloadEnabled|remoteControl|remoteExec|remoteExecCall|remoteExecutedOwner|remove3DENConnection|remove3DENEventHandler|remove3DENLayer|removeAction|removeAll3DENEventHandlers|removeAllActions|removeAllAssignedItems|removeAllContainers|removeAllCuratorAddons|removeAllCuratorCameraAreas|removeAllCuratorEditingAreas|removeAllEventHandlers|removeAllHandgunItems|removeAllItems|removeAllItemsWithMagazines|removeAllMissionEventHandlers|removeAllMPEventHandlers|removeAllMusicEventHandlers|removeAllOwnedMines|removeAllPrimaryWeaponItems|removeAllWeapons|removeBackpack|removeBackpackGlobal|removeCuratorAddons|removeCuratorCameraArea|removeCuratorEditableObjects|removeCuratorEditingArea|removeDrawIcon|removeDrawLinks|removeEventHandler|removeFromRemainsCollector|removeGoggles|removeGroupIcon|removeHandgunItem|removeHeadgear|removeItem|removeItemFromBackpack|removeItemFromUniform|removeItemFromVest|removeItems|removeMagazine|removeMagazineGlobal|removeMagazines|removeMagazinesTurret|removeMagazineTurret|removeMenuItem|removeMissionEventHandler|removeMPEventHandler|removeMusicEventHandler|removeOwnedMine|removePrimaryWeaponItem|removeSecondaryWeaponItem|removeSimpleTask|removeSwitchableUnit|removeTeamMember|removeUniform|removeVest|removeWeapon|removeWeaponAttachmentCargo|removeWeaponCargo|removeWeaponGlobal|removeWeaponTurret|reportRemoteTarget|requiredVersion|resetCamShake|resetSubgroupDirection|resistance|resize|resources|respawnVehicle|restartEditorCamera|reveal|revealMine|reverse|reversedMouseY|roadAt|roadsConnectedTo|roleDescription|ropeAttachedObjects|ropeAttachedTo|ropeAttachEnabled|ropeAttachTo|ropeCreate|ropeCut|ropeDestroy|ropeDetach|ropeEndPosition|ropeLength|ropes|ropeUnwind|ropeUnwound|rotorsForcesRTD|rotorsRpmRTD|round|runInitScript|safeZoneH|safeZoneW|safeZoneWAbs|safeZoneX|safeZoneXAbs|safeZoneY|save3DENInventory|saveGame|saveIdentity|saveJoysticks|saveOverlay|saveProfileNamespace|saveStatus|saveVar|savingEnabled|say|say2D|say3D|score|scoreSide|screenshot|screenToWorld|scriptDone|scriptName|scriptNull|scudState|secondaryWeapon|secondaryWeaponItems|secondaryWeaponMagazine|select|selectBestPlaces|selectDiarySubject|selectedEditorObjects|selectEditorObject|selectionNames|selectionPosition|selectLeader|selectMax|selectMin|selectNoPlayer|selectPlayer|selectRandom|selectRandomWeighted|selectWeapon|selectWeaponTurret|sendAUMessage|sendSimpleCommand|sendTask|sendTaskResult|sendUDPMessage|serverCommand|serverCommandAvailable|serverCommandExecutable|serverName|serverTime|set|set3DENAttribute|set3DENAttributes|set3DENGrid|set3DENIconsVisible|set3DENLayer|set3DENLinesVisible|set3DENLogicType|set3DENMissionAttribute|set3DENMissionAttributes|set3DENModelsVisible|set3DENObjectType|set3DENSelected|setAccTime|setActualCollectiveRTD|setAirplaneThrottle|setAirportSide|setAmmo|setAmmoCargo|setAmmoOnPylon|setAnimSpeedCoef|setAperture|setApertureNew|setArmoryPoints|setAttributes|setAutonomous|setBehaviour|setBleedingRemaining|setBrakesRTD|setCameraInterest|setCamShakeDefParams|setCamShakeParams|setCamUseTI|setCaptive|setCenterOfMass|setCollisionLight|setCombatMode|setCompassOscillation|setConvoySeparation|setCuratorCameraAreaCeiling|setCuratorCoef|setCuratorEditingAreaType|setCuratorWaypointCost|setCurrentChannel|setCurrentTask|setCurrentWaypoint|setCustomAimCoef|setCustomWeightRTD|setDamage|setDammage|setDate|setDebriefingText|setDefaultCamera|setDestination|setDetailMapBlendPars|setDir|setDirection|setDrawIcon|setDriveOnPath|setDropInterval|setDynamicSimulationDistance|setDynamicSimulationDistanceCoef|setEditorMode|setEditorObjectScope|setEffectCondition|setEngineRpmRTD|setFace|setFaceAnimation|setFatigue|setFeatureType|setFlagAnimationPhase|setFlagOwner|setFlagSide|setFlagTexture|setFog|setForceGeneratorRTD|setFormation|setFormationTask|setFormDir|setFriend|setFromEditor|setFSMVariable|setFuel|setFuelCargo|setGroupIcon|setGroupIconParams|setGroupIconsSelectable|setGroupIconsVisible|setGroupId|setGroupIdGlobal|setGroupOwner|setGusts|setHideBehind|setHit|setHitIndex|setHitPointDamage|setHorizonParallaxCoef|setHUDMovementLevels|setIdentity|setImportance|setInfoPanel|setLeader|setLightAmbient|setLightAttenuation|setLightBrightness|setLightColor|setLightDayLight|setLightFlareMaxDistance|setLightFlareSize|setLightIntensity|setLightnings|setLightUseFlare|setLocalWindParams|setMagazineTurretAmmo|setMarkerAlpha|setMarkerAlphaLocal|setMarkerBrush|setMarkerBrushLocal|setMarkerColor|setMarkerColorLocal|setMarkerDir|setMarkerDirLocal|setMarkerPos|setMarkerPosLocal|setMarkerShape|setMarkerShapeLocal|setMarkerSize|setMarkerSizeLocal|setMarkerText|setMarkerTextLocal|setMarkerType|setMarkerTypeLocal|setMass|setMimic|setMousePosition|setMusicEffect|setMusicEventHandler|setName|setNameSound|setObjectArguments|setObjectMaterial|setObjectMaterialGlobal|setObjectProxy|setObjectTexture|setObjectTextureGlobal|setObjectViewDistance|setOvercast|setOwner|setOxygenRemaining|setParticleCircle|setParticleClass|setParticleFire|setParticleParams|setParticleRandom|setPilotCameraDirection|setPilotCameraRotation|setPilotCameraTarget|setPilotLight|setPiPEffect|setPitch|setPlateNumber|setPlayable|setPlayerRespawnTime|setPos|setPosASL|setPosASL2|setPosASLW|setPosATL|setPosition|setPosWorld|setPylonLoadOut|setPylonsPriority|setRadioMsg|setRain|setRainbow|setRandomLip|setRank|setRectangular|setRepairCargo|setRotorBrakeRTD|setShadowDistance|setShotParents|setSide|setSimpleTaskAlwaysVisible|setSimpleTaskCustomData|setSimpleTaskDescription|setSimpleTaskDestination|setSimpleTaskTarget|setSimpleTaskType|setSimulWeatherLayers|setSize|setSkill|setSlingLoad|setSoundEffect|setSpeaker|setSpeech|setSpeedMode|setStamina|setStaminaScheme|setStatValue|setSuppression|setSystemOfUnits|setTargetAge|setTaskMarkerOffset|setTaskResult|setTaskState|setTerrainGrid|setText|setTimeMultiplier|setTitleEffect|setToneMapping|setToneMappingParams|setTrafficDensity|setTrafficDistance|setTrafficGap|setTrafficSpeed|setTriggerActivation|setTriggerArea|setTriggerStatements|setTriggerText|setTriggerTimeout|setTriggerType|setType|setUnconscious|setUnitAbility|setUnitLoadout|setUnitPos|setUnitPosWeak|setUnitRank|setUnitRecoilCoefficient|setUnitTrait|setUnloadInCombat|setUserActionText|setUserMFDText|setUserMFDValue|setVariable|setVectorDir|setVectorDirAndUp|setVectorUp|setVehicleAmmo|setVehicleAmmoDef|setVehicleArmor|setVehicleCargo|setVehicleId|setVehicleInit|setVehicleLock|setVehiclePosition|setVehicleRadar|setVehicleReceiveRemoteTargets|setVehicleReportOwnPosition|setVehicleReportRemoteTargets|setVehicleTIPars|setVehicleVarName|setVelocity|setVelocityModelSpace|setVelocityTransformation|setViewDistance|setVisibleIfTreeCollapsed|setWantedRpmRTD|setWaves|setWaypointBehaviour|setWaypointCombatMode|setWaypointCompletionRadius|setWaypointDescription|setWaypointForceBehaviour|setWaypointFormation|setWaypointHousePosition|setWaypointLoiterRadius|setWaypointLoiterType|setWaypointName|setWaypointPosition|setWaypointScript|setWaypointSpeed|setWaypointStatements|setWaypointTimeout|setWaypointType|setWaypointVisible|setWeaponReloadingTime|setWind|setWindDir|setWindForce|setWindStr|setWingForceScaleRTD|setWPPos|show3DIcons|showChat|showCinemaBorder|showCommandingMenu|showCompass|showCuratorCompass|showGPS|showHUD|showLegend|showMap|shownArtilleryComputer|shownChat|shownCompass|shownCuratorCompass|showNewEditorObject|shownGPS|shownHUD|shownMap|shownPad|shownRadio|shownScoretable|shownUAVFeed|shownWarrant|shownWatch|showPad|showRadio|showScoretable|showSubtitles|showUAVFeed|showWarrant|showWatch|showWaypoint|showWaypoints|side|sideAmbientLife|sideChat|sideEmpty|sideEnemy|sideFriendly|sideLogic|sideRadio|sideUnknown|simpleTasks|simulationEnabled|simulCloudDensity|simulCloudOcclusion|simulInClouds|simulWeatherSync|sin|size|sizeOf|skill|skillFinal|skipTime|sleep|sliderPosition|sliderRange|sliderSetPosition|sliderSetRange|sliderSetSpeed|sliderSpeed|slingLoadAssistantShown|soldierMagazines|someAmmo|sort|soundVolume|speaker|speed|speedMode|splitString|sqrt|squadParams|stance|startLoadingScreen|stop|stopEngineRTD|stopped|str|sunOrMoon|supportInfo|suppressFor|surfaceIsWater|surfaceNormal|surfaceType|swimInDepth|switchableUnits|switchAction|switchCamera|switchGesture|switchLight|switchMove|synchronizedObjects|synchronizedTriggers|synchronizedWaypoints|synchronizeObjectsAdd|synchronizeObjectsRemove|synchronizeTrigger|synchronizeWaypoint|systemChat|systemOfUnits|tan|targetKnowledge|targets|targetsAggregate|targetsQuery|taskAlwaysVisible|taskChildren|taskCompleted|taskCustomData|taskDescription|taskDestination|taskHint|taskMarkerOffset|taskNull|taskParent|taskResult|taskState|taskType|teamMember|teamMemberNull|teamName|teams|teamSwitch|teamSwitchEnabled|teamType|terminate|terrainIntersect|terrainIntersectASL|terrainIntersectAtASL|text|textLog|textLogFormat|tg|time|timeMultiplier|titleCut|titleFadeOut|titleObj|titleRsc|titleText|toArray|toFixed|toLower|toString|toUpper|triggerActivated|triggerActivation|triggerArea|triggerAttachedVehicle|triggerAttachObject|triggerAttachVehicle|triggerDynamicSimulation|triggerStatements|triggerText|triggerTimeout|triggerTimeoutCurrent|triggerType|turretLocal|turretOwner|turretUnit|tvAdd|tvClear|tvCollapse|tvCollapseAll|tvCount|tvCurSel|tvData|tvDelete|tvExpand|tvExpandAll|tvPicture|tvPictureRight|tvSetColor|tvSetCurSel|tvSetData|tvSetPicture|tvSetPictureColor|tvSetPictureColorDisabled|tvSetPictureColorSelected|tvSetPictureRight|tvSetPictureRightColor|tvSetPictureRightColorDisabled|tvSetPictureRightColorSelected|tvSetSelectColor|tvSetText|tvSetTooltip|tvSetValue|tvSort|tvSortByValue|tvText|tvTooltip|tvValue|type|typeName|typeOf|UAVControl|uiNamespace|uiSleep|unassignCurator|unassignItem|unassignTeam|unassignVehicle|underwater|uniform|uniformContainer|uniformItems|uniformMagazines|unitAddons|unitAimPosition|unitAimPositionVisual|unitBackpack|unitIsUAV|unitPos|unitReady|unitRecoilCoefficient|units|unitsBelowHeight|unlinkItem|unlockAchievement|unregisterTask|updateDrawIcon|updateMenuItem|updateObjectTree|useAIOperMapObstructionTest|useAISteeringComponent|useAudioTimeForMoves|userInputDisabled|vectorAdd|vectorCos|vectorCrossProduct|vectorDiff|vectorDir|vectorDirVisual|vectorDistance|vectorDistanceSqr|vectorDotProduct|vectorFromTo|vectorMagnitude|vectorMagnitudeSqr|vectorModelToWorld|vectorModelToWorldVisual|vectorMultiply|vectorNormalized|vectorUp|vectorUpVisual|vectorWorldToModel|vectorWorldToModelVisual|vehicle|vehicleCargoEnabled|vehicleChat|vehicleRadio|vehicleReceiveRemoteTargets|vehicleReportOwnPosition|vehicleReportRemoteTargets|vehicles|vehicleVarName|velocity|velocityModelSpace|verifySignature|vest|vestContainer|vestItems|vestMagazines|viewDistance|visibleCompass|visibleGPS|visibleMap|visiblePosition|visiblePositionASL|visibleScoretable|visibleWatch|waitUntil|waves|waypointAttachedObject|waypointAttachedVehicle|waypointAttachObject|waypointAttachVehicle|waypointBehaviour|waypointCombatMode|waypointCompletionRadius|waypointDescription|waypointForceBehaviour|waypointFormation|waypointHousePosition|waypointLoiterRadius|waypointLoiterType|waypointName|waypointPosition|waypoints|waypointScript|waypointsEnabledUAV|waypointShow|waypointSpeed|waypointStatements|waypointTimeout|waypointTimeoutCurrent|waypointType|waypointVisible|weaponAccessories|weaponAccessoriesCargo|weaponCargo|weaponDirection|weaponInertia|weaponLowered|weapons|weaponsItems|weaponsItemsCargo|weaponState|weaponsTurret|weightRTD|west|WFSideText|wind|windDir|windRTD|windStr|wingsForcesRTD|worldName|worldSize|worldToModel|worldToModelVisual|worldToScreen)\b/i,
      number: /(?:\$|\b0x)[\da-f]+\b|(?:\B\.\d+|\b\d+(?:\.\d+)?)(?:e[+-]?\d+)?\b/i,
      operator: /##|>>|&&|\|\||[!=<>]=?|[-+*/%#^]|\b(?:and|mod|not|or)\b/i,
      "magic-variable": {
        pattern: /\b(?:this|thisList|thisTrigger|_exception|_fnc_scriptName|_fnc_scriptNameParent|_forEachIndex|_this|_thisEventHandler|_thisFSM|_thisScript|_x)\b/i,
        alias: "keyword"
      },
      constant: /\bDIK(?:_[a-z\d]+)+\b/i
    });
    Prism2.languages.insertBefore("sqf", "string", {
      macro: {
        pattern: /(^[ \t]*)#[a-z](?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
        lookbehind: true,
        greedy: true,
        alias: "property",
        inside: {
          directive: {
            pattern: /#[a-z]+\b/i,
            alias: "keyword"
          },
          comment: Prism2.languages.sqf.comment
        }
      }
    });
    delete Prism2.languages.sqf["class-name"];
  }
  return sqf_1;
}
var squirrel_1;
var hasRequiredSquirrel;
function requireSquirrel() {
  if (hasRequiredSquirrel) return squirrel_1;
  hasRequiredSquirrel = 1;
  squirrel_1 = squirrel;
  squirrel.displayName = "squirrel";
  squirrel.aliases = [];
  function squirrel(Prism2) {
    Prism2.languages.squirrel = Prism2.languages.extend("clike", {
      comment: [
        Prism2.languages.clike["comment"][0],
        {
          pattern: /(^|[^\\:])(?:\/\/|#).*/,
          lookbehind: true,
          greedy: true
        }
      ],
      string: {
        pattern: /(^|[^\\"'@])(?:@"(?:[^"]|"")*"(?!")|"(?:[^\\\r\n"]|\\.)*")/,
        lookbehind: true,
        greedy: true
      },
      "class-name": {
        pattern: /(\b(?:class|enum|extends|instanceof)\s+)\w+(?:\.\w+)*/,
        lookbehind: true,
        inside: {
          punctuation: /\./
        }
      },
      keyword: /\b(?:__FILE__|__LINE__|base|break|case|catch|class|clone|const|constructor|continue|default|delete|else|enum|extends|for|foreach|function|if|in|instanceof|local|null|resume|return|static|switch|this|throw|try|typeof|while|yield)\b/,
      number: /\b(?:0x[0-9a-fA-F]+|\d+(?:\.(?:\d+|[eE][+-]?\d+))?)\b/,
      operator: /\+\+|--|<=>|<[-<]|>>>?|&&?|\|\|?|[-+*/%!=<>]=?|[~^]|::?/,
      punctuation: /[(){}\[\],;.]/
    });
    Prism2.languages.insertBefore("squirrel", "string", {
      char: {
        pattern: /(^|[^\\"'])'(?:[^\\']|\\(?:[xuU][0-9a-fA-F]{0,8}|[\s\S]))'/,
        lookbehind: true,
        greedy: true
      }
    });
    Prism2.languages.insertBefore("squirrel", "operator", {
      "attribute-punctuation": {
        pattern: /<\/|\/>/,
        alias: "important"
      },
      lambda: {
        pattern: /@(?=\()/,
        alias: "operator"
      }
    });
  }
  return squirrel_1;
}
var stan_1;
var hasRequiredStan;
function requireStan() {
  if (hasRequiredStan) return stan_1;
  hasRequiredStan = 1;
  stan_1 = stan;
  stan.displayName = "stan";
  stan.aliases = [];
  function stan(Prism2) {
    (function(Prism3) {
      var higherOrderFunctions = /\b(?:algebra_solver|algebra_solver_newton|integrate_1d|integrate_ode|integrate_ode_bdf|integrate_ode_rk45|map_rect|ode_(?:adams|bdf|ckrk|rk45)(?:_tol)?|ode_adjoint_tol_ctl|reduce_sum|reduce_sum_static)\b/;
      Prism3.languages.stan = {
        comment: /\/\/.*|\/\*[\s\S]*?\*\/|#(?!include).*/,
        string: {
          // String literals can contain spaces and any printable ASCII characters except for " and \
          // https://mc-stan.org/docs/2_24/reference-manual/print-statements-section.html#string-literals
          pattern: /"[\x20\x21\x23-\x5B\x5D-\x7E]*"/,
          greedy: true
        },
        directive: {
          pattern: /^([ \t]*)#include\b.*/m,
          lookbehind: true,
          alias: "property"
        },
        "function-arg": {
          pattern: RegExp(
            "(" + higherOrderFunctions.source + /\s*\(\s*/.source + ")" + /[a-zA-Z]\w*/.source
          ),
          lookbehind: true,
          alias: "function"
        },
        constraint: {
          pattern: /(\b(?:int|matrix|real|row_vector|vector)\s*)<[^<>]*>/,
          lookbehind: true,
          inside: {
            expression: {
              pattern: /(=\s*)\S(?:\S|\s+(?!\s))*?(?=\s*(?:>$|,\s*\w+\s*=))/,
              lookbehind: true,
              inside: null
              // see below
            },
            property: /\b[a-z]\w*(?=\s*=)/i,
            operator: /=/,
            punctuation: /^<|>$|,/
          }
        },
        keyword: [
          {
            pattern: /\bdata(?=\s*\{)|\b(?:functions|generated|model|parameters|quantities|transformed)\b/,
            alias: "program-block"
          },
          /\b(?:array|break|cholesky_factor_corr|cholesky_factor_cov|complex|continue|corr_matrix|cov_matrix|data|else|for|if|in|increment_log_prob|int|matrix|ordered|positive_ordered|print|real|reject|return|row_vector|simplex|target|unit_vector|vector|void|while)\b/,
          // these are functions that are known to take another function as their first argument.
          higherOrderFunctions
        ],
        function: /\b[a-z]\w*(?=\s*\()/i,
        number: /(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:E[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
        boolean: /\b(?:false|true)\b/,
        operator: /<-|\.[*/]=?|\|\|?|&&|[!=<>+\-*/]=?|['^%~?:]/,
        punctuation: /[()\[\]{},;]/
      };
      Prism3.languages.stan.constraint.inside.expression.inside = Prism3.languages.stan;
    })(Prism2);
  }
  return stan_1;
}
var stylus_1;
var hasRequiredStylus;
function requireStylus() {
  if (hasRequiredStylus) return stylus_1;
  hasRequiredStylus = 1;
  stylus_1 = stylus;
  stylus.displayName = "stylus";
  stylus.aliases = [];
  function stylus(Prism2) {
    (function(Prism3) {
      var unit = {
        pattern: /(\b\d+)(?:%|[a-z]+)/,
        lookbehind: true
      };
      var number = {
        pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,
        lookbehind: true
      };
      var inside = {
        comment: {
          pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
          lookbehind: true
        },
        url: {
          pattern: /\burl\((["']?).*?\1\)/i,
          greedy: true
        },
        string: {
          pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
          greedy: true
        },
        interpolation: null,
        // See below
        func: null,
        // See below
        important: /\B!(?:important|optional)\b/i,
        keyword: {
          pattern: /(^|\s+)(?:(?:else|for|if|return|unless)(?=\s|$)|@[\w-]+)/,
          lookbehind: true
        },
        hexcode: /#[\da-f]{3,6}/i,
        color: [
          /\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
          {
            pattern: /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
            inside: {
              unit,
              number,
              function: /[\w-]+(?=\()/,
              punctuation: /[(),]/
            }
          }
        ],
        entity: /\\[\da-f]{1,8}/i,
        unit,
        boolean: /\b(?:false|true)\b/,
        operator: [
          // We want non-word chars around "-" because it is
          // accepted in property names.
          /~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.{2,3}|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/
        ],
        number,
        punctuation: /[{}()\[\];:,]/
      };
      inside["interpolation"] = {
        pattern: /\{[^\r\n}:]+\}/,
        alias: "variable",
        inside: {
          delimiter: {
            pattern: /^\{|\}$/,
            alias: "punctuation"
          },
          rest: inside
        }
      };
      inside["func"] = {
        pattern: /[\w-]+\([^)]*\).*/,
        inside: {
          function: /^[^(]+/,
          rest: inside
        }
      };
      Prism3.languages.stylus = {
        "atrule-declaration": {
          pattern: /(^[ \t]*)@.+/m,
          lookbehind: true,
          inside: {
            atrule: /^@[\w-]+/,
            rest: inside
          }
        },
        "variable-declaration": {
          pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:\{[^{}]*\}|\S.*|$)/m,
          lookbehind: true,
          inside: {
            variable: /^\S+/,
            rest: inside
          }
        },
        statement: {
          pattern: /(^[ \t]*)(?:else|for|if|return|unless)[ \t].+/m,
          lookbehind: true,
          inside: {
            keyword: /^\S+/,
            rest: inside
          }
        },
        // A property/value pair cannot end with a comma or a brace
        // It cannot have indented content unless it ended with a semicolon
        "property-declaration": {
          pattern: /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)(?!\s)[^{\r\n]*(?:;|[^{\r\n,]$(?!(?:\r?\n|\r)(?:\{|\2[ \t])))/m,
          lookbehind: true,
          inside: {
            property: {
              pattern: /^[^\s:]+/,
              inside: {
                interpolation: inside.interpolation
              }
            },
            rest: inside
          }
        },
        // A selector can contain parentheses only as part of a pseudo-element
        // It can span multiple lines.
        // It must end with a comma or an accolade or have indented content.
        selector: {
          pattern: /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\)|(?![\w-]))|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\)|(?![\w-]))|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t])))/m,
          lookbehind: true,
          inside: {
            interpolation: inside.interpolation,
            comment: inside.comment,
            punctuation: /[{},]/
          }
        },
        func: inside.func,
        string: inside.string,
        comment: {
          pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
          lookbehind: true,
          greedy: true
        },
        interpolation: inside.interpolation,
        punctuation: /[{}()\[\];:.]/
      };
    })(Prism2);
  }
  return stylus_1;
}
var swift_1;
var hasRequiredSwift;
function requireSwift() {
  if (hasRequiredSwift) return swift_1;
  hasRequiredSwift = 1;
  swift_1 = swift;
  swift.displayName = "swift";
  swift.aliases = [];
  function swift(Prism2) {
    Prism2.languages.swift = {
      comment: {
        // Nested comments are supported up to 2 levels
        pattern: /(^|[^\\:])(?:\/\/.*|\/\*(?:[^/*]|\/(?!\*)|\*(?!\/)|\/\*(?:[^*]|\*(?!\/))*\*\/)*\*\/)/,
        lookbehind: true,
        greedy: true
      },
      "string-literal": [
        // https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html
        {
          pattern: RegExp(
            /(^|[^"#])/.source + "(?:" + // single-line string
            /"(?:\\(?:\((?:[^()]|\([^()]*\))*\)|\r\n|[^(])|[^\\\r\n"])*"/.source + "|" + // multi-line string
            /"""(?:\\(?:\((?:[^()]|\([^()]*\))*\)|[^(])|[^\\"]|"(?!""))*"""/.source + ")" + /(?!["#])/.source
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            interpolation: {
              pattern: /(\\\()(?:[^()]|\([^()]*\))*(?=\))/,
              lookbehind: true,
              inside: null
              // see below
            },
            "interpolation-punctuation": {
              pattern: /^\)|\\\($/,
              alias: "punctuation"
            },
            punctuation: /\\(?=[\r\n])/,
            string: /[\s\S]+/
          }
        },
        {
          pattern: RegExp(
            /(^|[^"#])(#+)/.source + "(?:" + // single-line string
            /"(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|\r\n|[^#])|[^\\\r\n])*?"/.source + "|" + // multi-line string
            /"""(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|[^#])|[^\\])*?"""/.source + ")\\2"
          ),
          lookbehind: true,
          greedy: true,
          inside: {
            interpolation: {
              pattern: /(\\#+\()(?:[^()]|\([^()]*\))*(?=\))/,
              lookbehind: true,
              inside: null
              // see below
            },
            "interpolation-punctuation": {
              pattern: /^\)|\\#+\($/,
              alias: "punctuation"
            },
            string: /[\s\S]+/
          }
        }
      ],
      directive: {
        // directives with conditions
        pattern: RegExp(
          /#/.source + "(?:" + (/(?:elseif|if)\b/.source + "(?:[ 	]*" + // This regex is a little complex. It's equivalent to this:
          //   (?:![ \t]*)?(?:\b\w+\b(?:[ \t]*<round>)?|<round>)(?:[ \t]*(?:&&|\|\|))?
          // where <round> is a general parentheses expression.
          /(?:![ \t]*)?(?:\b\w+\b(?:[ \t]*\((?:[^()]|\([^()]*\))*\))?|\((?:[^()]|\([^()]*\))*\))(?:[ \t]*(?:&&|\|\|))?/.source + ")+") + "|" + /(?:else|endif)\b/.source + ")"
        ),
        alias: "property",
        inside: {
          "directive-name": /^#\w+/,
          boolean: /\b(?:false|true)\b/,
          number: /\b\d+(?:\.\d+)*\b/,
          operator: /!|&&|\|\||[<>]=?/,
          punctuation: /[(),]/
        }
      },
      literal: {
        pattern: /#(?:colorLiteral|column|dsohandle|file(?:ID|Literal|Path)?|function|imageLiteral|line)\b/,
        alias: "constant"
      },
      "other-directive": {
        pattern: /#\w+\b/,
        alias: "property"
      },
      attribute: {
        pattern: /@\w+/,
        alias: "atrule"
      },
      "function-definition": {
        pattern: /(\bfunc\s+)\w+/,
        lookbehind: true,
        alias: "function"
      },
      label: {
        // https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#ID141
        pattern: /\b(break|continue)\s+\w+|\b[a-zA-Z_]\w*(?=\s*:\s*(?:for|repeat|while)\b)/,
        lookbehind: true,
        alias: "important"
      },
      keyword: /\b(?:Any|Protocol|Self|Type|actor|as|assignment|associatedtype|associativity|async|await|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic|else|enum|extension|fallthrough|fileprivate|final|for|func|get|guard|higherThan|if|import|in|indirect|infix|init|inout|internal|is|isolated|lazy|left|let|lowerThan|mutating|none|nonisolated|nonmutating|open|operator|optional|override|postfix|precedencegroup|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|set|some|static|struct|subscript|super|switch|throw|throws|try|typealias|unowned|unsafe|var|weak|where|while|willSet)\b/,
      boolean: /\b(?:false|true)\b/,
      nil: {
        pattern: /\bnil\b/,
        alias: "constant"
      },
      "short-argument": /\$\d+\b/,
      omit: {
        pattern: /\b_\b/,
        alias: "keyword"
      },
      number: /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
      // A class name must start with an upper-case letter and be either 1 letter long or contain a lower-case letter.
      "class-name": /\b[A-Z](?:[A-Z_\d]*[a-z]\w*)?\b/,
      function: /\b[a-z_]\w*(?=\s*\()/i,
      constant: /\b(?:[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
      // Operators are generic in Swift. Developers can even create new operators (e.g. +++).
      // https://docs.swift.org/swift-book/ReferenceManual/zzSummaryOfTheGrammar.html#ID481
      // This regex only supports ASCII operators.
      operator: /[-+*/%=!<>&|^~?]+|\.[.\-+*/%=!<>&|^~?]+/,
      punctuation: /[{}[\]();,.:\\]/
    };
    Prism2.languages.swift["string-literal"].forEach(function(rule) {
      rule.inside["interpolation"].inside = Prism2.languages.swift;
    });
  }
  return swift_1;
}
var systemd_1;
var hasRequiredSystemd;
function requireSystemd() {
  if (hasRequiredSystemd) return systemd_1;
  hasRequiredSystemd = 1;
  systemd_1 = systemd;
  systemd.displayName = "systemd";
  systemd.aliases = [];
  function systemd(Prism2) {
    (function(Prism3) {
      var comment = {
        pattern: /^[;#].*/m,
        greedy: true
      };
      var quotesSource = /"(?:[^\r\n"\\]|\\(?:[^\r]|\r\n?))*"(?!\S)/.source;
      Prism3.languages.systemd = {
        comment,
        section: {
          pattern: /^\[[^\n\r\[\]]*\](?=[ \t]*$)/m,
          greedy: true,
          inside: {
            punctuation: /^\[|\]$/,
            "section-name": {
              pattern: /[\s\S]+/,
              alias: "selector"
            }
          }
        },
        key: {
          pattern: /^[^\s=]+(?=[ \t]*=)/m,
          greedy: true,
          alias: "attr-name"
        },
        value: {
          // This pattern is quite complex because of two properties:
          //  1) Quotes (strings) must be preceded by a space. Since we can't use lookbehinds, we have to "resolve"
          //     the lookbehind. You will see this in the main loop where spaces are handled separately.
          //  2) Line continuations.
          //     After line continuations, empty lines and comments are ignored so we have to consume them.
          pattern: RegExp(
            /(=[ \t]*(?!\s))/.source + // the value either starts with quotes or not
            "(?:" + quotesSource + '|(?=[^"\r\n]))(?:' + (/[^\s\\]/.source + // handle spaces separately because of quotes
            '|[ 	]+(?:(?![ 	"])|' + quotesSource + ")|" + /\\[\r\n]+(?:[#;].*[\r\n]+)*(?![#;])/.source) + ")*"
          ),
          lookbehind: true,
          greedy: true,
          alias: "attr-value",
          inside: {
            comment,
            quoted: {
              pattern: RegExp(/(^|\s)/.source + quotesSource),
              lookbehind: true,
              greedy: true
            },
            punctuation: /\\$/m,
            boolean: {
              pattern: /^(?:false|no|off|on|true|yes)$/,
              greedy: true
            }
          }
        },
        punctuation: /=/
      };
    })(Prism2);
  }
  return systemd_1;
}
var t4Templating_1;
var hasRequiredT4Templating;
function requireT4Templating() {
  if (hasRequiredT4Templating) return t4Templating_1;
  hasRequiredT4Templating = 1;
  t4Templating_1 = t4Templating;
  t4Templating.displayName = "t4Templating";
  t4Templating.aliases = [];
  function t4Templating(Prism2) {
    (function(Prism3) {
      function createBlock(prefix, inside, contentAlias) {
        return {
          pattern: RegExp("<#" + prefix + "[\\s\\S]*?#>"),
          alias: "block",
          inside: {
            delimiter: {
              pattern: RegExp("^<#" + prefix + "|#>$"),
              alias: "important"
            },
            content: {
              pattern: /[\s\S]+/,
              inside,
              alias: contentAlias
            }
          }
        };
      }
      function createT4(insideLang) {
        var grammar = Prism3.languages[insideLang];
        var className = "language-" + insideLang;
        return {
          block: {
            pattern: /<#[\s\S]+?#>/,
            inside: {
              directive: createBlock("@", {
                "attr-value": {
                  pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/,
                  inside: {
                    punctuation: /^=|^["']|["']$/
                  }
                },
                keyword: /\b\w+(?=\s)/,
                "attr-name": /\b\w+/
              }),
              expression: createBlock("=", grammar, className),
              "class-feature": createBlock("\\+", grammar, className),
              standard: createBlock("", grammar, className)
            }
          }
        };
      }
      Prism3.languages["t4-templating"] = Object.defineProperty({}, "createT4", {
        value: createT4
      });
    })(Prism2);
  }
  return t4Templating_1;
}
var t4Cs_1;
var hasRequiredT4Cs;
function requireT4Cs() {
  if (hasRequiredT4Cs) return t4Cs_1;
  hasRequiredT4Cs = 1;
  var refractorT4Templating = requireT4Templating();
  var refractorCsharp = requireCsharp();
  t4Cs_1 = t4Cs;
  t4Cs.displayName = "t4Cs";
  t4Cs.aliases = [];
  function t4Cs(Prism2) {
    Prism2.register(refractorT4Templating);
    Prism2.register(refractorCsharp);
    Prism2.languages.t4 = Prism2.languages["t4-cs"] = Prism2.languages["t4-templating"].createT4("csharp");
  }
  return t4Cs_1;
}
var vbnet_1;
var hasRequiredVbnet;
function requireVbnet() {
  if (hasRequiredVbnet) return vbnet_1;
  hasRequiredVbnet = 1;
  var refractorBasic = requireBasic();
  vbnet_1 = vbnet;
  vbnet.displayName = "vbnet";
  vbnet.aliases = [];
  function vbnet(Prism2) {
    Prism2.register(refractorBasic);
    Prism2.languages.vbnet = Prism2.languages.extend("basic", {
      comment: [
        {
          pattern: /(?:!|REM\b).+/i,
          inside: {
            keyword: /^REM/i
          }
        },
        {
          pattern: /(^|[^\\:])'.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      string: {
        pattern: /(^|[^"])"(?:""|[^"])*"(?!")/,
        lookbehind: true,
        greedy: true
      },
      keyword: /(?:\b(?:ADDHANDLER|ADDRESSOF|ALIAS|AND|ANDALSO|AS|BEEP|BLOAD|BOOLEAN|BSAVE|BYREF|BYTE|BYVAL|CALL(?: ABSOLUTE)?|CASE|CATCH|CBOOL|CBYTE|CCHAR|CDATE|CDBL|CDEC|CHAIN|CHAR|CHDIR|CINT|CLASS|CLEAR|CLNG|CLOSE|CLS|COBJ|COM|COMMON|CONST|CONTINUE|CSBYTE|CSHORT|CSNG|CSTR|CTYPE|CUINT|CULNG|CUSHORT|DATA|DATE|DECIMAL|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DEFAULT|DELEGATE|DIM|DIRECTCAST|DO|DOUBLE|ELSE|ELSEIF|END|ENUM|ENVIRON|ERASE|ERROR|EVENT|EXIT|FALSE|FIELD|FILES|FINALLY|FOR(?: EACH)?|FRIEND|FUNCTION|GET|GETTYPE|GETXMLNAMESPACE|GLOBAL|GOSUB|GOTO|HANDLES|IF|IMPLEMENTS|IMPORTS|IN|INHERITS|INPUT|INTEGER|INTERFACE|IOCTL|IS|ISNOT|KEY|KILL|LET|LIB|LIKE|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|ME|MKDIR|MOD|MODULE|MUSTINHERIT|MUSTOVERRIDE|MYBASE|MYCLASS|NAME|NAMESPACE|NARROWING|NEW|NEXT|NOT|NOTHING|NOTINHERITABLE|NOTOVERRIDABLE|OBJECT|OF|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPERATOR|OPTION(?: BASE)?|OPTIONAL|OR|ORELSE|OUT|OVERLOADS|OVERRIDABLE|OVERRIDES|PARAMARRAY|PARTIAL|POKE|PRIVATE|PROPERTY|PROTECTED|PUBLIC|PUT|RAISEEVENT|READ|READONLY|REDIM|REM|REMOVEHANDLER|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SBYTE|SELECT(?: CASE)?|SET|SHADOWS|SHARED|SHELL|SHORT|SINGLE|SLEEP|STATIC|STEP|STOP|STRING|STRUCTURE|SUB|SWAP|SYNCLOCK|SYSTEM|THEN|THROW|TIMER|TO|TROFF|TRON|TRUE|TRY|TRYCAST|TYPE|TYPEOF|UINTEGER|ULONG|UNLOCK|UNTIL|USHORT|USING|VIEW PRINT|WAIT|WEND|WHEN|WHILE|WIDENING|WITH|WITHEVENTS|WRITE|WRITEONLY|XOR)|\B(?:#CONST|#ELSE|#ELSEIF|#END|#IF))(?:\$|\b)/i,
      punctuation: /[,;:(){}]/
    });
  }
  return vbnet_1;
}
var t4Vb_1;
var hasRequiredT4Vb;
function requireT4Vb() {
  if (hasRequiredT4Vb) return t4Vb_1;
  hasRequiredT4Vb = 1;
  var refractorT4Templating = requireT4Templating();
  var refractorVbnet = requireVbnet();
  t4Vb_1 = t4Vb;
  t4Vb.displayName = "t4Vb";
  t4Vb.aliases = [];
  function t4Vb(Prism2) {
    Prism2.register(refractorT4Templating);
    Prism2.register(refractorVbnet);
    Prism2.languages["t4-vb"] = Prism2.languages["t4-templating"].createT4("vbnet");
  }
  return t4Vb_1;
}
var yaml_1;
var hasRequiredYaml;
function requireYaml() {
  if (hasRequiredYaml) return yaml_1;
  hasRequiredYaml = 1;
  yaml_1 = yaml;
  yaml.displayName = "yaml";
  yaml.aliases = ["yml"];
  function yaml(Prism2) {
    (function(Prism3) {
      var anchorOrAlias = /[*&][^\s[\]{},]+/;
      var tag = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/;
      var properties = "(?:" + tag.source + "(?:[ 	]+" + anchorOrAlias.source + ")?|" + anchorOrAlias.source + "(?:[ 	]+" + tag.source + ")?)";
      var plainKey = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(
        /<PLAIN>/g,
        function() {
          return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source;
        }
      );
      var string = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;
      function createValuePattern(value, flags) {
        flags = (flags || "").replace(/m/g, "") + "m";
        var pattern = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function() {
          return properties;
        }).replace(/<<value>>/g, function() {
          return value;
        });
        return RegExp(pattern, flags);
      }
      Prism3.languages.yaml = {
        scalar: {
          pattern: RegExp(
            /([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(
              /<<prop>>/g,
              function() {
                return properties;
              }
            )
          ),
          lookbehind: true,
          alias: "string"
        },
        comment: /#.*/,
        key: {
          pattern: RegExp(
            /((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g, function() {
              return properties;
            }).replace(/<<key>>/g, function() {
              return "(?:" + plainKey + "|" + string + ")";
            })
          ),
          lookbehind: true,
          greedy: true,
          alias: "atrule"
        },
        directive: {
          pattern: /(^[ \t]*)%.+/m,
          lookbehind: true,
          alias: "important"
        },
        datetime: {
          pattern: createValuePattern(
            /\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source
          ),
          lookbehind: true,
          alias: "number"
        },
        boolean: {
          pattern: createValuePattern(/false|true/.source, "i"),
          lookbehind: true,
          alias: "important"
        },
        null: {
          pattern: createValuePattern(/null|~/.source, "i"),
          lookbehind: true,
          alias: "important"
        },
        string: {
          pattern: createValuePattern(string),
          lookbehind: true,
          greedy: true
        },
        number: {
          pattern: createValuePattern(
            /[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source,
            "i"
          ),
          lookbehind: true
        },
        tag,
        important: anchorOrAlias,
        punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
      };
      Prism3.languages.yml = Prism3.languages.yaml;
    })(Prism2);
  }
  return yaml_1;
}
var tap_1;
var hasRequiredTap;
function requireTap() {
  if (hasRequiredTap) return tap_1;
  hasRequiredTap = 1;
  var refractorYaml = requireYaml();
  tap_1 = tap;
  tap.displayName = "tap";
  tap.aliases = [];
  function tap(Prism2) {
    Prism2.register(refractorYaml);
    Prism2.languages.tap = {
      fail: /not ok[^#{\n\r]*/,
      pass: /ok[^#{\n\r]*/,
      pragma: /pragma [+-][a-z]+/,
      bailout: /bail out!.*/i,
      version: /TAP version \d+/i,
      plan: /\b\d+\.\.\d+(?: +#.*)?/,
      subtest: {
        pattern: /# Subtest(?:: .*)?/,
        greedy: true
      },
      punctuation: /[{}]/,
      directive: /#.*/,
      yamlish: {
        pattern: /(^[ \t]*)---[\s\S]*?[\r\n][ \t]*\.\.\.$/m,
        lookbehind: true,
        inside: Prism2.languages.yaml,
        alias: "language-yaml"
      }
    };
  }
  return tap_1;
}
var tcl_1;
var hasRequiredTcl;
function requireTcl() {
  if (hasRequiredTcl) return tcl_1;
  hasRequiredTcl = 1;
  tcl_1 = tcl;
  tcl.displayName = "tcl";
  tcl.aliases = [];
  function tcl(Prism2) {
    Prism2.languages.tcl = {
      comment: {
        pattern: /(^|[^\\])#.*/,
        lookbehind: true
      },
      string: {
        pattern: /"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*"/,
        greedy: true
      },
      variable: [
        {
          pattern: /(\$)(?:::)?(?:[a-zA-Z0-9]+::)*\w+/,
          lookbehind: true
        },
        {
          pattern: /(\$)\{[^}]+\}/,
          lookbehind: true
        },
        {
          pattern: /(^[\t ]*set[ \t]+)(?:::)?(?:[a-zA-Z0-9]+::)*\w+/m,
          lookbehind: true
        }
      ],
      function: {
        pattern: /(^[\t ]*proc[ \t]+)\S+/m,
        lookbehind: true
      },
      builtin: [
        {
          pattern: /(^[\t ]*)(?:break|class|continue|error|eval|exit|for|foreach|if|proc|return|switch|while)\b/m,
          lookbehind: true
        },
        /\b(?:else|elseif)\b/
      ],
      scope: {
        pattern: /(^[\t ]*)(?:global|upvar|variable)\b/m,
        lookbehind: true,
        alias: "constant"
      },
      keyword: {
        pattern: /(^[\t ]*|\[)(?:Safe_Base|Tcl|after|append|apply|array|auto_(?:execok|import|load|mkindex|qualify|reset)|automkindex_old|bgerror|binary|catch|cd|chan|clock|close|concat|dde|dict|encoding|eof|exec|expr|fblocked|fconfigure|fcopy|file(?:event|name)?|flush|gets|glob|history|http|incr|info|interp|join|lappend|lassign|lindex|linsert|list|llength|load|lrange|lrepeat|lreplace|lreverse|lsearch|lset|lsort|math(?:func|op)|memory|msgcat|namespace|open|package|parray|pid|pkg_mkIndex|platform|puts|pwd|re_syntax|read|refchan|regexp|registry|regsub|rename|scan|seek|set|socket|source|split|string|subst|tcl(?:_endOfWord|_findLibrary|startOf(?:Next|Previous)Word|test|vars|wordBreak(?:After|Before))|tell|time|tm|trace|unknown|unload|unset|update|uplevel|vwait)\b/m,
        lookbehind: true
      },
      operator: /!=?|\*\*?|==|&&?|\|\|?|<[=<]?|>[=>]?|[-+~\/%?^]|\b(?:eq|in|ne|ni)\b/,
      punctuation: /[{}()\[\]]/
    };
  }
  return tcl_1;
}
var textile_1;
var hasRequiredTextile;
function requireTextile() {
  if (hasRequiredTextile) return textile_1;
  hasRequiredTextile = 1;
  textile_1 = textile;
  textile.displayName = "textile";
  textile.aliases = [];
  function textile(Prism2) {
    (function(Prism3) {
      var modifierRegex = /\([^|()\n]+\)|\[[^\]\n]+\]|\{[^}\n]+\}/.source;
      var parenthesesRegex = /\)|\((?![^|()\n]+\))/.source;
      function withModifier(source, flags) {
        return RegExp(
          source.replace(/<MOD>/g, function() {
            return "(?:" + modifierRegex + ")";
          }).replace(/<PAR>/g, function() {
            return "(?:" + parenthesesRegex + ")";
          }),
          flags || ""
        );
      }
      var modifierTokens = {
        css: {
          pattern: /\{[^{}]+\}/,
          inside: {
            rest: Prism3.languages.css
          }
        },
        "class-id": {
          pattern: /(\()[^()]+(?=\))/,
          lookbehind: true,
          alias: "attr-value"
        },
        lang: {
          pattern: /(\[)[^\[\]]+(?=\])/,
          lookbehind: true,
          alias: "attr-value"
        },
        // Anything else is punctuation (the first pattern is for row/col spans inside tables)
        punctuation: /[\\\/]\d+|\S/
      };
      var textile2 = Prism3.languages.textile = Prism3.languages.extend("markup", {
        phrase: {
          pattern: /(^|\r|\n)\S[\s\S]*?(?=$|\r?\n\r?\n|\r\r)/,
          lookbehind: true,
          inside: {
            // h1. Header 1
            "block-tag": {
              pattern: withModifier(/^[a-z]\w*(?:<MOD>|<PAR>|[<>=])*\./.source),
              inside: {
                modifier: {
                  pattern: withModifier(
                    /(^[a-z]\w*)(?:<MOD>|<PAR>|[<>=])+(?=\.)/.source
                  ),
                  lookbehind: true,
                  inside: modifierTokens
                },
                tag: /^[a-z]\w*/,
                punctuation: /\.$/
              }
            },
            // # List item
            // * List item
            list: {
              pattern: withModifier(/^[*#]+<MOD>*\s+\S.*/.source, "m"),
              inside: {
                modifier: {
                  pattern: withModifier(/(^[*#]+)<MOD>+/.source),
                  lookbehind: true,
                  inside: modifierTokens
                },
                punctuation: /^[*#]+/
              }
            },
            // | cell | cell | cell |
            table: {
              // Modifiers can be applied to the row: {color:red}.|1|2|3|
              // or the cell: |{color:red}.1|2|3|
              pattern: withModifier(
                /^(?:(?:<MOD>|<PAR>|[<>=^~])+\.\s*)?(?:\|(?:(?:<MOD>|<PAR>|[<>=^~_]|[\\/]\d+)+\.|(?!(?:<MOD>|<PAR>|[<>=^~_]|[\\/]\d+)+\.))[^|]*)+\|/.source,
                "m"
              ),
              inside: {
                modifier: {
                  // Modifiers for rows after the first one are
                  // preceded by a pipe and a line feed
                  pattern: withModifier(
                    /(^|\|(?:\r?\n|\r)?)(?:<MOD>|<PAR>|[<>=^~_]|[\\/]\d+)+(?=\.)/.source
                  ),
                  lookbehind: true,
                  inside: modifierTokens
                },
                punctuation: /\||^\./
              }
            },
            inline: {
              // eslint-disable-next-line regexp/no-super-linear-backtracking
              pattern: withModifier(
                /(^|[^a-zA-Z\d])(\*\*|__|\?\?|[*_%@+\-^~])<MOD>*.+?\2(?![a-zA-Z\d])/.source
              ),
              lookbehind: true,
              inside: {
                // Note: superscripts and subscripts are not handled specifically
                // *bold*, **bold**
                bold: {
                  // eslint-disable-next-line regexp/no-super-linear-backtracking
                  pattern: withModifier(/(^(\*\*?)<MOD>*).+?(?=\2)/.source),
                  lookbehind: true
                },
                // _italic_, __italic__
                italic: {
                  // eslint-disable-next-line regexp/no-super-linear-backtracking
                  pattern: withModifier(/(^(__?)<MOD>*).+?(?=\2)/.source),
                  lookbehind: true
                },
                // ??cite??
                cite: {
                  // eslint-disable-next-line regexp/no-super-linear-backtracking
                  pattern: withModifier(/(^\?\?<MOD>*).+?(?=\?\?)/.source),
                  lookbehind: true,
                  alias: "string"
                },
                // @code@
                code: {
                  // eslint-disable-next-line regexp/no-super-linear-backtracking
                  pattern: withModifier(/(^@<MOD>*).+?(?=@)/.source),
                  lookbehind: true,
                  alias: "keyword"
                },
                // +inserted+
                inserted: {
                  // eslint-disable-next-line regexp/no-super-linear-backtracking
                  pattern: withModifier(/(^\+<MOD>*).+?(?=\+)/.source),
                  lookbehind: true
                },
                // -deleted-
                deleted: {
                  // eslint-disable-next-line regexp/no-super-linear-backtracking
                  pattern: withModifier(/(^-<MOD>*).+?(?=-)/.source),
                  lookbehind: true
                },
                // %span%
                span: {
                  // eslint-disable-next-line regexp/no-super-linear-backtracking
                  pattern: withModifier(/(^%<MOD>*).+?(?=%)/.source),
                  lookbehind: true
                },
                modifier: {
                  pattern: withModifier(
                    /(^\*\*|__|\?\?|[*_%@+\-^~])<MOD>+/.source
                  ),
                  lookbehind: true,
                  inside: modifierTokens
                },
                punctuation: /[*_%?@+\-^~]+/
              }
            },
            // [alias]http://example.com
            "link-ref": {
              pattern: /^\[[^\]]+\]\S+$/m,
              inside: {
                string: {
                  pattern: /(^\[)[^\]]+(?=\])/,
                  lookbehind: true
                },
                url: {
                  pattern: /(^\])\S+$/,
                  lookbehind: true
                },
                punctuation: /[\[\]]/
              }
            },
            // "text":http://example.com
            // "text":link-ref
            link: {
              // eslint-disable-next-line regexp/no-super-linear-backtracking
              pattern: withModifier(
                /"<MOD>*[^"]+":.+?(?=[^\w/]?(?:\s|$))/.source
              ),
              inside: {
                text: {
                  // eslint-disable-next-line regexp/no-super-linear-backtracking
                  pattern: withModifier(/(^"<MOD>*)[^"]+(?=")/.source),
                  lookbehind: true
                },
                modifier: {
                  pattern: withModifier(/(^")<MOD>+/.source),
                  lookbehind: true,
                  inside: modifierTokens
                },
                url: {
                  pattern: /(:).+/,
                  lookbehind: true
                },
                punctuation: /[":]/
              }
            },
            // !image.jpg!
            // !image.jpg(Title)!:http://example.com
            image: {
              pattern: withModifier(
                /!(?:<MOD>|<PAR>|[<>=])*(?![<>=])[^!\s()]+(?:\([^)]+\))?!(?::.+?(?=[^\w/]?(?:\s|$)))?/.source
              ),
              inside: {
                source: {
                  pattern: withModifier(
                    /(^!(?:<MOD>|<PAR>|[<>=])*)(?![<>=])[^!\s()]+(?:\([^)]+\))?(?=!)/.source
                  ),
                  lookbehind: true,
                  alias: "url"
                },
                modifier: {
                  pattern: withModifier(/(^!)(?:<MOD>|<PAR>|[<>=])+/.source),
                  lookbehind: true,
                  inside: modifierTokens
                },
                url: {
                  pattern: /(:).+/,
                  lookbehind: true
                },
                punctuation: /[!:]/
              }
            },
            // Footnote[1]
            footnote: {
              pattern: /\b\[\d+\]/,
              alias: "comment",
              inside: {
                punctuation: /\[|\]/
              }
            },
            // CSS(Cascading Style Sheet)
            acronym: {
              pattern: /\b[A-Z\d]+\([^)]+\)/,
              inside: {
                comment: {
                  pattern: /(\()[^()]+(?=\))/,
                  lookbehind: true
                },
                punctuation: /[()]/
              }
            },
            // Prism(C)
            mark: {
              pattern: /\b\((?:C|R|TM)\)/,
              alias: "comment",
              inside: {
                punctuation: /[()]/
              }
            }
          }
        }
      });
      var phraseInside = textile2["phrase"].inside;
      var nestedPatterns = {
        inline: phraseInside["inline"],
        link: phraseInside["link"],
        image: phraseInside["image"],
        footnote: phraseInside["footnote"],
        acronym: phraseInside["acronym"],
        mark: phraseInside["mark"]
      };
      textile2.tag.pattern = /<\/?(?!\d)[a-z0-9]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i;
      var phraseInlineInside = phraseInside["inline"].inside;
      phraseInlineInside["bold"].inside = nestedPatterns;
      phraseInlineInside["italic"].inside = nestedPatterns;
      phraseInlineInside["inserted"].inside = nestedPatterns;
      phraseInlineInside["deleted"].inside = nestedPatterns;
      phraseInlineInside["span"].inside = nestedPatterns;
      var phraseTableInside = phraseInside["table"].inside;
      phraseTableInside["inline"] = nestedPatterns["inline"];
      phraseTableInside["link"] = nestedPatterns["link"];
      phraseTableInside["image"] = nestedPatterns["image"];
      phraseTableInside["footnote"] = nestedPatterns["footnote"];
      phraseTableInside["acronym"] = nestedPatterns["acronym"];
      phraseTableInside["mark"] = nestedPatterns["mark"];
    })(Prism2);
  }
  return textile_1;
}
var toml_1;
var hasRequiredToml;
function requireToml() {
  if (hasRequiredToml) return toml_1;
  hasRequiredToml = 1;
  toml_1 = toml;
  toml.displayName = "toml";
  toml.aliases = [];
  function toml(Prism2) {
    (function(Prism3) {
      var key = /(?:[\w-]+|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*")/.source;
      function insertKey(pattern) {
        return pattern.replace(/__/g, function() {
          return key;
        });
      }
      Prism3.languages.toml = {
        comment: {
          pattern: /#.*/,
          greedy: true
        },
        table: {
          pattern: RegExp(
            insertKey(
              /(^[\t ]*\[\s*(?:\[\s*)?)__(?:\s*\.\s*__)*(?=\s*\])/.source
            ),
            "m"
          ),
          lookbehind: true,
          greedy: true,
          alias: "class-name"
        },
        key: {
          pattern: RegExp(
            insertKey(/(^[\t ]*|[{,]\s*)__(?:\s*\.\s*__)*(?=\s*=)/.source),
            "m"
          ),
          lookbehind: true,
          greedy: true,
          alias: "property"
        },
        string: {
          pattern: /"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/,
          greedy: true
        },
        date: [
          {
            // Offset Date-Time, Local Date-Time, Local Date
            pattern: /\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\b/i,
            alias: "number"
          },
          {
            // Local Time
            pattern: /\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/,
            alias: "number"
          }
        ],
        number: /(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/,
        boolean: /\b(?:false|true)\b/,
        punctuation: /[.,=[\]{}]/
      };
    })(Prism2);
  }
  return toml_1;
}
var tremor_1;
var hasRequiredTremor;
function requireTremor() {
  if (hasRequiredTremor) return tremor_1;
  hasRequiredTremor = 1;
  tremor_1 = tremor;
  tremor.displayName = "tremor";
  tremor.aliases = [];
  function tremor(Prism2) {
    (function(Prism3) {
      Prism3.languages.tremor = {
        comment: {
          pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
          lookbehind: true
        },
        "interpolated-string": null,
        // see below
        extractor: {
          pattern: /\b[a-z_]\w*\|(?:[^\r\n\\|]|\\(?:\r\n|[\s\S]))*\|/i,
          greedy: true,
          inside: {
            regex: {
              pattern: /(^re)\|[\s\S]+/,
              lookbehind: true
            },
            function: /^\w+/,
            value: /\|[\s\S]+/
          }
        },
        identifier: {
          pattern: /`[^`]*`/,
          greedy: true
        },
        function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())\b/,
        keyword: /\b(?:args|as|by|case|config|connect|connector|const|copy|create|default|define|deploy|drop|each|emit|end|erase|event|flow|fn|for|from|group|having|insert|into|intrinsic|let|links|match|merge|mod|move|of|operator|patch|pipeline|recur|script|select|set|sliding|state|stream|to|tumbling|update|use|when|where|window|with)\b/,
        boolean: /\b(?:false|null|true)\b/i,
        number: /\b(?:0b[01_]*|0x[0-9a-fA-F_]*|\d[\d_]*(?:\.\d[\d_]*)?(?:[Ee][+-]?[\d_]+)?)\b/,
        "pattern-punctuation": {
          pattern: /%(?=[({[])/,
          alias: "punctuation"
        },
        operator: /[-+*\/%~!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?>?=?|(?:absent|and|not|or|present|xor)\b/,
        punctuation: /::|[;\[\]()\{\},.:]/
      };
      var interpolationPattern = /#\{(?:[^"{}]|\{[^{}]*\}|"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*")*\}/.source;
      Prism3.languages.tremor["interpolated-string"] = {
        pattern: RegExp(
          /(^|[^\\])/.source + '(?:"""(?:' + /[^"\\#]|\\[\s\S]|"(?!"")|#(?!\{)/.source + "|" + interpolationPattern + ')*"""|"(?:' + /[^"\\\r\n#]|\\(?:\r\n|[\s\S])|#(?!\{)/.source + "|" + interpolationPattern + ')*")'
        ),
        lookbehind: true,
        greedy: true,
        inside: {
          interpolation: {
            pattern: RegExp(interpolationPattern),
            inside: {
              punctuation: /^#\{|\}$/,
              expression: {
                pattern: /[\s\S]+/,
                inside: Prism3.languages.tremor
              }
            }
          },
          string: /[\s\S]+/
        }
      };
      Prism3.languages.troy = Prism3.languages["tremor"];
      Prism3.languages.trickle = Prism3.languages["tremor"];
    })(Prism2);
  }
  return tremor_1;
}
var tsx_1;
var hasRequiredTsx;
function requireTsx() {
  if (hasRequiredTsx) return tsx_1;
  hasRequiredTsx = 1;
  var refractorJsx = requireJsx();
  var refractorTypescript = requireTypescript();
  tsx_1 = tsx;
  tsx.displayName = "tsx";
  tsx.aliases = [];
  function tsx(Prism2) {
    Prism2.register(refractorJsx);
    Prism2.register(refractorTypescript);
    (function(Prism3) {
      var typescript = Prism3.util.clone(Prism3.languages.typescript);
      Prism3.languages.tsx = Prism3.languages.extend("jsx", typescript);
      delete Prism3.languages.tsx["parameter"];
      delete Prism3.languages.tsx["literal-property"];
      var tag = Prism3.languages.tsx.tag;
      tag.pattern = RegExp(
        /(^|[^\w$]|(?=<\/))/.source + "(?:" + tag.pattern.source + ")",
        tag.pattern.flags
      );
      tag.lookbehind = true;
    })(Prism2);
  }
  return tsx_1;
}
var tt2_1;
var hasRequiredTt2;
function requireTt2() {
  if (hasRequiredTt2) return tt2_1;
  hasRequiredTt2 = 1;
  var refractorMarkupTemplating = requireMarkupTemplating();
  tt2_1 = tt2;
  tt2.displayName = "tt2";
  tt2.aliases = [];
  function tt2(Prism2) {
    Prism2.register(refractorMarkupTemplating);
    (function(Prism3) {
      Prism3.languages.tt2 = Prism3.languages.extend("clike", {
        comment: /#.*|\[%#[\s\S]*?%\]/,
        keyword: /\b(?:BLOCK|CALL|CASE|CATCH|CLEAR|DEBUG|DEFAULT|ELSE|ELSIF|END|FILTER|FINAL|FOREACH|GET|IF|IN|INCLUDE|INSERT|LAST|MACRO|META|NEXT|PERL|PROCESS|RAWPERL|RETURN|SET|STOP|SWITCH|TAGS|THROW|TRY|UNLESS|USE|WHILE|WRAPPER)\b/,
        punctuation: /[[\]{},()]/
      });
      Prism3.languages.insertBefore("tt2", "number", {
        operator: /=[>=]?|!=?|<=?|>=?|&&|\|\|?|\b(?:and|not|or)\b/,
        variable: {
          pattern: /\b[a-z]\w*(?:\s*\.\s*(?:\d+|\$?[a-z]\w*))*\b/i
        }
      });
      Prism3.languages.insertBefore("tt2", "keyword", {
        delimiter: {
          pattern: /^(?:\[%|%%)-?|-?%\]$/,
          alias: "punctuation"
        }
      });
      Prism3.languages.insertBefore("tt2", "string", {
        "single-quoted-string": {
          pattern: /'[^\\']*(?:\\[\s\S][^\\']*)*'/,
          greedy: true,
          alias: "string"
        },
        "double-quoted-string": {
          pattern: /"[^\\"]*(?:\\[\s\S][^\\"]*)*"/,
          greedy: true,
          alias: "string",
          inside: {
            variable: {
              pattern: /\$(?:[a-z]\w*(?:\.(?:\d+|\$?[a-z]\w*))*)/i
            }
          }
        }
      });
      delete Prism3.languages.tt2.string;
      Prism3.hooks.add("before-tokenize", function(env) {
        var tt2Pattern = /\[%[\s\S]+?%\]/g;
        Prism3.languages["markup-templating"].buildPlaceholders(
          env,
          "tt2",
          tt2Pattern
        );
      });
      Prism3.hooks.add("after-tokenize", function(env) {
        Prism3.languages["markup-templating"].tokenizePlaceholders(env, "tt2");
      });
    })(Prism2);
  }
  return tt2_1;
}
var twig_1;
var hasRequiredTwig;
function requireTwig() {
  if (hasRequiredTwig) return twig_1;
  hasRequiredTwig = 1;
  var refractorMarkupTemplating = requireMarkupTemplating();
  twig_1 = twig;
  twig.displayName = "twig";
  twig.aliases = [];
  function twig(Prism2) {
    Prism2.register(refractorMarkupTemplating);
    Prism2.languages.twig = {
      comment: /^\{#[\s\S]*?#\}$/,
      "tag-name": {
        pattern: /(^\{%-?\s*)\w+/,
        lookbehind: true,
        alias: "keyword"
      },
      delimiter: {
        pattern: /^\{[{%]-?|-?[%}]\}$/,
        alias: "punctuation"
      },
      string: {
        pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
        inside: {
          punctuation: /^['"]|['"]$/
        }
      },
      keyword: /\b(?:even|if|odd)\b/,
      boolean: /\b(?:false|null|true)\b/,
      number: /\b0x[\dA-Fa-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][-+]?\d+)?/,
      operator: [
        {
          pattern: /(\s)(?:and|b-and|b-or|b-xor|ends with|in|is|matches|not|or|same as|starts with)(?=\s)/,
          lookbehind: true
        },
        /[=<>]=?|!=|\*\*?|\/\/?|\?:?|[-+~%|]/
      ],
      punctuation: /[()\[\]{}:.,]/
    };
    Prism2.hooks.add("before-tokenize", function(env) {
      if (env.language !== "twig") {
        return;
      }
      var pattern = /\{(?:#[\s\S]*?#|%[\s\S]*?%|\{[\s\S]*?\})\}/g;
      Prism2.languages["markup-templating"].buildPlaceholders(env, "twig", pattern);
    });
    Prism2.hooks.add("after-tokenize", function(env) {
      Prism2.languages["markup-templating"].tokenizePlaceholders(env, "twig");
    });
  }
  return twig_1;
}
var typoscript_1;
var hasRequiredTyposcript;
function requireTyposcript() {
  if (hasRequiredTyposcript) return typoscript_1;
  hasRequiredTyposcript = 1;
  typoscript_1 = typoscript;
  typoscript.displayName = "typoscript";
  typoscript.aliases = ["tsconfig"];
  function typoscript(Prism2) {
    (function(Prism3) {
      var keywords = /\b(?:ACT|ACTIFSUB|CARRAY|CASE|CLEARGIF|COA|COA_INT|CONSTANTS|CONTENT|CUR|EDITPANEL|EFFECT|EXT|FILE|FLUIDTEMPLATE|FORM|FRAME|FRAMESET|GIFBUILDER|GMENU|GMENU_FOLDOUT|GMENU_LAYERS|GP|HMENU|HRULER|HTML|IENV|IFSUB|IMAGE|IMGMENU|IMGMENUITEM|IMGTEXT|IMG_RESOURCE|INCLUDE_TYPOSCRIPT|JSMENU|JSMENUITEM|LLL|LOAD_REGISTER|NO|PAGE|RECORDS|RESTORE_REGISTER|TEMPLATE|TEXT|TMENU|TMENUITEM|TMENU_LAYERS|USER|USER_INT|_GIFBUILDER|global|globalString|globalVar)\b/;
      Prism3.languages.typoscript = {
        comment: [
          {
            // multiline comments /* */
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true
          },
          {
            // double-slash comments - ignored when backslashes or colon is found in front
            // also ignored whenever directly after an equal-sign, because it would probably be an url without protocol
            pattern: /(^|[^\\:= \t]|(?:^|[^= \t])[ \t]+)\/\/.*/,
            lookbehind: true,
            greedy: true
          },
          {
            // hash comments - ignored when leading quote is found for hex colors in strings
            pattern: /(^|[^"'])#.*/,
            lookbehind: true,
            greedy: true
          }
        ],
        function: [
          {
            // old include style
            pattern: /<INCLUDE_TYPOSCRIPT:\s*source\s*=\s*(?:"[^"\r\n]*"|'[^'\r\n]*')\s*>/,
            inside: {
              string: {
                pattern: /"[^"\r\n]*"|'[^'\r\n]*'/,
                inside: {
                  keyword: keywords
                }
              },
              keyword: {
                pattern: /INCLUDE_TYPOSCRIPT/
              }
            }
          },
          {
            // new include style
            pattern: /@import\s*(?:"[^"\r\n]*"|'[^'\r\n]*')/,
            inside: {
              string: /"[^"\r\n]*"|'[^'\r\n]*'/
            }
          }
        ],
        string: {
          pattern: /^([^=]*=[< ]?)(?:(?!\]\n).)*/,
          lookbehind: true,
          inside: {
            function: /\{\$.*\}/,
            // constants include
            keyword: keywords,
            number: /^\d+$/,
            punctuation: /[,|:]/
          }
        },
        keyword: keywords,
        number: {
          // special highlighting for indexes of arrays in tags
          pattern: /\b\d+\s*[.{=]/,
          inside: {
            operator: /[.{=]/
          }
        },
        tag: {
          pattern: /\.?[-\w\\]+\.?/,
          inside: {
            punctuation: /\./
          }
        },
        punctuation: /[{}[\];(),.:|]/,
        operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/
      };
      Prism3.languages.tsconfig = Prism3.languages.typoscript;
    })(Prism2);
  }
  return typoscript_1;
}
var unrealscript_1;
var hasRequiredUnrealscript;
function requireUnrealscript() {
  if (hasRequiredUnrealscript) return unrealscript_1;
  hasRequiredUnrealscript = 1;
  unrealscript_1 = unrealscript;
  unrealscript.displayName = "unrealscript";
  unrealscript.aliases = ["uc", "uscript"];
  function unrealscript(Prism2) {
    Prism2.languages.unrealscript = {
      comment: /\/\/.*|\/\*[\s\S]*?\*\//,
      string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      category: {
        pattern: /(\b(?:(?:autoexpand|hide|show)categories|var)\s*\()[^()]+(?=\))/,
        lookbehind: true,
        greedy: true,
        alias: "property"
      },
      metadata: {
        pattern: /(\w\s*)<\s*\w+\s*=[^<>|=\r\n]+(?:\|\s*\w+\s*=[^<>|=\r\n]+)*>/,
        lookbehind: true,
        greedy: true,
        inside: {
          property: /\b\w+(?=\s*=)/,
          operator: /=/,
          punctuation: /[<>|]/
        }
      },
      macro: {
        pattern: /`\w+/,
        alias: "property"
      },
      "class-name": {
        pattern: /(\b(?:class|enum|extends|interface|state(?:\(\))?|struct|within)\s+)\w+/,
        lookbehind: true
      },
      keyword: /\b(?:abstract|actor|array|auto|autoexpandcategories|bool|break|byte|case|class|classgroup|client|coerce|collapsecategories|config|const|continue|default|defaultproperties|delegate|dependson|deprecated|do|dontcollapsecategories|editconst|editinlinenew|else|enum|event|exec|export|extends|final|float|for|forcescriptorder|foreach|function|goto|guid|hidecategories|hidedropdown|if|ignores|implements|inherits|input|int|interface|iterator|latent|local|material|name|native|nativereplication|noexport|nontransient|noteditinlinenew|notplaceable|operator|optional|out|pawn|perobjectconfig|perobjectlocalized|placeable|postoperator|preoperator|private|protected|reliable|replication|return|server|showcategories|simulated|singular|state|static|string|struct|structdefault|structdefaultproperties|switch|texture|transient|travel|unreliable|until|var|vector|while|within)\b/,
      function: /\b[a-z_]\w*(?=\s*\()/i,
      boolean: /\b(?:false|true)\b/,
      number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      // https://docs.unrealengine.com/udk/Three/UnrealScriptExpressions.html
      operator: />>|<<|--|\+\+|\*\*|[-+*/~!=<>$@]=?|&&?|\|\|?|\^\^?|[?:%]|\b(?:ClockwiseFrom|Cross|Dot)\b/,
      punctuation: /[()[\]{};,.]/
    };
    Prism2.languages.uc = Prism2.languages.uscript = Prism2.languages.unrealscript;
  }
  return unrealscript_1;
}
var uorazor_1;
var hasRequiredUorazor;
function requireUorazor() {
  if (hasRequiredUorazor) return uorazor_1;
  hasRequiredUorazor = 1;
  uorazor_1 = uorazor;
  uorazor.displayName = "uorazor";
  uorazor.aliases = [];
  function uorazor(Prism2) {
    Prism2.languages.uorazor = {
      "comment-hash": {
        pattern: /#.*/,
        alias: "comment",
        greedy: true
      },
      "comment-slash": {
        pattern: /\/\/.*/,
        alias: "comment",
        greedy: true
      },
      string: {
        pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
        inside: {
          punctuation: /^['"]|['"]$/
        },
        greedy: true
      },
      "source-layers": {
        pattern: /\b(?:arms|backpack|blue|bracelet|cancel|clear|cloak|criminal|earrings|enemy|facialhair|friend|friendly|gloves|gray|grey|ground|hair|head|innerlegs|innertorso|innocent|lefthand|middletorso|murderer|neck|nonfriendly|onehandedsecondary|outerlegs|outertorso|pants|red|righthand|ring|self|shirt|shoes|talisman|waist)\b/i,
        alias: "function"
      },
      "source-commands": {
        pattern: /\b(?:alliance|attack|cast|clearall|clearignore|clearjournal|clearlist|clearsysmsg|createlist|createtimer|dclick|dclicktype|dclickvar|dress|dressconfig|drop|droprelloc|emote|getlabel|guild|gumpclose|gumpresponse|hotkey|ignore|lasttarget|lift|lifttype|menu|menuresponse|msg|org|organize|organizer|overhead|pause|poplist|potion|promptresponse|pushlist|removelist|removetimer|rename|restock|say|scav|scavenger|script|setability|setlasttarget|setskill|settimer|setvar|sysmsg|target|targetloc|targetrelloc|targettype|undress|unignore|unsetvar|useobject|useonce|useskill|usetype|virtue|wait|waitforgump|waitformenu|waitforprompt|waitforstat|waitforsysmsg|waitfortarget|walk|wfsysmsg|wft|whisper|yell)\b/,
        alias: "function"
      },
      "tag-name": {
        pattern: /(^\{%-?\s*)\w+/,
        lookbehind: true,
        alias: "keyword"
      },
      delimiter: {
        pattern: /^\{[{%]-?|-?[%}]\}$/,
        alias: "punctuation"
      },
      function: /\b(?:atlist|close|closest|count|counter|counttype|dead|dex|diffhits|diffmana|diffstam|diffweight|find|findbuff|finddebuff|findlayer|findtype|findtypelist|followers|gumpexists|hidden|hits|hp|hue|human|humanoid|ingump|inlist|insysmessage|insysmsg|int|invul|lhandempty|list|listexists|mana|maxhits|maxhp|maxmana|maxstam|maxweight|monster|mounted|name|next|noto|paralyzed|poisoned|position|prev|previous|queued|rand|random|rhandempty|skill|stam|str|targetexists|timer|timerexists|varexist|warmode|weight)\b/,
      keyword: /\b(?:and|as|break|continue|else|elseif|endfor|endif|endwhile|for|if|loop|not|or|replay|stop|while)\b/,
      boolean: /\b(?:false|null|true)\b/,
      number: /\b0x[\dA-Fa-f]+|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee][-+]?\d+)?/,
      operator: [
        {
          pattern: /(\s)(?:and|b-and|b-or|b-xor|ends with|in|is|matches|not|or|same as|starts with)(?=\s)/,
          lookbehind: true
        },
        /[=<>]=?|!=|\*\*?|\/\/?|\?:?|[-+~%|]/
      ],
      punctuation: /[()\[\]{}:.,]/
    };
  }
  return uorazor_1;
}
var uri_1;
var hasRequiredUri;
function requireUri() {
  if (hasRequiredUri) return uri_1;
  hasRequiredUri = 1;
  uri_1 = uri;
  uri.displayName = "uri";
  uri.aliases = ["url"];
  function uri(Prism2) {
    Prism2.languages.uri = {
      scheme: {
        pattern: /^[a-z][a-z0-9+.-]*:/im,
        greedy: true,
        inside: {
          "scheme-delimiter": /:$/
        }
      },
      fragment: {
        pattern: /#[\w\-.~!$&'()*+,;=%:@/?]*/,
        inside: {
          "fragment-delimiter": /^#/
        }
      },
      query: {
        pattern: /\?[\w\-.~!$&'()*+,;=%:@/?]*/,
        inside: {
          "query-delimiter": {
            pattern: /^\?/,
            greedy: true
          },
          "pair-delimiter": /[&;]/,
          pair: {
            pattern: /^[^=][\s\S]*/,
            inside: {
              key: /^[^=]+/,
              value: {
                pattern: /(^=)[\s\S]+/,
                lookbehind: true
              }
            }
          }
        }
      },
      authority: {
        pattern: RegExp(
          /^\/\//.source + // [ userinfo "@" ]
          /(?:[\w\-.~!$&'()*+,;=%:]*@)?/.source + // host
          ("(?:" + // IP-literal
          /\[(?:[0-9a-fA-F:.]{2,48}|v[0-9a-fA-F]+\.[\w\-.~!$&'()*+,;=]+)\]/.source + "|" + // IPv4address or registered name
          /[\w\-.~!$&'()*+,;=%]*/.source + ")") + // [ ":" port ]
          /(?::\d*)?/.source,
          "m"
        ),
        inside: {
          "authority-delimiter": /^\/\//,
          "user-info-segment": {
            pattern: /^[\w\-.~!$&'()*+,;=%:]*@/,
            inside: {
              "user-info-delimiter": /@$/,
              "user-info": /^[\w\-.~!$&'()*+,;=%:]+/
            }
          },
          "port-segment": {
            pattern: /:\d*$/,
            inside: {
              "port-delimiter": /^:/,
              port: /^\d+/
            }
          },
          host: {
            pattern: /[\s\S]+/,
            inside: {
              "ip-literal": {
                pattern: /^\[[\s\S]+\]$/,
                inside: {
                  "ip-literal-delimiter": /^\[|\]$/,
                  "ipv-future": /^v[\s\S]+/,
                  "ipv6-address": /^[\s\S]+/
                }
              },
              "ipv4-address": /^(?:(?:[03-9]\d?|[12]\d{0,2})\.){3}(?:[03-9]\d?|[12]\d{0,2})$/
            }
          }
        }
      },
      path: {
        pattern: /^[\w\-.~!$&'()*+,;=%:@/]+/m,
        inside: {
          "path-separator": /\//
        }
      }
    };
    Prism2.languages.url = Prism2.languages.uri;
  }
  return uri_1;
}
var v_1;
var hasRequiredV;
function requireV() {
  if (hasRequiredV) return v_1;
  hasRequiredV = 1;
  v_1 = v;
  v.displayName = "v";
  v.aliases = [];
  function v(Prism2) {
    (function(Prism3) {
      var interpolationExpr = {
        pattern: /[\s\S]+/,
        inside: null
      };
      Prism3.languages.v = Prism3.languages.extend("clike", {
        string: {
          pattern: /r?(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
          alias: "quoted-string",
          greedy: true,
          inside: {
            interpolation: {
              pattern: /((?:^|[^\\])(?:\\{2})*)\$(?:\{[^{}]*\}|\w+(?:\.\w+(?:\([^\(\)]*\))?|\[[^\[\]]+\])*)/,
              lookbehind: true,
              inside: {
                "interpolation-variable": {
                  pattern: /^\$\w[\s\S]*$/,
                  alias: "variable"
                },
                "interpolation-punctuation": {
                  pattern: /^\$\{|\}$/,
                  alias: "punctuation"
                },
                "interpolation-expression": interpolationExpr
              }
            }
          }
        },
        "class-name": {
          pattern: /(\b(?:enum|interface|struct|type)\s+)(?:C\.)?\w+/,
          lookbehind: true
        },
        keyword: /(?:\b(?:__global|as|asm|assert|atomic|break|chan|const|continue|defer|else|embed|enum|fn|for|go(?:to)?|if|import|in|interface|is|lock|match|module|mut|none|or|pub|return|rlock|select|shared|sizeof|static|struct|type(?:of)?|union|unsafe)|\$(?:else|for|if)|#(?:flag|include))\b/,
        number: /\b(?:0x[a-f\d]+(?:_[a-f\d]+)*|0b[01]+(?:_[01]+)*|0o[0-7]+(?:_[0-7]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?)\b/i,
        operator: /~|\?|[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\.?/,
        builtin: /\b(?:any(?:_float|_int)?|bool|byte(?:ptr)?|charptr|f(?:32|64)|i(?:8|16|64|128|nt)|rune|size_t|string|u(?:16|32|64|128)|voidptr)\b/
      });
      interpolationExpr.inside = Prism3.languages.v;
      Prism3.languages.insertBefore("v", "string", {
        char: {
          pattern: /`(?:\\`|\\?[^`]{1,2})`/,
          // using {1,2} instead of `u` flag for compatibility
          alias: "rune"
        }
      });
      Prism3.languages.insertBefore("v", "operator", {
        attribute: {
          pattern: /(^[\t ]*)\[(?:deprecated|direct_array_access|flag|inline|live|ref_only|typedef|unsafe_fn|windows_stdcall)\]/m,
          lookbehind: true,
          alias: "annotation",
          inside: {
            punctuation: /[\[\]]/,
            keyword: /\w+/
          }
        },
        generic: {
          pattern: /<\w+>(?=\s*[\)\{])/,
          inside: {
            punctuation: /[<>]/,
            "class-name": /\w+/
          }
        }
      });
      Prism3.languages.insertBefore("v", "function", {
        "generic-function": {
          // e.g. foo<T>( ...
          pattern: /\b\w+\s*<\w+>(?=\()/,
          inside: {
            function: /^\w+/,
            generic: {
              pattern: /<\w+>/,
              inside: Prism3.languages.v.generic.inside
            }
          }
        }
      });
    })(Prism2);
  }
  return v_1;
}
var vala_1;
var hasRequiredVala;
function requireVala() {
  if (hasRequiredVala) return vala_1;
  hasRequiredVala = 1;
  vala_1 = vala;
  vala.displayName = "vala";
  vala.aliases = [];
  function vala(Prism2) {
    Prism2.languages.vala = Prism2.languages.extend("clike", {
      // Classes copied from prism-csharp
      "class-name": [
        {
          // (Foo bar, Bar baz)
          pattern: /\b[A-Z]\w*(?:\.\w+)*\b(?=(?:\?\s+|\*?\s+\*?)\w)/,
          inside: {
            punctuation: /\./
          }
        },
        {
          // [Foo]
          pattern: /(\[)[A-Z]\w*(?:\.\w+)*\b/,
          lookbehind: true,
          inside: {
            punctuation: /\./
          }
        },
        {
          // class Foo : Bar
          pattern: /(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/,
          lookbehind: true,
          inside: {
            punctuation: /\./
          }
        },
        {
          // class Foo
          pattern: /((?:\b(?:class|enum|interface|new|struct)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*\b/,
          lookbehind: true,
          inside: {
            punctuation: /\./
          }
        }
      ],
      keyword: /\b(?:abstract|as|assert|async|base|bool|break|case|catch|char|class|const|construct|continue|default|delegate|delete|do|double|dynamic|else|ensures|enum|errordomain|extern|finally|float|for|foreach|get|if|in|inline|int|int16|int32|int64|int8|interface|internal|is|lock|long|namespace|new|null|out|override|owned|params|private|protected|public|ref|requires|return|set|short|signal|sizeof|size_t|ssize_t|static|string|struct|switch|this|throw|throws|try|typeof|uchar|uint|uint16|uint32|uint64|uint8|ulong|unichar|unowned|ushort|using|value|var|virtual|void|volatile|weak|while|yield)\b/i,
      function: /\b\w+(?=\s*\()/,
      number: /(?:\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)(?:f|u?l?)?/i,
      operator: /\+\+|--|&&|\|\||<<=?|>>=?|=>|->|~|[+\-*\/%&^|=!<>]=?|\?\??|\.\.\./,
      punctuation: /[{}[\];(),.:]/,
      constant: /\b[A-Z0-9_]+\b/
    });
    Prism2.languages.insertBefore("vala", "string", {
      "raw-string": {
        pattern: /"""[\s\S]*?"""/,
        greedy: true,
        alias: "string"
      },
      "template-string": {
        pattern: /@"[\s\S]*?"/,
        greedy: true,
        inside: {
          interpolation: {
            pattern: /\$(?:\([^)]*\)|[a-zA-Z]\w*)/,
            inside: {
              delimiter: {
                pattern: /^\$\(?|\)$/,
                alias: "punctuation"
              },
              rest: Prism2.languages.vala
            }
          },
          string: /[\s\S]+/
        }
      }
    });
    Prism2.languages.insertBefore("vala", "keyword", {
      regex: {
        pattern: /\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[imsx]{0,4}(?=\s*(?:$|[\r\n,.;})\]]))/,
        greedy: true,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: true,
            alias: "language-regex",
            inside: Prism2.languages.regex
          },
          "regex-delimiter": /^\//,
          "regex-flags": /^[a-z]+$/
        }
      }
    });
  }
  return vala_1;
}
var velocity_1;
var hasRequiredVelocity;
function requireVelocity() {
  if (hasRequiredVelocity) return velocity_1;
  hasRequiredVelocity = 1;
  velocity_1 = velocity;
  velocity.displayName = "velocity";
  velocity.aliases = [];
  function velocity(Prism2) {
    (function(Prism3) {
      Prism3.languages.velocity = Prism3.languages.extend("markup", {});
      var velocity2 = {
        variable: {
          pattern: /(^|[^\\](?:\\\\)*)\$!?(?:[a-z][\w-]*(?:\([^)]*\))?(?:\.[a-z][\w-]*(?:\([^)]*\))?|\[[^\]]+\])*|\{[^}]+\})/i,
          lookbehind: true,
          inside: {}
          // See below
        },
        string: {
          pattern: /"[^"]*"|'[^']*'/,
          greedy: true
        },
        number: /\b\d+\b/,
        boolean: /\b(?:false|true)\b/,
        operator: /[=!<>]=?|[+*/%-]|&&|\|\||\.\.|\b(?:eq|g[et]|l[et]|n(?:e|ot))\b/,
        punctuation: /[(){}[\]:,.]/
      };
      velocity2.variable.inside = {
        string: velocity2["string"],
        function: {
          pattern: /([^\w-])[a-z][\w-]*(?=\()/,
          lookbehind: true
        },
        number: velocity2["number"],
        boolean: velocity2["boolean"],
        punctuation: velocity2["punctuation"]
      };
      Prism3.languages.insertBefore("velocity", "comment", {
        unparsed: {
          pattern: /(^|[^\\])#\[\[[\s\S]*?\]\]#/,
          lookbehind: true,
          greedy: true,
          inside: {
            punctuation: /^#\[\[|\]\]#$/
          }
        },
        "velocity-comment": [
          {
            pattern: /(^|[^\\])#\*[\s\S]*?\*#/,
            lookbehind: true,
            greedy: true,
            alias: "comment"
          },
          {
            pattern: /(^|[^\\])##.*/,
            lookbehind: true,
            greedy: true,
            alias: "comment"
          }
        ],
        directive: {
          pattern: /(^|[^\\](?:\\\\)*)#@?(?:[a-z][\w-]*|\{[a-z][\w-]*\})(?:\s*\((?:[^()]|\([^()]*\))*\))?/i,
          lookbehind: true,
          inside: {
            keyword: {
              pattern: /^#@?(?:[a-z][\w-]*|\{[a-z][\w-]*\})|\bin\b/,
              inside: {
                punctuation: /[{}]/
              }
            },
            rest: velocity2
          }
        },
        variable: velocity2["variable"]
      });
      Prism3.languages.velocity["tag"].inside["attr-value"].inside.rest = Prism3.languages.velocity;
    })(Prism2);
  }
  return velocity_1;
}
var verilog_1;
var hasRequiredVerilog;
function requireVerilog() {
  if (hasRequiredVerilog) return verilog_1;
  hasRequiredVerilog = 1;
  verilog_1 = verilog;
  verilog.displayName = "verilog";
  verilog.aliases = [];
  function verilog(Prism2) {
    Prism2.languages.verilog = {
      comment: {
        pattern: /\/\/.*|\/\*[\s\S]*?\*\//,
        greedy: true
      },
      string: {
        pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
        greedy: true
      },
      "kernel-function": {
        // support for any kernel function (ex: $display())
        pattern: /\B\$\w+\b/,
        alias: "property"
      },
      // support for user defined constants (ex: `define)
      constant: /\B`\w+\b/,
      function: /\b\w+(?=\()/,
      // support for verilog and system verilog keywords
      keyword: /\b(?:alias|and|assert|assign|assume|automatic|before|begin|bind|bins|binsof|bit|break|buf|bufif0|bufif1|byte|case|casex|casez|cell|chandle|class|clocking|cmos|config|const|constraint|context|continue|cover|covergroup|coverpoint|cross|deassign|default|defparam|design|disable|dist|do|edge|else|end|endcase|endclass|endclocking|endconfig|endfunction|endgenerate|endgroup|endinterface|endmodule|endpackage|endprimitive|endprogram|endproperty|endsequence|endspecify|endtable|endtask|enum|event|expect|export|extends|extern|final|first_match|for|force|foreach|forever|fork|forkjoin|function|generate|genvar|highz0|highz1|if|iff|ifnone|ignore_bins|illegal_bins|import|incdir|include|initial|inout|input|inside|instance|int|integer|interface|intersect|join|join_any|join_none|large|liblist|library|local|localparam|logic|longint|macromodule|matches|medium|modport|module|nand|negedge|new|nmos|nor|noshowcancelled|not|notif0|notif1|null|or|output|package|packed|parameter|pmos|posedge|primitive|priority|program|property|protected|pull0|pull1|pulldown|pullup|pulsestyle_ondetect|pulsestyle_onevent|pure|rand|randc|randcase|randsequence|rcmos|real|realtime|ref|reg|release|repeat|return|rnmos|rpmos|rtran|rtranif0|rtranif1|scalared|sequence|shortint|shortreal|showcancelled|signed|small|solve|specify|specparam|static|string|strong0|strong1|struct|super|supply0|supply1|table|tagged|task|this|throughout|time|timeprecision|timeunit|tran|tranif0|tranif1|tri|tri0|tri1|triand|trior|trireg|type|typedef|union|unique|unsigned|use|uwire|var|vectored|virtual|void|wait|wait_order|wand|weak0|weak1|while|wildcard|wire|with|within|wor|xnor|xor)\b/,
      // bold highlighting for all verilog and system verilog logic blocks
      important: /\b(?:always|always_comb|always_ff|always_latch)\b(?: *@)?/,
      // support for time ticks, vectors, and real numbers
      number: /\B##?\d+|(?:\b\d+)?'[odbh] ?[\da-fzx_?]+|\b(?:\d*[._])?\d+(?:e[-+]?\d+)?/i,
      operator: /[-+{}^~%*\/?=!<>&|]+/,
      punctuation: /[[\];(),.:]/
    };
  }
  return verilog_1;
}
var vhdl_1;
var hasRequiredVhdl;
function requireVhdl() {
  if (hasRequiredVhdl) return vhdl_1;
  hasRequiredVhdl = 1;
  vhdl_1 = vhdl;
  vhdl.displayName = "vhdl";
  vhdl.aliases = [];
  function vhdl(Prism2) {
    Prism2.languages.vhdl = {
      comment: /--.+/,
      // support for all logic vectors
      "vhdl-vectors": {
        pattern: /\b[oxb]"[\da-f_]+"|"[01uxzwlh-]+"/i,
        alias: "number"
      },
      // support for operator overloading included
      "quoted-function": {
        pattern: /"\S+?"(?=\()/,
        alias: "function"
      },
      string: /"(?:[^\\"\r\n]|\\(?:\r\n|[\s\S]))*"/,
      constant: /\b(?:library|use)\b/i,
      // support for predefined attributes included
      keyword: /\b(?:'active|'ascending|'base|'delayed|'driving|'driving_value|'event|'high|'image|'instance_name|'last_active|'last_event|'last_value|'left|'leftof|'length|'low|'path_name|'pos|'pred|'quiet|'range|'reverse_range|'right|'rightof|'simple_name|'stable|'succ|'transaction|'val|'value|access|after|alias|all|architecture|array|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|constant|disconnect|downto|else|elsif|end|entity|exit|file|for|function|generate|generic|group|guarded|if|impure|in|inertial|inout|is|label|library|linkage|literal|loop|map|new|next|null|of|on|open|others|out|package|port|postponed|procedure|process|pure|range|record|register|reject|report|return|select|severity|shared|signal|subtype|then|to|transport|type|unaffected|units|until|use|variable|wait|when|while|with)\b/i,
      boolean: /\b(?:false|true)\b/i,
      function: /\w+(?=\()/,
      // decimal, based, physical, and exponential numbers supported
      number: /'[01uxzwlh-]'|\b(?:\d+#[\da-f_.]+#|\d[\d_.]*)(?:e[-+]?\d+)?/i,
      operator: /[<>]=?|:=|[-+*/&=]|\b(?:abs|and|mod|nand|nor|not|or|rem|rol|ror|sla|sll|sra|srl|xnor|xor)\b/i,
      punctuation: /[{}[\];(),.:]/
    };
  }
  return vhdl_1;
}
var vim_1;
var hasRequiredVim;
function requireVim() {
  if (hasRequiredVim) return vim_1;
  hasRequiredVim = 1;
  vim_1 = vim;
  vim.displayName = "vim";
  vim.aliases = [];
  function vim(Prism2) {
    Prism2.languages.vim = {
      string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
      comment: /".*/,
      function: /\b\w+(?=\()/,
      keyword: /\b(?:N|Next|P|Print|X|XMLent|XMLns|ab|abbreviate|abc|abclear|abo|aboveleft|al|all|ar|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|args|argu|argument|as|ascii|b|bN|bNext|ba|bad|badd|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bo|botright|bp|bprevious|br|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|brewind|bro|browse|bufdo|buffer|buffers|bun|bunload|bw|bwipeout|c|cN|cNext|cNfcNfile|ca|cabbrev|cabc|cabclear|cad|caddb|caddbuffer|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cg|cgetb|cgetbuffer|cgete|cgetexpr|cgetfile|change|changes|chd|chdir|che|checkpath|checkt|checktime|cl|cla|clast|clist|clo|close|cmapc|cmapclear|cn|cnew|cnewer|cnext|cnf|cnfile|cnorea|cnoreabbrev|co|col|colder|colo|colorscheme|comc|comclear|comp|compiler|con|conf|confirm|continue|cope|copen|copy|cp|cpf|cpfile|cprevious|cq|cquit|cr|crewind|cu|cuna|cunabbrev|cunmap|cw|cwindow|d|debugg|debuggreedy|delc|delcommand|delete|delf|delfunction|delm|delmarks|di|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|e|earlier|echoe|echoerr|echom|echomsg|echon|edit|el|else|elsei|elseif|em|emenu|en|endf|endfo|endfor|endfun|endfunction|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fin|fina|finally|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|foldd|folddoc|folddoclosed|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|h|ha|hardcopy|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iu|iuna|iunabbrev|iunmap|j|join|ju|jumps|k|kee|keepalt|keepj|keepjumps|keepmarks|l|lN|lNext|lNf|lNfile|la|lad|laddb|laddbuffer|laddexpr|laddf|laddfile|lan|language|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|left|lefta|leftabove|let|lex|lexpr|lf|lfile|lfir|lfirst|lg|lgetb|lgetbuffer|lgete|lgetexpr|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|list|ll|lla|llast|lli|llist|lm|lmak|lmake|lmap|lmapc|lmapclear|ln|lne|lnew|lnewer|lnext|lnf|lnfile|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lp|lpf|lpfile|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|m|ma|mak|make|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkv|mkvie|mkview|mkvimrc|mod|mode|move|mz|mzf|mzfile|mzscheme|n|nbkey|new|next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|o|omapc|omapclear|on|only|open|opt|options|ou|ounmap|p|pc|pclose|pe|ped|pedit|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|print|prof|profd|profdel|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|ptN|ptNext|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|py|pyf|pyfile|python|q|qa|qall|quit|quita|quitall|r|read|rec|recover|red|redi|redir|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|ru|rub|ruby|rubyd|rubydo|rubyf|rubyfile|runtime|rv|rviminfo|sN|sNext|sa|sal|sall|san|sandbox|sargument|sav|saveas|sb|sbN|sbNext|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbp|sbprevious|sbr|sbrewind|sbuffer|scrip|scripte|scriptencoding|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sl|sla|slast|sleep|sm|smagic|smap|smapc|smapclear|sme|smenu|sn|snext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|so|sor|sort|source|sp|spe|spelld|spelldump|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|split|spr|sprevious|sre|srewind|st|sta|stag|star|startg|startgreplace|startinsert|startr|startreplace|stj|stjump|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tN|tNext|ta|tab|tabN|tabNext|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabn|tabnew|tabnext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tmenu|tn|tnext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tunmenu|u|una|unabbreviate|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|ve|verb|verbose|version|vert|vertical|vi|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|w|wN|wNext|wa|wall|wh|while|win|winc|wincmd|windo|winp|winpos|winsize|wn|wnext|wp|wprevious|wq|wqa|wqall|write|ws|wsverb|wv|wviminfo|x|xa|xall|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
      builtin: /\b(?:acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autocmd|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|t_AB|t_AF|t_AL|t_CS|t_CV|t_Ce|t_Co|t_Cs|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_IE|t_IS|t_K1|t_K3|t_K4|t_K5|t_K6|t_K7|t_K8|t_K9|t_KA|t_KB|t_KC|t_KD|t_KE|t_KF|t_KG|t_KH|t_KI|t_KJ|t_KK|t_KL|t_RI|t_RV|t_SI|t_Sb|t_Sf|t_WP|t_WS|t_ZH|t_ZR|t_al|t_bc|t_cd|t_ce|t_cl|t_cm|t_cs|t_da|t_db|t_dl|t_fs|t_k1|t_k2|t_k3|t_k4|t_k5|t_k6|t_k7|t_k8|t_k9|t_kB|t_kD|t_kI|t_kN|t_kP|t_kb|t_kd|t_ke|t_kh|t_kl|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_se|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_xs|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww)\b/,
      number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
      operator: /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
      punctuation: /[{}[\](),;:]/
    };
  }
  return vim_1;
}
var visualBasic_1;
var hasRequiredVisualBasic;
function requireVisualBasic() {
  if (hasRequiredVisualBasic) return visualBasic_1;
  hasRequiredVisualBasic = 1;
  visualBasic_1 = visualBasic;
  visualBasic.displayName = "visualBasic";
  visualBasic.aliases = [];
  function visualBasic(Prism2) {
    Prism2.languages["visual-basic"] = {
      comment: {
        pattern: /(?:['‘’]|REM\b)(?:[^\r\n_]|_(?:\r\n?|\n)?)*/i,
        inside: {
          keyword: /^REM/i
        }
      },
      directive: {
        pattern: /#(?:Const|Else|ElseIf|End|ExternalChecksum|ExternalSource|If|Region)(?:\b_[ \t]*(?:\r\n?|\n)|.)+/i,
        alias: "property",
        greedy: true
      },
      string: {
        pattern: /\$?["“”](?:["“”]{2}|[^"“”])*["“”]C?/i,
        greedy: true
      },
      date: {
        pattern: /#[ \t]*(?:\d+([/-])\d+\1\d+(?:[ \t]+(?:\d+[ \t]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[ \t]*(?:AM|PM))?))?|\d+[ \t]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[ \t]*(?:AM|PM))?)[ \t]*#/i,
        alias: "number"
      },
      number: /(?:(?:\b\d+(?:\.\d+)?|\.\d+)(?:E[+-]?\d+)?|&[HO][\dA-F]+)(?:[FRD]|U?[ILS])?/i,
      boolean: /\b(?:False|Nothing|True)\b/i,
      keyword: /\b(?:AddHandler|AddressOf|Alias|And(?:Also)?|As|Boolean|ByRef|Byte|ByVal|Call|Case|Catch|C(?:Bool|Byte|Char|Date|Dbl|Dec|Int|Lng|Obj|SByte|Short|Sng|Str|Type|UInt|ULng|UShort)|Char|Class|Const|Continue|Currency|Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|Each|Else(?:If)?|End(?:If)?|Enum|Erase|Error|Event|Exit|Finally|For|Friend|Function|Get(?:Type|XMLNamespace)?|Global|GoSub|GoTo|Handles|If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|Let|Lib|Like|Long|Loop|Me|Mod|Module|Must(?:Inherit|Override)|My(?:Base|Class)|Namespace|Narrowing|New|Next|Not(?:Inheritable|Overridable)?|Object|Of|On|Operator|Option(?:al)?|Or(?:Else)?|Out|Overloads|Overridable|Overrides|ParamArray|Partial|Private|Property|Protected|Public|RaiseEvent|ReadOnly|ReDim|RemoveHandler|Resume|Return|SByte|Select|Set|Shadows|Shared|short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|Then|Throw|To|Try|TryCast|Type|TypeOf|U(?:Integer|Long|Short)|Until|Using|Variant|Wend|When|While|Widening|With(?:Events)?|WriteOnly|Xor)\b/i,
      operator: /[+\-*/\\^<=>&#@$%!]|\b_(?=[ \t]*[\r\n])/,
      punctuation: /[{}().,:?]/
    };
    Prism2.languages.vb = Prism2.languages["visual-basic"];
    Prism2.languages.vba = Prism2.languages["visual-basic"];
  }
  return visualBasic_1;
}
var warpscript_1;
var hasRequiredWarpscript;
function requireWarpscript() {
  if (hasRequiredWarpscript) return warpscript_1;
  hasRequiredWarpscript = 1;
  warpscript_1 = warpscript;
  warpscript.displayName = "warpscript";
  warpscript.aliases = [];
  function warpscript(Prism2) {
    Prism2.languages.warpscript = {
      comment: /#.*|\/\/.*|\/\*[\s\S]*?\*\//,
      string: {
        pattern: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'|<'(?:[^\\']|'(?!>)|\\.)*'>/,
        greedy: true
      },
      variable: /\$\S+/,
      macro: {
        pattern: /@\S+/,
        alias: "property"
      },
      // WarpScript doesn't have any keywords, these are all functions under the control category
      // https://www.warp10.io/tags/control
      keyword: /\b(?:BREAK|CHECKMACRO|CONTINUE|CUDF|DEFINED|DEFINEDMACRO|EVAL|FAIL|FOR|FOREACH|FORSTEP|IFT|IFTE|MSGFAIL|NRETURN|RETHROW|RETURN|SWITCH|TRY|UDF|UNTIL|WHILE)\b/,
      number: /[+-]?\b(?:NaN|Infinity|\d+(?:\.\d*)?(?:[Ee][+-]?\d+)?|0x[\da-fA-F]+|0b[01]+)\b/,
      boolean: /\b(?:F|T|false|true)\b/,
      punctuation: /<%|%>|[{}[\]()]/,
      // Some operators from the "operators" category
      // https://www.warp10.io/tags/operators
      operator: /==|&&?|\|\|?|\*\*?|>>>?|<<|[<>!~]=?|[-/%^]|\+!?|\b(?:AND|NOT|OR)\b/
    };
  }
  return warpscript_1;
}
var wasm_1;
var hasRequiredWasm;
function requireWasm() {
  if (hasRequiredWasm) return wasm_1;
  hasRequiredWasm = 1;
  wasm_1 = wasm;
  wasm.displayName = "wasm";
  wasm.aliases = [];
  function wasm(Prism2) {
    Prism2.languages.wasm = {
      comment: [
        /\(;[\s\S]*?;\)/,
        {
          pattern: /;;.*/,
          greedy: true
        }
      ],
      string: {
        pattern: /"(?:\\[\s\S]|[^"\\])*"/,
        greedy: true
      },
      keyword: [
        {
          pattern: /\b(?:align|offset)=/,
          inside: {
            operator: /=/
          }
        },
        {
          pattern: /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|neg?|nearest|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|sqrt|store(?:8|16|32)?|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
          inside: {
            punctuation: /\./
          }
        },
        /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/
      ],
      variable: /\$[\w!#$%&'*+\-./:<=>?@\\^`|~]+/,
      number: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
      punctuation: /[()]/
    };
  }
  return wasm_1;
}
var webIdl_1;
var hasRequiredWebIdl;
function requireWebIdl() {
  if (hasRequiredWebIdl) return webIdl_1;
  hasRequiredWebIdl = 1;
  webIdl_1 = webIdl;
  webIdl.displayName = "webIdl";
  webIdl.aliases = [];
  function webIdl(Prism2) {
    (function(Prism3) {
      var id = /(?:\B-|\b_|\b)[A-Za-z][\w-]*(?![\w-])/.source;
      var type = "(?:" + /\b(?:unsigned\s+)?long\s+long(?![\w-])/.source + "|" + /\b(?:unrestricted|unsigned)\s+[a-z]+(?![\w-])/.source + "|" + /(?!(?:unrestricted|unsigned)\b)/.source + id + /(?:\s*<(?:[^<>]|<[^<>]*>)*>)?/.source + ")" + /(?:\s*\?)?/.source;
      var typeInside = {};
      Prism3.languages["web-idl"] = {
        comment: {
          pattern: /\/\/.*|\/\*[\s\S]*?\*\//,
          greedy: true
        },
        string: {
          pattern: /"[^"]*"/,
          greedy: true
        },
        namespace: {
          pattern: RegExp(/(\bnamespace\s+)/.source + id),
          lookbehind: true
        },
        "class-name": [
          {
            pattern: /(^|[^\w-])(?:iterable|maplike|setlike)\s*<(?:[^<>]|<[^<>]*>)*>/,
            lookbehind: true,
            inside: typeInside
          },
          {
            pattern: RegExp(
              /(\b(?:attribute|const|deleter|getter|optional|setter)\s+)/.source + type
            ),
            lookbehind: true,
            inside: typeInside
          },
          {
            // callback return type
            pattern: RegExp(
              "(" + /\bcallback\s+/.source + id + /\s*=\s*/.source + ")" + type
            ),
            lookbehind: true,
            inside: typeInside
          },
          {
            // typedef
            pattern: RegExp(/(\btypedef\b\s*)/.source + type),
            lookbehind: true,
            inside: typeInside
          },
          {
            pattern: RegExp(
              /(\b(?:callback|dictionary|enum|interface(?:\s+mixin)?)\s+)(?!(?:interface|mixin)\b)/.source + id
            ),
            lookbehind: true
          },
          {
            // inheritance
            pattern: RegExp(/(:\s*)/.source + id),
            lookbehind: true
          },
          // includes and implements
          RegExp(id + /(?=\s+(?:implements|includes)\b)/.source),
          {
            pattern: RegExp(/(\b(?:implements|includes)\s+)/.source + id),
            lookbehind: true
          },
          {
            // function return type, parameter types, and dictionary members
            pattern: RegExp(
              type + "(?=" + /\s*(?:\.{3}\s*)?/.source + id + /\s*[(),;=]/.source + ")"
            ),
            inside: typeInside
          }
        ],
        builtin: /\b(?:ArrayBuffer|BigInt64Array|BigUint64Array|ByteString|DOMString|DataView|Float32Array|Float64Array|FrozenArray|Int16Array|Int32Array|Int8Array|ObservableArray|Promise|USVString|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray)\b/,
        keyword: [
          /\b(?:async|attribute|callback|const|constructor|deleter|dictionary|enum|getter|implements|includes|inherit|interface|mixin|namespace|null|optional|or|partial|readonly|required|setter|static|stringifier|typedef|unrestricted)\b/,
          // type keywords
          /\b(?:any|bigint|boolean|byte|double|float|iterable|long|maplike|object|octet|record|sequence|setlike|short|symbol|undefined|unsigned|void)\b/
        ],
        boolean: /\b(?:false|true)\b/,
        number: {
          pattern: /(^|[^\w-])-?(?:0x[0-9a-f]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|NaN|Infinity)(?![\w-])/i,
          lookbehind: true
        },
        operator: /\.{3}|[=:?<>-]/,
        punctuation: /[(){}[\].,;]/
      };
      for (var key in Prism3.languages["web-idl"]) {
        if (key !== "class-name") {
          typeInside[key] = Prism3.languages["web-idl"][key];
        }
      }
      Prism3.languages["webidl"] = Prism3.languages["web-idl"];
    })(Prism2);
  }
  return webIdl_1;
}
var wiki_1;
var hasRequiredWiki;
function requireWiki() {
  if (hasRequiredWiki) return wiki_1;
  hasRequiredWiki = 1;
  wiki_1 = wiki;
  wiki.displayName = "wiki";
  wiki.aliases = [];
  function wiki(Prism2) {
    Prism2.languages.wiki = Prism2.languages.extend("markup", {
      "block-comment": {
        pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
        lookbehind: true,
        alias: "comment"
      },
      heading: {
        pattern: /^(=+)[^=\r\n].*?\1/m,
        inside: {
          punctuation: /^=+|=+$/,
          important: /.+/
        }
      },
      emphasis: {
        // TODO Multi-line
        pattern: /('{2,5}).+?\1/,
        inside: {
          "bold-italic": {
            pattern: /(''''').+?(?=\1)/,
            lookbehind: true,
            alias: ["bold", "italic"]
          },
          bold: {
            pattern: /(''')[^'](?:.*?[^'])?(?=\1)/,
            lookbehind: true
          },
          italic: {
            pattern: /('')[^'](?:.*?[^'])?(?=\1)/,
            lookbehind: true
          },
          punctuation: /^''+|''+$/
        }
      },
      hr: {
        pattern: /^-{4,}/m,
        alias: "punctuation"
      },
      url: [
        /ISBN +(?:97[89][ -]?)?(?:\d[ -]?){9}[\dx]\b|(?:PMID|RFC) +\d+/i,
        /\[\[.+?\]\]|\[.+?\]/
      ],
      variable: [
        /__[A-Z]+__/,
        // FIXME Nested structures should be handled
        // {{formatnum:{{#expr:{{{3}}}}}}}
        /\{{3}.+?\}{3}/,
        /\{\{.+?\}\}/
      ],
      symbol: [/^#redirect/im, /~{3,5}/],
      // Handle table attrs:
      // {|
      // ! style="text-align:left;"| Item
      // |}
      "table-tag": {
        pattern: /((?:^|[|!])[|!])[^|\r\n]+\|(?!\|)/m,
        lookbehind: true,
        inside: {
          "table-bar": {
            pattern: /\|$/,
            alias: "punctuation"
          },
          rest: Prism2.languages.markup["tag"].inside
        }
      },
      punctuation: /^(?:\{\||\|\}|\|-|[*#:;!|])|\|\||!!/m
    });
    Prism2.languages.insertBefore("wiki", "tag", {
      // Prevent highlighting inside <nowiki>, <source> and <pre> tags
      nowiki: {
        pattern: /<(nowiki|pre|source)\b[^>]*>[\s\S]*?<\/\1>/i,
        inside: {
          tag: {
            pattern: /<(?:nowiki|pre|source)\b[^>]*>|<\/(?:nowiki|pre|source)>/i,
            inside: Prism2.languages.markup["tag"].inside
          }
        }
      }
    });
  }
  return wiki_1;
}
var wolfram_1;
var hasRequiredWolfram;
function requireWolfram() {
  if (hasRequiredWolfram) return wolfram_1;
  hasRequiredWolfram = 1;
  wolfram_1 = wolfram;
  wolfram.displayName = "wolfram";
  wolfram.aliases = ["mathematica", "wl", "nb"];
  function wolfram(Prism2) {
    Prism2.languages.wolfram = {
      // Allow one level of nesting - note: regex taken from applescipt
      comment: /\(\*(?:\(\*(?:[^*]|\*(?!\)))*\*\)|(?!\(\*)[\s\S])*?\*\)/,
      string: {
        pattern: /"(?:\\.|[^"\\\r\n])*"/,
        greedy: true
      },
      keyword: /\b(?:Abs|AbsArg|Accuracy|Block|Do|For|Function|If|Manipulate|Module|Nest|NestList|None|Return|Switch|Table|Which|While)\b/,
      context: {
        pattern: /\b\w+`+\w*/,
        alias: "class-name"
      },
      blank: {
        pattern: /\b\w+_\b/,
        alias: "regex"
      },
      "global-variable": {
        pattern: /\$\w+/,
        alias: "variable"
      },
      boolean: /\b(?:False|True)\b/,
      number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?j?\b/i,
      operator: /\/\.|;|=\.|\^=|\^:=|:=|<<|>>|<\||\|>|:>|\|->|->|<-|@@@|@@|@|\/@|=!=|===|==|=|\+|-|\^|\[\/-+%=\]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
      punctuation: /[{}[\];(),.:]/
    };
    Prism2.languages.mathematica = Prism2.languages.wolfram;
    Prism2.languages.wl = Prism2.languages.wolfram;
    Prism2.languages.nb = Prism2.languages.wolfram;
  }
  return wolfram_1;
}
var wren_1;
var hasRequiredWren;
function requireWren() {
  if (hasRequiredWren) return wren_1;
  hasRequiredWren = 1;
  wren_1 = wren;
  wren.displayName = "wren";
  wren.aliases = [];
  function wren(Prism2) {
    Prism2.languages.wren = {
      // Multiline comments in Wren can have nested multiline comments
      // Comments: // and /* */
      comment: [
        {
          // support 3 levels of nesting
          // regex: \/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\/
          pattern: /\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|\/\*(?:[^*/]|\*(?!\/)|\/(?!\*))*\*\/)*\*\/)*\*\//,
          greedy: true
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      // Triple quoted strings are multiline but cannot have interpolation (raw strings)
      // Based on prism-python.js
      "triple-quoted-string": {
        pattern: /"""[\s\S]*?"""/,
        greedy: true,
        alias: "string"
      },
      // see below
      "string-literal": null,
      // #!/usr/bin/env wren on the first line
      hashbang: {
        pattern: /^#!\/.+/,
        greedy: true,
        alias: "comment"
      },
      // Attributes are special keywords to add meta data to classes
      attribute: {
        // #! attributes are stored in class properties
        // #!myvar = true
        // #attributes are not stored and dismissed at compilation
        pattern: /#!?[ \t\u3000]*\w+/,
        alias: "keyword"
      },
      "class-name": [
        {
          // class definition
          // class Meta {}
          pattern: /(\bclass\s+)\w+/,
          lookbehind: true
        },
        // A class must always start with an uppercase.
        // File.read
        /\b[A-Z][a-z\d_]*\b/
      ],
      // A constant can be a variable, class, property or method. Just named in all uppercase letters
      constant: /\b[A-Z][A-Z\d_]*\b/,
      null: {
        pattern: /\bnull\b/,
        alias: "keyword"
      },
      keyword: /\b(?:as|break|class|construct|continue|else|for|foreign|if|import|in|is|return|static|super|this|var|while)\b/,
      boolean: /\b(?:false|true)\b/,
      number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i,
      // Functions can be Class.method()
      function: /\b[a-z_]\w*(?=\s*[({])/i,
      operator: /<<|>>|[=!<>]=?|&&|\|\||[-+*/%~^&|?:]|\.{2,3}/,
      punctuation: /[\[\](){}.,;]/
    };
    Prism2.languages.wren["string-literal"] = {
      // A single quote string is multiline and can have interpolation (similar to JS backticks ``)
      pattern: /(^|[^\\"])"(?:[^\\"%]|\\[\s\S]|%(?!\()|%\((?:[^()]|\((?:[^()]|\([^)]*\))*\))*\))*"/,
      lookbehind: true,
      greedy: true,
      inside: {
        interpolation: {
          // "%(interpolation)"
          pattern: /((?:^|[^\\])(?:\\{2})*)%\((?:[^()]|\((?:[^()]|\([^)]*\))*\))*\)/,
          lookbehind: true,
          inside: {
            expression: {
              pattern: /^(%\()[\s\S]+(?=\)$)/,
              lookbehind: true,
              inside: Prism2.languages.wren
            },
            "interpolation-punctuation": {
              pattern: /^%\(|\)$/,
              alias: "punctuation"
            }
          }
        },
        string: /[\s\S]+/
      }
    };
  }
  return wren_1;
}
var xeora_1;
var hasRequiredXeora;
function requireXeora() {
  if (hasRequiredXeora) return xeora_1;
  hasRequiredXeora = 1;
  xeora_1 = xeora;
  xeora.displayName = "xeora";
  xeora.aliases = ["xeoracube"];
  function xeora(Prism2) {
    (function(Prism3) {
      Prism3.languages.xeora = Prism3.languages.extend("markup", {
        constant: {
          pattern: /\$(?:DomainContents|PageRenderDuration)\$/,
          inside: {
            punctuation: {
              pattern: /\$/
            }
          }
        },
        variable: {
          pattern: /\$@?(?:#+|[-+*~=^])?[\w.]+\$/,
          inside: {
            punctuation: {
              pattern: /[$.]/
            },
            operator: {
              pattern: /#+|[-+*~=^@]/
            }
          }
        },
        "function-inline": {
          pattern: /\$F:[-\w.]+\?[-\w.]+(?:,(?:(?:@[-#]*\w+\.[\w+.]\.*)*\|)*(?:(?:[\w+]|[-#*.~^]+[\w+]|=\S)(?:[^$=]|=+[^=])*=*|(?:@[-#]*\w+\.[\w+.]\.*)+(?:(?:[\w+]|[-#*~^][-#*.~^]*[\w+]|=\S)(?:[^$=]|=+[^=])*=*)?)?)?\$/,
          inside: {
            variable: {
              pattern: /(?:[,|])@?(?:#+|[-+*~=^])?[\w.]+/,
              inside: {
                punctuation: {
                  pattern: /[,.|]/
                },
                operator: {
                  pattern: /#+|[-+*~=^@]/
                }
              }
            },
            punctuation: {
              pattern: /\$\w:|[$:?.,|]/
            }
          },
          alias: "function"
        },
        "function-block": {
          pattern: /\$XF:\{[-\w.]+\?[-\w.]+(?:,(?:(?:@[-#]*\w+\.[\w+.]\.*)*\|)*(?:(?:[\w+]|[-#*.~^]+[\w+]|=\S)(?:[^$=]|=+[^=])*=*|(?:@[-#]*\w+\.[\w+.]\.*)+(?:(?:[\w+]|[-#*~^][-#*.~^]*[\w+]|=\S)(?:[^$=]|=+[^=])*=*)?)?)?\}:XF\$/,
          inside: {
            punctuation: {
              pattern: /[$:{}?.,|]/
            }
          },
          alias: "function"
        },
        "directive-inline": {
          pattern: /\$\w(?:#\d+\+?)?(?:\[[-\w.]+\])?:[-\/\w.]+\$/,
          inside: {
            punctuation: {
              pattern: /\$(?:\w:|C(?:\[|#\d))?|[:{[\]]/,
              inside: {
                tag: {
                  pattern: /#\d/
                }
              }
            }
          },
          alias: "function"
        },
        "directive-block-open": {
          pattern: /\$\w+:\{|\$\w(?:#\d+\+?)?(?:\[[-\w.]+\])?:[-\w.]+:\{(?:![A-Z]+)?/,
          inside: {
            punctuation: {
              pattern: /\$(?:\w:|C(?:\[|#\d))?|[:{[\]]/,
              inside: {
                tag: {
                  pattern: /#\d/
                }
              }
            },
            attribute: {
              pattern: /![A-Z]+$/,
              inside: {
                punctuation: {
                  pattern: /!/
                }
              },
              alias: "keyword"
            }
          },
          alias: "function"
        },
        "directive-block-separator": {
          pattern: /\}:[-\w.]+:\{/,
          inside: {
            punctuation: {
              pattern: /[:{}]/
            }
          },
          alias: "function"
        },
        "directive-block-close": {
          pattern: /\}:[-\w.]+\$/,
          inside: {
            punctuation: {
              pattern: /[:{}$]/
            }
          },
          alias: "function"
        }
      });
      Prism3.languages.insertBefore(
        "inside",
        "punctuation",
        {
          variable: Prism3.languages.xeora["function-inline"].inside["variable"]
        },
        Prism3.languages.xeora["function-block"]
      );
      Prism3.languages.xeoracube = Prism3.languages.xeora;
    })(Prism2);
  }
  return xeora_1;
}
var xmlDoc_1;
var hasRequiredXmlDoc;
function requireXmlDoc() {
  if (hasRequiredXmlDoc) return xmlDoc_1;
  hasRequiredXmlDoc = 1;
  xmlDoc_1 = xmlDoc;
  xmlDoc.displayName = "xmlDoc";
  xmlDoc.aliases = [];
  function xmlDoc(Prism2) {
    (function(Prism3) {
      function insertDocComment(lang, docComment) {
        if (Prism3.languages[lang]) {
          Prism3.languages.insertBefore(lang, "comment", {
            "doc-comment": docComment
          });
        }
      }
      var tag = Prism3.languages.markup.tag;
      var slashDocComment = {
        pattern: /\/\/\/.*/,
        greedy: true,
        alias: "comment",
        inside: {
          tag
        }
      };
      var tickDocComment = {
        pattern: /'''.*/,
        greedy: true,
        alias: "comment",
        inside: {
          tag
        }
      };
      insertDocComment("csharp", slashDocComment);
      insertDocComment("fsharp", slashDocComment);
      insertDocComment("vbnet", tickDocComment);
    })(Prism2);
  }
  return xmlDoc_1;
}
var xojo_1;
var hasRequiredXojo;
function requireXojo() {
  if (hasRequiredXojo) return xojo_1;
  hasRequiredXojo = 1;
  xojo_1 = xojo;
  xojo.displayName = "xojo";
  xojo.aliases = [];
  function xojo(Prism2) {
    Prism2.languages.xojo = {
      comment: {
        pattern: /(?:'|\/\/|Rem\b).+/i,
        greedy: true
      },
      string: {
        pattern: /"(?:""|[^"])*"/,
        greedy: true
      },
      number: [/(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:E[+-]?\d+)?/i, /&[bchou][a-z\d]+/i],
      directive: {
        pattern: /#(?:Else|ElseIf|Endif|If|Pragma)\b/i,
        alias: "property"
      },
      keyword: /\b(?:AddHandler|App|Array|As(?:signs)?|Auto|Boolean|Break|By(?:Ref|Val)|Byte|Call|Case|Catch|CFStringRef|CGFloat|Class|Color|Const|Continue|CString|Currency|CurrentMethodName|Declare|Delegate|Dim|Do(?:uble|wnTo)?|Each|Else(?:If)?|End|Enumeration|Event|Exception|Exit|Extends|False|Finally|For|Function|Get|GetTypeInfo|Global|GOTO|If|Implements|In|Inherits|Int(?:8|16|32|64|eger|erface)?|Lib|Loop|Me|Module|Next|Nil|Object|Optional|OSType|ParamArray|Private|Property|Protected|PString|Ptr|Raise(?:Event)?|ReDim|RemoveHandler|Return|Select(?:or)?|Self|Set|Shared|Short|Single|Soft|Static|Step|String|Sub|Super|Text|Then|To|True|Try|Ubound|UInt(?:8|16|32|64|eger)?|Until|Using|Var(?:iant)?|Wend|While|WindowPtr|WString)\b/i,
      operator: /<[=>]?|>=?|[+\-*\/\\^=]|\b(?:AddressOf|And|Ctype|IsA?|Mod|New|Not|Or|WeakAddressOf|Xor)\b/i,
      punctuation: /[.,;:()]/
    };
  }
  return xojo_1;
}
var xquery_1;
var hasRequiredXquery;
function requireXquery() {
  if (hasRequiredXquery) return xquery_1;
  hasRequiredXquery = 1;
  xquery_1 = xquery;
  xquery.displayName = "xquery";
  xquery.aliases = [];
  function xquery(Prism2) {
    (function(Prism3) {
      Prism3.languages.xquery = Prism3.languages.extend("markup", {
        "xquery-comment": {
          pattern: /\(:[\s\S]*?:\)/,
          greedy: true,
          alias: "comment"
        },
        string: {
          pattern: /(["'])(?:\1\1|(?!\1)[\s\S])*\1/,
          greedy: true
        },
        extension: {
          pattern: /\(#.+?#\)/,
          alias: "symbol"
        },
        variable: /\$[-\w:]+/,
        axis: {
          pattern: /(^|[^-])(?:ancestor(?:-or-self)?|attribute|child|descendant(?:-or-self)?|following(?:-sibling)?|parent|preceding(?:-sibling)?|self)(?=::)/,
          lookbehind: true,
          alias: "operator"
        },
        "keyword-operator": {
          pattern: /(^|[^:-])\b(?:and|castable as|div|eq|except|ge|gt|idiv|instance of|intersect|is|le|lt|mod|ne|or|union)\b(?=$|[^:-])/,
          lookbehind: true,
          alias: "operator"
        },
        keyword: {
          pattern: /(^|[^:-])\b(?:as|ascending|at|base-uri|boundary-space|case|cast as|collation|construction|copy-namespaces|declare|default|descending|else|empty (?:greatest|least)|encoding|every|external|for|function|if|import|in|inherit|lax|let|map|module|namespace|no-inherit|no-preserve|option|order(?: by|ed|ing)?|preserve|return|satisfies|schema|some|stable|strict|strip|then|to|treat as|typeswitch|unordered|validate|variable|version|where|xquery)\b(?=$|[^:-])/,
          lookbehind: true
        },
        function: /[\w-]+(?::[\w-]+)*(?=\s*\()/,
        "xquery-element": {
          pattern: /(element\s+)[\w-]+(?::[\w-]+)*/,
          lookbehind: true,
          alias: "tag"
        },
        "xquery-attribute": {
          pattern: /(attribute\s+)[\w-]+(?::[\w-]+)*/,
          lookbehind: true,
          alias: "attr-name"
        },
        builtin: {
          pattern: /(^|[^:-])\b(?:attribute|comment|document|element|processing-instruction|text|xs:(?:ENTITIES|ENTITY|ID|IDREFS?|NCName|NMTOKENS?|NOTATION|Name|QName|anyAtomicType|anyType|anyURI|base64Binary|boolean|byte|date|dateTime|dayTimeDuration|decimal|double|duration|float|gDay|gMonth|gMonthDay|gYear|gYearMonth|hexBinary|int|integer|language|long|negativeInteger|nonNegativeInteger|nonPositiveInteger|normalizedString|positiveInteger|short|string|time|token|unsigned(?:Byte|Int|Long|Short)|untyped(?:Atomic)?|yearMonthDuration))\b(?=$|[^:-])/,
          lookbehind: true
        },
        number: /\b\d+(?:\.\d+)?(?:E[+-]?\d+)?/,
        operator: [
          /[+*=?|@]|\.\.?|:=|!=|<[=<]?|>[=>]?/,
          {
            pattern: /(\s)-(?=\s)/,
            lookbehind: true
          }
        ],
        punctuation: /[[\](){},;:/]/
      });
      Prism3.languages.xquery.tag.pattern = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|\{(?!\{)(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/;
      Prism3.languages.xquery["tag"].inside["attr-value"].pattern = /=(?:("|')(?:\\[\s\S]|\{(?!\{)(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}|(?!\1)[^\\])*\1|[^\s'">=]+)/;
      Prism3.languages.xquery["tag"].inside["attr-value"].inside["punctuation"] = /^="|"$/;
      Prism3.languages.xquery["tag"].inside["attr-value"].inside["expression"] = {
        // Allow for two levels of nesting
        pattern: /\{(?!\{)(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])+\}/,
        inside: Prism3.languages.xquery,
        alias: "language-xquery"
      };
      var stringifyToken = function(token) {
        if (typeof token === "string") {
          return token;
        }
        if (typeof token.content === "string") {
          return token.content;
        }
        return token.content.map(stringifyToken).join("");
      };
      var walkTokens = function(tokens) {
        var openedTags = [];
        for (var i = 0; i < tokens.length; i++) {
          var token = tokens[i];
          var notTagNorBrace = false;
          if (typeof token !== "string") {
            if (token.type === "tag" && token.content[0] && token.content[0].type === "tag") {
              if (token.content[0].content[0].content === "</") {
                if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {
                  openedTags.pop();
                }
              } else {
                if (token.content[token.content.length - 1].content === "/>") ;
                else {
                  openedTags.push({
                    tagName: stringifyToken(token.content[0].content[1]),
                    openedBraces: 0
                  });
                }
              }
            } else if (openedTags.length > 0 && token.type === "punctuation" && token.content === "{" && // Ignore `{{`
            (!tokens[i + 1] || tokens[i + 1].type !== "punctuation" || tokens[i + 1].content !== "{") && (!tokens[i - 1] || tokens[i - 1].type !== "plain-text" || tokens[i - 1].content !== "{")) {
              openedTags[openedTags.length - 1].openedBraces++;
            } else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === "punctuation" && token.content === "}") {
              openedTags[openedTags.length - 1].openedBraces--;
            } else if (token.type !== "comment") {
              notTagNorBrace = true;
            }
          }
          if (notTagNorBrace || typeof token === "string") {
            if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
              var plainText = stringifyToken(token);
              if (i < tokens.length - 1 && (typeof tokens[i + 1] === "string" || tokens[i + 1].type === "plain-text")) {
                plainText += stringifyToken(tokens[i + 1]);
                tokens.splice(i + 1, 1);
              }
              if (i > 0 && (typeof tokens[i - 1] === "string" || tokens[i - 1].type === "plain-text")) {
                plainText = stringifyToken(tokens[i - 1]) + plainText;
                tokens.splice(i - 1, 1);
                i--;
              }
              if (/^\s+$/.test(plainText)) {
                tokens[i] = plainText;
              } else {
                tokens[i] = new Prism3.Token(
                  "plain-text",
                  plainText,
                  null,
                  plainText
                );
              }
            }
          }
          if (token.content && typeof token.content !== "string") {
            walkTokens(token.content);
          }
        }
      };
      Prism3.hooks.add("after-tokenize", function(env) {
        if (env.language !== "xquery") {
          return;
        }
        walkTokens(env.tokens);
      });
    })(Prism2);
  }
  return xquery_1;
}
var yang_1;
var hasRequiredYang;
function requireYang() {
  if (hasRequiredYang) return yang_1;
  hasRequiredYang = 1;
  yang_1 = yang;
  yang.displayName = "yang";
  yang.aliases = [];
  function yang(Prism2) {
    Prism2.languages.yang = {
      // https://tools.ietf.org/html/rfc6020#page-34
      // http://www.yang-central.org/twiki/bin/view/Main/YangExamples
      comment: /\/\*[\s\S]*?\*\/|\/\/.*/,
      string: {
        pattern: /"(?:[^\\"]|\\.)*"|'[^']*'/,
        greedy: true
      },
      keyword: {
        pattern: /(^|[{};\r\n][ \t]*)[a-z_][\w.-]*/i,
        lookbehind: true
      },
      namespace: {
        pattern: /(\s)[a-z_][\w.-]*(?=:)/i,
        lookbehind: true
      },
      boolean: /\b(?:false|true)\b/,
      operator: /\+/,
      punctuation: /[{};:]/
    };
  }
  return yang_1;
}
var zig_1;
var hasRequiredZig;
function requireZig() {
  if (hasRequiredZig) return zig_1;
  hasRequiredZig = 1;
  zig_1 = zig;
  zig.displayName = "zig";
  zig.aliases = [];
  function zig(Prism2) {
    (function(Prism3) {
      function literal(str) {
        return function() {
          return str;
        };
      }
      var keyword = /\b(?:align|allowzero|and|anyframe|anytype|asm|async|await|break|cancel|catch|comptime|const|continue|defer|else|enum|errdefer|error|export|extern|fn|for|if|inline|linksection|nakedcc|noalias|nosuspend|null|or|orelse|packed|promise|pub|resume|return|stdcallcc|struct|suspend|switch|test|threadlocal|try|undefined|union|unreachable|usingnamespace|var|volatile|while)\b/;
      var IDENTIFIER = "\\b(?!" + keyword.source + ")(?!\\d)\\w+\\b";
      var ALIGN = /align\s*\((?:[^()]|\([^()]*\))*\)/.source;
      var PREFIX_TYPE_OP = /(?:\?|\bpromise->|(?:\[[^[\]]*\]|\*(?!\*)|\*\*)(?:\s*<ALIGN>|\s*const\b|\s*volatile\b|\s*allowzero\b)*)/.source.replace(
        /<ALIGN>/g,
        literal(ALIGN)
      );
      var SUFFIX_EXPR = /(?:\bpromise\b|(?:\berror\.)?<ID>(?:\.<ID>)*(?!\s+<ID>))/.source.replace(
        /<ID>/g,
        literal(IDENTIFIER)
      );
      var TYPE = "(?!\\s)(?:!?\\s*(?:" + PREFIX_TYPE_OP + "\\s*)*" + SUFFIX_EXPR + ")+";
      Prism3.languages.zig = {
        comment: [
          {
            pattern: /\/\/[/!].*/,
            alias: "doc-comment"
          },
          /\/{2}.*/
        ],
        string: [
          {
            // "string" and c"string"
            pattern: /(^|[^\\@])c?"(?:[^"\\\r\n]|\\.)*"/,
            lookbehind: true,
            greedy: true
          },
          {
            // multiline strings and c-strings
            pattern: /([\r\n])([ \t]+c?\\{2}).*(?:(?:\r\n?|\n)\2.*)*/,
            lookbehind: true,
            greedy: true
          }
        ],
        char: {
          // characters 'a', '\n', '\xFF', '\u{10FFFF}'
          pattern: /(^|[^\\])'(?:[^'\\\r\n]|[\uD800-\uDFFF]{2}|\\(?:.|x[a-fA-F\d]{2}|u\{[a-fA-F\d]{1,6}\}))'/,
          lookbehind: true,
          greedy: true
        },
        builtin: /\B@(?!\d)\w+(?=\s*\()/,
        label: {
          pattern: /(\b(?:break|continue)\s*:\s*)\w+\b|\b(?!\d)\w+\b(?=\s*:\s*(?:\{|while\b))/,
          lookbehind: true
        },
        "class-name": [
          // const Foo = struct {};
          /\b(?!\d)\w+(?=\s*=\s*(?:(?:extern|packed)\s+)?(?:enum|struct|union)\s*[({])/,
          {
            // const x: i32 = 9;
            // var x: Bar;
            // fn foo(x: bool, y: f32) void {}
            pattern: RegExp(
              /(:\s*)<TYPE>(?=\s*(?:<ALIGN>\s*)?[=;,)])|<TYPE>(?=\s*(?:<ALIGN>\s*)?\{)/.source.replace(/<TYPE>/g, literal(TYPE)).replace(/<ALIGN>/g, literal(ALIGN))
            ),
            lookbehind: true,
            inside: null
            // see below
          },
          {
            // extern fn foo(x: f64) f64; (optional alignment)
            pattern: RegExp(
              /(\)\s*)<TYPE>(?=\s*(?:<ALIGN>\s*)?;)/.source.replace(/<TYPE>/g, literal(TYPE)).replace(/<ALIGN>/g, literal(ALIGN))
            ),
            lookbehind: true,
            inside: null
            // see below
          }
        ],
        "builtin-type": {
          pattern: /\b(?:anyerror|bool|c_u?(?:int|long|longlong|short)|c_longdouble|c_void|comptime_(?:float|int)|f(?:16|32|64|128)|[iu](?:8|16|32|64|128|size)|noreturn|type|void)\b/,
          alias: "keyword"
        },
        keyword,
        function: /\b(?!\d)\w+(?=\s*\()/,
        number: /\b(?:0b[01]+|0o[0-7]+|0x[a-fA-F\d]+(?:\.[a-fA-F\d]*)?(?:[pP][+-]?[a-fA-F\d]+)?|\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)\b/,
        boolean: /\b(?:false|true)\b/,
        operator: /\.[*?]|\.{2,3}|[-=]>|\*\*|\+\+|\|\||(?:<<|>>|[-+*]%|[-+*/%^&|<>!=])=?|[?~]/,
        punctuation: /[.:,;(){}[\]]/
      };
      Prism3.languages.zig["class-name"].forEach(function(obj) {
        if (obj.inside === null) {
          obj.inside = Prism3.languages.zig;
        }
      });
    })(Prism2);
  }
  return zig_1;
}
var refractor = core;
var refractor_1 = refractor;
refractor.register(requireAbap());
refractor.register(requireAbnf());
refractor.register(requireActionscript());
refractor.register(requireAda());
refractor.register(requireAgda());
refractor.register(requireAl());
refractor.register(requireAntlr4());
refractor.register(requireApacheconf());
refractor.register(requireApex());
refractor.register(requireApl());
refractor.register(requireApplescript());
refractor.register(requireAql());
refractor.register(requireArduino());
refractor.register(requireArff());
refractor.register(requireAsciidoc());
refractor.register(requireAsm6502());
refractor.register(requireAsmatmel());
refractor.register(requireAspnet());
refractor.register(requireAutohotkey());
refractor.register(requireAutoit());
refractor.register(requireAvisynth());
refractor.register(requireAvroIdl());
refractor.register(requireBash());
refractor.register(requireBasic());
refractor.register(requireBatch());
refractor.register(requireBbcode());
refractor.register(requireBicep());
refractor.register(requireBirb());
refractor.register(requireBison());
refractor.register(requireBnf());
refractor.register(requireBrainfuck());
refractor.register(requireBrightscript());
refractor.register(requireBro());
refractor.register(requireBsl());
refractor.register(requireC());
refractor.register(requireCfscript());
refractor.register(requireChaiscript());
refractor.register(requireCil());
refractor.register(requireClojure());
refractor.register(requireCmake());
refractor.register(requireCobol());
refractor.register(requireCoffeescript());
refractor.register(requireConcurnas());
refractor.register(requireCoq());
refractor.register(requireCpp());
refractor.register(requireCrystal());
refractor.register(requireCsharp());
refractor.register(requireCshtml());
refractor.register(requireCsp());
refractor.register(requireCssExtras());
refractor.register(requireCsv());
refractor.register(requireCypher());
refractor.register(requireD());
refractor.register(requireDart());
refractor.register(requireDataweave());
refractor.register(requireDax());
refractor.register(requireDhall());
refractor.register(requireDiff());
refractor.register(requireDjango());
refractor.register(requireDnsZoneFile());
refractor.register(requireDocker());
refractor.register(requireDot());
refractor.register(requireEbnf());
refractor.register(requireEditorconfig());
refractor.register(requireEiffel());
refractor.register(requireEjs());
refractor.register(requireElixir());
refractor.register(requireElm());
refractor.register(requireErb());
refractor.register(requireErlang());
refractor.register(requireEtlua());
refractor.register(requireExcelFormula());
refractor.register(requireFactor());
refractor.register(require_false());
refractor.register(requireFirestoreSecurityRules());
refractor.register(requireFlow());
refractor.register(requireFortran());
refractor.register(requireFsharp());
refractor.register(requireFtl());
refractor.register(requireGap());
refractor.register(requireGcode());
refractor.register(requireGdscript());
refractor.register(requireGedcom());
refractor.register(requireGherkin());
refractor.register(requireGit());
refractor.register(requireGlsl());
refractor.register(requireGml());
refractor.register(requireGn());
refractor.register(requireGoModule());
refractor.register(requireGo());
refractor.register(requireGraphql());
refractor.register(requireGroovy());
refractor.register(requireHaml());
refractor.register(requireHandlebars());
refractor.register(requireHaskell());
refractor.register(requireHaxe());
refractor.register(requireHcl());
refractor.register(requireHlsl());
refractor.register(requireHoon());
refractor.register(requireHpkp());
refractor.register(requireHsts());
refractor.register(requireHttp());
refractor.register(requireIchigojam());
refractor.register(requireIcon());
refractor.register(requireIcuMessageFormat());
refractor.register(requireIdris());
refractor.register(requireIecst());
refractor.register(requireIgnore());
refractor.register(requireInform7());
refractor.register(requireIni());
refractor.register(requireIo());
refractor.register(requireJ());
refractor.register(requireJava());
refractor.register(requireJavadoc());
refractor.register(requireJavadoclike());
refractor.register(requireJavastacktrace());
refractor.register(requireJexl());
refractor.register(requireJolie());
refractor.register(requireJq());
refractor.register(requireJsExtras());
refractor.register(requireJsTemplates());
refractor.register(requireJsdoc());
refractor.register(requireJson());
refractor.register(requireJson5());
refractor.register(requireJsonp());
refractor.register(requireJsstacktrace());
refractor.register(requireJsx());
refractor.register(requireJulia());
refractor.register(requireKeepalived());
refractor.register(requireKeyman());
refractor.register(requireKotlin());
refractor.register(requireKumir());
refractor.register(requireKusto());
refractor.register(requireLatex());
refractor.register(requireLatte());
refractor.register(requireLess());
refractor.register(requireLilypond());
refractor.register(requireLiquid());
refractor.register(requireLisp());
refractor.register(requireLivescript());
refractor.register(requireLlvm());
refractor.register(requireLog());
refractor.register(requireLolcode());
refractor.register(requireLua());
refractor.register(requireMagma());
refractor.register(requireMakefile());
refractor.register(requireMarkdown());
refractor.register(requireMarkupTemplating());
refractor.register(requireMatlab());
refractor.register(requireMaxscript());
refractor.register(requireMel());
refractor.register(requireMermaid());
refractor.register(requireMizar());
refractor.register(requireMongodb());
refractor.register(requireMonkey());
refractor.register(requireMoonscript());
refractor.register(requireN1ql());
refractor.register(requireN4js());
refractor.register(requireNand2tetrisHdl());
refractor.register(requireNaniscript());
refractor.register(requireNasm());
refractor.register(requireNeon());
refractor.register(requireNevod());
refractor.register(requireNginx());
refractor.register(requireNim());
refractor.register(requireNix());
refractor.register(requireNsis());
refractor.register(requireObjectivec());
refractor.register(requireOcaml());
refractor.register(requireOpencl());
refractor.register(requireOpenqasm());
refractor.register(requireOz());
refractor.register(requireParigp());
refractor.register(requireParser());
refractor.register(requirePascal());
refractor.register(requirePascaligo());
refractor.register(requirePcaxis());
refractor.register(requirePeoplecode());
refractor.register(requirePerl());
refractor.register(requirePhpExtras());
refractor.register(requirePhp());
refractor.register(requirePhpdoc());
refractor.register(requirePlsql());
refractor.register(requirePowerquery());
refractor.register(requirePowershell());
refractor.register(requireProcessing());
refractor.register(requireProlog());
refractor.register(requirePromql());
refractor.register(requireProperties());
refractor.register(requireProtobuf());
refractor.register(requirePsl());
refractor.register(requirePug());
refractor.register(requirePuppet());
refractor.register(requirePure());
refractor.register(requirePurebasic());
refractor.register(requirePurescript());
refractor.register(requirePython());
refractor.register(requireQ());
refractor.register(requireQml());
refractor.register(requireQore());
refractor.register(requireQsharp());
refractor.register(requireR());
refractor.register(requireRacket());
refractor.register(requireReason());
refractor.register(requireRegex());
refractor.register(requireRego());
refractor.register(requireRenpy());
refractor.register(requireRest());
refractor.register(requireRip());
refractor.register(requireRoboconf());
refractor.register(requireRobotframework());
refractor.register(requireRuby());
refractor.register(requireRust());
refractor.register(requireSas());
refractor.register(requireSass());
refractor.register(requireScala());
refractor.register(requireScheme());
refractor.register(requireScss());
refractor.register(requireShellSession());
refractor.register(requireSmali());
refractor.register(requireSmalltalk());
refractor.register(requireSmarty());
refractor.register(requireSml());
refractor.register(requireSolidity());
refractor.register(requireSolutionFile());
refractor.register(requireSoy());
refractor.register(requireSparql());
refractor.register(requireSplunkSpl());
refractor.register(requireSqf());
refractor.register(requireSql());
refractor.register(requireSquirrel());
refractor.register(requireStan());
refractor.register(requireStylus());
refractor.register(requireSwift());
refractor.register(requireSystemd());
refractor.register(requireT4Cs());
refractor.register(requireT4Templating());
refractor.register(requireT4Vb());
refractor.register(requireTap());
refractor.register(requireTcl());
refractor.register(requireTextile());
refractor.register(requireToml());
refractor.register(requireTremor());
refractor.register(requireTsx());
refractor.register(requireTt2());
refractor.register(requireTurtle());
refractor.register(requireTwig());
refractor.register(requireTypescript());
refractor.register(requireTyposcript());
refractor.register(requireUnrealscript());
refractor.register(requireUorazor());
refractor.register(requireUri());
refractor.register(requireV());
refractor.register(requireVala());
refractor.register(requireVbnet());
refractor.register(requireVelocity());
refractor.register(requireVerilog());
refractor.register(requireVhdl());
refractor.register(requireVim());
refractor.register(requireVisualBasic());
refractor.register(requireWarpscript());
refractor.register(requireWasm());
refractor.register(requireWebIdl());
refractor.register(requireWiki());
refractor.register(requireWolfram());
refractor.register(requireWren());
refractor.register(requireXeora());
refractor.register(requireXmlDoc());
refractor.register(requireXojo());
refractor.register(requireXquery());
refractor.register(requireYaml());
refractor.register(requireYang());
refractor.register(requireZig());
const refractor$1 = /* @__PURE__ */ getDefaultExportFromCjs(refractor_1);
export {
  refractor$1 as r
};