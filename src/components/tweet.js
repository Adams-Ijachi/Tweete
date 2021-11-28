
const Tweet = (prop) => {
    const {data, user, onClick, handleLike, handleEdit} = prop

    
    const date = new Date(data.createdAt)
    const dateFormat = date.toLocaleString()


    const isLiked = (tweet) => {
       
        if(user && tweet.likes.includes(user.id)){
            return true
        }
        return false
    }



    
  
    return ( 
        <>
        
        <div className="card p-3 mb-5" style={{width:"100%"}}>
           <div style={{display:"flex", justifyContent:"space-between"}}>

           {
               user ? user.id !== data.user._id ? null : 
            <> 
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style={{cursor:"pointer"}} onClick={()=>handleEdit(data)} fill="currentColor" data-toggle="modal" data-target="#editModal" className="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                
            </svg>  
            </> : null

           }
           

            <div>
                <p className="text-muted">{data.user.username}</p>
            </div>


           </div>
            
            <div className="card-body">
                <p className="card-text">{data.tweet}</p>
            </div>
            
            <h6>Comments</h6>
            <ul className="list-group list-group-flush">
               {data.comments.map((comment,index) => {
                     return <li className="list-group-item" key={index}>{comment.comment}</li>
                })}
               
            </ul>
            <div className="card-body">

            {
                user &&
            
                <>
                <button className="card-link btn btn-primary" data-toggle="modal" onClick={()=>onClick(data)} data-target="#commentModal" >Comment</button>
                <button href="#" onClick={()=>handleLike(data)}  className="card-link btn btn-primary"> 
                    {
                        isLiked(data) ? "Unlike" : "Like" 
                    }
                    {
                        data.likes.length > 0 ? `(${data.likes.length})` : null
                    }
                </button>

                </>
            }
            </div>

            <div>
                <small>Created At  </small> {dateFormat} 
            </div>
        </div>
        </>
     );
}
 
export default Tweet;