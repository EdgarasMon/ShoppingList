
<% if (List.length > 0) { %>
	<% List.forEach(List => { %> 
	<div class="date">
		<%= "List created: "%>               
		<% var date =  List.createdAt.toString() %>
		<%= date.slice(0, -45) %>
	</div></br>    
	<% const data = JSON.parse(List.List) %>
	<% for (var i = 0; i < data.length; i++) {  %>
	<%= data[i].Product %>
	<%= data[i].Qty + 'X' %> 
	<%= data[i].weight %>
	<%= data[i].units %> 
	<%= data[i].price %> 
	<%= data[i].currency %></br>
	<% } %>
	<a class="delete" onclick="deleteListFromDB()" style="border-style: dotted" data-doc="<%= List._id %>">delete</a>
	</br>
	<% }) %>
	<% } else { %>
	<p> There are no lists to display...</p>
	<% } %> 