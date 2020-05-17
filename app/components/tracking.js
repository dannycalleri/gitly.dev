import ReactGA from "react-ga";

let initialized = false;

export function initialize() {
  if (initialized) {
    return;
  }

  const host = window.location.hostname;
  if (host.indexOf("localhost") >= 0) {
    return;
  }

  console.log("google analytics initialized!");
  ReactGA.initialize("UA-46781413-5");
  initialized = true;
}

export function recordPageView() {
  ReactGA.pageview(window.location.pathname + window.location.search);
}

export function recordEvent(category, action, label, value) {
  ReactGA.event({
    category,
    action,
    ...(label !== undefined ? { label } : {}),
    ...(value !== undefined ? { value } : {}),
  });
}
