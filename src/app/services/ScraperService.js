const scrapIt = require('scrape-it');
const $ = require('cheerio');
const chalk = require('chalk');

 class ScraperService
 {

    constructor() {
        this.items_per_page = 51;
    }

    search = async function(req, res) {

        let self = this,
            term = req.query.string,
            limit = req.query.limit;

        if (limit > 51) {
            limit = 51;
        }

        let response = await scrapIt(`https://lista.mercadolivre.com.br/${term}#D[A:${term}]`, {

            items: self.getJSONFormat()


        }).then(({ data, response }) => {

           console.log(`Status Code: ${response.statusCode}`);
           return data;

        });

        return self.responseSlice(response, limit);

    }

    getJSONFormat = function() {
        return {
            listItem: '.results-item > .item',
            data: {
                name: '.item__info .item__title .main-title',
                url: {
                    selector: '.item__image > .images-viewer',
                    attr: 'item-url'
                },
                price: {
                    selector: '.item__price',
                    how: 'html',
                    convert: price => {
                        let symbol = $('.price__symbol', price).text();
                        let fraction = $('.price__fraction', price).text();
                        let decimals = $('.price__decimals', price).text();

                        let formatted_price = symbol +' '+fraction;

                        if (decimals.length) {
                            formatted_price += ','+decimals;
                        }

                        return formatted_price;
                    }
                },
                // store:,
                // state:,
                image: {
                    selector: '.item__image .images-viewer a',
                    how: 'html',
                    convert: obj => {
                        if ($(obj).attr('class') === 'loading') {
                            return $(obj).attr('data-src');
                        }
                        return $(obj).attr('src');
                    }
                }
            }
        };
    }

    responseSlice = function(json, limit) {
        let extracted_response = [];

        Object.keys(json.items).some((element, index, array) => {

            if (index > limit-1) {
                return true; // breaking loop
            }

            extracted_response.push(json.items[element]);

        });


        return extracted_response;
    }
 }

 module.exports = ScraperService;