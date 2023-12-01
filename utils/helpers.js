const formatDate = (date) => {
     date = new Date(date);
     const month = date.getMonth() + 1;
     const day = date.getDate();
     const year = date.getFullYear();
     const hours = date.getHours();
     const minutes = date.getMinutes().toString().padStart(2, '0');

     return `${month}/${day}/${year} ${hours}:${minutes}`;
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
