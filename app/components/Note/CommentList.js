import React, { memo } from 'react';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Comment from './Comment';
import './NoteComment.scss';


const CommentList = ({ opinions }) => {

  const commentNodes =
    opinions && opinions.map(comment => <Comment {...comment} />);

  return (
    <div>
      {commentNodes}
    </div>
  );
};

CommentList.propTypes = {
  opinions: PropTypes.array,
};


export default compose(
  memo,
  injectIntl,
)(CommentList);
