const input = Object.freeze({
  mad: {
    Main: `src/client/Main.mad`,
  },
  views: `src/client/`,
  styles: `src/client/index.scss`,
});

const out = Object.freeze({
  mad: {
    Main: `build/public/js/bundle.js`,
  },
  styles: {
    main: `build/public/styles/main.css`,
  },
  sitemap: "build/public/sitemap.xml",
});

module.exports = {
  scripts: {
    build: {
      frontend: {
        main: `madlib compile -i ${input.mad.Main} --target browser --bundle -o ${out.mad.Main}`,
        watch: `madlib compile -i ${input.mad.Main} --target browser --bundle -o ${out.mad.Main} -w &`,
        dev: "nps build.frontend.watch",
      },
    },
    sync: {
      description: "sync the browser",
      script:
        "browser-sync start --server build/public/ --files build/public/ --serveStatic build/public/ --no-open --reload-debounce 100",
    },
    dev: `concurrently ${[
      `"copy-and-watch --watch src/client/**/*.{html,svg,json} build/public/"`,
      `"sass --watch ${input.styles}:${out.styles.main}"`,
      `"nps build.frontend.dev"`,
      `"nps sync"`,
      `"madlib compile -w -t llvm -i src/server/Main.mad -o build/server/run"`,
      `"sh ./start-server.sh"`,
      `"watch --filter=serverExe.js 'sh ./start-server.sh' ./build/server"`,
    ].join(" ")}`,
  },
};
