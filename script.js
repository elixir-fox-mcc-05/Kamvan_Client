let arrOfTask = [{
    title : "judul0",
    description : "deskripsi0",
    points : 0,
    assignedTo : "nama0",
    status : "backlog"
},
{
    title : "judul1",
    description : "deskripsi1",
    points : 100,
    assignedTo : "nama1",
    status : "backlog"
},
{
    title : "judul2",
    description : "deskripsi2",
    points : 200,
    assignedTo : "nama2",
    status : "backlog"
},
{
    title : "judul3",
    description : "deskripsi3",
    points : 300,
    assignedTo : "nama3",
    status : "todo"
},
{
    title : "judul4",
    description : "deskripsi4",
    points : 400,
    assignedTo : "nama4",
    status : "todo"
},
{
    title : "judul5",
    description : "deskripsi5",
    points : 500,
    assignedTo : "nama5",
    status : "doing"
},
{
    title : "judul6",
    description : "deskripsi6",
    points : 600,
    assignedTo : "nama6",
    status : "done"
}]

let board = new Vue({
    el: "#board",
    data : {
        tasks : arrOfTask
    }
})