import { f as fromMarkdown, t as toHast, e as gfmToMarkdown, h as gfmFromMarkdown } from "./mdast-9DsU38kh.js";
import { l as gfm } from "./micromark-lHpxdhAf.js";
function remarkParse(options) {
  const parser = (doc) => {
    const settings = (
      /** @type {Options} */
      this.data("settings")
    );
    return fromMarkdown(
      doc,
      Object.assign({}, settings, options, {
        // Note: these options are not in the readme.
        // The goal is for them to be set by plugins on `data` instead of being
        // passed by users.
        extensions: this.data("micromarkExtensions") || [],
        mdastExtensions: this.data("fromMarkdownExtensions") || []
      })
    );
  };
  Object.assign(this, { Parser: parser });
}
const remarkRehype = (
  /** @type {(import('unified').Plugin<[Processor, Options?]|[null|undefined, Options?]|[Options]|[], MdastRoot>)} */
  function(destination, options) {
    return destination && "run" in destination ? bridge(destination, options) : mutate(destination || options);
  }
);
const remarkRehype$1 = remarkRehype;
function bridge(destination, options) {
  return (node, file, next) => {
    destination.run(toHast(node, options), file, (error) => {
      next(error);
    });
  };
}
function mutate(options) {
  return (node) => toHast(node, options);
}
function remarkGfm(options = {}) {
  const data = this.data();
  add("micromarkExtensions", gfm(options));
  add("fromMarkdownExtensions", gfmFromMarkdown());
  add("toMarkdownExtensions", gfmToMarkdown(options));
  function add(field, value) {
    const list = (
      /** @type {unknown[]} */
      // Other extensions
      /* c8 ignore next 2 */
      data[field] ? data[field] : data[field] = []
    );
    list.push(value);
  }
}
export {
  remarkRehype$1 as a,
  remarkGfm as b,
  remarkParse as r
};
