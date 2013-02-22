/* Expose sinon's `assert` methods to the global namespace */
sinon.assert.expose(this);

TestResponses = {};

window.useFakeAjax = function() {
  window.Ajax = sinon.useFakeXMLHttpRequest();
  window.requests = [];

  Ajax.onCreate = function(xhr) {
    requests.push(xhr);
  }
};

window.restoreAjax = function() {
  window.Ajax.restore();
};
