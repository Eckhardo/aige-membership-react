import React from 'react';


const Comments = ({comment, comments, handleInputChangeComments, handleRemoveComment, handleAddComment}) => {

    return (
        <div>
            {comments && comments.map((c, index) =>
            <div key={index}>
                <label htmlFor={index} className="h6 small">Comment-{index + 1}</label>
                <input
                    type="text"
                    placeholder="Comment"
                    value={c}
                    name={"comment"}
                    key={index}
                    className="form-control"
                    onChange={(e) => handleInputChangeComments(e, index)}
                />

                {comments.length !== 1 &&
                <button
                    className="badge badge-primary mr-2"
                    onClick={() => handleRemoveComment(index)}>Remove
                </button>}

                {comments.length - 1 === index &&
                (<button
                    className="badge badge-primary mr-2"
                    onClick={handleAddComment}>Add
                </button>)}
            </div>
        )}
            {
                comments.length === 0 && (
                    <div>
                        <label htmlFor="comment" className="h6 small">Comment </label>
                        <input
                            type="text"
                            placeholder="Comment"
                            value={comment}
                            name="comment"
                            className="form-control"
                            onChange={(e) => handleInputChangeComments(e, 0)}
                        />

                    </div>)}
        </div>)

}

export default Comments;
