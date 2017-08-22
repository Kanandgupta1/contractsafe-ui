/*eslint-disable angular/window-service, angular/document-service */
export default (bundle) => {
  const url = `/${bundle}.bundle.js`;
  const script = document.createElement('script');
  const scripts = document.getElementsByTagName('script');
  const lastScript = scripts[scripts.length - 1];
  script.async = true;
  script.src = url;

  // Insert custom script into head
  lastScript.parentNode.insertBefore(script, lastScript.nextSibling);
}
/*eslint-enable angular/window-service, angular/document-service */