import React from 'react'

export default class extends React.Component {

    render() {
        const { id, title, short, full, completed, readMore } = this.props;
        return (
            <div className='list-group-item'>
                <div className="d-flex w-100 justify-content-between">
                    <h5 className='mb-1'>{title}</h5>
                    <div>
                        <label className="form-check todo-list-item-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={completed}
                                onChange={() => this.props.completeTask(id)}
                            />
                            <span className="form-check-label">Готово</span>
                        </label>
                        {
                            completed && <a href='#' onClick={(e) => {e.preventDefault(); this.props.handleDeleteTask(id)}}>Удалить</a>
                        }
                    </div>
                </div>
                <p className='mb-1'>{short}</p>
                <small><a href='#' onClick={(e) => {e.preventDefault(); this.props.handleReadMore()}}>Подробнее</a></small>
                {
                    readMore && <p>{full}</p>
                }
            </div>
        )
    }
}