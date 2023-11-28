const express = require('express')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cors())

const initilizeServer = ()=>{
    app.listen(3000, ()=>{
        console.log('server started at http://localhost:3000')
    })
}

initilizeServer()

app.get('/', (req, res)=>{
    try{
        res.json({
        message: 'you are accessed hexdecimal assignment domain please give paths as per readmeFile'
    })
    }catch(e){
        console.log(e.message, e)
    }
})


app.get('/v1/users', async (req, res)=>{
    const usersResponse  = await axios.get('https://jsonplaceholder.typicode.com/users')
    const users = usersResponse.data
    
    const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const posts = postsResponse.data


    let combinedData = users.map((user)=> ({
        ...user,
        posts: posts.filter(post=> post.userId === user.id)
    }))

    const searchText  = req.query.searchText
    if(searchText){
        combinedData = combinedData.filter((obj)=> obj.name.toLowerCase().includes(searchText.toLowerCase()))
    }
    res.send(combinedData)

})
