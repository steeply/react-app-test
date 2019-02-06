import _ from 'lodash';
import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import * as ActionsModels from '../../actions/models';

class Home extends Component {

  componentDidMount = () => {
    const { loadModels, modelsList } = this.props;
    if (!_.size(modelsList)) {
      loadModels();
    }
  };

  componentDidCatch = (error, info) => {
    console.log('Error', error, info);
    // this.props.loggerService({ error, info });
  };

  render() {
    const { modelsList, newPage, isLoading } = this.props;
    return (
      <div>
        <h1>Список моделей</h1>
        <p>
          <button
            disabled={isLoading}
            onClick={newPage}
          >
            Новая запись <i className="fa fa-plus" aria-hidden="true" />
          </button>
        </p>

        <ReactTable
          data={modelsList}
          columns={
            [{
              Header: 'ID',
              accessor: 'id',
                Cell: props => props.original.id
            }, {
              Header: 'Название модели',
              accessor: 'modelName',
                Cell: props => <Link to={`/edit/${props.original.id}`}>{props.value}</Link>
            }, {
              Header: 'Атрибуты',
              accessor: 'properties',
                Cell: props => <div>
                    <div>Количество: {_.size(props.value)}</div>
                    <div>({_.map(props.value, 'name').join(', ')})</div>
                </div>
            }]
          }
          minRows={3}
        />
      </div>
    );
  }
}

Home.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  modelsList: PropTypes.array.isRequired,
  newPage: PropTypes.func.isRequired,
  loadModels: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modelsList: _.sortBy(state.models.list, ['id']),
  isLoading: state.models.isLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...ActionsModels, newPage: () => push('/new') },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
