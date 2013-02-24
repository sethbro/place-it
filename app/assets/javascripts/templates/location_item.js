PlaceIt.Templates.location_item = '' +
  '<li class="location">' +
     '<span class="name"><%= name %></span>' +
     '<span class="address"><%= address %></span>' +
     '<form class="simple_form">' +
     '  <input class="editable_address hidden" name="location[address]" value="<%= address %>"/>' +
       '<div type="button" class="edit">edit</div>' +
       '<input type="submit" class="save hidden" value="save"/>' +
     '</form>' +
     '<span class="delete">X</span>' +
  '</li>';
