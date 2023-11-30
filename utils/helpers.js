const formatDate = () => {
     const date = new Date();
     return date.toLocaleDateString();
};

function isEqual(a, b, options) {
     if (a === b) {
          return options.fn(this);
     } else {
          return options.inverse(this);
     }
}

function section(name, options) {
     if (!this._sections) this._sections = {};
     this._sections[name] = options.fn(this);
     return null;
}


export { formatDate, isEqual };
export default section;
