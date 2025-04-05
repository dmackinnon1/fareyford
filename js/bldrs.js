"use strict";
/**
* Builders to be used for HTML construction.
*
*/
class Bldr {
	constructor(name) {
		this.name = name;
		this.attributes = [];
		this.elements = [];
	}
	att(name, value) {
		let att = new Attribute(name, value);
		this.attributes.push(att);
		return this;
	}
	// add element allows you to add a builder to a builder
	elem(bldr) {
		this.elements.push(bldr);
		return this;
	}
	text(text) {
		this.elements.push (new RawHtml(text));
		return this;
	}
	build() {
		let s = "<" + this.name;
		for(let i = 0; i< this.attributes.length; i++) {
			s += " " + this.attributes[i].toString();
		}
		s += ">";
		for(let i = 0; i< this.elements.length; i++) {
			s += " " + this.elements[i].build();
		}
		s += "</" + this.name + ">";
		return s;
	}
};

class Attribute {
	constructor(name, value) {
		this.name = name;
		this.value = value;
	}

	toString() {
		return "" + this.name + "='" + this.value + "'";
	}
};

class RawHtml {
	constructor(raw) {
		this.raw = raw;
	}
	build() {
		return this.raw;
	}
};

/**
 * TiKZ builders 
 */

class TikZBuilder {

	constructor(){
		this.components = [];
		this.scale = 1;
	}

	reset(){
		this.components = [];
	}

	scale(value){
		this.scale = value;
	}

	build(){
		let s = this.buildOpen();

		for(let c in this.components) {
			s += " " + this.components[c].build();
		}

		s += this.buildClose();
		return s;
	}

	buildOpen(){
		let s = "";
		//s +=  "\\begin{figure}[!h] \n";
		//s += "\\centering \n";
		s+= "\\begin{tikzpicture}[scale="+this.scale +"]\n";
		return s;
	}

	buildClose(){
		let s = "";
		s += "\\end{tikzpicture} \n";
		//s +=  "\\end{figure} \n";		
		return s;
	}

	addComponent(comp){
		this.components.push(comp);
	}		
	
};

class TikZCircle {
	constructor(rad, col, x, y){
		this.radius = rad;
		this.color = col;
		this.x = x;
		this.y = y;
	}

	build(){
		let result = "\\draw [thick, color=" + this.color + "] ("+this.x +"," + this.y +") circle (" +this.radius +");\n"; //filldraw
		return result;
	}
};


try{
    module.exports.TikZBuilder = TikZBuilder; 
    module.exports.TikZCircle = TikZCircle; 
} catch(err){
    console.log("non-node execution context");
}