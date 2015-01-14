package controllers

import (
	"github.com/revel/revel"
	"io/ioutil"
)

type App struct {
	*revel.Controller
}

func (c App) Index() revel.Result {
	return c.Render()
}

func (c App) Parse() revel.Result {
	body, err := ioutil.ReadAll(c.Request.Body)

	if err != nil || len(pBody) < 2 {
		c.Response.Status = 400
		return c.RenderText("BAD JSON DATA - READ INSTRUCTIONS - SEE EXAMPLES \n")
	}

	if output, err := generate(body, "GeneratedStruct", "main"); err != nil {
		c.Response.Status = 400
		return c.RenderText("BAD JSON DATA - READ INSTRUCTIONS - SEE EXAMPLES \n")
	} else {
		return c.RenderText(string(output))
	}
}
