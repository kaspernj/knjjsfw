function number_format(number, decimals, dec_point, thousands_sep){
    var n = !isFinite(+number) ? 0 : +number, 
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }    return s.join(dec);
}

function number_in(numstr){
  if (locale_strings["number_tsep"].length){
    while(numstr.indexOf(locale_strings["number_tsep"], "") != -1){
      numstr = numstr.replace(locale_strings["number_tsep"], "");
    }
  }
  
  numstr = numstr.replace(locale_strings["number_decimal"], ".");
  numstr = parseFloat(numstr);
  
  return numstr;
}

function number_out(number, decimals){
  return number_format(number, decimals, locale_strings["number_decimal"], locale_strings["number_tsep"]);
}

function locales_setup(args){
  var head = document.getElementsByTagName("head")[0] || document.body;
  var script = document.createElement("script");
  script.type = "text/javascript";
  
  if (args["url"]){
    script.src = args["url"] + "/jquery.sprintf-1.0.3.js";
  }else{
    script.src = "https://www.kaspernj.org/js/jquery.sprintf-1.0.3.js";
  }
  
  head.appendChild(script);
}

$(document).ready(function(){
  $(".input_numeric").each(function(no, rawele){
    ele = $(rawele);
    formele = $(ele.closest("form"));
    formele_raw = formele.get(0);
    
    if (!formele.attr("knjlocales_treated")){
      formele.attr("knjlocales_treated", "true");
      
      formele.submit(function(){
        $(".input_numeric", formele).each(function(){
          thisele = $(this);
          val = thisele.val();
          newval = number_in(val);
          thisele.val(newval);
        });
      });
    }
  });
});