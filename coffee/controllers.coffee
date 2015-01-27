##
##
##
##
##
##
##
##

class @BaseCtrl
  @register: (app, name) ->
    name ?= @name || @toString().match(/function\s*(.*?)\(/)?[1]
    app.controller name, @
 
  @inject: (args...) ->
    @$inject = args
 
  constructor: (args...) ->
    
    for key, index in @constructor.$inject
      @[key] = args[index]
 
    for key, fn of @constructor.prototype
      continue unless typeof fn is 'function'
      continue if key in ['constructor', 'initialize'] or key[0] is '_'
      @$scope[key] = fn.bind?(@) || _.bind(fn, @)

    @initialize?()



class EditorCtrl extends BaseCtrl
  @register app
  @inject '$scope', '$http'

  notify: (type, title, message) ->
    @$scope.alertType  = type
    @$scope.alertTitle = title
    @$scope.alertMessage = message
    @$scope.alertAvailable = true

  dismissAlert: ->
    @$scope.alertTitle = ''
    @$scope.alertMessage = ''
    @$scope.alertAvailable = false

  dialog: (generatedStruct) ->
    document.getElementById('generatedcode').innerHTML = prettyPrintOne generatedStruct, 'lang-go', false
    @$scope.dialogReady = true
    _editor.setReadOnly(true)

  destroyDialog: () ->
    @$scope.goStruct = ''
    @$scope.dialogReady = false
    _editor.setReadOnly(false)

  buildDialog: (jsonObject) ->
    @$scope.isGenerating = true
    request = @$http.post '/parse', jsonObject, headers: {'Content-Type': 'application/json'}

    screwyou = @

    request.error (data, status, headers, config, @notify) ->
      screwyou.notify 'error', 'Invalid JSON |', data
      screwyou.$scope.isGenerating = false

    request.then (result) =>
      @dialog result.data
      @$scope.isGenerating = false

  initialize:  ->
    @$scope.dialogReady = false
    
  aceLoaded: (_editor) ->
    window._editor = _editor
    _editor.setReadOnly(false)

  generateStruct: ->
    jsonValue = window._editor.getValue()
    
    @dismissAlert()

    try
      JSON.parse(jsonValue)
      @buildDialog jsonValue
    catch e
      @notify 'error', 'Invalid JSON |', e.message
