import React from 'react';

export default class extends React.Component {

    // handleDone = () => {
    //     this.props.onDone(this.props.id);
    //     console.log(this.props.id);
    // }
    //
    // handleDelete = () => {
    //     this.props.onDelete(this.props.id);
    // }

    render() {
        let { id, title, description, done } = this.props;
        let doneClass = done ? 'todo-list-item--done' : '';
        //console.log(id);
        return (
            <div id={id} className={`todo-list-item ${doneClass}`}>
                <h3>{title}</h3>
                <p>{description}</p>

                <div className="row">
                    <div className="col col-8">
                        <label className="form-check todo-list-item-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={done}
                                onChange={() => this.props.onDone(this.props.id)}
                            />
                            <span className="form-check-label">Задание выполнено</span>
                        </label>
                    </div>
                    <div className="col col-4">
                        {
                            done && <button
                                className="todo-list-item-delete"
                                onClick={() => this.props.onDelete(this.props.id)}
                            >Удалить из списка</button>
                        }
                    </div>
                </div>

            </div>
        )
    }
}