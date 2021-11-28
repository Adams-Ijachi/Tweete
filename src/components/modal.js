
import { createComment } from './../api/tweet';
import { useState } from 'react';


const Modal = (prop) => {
    const {tweet, handleAddCommentUpdate} = prop
    
    const [comment , setComment ] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            comment: comment
        }

        try{
            const response = await createComment(data,tweet._id);
            console.log(response.data.tweet,'comment response')
            handleAddCommentUpdate(response.data.tweet)
            setComment('')


        }catch (err) {
            // Handle Error Here
            if(err.response){
                console.log(err.response.data.error)
                // setErrors({message:err.response.data.msg})
                // setDisabled(false)
            }
            
        }

    }
    return ( 
        <>
      

            

            
            <div className="modal fade" id="commentModal" tabindex="-1" role="dialog" aria-labelledby="commentModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="commentModalLabel">Comment   {tweet.tweet}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit} >
                <div className="modal-body">
           
                    <div className="form-group">
                        <textarea className="form-control" name={"tweet"} value={comment} onChange={
                            (e) => setComment(e.target.value)
                        } id="exampleFormControlTextarea1" required={true} rows="3"></textarea>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit"  className="btn btn-primary">Submit</button>
                </div>
                </form>

                </div>
            </div>
            </div>

        </>
     );
}
 
export default Modal;