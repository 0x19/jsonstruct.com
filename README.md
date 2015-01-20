[![License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)]()
[![Go 1.3 Ready](https://img.shields.io/badge/Go%201.3-Ready-green.svg?style=flat)]()
[![Go 1.4 Ready](https://img.shields.io/badge/Go%201.4-Ready-green.svg?style=flat)]()

Welcome to JSONStruct
====

JSONStruct is a simple web server/service that will translate any json document into valid [Go Language](http://golang.org) Struct.

### Hosted service?

You can find this service live at [JSONStruct Website](http://jsonstruct.com). 
This repo is just an open source in case you wish to extend it and do whatever you wish to do with it.

### Terminal usage?

In addition to regular usage over site you can use following command to do it from terminal itself. 
I have in plan to make this method simplier in the future but for now (unless you wish to contribute):

```shell
curl -s http://www.jsonstruct.com/example.json | curl -s -X POST -H "Content-Type: application/json" -d @- http://www.jsonstruct.com/parse
```

### Getting Started


#### Follow the guidelines to start extending JSONStruct application:

JSONStruct is built on top of [Revel Go Framework](http://revel.github.io) and with help of [Angular.JS](https://angularjs.org/)

* The [Getting Started with Revel](http://revel.github.io/tutorial/index.html).
* The [Revel guides](http://revel.github.io/manual/index.html).
* The [Revel sample apps](http://revel.github.io/samples/index.html).
* The [API documentation](http://revel.github.io/docs/godoc/index.html).


### Contributing

I encourage you to contribute to JSONStruct! Please check out the [Contributing to JSONStruct](https://github.com/0x19/jsonstruct/blob/master/CONTRIBUTING.md) for guidelines about how
to proceed.


### Thanks To

On this way I would like to express my gratitude to those teams/people and above all let everyone knows from where did I grep my code :)

* [GotoStruct](https://github.com/0x19/gotostruct)
* [Go Team](http://golang.org)
* [Angular.JS](https://angularjs.org/)
* [UI-Ace](https://github.com/angular-ui/ui-ace)
* [Ace](http://ajaxorg.github.io/ace/#nav=about)
* [Revel](http://revel.github.io)