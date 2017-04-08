
'use strict';
import React from 'react';
// Use case range(4) - will return array [0, 1, 2, 3]

import range from 'lodash.range';

////////////////
// Components //
////////////////

//Constants 
// 1 degree in radians
const degree_to_rad = 0.0174533;
// Diameter of the main button in pixels
const main_button_diam = 90;
const child_button_diam = 50;
// The number of child buttons that fly out from the main button
const num_children = 5;
// Hard coded position values of the mainButton
const M_X = 490;
const M_Y = 450;

// How far away from the main button does the child buttons go
const fly_out_radius = 120,
	separation_angle = 40, //degrees
	fan_angle = (num_children - 1) * separation_angle, //degrees
	base_angle = ((180 - fan_angle)/2); // degrees

// Utility functions 

// Since JS Math. Functions accept value of angle in radians and we've been working in degrees we will need to covert
// degrees to radians first.
function toRadians(degrees) {
	return degrees * degree_to_rad;
}

function finalDeltaPositions(index) {
	let angle = base_angle + ( index * separation_angle );
	return {
		deltaX: fly_out_radius * Math.cos(toRadians(angle)) - (child_button_diam/2),
		deltaY: fly_out_radius * Math.sin(toRadians(angle)) + (child_button_diam/2)
	};
}


class APP extends React.Component {
	constructor(props) {
		super(props);	

		this.state = {
			isOpen: false
		};

		// Bind this to the functions 
		this.openMenu = this.openMenu.bind(this);
	}

	mainButtonStyles() {
		return {
			width: main_button_diam,
			height: main_button_diam,
			top: M_Y - (main_button_diam/2),
			left: M_X - (main_button_diam/2)
		};
	}

	initialChildButtonStyles() {
		return {
			width: child_button_diam,
			height: child_button_diam,
			top: M_Y - (child_button_diam/2),
			left: M_X - (child_button_diam/2)
		};
	}

	finalChildButtonStyles(childIndex) {
		let{deltaX, deltaY} = finalDeltaPositions(childIndex);
		return {
			width: child_button_diam,
			height: child_button_diam,
			left: M_X + deltaX,
			top: M_Y - deltaY
		};
	}

	openMenu() {
		let{isOpen} = this.state;
		this.setState({
			isOpen: !isOpen
		});
	}

	render() {
		let {isOpen} = this.state;
		return (
			<div>
				{range(num_children).map( index => {
					let style = isOpen ? this.finalChildButtonStyles(index) : this.initialChildButtonStyles();
					return (
						<div	
							key={index}
							className="child-button"
							style={style}/>
					);
				})}
				<div 
					className="main-button"
					style={this.mainButtonStyles()}
					onClick={this.openMenu}/>
			</div>
		);
	}	
};

module.exports = APP;