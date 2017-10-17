import React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './List.css';

function renderSortable(props) {
  return (
    <div className="sortable">
      <Select
        name="currentFilter"
        placeholder="filter"
        options={props.options.filterList}
        onChange={props.filterList}
        clearable={false}
        searchable={false}
      />
      <Select
        name="currentSort"
        placeholder="Sort"
        options={props.options.sortList}
        onChange={props.sortList}
        clearable={false}
        searchable={false}
      />
    </div>
  );
}

function Container(props) {
  return (
    <div className="list-container">
      <div className="list-row">
        <Link className="new" to={`/${props.name}/new`}>ADD NEW</Link>
        { props.sortable ? renderSortable(props) : null }
      </div>
      <div className="list-items">
        { props.children }
      </div>
    </div>
  );
}

function Item(props) {
  return (
    <div className="list-item">
      { props.children }
    </div>
  );
}

export default {
  Container,
  Item,
};
