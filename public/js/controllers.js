// Generated by CoffeeScript 1.8.0
(function() {
  var EditorCtrl,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.BaseCtrl = (function() {
    BaseCtrl.register = function(app, name) {
      var _ref;
      if (name == null) {
        name = this.name || ((_ref = this.toString().match(/function\s*(.*?)\(/)) != null ? _ref[1] : void 0);
      }
      return app.controller(name, this);
    };

    BaseCtrl.inject = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.$inject = args;
    };

    function BaseCtrl() {
      var args, fn, index, key, _i, _len, _ref, _ref1;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _ref = this.constructor.$inject;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        key = _ref[index];
        this[key] = args[index];
      }
      _ref1 = this.constructor.prototype;
      for (key in _ref1) {
        fn = _ref1[key];
        if (typeof fn !== 'function') {
          continue;
        }
        if ((key === 'constructor' || key === 'initialize') || key[0] === '_') {
          continue;
        }
        this.$scope[key] = (typeof fn.bind === "function" ? fn.bind(this) : void 0) || _.bind(fn, this);
      }
      if (typeof this.initialize === "function") {
        this.initialize();
      }
    }

    return BaseCtrl;

  })();

  EditorCtrl = (function(_super) {
    __extends(EditorCtrl, _super);

    function EditorCtrl() {
      return EditorCtrl.__super__.constructor.apply(this, arguments);
    }

    EditorCtrl.register(app);

    EditorCtrl.inject('$scope', '$http');

    EditorCtrl.prototype.notify = function(type, title, message) {
      this.$scope.alertType = type;
      this.$scope.alertTitle = title;
      this.$scope.alertMessage = message;
      return this.$scope.alertAvailable = true;
    };

    EditorCtrl.prototype.dismissAlert = function() {
      this.$scope.alertTitle = '';
      this.$scope.alertMessage = '';
      return this.$scope.alertAvailable = false;
    };

    EditorCtrl.prototype.dialog = function(generatedStruct) {
      document.getElementById('test').innerHTML = prettyPrintOne(generatedStruct, 'lang-go', false);
      this.$scope.dialogReady = true;
      return _editor.setReadOnly(true);
    };

    EditorCtrl.prototype.destroyDialog = function() {
      this.$scope.goStruct = '';
      this.$scope.dialogReady = false;
      return _editor.setReadOnly(false);
    };

    EditorCtrl.prototype.buildDialog = function(jsonObject) {
      var request, screwyou;
      this.$scope.isGenerating = true;
      request = this.$http.post('/parse', jsonObject, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      screwyou = this;
      request.error(function(data, status, headers, config, notify) {
        this.notify = notify;
        screwyou.notify('error', 'Invalid JSON |', data);
        return screwyou.$scope.isGenerating = false;
      });
      return request.then((function(_this) {
        return function(result) {
          _this.dialog(result.data);
          return _this.$scope.isGenerating = false;
        };
      })(this));
    };

    EditorCtrl.prototype.initialize = function() {
      return this.$scope.dialogReady = false;
    };

    EditorCtrl.prototype.aceLoaded = function(_editor) {
      window._editor = _editor;
      return _editor.setReadOnly(false);
    };

    EditorCtrl.prototype.generateStruct = function() {
      var e, jsonValue;
      jsonValue = window._editor.getValue();
      this.dismissAlert();
      try {
        JSON.parse(jsonValue);
        return this.buildDialog(jsonValue);
      } catch (_error) {
        e = _error;
        return this.notify('error', 'Invalid JSON |', e.message);
      }
    };

    return EditorCtrl;

  })(BaseCtrl);

}).call(this);
