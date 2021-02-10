import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

const Comments = ({comment, comments, handleChange, handleRemove, handleAdd}) => {

    // combines componentDidMount and componentDidUpdate
    useEffect( () =>{

        console.log(' [Comments] useEffect');
    },[])
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
                    onChange={(e) => handleChange(e, index)}
                />

                {comments.length !== 1 &&
                <button
                    className="badge badge-primary mr-2"
                    onClick={() => handleRemove(index)}>Remove
                </button>}

                {comments.length - 1 === index &&
                (<button
                    className="badge badge-primary mr-2"
                    onClick={handleAdd}>Add
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
                            onChange={(e) => handleChange(e, 0)}
                        />

                    </div>)}
        </div>)

}
Comments.propTypes= {
 comment:PropTypes.string,
 comments:PropTypes.array,
 handleChange: PropTypes.func,
 handleAdd: PropTypes.func,
 handleRemove: PropTypes.func
}
export default React.memo(Comments);
