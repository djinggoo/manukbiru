import React, { Component } from 'react';

class Legend extends Component {
    render() {
		let labels = this.props.labels,
			colors = this.props.colors;
		
		return (
            <div className="Legend">
                { labels.map((label, labelIndex)=>{
                    return (
                    <div>
                        <span className="Legendcolor" style={{ backgroundColor: colors[labelIndex % colors.length]  }} />
                        <span className="Legendlabel">{ label }</span>
                    </div>
                    );
                }) }
            </div>
		);
	}
}

export default Legend;