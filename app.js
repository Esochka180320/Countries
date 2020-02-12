$(function() {        
$('.search').hide();
$('#sel').hide();
$('#countries-table thead').hide();
 
let ctrs = [];
 
$('.search').on('keyup', (e) => {
       
    let search = $(e.currentTarget).val() ;
    let result = ctrs.filter(el => {
        let name = el.name.toLowerCase();
        let region = el.region.toLowerCase();
        let cur = el.currencies.map(el => el.name);
        let curen = cur.join(', ').toLowerCase();
        let population = el.population.toString();
        if(el.area==null){
            el.area=0;
        }
        let area = el.area.toString();
        let lowerSearch = search.toLowerCase();
        return name.indexOf(lowerSearch) >= 0 || region.indexOf(lowerSearch) >= 0 || population.indexOf(lowerSearch) >= 0 || area.indexOf(lowerSearch) >= 0 || curen.indexOf(lowerSearch) >= 0;
    });
    renderCountries(result);
});

$('select').on('change', function() {
    let sel = this.value;
 				
 	let res = ctrs.filter(el => {

        return this.value.indexOf(el.name) >= 0;
    });
    renderCountries(res);
});

let renderCountries = countries => {
    let countriesHtml = '';
    let select='<option value="1">Выберите страну</option>';
    for(let item in countries) {
        let country = countries[item];
        let currenciesNames = country.currencies.map(el => el.name);
        countriesHtml += '<tr><td>' + (+item+1) +
                         '</td><td>' + country.name + '</td>' +
                         '</td><td>' + country.region + '</td>' +
                         '</td><td>' + country.population + '</td>' +
                         '</td><td>' + country.area + '</td>' +
                         '</td><td>' + currenciesNames.join(', ') + '</td></tr>';
        select+=  '<option value="'+country.name+'">'+ country.name  +'</option>'
    }
           
    $('#countries-table tbody').html(countriesHtml);
    $('#sel').html(select)
};
 

$('#load-table').on('click', (e) => {
    $(e.currentTarget).toggleClass('hideTable');

    if($(e.currentTarget).hasClass('hideTable')) {
        $('table ').hide();
        $('.search ').hide();
        $('thead').hide();
        $('#sel').hide();
    } else {
        $('table').show();
        $('.search').show();
        $('thead').show();
        $('#sel').show();
    }
 
$.ajax({
    url: 'https://restcountries.eu/rest/v2/all',
    success: countries => {
        ctrs = countries.map(el => {
            return {
                name: el.name,
                            area: el.area,
                currencies: el.currencies,
                population: el.population,
                region: el.region 
            };
        });
    renderCountries(ctrs);
                    
                   
    },
    error: err => {
        console.log(err);
    }
});
})
});