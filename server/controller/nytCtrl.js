var server = require("../server.js");
var config = require("../config.js");
var axios = require ("axios");
module.exports = {
  getNews: function(req, response){
  var companyData = {
    company: 'q='+req.body.company,
    category: 'fq=news_desk:("Market Place")',
    begin: "begin_date="+ req.body.begin,
    end: "end_date="+ req.body.end,
  };
    axios.get( 'http://api.nytimes.com/svc/search/v2/articlesearch.json?'+ companyData.company+'&'+companyData.category+'&'+companyData.begin+'&'+companyData.end+'&api-key='+ config.nytAPI).then(function(res){
      response.status(200).json(res.data);
    });
  }
};
