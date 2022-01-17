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





<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="author" content="Edgaras" />
		<title>Shopping List</title>
		<link rel="stylesheet" type="text/css" href="css/styles-search.css" />
	</head>
	<body>
		<div>
			<span style="display: flex; align-items: center">
				<span>
					<a href="/dashboard">
						<img src="pic/back2.png" />    
					</a>
				</span> 
				<span>
					<a href="/"><h1 class="title">Shopping List</h1></a>
				</span>
				<span>
					<img
						class="cart_image"
						src="/pic/cart.png"
						width="50"
						height="50"
					/>
				</span>
			</span>	
				<span>
					<nav role="navigation">

					</nav>
				</span>
				<h2>Items by phrase "<%= products %>" :</h2>
				</br>
				<script>
					let name = [];
					let id = 0;
				</script>	
				<span class="items">
					
						<% if (Products.length > 0) { %>
						<% Products.forEach(Products => { %> 
				
					<span class="item" id="MySpan">    
						<img src="<%= Products.image %>" class="image"/>    
						</br>
						<span class="name" id="name">
							<%= Products.name %>
						<script>							
							name.push('<%= Products.name %>')
							console.log(name)
						</script>	
						</span> 
							</br>                   
						<%= Products.type %>
							</br>
						Price: <%= Products.price %>
							</br>
						<a href="<%= Products.url%>" id="url" target="_blank">Link to buy:</a>  
				
						<div class="hide" >
							<button id="addfromdatabase">
								<img src="/pic/add3.png"/>
								<script>
									id = id + 1;
									console.log(id) 
								</script>	
							</button>
						</div>
					</span>
						<% }) %>
						<% } else { %>
							<h2> Items not found...</h2>
						<% } %>                
			    
		</div>
	</body>
	<script>

		document.getElementById('addfromdatabase').onclick = () => {
			addfromdatabase();
		};

		function addfromdatabase() {
			console.log('click');
			//const name = document.getElementById('name').value;
			console.log(name)
		}
	</script>
	
</html>