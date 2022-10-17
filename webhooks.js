// Load Dependencies
require('dotenv').config() // access variables we want to keep secret in a .env file
const Webflow = require('webflow-api') // access the Webflow API
const { ACCESS_TOKEN } = process.env

// Load API and Site Name
const api = new Webflow({ token: ACCESS_TOKEN })
const siteName = "John's Supercool Site"
const hookURI = 'https://hooks.zapier.com/hooks/catch/13466776/bcawlz6/'

// Find Site from Site Name
async function findSiteByName(siteName) {
    const sites = await api.sites()
    const site = sites.find(site => site.name === siteName)
    return site
}

// Create Webhook
async function createMyWebhook(siteId, bodyParameters){
    const webhook = await api.createWebhook(siteId, bodyParameters)
    return webhook
}


(async () => {

    const site = await findSiteByName(siteName)
    const mySiteId = site._id
    console.log(mySiteId)

    // Structure Webhook Body Params
    const bodyParameters = {
        triggerType: 'form_submission',
        uri: hookURI,
    }

    const myWebhook = await createMyWebhook(mySiteId, bodyParameters)
    console.log(myWebhook)


})()