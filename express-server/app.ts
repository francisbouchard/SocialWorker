//https://webcache.googleusercontent.com/search?q=cache:GDMYZrUAoZwJ:https://blog.risingstack.com/building-a-node-js-app-with-typescript-tutorial/+&cd=1&hl=en&ct=clnk&gl=ca&client=safari
//

import * as express from 'express'

class App {
	  public express

	  constructor () {
		      this.express = express()
		      this.mountRoutes()
		    }

	  private mountRoutes (): void {
		      const router = express.Router()
		      router.get('/', (req, res) => {
			            res.json({
					            message: 'Hello World!'
					          })
			          })
		      this.express.use('/', router)
		    }
}

export default new App().express
