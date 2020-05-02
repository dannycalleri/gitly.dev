// thanks to
// https://spin.atomicobject.com/2020/01/16/timeout-promises-nodejs/
function promiseWithTimeout<T>(timeoutMs: number, promise: () => Promise<T>, failureMessage?: string) { 
  let timeoutHandle: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutHandle = setTimeout(() => reject(new Error(failureMessage)), timeoutMs);
  });

  return Promise.race([ 
    promise(), 
    timeoutPromise, 
  ]).then((result) => {
    clearTimeout(timeoutHandle);
    return result;
  }); 
}

export function withTimeout<T>(promise: () => Promise<T>) {
  return promiseWithTimeout(15000, promise, "The server isn't responding in a reasonable amount of time");
};
