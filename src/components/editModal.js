import { updateTweet } from './../api/tweet';
import { useState } from 'react';

const EditModal = (prop) => {
    const {tweet, handleAddCommentUpdate, handleDelete} = prop

    const [newTweet , setNewTweet ] = useState(tweet.tweet)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            tweet: newTweet
        }

        try{
            const response = await updateTweet(data,tweet._id);
            console.log(response.data,'edit response')
            handleAddCommentUpdate(response.data.tweet)
            setNewTweet('')


        }catch (err) {
            // Handle Error Here
            if(err.response){
                console.log(err.response.data.error)
        
            }
            
        }

    }

    return ( 
        <>      
      <div className="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="#editModal" aria-hidden="true">
      <div className="modal-dialog" role="document">
          <div className="modal-content">
          <div className="modal-header">
              <h5 className="modal-title" id="#editModal">Comment   {tweet.tweet}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <form onSubmit={handleSubmit} >
          <div className="modal-body">
     
              <div className="form-group">
                  <textarea className="form-control" name={"tweet"} value={newTweet} onChange={
                      (e) => setNewTweet(e.target.value)
                  } id="exampleFormControlTextarea1" required={true} rows="3"></textarea>
              </div>
          </div>
          <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" onClick={()=>handleDelete()}  className="btn btn-danger" >Delete</button>
              <button type="submit"  className="btn btn-primary">Submit</button>
          </div>
          </form>

          </div>
      </div>
      </div>

  </>

    
     );
}
 
export default EditModal;