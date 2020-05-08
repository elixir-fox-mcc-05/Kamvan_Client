let arrOfTask = [
	{
		id: 1,
		title: 'judul0',
		description: 'deskripsi0',
		points: 0,
		assignedTo: 'nama0',
		category: 'backlog'
	},
	{
		id: 2,
		title: 'judul1',
		description: 'deskripsi1',
		points: 100,
		assignedTo: 'nama1',
		category: 'backlog'
	},
	{
		id: 3,
		title: 'judul2',
		description: 'deskripsi2',
		points: 200,
		assignedTo: 'nama2',
		category: 'backlog'
	},
	{
		id: 4,
		title: 'judul3',
		description: 'deskripsi3',
		points: 300,
		assignedTo: 'nama3',
		category: 'todo'
	},
	{
		id: 5,
		title: 'judul4',
		description: 'deskripsi4',
		points: 400,
		assignedTo: 'nama4',
		category: 'todo'
	},
	{
		id: 6,
		title: 'judul5',
		description: 'deskripsi5',
		points: 500,
		assignedTo: 'nama5',
		category: 'doing'
	},
	{
		id: 7,
		title: 'judul6',
		description: 'deskripsi6',
		points: 600,
		assignedTo: 'nama6',
		category: 'done'
	}
];

let board = new Vue({
	el: '#board',
	data: {
		tasks: arrOfTask
	}
});
