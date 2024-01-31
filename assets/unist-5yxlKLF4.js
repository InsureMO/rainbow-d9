function stringifyPosition(value) {
  if (!value || typeof value !== "object") {
    return "";
  }
  if ("position" in value || "type" in value) {
    return position$1(value.position);
  }
  if ("start" in value || "end" in value) {
    return position$1(value);
  }
  if ("line" in value || "column" in value) {
    return point$1(value);
  }
  return "";
}
function point$1(point2) {
  return index(point2 && point2.line) + ":" + index(point2 && point2.column);
}
function position$1(pos) {
  return point$1(pos && pos.start) + "-" + point$1(pos && pos.end);
}
function index(value) {
  return value && typeof value === "number" ? value : 1;
}
const pointStart = point("start");
const pointEnd = point("end");
function position(node) {
  return { start: pointStart(node), end: pointEnd(node) };
}
function point(type) {
  return point2;
  function point2(node) {
    const point3 = node && node.position && node.position[type] || {};
    return {
      // @ts-expect-error: in practice, null is allowed.
      line: point3.line || null,
      // @ts-expect-error: in practice, null is allowed.
      column: point3.column || null,
      // @ts-expect-error: in practice, null is allowed.
      offset: point3.offset > -1 ? point3.offset : null
    };
  }
}
const convert = (
  /**
   * @type {(
   *   (<Kind extends Node>(test: PredicateTest<Kind>) => AssertPredicate<Kind>) &
   *   ((test?: Test) => AssertAnything)
   * )}
   */
  /**
   * @param {Test} [test]
   * @returns {AssertAnything}
   */
  function(test) {
    if (test === void 0 || test === null) {
      return ok;
    }
    if (typeof test === "string") {
      return typeFactory(test);
    }
    if (typeof test === "object") {
      return Array.isArray(test) ? anyFactory(test) : propsFactory(test);
    }
    if (typeof test === "function") {
      return castFactory(test);
    }
    throw new Error("Expected function, string, or object as test");
  }
);
function anyFactory(tests) {
  const checks = [];
  let index2 = -1;
  while (++index2 < tests.length) {
    checks[index2] = convert(tests[index2]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index3 = -1;
    while (++index3 < checks.length) {
      if (checks[index3].call(this, ...parameters))
        return true;
    }
    return false;
  }
}
function propsFactory(check) {
  return castFactory(all);
  function all(node) {
    let key;
    for (key in check) {
      if (node[key] !== check[key])
        return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type);
  function type(node) {
    return node && node.type === check;
  }
}
function castFactory(check) {
  return assertion;
  function assertion(node, ...parameters) {
    return Boolean(
      node && typeof node === "object" && "type" in node && // @ts-expect-error: fine.
      Boolean(check.call(this, node, ...parameters))
    );
  }
}
function ok() {
  return true;
}
function color(d) {
  return d;
}
const CONTINUE = true;
const EXIT = false;
const SKIP = "skip";
const visitParents = (
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: BuildVisitor<Tree, Check>, reverse?: boolean | null | undefined) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: BuildVisitor<Tree>, reverse?: boolean | null | undefined) => void)
   * )}
   */
  /**
   * @param {Node} tree
   * @param {Test} test
   * @param {Visitor<Node>} visitor
   * @param {boolean | null | undefined} [reverse]
   * @returns {void}
   */
  function(tree, test, visitor, reverse) {
    if (typeof test === "function" && typeof visitor !== "function") {
      reverse = visitor;
      visitor = test;
      test = null;
    }
    const is = convert(test);
    const step = reverse ? -1 : 1;
    factory(tree, void 0, [])();
    function factory(node, index2, parents) {
      const value = node && typeof node === "object" ? node : {};
      if (typeof value.type === "string") {
        const name = (
          // `hast`
          typeof value.tagName === "string" ? value.tagName : (
            // `xast`
            typeof value.name === "string" ? value.name : void 0
          )
        );
        Object.defineProperty(visit2, "name", {
          value: "node (" + color(node.type + (name ? "<" + name + ">" : "")) + ")"
        });
      }
      return visit2;
      function visit2() {
        let result = [];
        let subresult;
        let offset;
        let grandparents;
        if (!test || is(node, index2, parents[parents.length - 1] || null)) {
          result = toResult(visitor(node, parents));
          if (result[0] === EXIT) {
            return result;
          }
        }
        if (node.children && result[0] !== SKIP) {
          offset = (reverse ? node.children.length : -1) + step;
          grandparents = parents.concat(node);
          while (offset > -1 && offset < node.children.length) {
            subresult = factory(node.children[offset], offset, grandparents)();
            if (subresult[0] === EXIT) {
              return subresult;
            }
            offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
          }
        }
        return result;
      }
    }
  }
);
function toResult(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE, value];
  }
  return [value];
}
const visit = (
  /**
   * @type {(
   *   (<Tree extends Node, Check extends Test>(tree: Tree, test: Check, visitor: BuildVisitor<Tree, Check>, reverse?: boolean | null | undefined) => void) &
   *   (<Tree extends Node>(tree: Tree, visitor: BuildVisitor<Tree>, reverse?: boolean | null | undefined) => void)
   * )}
   */
  /**
   * @param {Node} tree
   * @param {Test} test
   * @param {Visitor} visitor
   * @param {boolean | null | undefined} [reverse]
   * @returns {void}
   */
  function(tree, test, visitor, reverse) {
    if (typeof test === "function" && typeof visitor !== "function") {
      reverse = visitor;
      visitor = test;
      test = null;
    }
    visitParents(tree, test, overload, reverse);
    function overload(node, parents) {
      const parent = parents[parents.length - 1];
      return visitor(
        node,
        parent ? parent.children.indexOf(node) : null,
        parent
      );
    }
  }
);
function generated(node) {
  return !node || !node.position || !node.position.start || !node.position.start.line || !node.position.start.column || !node.position.end || !node.position.end.line || !node.position.end.column;
}
export {
  pointEnd as a,
  position as b,
  convert as c,
  visitParents as d,
  generated as g,
  pointStart as p,
  stringifyPosition as s,
  visit as v
};
