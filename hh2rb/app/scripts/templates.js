define(['helpers/handlebars'], function(Handlebars) {

this["HH2RB"] = this["HH2RB"] || {};
this["HH2RB"]["Templates"] = this["HH2RB"]["Templates"] || {};

this["HH2RB"]["Templates"]["popup"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div>"
    + escapeExpression(((helpers.label || (depth0 && depth0.label) || helperMissing).call(depth0, "opening", "Opening", {"name":"label","hash":{},"data":data})))
    + " "
    + escapeExpression(((helpers.select || (depth0 && depth0.select) || helperMissing).call(depth0, "opening", (depth0 != null ? depth0.openings : depth0), (depth0 != null ? depth0.opening : depth0), {"name":"select","hash":{},"data":data})))
    + "</div>\n\n<div>"
    + escapeExpression(((helpers.label || (depth0 && depth0.label) || helperMissing).call(depth0, "first-name", "First Name", {"name":"label","hash":{},"data":data})))
    + " "
    + escapeExpression(((helpers.input || (depth0 && depth0.input) || helperMissing).call(depth0, "first-name", (depth0 != null ? depth0.firstName : depth0), {"name":"input","hash":{},"data":data})))
    + "</div>\n\n<div>"
    + escapeExpression(((helpers.label || (depth0 && depth0.label) || helperMissing).call(depth0, "last-name", "Last Name", {"name":"label","hash":{},"data":data})))
    + " "
    + escapeExpression(((helpers.input || (depth0 && depth0.input) || helperMissing).call(depth0, "last-name", (depth0 != null ? depth0.lastName : depth0), {"name":"input","hash":{},"data":data})))
    + "</div>\n\n<div>"
    + escapeExpression(((helpers.label || (depth0 && depth0.label) || helperMissing).call(depth0, "email", "Email", {"name":"label","hash":{},"data":data})))
    + " "
    + escapeExpression(((helpers.input || (depth0 && depth0.input) || helperMissing).call(depth0, "email", (depth0 != null ? depth0.email : depth0), {"name":"input","hash":{},"data":data})))
    + "</div>\n\n<div>"
    + escapeExpression(((helpers.label || (depth0 && depth0.label) || helperMissing).call(depth0, "skype", "Skype", {"name":"label","hash":{},"data":data})))
    + " "
    + escapeExpression(((helpers.input || (depth0 && depth0.input) || helperMissing).call(depth0, "skype", (depth0 != null ? depth0.skype : depth0), {"name":"input","hash":{},"data":data})))
    + "</div>\n\n<div>"
    + escapeExpression(((helpers.label || (depth0 && depth0.label) || helperMissing).call(depth0, "tags", "Tags", {"name":"label","hash":{},"data":data})))
    + " "
    + escapeExpression(((helpers.input || (depth0 && depth0.input) || helperMissing).call(depth0, "tags", (depth0 != null ? depth0.tags : depth0), {"name":"input","hash":{},"data":data})))
    + "</div>\n\n<div>"
    + escapeExpression(((helpers.button || (depth0 && depth0.button) || helperMissing).call(depth0, "save", "Save", {"name":"button","hash":{},"data":data})))
    + "</div>\n";
},"useData":true});

return this["HH2RB"]["Templates"];

});