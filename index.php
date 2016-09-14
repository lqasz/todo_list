<!DOCTYPE html>
<html>
	<!-- All needed informations stored in head tag -->
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<title>TodoMVC</title>
		<link rel="stylesheet" href="css/style.css">
	</head>
	<!-- Content of the page -->
	<body>
		<!-- Interface where we add some todo -->
		<section id="todoapp" class="todoapp">
			<header id="header">
				<h1>My Todos:</h1>
				<input id="new-todo" class="new-todo" placeholder="What needs to be done?" autofocus>
			</header>
			<section id="main" class="main">
				<input id="toggle-all" class="toggle-all" type="checkbox">
				<label for="toggle-all">Mark all as complete</label>
				<ul id="todo-list" class="todo-list"></ul>
			</section>
			<footer class="footer" id="footer"></footer>
		</section>
		<div id="info" class="info">
			<p>Double-click to edit a todo</p>
		</div>

		<!-- Underscore.js template used when we add some todo -->
		<script type="text/template" id="item-template">
			<div class="view">
				<input class="toggle" type="checkbox" <%= completed ? 'checked' : '' %>>
				<label><%= title %></label>
				
				<div class="row-options">
					<button class="destroy" title="delete todo"></button>
					<% if (description) { %>
						<button class="remove-description" title="remove description from todo"></button>
						<button class="add-description hidden" title="add description to todo"></button>
					<% } else { %>
						<button class="remove-description hidden" title="remove description from todo"></button>
						<button class="add-description" title="add description to todo"></button>
					<% } %>
				</div>
			</div>
			<textarea class="hidden"><%= description %></textarea>
			<input class="edit new-todo" value="<%= title %>">
		</script>

		<!-- Underscore.js template used to route into filtered todos  -->
		<script type="text/template" id="stats-template">
			<span id="todo-count" class="todo-count"><strong><%= remaining %></strong> <%= remaining === 1 ? 'item' : 'items' %> left</span>
			<ul id="filters" class="filters">
			<li>
				<a class="selected" title="all todo`s" href="#/">All</a>
			</li>
			<li>
				<a title="active todo`s" href="#/active">Active</a>
			</li>
			<li>
				<a title="completed todo`s" href="#/completed">Completed</a>
			</li>
			</ul>
			<% if (completed) { %>
				<button id="clear-completed" class="clear-completed">Clear completed (<%= completed %>)</button>
			<% } %>
		</script>

		<script src="/js_files/jquery.js"></script>
		<script src="/js_files/underscore.js"></script>
		<script src="/js_files/backbone.js"></script>
		<script src="/js_files/backbone.localStorage.js"></script>
		<script src="js/models/todo.js"></script>
		<script src="js/collections/todos.js"></script>
		<script src="js/views/todos.js"></script>
		<script src="js/views/app.js"></script>
		<script src="js/routers/router.js"></script>
		<script src="js/app.js"></script>
	</body>
</html>