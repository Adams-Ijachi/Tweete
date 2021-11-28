import Tweet from "../components/tweet";
import { useEffect,useState  } from 'react';
import { getTweets,createTweet,deleteTweet } from './../api/tweet';
import Modal from './../components/modal';
import { tweetAction } from './../api/tweet';
import { useLocation } from 'react-router-dom';
import EditModal from "../components/editModal";




const Home = () => {
    const [tweets , setTweets] = useState(null)
    const [newTweet , setNewTweet] = useState('')
    const [showModal , setShowModal] = useState(false)
    const [showEditModal , setshowEditModal] = useState(false)
    const [tweet , setTweet] = useState(null)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const location = useLocation();


    // useeffect when location changes
    useEffect(()=>{


        setUser(JSON.parse(localStorage.getItem('user')))
        return ()=>{
            setTweets(null)
        }
    },[location])

        




    useEffect(()=>{

        getTweets() 
        .then(res => setTweets(res))
        .catch( (error) =>{
        })
        
    },[tweets])

    // handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            tweet: newTweet
        }

        try{
            const response = await createTweet(data);
            setTweets([response.data.tweet,...tweets])
            setNewTweet('')

        }catch (err) {
            // Handle Error Here
            if(err.response){
                // setErrors({message:err.response.data.msg})
                // setDisabled(false)
            }
            
        }

      

    }
    const handleModal = (tweet) => {
        setTweet(tweet)
        setShowModal(true)
    }

    const handleAddCommentUpdate = (tweet) => {
        const newTw = [...tweets]
        const index = newTw.findIndex(t => t._id === tweet._id)
        newTw[index] = tweet
        setTweets(newTw)
        
    }

    const handleEdit = (tweet) => {
        setTweet(tweet)
        setshowEditModal(true)
    }

    const handleDelete = async () => {
        try{
            const response = await deleteTweet(tweet._id)
            const newTw = [...tweets]
            const index = newTw.findIndex(t => t._id === tweet._id)
            newTw.splice(index,1)
            setTweets(newTw)
        }catch (err) {
            // Handle Error Here
            if(err.response){
                // setErrors({message:err.response.data.msg})
            }
        }
    }


    const handleLike = async (tweet) => {
        try{
            const response = await tweetAction(tweet._id);
            const newTw = [...tweets]
            const index = newTw.findIndex(t => t._id === response.data.tweet._id)
            newTw[index] = response.data.tweet
            setTweets(newTw)


        }catch (err) {
            // Handle Error Here
            if(err.response){
                // setErrors({message:err.response.data.msg})
                // setDisabled(false)
            }
            
        }
    }


   
    return ( 
        <>
        <h1>Home</h1>
        <form onSubmit={handleSubmit} >
        <div className="form-group">
            <textarea className="form-control" name={"tweet"} value={newTweet} onChange={
                (e) => setNewTweet(e.target.value)
            } id="exampleFormControlTextarea1" required={true} rows="3"></textarea>

            {
                user ? <button className="btn btn-primary m-2"  type="submit">Tweet</button> : <button className="btn btn-primary m-2" type="submit" disabled>Tweet</button>
            }
            
        </div>
        </form>

        { tweets ? tweets.map( (item) => {
            return (
                <>
                <Tweet key={item._id} data={item} user={user} setTweets={setTweets} handleEdit={handleEdit} handleLike={handleLike}  onClick={handleModal} handle tweets={tweets} /> 
                
                </>
            )

            }): ("loading....." ) }

            {showModal && < Modal tweet={tweet} handleAddCommentUpdate={handleAddCommentUpdate} /> }
            {showEditModal &&  < EditModal tweet={tweet} handleDelete={handleDelete} handleAddCommentUpdate={handleAddCommentUpdate} /> }
        </>
     );
}
 
export default Home;