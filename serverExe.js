function isDirOrQ(f, stat) { return stat.isDirectory() || f === 'Q'; }

const filter = (f, stat) => {
//   return f === "build/server/run";
  return f.includes("build/server/run");
}

module.exports = filter;
