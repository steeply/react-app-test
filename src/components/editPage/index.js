import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import * as ActionsModels from '../../actions/models';

class EditPage extends Component {
  constructor(props) {
    super(props);
    const { match, modelsList } = props;

    let itemState = {
      modelName: '',
      properties: [{ name: '', type: 'number', description: '', value: '', required: false }]
    };

    const id = match.params.id;
    if (id) {
      const findItem = _.find(modelsList, { id: _.toNumber(id) });
      if (!_.isEmpty(findItem)) {
        itemState = findItem;
      }
    }
    this.state = itemState;
  }

  componentDidMount = () => {
    const { match, modelsList, loadModels } = this.props;
    if (_.isEmpty(modelsList) && match.params.id) {
      loadModels();
    }
  };

  componentDidCatch = (error, info) => {
    console.error(error, info);
    // this.props.loggerService({ error, info });
  };

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const findItem = _.find(nextProps.modelsList, { id: _.toNumber(nextProps.match.params.id) });
    if (!!findItem && !_.isEqual(findItem, prevState)) {
      return { ...findItem };
    } else {
      return null;
    }
  };

  submit = (obj) => {
    const { addModel, editModel, homePage } = this.props;
    if (_.isEqual(obj, _.omit(this.state, ['id']))) {
      homePage();
      return;
    }
    if (!_.isUndefined(this.state.id)) {
      editModel(this.state.id, obj, homePage);
    } else {
      addModel(obj, homePage);
    }
  };

  deleteModel = (id) => {
    const { deleteModel, homePage } = this.props;
    deleteModel(id, homePage);
  };

  render() {
    const { homePage, isLoading, modelsList } = this.props;
    const { id } = this.state;

    return (
      <div>
        <h1>{_.isUndefined(id) ? 'Новая модель' : `Редактирование модели (id: ${id})`}</h1>

        <button onClick={homePage}>
          <i className="fa fa-arrow-left" aria-hidden="true" /> Назад
        </button>

        <Formik
          enableReinitialize
          initialValues={{
            modelName: this.state.modelName,
            properties: this.state.properties
          }}
          validationSchema={Yup.object({
              modelName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
              properties: Yup.array().of(
                Yup.object({
                  name: Yup.string().required('Required'),
                  description: Yup.string().required('Required')
                })
              )
            })
          }
          onSubmit={values => this.submit(values)}
          render={({ values }) => (
            <Form>
              <span className="fieldCell">
                <span>Название модели: </span>
                <Field name="modelName"/>
                <ErrorMessage name="modelName">
                  { msq => <div className="fieldError">{msq}</div> }
                </ErrorMessage>
              </span>

              <FieldArray
                name="properties"
                render={arrayHelpers => (
                  <div>
                    {values.properties && values.properties.length > 0 && (
                      values.properties.map((item, index) => (
                        <div key={index}>
                          <span className="fieldCell">
                            <span>Название атрибута: </span>
                            <Field type="text" name={`properties.${index}.name`} />
                            <ErrorMessage name={`properties.${index}.name`}>
                              { msq => <div className="fieldError">{msq}</div> }
                            </ErrorMessage>
                          </span>

                          <span className="fieldCell">
                            <span>Тип: </span>
                            <Field component="select" name={`properties.${index}.type`}>
                              <option value="number">Number</option>
                              <option value="string">String</option>
                              <option value="boolean">Boolean</option>
                              <option value="model">Model</option>
                            </Field>
                          </span>

                          <span className="fieldCell">
                            <span>Описание: </span>
                            <Field type="text" name={`properties.${index}.description`} />
                            <ErrorMessage name={`properties.${index}.description`}>
                              { msq => <div className="fieldError">{msq}</div> }
                            </ErrorMessage>
                          </span>

                          <span className="fieldCell">
                            <span>Значение: </span>
                            {item.type === 'boolean' && (
                              <Field
                                type="checkbox"
                                checked={item.value}
                                name={`properties.${index}.value`}
                              />
                            )}
                            {(item.type === 'number' || item.type === 'string') && (
                              <Field
                                type={ item.type === 'number' ? 'number' : 'text' }
                                name={`properties.${index}.value`}
                              />
                            )}
                            {item.type === 'model' && (
                              <Field component="select" name={`properties.${index}.value`}>
                                {_.reject(modelsList, ['id', id]).map((item, index) =>
                                  <option key={index} value={item.id}>{item.modelName}</option>
                                )}
                              </Field>
                            )}
                            <ErrorMessage name={`properties.${index}.value`}>
                              { msq => <div className="fieldError">{msq}</div> }
                            </ErrorMessage>
                          </span>

                          <span className="fieldCell">
                            <span>Required: </span>
                            <Field type="checkbox" checked={item.required} name={`properties.${index}.required`} />
                          </span>

                          <button type="button" onClick={() => arrayHelpers.remove(index)}> - </button>
                        </div>
                      ))
                    )}

                    <button
                      style={{ marginTop: '20px'}}
                      type="button"
                      onClick={() => arrayHelpers.push(
                        { name: '', type: 'number', description: '', value: '', required: false }
                      )}
                      disabled={isLoading}
                    >
                      Добавить новый атрибут <i className="fa fa-plus" aria-hidden="true" />
                    </button>
                  </div>
                )}
              />

              <div style={{ marginTop: '20px'}}>
                <button type="submit" disabled={isLoading}>
                  Сохранить <i className="fa fa-floppy-o" aria-hidden="true" />
                </button>

                {!_.isUndefined(id) && (
                  <button
                    type="button"
                    style={{ marginLeft: '100px', color: 'Red' }}
                    onClick={()=>this.deleteModel(id)}
                    disabled={isLoading}
                  >
                    Удалить модель <i className="fa fa-trash" aria-hidden="true" />
                  </button>
                )}
              </div>
            </Form>
          )}
        />

      </div>
    );
  }
}

EditPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  modelsList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  homePage: PropTypes.func.isRequired,
  addModel: PropTypes.func.isRequired,
  editModel: PropTypes.func.isRequired,
  deleteModel: PropTypes.func.isRequired,
  loadModels: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modelsList: state.models.list,
  isLoading: state.models.isLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { ...ActionsModels, homePage: () => push('/') },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps )(EditPage);



