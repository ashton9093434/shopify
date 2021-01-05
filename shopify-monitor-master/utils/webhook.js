const request = require('request');

module.exports = {
    sendWebhook: async (https://discord.com/api/webhooks/795950652680437760/icXDQuSnbkCmbNBGuVDmpYhU1YTBJRPrYtItbkTuk0VzLv7zo3z7fdT78mrgOL8p1QbN, color, title, productDetails) => {
        try {            
            const embed = {
                embeds: [{
                    author: {
                        name: `${title} @ ${productDetails.site}`,
                        url: productDetails.site
                    },
                    color: color,
                    title: productDetails.product.title,
                    url: `${productDetails.site}/products/${productDetails.product.handle}`,
                    thumbnail: {
                        "url": productDetails.product.images[0].src
                    },
                    footer: {
                        icon_url: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ftwitter.com%2Ffryingflips&psig=AOvVaw0WAOm2JJ7XOaBUn2uc0dk2&ust=1609930951849000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCk8qXShO4CFQAAAAAdAAAAABAD",
                        text: "FryingFlips"
                    },
                    type: 'rich',
                    fields: productDetails.restockedVariants.map((variant) => {
                        return {
                            name: (variant.available) ? `${variant.title}: ${(variant.inventory_quantity) ? variant.inventory_quantity : '1+'} Stock` : `${variant.title}: Coming Soon`,
                            value: (variant.available) ? `[ATC](${productDetails.site}/cart/${variant.id}:1)` : `${variant.title}: ${variant.id}`,
                            inline: true
                        }
                    }),
                    timestamp: new Date().toISOString()
                }]
            }
            console.log(embed);
            
            let response = await request.post({
                url: webhookURL,
                followAllRedirects: true,
                simple: false,
                resolveWithFullResponse: true,
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(embed)
            })
        } catch (webhookError) {
            console.error('WEBHOOK: ' + webhookError.message);
            await new Promise((resolve) => setTimeout(() => resolve(), 5000));
            return module.exports.sendWebhook(webhookURL, color, title, productDetails);
        }
    }
}
