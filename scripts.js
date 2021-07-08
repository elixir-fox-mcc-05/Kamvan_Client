var main = new Vue({
    el: '#main',
    data: {
        titlePage: 'KamVan Board',
        titleData: ['tidur', 'beli bolu', 'temenin yusak', 'uuu bersama yusak'],
        heroes : [],
        category : '',
        email : '',
        password : "",
        currentPage : ''
    },
    methods: {
        login () {
          axios.get('http://localhost:3000/heroes')
            .then(({data}) => {
              this.heroes = data
    
              this.email = ""
              this.password = ""
              this.currentPage = "dashboard"
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
})

// var test = new Vue({
//     el: '#test',
//     data : {
//         title:'beli'
//     },
//     methods: {
//         now: function () {
//           return this.title
//         }
//       }
// })
