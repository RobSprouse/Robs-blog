const formatDate = () => {
     const date = new Date();
     return date.toLocaleDateString();
};

// COMMENT: This is a helper function for handlebars to compare two values, used Bing AI to find this
function isEqual(a, b, options) {
     if (a === b) {
          return options.fn(this);
     } else {
          return options.inverse(this);
     }
}

// COMMENT: This is a helper function for handlebars to create sections, used Bing AI to find this
function section(name, options) {
     if (!this._sections) this._sections = {};
     this._sections[name] = options.fn(this);
     return null;
}


export { formatDate, isEqual };
export default section;
