function createLog(type?: string) {
  let log_fun = console[type];
  if (!log_fun) {
    log_fun = console.log;
  }
  return log_fun.bind(window.console);
}

export let log: typeof console.log = createLog();
export let debug: typeof console.warn = createLog("debug");
export let error: typeof console.error = createLog("error");
