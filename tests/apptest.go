package tests

import (
	"github.com/revel/revel"
	"strings"
)

type AppTest struct {
	revel.TestSuite
}

func (t *AppTest) TestThatIndexPageWorks() {
	t.Get("/")
	t.AssertOk()
	t.AssertContentType("text/html; charset=utf-8")
}

func (t *AppTest) TestThatParserWorks() {
	reader := strings.NewReader(`{"simple" : "json", "test": null, "something": [{"baz": 1}, {"baz": 2}]}`)
	t.Post("/parse", "application/json", reader)
	t.AssertOk()
	t.AssertContentType("text/plain; charset=utf-8")
}
