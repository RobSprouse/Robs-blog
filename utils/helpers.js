// COMMENT: helper function to format date
const formatDate = (date) => {
     date = new Date(date);
     const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" };
     return date.toLocaleString("en-US", options);
};

// COMMENT: This is a helper function for handlebars to compare two values, used Bing AI to find this
function isEqual(a, b, options) {
     if (a === b) {
          return options.fn(this);
     } else {
          return options.inverse(this);
     }
}

// COMMENT: Exporting helper functions
export { formatDate, isEqual };
