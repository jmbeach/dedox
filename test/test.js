const Nightmare = require('nightmare')
const assert = require('assert')
const InteliusQuitter = require('../src/quitters/intelius.js')

const identityProofImgPath = '../personal-data/license.jpg'
require('nightmare-upload')(Nightmare)
const useragent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'



describe('intelius quitter', function() {
	this.timeout('30s')
	let nightmare = null
	let inteliusQuitter = null

	beforeEach(() => {
		nightmare = Nightmare({show: true})
		nightmare.useragent(useragent)
		inteliusQuitter = new InteliusQuitter(nightmare, identityProofImgPath)
	})

	describe('#launch', () => {
		it('should launch', function(done) {
			inteliusQuitter.launch()
				.then((q) => {
					return q.end()
				})
				.then(() => done())
				.catch((err) => {
					throw err
				})
		})
	})
})
