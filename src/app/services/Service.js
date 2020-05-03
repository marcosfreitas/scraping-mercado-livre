let ResponseInterface = require('../interfaces/ResponseInterface');

class Service extends ResponseInterface {

    constructor () {
        super();
        this.model = null
    }

    /**
     * @todo should implements pagination
     */
    all = function() {
        let self = this;
        return this.model.all(function(error, data){
            return self.response(error, data);
        });
    };

    show = function(req, res) {
        let self = this;
        return this.model.get({
            resource_uuid : req.params.uuid
        },  function(error, data){
            return self.response(error, data);
        });

    };

    store = async function(req, res) {
        let self = this;

        return new Promise((resolve, reject) => {

            this.model.store(req.body, function(error, data){
                resolve(self.response(error, data));
            });

        });

    };

    deleteOne = function(req, res) {
        let self = this
        return this.model.deleteOne({
            resource_uuid: req.params.uuid
        }, function(error, data){
            return self.response(error, data);
        });
    };

    deleteMany = function(req, res) {
        let self = this;
        return this.model.deleteMany(req.body.filters,  function(error, data){
            return self.response(error, data);
        });
    };

    update = function(req, res) {
        let self = this
        let params = req.params;
        let find = {"_id" : params.id};
        let data = req.body;

        return this.model.update(find, data,  function(error, data){
            return self.response(error, data);
        });
    };

}

module.exports =  Service;