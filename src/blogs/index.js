function importAll(r) {
  let mdFiless = {};
  r.keys().map(item => { mdFiless[item.replace('./', '')] = r(item); });
  return mdFiless;
}

const mdFiless = importAll(require.context('./', false, /\.md$/));
//https://www.youtube.com/watch?v=gEMAZSO85KY&ab_channel=WebStylePress
// const allBlogs = 

export default mdFiless;