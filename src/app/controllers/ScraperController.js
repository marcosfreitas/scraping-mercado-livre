let ScraperService = require('../services/ScraperService');

class ScraperController {

    constructor () {
        this.service = new ScraperService();
    }

    search = async function(req, res) {
        try {

            let results = await this.service.search(req, res);
            res.json(results);

        } catch (error) {
            console.error(error);
            res.json({
                error: 1,
                code: 'unexpected_app_status',
                description: "Erro inesperado",
                data: []
            });
        }
    }
}

module.exports = ScraperController;