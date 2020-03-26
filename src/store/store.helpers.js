// https://gist.github.com/rhythnic/6521495650a215ccab8bf7120949fb7d?source=post_page
const last = xs => xs[xs.length - 1];

export const toggle = key => (state) => { state[key] = !state[key]; };

export const set = key => (state, val) => { state[key] = val; };

export const getPath = (obj, path) => {
    return path.reduce((acc, key) =>
        (acc && acc[key] !== 'undefined') ? acc[key] : undefined, obj);
}

export const setPath = path => (state, val) => {
  const obj = path.slice(0, -1).reduce((acc, x, i) => {
    if (!(x in acc)) {
      acc[x] = typeof path[i + 1] === 'number' ? [] : {};
    }
    return acc[x];
  }, state);
  obj[last(path)] = val;
};
