import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';
import isEqual from 'lodash/isEqual';
import keyBy from 'lodash/keyBy';

class ChartComponent extends React.Component {
    compareNumbers(a, b) {
        return a - b;
    }

    render(){
		var self = this,
			data = this.props.data,
			layered = this.props.grouping === 'layered' ? true : false,
			stacked = this.props.grouping === 'stacked' ? true : false,
			opaque = this.props.opaque,
			max = 0;
		
		for (var i = data.length; i--; ) {
			for (var j = data[i].length; j--; ) {
				if (data[i][j] > max) {
					max = data[i][j];
				}
			}
		}
		
				
		return (
			<div className={ 'Charts' + (this.props.horizontal ? ' horizontal' : '' ) }>
				{ data.map(function (serie, serieIndex) {
				 	var sortedSerie = serie.slice(0),
				 		sum;
				 	
				 	sum = serie.reduce(function (carry, current) {
				 		return carry + current;
					}, 0);
				 	// sortedSerie.sort(this.compareNumbers);				 		
									 
					return (
						<div className={ 'Charts--serie ' + (self.props.grouping) }
				 			key={ serieIndex }
							style={{ height: self.props.height ? self.props.height: 'auto' }}
						>
						<label>{ self.props.labels[serieIndex] }</label>
						{ serie.map(function (item, itemIndex) {
							var color = self.props.colors[itemIndex], style,
								size = item / (stacked ? sum : max) * 100;
							
							style = {
								backgroundColor: color,
								opacity: opaque ? 1 : (item/max + .05),
								zIndex: item
							};
						
							if (self.props.horizontal) {
								style['width'] = size + '%';
							} else {								
								style['height'] = size + '%';						
							}
	
							if (layered && !self.props.horizontal) {
								style['right'] = ((sortedSerie.indexOf(item) / (serie.length + 1)) * 100) + '%';
							}
						
						 return (
							 <div
							 	className={ 'Charts--item ' + (self.props.grouping) }
							 	style={ style }
								key={ itemIndex }
							>
							 	<b style={{ color: color }}>{ item }</b>
							 </div>
						);
						}) }
						</div>
					);
				}) }
			</div>
		);
	}
}
  
export default ChartComponent;  