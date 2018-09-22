/**
 * Author - Aditya Vutukuri
 * Dated - 11/1/2016
 * Description - This file is an front-end library for spellcheck service.
 */

var mwSpellCheckLib = mwSpellCheckLib || {};

mwSpellCheckLib.init = function (settings) {
    new mwSpellCheckLib(settings);
}

function mwSpellCheckLib(settings){
    this.targetElementId;
    this.searchParams;
    this.relativeUrl;
    this.emptyDivTemplate = '';
    this.spellcheckDisplayLimit = 20;
    this.suggestions;
    this.resultsCount = null;
    this.divTemplate = '<p><span style="color:#dd4b39">Did you mean: </span><a href="{{url}}">{{suggestion_text}}</a> {{resultscount_display}}</p>';

	if(!settings.targetElementId){
		return;
	}else{
		this.targetElementId = settings.targetElementId;
	}

	if(!settings.searchParams){
		return;
	}else{
		this.searchParams = settings.searchParams;
	}

	if(!settings.relativeUrl){
		return;
	}else{
		this.relativeUrl = settings.relativeUrl;
	}

	if(!settings.suggestions){
		return;
	}else{
		this.suggestions = settings.suggestions;
	}

	if(!settings.spellcheckDisplayLimit){
		return;
	}else{
		this.spellcheckDisplayLimit = settings.spellcheckDisplayLimit;
	}

	if(settings.resultsCount == null || settings.resultsCount < 0){
		return;
	}else{
		this.resultsCount = settings.resultsCount;
	}

	this.displaySpellCheckDiv();
}



mwSpellCheckLib.prototype.displaySpellCheckDiv = function(){
	try{
		var _self = this;
		var new_search_term;
		var is_faceted = false;
		var str;
		var no_facet_query;
		var facet_query;
		var targetElement = document.getElementById(_self.targetElementId);
		var spellcheckDivObject = {url: "", suggestion_text: "", resultscount_display: "" }
		var regex = /\s+/g;
		var search_term_key = "q=";
		var tracking_code = "&s_tid=srch_dym_sug";
		var new_search_term_no_facets;
		var search_query;

		if(this.isSuggestionAvailable()){
			str = _self.divTemplate;
			new_search_term = _self.suggestions['query'].replace(regex, '+');

			search_query = _self.suggestions['query'].split(regex);
			
			//Determine q or term used as search term key - special case for answers app
			Object.keys(_self.searchParams).forEach(function(key,value){

				if(key == "term")
				{
						search_term_key = "term=";
				}
			});

			facet_query = no_facet_query= search_term_key+new_search_term ;

			//Generate params
		  Object.keys(_self.searchParams).forEach(function(key){
			if(key != "q" && key != "term")
			{
			  // Check if the onject is type of an array or not as Add-ons have array("[]") in the URL
			  if(_self.searchParams[key].constructor == Array)
			  {
				facet_query = facet_query + "&"+key+"[]"+"="+_self.searchParams[key];
				is_faceted = true;
			  }

			  else{
				facet_query = facet_query + "&"+key+"="+_self.searchParams[key];
				is_faceted = true;
			  }
			}
		  });


			if(is_faceted && this.isZeroHits()){
				spellcheckDivObject.url = _self.relativeUrl+encodeURI(no_facet_query)+tracking_code;
				spellcheckDivObject.resultscount_display = "(Search without filters)";
			}else{
				spellcheckDivObject.url = _self.relativeUrl+encodeURI(facet_query)+tracking_code;
				spellcheckDivObject.resultscount_display = "("+_self.suggestions['hits']+ " results)";
			}

			var mispelledTerms = _self.suggestions['misspelled_words'];

			for(var i=0; i <search_query.length ;i++){
				if(mispelledTerms.indexOf(search_query[i]) > -1){
					spellcheckDivObject.suggestion_text = spellcheckDivObject.suggestion_text + "<b><i>"+search_query[i]+"</i></b>";
				}
				else{
					spellcheckDivObject.suggestion_text += search_query[i];
				}
				spellcheckDivObject.suggestion_text += " ";
			}

			//replace the template
			var re = new RegExp("{{url}}", "g");
			str = str.replace(re, spellcheckDivObject.url);
			var re = new RegExp("{{suggestion_text}}", "g");
			str = str.replace(re, spellcheckDivObject.suggestion_text);
			var re = new RegExp("{{resultscount_display}}", "g");
			str = str.replace(re, spellcheckDivObject.resultscount_display);

		}else{
			str = this.emptyDivTemplate;
		}

		targetElement.innerHTML = str;

	} catch(err) {
		targetElement.innerHTML = this.emptyDivTemplate;
	}
	

}

mwSpellCheckLib.prototype.isSuggestionAvailable = function(){
	return this.suggestions['query'];
}

mwSpellCheckLib.prototype.isZeroHits = function(){
	return this.suggestions['hits'] == 0 ;
}
