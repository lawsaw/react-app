import React from 'react'
import { connect } from 'react-redux'
import UsersComponent from '../components/Users'
import { addUser } from '../actions/UserActions'

class Users extends React.Component {

    handleShow = () => {
        const { userList } = this.props;
        console.log(userList);
    }

    handleAdd = () => {
        const name = prompt('Имя: ');
        const city = prompt('Город: ');
        this.props.addUser(name, city);
    }

    render() {
        const { userList } = this.props;
        console.log(userList);
        return (
            <div className='dfs'>
                {
                    userList.map(({name, city}, index) => (
                        <UsersComponent
                            key={index}
                            name={name}
                            city={city}
                        />
                    ))
                }
                <button onClick={this.handleShow}>Показать</button>
                <button onClick={this.handleAdd}>Добавить</button>
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {
        userList: store.users.userList,
        tasks: store.tasks
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addUser: (name, city) => dispatch(addUser(name, city))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users)

