import React, {Component} from 'react'
import {Add} from "./Add";
import {News} from "./News";

//import Search from '/Search';
import {Search} from "./Search";

//export default class. And u can avoid naming class. Thats good when u have container and component with same naming.
class TotalNews extends Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    state = {
        data: [],
        searchText: ''
    }
    
    componentWillMount() {
        //better to use new way of setState, via callback - this.setState((state)=>({data: this.props.data}))
        this.setState({
            data: this.props.data
        })
    }
    handleAddClick = (newdata) => {
        const nextNews = [newdata, ...this.state.data]
        this.setState({
            data: nextNews
        })

    }
    handleSearch = (searchText) => {
        //console.log(searchText);
        this.setState({
            searchText: searchText
        })
    }
    renderTotalNews = (e) => {
        //console.log(this.props);
        const { data } = this.state;
        
        //avoid creating many variables. return react.fragment
        return (
            <React.Fragment>
                <Add
                    onClick={this.handleAddClick}
                />
                <Search
                    onSearch={this.handleSearch}
                />
                <News
                    data={data}
                    searchText={this.state.searchText}
                />
            </React.Fragment>
        );
    }
    render() {
        return(
            // no need react.fragment
            <React.Fragment>
                {this.renderTotalNews()}
            </React.Fragment>
        )
    }
}

//if only component need to export, use - export default TotalNews when creating class. and then - import TotalNews from '...'
export { TotalNews }
