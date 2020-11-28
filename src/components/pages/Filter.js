import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="filter">
                <div className="filter-result">{this.props.size} Products</div>
                <div className="filter-sort"> 
                Sort {" "}<select value={this.props.sort} onChange={this.props.sortProducts}>
                    <option value="">Select</option>
                    <option value="lowest">Price:Low to High</option>
                    <option value="highest">Price:High to Low</option>
                    </select></div>
            </div>
        )
    }
}
