class InteliusQuitter {
	constructor (nightmare, identityImgPath) {
		this._optOutUrl = 'https://www.intelius.com/optout'
		this._selIdentityUploadId = '#upload'
		this._nightmare = nightmare
		this._identityImgPath = identityImgPath
		this._evaluateOptOutPage = function () {
			return document.title == 'People Search from Intelius searches billions of public records instantly. Search free now!'
		}
	}

	end() {
		var self = this
		return self._nightmare.end()
	}

	launch() {
		var self = this
		return self._instance = self._nightmare
			.goto(self._optOutUrl)
			.evaluate(self._evaluateOptOutPage)
			.then(function(isValid) {
				if (!isValid) {
					throw new Error('Intelius page not valid')
				} else {
					return self
				}
			})
	}

	attachIdentity() {
		var self = this
		return self._nightmare
			.upload(self._selIdentityUploadId, self._identityImgPath)
			.then(function() {
				return self
			})
			.catch(err => {
				throw err
			})
	}
}

module.exports = InteliusQuitter
