<% if (Products.length > 0) { %>
	<% Products.forEach(Products => { %>
	<%= Products %></br>
	<% }) %>
	<% } else { %>
		<p> Item doesn't exist...</p>
	<% } %> 




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
		<a class="delete" onclick="deleteListFromDB()" data-doc="<%= List._id %>">delete</a>
			</br>
		<% }) %>
		<% } else { %>
			<p> There are no lists to display...</p>
		<% } %>       	


// post List
router.get('/dashboard', checkAuthenticated, (req, res) => {
	res.render('dashboard', { User: req.user.User });
});

router.get('/dashboard', (req, res) => {
	Products.find({ name: 'Duracell - AAA Batteries (4-Pack)' }).then(
		result => {
			res.render('dashboard', { Products: result });
		}
	);
});		



// post List
router.get('/dashboard', checkAuthenticated, (req, res) => {
	res.render('dashboard', { User: req.user.User });
});

router.get('/dashboard', async (req, res) => {
	await Products.find({ name: 'Duracell - AAA Batteries (4-Pack)' }).then(
		result => {
			res.render('dashboard', { Products: result });
		}
	);
});




<script> 
document.getElementById('search').onclick = () => {
	const search = document.getElementById('third').value;
	console.log(search);
}
</script> 


<script>
function FindProducts() {
	const search = document.getElementById('third').value;
	
	const endpoint = `/dashboard/${search.dataset.doc}`;

	fetch(endpoint, {
		method: 'FIND'
	})
		.then((res) => res.json())
		.then((data) => window.location.href = data.redirect )
		.catch(err => console.log(err));        
}

</script>  




router.get('/search', async (req, res) => {
	const search = req.query.third;
	await Products.find({ "name": `${search}` }).then(result => {	
		res.render('search', { Products: result });
	})
	.catch(err => {
		console.log(err);
	});
});




<% if (locals.Prod){ %>
	<% Prod.forEach(function (Products) { %>
		<h1><%= Products %></h1>
	<% }) %>
<% } %>


