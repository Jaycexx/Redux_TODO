import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

//pure component @param [props.., children]
const Link = (
  {
    active,
    onClick,
    children
  }
) => {
  if(active) {
    return <span>{children}</span>;
  }
  return (
    <a href="#"
       onClick={e => {
            e.preventDefault();
            onClick();
          }} >
      {children}
    </a>
  );
}

function mapStateToProps(state, props) {
  return {
    active: props.filter === state.visibilityFilter
  };
}
function mapDispatchToProps(dispatch, props) {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: props.filter
      })
    }
  };
}
const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default FilterLink;