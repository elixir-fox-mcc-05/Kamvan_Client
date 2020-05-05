new Vue({
    el:"#container",
    data: {
        title : "Title",
        text : "Point",
        todos :[],
        backlogs : [],
        title : "",
        description : "",
        point : 0,
        assigned : "",
    },
    methods : {
        getData(){
            axios.get("http://localhost:3000/back-log")
                .then(data => {
                    this.backlogs = data.data
                    return axios.get("http://localhost:3000/to-do")
                })
                .then(data=>{
                    this.todos = data.data
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    beforeMount(){
        this.getData()
    }
})