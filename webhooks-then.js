// Load Dependencies
import fetch from 'node-fetch';
import * as dotenv from 'dotenv'
dotenv.config()

// Get Access Token and Site Name
const { ACCESS_TOKEN } = process.env
const siteName = "John's Supercool Site"
const destinationURI = 'https://hooks.airtable.com/workflows/v1/genericWebhook/app7NJLWjiqRRttuN/wflmB9lhCzqGtkPnr/wtrX2fcKrwvtcbKMH'

// Get Site by Name

const sitesUrl = 'https://api.webflow.com/sites'
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${ACCESS_TOKEN}`
    }
};

const site = fetch(sitesUrl, options)
    .then(res => res.json())
    .then(sites => sites.find(site => site.name === siteName))
    .then( site => {return site})
    .catch(err => console.error('error:' + err));

    console.log(site)



// // Create Webhook
// const createWebhook = async (siteId, bodyParams) => {

//     const createWebhookUrl = `https://api.webflow.com/sites/${siteId}/webhooks`
//     const options = {
//         method: 'POST',
//         headers: { accept: 'application/json', 'content-type': 'application/json', 'authorization': `Bearer ${ACCESS_TOKEN}` },
//         body: JSON.stringify(bodyParams)
//     };
//     const newWebhook = await fetch(createWebhookUrl, options)
//     return newWebhook.json()
// }

// (async () => {

//     const site = await getSiteByName(siteName)
//     const siteId = site._id

//     // Create Webhook Parameters
//     const bodyParams = {
//         triggerType: 'form_submission',
//         url: destinationURI
//     }
//     const newWebhook = await createWebhook(siteId, bodyParams)

// })()